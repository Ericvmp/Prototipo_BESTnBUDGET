const axios = require('axios');
const fs = require('fs');
const path = require('path');

const imagesToDownload = {
  'public/images/items/Rascal.webp': 'https://cdn.metaforge.app/arc-raiders/icons/rascal.webp',
  'public/images/items/Rascal_Blueprint.webp': 'https://cdn.metaforge.app/arc-raiders/icons/rascal-blueprint.webp',
  'public/images/items/Rascal_II.webp': 'https://cdn.metaforge.app/arc-raiders/icons/rascal-ii.webp',
  'public/images/items/Rascal_III.webp': 'https://cdn.metaforge.app/arc-raiders/icons/rascal-iii.webp',
  'public/images/items/Rascal_IV.webp': 'https://cdn.metaforge.app/arc-raiders/icons/rascal-iv.webp'
};

async function downloadImage(localPath, url) {
  console.log(`Downloading ${url} to ${localPath}...`);
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    
    const writer = fs.createWriteStream(localPath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Successfully downloaded ${localPath}`);
        resolve();
      });
      writer.on('error', (err) => {
        console.error(`Error writing to ${localPath}:`, err.message);
        reject(err);
      });
    });
  } catch (e) {
    console.error(`Failed to download ${url}:`, e.message);
  }
}

async function run() {
  for (const [localPath, url] of Object.entries(imagesToDownload)) {
    await downloadImage(localPath, url);
  }
  console.log('Finished downloading all assets!');
}

run();
