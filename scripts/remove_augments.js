import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

const augmentsToRemove = [
  'Integrated Shield Recharger',
  'Integrated Defibrillator',
  'Integrated Binoculars',
  'Free loadout',
  'Flame Spray'
];

let lines = content.split('\n');
let insideAugments = false;
let newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export const AUGMENTS_DATA: Augment[] = [')) {
    insideAugments = true;
  }
  
  if (insideAugments && line.trim() === '];') {
    insideAugments = false;
  }

  if (insideAugments) {
    let shouldRemove = false;
    for (const aug of augmentsToRemove) {
      if (line.includes(`name: '${aug}'`) || line.includes(`name: "${aug}"`)) {
        shouldRemove = true;
        break;
      }
    }
    if (shouldRemove) {
      console.log(`Removing augment: ${line.trim()}`);
      continue;
    }
  }
  
  newLines.push(line);
}

fs.writeFileSync(dataPath, newLines.join('\n'), 'utf-8');
console.log('Finished removing requested augments.');
