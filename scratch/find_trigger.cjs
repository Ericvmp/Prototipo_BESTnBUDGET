const fs = require('fs');
const dataContent = fs.readFileSync('data.ts', 'utf8');

let pos = 0;
while (true) {
  const index = dataContent.indexOf('Trigger', pos);
  if (index === -1) break;
  console.log(dataContent.substring(index - 20, index + 30));
  pos = index + 1;
}
