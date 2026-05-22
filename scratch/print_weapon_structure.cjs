const fs = require('fs');

const dataContent = fs.readFileSync('data.ts', 'utf8');
const weaponsStart = dataContent.indexOf('export const WEAPONS_DATA');
const weaponsEnd = dataContent.indexOf('export const THROWABLES_DATA');
const weaponsText = dataContent.substring(weaponsStart, weaponsEnd);

console.log("Has description:", weaponsText.includes("description"));
console.log("Has perks:", weaponsText.includes("perks"));

// Let's print the first 1000 characters of weaponsText to see what fields a weapon has.
console.log(weaponsText.substring(0, 1500));
