const fs = require('fs');
const path = require('path');

const directories = ['.', './components', './public/db'];
const extensions = ['.ts', '.tsx', '.json'];

const replacements = [
  { from: /Aphelion Rifle/g, to: 'Aphelion' },
  { from: /Rifle Afélio/g, to: 'Afélio' },
  { from: /Rifle Afelio/g, to: 'Afélio' },
  { from: /Linha Limite/g, to: 'Deadline' },
  { from: /Trailblazer Grenade/gi, to: 'Trailblazer' },
  { from: /Granada Trailblazer/g, to: 'Desbravador' },
  { from: /Mosquetão Tático/g, to: 'Mosquetão' },
  { from: /Mosquestão Tático/g, to: 'Mosquetão' },
  { from: /Combate Mk\. 3 \(Flanco\)/g, to: 'Combate Mk. 3 (Flanqueador)' },
  { from: /Comabte Mk\. 3 \(Flaqueador\)/g, to: 'Combate Mk. 3 (Flanqueador)' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'scratch') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!directories.includes(dir)) {
          // just doing specific top level dirs for safety, but we can recurse components
      }
      if (dir === './components' || dir === './public' || dir === './public/db') {
          processDirectory(fullPath);
      }
    } else {
      if (extensions.includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content;
        for (const rule of replacements) {
          newContent = newContent.replace(rule.from, rule.to);
        }
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

for (const dir of directories) {
  processDirectory(dir);
}
