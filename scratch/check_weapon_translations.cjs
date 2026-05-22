const fs = require('fs');
const content = fs.readFileSync('components/translationDictionary.ts', 'utf8');

const itemTranslationsIndex = content.indexOf('export const itemTranslations');
const itemTranslationsText = content.substring(itemTranslationsIndex);

const weapons = [
  'Aphelion', 'Jupiter', 'Equalizer', 'Dolabra', 'Tempest', 'Bettina', 'Bobcat',
  'Vulcano', 'Hullcracker', 'Renegade', 'Venator', 'Osprey', 'Torrente', 'Canto',
  'Arpeggio', 'Il Toro', 'Anvil', 'Burletta', 'Rattler', 'Hairpin', 'Ferro',
  'Stitcher', 'Kettle'
];

weapons.forEach(w => {
  // Let's find the entry in itemTranslations
  const regex = new RegExp(`"${w}"\\s*:\\s*\\{([^}]+)\\}`, 'g');
  const match = regex.exec(itemTranslationsText);
  if (match) {
    console.log(`Weapon: ${w} ->`, match[1].trim().replace(/\s+/g, ' '));
  } else {
    console.log(`Weapon: ${w} -> NOT FOUND`);
  }
});
