const fs = require('fs');
let content = fs.readFileSync('data.ts', 'utf8');

// Fix the corrupted lines 866-870 area
// The bad text has: "craftInfo: { isCr    obtainedFrom:..." and "  {oil (1x)"
// and then a duplicate mat52 block follows.

// Strategy: replace the entire corrupted block (from mat52 first occurrence to before mat53)
// by removing the first broken mat52 and keeping only the clean second one.

// Remove the corrupted first mat52 block (lines 857-871 approx)
const bad1 = `  {
    id: 'mat52',
    name: 'Matriarch Reactor', stackSize: 1,
    rarity: 'LEGENDARY',
    icon: 'reactor',
    imageUrl: 'https://arcraiders.wiki/w/images/8/89/Matriarch_Reactor.png',
    description: 'A high-power reactor core found by scavenging destroyed Matriarchs. Extremely rare and required to craft the legendary Aphelion battle rifle.',
    recycleInfo: [ { name: 'Power Rod', stackSize: 3, quantity: 1 }, { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],
    salvageInfo: [ { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],
    craftInfo: { isCr    obtainedFrom: ["Matriarch (1x)", "ARC zones"],
    requiredFor: ["Aphelion (1x)"]
  },
  {oil (1x)"]
  },
  {`;

const good1 = `  {`;

if (content.includes(bad1)) {
  content = content.replace(bad1, good1);
  console.log('✅ Fixed corruption: removed broken mat52 duplicate block');
} else {
  console.log('⚠️  Pattern not found exactly, trying line-by-line...');
  // Try regex approach
  const badPattern = /craftInfo: \{ isCr\s+obtainedFrom:.*?\n.*?requiredFor:.*?\n\s*\},\n\s*\{oil \(1x\)"\]\n\s*\},\n\s*\{/s;
  if (badPattern.test(content)) {
    content = content.replace(badPattern, '  {');
    console.log('✅ Fixed corruption via regex');
  } else {
    console.log('❌ Could not find pattern');
  }
}

// Also remove the Hornet Driver duplicate (check if there are two mat51 entries)
const mat51Count = (content.match(/id: 'mat51'/g) || []).length;
console.log(`mat51 count: ${mat51Count}`);
if (mat51Count > 1) {
  // There are duplicates, we need to keep only the first one that has good data
  // Find and remove the second occurrence
  const secondMat51Idx = content.indexOf("id: 'mat51'", content.indexOf("id: 'mat51'") + 1);
  if (secondMat51Idx !== -1) {
    // Find the end of that entry (next id: 'mat5X' or end of array)
    const afterSecond = content.slice(secondMat51Idx);
    const endIdx = afterSecond.search(/\n  \{[\s\S]*?id: 'mat5[2-9]/);
    if (endIdx !== -1) {
      content = content.slice(0, secondMat51Idx) + content.slice(secondMat51Idx + endIdx + 4);
      console.log('✅ Removed duplicate mat51');
    }
  }
}

fs.writeFileSync('data.ts', content);
console.log('Done! data.ts saved.');
