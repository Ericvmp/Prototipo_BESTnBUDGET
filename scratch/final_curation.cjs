const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { pipeline } = require('stream/promises');

const missingItems = [
  { name: "Vita Spray", url: "https://arcraiders.wiki/wiki/Special:FilePath/Vita_Spray.png" },
  { name: "Soap", url: "https://arcraiders.wiki/wiki/Special:FilePath/Soap.png" },
  { name: "Bleach", url: "https://arcraiders.wiki/wiki/Special:FilePath/Bleach.png" },
  { name: "Power Drill", url: "https://arcraiders.wiki/wiki/Special:FilePath/Power_Drill.png" },
];

const publicDir = path.join(__dirname, '../public');
const itemsDir = path.join(publicDir, 'images/items');

async function downloadImage(url, filename) {
  const filePath = path.join(itemsDir, filename);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const dest = fs.createWriteStream(filePath);
    await pipeline(response.body, dest);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

// Map of item name -> best local URL
const bestMappings = {};

function addMapping(name, relPath) {
  bestMappings[name] = relPath;
}

// Generic placeholders we want to override if possible
const placeholders = new Set([
  '/images/items/Plastic_Parts.png',
  '/images/items/Mechanical_Components.png',
  '/images/items/Electrical_Components.png',
  '/images/items/Canister.png',
  '/images/items/Fabric.png',
  '/images/items/Wires.png',
  '/images/items/Chemicals.png',
  '/images/items/Metal_Parts.png',
  '/images/items/Rubber_Parts.png'
]);

async function run() {
  console.log("Downloading missing images...");
  for (const m of missingItems) {
    let filename = m.name.replace(/ /g, '_') + '.png';
    await downloadImage(m.url, filename);
    addMapping(m.name, `/images/items/${filename}`);
  }

  // Add Trigger 'Nade specific fix
  addMapping("Trigger 'Nade", "/images/items/Trigger_'Nade.png");
  addMapping("Trigger'nade", "/images/items/Trigger_'Nade.png");

  // Crawl the public directory to find all available specific images
  const folders = ['images/items', 'images/loot', 'images/weapons', 'images/materials'];
  folders.forEach(folder => {
    const dirPath = path.join(publicDir, folder);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (file.endsWith('.png')) {
          const itemName = file.replace(/_/g, ' ').replace('.png', '');
          const relPath = `/${folder}/${file}`;
          
          // Only add to mappings if we don't already have a "best" one
          // Prefer images/items over others
          if (!bestMappings[itemName] || folder === 'images/items') {
             bestMappings[itemName] = relPath;
          }
        }
      });
    }
  });

  console.log(`Discovered ${Object.keys(bestMappings).length} potential specific mappings.`);

  // Update data.ts
  const code = fs.readFileSync('data.ts', 'utf8');
  const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);
  const replacements = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      let identifyingProp = null;
      const urlProps = [];

      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const pName = prop.name.text;
          if (pName === 'name' || pName === 'material') identifyingProp = prop;
          else if (pName === 'imageUrl' || pName === 'materialImageUrl' || pName === 'iconUrl') {
            urlProps.push(prop);
          }
        }
      }

      if (identifyingProp && ts.isStringLiteral(identifyingProp.initializer)) {
        const itemName = identifyingProp.initializer.text;
        const bestUrl = bestMappings[itemName];
        
        if (bestUrl) {
          for (const urlProp of urlProps) {
            const currentUrl = ts.isStringLiteral(urlProp.initializer) ? urlProp.initializer.text : "";
            
            // UNIFY LOGIC:
            // 1. If it's a broken link, replace it.
            // 2. If it's a generic placeholder, replace it with the specific one.
            // 3. If it's inconsistent with the "best" one, unify it.
            
            const isPlaceholder = placeholders.has(currentUrl);
            const isBroken = currentUrl.includes('/1d/') || currentUrl.includes('NOT FOUND'); // simplified check
            
            if (currentUrl !== bestUrl) {
               replacements.push({
                start: urlProp.initializer.getStart(),
                end: urlProp.initializer.getEnd(),
                newText: `"${bestUrl}"`
              });
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  replacements.sort((a, b) => b.start - a.start);
  let newCode = code;
  let count = 0;
  for (const rep of replacements) {
    newCode = newCode.slice(0, rep.start) + rep.newText + newCode.slice(rep.end);
    count++;
  }

  fs.writeFileSync('data.ts', newCode);
  console.log(`Done! Unified and fixed ${count} properties.`);
}

run();
