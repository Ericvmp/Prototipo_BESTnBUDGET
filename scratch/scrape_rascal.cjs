const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const urls = {
  'rascal': 'https://metaforge.app/arc-raiders/database/item/rascal',
  'rascal-ii': 'https://metaforge.app/arc-raiders/database/item/rascal-ii',
  'rascal-iii': 'https://metaforge.app/arc-raiders/database/item/rascal-iii',
  'rascal-iv': 'https://metaforge.app/arc-raiders/database/item/rascal-iv',
  'rascal-blueprint': 'https://metaforge.app/arc-raiders/database/item/rascal-blueprint'
};

async function scrapePage(name, url) {
  const result = { name, url, title: '', description: '', mentions: [], details: [], lists: [] };
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    result.title = $('title').text().trim();
    
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const json = JSON.parse($(el).html());
        if (json['@graph']) {
          for (const item of json['@graph']) {
            if (item.headline === name || item.about?.name === name || item.headline || item.name) {
              if (item.description) result.description = item.description;
              if (item.mentions) result.mentions = item.mentions;
            }
          }
        }
      } catch (e) {}
    });

    $('main').find('h1, h2, h3, p, li, td, th').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text.length > 0 && text.length < 500) {
        if (
          text.includes('craft') || text.includes('recycle') || text.includes('salvage') || 
          text.includes('perk') || text.includes('station') || text.includes('Requires') || 
          text.includes('Rarity') || text.includes('Durability') || text.includes('Magazine') || 
          text.includes('SMG') || text.includes('Shotgun') || text.includes('Rifle') || 
          text.includes('Weapon') || text.includes('Weight') || text.includes('Projectiles') || 
          text.includes('Fire Rate') || text.includes('Recoil') || text.includes('Type') || 
          text.includes('Ammo') || text.includes('Gunsmith') || text.includes('Parts') ||
          text.includes('Canister') || text.includes('Coins') || text.includes('coins') ||
          text.includes('Level') || text.includes('level') || text.includes('perks')
        ) {
          result.details.push(text);
        }
      }
    });
  } catch (e) {
    result.error = e.message;
  }
  return result;
}

async function run() {
  const results = {};
  for (const [name, url] of Object.entries(urls)) {
    console.log(`Scraping ${name}...`);
    results[name] = await scrapePage(name, url);
  }
  fs.writeFileSync('scratch/rascal_data.json', JSON.stringify(results, null, 2));
  console.log('Done! Output saved to scratch/rascal_data.json');
}

run();
