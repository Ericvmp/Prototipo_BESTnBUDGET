const fs = require('fs');
const path = require('path');

// Paths
const DATA_PATH = 'c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\data.ts';
const BLUEPRINT_PATH = 'c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\blueprintData.ts';
const DICT_PATH = 'c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\components\\translationDictionary.ts';

// 1. Read files
const dataContent = fs.readFileSync(DATA_PATH, 'utf8');
const blueprintContent = fs.readFileSync(BLUEPRINT_PATH, 'utf8');
const dictContent = fs.readFileSync(DICT_PATH, 'utf8');

console.log('Successfully read all files.');

// 2. Parse dict translations
const itemTranslationsIndex = dictContent.indexOf('export const itemTranslations');
if (itemTranslationsIndex === -1) {
  console.error('Could not find itemTranslations in translationDictionary.ts');
  process.exit(1);
}

const itemTranslationsText = dictContent.slice(itemTranslationsIndex);

const translatedKeys = new Set();
const keyRegex = /^\s*["']([^"']+)["']\s*:\s*\{/gm;
let match;
while ((match = keyRegex.exec(itemTranslationsText)) !== null) {
  translatedKeys.add(match[1]);
}

console.log(`Found ${translatedKeys.size} translated items in itemTranslations.`);

// 3. Extract items from data.ts
// We will parse the file section by section or use regex to match all object definitions.
// Let's parse materials, weapons, mods, throwables, augments by reading the file's main arrays.
// Since each array starts with "export const ARRAY_NAME: Type[] = ["
// we can find the section of text for each array.
const sections = {
  MATERIALS_DATA: { start: dataContent.indexOf('export const MATERIALS_DATA'), end: dataContent.indexOf('export const MODS_DATA') },
  MODS_DATA: { start: dataContent.indexOf('export const MODS_DATA'), end: dataContent.indexOf('export const WEAPON_MOD_SLOTS') },
  WEAPONS_DATA: { start: dataContent.indexOf('export const WEAPONS_DATA'), end: dataContent.indexOf('export const THROWABLES_DATA') },
  THROWABLES_DATA: { start: dataContent.indexOf('export const THROWABLES_DATA'), end: dataContent.indexOf('export const AUGMENTS_DATA') },
  AUGMENTS_DATA: { start: dataContent.indexOf('export const AUGMENTS_DATA'), end: dataContent.indexOf('export const LOOT_DATA') },
  LOOT_DATA: { start: dataContent.indexOf('export const LOOT_DATA'), end: dataContent.indexOf('export const WEAPON_SETUPS_DATA') }
};

const allItems = new Map(); // name -> category

for (const [category, bounds] of Object.entries(sections)) {
  if (bounds.start === -1) {
    console.error(`Could not locate start of ${category}`);
    continue;
  }
  const text = bounds.end !== -1 ? dataContent.substring(bounds.start, bounds.end) : dataContent.substring(bounds.start);
  
  // Within this array, look for top-level object names.
  // In our data arrays, items are defined as objects starting at the beginning of a line with indentation, e.g.:
  //   {
  //     id: 'mat1',
  //     name: 'Metal Parts',
  // OR
  //   { id: 'w-1', name: 'Bobcat',
  // Let's use a regex that matches objects that have an `id:` and a `name:`.
  // To avoid matching sub-objects, let's find all `id:` fields and retrieve their corresponding `name:` fields.
  const objectRegex = /\{\s*(?:id:\s*['"]([^'"]+)['"]\s*,\s*)?name\s*:\s*['"]([^'"]+)['"]/g;
  let objMatch;
  let count = 0;
  while ((objMatch = objectRegex.exec(text)) !== null) {
    const name = objMatch[2];
    allItems.set(name, category);
    count++;
  }
  console.log(`Extracted ${count} items from ${category}`);
}

// Extract blueprints from blueprintData.ts
const blueprintRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name\s*:\s*['"]([^'"]+)['"]/g;
let bpMatch;
let bpCount = 0;
while ((bpMatch = blueprintRegex.exec(blueprintContent)) !== null) {
  const name = bpMatch[2];
  if (!allItems.has(name)) {
    allItems.set(name, 'BLUEPRINTS_DATA');
  }
  bpCount++;
}
console.log(`Extracted ${bpCount} blueprints from blueprintData.ts`);

// 4. Compare and find missing
const missing = [];
const missingByCategory = {};

allItems.forEach((category, name) => {
  if (!translatedKeys.has(name)) {
    // If the name is in WEAPONS_DATA, we might want to know.
    // Wait, let's check if the name is an augment or a weapon or a throwable or a material
    missing.push({ name, category });
    if (!missingByCategory[category]) {
      missingByCategory[category] = [];
    }
    missingByCategory[category].push(name);
  }
});

console.log(`\n--- AUDIT RESULTS ---`);
console.log(`Total unique items found in code: ${allItems.size}`);
console.log(`Total missing translations: ${missing.length}`);

for (const category in missingByCategory) {
  console.log(`\nCategory: ${category} (${missingByCategory[category].length} missing):`);
  missingByCategory[category].forEach(name => {
    console.log(`  - "${name}"`);
  });
}
