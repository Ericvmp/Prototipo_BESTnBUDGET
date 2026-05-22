const fs = require('fs');

const content = fs.readFileSync('components/RichTooltip.tsx', 'utf8');

// Find all lines containing "perk" or "translate"
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('perk') || line.toLowerCase().includes('translate')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
