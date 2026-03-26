import fs from 'fs';

let text = fs.readFileSync('data.ts', 'utf-8');
const weaponMatch = text.match(/export const WEAPONS_DATA: Weapon\[\] = \[([\s\S]*?)\];/);
if (weaponMatch) {
  const block = weaponMatch[1];
  const names = [...block.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const nameCounts = {};
  names.forEach(n => nameCounts[n] = (nameCounts[n] || 0) + 1);
  console.log("Duplicate Weapons:", Object.keys(nameCounts).filter(n => nameCounts[n] > 1));
} else {
  console.log("WEAPONS_DATA not found.");
}
