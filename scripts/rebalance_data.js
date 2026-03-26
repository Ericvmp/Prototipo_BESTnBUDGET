import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Fix Aphelion Rarity
content = content.replace(/"id":"w-aphelion"[^}]+rarity":"RARE"/, (match) => match.replace('"RARE"', '"LEGENDARY"'));

// Systematically add craftInfo to weapons that don't have it.
// We'll regex all weapon objects and inject craftInfo before "repairInfo" or at the end of the object.
const craftRecipes = {
  'COMMON': '{ materials: [{ name: "Metal Parts", quantity: 15 }, { name: "Rubber Parts", quantity: 8 }], station: "Weapon Workbench" }',
  'UNCOMMON': '{ materials: [{ name: "Mechanical Components", quantity: 12 }, { name: "Simple Gun Parts", quantity: 4 }], station: "Weapon Workbench" }',
  'RARE': '{ materials: [{ name: "Advanced Mechanical Components", quantity: 8 }, { name: "Gun Parts", quantity: 3 }, { name: "Polymers", quantity: 12 }], station: "Advanced Weapon Workbench" }',
  'EPIC': '{ materials: [{ name: "Advanced Gun Parts", quantity: 5 }, { name: "Carbon Fiber", quantity: 15 }, { name: "High-Tech Components", quantity: 2 }], station: "Advanced Weapon Workbench" }',
  'LEGENDARY': '{ materials: [{ name: "Rare Earth Minerals", quantity: 6 }, { name: "Advanced Gun Parts", quantity: 8 }, { name: "High-Tech Components", quantity: 5 }], station: "Advanced Weapon Workbench" }'
};

const lines = content.split('\n');
let inWeapons = false;
let updatedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (line.includes('export const WEAPONS_DATA: Weapon[] = [')) {
    inWeapons = true;
    updatedLines.push(line);
    continue;
  }
  
  if (inWeapons && line.trim() === '];') {
    inWeapons = false;
  }

  if (inWeapons && line.trim().startsWith('{') && line.includes('id:')) {
    // Determine rarity from the string
    let rarityMatch = line.match(/rarity:\s*['"]([A-Z]+)['"]/);
    if (!rarityMatch) rarityMatch = line.match(/"rarity":"([A-Z]+)"/);
    
    const rarity = rarityMatch ? rarityMatch[1] : 'COMMON';
    
    // Check if it already has craftInfo
    if (!line.includes('craftInfo:') && !line.includes('"craftInfo"')) {
      const recipe = craftRecipes[rarity] || craftRecipes['COMMON'];
      
      // Inject it before repairInfo or at the end
      if (line.match(/,\s*repairInfo:/)) {
        line = line.replace(/,\s*repairInfo:/, `, \n    craftInfo: ${recipe},\n    repairInfo:`);
      } else if (line.match(/,\s*"repairInfo":/)) {
         // JSON formatted
         // Wait, the JSON string can just be appended before the last closing brace
         const recipeJson = recipe.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
         line = line.replace(/}$/, `,"craftInfo":${recipeJson}}`);
      } else {
        // Just object missing repairInfo
        if (line.endsWith('},')) {
           line = line.replace(/},$/, `, craftInfo: ${recipe} },`);
        } else if (line.endsWith('}')) {
           line = line.replace(/}$/, `, \n    craftInfo: ${recipe}\n  }`);
        }
      }
    }
  }
  
  updatedLines.push(line);
}

fs.writeFileSync(dataPath, updatedLines.join('\n'), 'utf-8');
console.log('Successfully rebalanced rarities and injected crafting info for all weapons.');
