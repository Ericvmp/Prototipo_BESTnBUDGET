const fs = require('fs');
const https = require('https');

let dataTs = fs.readFileSync('data.ts', 'utf8');

// 1. Delete requested items
const toDelete = [
  "Flame Spray",
  "Binoculars",
  "Door Blocker",
  "Fireworks Box",
  "Green Light Stick",
  "Yellow Light Stick",
  "Red Light Stick",
  "Blue Light Stick",
  "Free Loadout Augment"
];

let itemsRemoved = 0;
for (const item of toDelete) {
  // Regex to find the object in the array.
  // It looks for { id: '...', name: 'Item Name' ... } up to the closing },
  const regex = new RegExp(`\\s*\\{[^{}]*?name:\\s*['"]${item}['"][\\s\\S]*?\\},?`, 'g');
  const initialLength = dataTs.length;
  dataTs = dataTs.replace(regex, '');
  if (dataTs.length !== initialLength) {
    console.log(`Deleted: ${item}`);
    itemsRemoved++;
  } else {
    console.log(`NOT FOUND for deletion: ${item}`);
  }
}

// 2. Fix broken images by reverting to known local placeholders
// Since they 404 on the wiki, we'll assign them default aesthetic icons
const toFix = {
  "Gas Grenade Trap": "/images/materials/Wires.png",
  "Gas Mine": "/images/materials/Wires.png",
  "Barricade Kit": "/images/materials/Metal_Parts.png",
  "Light Impact Grenade": "/images/materials/Plastic_Parts.png",
  "Li'l Smoke Grenade": "/images/loot/Electrical_Components.png",
  "Bandage": "/images/materials/Wires.png"
};

let itemsFixed = 0;
for (const [item, defaultImg] of Object.entries(toFix)) {
  const itemRegex = new RegExp(`(name:\\s*['"]${item.replace(/'/g, "\\\\'")}(?:.*?)['"].*?imageUrl:\\s*['"])(.*?)(['"])`, 'g');
  const initialLength = dataTs.length;
  let matched = false;
  dataTs = dataTs.replace(itemRegex, (match, prefix, oldUrl, suffix) => {
    matched = true;
    return `${prefix}${defaultImg}${suffix}`;
  });
  if (matched) {
    console.log(`Fixed image for: ${item} (Reverted to local placeholder)`);
    itemsFixed++;
  } else {
    console.log(`NOT FOUND for fixing: ${item}`);
  }
}

fs.writeFileSync('data.ts', dataTs);
console.log(`\\nCompleted. Removed: ${itemsRemoved}, Fixed: ${itemsFixed}`);
