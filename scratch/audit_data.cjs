const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const publicDir = path.join(__dirname, '../public');
const dataFile = path.join(__dirname, '../data.ts');

const items = [];

// Parse data.ts to get all item definitions
const code = fs.readFileSync(dataFile, 'utf8');
const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);

function visit(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const props = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        if (ts.isStringLiteral(prop.initializer)) {
          props[prop.name.text] = prop.initializer.text;
        }
      }
    }
    if (props.name && (props.imageUrl || props.materialImageUrl)) {
      items.push({
        name: props.name,
        imageUrl: props.imageUrl || props.materialImageUrl,
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1
      });
    }
  }
  ts.forEachChild(node, visit);
}
visit(sourceFile);

console.log(`Auditing ${items.length} item definitions...`);

const duplicates = {};
const brokenLinks = [];

items.forEach(item => {
  // Check for broken links
  const relativePath = item.imageUrl.startsWith('/') ? item.imageUrl.slice(1) : item.imageUrl;
  const absolutePath = path.join(publicDir, relativePath);
  
  if (!fs.existsSync(absolutePath)) {
    brokenLinks.push(item);
  }

  // Check for duplicates (same name, different image or just accidental duplicate)
  if (!duplicates[item.name]) {
    duplicates[item.name] = [];
  }
  duplicates[item.name].push(item);
});

console.log('\n--- BROKEN LINKS ---');
if (brokenLinks.length === 0) {
  console.log('None found!');
} else {
  brokenLinks.forEach(item => {
    console.log(`[Line ${item.line}] ${item.name}: ${item.imageUrl} (NOT FOUND)`);
  });
}

console.log('\n--- POTENTIAL DUPLICATES ---');
let dupFound = false;
Object.keys(duplicates).forEach(name => {
  if (duplicates[name].length > 1) {
    // Only report if they are not legitimate variants (like I, II, III which have different names)
    // But since we are checking exact name equality, these ARE duplicates.
    // NOTE: Weapons and Mods often have variants, but they should have different names in the 'name' field.
    
    // Actually, in LOOT_DATA, names are repeated because they are ingredients in different recipes.
    // So we only care if they have DIFFERENT images for the same name.
    const images = new Set(duplicates[name].map(d => d.imageUrl));
    if (images.size > 1) {
      console.log(`${name} has multiple different images:`);
      duplicates[name].forEach(d => console.log(`  [Line ${d.line}] ${d.imageUrl}`));
      dupFound = true;
    }
  }
});
if (!dupFound) console.log('None found!');
