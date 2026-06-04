const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync('public/db/items.json', 'utf8'));
const match = db.items.find(i => i.id === 'tactical_mk3_smoke');
console.log("Tactical Mk. 3 (Smoke) in DB:", match);
