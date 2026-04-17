const fs = require('fs');

let content = fs.readFileSync('data.ts', 'utf8');

// Windows CRLF: the last throwable closes with \r\n  }\r\n\n  // ─── NEW GRENADES
const badPattern = `  }\r\n\n  // ─── NEW GRENADES`;
const fixedPattern = `  },\r\n\n  // ─── NEW GRENADES`;

if (content.includes(badPattern)) {
  content = content.replace(badPattern, fixedPattern);
  fs.writeFileSync('data.ts', content);
  console.log('Fixed! Added missing comma.');
} else {
  console.log('Pattern not found, trying alternative...');
  // Try with just \n
  const idx = content.indexOf('// ─── NEW GRENADES');
  console.log(JSON.stringify(content.slice(idx-80, idx+5)));
}
