const fs = require('fs');

const dataContent = fs.readFileSync('data.ts', 'utf8');
const augmentsStart = dataContent.indexOf('export const AUGMENTS_DATA');
const augmentsEnd = dataContent.indexOf('export const LOOT_DATA');
const augmentsText = dataContent.substring(augmentsStart, augmentsEnd);

// Find all occurrences of name and perks
const regex = /name\s*:\s*['"]([^'"]+)['"][\s\S]*?perks\s*:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(augmentsText)) !== null) {
  console.log(`Augment: "${match[1]}"`);
  console.log(`Perks: "${match[2]}"`);
  console.log('---');
}
