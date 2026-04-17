
const fs = require('fs');
const content = fs.readFileSync('data_fixed.ts', 'utf8');

// Replace materialImageUrl too
const newContent = content.replace(/(materialImageUrl|imageUrl):\s*'https:\/\/arcraiders\.wiki\/w\/images\/.*?\/.*?\/(.*?)\.png.*?'/g, (match, prop, fileName) => {
    const cleanName = fileName.split('.')[0].replace(/%20/g, '_').replace(/thumb\//g, '');
    // If it's a material, it might be in /images/materials/ or /images/loot/
    // We'll try to guess or use materials as default
    return `${prop}: '/images/materials/${cleanName}.png'`;
}).replace(/(materialImageUrl|imageUrl):\s*'https:\/\/cdn\.metaforge\.app\/arc-raiders\/icons\/(.*?)\.webp'/g, (match, prop, fileName) => {
    const cleanName = fileName.replace(/-/g, '_').charAt(0).toUpperCase() + fileName.replace(/-/g, '_').slice(1);
    return `${prop}: '/images/materials/${cleanName}.png'`;
});

// Specialize some paths based on the 'ls' output
const fixes = {
    'Complex_Gun_Parts': '/images/loot/Complex_Gun_Parts.png',
    'Simple_Gun_Parts': '/images/loot/Simple_Gun_Parts.png',
    'Medium_Gun_Parts': '/images/loot/Medium_Gun_Parts.png',
    'Heavy_Gun_Parts': '/images/loot/Heavy_Gun_Parts.png',
    'Light_Gun_Parts': '/images/loot/Light_Gun_Parts.png',
    'Unusable_Weapon': '/images/loot/Unusable_Weapon.png',
    'Exodus_Modules': '/images/loot/Exodus_Modules.png',
    'Power_Bank': '/images/loot/Power_Bank.png',
    'Portable_TV': '/images/loot/Portable_TV.png',
    'Alarm_Clock': '/images/loot/Alarm_Clock.png',
    'Rocketeer_Driver': '/images/loot/Rocketeer_Driver.png',
    'Hornet_Driver': '/images/loot/Hornet_Driver.png'
};

let finalContent = newContent;
for (const [key, val] of Object.entries(fixes)) {
    const regex = new RegExp(`'/images/materials/${key}\\.png'`, 'g');
    finalContent = finalContent.replace(regex, `'${val}'`);
}

fs.writeFileSync('data_final.ts', finalContent);
