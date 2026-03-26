import fs from 'fs';

let text = fs.readFileSync('data.ts', 'utf-8');

// Processing line by line
const lines = text.split('\n');
let count = 0;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('{"id":') && line.includes('"name":') && !line.includes('"imageUrl":')) {
    line = line.replace(/"name":"([^"]+)"/, (match, name) => {
      let urlName = name.replace(/ /g, '_');
      return `"name":"${name}","imageUrl":"https://arcraiders.wiki/wiki/Special:FilePath/${encodeURIComponent(urlName)}.png"`;
    });
    lines[i] = line;
    count++;
  }
}

fs.writeFileSync('data.ts', lines.join('\n'));
console.log(`Images added successfully to ${count} items.`);
