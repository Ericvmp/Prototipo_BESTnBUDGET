const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\58\\content.md', 'utf8');

// Print lines around "Weight Limit" or "Max Weight" or "Capacity"
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('limit') || line.toLowerCase().includes('weight') || line.toLowerCase().includes('capacity')) {
    console.log(`Line ${idx + 1}:`, line.trim());
  }
});
