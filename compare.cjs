const fs = require('fs');
const dataJson = require('./audit_results.json');
let dataTs = fs.readFileSync('data.ts', 'utf8');

// A simple script to extract the actual TS arrays for comparison
// It evaluates the TypeScript by isolating the arrays, but since TS is hard to evaluate,
// we just do a rough text extraction.

const itemNames = Object.keys(dataJson);
const report = [];

report.push("# Relatório de Inconsistências (Local vs Wiki)\n");

for (const name of itemNames) {
    const info = dataJson[name];
    
    // check if this item exists in data.ts
    const regex = new RegExp(`name:\\s*['"]${name}['"]([\\s\\S]*?)(name:|id:)`, 'g');
    const match = regex.exec(dataTs);
    if (!match) continue;
    
    const block = match[1];
    let inconsistencies = [];

    // Crude check for missing items in recycleInfo
    if (info.recycling && info.recycling.length > 0) {
        info.recycling.forEach(req => {
            if (!block.includes(req.name) || !block.includes(req.quantity.toString())) {
                inconsistencies.push(`- **Recycling**: Falta ou difere ${req.quantity}x ${req.name}`);
            }
        });
    }

    // Salvaging
    if (info.salvaging && info.salvaging.length > 0) {
        info.salvaging.forEach(req => {
            if (!block.includes(req.name) || !block.includes(req.quantity.toString())) {
                inconsistencies.push(`- **Salvaging**: Falta ou difere ${req.quantity}x ${req.name}`);
            }
        });
    }

    if (inconsistencies.length > 0) {
        report.push(`### ${name}`);
        report.push(inconsistencies.join('\n'));
        report.push('');
    }
}

fs.writeFileSync('inconsistencies.md', report.join('\n'));
console.log("Inconsistencies report generated.");
