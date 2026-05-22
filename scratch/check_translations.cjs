const fs = require('fs');
const content = fs.readFileSync('components/translationDictionary.ts', 'utf8');

const itemTranslationsIndex = content.indexOf('export const itemTranslations');
const itemTranslationsText = content.substring(itemTranslationsIndex);

// Find all keys defined inside itemTranslations
const keys = [];
const regex = /"([^"]+)"\s*:\s*\{/g;
let match;
while ((match = regex.exec(itemTranslationsText)) !== null) {
  keys.push(match[1]);
}

console.log("Total keys in itemTranslations:", keys.length);
console.log("Keys:", keys.slice(0, 50));
console.log("Includes Bobcat?", keys.includes("Bobcat"));
console.log("Includes Rattler?", keys.includes("Rattler"));
console.log("Includes Metal Parts?", keys.includes("Metal Parts"));
