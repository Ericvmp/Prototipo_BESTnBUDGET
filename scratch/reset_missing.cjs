const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const dataFile = path.join(__dirname, '../data.ts');
const code = fs.readFileSync(dataFile, 'utf8');
const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);

const replacements = [];

function visit(node) {
  if (ts.isObjectLiteralExpression(node)) {
    let identifyingProp = null;
    let imageUrlProp = null;

    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        if (prop.name.text === 'name') identifyingProp = prop;
        else if (prop.name.text === 'imageUrl') imageUrlProp = prop;
      }
    }

    if (identifyingProp && ts.isStringLiteral(identifyingProp.initializer) && imageUrlProp) {
      const name = identifyingProp.initializer.text;
      if (name === "Soap" || name === "Bleach" || name === "Power Drill") {
        replacements.push({
          start: imageUrlProp.initializer.getStart(),
          end: imageUrlProp.initializer.getEnd(),
          newText: `"/images/items/Unusable_Weapon.png"`
        });
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
console.log(`Reset Soap, Bleach, Power Drill to generic icons.`);
