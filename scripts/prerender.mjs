/**
 * Post-build prerender: turns the client-side app into one static HTML file
 * per route, and writes sitemap.xml.
 *
 *   npm run build      (runs this automatically after the CRA build)
 *
 * Why: the host serves files, not routes. Without build/about/index.html a
 * direct visit to /about is a 404, and crawlers that don't run JavaScript see
 * an empty page with no title. For every route this script loads the built
 * app in headless Chrome, scrolls it so scroll-triggered content renders, and
 * writes the resulting markup plus that page's <title>/meta/canonical tags to
 * build/<route>/index.html (and build/<route>.html). The browser bundle then
 * mounts over it as usual.
 *
 * Routes come from the same data the app renders (src/lib/data.js and
 * src/lib/imageManifest.json), so new services, blog posts or project folders
 * are picked up without editing this file.
 *
 * If Chrome can't start (e.g. missing system libraries on the build machine)
 * every route still gets a copy of the plain app shell so nothing 404s, and the
 * build continues with a warning. Set PRERENDER_STRICT=1 to fail instead.
 */
import { createServer } from "node:http";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(ROOT, "build");
const STRICT = process.env.PRERENDER_STRICT === "1";

// Analytics and editor scripts must not run (or count visits) during the build.
const BLOCKED = /posthog\.com|assets\.emergent\.sh|google-analytics|googletagmanager/;

// Head tags owned by <Seo>; these are copied into the static HTML.
const HEAD_SELECTOR = [
  "title",
  'meta[name="description"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
].join(",");

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml",
};

async function loadRoutes() {
  // data.js is a plain ES module with no imports; load it without a bundler.
  const src = fs.readFileSync(path.join(ROOT, "src/lib/data.js"), "utf8");
  const data = await import("data:text/javascript;base64," + Buffer.from(src).toString("base64"));
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "src/lib/imageManifest.json"), "utf8"));

  const routes = [
    "/",
    "/about",
    "/services",
    ...data.SERVICES.map((s) => `/services/${s.slug}`),
    "/projects",
    ...manifest.projects.map((p) => `/projects/${p.id}`),
    "/calculator",
    "/blog",
    ...data.BLOG_POSTS.map((p) => `/blog/${p.slug}`),
    "/contact",
  ];
  return { routes, siteUrl: data.SITE_URL };
}

// Minimal static server for the build folder, with SPA fallback to the shell.
function serve(shell) {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = path.join(BUILD, urlPath);
    if (file.startsWith(BUILD) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    } else {
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(shell);
    }
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

async function launchBrowser() {
  const { default: puppeteer } = await import("puppeteer");
  const launch = () => puppeteer.launch({ headless: "shell", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    return await launch();
  } catch (err) {
    // Some CI installs skip package install scripts, so the browser was never
    // downloaded. Fetch it once and retry.
    if (!/Could not find|install/i.test(err.message)) throw err;
    console.log("prerender: downloading headless Chrome…");
    execSync("npx puppeteer browsers install chrome-headless-shell", { cwd: ROOT, stdio: "inherit" });
    return launch();
  }
}

async function snapshot(browser, origin, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", (r) => (BLOCKED.test(r.url()) ? r.abort() : r.continue()));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(origin + route, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForSelector("#root h1", { timeout: 20000 });

  // Scroll through the page so whileInView reveals and counters run, then let
  // the longest animations (counters: ~2s) finish.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 2500));

  const result = await page.evaluate((selector) => {
    const head = [...document.head.querySelectorAll(selector)].map((el) => {
      const clone = el.cloneNode(true);
      clone.setAttribute("data-prerendered", "");
      return clone.outerHTML;
    });
    return { head, body: document.getElementById("root").innerHTML, path: location.pathname };
  }, HEAD_SELECTOR);

  await page.close();
  if (errors.length) throw new Error(`${route}: ${errors[0]}`);
  // A route whose data no longer exists redirects (<Navigate>) — don't save it.
  if (result.path !== route) throw new Error(`${route} redirected to ${result.path}`);
  if (!result.head.some((t) => t.startsWith("<title"))) throw new Error(`${route}: no <title> rendered`);
  return result;
}

function inject(shell, { head, body }) {
  return shell
    .replace("</head>", `${head.join("")}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

// Writes /about as both about/index.html and about.html so it resolves on
// hosts with either directory-index or clean-URL lookup.
function writeRoute(route, html) {
  if (route === "/") {
    fs.writeFileSync(path.join(BUILD, "index.html"), html);
    return;
  }
  const rel = route.replace(/^\//, "");
  fs.mkdirSync(path.join(BUILD, rel), { recursive: true });
  fs.writeFileSync(path.join(BUILD, rel, "index.html"), html);
  fs.writeFileSync(path.join(BUILD, `${rel}.html`), html);
}

function writeSitemap(siteUrl, routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => `  <url>\n    <loc>${siteUrl}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");
  fs.writeFileSync(
    path.join(BUILD, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}

async function main() {
  const shell = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
  const { routes, siteUrl } = await loadRoutes();

  writeSitemap(siteUrl, routes);
  // Untouched app shell, for the host's catch-all rewrite (unknown URLs then
  // render the app's own 404 page instead of a copy of the homepage).
  fs.writeFileSync(path.join(BUILD, "spa-fallback.html"), shell);

  let browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    if (STRICT) throw err;
    console.warn(`prerender: WARNING — headless Chrome unavailable (${err.message.split("\n")[0]}).`);
    console.warn("prerender: writing the plain app shell for each route instead (no 404s, but no per-page HTML).");
    routes.filter((r) => r !== "/").forEach((r) => writeRoute(r, shell));
    return;
  }

  const server = await serve(shell);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const failures = [];
  try {
    // Snapshot everything first, then write, so "/" (build/index.html) is only
    // replaced once the shell is no longer being served.
    const pages = [];
    for (const route of routes) {
      try {
        pages.push([route, await snapshot(browser, origin, route)]);
        console.log(`prerender: ${route}`);
      } catch (err) {
        failures.push(err.message);
        console.warn(`prerender: FAILED ${err.message}`);
      }
    }
    for (const [route, result] of pages) writeRoute(route, inject(shell, result));
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    throw new Error(`${failures.length} route(s) failed to prerender:\n  ${failures.join("\n  ")}`);
  }
  console.log(`prerender: ${routes.length} routes + sitemap.xml written to build/`);
}

main().catch((err) => {
  console.error(`prerender: ${err.message}`);
  process.exit(1);
});
