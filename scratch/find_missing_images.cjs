const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

// A generic regex to catch object literals with name and imageUrl properties
const regex = /name:\s*['"](.*?)['"].*?imageUrl:\s*['"](.*?)['"]/gs;

let match;
const missingImages = [];

const placeholderKeywords = [
  'Wires', 'Metal_Parts', 'Rubber_Parts', 'Plastic_Parts',
  'Electrical_Components', 'Power_Rod', 'Advanced_electrical_components',
  'Advanced_Electrical_Components', 'Unusable_Weapon'
];

while ((match = regex.exec(content)) !== null) {
  const name = match[1];
  const url = match[2];

  if (url.includes('arcraiders.wiki')) continue;

  const isPlaceholder = placeholderKeywords.some(kw => url.includes(kw));

  // also check if the image matches the item name loosely (to see if it's a real local asset)
  const nameToMatch = name.replace(/['"]/g, '').replace(/\s+/g, '_');
  const hasLocalAssetMatch = url.includes(nameToMatch);

  if (isPlaceholder || !hasLocalAssetMatch) {
    missingImages.push({ name, url, isPlaceholder });
  }
}

// Ensure uniqueness based on name
const uniqueMissing = [...new Map(missingImages.map(item => [item.name, item])).values()];

console.log('--- Potentially Missing/Placeholder Images ---');
uniqueMissing.forEach(i => console.log(`- ${i.name} -> ${i.url}`));
console.log(`Total: ${uniqueMissing.length}`);
