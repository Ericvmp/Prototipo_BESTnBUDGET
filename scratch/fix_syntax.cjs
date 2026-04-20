const fs = require('fs');

let lines = fs.readFileSync('data.ts', 'utf8').split('\n');
let newLines = [];
let i = 0;

while (i < lines.length) {
  let line = lines[i];
  newLines.push(line);
  
  if (line.includes('export const AUGMENTS_DATA: Augment[] = [')) {
    // skip the broken lines below it
    i++;
    while (i < lines.length) {
      if (lines[i].includes('recycleInfo: [], salvageInfo: []') || lines[i].trim() === '},') {
        // skip this broken line
        console.log('Skipping broken line:', lines[i].trim());
        i++;
      } else {
        break; // found the next valid line (hopefully { id: ... )
      }
    }
    continue;
  }
  i++;
}

fs.writeFileSync('data.ts', newLines.join('\n'));
console.log('Fixed syntax near AUGMENTS_DATA');
