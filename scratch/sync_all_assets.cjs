const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { pipeline } = require('stream/promises');

const mappings = [
  { name: "Kinetic Converter", url: "https://arcraiders.wiki/wiki/Special:FilePath/Kinetic_Converter.png" },
  { name: "Anvil Splitter", url: "https://arcraiders.wiki/wiki/Special:FilePath/Anvil_Splitter.png" },
  { name: "Extended Barrel", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Barrel.png" },
  { name: "Horizontal Grip", url: "https://arcraiders.wiki/wiki/Special:FilePath/Horizontal_Grip.png" },
  { name: "Lightweight Stock", url: "https://arcraiders.wiki/wiki/Special:FilePath/Lightweight_Stock.png" },
  { name: "Shotgun Silencer", url: "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Silencer.png" },
  { name: "Compensator III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Compensator_III.png" },
  { name: "Muzzle Brake III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Muzzle_Brake_III.png" },
  { name: "Shotgun Choke III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Choke_III.png" },
  { name: "Silencer III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Silencer_III.png" },
  { name: "Extended Light Mag III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Light_Mag_III.png" },
  { name: "Extended Medium Mag III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Medium_Mag_III.png" },
  { name: "Extended Shotgun Mag III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Shotgun_Mag_III.png" },
  { name: "Angled Grip III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Angled_Grip_III.png" },
  { name: "Vertical Grip III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Vertical_Grip_III.png" },
  { name: "Stable Stock III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Stable_Stock_III.png" },
  { name: "Padded Stock III", url: "https://arcraiders.wiki/wiki/Special:FilePath/Padded_Stock.png" },
  { name: "Padded Stock", url: "https://arcraiders.wiki/wiki/Special:FilePath/Padded_Stock.png" },

  { name: "Compensator II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Compensator_II.png" },
  { name: "Muzzle Brake II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Muzzle_Brake_II.png" },
  { name: "Shotgun Choke II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Choke_II.png" },
  { name: "Silencer II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Silencer_II.png" },
  { name: "Extended Light Mag II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Light_Mag_II.png" },
  { name: "Extended Medium Mag II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Medium_Mag_II.png" },
  { name: "Extended Shotgun Mag II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Shotgun_Mag_II.png" },
  { name: "Angled Grip II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Angled_Grip_II.png" },
  { name: "Vertical Grip II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Vertical_Grip_II.png" },
  { name: "Stable Stock II", url: "https://arcraiders.wiki/wiki/Special:FilePath/Stable_Stock_II.png" },

  { name: "Compensator I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Compensator_I.png" },
  { name: "Muzzle Brake I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Muzzle_Brake_I.png" },
  { name: "Shotgun Choke I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Shotgun_Choke_I.png" },
  { name: "Silencer I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Silencer_I.png" },
  { name: "Extended Light Mag I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Light_Mag_I.png" },
  { name: "Extended Medium Mag I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Medium_Mag_I.png" },
  { name: "Extended Shotgun Mag I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Extended_Shotgun_Mag_I.png" },
  { name: "Angled Grip I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Angled_Grip_I.png" },
  { name: "Vertical Grip I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Vertical_Grip_I.png" },
  { name: "Stable Stock I", url: "https://arcraiders.wiki/wiki/Special:FilePath/Stable_Stock_I.png" },

  { name: "Matriarch Reactor", url: "https://arcraiders.wiki/wiki/Special:FilePath/Matriarch_Reactor.png" },
  { name: "Queen Reactor", url: "https://arcraiders.wiki/wiki/Special:FilePath/Queen_Reactor.png" },
  { name: "Magnetic Accelerator", url: "https://arcraiders.wiki/wiki/Special:FilePath/Magnetic_Accelerator.png" },
  { name: "Exodus Modules", url: "https://arcraiders.wiki/wiki/Special:FilePath/Exodus_Modules.png" },
  { name: "Rocketeer Driver", url: "https://arcraiders.wiki/wiki/Special:FilePath/Rocketeer_Driver.png" },
  { name: "Shredder Gyro", url: "https://arcraiders.wiki/wiki/Special:FilePath/Shredder_Gyro.png" },
  { name: "Vaporizer Regulator", url: "https://arcraiders.wiki/wiki/Special:FilePath/Vaporizer_Regulator.png" },

  { name: "Mod Components", url: "https://arcraiders.wiki/wiki/Special:FilePath/Mod_Components.png" },
  { name: "Light Gun Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Light_Gun_Parts.png" },
  { name: "Medium Gun Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Medium_Gun_Parts.png" },
  { name: "Heavy Gun Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Heavy_Gun_Parts.png" },
  { name: "Adv Mechanical Components", url: "https://arcraiders.wiki/wiki/Special:FilePath/Advanced_Mechanical_Components.png" },
  { name: "Adv ARC Powercell", url: "https://arcraiders.wiki/wiki/Special:FilePath/Advanced_ARC_Powercell.png" },
  { name: "Adv Electrical Components", url: "https://arcraiders.wiki/wiki/Special:FilePath/Advanced_Electrical_Components.png" },
  { name: "ARC Circuitry", url: "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Circuitry.png" },
  { name: "ARC Motion Core", url: "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Motion_Core.png" },
  { name: "Tick Pod", url: "https://arcraiders.wiki/wiki/Special:FilePath/Tick_Pod.png" },
  { name: "Moss", url: "https://arcraiders.wiki/wiki/Special:FilePath/Moss.png" },
  { name: "Power Rod", url: "https://arcraiders.wiki/wiki/Special:FilePath/Power_Rod.png" },
  { name: "Syringe", url: "https://arcraiders.wiki/wiki/Special:FilePath/Syringe.png" },
  { name: "Voltage Converter", url: "https://arcraiders.wiki/wiki/Special:FilePath/Voltage_Converter.png" },
  { name: "Complex Gun Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Complex_Gun_Parts.png" },
  { name: "Processor", url: "https://arcraiders.wiki/wiki/Special:FilePath/Processor.png" },
  { name: "Explosive Compound", url: "https://arcraiders.wiki/wiki/Special:FilePath/Explosive_Compound.png" },
  { name: "Synthesized Fuel", url: "https://arcraiders.wiki/wiki/Special:FilePath/Synthesized_Fuel.png" },
  { name: "Firefly Burner", url: "https://arcraiders.wiki/wiki/Special:FilePath/Firefly_Burner.png" },
  { name: "Comet Igniter", url: "https://arcraiders.wiki/wiki/Special:FilePath/Comet_Igniter.png" },
  { name: "Rope", url: "https://arcraiders.wiki/wiki/Special:FilePath/Rope.png" },
  { name: "Sensors", url: "https://arcraiders.wiki/wiki/Special:FilePath/Sensors.png" },
  { name: "Speaker Component", url: "https://arcraiders.wiki/wiki/Special:FilePath/Speaker_Component.png" },
  { name: "Hornet Driver", url: "https://arcraiders.wiki/wiki/Special:FilePath/Hornet_Driver.png" },

  { name: "Mechanical Components", url: "https://arcraiders.wiki/wiki/Special:FilePath/Mechanical_Components.png" },
  { name: "Wires", url: "https://arcraiders.wiki/wiki/Special:FilePath/Wires.png" },
  { name: "Duct Tape", url: "https://arcraiders.wiki/wiki/Special:FilePath/Duct_Tape.png" },
  { name: "Simple Gun Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Simple_Gun_Parts.png" },
  { name: "Magnet", url: "https://arcraiders.wiki/wiki/Special:FilePath/Magnet.png" },
  { name: "ARC Alloy", url: "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Alloy.png" },
  { name: "Electrical Components", url: "https://arcraiders.wiki/wiki/Special:FilePath/Electrical_Components.png" },
  { name: "Antiseptic", url: "https://arcraiders.wiki/wiki/Special:FilePath/Antiseptic.png" },
  { name: "Durable Cloth", url: "https://arcraiders.wiki/wiki/Special:FilePath/Durable_Cloth.png" },
  { name: "Great Mullein", url: "https://arcraiders.wiki/wiki/Special:FilePath/Great_Mullein.png" },
  { name: "Battery", url: "https://arcraiders.wiki/wiki/Special:FilePath/Battery.png" },
  { name: "Crude Explosives", url: "https://arcraiders.wiki/wiki/Special:FilePath/Crude_Explosives.png" },
  { name: "Oil", url: "https://arcraiders.wiki/wiki/Special:FilePath/Oil.png" },
  { name: "Metal Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Metal_Parts.png" },
  { name: "Rubber Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Rubber_Parts.png" },
  { name: "Plastic Parts", url: "https://arcraiders.wiki/wiki/Special:FilePath/Plastic_Parts.png" },
  { name: "Steel Spring", url: "https://arcraiders.wiki/wiki/Special:FilePath/Steel_Spring.png" },
  { name: "ARC Powercell", url: "https://arcraiders.wiki/wiki/Special:FilePath/ARC_Powercell.png" },
  { name: "Chemicals", url: "https://arcraiders.wiki/wiki/Special:FilePath/Chemicals.png" },
  { name: "Canister", url: "https://arcraiders.wiki/wiki/Special:FilePath/Canister.png" },
  { name: "Fabric", url: "https://arcraiders.wiki/wiki/Special:FilePath/Fabric.png" },

  { name: "Heavy Shield", url: "https://arcraiders.wiki/wiki/Special:FilePath/Heavy_Shield.png" },
  { name: "Medium Shield", url: "https://arcraiders.wiki/wiki/Special:FilePath/Medium_Shield.png" },
  { name: "Light Shield", url: "https://arcraiders.wiki/wiki/Special:FilePath/Light_Shield.png" },

  { name: "Photoelectric Cloak", url: "https://arcraiders.wiki/wiki/Special:FilePath/Photoelectric_Cloak.png" },
  { name: "Zipline", url: "https://arcraiders.wiki/wiki/Special:FilePath/Zipline.png" },
  { name: "Snap Hook", url: "https://arcraiders.wiki/wiki/Special:FilePath/Snap_Hook.png" },
  { name: "Raider Hatch Key", url: "https://arcraiders.wiki/wiki/Special:FilePath/Raider_Hatch_Key.png" },
  { name: "Surge Coil", url: "https://arcraiders.wiki/wiki/Special:FilePath/Surge_Coil.png" },
  { name: "Barricade Kit", url: "https://arcraiders.wiki/wiki/Special:FilePath/Barricade_Kit.png" },

  { name: "Trailblazer", url: "https://arcraiders.wiki/wiki/Special:FilePath/Trailblazer.png" },
  { name: "Wolfpack", url: "https://arcraiders.wiki/wiki/Special:FilePath/Wolfpack.png" },
  { name: "Deadline", url: "https://arcraiders.wiki/wiki/Special:FilePath/Deadline.png" },
  { name: "Tagging Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Tagging_Grenade.png" },
  { name: "Smoke Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Smoke_Grenade.png" },
  { name: "Showstopper", url: "https://arcraiders.wiki/wiki/Special:FilePath/Showstopper.png" },
  { name: "Jolt Mine", url: "https://arcraiders.wiki/wiki/Special:FilePath/Jolt_Mine.png" },
  { name: "Explosive Mine", url: "https://arcraiders.wiki/wiki/Special:FilePath/Explosive_Mine.png" },
  { name: "Trigger'nade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Trigger_%27Nade.png" },
  { name: "Heavy Fuze Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Heavy_Fuze_Grenade.png" },
  { name: "Blaze Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Blaze_Grenade.png" },
  { name: "Seeker Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Seeker_Grenade.png" },
  { name: "Shrapnel Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Shrapnel_Grenade.png" },
  { name: "Light Impact Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Light_Impact_Grenade.png" },
  { name: "Snap Blast Grenade", url: "https://arcraiders.wiki/wiki/Special:FilePath/Snap_Blast_Grenade.png" }
];

const imagesDir = path.join(__dirname, '../public/images/items');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

async function downloadImage(url, filename) {
  const filePath = path.join(imagesDir, filename);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const dest = fs.createWriteStream(filePath);
    await pipeline(response.body, dest);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function run() {
  const nameToLocal = {};
  for (const m of mappings) {
    let filename = m.url.split('/').pop();
    if (filename.includes('%27')) filename = filename.replace('%27', "'");
    if (filename.includes('%20')) filename = filename.replace('%20', "_");
    
    // Special case for padded stock
    if (m.name === "Padded Stock III" || m.name === "Padded Stock") filename = "Padded_Stock.png";

    console.log(`Downloading ${m.name}...`);
    const success = await downloadImage(m.url, filename);
    if (success) {
      nameToLocal[m.name] = `/images/items/${filename}`;
    }
  }

  // Now update data.ts using AST
  const code = fs.readFileSync('data.ts', 'utf8');
  const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);
  const replacements = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      let nameProp = null;
      let imageUrlProp = null;
      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          if (prop.name.text === 'name') nameProp = prop;
          else if (prop.name.text === 'imageUrl') imageUrlProp = prop;
        }
      }
      if (nameProp && imageUrlProp && ts.isStringLiteral(nameProp.initializer)) {
        const itemName = nameProp.initializer.text;
        if (nameToLocal[itemName]) {
          replacements.push({
            start: imageUrlProp.initializer.getStart(),
            end: imageUrlProp.initializer.getEnd(),
            newText: `"${nameToLocal[itemName]}"`
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);

  replacements.sort((a, b) => b.start - a.start);
  let newCode = code;
  for (const rep of replacements) {
    newCode = newCode.slice(0, rep.start) + rep.newText + newCode.slice(rep.end);
  }

  fs.writeFileSync('data.ts', newCode);
  console.log("Done!");
}

run();
