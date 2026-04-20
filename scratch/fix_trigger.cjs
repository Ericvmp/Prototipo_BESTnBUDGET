const fs = require('fs');
let lines = fs.readFileSync('data.ts', 'utf8').split('\n');
lines[2035] = lines[2035].replace(/'\/images\/items\/Trigger_'Nade\.png'/, `"/images/items/Trigger_'Nade.png"`);
fs.writeFileSync('data.ts', lines.join('\n'));
