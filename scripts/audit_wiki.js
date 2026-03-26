import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data.ts');
let tsContent = fs.readFileSync(dataPath, 'utf-8');

// A simple regex to extract WEAPONS_DATA json-like string.
// This is fragile but okay for an audit script.
// Actually, it's easier to dynamically import data.ts or just parse the JS object?
// Let's just use `ts-node`? No, let's just cheat and regex out object names.
const weaponNames = [];
const matchRegex = /name:\s*['"]([^'"]+)['"]/g;
let m;
// We'll just take a sample of 5 weapons to see if the wiki has the dat
const sample = ['Ferro', 'Rattler', 'Bettina', 'Tempest', 'Hullcracker'];

async function checkWiki() {
  for (const name of sample) {
    try {
      const formattedName = name.replace(/ /g, '_');
      const url = `https://arcraiders.wiki/api.php?action=parse&page=${formattedName}&format=json&prop=text`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        }
      });
      const data = await res.json();
      if (data && data.parse && data.parse.text) {
        const html = data.parse.text['*'];
        
        // Extract rarity from infobox
        // <th scope="row" class="infobox-label">Rarity</th><td class="infobox-data">Rare</td>
        const rarityMatch = html.match(/>Rarity<\/th>\s*<td[^>]*>([^<]+)<\/td>/i);
        const rarity = rarityMatch ? rarityMatch[1].trim() : 'Unknown';
        
        console.log(`Weapon: ${name} -> Wiki Rarity: ${rarity}`);

        // Try to see if there is any "Crafting" or "Materials" keyword
        if (html.toLowerCase().includes('crafting') || html.toLowerCase().includes('materials')) {
          console.log(`  -> HAS CRAFTING OR MATERIALS MENTION!`);
        }
      } else {
         console.log(`Weapon: ${name} -> Page not found on Wiki.`);
      }
    } catch (e) {
      console.log(`Error checking ${name}: ${e.message}`);
    }
  }
}

checkWiki();
