import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data.ts');

async function fetchWikiData(itemName) {
  try {
    const urlName = itemName.replace(/ /g, '_');
    const url = `https://arcraiders.wiki/wiki/${urlName}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    // Find the Recycling & Salvaging table
    const table = $('table.infobox, table.wikitable').filter(function() {
      return $(this).text().includes('Recycling results') || $(this).text().includes('Salvaging results');
    }).first();

    if (table.length > 0) {
      let recyclingIndex = -1;
      let salvagingIndex = -1;
      let headers = table.find('th');
      headers.each((i, el) => {
         const t = $(el).text().toLowerCase();
         if (t.includes('recycling')) recyclingIndex = i;
         if (t.includes('salvaging')) salvagingIndex = i;
      });
      if (recyclingIndex === -1) {
         headers = table.find('tr').first().find('td');
         headers.each((i, el) => {
           const t = $(el).text().toLowerCase();
           if (t.includes('recycling')) recyclingIndex = i;
           if (t.includes('salvaging')) salvagingIndex = i;
         });
      }
      
      const dataRow = table.find('tr').eq(1);
      const cells = dataRow.find('td');
      
      const parseCell = (cell) => {
        if (!cell || cell.length === 0) return [];
        const results = [];
        cell.find('a').each((i, el) => {
          const qtyText = el.previousSibling ? $(el.previousSibling).text().trim() : '';
          const name = $(el).text().trim();
          
          let quantity = 1;
          const match = qtyText.match(/(\d+)x/);
          if (match) {
             quantity = parseInt(match[1]);
          } else if (qtyText.match(/\d+/)) {
             quantity = parseInt(qtyText.match(/\d+/)[0]);
          }
          if (name) results.push({ name, quantity });
        });
        
        if (results.length === 0) {
          const rawText = cell.text().trim();
          const lines = rawText.split('\n');
          lines.forEach(line => {
             const match = line.match(/(\d+)x\s+(.+)/);
             if (match) {
                results.push({ name: match[2].trim(), quantity: parseInt(match[1]) });
             }
          });
        }
        return results;
      };
      
      const rInfo = recyclingIndex !== -1 ? parseCell(cells.eq(recyclingIndex)) : [];
      const sInfo = salvagingIndex !== -1 ? parseCell(cells.eq(salvagingIndex)) : [];
      return { recycleInfo: rInfo, salvageInfo: sInfo };
    }
  } catch (err) {
    // Ignore 404s
  }
  return { recycleInfo: [], salvageInfo: [] };
}

async function processArray(arrayName, fileContent) {
  const regex = new RegExp(`(export const ${arrayName}: [a-zA-Z\\[\\]]+ = \\[\n?)(.*?)(\n\\];)`, 's');
  const match = fileContent.match(regex);
  if (!match) {
    console.log(`Array ${arrayName} not found.`);
    return fileContent;
  }

  let block = match[2];
  
  // Find all items by matching top-level objects with id and name
  // Format: { id: 'm1', name: 'Item', ...
  const itemRegexStr = /id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/g;
  const items = [];
  let nameMatch;
  while ((nameMatch = itemRegexStr.exec(block)) !== null) {
      items.push({ id: nameMatch[1], name: nameMatch[2] });
  }
  
  console.log(`Processing ${arrayName} (${items.length} top-level items)...`);
  
  for (const item of items) {
      const res = await fetchWikiData(item.name);
      
      const rStr = JSON.stringify(res.recycleInfo).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
      const sStr = JSON.stringify(res.salvageInfo).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
      
      const injectRegex = new RegExp(`(id:\\s*['"]${item.id}['"]\\s*,\\s*name:\\s*['"]${item.name}['"]\\s*,)`, 'g');
      
      block = block.replace(injectRegex, `$1 recycleInfo: ${rStr}, salvageInfo: ${sStr},`);
      
      await new Promise(r => setTimeout(r, 100)); // sleep to prevent rate limiting
  }
  
  return fileContent.replace(match[0], `${match[1]}${block}${match[3]}`);
}

async function run() {
  let content = fs.readFileSync(DATA_FILE, 'utf8');
  
  // Remove existing recycleInfo and salvageInfo from MODS, MATERIALS, THROWABLES blocks
  // to avoid duplication if we run multiple times
  const cleanBlock = (arrayName, text) => {
     const regex = new RegExp(`(export const ${arrayName}: [a-zA-Z\\[\\]]+ = \\[\n?)(.*?)(\n\\];)`, 's');
     return text.replace(regex, (full, p1, p2, p3) => {
         let cleaned = p2.replace(/recycleInfo:\s*\[.*?\],\s*/g, '');
         cleaned = cleaned.replace(/salvageInfo:\s*\[.*?\],\s*/g, '');
         return `${p1}${cleaned}${p3}`;
     });
  };
  
  content = cleanBlock('MODS_DATA', content);
  content = cleanBlock('MATERIALS_DATA', content);
  content = cleanBlock('THROWABLES_DATA', content);

  console.log('Fetching & Injecting data...');
  content = await processArray('MODS_DATA', content);
  content = await processArray('MATERIALS_DATA', content);
  content = await processArray('THROWABLES_DATA', content);
  
  fs.writeFileSync(DATA_FILE, content, 'utf8');
  console.log('Update complete!');
}

run();
