import fs from 'fs';

let text = fs.readFileSync('data.ts', 'utf-8');

async function processArray(dataStr, arrayName) {
  // We can just execute the extraction and cleanup on the text file.
  // Actually, since it's a TS file exporting variables, parsing it dynamically is hard.
  // Instead, let's just do a pass for resolving image URLs line by line.
  const lines = text.split('\n');
  let currentArray = null;
  let seenNames = new Set();
  let duplicateCount = 0;
  let fixedUrls = 0;
  let removedUrls = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Detect array boundaries
    if (line.includes('export const WEAPONS_DATA: Weapon[] = [')) { currentArray = 'weapons'; seenNames.clear(); }
    else if (line.includes('export const MODS_DATA: Modification[] = [')) { currentArray = 'mods'; seenNames.clear(); }
    else if (line.includes('export const AUGMENTS_DATA: Augment[] = [')) { currentArray = 'augments'; seenNames.clear(); }
    else if (line.includes('export const THROWABLES_DATA: Throwable[] = [')) { currentArray = 'throwables'; seenNames.clear(); }

    if (currentArray && line.includes('"name":')) {
      const nameMatch = line.match(/"name":"([^"]+)"/);
      if (nameMatch) {
        const name = nameMatch[1];
        if (seenNames.has(name)) {
          // This is a duplicate (in my injected single-line format)
          // Let's comment it out or delete it!
          lines[i] = '// DUPLICATE REMOVED: ' + line;
          duplicateCount++;
          continue;
        } else {
          seenNames.add(name);
        }
      }
    }

    // Resolve URLs
    if (line.includes('"imageUrl":"https://arcraiders.wiki/wiki/Special:FilePath/')) {
      const urlMatch = line.match(/"imageUrl":"([^"]+)"/);
      if (urlMatch) {
        const originalUrl = urlMatch[1];
        try {
          const res = await fetch(originalUrl, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');
          if (res.url.includes('/w/images/') && contentType && contentType.startsWith('image/')) {
            // Valid resolved image!
            lines[i] = line.replace(originalUrl, res.url);
            fixedUrls++;
          } else {
            // Broken or HTML fallback! Remove imageUrl property entirely.
            // My injected lines look like: "name":"X","imageUrl":"Y",...
            lines[i] = line.replace(/,"imageUrl":"[^"]+"/, '');
            removedUrls++;
          }
        } catch (e) {
          lines[i] = line.replace(/,"imageUrl":"[^"]+"/, '');
          removedUrls++;
        }
      }
    }
  }

  fs.writeFileSync('data.ts', lines.join('\n'));
  console.log(`Cleanup complete! Removed ${duplicateCount} duplicates. Resolved ${fixedUrls} real URLs. Striped ${removedUrls} broken URLs.`);
}

processArray();
