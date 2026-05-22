"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEAPON_SETUPS_DATA = exports.LOOT_DATA = exports.AUGMENTS_DATA = exports.THROWABLES_DATA = exports.WEAPONS_DATA = exports.WEAPON_MOD_SLOTS = exports.MODS_DATA = exports.MATERIALS_DATA = void 0;
exports.MATERIALS_DATA = [
    {
        id: 'mat1',
        name: 'Metal Parts', purchasableFromCeleste: true, celesteSeedCost: 1, recycleInfo: [], salvageInfo: [], stackSize: 50,
        description: "A very common material used to craft almost anything. It is the backbone of the Foundry's manufacturing process, found in almost all loot containers and discarded machinery.",
        rarity: 'COMMON',
        icon: 'construction',
        craftInfo: { isCraftable: false, note: "Material básico" },
        residualInfo: { items: ["Steel Spring → Metal Parts", "Simple Gun Parts → 2× Metal Parts", "Magnet → 3× Metal Parts"] },
        obtainedFrom: ["Rattler (8x)", "Damaged Heat Sink (6x)", "Compensator I (5x)", "Muzzle Brake I (5x)", "Shotgun Choke I (5x)", "Industrial Charger (5x)", "Blaze Grenade (4x)", "Industrial Magnet (4x)", "Unusable Weapon (4x)", "Acoustic Guitar (4x)", "Water Pump (4x)", "Mechanical Components (3x)", "Stitcher (3x)", "Kettle (3x)", "Steel Spring (2x)", "Simple Gun Parts (2x)", "Magnet (2x)", "ARC Alloy (2x)", "Battery (2x)", "Hairpin (2x)", "Ferro (2x)", "Sensors (1x)", "Shrapnel Grenade (1x)", "Zipline (1x)"],
        requiredFor: ["Rattler (16x)", "Stitcher (8x)", "Mechanical Components (7x)", "Compensator I (6x)", "Muzzle Brake I (6x)", "Shotgun Choke I (6x)", "Kettle (6x)", "Ferro (5x)", "Hairpin (2x)"]
    },
    {
        id: 'mat2',
        name: 'Rubber Parts', purchasableFromCeleste: true, celesteSeedCost: 1, recycleInfo: [], salvageInfo: [], stackSize: 50,
        description: "A common material used for flexible components, seals, and ergonomic grips. Essential for recoil management systems and airtight equipment seals.",
        rarity: 'COMMON',
        icon: 'settings_input_hdmi',
        craftInfo: { isCraftable: false, note: "Material básico" },
        residualInfo: { items: ["Wires → 2× Rubber Parts", "ARC Flex Rubber", "Mechanical Components → 2× Rubber Parts"] },
        obtainedFrom: ["Rubber Pad (18x)", "Ruined Accordion (18x)", "ARC Flex Rubber (16x)", "Diving Goggles (12x)", "Degraded ARC Rubber (11x)", "Deflated Football (9x)", "Expired Respirator (8x)", "Headphones (7x)", "Thermostat (7x)", "Stable Stock I (6x)", "Ruined Riot Shield (6x)", "Shield Recharger (4x)", "Electrical Components (3x)", "Speaker Component (3x)", "Combat Mk. 1 (3x)", "Looting Mk. 1 (3x)", "Tactical Mk. 1 (3x)", "Mechanical Components (2x)", "Wires (2x)", "Stitcher (2x)", "Kettle (2x)", "Heavy Fuze Grenade (2x)", "Voltage Converter (1x)", "Hairpin (1x)", "Ferro (1x)"],
        requiredFor: ["Rattler (12x)", "Kettle (8x)", "Stable Stock I (6x)", "Combat Mk. 1 (6x)", "Looting Mk. 1 (6x)", "Tactical Mk. 1 (6x)", "Shield Recharger (5x)", "Electrical Components (4x)", "Stitcher (4x)", "Mechanical Components (3x)", "Ferro (2x)"]
    },
    {
        id: 'mat3',
        name: 'Plastic Parts', purchasableFromCeleste: true, celesteSeedCost: 1, recycleInfo: [], salvageInfo: [], stackSize: 50,
        description: "Lightweight synthetic material used in a wide variety of basic gear, structural weapon parts, and civilian salvage. Extremely versatile and easy to process.",
        rarity: 'COMMON',
        icon: 'inventory_2',
        craftInfo: { isCraftable: false, note: "Material básico" },
        residualInfo: { items: ["Diversos itens de lixo plástico"] },
        obtainedFrom: ["ARC Synthetic Resin (14x)", "Cooling Fan (14x)", "Recorder (10x)", "Ruined Riot Shield (10x)", "Shaker (10x)", "Dried-Out ARC Resin (9x)", "Camera Lens (8x)", "Remote Control (7x)", "Extended Light Mag I (6x)", "Extended Medium Mag I (6x)", "Extended Shotgun Mag I (6x)", "Angled Grip I (6x)", "Vertical Grip I (6x)", "Alarm Clock (6x)", "Toaster (5x)", "Fried Motherboard (5x)", "Light Shield (4x)", "Electrical Components (3x)", "Canister (3x)", "Syringe (3x)", "Combat Mk. 1 (3x)", "Looting Mk. 1 (3x)", "Tactical Mk. 1 (3x)", "Speaker Component (2x)", "Jolt Mine (2x)", "Processor (1x)", "Synthesized Fuel (1x)", "Light Impact Grenade (1x)", "Defibrillator (1x)"],
        requiredFor: ["Defibrillator (9x)", "Electrical Components (8x)", "Extended Light Mag I (6x)", "Extended Medium Mag I (6x)", "Extended Shotgun Mag I (6x)", "Angled Grip I (6x)", "Vertical Grip I (6x)", "Combat Mk. 1 (6x)", "Looting Mk. 1 (6x)", "Tactical Mk. 1 (6x)", "Hairpin (5x)", "Light Shield (4x)", "Light Impact Grenade (2x)", "Noisemaker (2x)"]
    },
    {
        id: 'mat4',
        name: 'Mechanical Components', recycleInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 2
            }, {
                name: 'Metal Parts',
                stackSize: 50, quantity: 3
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 3
            }], stackSize: 10,
        description: "Precision-engineered parts used for moving mechanisms in weapons and modules. These are frequently recovered from complex toolboxes and industrial crates.",
        rarity: 'UNCOMMON',
        icon: 'settings',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 1",
            requirements: [{
                    name: 'Metal Parts',
                    stackSize: 50, quantity: 7
                }, {
                    name: 'Rubber Parts',
                    stackSize: 50, quantity: 3
                }]
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
        obtainedFrom: ["Vertical Grip III (2x)", "Arpeggio (2x)", "Il Toro (2x)", "Anvil (2x)", "Motor (2x)", "Mod Components (1x)", "Advanced Mechanical Components (1x)", "Compensator II (1x)", "Muzzle Brake II (1x)", "Shotgun Choke II (1x)", "Silencer I (1x)", "Extended Light Mag II (1x)", "Extended Medium Mag II (1x)", "Extended Shotgun Mag II (1x)", "Angled Grip II (1x)", "Vertical Grip II (1x)", "Stable Stock II (1x)", "Burletta (1x)", "Turbo Pump (1x)"],
        requiredFor: ["Arpeggio (6x)", "Il Toro (5x)", "Anvil (5x)", "Burletta (3x)", "Mod Components (2x)", "Advanced Mechanical Components (2x)", "Compensator II (2x)", "Muzzle Brake II (2x)", "Shotgun Choke II (2x)", "Silencer I (2x)", "Extended Light Mag II (2x)", "Extended Medium Mag II (2x)", "Extended Shotgun Mag II (2x)", "Angled Grip II (2x)", "Vertical Grip II (2x)", "Stable Stock II (2x)", "Zipline (1x)"]
    },
    {
        id: 'mat5',
        name: 'Mod Components', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], stackSize: 5,
        description: "Sophisticated mechanical and electronic sub-assemblies specifically required for Adv weapon modifications. Found in high-tech industrial areas.",
        rarity: 'RARE',
        icon: 'extension',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{
                    name: 'Steel Spring',
                    stackSize: 15, quantity: 2
                }, { name: 'Mechanical Components', stackSize: 10, quantity: 2 }]
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
        obtainedFrom: ["Compensator III (1x)", "Muzzle Brake III (1x)", "Shotgun Choke III (1x)", "Silencer II (1x)", "Silencer III (1x)", "Extended Barrel (1x)", "Extended Light Mag III (1x)", "Extended Medium Mag III (1x)", "Extended Shotgun Mag III (1x)", "Angled Grip III (1x)", "Horizontal Grip (1x)", "Stable Stock III (1x)", "Lightweight Stock (1x)", "Kinetic Converter (1x)", "Anvil Splitter (1x)"],
        requiredFor: ["Compensator III (2x)", "Muzzle Brake III (2x)", "Shotgun Choke III (2x)", "Silencer II (2x)", "Extended Barrel (2x)", "Extended Light Mag III (2x)", "Extended Medium Mag III (2x)", "Extended Shotgun Mag III (2x)", "Angled Grip III (2x)", "Vertical Grip III (2x)", "Stable Stock III (2x)", "Lightweight Stock (2x)"]
    },
    {
        id: 'mat6',
        name: 'Steel Spring', purchasableFromCeleste: true, celesteSeedCost: 2, recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        description: "Precision coiled high-tension metal. Critical for the operation of weapon magazines, trigger groups, and any system requiring stored mechanical energy.",
        rarity: 'COMMON',
        icon: 'reorder',
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
        obtainedFrom: ["Ruined Accordion (3x)", "Extended Light Mag III (2x)", "Extended Medium Mag III (2x)", "Extended Shotgun Mag III (2x)", "Cooling Coil (2x)", "Spring Cushion (2x)", "Mod Components (1x)", "Advanced Mechanical Components (1x)", "Extended Light Mag II (1x)", "Extended Medium Mag II (1x)", "Extended Shotgun Mag II (1x)", "Magnetron (1x)"],
        requiredFor: ["Torrente (6x)", "Extended Light Mag III (5x)", "Extended Medium Mag III (5x)", "Extended Shotgun Mag III (5x)", "Extended Light Mag II (3x)", "Extended Medium Mag II (3x)", "Extended Shotgun Mag II (3x)", "Mod Components (2x)", "Advanced Mechanical Components (2x)", "Shrapnel Grenade (2x)", "Extended Light Mag I (1x)", "Extended Medium Mag I (1x)", "Extended Shotgun Mag I (1x)"]
    },
    {
        id: 'mat7',
        name: 'Wires', purchasableFromCeleste: true, celesteSeedCost: 2, recycleInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        description: "Conductive wiring used for electrical paths in weapon electronics and automated modules. Can be recovered from broken circuit boards and power stations.",
        rarity: 'UNCOMMON',
        icon: 'cable',
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
        obtainedFrom: ["Portable TV (6x)", "Acoustic Guitar (6x)", "Cooling Fan (4x)", "Power Cable (4x)", "Silencer III (3x)", "Toaster (3x)", "Compensator III (2x)", "Muzzle Brake III (2x)", "Shotgun Choke III (2x)", "Silencer II (2x)", "Broken Handheld Radio (2x)", "Broken Taser (2x)", "Damaged Heat Sink (2x)", "Power Bank (2x)", "Humidifier (2x)", "Advanced Electrical Components (1x)", "Voltage Converter (1x)", "Processor (1x)", "Sensors (1x)", "Compensator II (1x)", "Muzzle Brake II (1x)", "Shotgun Choke II (1x)", "Silencer I (1x)", "Extended Barrel (1x)"],
        requiredFor: ["Compensator III (8x)", "Muzzle Brake III (8x)", "Shotgun Choke III (8x)", "Silencer II (8x)", "Extended Barrel (8x)", "Osprey (7x)", "Compensator II (4x)", "Muzzle Brake II (4x)", "Shotgun Choke II (4x)", "Silencer I (4x)", "Advanced Electrical Components (3x)", "Compensator I (1x)", "Muzzle Brake I (1x)", "Shotgun Choke I (1x)"]
    },
    {
        id: 'mat8',
        name: 'Duct Tape', purchasableFromCeleste: true, celesteSeedCost: 2, recycleInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 3
            }], salvageInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        description: "Universal adhesive of the wasteland. Used for everything from field repairs to securing underbarrel attachments. A Raiders' best friend for improvised fixes.",
        rarity: 'UNCOMMON',
        icon: 'view_agenda',
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
        obtainedFrom: ["Angled Grip III (2x)", "Vertical Grip III (2x)", "Horizontal Grip (2x)", "Stable Stock III (2x)", "Kinetic Converter (2x)", "Angled Grip II (1x)", "Vertical Grip II (1x)", "Stable Stock II (1x)", "Lightweight Stock (1x)"],
        requiredFor: ["Angled Grip III (5x)", "Vertical Grip III (5x)", "Stable Stock III (5x)", "Lightweight Stock (5x)", "Angled Grip II (3x)", "Vertical Grip II (3x)", "Stable Stock II (3x)", "Angled Grip I (1x)", "Vertical Grip I (1x)", "Stable Stock I (1x)"]
    },
    {
        id: 'mat9',
        name: 'Simple Gun Parts', purchasableFromCeleste: true, celesteSeedCost: 7, recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 10,
        description: "Basic firearm components like receivers and slides. These are the fundamental building blocks for common-tier weapon construction and repair.",
        rarity: 'UNCOMMON',
        icon: 'hardware',
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
        obtainedFrom: ["Unusable Weapon (5x)", "Complex Gun Parts (3x)", "Light Gun Parts (2x)", "Medium Gun Parts (2x)", "Heavy Gun Parts (2x)", "Arpeggio (2x)", "Il Toro (2x)", "Anvil (2x)", "Burletta (2x)"],
        requiredFor: ["Arpeggio (6x)", "Il Toro (6x)", "Anvil (6x)", "Light Gun Parts (4x)", "Medium Gun Parts (4x)", "Heavy Gun Parts (4x)", "Burletta (3x)"]
    },
    {
        id: 'mat10',
        name: 'Light Gun Parts', purchasableFromCeleste: true, celesteSeedCost: 15, recycleInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 2
            }], salvageInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 1
            }], stackSize: 5,
        description: "Lightweight, precision-machined internal parts optimized for high-rate-of-fire weapons like SMGs and small-caliber handguns.",
        rarity: 'RARE',
        icon: 'precision_manufacturing',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{
                    name: 'Simple Gun Parts',
                    stackSize: 10, quantity: 4
                }]
        },
        residualInfo: {
            items: [
                "Bobcat I - 2 Light Gun Parts (reciclagem)",
                "Bobcat II - 3 Light Gun Parts (reciclagem)",
                "Bobcat III - 4 Light Gun Parts (reciclagem)",
                "Bobcat IV - 4 Light Gun Parts (reciclagem)"
            ]
        },
        obtainedFrom: ["Bobcat (2x)"],
        requiredFor: ["Bobcat (3x)", "Complex Gun Parts (2x)"]
    },
    {
        id: 'mat11',
        name: 'Medium Gun Parts', purchasableFromCeleste: true, celesteSeedCost: 15, recycleInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 2
            }], salvageInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 1
            }], stackSize: 5,
        description: "Standard durability weapon components designed for assault rifles and battle rifles. Balanced for weight and heat dissipation under sustained fire.",
        rarity: 'RARE',
        icon: 'precision_manufacturing',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{
                    name: 'Simple Gun Parts',
                    stackSize: 10, quantity: 4
                }]
        },
        residualInfo: { items: ["Armas médias (Renegade, Venator, Torrente)"] },
        obtainedFrom: ["Tempest (2x)", "Renegade (2x)", "Venator (2x)", "Osprey (2x)", "Torrente (2x)"],
        requiredFor: ["Tempest (3x)", "Renegade (3x)", "Venator (3x)", "Osprey (3x)", "Torrente (3x)", "Complex Gun Parts (2x)"]
    },
    {
        id: 'mat12',
        name: 'Heavy Gun Parts', purchasableFromCeleste: true, celesteSeedCost: 15, recycleInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 2
            }], salvageInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 1
            }], stackSize: 5,
        description: "Reinforced, heavy-duty components capable of withstanding the extreme pressure and recoil of high-caliber sniper rifles and light machine guns.",
        rarity: 'RARE',
        icon: 'precision_manufacturing',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{
                    name: 'Simple Gun Parts',
                    stackSize: 10, quantity: 4
                }]
        },
        residualInfo: { items: ["Armas pesadas (Il Toro, Anvil)"] },
        obtainedFrom: ["Bettina (2x)", "Vulcano (2x)", "Hullcracker (2x)"],
        requiredFor: ["Bettina (3x)", "Vulcano (3x)", "Hullcracker (3x)", "Complex Gun Parts (2x)"]
    },
    {
        id: 'mat13',
        name: 'Adv Mechanical Components', recycleInfo: [{
                name: 'Steel Spring',
                stackSize: 15, quantity: 1
            }, { name: 'Mechanical Components', stackSize: 10, quantity: 1 }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], stackSize: 5,
        description: "High-tier precision parts requiring expert craftsmanship. These are essential for the construction of elite weapons and experimental tactical gear.",
        rarity: 'RARE',
        icon: 'home_repair_service',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{
                    name: 'Steel Spring',
                    stackSize: 15, quantity: 2
                }, { name: 'Mechanical Components', stackSize: 10, quantity: 2 }]
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
        obtainedFrom: ["Tempest (2x)", "Bobcat (2x)", "Vulcano (2x)", "Hullcracker (2x)", "Magnetic Accelerator (1x)", "Bettina (1x)", "Renegade (1x)", "Venator (1x)", "Osprey (1x)", "Torrente (1x)", "Bastion Cell (1x)", "Bombardier Cell (1x)", "Leaper Pulse Unit (1x)", "Microscope (1x)"],
        requiredFor: ["Bettina (3x)", "Magnetic Accelerator (2x)", "Renegade (2x)", "Venator (2x)", "Osprey (2x)", "Torrente (2x)"]
    },
    {
        id: 'mat14',
        name: 'Magnet', purchasableFromCeleste: true, celesteSeedCost: 4, recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        description: "Specialized industrial-grade magnet used in the fabrication of railgun components and Adv electromagnetic stabilization for precision scopes.",
        rarity: 'UNCOMMON',
        icon: 'u_turn_right',
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
        obtainedFrom: ["Microscope (3x)", "Exodus Modules (2x)", "Industrial Magnet (2x)", "Snap Blast Grenade (1x)", "Combat Mk. 2 (1x)", "Looting Mk. 2 (1x)", "Ripped Safety Vest (1x)", "Ruined Tactical Vest (1x)", "Tactical Mk. 2 (1x)"],
        requiredFor: ["Venator (5x)", "Combat Mk. 2 (3x)", "Looting Mk. 2 (3x)", "Tactical Mk. 2 (3x)", "Snap Blast Grenade (1x)"]
    },
    {
        id: 'mat15',
        name: 'ARC Alloy', recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        rarity: 'UNCOMMON',
        icon: 'token',
        description: 'An Adv specialized alloy of ARC origin, offering exceptional electromagnetic properties and thermal resistance.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Rocketeer Driver (3x)", "Damaged Leaper Pulse Unit (3x)", "Damaged Rocketeer Driver (3x)", "Bastion Cell (3x)", "Bombardier Cell (3x)", "Leaper Pulse Unit (3x)", "ARC Circuitry (2x)", "ARC Motion Core (2x)", "Tick Pod (2x)", "Firefly Burner (2x)", "Comet Igniter (2x)", "Hornet Driver (1x)", "Snitch Scanner (1x)", "Spotter Relay (1x)"],
        requiredFor: ["ARC Circuitry (8x)", "ARC Motion Core (8x)", "Light Shield (2x)", "Seeker Grenade (2x)"]
    },
    {
        id: 'mat16',
        name: 'ARC Powercell', stackSize: 5,
        recycleInfo: [],
        salvageInfo: [],
        rarity: 'COMMON',
        icon: 'battery_charging_full',
        description: 'A standard energy storage unit for ARC technology. Can be used to recharge portable shield devices.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Advanced ARC Powercell (2x)"],
        requiredFor: ["Shield Recharger (1x)"]
    },
    {
        id: 'mat17',
        name: 'Adv ARC Powercell', recycleInfo: [{ name: 'ARC Powercell', stackSize: 5, quantity: 2 }], salvageInfo: [{ name: 'ARC Powercell', stackSize: 5, quantity: 1 }], stackSize: 5,
        rarity: 'RARE',
        icon: 'battery_saver',
        description: 'A high-density energy source found in elite ARC units. Highly efficient and essential for high-tier equipment.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Comet (1x)", "Bastion (1x)", "Queen (1x)", "Matriarch (1x)", "ARC zones"],
        requiredFor: ["Surge Shield Recharger (2x)", "Augments Tier III (3x)"]
    },
    {
        id: 'mat18',
        name: 'Electrical Components', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], stackSize: 10,
        rarity: 'UNCOMMON',
        icon: 'memory',
        description: 'Refined circuitry and electrical hardware used in most electronic gear and weapon systems.',
        craftInfo: {
            isCraftable: true,
            location: 'Refiner 1',
            requirements: [{
                    name: 'Plastic Parts',
                    stackSize: 50, quantity: 8
                }, {
                    name: 'Rubber Parts',
                    stackSize: 50, quantity: 4
                }]
        },
        obtainedFrom: ["Fried Motherboard (2x)", "Rotary Encoder (2x)", "Sample Cleaner (2x)", "Signal Amplifier (2x)", "Advanced Electrical Components (1x)", "Hornet Driver (1x)", "Showstopper (1x)", "Surge Shield Recharger (1x)", "Combat Mk. 2 (1x)", "Looting Mk. 2 (1x)", "Tactical Mk. 2 (1x)", "Snitch Scanner (1x)", "Spotter Relay (1x)"],
        requiredFor: ["Advanced Electrical Components (2x)", "Combat Mk. 2 (2x)", "Looting Mk. 2 (2x)", "Tactical Mk. 2 (2x)", "Showstopper (1x)", "Jolt Mine (1x)", "Surge Shield Recharger (1x)", "Surge Coil (1x)", "Tagging Grenade (1x)"]
    },
    {
        id: 'mat19',
        name: 'Adv Electrical Components', recycleInfo: [{
                name: 'Wires',
                stackSize: 15, quantity: 1
            }, { name: 'Electrical Components', stackSize: 10, quantity: 1 }], salvageInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }], stackSize: 5,
        rarity: 'RARE',
        icon: 'developer_board',
        description: 'State-of-the-art microprocessors and high-frequency hardware required for Adv utility upgrades.',
        craftInfo: {
            isCraftable: true,
            location: 'Refiner 2',
            requirements: [{
                    name: 'Wires',
                    stackSize: 15, quantity: 3
                }, { name: 'Electrical Components', stackSize: 10, quantity: 2 }]
        },
        obtainedFrom: ["Rocketeer Driver (2x)", "Power Rod (1x)", "Combat Mk. 3 (Aggressive) (1x)", "Combat Mk. 3 (Flanking) (1x)", "Frequency Modulation Box (1x)", "Looting Mk. 3 (Cautious) (1x)", "Looting Mk. 3 (Safekeeper) (1x)", "Looting Mk. 3 (Survivor) (1x)", "Photoelectric Cloak (1x)", "Tactical Mk. 3 (Defensive) (1x)", "Tactical Mk. 3 (Healing) (1x)"],
        requiredFor: ["Power Rod (2x)", "Combat Mk. 3 (Aggressive) (2x)", "Combat Mk. 3 (Flanking) (2x)", "Looting Mk. 3 (Cautious) (2x)", "Looting Mk. 3 (Safekeeper) (2x)", "Looting Mk. 3 (Survivor) (2x)", "Photoelectric Cloak (2x)", "Tactical Mk. 3 (Defensive) (2x)", "Tactical Mk. 3 (Healing) (2x)", "Raider Hatch Key (1x)"]
    },
    {
        id: 'mat20',
        name: 'ARC Circuitry', recycleInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 2 }], salvageInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 1 }], stackSize: 5,
        rarity: 'RARE',
        icon: 'circuit',
        description: 'Complex neural-like processing arrays recovered from Adv ARC units. Intricate and extremely valuable.',
        craftInfo: {
            isCraftable: true,
            location: 'Refiner 2',
            requirements: [{ name: 'ARC Alloy', stackSize: 15, quantity: 8 }]
        },
        obtainedFrom: ["Heavy Shield (2x)", "Power Rod (1x)", "Medium Shield (1x)", "Deadline (1x)"],
        requiredFor: ["Power Rod (2x)", "Deadline (2x)", "Medium Shield (1x)"]
    },
    {
        id: 'mat21',
        name: 'ARC Motion Core', recycleInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 2 }], salvageInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 1 }], stackSize: 5,
        rarity: 'RARE',
        icon: 'motion_sensor_active',
        description: 'A critical mechanical unit that manages high-speed motion and stabilization in ARC drones.',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{ name: 'ARC Alloy', stackSize: 15, quantity: 8 }]
        },
        obtainedFrom: ["Magnetic Accelerator (1x)", "Wolfpack (1x)"],
        requiredFor: ["Magnetic Accelerator (2x)", "Wolfpack (2x)", "Launcher Ammo (1x)"]
    },
    {
        id: 'mat22',
        name: 'Chemicals', purchasableFromCeleste: true, celesteSeedCost: 1, recycleInfo: [], salvageInfo: [], stackSize: 50,
        rarity: 'COMMON',
        icon: 'science',
        description: 'A variety of reactive substances used in the production of explosives and medical supplies.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Antiseptic (10x)", "Cooling Coil (6x)", "Coolant (5x)", "Vita Shot (4x)", "Crude Explosives (3x)", "Oil (3x)", "Tick Pod (2x)", "Syringe (2x)", "Smoke Grenade (2x)", "Light Impact Grenade (1x)", "Snap Blast Grenade (1x)"],
        requiredFor: ["Smoke Grenade (14x)", "Antiseptic (10x)", "Crude Explosives (6x)", "Light Impact Grenade (3x)"]
    },
    {
        id: 'mat23',
        name: 'Antiseptic', recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 10
            }], salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 5
            }], stackSize: 5,
        rarity: 'UNCOMMON',
        icon: 'sanitizer',
        description: 'Medical-grade cleaning solution, essential for preventing infection and crafting Adv healing items.',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{
                    name: 'Chemicals',
                    stackSize: 50, quantity: 10
                }, {
                    name: 'Great Mullein',
                    stackSize: 15, quantity: 2
                }]
        },
        obtainedFrom: ["Vita Spray (1x)", "Sterilized Bandage (1x)"],
        requiredFor: ["Vita Spray (3x)", "Vita Shot (2x)", "Sterilized Bandage (1x)"]
    },
    {
        id: 'mat24',
        name: 'Canister', purchasableFromCeleste: true, celesteSeedCost: 2, recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        rarity: 'COMMON',
        icon: 'nest_cam_wired_stand',
        description: 'A pressurized metal container suitable for storing gases or liquids.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Broken Taser (2x)", "Portable TV (2x)", "Power Bank (2x)", "Jolt Mine (1x)", "Scavenging (Commercial)"],
        requiredFor: ["Smoke Grenade (1x)", "Heavy Fuze Grenade (1x)", "Blaze Grenade (1x)", "Vita Spray (1x)"]
    },
    {
        id: 'mat25',
        name: 'Tick Pod', recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 2
            }, { name: 'ARC Alloy', stackSize: 15, quantity: 2 }], salvageInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 1 }], stackSize: 3,
        rarity: 'RARE',
        icon: 'pest_control',
        description: 'Biological component harvested from ARC Ticks. Contains enzymes used in high-end medical gear.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Tick (1x)", "Elite Tick (1x)", "ARC zones"],
        requiredFor: ["Vita Spray (2x)"]
    },
    {
        id: 'mat26',
        name: 'Fabric', purchasableFromCeleste: true, celesteSeedCost: 1, recycleInfo: [], salvageInfo: [], stackSize: 50,
        rarity: 'COMMON',
        icon: 'texture',
        description: 'Basic cloth remnants that can be repurposed for simple bandages or clothing repairs.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Deflated Football (9x)", "Durable Cloth (6x)", "Polluted Air Filter (6x)", "Rope (5x)", "Herbal Bandage (5x)", "Ruined Tactical Vest (5x)", "Expired Respirator (4x)", "Duct Tape (3x)", "Sterilized Bandage (1x)"],
        requiredFor: ["Durable Cloth (14x)"]
    },
    {
        id: 'mat27',
        name: 'Durable Cloth', recycleInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 2
            }], stackSize: 10,
        rarity: 'UNCOMMON',
        icon: 'layers',
        description: 'Reinforced textile material, much stronger than standard fabric.',
        craftInfo: {
            isCraftable: true,
            location: 'Refiner 1',
            requirements: [{
                    name: 'Fabric',
                    stackSize: 50, quantity: 14
                }]
        },
        obtainedFrom: ["Spring Cushion (2x)", "Ripped Safety Vest (1x)"],
        requiredFor: ["Sterilized Bandage (2x)", "Herbal Bandage (1x)"]
    },
    {
        id: 'mat28',
        name: 'Great Mullein', purchasableFromCeleste: true, celesteSeedCost: 2, recycleInfo: [{ name: 'Assorted Seeds', stackSize: 100, quantity: 2 }], salvageInfo: [{ name: 'Assorted Seeds', stackSize: 100, quantity: 1 }], stackSize: 15,
        rarity: 'UNCOMMON',
        icon: 'eco',
        description: 'A hardy plant with medicinal properties, often used in traditional healing.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Harvesting", "Scavenging (Backpack, Wicker Basket)", "Celeste", "Nature"],
        requiredFor: ["Antiseptic (2x)", "Herbal Bandage (1x)"]
    },
    {
        id: 'mat29',
        name: 'Moss', purchasableFromCeleste: true, celesteSeedCost: 5, recycleInfo: [{ name: 'Assorted Seeds', stackSize: 100, quantity: 3 }], salvageInfo: [{ name: 'Assorted Seeds', stackSize: 100, quantity: 2 }], stackSize: 10,
        rarity: 'RARE',
        icon: 'grass',
        description: 'A simple biological material that can be used as a stabilizer in some chemical reactions.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Defibrillator (1x)", "Hydroponic Domes (1x)", "Nature", "Celeste"],
        requiredFor: ["Defibrillator (1x)"]
    },
    {
        id: 'mat30',
        name: 'Battery', purchasableFromCeleste: true, celesteSeedCost: 3, recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }], stackSize: 15,
        rarity: 'UNCOMMON',
        icon: 'battery_full',
        description: 'A standard portable power source for civilian and military electronics.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Broken Taser (2x)", "Portable TV (2x)", "Power Bank (2x)", "Jolt Mine (1x)"],
        requiredFor: ["Medium Shield (4x)", "Jolt Mine (1x)"]
    },
    {
        id: 'mat31',
        name: 'Power Rod', recycleInfo: [{ name: 'Adv Electrical Components', stackSize: 5, quantity: 1 }, { name: 'ARC Circuitry', stackSize: 5, quantity: 1 }], salvageInfo: [{ name: 'Adv Electrical Components', stackSize: 5, quantity: 1 }], stackSize: 3,
        rarity: 'RARE',
        icon: 'vertical_align_center',
        description: 'A high-capacity energy conductor used in heavy-duty electronic equipment.',
        craftInfo: {
            isCraftable: true,
            location: "Refiner 3",
            requirements: [{ name: 'Adv Electrical Components', stackSize: 5, quantity: 2 }, { name: 'ARC Circuitry', stackSize: 5, quantity: 2 }]
        },
        obtainedFrom: ["Matriarch Reactor (1x)", "Queen Reactor (1x)", "Snap Hook (1x)"],
        requiredFor: ["Snap Hook (2x)", "Heavy Shield (1x)"]
    },
    {
        id: 'mat32',
        name: 'Syringe', purchasableFromCeleste: true, celesteSeedCost: 10, recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }, {
                name: 'Chemicals',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 2
            }], stackSize: 5,
        rarity: 'RARE',
        icon: 'vaccines',
        description: 'A standard medical tool for injecting fluids or extracting samples.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Vita Shot (1x)", "Scavenging (Medical Cabinet)"],
        requiredFor: ["Vita Shot (1x)"]
    },
    {
        id: 'mat33',
        name: 'Voltage Converter', purchasableFromCeleste: true, celesteSeedCost: 10, recycleInfo: [{
                name: 'Wires',
                stackSize: 15, quantity: 1
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 1
            }], salvageInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 2
            }], stackSize: 5,
        rarity: 'RARE',
        icon: 'electrical_services',
        description: 'An Adv transformer designed to handle high-power ARC energy systems.',
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Ion Sputter (4x)", "Signal Amplifier (2x)", "Heavy Shield (1x)", "Showstopper (1x)", "Industrial Charger (1x)"],
        requiredFor: ["Heavy Shield (2x)", "Showstopper (1x)"]
    },
    {
        id: 'mat34',
        name: 'Complex Gun Parts', purchasableFromCeleste: true, celesteSeedCost: 60, recycleInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 3
            }], salvageInfo: [{
                name: 'Simple Gun Parts',
                stackSize: 10, quantity: 2
            }], stackSize: 3,
        rarity: 'RARE',
        icon: 'extension',
        description: 'Highly intricate weapon parts required for crafting state-of-the-art ballistic firearms.',
        craftInfo: {
            isCraftable: true, location: 'Refiner 3', requirements: [{
                    name: 'Light Gun Parts',
                    stackSize: 5, quantity: 2
                }, {
                    name: 'Medium Gun Parts',
                    stackSize: 5, quantity: 2
                }, {
                    name: 'Heavy Gun Parts',
                    stackSize: 5, quantity: 2
                }]
        },
        obtainedFrom: ["Aphelion (1x)", "Jupiter (1x)", "Equalizer (1x)"],
        requiredFor: ["Aphelion (3x)", "Jupiter (3x)", "Equalizer (3x)"]
    },
    {
        id: 'mat35',
        name: 'Magnetic Accelerator', recycleInfo: [{ name: 'Adv Mechanical Components', stackSize: 5, quantity: 1 }, { name: 'ARC Motion Core', stackSize: 5, quantity: 1 }], salvageInfo: [{ name: 'Adv Mechanical Components', stackSize: 5, quantity: 1 }], stackSize: 3,
        rarity: 'EPIC',
        icon: 'all_inclusive',
        description: 'An extremely powerful electromagnetic module used in experimental and high-energy weapons.',
        craftInfo: { isCraftable: true, location: 'Refiner 3', requirements: [{ name: 'Adv Mechanical Components', stackSize: 5, quantity: 2 }, { name: 'ARC Motion Core', stackSize: 5, quantity: 2 }] },
        obtainedFrom: ["Aphelion (2x)", "Jupiter (2x)", "Equalizer (2x)", "Matriarch Reactor (1x)", "Queen Reactor (1x)", "Magnetron (1x)"],
        requiredFor: ["Aphelion (3x)", "Jupiter (3x)", "Equalizer (3x)", "Tempest (1x)", "Bobcat (1x)", "Vulcano (1x)", "Hullcracker (1x)"]
    },
    {
        id: 'mat36',
        name: 'Processor', purchasableFromCeleste: true, celesteSeedCost: 10, stackSize: 5,
        rarity: 'RARE',
        icon: 'memory',
        description: 'A high-performance processing unit recovered from Adv ARC technology or rare weapon modifications.',
        recycleInfo: [{
                name: 'Wires',
                stackSize: 15, quantity: 1
            }, {
                name: 'Plastic Parts',
                stackSize: 50, quantity: 1
            }],
        salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 2
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Exodus Modules (2x)", "Rotary Encoder (2x)", "Anvil Splitter (1x)", "Alarm Clock (1x)", "Combat Mk. 3 (Aggressive) (1x)", "Combat Mk. 3 (Flanking) (1x)", "Looting Mk. 3 (Cautious) (1x)", "Looting Mk. 3 (Safekeeper) (1x)", "Looting Mk. 3 (Survivor) (1x)", "Tactical Mk. 3 (Defensive) (1x)", "Tactical Mk. 3 (Healing) (1x)"],
        requiredFor: ["Combat Mk. 3 (Aggressive) (3x)", "Combat Mk. 3 (Flanking) (3x)", "Looting Mk. 3 (Cautious) (3x)", "Looting Mk. 3 (Safekeeper) (3x)", "Looting Mk. 3 (Survivor) (3x)", "Tactical Mk. 3 (Defensive) (3x)", "Tactical Mk. 3 (Healing) (3x)"]
    },
    {
        id: 'mat37',
        name: 'Exodus Modules', purchasableFromCeleste: true, celesteSeedCost: 55, stackSize: 3,
        rarity: 'EPIC',
        icon: 'settings_input_component',
        description: 'Adv coordination modules recovered from high-tier ARC units. Critical for experimental weapon synchronization.',
        recycleInfo: [{
                name: 'Magnet',
                stackSize: 15, quantity: 2
            }, {
                name: 'Processor',
                stackSize: 5, quantity: 2
            }],
        salvageInfo: [{
                name: 'Processor',
                stackSize: 5, quantity: 2
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Ion Sputter (1x)"],
        requiredFor: ["Tempest (2x)", "Bobcat (2x)", "Vulcano (1x)", "Hullcracker (1x)", "Snap Hook (1x)"]
    },
    {
        id: 'mat38',
        name: 'Crude Explosives', stackSize: 10,
        rarity: 'UNCOMMON',
        icon: 'bomb',
        description: 'Volatile chemicals packed into an improvised container. The basic building block for Raider explosives.',
        recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 3
            }],
        salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 2
            }],
        craftInfo: {
            isCraftable: true,
            location: "Refiner 1",
            requirements: [{
                    name: 'Chemicals',
                    stackSize: 50, quantity: 6
                }]
        },
        obtainedFrom: ["Explosive Compound (2x)", "Firefly Burner (2x)", "Comet Igniter (2x)", "Trailblazer (2x)", "Seeker Grenade (1x)", "Shrapnel Grenade (1x)"],
        requiredFor: ["Explosive Compound (2x)", "Snap Blast Grenade (2x)", "Trailblazer (2x)", "Launcher Ammo (2x)", "Seeker Grenade (1x)", "Shrapnel Grenade (1x)"]
    },
    {
        id: 'mat39',
        name: 'Explosive Compound', stackSize: 5,
        rarity: 'RARE',
        icon: 'volcano',
        description: 'Refined explosive material capable of delivering high-yield kinetic energy. Found in military-grade caches.',
        recycleInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 2 }],
        salvageInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 1 }],
        craftInfo: {
            isCraftable: true,
            location: "Refiner 2",
            requirements: [{ name: 'Crude Explosives', stackSize: 10, quantity: 2 }, {
                    name: 'Oil',
                    stackSize: 15, quantity: 2
                }]
        },
        obtainedFrom: ["Wolfpack (1x)", "Deadline (1x)"],
        requiredFor: ["Deadline (3x)", "Explosive Mine (1x)", "Heavy Fuze Grenade (1x)", "Blaze Grenade (1x)", "Wolfpack (1x)"]
    },
    {
        id: 'mat40',
        name: 'Synthesized Fuel', purchasableFromCeleste: true, celesteSeedCost: 10, stackSize: 5,
        rarity: 'RARE',
        icon: 'local_fire_department',
        description: 'High-energy liquid fuel synthesized for propulsion and incendiary devices. Extremely flammable.',
        recycleInfo: [{
                name: 'Oil',
                stackSize: 15, quantity: 1
            }, {
                name: 'Plastic Parts',
                stackSize: 50, quantity: 1
            }],
        salvageInfo: [{
                name: 'Oil',
                stackSize: 15, quantity: 1
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: [],
        requiredFor: ["Trailblazer (1x)"]
    },
    {
        id: 'mat41',
        name: 'Firefly Burner', stackSize: 3,
        rarity: 'RARE',
        icon: 'fireplace',
        description: 'A precision combustion unit used in high-end incendiary tactical gear.',
        recycleInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 2 }, { name: 'Crude Explosives', stackSize: 10, quantity: 2 }],
        salvageInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 2 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Scavenging: Destroyed Fireflies (1x)", "ARC technology", "Industrial zones"],
        requiredFor: ["Trailblazer (1x)"]
    },
    {
        id: 'mat42',
        name: 'Rocketeer Driver', stackSize: 3,
        rarity: 'EPIC',
        icon: 'rocket_launch',
        description: 'Propulsion management system for guided rocket ordinance. Recovered from major ARC threats.',
        recycleInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 3 }, { name: 'Adv Electrical Components', stackSize: 5, quantity: 2 }],
        salvageInfo: [{ name: 'ARC Circuitry', stackSize: 5, quantity: 2 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Rocketeer (1x)", "Damaged Rocketeer Driver (1x)", "ARC zones"],
        requiredFor: ["Wolfpack (1x)"]
    },
    {
        id: 'mat43',
        name: 'Comet Igniter', stackSize: 3,
        rarity: 'RARE',
        icon: 'wb_sunny',
        description: 'High-intensity ignition core used to trigger vacuum-level thermal reactions.',
        recycleInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 2 }, { name: 'Crude Explosives', stackSize: 10, quantity: 2 }],
        salvageInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 2 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Comet (1x)", "ARC technology", "Security zones"],
        requiredFor: ["Deadline (1x)"]
    },
    {
        id: 'mat44',
        name: 'Light Shield', rarity: 'UNCOMMON',
        icon: 'shield',
        description: 'Basic protection made from salvaged parts.',
        recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 4
            }],
        salvageInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 1 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Scavenging (Salvaged Parts)", "Industrial Crate (1x)"],
        requiredFor: ["Medium Shield (1x)", "Plastic Parts (4x)", "ARC Alloy (1x)"]
    },
    {
        id: 'mat45',
        name: 'Medium Shield', rarity: 'RARE',
        icon: 'shield',
        description: 'Standard Shield that offers Raiders fair protection.',
        recycleInfo: [{ name: 'ARC Circuitry', stackSize: 5, quantity: 1 }],
        salvageInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 2 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Light Shield (1x)", "ARC Circuitry (1x)", "ARC tech"],
        requiredFor: ["Heavy Shield (1x)", "ARC Circuitry (1x)", "ARC Alloy (2x)"]
    },
    {
        id: 'mat46',
        name: 'Heavy Shield', rarity: 'EPIC',
        icon: 'shield',
        description: 'Heavy Shield offering maximum protection.',
        recycleInfo: [{ name: 'ARC Circuitry', stackSize: 5, quantity: 2 }, {
                name: 'Voltage Converter',
                stackSize: 5, quantity: 1
            }],
        salvageInfo: [{ name: 'ARC Alloy', stackSize: 15, quantity: 4 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Medium Shield (1x)", "Power Rod (1x)", "ARC tech"],
        requiredFor: ["Final Tier Protection (1x)", "ARC Circuitry (2x)", "Voltage Converter (1x)", "ARC Alloy (4x)"]
    },
    {
        id: 'mat47',
        name: 'Oil', purchasableFromCeleste: true, celesteSeedCost: 2, stackSize: 15,
        rarity: 'UNCOMMON',
        icon: 'opacity',
        description: 'A viscous lubricant and fuel source used in weapon maintenance and explosive manufacturing. Recycled from motors, pumps, and coolant systems.',
        recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 3
            }],
        salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 1
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Turbo Pump (3x)", "Explosive Mine (2x)", "Blaze Grenade (2x)", "Motor (2x)", "Water Pump (2x)", "Coolant (2x)", "Polluted Air Filter (2x)", "Synthesized Fuel (1x)", "Heavy Fuze Grenade (1x)"],
        requiredFor: ["Renegade (5x)", "Explosive Compound (2x)", "Blaze Grenade (2x)"]
    },
    {
        id: 'mat48',
        name: 'Rope', purchasableFromCeleste: true, celesteSeedCost: 5, stackSize: 5,
        rarity: 'RARE',
        icon: 'linear_scale',
        description: 'Durable synthetic rope found in residential and commercial zones. Used for traversal gear like Ziplines and Snap Hooks.',
        recycleInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 5
            }],
        salvageInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 2
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Snap Hook (3x)", "Zipline (1x)"],
        requiredFor: ["Snap Hook (3x)", "Zipline (1x)"]
    },
    {
        id: 'mat49',
        name: 'Sensors', purchasableFromCeleste: true, celesteSeedCost: 10,
        stackSize: 5,
        rarity: 'RARE',
        icon: 'sensors',
        description: 'Electronic motion detectors salvaged from ARC drones and security infrastructure. Used in trap construction and tracking devices.',
        recycleInfo: [{
                name: 'Wires',
                stackSize: 15, quantity: 1
            }, {
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }],
        salvageInfo: [{
                name: 'Wires',
                stackSize: 15, quantity: 1
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Broken Handheld Radio (3x)", "Explosive Mine (1x)", "Remote Control (1x)", "Thermostat (1x)", "Radio (1x)", "Flow Controller (1x)", "Radio Relay (1x)", "Spectrometer (1x)", "Spectrum Analyzer (1x)", "Android (1x)", "Server Rack (1x)", "Snitch (1x)", "Surveyor (1x)", "Surge Coil (1x)", "Tagging Grenade (1x)"],
        requiredFor: ["Explosive Mine (1x)", "Raider Hatch Key (3x)", "Surge Coil (1x)", "Tagging Grenade (1x)"]
    },
    {
        id: 'mat50',
        name: 'Speaker Component', purchasableFromCeleste: true, celesteSeedCost: 10,
        stackSize: 5,
        rarity: 'RARE',
        icon: 'volume_up',
        description: 'An audio amplification unit salvaged from electronic devices. Used in sound-based tactical gear like lures and noisemakers.',
        recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 2
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }],
        salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 2
            }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Headphones (1x)", "Frequency Modulation Box (1x)", "Photoelectric Cloak (1x)", "Radio (1x)", "Noisemaker (1x)"],
        requiredFor: ["Photoelectric Cloak (4x)", "Noisemaker (1x)"]
    },
    {
        id: 'mat51',
        name: 'Hornet Driver', stackSize: 3,
        rarity: 'RARE',
        icon: 'bolt',
        description: 'A high-voltage discharge unit recovered from destroyed ARC Hornets. Can be thrown to stun nearby ARC units and Raiders, or used in the construction of EMP devices.',
        recycleInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }, { name: 'ARC Alloy', stackSize: 15, quantity: 1 }],
        salvageInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Hornet (1x)", "Courier (1x)"],
        requiredFor: ["Showstopper (1x)", "Surge Coil (1x)"]
    },
    {
        id: 'mat52',
        name: 'Matriarch Reactor', stackSize: 1,
        rarity: 'LEGENDARY',
        icon: 'reactor',
        description: 'A high-power reactor core found by scavenging destroyed Matriarchs. Extremely rare and required to craft the legendary Aphelion battle rifle.',
        recycleInfo: [{ name: 'Power Rod', stackSize: 3, quantity: 1 }, { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 }],
        salvageInfo: [{ name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Matriarch (1x)", "ARC zones"],
        requiredFor: ["Aphelion (1x)"]
    },
    {
        id: 'mat53',
        name: 'Queen Reactor', stackSize: 1,
        rarity: 'LEGENDARY',
        icon: 'reactor',
        description: 'Recovered from destroyed Queens or their blown-off leg armor segments. Required to craft the legendary Jupiter and Equalizer weapons.',
        recycleInfo: [{ name: 'Power Rod', stackSize: 3, quantity: 1 }, { name: 'Magnetic Accelerator', stackSize: 3, quantity: 1 }],
        salvageInfo: [{ name: 'Power Rod', stackSize: 3, quantity: 1 }],
        craftInfo: { isCraftable: false },
        obtainedFrom: ["Queen (1x)", "ARC zones"],
        requiredFor: ["Jupiter (1x)", "Equalizer (1x)"]
    }
];
exports.MODS_DATA = [
    // MUZZLE
    {
        id: 'm1', name: 'Compensator I', recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 5
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 3
            }], category: 'MUZZLE', rarity: 'COMMON', icon: 'settings_input_component', tier: 1, description: '20% Reduced Per-Shot Dispersion', materials: [{
                name: 'Metal Parts',
                quantity: 4
            }, {
                name: 'Wires',
                quantity: 2
            }]
    },
    {
        id: 'm2', name: 'Compensator II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'settings_input_component', tier: 2, description: '40% Reduced Per-Shot Dispersion', materials: [{ name: "Mechanical Components", quantity: 2 }, {
                name: 'Wires',
                quantity: 4
            }]
    },
    {
        id: 'm3', name: 'Compensator III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MUZZLE', rarity: 'RARE', icon: 'settings_input_component', tier: 3, description: '60% Reduced Per-Shot Dispersion, 20% Increased Durability Burn Rate', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Wires',
                quantity: 6
            }]
    },
    {
        id: 'mb1', name: 'Muzzle Brake I', recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 5
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 3
            }], category: 'MUZZLE', rarity: 'COMMON', icon: 'filter_tilt_shift', tier: 1, description: '15% Reduced Horizontal Recoil, 10% Reduced Vertical Recoil', materials: [{
                name: 'Metal Parts',
                quantity: 5
            }, {
                name: 'Wires',
                quantity: 3
            }]
    },
    {
        id: 'mb2', name: 'Muzzle Brake II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'filter_tilt_shift', tier: 2, description: '30% Reduced Horizontal Recoil, 20% Reduced Vertical Recoil', materials: [{ name: "Mechanical Components", quantity: 3 }, {
                name: 'Wires',
                quantity: 5
            }]
    },
    {
        id: 'mb3', name: 'Muzzle Brake III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MUZZLE', rarity: 'RARE', icon: 'filter_tilt_shift', tier: 3, description: '45% Reduced Horizontal Recoil, 35% Reduced Vertical Recoil', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Wires',
                quantity: 6
            }]
    },
    {
        id: 'm5', name: 'Shotgun Choke I', recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 5
            }], salvageInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 3
            }], category: 'MUZZLE', rarity: 'COMMON', icon: 'filter_tilt_shift', tier: 1, description: '10% Reduced Base Dispersion', materials: [{
                name: 'Metal Parts',
                quantity: 6
            }, {
                name: 'Wires',
                quantity: 2
            }], weaponTypeCompatibility: ['SHOTGUN']
    },
    {
        id: 'm6', name: 'Shotgun Choke II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'filter_tilt_shift', tier: 2, description: '20% Reduced Base Dispersion', materials: [{ name: "Mechanical Components", quantity: 4 }, {
                name: 'Wires',
                quantity: 4
            }], weaponTypeCompatibility: ['SHOTGUN']
    },
    {
        id: 'm6b', name: 'Shotgun Choke III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MUZZLE', rarity: 'RARE', icon: 'filter_tilt_shift', tier: 3, description: '30% Reduced Base Dispersion', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Wires',
                quantity: 6
            }], weaponTypeCompatibility: ['SHOTGUN']
    },
    {
        id: 'ms1', name: 'Silencer I', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MUZZLE', rarity: 'COMMON', icon: 'volume_off', tier: 1, description: '20% Reduced Noise', materials: [{
                name: 'Wires',
                quantity: 4
            }, {
                name: 'Duct Tape',
                quantity: 2
            }]
    },
    {
        id: 'm7', name: 'Silencer II', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MUZZLE', rarity: 'UNCOMMON', icon: 'volume_off', tier: 2, description: '40% Reduced Noise', materials: [{ name: "Mechanical Components", quantity: 2 }, {
                name: 'Duct Tape',
                quantity: 4
            }]
    },
    {
        id: 'ms3', name: 'Silencer III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 3
            }], salvageInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 2 }], category: 'MUZZLE', rarity: 'RARE', icon: 'volume_off', tier: 3, description: '60% Reduced Noise', materials: [{ name: "Mod Components", quantity: 3 }, {
                name: 'Duct Tape',
                quantity: 6
            }]
    },
    {
        id: 'm4', name: 'Extended Barrel', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MUZZLE', rarity: 'EPIC', icon: 'straighten', tier: 3, description: '25% Increased Bullet Velocity, 15% Increased Vertical Recoil', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Wires',
                quantity: 8
            }]
    },
    // MAGAZINE
    {
        id: 'm10', name: 'Extended Light Mag I', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], category: 'MAGAZINE', rarity: 'COMMON', icon: 'view_day', tier: 1, description: '+5 Magazine Size', materials: [{
                name: 'Plastic Parts',
                quantity: 4
            }, {
                name: 'Steel Spring',
                quantity: 2
            }], ammoCompatibility: 'LIGHT'
    },
    {
        id: 'm10b', name: 'Extended Light Mag II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MAGAZINE', rarity: 'UNCOMMON', icon: 'view_day', tier: 2, description: '+10 Magazine Size', materials: [{ name: "Mechanical Components", quantity: 2 }, {
                name: 'Steel Spring',
                quantity: 4
            }], ammoCompatibility: 'LIGHT'
    },
    {
        id: 'm11', name: 'Extended Light Mag III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MAGAZINE', rarity: 'RARE', icon: 'view_day', tier: 3, description: '+15 Magazine Size', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Steel Spring',
                quantity: 5
            }], ammoCompatibility: 'LIGHT'
    },
    {
        id: 'm12', name: 'Extended Medium Mag I', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], category: 'MAGAZINE', rarity: 'COMMON', icon: 'view_day', tier: 1, description: '+4 Magazine Size', materials: [{
                name: 'Plastic Parts',
                quantity: 5
            }, {
                name: 'Steel Spring',
                quantity: 2
            }], ammoCompatibility: 'MEDIUM'
    },
    {
        id: 'mm2', name: 'Extended Medium Mag II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MAGAZINE', rarity: 'UNCOMMON', icon: 'view_day', tier: 2, description: '+8 Magazine Size', materials: [{ name: "Mechanical Components", quantity: 3 }, {
                name: 'Steel Spring',
                quantity: 3
            }], ammoCompatibility: 'MEDIUM'
    },
    {
        id: 'm14', name: 'Extended Medium Mag III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MAGAZINE', rarity: 'RARE', icon: 'view_day', tier: 3, description: '+12 Magazine Size', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Steel Spring',
                quantity: 4
            }], ammoCompatibility: 'MEDIUM'
    },
    {
        id: 'msm1', name: 'Extended Shotgun Mag I', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], category: 'MAGAZINE', rarity: 'COMMON', icon: 'view_day', tier: 1, description: '+2 Magazine Size', materials: [{
                name: 'Plastic Parts',
                quantity: 3
            }, {
                name: 'Steel Spring',
                quantity: 1
            }], ammoCompatibility: 'SHOTGUN'
    },
    {
        id: 'msm2', name: 'Extended Shotgun Mag II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'MAGAZINE', rarity: 'UNCOMMON', icon: 'view_day', tier: 2, description: '+4 Magazine Size', materials: [{ name: "Mechanical Components", quantity: 2 }, {
                name: 'Steel Spring',
                quantity: 2
            }], ammoCompatibility: 'SHOTGUN'
    },
    {
        id: 'm17', name: 'Extended Shotgun Mag III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Steel Spring',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'MAGAZINE', rarity: 'RARE', icon: 'view_day', tier: 3, description: '+6 Magazine Size', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Steel Spring',
                quantity: 4
            }], ammoCompatibility: 'SHOTGUN'
    },
    // UNDERBARREL
    {
        id: 'm18', name: 'Angled Grip I', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], category: 'UNDERBARREL', rarity: 'COMMON', icon: 'pan_tool_alt', tier: 1, description: '20% Reduced Horizontal Recoil', materials: [{
                name: 'Plastic Parts',
                quantity: 6
            }, {
                name: 'Duct Tape',
                quantity: 2
            }]
    },
    {
        id: 'm19', name: 'Angled Grip II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'UNDERBARREL', rarity: 'UNCOMMON', icon: 'pan_tool_alt', tier: 2, description: '30% Reduced Horizontal Recoil', materials: [{ name: "Mechanical Components", quantity: 4 }, {
                name: 'Duct Tape',
                quantity: 4
            }]
    },
    {
        id: 'ma3', name: 'Angled Grip III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'UNDERBARREL', rarity: 'RARE', icon: 'pan_tool_alt', tier: 3, description: '40% Reduced Horizontal Recoil, 20% Reduced ADS Speed', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Duct Tape',
                quantity: 5
            }]
    },
    {
        id: 'mv1', name: 'Vertical Grip I', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }], category: 'UNDERBARREL', rarity: 'COMMON', icon: 'pan_tool_alt', tier: 1, description: '20% Reduced Vertical Recoil', materials: [{
                name: 'Plastic Parts',
                quantity: 6
            }, {
                name: 'Duct Tape',
                quantity: 2
            }]
    },
    {
        id: 'mv2', name: 'Vertical Grip II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'UNDERBARREL', rarity: 'UNCOMMON', icon: 'pan_tool_alt', tier: 2, description: '30% Reduced Vertical Recoil', materials: [{ name: "Mechanical Components", quantity: 4 }, {
                name: 'Duct Tape',
                quantity: 4
            }]
    },
    {
        id: 'm22', name: 'Vertical Grip III', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'UNDERBARREL', rarity: 'RARE', icon: 'pan_tool_alt', tier: 3, description: '40% Reduced Vertical Recoil, 30% Reduced ADS Speed', materials: [{ name: "Mod Components", quantity: 3 }, {
                name: 'Duct Tape',
                quantity: 6
            }]
    },
    {
        id: 'm23', name: 'Horizontal Grip', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'UNDERBARREL', rarity: 'EPIC', icon: 'pan_tool_alt', tier: 3, description: '30% Reduced Horizontal Recoil, 30% Reduced Vertical Recoil, 30% Reduced ADS Speed', materials: []
    },
    // STOCK
    {
        id: 'm24', name: 'Stable Stock I', recycleInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 6
            }], salvageInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }], category: 'STOCK', rarity: 'COMMON', icon: 'format_underlined', tier: 1, description: '20% Reduced Vertical Recoil', materials: [{
                name: 'Metal Parts',
                quantity: 6
            }, {
                name: 'Steel Spring',
                quantity: 2
            }]
    },
    {
        id: 'm25', name: 'Stable Stock II', recycleInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 1 }], category: 'STOCK', rarity: 'UNCOMMON', icon: 'format_underlined', tier: 2, description: '30% Reduced Vertical Recoil', materials: [{ name: "Mechanical Components", quantity: 3 }, {
                name: 'Steel Spring',
                quantity: 4
            }]
    },
    {
        id: 'm26', name: 'Stable Stock III', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'STOCK', rarity: 'RARE', icon: 'format_underlined', tier: 3, description: '45% Reduced Vertical Recoil, 20% Increased Equip/Unequip Time', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Steel Spring',
                quantity: 5
            }]
    },
    {
        id: 'mp3', name: 'Padded Stock III', recycleInfo: [{ name: 'Mod Components', quantity: 1 }], salvageInfo: [{ name: 'Mechanical Components', quantity: 1 }], category: 'STOCK', rarity: 'RARE', icon: 'format_underlined', tier: 3, description: '20% Reduced Base Dispersion, 20% Reduced Vertical/Horizontal Recoil, 50% Reduced ADS Speed', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Duct Tape',
                quantity: 6
            }]
    },
    {
        id: 'm27', name: 'Lightweight Stock', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'STOCK', rarity: 'EPIC', icon: 'format_underlined', tier: 3, description: '200% Increased ADS Speed, 30% Reduced Equip/Unequip Time, 50% Increased Vertical Recoil', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Duct Tape',
                quantity: 5
            }]
    },
    {
        id: 'm28', name: 'Kinetic Converter', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Duct Tape',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'STOCK', rarity: 'LEGENDARY', icon: 'bolt', tier: 'LEGENDARY', description: '15% Increased Fire Rate, 20% Increased Horizontal Recoil, 20% Increased Vertical Recoil', materials: []
    },
    {
        id: 'm-anvilsplitter', name: 'Anvil Splitter', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Processor',
                stackSize: 5, quantity: 1
            }], salvageInfo: [{ name: 'Mechanical Components', stackSize: 10, quantity: 2 }], category: 'ALL', rarity: 'LEGENDARY', icon: 'bolt', tier: 'LEGENDARY', description: '+3 Projectiles Per Shot, 70% Reduced Projectile Damage', materials: []
    },
    {
        id: 'm-shotgunsilencer', name: 'Shotgun Silencer', recycleInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }, {
                name: 'Wires',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Mod Components', stackSize: 5, quantity: 1 }], category: 'MUZZLE', rarity: 'EPIC', icon: 'volume_off', tier: 3, description: '50% Reduced Noise', materials: [{ name: "Mod Components", quantity: 2 }, {
                name: 'Wires',
                quantity: 8
            }], weaponTypeCompatibility: ['SHOTGUN']
    }
];
// ─── Weapon ↔ Mod Slot Compatibility Map ───
// Derived from ARC Raiders Wiki: each weapon accepts only specific mod slot types.
// The filter in PlannerScreen uses getModSlotType() from utils.ts to match mods to these slots.
exports.WEAPON_MOD_SLOTS = {
    'w3': ['Muzzle', 'Light Magazine', 'Underbarrel', 'Stock'], // Kettle
    'w-rattler': ['Muzzle', 'Underbarrel', 'Stock'], // Rattler
    'w-arpeggio': ['Muzzle', 'Medium Magazine', 'Underbarrel', 'Stock'], // Arpeggio
    'w-tempest': ['Muzzle', 'Medium Magazine', 'Underbarrel'], // Tempest
    'w-bettina': ['Muzzle', 'Underbarrel', 'Stock'], // Bettina
    'w1': ['Muzzle', 'Underbarrel', 'Stock'], // Ferro
    'w7': ['Muzzle', 'Medium Magazine', 'Stock'], // Renegade
    'w-aphelion': ['Underbarrel', 'Stock'], // Aphelion
    'w2': ['Muzzle', 'Light Magazine', 'Underbarrel', 'Stock'], // Stitcher
    'w-bobcat': ['Muzzle', 'Light Magazine', 'Underbarrel', 'Stock'], // Bobcat
    'w4': ['Shotgun Muzzle', 'Shotgun Magazine', 'Underbarrel', 'Stock'], // Il Toro
    'w-vulcano': ['Shotgun Muzzle', 'Shotgun Magazine', 'Underbarrel', 'Stock'], // Vulcano
    'w-hairpin': ['Light Magazine'], // Hairpin
    'w6': ['Muzzle', 'Light Magazine'], // Burletta
    'w8': ['Medium Magazine', 'Underbarrel'], // Venator
    'w5': ['Muzzle', 'Tech Mod'], // Anvil
    'w10': ['Muzzle', 'Medium Magazine', 'Stock'], // Torrente
    'w9': ['Muzzle', 'Medium Magazine', 'Underbarrel', 'Stock'], // Osprey
    'w-hullcracker': ['Underbarrel', 'Stock'], // Hullcracker
    'w-jupiter': [], // Jupiter (no mod slots)
    'w-equalizer': [], // Equalizer (no mod slots)
};
exports.WEAPONS_DATA = [
    {
        id: 'w-rattler', name: 'Rattler', rarity: 'COMMON', icon: 'my_location',
        craftInfo: {
            materials: [{
                    name: 'Metal Parts',
                    quantity: 16
                }, {
                    name: 'Rubber Parts',
                    quantity: 12
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Rubber Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Rubber Parts',
                        quantity: 1
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 10
                    }, {
                        name: 'Rubber Parts',
                        quantity: 10
                    }], perks: '+4 Magazine Size, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '+8 Magazine Size, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '+12 Magazine Size, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 8
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 12
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 8
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 12
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Metal Parts',
                        quantity: 14
                    }]
            }
        ],
        ammoType: 'LIGHT', weaponType: 'SMG'
    },
    {
        id: 'w-arpeggio', name: 'Arpeggio', rarity: 'UNCOMMON', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Mechanical Components', quantity: 6 }, {
                    name: 'Simple Gun Parts',
                    quantity: 6
                }], station: 'Gunsmith 2'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '20% Increased Fire Rate, 12.5% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], perks: '40% Increased Fire Rate, 25% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], perks: '60% Increased Fire Rate, 50% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }, { name: 'Mechanical Components', quantity: 2 }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }, { name: 'Mechanical Components', quantity: 3 }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }, { name: 'Mechanical Components', quantity: 4 }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }, { name: 'Mechanical Components', quantity: 5 }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        ammoType: 'MEDIUM', weaponType: 'AR'
    },
    {
        id: 'w-tempest', name: 'Tempest', rarity: 'EPIC', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, {
                    name: 'Medium Gun Parts',
                    quantity: 3
                }, {
                    name: 'Exodus Modules',
                    quantity: 2
                }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Medium Gun Parts',
                        quantity: 4
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 5 }, {
                        name: 'Medium Gun Parts',
                        quantity: 4
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], perks: '16.6% Reduced Horizontal Recoil, 13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], perks: '33.3% Reduced Horizontal Recoil, 26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 4
                    }], perks: '50% Reduced Horizontal Recoil, 39% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Medium Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 5 }, {
                        name: 'Medium Gun Parts',
                        quantity: 4
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        ammoType: 'MEDIUM', weaponType: 'AR'
    },
    {
        id: 'w-bettina', name: 'Bettina', rarity: 'EPIC', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                    name: 'Heavy Gun Parts',
                    quantity: 3
                }, {
                    name: 'Canister',
                    quantity: 3
                }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], perks: '5% Increased Fire Rate, 11.1% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], perks: '10% Increased Fire Rate, 22.2% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], perks: '15% Increased Fire Rate, 33.3% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }]
            }
        ],
        salvageInfo: [
            { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }] },
            { tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }] },
            { tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }] },
            { tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }] }
        ],
        ammoType: 'HEAVY', weaponType: 'SNIPER'
    },
    {
        id: 'w-aphelion', name: 'Aphelion', rarity: 'LEGENDARY', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 3 }, {
                    name: 'Complex Gun Parts',
                    quantity: 3
                }, { name: 'Matriarch Reactor', quantity: 1 }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, {
                        name: 'Complex Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            }
        ],
        upgradeInfo: [],
        recycleInfo: [{
                tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, {
                        name: 'Complex Gun Parts',
                        quantity: 1
                    }]
            }],
        salvageInfo: [{ tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 1 }] }],
        weaponType: 'SNIPER'
    },
    {
        id: 'w-bobcat', name: 'Bobcat', rarity: 'EPIC', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, {
                    name: 'Light Gun Parts',
                    quantity: 3
                }, {
                    name: 'Exodus Modules',
                    quantity: 2
                }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Light Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Light Gun Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Light Gun Parts',
                        quantity: 4
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 5 }, {
                        name: 'Light Gun Parts',
                        quantity: 4
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Light Gun Parts',
                        quantity: 1
                    }], perks: '15% Reduced Dispersion, 15% Reduced Horizontal Recoil, 13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Light Gun Parts',
                        quantity: 3
                    }], perks: '30% Reduced Dispersion, 30% Reduced Horizontal Recoil, 26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Light Gun Parts',
                        quantity: 3
                    }], perks: '45% Reduced Dispersion, 45% Reduced Horizontal Recoil, 39% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Light Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Light Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Light Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 5 }, {
                        name: 'Light Gun Parts',
                        quantity: 4
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Light Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Light Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Light Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Light Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        ammoType: 'LIGHT', weaponType: 'SMG'
    },
    {
        id: 'w-vulcano', name: 'Vulcano', rarity: 'EPIC', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, {
                    name: 'Heavy Gun Parts',
                    quantity: 3
                }, {
                    name: 'Exodus Modules',
                    quantity: 1
                }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 4
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '10% Increased Fire Rate, 13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '20% Increased Fire Rate, 26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }], perks: '30% Increased Fire Rate, 40% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 5
                    }]
            }
        ]
    },
    {
        id: 'w-hairpin', name: 'Hairpin', rarity: 'COMMON', icon: 'my_location',
        craftInfo: {
            materials: [{
                    name: 'Metal Parts',
                    quantity: 2
                }, {
                    name: 'Plastic Parts',
                    quantity: 5
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }, {
                        name: 'Rubber Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 4
                    }, {
                        name: 'Rubber Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 8
                    }], perks: '10% Increased Fire Rate, 13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 9
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '20% Increased Fire Rate, 26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '30% Increased Fire Rate, 40% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }, {
                        name: 'Rubber Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 4
                    }, {
                        name: 'Rubber Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        ammoType: 'LIGHT', weaponType: 'PISTOL'
    },
    {
        id: 'w-jupiter', name: 'Jupiter', rarity: 'LEGENDARY', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 3 }, {
                    name: 'Complex Gun Parts',
                    quantity: 3
                }, { name: 'Queen Reactor', quantity: 1 }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, {
                        name: 'Complex Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            }
        ],
        upgradeInfo: [],
        recycleInfo: [{
                tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, {
                        name: 'Complex Gun Parts',
                        quantity: 1
                    }]
            }],
        salvageInfo: [{ tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }] }],
        weaponType: 'AR'
    },
    {
        id: 'w-hullcracker', name: 'Hullcracker', rarity: 'EPIC', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, {
                    name: 'Heavy Gun Parts',
                    quantity: 3
                }, {
                    name: 'Exodus Modules',
                    quantity: 1
                }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 4
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }], perks: '18% Increased Fire Rate, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '35% Increased Fire Rate, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }], perks: '53% Increased Fire Rate, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Heavy Gun Parts',
                        quantity: 5
                    }]
            }
        ]
    },
    {
        id: 'w-equalizer', name: 'Equalizer', rarity: 'LEGENDARY', icon: 'my_location',
        craftInfo: {
            materials: [{ name: 'Magnetic Accelerator', quantity: 3 }, {
                    name: 'Complex Gun Parts',
                    quantity: 3
                }, { name: 'Queen Reactor', quantity: 1 }], station: 'Gunsmith 3'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, {
                        name: 'Complex Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            }
        ],
        upgradeInfo: [],
        recycleInfo: [{
                tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }, {
                        name: 'Complex Gun Parts',
                        quantity: 1
                    }]
            }],
        salvageInfo: [{ tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 1 }] }],
        weaponType: 'SMG'
    },
    {
        id: 'w1', name: 'Ferro', rarity: 'COMMON', icon: 'handyman',
        craftInfo: {
            materials: [{
                    name: 'Metal Parts',
                    quantity: 15
                }, {
                    name: 'Simple Gun Parts',
                    quantity: 4
                }], station: 'Weapon Workbench'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }, {
                        name: 'Rubber Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 4
                    }, {
                        name: 'Rubber Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 7
                    }], perks: '13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 9
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '39% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }, {
                        name: 'Rubber Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 4
                    }, {
                        name: 'Rubber Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        weaponType: 'PISTOL'
    },
    {
        id: 'w2', name: 'Stitcher', rarity: 'COMMON', icon: 'adjust',
        craftInfo: {
            materials: [{
                    name: 'Metal Parts',
                    quantity: 8
                }, {
                    name: 'Rubber Parts',
                    quantity: 4
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 3
                    }, {
                        name: 'Rubber Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Rubber Parts',
                        quantity: 6
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 12
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 8
                    }, {
                        name: 'Rubber Parts',
                        quantity: 12
                    }], perks: '16.6% Reduced Horizontal Recoil, 13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 10
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '33.3% Reduced Horizontal Recoil, 26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '50% Reduced Horizontal Recoil, 40% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 3
                    }, {
                        name: 'Rubber Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Rubber Parts',
                        quantity: 6
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 12
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ]
    },
    {
        id: 'w3', name: 'Kettle', rarity: 'COMMON', icon: 'fireplace',
        craftInfo: {
            materials: [{
                    name: 'Metal Parts',
                    quantity: 6
                }, {
                    name: 'Rubber Parts',
                    quantity: 8
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 3
                    }, {
                        name: 'Rubber Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Rubber Parts',
                        quantity: 6
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 12
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 8
                    }, {
                        name: 'Plastic Parts',
                        quantity: 10
                    }], perks: '25% Increased Bullet Velocity, 13% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 10
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '50% Increased Bullet Velocity, 26% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '75% Increased Bullet Velocity, 40% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 3
                    }, {
                        name: 'Rubber Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }, {
                        name: 'Rubber Parts',
                        quantity: 6
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Metal Parts',
                        quantity: 12
                    }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Metal Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Metal Parts',
                        quantity: 6
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            }
        ]
    },
    {
        id: 'w4', name: 'Il Toro', rarity: 'UNCOMMON', icon: 'sports_martial_arts',
        craftInfo: {
            materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                    name: 'Simple Gun Parts',
                    quantity: 6
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '17.5% Increased Fire Rate, +1 Magazine Size, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '35% Increased Fire Rate, +2 Magazine Size, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '50% Increased Fire Rate, +3 Magazine Size, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }]
            }
        ]
    },
    {
        id: 'w5', name: 'Anvil', rarity: 'UNCOMMON', icon: 'construction',
        craftInfo: {
            materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                    name: 'Simple Gun Parts',
                    quantity: 6
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '6.5% Reduced Dispersion Recovery, 25% Increased Fire Rate, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '12.5% Reduced Dispersion Recovery, 50% Increased Fire Rate, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Heavy Gun Parts',
                        quantity: 1
                    }], perks: '18.75% Reduced Dispersion Recovery, 75% Increased Fire Rate, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 5 }, {
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 5
                    }]
            }
        ]
    },
    {
        id: 'w6', name: 'Burletta', rarity: 'UNCOMMON', icon: 'speed',
        craftInfo: {
            materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                    name: 'Simple Gun Parts',
                    quantity: 3
                }], station: 'Gunsmith 1'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '16.6% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '33.3% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 1
                    }], perks: '50% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Mechanical Components', quantity: 1 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 2 }, {
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 3 }, {
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, {
                        name: 'Simple Gun Parts',
                        quantity: 4
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Simple Gun Parts',
                        quantity: 3
                    }]
            }
        ]
    },
    {
        id: 'w7', name: 'Renegade', rarity: 'RARE', icon: 'dangerous',
        craftInfo: {
            materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                    name: 'Medium Gun Parts',
                    quantity: 3
                }, {
                    name: 'Oil',
                    quantity: 5
                }], station: 'Gunsmith 2'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '16.6% Reduced Dispersion Recovery, 25% Increased Fire Rate, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '33.3% Reduced Dispersion Recovery, 50% Increased Fire Rate, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '50% Reduced Dispersion Recovery, 75% Increased Fire Rate, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ]
    },
    {
        id: 'w8', name: 'Venator', rarity: 'RARE', icon: 'track_changes',
        craftInfo: {
            materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                    name: 'Medium Gun Parts',
                    quantity: 3
                }, {
                    name: 'Magnet',
                    quantity: 5
                }], station: 'Gunsmith 2'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '13% Increased Fire Rate, 16% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '26% Increased Fire Rate, 33% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '40% Increased Fire Rate, 50% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ]
    },
    {
        id: 'w9', name: 'Osprey', rarity: 'RARE', icon: 'gps_fixed',
        craftInfo: {
            materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                    name: 'Medium Gun Parts',
                    quantity: 3
                }, {
                    name: 'Wires',
                    quantity: 7
                }], station: 'Gunsmith 2'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '20% Reduced Bolt Action Time, 12.5% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '40% Reduced Bolt Action Time, 25% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '60% Reduced Bolt Action Time, 37.5% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ]
    },
    {
        id: 'w10', name: 'Torrente', rarity: 'RARE', icon: 'local_fire_department',
        craftInfo: {
            materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                    name: 'Medium Gun Parts',
                    quantity: 3
                }, {
                    name: 'Steel Spring',
                    quantity: 6
                }], station: 'Gunsmith 2'
        },
        repairInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+50'
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 1
                    }], durability: '+55'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+60'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }], durability: '+65'
            }
        ],
        upgradeInfo: [
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '+10 Magazine Size, 15% Reduced Reload Time, +10 Durability'
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '+20 Magazine Size, 30% Reduced Reload Time, +20 Durability'
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }], perks: '+30 Magazine Size, 45% Reduced Reload Time, +30 Durability'
            }
        ],
        recycleInfo: [
            {
                tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{ name: 'Adv Mechanical Components', quantity: 2 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{ name: 'Adv Mechanical Components', quantity: 3 }, {
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ],
        salvageInfo: [
            {
                tier: 'I', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'II', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 2
                    }]
            },
            {
                tier: 'III', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            },
            {
                tier: 'IV', materials: [{
                        name: 'Medium Gun Parts',
                        quantity: 3
                    }]
            }
        ]
    },
    // ─── NEW: Canto (RARE SMG, Medium Ammo) ───────────────────────────────
    {
        id: 'w-canto', name: 'Canto', rarity: 'RARE', icon: 'mode_fan',
        ammoType: 'MEDIUM', weaponType: 'SMG',
        craftInfo: { materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Magnet', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 6 }], station: 'Gunsmith 2' },
        upgradeInfo: [
            { tier: 'II', materials: [{ name: 'Mechanical Components', quantity: 3 }, { name: 'Medium Gun Parts', quantity: 3 }], perks: '+4 Magazine Size, +10 Durability' },
            { tier: 'III', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 4 }], perks: '+2 Damage, +10 Durability' },
            { tier: 'IV', materials: [{ name: 'Mechanical Components', quantity: 4 }, { name: 'Medium Gun Parts', quantity: 5 }], perks: '+2 Damage, +10 Durability' }
        ],
        recycleInfo: [
            { tier: 'I', materials: [{ name: 'Adv Mechanical Components', quantity: 1 }, { name: 'Medium Gun Parts', quantity: 2 }] }
        ],
        salvageInfo: [
            { tier: 'I', materials: [{ name: 'Medium Gun Parts', quantity: 2 }] }
        ]
    },
    // ─── NEW: Dolabra (LEGENDARY Shotgun, Energy Clip) ────────────────────
    {
        id: 'w-dolabra', name: 'Dolabra', rarity: 'LEGENDARY', icon: 'bolt',
        ammoType: 'ENERGY', weaponType: 'SHOTGUN',
        craftInfo: { materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Shredder Gyro', quantity: 1 }, { name: 'Vaporizer Regulator', quantity: 1 }], station: 'Gunsmith 3' },
        repairInfo: [
            { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 1 }, { name: 'Shredder Gyro', quantity: 1 }], durability: '+50' }
        ],
        recycleInfo: [
            { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 2 }] }
        ],
        salvageInfo: [
            { tier: 'I', materials: [{ name: 'Magnetic Accelerator', quantity: 1 }] }
        ]
    }
];
exports.THROWABLES_DATA = [
    { "id": "t-cloak", "name": "Photoelectric Cloak", "rarity": "EPIC", "icon": "visibility_off", "category": "QUICK USE", "description": "Briefly invisible to ARC.", "craftInfo": { "station": "Refiner 3", "quantityProduced": 1, "materials": [{ "name": "Adv Mechanical Components", "quantity": 1 }] } },
    { "id": "t-snaphook", "name": "Snap Hook", "rarity": "UNCOMMON", "icon": "link", "category": "QUICK USE", "description": "Quick traversal across gaps.", "craftInfo": { "station": "Refiner 1", "quantityProduced": 1, "materials": [{ "name": "Metal Parts", "quantity": 4 }] } },
    { "id": "t-zipline", "name": "Zipline", "rarity": "RARE", "icon": "route", "category": "QUICK USE", "description": "Bidirectional zipline for squad.", "craftInfo": { "station": "Refiner 2", "quantityProduced": 1, "materials": [{ "name": "Rope", "quantity": 4 }, { "name": "Mechanical Components", "quantity": 3 }] } },
    { "id": "t-hatch", "name": "Raider Hatch Key", "rarity": "RARE", "icon": "key", "category": "QUICK USE", "description": "An over-the-counter electronic lock bypass. Unlocks Raider Hatches.", "craftInfo": { "station": "Gear Bench 3", "quantityProduced": 1, "materials": [{ "name": "Adv Electrical Components", "quantity": 1 }, { "name": "Sensors", "quantity": 3 }] } },
    { "id": "t-surge", "name": "Surge Coil", "rarity": "RARE", "icon": "flash_on", "category": "QUICK USE", "description": "Deploys an electrical field to disable nearby ARC.", "craftInfo": { "station": "Explosives Station III", "quantityProduced": 1, "materials": [{ "name": "Electrical Components", "quantity": 1 }, { "name": "Sensors", "quantity": 1 }, { "name": "Hornet Driver", "quantity": 1 }] } },
    { "id": "t-tagging", "name": "Tagging Grenade", "rarity": "RARE", "icon": "my_location", "category": "THROWABLES", "description": "A tactical grenade that tags enemies through walls.", "craftInfo": { "station": "Explosives Station II", "quantityProduced": 1, "materials": [{ "name": "Electrical Components", "quantity": 1 }, { "name": "Sensors", "quantity": 1 }] } },
    // THROWABLES
    {
        id: 't1', name: 'Light Impact Grenade', recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 1
            }, {
                name: 'Plastic Parts',
                stackSize: 50, quantity: 1
            }], salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 1
            }], rarity: 'COMMON', icon: 'explosion', stackSize: 5,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Topside (In-Round)', quantityProduced: 1, materials: [{
                    name: 'Plastic Parts',
                    quantity: 2
                }, {
                    name: 'Chemicals',
                    quantity: 3
                }]
        }
    },
    {
        id: 't2', name: 'Smoke Grenade', recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 2
            }, {
                name: 'Canister',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 3
            }], rarity: 'RARE', icon: 'cloud', stackSize: 5,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Refiner 2', quantityProduced: 1, materials: [{
                    name: 'Chemicals',
                    quantity: 14
                }, {
                    name: 'Canister',
                    quantity: 1
                }]
        }
    },
    {
        id: 't4', name: 'Showstopper', recycleInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }, {
                name: 'Voltage Converter',
                stackSize: 5, quantity: 1
            }], salvageInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }], rarity: 'RARE', icon: 'motion_photos_pause', stackSize: 5,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 1 }, { name: 'Hornet Driver', quantity: 1 }, {
                    name: 'Voltage Converter',
                    quantity: 1
                }]
        }
    },
    {
        id: 't5', name: 'Jolt Mine', recycleInfo: [{
                name: 'Battery',
                stackSize: 15, quantity: 1
            }, {
                name: 'Plastic Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{
                name: 'Battery',
                stackSize: 15, quantity: 1
            }], rarity: 'RARE', icon: 'settings_input_antenna', stackSize: 3,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 1 }, {
                    name: 'Battery',
                    quantity: 1
                }]
        }
    },
    {
        id: 't6', name: 'Explosive Mine', recycleInfo: [{
                name: 'Oil',
                stackSize: 15, quantity: 2
            }, {
                name: 'Sensors',
                stackSize: 5, quantity: 1
            }], salvageInfo: [{
                name: 'Oil',
                stackSize: 15, quantity: 2
            }], rarity: 'RARE', icon: 'trip_origin', stackSize: 3,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, {
                    name: 'Sensors',
                    quantity: 1
                }]
        }
    },
    {
        id: 't7', name: 'Snap Blast Grenade', recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 1
            }, {
                name: 'Magnet',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 2
            }], rarity: 'COMMON', icon: 'explosion', stackSize: 3,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 2 }, {
                    name: 'Magnet',
                    quantity: 1
                }]
        }
    },
    {
        id: 't8', name: 'Trigger\'nade', rarity: 'RARE', icon: 'back_hand', stackSize: 5,
        recycleInfo: [{
                name: 'Chemicals',
                quantity: 1
            }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{
                name: 'Processor',
                quantity: 1
            }],
        description: "A remote-detonated Grenade that explodes after being triggered. It can stick to almost any surface when thrown.", category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 2 }, {
                    name: 'Processor',
                    quantity: 1
                }]
        }
    },
    {
        id: 't9', name: 'Heavy Fuze Grenade', recycleInfo: [{
                name: 'Oil',
                stackSize: 15, quantity: 1
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 2
            }], salvageInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 1 }], rarity: 'RARE', icon: 'bomb', stackSize: 3,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, {
                    name: 'Canister',
                    quantity: 2
                }]
        }
    },
    {
        id: 't10', name: 'Blaze Grenade', recycleInfo: [{
                name: 'Metal Parts',
                stackSize: 50, quantity: 4
            }, {
                name: 'Oil',
                stackSize: 15, quantity: 2
            }], salvageInfo: [{
                name: 'Oil',
                stackSize: 15, quantity: 1
            }], rarity: 'RARE', icon: 'local_fire_department', stackSize: 5,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, {
                    name: 'Oil',
                    quantity: 2
                }]
        }
    },
    {
        id: 't11', name: 'Trailblazer', recycleInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 2 }], salvageInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 2 }], rarity: 'EPIC', icon: 'route', stackSize: 3,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station III', quantityProduced: 1, materials: [{
                    name: 'Synthesized Fuel',
                    quantity: 1
                }, { name: 'Crude Explosives', quantity: 2 }, { name: 'Firefly Burner', quantity: 1 }]
        }
    },
    {
        id: 't12', name: 'Wolfpack', recycleInfo: [{ name: 'ARC Motion Core', stackSize: 5, quantity: 1 }, { name: 'Explosive Compound', stackSize: 5, quantity: 1 }], salvageInfo: [{ name: 'Explosive Compound', stackSize: 5, quantity: 2 }], rarity: 'EPIC', icon: 'rocket_launch', stackSize: 1,
        description: '', category: 'GRENADES',
        craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Explosive Compound', quantity: 1 }, { name: 'ARC Motion Core', quantity: 2 }, { name: 'Rocketeer Driver', quantity: 1 }] }
    },
    {
        id: 't13', name: 'Seeker Grenade', recycleInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 1 }], salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 3
            }], rarity: 'RARE', icon: 'assistant_navigation', stackSize: 5,
        description: '', category: 'GRENADES',
        craftInfo: { station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 1 }, { name: 'ARC Alloy', quantity: 2 }] }
    },
    {
        id: 't14', name: 'Shrapnel Grenade', recycleInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 1 }, {
                name: 'Metal Parts',
                stackSize: 50, quantity: 1
            }], salvageInfo: [{ name: 'Crude Explosives', stackSize: 10, quantity: 1 }], rarity: 'UNCOMMON', icon: 'blur_on', stackSize: 5,
        description: '', category: 'GRENADES',
        craftInfo: {
            station: 'Explosives Station I', quantityProduced: 1, materials: [{ name: 'Crude Explosives', quantity: 1 }, {
                    name: 'Steel Spring',
                    quantity: 2
                }]
        }
    },
    {
        id: 't15', name: 'Deadline', recycleInfo: [{ name: 'Explosive Compound', stackSize: 5, quantity: 1 }, { name: 'ARC Circuitry', stackSize: 5, quantity: 1 }], salvageInfo: [{ name: 'Explosive Compound', stackSize: 5, quantity: 1 }], rarity: 'EPIC', icon: 'warning', stackSize: 1,
        description: '', category: 'GRENADES',
        craftInfo: { station: 'Explosives Station III', quantityProduced: 1, materials: [{ name: 'Comet Igniter', quantity: 1 }, { name: 'Explosive Compound', quantity: 3 }, { name: 'ARC Circuitry', quantity: 2 }] }
    },
    // DEFENSIVE - SHIELDS
    {
        id: 't16', name: 'Light Shield', rarity: 'UNCOMMON', icon: 'shield', category: 'SHIELDS',
        description: 'Basic protection made from salvaged parts. Lightweight and portable.',
        craftInfo: {
            station: 'Gear Bench 1', quantityProduced: 1, materials: [{ name: 'ARC Alloy', quantity: 2 }, {
                    name: 'Plastic Parts',
                    quantity: 4
                }]
        },
        recycleInfo: [{
                name: 'Plastic Parts',
                quantity: 4
            }],
        salvageInfo: [{ name: 'ARC Alloy', quantity: 1 }],
        stackSize: 1
    },
    {
        id: 't17', name: 'Medium Shield', rarity: 'RARE', icon: 'shield', category: 'SHIELDS',
        description: 'Adv protection with integrated circuitry for better durability.',
        craftInfo: {
            station: 'Gear Bench 2', quantityProduced: 1, materials: [{
                    name: 'Battery',
                    quantity: 4
                }, { name: 'ARC Circuitry', quantity: 1 }]
        },
        recycleInfo: [{ name: 'ARC Circuitry', quantity: 1 }],
        salvageInfo: [{ name: 'ARC Alloy', quantity: 2 }],
        stackSize: 1
    },
    {
        id: 't18', name: 'Heavy Shield', rarity: 'EPIC', icon: 'shield', category: 'SHIELDS',
        description: 'Maximum protection using high-voltage components to deflect impacts.',
        craftInfo: {
            station: 'Gear Bench 3', quantityProduced: 1, materials: [{ name: 'Power Rod', quantity: 1 }, {
                    name: 'Voltage Converter',
                    quantity: 2
                }]
        },
        recycleInfo: [{ name: 'ARC Circuitry', quantity: 2 }, {
                name: 'Voltage Converter',
                quantity: 1
            }],
        salvageInfo: [{ name: 'ARC Alloy', quantity: 4 }],
        stackSize: 1
    },
    // DEFENSIVE - QUICK USE
    {
        id: 't19', name: 'Shield Recharger', recycleInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 4
            }], salvageInfo: [{
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }], rarity: 'UNCOMMON', icon: 'battery_charging_full', category: 'HEALING', stackSize: 5,
        description: 'Quick Use item that can be used to recharge Shields over time.',
        craftInfo: {
            station: 'Refiner 1', quantityProduced: 1, materials: [{
                    name: 'Rubber Parts',
                    quantity: 4
                }, { name: 'ARC Powercell', quantity: 1 }]
        }
    },
    {
        id: 't20', name: 'Surge Shield Recharger', recycleInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }], salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 5
            }], rarity: 'RARE', icon: 'bolt', category: 'HEALING', stackSize: 5,
        description: 'Quick Use item that can be used to recharge Shields instantly.',
        craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 4 }, { name: 'Adv ARC Powercell', quantity: 1 }] }
    },
    {
        id: 't21', name: 'Vita Spray', recycleInfo: [{ name: 'Antiseptic', stackSize: 5, quantity: 1 }, {
                name: 'Canister',
                stackSize: 15, quantity: 1
            }], salvageInfo: [{ name: 'Antiseptic', stackSize: 5, quantity: 1 }], rarity: 'EPIC', icon: 'medication', category: 'HEALING', stackSize: 1,
        description: 'A pressurized healing spray that restores health rapidly over time.',
        craftInfo: {
            station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Antiseptic', quantity: 4 }, {
                    name: 'Canister',
                    quantity: 1
                }, { name: 'Tick Pod', quantity: 1 }]
        }
    },
    {
        id: 't22', name: 'Vita Shot', recycleInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 4
            }, {
                name: 'Syringe',
                stackSize: 5, quantity: 1
            }], salvageInfo: [{
                name: 'Syringe',
                stackSize: 5, quantity: 1
            }], rarity: 'RARE', icon: 'vaccines', category: 'HEALING', stackSize: 3,
        description: 'An injectable healing agent that provides an immediate boost to health.',
        craftInfo: {
            station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Antiseptic', quantity: 3 }, {
                    name: 'Syringe',
                    quantity: 1
                }]
        }
    },
    {
        id: 't23', name: 'Sterilized Bandage', recycleInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 1
            }, { name: 'Antiseptic', stackSize: 5, quantity: 1 }], salvageInfo: [{ name: 'Durable Cloth', stackSize: 10, quantity: 1 }], rarity: 'RARE', icon: 'healing', category: 'HEALING', stackSize: 3,
        description: 'Clean medical wrap treated with antiseptic to heal wounds.',
        craftInfo: { station: 'Refiner 1', quantityProduced: 1, materials: [{ name: 'Durable Cloth', quantity: 2 }, { name: 'Antiseptic', quantity: 1 }] }
    },
    {
        id: 't24', name: 'Herbal Bandage', recycleInfo: [{ name: 'Assorted Seeds', stackSize: 100, quantity: 2 }, {
                name: 'Fabric',
                stackSize: 50, quantity: 5
            }], salvageInfo: [{
                name: 'Fabric',
                stackSize: 50, quantity: 8
            }], rarity: 'UNCOMMON', icon: 'healing', category: 'HEALING', stackSize: 5,
        description: 'A traditional bandage using medicinal plants for natural healing.',
        craftInfo: {
            station: 'Refiner 1', quantityProduced: 1, materials: [{
                    name: 'Fabric',
                    quantity: 4
                }, {
                    name: 'Great Mullein',
                    quantity: 2
                }]
        }
    },
    {
        id: 't25', name: 'Defibrillator', recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 1
            }, {
                name: 'Moss',
                stackSize: 10, quantity: 1
            }], salvageInfo: [{
                name: 'Chemicals',
                stackSize: 50, quantity: 2
            }], rarity: 'RARE', icon: 'heart_minus', category: 'HEALING', stackSize: 3,
        description: 'A device used to revive downed teammates in the heat of battle.',
        craftInfo: {
            station: 'Refiner 2', quantityProduced: 1, materials: [{
                    name: 'Plastic Parts',
                    quantity: 6
                }, {
                    name: 'Moss',
                    quantity: 2
                }]
        }
    },
    // ─── NEW GRENADES ──────────────────────────────────────────────────────
    {
        id: 't-gas-grenade', name: 'Gas Grenade', rarity: 'COMMON', icon: 'blur_circular', category: 'GRENADES', description: 'Detonates to create a lingering toxic gas cloud that drains stamina.', stackSize: 5,
        craftInfo: { station: 'Explosives Station I', quantityProduced: 2, materials: [{ name: 'Chemicals', quantity: 4 }, { name: 'Rubber Parts', quantity: 2 }] },
        recycleInfo: [{ name: 'Chemicals', quantity: 1 }, { name: 'Rubber Parts', quantity: 1 }],
        salvageInfo: [{ name: 'Chemicals', quantity: 1 }]
    },
    {
        id: 't-lure-grenade', name: 'Lure Grenade', rarity: 'COMMON', icon: 'radar', category: 'GRENADES', description: 'Emits a signal that attracts nearby ARC to its location.', stackSize: 5,
        craftInfo: { station: 'Explosives Station I', quantityProduced: 2, materials: [{ name: 'Electrical Components', quantity: 1 }, { name: 'Plastic Parts', quantity: 2 }] },
        recycleInfo: [{ name: 'Plastic Parts', quantity: 1 }],
        salvageInfo: [{ name: 'Plastic Parts', quantity: 1 }]
    },
    // ─── NEW TRAPS ─────────────────────────────────────────────────────────
    {
        id: 't-gas-mine', name: 'Gas Mine', rarity: 'UNCOMMON', icon: 'dangerous', category: 'GRENADES', description: 'A proximity mine that releases a cloud of toxic gas when triggered.', stackSize: 3,
        craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Chemicals', quantity: 5 }, { name: 'Rubber Parts', quantity: 3 }] },
        recycleInfo: [{ name: 'Chemicals', quantity: 2 }],
        salvageInfo: [{ name: 'Chemicals', quantity: 1 }]
    },
    {
        id: 't-pulse-mine', name: 'Pulse Mine', rarity: 'UNCOMMON', icon: 'flash_on', category: 'GRENADES', description: 'A proximity mine that releases an EMP pulse, disabling nearby ARC on trigger.', stackSize: 3,
        craftInfo: { station: 'Explosives Station II', quantityProduced: 1, materials: [{ name: 'Electrical Components', quantity: 2 }, { name: 'Sensors', quantity: 1 }] },
        recycleInfo: [{ name: 'Electrical Components', quantity: 1 }],
        salvageInfo: [{ name: 'Electrical Components', quantity: 1 }]
    },
    // ─── NEW QUICK USE / HEALING ────────────────────────────────────────────
    {
        id: 't-bandage', name: 'Bandage', rarity: 'COMMON', icon: 'healing', category: 'UTILITY', description: 'A basic wound dressing. Stops bleeding and restores a small amount of health over time.', stackSize: 5,
        craftInfo: { station: 'Refiner 1', quantityProduced: 2, materials: [{ name: 'Fabric', quantity: 2 }] },
        recycleInfo: [{ name: 'Fabric', quantity: 1 }],
        salvageInfo: [{ name: 'Fabric', quantity: 1 }]
    },
    {
        id: 't-adrenaline', name: 'Adrenaline Shot', rarity: 'RARE', icon: 'medical_services', category: 'UTILITY', description: 'A powerful stimulant that rapidly restores stamina and briefly boosts movement speed.', stackSize: 3,
        craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Chemicals', quantity: 3 }, { name: 'Syringe', quantity: 1 }] },
        recycleInfo: [{ name: 'Chemicals', quantity: 1 }],
        salvageInfo: [{ name: 'Syringe', quantity: 1 }]
    },
    // ─── NEW GADGETS / UTILITY ─────────────────────────────────────────────
    {
        id: 't-barricade', name: 'Barricade Kit', rarity: 'UNCOMMON', icon: 'fence', category: 'UTILITY', description: 'Deploys a reinforced barricade panel to block doorways and chokepoints.', stackSize: 2,
        craftInfo: { station: 'Gear Bench I', quantityProduced: 1, materials: [{ name: 'Metal Parts', quantity: 4 }, { name: 'Rope', quantity: 2 }] },
        recycleInfo: [{ name: 'Metal Parts', quantity: 2 }],
        salvageInfo: [{ name: 'Metal Parts', quantity: 1 }]
    },
    {
        id: 't-zipline-quick', name: 'Zipline', rarity: 'RARE', icon: 'route', category: 'UTILITY', description: 'Creates a bidirectional zipline between two anchor points for rapid traversal.', stackSize: 2,
        craftInfo: { station: 'Refiner 2', quantityProduced: 1, materials: [{ name: 'Rope', quantity: 4 }, { name: 'Mechanical Components', quantity: 3 }] },
        recycleInfo: [{ name: 'Rope', quantity: 2 }],
        salvageInfo: [{ name: 'Rope', quantity: 1 }]
    },
    // ─── LIGHT STICKS ──────────────────────────────────────────────────────
];
exports.AUGMENTS_DATA = [
    {
        id: "a-c3a", name: "Combat Mk. 3 (Aggressive)", rarity: "EPIC", icon: "shield_with_heart", category: "AUGMENT", stackSize: 1,
        description: "Built for frontline assault. High shield integrity and optimized for offensive resource deployment.",
        perks: "+2 slots de granada e regen de 2 HP a cada 5 s (pausa 30 s ao tomar dano).",
        maxWeight: "64–65", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-c3f", name: "Combat Mk. 3 (Flanking)", rarity: "EPIC", icon: "shield_with_heart", category: "AUGMENT", stackSize: 1,
        description: "Highly mobile frame designed for rapid equipment swapping and maneuvering in close quarters.",
        perks: "+3 slots de Utility e pistolas/hand cannons equipam ~33% mais rápido.",
        maxWeight: "60", backpackSlots: 20, quickUseSlots: 5, safePocketSlots: 2, shieldCompat: "Light",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-l2", name: "Looting Mk. 2", rarity: "RARE", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
        description: "Scavenger's best friend. Lightweight with increased storage capacity for Trinkets.",
        perks: "+3 slots de Trinket e joga fora Ticks presos em você após ~1 s.",
        maxWeight: "60", backpackSlots: 22, quickUseSlots: 4, safePocketSlots: 2, shieldCompat: "Light",
        craftInfo: {
            station: "Refiner 2", quantityProduced: 1, materials: [{
                    name: 'Magnet',
                    quantity: 2
                }]
        },
        recycleInfo: [{ name: "Electrical Components", quantity: 1 }],
        salvageInfo: [{
                name: 'Plastic Parts',
                quantity: 4
            }]
    },
    {
        id: "a-l3c", name: "Looting Mk. 3 (Cautious)", rarity: "EPIC", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
        description: "Recon-optimized frame that prioritizes situational awareness and early warning systems.",
        perks: "Adrenaline Shot automático ao quebrar o escudo, com cooldown.",
        maxWeight: "70", backpackSlots: 24, quickUseSlots: 5, safePocketSlots: 2, shieldCompat: "Light",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-l3sa", name: "Looting Mk. 3 (Safekeeper)", rarity: "EPIC", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
        description: "The ultimate extractor. Features experimental safe pocket technology for high-value assets.",
        perks: "Safe Pocket aceita qualquer item (incluindo armas), protegendo-os da perda.",
        maxWeight: "65", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-l3su", name: "Looting Mk. 3 (Survivor)", rarity: "EPIC", icon: "shopping_bag", category: "AUGMENT", stackSize: 1,
        description: "Exceptional solo frame designed for survival in hostile environments without support.",
        perks: "Altíssimo peso + mochila, +1 Utility; 'mula' máxima, sem perk ativável.",
        maxWeight: "80", backpackSlots: 20, quickUseSlots: 5, safePocketSlots: 3, shieldCompat: "Light / Medium",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-t2", name: "Tactical Mk. 2", rarity: "RARE", icon: "tactic", category: "AUGMENT", stackSize: 1,
        description: "Utility frame focused on defensive deployment and area denial strategies.",
        perks: "+1 slot de Utility e fumaça automática ao quebrar o escudo (CD fixo).",
        maxWeight: "45", backpackSlots: 17, quickUseSlots: 5, safePocketSlots: 1, shieldCompat: "Light / Medium",
        craftInfo: {
            station: "Refiner 2", quantityProduced: 1, materials: [{
                    name: 'Magnet',
                    quantity: 2
                }]
        },
        recycleInfo: [{ name: "Electrical Components", quantity: 1 }],
        salvageInfo: [{
                name: 'Plastic Parts',
                quantity: 4
            }]
    },
    {
        id: "a-t3d", name: "Tactical Mk. 3 (Defensive)", rarity: "EPIC", icon: "tactic", category: "AUGMENT", stackSize: 1,
        description: "Frontline tank frame designed for maximum durability and energy redirection.",
        perks: "Integrated Shield Recharger para recarregar escudo com cooldown.",
        maxWeight: "60", backpackSlots: 20, quickUseSlots: 5, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-t3h", name: "Tactical Mk. 3 (Healing)", rarity: "EPIC", icon: "tactic", category: "AUGMENT", stackSize: 1,
        description: "Specialized combat medic frame with integrated healing dispersal systems.",
        perks: "+3 slots de cura e nuvem de cura (~20 HP em 10 s) ao ser revivido.",
        maxWeight: "55", backpackSlots: 16, quickUseSlots: 4, safePocketSlots: 3, shieldCompat: "Light / Medium",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: "a-t3r", name: "Tactical Mk. 3 (Revival)", rarity: "EPIC", icon: "tactic", category: "AUGMENT", stackSize: 1,
        description: "Support-heavy frame built for emergency squads and squad recovery operations.",
        perks: "Integrated Defibrillator (revive grátis com cooldown) e regen leve de HP.",
        maxWeight: "65", backpackSlots: 16, quickUseSlots: 5, safePocketSlots: 2, shieldCompat: "Light",
        craftInfo: {
            station: "Refiner 3", quantityProduced: 1, materials: [{ name: "Adv Electrical Components", quantity: 2 }, {
                    name: 'Processor',
                    quantity: 3
                }]
        },
        recycleInfo: [{ name: "Adv Electrical Components", quantity: 1 }, {
                name: 'Processor',
                quantity: 1
            }],
        salvageInfo: [{ name: "Electrical Components", quantity: 2 }]
    },
    {
        id: 'a1', name: 'Combat Mk. 1', rarity: 'UNCOMMON', icon: 'shield_with_heart', category: 'AUGMENT',
        description: 'Basic armor that supports Medium Shields.',
        perks: 'Suporta Medium Shield, pouca mochila, sem perk.',
        maxWeight: "45", backpackSlots: 16, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium",
        craftInfo: {
            station: 'Refiner 1', quantityProduced: 1, materials: [{
                    name: 'Rubber Parts',
                    quantity: 6
                }, {
                    name: 'Plastic Parts',
                    quantity: 10
                }]
        },
        recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }],
        salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }]
    },
    {
        id: 'a2', name: 'Combat Mk. 2', rarity: 'RARE', icon: 'shield_with_heart', category: 'AUGMENT',
        description: 'Advanced frame with integrated medical systems.',
        perks: '+1 slot de granada e regen de 1 HP a cada 5 s (pausa 30 s após dano).',
        maxWeight: "55", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light / Medium / Heavy",
        craftInfo: {
            station: 'Refiner 2', quantityProduced: 1, materials: [{
                    name: 'Magnet',
                    quantity: 2
                }, { name: 'Adv Mechanical Components', quantity: 2 }]
        },
        recycleInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }, {
                name: 'Magnet',
                stackSize: 15, quantity: 1
            }],
        salvageInfo: [{ name: 'Electrical Components', stackSize: 10, quantity: 1 }]
    },
    {
        id: 'a3', name: 'Looting Mk. 1', rarity: 'UNCOMMON', icon: 'shopping_bag', category: 'AUGMENT',
        description: 'Increases carrying weight and backpack slots.',
        perks: 'Mais slots de mochila e peso, sem perk ativo extra.',
        maxWeight: "50", backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 1, shieldCompat: "Light",
        craftInfo: {
            station: 'Refiner 1', quantityProduced: 1, materials: [{
                    name: 'Fabric',
                    quantity: 12
                }, {
                    name: 'Plastic Parts',
                    quantity: 8
                }]
        },
        recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }],
        salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }]
    },
    {
        id: 'a4', name: 'Tactical Mk. 1', rarity: 'UNCOMMON', icon: 'tactic', category: 'AUGMENT',
        description: 'Provides additional Quick Use slots for tactical items.',
        perks: 'Mais Quick Use, mochila menor, sem perk.',
        maxWeight: "40", backpackSlots: 15, quickUseSlots: 5, safePocketSlots: 1, shieldCompat: "Light / Medium",
        craftInfo: {
            station: 'Refiner 1', quantityProduced: 1, materials: [{
                    name: 'Wires',
                    quantity: 8
                }, {
                    name: 'Plastic Parts',
                    quantity: 10
                }]
        },
        recycleInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }, {
                name: 'Rubber Parts',
                stackSize: 50, quantity: 3
            }],
        salvageInfo: [{
                name: 'Plastic Parts',
                stackSize: 50, quantity: 3
            }]
    }
];
exports.LOOT_DATA = [
    // --- NON-CRAFTABLE ITEMS FIRST (A-Z) ---
    {
        id: 'loot-arc-alloy',
        material: 'ARC Alloy',
        wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Alloy',
        sources: [
            { name: 'Damaged Leaper Pulse Unit', quantity: 3 },
            { name: 'Damaged Rocketeer Driver', quantity: 3 },
            { name: 'Bastion Cell', quantity: 3 },
            { name: 'Bombardier Cell', quantity: 3 },
            { name: 'Leaper Pulse Unit', quantity: 3 },
            { name: 'Heavy Shield', quantity: 3 },
            { name: 'ARC Circuitry', quantity: 2 },
            { name: 'ARC Motion Core', quantity: 2 },
            { name: 'Rocketeer Driver', quantity: 2 }
        ]
    },
    {
        id: 'loot-arc-powercell',
        material: 'ARC Powercell',
        wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Powercell',
        sources: [
            { name: 'Adv ARC Powercell', quantity: 2 }
        ]
    },
    {
        id: 'loot-duct-tape',
        material: 'Duct Tape',
        wikiUrl: 'https://arcraiders.wiki/wiki/Duct_Tape',
        sources: [
            { name: 'Angled Grip III', quantity: 2 },
            { name: 'Kinetic Converter', quantity: 2 },
            { name: 'Horizontal Grip', quantity: 2 },
            { name: 'Stable Stock III', quantity: 2 },
            { name: 'Vertical Grip III', quantity: 2 },
            { name: 'Angled Grip II', quantity: 1 },
            { name: 'Lightweight Stock', quantity: 1 },
            { name: 'Padded Stock III', quantity: 1 }
        ]
    },
    {
        id: 'loot-chemicals',
        material: 'Chemicals',
        wikiUrl: 'https://arcraiders.wiki/wiki/Chemicals',
        sources: [
            { name: 'Vita Shot', quantity: 4 },
            { name: 'Pulse Mine Blueprint', quantity: 2 },
            { name: 'Soap', quantity: 1 },
            { name: 'Bleach', quantity: 1 },
            {
                name: 'Syringe',
                quantity: 1
            }
        ]
    },
    {
        id: 'loot-rubber-parts',
        material: 'Rubber Parts',
        wikiUrl: 'https://arcraiders.wiki/wiki/Rubber_Parts',
        sources: [
            {
                name: 'Wires',
                quantity: 2
            },
            { name: 'Mechanical Components', quantity: 2 },
            { name: 'Rattler II', quantity: 2 },
            { name: 'Shield Recharger', quantity: 4 },
            { name: 'Rubber Pad', quantity: 18 },
            { name: 'Ruined Accordion', quantity: 18 },
            { name: 'ARC Flex Rubber', quantity: 16 },
            { name: 'Diving Goggles', quantity: 12 },
            { name: 'Degraded ARC Rubber', quantity: 11 },
            { name: 'Deflated Football', quantity: 9 },
            { name: 'Expired Respirator', quantity: 8 },
            { name: 'Headphones', quantity: 7 },
            { name: 'Thermostat', quantity: 7 },
            { name: 'Ruined Riot Shield', quantity: 6 }
        ]
    },
    {
        id: 'loot-plastic-parts',
        material: 'Plastic Parts',
        wikiUrl: 'https://arcraiders.wiki/wiki/Plastic_Parts',
        sources: [
            { name: 'Toaster', quantity: 5 },
            {
                name: 'Processor',
                quantity: 1
            },
            { name: 'Vita Shot', quantity: 1 },
            { name: 'Electrical Components', quantity: 3 },
            { name: 'ARC Synthetic Resin', quantity: 14 },
            { name: 'Cooling Fan', quantity: 14 },
            { name: 'Recorder', quantity: 10 },
            { name: 'Ruined Riot Shield', quantity: 10 },
            { name: 'Shaker', quantity: 10 },
            { name: 'Dried-Out ARC Resin', quantity: 9 },
            { name: 'Camera Lens', quantity: 8 },
            { name: 'Remote Control', quantity: 7 },
            { name: 'Alarm Clock', quantity: 6 },
            { name: 'Angled Grip I', quantity: 6 }
        ]
    },
    {
        id: 'loot-magnet',
        material: 'Magnet',
        wikiUrl: 'https://arcraiders.wiki/wiki/Magnet',
        sources: [
            { name: 'Microscope', quantity: 3 },
            {
                name: 'Exodus Modules',
                quantity: 2
            },
            { name: 'Industrial Magnet', quantity: 2 },
            { name: 'Combat Mk. 2', quantity: 1 },
            { name: 'Looting Mk. 2', quantity: 1 },
            { name: 'Ripped Safety Vest', quantity: 1 },
            { name: 'Ruined Tactical Vest', quantity: 1 },
            { name: 'Snap Blast Grenade', quantity: 1 },
            { name: 'Tactical Mk. 2', quantity: 1 }
        ]
    },
    {
        id: 'loot-metal-parts',
        material: 'Metal Parts',
        wikiUrl: 'https://arcraiders.wiki/wiki/Metal_Parts',
        sources: [
            { name: 'Rattler IV', quantity: 12 },
            { name: 'Il Toro IV', quantity: 8 },
            { name: 'Heavy Shield', quantity: 3 },
            {
                name: 'Magnet',
                quantity: 3
            },
            { name: 'Mechanical Components', quantity: 3 },
            { name: 'Microscope', quantity: 2 },
            { name: 'Toaster', quantity: 2 },
            {
                name: 'Steel Spring',
                quantity: 2
            },
            {
                name: 'Simple Gun Parts',
                quantity: 2
            },
            { name: 'Unusable Weapon', quantity: 2 }
        ]
    },
    {
        id: 'loot-mod-components',
        material: 'Mod Components',
        wikiUrl: 'https://arcraiders.wiki/wiki/Mod_Components',
        craftingStation: 'Refiner 2',
        sources: [
            { name: 'Anvil Splitter', quantity: 1 },
            { name: 'Kinetic Converter', quantity: 1 },
            { name: 'Horizontal Grip', quantity: 1 },
            { name: 'Angled Grip III', quantity: 1 },
            { name: 'Extended Barrel', quantity: 1 },
            { name: 'Vertical Grip III', quantity: 1 },
            { name: 'Stable Stock III', quantity: 1 },
            { name: 'Padded Stock III', quantity: 1 },
            { name: 'Lightweight Stock', quantity: 1 },
            { name: 'Trigger \'Nade', quantity: 1 }
        ]
    },
    {
        id: 'loot-steel-spring',
        material: 'Steel Spring',
        wikiUrl: 'https://arcraiders.wiki/wiki/Steel_Spring',
        sources: [
            { name: 'Ruined Accordion', quantity: 3 },
            { name: 'Cooling Coil', quantity: 2 },
            { name: 'Extended Light Mag III', quantity: 2 },
            { name: 'Extended Medium Mag III', quantity: 2 },
            { name: 'Extended Shotgun Mag III', quantity: 2 },
            { name: 'Spring Cushion', quantity: 2 },
            { name: 'Adv Mechanical Components', quantity: 1 },
            { name: 'Mod Components', quantity: 1 },
            { name: 'Extended Light Mag II', quantity: 1 },
            { name: 'Extended Medium Mag II', quantity: 1 }
        ]
    },
    {
        id: 'loot-wires',
        material: 'Wires',
        wikiUrl: 'https://arcraiders.wiki/wiki/Wires',
        sources: [
            { name: 'Portable TV', quantity: 6 },
            { name: 'Acoustic Guitar', quantity: 6 },
            { name: 'Cooling Fan', quantity: 4 },
            { name: 'Power Cable', quantity: 4 },
            { name: 'Toaster', quantity: 3 },
            { name: 'Damaged Heat Sink', quantity: 2 },
            { name: 'Power Bank', quantity: 2 },
            { name: 'Humidifier', quantity: 2 },
            { name: 'Muzzle Brake III', quantity: 2 },
            { name: 'Shotgun Choke III', quantity: 2 },
            {
                name: 'Processor',
                quantity: 1
            },
            {
                name: 'Voltage Converter',
                quantity: 1
            },
            { name: 'Broken Handheld Radio', quantity: 2 },
            { name: 'Broken Taser', quantity: 2 }
        ]
    },
    // --- CRAFTABLE ITEMS LAST (A-Z) ---
    {
        id: 'loot-adv-electrical',
        material: 'Adv Electrical Components',
        wikiUrl: 'https://arcraiders.wiki/wiki/Advanced_Electrical_Components',
        craftingStation: 'Refiner 2',
        sources: [
            { name: 'Rocketeer Driver', quantity: 2 },
            { name: 'Combat Mk. 3 (Aggressive)', quantity: 1 },
            { name: 'Combat Mk. 3 (Flanking)', quantity: 1 },
            { name: 'Frequency Modulation Box', quantity: 1 },
            { name: 'Looting Mk. 3 (Cautious)', quantity: 1 },
            { name: 'Looting Mk. 3 (Safekeeper)', quantity: 1 },
            { name: 'Looting Mk. 3 (Survivor)', quantity: 1 },
            { name: 'Photoelectric Cloak', quantity: 1 },
            { name: 'Power Rod', quantity: 1 },
            { name: 'Tactical Mk. 3 (Defensive)', quantity: 1 }
        ]
    },
    {
        id: 'loot-adv-mechanical',
        material: 'Adv Mechanical Components',
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
            { name: 'Osprey IV', quantity: 3 }
        ]
    },
    {
        id: 'loot-electrical-components',
        material: 'Electrical Components',
        wikiUrl: 'https://arcraiders.wiki/wiki/Electrical_Components',
        craftingStation: 'Refiner 1',
        sources: [
            { name: 'Fried Motherboard', quantity: 2 },
            { name: 'Hornet Driver', quantity: 2 },
            { name: 'Rotary Encoder', quantity: 2 },
            { name: 'Sample Cleaner', quantity: 2 },
            { name: 'Signal Amplifier', quantity: 2 },
            { name: 'Snitch Scanner', quantity: 2 },
            { name: 'Spotter Relay', quantity: 2 },
            { name: 'Adv Electrical Components', quantity: 1 },
            { name: 'Combat Mk. 2', quantity: 1 },
            { name: 'Looting Mk. 2', quantity: 1 }
        ]
    },
    {
        id: 'loot-heavy-gun-parts',
        material: 'Heavy Gun Parts',
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
            { name: 'Bettina I', quantity: 2 }
        ]
    },
    {
        id: 'loot-light-gun-parts',
        material: 'Light Gun Parts',
        wikiUrl: 'https://arcraiders.wiki/wiki/Light_Gun_Parts',
        craftingStation: 'Refiner 2',
        sources: [
            { name: 'Bobcat IV', quantity: 4 },
            { name: 'Bobcat III', quantity: 3 },
            { name: 'Bobcat II', quantity: 2 },
            { name: 'Bobcat I', quantity: 1 }
        ]
    },
    {
        id: 'loot-mechanical-components',
        material: 'Mechanical Components',
        wikiUrl: 'https://arcraiders.wiki/wiki/Mechanical_Components',
        craftingStation: 'Refiner 1',
        sources: [
            { name: 'Arpeggio III', quantity: 4 },
            { name: 'Burletta IV', quantity: 4 },
            { name: 'Power Drill', quantity: 4 },
            { name: 'Rattler IV', quantity: 4 }
        ]
    },
    {
        id: 'loot-medium-gun-parts',
        material: 'Medium Gun Parts',
        wikiUrl: 'https://arcraiders.wiki/wiki/Medium_Gun_Parts',
        craftingStation: 'Refiner 2',
        sources: [
            { name: 'Tempest III', quantity: 4 },
            { name: 'Tempest IV', quantity: 4 },
            { name: 'Osprey III', quantity: 3 },
            { name: 'Osprey IV', quantity: 3 },
            { name: 'Renegade III', quantity: 3 },
            { name: 'Renegade IV', quantity: 3 },
            { name: 'Tempest II', quantity: 3 },
            { name: 'Torrente III', quantity: 3 },
            { name: 'Torrente IV', quantity: 3 },
            { name: 'Venator III', quantity: 3 }
        ]
    },
    {
        id: 'loot-simple-gun-parts',
        material: 'Simple Gun Parts',
        wikiUrl: 'https://arcraiders.wiki/wiki/Simple_Gun_Parts',
        craftingStation: 'Refiner 3',
        sources: [
            { name: 'Anvil IV', quantity: 5 },
            { name: 'Arpeggio IV', quantity: 5 },
            { name: 'Il Toro IV', quantity: 5 },
            { name: 'Unusable Weapon', quantity: 5 },
            { name: 'Anvil III', quantity: 4 },
            { name: 'Arpeggio III', quantity: 4 },
            { name: 'Burletta IV', quantity: 4 },
            { name: 'Il Toro III', quantity: 4 },
            {
                name: 'Complex Gun Parts',
                quantity: 3
            },
            { name: 'Anvil II', quantity: 3 }
        ]
    },
    {
        id: "loot-complex-gun-parts",
        material: "Complex Gun Parts",
        wikiUrl: 'https://arcraiders.wiki/wiki/Complex_Gun_Parts',
        craftingStation: 'Refiner 3',
        sources: [
            { name: 'Jupiter', quantity: 3 },
            { name: 'Aphelion', quantity: 2 },
            { name: 'Equalizer', quantity: 2 },
            { name: 'Jupiter (Tier 1)', quantity: 2 },
            { name: 'Aphelion (Tier 1)', quantity: 2 }
        ]
    },
    {
        id: 'loot-arc-circuitry',
        material: 'ARC Circuitry',
        wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Circuitry',
        sources: [
            { name: 'Power Rod', quantity: 1 },
            { name: 'Heavy Shield', quantity: 1 },
            { name: 'Deadline', quantity: 1 },
            { name: 'Sentinel Weaponry Core', quantity: 1 }
        ]
    },
    {
        id: 'loot-arc-motion-core',
        material: 'ARC Motion Core',
        wikiUrl: 'https://arcraiders.wiki/wiki/ARC_Motion_Core',
        sources: [
            { name: 'Wolfpack', quantity: 1 },
            { name: 'Launcher Ammo', quantity: 1 }
        ]
    },
    {
        id: 'loot-processor',
        material: 'Processor',
        wikiUrl: 'https://arcraiders.wiki/wiki/Processor',
        sources: [
            { name: 'Anvil Splitter', quantity: 1 },
            { name: 'Tactical Mk. 3 (Healing)', quantity: 1 },
            { name: 'Tactical Mk. 3 (Defensive)', quantity: 1 },
            { name: 'Trigger \'Nade', quantity: 1 }
        ]
    },
    {
        id: 'loot-magnetic-accelerator',
        material: 'Magnetic Accelerator',
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
        id: "loot-voltage-converter",
        material: "Voltage Converter",
        wikiUrl: 'https://arcraiders.wiki/wiki/Voltage_Converter',
        craftingStation: 'Refiner 3',
        sources: [
            { name: 'Heavy Shield', quantity: 3 },
            { name: 'Industrial Charger', quantity: 2 },
            { name: 'Ion Sputter', quantity: 2 },
            { name: 'Showstopper', quantity: 1 },
            { name: 'Signal Amplifier', quantity: 1 },
            {
                name: 'Wires',
                quantity: 1
            },
            {
                name: 'Rubber Parts',
                quantity: 1
            }
        ]
    },
    // --- NEWLY ADDED MATERIALS ---
    {
        id: 'loot-advanced-arc-powercell',
        material: 'Adv ARC Powercell',
        wikiUrl: 'https://arcraiders.wiki/wiki/Advanced_ARC_Powercell',
        sources: [
            { name: 'Sentinel Weaponry Core', quantity: 3 },
            { name: 'Surge Shield Recharger', quantity: 2 },
            { name: 'Tactical Mk. 3 (Healing)', quantity: 2 },
            { name: 'Tactical Mk. 3 (Defensive)', quantity: 2 }
        ]
    },
    {
        id: 'loot-antiseptic',
        material: 'Antiseptic',
        wikiUrl: 'https://arcraiders.wiki/wiki/Antiseptic',
        sources: [
            { name: 'Vita Spray', quantity: 4 },
            { name: 'Vita Shot', quantity: 3 },
            { name: 'Sterilized Bandage', quantity: 1 },
            { name: 'Soap', quantity: 1 },
            { name: 'Bleach', quantity: 1 }
        ]
    },
    {
        id: 'loot-canister',
        material: 'Canister',
        wikiUrl: 'https://arcraiders.wiki/wiki/Canister',
        sources: [
            { name: 'Fire Extinguisher', quantity: 3 },
            { name: 'Compressed Air Can', quantity: 2 },
            { name: 'Vita Spray', quantity: 1 },
            { name: 'Smoke Grenade', quantity: 1 },
            { name: 'Heavy Fuze Grenade', quantity: 1 }
        ]
    },
    {
        id: 'loot-tick-pod',
        material: 'Tick Pod',
        wikiUrl: 'https://arcraiders.wiki/wiki/Tick_Pod',
        sources: [
            { name: 'ARC Tick', quantity: 2 },
            { name: 'ARC Tick Nymph', quantity: 1 }
        ]
    },
    {
        id: 'loot-fabric',
        material: 'Fabric',
        wikiUrl: 'https://arcraiders.wiki/wiki/Fabric',
        sources: [
            { name: 'Herbal Bandage', quantity: 5 },
            { name: 'Ripped Safety Vest', quantity: 2 },
            { name: 'Ruined Tactical Vest', quantity: 4 },
            {
                name: 'Rope',
                quantity: 2
            },
            { name: 'Sterilized Bandage', quantity: 1 }
        ]
    },
    {
        id: 'loot-durable-cloth',
        material: 'Durable Cloth',
        wikiUrl: 'https://arcraiders.wiki/wiki/Durable_Cloth',
        craftingStation: 'Refiner 1',
        sources: [
            { name: 'Sterilized Bandage', quantity: 2 },
            { name: 'Ruined Riot Shield', quantity: 2 },
            { name: 'Ruined Tactical Vest', quantity: 2 }
        ]
    },
    {
        id: 'loot-great-mullein',
        material: 'Great Mullein',
        wikiUrl: 'https://arcraiders.wiki/wiki/Great_Mullein',
        sources: [
            { name: 'Herbal Bandage', quantity: 2 },
            { name: 'Scavenging (Outdoors / Nature zones)', quantity: 1 }
        ]
    },
    {
        id: 'loot-moss',
        material: 'Moss',
        wikiUrl: 'https://arcraiders.wiki/wiki/Moss',
        sources: [
            { name: 'Defibrillator', quantity: 1 },
            { name: 'Scavenging (Rocks / Damp surfaces)', quantity: 1 }
        ]
    },
    {
        id: 'loot-battery',
        material: 'Battery',
        wikiUrl: 'https://arcraiders.wiki/wiki/Battery',
        sources: [
            { name: 'Jolt Mine', quantity: 1 },
            { name: 'Power Bank', quantity: 2 },
            { name: 'Alarm Clock', quantity: 1 },
            { name: 'Portable TV', quantity: 2 }
        ]
    },
    {
        id: 'loot-power-rod',
        material: 'Power Rod',
        wikiUrl: 'https://arcraiders.wiki/wiki/Power_Rod',
        sources: [
            { name: 'Queen Reactor', quantity: 1 },
            { name: 'Matriarch Reactor', quantity: 1 },
            { name: 'Adv Electrical Components', quantity: 1 }
        ]
    },
    {
        id: 'loot-syringe',
        material: 'Syringe',
        wikiUrl: 'https://arcraiders.wiki/wiki/Syringe',
        sources: [
            { name: 'Vita Shot', quantity: 1 },
            { name: 'Medical Supply Box', quantity: 2 },
            { name: 'First Aid Kit', quantity: 1 },
            { name: 'Scavenging (Medical zones)', quantity: 1 }
        ]
    },
    {
        id: 'loot-exodus-modules',
        material: 'Exodus Modules',
        wikiUrl: 'https://arcraiders.wiki/wiki/Exodus_Modules',
        sources: [
            { name: 'Bombardier Cell', quantity: 2 },
            { name: 'Bastion Cell', quantity: 2 },
            { name: 'Leaper Pulse Unit', quantity: 2 },
            { name: 'Rocketeer Driver', quantity: 1 }
        ]
    },
    {
        id: 'loot-crude-explosives',
        material: 'Crude Explosives',
        wikiUrl: 'https://arcraiders.wiki/wiki/Crude_Explosives',
        sources: [
            { name: 'Trigger \'Nade', quantity: 2 },
            { name: 'Snap Blast Grenade', quantity: 1 },
            { name: 'Trailblazer', quantity: 1 },
            { name: 'Shrapnel Grenade', quantity: 1 },
            { name: 'Seeker Grenade', quantity: 1 }
        ]
    },
    {
        id: 'loot-explosive-compound',
        material: 'Explosive Compound',
        wikiUrl: 'https://arcraiders.wiki/wiki/Explosive_Compound',
        sources: [
            { name: 'Heavy Fuze Grenade', quantity: 2 },
            { name: 'Blaze Grenade', quantity: 1 },
            { name: 'Explosive Mine', quantity: 1 },
            { name: 'Deadline', quantity: 1 },
            { name: 'Wolfpack', quantity: 1 }
        ]
    },
    {
        id: 'loot-synthesized-fuel',
        material: 'Synthesized Fuel',
        wikiUrl: 'https://arcraiders.wiki/wiki/Synthesized_Fuel',
        sources: [
            { name: 'Trailblazer', quantity: 2 },
            { name: 'Launcher Ammo (Incendiary)', quantity: 1 }
        ]
    },
    {
        id: 'loot-firefly-burner',
        material: 'Firefly Burner',
        wikiUrl: 'https://arcraiders.wiki/wiki/Firefly_Burner',
        sources: [
            { name: 'Trailblazer', quantity: 1 },
            { name: 'Damaged Leaper Pulse Unit', quantity: 2 },
            { name: 'Leaper Pulse Unit', quantity: 1 }
        ]
    },
    {
        id: 'loot-rocketeer-driver',
        material: 'Rocketeer Driver',
        wikiUrl: 'https://arcraiders.wiki/wiki/Rocketeer_Driver',
        sources: [
            { name: 'Wolfpack', quantity: 1 },
            { name: 'Damaged Rocketeer Driver', quantity: 3 },
            { name: 'ARC Rocketeer', quantity: 2 }
        ]
    },
    {
        id: 'loot-comet-igniter',
        material: 'Comet Igniter',
        wikiUrl: 'https://arcraiders.wiki/wiki/Comet_Igniter',
        sources: [
            { name: 'Deadline', quantity: 1 },
            { name: 'Leaper Pulse Unit', quantity: 1 },
            { name: 'Damaged Leaper Pulse Unit', quantity: 2 }
        ]
    },
    {
        id: 'loot-light-shield',
        material: 'Light Shield',
        wikiUrl: 'https://arcraiders.wiki/wiki/Light_Shield',
        craftingStation: 'Gear Bench I',
        sources: [
            { name: 'Ruined Riot Shield', quantity: 3 },
            { name: 'Medium Shield', quantity: 1 }
        ]
    },
    {
        id: 'loot-medium-shield',
        material: 'Medium Shield',
        wikiUrl: 'https://arcraiders.wiki/wiki/Medium_Shield',
        craftingStation: 'Gear Bench II',
        sources: [
            { name: 'Light Shield', quantity: 1 },
            { name: 'Heavy Shield', quantity: 1 }
        ]
    },
    {
        id: 'loot-heavy-shield-mat',
        material: 'Heavy Shield',
        wikiUrl: 'https://arcraiders.wiki/wiki/Heavy_Shield',
        sources: [
            { name: 'ARC Bastion', quantity: 3 },
            { name: 'Bastion Cell', quantity: 3 },
            { name: 'ARC Tank', quantity: 2 }
        ]
    },
    {
        id: 'loot-oil',
        material: 'Oil',
        wikiUrl: 'https://arcraiders.wiki/wiki/Oil',
        sources: [
            { name: 'Motor', quantity: 3 },
            { name: 'Water Pump', quantity: 3 },
            { name: 'Turbo Pump', quantity: 3 },
            { name: 'Coolant', quantity: 2 },
            { name: 'Blaze Grenade', quantity: 1 },
            { name: 'Explosive Mine', quantity: 2 },
            { name: 'Polluted Air Filter', quantity: 1 }
        ]
    },
    {
        id: 'loot-rope',
        material: 'Rope',
        wikiUrl: 'https://arcraiders.wiki/wiki/Rope',
        sources: [
            { name: 'Zipline', quantity: 2 },
            { name: 'Snap Hook', quantity: 1 },
            { name: 'Scavenging (Residential / Commercial zones)', quantity: 1 }
        ]
    },
    {
        id: 'loot-sensors',
        material: 'Sensors',
        wikiUrl: 'https://arcraiders.wiki/wiki/Sensors',
        sources: [
            { name: 'ARC Snitch', quantity: 2 },
            { name: 'ARC Surveyor', quantity: 2 },
            { name: 'ARC Android', quantity: 1 },
            { name: 'Server Rack', quantity: 2 },
            { name: 'Explosive Mine', quantity: 1 }
        ]
    },
    {
        id: 'loot-speaker-component',
        material: 'Speaker Component',
        wikiUrl: 'https://arcraiders.wiki/wiki/Speaker_Component',
        sources: [
            { name: 'Headphones', quantity: 2 },
            { name: 'Frequency Modulation Box', quantity: 1 },
            { name: 'Radio', quantity: 2 },
            { name: 'Noisemaker', quantity: 1 }
        ]
    },
    {
        id: 'loot-hornet-driver',
        material: 'Hornet Driver',
        wikiUrl: 'https://arcraiders.wiki/wiki/Hornet_Driver',
        sources: [
            { name: 'ARC Hornet', quantity: 2 },
            { name: 'ARC Courier', quantity: 1 }
        ]
    },
    {
        id: 'loot-matriarch-reactor',
        material: 'Matriarch Reactor',
        wikiUrl: 'https://arcraiders.wiki/wiki/Matriarch_Reactor',
        sources: [
            { name: 'ARC Matriarch (Boss drop)', quantity: 1 }
        ]
    },
    {
        id: 'loot-queen-reactor',
        material: 'Queen Reactor',
        wikiUrl: 'https://arcraiders.wiki/wiki/Queen_Reactor',
        sources: [
            { name: 'ARC Queen (Boss drop)', quantity: 1 },
            { name: 'ARC Queen Leg Armor', quantity: 1 }
        ]
    }
];
exports.WEAPON_SETUPS_DATA = [
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
var RARITY_ORDER = { 'LEGENDARY': 0, 'EPIC': 1, 'RARE': 2, 'UNCOMMON': 3, 'COMMON': 4 };
exports.MATERIALS_DATA.sort(function (a, b) { return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]; });
exports.MODS_DATA.sort(function (a, b) { return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]; });
exports.WEAPONS_DATA.sort(function (a, b) { return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]; });
exports.THROWABLES_DATA.sort(function (a, b) { return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]; });
exports.AUGMENTS_DATA.sort(function (a, b) { return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]; });
exports.LOOT_DATA.sort(function (a, b) {
    var matA = exports.MATERIALS_DATA.find(function (m) { return m.name === a.material; });
    var matB = exports.MATERIALS_DATA.find(function (m) { return m.name === b.material; });
    var rarityA = (matA === null || matA === void 0 ? void 0 : matA.rarity) || 'COMMON';
    var rarityB = (matB === null || matB === void 0 ? void 0 : matB.rarity) || 'COMMON';
    return RARITY_ORDER[rarityA] - RARITY_ORDER[rarityB];
});
