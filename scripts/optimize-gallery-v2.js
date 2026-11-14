/**
 * Super Crown Foundation — Modern Responsive Gallery Optimization Pipeline (v2 - Parallel)
 */

process.env.UV_THREADPOOL_SIZE = "12";

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "../public/gallery");
const OUT_DIR = path.join(__dirname, "../public/gallery-opt");
const SKIP_EXT = /\.(mov|heic)$/i;
const IMG_EXT = /\.(jpe?g|png|gif|webp|tiff?)$/i;

const RESPONSIVE_WIDTHS = [
  { width: 480, webpQ: 84, avifQ: 76 },
  { width: 800, webpQ: 84, avifQ: 76 },
  { width: 1200, webpQ: 85, avifQ: 78 },
  { width: 1600, webpQ: 86, avifQ: 80 },
  { width: 2048, webpQ: 88, avifQ: 82 },
];

let totalImages = 0;
let generatedFiles = 0;
let skippedFiles = 0;
let errors = 0;
let totalOriginalBytes = 0;

async function processImage(srcPath, relDir) {
  const ext = path.extname(srcPath);
  const base = path.basename(srcPath, ext);
  const outDir = path.join(OUT_DIR, relDir);
  fs.mkdirSync(outDir, { recursive: true });

  const stat = fs.statSync(srcPath);
  totalOriginalBytes += stat.size;

  try {
    const pipeline = sharp(srcPath, { failOn: "none" }).rotate();
    const meta = await pipeline.metadata();
    const origWidth = meta.width || 1200;

    for (const { width, webpQ, avifQ } of RESPONSIVE_WIDTHS) {
      const targetWidth = Math.min(width, origWidth);

      // WebP variant
      const webpFile = path.join(outDir, `${base}-${width}.webp`);
      if (!fs.existsSync(webpFile)) {
        await sharp(srcPath, { failOn: "none" })
          .rotate()
          .resize({ width: targetWidth, withoutEnlargement: true })
          .webp({ quality: webpQ, effort: 4 })
          .toFile(webpFile);
        generatedFiles++;
      } else {
        skippedFiles++;
      }

      // AVIF variant
      const avifFile = path.join(outDir, `${base}-${width}.avif`);
      if (!fs.existsSync(avifFile)) {
        await sharp(srcPath, { failOn: "none" })
          .rotate()
          .resize({ width: targetWidth, withoutEnlargement: true })
          .avif({ quality: avifQ, effort: 3 })
          .toFile(avifFile);
        generatedFiles++;
      } else {
        skippedFiles++;
      }
    }

    // High-resolution backward compatible -thumb.webp (800w crisp)
    const thumbFile = path.join(outDir, `${base}-thumb.webp`);
    if (!fs.existsSync(thumbFile) || fs.statSync(thumbFile).size < 30000) {
      await sharp(srcPath, { failOn: "none" })
        .rotate()
        .resize({ width: Math.min(800, origWidth), withoutEnlargement: true })
        .webp({ quality: 84, effort: 4 })
        .toFile(thumbFile);
    }

    // High-resolution backward compatible -full.webp (2048w crisp)
    const fullFile = path.join(outDir, `${base}-full.webp`);
    if (!fs.existsSync(fullFile)) {
      await sharp(srcPath, { failOn: "none" })
        .rotate()
        .resize({ width: Math.min(2048, origWidth), withoutEnlargement: true })
        .webp({ quality: 88, effort: 4 })
        .toFile(fullFile);
    }

    process.stdout.write(`  ✓ [${relDir}] ${base} (${origWidth}px)\n`);
  } catch (err) {
    errors++;
    process.stderr.write(`  ✗ ${srcPath}: ${err.message}\n`);
  }
}

async function collectFiles(dir, relDir = "") {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const rel = path.join(relDir, ent.name);
    if (ent.isDirectory()) {
      files = files.concat(await collectFiles(full, rel));
    } else if (!SKIP_EXT.test(ent.name) && IMG_EXT.test(ent.name)) {
      files.push({ full, relDir });
    }
  }
  return files;
}

async function runPool(items, concurrency, workerFn) {
  let index = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = items[index++];
      await workerFn(current.full, current.relDir);
    }
  });
  await Promise.all(workers);
}

(async () => {
  console.log("🎨 Starting Super Crown Parallel High-Fidelity Gallery Optimization Pipeline...\n");
  const t0 = Date.now();
  const allFiles = await collectFiles(SRC_DIR);
  totalImages = allFiles.length;
  console.log(`Found ${totalImages} source images. Processing with 6 concurrent workers...\n`);

  await runPool(allFiles, 6, processImage);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

  console.log(`\n========================================`);
  console.log(`Optimization Completed in ${elapsed}s`);
  console.log(`Original Images: ${totalImages}`);
  console.log(`Generated Files: ${generatedFiles}`);
  console.log(`Skipped / Cached Files: ${skippedFiles}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total Original Raw Size: ${(totalOriginalBytes / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`========================================\n`);
})();
