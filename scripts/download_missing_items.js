import fs from 'fs';
import path from 'path';

// Load items database
const itemsDbPath = path.join('public', 'db', 'items.json');
const itemsDb = JSON.parse(fs.readFileSync(itemsDbPath, 'utf-8'));

// Asset aliases matching utils.ts
const ASSET_ALIASES = {
    "Adv Electrical Components": "Advanced Electrical Components",
    "Adv Mechanical Components": "Advanced Mechanical Components",
    "Adv ARC Powercell": "Advanced ARC Powercell",
    "Trigger'nade": "Trigger_'Nade",
    "Trigger 'Nade": "Trigger_'Nade",
    "Tactical Mk. 3 (Healing)": "Tactical Mk. 3 Healing",
    "Tactical Mk. 3 (Revival)": "Tactical Mk. 3 Revival",
    "Li'l Smoke Grenade": "Lil_Smoke_Grenade",
    "\"Leviathan's Crown\" Ship Model": "Leviathans_Crown_Ship_Model",
    "\"Sirena Dorata\" Ship Model": "Sirena_Dorata_Ship_Model",
    "\"Twilight Compass\" Ship Model": "Twilight_Compass_Ship_Model",
    "\"Velocity\" Ship Model": "Velocity_Ship_Model",
    "\"Wind Sprite\" Ship Model": "Wind_Sprite_Ship_Model"
};

// Target directory
const itemsDir = path.join('public', 'images', 'items');
if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true });
}

// Get all existing files in the directory (lowercase for easy matching)
const existingFiles = fs.readdirSync(itemsDir);
const existingFilesLower = new Set(existingFiles.map(f => f.toLowerCase()));

// Identify missing items
const missingItems = [];
for (const item of itemsDb.items) {
    if (!item.image) continue;

    // Resolve name/alias
    const resolvedName = ASSET_ALIASES[item.name] || item.name;
    const exactFormatted = resolvedName.replace(/ /g, '_');
    
    // Check if there is any local file with exactFormatted or resolvedName, with various extensions
    const extensions = ['.png', '.webp', '.jpg', '.jpeg'];
    let foundLocal = false;
    
    for (const ext of extensions) {
        if (existingFilesLower.has(`${exactFormatted.toLowerCase()}${ext}`) || 
            existingFilesLower.has(`${resolvedName.toLowerCase()}${ext}`)) {
            foundLocal = true;
            break;
        }
    }

    if (!foundLocal) {
        missingItems.push({
            id: item.id,
            name: item.name,
            cdnUrl: item.image,
            localPath: path.join(itemsDir, `${exactFormatted}.png`)
        });
    }
}

console.log(`Found ${itemsDb.items.length} items in DB.`);
console.log(`Found ${existingFiles.length} files in public/images/items/.`);
console.log(`Found ${missingItems.length} missing items.`);

// Download missing files in batches
async function downloadFile(url, dest) {
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        return true;
    } catch (err) {
        console.error(`Failed to download ${url}: ${err.message}`);
        return false;
    }
}

async function run() {
    if (missingItems.length === 0) {
        console.log('No missing images to download!');
        return;
    }

    const batchSize = 10;
    let successCount = 0;
    
    for (let i = 0; i < missingItems.length; i += batchSize) {
        const batch = missingItems.slice(i, i + batchSize);
        console.log(`Downloading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(missingItems.length / batchSize)}...`);
        
        await Promise.all(batch.map(async (item) => {
            const success = await downloadFile(item.cdnUrl, item.localPath);
            if (success) {
                successCount++;
            }
        }));
        
        // Brief delay between batches
        await new Promise(r => setTimeout(r, 200));
    }
    
    console.log(`Download finished. Successfully downloaded ${successCount}/${missingItems.length} missing images.`);
}

run();
