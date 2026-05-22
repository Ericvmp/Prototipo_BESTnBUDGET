const fs = require('fs');
const content = fs.readFileSync('components/translationDictionary.ts', 'utf8');

const itemTranslationsIndex = content.indexOf('export const itemTranslations');
const itemTranslationsText = content.substring(itemTranslationsIndex);

const materials = [
  'Metal Parts', 'Rubber Parts', 'Plastic Parts', 'Mechanical Components', 'Mod Components',
  'Steel Spring', 'Wires', 'Electrical Components', 'Duct Tape', 'Fabric', 'Assorted Seeds',
  'Chemicals', 'Oil', 'Simple Gun Parts', 'Light Gun Parts', 'Medium Gun Parts', 'Heavy Gun Parts',
  'Advanced Mechanical Components', 'Advanced Electrical Components', 'ARC Powercell', 'ARC Alloy',
  'Synthesized Fuel', 'Firefly Burner', 'Hornet Driver', 'Rocketeer Driver', 'Comet Igniter',
  'Queen Reactor', 'Matriarch Reactor', 'Hornet Drone Core', 'Hornet Weaponry Core', 'Hornet Heavy Plating',
  'Hornet Hydraulic Fluid', ' Hornet Sensor Array', ' Hornet Flight Regulator', ' Hornet Optic Sensor',
  'Sentinel Weaponry Core', 'Sentinel Optic Sensor', 'Sentinel Sensor Array', 'Sentinel Flight Regulator',
  'Sentinel Heavy Plating', 'Sentinel Drone Core', 'Sentinel Hydraulic Fluid', 'Queen Leg Armor',
  'Queen Sensory Organ', 'Queen Heavy Plating', 'Matriarch Heavy Plating', 'Matriarch Drone Core',
  'Matriarch Optic Sensor', 'Matriarch Sensor Array', 'Matriarch Hydraulic Fluid', 'Bioreactor Fuel',
  'Processor', 'Sensors', 'Kettle Core', 'Hairpin Springs', 'Stitcher Barrel', 'Anvil Barrel',
  'Arpeggio Receiver', 'Burletta Trigger', 'Rattler Slide', 'Ferro Cylinder', 'Equalizer Core',
  'Aphelion Receiver', 'Jupiter Barrel', 'Bettina Tube', 'Dolabra Blade', 'Tempest Magazine',
  'Vulcano Receiver', 'Hullcracker Receiver', 'Renegade Action', 'Venator Coil', 'Osprey Burster',
  'Torrente Barrel', 'Canto Tube', 'Il Toro Bolt', 'Unusable Weapon', 'Mechanical Parts', 'Glass',
  'Battery', 'Hairpin', 'Ferro', 'Stitcher', 'Kettle', 'Rattler', 'Bobcat', 'Aphelion', 'Jupiter',
  'Equalizer', 'Dolabra', 'Tempest', 'Bettina', 'Vulcano', 'Hullcracker', 'Renegade', 'Venator',
  'Osprey', 'Torrente', 'Canto', 'Arpeggio', 'Il Toro', 'Anvil', 'Burletta'
];

materials.forEach(w => {
  const regex = new RegExp(`"${w}"\\s*:\\s*\\{([^}]+)\\}`, 'g');
  const match = regex.exec(itemTranslationsText);
  if (match) {
    console.log(`Item: ${w} ->`, match[1].trim().replace(/\s+/g, ' '));
  } else {
    console.log(`Item: ${w} -> NOT FOUND`);
  }
});
