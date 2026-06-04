const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\58\\content.md', 'utf8');

// Strip HTML tags and look at clean lines of text containing numbers followed by 'kg' or similar
const clean = html.replace(/<[^>]+>/g, '\n');
const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

console.log("=== Lines with Numbers or Capacity/Weight ===");
lines.forEach(line => {
  if (/weight/i.test(line) || /capacity/i.test(line) || /pocket/i.test(line) || /backpack/i.test(line) || /kg/i.test(line) || /slots/i.test(line)) {
    if (line.length < 500) {
      console.log(line);
    } else {
      // Find key matching patterns and print context around them
      const terms = ['weight', 'capacity', 'pocket', 'backpack', 'slots', 'shieldCompatibility'];
      terms.forEach(term => {
        let idx = -1;
        while ((idx = line.toLowerCase().indexOf(term.toLowerCase(), idx + 1)) !== -1) {
          console.log(`[Context for ${term}]: ...`, line.slice(Math.max(0, idx - 50), Math.min(line.length, idx + 150)), '...');
        }
      });
    }
  }
});
