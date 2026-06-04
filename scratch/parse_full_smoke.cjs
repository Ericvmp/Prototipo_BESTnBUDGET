const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\58\\content.md', 'utf8');

// Match the full object starting with {id:"tactical-mk-3-smoke"
const startIdx = html.indexOf('{id:"tactical-mk-3-smoke"');
if (startIdx !== -1) {
  // Let's scan until we find the matching closing brace
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < html.length; i++) {
    if (html[i] === '{') depth++;
    if (html[i] === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx !== -1) {
    const rawObj = html.slice(startIdx, endIdx + 1);
    console.log("Full Object Length:", rawObj.length);
    // Print the raw string formatted
    console.log(rawObj);
  }
} else {
  console.log("Not found start index");
}
