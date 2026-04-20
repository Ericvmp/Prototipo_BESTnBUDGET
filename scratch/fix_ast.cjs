const fs = require('fs');
const ts = require('typescript');

const userList = [
  "Kinetic Converter", "Anvil Splitter", "Extended Barrel", "Horizontal Grip", "Lightweight Stock", "Shotgun Silencer", 
  "Compensator III", "Muzzle Brake III", "Shotgun Choke III", "Silencer III", "Extended Light Mag III", "Extended Medium Mag III", 
  "Extended Shotgun Mag III", "Angled Grip III", "Vertical Grip III", "Stable Stock III", "Padded Stock III", "Padded Stock",
  "Compensator II", "Muzzle Brake II", "Shotgun Choke II", "Silencer II", "Extended Light Mag II", "Extended Medium Mag II", 
  "Extended Shotgun Mag II", "Angled Grip II", "Vertical Grip II", "Stable Stock II",
  "Compensator I", "Muzzle Brake I", "Shotgun Choke I", "Silencer I", "Extended Light Mag I", "Extended Medium Mag I", 
  "Extended Shotgun Mag I", "Angled Grip I", "Vertical Grip I", "Stable Stock I",
  "Matriarch Reactor", "Queen Reactor", "Magnetic Accelerator", "Exodus Modules", "Rocketeer Driver", "Shredder Gyro", "Vaporizer Regulator",
  "Mod Components", "Light Gun Parts", "Medium Gun Parts", "Heavy Gun Parts", "Adv Mechanical Components", "Adv ARC Powercell", 
  "Adv Electrical Components", "ARC Circuitry", "ARC Motion Core", "Tick Pod", "Moss", "Power Rod", "Syringe", "Voltage Converter", 
  "Complex Gun Parts", "Processor", "Explosive Compound", "Synthesized Fuel", "Firefly Burner", "Comet Igniter", "Rope", "Sensors", 
  "Speaker Component", "Hornet Driver",
  "Mechanical Components", "Wires", "Duct Tape", "Simple Gun Parts", "Magnet", "ARC Alloy", "Electrical Components", "Antiseptic", 
  "Durable Cloth", "Great Mullein", "Battery", "Crude Explosives", "Oil", "Metal Parts", "Rubber Parts", "Plastic Parts", "Steel Spring", 
  "ARC Powercell", "Chemicals", "Canister", "Fabric",
  "Heavy Shield", "Medium Shield", "Light Shield",
  "Photoelectric Cloak", "Zipline", "Snap Hook", "Raider Hatch Key", "Surge Coil", "Barricade Kit",
  "Trailblazer", "Wolfpack", "Deadline", "Tagging Grenade", "Smoke Grenade", "Showstopper", "Jolt Mine", "Explosive Mine", 
  "Trigger'nade", "Heavy Fuze Grenade", "Blaze Grenade", "Seeker Grenade", "Shrapnel Grenade", "Light Impact Grenade", "Snap Blast Grenade"
];

const filenameOverrides = {
  "Padded Stock III": "Padded_Stock.png",
  "Padded Stock": "Padded_Stock.png",
  "Adv Mechanical Components": "Advanced_Mechanical_Components.png",
  "Adv ARC Powercell": "Advanced_ARC_Powercell.png",
  "Adv Electrical Components": "Advanced_Electrical_Components.png",
  "Trigger'nade": "Trigger_'Nade.png"
};

const userSet = new Set(userList);

const code = fs.readFileSync('data.ts', 'utf8');
const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);

const replacements = [];

function visit(node) {
  // Look for ObjectLiteralExpression
  if (ts.isObjectLiteralExpression(node)) {
    let nameProp = null;
    let imageUrlProp = null;

    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        if (prop.name.text === 'name') {
          nameProp = prop;
        } else if (prop.name.text === 'imageUrl') {
          imageUrlProp = prop;
        }
      }
    }

    if (nameProp && imageUrlProp && ts.isStringLiteral(nameProp.initializer)) {
      const itemName = nameProp.initializer.text;
      
      // If this object represents one of our items
      if (userSet.has(itemName)) {
        // Build the correct local URL
        let filename = filenameOverrides[itemName] || (itemName.replace(/ /g, '_') + '.png');
        let localUrl = `/images/items/${filename}`;
        
        // We will replace the entire initializer of imageUrlProp
        replacements.push({
          start: imageUrlProp.initializer.getStart(),
          end: imageUrlProp.initializer.getEnd(),
          newText: `'${localUrl}'`
        });
      }
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

// Apply replacements from back to front to avoid shifting indices
replacements.sort((a, b) => b.start - a.start);

let newCode = code;
for (const rep of replacements) {
  newCode = newCode.slice(0, rep.start) + rep.newText + newCode.slice(rep.end);
}

fs.writeFileSync('data.ts', newCode);
console.log(`Successfully fixed ${replacements.length} image URLs based on AST parsing.`);
