const fs = require('fs');

const DATA_PATH = 'c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\data.ts';
const content = fs.readFileSync(DATA_PATH, 'utf8');

const startIndex = content.indexOf('export const THROWABLES_DATA');
const endIndex = content.indexOf('export const AUGMENTS_DATA');

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find THROWABLES_DATA or AUGMENTS_DATA boundaries');
} else {
  const text = content.substring(startIndex, endIndex);
  console.log(text);
}
