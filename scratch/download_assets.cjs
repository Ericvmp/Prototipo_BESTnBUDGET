const fs = require('fs');
const path = require('path');

const urls = {
  'Extended_Barrel_II.webp': 'https://cdn.metaforge.app/arc-raiders/icons/extended-barrel-ii.webp',
  'Extended_Barrel_II_Blueprint.webp': 'https://cdn.metaforge.app/arc-raiders/icons/extended-barrel-ii-blueprint.webp'
};

const dir = path.join('public', 'images', 'items');

async function download() {
  for (const [filename, url] of Object.entries(urls)) {
    const dest = path.join(dir, filename);
    console.log(`Downloading ${url} to ${dest}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(dest, buffer);
      console.log(`Successfully downloaded ${filename}`);
    } catch (err) {
      console.error(`Failed to download ${filename}:`, err);
    }
  }
}

download();
