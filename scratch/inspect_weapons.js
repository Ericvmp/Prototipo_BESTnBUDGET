const { WEAPONS_DATA } = require('./scratch/data.cjs');
console.log("Total weapons:", WEAPONS_DATA.length);
WEAPONS_DATA.forEach(w => {
  console.log(`Weapon: ${w.name}, weaponType: ${w.weaponType}, ammoType: ${w.ammoType}`);
});
