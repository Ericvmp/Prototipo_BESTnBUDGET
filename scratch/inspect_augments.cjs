const fs = require('fs');

const DATA_PATH = 'c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\data.ts';
const content = fs.readFileSync(DATA_PATH, 'utf8');

const startIndex = content.indexOf('export const AUGMENTS_DATA');
const endIndex = content.indexOf('export const LOOT_DATA');

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find AUGMENTS_DATA or LOOT_DATA boundaries');
} else {
  const text = content.substring(startIndex, endIndex);
  console.log(text);
}
