const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');
const match = content.match(/export const MATERIALS_DATA.*?\[(.*?)\];/s);
if (match) {
    const names = [...match[1].matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    console.log('Materials:', names.join(', '));
    console.log('Count:', names.length);
} else {
    console.log('Not found');
}
