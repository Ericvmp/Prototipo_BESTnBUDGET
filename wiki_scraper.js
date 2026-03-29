const https = require('https');
const fs = require('fs');

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log("Fetching Cargo Tables HTML...");
  const tablesHtml = await fetchJson('https://arcraiders.wiki/wiki/Special:CargoTables');
  // It returns HTML strings because it's not JSON natively. Let's just Regex it
  const matches = [...tablesHtml.matchAll(/href="\/wiki\/Special:CargoTables\/([^"]+)"/g)].map(m => m[1]);
  const uniqueTables = Array.from(new Set(matches));
  console.log("Found Cargo Tables:", uniqueTables.join(', '));
  
  if (uniqueTables.length === 0) {
      console.log("No Cargo tables found. Perhaps cargo is not on this wiki, or the HTML structure differed.");
      return;
  }
}

run();
