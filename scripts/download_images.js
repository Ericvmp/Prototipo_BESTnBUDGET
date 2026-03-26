import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const weapons = [
  'Hullcracker',
  'Tempest',
  'Rattler',
  'Vulcano',
  'Arpeggio',
  'Bobcat',
  'Hairpin'
];

async function downloadImages() {
  const dir = path.join('public', 'images', 'weapons');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let dataTs = fs.readFileSync('data.ts', 'utf-8');

  for (const name of weapons) {
    const urlName = encodeURIComponent(name.replace(/ /g, '_'));
    const url = `https://arcraiders.wiki/wiki/Special:FilePath/${urlName}.png`;
    
    try {
      console.log(`Downloading ${name}...`);
      const res = await fetch(url, { headers: { 'User-Agent': 'Node.js' } });
      
      if (res.ok && res.headers.get('content-type')?.startsWith('image/')) {
        const dest = path.join(dir, `${name.replace(/ /g, '_')}.png`);
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`Saved ${dest}`);

        // Update data.ts to use the local image instead of the remote URL or missing URL
        const localUrl = `/images/weapons/${name.replace(/ /g, '_')}.png`;
        const regex = new RegExp(`"name":"${name}",(.*?)"imageUrl":"[^"]+"`);
        if (regex.test(dataTs)) {
          dataTs = dataTs.replace(regex, `"name":"${name}",$1"imageUrl":"${localUrl}"`);
        } else {
          // If it doesn't have imageUrl at all (stripped by my previous script)
          const regexNoImage = new RegExp(`"name":"${name}"(,[^}]*?)}`);
          if (regexNoImage.test(dataTs)) {
            dataTs = dataTs.replace(regexNoImage, `"name":"${name}","imageUrl":"${localUrl}"$1}`);
          }
        }
      } else {
        console.log(`Failed to get valid image for ${name}: HTTP ${res.status}`);
      }
    } catch (e) {
      console.log(`Error downloading ${name}: ${e.message}`);
    }
  }

  // Also fix Bettina while we are here:
  const bettinaUrl = `https://arcraiders.wiki/wiki/Special:FilePath/Bettina.png`;
  try {
     const res2 = await fetch(bettinaUrl);
     if (res2.ok && res2.headers.get('content-type')?.startsWith('image/')) {
        const d = path.join(dir, 'Bettina.png');
        const b = await res2.arrayBuffer();
        fs.writeFileSync(d, Buffer.from(b));
        dataTs = dataTs.replace(/"name":"Bettina"(,[^}]*?)}/, `"name":"Bettina","imageUrl":"/images/weapons/Bettina.png"$1}`);
     }
  } catch (e) {}

  fs.writeFileSync('data.ts', dataTs);
  console.log('Update complete.');
}

downloadImages();
