const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\PLURAL CG 01\\Downloads\\ARC RAIDERS\\Prototipo_BESTnBUDGET\\data.ts', 'utf8');

console.log('File length:', content.length);
console.log('Contains export const:', content.includes('export const'));
console.log('Contains WEAPONS_DATA:', content.includes('WEAPONS_DATA'));
console.log('Contains MODS_DATA:', content.includes('MODS_DATA'));
console.log('Contains MATERIALS_DATA:', content.includes('MATERIALS_DATA'));

// Let's find lines that start with export const
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const')) {
    console.log(`Line ${i + 1}: ${lines[i].trim()}`);
  }
}
