
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

const materialsMatch = content.match(/export const MATERIALS_DATA: Material\[\] = (\[[\s\S]*?\]);/);
let materialsText = materialsMatch[1];

// We know these exist in /images/materials/
const materials = [
  'Metal Parts', 'Rubber Parts', 'Plastic Parts', 'Mechanical Components', 'Mod Components',
  'Steel Spring', 'Wires', 'Duct Tape', 'Simple Gun Parts', 'Light Gun Parts',
  'Medium Gun Parts', 'Heavy Gun Parts', 'Adv Mechanical Components', 'Magnet',
  'ARC Alloy', 'ARC Powercell', 'Adv ARC Powercell', 'Electrical Components',
  'Adv Electrical Components', 'ARC Circuitry', 'ARC Motion Core', 'Chemicals',
  'Antiseptic', 'Canister', 'Tick Pod', 'Fabric', 'Durable Cloth', 'Great Mullein',
  'Moss', 'Battery', 'Power Rod', 'Syringe', 'Voltage Converter', 'Complex Gun Parts',
  'Magnetic Accelerator', 'Processor', 'Exodus Modules', 'Crude Explosives',
  'Explosive Compound', 'Synthesized Fuel', 'Firefly Burner', 'Rocketeer Driver',
  'Comet Igniter', 'Light Shield', 'Medium Shield', 'Heavy Shield', 'Oil', 'Rope',
  'Sensors', 'Speaker Component', 'Hornet Driver', 'Matriarch Reactor', 'Queen Reactor'
];

materials.forEach(name => {
    const regex = new RegExp(`name:\\s*'${name}',[\\s\\S]*?imageUrl:\\s*'.*?'`, 'g');
    const fileName = name.replace(/\s+/g, '_') + '.png';
    // Try both /images/materials/ and /images/loot/
    // Based on previous ls, most are in materials or loot.
    // I'll just use a generic logic: if it's a basic material, it's usually in materials.
    // Actually, I'll just check against the ls output I saw earlier.
    
    let path = `/images/materials/${fileName}`;
    if (name === 'Complex Gun Parts' || name === 'Processor' || name === 'Exodus Modules') {
        path = `/images/loot/${fileName}`;
    }
    // I'll simplify: just use the one I'm sure about.
    
    // Actually, I'll just do a global replace for the known external patterns.
});

// A better way: replace ALL https://arcraiders.wiki/w/images/... with local equivalents
const newContent = content.replace(/imageUrl:\s*'https:\/\/arcraiders\.wiki\/w\/images\/.*?\/.*?\/(.*?)\.png.*?'/g, (match, fileName) => {
    // Clean up filename (Wiki often has junk)
    const cleanName = fileName.split('.')[0].replace(/%20/g, '_');
    return `imageUrl: '/images/materials/${cleanName}.png'`;
}).replace(/imageUrl:\s*'https:\/\/cdn\.metaforge\.app\/arc-raiders\/icons\/(.*?)\.webp'/g, (match, fileName) => {
    const cleanName = fileName.replace(/-/g, '_').charAt(0).toUpperCase() + fileName.replace(/-/g, '_').slice(1);
    // Usually these match the PascalCase_With_Underscores pattern
    return `imageUrl: '/images/materials/${cleanName}.png'`;
});

// Specialize some paths
const fixedContent = newContent.replace(/'\/images\/materials\/Complex_Gun_Parts\.png'/g, "'/images/loot/Complex_Gun_Parts.png'")
    .replace(/'\/images\/materials\/Simple_Gun_Parts\.png'/g, "'/images/loot/Simple_Gun_Parts.png'")
    .replace(/'\/images\/materials\/Medium_Gun_Parts\.png'/g, "'/images/loot/Medium_Gun_Parts.png'")
    .replace(/'\/images\/materials\/Heavy_Gun_Parts\.png'/g, "'/images/loot/Heavy_Gun_Parts.png'")
    .replace(/'\/images\/materials\/Light_Gun_Parts\.png'/g, "'/images/loot/Light_Gun_Parts.png'");

fs.writeFileSync('data_fixed.ts', fixedContent);
