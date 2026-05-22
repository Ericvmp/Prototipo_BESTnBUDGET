const fs = require('fs');

const dataContent = fs.readFileSync('data.ts', 'utf8');

// Find sections
const sections = {
  MATERIALS_DATA: dataContent.indexOf('export const MATERIALS_DATA'),
  MODS_DATA: dataContent.indexOf('export const MODS_DATA'),
  WEAPONS_DATA: dataContent.indexOf('export const WEAPONS_DATA'),
  THROWABLES_DATA: dataContent.indexOf('export const THROWABLES_DATA'),
  AUGMENTS_DATA: dataContent.indexOf('export const AUGMENTS_DATA'),
  LOOT_DATA: dataContent.indexOf('export const LOOT_DATA')
};

console.log('Indices:', sections);

// Print 300 chars of each section starting point
for (const [key, idx] of Object.entries(sections)) {
  if (idx !== -1) {
    console.log(`\n=== ${key} ===`);
    console.log(dataContent.substring(idx, idx + 400));
  }
}
