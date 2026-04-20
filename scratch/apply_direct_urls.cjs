const fs = require('fs');

const mappings = {
  "Kinetic Converter": "https://arcraiders.wiki/wiki/Special:FilePath/Kinetic_Converter.png",
  "Anvil Splitter": "https://arcraiders.wiki/wiki/Special:FilePath/Anvil_Splitter.png",
  "Extended Barrel": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Barrel.png",
  "Horizontal Grip": "https://arcraiders.wiki/wiki/Special:FilePath/Horizontal_Grip.png",
  "Lightweight Stock": "https://arcraiders.wiki/wiki/Special:FilePath/Lightweight_Stock.png",
  "Shotgun Silencer": "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Silencer.png",
  "Compensator III": "https://arcraiders.wiki/wiki/Special:FilePath/Compensator_III.png",
  "Muzzle Brake III": "https://arcraiders.wiki/wiki/Special:FilePath/Muzzle_Brake_III.png",
  "Shotgun Choke III": "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Choke_III.png",
  "Silencer III": "https://arcraiders.wiki/wiki/Special:FilePath/Silencer_III.png",
  "Extended Light Mag III": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Light_Mag_III.png",
  "Extended Medium Mag III": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Medium_Mag_III.png",
  "Extended Shotgun Mag III": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Shotgun_Mag_III.png",
  "Angled Grip III": "https://arcraiders.wiki/wiki/Special:FilePath/Angled_Grip_III.png",
  "Vertical Grip III": "https://arcraiders.wiki/wiki/Special:FilePath/Vertical_Grip_III.png",
  "Stable Stock III": "https://arcraiders.wiki/wiki/Special:FilePath/Stable_Stock_III.png",
  "Padded Stock III": "https://arcraiders.wiki/wiki/Special:FilePath/Padded_Stock.png",
  "Padded Stock": "https://arcraiders.wiki/wiki/Special:FilePath/Padded_Stock.png",

  "Compensator II": "https://arcraiders.wiki/wiki/Special:FilePath/Compensator_II.png",
  "Muzzle Brake II": "https://arcraiders.wiki/wiki/Special:FilePath/Muzzle_Brake_II.png",
  "Shotgun Choke II": "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Choke_II.png",
  "Silencer II": "https://arcraiders.wiki/wiki/Special:FilePath/Silencer_II.png",
  "Extended Light Mag II": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Light_Mag_II.png",
  "Extended Medium Mag II": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Medium_Mag_II.png",
  "Extended Shotgun Mag II": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Shotgun_Mag_II.png",
  "Angled Grip II": "https://arcraiders.wiki/wiki/Special:FilePath/Angled_Grip_II.png",
  "Vertical Grip II": "https://arcraiders.wiki/wiki/Special:FilePath/Vertical_Grip_II.png",
  "Stable Stock II": "https://arcraiders.wiki/wiki/Special:FilePath/Stable_Stock_II.png",

  "Compensator I": "https://arcraiders.wiki/wiki/Special:FilePath/Compensator_I.png",
  "Muzzle Brake I": "https://arcraiders.wiki/wiki/Special:FilePath/Muzzle_Brake_I.png",
  "Shotgun Choke I": "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Choke_I.png",
  "Silencer I": "https://arcraiders.wiki/wiki/Special:FilePath/Silencer_I.png",
  "Extended Light Mag I": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Light_Mag_I.png",
  "Extended Medium Mag I": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Medium_Mag_I.png",
  "Extended Shotgun Mag I": "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Shotgun_Mag_I.png",
  "Angled Grip I": "https://arcraiders.wiki/wiki/Special:FilePath/Angled_Grip_I.png",
  "Vertical Grip I": "https://arcraiders.wiki/wiki/Special:FilePath/Vertical_Grip_I.png",
  "Stable Stock I": "https://arcraiders.wiki/wiki/Special:FilePath/Stable_Stock_I.png",

  "Matriarch Reactor": "https://arcraiders.wiki/wiki/Special:FilePath/Matriarch_Reactor.png",
  "Queen Reactor": "https://arcraiders.wiki/wiki/Special:FilePath/Queen_Reactor.png",
  "Magnetic Accelerator": "https://arcraiders.wiki/wiki/Special:FilePath/Magnetic_Accelerator.png",
  "Exodus Modules": "https://arcraiders.wiki/wiki/Special:FilePath/Exodus_Modules.png",
  "Rocketeer Driver": "https://arcraiders.wiki/wiki/Special:FilePath/Rocketeer_Driver.png",
  "Shredder Gyro": "https://arcraiders.wiki/wiki/Special:FilePath/Shredder_Gyro.png",
  "Vaporizer Regulator": "https://arcraiders.wiki/wiki/Special:FilePath/Vaporizer_Regulator.png",

  "Mod Components": "https://arcraiders.wiki/wiki/Special:FilePath/Mod_Components.png",
  "Light Gun Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Light_Gun_Parts.png",
  "Medium Gun Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Medium_Gun_Parts.png",
  "Heavy Gun Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Heavy_Gun_Parts.png",
  "Adv Mechanical Components": "https://arcraiders.wiki/wiki/Special:FilePath/Advanced_Mechanical_Components.png",
  "Adv ARC Powercell": "https://arcraiders.wiki/wiki/Special:FilePath/Advanced_ARC_Powercell.png",
  "Adv Electrical Components": "https://arcraiders.wiki/wiki/Special:FilePath/Advanced_Electrical_Components.png",
  "ARC Circuitry": "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Circuitry.png",
  "ARC Motion Core": "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Motion_Core.png",
  "Tick Pod": "https://arcraiders.wiki/wiki/Special:FilePath/Tick_Pod.png",
  "Moss": "https://arcraiders.wiki/wiki/Special:FilePath/Moss.png",
  "Power Rod": "https://arcraiders.wiki/wiki/Special:FilePath/Power_Rod.png",
  "Syringe": "https://arcraiders.wiki/wiki/Special:FilePath/Syringe.png",
  "Voltage Converter": "https://arcraiders.wiki/wiki/Special:FilePath/Voltage_Converter.png",
  "Complex Gun Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Complex_Gun_Parts.png",
  "Processor": "https://arcraiders.wiki/wiki/Special:FilePath/Processor.png",
  "Explosive Compound": "https://arcraiders.wiki/wiki/Special:FilePath/Explosive_Compound.png",
  "Synthesized Fuel": "https://arcraiders.wiki/wiki/Special:FilePath/Synthesized_Fuel.png",
  "Firefly Burner": "https://arcraiders.wiki/wiki/Special:FilePath/Firefly_Burner.png",
  "Comet Igniter": "https://arcraiders.wiki/wiki/Special:FilePath/Comet_Igniter.png",
  "Rope": "https://arcraiders.wiki/wiki/Special:FilePath/Rope.png",
  "Sensors": "https://arcraiders.wiki/wiki/Special:FilePath/Sensors.png",
  "Speaker Component": "https://arcraiders.wiki/wiki/Special:FilePath/Speaker_Component.png",
  "Hornet Driver": "https://arcraiders.wiki/wiki/Special:FilePath/Hornet_Driver.png",

  "Mechanical Components": "https://arcraiders.wiki/wiki/Special:FilePath/Mechanical_Components.png",
  "Wires": "https://arcraiders.wiki/wiki/Special:FilePath/Wires.png",
  "Duct Tape": "https://arcraiders.wiki/wiki/Special:FilePath/Duct_Tape.png",
  "Simple Gun Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Simple_Gun_Parts.png",
  "Magnet": "https://arcraiders.wiki/wiki/Special:FilePath/Magnet.png",
  "ARC Alloy": "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Alloy.png",
  "Electrical Components": "https://arcraiders.wiki/wiki/Special:FilePath/Electrical_Components.png",
  "Antiseptic": "https://arcraiders.wiki/wiki/Special:FilePath/Antiseptic.png",
  "Durable Cloth": "https://arcraiders.wiki/wiki/Special:FilePath/Durable_Cloth.png",
  "Great Mullein": "https://arcraiders.wiki/wiki/Special:FilePath/Great_Mullein.png",
  "Battery": "https://arcraiders.wiki/wiki/Special:FilePath/Battery.png",
  "Crude Explosives": "https://arcraiders.wiki/wiki/Special:FilePath/Crude_Explosives.png",
  "Oil": "https://arcraiders.wiki/wiki/Special:FilePath/Oil.png",
  "Metal Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Metal_Parts.png",
  "Rubber Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Rubber_Parts.png",
  "Plastic Parts": "https://arcraiders.wiki/wiki/Special:FilePath/Plastic_Parts.png",
  "Steel Spring": "https://arcraiders.wiki/wiki/Special:FilePath/Steel_Spring.png",
  "ARC Powercell": "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Powercell.png",
  "Chemicals": "https://arcraiders.wiki/wiki/Special:FilePath/Chemicals.png",
  "Canister": "https://arcraiders.wiki/wiki/Special:FilePath/Canister.png",
  "Fabric": "https://arcraiders.wiki/wiki/Special:FilePath/Fabric.png",

  "Heavy Shield": "https://arcraiders.wiki/wiki/Special:FilePath/Heavy_Shield.png",
  "Medium Shield": "https://arcraiders.wiki/wiki/Special:FilePath/Medium_Shield.png",
  "Light Shield": "https://arcraiders.wiki/wiki/Special:FilePath/Light_Shield.png",

  "Photoelectric Cloak": "https://arcraiders.wiki/wiki/Special:FilePath/Photoelectric_Cloak.png",
  "Zipline": "https://arcraiders.wiki/wiki/Special:FilePath/Zipline.png",
  "Snap Hook": "https://arcraiders.wiki/wiki/Special:FilePath/Snap_Hook.png",
  "Raider Hatch Key": "https://arcraiders.wiki/wiki/Special:FilePath/Raider_Hatch_Key.png",
  "Surge Coil": "https://arcraiders.wiki/wiki/Special:FilePath/Surge_Coil.png",
  "Barricade Kit": "https://arcraiders.wiki/wiki/Special:FilePath/Barricade_Kit.png",

  "Trailblazer": "https://arcraiders.wiki/wiki/Special:FilePath/Trailblazer.png",
  "Wolfpack": "https://arcraiders.wiki/wiki/Special:FilePath/Wolfpack.png",
  "Deadline": "https://arcraiders.wiki/wiki/Special:FilePath/Deadline.png",
  "Tagging Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Tagging_Grenade.png",
  "Smoke Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Smoke_Grenade.png",
  "Showstopper": "https://arcraiders.wiki/wiki/Special:FilePath/Showstopper.png",
  "Jolt Mine": "https://arcraiders.wiki/wiki/Special:FilePath/Jolt_Mine.png",
  "Explosive Mine": "https://arcraiders.wiki/wiki/Special:FilePath/Explosive_Mine.png",
  "Trigger'nade": "https://arcraiders.wiki/wiki/Special:FilePath/Trigger_%27Nade.png",
  "Heavy Fuze Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Heavy_Fuze_Grenade.png",
  "Blaze Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Blaze_Grenade.png",
  "Seeker Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Seeker_Grenade.png",
  "Shrapnel Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Shrapnel_Grenade.png",
  "Light Impact Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Light_Impact_Grenade.png",
  "Snap Blast Grenade": "https://arcraiders.wiki/wiki/Special:FilePath/Snap_Blast_Grenade.png"
};

