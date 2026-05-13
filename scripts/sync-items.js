/**
 * sync-items.js
 * 
 * Script de sincronização de itens do ARC Raiders.
 * Fonte: https://arctracker.io/api/items
 * 
 * Uso: node scripts/sync-items.js
 * Saída: /public/db/items.json
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'db', 'items.json');
const API_URL = 'https://arctracker.io/api/items';

// Mapeamento de raridade do ARCTracker -> nosso sistema
const RARITY_MAP = {
  'Common':    'COMMON',
  'Uncommon':  'UNCOMMON',
  'Rare':      'RARE',
  'Epic':      'EPIC',
  'Legendary': 'LEGENDARY',
};

// Mapeamento de tipo do ARCTracker -> nossa categoria
const CATEGORY_MAP = {
  // Armas
  'Assault Rifle': 'Weapon',
  'Shotgun':       'Weapon',
  'SMG':           'Weapon',
  'LMG':           'Weapon',
  'Sniper Rifle':  'Weapon',
  'Hand Cannon':   'Weapon',
  'Special':       'Weapon',
  // Modificações
  'Modification':  'Mod',
  // Materiais
  'Raw Material':       'Material',
  'Refined Material':   'Material',
  'Topside Material':   'Material',
  // Granadas / Consumíveis
  'Quick Use':  'Throwable',
  'Equipment':  'Throwable',
  // Blueprints
  'Blueprint':  'Blueprint',
  // Augments
  'Augment':    'Augment',
  // Outros (genérico)
  'Recyclable': 'Material',
  'Trinket':    'Material',
  'Key':        'Material',
  'Nature':     'Material',
  'Ammo':       'Material',
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'StashPlanner/1.0 (sync-items-script)' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(fetchJSON(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse failed: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Request timeout')); });
  });
}

async function main() {
  console.log('🔄 Fetching items from ARCTracker API...');
  
  let apiData;
  try {
    apiData = await fetchJSON(API_URL);
  } catch (e) {
    console.error('❌ Failed to fetch API:', e.message);
    process.exit(1);
  }

  const rawItems = apiData.items || [];
  console.log(`✅ Fetched ${rawItems.length} items from API.`);

  const tradeItems = [];
  const skipped = [];

  for (const item of rawItems) {
    const nameEn = item.name?.en;
    if (!nameEn) { skipped.push(item.id); continue; }

    const rawRarity = item.rarity || 'Common';
    const rarity = RARITY_MAP[rawRarity] || 'COMMON';

    const rawType = item.type || '';
    const category = CATEGORY_MAP[rawType] || 'Material';

    tradeItems.push({
      id:       item.id,
      name:     nameEn,
      rarity,
      category,
      image:    item.imageFilename || null,
      type:     rawType,
    });
  }

  // Garante que a pasta de destino existe
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const output = {
    version:     apiData.version || Date.now().toString(),
    generatedAt: new Date().toISOString(),
    totalItems:  tradeItems.length,
    items:       tradeItems,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');

  console.log(`\n📦 Done! Summary:`);
  console.log(`   ✅ Saved:   ${tradeItems.length} items`);
  console.log(`   ⚠️  Skipped: ${skipped.length} items (missing name)`);
  console.log(`   📁 Output:  ${OUTPUT_PATH}`);
  
  // Report por categoria
  const byCat = {};
  for (const i of tradeItems) byCat[i.category] = (byCat[i.category] || 0) + 1;
  console.log('\n📊 Items by category:');
  for (const [cat, count] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat.padEnd(15)} ${count}`);
  }
}

main();
