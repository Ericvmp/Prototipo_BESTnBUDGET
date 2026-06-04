const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\58\\content.md', 'utf8');

const clean = html.replace(/<[^>]+>/g, '\n');
const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

console.log("=== First 200 Lines of Clean Text ===");
lines.slice(0, 200).forEach((l, idx) => console.log(`${idx + 1}: ${l}`));
