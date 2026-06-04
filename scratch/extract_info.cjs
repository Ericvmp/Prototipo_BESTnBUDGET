const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\58\\content.md', 'utf8');

// Strip HTML tags roughly and extract clean text
const text = html.replace(/<[^>]+>/g, '\n').split('\n').map(l => l.trim()).filter(Boolean);

console.log("=== Text Containing Key Terms ===");
text.forEach(line => {
  const lower = line.toLowerCase();
  if (
    lower.includes('smoke') ||
    lower.includes('weight') ||
    lower.includes('perk') ||
    lower.includes('backpack') ||
    lower.includes('safe pocket') ||
    lower.includes('slots') ||
    lower.includes('quick use') ||
    lower.includes('recycle') ||
    lower.includes('craft') ||
    lower.includes('materials') ||
    lower.includes('durability') ||
    lower.includes('station') ||
    lower.includes('shield')
  ) {
    console.log(line);
  }
});
