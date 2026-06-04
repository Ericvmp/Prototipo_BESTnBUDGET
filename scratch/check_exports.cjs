const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('export const')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
