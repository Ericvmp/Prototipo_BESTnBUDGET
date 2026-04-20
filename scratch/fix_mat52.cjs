const fs = require('fs');
let content = fs.readFileSync('data.ts', 'utf8');

// Find the line with `salvageInfo` for the FIRST mat52 (the broken one)
// The broken first mat52 block ends at line 865 (salvageInfo line) and then
// immediately has "      {\n    id: 'mat52'" again.
// We need to replace from the start of the first mat52 to the end of the second mat52.

// Find first occurrence of "  {\r\n    id: 'mat52'," 
const firstMat52 = content.indexOf("  {\r\n    id: 'mat52',");
if (firstMat52 === -1) {
  console.log('Trying Unix line endings...');
}
const firstMat52_unix = content.indexOf("  {\n    id: 'mat52',");
console.log('First mat52 CRLF pos:', firstMat52, '| Unix pos:', firstMat52_unix);

// Find mat53 start
const mat53 = content.indexOf("    id: 'mat53',");
const mat53_block = content.indexOf("  {\n    id: 'mat53',");
const mat53_block_crlf = content.indexOf("  {\r\n    id: 'mat53',");
console.log('mat53 block pos:', mat53_block, '| CRLF:', mat53_block_crlf);

// The clean mat52 block to insert
const cleanMat52 = `  {\r\n    id: 'mat52',\r\n    name: 'Matriarch Reactor', stackSize: 1,\r\n    rarity: 'LEGENDARY',\r\n    icon: 'reactor',\r\n    imageUrl: 'https://arcraiders.wiki/w/images/8/89/Matriarch_Reactor.png',\r\n    description: 'A high-power reactor core found by scavenging destroyed Matriarchs. Extremely rare and required to craft the legendary Aphelion battle rifle.',\r\n    recycleInfo: [ { name: 'Power Rod', stackSize: 3, quantity: 1 }, { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],\r\n    salvageInfo: [ { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],\r\n    craftInfo: { isCraftable: false },\r\n    obtainedFrom: ["Matriarch (1x)", "ARC zones"],\r\n    requiredFor: ["Aphelion (1x)"]\r\n  },\r\n  `;

// Determine which mat52 start and mat53 block to use
const startPos = firstMat52 !== -1 ? firstMat52 : firstMat52_unix;
const endPos = mat53_block_crlf !== -1 ? mat53_block_crlf : mat53_block;

if (startPos === -1 || endPos === -1) {
  console.log('ERROR: Could not find positions');
  process.exit(1);
}

console.log(`Replacing from ${startPos} to ${endPos} (length ${endPos - startPos})`);
content = content.slice(0, startPos) + cleanMat52 + content.slice(endPos);

const mat52Count = (content.match(/id: 'mat52'/g) || []).length;
console.log(`mat52 count after fix: ${mat52Count} (should be 1)`);

fs.writeFileSync('data.ts', content);
console.log('Done!');
