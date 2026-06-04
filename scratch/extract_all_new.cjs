const fs = require('fs');

const files = {
  'Tactical MK.3 Smoke Blueprint': 'C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\110\\content.md',
  'Extended Barrel II': 'C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\112\\content.md',
  'Extended Barrel II Blueprint': 'C:\\Users\\PLURAL CG 01\\.gemini\\antigravity-ide\\brain\\8d3e1a69-01a7-488a-8ac2-1daa27b27ad2\\.system_generated\\steps\\114\\content.md'
};

for (const [name, path] of Object.entries(files)) {
  const html = fs.readFileSync(path, 'utf8');
  console.log(`\n================= ${name} =================`);
  const match = html.match(/\{id:"[^"]+".*?\}/);
  if (match) {
    // extract balanced brackets starting from match start
    const startIdx = html.indexOf(match[0].slice(0, 50));
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
      console.log(html.slice(startIdx, endIdx + 1));
    } else {
      console.log("Could not find closing bracket");
    }
  } else {
    // Fallback search
    console.log("No ID match found in HTML");
  }
}
