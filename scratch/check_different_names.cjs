const fs = require('fs');
const content = fs.readFileSync('components/translationDictionary.ts', 'utf8');

const itemTranslationsIndex = content.indexOf('export const itemTranslations');
const itemTranslationsText = content.substring(itemTranslationsIndex);

// Let's parse all translations
const regex = /"([^"]+)"\s*:\s*\{\s*name\s*:\s*"([^"]+)"/g;
let match;
const differentNames = [];
while ((match = regex.exec(itemTranslationsText)) !== null) {
  const english = match[1];
  const portuguese = match[2];
  if (english !== portuguese) {
    differentNames.push({ english, portuguese });
  }
}

console.log("Different names:", differentNames.length);
differentNames.forEach(x => {
  console.log(`- ${x.english} -> ${x.portuguese}`);
});
