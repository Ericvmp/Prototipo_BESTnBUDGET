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

async function run() {
  let output = '';
  for (const [name, url] of Object.entries(urls)) {
    output += `\n======================================================\n`;
    output += `=== ${name.toUpperCase()} ===\n`;
    output += `======================================================\n`;
    try {
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });
      const $ = cheerio.load(data);
      
      // Get all text from the main area, paragraph by paragraph, table by table
      $('main').find('p, li, tr, table, h1, h2, h3, div').each((i, el) => {
        // If it's a leaf element or text node, get it
        if ($(el).children().length === 0 || el.name === 'p' || el.name === 'li' || el.name === 'tr' || el.name === 'h1' || el.name === 'h2' || el.name === 'h3') {
          const txt = $(el).text().trim().replace(/\s+/g, ' ');
          if (txt) {
            output += `${el.name.toUpperCase()}: ${txt}\n`;
          }
        }
      });
    } catch (e) {
      output += `Error: ${e.message}\n`;
    }
  }
  fs.writeFileSync('scratch/rascal_pages.txt', output);
  console.log('Saved to scratch/rascal_pages.txt');
}

run();
