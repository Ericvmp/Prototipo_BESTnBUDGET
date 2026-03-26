import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

const modRecipes = {
  'COMMON': `materials: [{ name: "Plastic Parts", quantity: 6 }, { name: "Duct Tape", quantity: 2 }]`,
  'UNCOMMON': `materials: [{ name: "Mechanical Components", quantity: 4 }, { name: "Duct Tape", quantity: 4 }]`,
  'RARE': `materials: [{ name: "Mod Components", quantity: 3 }, { name: "Duct Tape", quantity: 6 }]`,
  'EPIC': `materials: [{ name: "Advanced Mod Components", quantity: 2 }, { name: "Carbon Fiber", quantity: 4 }]`,
  'LEGENDARY': `materials: [{ name: "High-Tech Components", quantity: 2 }, { name: "Rare Earth Minerals", quantity: 3 }]`
};

const tacticalRecipes = {
  'COMMON': `craftInfo: { materials: [{ name: "Fiber", quantity: 5 }, { name: "Bio-Resin", quantity: 2 }], quantityProduced: 2, station: "Consumables Workbench" }`,
  'UNCOMMON': `craftInfo: { materials: [{ name: "Electronic Parts", quantity: 4 }, { name: "Copper Wire", quantity: 3 }], quantityProduced: 2, station: "Consumables Workbench" }`,
  'RARE': `craftInfo: { materials: [{ name: "Advanced Electronics", quantity: 2 }, { name: "Batteries", quantity: 1 }, { name: "Explosives", quantity: 2 }], quantityProduced: 1, station: "Advanced Consumables Workbench" }`,
  'EPIC': `craftInfo: { materials: [{ name: "High-Tech Components", quantity: 1 }, { name: "Explosives", quantity: 4 }], quantityProduced: 1, station: "Advanced Consumables Workbench" }`
};

const lines = content.split('\n');
let inMods = false;
let inTacticals = false;
let updatedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes('export const MODS_DATA: Modification[] = [')) {
    inMods = true;
  } else if (inMods && line.trim() === '];') {
    inMods = false;
  }

  if (line.includes('export const THROWABLES_DATA: Throwable[] = [')) {
    inTacticals = true;
  } else if (inTacticals && line.trim() === '];') {
    inTacticals = false;
  }

  if (inMods && line.trim().startsWith('{') && line.includes('id:')) {
    let rarityMatch = line.match(/rarity:\s*['"]([A-Z]+)['"]/);
    const rarity = rarityMatch ? rarityMatch[1] : 'COMMON';
    const recipe = modRecipes[rarity] || modRecipes['COMMON'];
    line = line.replace(/materials:\s*\[.*?\]/, recipe);
  }

  if (inTacticals && line.trim().startsWith('{') && line.includes('id:')) {
    let rarityMatch = line.match(/rarity:\s*['"]([A-Z]+)['"]/);
    const rarity = rarityMatch ? rarityMatch[1] : 'COMMON';
    const recipe = tacticalRecipes[rarity] || tacticalRecipes['COMMON'];
    // Tactical craftInfo regex matches craftInfo: { ... station: '...' }
    if (line.match(/craftInfo:\s*\{.*station:\s*'[^']+'\s*\}/)) {
      line = line.replace(/craftInfo:\s*\{.*station:\s*'[^']+'\s*\}/, recipe);
    } else if (line.match(/craftInfo:\s*\{.*station:\s*"[^"]+"\s*\}/)) {
      line = line.replace(/craftInfo:\s*\{.*station:\s*"[^"]+"\s*\}/, recipe);
    } else if (line.match(/craftInfo:/)) {
      // Very broad catch if the above fails, but might be destructive if not careful.
      line = line.replace(/craftInfo:\s*\{.*?\}(?=\s*,?\s*imageUrl|\s*,?\s*category|\s*\})/, recipe);
    }
  }

  updatedLines.push(line);
}

fs.writeFileSync(dataPath, updatedLines.join('\n'), 'utf-8');
console.log('Successfully rebalanced recipes for Mods and Tacticals.');
