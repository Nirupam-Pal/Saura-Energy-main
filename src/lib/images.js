import manifest from "@/lib/imageManifest.json";

const PUBLIC_URL = process.env.PUBLIC_URL || "";
const UNSPLASH_WIDTHS = [480, 800, 1200, 1600, 2400];

const safeDecode = (s) => {
  try { return decodeURI(s); } catch { return s; }
};
const isUnsplash =(src) => /^https:\/\/images\.unsplash\.com\//.test(src);

function unsplashUrl(src, width, extra = {}) {
  const url = new URL(src);
  // `fm=jpg` would override `auto=format`, so drop it to let Unsplash serve WebP/AVIF.
  url.searchParams.delete("fm");
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("q", "70");
  url.searchParams.set("w", String(width));
  Object.entries(extra).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.toString();
}

/**
 * Turns any image path used on the site into everything the browser needs:
 * a sensible default `src`, a responsive `srcSet`, a blur placeholder and
 * (when known) the intrinsic size to reserve layout space.
 *
 * - Local photos listed in imageManifest.json (run `npm run images`) get
 *   pre-generated WebP sizes and an inline base64 placeholder.
 * - Unsplash photos get sized/compressed variants from Unsplash's CDN.
 * - Anything else falls back to the original file.
 */
export function resolveImage(src) {
  const entry = manifest.images[src] || manifest.images[safeDecode(src)];
  if (entry) {
    const candidates = entry.srcSet.map(([path, w]) => [`${PUBLIC_URL}${path}`, w]);
    const fallback = candidates.find(([, w]) => w >= 800) || candidates[candidates.length - 1];
    return {
      src: fallback[0],
      srcSet: candidates.map(([url, w]) => `${url} ${w}w`).join(", "),
      lqip: entry.lqip,
      width: entry.width,
      height: entry.height,
    };
  }

  if (isUnsplash(src)) {
    return {
      src: unsplashUrl(src, 1200),
      srcSet: UNSPLASH_WIDTHS.map((w) => `${unsplashUrl(src, w)} ${w}w`).join(", "),
      lqip: unsplashUrl(src, 24, { q: 20, blur: 200 }),
    };
  }

  const isAbsolute = /^(https?:|data:)/.test(src);
  return { src: isAbsolute ? src : `${PUBLIC_URL}${encodeURI(safeDecode(src))}` };
}

/** Warm the browser cache so an image appears instantly when shown later. */
export function preloadImage(src, sizes = "100vw") {
  const { src: fallback, srcSet } = resolveImage(src);
  const img = new Image();
  img.decoding = "async";
  if (srcSet) {
    img.sizes = sizes;
    img.srcset = srcSet;
  }
  img.src = fallback;
}

/** Project galleries discovered by `npm run images`. */
export const MANIFEST_PROJECTS = manifest.projects;
