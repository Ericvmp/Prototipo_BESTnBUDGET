
import { Modification, Weapon, Material, LootCategory, Throwable, Augment, WeaponSetup } from './types';

export const MATERIALS_DATA: Material[] = [
  {
    id: 'mat1',
    name: 'Metal Parts', recycleInfo: [], salvageInfo: [], stackSize: 50,
    description: "A very common material used to craft almost anything. It is the backbone of the Foundry's manufacturing process, found in almost all loot containers and discarded machinery.",
    rarity: 'COMMON',
    icon: 'construction',
    imageUrl: 'https://arcraiders.wiki/w/images/8/89/Metal_Parts.png',
    craftInfo: { isCraftable: false, note: "Material básico" },
    residualInfo: { items: ["Steel Spring → Metal Parts", "Simple Gun Parts → 2× Metal Parts", "Magnet → 3× Metal Parts"] },
    obtainedFrom: ["Scavenging (Metal Crate, Car Hood, Server Rack, Seed Vault)", "Celeste", "Scrappy", "Mechanical/Industrial/Electrical/Technological zones"]
  },
  {
    id: 'mat2',
    name: 'Rubber Parts', recycleInfo: [], salvageInfo: [], stackSize: 50,
    description: "A common material used for flexible components, seals, and ergonomic grips. Essential for recoil management systems and airtight equipment seals.",
    rarity: 'COMMON',
    icon: 'settings_input_hdmi',
    imageUrl: 'https://arcraiders.wiki/w/images/9/93/Rubber_Parts.png',
    craftInfo: { isCraftable: false, note: "Material básico" },
    residualInfo: { items: ["Wires → 2× Rubber Parts", "ARC Flex Rubber", "Mechanical Components → 2× Rubber Parts"] },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Scrappy", "Mechanical/Industrial/Electrical zones"]
  },
  {
    id: 'mat3',
    name: 'Plastic Parts', recycleInfo: [], salvageInfo: [], stackSize: 50,
    description: "Lightweight synthetic material used in a wide variety of basic gear, structural weapon parts, and civilian salvage. Extremely versatile and easy to process.",
    rarity: 'COMMON',
    icon: 'inventory_2',
    imageUrl: 'https://arcraiders.wiki/w/images/c/c9/Plastic_Parts.png',
    craftInfo: { isCraftable: false, note: "Material básico" },
    residualInfo: { items: ["Diversos itens de lixo plástico"] },
    obtainedFrom: ["Scavenging (Industrial Drawer, Server Rack)", "Recycling", "Celeste", "Scrappy", "Commercial/Residential/Technological zones"]
  },
  {
    id: 'mat4',
    name: 'Mechanical Components', recycleInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 2 }, { name: 'Metal Parts', stackSize: 50, quantity: 3 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 3 } ], stackSize: 10,
    description: "Precision-engineered parts used for moving mechanisms in weapons and modules. These are frequently recovered from complex toolboxes and industrial crates.",
    rarity: 'UNCOMMON',
    icon: 'settings',
    imageUrl: 'https://arcraiders.wiki/w/images/9/94/Mechanical_Components.png',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 1",
      requirements: [ { name: 'Metal Parts', stackSize: 50, quantity: 7 }, { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ],
    },
    residualInfo: {
      items: [
        "Adv Mechanical Components - 1 Mechanical Component (reciclagem)",
        "Angled Grip II - 1 Mechanical Component (reciclagem)",
        "Anvil I - 2 Mechanical Components (reciclagem)",
        "Anvil II - 3 Mechanical Components (reciclagem)",
        "Anvil III - 4 Mechanical Components (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging: ARC (Bastion, Bombardier, Leaper, Shredder)", "Mechanical zones", "Recycling"]
  },
  {
    id: 'mat5',
    name: 'Mod Components', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], stackSize: 5,
    description: "Sophisticated mechanical and electronic sub-assemblies specifically required for Adv weapon modifications. Found in high-tech industrial areas.",
    rarity: 'RARE',
    icon: 'extension',
    imageUrl: 'https://arcraiders.wiki/w/images/0/0f/Mod_Components.png',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Steel Spring', stackSize: 15, quantity: 2 }, { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ],
    },
    residualInfo: {
      items: [
        "Angled Grip III - 1 Mod Component (reciclagem)",
        "Anvil Splitter - 1 Mod Component (reciclagem)",
        "Compensator III - 1 Mod Component (reciclagem)",
        "Extended Barrel - 1 Mod Component (reciclagem)",
        "Extended Light Mag III - 1 Mod Component (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging", "Recycling", "Crafting", "Security zones"]
  },
  {
    id: 'mat6',
    name: 'Steel Spring', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 1 } ], stackSize: 15,
    description: "Precision coiled high-tension metal. Critical for the operation of weapon magazines, trigger groups, and any system requiring stored mechanical energy.",
    rarity: 'COMMON',
    icon: 'reorder',
    imageUrl: 'https://arcraiders.wiki/w/images/d/db/Steel_Spring.png',
    craftInfo: { isCraftable: false },
    residualInfo: {
      items: [
        "Adv Mechanical Components - 1 Steel Spring (reciclagem)",
        "Cooling Coil - 2 Steel Springs (reciclagem)",
        "Extended Light Mag II - 1 Steel Spring (reciclagem)",
        "Extended Light Mag III - 2 Steel Springs (reciclagem)",
        "Extended Medium Mag II - 1 Steel Spring (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging (Metal Crate)", "Recycling", "Celeste", "Industrial zones"]
  },
  {
    id: 'mat7',
    name: 'Wires', recycleInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 1 } ], stackSize: 15,
    description: "Conductive wiring used for electrical paths in weapon electronics and automated modules. Can be recovered from broken circuit boards and power stations.",
    rarity: 'UNCOMMON',
    icon: 'cable',
    imageUrl: 'https://arcraiders.wiki/w/images/3/39/Wires.png',
    craftInfo: { isCraftable: false },
    residualInfo: {
      items: [
        "Acoustic Guitar - 6 Wires (reciclagem)",
        "Adv Electrical Components - 1 Wire (reciclagem)",
        "Broken Handheld Radio - 2 Wires (reciclagem)",
        "Broken Taser - 2 Wires (reciclagem)",
        "Compensator II - 1 Wire (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging (Server Rack, Power Distribution Box, Generator Fuse Box)", "Recycling", "Celeste", "Electrical/Technological zones"]
  },
  {
    id: 'mat8',
    name: 'Duct Tape', recycleInfo: [ { name: 'Fabric', stackSize: 50, quantity: 3 } ], salvageInfo: [ { name: 'Fabric', stackSize: 50, quantity: 1 } ], stackSize: 15,
    description: "Universal adhesive of the wasteland. Used for everything from field repairs to securing underbarrel attachments. A Raiders' best friend for improvised fixes.",
    rarity: 'UNCOMMON',
    icon: 'view_agenda',
    imageUrl: 'https://arcraiders.wiki/w/images/4/4e/Duct_Tape.png',
    craftInfo: { isCraftable: false },
    residualInfo: {
      items: [
        "Angled Grip II - 1 Duct Tape (reciclagem)",
        "Angled Grip III - 2 Duct Tape (reciclagem)",
        "Horizontal Grip - 2 Duct Tape (reciclagem)",
        "Kinetic Converter - 2 Duct Tape (reciclagem)",
        "Lightweight Stock - 1 Duct Tape (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Residential/Commercial zones"]
  },
  {
    id: 'mat9',
    name: 'Simple Gun Parts', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 1 } ], stackSize: 10,
    description: "Basic firearm components like receivers and slides. These are the fundamental building blocks for common-tier weapon construction and repair.",
    rarity: 'UNCOMMON',
    icon: 'hardware',
    imageUrl: 'https://arcraiders.wiki/w/images/d/da/Simple_Gun_Parts.png',
    craftInfo: { isCraftable: false },
    residualInfo: {
      items: [
        "Anvil I - 2 Simple Gun Parts (reciclagem)",
        "Anvil II - 3 Simple Gun Parts (reciclagem)",
        "Anvil III - 4 Simple Gun Parts (reciclagem)",
        "Anvil IV - 5 Simple Gun Parts (reciclagem)",
        "Arpeggio I - 2 Simple Gun Parts (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging: ARC (Wasps, Hornets, Turrets, Shredders)", "Recycling", "Celeste", "Raider/Security zones"]
  },
  {
    id: 'mat10',
    name: 'Light Gun Parts', recycleInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 2 } ], salvageInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 1 } ], stackSize: 5,
    description: "Lightweight, precision-machined internal parts optimized for high-rate-of-fire weapons like SMGs and small-caliber handguns.",
    rarity: 'RARE',
    icon: 'precision_manufacturing',
    imageUrl: 'https://arcraiders.wiki/w/images/c/c9/Light_Gun_Parts.png',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 4 } ],
    },
    residualInfo: {
      items: [
        "Bobcat I - 2 Light Gun Parts (reciclagem)",
        "Bobcat II - 3 Light Gun Parts (reciclagem)",
        "Bobcat III - 4 Light Gun Parts (reciclagem)",
        "Bobcat IV - 4 Light Gun Parts (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging", "Crafting", "Recycling", "Celeste", "Raider/Security zones"]
  },
  {
    id: 'mat11',
    name: 'Medium Gun Parts', recycleInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 2 } ], salvageInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 1 } ], stackSize: 5,
    description: "Standard durability weapon components designed for assault rifles and battle rifles. Balanced for weight and heat dissipation under sustained fire.",
    rarity: 'RARE',
    icon: 'precision_manufacturing',
    imageUrl: 'https://arcraiders.wiki/w/images/9/9a/Medium_Gun_Parts.png',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 4 } ],
    },
    residualInfo: { items: ["Armas médias (Renegade, Venator, Torrente)"] },
    obtainedFrom: ["Scavenging: ARC (Bastion, Sentinel)", "Crafting", "Recycling", "Celeste", "Raider/Security zones"]
  },
  {
    id: 'mat12',
    name: 'Heavy Gun Parts', recycleInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 2 } ], salvageInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 1 } ], stackSize: 5,
    description: "Reinforced, heavy-duty components capable of withstanding the extreme pressure and recoil of high-caliber sniper rifles and light machine guns.",
    rarity: 'RARE',
    icon: 'precision_manufacturing',
    imageUrl: 'https://arcraiders.wiki/w/images/3/33/Heavy_Gun_Parts.png',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 4 } ],
    },
    residualInfo: { items: ["Armas pesadas (Il Toro, Anvil)"] },
    obtainedFrom: ["Scavenging: ARC (Bombardier, Rocketeer)", "Crafting", "Recycling", "Celeste", "Security/Raider zones"]
  },
  {
    id: 'mat13',
    name: 'Adv Mechanical Components', recycleInfo: [ { name: 'Steel Spring', stackSize: 15, quantity: 1 }, { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], stackSize: 5,
    description: "High-tier precision parts requiring expert craftsmanship. These are essential for the construction of elite weapons and experimental tactical gear.",
    rarity: 'RARE',
    icon: 'home_repair_service',
    imageUrl: 'https://arcraiders.wiki/w/images/2/25/Advanced_Mechanical_Components.png',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Steel Spring', stackSize: 15, quantity: 2 }, { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ],
    },
    residualInfo: {
      items: [
        "Bastion Cell - 2 Adv Mechanical Components (reciclagem)",
        "Bettina I - 1 Adv Mechanical Component (reciclagem)",
        "Bettina II - 2 Adv Mechanical Components (reciclagem)",
        "Bettina III - 2 Adv Mechanical Components (reciclagem)",
        "Bettina IV - 3 Adv Mechanical Components (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging: ARC (Matriarch, Queen)", "Crafting", "Recycling", "Mechanical zones"]
  },
  {
    id: 'mat14',
    name: 'Magnet', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 1 } ], stackSize: 15,
    description: "Specialized industrial-grade magnet used in the fabrication of railgun components and Adv electromagnetic stabilization for precision scopes.",
    rarity: 'UNCOMMON',
    icon: 'u_turn_right',
    imageUrl: 'https://arcraiders.wiki/w/images/8/8c/Magnet.png',
    craftInfo: { isCraftable: false },
    residualInfo: {
      items: [
        "Combat Mk. 2 - 1 Magnet (reciclagem)",
        "Exodus Modules - 2 Magnets (reciclagem)",
        "Industrial Magnet - 2 Magnets (reciclagem)",
        "Looting Mk. 2 - 1 Magnet (reciclagem)",
        "Microscope - 3 Magnets (reciclagem)"
      ]
    },
    obtainedFrom: ["Scavenging", "Celeste", "Exodus zones", "Recycled from: Combat Mk. 2, Exodus Modules"]
  },
  {
    id: 'mat15',
    name: 'ARC Alloy', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 1 } ], stackSize: 15,
    rarity: 'UNCOMMON',
    icon: 'token',
    imageUrl: 'https://arcraiders.wiki/w/images/a/a6/ARC_Alloy.png',
    description: 'An Adv specialized alloy of ARC origin, offering exceptional electromagnetic properties and thermal resistance.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: ARC machines", "Recycling", "ARC zones"]
  },
  {
    id: 'mat16',
    name: 'ARC Powercell', stackSize: 5,
    recycleInfo: [],
    salvageInfo: [],
    rarity: 'COMMON',
    icon: 'battery_charging_full',
    imageUrl: 'https://arcraiders.wiki/w/images/d/df/ARC_Powercell.png',
    description: 'A standard energy storage unit for ARC technology. Can be used to recharge portable shield devices.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: ARC (all ARC enemies)", "Recycling", "ARC zones"]
  },
  {
    id: 'mat17',
    name: 'Adv ARC Powercell', recycleInfo: [ { name: 'ARC Powercell', stackSize: 5, quantity: 2 } ], salvageInfo: [ { name: 'ARC Powercell', stackSize: 5, quantity: 1 } ], stackSize: 5,
    rarity: 'RARE',
    icon: 'battery_saver',
    imageUrl: 'https://arcraiders.wiki/w/images/3/31/Advanced_ARC_Powercell.png',
    description: 'A high-density energy source found in elite ARC units. Highly efficient and essential for high-tier equipment.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: ARC (Elite units: Comet, Bastion, Queen, Matriarch, etc)", "ARC zones"]
  },
  {
    id: 'mat18',
    name: 'Electrical Components', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 }, { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], stackSize: 10,
    rarity: 'UNCOMMON',
    icon: 'memory',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/electrical-components.webp',
    description: 'Refined circuitry and electrical hardware used in most electronic gear and weapon systems.',
    craftInfo: {
      isCraftable: true,
      location: 'Refiner 1',
      requirements: [ { name: 'Plastic Parts', stackSize: 50, quantity: 8 }, { name: 'Rubber Parts', stackSize: 50, quantity: 4 } ],
    },
    obtainedFrom: ["Scavenging", "Crafting", "Recycling", "Electrical zones"]
  },
  {
    id: 'mat19',
    name: 'Adv Electrical Components', recycleInfo: [ { name: 'Wires', stackSize: 15, quantity: 1 }, { name: 'Electrical Components', stackSize: 10, quantity: 1 } ], salvageInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 } ], stackSize: 5,
    rarity: 'RARE',
    icon: 'developer_board',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/advanced-electrical-components.webp',
    description: 'State-of-the-art microprocessors and high-frequency hardware required for Adv utility upgrades.',
    craftInfo: {
      isCraftable: true,
      location: 'Refiner 2',
      requirements: [ { name: 'Wires', stackSize: 15, quantity: 3 }, { name: 'Electrical Components', stackSize: 10, quantity: 2 } ],
    },
    obtainedFrom: ["Scavenging: ARC (Queen)", "Crafting", "Recycling", "Electrical zones"]
  },
  {
    id: 'mat20',
    name: 'ARC Circuitry', recycleInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 1 } ], stackSize: 5,
    rarity: 'RARE',
    icon: 'circuit',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/arc-circuitry.webp',
    description: 'Complex neural-like processing arrays recovered from Adv ARC units. Intricate and extremely valuable.',
    craftInfo: {
      isCraftable: true,
      location: 'Refiner 2',
      requirements: [ { name: 'ARC Alloy', stackSize: 15, quantity: 8 } ],
    },
    obtainedFrom: ["Scavenging: ARC (Baron, Bastion, Matriarch, Queen, Rocketeer)", "Recycling"]
  },
  {
    id: 'mat21',
    name: 'ARC Motion Core', recycleInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 1 } ], stackSize: 5,
    rarity: 'RARE',
    icon: 'motion_sensor_active',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/arc-motion-core.webp',
    description: 'A critical mechanical unit that manages high-speed motion and stabilization in ARC drones.',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'ARC Alloy', stackSize: 15, quantity: 8 } ],
    },
    obtainedFrom: ["Scavenging: ARC (Bastion, Courier, Leaper, Matriarch, Probe, Queen, Rocketeer, Sentinel, Surveyor)"]
  },
  {
    id: 'mat22',
    name: 'Chemicals', recycleInfo: [], salvageInfo: [], stackSize: 50,
    rarity: 'COMMON',
    icon: 'science',
    imageUrl: 'https://arcraiders.wiki/w/images/9/92/Chemicals.png',
    description: 'A variety of reactive substances used in the production of explosives and medical supplies.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Scrappy", "Mechanical/Residential/Medical zones"]
  },
  {
    id: 'mat23',
    name: 'Antiseptic', recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 10 } ], salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 5 } ], stackSize: 5,
    rarity: 'UNCOMMON',
    icon: 'sanitizer',
    imageUrl: 'https://arcraiders.wiki/w/images/f/f5/Antiseptic.png',
    description: 'Medical-grade cleaning solution, essential for preventing infection and crafting Adv healing items.',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Chemicals', stackSize: 50, quantity: 10 }, { name: 'Great Mullein', stackSize: 15, quantity: 2 } ],
    },
    obtainedFrom: ["Scavenging (Medical sector)", "Crafting", "Recycling"]
  },
  {
    id: 'mat24',
    name: 'Canister', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 1 } ], stackSize: 15,
    rarity: 'COMMON',
    icon: 'nest_cam_wired_stand',
    imageUrl: 'https://arcraiders.wiki/w/images/5/5f/Canister.png',
    description: 'A pressurized metal container suitable for storing gases or liquids.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Commercial zones"]
  },
  {
    id: 'mat25',
    name: 'Tick Pod', recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 2 }, { name: 'ARC Alloy', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 1 } ], stackSize: 3,
    rarity: 'RARE',
    icon: 'pest_control',
    imageUrl: 'https://arcraiders.wiki/w/images/9/95/Tick_Pod.png',
    description: 'Biological component harvested from ARC Ticks. Contains enzymes used in high-end medical gear.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Destroyed Ticks (ARC)"]
  },
  {
    id: 'mat26',
    name: 'Fabric', recycleInfo: [], salvageInfo: [], stackSize: 50,
    rarity: 'COMMON',
    icon: 'texture',
    imageUrl: 'https://arcraiders.wiki/w/images/2/2b/Fabric.png',
    description: 'Basic cloth remnants that can be repurposed for simple bandages or clothing repairs.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Scrappy", "Commercial/Medical/Residential zones"]
  },
  {
    id: 'mat27',
    name: 'Durable Cloth', recycleInfo: [ { name: 'Fabric', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Fabric', stackSize: 50, quantity: 2 } ], stackSize: 10,
    rarity: 'UNCOMMON',
    icon: 'layers',
    imageUrl: 'https://arcraiders.wiki/w/images/2/25/Durable_Cloth.png',
    description: 'Reinforced textile material, much stronger than standard fabric.',
    craftInfo: {
      isCraftable: true,
      location: 'Refiner 1',
      requirements: [ { name: 'Fabric', stackSize: 50, quantity: 14 } ],
    },
    obtainedFrom: ["Scavenging (Industrial Drawer, Blue Multi Drawers)", "Recycling", "Crafting", "Medical/Commercial zones"]
  },
  {
    id: 'mat28',
    name: 'Great Mullein', recycleInfo: [ { name: 'Assorted Seeds', stackSize: 100, quantity: 2 } ], salvageInfo: [ { name: 'Assorted Seeds', stackSize: 100, quantity: 1 } ], stackSize: 15,
    rarity: 'UNCOMMON',
    icon: 'eco',
    imageUrl: 'https://arcraiders.wiki/w/images/0/0d/Great_Mullein.png',
    description: 'A hardy plant with medicinal properties, often used in traditional healing.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Harvesting", "Scavenging (Backpack, Wicker Basket)", "Celeste", "Nature"]
  },
  {
    id: 'mat29',
    name: 'Moss', recycleInfo: [ { name: 'Assorted Seeds', stackSize: 100, quantity: 3 } ], salvageInfo: [ { name: 'Assorted Seeds', stackSize: 100, quantity: 2 } ], stackSize: 10,
    rarity: 'RARE',
    icon: 'grass',
    imageUrl: 'https://arcraiders.wiki/w/images/6/64/Moss.png',
    description: 'A simple biological material that can be used as a stabilizer in some chemical reactions.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging (Wicker Basket, Hydroponic Domes)", "Celeste", "Nature"]
  },
  {
    id: 'mat30',
    name: 'Battery', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 1 } ], stackSize: 15,
    rarity: 'UNCOMMON',
    icon: 'battery_full',
    imageUrl: 'https://arcraiders.wiki/w/images/6/6d/Battery.png',
    description: 'A standard portable power source for civilian and military electronics.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging (Recording Panel, Computer, Terminal, Metal Crate)", "Celeste", "Technological/Electrical zones"]
  },
  {
    id: 'mat31',
    name: 'Power Rod', recycleInfo: [ { name: 'Adv Electrical Components', stackSize: 5, quantity: 1 }, { name: 'ARC Circuitry', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Adv Electrical Components', stackSize: 5, quantity: 1 } ], stackSize: 3,
    rarity: 'RARE',
    icon: 'vertical_align_center',
    imageUrl: 'https://arcraiders.wiki/w/images/3/31/Power_Rod.png',
    description: 'A high-capacity energy conductor used in heavy-duty electronic equipment.',
    craftInfo: {
      isCraftable: true,
      location: "Refiner 3",
      requirements: [ { name: 'Adv Electrical Components', stackSize: 5, quantity: 2 }, { name: 'ARC Circuitry', stackSize: 5, quantity: 2 } ],
    },
    obtainedFrom: ["Scavenging", "Crafting", "Recycling", "Exodus zones"]
  },
  {
    id: 'mat32',
    name: 'Syringe', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 }, { name: 'Chemicals', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 2 } ], stackSize: 5,
    rarity: 'RARE',
    icon: 'vaccines',
    imageUrl: 'https://arcraiders.wiki/w/images/1/17/Syringe.png',
    description: 'A standard medical tool for injecting fluids or extracting samples.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling (Medical Kit, Vita Shot)", "Celeste", "Medical zones"]
  },
  {
    id: 'mat33',
    name: 'Voltage Converter', recycleInfo: [ { name: 'Wires', stackSize: 15, quantity: 1 }, { name: 'Rubber Parts', stackSize: 50, quantity: 1 } ], salvageInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 2 } ], stackSize: 5,
    rarity: 'RARE',
    icon: 'electrical_services',
    imageUrl: 'https://arcraiders.wiki/w/images/c/c7/Voltage_Converter.png',
    description: 'An Adv transformer designed to handle high-power ARC energy systems.',
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Electrical zones"]
  },
  {
    id: 'mat34',
    name: 'Complex Gun Parts', recycleInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 3 } ], salvageInfo: [ { name: 'Simple Gun Parts', stackSize: 10, quantity: 2 } ], stackSize: 3,
    rarity: 'RARE',
    icon: 'extension',
    imageUrl: '/images/loot/Complex_Gun_Parts.png',
    description: 'Highly intricate weapon parts required for crafting state-of-the-art ballistic firearms.',
    craftInfo: { isCraftable: true, location: 'Refiner 3', requirements: [ { name: 'Light Gun Parts', stackSize: 5, quantity: 2 }, { name: 'Medium Gun Parts', stackSize: 5, quantity: 2 }, { name: 'Heavy Gun Parts', stackSize: 5, quantity: 2 } ], },
    obtainedFrom: ["Scavenging: ARC (Queen, Matriarch)", "Recycling", "Celeste", "Security zones"]
  },
  {
    id: 'mat35',
    name: 'Magnetic Accelerator', recycleInfo: [ { name: 'Adv Mechanical Components', stackSize: 5, quantity: 1 }, { name: 'ARC Motion Core', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Adv Mechanical Components', stackSize: 5, quantity: 1 } ], stackSize: 3,
    rarity: 'EPIC',
    icon: 'all_inclusive',
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/5/5e/Magnetic_Accelerator.png/348px-Magnetic_Accelerator.png.webp',
    description: 'An extremely powerful electromagnetic module used in experimental and high-energy weapons.',
    craftInfo: { isCraftable: true, location: 'Refiner 3', requirements: [ { name: 'Adv Mechanical Components', stackSize: 5, quantity: 2 }, { name: 'ARC Motion Core', stackSize: 5, quantity: 2 } ], },
    obtainedFrom: ["Scavenging: ARC (Matriarch, Queen)", "Exodus zones"]
  },
  {
    id: 'mat36',
    name: 'Processor', stackSize: 5,
    rarity: 'RARE',
    icon: 'memory',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/processor.webp',
    description: 'A high-performance processing unit recovered from Adv ARC technology or rare weapon modifications.',
    recycleInfo: [ { name: 'Wires', stackSize: 15, quantity: 1 }, { name: 'Plastic Parts', stackSize: 50, quantity: 1 } ],
    salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging (Server Rack, Recording Panel, Computer)", "Recycling", "Celeste", "Technological zones"]
  },
  {
    id: 'mat37',
    name: 'Exodus Modules', stackSize: 3,
    rarity: 'EPIC',
    icon: 'settings_input_component',
    imageUrl: 'https://arcraiders.wiki/w/images/1/1b/Exodus_Modules.png',
    description: 'Adv coordination modules recovered from high-tier ARC units. Critical for experimental weapon synchronization.',
    recycleInfo: [ { name: 'Magnet', stackSize: 15, quantity: 2 }, { name: 'Processor', stackSize: 5, quantity: 2 } ],
    salvageInfo: [ { name: 'Processor', stackSize: 5, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Exodus zones"]
  },
  {
    id: 'mat38',
    name: 'Crude Explosives', stackSize: 10,
    rarity: 'UNCOMMON',
    icon: 'bomb',
    imageUrl: 'https://arcraiders.wiki/w/images/f/fc/Crude_Explosives.png',
    description: 'Volatile chemicals packed into an improvised container. The basic building block for Raider explosives.',
    recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 3 } ],
    salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 2 } ],
    craftInfo: {
      isCraftable: true,
      location: "Refiner 1",
      requirements: [ { name: 'Chemicals', stackSize: 50, quantity: 6 } ],
    },
    obtainedFrom: ["Scavenging (Metal Crates)", "Pop and Fireball ARC", "Industrial zones", "Security zones"]
  },
  {
    id: 'mat39',
    name: 'Explosive Compound', stackSize: 5,
    rarity: 'RARE',
    icon: 'volcano',
    imageUrl: 'https://arcraiders.wiki/w/images/1/11/Explosive_Compound.png',
    description: 'Refined explosive material capable of delivering high-yield kinetic energy. Found in military-grade caches.',
    recycleInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ],
    salvageInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 1 } ],
    craftInfo: {
      isCraftable: true,
      location: "Refiner 2",
      requirements: [ { name: 'Crude Explosives', stackSize: 10, quantity: 2 }, { name: 'Oil', stackSize: 15, quantity: 2 } ],
    },
    obtainedFrom: ["Scavenging: Comet", "Metal Crate", "Industrial zones", "Security zones"]
  },
  {
    id: 'mat40',
    name: 'Synthesized Fuel', stackSize: 5,
    rarity: 'RARE',
    icon: 'local_fire_department',
    imageUrl: 'https://arcraiders.wiki/w/images/8/8e/Synthesized_Fuel.png',
    description: 'High-energy liquid fuel synthesized for propulsion and incendiary devices. Extremely flammable.',
    recycleInfo: [ { name: 'Oil', stackSize: 15, quantity: 1 }, { name: 'Plastic Parts', stackSize: 50, quantity: 1 } ],
    salvageInfo: [ { name: 'Oil', stackSize: 15, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Exodus zones"]
  },
  {
    id: 'mat41',
    name: 'Firefly Burner', stackSize: 3,
    rarity: 'RARE',
    icon: 'fireplace',
    imageUrl: 'https://arcraiders.wiki/w/images/0/04/Firefly_Burner.png',
    description: 'A precision combustion unit used in high-end incendiary tactical gear.',
    recycleInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 2 }, { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ],
    salvageInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Destroyed Fireflies (ARC)", "ARC zones"]
  },
  {
    id: 'mat42',
    name: 'Rocketeer Driver', stackSize: 3,
    rarity: 'EPIC',
    icon: 'rocket_launch',
    imageUrl: 'https://arcraiders.wiki/w/images/e/ef/Rocketeer_Driver.png',
    description: 'Propulsion management system for guided rocket ordinance. Recovered from major ARC threats.',
    recycleInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 3 }, { name: 'Adv Electrical Components', stackSize: 5, quantity: 2 } ],
    salvageInfo: [ { name: 'ARC Circuitry', stackSize: 5, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Rocketeers / Rocketeer Husks", "ARC zones"]
  },
  {
    id: 'mat43',
    name: 'Comet Igniter', stackSize: 3,
    rarity: 'RARE',
    icon: 'wb_sunny',
    imageUrl: 'https://arcraiders.wiki/w/images/c/c8/Comet_Igniter.png',
    description: 'High-intensity ignition core used to trigger vacuum-level thermal reactions.',
    recycleInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 2 }, { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ],
    salvageInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Non-exploded Comets", "ARC zones"]
  },
  {
    id: 'mat44',
    name: 'Light Shield',
    rarity: 'UNCOMMON',
    icon: 'shield',
    imageUrl: 'https://arcraiders.wiki/w/images/4/40/Light_Shield.png',
    description: 'Basic protection made from salvaged parts.',
    recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 4 } ],
    salvageInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Salvaged Parts"]
  },
  {
    id: 'mat45',
    name: 'Medium Shield',
    rarity: 'RARE',
    icon: 'shield',
    imageUrl: 'https://arcraiders.wiki/w/images/4/41/Medium_Shield.png',
    description: 'Standard Shield that offers Raiders fair protection.',
    recycleInfo: [ { name: 'ARC Circuitry', stackSize: 5, quantity: 1 } ],
    salvageInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: ARC technology"]
  },
  {
    id: 'mat46',
    name: 'Heavy Shield',
    rarity: 'EPIC',
    icon: 'shield',
    imageUrl: 'https://arcraiders.wiki/w/images/f/f9/Heavy_Shield.png',
    description: 'Heavy Shield offering maximum protection.',
    recycleInfo: [ { name: 'ARC Circuitry', stackSize: 5, quantity: 2 }, { name: 'Voltage Converter', stackSize: 5, quantity: 1 } ],
    salvageInfo: [ { name: 'ARC Alloy', stackSize: 15, quantity: 4 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Elite ARC technology"]
  },
  {
    id: 'mat47',
    name: 'Oil', stackSize: 15,
    rarity: 'UNCOMMON',
    icon: 'opacity',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/oil.webp',
    description: 'A viscous lubricant and fuel source used in weapon maintenance and explosive manufacturing. Recycled from motors, pumps, and coolant systems.',
    recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 3 } ],
    salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Mechanical zones"]
  },
  {
    id: 'mat48',
    name: 'Rope', stackSize: 5,
    rarity: 'RARE',
    icon: 'linear_scale',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/rope.webp',
    description: 'Durable synthetic rope found in residential and commercial zones. Used for traversal gear like Ziplines and Snap Hooks.',
    recycleInfo: [ { name: 'Fabric', stackSize: 50, quantity: 5 } ],
    salvageInfo: [ { name: 'Fabric', stackSize: 50, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Residential/Commercial zones"]
  },
  {
    id: 'mat49',
    name: 'Sensors', stackSize: 5,
    rarity: 'RARE',
    icon: 'sensors',
    imageUrl: 'https://arcraiders.wiki/w/images/9/9c/Sensors.png',
    description: 'Electronic motion detectors salvaged from ARC drones and security infrastructure. Used in trap construction and tracking devices.',
    recycleInfo: [ { name: 'Wires', stackSize: 15, quantity: 1 }, { name: 'Metal Parts', stackSize: 50, quantity: 1 } ],
    salvageInfo: [ { name: 'Wires', stackSize: 15, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: ARC (Snitch, Surveyor)", "Androids", "Server Racks", "Recycling", "Celeste", "Security/Technological zones"]
  },
  {
    id: 'mat50',
    name: 'Speaker Component', stackSize: 5,
    rarity: 'RARE',
    icon: 'volume_up',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/speaker-component.webp',
    description: 'An audio amplification unit salvaged from electronic devices. Used in sound-based tactical gear like lures and noisemakers.',
    recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 2 }, { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ],
    salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 2 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging", "Recycling", "Celeste", "Commercial zones"]
  },
  {
    id: 'mat51',
    name: 'Hornet Driver', stackSize: 3,
    rarity: 'RARE',
    icon: 'bolt',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/hornet-driver.webp',
    description: 'A high-voltage discharge unit recovered from destroyed ARC Hornets. Can be thrown to stun nearby ARC units and Raiders, or used in the construction of EMP devices.',
    recycleInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 }, { name: 'ARC Alloy', stackSize: 15, quantity: 1 } ],
    salvageInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: ARC (Courier, Hornet)", "ARC zones"]
  },
  {
    id: 'mat52',
    name: 'Matriarch Reactor', stackSize: 1,
    rarity: 'LEGENDARY',
    icon: 'reactor',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/matriarch-reactor.webp',
    description: 'A high-power reactor core found by scavenging destroyed Matriarchs. Extremely rare and required to craft the legendary Aphelion battle rifle.',
    recycleInfo: [ { name: 'Power Rod', stackSize: 3, quantity: 1 }, { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],
    salvageInfo: [ { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Destroyed Matriarchs", "ARC zones"]
  },
  {
    id: 'mat53',
    name: 'Queen Reactor', stackSize: 1,
    rarity: 'LEGENDARY',
    icon: 'reactor',
    imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/queen-reactor.webp',
    description: 'Recovered from destroyed Queens or their blown-off leg armor segments. Required to craft the legendary Jupiter and Equalizer weapons.',
    recycleInfo: [ { name: 'Power Rod', stackSize: 3, quantity: 1 }, { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 } ],
    salvageInfo: [ { name: 'Power Rod', stackSize: 3, quantity: 1 } ],
    craftInfo: { isCraftable: false },
    obtainedFrom: ["Scavenging: Destroyed Queens", "ARC zones"]
  }
];

export const MODS_DATA: Modification[] = [

  // MUZZLE
  { id: 'm1', name: 'Compensator I', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 5 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 3 } ], category: 'MUZZLE', rarity: 'COMMON', icon: 'settings_input_component', tier: 1, description: '20% Reduced Per-Shot Dispersion', materials: [{ name: "Metal Parts", quantity: 4 }, { name: "Wires", quantity: 2 }], imageUrl: '/images/mods/Compensator_I.png' },
  { id: 'm2', name: 'Compensator II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'settings_input_component', tier: 2, description: '40% Reduced Per-Shot Dispersion', materials: [{ name: "Mechanical Components", quantity: 2 }, { name: "Wires", quantity: 4 }], imageUrl: '/images/mods/Compensator_II.png' },
  { id: 'm3', name: 'Compensator III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MUZZLE', rarity: 'RARE', icon: 'settings_input_component', tier: 3, description: '60% Reduced Per-Shot Dispersion, 20% Increased Durability Burn Rate', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Wires", quantity: 6 }], imageUrl: '/images/mods/Compensator_III.png' },
  { id: 'mb1', name: 'Muzzle Brake I', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 5 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 3 } ], category: 'MUZZLE', rarity: 'COMMON', icon: 'filter_tilt_shift', tier: 1, description: '15% Reduced Horizontal Recoil, 10% Reduced Vertical Recoil', materials: [{ name: "Metal Parts", quantity: 5 }, { name: "Wires", quantity: 3 }], imageUrl: '/images/mods/Shotgun_Choke_I.png' },
  { id: 'mb2', name: 'Muzzle Brake II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'filter_tilt_shift', tier: 2, description: '30% Reduced Horizontal Recoil, 20% Reduced Vertical Recoil', materials: [{ name: "Mechanical Components", quantity: 3 }, { name: "Wires", quantity: 5 }], imageUrl: '/images/mods/Shotgun_Choke_II.png' },
  { id: 'mb3', name: 'Muzzle Brake III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MUZZLE', rarity: 'RARE', icon: 'filter_tilt_shift', tier: 3, description: '45% Reduced Horizontal Recoil, 35% Reduced Vertical Recoil', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Wires", quantity: 6 }], imageUrl: '/images/mods/Shotgun_Choke_II.png' },
  { id: 'm5', name: 'Shotgun Choke I', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 5 } ], salvageInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 3 } ], category: 'MUZZLE', rarity: 'COMMON', icon: 'filter_tilt_shift', tier: 1, description: '10% Reduced Base Dispersion', materials: [{ name: "Metal Parts", quantity: 6 }, { name: "Wires", quantity: 2 }], imageUrl: '/images/mods/Shotgun_Choke_I.png', weaponTypeCompatibility: ['SHOTGUN'] },
  { id: 'm6', name: 'Shotgun Choke II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'filter_tilt_shift', tier: 2, description: '20% Reduced Base Dispersion', materials: [{ name: "Mechanical Components", quantity: 4 }, { name: "Wires", quantity: 4 }], imageUrl: '/images/mods/Shotgun_Choke_II.png', weaponTypeCompatibility: ['SHOTGUN'] },
  { id: 'm6b', name: 'Shotgun Choke III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MUZZLE', rarity: 'RARE', icon: 'filter_tilt_shift', tier: 3, description: '30% Reduced Base Dispersion', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Wires", quantity: 6 }], imageUrl: '/images/mods/Shotgun_Choke_II.png', weaponTypeCompatibility: ['SHOTGUN'] },
  { id: 'ms1', name: 'Silencer I', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MUZZLE', rarity: 'COMMON', icon: 'volume_off', tier: 1, description: '20% Reduced Noise', materials: [{ name: "Wires", quantity: 4 }, { name: "Duct Tape", quantity: 2 }], imageUrl: '/images/mods/Silencer_II.png' },
  { id: 'm7', name: 'Silencer II', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'volume_off', tier: 2, description: '40% Reduced Noise', materials: [{ name: "Mechanical Components", quantity: 2 }, { name: "Duct Tape", quantity: 4 }], imageUrl: '/images/mods/Silencer_II.png' },
  { id: 'ms3', name: 'Silencer III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 3 } ], salvageInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 2 } ], category: 'MUZZLE', rarity: 'RARE', icon: 'volume_off', tier: 3, description: '60% Reduced Noise', materials: [{ name: "Mod Components", quantity: 3 }, { name: "Duct Tape", quantity: 6 }], imageUrl: '/images/mods/Silencer_II.png' },
  { id: 'm4', name: 'Extended Barrel', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MUZZLE', rarity: 'EPIC', icon: 'straighten', tier: 3, description: '25% Increased Bullet Velocity, 15% Increased Vertical Recoil', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Wires", quantity: 8 }], imageUrl: '/images/mods/Extended_Barrel.png' },


  // MAGAZINE
  { id: 'm10', name: 'Extended Light Mag I', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], category: 'MAGAZINE', rarity: 'COMMON', icon: 'view_day', tier: 1, description: '+5 Magazine Size', materials: [{ name: "Plastic Parts", quantity: 4 }, { name: "Steel Spring", quantity: 2 }], imageUrl: '/images/mods/Extended_Light_Mag_I.png', ammoCompatibility: 'LIGHT' },
  { id: 'm10b', name: 'Extended Light Mag II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MAGAZINE', rarity: 'UNCOMMON', icon: 'view_day', tier: 2, description: '+10 Magazine Size', materials: [{ name: "Mechanical Components", quantity: 2 }, { name: "Steel Spring", quantity: 4 }], imageUrl: '/images/mods/Extended_Light_Mag_II.png', ammoCompatibility: 'LIGHT' },
  { id: 'm11', name: 'Extended Light Mag III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MAGAZINE', rarity: 'RARE', icon: 'view_day', tier: 3, description: '+15 Magazine Size', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Steel Spring", quantity: 5 }], imageUrl: '/images/mods/Extended_Light_Mag_III.png', ammoCompatibility: 'LIGHT' },
  { id: 'm12', name: 'Extended Medium Mag I', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], category: 'MAGAZINE', rarity: 'COMMON', icon: 'view_day', tier: 1, description: '+4 Magazine Size', materials: [{ name: "Plastic Parts", quantity: 5 }, { name: "Steel Spring", quantity: 2 }], imageUrl: '/images/mods/Extended_Medium_Mag_I.png', ammoCompatibility: 'MEDIUM' },
  { id: 'mm2', name: 'Extended Medium Mag II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MAGAZINE', rarity: 'UNCOMMON', icon: 'view_day', tier: 2, description: '+8 Magazine Size', materials: [{ name: "Mechanical Components", quantity: 3 }, { name: "Steel Spring", quantity: 3 }], imageUrl: '/images/mods/Extended_Medium_Mag_I.png', ammoCompatibility: 'MEDIUM' },
  { id: 'm14', name: 'Extended Medium Mag III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MAGAZINE', rarity: 'RARE', icon: 'view_day', tier: 3, description: '+12 Magazine Size', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Steel Spring", quantity: 4 }], imageUrl: '/images/mods/Extended_Medium_Mag_III.png', ammoCompatibility: 'MEDIUM' },
  { id: 'msm1', name: 'Extended Shotgun Mag I', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], category: 'MAGAZINE', rarity: 'COMMON', icon: 'view_day', tier: 1, description: '+2 Magazine Size', materials: [{ name: "Plastic Parts", quantity: 3 }, { name: "Steel Spring", quantity: 1 }], imageUrl: '/images/mods/Extended_Shotgun_Mag_III.png', ammoCompatibility: 'SHOTGUN' },
  { id: 'msm2', name: 'Extended Shotgun Mag II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'MAGAZINE', rarity: 'UNCOMMON', icon: 'view_day', tier: 2, description: '+4 Magazine Size', materials: [{ name: "Mechanical Components", quantity: 2 }, { name: "Steel Spring", quantity: 2 }], imageUrl: '/images/mods/Extended_Shotgun_Mag_III.png', ammoCompatibility: 'SHOTGUN' },
  { id: 'm17', name: 'Extended Shotgun Mag III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Steel Spring', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'MAGAZINE', rarity: 'RARE', icon: 'view_day', tier: 3, description: '+6 Magazine Size', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Steel Spring", quantity: 4 }], imageUrl: '/images/mods/Extended_Shotgun_Mag_III.png', ammoCompatibility: 'SHOTGUN' },

  // UNDERBARREL
  { id: 'm18', name: 'Angled Grip I', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], category: 'UNDERBARREL', rarity: 'COMMON', icon: 'pan_tool_alt', tier: 1, description: '20% Reduced Horizontal Recoil', materials: [{ name: "Plastic Parts", quantity: 6 }, { name: "Duct Tape", quantity: 2 }], imageUrl: '/images/mods/Angled_Grip_I.png' },
  { id: 'm19', name: 'Angled Grip II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'UNDERBARREL', rarity: 'UNCOMMON', icon: 'pan_tool_alt', tier: 2, description: '30% Reduced Horizontal Recoil', materials: [{ name: "Mechanical Components", quantity: 4 }, { name: "Duct Tape", quantity: 4 }], imageUrl: '/images/mods/Angled_Grip_II.png' },
  { id: 'ma3', name: 'Angled Grip III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'UNDERBARREL', rarity: 'RARE', icon: 'pan_tool_alt', tier: 3, description: '40% Reduced Horizontal Recoil, 20% Reduced ADS Speed', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Duct Tape", quantity: 5 }], imageUrl: '/images/mods/Angled_Grip_II.png' },
  { id: 'mv1', name: 'Vertical Grip I', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ], category: 'UNDERBARREL', rarity: 'COMMON', icon: 'pan_tool_alt', tier: 1, description: '20% Reduced Vertical Recoil', materials: [{ name: "Plastic Parts", quantity: 6 }, { name: "Duct Tape", quantity: 2 }], imageUrl: '/images/mods/Vertical_Grip_III.png' },
  { id: 'mv2', name: 'Vertical Grip II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'UNDERBARREL', rarity: 'UNCOMMON', icon: 'pan_tool_alt', tier: 2, description: '30% Reduced Vertical Recoil', materials: [{ name: "Mechanical Components", quantity: 4 }, { name: "Duct Tape", quantity: 4 }], imageUrl: '/images/mods/Vertical_Grip_III.png' },
  { id: 'm22', name: 'Vertical Grip III', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 }, { name: 'Duct Tape', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'UNDERBARREL', rarity: 'RARE', icon: 'pan_tool_alt', tier: 3, description: '40% Reduced Vertical Recoil, 30% Reduced ADS Speed', materials: [{ name: "Mod Components", quantity: 3 }, { name: "Duct Tape", quantity: 6 }], imageUrl: '/images/mods/Vertical_Grip_III.png' },
  { id: 'm23', name: 'Horizontal Grip', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'UNDERBARREL', rarity: 'EPIC', icon: 'pan_tool_alt', tier: 3, description: '30% Reduced Horizontal Recoil, 30% Reduced Vertical Recoil, 30% Reduced ADS Speed', materials: [], imageUrl: '/images/mods/Horizontal_Grip.png' },

  // STOCK
  { id: 'm24', name: 'Stable Stock I', recycleInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 6 } ], salvageInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ], category: 'STOCK', rarity: 'COMMON', icon: 'format_underlined', tier: 1, description: '20% Reduced Vertical Recoil', materials: [{ name: "Metal Parts", quantity: 6 }, { name: "Steel Spring", quantity: 2 }], imageUrl: '/images/mods/Stable_Stock_I.png' },
  { id: 'm25', name: 'Stable Stock II', recycleInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 1 } ], category: 'STOCK', rarity: 'UNCOMMON', icon: 'format_underlined', tier: 2, description: '30% Reduced Vertical Recoil', materials: [{ name: "Mechanical Components", quantity: 3 }, { name: "Steel Spring", quantity: 4 }], imageUrl: '/images/mods/Stable_Stock_II.png' },
  { id: 'm26', name: 'Stable Stock III', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'STOCK', rarity: 'RARE', icon: 'format_underlined', tier: 3, description: '45% Reduced Vertical Recoil, 20% Increased Equip/Unequip Time', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Steel Spring", quantity: 5 }], imageUrl: '/images/mods/Stable_Stock_III.png' },
  { id: 'mp3', name: 'Padded Stock III', recycleInfo: [{ name: 'Mod Components', quantity: 1 }], salvageInfo: [{ name: 'Mechanical Components', quantity: 1 }], category: 'STOCK', rarity: 'RARE', icon: 'format_underlined', tier: 3, description: '20% Reduced Base Dispersion, 20% Reduced Vertical/Horizontal Recoil, 50% Reduced ADS Speed', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Duct Tape", quantity: 6 }], imageUrl: '/images/mods/Stable_Stock_III.png' },
  { id: 'm27', name: 'Lightweight Stock', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'STOCK', rarity: 'EPIC', icon: 'format_underlined', tier: 3, description: '200% Increased ADS Speed, 30% Reduced Equip/Unequip Time, 50% Increased Vertical Recoil', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Duct Tape", quantity: 5 }], imageUrl: '/images/mods/Lightweight_Stock.png' },
  { id: 'm28', name: 'Kinetic Converter', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Duct Tape', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'STOCK', rarity: 'LEGENDARY', icon: 'bolt', tier: 'LEGENDARY', description: '15% Increased Fire Rate, 20% Increased Horizontal Recoil, 20% Increased Vertical Recoil', materials: [], imageUrl: '/images/mods/Kinetic_Converter.png' },
  { id: 'm-anvilsplitter', name: 'Anvil Splitter', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Processor', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Mechanical Components', stackSize: 10, quantity: 2 } ], category: 'ALL', rarity: 'LEGENDARY', icon: 'bolt', tier: 'LEGENDARY', description: '+3 Projectiles Per Shot, 70% Reduced Projectile Damage', materials: [], imageUrl: 'https://arcraiders.wiki/w/images/thumb/e/ef/Anvil_Splitter.png/348px-Anvil_Splitter.png.webp' },
  { id: 'm-shotgunsilencer', name: 'Shotgun Silencer', recycleInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 }, { name: 'Wires', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Mod Components', stackSize: 5, quantity: 1 } ], category: 'MUZZLE', rarity: 'EPIC', icon: 'volume_off', tier: 3, description: '50% Reduced Noise', materials: [{ name: "Mod Components", quantity: 2 }, { name: "Wires", quantity: 8 }], imageUrl: '/images/mods/Silencer_II.png', weaponTypeCompatibility: ['SHOTGUN'] },
];

// ─── Weapon ↔ Mod Slot Compatibility Map ───
// Derived from ARC Raiders Wiki: each weapon accepts only specific mod slot types.
// The filter in PlannerScreen uses getModSlotType() from utils.ts to match mods to these slots.
export const WEAPON_MOD_SLOTS: Record<string, string[]> = {
  'w3':            ['Muzzle', 'Light Magazine', 'Underbarrel', 'Stock'],                               // Kettle
  'w-rattler':     ['Muzzle', 'Underbarrel', 'Stock'],                                                 // Rattler
  'w-arpeggio':    ['Muzzle', 'Medium Magazine', 'Underbarrel', 'Stock'],                               // Arpeggio
  'w-tempest':     ['Muzzle', 'Medium Magazine', 'Underbarrel'],                                        // Tempest
  'w-bettina':     ['Muzzle', 'Underbarrel', 'Stock'],                                                  // Bettina
  'w1':            ['Muzzle', 'Underbarrel', 'Stock'],                                                  // Ferro
  'w7':            ['Muzzle', 'Medium Magazine', 'Stock'],                                              // Renegade
  'w-aphelion':    ['Underbarrel', 'Stock'],                                                             // Aphelion
  'w2':            ['Muzzle', 'Light Magazine', 'Underbarrel', 'Stock'],                                // Stitcher
  'w-bobcat':      ['Muzzle', 'Light Magazine', 'Underbarrel', 'Stock'],                                // Bobcat
  'w4':            ['Shotgun Muzzle', 'Shotgun Magazine', 'Underbarrel', 'Stock'],                        // Il Toro
  'w-vulcano':     ['Shotgun Muzzle', 'Shotgun Magazine', 'Underbarrel', 'Stock'],                        // Vulcano
  'w-hairpin':     ['Light Magazine'],                                                                   // Hairpin
  'w6':            ['Muzzle', 'Light Magazine'],                                                         // Burletta
  'w8':            ['Medium Magazine', 'Underbarrel'],                                                   // Venator
  'w5':            ['Muzzle', 'Tech Mod'],                                                               // Anvil
  'w10':           ['Muzzle', 'Medium Magazine', 'Stock'],                                               // Torrente
  'w9':            ['Muzzle', 'Medium Magazine', 'Underbarrel', 'Stock'],                                // Osprey
  'w-hullcracker': ['Underbarrel', 'Stock'],                                                             // Hullcracker
  'w-jupiter':     [],                                                                                   // Jupiter (no mod slots)
  'w-equalizer':   [],                                                                                   // Equalizer (no mod slots)
};

export const WEAPONS_DATA: Weapon[] = [
  {
    id: 'w-rattler', name: 'Rattler', rarity: 'COMMON', icon: 'my_location', imageUrl: '/images/weapons/Rattler.webp',
    craftInfo: { materials: [{ name: 'Metal Parts', quantity: 16 }, { name: 'Rubber Parts', quantity: 12 }], station: 'Gunsmith 1' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 1 }, { name: 'Rubber Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Rubber Parts', quantity: 1 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 1 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 10 }, { name: 'Rubber Parts', quantity: 10 }], perks: '+4 Magazine Size, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '+8 Magazine Size, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '+12 Magazine Size, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 8 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 12 } ] },
      { tier: 'III', materials: [ { name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 4 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 8 } ] },
      { tier: 'III', materials: [ { name: 'Metal Parts', quantity: 12 } ] },
      { tier: 'IV', materials: [ { name: 'Metal Parts', quantity: 14 } ] }
    ],
    ammoType: 'LIGHT', weaponType: 'SMG'
  },
  {
    id: 'w-arpeggio', name: 'Arpeggio', rarity: 'UNCOMMON', icon: 'my_location', imageUrl: '/images/weapons/Arpeggio.webp',
    craftInfo: { materials: [{ name: 'Mechanical Components', quantity: 6 }, { name: 'Simple Gun Parts', quantity: 6 }], station: 'Gunsmith 2' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 5 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '20% Increased Fire Rate, 12.5% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Medium Gun Parts', quantity: 1 }], perks: '40% Increased Fire Rate, 25% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Medium Gun Parts', quantity: 1 }], perks: '60% Increased Fire Rate, 50% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Simple Gun Parts', quantity: 2 }, { name: 'Mechanical Components', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Simple Gun Parts', quantity: 3 }, { name: 'Mechanical Components', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 4 }, { name: 'Mechanical Components', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 5 }, { name: 'Mechanical Components', quantity: 5 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 5 } ] }
    ],
    ammoType: 'MEDIUM', weaponType: 'AR'
  },
  {
    id: 'w-tempest', name: 'Tempest', rarity: 'EPIC', icon: 'my_location', imageUrl: '/images/weapons/Tempest.webp',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 3 }, { name: 'Exodus Modules', quantity: 2 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 4 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 5 }, { name: 'Medium Gun Parts', quantity: 4 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 1 }], perks: '16.6% Reduced Horizontal Recoil, 13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }], perks: '33.3% Reduced Horizontal Recoil, 26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 4 }], perks: '50% Reduced Horizontal Recoil, 39% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 5 }, { name: 'Medium Gun Parts', quantity: 4 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Medium Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Medium Gun Parts', quantity: 5 } ] }
    ],
    ammoType: 'MEDIUM', weaponType: 'AR'
  },
  {
    id: 'w-bettina', name: 'Bettina', rarity: 'EPIC', icon: 'my_location', imageUrl: '/images/weapons/Bettina.png',
    craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 3 }, { name: 'Canister', quantity: 3 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 3 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 2 }], perks: '5% Increased Fire Rate, 11.1% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 2 }], perks: '10% Increased Fire Rate, 22.2% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 }], perks: '15% Increased Fire Rate, 33.3% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 3 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 1 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 4 } ] }
    ],
    ammoType: 'HEAVY', weaponType: 'SNIPER'
  },
  {
    id: 'w-aphelion', name: 'Aphelion', rarity: 'LEGENDARY', icon: 'my_location', imageUrl: 'https://arcraiders.wiki/w/images/8/88/Aphelion.png',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 3 }, { name: 'Complex Gun Parts', quantity: 3 }, { name: 'Matriarch Reactor', quantity: 1 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, { name: 'Complex Gun Parts', quantity: 1 }], durability: '+50' },
    ],
    upgradeInfo: [],
    recycleInfo: [ { tier: 'I', materials: [ { name: 'Magnetic Accelerator', quantity: 2 }, { name: 'Complex Gun Parts', quantity: 1 } ] } ],
    salvageInfo: [ { tier: 'I', materials: [ { name: 'Magnetic Accelerator', quantity: 1 } ] } ],
  },
  {
    id: 'w-bobcat', name: 'Bobcat', rarity: 'EPIC', icon: 'my_location', imageUrl: '/images/weapons/Bobcat.webp',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Light Gun Parts', quantity: 3 }, { name: 'Exodus Modules', quantity: 2 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Light Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Light Gun Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Light Gun Parts', quantity: 4 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 5 }, { name: 'Light Gun Parts', quantity: 4 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Light Gun Parts', quantity: 1 }], perks: '15% Reduced Dispersion, 15% Reduced Horizontal Recoil, 13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Light Gun Parts', quantity: 3 }], perks: '30% Reduced Dispersion, 30% Reduced Horizontal Recoil, 26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Light Gun Parts', quantity: 3 }], perks: '45% Reduced Dispersion, 45% Reduced Horizontal Recoil, 39% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Light Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Light Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Light Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 5 }, { name: 'Light Gun Parts', quantity: 4 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Light Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Light Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Light Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Light Gun Parts', quantity: 5 } ] }
    ],
    ammoType: 'LIGHT', weaponType: 'SMG'
  },
  {
    id: 'w-vulcano', name: 'Vulcano', rarity: 'EPIC', icon: 'my_location', imageUrl: '/images/weapons/Vulcano.webp',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 3 }, { name: 'Exodus Modules', quantity: 1 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 4 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '10% Increased Fire Rate, 13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '20% Increased Fire Rate, 26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 3 }], perks: '30% Increased Fire Rate, 40% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 5 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Heavy Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Heavy Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Heavy Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Heavy Gun Parts', quantity: 5 } ] }
    ],
  },
  {
    id: 'w-hairpin', name: 'Hairpin', rarity: 'COMMON', icon: 'my_location', imageUrl: '/images/weapons/Hairpin.webp',
    craftInfo: { materials: [{ name: 'Metal Parts', quantity: 2 }, { name: 'Plastic Parts', quantity: 5 }], station: 'Gunsmith 1' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Metal Parts', quantity: 2 }, { name: 'Rubber Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 4 }, { name: 'Rubber Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 6 }, { name: 'Simple Gun Parts', quantity: 1 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 8 }], perks: '10% Increased Fire Rate, 13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 9 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '20% Increased Fire Rate, 26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '30% Increased Fire Rate, 40% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 2 }, { name: 'Rubber Parts', quantity: 1 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 4 }, { name: 'Rubber Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Metal Parts', quantity: 6 }, { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 4 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
    ammoType: 'LIGHT', weaponType: 'PISTOL'
  },
  {
    id: 'w-jupiter', name: 'Jupiter', rarity: 'LEGENDARY', icon: 'my_location', imageUrl: 'https://arcraiders.wiki/w/images/6/68/Jupiter.png',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 3 }, { name: 'Complex Gun Parts', quantity: 3 }, { name: 'Queen Reactor', quantity: 1 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, { name: 'Complex Gun Parts', quantity: 1 }], durability: '+50' },
    ],
    upgradeInfo: [],
    recycleInfo: [ { tier: 'I', materials: [ { name: 'Magnetic Accelerator', quantity: 2 }, { name: 'Complex Gun Parts', quantity: 1 } ] } ],
    salvageInfo: [ { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 3 } ] } ],
  },
  {
    id: 'w-hullcracker', name: 'Hullcracker', rarity: 'EPIC', icon: 'my_location', imageUrl: '/images/weapons/Hullcracker.webp',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 3 }, { name: 'Exodus Modules', quantity: 1 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 4 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Heavy Gun Parts', quantity: 2 }], perks: '18% Increased Fire Rate, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '35% Increased Fire Rate, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 3 }], perks: '53% Increased Fire Rate, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Heavy Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Heavy Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 5 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Heavy Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Heavy Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Heavy Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Heavy Gun Parts', quantity: 5 } ] }
    ],
  },
  {
    id: 'w-equalizer', name: 'Equalizer', rarity: 'LEGENDARY', icon: 'my_location', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/equalizer.webp',
    craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 3 }, { name: 'Complex Gun Parts', quantity: 3 }, { name: 'Queen Reactor', quantity: 1 }], station: 'Gunsmith 3' },
    repairInfo: [
      { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, { name: 'Complex Gun Parts', quantity: 1 }], durability: '+50' },
    ],
    upgradeInfo: [],
    recycleInfo: [ { tier: 'I', materials: [ { name: 'Magnetic Accelerator', quantity: 2 }, { name: 'Complex Gun Parts', quantity: 1 } ] } ],
    salvageInfo: [ { tier: 'I', materials: [ { name: 'Magnetic Accelerator', quantity: 1 } ] } ],
  },
  {
    id: 'w1', name: 'Ferro', rarity: 'COMMON', icon: 'handyman', imageUrl: '/images/weapons/Ferro.png',
    craftInfo: { materials: [{ name: 'Metal Parts', quantity: 15 }, { name: 'Simple Gun Parts', quantity: 4 }], station: 'Weapon Workbench' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Metal Parts', quantity: 2 }, { name: 'Rubber Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 4 }, { name: 'Rubber Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 6 }, { name: 'Simple Gun Parts', quantity: 1 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 7 }], perks: '13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 9 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '39% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 2 }, { name: 'Rubber Parts', quantity: 1 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 4 }, { name: 'Rubber Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Metal Parts', quantity: 6 }, { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
  },
  {
    id: 'w2', name: 'Stitcher', rarity: 'COMMON', icon: 'adjust', imageUrl: '/images/weapons/Stitcher.png',
    craftInfo: { materials: [{ name: 'Metal Parts', quantity: 8 }, { name: 'Rubber Parts', quantity: 4 }], station: 'Gunsmith 1' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Metal Parts', quantity: 3 }, { name: 'Rubber Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 6 }, { name: 'Rubber Parts', quantity: 6 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 12 }, { name: 'Simple Gun Parts', quantity: 1 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 8 }, { name: 'Rubber Parts', quantity: 12 }], perks: '16.6% Reduced Horizontal Recoil, 13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 10 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '33.3% Reduced Horizontal Recoil, 26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '50% Reduced Horizontal Recoil, 40% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 3 }, { name: 'Rubber Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 6 }, { name: 'Rubber Parts', quantity: 6 } ] },
      { tier: 'III', materials: [ { name: 'Metal Parts', quantity: 12 }, { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 3 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 6 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
  },
  {
    id: 'w3', name: 'Kettle', rarity: 'COMMON', icon: 'fireplace', imageUrl: '/images/weapons/Kettle.png',
    craftInfo: { materials: [{ name: 'Metal Parts', quantity: 6 }, { name: 'Rubber Parts', quantity: 8 }], station: 'Gunsmith 1' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Metal Parts', quantity: 3 }, { name: 'Rubber Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 6 }, { name: 'Rubber Parts', quantity: 6 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 12 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Metal Parts', quantity: 8 }, { name: 'Plastic Parts', quantity: 10 }], perks: '25% Increased Bullet Velocity, 13% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Metal Parts', quantity: 10 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '50% Increased Bullet Velocity, 26% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '75% Increased Bullet Velocity, 40% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 3 }, { name: 'Rubber Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 6 }, { name: 'Rubber Parts', quantity: 6 } ] },
      { tier: 'III', materials: [ { name: 'Metal Parts', quantity: 12 }, { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Metal Parts', quantity: 3 } ] },
      { tier: 'II', materials: [ { name: 'Metal Parts', quantity: 6 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 1 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] }
    ],
  },
  {
    id: 'w4', name: 'Il Toro', rarity: 'UNCOMMON', icon: 'sports_martial_arts', imageUrl: '/images/weapons/Il_Toro.png',
    craftInfo: { materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 6 }], station: 'Gunsmith 1' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 5 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '17.5% Increased Fire Rate, +1 Magazine Size, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '35% Increased Fire Rate, +2 Magazine Size, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '50% Increased Fire Rate, +3 Magazine Size, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 5 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 5 } ] }
    ],
  },
  {
    id: 'w5', name: 'Anvil', rarity: 'UNCOMMON', icon: 'construction', imageUrl: '/images/weapons/Anvil.png',
    craftInfo: { materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 6 }], station: 'Gunsmith 1' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 5 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '6.5% Reduced Dispersion Recovery, 25% Increased Fire Rate, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '12.5% Reduced Dispersion Recovery, 50% Increased Fire Rate, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Heavy Gun Parts', quantity: 1 }], perks: '18.75% Reduced Dispersion Recovery, 75% Increased Fire Rate, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 5 }, { name: 'Simple Gun Parts', quantity: 5 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 4 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 5 } ] }
    ],
  },
  {
    id: 'w6', name: 'Burletta', rarity: 'UNCOMMON', icon: 'speed', imageUrl: '/images/weapons/Burletta.png',
    craftInfo: { materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 }], station: 'Gunsmith 1' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '16.6% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '33.3% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 1 }], perks: '50% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Mechanical Components', quantity: 1 }, { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Mechanical Components', quantity: 2 }, { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Mechanical Components', quantity: 3 }, { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Mechanical Components', quantity: 4 }, { name: 'Simple Gun Parts', quantity: 4 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Simple Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Simple Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Simple Gun Parts', quantity: 3 } ] }
    ],
  },
  {
    id: 'w7', name: 'Renegade', rarity: 'RARE', icon: 'dangerous', imageUrl: '/images/weapons/Renegade.png',
    craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }, { name: 'Oil', quantity: 5 }], station: 'Gunsmith 2' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '16.6% Reduced Dispersion Recovery, 25% Increased Fire Rate, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '33.3% Reduced Dispersion Recovery, 50% Increased Fire Rate, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '50% Reduced Dispersion Recovery, 75% Increased Fire Rate, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
  },
  {
    id: 'w8', name: 'Venator', rarity: 'RARE', icon: 'track_changes', imageUrl: '/images/weapons/Venator.png',
    craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }, { name: 'Magnet', quantity: 5 }], station: 'Gunsmith 2' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '13% Increased Fire Rate, 16% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '26% Increased Fire Rate, 33% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '40% Increased Fire Rate, 50% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
  },
  {
    id: 'w9', name: 'Osprey', rarity: 'RARE', icon: 'gps_fixed', imageUrl: '/images/weapons/Osprey.png',
    craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }, { name: 'Wires', quantity: 7 }], station: 'Gunsmith 2' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '20% Reduced Bolt Action Time, 12.5% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '40% Reduced Bolt Action Time, 25% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '60% Reduced Bolt Action Time, 37.5% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
  },
  {
    id: 'w10', name: 'Torrente', rarity: 'RARE', icon: 'local_fire_department', imageUrl: '/images/weapons/Torrente.png',
    craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }, { name: 'Steel Spring', quantity: 6 }], station: 'Gunsmith 2' },
