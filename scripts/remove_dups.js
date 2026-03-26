import fs from 'fs';

let text = fs.readFileSync('data.ts', 'utf-8');
const lines = text.split('\n');
const newLines = lines.filter(line => 
  !line.includes('{"id":"w-torrente"') && 
  !line.includes('{"id":"w-stitcher"') && 
  !line.includes('{"id":"w-ferro"')
);
fs.writeFileSync('data.ts', newLines.join('\n'));
console.log('Duplicates removed.');
