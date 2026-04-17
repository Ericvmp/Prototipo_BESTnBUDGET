const fs = require('fs');

const celesteItems = [
    "Metal Parts", "Plastic Parts", "Rubber Parts", "Chemicals", "Fabric", "Great Mullein", "Wires", "Steel Spring", "Oil", "Simple Gun Parts", "Battery", "Canister", "Magnet", "Duct Tape", "Rope", "Synthesized Fuel", "Syringe", "Sensors", "Heavy Gun Parts", "Medium Gun Parts", "Light Gun Parts", "Moss", "Speaker Component", "Processor", "Voltage Converter", "Complex Gun Parts", "Exodus Modules"
];

let content = fs.readFileSync('data.ts', 'utf8');

celesteItems.forEach(item => {
    let regexName = new RegExp(`name:\\s*['"\`]${item}['"\`],`, 'g');
    content = content.replace(regexName, `name: '${item}',\n    purchasableFromCeleste: true,`);
    
    let regexMat = new RegExp(`material:\\s*['"\`]${item}['"\`],`, 'g');
    content = content.replace(regexMat, `material: '${item}',\n    purchasableFromCeleste: true,`);
});

fs.writeFileSync('data.ts', content);
