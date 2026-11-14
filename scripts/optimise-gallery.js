/**
 * Gallery image optimisation script
 * Generates two WebP versions per image:
 *   - thumb:  max 600 × 500 px, quality 72  → used in bento grid
 *   - full:   max 1400 × 1200 px, quality 82 → used in lightbox
 *
 * Output dir: public/gallery-opt/<category>/<basename>-thumb.webp
 *                                            <basename>-full.webp
 *
 * Skips already-converted files so reruns are fast.
 */

const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const SRC_DIR  = path.join(__dirname, "../public/gallery");
const OUT_DIR  = path.join(__dirname, "../public/gallery-opt");
const SKIP_EXT = /\.(mov|heic)$/i;
const IMG_EXT  = /\.(jpe?g|png|gif|webp|tiff?)$/i;

const SIZES = [
  { suffix: "thumb", width: 600,  height: 500,  quality: 72  },
  { suffix: "full",  width: 1400, height: 1200, quality: 82  },
];

let total = 0, skipped = 0, converted = 0, errors = 0;

async function processFile(srcPath, relDir) {
  const ext  = path.extname(srcPath);
  const base = path.basename(srcPath, ext);
  const outDir = path.join(OUT_DIR, relDir);
  fs.mkdirSync(outDir, { recursive: true });

  for (const { suffix, width, height, quality } of SIZES) {
    const outFile = path.join(outDir, `${base}-${suffix}.webp`);
    if (fs.existsSync(outFile)) { skipped++; continue; }

    try {
      await sharp(srcPath, { failOn: "none" })
        .rotate()                          // auto-orient from EXIF
        .resize(width, height, { fit: "inside", withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toFile(outFile);
      converted++;
      process.stdout.write(`  ✓ ${path.relative(OUT_DIR, outFile)}\n`);
    } catch (e) {
      errors++;
      process.stderr.write(`  ✗ ${srcPath}: ${e.message}\n`);
    }
  }
}

async function walk(dir, relDir = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const rel  = path.join(relDir, ent.name);
    if (ent.isDirectory()) {
      await walk(full, rel);
    } else if (!SKIP_EXT.test(ent.name) && IMG_EXT.test(ent.name)) {
      total++;
      await processFile(full, relDir);
    }
  }
}

(async () => {
  console.log("🖼  Optimising gallery images …\n");
  const t0 = Date.now();
  await walk(SRC_DIR);
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\nDone in ${secs}s — ${total} images, ${converted} converted, ${skipped} skipped, ${errors} errors`);
})();