repairInfo: [
      { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+50' },
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 1 }], durability: '+55' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+60' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], durability: '+65' },
    ],
    upgradeInfo: [
      { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '+10 Magazine Size, 15% Reduced Reload Time, +10 Durability' },
      { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '+20 Magazine Size, 30% Reduced Reload Time, +20 Durability' },
      { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 }], perks: '+30 Magazine Size, 45% Reduced Reload Time, +30 Durability' },
    ],
    recycleInfo: [ 
      { tier: 'I', materials: [ { name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Adv Mechanical Components', quantity: 2 }, { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Adv Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
    salvageInfo: [
      { tier: 'I', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'II', materials: [ { name: 'Medium Gun Parts', quantity: 2 } ] },
      { tier: 'III', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] },
      { tier: 'IV', materials: [ { name: 'Medium Gun Parts', quantity: 3 } ] }
    ],
  },
];

export const THROWABLES_DATA: Throwable[] = [

  {"id":"t-cloak","name":"Photoelectric Cloak","imageUrl":"https://arcraiders.wiki/w/images/0/06/Photoelectric_Cloak.png","rarity":"EPIC","icon":"visibility_off","category":"QUICK USE","description":"Briefly invisible to ARC.","craftInfo":{"station":"Refiner 3","quantityProduced":1,"materials":[{"name":"Adv Mechanical Components","quantity":1}]}},
  {"id":"t-snaphook","name":"Snap Hook","imageUrl":"https://arcraiders.wiki/w/images/5/56/Snap_Hook.png","rarity":"UNCOMMON","icon":"link","category":"QUICK USE","description":"Quick traversal across gaps.","craftInfo":{"station":"Refiner 1","quantityProduced":1,"materials":[{"name":"Metal Parts","quantity":4}]}},
  {"id":"t-zipline","name":"Zipline","imageUrl":"https://arcraiders.wiki/w/images/f/f9/Zipline.png","rarity":"RARE","icon":"route","category":"QUICK USE","description":"Bidirectional zipline for squad.","craftInfo":{"station":"Refiner 2","quantityProduced":1,"materials":[{"name":"Rope","quantity":4},{"name":"Mechanical Components","quantity":3}]}},
  // THROWABLES
  {
    id: 't1', name: 'Light Impact Grenade', recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 1 }, { name: 'Plastic Parts', stackSize: 50, quantity: 1 } ], salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 1 } ], rarity: 'COMMON', icon: 'explosion', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/light-impact-grenade.webp', stackSize: 5,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Topside (In-Round)', quantityProduced: 1, materials: [{ name: 'Plastic Parts', quantity: 2 }, { name: 'Chemicals', quantity: 3 }] } 
  },
  {
    id: 't2', name: 'Smoke Grenade', recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 2 }, { name: 'Canister', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 3 } ], rarity: 'RARE', icon: 'cloud', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/smoke-grenade.webp', stackSize: 5,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Chemicals', quantity: 14 }, { name: 'Canister', quantity: 1 }] }
  },
  {
    id: 't4', name: 'Showstopper', recycleInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 }, { name: 'Voltage Converter', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 } ], rarity: 'RARE', icon: 'motion_photos_pause', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/showstopper.webp', stackSize: 5,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 1 }, { name: 'Hornet Driver', quantity: 1 }, { name: 'Voltage Converter', quantity: 1 }] }
  },
  {
    id: 't5', name: 'Jolt Mine', recycleInfo: [ { name: 'Battery', stackSize: 15, quantity: 1 }, { name: 'Plastic Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Battery', stackSize: 15, quantity: 1 } ], rarity: 'RARE', icon: 'settings_input_antenna', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/jolt-mine.webp', stackSize: 3,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 1 }, { name: 'Battery', quantity: 1 }] } 
  },
  {
    id: 't6', name: 'Explosive Mine', recycleInfo: [ { name: 'Oil', stackSize: 15, quantity: 2 }, { name: 'Sensors', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Oil', stackSize: 15, quantity: 2 } ], rarity: 'RARE', icon: 'trip_origin', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/explosive-mine.webp', stackSize: 3,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, { name: 'Sensors', quantity: 1 }] } 
  },
  {
    id: 't7', name: 'Snap Blast Grenade', recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 1 }, { name: 'Magnet', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 2 } ], rarity: 'COMMON', icon: 'explosion', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/snap-blast-grenade.webp', stackSize: 3,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 2 }, { name: 'Magnet', quantity: 1 }] }
  },
  {
    id: 't8', name: 'Trigger\'nade', rarity: 'RARE', icon: 'back_hand', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/trigger-nade.webp', stackSize: 5,
    recycleInfo: [ { name: 'Chemicals', quantity: 1 }, { name: 'Processor', quantity: 1 } ],
    salvageInfo: [ { name: 'Processor', quantity: 1 } ],
    description: "A remote-detonated Grenade that explodes after being triggered. It can stick to almost any surface when thrown.", category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 2 }, { name: 'Processor', quantity: 1 }] }
  },
  {
    id: 't9', name: 'Heavy Fuze Grenade', recycleInfo: [ { name: 'Oil', stackSize: 15, quantity: 1 }, { name: 'Rubber Parts', stackSize: 50, quantity: 2 } ], salvageInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 1 } ], rarity: 'RARE', icon: 'bomb', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/heavy-fuze-grenade.webp', stackSize: 3,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, { name: 'Canister', quantity: 2 }] }
  },
  {
    id: 't10', name: 'Blaze Grenade', recycleInfo: [ { name: 'Metal Parts', stackSize: 50, quantity: 4 }, { name: 'Oil', stackSize: 15, quantity: 2 } ], salvageInfo: [ { name: 'Oil', stackSize: 15, quantity: 1 } ], rarity: 'RARE', icon: 'local_fire_department', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/blaze-grenade.webp', stackSize: 5,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, { name: 'Oil', quantity: 2 }] }
  },
  {
    id: 't11', name: 'Trailblazer', recycleInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ], salvageInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 2 } ], rarity: 'EPIC', icon: 'route', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/trailblazer-grenade.webp', stackSize: 3,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Synthesized Fuel', quantity: 1 }, { name: 'Crude Explosives', quantity: 2 }, { name: 'Firefly Burner', quantity: 1 }] }
  },
  {
    id: 't12', name: 'Wolfpack', recycleInfo: [ { name: 'ARC Motion Core', stackSize: 5, quantity: 1 }, { name: 'Explosive Compound', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Explosive Compound', stackSize: 5, quantity: 2 } ], rarity: 'EPIC', icon: 'rocket_launch', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/wolfpack.webp', stackSize: 1,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, { name: 'ARC Motion Core', quantity: 2 }, { name: 'Rocketeer Driver', quantity: 1 }] }
  },
  {
    id: 't13', name: 'Seeker Grenade', recycleInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 1 } ], salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 3 } ], rarity: 'RARE', icon: 'assistant_navigation', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/seeker-grenade.webp', stackSize: 5,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 1 }, { name: 'ARC Alloy', quantity: 2 }] }
  },
  {
    id: 't14', name: 'Shrapnel Grenade', recycleInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 1 }, { name: 'Metal Parts', stackSize: 50, quantity: 1 } ], salvageInfo: [ { name: 'Crude Explosives', stackSize: 10, quantity: 1 } ], rarity: 'UNCOMMON', icon: 'blur_on', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/shrapnel-grenade.webp', stackSize: 5,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 1 }, { name: 'Steel Spring', quantity: 2 }] }
  },
  {
    id: 't15', name: 'Deadline', recycleInfo: [ { name: 'Explosive Compound', stackSize: 5, quantity: 1 }, { name: 'ARC Circuitry', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Explosive Compound', stackSize: 5, quantity: 1 } ], rarity: 'EPIC', icon: 'warning', imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/deadline.webp', stackSize: 1,
    description: '', category: 'THROWABLES',
    craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Comet Igniter', quantity: 1 }, { name: 'Explosive Compound', quantity: 3 }, { name: 'ARC Circuitry', quantity: 2 }] }
  },
  // DEFENSIVE - SHIELDS
  {
    id: 't16', name: 'Light Shield', rarity: 'UNCOMMON', icon: 'shield', category: 'SHIELDS',
    imageUrl: 'https://arcraiders.wiki/w/images/4/40/Light_Shield.png',
    description: 'Basic protection made from salvaged parts. Lightweight and portable.',
    craftInfo: { station: 'Gear Bench 1', quantityProduced: 1, materials: [{name: 'ARC Alloy', quantity: 2}, {name: 'Plastic Parts', quantity: 4}] },
    recycleInfo: [{name: 'Plastic Parts', quantity: 4}],
    salvageInfo: [{name: 'ARC Alloy', quantity: 1}],
    stackSize: 1
  },
  {
    id: 't17', name: 'Medium Shield', rarity: 'RARE', icon: 'shield', category: 'SHIELDS',
    imageUrl: 'https://arcraiders.wiki/w/images/4/41/Medium_Shield.png',
    description: 'Adv protection with integrated circuitry for better durability.',
    craftInfo: { station: 'Gear Bench 2', quantityProduced: 1, materials: [{name: 'Battery', quantity: 4}, {name: 'ARC Circuitry', quantity: 1}] },
    recycleInfo: [{name: 'ARC Circuitry', quantity: 1}],
    salvageInfo: [{name: 'ARC Alloy', quantity: 2}],
    stackSize: 1
  },
  {
    id: 't18', name: 'Heavy Shield', rarity: 'EPIC', icon: 'shield', category: 'SHIELDS',
    imageUrl: 'https://arcraiders.wiki/w/images/f/f9/Heavy_Shield.png',
    description: 'Maximum protection using high-voltage components to deflect impacts.',
    craftInfo: { station: 'Gear Bench 3', quantityProduced: 1, materials: [{name: 'Power Rod', quantity: 1}, {name: 'Voltage Converter', quantity: 2}] },
    recycleInfo: [{name: 'ARC Circuitry', quantity: 2}, {name: 'Voltage Converter', quantity: 1}],
    salvageInfo: [{name: 'ARC Alloy', quantity: 4}],
    stackSize: 1
  },
  // DEFENSIVE - QUICK USE
  {
    id: 't19', name: 'Shield Recharger', recycleInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 4 } ], salvageInfo: [ { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ], rarity: 'UNCOMMON', icon: 'battery_charging_full', category: 'DEFENSIVE', stackSize: 5,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/4/44/Shield_Recharger.png/348px-Shield_Recharger.png.webp',
    description: 'Quick Use item that can be used to recharge Shields over time.',
    craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Rubber Parts', quantity: 4 }, { name: 'ARC Powercell', quantity: 1 }] }
  },
  {
    id: 't20', name: 'Surge Shield Recharger', recycleInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 } ], salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 5 } ], rarity: 'RARE', icon: 'bolt', category: 'DEFENSIVE', stackSize: 5,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/c/c9/Surge_Shield_Recharger.png/348px-Surge_Shield_Recharger.png.webp',
    description: 'Quick Use item that can be used to recharge Shields instantly.',
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 4 }, { name: 'Adv ARC Powercell', quantity: 1 }] }
  },
  {
    id: 't21', name: 'Vita Spray', recycleInfo: [ { name: 'Antiseptic', stackSize: 5, quantity: 1 }, { name: 'Canister', stackSize: 15, quantity: 1 } ], salvageInfo: [ { name: 'Antiseptic', stackSize: 5, quantity: 1 } ], rarity: 'EPIC', icon: 'medication', category: 'DEFENSIVE', stackSize: 1,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/1/1d/Vita_Spray.png/348px-Vita_Spray.png.webp',
    description: 'A pressurized healing spray that restores health rapidly over time.',
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Antiseptic', quantity: 4 }, { name: 'Canister', quantity: 1 }, { name: 'Tick Pod', quantity: 1 }] }
  },
  {
    id: 't22', name: 'Vita Shot', recycleInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 4 }, { name: 'Syringe', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Syringe', stackSize: 5, quantity: 1 } ], rarity: 'RARE', icon: 'vaccines', category: 'DEFENSIVE', stackSize: 3,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/7/7d/Vita_Shot.png/348px-Vita_Shot.png.webp',
    description: 'An injectable healing agent that provides an immediate boost to health.',
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Antiseptic', quantity: 3 }, { name: 'Syringe', quantity: 1 }] }
  },
  {
    id: 't23', name: 'Sterilized Bandage', recycleInfo: [ { name: 'Fabric', stackSize: 50, quantity: 1 }, { name: 'Antiseptic', stackSize: 5, quantity: 1 } ], salvageInfo: [ { name: 'Durable Cloth', stackSize: 10, quantity: 1 } ], rarity: 'RARE', icon: 'healing', category: 'DEFENSIVE', stackSize: 3,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/9/99/Sterilized_Bandage.png/348px-Sterilized_Bandage.png.webp',
    description: 'Clean medical wrap treated with antiseptic to heal wounds.',
    craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Durable Cloth', quantity: 2 }, { name: 'Antiseptic', quantity: 1 }] }
  },
  {
    id: 't24', name: 'Herbal Bandage', recycleInfo: [ { name: 'Assorted Seeds', stackSize: 100, quantity: 2 }, { name: 'Fabric', stackSize: 50, quantity: 5 } ], salvageInfo: [ { name: 'Fabric', stackSize: 50, quantity: 8 } ], rarity: 'UNCOMMON', icon: 'healing', category: 'DEFENSIVE', stackSize: 5,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/c/c5/Herbal_Bandage.png/348px-Herbal_Bandage.png.webp',
    description: 'A traditional bandage using medicinal plants for natural healing.',
    craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Fabric', quantity: 4 }, { name: 'Great Mullein', quantity: 2 }] }
  },
  {
    id: 't25', name: 'Defibrillator', recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 1 }, { name: 'Moss', stackSize: 10, quantity: 1 } ], salvageInfo: [ { name: 'Chemicals', stackSize: 50, quantity: 2 } ], rarity: 'RARE', icon: 'heart_minus', category: 'DEFENSIVE', stackSize: 3,
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/5/5f/Defibrillator.png/348px-Defibrillator.png.webp',
    description: 'A device used to revive downed teammates in the heat of battle.',
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Plastic Parts', quantity: 6 }, { name: 'Moss', quantity: 2 }] }
  }
];

