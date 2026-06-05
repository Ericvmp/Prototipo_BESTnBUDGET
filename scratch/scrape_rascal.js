const axios = require('axios');
const cheerio = require('cheerio');

const urls = {
  'rascal': 'https://metaforge.app/arc-raiders/database/item/rascal',
  'rascal-ii': 'https://metaforge.app/arc-raiders/database/item/rascal-ii',
  'rascal-iii': 'https://metaforge.app/arc-raiders/database/item/rascal-iii',
  'rascal-iv': 'https://metaforge.app/arc-raiders/database/item/rascal-iv',
  'rascal-blueprint': 'https://metaforge.app/arc-raiders/database/item/rascal-blueprint'
};

async function scrapePage(name, url) {
  console.log(`\n=================== ${name.toUpperCase()} ===================`);
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    // Let's print out text that looks like stats, crafting, recycling, requirements, etc.
    // We can also extract the JSON-LD script blocks which contain structured data
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const json = JSON.parse($(el).html());
        console.log("JSON-LD structure:", JSON.stringify(json, null, 2));
      } catch (e) {}
    });

    // Also get headings and descriptive text
    console.log("Page Title:", $('title').text());
    
    // Look for lists or tables of items/materials
    const textContent = $('main, body').text().replace(/\s+/g, ' ');
    // Match patterns like "Required to craft", "Recycle", "Salvage", "Materials", numbers, etc.
    const regexes = [
      /Required to craft[^.]*/gi,
      /Obtained by recycling[^.]*/gi,
      /Obtained by salvaging[^.]*/gi,
      /Crafting station[^.]*/gi,
      /Station:[^.]*/gi,
      /Materials:[^.]*/gi,
      /Crafting requirements[^.]*/gi,
      /Recycle value[^.]*/gi,
      /Weight[^.]*/gi,
      /Rarity[^.]*/gi,
      /Type[^.]*/gi,
      /Ammo[^.]*/gi
    ];
    
    console.log("\nSnippets:");
    regexes.forEach(re => {
      const matches = textContent.match(re);
      if (matches) {
        matches.forEach(m => console.log(" -", m.trim()));
      }
    });

    // Also look for specific material/weapon details in table or list form
    $('tr, li').each((i, el) => {
      const txt = $(el).text().trim();
      if (txt.includes('Gun Parts') || txt.includes('Canister') || txt.includes('Mechanical') || txt.includes('Coin') || txt.includes('Damage') || txt.includes('Fire Rate') || txt.includes('Magazine')) {
        console.log("List/Table item:", txt.replace(/\s+/g, ' '));
      }
    });
    
  } catch (e) {
    console.error(`Failed to fetch ${url}:`, e.message);
  }
}

async function run() {
  for (const [name, url] of Object.entries(urls)) {
    await scrapePage(name, url);
  }
}

run();
