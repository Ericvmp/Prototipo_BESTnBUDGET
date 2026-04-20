const fs = require('fs');

// We can simply evaluate the data.ts file using the TS compiler, or parse it.
// Since it's a TS file with exports, we can't just require() it directly without transpiling.
// However, we can use a regex to extract the names within each array block.

const content = fs.readFileSync('data.ts', 'utf8');

function extractNamesFromBlock(blockName) {
  const blockStart = content.indexOf(`export const ${blockName}`);
  if (blockStart === -1) return [];
  
  const nextBlockStart = content.indexOf('export const', blockStart + 1);
  const blockContent = nextBlockStart === -1 
    ? content.slice(blockStart) 
    : content.slice(blockStart, nextBlockStart);
    
  const regex = /name:\s*['"](.*?)['"]/g;
  let match;
  const names = [];
  while ((match = regex.exec(blockContent)) !== null) {
    names.push(match[1]);
  }
  return names;
}

const mods = extractNamesFromBlock('MODS_DATA');
const materials = extractNamesFromBlock('MATERIALS_DATA');
const tacticals = extractNamesFromBlock('TACTICALS_DATA');

console.log('=== MODS ===');
mods.forEach(n => console.log(n));

console.log('\\n=== MATERIALS ===');
materials.forEach(n => console.log(n));

console.log('\\n=== TACTICALS ===');
tacticals.forEach(n => console.log(n));
