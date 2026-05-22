const fs = require('fs');

const data = require('./data.cjs');
const blueprintData = require('./blueprintData.cjs');

const allItems = [];

// 1. Materials
if (data.MATERIALS_DATA) {
  data.MATERIALS_DATA.forEach(item => {
    allItems.push({
      name: item.name,
      category: 'MATERIALS_DATA',
      description: item.description || '',
      perks: item.perks || ''
    });
  });
}

// 2. Mods
if (data.MODS_DATA) {
  data.MODS_DATA.forEach(item => {
    allItems.push({
      name: item.name,
      category: 'MODS_DATA',
      description: item.description || '',
      perks: item.perks || ''
    });
  });
}

// 3. Weapons
if (data.WEAPONS_DATA) {
  data.WEAPONS_DATA.forEach(item => {
    allItems.push({
      name: item.name,
      category: 'WEAPONS_DATA',
      description: item.description || '',
      perks: item.perks || ''
    });
  });
}

// 4. Throwables
if (data.THROWABLES_DATA) {
  data.THROWABLES_DATA.forEach(item => {
    allItems.push({
      name: item.name,
      category: 'THROWABLES_DATA',
      description: item.description || '',
      perks: item.perks || ''
    });
  });
}

// 5. Augments
if (data.AUGMENTS_DATA) {
  data.AUGMENTS_DATA.forEach(item => {
    allItems.push({
      name: item.name,
      category: 'AUGMENTS_DATA',
      description: item.description || '',
      perks: item.perks || ''
    });
  });
}

// 6. Loot / Materials from LOOT_DATA
// In LOOT_DATA, items have a 'material' field and a list of sources.
// Wait, LOOT_DATA is organized by LootCategory. Let's see what categories we have.
// Let's print out what is inside LOOT_DATA first.
if (data.LOOT_DATA) {
  data.LOOT_DATA.forEach(cat => {
    // If it's a loot category, it contains a list of items/sources
    // Let's see if the category has sources
    if (cat.sources) {
      cat.sources.forEach(src => {
        allItems.push({
          name: src.name,
          category: 'LOOT_DATA',
          description: src.description || '',
          perks: src.perks || ''
        });
      });
    }
    // Also, cat.material is a material name.
    if (cat.material) {
      allItems.push({
        name: cat.material,
        category: 'LOOT_DATA_MATERIAL',
        description: cat.description || '',
        perks: cat.perks || ''
      });
    }
  });
}

// 7. Blueprints from blueprintData.ts
// Let's see what is inside blueprintData.cjs
if (blueprintData.BLUEPRINTS_DATA) {
  blueprintData.BLUEPRINTS_DATA.forEach(item => {
    allItems.push({
      name: item.name,
      category: 'BLUEPRINTS_DATA',
      description: item.description || '',
      perks: item.perks || ''
    });
  });
}

// Deduplicate by name
const uniqueItems = new Map();
allItems.forEach(item => {
  if (item.name && item.name.trim() !== '') {
    const existing = uniqueItems.get(item.name);
    if (!existing || (!existing.description && item.description) || (!existing.perks && item.perks)) {
      uniqueItems.set(item.name, item);
    }
  }
});

const dedupedList = Array.from(uniqueItems.values());
fs.writeFileSync('scratch/all_unique_items.json', JSON.stringify(dedupedList, null, 2));
console.log(`Successfully extracted and deduplicated ${dedupedList.length} unique items.`);
