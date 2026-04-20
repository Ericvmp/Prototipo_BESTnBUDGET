const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { pipeline } = require('stream/promises');

const weaponMappings = [
  { name: "Anvil", url: "https://arcraiders.wiki/w/images/0/00/Anvil-Level1.png" },
  { name: "Aphelion", url: "https://arcraiders.wiki/w/images/8/88/Aphelion.png" },
  { name: "Arpeggio", url: "https://arcraiders.wiki/w/images/6/6c/Arpeggio-Level1.png" },
  { name: "Bettina", url: "https://arcraiders.wiki/w/images/a/ac/Bettina.png" },
  { name: "Bobcat", url: "https://arcraiders.wiki/w/images/3/36/Bobcat-Level1.png" },
  { name: "Burletta", url: "https://arcraiders.wiki/w/images/d/d4/Burletta-Level1.png" },
  { name: "Canto", url: "https://arcraiders.wiki/w/images/8/83/Canto-Level1.png" },
  { name: "Dolabra", url: "https://arcraiders.wiki/w/images/0/07/Dolabra-Level1.png" },
  { name: "Equalizer", url: "https://arcraiders.wiki/w/images/9/96/Equalizer.png" },
  { name: "Ferro", url: "https://arcraiders.wiki/w/images/b/b0/Ferro-Level1.png" },
  { name: "Hairpin", url: "https://arcraiders.wiki/w/images/6/65/Hairpin-Level1.png" },
  { name: "Hullcracker", url: "https://arcraiders.wiki/w/images/b/ba/Hullcracker-Level1.png" },
  { name: "Il Toro", url: "https://arcraiders.wiki/w/images/5/50/Il_Toro-Level1.png" },
  { name: "Jupiter", url: "https://arcraiders.wiki/w/images/6/68/Jupiter.png" },
  { name: "Kettle", url: "https://arcraiders.wiki/w/images/c/c1/Kettle-Level1.png" },
  { name: "Osprey", url: "https://arcraiders.wiki/w/images/a/ae/Osprey-Level1.png" },
  { name: "Rattler", url: "https://arcraiders.wiki/w/images/b/be/Rattler-Level1.png" },
  { name: "Renegade", url: "https://arcraiders.wiki/w/images/b/b5/Renegade-Level1.png" },
  { name: "Stitcher", url: "https://arcraiders.wiki/w/images/3/3a/Stitcher-Level1.png" },
  { name: "Tempest", url: "https://arcraiders.wiki/w/images/c/c9/Tempest-Level1.png" },
  { name: "Torrente", url: "https://arcraiders.wiki/w/images/1/1e/Torrente-Level1.png" },
  { name: "Venator", url: "https://arcraiders.wiki/w/images/b/b4/Venator-Level1.png" },
  { name: "Vulcano", url: "https://arcraiders.wiki/w/images/d/da/Vulcano-Level1.png" }
];

const weaponsDir = path.join(__dirname, '../public/images/weapons');
if (!fs.existsSync(weaponsDir)) fs.mkdirSync(weaponsDir, { recursive: true });

async function downloadImage(url, filename) {
  const filePath = path.join(weaponsDir, filename);
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
  for (const w of weaponMappings) {
    const filename = `${w.name}.png`;
    console.log(`Downloading ${w.name}...`);
    const success = await downloadImage(w.url, filename);
    if (success) {
      nameToLocal[w.name] = `/images/weapons/${filename}`;
    }
  }

  // Update data.ts using AST
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
          // For weapons, we match the name but also check if the imageUrl starts with /images/weapons
          if (pName === 'name') identifyingProp = prop;
          else if (pName === 'imageUrl') urlProps.push(prop);
        }
      }

      if (identifyingProp && ts.isStringLiteral(identifyingProp.initializer)) {
        const itemName = identifyingProp.initializer.text;
        // Check if the item name is one of our weapons (allowing for "Weapon Name II", "Weapon Name III" etc)
        const baseName = itemName.split(' ').slice(0, -1).join(' ') || itemName;
        const matchingWeapon = weaponMappings.find(w => w.name === baseName || w.name === itemName);
        
        if (matchingWeapon && nameToLocal[matchingWeapon.name]) {
          for (const urlProp of urlProps) {
            replacements.push({
              start: urlProp.initializer.getStart(),
              end: urlProp.initializer.getEnd(),
              newText: `"${nameToLocal[matchingWeapon.name]}"`
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
  console.log(`Done! Updated ${replacements.length} weapon images.`);
}

run();
