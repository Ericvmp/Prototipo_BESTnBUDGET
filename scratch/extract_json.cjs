const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\58\\content.md', 'utf8');

// Find all JSON-like strings in the HTML script tags
const matches = html.match(/\{id:"tactical-mk-3-smoke".*?\}/g);
if (matches) {
  console.log("Found matches:", matches.length);
  console.log("Match 0 full:", matches[0]);
} else {
  console.log("Not found");
}
