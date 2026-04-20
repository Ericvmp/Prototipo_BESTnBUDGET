const fs = require('fs');

let dataTs = fs.readFileSync('data.ts', 'utf8');

const toFix = {
  "Light Impact Grenade": "/images/materials/Plastic_Parts.png",
  "Li'l Smoke Grenade": "/images/loot/Electrical_Components.png"
};

let itemsFixed = 0;
for (const [item, defaultImg] of Object.entries(toFix)) {
  const itemRegex = new RegExp(`(name:\\s*['"]${item.replace(/'/g, "\\\\'")}(?:.*?)['"][\\s\\S]*?imageUrl:\\s*['"])(.*?)(['"])`, 'g');
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
console.log(`\\nCompleted. Fixed: ${itemsFixed}`);
