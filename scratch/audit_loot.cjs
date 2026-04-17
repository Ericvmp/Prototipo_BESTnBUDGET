
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

// Extract MATERIALS_DATA
const materialsMatch = content.match(/export const MATERIALS_DATA: Material\[\] = (\[[\s\S]*?\]);/);
const materials = eval(materialsMatch[1]);

// Extract LOOT_DATA
const lootMatch = content.match(/export const LOOT_DATA: LootCategory\[\] = (\[[\s\S]*?\]);/);
const loot = eval(lootMatch[1]);

const missing = [];

loot.forEach(item => {
    const mat = materials.find(m => m.name === item.material);
    if (!item.materialImageUrl && (!mat || !mat.imageUrl)) {
        missing.push({ id: item.id, material: item.material, reason: 'No image URL in loot or materials' });
    } else if (item.materialImageUrl && item.materialImageUrl.startsWith('http')) {
        // Check if we have a local version
        const localName = item.material.replace(/\s+/g, '_') + '.png';
        missing.push({ id: item.id, material: item.material, currentUrl: item.materialImageUrl, suggestion: localName });
    }
});

console.log(JSON.stringify(missing, null, 2));
