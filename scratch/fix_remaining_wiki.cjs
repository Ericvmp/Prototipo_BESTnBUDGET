const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { pipeline } = require('stream/promises');

const remainingMappings = [
  { name: "Gas Mine", url: "https://arcraiders.wiki/w/images/c/ce/Gas_Mine.png" },
  { name: "Pulse Mine", url: "https://arcraiders.wiki/w/images/thumb/a/af/Pulse_Mine.png/348px-Pulse_Mine.png.webp" },
  { name: "Lure Grenade", url: "https://arcraiders.wiki/w/images/thumb/7/77/Lure_Grenade.png/348px-Lure_Grenade.png.webp" },
  { name: "Gas Grenade", url: "https://arcraiders.wiki/w/images/f/fe/Gas_Grenade.png" },
  { name: "Vita Spray", url: "https://arcraiders.wiki/w/images/thumb/1/1d/Vita_Spray.png/348px-Vita_Spray.png.webp" },
  { name: "Surge Shield Recharger", url: "https://arcraiders.wiki/w/images/thumb/c/c9/Surge_Shield_Recharger.png/348px-Surge_Shield_Recharger.png.webp" },
  { name: "Adrenaline Shot", url: "https://arcraiders.wiki/w/images/1/1b/Adrenaline_Shot.png" },
  { name: "Bandage", url: "https://arcraiders.wiki/w/images/0/0c/Bandage.png" }
];

const itemsDir = path.join(__dirname, '../public/images/items');

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

async function run() {
  const nameToLocal = {};
  for (const m of remainingMappings) {
    // Determine filename - use .png for all or keep .webp if it is webp? 
    // The user provided some webp thumb URLs. I'll save them as they are but name them consistently.
    const ext = m.url.includes('.webp') ? '.webp' : '.png';
    const filename = m.name.replace(/ /g, '_') + ext;
    
    console.log(`Downloading ${m.name}...`);
    const success = await downloadImage(m.url, filename);
    if (success) {
      nameToLocal[m.name] = `/images/items/${filename}`;
    }
  }

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
        if (nameToLocal[itemName]) {
          for (const urlProp of urlProps) {
             replacements.push({
              start: urlProp.initializer.getStart(),
              end: urlProp.initializer.getEnd(),
              newText: `"${nameToLocal[itemName]}"`
            });
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  replacements.sort((a, b) => b.start - a.start);
  let newCode = code;
  for (const rep of replacements) {
    newCode = newCode.slice(0, rep.start) + rep.newText + newCode.slice(rep.end);
  }

  fs.writeFileSync('data.ts', newCode);
  console.log(`Done! Updated ${replacements.length} properties with Wiki assets.`);
}

run();
