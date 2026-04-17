const fs = require('fs');

let content = fs.readFileSync('data.ts', 'utf8');

const newWeapons = `
  // ─── NEW: Canto (RARE SMG, Medium Ammo) ───────────────────────────────
  {
    id: 'w-canto', name: 'Canto', rarity: 'RARE', icon: 'mode_fan', imageUrl: 'https://arcraiders.wiki/w/images/thumb/f/f5/Canto.png/300px-Canto.png',
    ammoType: 'MEDIUM', weaponType: 'SMG',
    craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Magnet', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 6 }], station: 'Gunsmith 2' },
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], perks: '+4 Magazine Size, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 4 }], perks: '+2 Damage, +10 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 5 }], perks: '+2 Damage, +10 Durability' },
    ],
    recycleInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }] },
    ],
    salvageInfo: [
      { tier: 'I', materials: [{ name: 'Medium Gun Parts', quantity: 2 }] },
    ],
  },
  // ─── NEW: Dolabra (LEGENDARY Shotgun, Energy Clip) ────────────────────
  {
    id: 'w-dolabra', name: 'Dolabra', rarity: 'LEGENDARY', icon: 'bolt', imageUrl: 'https://arcraiders.wiki/w/images/thumb/d/d8/Dolabra.png/300px-Dolabra.png',
    ammoType: 'ENERGY', weaponType: 'SHOTGUN',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Shredder Gyro', quantity: 1 }, { name: 'Vaporizer Regulator', quantity: 1 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Shredder Gyro', quantity: 1 }], durability: '+50' },
    ],
    recycleInfo: [
      { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }] },
    ],
    salvageInfo: [
      { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 1 }] },
    ],
  },
`;

