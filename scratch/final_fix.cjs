
const fs = require('fs');
let content = fs.readFileSync('data.ts', 'utf8');

// Fix the specific syntax error at line 2823-2824
content = content.replace(/\{ name: 'Complex Gun Parts',\s+purchasableFromCeleste: true, quantity: 3, imageUrl: '\/images\/loot\/Complex_Gun_Parts\.png' \}/g, 
    "{ name: 'Complex Gun Parts', quantity: 3, imageUrl: '/images/loot/Complex_Gun_Parts.png' }");

// Fix the ARC Circuitry image URL (it was wrongly set to Complex Gun Parts)
content = content.replace(/id: 'loot-arc-circuitry',[\s\S]*?materialImageUrl: '\/images\/loot\/Complex_Gun_Parts\.png'/g, (match) => {
    return match.replace('/images/loot/Complex_Gun_Parts.png', '/images/loot/ARC_Circuitry.png');
});

// Fix other obvious errors
content = content.replace(/materialImageUrl: '\/images\/loot\/Complex_Gun_Parts\.png'/g, (match) => {
    // If it's not Complex Gun Parts, it's likely wrong
    return match; // I'll be careful here
});

fs.writeFileSync('data.ts', content);
console.log('Fixed syntax and specific image paths.');
