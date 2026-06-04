const fs = require('fs');
const path = require('path');

const dbPath = path.join('public', 'db', 'items.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log("Total items in JSON:", db.items.length);

const match = db.items.find(item => item.id.includes('barrel') || item.name.toLowerCase().includes('barrel'));
console.log("Example match:", match);

const exact = db.items.find(item => item.name.includes('Extended Barrel II') || item.id === 'extended_barrel_ii');
console.log("Exact Extended Barrel II match:", exact);
