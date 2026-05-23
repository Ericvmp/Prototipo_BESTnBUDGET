const fs = require('fs');
const path = require('path');

const data = require('./data.cjs');
const weaponsData = data.WEAPONS_DATA;
const modsData = data.MODS_DATA;

const bestBuilds = [
  { "weapon": "Ferro", "muzzle": ["Silencer 2", "Silencer 3"], "underbarrel": ["Angled Grip 2", "Vertical Grip 2"], "magazine": [], "stock": ["Lightweight Stock"] },
  { "weapon": "Rattler", "muzzle": ["Compensator 3", "Compensator 2"], "underbarrel": ["Angled Grip 2"], "magazine": [], "stock": ["Padded Stock"] },
  { "weapon": "Stitcher", "muzzle": ["Compensator 2", "Compensator 3"], "underbarrel": ["Angled Grip 3"], "magazine": ["Extended Light Mag 3"], "stock": ["Padded Stock"] },
  { "weapon": "Kettle", "muzzle": ["Compensator 2", "Compensator 3"], "underbarrel": ["Horizontal Grip", "Angled Grip 3"], "magazine": ["Extended Light Mag 3"], "stock": ["Padded Stock"] },
  { "weapon": "Anvil", "muzzle": ["Silencer", "Extended Barrel"], "underbarrel": [], "magazine": [], "stock": [] },
  { "weapon": "Arpeggio", "muzzle": ["Compensator 3"], "underbarrel": ["Horizontal Grip"], "magazine": ["Extended Medium Mag 3"], "stock": ["Stable Stock"] },
  { "weapon": "Burletta", "muzzle": ["Compensator 3", "Compensator 2"], "underbarrel": [], "magazine": ["Extended Light Mag 3"], "stock": [] },
  { "weapon": "Il Toro", "muzzle": ["Shotgun Choke 3"], "underbarrel": [], "magazine": ["Extended Shotgun Mag 3"], "stock": ["Lightweight Stock"] },
  { "weapon": "Torrente", "muzzle": ["Compensator 3"], "underbarrel": [], "magazine": ["Extended Medium Mag 3"], "stock": ["Kinetic Converter"] },
  { "weapon": "Renegade", "muzzle": ["Silencer 2"], "underbarrel": [], "magazine": ["Extended Mag (highest tier)"], "stock": ["Stable Stock 3"] },
  { "weapon": "Osprey", "muzzle": ["Silencer 2"], "underbarrel": [], "magazine": [], "stock": ["Lightweight Stock"] },
  { "weapon": "Venator", "muzzle": [], "underbarrel": ["Angled Grip 2"], "magazine": ["Extended Medium Mag 3"], "stock": [] },
  { "weapon": "Canto", "muzzle": ["Compensator 3"], "underbarrel": ["Horizontal Grip"], "magazine": ["Extended Medium Mag 3"], "stock": ["Padded Stock"] },
  { "weapon": "Bettina", "muzzle": ["Compensator 3"], "underbarrel": ["Horizontal Grip"], "magazine": [], "stock": ["Padded Stock"] },
  { "weapon": "Bobcat", "muzzle": ["Compensator 3"], "underbarrel": ["Horizontal Grip", "Angled Grip 3"], "magazine": ["Extended Light Mag 3"], "stock": ["Padded Stock"] },
  { "weapon": "Hull Cracker", "muzzle": [], "underbarrel": [], "magazine": [], "stock": ["Kinetic Converter"] },
  { "weapon": "Tempest", "muzzle": ["Compensator 3"], "underbarrel": ["Horizontal Grip"], "magazine": ["Extended Mag (highest tier)"], "stock": [] },
  { "weapon": "Volcano", "muzzle": ["Shotgun Choke 3"], "underbarrel": ["Horizontal Grip"], "magazine": [], "stock": ["Padded Stock"] },
  { "weapon": "Aphelion", "muzzle": [], "underbarrel": ["Horizontal Grip"], "magazine": [], "stock": ["Stable Stock 3"] }
];

const findWeapon = (name) => {
  const norm = name.toLowerCase().replace(/\s/g, '').replace('vulcano', 'volcano');
  return weaponsData.find(w => w.name.toLowerCase().replace(/\s/g, '') === norm || (norm === 'volcano' && w.name === 'Vulcano'));
};

const findMod = (name) => {
  if(!name) return null;
  let searchName = name.replace(/ 1/g, ' I').replace(/ 2/g, ' II').replace(/ 3/g, ' III');
  searchName = searchName.replace(/ \(highest tier\)/g, ' III');
  if(searchName === 'Silencer') searchName = 'Silencer I';
  if(searchName === 'Extended Barrel') return modsData.find(m => m.id === 'm-extbarrel' || m.id === 'm27'); // custom mapping
  
  const possibilities = searchName.split(',').map(s => s.trim());
  for(let p of possibilities) {
    const mod = modsData.find(m => m.name.toLowerCase() === p.toLowerCase());
    if(mod) return mod;
  }
  
  const partial = modsData.find(m => m.name.toLowerCase().includes(searchName.toLowerCase().split(' ')[0]) && m.name.toLowerCase().includes(searchName.toLowerCase().split(' ')[searchName.split(' ').length - 1]));
  if(partial) return partial;

  return null;
};

const newSetups = [];

for(const b of bestBuilds) {
  const weapon = findWeapon(b.weapon);
  if(!weapon) {
    console.log("NOT FOUND WEAPON:", b.weapon);
    continue;
  }
  
  const modIds = [];
  const categories = [b.muzzle, b.underbarrel, b.magazine, b.stock];
  for(const cat of categories) {
    if(cat && cat.length > 0) {
      for(const modName of cat) {
        const mod = findMod(modName);
        if(mod) {
          modIds.push(mod.id);
          break;
        } else {
          console.log("  NOT FOUND MOD:", modName);
        }
      }
    }
  }
  
  newSetups.push({
    weaponId: weapon.id,
    setups: {
      BEST: {
        focus: "BEST BUILD",
        description: "A melhor configuração possível recomendada.",
        modIds: modIds
      }
    }
  });
}

// Convert JSON back to string with appropriate format for data.ts replacement
let setupsStr = "export const WEAPONS_SETUPS_DATA = [\n";
for(const setup of newSetups) {
  setupsStr += `  {
    weaponId: '${setup.weaponId}',
    setups: {
      BEST: { focus: 'BEST BUILD', description: 'A melhor configuração possível recomendada.', modIds: [${setup.setups.BEST.modIds.map(id => `'${id}'`).join(', ')}] }
    }
  },\n`;
}
setupsStr += "];";

fs.writeFileSync(path.join(__dirname, 'output_setups.js'), setupsStr);
console.log("Done. Check output_setups.js");
