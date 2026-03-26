import fs from 'fs';
import path from 'path';

const weapons = [
  'Hullcracker',
  'Tempest',
  'Rattler',
  'Vulcano',
  'Arpeggio',
  'Bobcat',
  'Hairpin'
];

async function findAndDownload() {
  const dir = path.join('public', 'images', 'weapons');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let dataTs = fs.readFileSync('data.ts', 'utf-8');

  for (const name of weapons) {
    const urlName = encodeURIComponent(name.replace(/ /g, '_'));
    const pageUrl = `https://arcraiders.wiki/wiki/${urlName}`;
    
    try {
      console.log(`Checking ${name} at ${pageUrl}...`);
      const res = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      
      // Look for the main infobox image or any large image relating to the weapon
      // Standard MediaWiki infobox image: <a href="/wiki/File:Rattler.png" class="image"><img alt="Rattler.png" src="/w/images/thumb/8/8c/Rattler.png/400px-Rattler.png.webp" ...
      
      // Find the first image src that contains the weapon name (case insensitive) and ends with png or webp
      // or just any image inside the infobox. Infobox usually has class "infobox" or "pi-image".
      
      const regex = new RegExp(`src="(/w/images/[^"]*(?:${name.replace(/ /g, '[_ ]')}|Weapons|Weapon)[^"]*\\.(?:png|webp)[^"]*)"`, 'i');
      const match = html.match(regex);
      
      if (match) {
        const imgUrl = `https://arcraiders.wiki${match[1]}`;
        console.log(`  Found image URL: ${imgUrl}`);
        
        const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer();
          // Keep it as .png or .webp depending on the URL
          const ext = imgUrl.includes('.webp') ? '.webp' : '.png';
          const dest = path.join(dir, `${name.replace(/ /g, '_')}${ext}`);
          fs.writeFileSync(dest, Buffer.from(buffer));
          console.log(`  Saved to ${dest}`);

          const localUrl = `/images/weapons/${name.replace(/ /g, '_')}${ext}`;
          const regexData = new RegExp(`"name":"${name}",(.*?)"imageUrl":"[^"]*"`);
          if (regexData.test(dataTs)) {
            dataTs = dataTs.replace(regexData, `"name":"${name}",$1"imageUrl":"${localUrl}"`);
          } else {
            const regexNoImage = new RegExp(`"name":"${name}"(,[^}]*?)}`);
            if (regexNoImage.test(dataTs)) {
              dataTs = dataTs.replace(regexNoImage, `"name":"${name}","imageUrl":"${localUrl}"$1}`);
            }
          }
        }
      } else {
         console.log(`  No image found for ${name} in HTML.`);
         // Fallback: Check if they use an ARDB format we missed?
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }

  fs.writeFileSync('data.ts', dataTs);
  console.log('Done.');
}

findAndDownload();