export const AUGMENTS_DATA: Augment[] = [
  {
    id: "a0", name: "Free Loadout Augment", rarity: "COMMON", icon: "shield_with_heart", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/thumb/1/14/Combat_Mk._1.png/50px-Combat_Mk._1.png.webp",
    description: "Standard issue frame. Minimal protection and capacity.",
    perks: "Opção inicial 'sem risco'; mochila e peso básicos.",
    maxWeight: "35", backpackSlots: 14, quickUseSlots: 4, safePocketSlots: 0, shieldCompat: "Light",
    craftInfo: { station: "Default", quantityProduced: 1, materials: [] },
    recycleInfo: [], salvageInfo: []
  },
  {
    id: "a-c3a", name: "Combat Mk. 3 (Aggressive)", rarity: "EPIC", icon: "shield_with_heart", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/a/a4/Combat_Mk._3_%28Aggressive%29.png",
    description: "Built for frontline assault. High shield integrity and optimized for offensive resource deployment.",
    perks: "+2 slots de granada e regen de 2 HP a cada 5 s (pausa 30 s ao tomar dano).",
    maxWeight: "64–65", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-c3f", name: "Combat Mk. 3 (Flanking)", rarity: "EPIC", icon: "shield_with_heart", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/7/73/Combat_Mk._3_%28Flanking%29.png",
    description: "Highly mobile frame designed for rapid equipment swapping and maneuvering in close quarters.",
    perks: "+3 slots de Utility e pistolas/hand cannons equipam ~33% mais rápido.",
    maxWeight: "60", backpackSlots: 20, quickUseSlots: 5, safePocketSlots: 2, shieldCompat: "Light",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-l2", name: "Looting Mk. 2", rarity: "RARE", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/7/7c/Looting_Mk._2.png",
    description: "Scavenger's best friend. Lightweight with increased storage capacity for Trinkets.",
    perks: "+3 slots de Trinket e joga fora Ticks presos em você após ~1 s.",
    maxWeight: "60", backpackSlots: 22, quickUseSlots: 4, safePocketSlots: 2, shieldCompat: "Light",
    craftInfo: { station: "Refiner 2", quantityProduced: 1, materials: [{ name: "Magnet", quantity: 2 }] },
    recycleInfo: [{ name: "Electrical Components", quantity: 1 }],
    salvageInfo: [{ name: "Plastic Parts", quantity: 4 }]
  },
  {
    id: "a-l3c", name: "Looting Mk. 3 (Cautious)", rarity: "EPIC", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/6/68/Looting_Mk._3_%28Cautious%29.png",
    description: "Recon-optimized frame that prioritizes situational awareness and early warning systems.",
    perks: "Adrenaline Shot automático ao quebrar o escudo, com cooldown.",
    maxWeight: "70", backpackSlots: 24, quickUseSlots: 5, safePocketSlots: 2, shieldCompat: "Light",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-l3sa", name: "Looting Mk. 3 (Safekeeper)", rarity: "EPIC", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/c/c6/Looting_Mk._3_%28Safekeeper%29.png",
    description: "The ultimate extractor. Features experimental safe pocket technology for high-value assets.",
    perks: "Safe Pocket aceita qualquer item (incluindo armas), protegendo-os da perda.",
    maxWeight: "65", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-l3su", name: "Looting Mk. 3 (Survivor)", rarity: "EPIC", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/7/74/Looting_Mk._3_%28Survivor%29.png",
    description: "Exceptional solo frame designed for survival in hostile environments without support.",
    perks: "Altíssimo peso + mochila, +1 Utility; 'mula' máxima, sem perk ativável.",
    maxWeight: "80", backpackSlots: 20, quickUseSlots: 5, safePocketSlots: 3, shieldCompat: "Light / Medium",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-t2", name: "Tactical Mk. 2", rarity: "RARE", icon: "tactic", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/6/6c/Tactical_Mk._2.png",
    description: "Utility frame focused on defensive deployment and area denial strategies.",
    perks: "+1 slot de Utility e fumaça automática ao quebrar o escudo (CD fixo).",
    maxWeight: "45", backpackSlots: 17, quickUseSlots: 5, safePocketSlots: 1, shieldCompat: "Light / Medium",
    craftInfo: { station: "Refiner 2", quantityProduced: 1, materials: [{ name: "Magnet", quantity: 2 }] },
    recycleInfo: [{ name: "Electrical Components", quantity: 1 }],
    salvageInfo: [{ name: "Plastic Parts", quantity: 4 }]
  },
  {
    id: "a-t3d", name: "Tactical Mk. 3 (Defensive)", rarity: "EPIC", icon: "tactic", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/a/a9/Tactical_Mk._3_%28Defensive%29.png",
    description: "Frontline tank frame designed for maximum durability and energy redirection.",
    perks: "Integrated Shield Recharger para recarregar escudo com cooldown.",
    maxWeight: "60", backpackSlots: 20, quickUseSlots: 5, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-t3h", name: "Tactical Mk. 3 (Healing)", rarity: "EPIC", icon: "tactic", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/1/12/Tactical_Mk._3_%28Healing%29.png",
    description: "Specialized combat medic frame with integrated healing dispersal systems.",
    perks: "+3 slots de cura e nuvem de cura (~20 HP em 10 s) ao ser revivido.",
    maxWeight: "55", backpackSlots: 16, quickUseSlots: 4, safePocketSlots: 3, shieldCompat: "Light / Medium",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: "a-t3r", name: "Tactical Mk. 3 (Revival)", rarity: "EPIC", icon: "tactic", category: "AUGMENT", stackSize: 1,
    imageUrl: "https://arcraiders.wiki/w/images/e/e0/Tactical_Mk._3_%28Revival%29.png",
    description: "Support-heavy frame built for emergency squads and squad recovery operations.",
    perks: "Integrated Defibrillator (revive grátis com cooldown) e regen leve de HP.",
    maxWeight: "65", backpackSlots: 16, quickUseSlots: 5, safePocketSlots: 2, shieldCompat: "Light",
    craftInfo: { station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, { name: "Processor", quantity: 3 }] },
    recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, { name: "Processor", quantity: 1 }],
    salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
  },
  {
    id: 'a1', name: 'Combat Mk. 1', rarity: 'UNCOMMON', icon: 'shield_with_heart', category: 'AUGMENT',
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/1/14/Combat_Mk._1.png/50px-Combat_Mk._1.png.webp',
    description: 'Basic armor that supports Medium Shields.',
    perks: 'Suporta Medium Shield, pouca mochila, sem perk.',
    maxWeight: "45", backpackSlots: 16, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium",
    craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Rubber Parts', quantity: 6 }, { name: 'Plastic Parts', quantity: 10 }] },
    recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 }, { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ],
    salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ]
  },
  {
    id: 'a2', name: 'Combat Mk. 2', rarity: 'RARE', icon: 'shield_with_heart', category: 'AUGMENT',
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/5/54/Combat_Mk._2.png/50px-Combat_Mk._2.png.webp',
    description: 'Advanced frame with integrated medical systems.',
    perks: '+1 slot de granada e regen de 1 HP a cada 5 s (pausa 30 s após dano).',
    maxWeight: "55", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
    craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Magnet', quantity: 2 }, { name: 'Adv Mechanical Components', quantity: 2 }] },
    recycleInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 }, { name: 'Magnet', stackSize: 15, quantity: 1 } ],
    salvageInfo: [ { name: 'Electrical Components', stackSize: 10, quantity: 1 } ]
  },
  {
    id: 'a3', name: 'Looting Mk. 1', rarity: 'UNCOMMON', icon: 'shopping_bag', category: 'AUGMENT',
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/2/27/Looting_Mk._1.png/50px-Looting_Mk._1.png.webp',
    description: 'Increases carrying weight and backpack slots.',
    perks: 'Mais slots de mochila e peso, sem perk ativo extra.',
    maxWeight: "50", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light",
    craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Fabric', quantity: 12 }, { name: 'Plastic Parts', quantity: 8 }] },
    recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 }, { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ],
    salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ]
  },
  {
    id: 'a4', name: 'Tactical Mk. 1', rarity: 'UNCOMMON', icon: 'tactic', category: 'AUGMENT',
    imageUrl: 'https://arcraiders.wiki/w/images/thumb/1/18/Tactical_Mk._1.png/50px-Tactical_Mk._1.png.webp',
    description: 'Provides additional Quick Use slots for tactical items.',
    perks: 'Mais Quick Use, mochila menor, sem perk.',
    maxWeight: "40", backpackSlots: 15, quickUseSlots: 5, safePocketSlots: 1, shieldCompat: "Light / Medium",
    craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Wires', quantity: 8 }, { name: 'Plastic Parts', quantity: 10 }] },
    recycleInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 }, { name: 'Rubber Parts', stackSize: 50, quantity: 3 } ],
    salvageInfo: [ { name: 'Plastic Parts', stackSize: 50, quantity: 3 } ]
  }
];

