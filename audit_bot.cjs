const fs = require('fs');
const https = require('https');

async function fetchRaw(itemName) {
  const url = `https://arcraiders.wiki/w/index.php?title=${encodeURIComponent(itemName.replace(/ /g, '_'))}&action=raw`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) return resolve(null);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(null));
  });
}

function parseIngredients(str) {
  if (!str) return [];
  // e.g. "6 Metal Parts + 1 Wires" -> [{name: 'Metal Parts', quantity: 6}, ...]
  return str.split('+').map(part => {
    const match = part.match(/\s*(\d+)\s+([^<]+)/);
    if (match) return { name: match[2].replace(/\[\[|\]\]/g, '').trim(), quantity: parseInt(match[1]) };
    return null;
  }).filter(Boolean);
}

function parseLevelIngredients(str) {
    if (!str) return [];
    return str.replace(/<[^>]*>/g, '').split('+').map(part => {
        const match = part.match(/\s*(\d+)\s+(.+)/);
        if (match) return { name: match[2].trim(), quantity: parseInt(match[1]) };
        return null;
    }).filter(Boolean);
}

async function run() {
  const dataTs = fs.readFileSync('data.ts', 'utf-8');
  
  // Extract all names using regex: name: 'Name', or name: "Name"
  const itemNames = [...dataTs.matchAll(/name:\s*['"]([^'"]+)['"]/g)]
    .map(m => m[1])
    .filter(n => !['REPAIR_I', 'REPAIR_II', 'REPAIR_III', 'REPAIR_IV', 'NONE'].includes(n)) // filter out enums
    .filter((value, index, self) => self.indexOf(value) === index);

  const report = [];
  report.push("# ARC Raiders Audit Report (Local vs Wiki)");
  report.push("## Inconsistencies found in `data.ts`\n");

  const results = {};

  for (const name of itemNames) {
    const raw = await fetchRaw(name);
    if (!raw) {
      console.log(`Failed to fetch ${name} or page doesn't exist.`);
      continue;
    }

    const itemRules = {
      localName: name,
      stackSize: null,
      crafting: [],
      recycling: [],
      salvaging: []
    };

    // Extract Stack Size
    const stackMatch = raw.match(/\|\s*stacksize\s*=\s*([0-9]+)/i) || raw.match(/\|\s*stack\s*=\s*([0-9]+)/i);
    if (stackMatch) itemRules.stackSize = parseInt(stackMatch[1]);

    // Extract Crafting Ingredients
    const craftMatch = raw.match(/\|\s*ingredients\s*=\s*([^|\n]+)/i);
    if (craftMatch) itemRules.crafting = parseIngredients(craftMatch[1]);

    // Extract Recycling/Salvaging 1
    const recyMatch = raw.match(/\|\s*recycling1\s*=\s*([^|\n]+)/i) || raw.match(/\|\s*recycling\s*=\s*([^|\n]+)/i);
    if (recyMatch) itemRules.recycling = parseLevelIngredients(recyMatch[1]);

    const salvMatch = raw.match(/\|\s*salvaging1\s*=\s*([^|\n]+)/i) || raw.match(/\|\s*salvaging\s*=\s*([^|\n]+)/i);
    if (salvMatch) itemRules.salvaging = parseLevelIngredients(salvMatch[1]);

    results[name] = itemRules;
    console.log(`Parsed ${name}: Stack=${itemRules.stackSize || '?'}`);
  }

  fs.writeFileSync('audit_results.json', JSON.stringify(results, null, 2));
  console.log("Done! Results saved to audit_results.json");
}

run();
