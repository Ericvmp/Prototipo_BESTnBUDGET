const fs = require('fs');

const userList = [
  "Kinetic Converter", "Anvil Splitter", "Extended Barrel", "Horizontal Grip", "Lightweight Stock", "Shotgun Silencer", 
  "Compensator III", "Muzzle Brake III", "Shotgun Choke III", "Silencer III", "Extended Light Mag III", "Extended Medium Mag III", 
  "Extended Shotgun Mag III", "Angled Grip III", "Vertical Grip III", "Stable Stock III", "Padded Stock III",
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

// Special mapping for names that don't directly convert to wiki filenames
const filenameOverrides = {
  "Padded Stock III": "Padded_Stock.png",
  "Adv Mechanical Components": "Advanced_Mechanical_Components.png",
  "Adv ARC Powercell": "Advanced_ARC_Powercell.png",
  "Adv Electrical Components": "Advanced_Electrical_Components.png",
  "Trigger'nade": "Trigger_'Nade.png"
};

let lines = fs.readFileSync('data.ts', 'utf8').split('\\n');
let fixedCount = 0;

for (const itemName of userList) {
  let filename = filenameOverrides[itemName] || (itemName.replace(/ /g, '_') + '.png');
  let localUrl = `/images/items/${filename}`;
  
  let itemStartIdx = -1;
  // We search for the item definition
  for (let i = 0; i < lines.length; i++) {
    // Look for name: 'Item Name' or name: "Item Name"
    const nameMatch = lines[i].match(new RegExp(`name:\\s*['"]${itemName.replace(/'/g, "\\\\?'?")}['"]`));
    
    if (nameMatch) {
      // Ignore if it's an array element like { name: 'Item Name', quantity: 2 }
      if (lines[i].includes('{ name:') || lines[i].includes('{name:') || lines[i].includes('quantity:')) {
        continue;
      }
      itemStartIdx = i;
      break;
    }
  }

  if (itemStartIdx !== -1) {
    // Scan forward to find the first imageUrl: within a reasonable limit (e.g. 20 lines)
    for (let i = itemStartIdx; i < itemStartIdx + 25 && i < lines.length; i++) {
      if (lines[i].includes('imageUrl:')) {
        lines[i] = lines[i].replace(/imageUrl:\s*['"][^'"]+['"]/, `imageUrl: '${localUrl}'`);
        console.log(`[OK] Restored ${itemName} -> ${localUrl}`);
        fixedCount++;
        break;
      }
    }
  } else {
    console.log(`[MISSING] Could not find top-level definition for ${itemName}`);
  }
}

fs.writeFileSync('data.ts', lines.join('\\n'));
console.log(`\\nTotal fixed: ${fixedCount} out of ${userList.length}`);
