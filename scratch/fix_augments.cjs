const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { pipeline } = require('stream/promises');

const augmentsMappings = [
  { name: "Tactical Mk. 3 (Healing)", url: "https://arcraiders.wiki/w/images/1/12/Tactical_Mk._3_%28Healing%29.png" },
  { name: "Tactical Mk. 3 (Revival)", url: "https://arcraiders.wiki/w/images/e/e0/Tactical_Mk._3_%28Revival%29.png" },
  { name: "Combat Mk. 1", url: "https://arcraiders.wiki/w/images/thumb/1/14/Combat_Mk._1.png/348px-Combat_Mk._1.png.webp" },
  { name: "Looting Mk. 1", url: "https://arcraiders.wiki/w/images/thumb/2/27/Looting_Mk._1.png/348px-Looting_Mk._1.png.webp" },
  { name: "Tactical Mk. 1", url: "https://arcraiders.wiki/w/images/thumb/1/18/Tactical_Mk._1.png/348px-Tactical_Mk._1.png.webp" }
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
  for (const m of augmentsMappings) {
    const ext = m.url.includes('.webp') ? '.webp' : '.png';
    // Remove parentheses from filename to be safe, or keep them if needed. 
    // I'll keep them but escaped in the URL.
    const filename = m.name.replace(/ /g, '_').replace('(', '').replace(')', '') + ext;
    
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
  console.log(`Done! Updated ${replacements.length} Augment properties.`);
}

run();