let dataTs = fs.readFileSync('data.ts', 'utf8');
let itemsFixed = 0;

for (const [item, newUrl] of Object.entries(mappings)) {
  const itemRegex = new RegExp(`(name:\\s*['"]${item.replace(/'/g, "\\\\'")}(?:.*?)['"][\\s\\S]*?imageUrl:\\s*['"])(.*?)(['"])`, 'g');
  let matched = false;
  dataTs = dataTs.replace(itemRegex, (match, prefix, oldUrl, suffix) => {
    matched = true;
    return `${prefix}${newUrl}${suffix}`;
  });
  if (matched) {
    console.log(`[OK] Updated image for: ${item}`);
    itemsFixed++;
  } else {
    // try searching globally if the structure doesn't perfectly match (e.g. without trailing info)
    const backupRegex = new RegExp(`(name:\\s*['"]${item.replace(/'/g, "\\\\'")}(?:.*?)['"].*?imageUrl:\\s*['"])(.*?)(['"])`, 'gs');
    let backupMatched = false;
    dataTs = dataTs.replace(backupRegex, (match, prefix, oldUrl, suffix) => {
      backupMatched = true;
      return `${prefix}${newUrl}${suffix}`;
    });
    if (backupMatched) {
        console.log(`[OK] Updated image for (backup regex): ${item}`);
        itemsFixed++;
    } else {
        console.log(`[MISSING] Could not find/update: ${item}`);
    }
  }
}

fs.writeFileSync('data.ts', dataTs);
console.log(`\\nCompleted. Updated ${itemsFixed} out of ${Object.keys(mappings).length} items.`);
