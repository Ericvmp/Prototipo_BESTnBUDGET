const fs = require('fs');
const https = require('https');

let dataTsContent = fs.readFileSync('data.ts', 'utf8');

// Use the same extraction logic from find_missing_images to build the list
const regex = /name:\s*['"](.*?)['"].*?imageUrl:\s*['"](.*?)['"]/gs;
let match;
const missingImagesMap = new Map();

const placeholderKeywords = [
  'Wires', 'Metal_Parts', 'Rubber_Parts', 'Plastic_Parts', 
  'Electrical_Components', 'Power_Rod', 'Advanced_electrical_components',
  'Advanced_Electrical_Components', 'Unusable_Weapon'
];

while ((match = regex.exec(dataTsContent)) !== null) {
  const name = match[1];
  const url = match[2];
  
  if (url.includes('arcraiders.wiki')) continue;
  
  const isPlaceholder = placeholderKeywords.some(kw => url.includes(kw));
  const nameToMatch = name.replace(/['"]/g, '').replace(/\s+/g, '_');
  const hasLocalAssetMatch = url.includes(nameToMatch);
  
  if (isPlaceholder || !hasLocalAssetMatch) {
     missingImagesMap.set(name, true);
  }
}

// Additional manual items found in the previous search
const extraItems = [
  "Simple Gun Parts", "Steel Spring", "Adv ARC Powercell", "Electrical Components",
  "ARC Alloy", "Chemicals", "Fabric", "Power Rod", "Adv Electrical Components",
  "Adv Mechanical Components", "Crude Explosives", "Oil", "Mechanical Components",
  "Magnetic Accelerator", "Explosive Compound", "Antiseptic", "Durable Cloth",
  "Processor", "Rope", "Canister", "Pulse Mine Blueprint",
  "Soap", "Smoke Grenade", "Heavy Fuze Grenade", "ARC Tick",
  "Queen Reactor", "Matriarch Reactor", "Medical Supply Box", 
  "Shrapnel Grenade", "Seeker Grenade", "Blaze Grenade", "Explosive Mine",
  "Deadline", "Wolfpack", "ARC Rocketeer", "ARC Bastion", "ARC Tank", "Polluted Air Filter"
];

for (const extra of extraItems) {
  missingImagesMap.set(extra, true);
}

const items = Array.from(missingImagesMap.keys());

async function fetchWikiImage(name) {
  // Try several name formatting patterns because the wiki is inconsistent
  const patterns = [
    name.replace(/ /g, '_').replace(/'/g, '%27'),
    name.replace(/ /g, '_'),
    name.replace(/ /g, '_').toLowerCase()
  ];
  
  for (const formattedName of patterns) {
    const url = `https://arcraiders.wiki/wiki/File:${formattedName}.png`;
    
    try {
      const resultUrl = await new Promise((resolve) => {
        https.get(url, (res) => {
          if (res.statusCode === 404) {
            resolve(null);
            return;
          }
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            const exactRegex = new RegExp(`https://arcraiders\\.wiki/w/images/[a-z0-9]/[a-z0-9]{2}/${formattedName.replace(/%27/g, '_')}\\.png`, 'i');
            const exactMatch = data.match(exactRegex);
            if (exactMatch) resolve(exactMatch[0]);
            else {
              const genericRegex = /https:\/\/arcraiders\.wiki\/w\/images\/[a-z0-9]\/[a-z0-9]{2}\/[^"]+\.png/i;
              const genericMatch = data.match(genericRegex);
              resolve(genericMatch ? genericMatch[0] : null);
            }
          });
        }).on('error', () => resolve(null));
      });
      if (resultUrl) return resultUrl;
    } catch (e) {}
  }
  return null;
}

async function processItems() {
  console.log(`Processing ${items.length} items to fetch from Wiki...`);
  let updatedCount = 0;
  
  for (const item of items) {
    const imageUrl = await fetchWikiImage(item);
    
    if (imageUrl) {
      const itemRegex = new RegExp(`(name:\\s*['"]${item.replace(/'/g, "\\\\'")}(?:.*?)['"].*?imageUrl:\\s*['"])(.*?)(['"])`, 'g');
      
      let matched = false;
      dataTsContent = dataTsContent.replace(itemRegex, (match, prefix, oldUrl, suffix) => {
        matched = true;
        return `${prefix}${imageUrl}${suffix}`;
      });
      
      if (matched) {
         updatedCount++;
         console.log(`[OK] ${item} -> ${imageUrl}`);
      }
    } else {
      console.log(`[MISSING] ${item}`);
    }
  }
  
  if (updatedCount > 0) {
    fs.writeFileSync('data.ts', dataTsContent);
    console.log(`\\nSaved data.ts with updates for ${updatedCount} items.`);
  } else {
    console.log('\\nNo updates made.');
  }
}

processItems();
