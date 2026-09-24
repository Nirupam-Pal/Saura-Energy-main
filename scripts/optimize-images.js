/**
 * Image optimizer — run with `npm run images` after adding or changing photos.
 *
 * Reads the original photos from:
 *   public/projects/<Project Name>/*.{jpg,jpeg,png,webp}
 *   public/ServiceSection/*.{jpg,jpeg,png,webp}
 *
 * and writes:
 *   public/img/...                 resized WebP files (400/800/1200/1920 px wide)
 *   src/lib/imageManifest.json     sizes + a tiny blurred placeholder (LQIP) per image
 *
 * Output paths are lowercase and space-free, so they behave the same on
 * Windows and on Linux hosting (Render). Existing outputs are reused when the
 * original hasn't changed, so re-runs are fast.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC, "img");
const MANIFEST = path.join(ROOT, "src", "lib", "imageManifest.json");

const WIDTHS = [400, 800, 1200, 1920];
const QUALITY = 72;
const LQIP_WIDTH = 16;
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const byNumericName = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const listImages = (dir) => fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f)).sort(byNumericName);

async function optimize(srcFile, outBase) {
  const srcStat = fs.statSync(srcFile);
  const image = sharp(srcFile).rotate(); // respect camera EXIF orientation
  const { width: rawW, height: rawH, orientation } = await image.metadata();
  // EXIF orientations 5–8 swap width and height once rotated.
  const [width, height] = orientation >= 5 ? [rawH, rawW] : [rawW, rawH];

  const widths = WIDTHS.filter((w) => w < width);
  if (widths.length < WIDTHS.length) widths.push(Math.min(width, WIDTHS[WIDTHS.length - 1]));

  const srcSet = [];
  for (const w of [...new Set(widths)]) {
    const rel = `${outBase}-${w}.webp`;
    const outFile = path.join(PUBLIC, rel);
    const fresh = fs.existsSync(outFile) && fs.statSync(outFile).mtimeMs >= srcStat.mtimeMs;
    if (!fresh) {
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      await sharp(srcFile).rotate().resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 }).toFile(outFile);
    }
    srcSet.push([`/${rel}`, w]);
  }

  const lqipBuf = await sharp(srcFile).rotate().resize({ width: LQIP_WIDTH })
    .webp({ quality: 40 }).toBuffer();

  return {
    width,
    height,
    srcSet,
    lqip: `data:image/webp;base64,${lqipBuf.toString("base64")}`,
  };
}

async function main() {
  const manifest = { images: {}, projects: [] };
  let count = 0;

  // Project galleries: one folder per project.
  const projectsDir = path.join(PUBLIC, "projects");
  for (const folder of fs.readdirSync(projectsDir).sort(byNumericName)) {
    const dir = path.join(projectsDir, folder);
    if (!fs.statSync(dir).isDirectory()) continue;
    const keys = [];
    for (const file of listImages(dir)) {
      const key = `/projects/${folder}/${file}`;
      const outBase = `img/projects/${slugify(folder)}/${slugify(path.parse(file).name)}`;
      manifest.images[key] = await optimize(path.join(dir, file), outBase);
      keys.push(key);
      count++;
      process.stdout.write(`\r  optimized ${count} images`);
    }
    if (keys.length) manifest.projects.push({ id: slugify(folder), title: folder, images: keys });
  }

  // Service section photos.
  const serviceDir = path.join(PUBLIC, "ServiceSection");
  for (const file of listImages(serviceDir)) {
    const key = `/ServiceSection/${file}`;
    manifest.images[key] = await optimize(path.join(serviceDir, file), `img/services/${slugify(path.parse(file).name)}`);
    count++;
    process.stdout.write(`\r  optimized ${count} images`);
  }

  // Brand logo: shown at ~48px, so ship small copies (2x for retina screens)
  // instead of the 1254px original. PNG sizes are for favicon/app icons.
  const logo = path.join(PUBLIC, "company logo", "saura.png");
  const brandDir = path.join(OUT_DIR, "brand");
  fs.mkdirSync(brandDir, { recursive: true });
  await sharp(logo).resize({ width: 96 }).webp({ quality: 90 }).toFile(path.join(brandDir, "saura-96.webp"));
  await sharp(logo).resize({ width: 32 }).png().toFile(path.join(brandDir, "saura-32.png"));
  await sharp(logo).resize({ width: 180 }).png().toFile(path.join(brandDir, "saura-180.png"));

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
  console.log(`\nDone. Manifest written to ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
