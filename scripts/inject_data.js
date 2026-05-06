import fs from 'fs';

const WEAPONS_TO_ADD = [
  { id: 'w-rattler', name: 'Rattler', rarity: 'RARE', icon: 'my_location', bestBuild: [], budgetBuild: [], repairInfo: [{tier: 'I', materials: [{name: 'Mechanical Components', quantity: 2}], durability: '+40'}] },
  { id: 'w-arpeggio', name: 'Arpeggio', rarity: 'UNCOMMON', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-tempest', name: 'Tempest', rarity: 'EPIC', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-bettina', name: 'Bettina', rarity: 'COMMON', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-ferro', name: 'Ferro', rarity: 'UNCOMMON', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-aphelion', name: 'Aphelion', rarity: 'RARE', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-stitcher', name: 'Stitcher', rarity: 'COMMON', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-bobcat', name: 'Bobcat', rarity: 'UNCOMMON', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-vulcano', name: 'Vulcano', rarity: 'RARE', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-hairpin', name: 'Hairpin', rarity: 'COMMON', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-torrente', name: 'Torrente', rarity: 'RARE', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-jupiter', name: 'Jupiter', rarity: 'EPIC', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-hullcracker', name: 'Hullcracker', rarity: 'LEGENDARY', icon: 'my_location', bestBuild: [], budgetBuild: [] },
  { id: 'w-equalizer', name: 'Equalizer', rarity: 'EPIC', icon: 'my_location', bestBuild: [], budgetBuild: [] }
];

const MODS_TO_ADD = [
  ...[1, 2, 3].map(t => ({ id: `m-angled-${t}`, name: `Angled Grip ${['I','II','III'][t-1]}`, category: 'UNDERBARREL', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Mechanical Components', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-comp-${t}`, name: `Compensator ${['I','II','III'][t-1]}`, category: 'MUZZLE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-extlight-${t}`, name: `Extended Light Mag ${['I','II','III'][t-1]}`, category: 'MAGAZINE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Plastic Parts', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-extmed-${t}`, name: `Extended Medium Mag ${['I','II','III'][t-1]}`, category: 'MAGAZINE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-extshot-${t}`, name: `Extended Shotgun Mag ${['I','II','III'][t-1]}`, category: 'MAGAZINE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  { id: 'm-horiz', name: 'Horizontal Grip', category: 'UNDERBARREL', rarity: 'RARE', icon: 'square', tier: 3, materials: [{name: 'Duct Tape', quantity: 2}, {name: 'Mechanical Components', quantity: 2}] },
  { id: 'm-kinetic', name: 'Kinetic Converter', category: 'UNDERBARREL', rarity: 'EPIC', icon: 'square', tier: 4, materials: [{name: 'Advanced Mechanical Components', quantity: 2}] },
  { id: 'm-lightstock', name: 'Lightweight Stock', category: 'STOCK', rarity: 'UNCOMMON', icon: 'square', tier: 2, materials: [{name: 'Plastic Parts', quantity: 2}] },
  { id: 'm-padstock', name: 'Padded Stock', category: 'STOCK', rarity: 'RARE', icon: 'square', tier: 3, materials: [{name: 'Fabric', quantity: 4}] },
  ...[1, 2, 3].map(t => ({ id: `m-brake-${t}`, name: `Muzzle Brake ${['I','II','III'][t-1]}`, category: 'MUZZLE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-choke-${t}`, name: `Shotgun Choke ${['I','II','III'][t-1]}`, category: 'MUZZLE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  { id: 'm-shotsilencer', name: 'Shotgun Silencer', category: 'MUZZLE', rarity: 'EPIC', icon: 'square', tier: 4, materials: [{name: 'Advanced Mechanical Components', quantity: 2}] },
  ...[1, 2, 3].map(t => ({ id: `m-silence-${t}`, name: `Silencer ${['I','II','III'][t-1]}`, category: 'MUZZLE', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-stable-${t}`, name: `Stable Stock ${['I','II','III'][t-1]}`, category: 'STOCK', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
  ...[1, 2, 3].map(t => ({ id: `m-vert-${t}`, name: `Vertical Grip ${['I','II','III'][t-1]}`, category: 'UNDERBARREL', rarity: t===1?'COMMON':t===2?'UNCOMMON':'RARE', icon: 'square', tier: t, materials: [{name: 'Metal Parts', quantity: t*2}] })),
];

const AUGMENTS_TO_ADD = [
  { id: 'a-c3a', name: 'Combat Mk. 3 (Aggressive)', rarity: 'EPIC', icon: 'shield_with_heart', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-c3f', name: 'Combat Mk. 3 (Flanking)', rarity: 'EPIC', icon: 'shield_with_heart', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-l2', name: 'Looting Mk. 2', rarity: 'RARE', icon: 'shopping_bag', craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{name: 'Magnet', quantity: 2}] } },
  { id: 'a-l3c', name: 'Looting Mk. 3 (Cautious)', rarity: 'EPIC', icon: 'shopping_bag', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-l3sa', name: 'Looting Mk. 3 (Safekeeper)', rarity: 'EPIC', icon: 'shopping_bag', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-l3su', name: 'Looting Mk. 3 (Survivor)', rarity: 'EPIC', icon: 'shopping_bag', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-ib', name: 'Integrated Binoculars', rarity: 'RARE', icon: 'zoom_in', craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{name: 'Glass', quantity: 2}] } },
  { id: 'a-t2', name: 'Tactical Mk. 2', rarity: 'RARE', icon: 'tactic', craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{name: 'Magnet', quantity: 2}] } },
  { id: 'a-t3d', name: 'Tactical Mk. 3 (Defensive)', rarity: 'EPIC', icon: 'tactic', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-t3h', name: 'Tactical Mk. 3 (Healing)', rarity: 'EPIC', icon: 'tactic', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-t3r', name: 'Tactical Mk. 3 (Revival)', rarity: 'EPIC', icon: 'tactic', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-isr', name: 'Integrated Shield Recharger', rarity: 'EPIC', icon: 'bolt', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } },
  { id: 'a-id', name: 'Integrated Defibrillator', rarity: 'EPIC', icon: 'heart_minus', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 4}] } }
];

const THROWABLES_TO_ADD = [
  { id: 't-flamespray', name: 'Flame Spray', rarity: 'RARE', icon: 'whatshot', category: 'OFFENSIVE', description: 'Sprays incendiary liquid.', craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{name: 'Chemicals', quantity: 2}] } },
  { id: 't-cloak', name: 'Photoelectric Cloak', rarity: 'EPIC', icon: 'visibility_off', category: 'QUICK USE', description: 'Briefly invisible to ARC.', craftInfo: { station: 'Refiner 3', quantityProduced: 1, materials: [{name: 'Advanced Mechanical Components', quantity: 1}] } },
  { id: 't-snaphook', name: 'Snap Hook', rarity: 'UNCOMMON', icon: 'link', category: 'QUICK USE', description: 'Quick traversal across gaps.', craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{name: 'Metal Parts', quantity: 4}] } },
  { id: 't-zipline', name: 'Zipline', rarity: 'RARE', icon: 'route', category: 'QUICK USE', description: 'Bidirectional zipline for squad.', craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{name: 'Rope', quantity: 4}, {name: 'Mechanical Components', quantity: 3}] } }
];

let data = fs.readFileSync('data.ts', 'utf-8');

data = data.replace(/(export const WEAPONS_DATA: Weapon\[\] = \[)/, '$1\n  ' + WEAPONS_TO_ADD.map(x => JSON.stringify(x) + ',').join('\n  '));
data = data.replace(/(export const MODS_DATA: Modification\[\] = \[)/, '$1\n  ' + MODS_TO_ADD.map(x => JSON.stringify(x) + ',').join('\n  '));
data = data.replace(/(export const AUGMENTS_DATA: Augment\[\] = \[)/, '$1\n  ' + AUGMENTS_TO_ADD.map(x => JSON.stringify(x) + ',').join('\n  '));
data = data.replace(/(export const THROWABLES_DATA: Throwable\[\] = \[)/, '$1\n  ' + THROWABLES_TO_ADD.map(x => JSON.stringify(x) + ',').join('\n  '));

fs.writeFileSync('data.ts', data);
console.log('Injection successful');