const newThrowables = `
  // ─── NEW GRENADES ──────────────────────────────────────────────────────
  { id: 't-gas-grenade', name: 'Gas Grenade', rarity: 'COMMON', icon: 'blur_circular', imageUrl: 'https://arcraiders.wiki/w/images/thumb/e/e8/Gas_Grenade.png/100px-Gas_Grenade.png', category: 'THROWABLES', description: 'Detonates to create a lingering toxic gas cloud that drains stamina.', stackSize: 5,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 2, materials: [{ name: 'Chemicals', quantity: 4 }, { name: 'Rubber Parts', quantity: 2 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }, { name: 'Rubber Parts', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  { id: 't-lure-grenade', name: 'Lure Grenade', rarity: 'COMMON', icon: 'radar', imageUrl: 'https://arcraiders.wiki/w/images/thumb/2/2c/Lure_Grenade.png/100px-Lure_Grenade.png', category: 'THROWABLES', description: 'Emits a signal that attracts nearby ARC to its location.', stackSize: 5,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 2, materials: [{ name: 'Electrical Components', quantity: 1 }, { name: 'Plastic Parts', quantity: 2 }] },
    recycleInfo: [{ name: 'Plastic Parts', quantity: 1 }],
    salvageInfo: [{ name: 'Plastic Parts', quantity: 1 }],
  },
  { id: 't-lil-smoke', name: "Li'l Smoke Grenade", rarity: 'COMMON', icon: 'cloud', imageUrl: 'https://arcraiders.wiki/w/images/thumb/c/c7/Li%27l_Smoke_Grenade.png/100px-Li%27l_Smoke_Grenade.png', category: 'THROWABLES', description: 'A smaller smoke grenade that creates a brief, compact smoke screen.', stackSize: 5,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 3, materials: [{ name: 'Chemicals', quantity: 4 }, { name: 'Canister', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  // ─── NEW TRAPS ─────────────────────────────────────────────────────────
  { id: 't-blaze-trap', name: 'Blaze Grenade Trap', rarity: 'UNCOMMON', icon: 'local_fire_department', imageUrl: 'https://arcraiders.wiki/w/images/thumb/4/4e/Blaze_Grenade_Trap.png/100px-Blaze_Grenade_Trap.png', category: 'THROWABLES', description: 'A laser tripwire trap that detonates a Blaze Grenade when triggered.', stackSize: 3,
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Wires', quantity: 2 }, { name: 'Chemicals', quantity: 4 }, { name: 'Oil', quantity: 2 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }, { name: 'Wires', quantity: 1 }],
    salvageInfo: [{ name: 'Wires', quantity: 1 }],
  },
  { id: 't-gas-trap', name: 'Gas Grenade Trap', rarity: 'UNCOMMON', icon: 'blur_circular', imageUrl: 'https://arcraiders.wiki/w/images/thumb/f/fa/Gas_Grenade_Trap.png/100px-Gas_Grenade_Trap.png', category: 'THROWABLES', description: 'A laser tripwire trap that releases toxic gas when triggered.', stackSize: 3,
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Wires', quantity: 2 }, { name: 'Chemicals', quantity: 4 }, { name: 'Rubber Parts', quantity: 2 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }, { name: 'Wires', quantity: 1 }],
    salvageInfo: [{ name: 'Wires', quantity: 1 }],
  },
  { id: 't-gas-mine', name: 'Gas Mine', rarity: 'UNCOMMON', icon: 'dangerous', imageUrl: 'https://arcraiders.wiki/w/images/thumb/3/3b/Gas_Mine.png/100px-Gas_Mine.png', category: 'THROWABLES', description: 'A proximity mine that releases a cloud of toxic gas when triggered.', stackSize: 3,
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Chemicals', quantity: 5 }, { name: 'Rubber Parts', quantity: 3 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 2 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  { id: 't-pulse-mine', name: 'Pulse Mine', rarity: 'UNCOMMON', icon: 'flash_on', imageUrl: 'https://arcraiders.wiki/w/images/thumb/9/91/Pulse_Mine.png/100px-Pulse_Mine.png', category: 'THROWABLES', description: 'A proximity mine that releases an EMP pulse, disabling nearby ARC on trigger.', stackSize: 3,
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 2 }, { name: 'Sensors', quantity: 1 }] },
    recycleInfo: [{ name: 'Electrical Components', quantity: 1 }],
    salvageInfo: [{ name: 'Electrical Components', quantity: 1 }],
  },
  { id: 't-lure-trap', name: 'Lure Grenade Trap', rarity: 'COMMON', icon: 'radar', imageUrl: 'https://arcraiders.wiki/w/images/thumb/c/ce/Lure_Grenade_Trap.png/100px-Lure_Grenade_Trap.png', category: 'THROWABLES', description: 'A laser tripwire trap that triggers a lure signal to distract ARC.', stackSize: 3,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Wires', quantity: 2 }, { name: 'Electrical Components', quantity: 1 }, { name: 'Plastic Parts', quantity: 2 }] },
    recycleInfo: [{ name: 'Wires', quantity: 1 }],
    salvageInfo: [{ name: 'Wires', quantity: 1 }],
  },
  { id: 't-smoke-trap', name: 'Smoke Grenade Trap', rarity: 'COMMON', icon: 'cloud', imageUrl: 'https://arcraiders.wiki/w/images/thumb/8/8e/Smoke_Grenade_Trap.png/100px-Smoke_Grenade_Trap.png', category: 'THROWABLES', description: 'A laser tripwire trap that deploys a smoke screen when triggered.', stackSize: 3,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Wires', quantity: 2 }, { name: 'Chemicals', quantity: 3 }, { name: 'Canister', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  // ─── NEW QUICK USE / HEALING ────────────────────────────────────────────
  { id: 't-bandage', name: 'Bandage', rarity: 'COMMON', icon: 'healing', imageUrl: 'https://arcraiders.wiki/w/images/thumb/0/0a/Bandage.png/100px-Bandage.png', category: 'QUICK USE', description: 'A basic wound dressing. Stops bleeding and restores a small amount of health over time.', stackSize: 5,
    craftInfo: { station: 'Refiner 1', quantityProduced: 2, materials: [{ name: 'Fabric', quantity: 2 }] },
    recycleInfo: [{ name: 'Fabric', quantity: 1 }],
    salvageInfo: [{ name: 'Fabric', quantity: 1 }],
  },
  { id: 't-adrenaline', name: 'Adrenaline Shot', rarity: 'RARE', icon: 'medical_services', imageUrl: 'https://arcraiders.wiki/w/images/thumb/3/3b/Adrenaline_Shot.png/100px-Adrenaline_Shot.png', category: 'QUICK USE', description: 'A powerful stimulant that rapidly restores stamina and briefly boosts movement speed.', stackSize: 3,
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Chemicals', quantity: 3 }, { name: 'Syringe', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Syringe', quantity: 1 }],
  },
  // ─── NEW GADGETS / UTILITY ─────────────────────────────────────────────
  { id: 't-barricade', name: 'Barricade Kit', rarity: 'UNCOMMON', icon: 'fence', imageUrl: 'https://arcraiders.wiki/w/images/thumb/d/d8/Barricade_Kit.png/100px-Barricade_Kit.png', category: 'QUICK USE', description: 'Deploys a reinforced barricade panel to block doorways and chokepoints.', stackSize: 2,
    craftInfo: { station: 'Gear Bench I', quantityProduced: 1, materials: [{ name: 'Metal Parts', quantity: 4 }, { name: 'Rope', quantity: 2 }] },
    recycleInfo: [{ name: 'Metal Parts', quantity: 2 }],
    salvageInfo: [{ name: 'Metal Parts', quantity: 1 }],
  },
  { id: 't-door-blocker', name: 'Door Blocker', rarity: 'COMMON', icon: 'door_front', imageUrl: 'https://arcraiders.wiki/w/images/thumb/9/99/Door_Blocker.png/100px-Door_Blocker.png', category: 'QUICK USE', description: 'Jams a door shut so it cannot be opened from either side.', stackSize: 3,
    craftInfo: { station: 'Gear Bench I', quantityProduced: 1, materials: [{ name: 'Metal Parts', quantity: 2 }, { name: 'Rubber Parts', quantity: 1 }] },
    recycleInfo: [{ name: 'Metal Parts', quantity: 1 }],
    salvageInfo: [{ name: 'Metal Parts', quantity: 1 }],
  },
  { id: 't-binoculars', name: 'Binoculars', rarity: 'UNCOMMON', icon: 'travel_explore', imageUrl: 'https://arcraiders.wiki/w/images/thumb/2/27/Binoculars.png/100px-Binoculars.png', category: 'QUICK USE', description: 'Long-range optical device that lets you scout at great distances.', stackSize: 1,
    craftInfo: { station: 'Gear Bench I', quantityProduced: 1, materials: [{ name: 'Processor', quantity: 1 }, { name: 'Plastic Parts', quantity: 2 }] },
    recycleInfo: [{ name: 'Plastic Parts', quantity: 1 }],
    salvageInfo: [{ name: 'Processor', quantity: 1 }],
  },
  { id: 't-zipline-quick', name: 'Zipline', rarity: 'RARE', icon: 'route', imageUrl: 'https://arcraiders.wiki/w/images/thumb/f/f9/Zipline.png/100px-Zipline.png', category: 'QUICK USE', description: 'Creates a bidirectional zipline between two anchor points for rapid traversal.', stackSize: 2,
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Rope', quantity: 4 }, { name: 'Mechanical Components', quantity: 3 }] },
    recycleInfo: [{ name: 'Rope', quantity: 2 }],
    salvageInfo: [{ name: 'Rope', quantity: 1 }],
  },
  { id: 't-flame-spray', name: 'Flame Spray', rarity: 'UNCOMMON', icon: 'local_fire_department', imageUrl: 'https://arcraiders.wiki/w/images/thumb/f/fb/Flame_Spray.png/100px-Flame_Spray.png', category: 'QUICK USE', description: 'A pressurized canister that sprays a short burst of fire in front of you.', stackSize: 3,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Canister', quantity: 1 }, { name: 'Oil', quantity: 3 }] },
    recycleInfo: [{ name: 'Canister', quantity: 1 }],
    salvageInfo: [{ name: 'Oil', quantity: 1 }],
  },
  { id: 't-fireworks', name: 'Fireworks Box', rarity: 'COMMON', icon: 'celebration', imageUrl: 'https://arcraiders.wiki/w/images/thumb/4/41/Fireworks_Box.png/100px-Fireworks_Box.png', category: 'QUICK USE', description: 'A box of colorful pyrotechnics. Create a distraction from a safe distance.', stackSize: 3,
    craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Chemicals', quantity: 2 }, { name: 'Plastic Parts', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  // ─── LIGHT STICKS ──────────────────────────────────────────────────────
  { id: 't-green-lightstick', name: 'Green Light Stick', rarity: 'COMMON', icon: 'flashlight_on', imageUrl: 'https://arcraiders.wiki/w/images/thumb/e/e9/Green_Light_Stick.png/100px-Green_Light_Stick.png', category: 'QUICK USE', description: 'A glowing chemical stick that marks locations and provides ambient light. Color: Green.', stackSize: 10,
    craftInfo: { station: 'Refiner 1', quantityProduced: 3, materials: [{ name: 'Chemicals', quantity: 2 }, { name: 'Plastic Parts', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  { id: 't-yellow-lightstick', name: 'Yellow Light Stick', rarity: 'COMMON', icon: 'flashlight_on', imageUrl: 'https://arcraiders.wiki/w/images/thumb/7/7e/Yellow_Light_Stick.png/100px-Yellow_Light_Stick.png', category: 'QUICK USE', description: 'A glowing chemical stick that marks locations and provides ambient light. Color: Yellow.', stackSize: 10,
    craftInfo: { station: 'Refiner 1', quantityProduced: 3, materials: [{ name: 'Chemicals', quantity: 2 }, { name: 'Plastic Parts', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  { id: 't-red-lightstick', name: 'Red Light Stick', rarity: 'COMMON', icon: 'flashlight_on', imageUrl: 'https://arcraiders.wiki/w/images/thumb/a/aa/Red_Light_Stick.png/100px-Red_Light_Stick.png', category: 'QUICK USE', description: 'A glowing chemical stick that marks locations and provides ambient light. Color: Red.', stackSize: 10,
    craftInfo: { station: 'Refiner 1', quantityProduced: 3, materials: [{ name: 'Chemicals', quantity: 2 }, { name: 'Plastic Parts', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
  { id: 't-blue-lightstick', name: 'Blue Light Stick', rarity: 'COMMON', icon: 'flashlight_on', imageUrl: 'https://arcraiders.wiki/w/images/thumb/2/20/Blue_Light_Stick.png/100px-Blue_Light_Stick.png', category: 'QUICK USE', description: 'A glowing chemical stick that marks locations and provides ambient light. Color: Blue.', stackSize: 10,
    craftInfo: { station: 'Refiner 1', quantityProduced: 3, materials: [{ name: 'Chemicals', quantity: 2 }, { name: 'Plastic Parts', quantity: 1 }] },
    recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
    salvageInfo: [{ name: 'Chemicals', quantity: 1 }],
  },
`;

// Insert new weapons before WEAPONS_DATA closing bracket
content = content.replace(
  /(\s*\},\s*\];\s*\nexport const THROWABLES_DATA)/,
  `\n${newWeapons}];\n\nexport const THROWABLES_DATA`
);

// Insert new throwables before THROWABLES_DATA closing bracket
// Find the last };  ] pattern before const AUGMENTS
const augmentsIdx = content.indexOf('export const AUGMENTS_DATA');
const throwablesEnd = content.lastIndexOf('];', augmentsIdx);
content = content.slice(0, throwablesEnd) + newThrowables + '\n];\n' + content.slice(throwablesEnd + 2);

fs.writeFileSync('data.ts', content);
console.log('Done! Inserted new weapons and throwables.');
