const fs = require('fs');
const https = require('https');

const items = [
  "Blaze Grenade Trap",
  "Pulse Mine",
  "Light Impact Grenade",
  "Lure Grenade",
  "Heavy Shield",
  "Medium Shield",
  "Light Shield",
  "Vita Shot",
  "Sterilized Bandage",
  "Defibrillator",
  "Herbal Bandage",
  "Raider Hatch Key",
  "Surge Coil",
  "Zipline"
];

let dataTsContent = fs.readFileSync('data.ts', 'utf8');

async function fetchWikiImage(name) {
  const formattedName = name.replace(/ /g, '_').replace(/'/g, '%27');
  const url = `https://arcraiders.wiki/wiki/File:${formattedName}.png`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Look for the actual image link in the HTML
        const regex = new RegExp(`https://arcraiders\\.wiki/w/images/[a-z0-9]/[a-z0-9]{2}/${formattedName.replace(/%27/g, '_')}\\.png`, 'i');
        const match = data.match(regex);
        if (match) {
          resolve(match[0]);
        } else {
          // fallback regex for generic image links
          const genericRegex = /https:\/\/arcraiders\.wiki\/w\/images\/[a-z0-9]\/[a-z0-9]{2}\/[^"]+\.png/i;
          const genericMatch = data.match(genericRegex);
          if (genericMatch) {
             resolve(genericMatch[0]);
          } else {
             resolve(null);
          }
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function processItems() {
  let updatedCount = 0;
  for (const item of items) {
    console.log(`Fetching image for: ${item}...`);
    const imageUrl = await fetchWikiImage(item);
    
    if (imageUrl) {
      console.log(`  Found: ${imageUrl}`);
      // Find the object in data.ts with name: 'item' and replace its imageUrl
      const itemRegex = new RegExp(`(name:\\s*['"]${item.replace(/'/g, "\\\\'")}(?:.*?)['"].*?imageUrl:\\s*['"])(.*?)(['"])`, 'g');
      
      let matched = false;
      dataTsContent = dataTsContent.replace(itemRegex, (match, prefix, oldUrl, suffix) => {
        matched = true;
        return `${prefix}${imageUrl}${suffix}`;
      });
      
      if (matched) {
         updatedCount++;
         console.log(`  -> Updated in data.ts`);
      } else {
         console.log(`  -> Not found in data.ts or regex failed.`);
      }
    } else {
      console.log(`  -> No image found on wiki.`);
    }
  }
  
  if (updatedCount > 0) {
    fs.writeFileSync('data.ts', dataTsContent);
    console.log(`\\nSaved data.ts with ${updatedCount} updates.`);
  } else {
    console.log('\\nNo updates made.');
  }
}

processItems();
