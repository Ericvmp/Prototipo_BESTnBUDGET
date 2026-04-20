const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const publicDir = path.join(__dirname, '../public');
const dataFile = path.join(__dirname, '../data.ts');

const code = fs.readFileSync(dataFile, 'utf8');
const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);

// Pre-scan public folder for all available images
const bestImages = {};
const folders = ['images/items', 'images/loot', 'images/weapons', 'images/materials'];
folders.forEach(folder => {
  const dirPath = path.join(publicDir, folder);
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      if (file.endsWith('.png')) {
        const name = file.replace(/_/g, ' ').replace('.png', '');
        const relPath = `/${folder}/${file}`;
        if (!bestImages[name] || folder === 'images/items') {
          bestImages[name] = relPath;
        }
      }
    });
  }
});

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
      const bestUrl = bestImages[itemName];
      
      if (bestUrl) {
        for (const urlProp of urlProps) {
          const currentUrl = ts.isStringLiteral(urlProp.initializer) ? urlProp.initializer.text : "";
          if (currentUrl !== bestUrl) {
            replacements.push({
              start: urlProp.initializer.getStart(),
              end: urlProp.initializer.getEnd(),
              newText: `"${bestUrl}"`
            });
          }
        }
      } else {
        // Check for specific broken paths to clean up
        for (const urlProp of urlProps) {
          const currentUrl = ts.isStringLiteral(urlProp.initializer) ? urlProp.initializer.text : "";
          if (currentUrl.includes('/1d/') || currentUrl.includes('NOT FOUND')) {
             // Fallback to a placeholder if it's broken
             replacements.push({
                start: urlProp.initializer.getStart(),
                end: urlProp.initializer.getEnd(),
                newText: `"/images/items/Unusable_Weapon.png"`
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
for (const rep of replacements) {
  newCode = newCode.slice(0, rep.start) + rep.newText + newCode.slice(rep.end);
}

fs.writeFileSync(dataFile, newCode);
console.log(`Final audit cleanup complete. Unified ${replacements.length} image paths.`);
