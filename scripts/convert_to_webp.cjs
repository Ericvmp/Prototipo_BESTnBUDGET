/**
 * convert_to_webp.cjs
 * Converts all PNG/JPG images in public/images to WebP (quality 75),
 * deletes originals, and updates all .ts/.tsx/.css/.html references.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

// Extensions to convert
const CONVERT_EXTS = ['.png', '.jpg', '.jpeg'];

// Source file extensions to update references in
const SOURCE_EXTS = ['.ts', '.tsx', '.css', '.html', '.json'];

// Directories to scan for source files (excluding node_modules, dist, .git)
const SOURCE_DIRS = [ROOT].map(d => d);
const EXCLUDE_DIRS = ['node_modules', 'dist', '.git', 'public'];

// ─── Step 1: Collect all image files to convert ───────────────────────────────
function collectImages(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectImages(fullPath));
    } else if (CONVERT_EXTS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

// ─── Step 2: Collect source files to update references ───────────────────────
function collectSourceFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.includes(entry.name)) continue;
      files = files.concat(collectSourceFiles(fullPath));
    } else if (SOURCE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

// ─── Step 3: Update references in a file ─────────────────────────────────────
function updateReferences(filePath, renames) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [oldName, newName] of renames) {
    // Match both the bare filename and URL-encoded versions
    const patterns = [
      // .png / .jpg / .jpeg literal
      oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    ];
    for (const pat of patterns) {
      const regex = new RegExp(pat, 'g');
      if (regex.test(content)) {
        content = content.replace(new RegExp(pat, 'g'), newName);
        changed = true;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔍 Scanning images in:', IMAGES_DIR);
  const images = collectImages(IMAGES_DIR);
  console.log(`   Found ${images.length} image(s) to convert.\n`);

  // Track size changes
  let totalOriginalBytes = 0;
  let totalConvertedBytes = 0;
  const report = [];

  // Build rename map for reference updating
  // key = old filename (e.g. "Anvil.png"), value = new filename (e.g. "Anvil.webp")
  const renames = [];

  // Also track already-webp duplicates: if Foo.webp already exists alongside Foo.png,
  // we skip converting (it was manually done) but still update references.
  const alreadyWebp = new Set();

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const baseName = path.basename(imgPath, ext);
    const dir = path.dirname(imgPath);
    const webpPath = path.join(dir, baseName + '.webp');

    const origSize = fs.statSync(imgPath).size;
    totalOriginalBytes += origSize;

    // Skip if a .webp with same name already exists (was manually converted)
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping (webp exists): ${path.basename(imgPath)}`);
      const webpSize = fs.statSync(webpPath).size;
      totalConvertedBytes += webpSize;
      // Still register rename for reference updating
      renames.push([path.basename(imgPath), baseName + '.webp']);
      // Delete the original PNG since webp already exists
      fs.unlinkSync(imgPath);
      report.push({
        file: path.relative(IMAGES_DIR, imgPath),
        origKB: (origSize / 1024).toFixed(1),
        newKB: (webpSize / 1024).toFixed(1),
        saving: (((origSize - webpSize) / origSize) * 100).toFixed(1),
        status: 'skipped (webp existed)',
      });
      alreadyWebp.add(baseName);
      continue;
    }

    try {
      // Convert with sharp
      await sharp(imgPath)
        .webp({ quality: 75, lossless: false })
        .toFile(webpPath);

      const newSize = fs.statSync(webpPath).size;
      totalConvertedBytes += newSize;

      const savingPct = (((origSize - newSize) / origSize) * 100).toFixed(1);
      console.log(
        `✅ ${path.basename(imgPath).padEnd(50)} ${(origSize/1024).toFixed(0).padStart(7)} KB → ${(newSize/1024).toFixed(0).padStart(6)} KB  (-${savingPct}%)`
      );

      report.push({
        file: path.relative(IMAGES_DIR, imgPath),
        origKB: (origSize / 1024).toFixed(1),
        newKB: (newSize / 1024).toFixed(1),
        saving: savingPct,
        status: 'converted',
      });

      renames.push([path.basename(imgPath), baseName + '.webp']);

      // Delete original
      fs.unlinkSync(imgPath);
    } catch (err) {
      console.error(`❌ Failed: ${imgPath}`, err.message);
      totalConvertedBytes += origSize; // count original size if failed
      report.push({
        file: path.relative(IMAGES_DIR, imgPath),
        origKB: (origSize / 1024).toFixed(1),
        newKB: '-',
        saving: '-',
        status: 'FAILED: ' + err.message,
      });
    }
  }

  // ─── Update source file references ──────────────────────────────────────────
  console.log('\n\n🔧 Updating source file references...');
  const sourceFiles = collectSourceFiles(ROOT);
  let updatedFiles = 0;
  for (const sf of sourceFiles) {
    if (updateReferences(sf, renames)) {
      console.log(`   ✏️  Updated: ${path.relative(ROOT, sf)}`);
      updatedFiles++;
    }
  }
  console.log(`   ${updatedFiles} source file(s) updated.\n`);

  // ─── Final Report ────────────────────────────────────────────────────────────
  const totalOrigMB = (totalOriginalBytes / 1024 / 1024).toFixed(2);
  const totalNewMB = (totalConvertedBytes / 1024 / 1024).toFixed(2);
  const totalSavedMB = ((totalOriginalBytes - totalConvertedBytes) / 1024 / 1024).toFixed(2);
  const totalSavedPct = (((totalOriginalBytes - totalConvertedBytes) / totalOriginalBytes) * 100).toFixed(1);

  console.log('═'.repeat(70));
  console.log('📊 CONVERSION REPORT');
  console.log('═'.repeat(70));
  console.log(`  Files processed : ${images.length}`);
  console.log(`  Source files updated: ${updatedFiles}`);
  console.log(`  Original total  : ${totalOrigMB} MB`);
  console.log(`  Converted total : ${totalNewMB} MB`);
  console.log(`  Total saved     : ${totalSavedMB} MB  (-${totalSavedPct}%)`);
  console.log('═'.repeat(70));

  // Write JSON report
  const reportPath = path.join(ROOT, 'webp_conversion_report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
      filesProcessed: images.length,
      sourceFilesUpdated: updatedFiles,
      originalTotalMB: totalOrigMB,
      convertedTotalMB: totalNewMB,
      savedMB: totalSavedMB,
      savedPercent: totalSavedPct,
    },
    files: report,
  }, null, 2), 'utf8');
  console.log(`\n📄 Full report saved to: webp_conversion_report.json`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
