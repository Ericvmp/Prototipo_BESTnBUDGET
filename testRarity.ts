import { getItemRarity } from './utils';
import { WEAPONS_DATA, MODS_DATA, MATERIALS_DATA, THROWABLES_DATA, AUGMENTS_DATA, LOOT_DATA } from './data';

const allItems = [
    ...WEAPONS_DATA,
    ...MODS_DATA,
    ...MATERIALS_DATA,
    ...THROWABLES_DATA,
    ...AUGMENTS_DATA
];

let errors = 0;
for (const item of allItems) {
    const calculatedRarity = getItemRarity(item.name);
    if (calculatedRarity !== item.rarity && item.rarity !== 'ALL' && item.rarity !== 'TECH') {
        console.log(`Mismatch for ${item.name}: defined ${item.rarity}, returned ${calculatedRarity}`);
        errors++;
    }
}
console.log(`Total mismatch errors: ${errors}`);