export const LOOT_DATA: LootCategory[] = [
  // --- NON-CRAFTABLE ITEMS FIRST (A-Z) ---
  {
    id: 'loot-arc-alloy',
    material: 'ARC Alloy',
    materialImageUrl: 'https://arcraiders.wiki/w/images/a/a6/ARC_Alloy.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Alloy',
    sources: [
      { name: 'Damaged Leaper Pulse Unit', quantity: 3, imageUrl: '/images/loot/Damaged_Leaper_Pulse_Unit.png' },
      { name: 'Damaged Rocketeer Driver', quantity: 3, imageUrl: '/images/loot/Damaged_Rocketeer_Driver.png' },
      { name: 'Bastion Cell', quantity: 3, imageUrl: '/images/loot/Bastion_Cell.png' },
      { name: 'Bombardier Cell', quantity: 3, imageUrl: '/images/loot/Bombardier_Cell.png' },
      { name: 'Leaper Pulse Unit', quantity: 3, imageUrl: '/images/loot/Leaper_Pulse_Unit.png' },
      { name: 'Heavy Shield', quantity: 3, imageUrl: '/images/loot/Heavy_Shield.png' },
      { name: 'ARC Circuitry', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/arc-circuitry.webp' },
      { name: 'ARC Motion Core', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/arc-motion-core.webp' },
      { name: 'Rocketeer Driver', quantity: 2, imageUrl: '/images/loot/Rocketeer_Driver.png' },
    ],
  },
  {
    id: 'loot-arc-powercell',
    material: 'ARC Powercell',
    materialImageUrl: 'https://arcraiders.wiki/w/images/d/df/ARC_Powercell.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Powercell',
    sources: [
      { name: 'Adv ARC Powercell', quantity: 2, imageUrl: '/images/loot/Advanced_ARC_Powercell.png' },
    ],
  },
  {
    id: 'loot-duct-tape',
    material: 'Duct Tape',
    materialImageUrl: 'https://arcraiders.wiki/w/images/4/4e/Duct_Tape.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Duct_Tape',
    sources: [
      { name: 'Angled Grip III', quantity: 2, imageUrl: '/images/loot/Angled_Grip_III.png' },
      { name: 'Kinetic Converter', quantity: 2, imageUrl: '/images/mods/Kinetic_Converter.png' },
      { name: 'Horizontal Grip', quantity: 2, imageUrl: '/images/mods/Horizontal_Grip.png' },
      { name: 'Stable Stock III', quantity: 2, imageUrl: '/images/mods/Stable_Stock_III.png' },
      { name: 'Vertical Grip III', quantity: 2, imageUrl: '/images/mods/Vertical_Grip_III.png' },
      { name: 'Angled Grip II', quantity: 1 },
      { name: 'Lightweight Stock', quantity: 1 },
      { name: 'Padded Stock III', quantity: 1 },
    ],
  },
  {
    id: 'loot-chemicals',
    material: 'Chemicals',
    materialImageUrl: 'https://arcraiders.wiki/w/images/9/92/Chemicals.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Chemicals',
    sources: [
      { name: 'Vita Shot', quantity: 4, imageUrl: '/images/loot/Vita_Shot.png' },
      { name: 'Pulse Mine Blueprint', quantity: 2 },
      { name: 'Soap', quantity: 1, imageUrl: '/images/loot/Soap.png' },
      { name: 'Bleach', quantity: 1, imageUrl: '/images/loot/Bleach.png' },
      { name: 'Syringe', quantity: 1, imageUrl: '/images/loot/Syringe.png' },
    ],
  },
  {
    id: 'loot-rubber-parts',
    material: 'Rubber Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/9/93/Rubber_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Rubber_Parts',
    sources: [
      { name: 'Wires', quantity: 2, imageUrl: '/images/loot/Wires.png' },
      { name: 'Mechanical Components', quantity: 2, imageUrl: '/images/materials/Mechanical_Components.png' },
      { name: 'Rattler II', quantity: 2 },
      { name: 'Shield Recharger', quantity: 4 },
      { name: 'Rubber Pad', quantity: 18, imageUrl: '/images/loot/Rubber_Pad.png' },
      { name: 'Ruined Accordion', quantity: 18, imageUrl: '/images/loot/Ruined_Accordion.png' },
      { name: 'ARC Flex Rubber', quantity: 16, imageUrl: '/images/loot/ARC_Flex_Rubber.png' },
      { name: 'Diving Goggles', quantity: 12, imageUrl: '/images/loot/Diving_Goggles.png' },
      { name: 'Degraded ARC Rubber', quantity: 11, imageUrl: '/images/loot/Degraded_ARC_Rubber.png' },
      { name: 'Deflated Football', quantity: 9, imageUrl: '/images/loot/Deflated_Football.png' },
      { name: 'Expired Respirator', quantity: 8, imageUrl: '/images/loot/Expired_Respirator.png' },
      { name: 'Headphones', quantity: 7, imageUrl: '/images/loot/Headphones.png' },
      { name: 'Thermostat', quantity: 7, imageUrl: '/images/loot/Thermostat.png' },
      { name: 'Ruined Riot Shield', quantity: 6, imageUrl: '/images/loot/Ruined_Riot_Shield.png' },
    ],
  },
  {
    id: 'loot-plastic-parts',
    material: 'Plastic Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/c/c9/Plastic_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Plastic_Parts',
    sources: [
      { name: 'Toaster', quantity: 5, imageUrl: '/images/loot/Toaster.png' },
      { name: 'Processor', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/processor.webp' },
      { name: 'Vita Shot', quantity: 1, imageUrl: '/images/loot/Vita_Shot.png' },
      { name: 'Electrical Components', quantity: 3 },
      { name: 'ARC Synthetic Resin', quantity: 14, imageUrl: '/images/loot/ARC_Synthetic_Resin.png' },
      { name: 'Cooling Fan', quantity: 14, imageUrl: '/images/loot/Cooling_Fan.png' },
      { name: 'Recorder', quantity: 10, imageUrl: '/images/loot/Recorder.png' },
      { name: 'Ruined Riot Shield', quantity: 10, imageUrl: '/images/loot/Ruined_Riot_Shield.png' },
      { name: 'Shaker', quantity: 10, imageUrl: '/images/loot/Shaker.png' },
      { name: 'Dried-Out ARC Resin', quantity: 9, imageUrl: '/images/loot/Dried-Out_ARC_Resin.png' },
      { name: 'Camera Lens', quantity: 8, imageUrl: '/images/loot/Camera_Lens.png' },
      { name: 'Remote Control', quantity: 7, imageUrl: '/images/loot/Remote_Control.png' },
      { name: 'Alarm Clock', quantity: 6, imageUrl: '/images/loot/Alarm_Clock.png' },
      { name: 'Angled Grip I', quantity: 6, imageUrl: '/images/mods/Angled_Grip_I.png' },
    ],
  },

  {
    id: 'loot-magnet',
    material: 'Magnet',
    materialImageUrl: 'https://arcraiders.wiki/w/images/8/8c/Magnet.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Magnet',
    sources: [
      { name: 'Microscope', quantity: 3, imageUrl: '/images/loot/Microscope.png' },
      { name: 'Exodus Modules', quantity: 2, imageUrl: '/images/loot/Exodus_Modules.png' },
      { name: 'Industrial Magnet', quantity: 2, imageUrl: '/images/loot/Industrial_Magnet.png' },
      { name: 'Combat Mk. 2', quantity: 1, imageUrl: '/images/loot/Combat_Mk._2.png' },
      { name: 'Looting Mk. 2', quantity: 1, imageUrl: '/images/loot/Looting_Mk._2.png' },
      { name: 'Ripped Safety Vest', quantity: 1, imageUrl: '/images/loot/Ripped_Safety_Vest.png' },
      { name: 'Ruined Tactical Vest', quantity: 1, imageUrl: '/images/loot/Ruined_Tactical_Vest.png' },
      { name: 'Snap Blast Grenade', quantity: 1, imageUrl: '/images/loot/Snap_Blast_Grenade.png' },
      { name: 'Tactical Mk. 2', quantity: 1, imageUrl: '/images/loot/Tactical_Mk._2.png' },
    ],
  },
  {
    id: 'loot-metal-parts',
    material: 'Metal Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/8/89/Metal_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Metal_Parts',
    sources: [
      { name: 'Rattler IV', quantity: 12, imageUrl: '/images/weapons/Rattler.webp' },
      { name: 'Il Toro IV', quantity: 8, imageUrl: '/images/weapons/Il_Toro.png' },
      { name: 'Heavy Shield', quantity: 3, imageUrl: '/images/loot/Heavy_Shield.png' },
      { name: 'Magnet', quantity: 3, imageUrl: '/images/materials/Magnet.png' },
      { name: 'Mechanical Components', quantity: 3, imageUrl: '/images/materials/Mechanical_Components.png' },
      { name: 'Microscope', quantity: 2, imageUrl: '/images/loot/Microscope.png' },
      { name: 'Toaster', quantity: 2, imageUrl: '/images/loot/Toaster.png' },
      { name: 'Steel Spring', quantity: 2, imageUrl: '/images/materials/Steel_Spring.png' },
      { name: 'Simple Gun Parts', quantity: 2, imageUrl: '/images/materials/Simple_Gun_Parts.png' },
      { name: 'Unusable Weapon', quantity: 2, imageUrl: '/images/loot/Unusable_Weapon.png' },
    ],
  },
  {
    id: 'loot-mod-components',
    material: 'Mod Components',
    materialImageUrl: 'https://arcraiders.wiki/w/images/0/0f/Mod_Components.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Mod_Components',
    craftingStation: 'Refiner 2',
    sources: [
      { name: 'Anvil Splitter', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/thumb/e/ef/Anvil_Splitter.png/348px-Anvil_Splitter.png.webp' },
      { name: 'Kinetic Converter', quantity: 1, imageUrl: '/images/mods/Kinetic_Converter.png' },
      { name: 'Horizontal Grip', quantity: 1, imageUrl: '/images/mods/Horizontal_Grip.png' },
      { name: 'Angled Grip III', quantity: 1, imageUrl: '/images/loot/Angled_Grip_III.png' },
      { name: 'Extended Barrel', quantity: 1 },
      { name: 'Vertical Grip III', quantity: 1 },
      { name: 'Stable Stock III', quantity: 1 },
      { name: 'Padded Stock III', quantity: 1 },
      { name: 'Lightweight Stock', quantity: 1 },
      { name: 'Trigger \'Nade', quantity: 1 },
    ],
  },


  {
    id: 'loot-steel-spring',
    material: 'Steel Spring',
    materialImageUrl: 'https://arcraiders.wiki/w/images/d/db/Steel_Spring.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Steel_Spring',
    sources: [
      { name: 'Ruined Accordion', quantity: 3, imageUrl: '/images/loot/Ruined_Accordion.png' },
      { name: 'Cooling Coil', quantity: 2, imageUrl: '/images/loot/Cooling_Coil.png' },
      { name: 'Extended Light Mag III', quantity: 2, imageUrl: '/images/mods/Extended_Light_Mag_III.png' },
      { name: 'Extended Medium Mag III', quantity: 2, imageUrl: '/images/mods/Extended_Medium_Mag_III.png' },
      { name: 'Extended Shotgun Mag III', quantity: 2, imageUrl: '/images/mods/Extended_Shotgun_Mag_III.png' },
      { name: 'Spring Cushion', quantity: 2, imageUrl: '/images/loot/Spring_Cushion.png' },
      { name: 'Adv Mechanical Components', quantity: 1, imageUrl: '/images/materials/Advanced_Mechanical_Components.png' },
      { name: 'Mod Components', quantity: 1, imageUrl: '/images/materials/Mod_Components.png' },
      { name: 'Extended Light Mag II', quantity: 1, imageUrl: '/images/mods/Extended_Light_Mag_II.png' },
      { name: 'Extended Medium Mag II', quantity: 1, imageUrl: '/images/loot/Extended_Medium_Mag_II.png' },
    ],
  },
  {
    id: 'loot-wires',
    material: 'Wires',
    materialImageUrl: 'https://arcraiders.wiki/w/images/3/39/Wires.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Wires',
    sources: [
      { name: 'Portable TV', quantity: 6, imageUrl: '/images/loot/Portable_TV.png' },
      { name: 'Acoustic Guitar', quantity: 6, imageUrl: '/images/loot/Acoustic_Guitar.png' },
      { name: 'Cooling Fan', quantity: 4, imageUrl: '/images/loot/Cooling_Fan.png' },
      { name: 'Power Cable', quantity: 4, imageUrl: '/images/loot/Power_Cable.png' },
      { name: 'Toaster', quantity: 3, imageUrl: '/images/loot/Toaster.png' },
      { name: 'Damaged Heat Sink', quantity: 2, imageUrl: '/images/loot/Damaged_Heat_Sink.png' },
      { name: 'Power Bank', quantity: 2, imageUrl: '/images/loot/Power_Bank.png' },
      { name: 'Humidifier', quantity: 2, imageUrl: '/images/loot/Humidifier.png' },
      { name: 'Muzzle Brake III', quantity: 2, imageUrl: '/images/loot/Muzzle_Brake_III.png' },
      { name: 'Shotgun Choke III', quantity: 2, imageUrl: '/images/loot/Shotgun_Choke_III.png' },
      { name: 'Processor', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/processor.webp' },
      { name: 'Voltage Converter', quantity: 1, imageUrl: '/images/materials/Voltage_Converter.png' },
      { name: 'Broken Handheld Radio', quantity: 2 },
      { name: 'Broken Taser', quantity: 2 },
    ],
  },

  // --- CRAFTABLE ITEMS LAST (A-Z) ---
  {
    id: 'loot-adv-electrical',
    material: 'Adv Electrical Components',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/advanced-electrical-components.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Advanced_Electrical_Components',
    craftingStation: 'Refiner 2',
    sources: [
      { name: 'Rocketeer Driver', quantity: 2, imageUrl: '/images/loot/Rocketeer_Driver.png' },
      { name: 'Combat Mk. 3 (Aggressive)', quantity: 1, imageUrl: '/images/loot/Combat_Mk._3_(Aggressive).png' },
      { name: 'Combat Mk. 3 (Flanking)', quantity: 1, imageUrl: '/images/loot/Combat_Mk._3_(Flanking).png' },
      { name: 'Frequency Modulation Box', quantity: 1, imageUrl: '/images/loot/Frequency_Modulation_Box.png' },
      { name: 'Looting Mk. 3 (Cautious)', quantity: 1, imageUrl: '/images/loot/Looting_Mk._3_(Cautious).png' },
      { name: 'Looting Mk. 3 (Safekeeper)', quantity: 1, imageUrl: '/images/loot/Looting_Mk._3_(Safekeeper).png' },
      { name: 'Looting Mk. 3 (Survivor)', quantity: 1, imageUrl: '/images/loot/Looting_Mk._3_(Survivor).png' },
      { name: 'Photoelectric Cloak', quantity: 1, imageUrl: '/images/loot/Photoelectric_Cloak.png' },
      { name: 'Power Rod', quantity: 1, imageUrl: '/images/loot/Power_Rod.png' },
      { name: 'Tactical Mk. 3 (Defensive)', quantity: 1, imageUrl: '/images/loot/Tactical_Mk._3_(Defensive).png' },
    ],
  },
  {
    id: 'loot-adv-mechanical',
    material: 'Adv Mechanical Components',
    materialImageUrl: 'https://arcraiders.wiki/w/images/2/25/Advanced_Mechanical_Components.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Advanced_Mechanical_Components',
    craftingStation: 'Refiner 2',
    sources: [
      { name: 'Bobcat IV', quantity: 5 },
      { name: 'Tempest IV', quantity: 5 },
      { name: 'Bobcat III', quantity: 4 },
      { name: 'Hullcracker IV', quantity: 4 },
      { name: 'Tempest III', quantity: 4 },
      { name: 'Vulcano IV', quantity: 4 },
      { name: 'Bettina IV', quantity: 3 },
      { name: 'Bobcat II', quantity: 3 },
      { name: 'Hullcracker III', quantity: 3 },
      { name: 'Osprey IV', quantity: 3, imageUrl: '/images/weapons/Osprey.png' },
    ],
  },
  {
    id: 'loot-electrical-components',
    material: 'Electrical Components',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/electrical-components.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Electrical_Components',
    craftingStation: 'Refiner 1',
    sources: [
      { name: 'Fried Motherboard', quantity: 2, imageUrl: '/images/loot/Fried_Motherboard.png' },
      { name: 'Hornet Driver', quantity: 2, imageUrl: '/images/loot/Hornet_Driver.png' },
      { name: 'Rotary Encoder', quantity: 2, imageUrl: '/images/loot/Rotary_Encoder.png' },
      { name: 'Sample Cleaner', quantity: 2, imageUrl: '/images/loot/Sample_Cleaner.png' },
      { name: 'Signal Amplifier', quantity: 2, imageUrl: '/images/loot/Signal_Amplifier.png' },
      { name: 'Snitch Scanner', quantity: 2, imageUrl: '/images/loot/Snitch_Scanner.png' },
      { name: 'Spotter Relay', quantity: 2, imageUrl: '/images/loot/Spotter_Relay.png' },
      { name: 'Adv Electrical Components', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/advanced-electrical-components.webp' },
      { name: 'Combat Mk. 2', quantity: 1, imageUrl: '/images/loot/Combat_Mk._2.png' },
      { name: 'Looting Mk. 2', quantity: 1, imageUrl: '/images/loot/Looting_Mk._2.png' },
    ],
  },
  {
    id: 'loot-heavy-gun-parts',
    material: 'Heavy Gun Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/3/33/Heavy_Gun_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Heavy_Gun_Parts',
    craftingStation: 'Refiner 2',
    sources: [
      { name: 'Hullcracker IV', quantity: 5 },
      { name: 'Vulcano IV', quantity: 5 },
      { name: 'Hullcracker III', quantity: 4 },
      { name: 'Vulcano III', quantity: 4 },
      { name: 'Bettina III', quantity: 3 },
      { name: 'Bettina IV', quantity: 3 },
      { name: 'Hullcracker II', quantity: 3 },
      { name: 'Vulcano II', quantity: 3 },
      { name: 'Bettina II', quantity: 2 },
      { name: 'Bettina I', quantity: 2 },
    ],
  },
  {
    id: 'loot-light-gun-parts',
    material: 'Light Gun Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/c/c9/Light_Gun_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Light_Gun_Parts',
    craftingStation: 'Refiner 2',
    sources: [
      { name: 'Bobcat IV', quantity: 4 },
      { name: 'Bobcat III', quantity: 3 },
      { name: 'Bobcat II', quantity: 2 },
      { name: 'Bobcat I', quantity: 1 },
    ],
  },
  {
    id: 'loot-mechanical-components',
    material: 'Mechanical Components',
    materialImageUrl: 'https://arcraiders.wiki/w/images/9/94/Mechanical_Components.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Mechanical_Components',
    craftingStation: 'Refiner 1',
    sources: [
      { name: 'Arpeggio III', quantity: 4 },
      { name: 'Burletta IV', quantity: 4, imageUrl: '/images/weapons/Burletta.png' },
      { name: 'Power Drill', quantity: 4, imageUrl: '/images/loot/Power_Drill.png' },
      { name: 'Rattler IV', quantity: 4 },
    ],
  },
  {
    id: 'loot-medium-gun-parts',
    material: 'Medium Gun Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/9/9a/Medium_Gun_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Medium_Gun_Parts',
    craftingStation: 'Refiner 2',
    sources: [
      { name: 'Tempest III', quantity: 4 },
      { name: 'Tempest IV', quantity: 4 },
      { name: 'Osprey III', quantity: 3, imageUrl: '/images/weapons/Osprey.png' },
      { name: 'Osprey IV', quantity: 3, imageUrl: '/images/weapons/Osprey.png' },
      { name: 'Renegade III', quantity: 3, imageUrl: '/images/weapons/Renegade.png' },
      { name: 'Renegade IV', quantity: 3, imageUrl: '/images/weapons/Renegade.png' },
      { name: 'Tempest II', quantity: 3 },
      { name: 'Torrente III', quantity: 3, imageUrl: '/images/weapons/Torrente.png' },
      { name: 'Torrente IV', quantity: 3, imageUrl: '/images/weapons/Torrente.png' },
      { name: 'Venator III', quantity: 3, imageUrl: '/images/weapons/Venator.png' },
    ],
  },
  {
    id: 'loot-simple-gun-parts',
    material: 'Simple Gun Parts',
    materialImageUrl: 'https://arcraiders.wiki/w/images/d/da/Simple_Gun_Parts.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Simple_Gun_Parts',
    craftingStation: 'Refiner 3',
    sources: [
      { name: 'Anvil IV', quantity: 5, imageUrl: '/images/weapons/Anvil.png' },
      { name: 'Arpeggio IV', quantity: 5 },
      { name: 'Il Toro IV', quantity: 5, imageUrl: '/images/weapons/Il_Toro.png' },
      { name: 'Unusable Weapon', quantity: 5, imageUrl: '/images/loot/Unusable_Weapon.png' },
      { name: 'Anvil III', quantity: 4, imageUrl: '/images/weapons/Anvil.png' },
      { name: 'Arpeggio III', quantity: 4 },
      { name: 'Burletta IV', quantity: 4, imageUrl: '/images/weapons/Burletta.png' },
      { name: 'Il Toro III', quantity: 4, imageUrl: '/images/weapons/Il_Toro.png' },
      { name: 'Complex Gun Parts', quantity: 3, imageUrl: '/images/loot/Complex_Gun_Parts.png' },
      { name: 'Anvil II', quantity: 3, imageUrl: '/images/weapons/Anvil.png' },
    ],
  },
  {
    id: 'loot-complex-gun-parts',
    material: 'Complex Gun Parts',
    wikiUrl: 'https://arcraiders.wiki/wiki/Complex_Gun_Parts',
    craftingStation: 'Refiner 3',
    sources: [
      { name: 'Jupiter', quantity: 3, imageUrl: '/images/weapons/Jupiter.png' },
      { name: 'Aphelion', quantity: 2, imageUrl: '/images/weapons/Aphelion.png' },
      { name: 'Equalizer', quantity: 2, imageUrl: '/images/weapons/Equalizer.png' },
      { name: 'Jupiter (Tier 1)', quantity: 2 },
      { name: 'Aphelion (Tier 1)', quantity: 2 },
    ],
  },
  {
    id: 'loot-arc-circuitry',
    material: 'ARC Circuitry',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/arc-circuitry.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Circuitry',
    sources: [
      { name: 'Power Rod', quantity: 1, imageUrl: '/images/loot/Power_Rod.png' },
      { name: 'Heavy Shield', quantity: 1, imageUrl: '/images/loot/Heavy_Shield.png' },
      { name: 'Deadline', quantity: 1, imageUrl: '/images/weapons/Deadline.png' },
      { name: 'Sentinel Weaponry Core', quantity: 1 },
    ],
  },
  {
    id: 'loot-arc-motion-core',
    material: 'ARC Motion Core',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/arc-motion-core.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Motion_Core',
    sources: [
      { name: 'Wolfpack', quantity: 1, imageUrl: '/images/weapons/Wolfpack.png' },
      { name: 'Launcher Ammo', quantity: 1 },
    ],
  },
  {
    id: 'loot-processor',
    material: 'Processor',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/processor.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Processor',
    sources: [
      { name: 'Anvil Splitter', quantity: 1 },
      { name: 'Tactical Mk. 3 (Healing)', quantity: 1 },
      { name: 'Tactical Mk. 3 (Defensive)', quantity: 1 },
      { name: 'Trigger \'Nade', quantity: 1 },
    ],
  },
  {
    id: 'loot-magnetic-accelerator',
    material: 'Magnetic Accelerator',
    materialImageUrl: 'https://arcraiders.wiki/w/images/thumb/5/5e/Magnetic_Accelerator.png/348px-Magnetic_Accelerator.png.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Magnetic_Accelerator',
    craftingStation: 'Refiner 3',
    sources: [
      { name: 'Queen Reactor', quantity: 3 },
      { name: 'Matriarch Reactor', quantity: 2 },
      { name: 'Aphelion', quantity: 1 },
      { name: 'Equalizer', quantity: 1 },
      { name: 'Jupiter', quantity: 1 },
      { name: 'Magnetron', quantity: 1 },
      { name: 'Adv Mechanical Components', quantity: 1 },
      { name: 'ARC Motion Core', quantity: 1 }
    ]
  },
  {
    id: 'loot-voltage-converter',
    material: 'Voltage Converter',
    wikiUrl: 'https://arcraiders.wiki/wiki/Voltage_Converter',
    craftingStation: 'Refiner 3',
    sources: [
      { name: 'Heavy Shield', quantity: 3 },
      { name: 'Industrial Charger', quantity: 2 },
      { name: 'Ion Sputter', quantity: 2 },
      { name: 'Showstopper', quantity: 1 },
      { name: 'Signal Amplifier', quantity: 1 },
      { name: 'Wires', quantity: 1 },
      { name: 'Rubber Parts', quantity: 1 }
    ]
  },

  // --- NEWLY ADDED MATERIALS ---
  {
    id: 'loot-advanced-arc-powercell',
    material: 'Adv ARC Powercell',
    materialImageUrl: 'https://arcraiders.wiki/w/images/3/31/Advanced_ARC_Powercell.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Advanced_ARC_Powercell',
    sources: [
      { name: 'Sentinel Weaponry Core', quantity: 3 },
      { name: 'Surge Shield Recharger', quantity: 2 },
      { name: 'Tactical Mk. 3 (Healing)', quantity: 2, imageUrl: '/images/loot/Tactical_Mk._3_(Healing).png' },
      { name: 'Tactical Mk. 3 (Defensive)', quantity: 2, imageUrl: '/images/loot/Tactical_Mk._3_(Defensive).png' },
    ],
  },
  {
    id: 'loot-antiseptic',
    material: 'Antiseptic',
    materialImageUrl: 'https://arcraiders.wiki/w/images/f/f5/Antiseptic.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Antiseptic',
    sources: [
      { name: 'Vita Spray', quantity: 4, imageUrl: 'https://arcraiders.wiki/w/images/thumb/1/1d/Vita_Spray.png/348px-Vita_Spray.png.webp' },
      { name: 'Vita Shot', quantity: 3, imageUrl: 'https://arcraiders.wiki/w/images/thumb/7/7d/Vita_Shot.png/348px-Vita_Shot.png.webp' },
      { name: 'Sterilized Bandage', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/thumb/9/99/Sterilized_Bandage.png/348px-Sterilized_Bandage.png.webp' },
      { name: 'Soap', quantity: 1 },
      { name: 'Bleach', quantity: 1 },
    ],
  },
  {
    id: 'loot-canister',
    material: 'Canister',
    materialImageUrl: 'https://arcraiders.wiki/w/images/5/5f/Canister.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Canister',
    sources: [
      { name: 'Fire Extinguisher', quantity: 3 },
      { name: 'Compressed Air Can', quantity: 2 },
      { name: 'Vita Spray', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/thumb/1/1d/Vita_Spray.png/348px-Vita_Spray.png.webp' },
      { name: 'Smoke Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/smoke-grenade.webp' },
      { name: 'Heavy Fuze Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/heavy-fuze-grenade.webp' },
    ],
  },
  {
    id: 'loot-tick-pod',
    material: 'Tick Pod',
    materialImageUrl: 'https://arcraiders.wiki/w/images/9/95/Tick_Pod.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Tick_Pod',
    sources: [
      { name: 'ARC Tick', quantity: 2 },
      { name: 'ARC Tick Nymph', quantity: 1 },
    ],
  },
  {
    id: 'loot-fabric',
    material: 'Fabric',
    materialImageUrl: 'https://arcraiders.wiki/w/images/2/2b/Fabric.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Fabric',
    sources: [
      { name: 'Herbal Bandage', quantity: 5, imageUrl: 'https://arcraiders.wiki/w/images/thumb/c/c5/Herbal_Bandage.png/348px-Herbal_Bandage.png.webp' },
      { name: 'Ripped Safety Vest', quantity: 2, imageUrl: '/images/loot/Ripped_Safety_Vest.png' },
      { name: 'Ruined Tactical Vest', quantity: 4, imageUrl: '/images/loot/Ruined_Tactical_Vest.png' },
      { name: 'Rope', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/rope.webp' },
      { name: 'Sterilized Bandage', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/thumb/9/99/Sterilized_Bandage.png/348px-Sterilized_Bandage.png.webp' },
    ],
  },
  {
    id: 'loot-durable-cloth',
    material: 'Durable Cloth',
    materialImageUrl: 'https://arcraiders.wiki/w/images/2/25/Durable_Cloth.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Durable_Cloth',
    craftingStation: 'Refiner 1',
    sources: [
      { name: 'Sterilized Bandage', quantity: 2, imageUrl: 'https://arcraiders.wiki/w/images/thumb/9/99/Sterilized_Bandage.png/348px-Sterilized_Bandage.png.webp' },
      { name: 'Ruined Riot Shield', quantity: 2, imageUrl: '/images/loot/Ruined_Riot_Shield.png' },
      { name: 'Ruined Tactical Vest', quantity: 2, imageUrl: '/images/loot/Ruined_Tactical_Vest.png' },
    ],
  },
  {
    id: 'loot-great-mullein',
    material: 'Great Mullein',
    materialImageUrl: 'https://arcraiders.wiki/w/images/0/0d/Great_Mullein.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Great_Mullein',
    sources: [
      { name: 'Herbal Bandage', quantity: 2, imageUrl: 'https://arcraiders.wiki/w/images/thumb/c/c5/Herbal_Bandage.png/348px-Herbal_Bandage.png.webp' },
      { name: 'Scavenging (Outdoors / Nature zones)', quantity: 1 },
    ],
  },
  {
    id: 'loot-moss',
    material: 'Moss',
    materialImageUrl: 'https://arcraiders.wiki/w/images/6/64/Moss.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Moss',
    sources: [
      { name: 'Defibrillator', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/thumb/5/5f/Defibrillator.png/348px-Defibrillator.png.webp' },
      { name: 'Scavenging (Rocks / Damp surfaces)', quantity: 1 },
    ],
  },
  {
    id: 'loot-battery',
    material: 'Battery',
    materialImageUrl: 'https://arcraiders.wiki/w/images/6/6d/Battery.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Battery',
    sources: [
      { name: 'Jolt Mine', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/jolt-mine.webp' },
      { name: 'Power Bank', quantity: 2, imageUrl: '/images/loot/Power_Bank.png' },
      { name: 'Alarm Clock', quantity: 1, imageUrl: '/images/loot/Alarm_Clock.png' },
      { name: 'Portable TV', quantity: 2, imageUrl: '/images/loot/Portable_TV.png' },
    ],
  },
  {
    id: 'loot-power-rod',
    material: 'Power Rod',
    materialImageUrl: 'https://arcraiders.wiki/w/images/3/31/Power_Rod.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Power_Rod',
    sources: [
      { name: 'Queen Reactor', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/queen-reactor.webp' },
      { name: 'Matriarch Reactor', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/matriarch-reactor.webp' },
      { name: 'Adv Electrical Components', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/advanced-electrical-components.webp' },
    ],
  },
  {
    id: 'loot-syringe',
    material: 'Syringe',
    materialImageUrl: 'https://arcraiders.wiki/w/images/1/17/Syringe.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Syringe',
    sources: [
      { name: 'Vita Shot', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/thumb/7/7d/Vita_Shot.png/348px-Vita_Shot.png.webp' },
      { name: 'Medical Supply Box', quantity: 2 },
      { name: 'First Aid Kit', quantity: 1 },
      { name: 'Scavenging (Medical zones)', quantity: 1 },
    ],
  },
  {
    id: 'loot-exodus-modules',
    material: 'Exodus Modules',
    materialImageUrl: 'https://arcraiders.wiki/w/images/1/1b/Exodus_Modules.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Exodus_Modules',
    sources: [
      { name: 'Bombardier Cell', quantity: 2, imageUrl: '/images/loot/Bombardier_Cell.png' },
      { name: 'Bastion Cell', quantity: 2, imageUrl: '/images/loot/Bastion_Cell.png' },
      { name: 'Leaper Pulse Unit', quantity: 2, imageUrl: '/images/loot/Leaper_Pulse_Unit.png' },
      { name: 'Rocketeer Driver', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/e/ef/Rocketeer_Driver.png' },
    ],
  },
  {
    id: 'loot-crude-explosives',
    material: 'Crude Explosives',
    materialImageUrl: 'https://arcraiders.wiki/w/images/f/fc/Crude_Explosives.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Crude_Explosives',
    sources: [
      { name: 'Trigger \'Nade', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/trigger-nade.webp' },
      { name: 'Snap Blast Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/snap-blast-grenade.webp' },
      { name: 'Trailblazer', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/trailblazer.webp' },
      { name: 'Shrapnel Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/shrapnel-grenade.webp' },
      { name: 'Seeker Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/seeker-grenade.webp' },
    ],
  },
  {
    id: 'loot-explosive-compound',
    material: 'Explosive Compound',
    materialImageUrl: 'https://arcraiders.wiki/w/images/1/11/Explosive_Compound.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Explosive_Compound',
    sources: [
      { name: 'Heavy Fuze Grenade', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/heavy-fuze-grenade.webp' },
      { name: 'Blaze Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/blaze-grenade.webp' },
      { name: 'Explosive Mine', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/explosive-mine.webp' },
      { name: 'Deadline', quantity: 1 },
      { name: 'Wolfpack', quantity: 1 },
    ],
  },
  {
    id: 'loot-synthesized-fuel',
    material: 'Synthesized Fuel',
    materialImageUrl: 'https://arcraiders.wiki/w/images/8/8e/Synthesized_Fuel.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Synthesized_Fuel',
    sources: [
      { name: 'Trailblazer', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/trailblazer.webp' },
      { name: 'Launcher Ammo (Incendiary)', quantity: 1 },
    ],
  },
  {
    id: 'loot-firefly-burner',
    material: 'Firefly Burner',
    materialImageUrl: 'https://arcraiders.wiki/w/images/0/04/Firefly_Burner.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Firefly_Burner',
    sources: [
      { name: 'Trailblazer', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/trailblazer.webp' },
      { name: 'Damaged Leaper Pulse Unit', quantity: 2, imageUrl: '/images/loot/Damaged_Leaper_Pulse_Unit.png' },
      { name: 'Leaper Pulse Unit', quantity: 1, imageUrl: '/images/loot/Leaper_Pulse_Unit.png' },
    ],
  },
  {
    id: 'loot-rocketeer-driver',
    material: 'Rocketeer Driver',
    materialImageUrl: 'https://arcraiders.wiki/w/images/e/ef/Rocketeer_Driver.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Rocketeer_Driver',
    sources: [
      { name: 'Wolfpack', quantity: 1 },
      { name: 'Damaged Rocketeer Driver', quantity: 3, imageUrl: '/images/loot/Damaged_Rocketeer_Driver.png' },
      { name: 'ARC Rocketeer', quantity: 2 },
    ],
  },
  {
    id: 'loot-comet-igniter',
    material: 'Comet Igniter',
    materialImageUrl: 'https://arcraiders.wiki/w/images/c/c8/Comet_Igniter.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Comet_Igniter',
    sources: [
      { name: 'Deadline', quantity: 1 },
      { name: 'Leaper Pulse Unit', quantity: 1, imageUrl: '/images/loot/Leaper_Pulse_Unit.png' },
      { name: 'Damaged Leaper Pulse Unit', quantity: 2, imageUrl: '/images/loot/Damaged_Leaper_Pulse_Unit.png' },
    ],
  },
  {
    id: 'loot-light-shield',
    material: 'Light Shield',
    materialImageUrl: 'https://arcraiders.wiki/w/images/4/40/Light_Shield.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Light_Shield',
    craftingStation: 'Gear Bench I',
    sources: [
      { name: 'Ruined Riot Shield', quantity: 3, imageUrl: '/images/loot/Ruined_Riot_Shield.png' },
      { name: 'Medium Shield', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/4/41/Medium_Shield.png' },
    ],
  },
  {
    id: 'loot-medium-shield',
    material: 'Medium Shield',
    materialImageUrl: 'https://arcraiders.wiki/w/images/4/41/Medium_Shield.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Medium_Shield',
    craftingStation: 'Gear Bench II',
    sources: [
      { name: 'Light Shield', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/4/40/Light_Shield.png' },
      { name: 'Heavy Shield', quantity: 1, imageUrl: 'https://arcraiders.wiki/w/images/f/f9/Heavy_Shield.png' },
    ],
  },
  {
    id: 'loot-heavy-shield-mat',
    material: 'Heavy Shield',
    materialImageUrl: 'https://arcraiders.wiki/w/images/f/f9/Heavy_Shield.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Heavy_Shield',
    sources: [
      { name: 'ARC Bastion', quantity: 3 },
      { name: 'Bastion Cell', quantity: 3, imageUrl: '/images/loot/Bastion_Cell.png' },
      { name: 'ARC Tank', quantity: 2 },
    ],
  },
  {
    id: 'loot-oil',
    material: 'Oil',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/oil.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Oil',
    sources: [
      { name: 'Motor', quantity: 3 },
      { name: 'Water Pump', quantity: 3 },
      { name: 'Turbo Pump', quantity: 3 },
      { name: 'Coolant', quantity: 2 },
      { name: 'Blaze Grenade', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/blaze-grenade.webp' },
      { name: 'Explosive Mine', quantity: 2, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/explosive-mine.webp' },
      { name: 'Polluted Air Filter', quantity: 1 },
    ],
  },
  {
    id: 'loot-rope',
    material: 'Rope',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/rope.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Rope',
    sources: [
      { name: 'Zipline', quantity: 2 },
      { name: 'Snap Hook', quantity: 1 },
      { name: 'Scavenging (Residential / Commercial zones)', quantity: 1 },
    ],
  },
  {
    id: 'loot-sensors',
    material: 'Sensors',
    materialImageUrl: 'https://arcraiders.wiki/w/images/9/9c/Sensors.png',
    wikiUrl: 'https://arcraiders.wiki/wiki/Sensors',
    sources: [
      { name: 'ARC Snitch', quantity: 2 },
      { name: 'ARC Surveyor', quantity: 2 },
      { name: 'ARC Android', quantity: 1 },
      { name: 'Server Rack', quantity: 2 },
      { name: 'Explosive Mine', quantity: 1, imageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/explosive-mine.webp' },
    ],
  },
  {
    id: 'loot-speaker-component',
    material: 'Speaker Component',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/speaker-component.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Speaker_Component',
    sources: [
      { name: 'Headphones', quantity: 2, imageUrl: '/images/loot/Headphones.png' },
      { name: 'Frequency Modulation Box', quantity: 1, imageUrl: '/images/loot/Frequency_Modulation_Box.png' },
      { name: 'Radio', quantity: 2 },
      { name: 'Noisemaker', quantity: 1 },
    ],
  },
  {
    id: 'loot-hornet-driver',
    material: 'Hornet Driver',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/hornet-driver.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Hornet_Driver',
    sources: [
      { name: 'ARC Hornet', quantity: 2 },
      { name: 'ARC Courier', quantity: 1 },
    ],
  },
  {
    id: 'loot-matriarch-reactor',
    material: 'Matriarch Reactor',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/matriarch-reactor.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Matriarch_Reactor',
    sources: [
      { name: 'ARC Matriarch (Boss drop)', quantity: 1 },
    ],
  },
  {
    id: 'loot-queen-reactor',
    material: 'Queen Reactor',
    materialImageUrl: 'https://cdn.metaforge.app/arc-raiders/icons/queen-reactor.webp',
    wikiUrl: 'https://arcraiders.wiki/wiki/Queen_Reactor',
    sources: [
      { name: 'ARC Queen (Boss drop)', quantity: 1 },
      { name: 'ARC Queen Leg Armor', quantity: 1 },
    ],
  },
];

export const WEAPON_SETUPS_DATA: WeaponSetup[] = [
  {
    weaponId: 'w3', // Kettle
    setups: {
      S: { focus: 'DPS MÁXIMO (SEMI)', description: 'Foco em zerar o bloom e maximizar a cadência de tiro.', modIds: ['m3', 'ma3', 'm11', 'm28'] },
      A: { focus: 'ESTABILIDADE TOTAL', description: 'Rifle extremamente preciso e fácil de controlar.', modIds: ['mb3', 'mv2', 'm10b', 'm26'] }
    }
  },
  {
    weaponId: 'w-rattler', // Rattler
    setups: {
      S: { focus: 'GLASS CANNON', description: 'Cadência insana com controle de bloom agressivo.', modIds: ['m3', 'ma3', 'm28'] },
      A: { focus: 'CONTROLE E CONSISTÊNCIA', description: 'Mais estável e menos punitivo no recuo.', modIds: ['m2', 'ma3', 'mp3'] }
    }
  },
  {
    weaponId: 'w-arpeggio', // Arpeggio
    setups: {
      S: { focus: 'BURST AGRESSIVO', description: 'Minimiza o intervalo entre rajadas com alto DPS.', modIds: ['m3', 'ma3', 'm14', 'm28'] },
      A: { focus: 'BURST PRECISO', description: 'Garante que todos os tiros da rajada atinjam o alvo.', modIds: ['mb3', 'mv3', 'm14', 'm26'] }
    }
  },
  {
    weaponId: 'w-tempest', // Tempest
    setups: {
      S: { focus: 'META PVP MID-RANGE', description: 'A build definitiva para dominar confrontos diretos.', modIds: ['m3', 'ma3', 'm14'] },
      A: { focus: 'FULL-AUTO LASER', description: 'Spray constante com recuo quase nulo.', modIds: ['mb3', 'mv3', 'm14'] }
    }
  },
  {
    weaponId: 'w-bettina', // Bettina
    setups: {
      S: { focus: 'DESTRUIDOR PESADO', description: 'Dano massivo com cadência aumentada.', modIds: ['m3', 'ma3', 'm28'] },
      A: { focus: 'LASER PESADO', description: 'Rifle pesado mas com controle excepcional.', modIds: ['mb3', 'ma3', 'mp3'] }
    }
  },
  {
    weaponId: 'w-bobcat', // Bobcat
    setups: {
      S: { focus: 'CLOSE-RANGE SHREDDER', description: 'Derrete inimigos cara a cara em milissegundos.', modIds: ['m3', 'ma3', 'm11', 'm28'] },
      A: { focus: 'SMG CONTROLADA', description: 'Versátil para curta e média distância.', modIds: ['mb3', 'm23', 'm11', 'm26'] }
    }
  },
  {
    weaponId: 'w-vulcano', // Vulcano
    setups: {
      S: { focus: 'DPS MÁXIMO', description: 'Spam de shotgun semi-auto com spread fechado.', modIds: ['m6b', 'mv3', 'm17', 'm28'] },
      A: { focus: 'VULCANO ESTÁVEL', description: 'Maior controle no recuo entre disparos.', modIds: ['m6', 'ma3', 'm17', 'mp3'] }
    }
  },
  {
    weaponId: 'w1', // Ferro
    setups: {
      S: { focus: 'PICK RIFLE AGRESSIVO', description: 'ADS instantâneo para punir peeks.', modIds: ['m4', 'mv3', 'm27'] },
      A: { focus: 'HÍBRIDA PRECISA', description: 'Follow-ups mais limpos e menor recuo.', modIds: ['m3', 'mv3', 'm26'] }
    }
  },
  {
    weaponId: 'w7', // Renegade
    setups: {
      S: { focus: 'DMR ALL-ROUNDER', description: 'Aumenta velocidade do projétil e alcance.', modIds: ['m4', 'm14', 'm26'] },
      A: { focus: 'DUELO PVP', description: 'ADS rápido para trocas rápidas de tiro.', modIds: ['m3', 'm14', 'm27'] }
    }
  },
  {
    weaponId: 'w2', // Stitcher
    setups: {
      S: { focus: 'SMG META PVP', description: 'Equilíbrio perfeito entre DPS e controle.', modIds: ['m3', 'mv3', 'm11', 'm26'] },
      A: { focus: 'SPRAY CONTROLADO', description: 'Ideal para jogadores que preferem pouco recuo.', modIds: ['mb3', 'ma3', 'm11', 'mp3'] }
    }
  },
  {
    weaponId: 'w4', // Il Toro
    setups: {
      S: { focus: 'SHOTGUN META DUEL', description: 'Otimizada para finalizar oponentes rapidamente.', modIds: ['m6b', 'mv3', 'm17', 'm27'] },
      A: { focus: 'CONSISTENTE', description: 'Hits confiáveis a distâncias maiores.', modIds: ['m6', 'mv3', 'm17', 'm26'] }
    }
  },
  {
    weaponId: 'w5', // Anvil
    setups: {
      S: { focus: 'ANTI-ARC / AREA DAMAGE', description: 'Usa o Anvil Splitter para dano em área massivo.', modIds: ['m4', 'm-anvilsplitter'] },
      A: { focus: 'PRECISION PICK', description: 'Dano de precisão em alvo único.', modIds: ['m3', 'm-anvilsplitter'] }
    }
  },
  {
    weaponId: 'w8', // Venator
    setups: {
      S: { focus: 'SNIPER AGRESSIVO', description: 'Otimiza mira rápida e controle de recuo para duelos.', modIds: ['ma3', 'm14'] },
      A: { focus: 'SNIPER ESTÁVEL', description: 'Foco em precisão total e follow-up consistente.', modIds: ['m22', 'm14'] }
    }
  },
  {
    weaponId: 'w9', // Osprey
    setups: {
      S: { focus: 'SNIPER META PICK', description: 'Transição rápida para ADS e alta velocidade de bala.', modIds: ['m4', 'mv3', 'm14', 'm27'] },
      A: { focus: 'SNIPER STEALTH', description: 'Operações silenciosas com recuo zero.', modIds: ['ms3', 'mv3', 'm14', 'm26'] }
    }
  },
  {
    weaponId: 'w10', // Torrente
    setups: {
      S: { focus: 'SUPRESSÃO META', description: 'Inunda o campo de batalha com balas.', modIds: ['m3', 'm14', 'm28'] },
      A: { focus: 'TORRENTE LASER', description: 'Fogo contínuo extremamente preciso.', modIds: ['mb3', 'm14', 'mp3'] }
    }
  }
];

const RARITY_ORDER: Record<string, number> = { 'LEGENDARY': 0, 'EPIC': 1, 'RARE': 2, 'UNCOMMON': 3, 'COMMON': 4 };

MATERIALS_DATA.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
MODS_DATA.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
WEAPONS_DATA.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
THROWABLES_DATA.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
AUGMENTS_DATA.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);

LOOT_DATA.sort((a, b) => {
  const matA = MATERIALS_DATA.find(m => m.name === a.material);
  const matB = MATERIALS_DATA.find(m => m.name === b.material);
  const rarityA = matA?.rarity || 'COMMON';
  const rarityB = matB?.rarity || 'COMMON';
  return RARITY_ORDER[rarityA] - RARITY_ORDER[rarityB];
});



