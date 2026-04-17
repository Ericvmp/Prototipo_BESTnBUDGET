const fs = require('fs');

let content = fs.readFileSync('data.ts', 'utf8');

// Fix: the script injected content inside the salvageInfo array bracket instead of after weapon object
// We need to:
// 1. Find the pattern: `    ],\n\n  // ─── NEW: Canto`
// 2. Replace with:    `    ],\n  },\n\n  // ─── NEW: Canto`

const badPattern = `    ],\n\n  // ─── NEW: Canto`;
const fixedPattern = `    ],\n  },\n\n  // ─── NEW: Canto`;

if (content.includes(badPattern)) {
  content = content.replace(badPattern, fixedPattern);
  fs.writeFileSync('data.ts', content);
  console.log('Fixed! Added missing }, before Canto entry.');
} else {
  console.log('Pattern not found! Current context around Canto:');
  const idx = content.indexOf('// ─── NEW: Canto');
  console.log(JSON.stringify(content.slice(idx-50, idx+30)));
}
