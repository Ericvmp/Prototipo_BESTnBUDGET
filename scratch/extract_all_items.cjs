const fs = require('fs');

const dataContent = fs.readFileSync('data.ts', 'utf8');

// We want to extract item objects from the arrays:
// MATERIALS_DATA, MODS_DATA, WEAPONS_DATA, THROWABLES_DATA, AUGMENTS_DATA, LOOT_DATA

function extractArray(arrayName) {
  const startIdx = dataContent.indexOf(`export const ${arrayName}`);
  if (startIdx === -1) return [];
  
  // Find the opening square bracket after export const...
  const bracketIdx = dataContent.indexOf('[', startIdx);
  if (bracketIdx === -1) return [];
  
  // We will find the matching closing square bracket of the array.
  let depth = 1;
  let endIdx = bracketIdx + 1;
  while (depth > 0 && endIdx < dataContent.length) {
    const char = dataContent[endIdx];
    if (char === '[') depth++;
    else if (char === ']') depth--;
    endIdx++;
  }
  
  const arrayText = dataContent.substring(bracketIdx, endIdx);
  
  // Now let's extract each object inside the array.
  // We can do this by finding '{' and its matching '}'.
  const items = [];
  let pos = 0;
  while (pos < arrayText.length) {
    const startObj = arrayText.indexOf('{', pos);
    if (startObj === -1) break;
    
    let objDepth = 1;
    let endObj = startObj + 1;
    let inString = false;
    let quoteChar = null;
    
    while (objDepth > 0 && endObj < arrayText.length) {
      const c = arrayText[endObj];
      if (inString) {
        if (c === quoteChar && arrayText[endObj - 1] !== '\\') {
          inString = false;
        }
      } else {
        if (c === '"' || c === "'") {
          inString = true;
          quoteChar = c;
        } else if (c === '{') {
          objDepth++;
        } else if (c === '}') {
          objDepth--;
        }
      }
      endObj++;
    }
    
    const objText = arrayText.substring(startObj, endObj);
    pos = endObj;
    
    // Parse name, description, and perks using simple regex on the object text
    const nameMatch = objText.match(/name\s*:\s*['"]([^'"]+)['"]/);
    const descMatch = objText.match(/description\s*:\s*['"]([\s\S]*?)['"](?:\s*,|\s*\})/);
    const perksMatch = objText.match(/perks\s*:\s*['"]([\s\S]*?)['"](?:\s*,|\s*\})/);
    const idMatch = objText.match(/id\s*:\s*['"]([^'"]+)['"]/);
    
    if (nameMatch) {
      items.push({
        id: idMatch ? idMatch[1] : null,
        name: nameMatch[1],
        description: descMatch ? descMatch[1] : null,
        perks: perksMatch ? perksMatch[1] : null,
        text: objText
      });
    }
  }
  return items;
}

const materials = extractArray('MATERIALS_DATA');
const mods = extractArray('MODS_DATA');
const weapons = extractArray('WEAPONS_DATA');
const throwables = extractArray('THROWABLES_DATA');
const augments = extractArray('AUGMENTS_DATA');
const loots = extractArray('LOOT_DATA');

console.log(`Materials: ${materials.length}`);
console.log(`Mods: ${mods.length}`);
console.log(`Weapons: ${weapons.length}`);
console.log(`Throwables: ${throwables.length}`);
console.log(`Augments: ${augments.length}`);
console.log(`Loot categories: ${loots.length}`);

// Save to JSON
fs.writeFileSync('scratch/extracted_items.json', JSON.stringify({
  materials, mods, weapons, throwables, augments, loots
}, null, 2));

console.log('Saved to scratch/extracted_items.json');
