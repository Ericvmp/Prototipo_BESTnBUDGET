const fs = require('fs');

const DATA_PATH = 'c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\data.ts';
const content = fs.readFileSync(DATA_PATH, 'utf8');

const lootIndex = content.indexOf('export const LOOT_DATA');
if (lootIndex === -1) {
  console.log('Could not find LOOT_DATA');
} else {
  console.log('Found LOOT_DATA at index:', lootIndex);
  console.log(content.substring(lootIndex, lootIndex + 800));
}
