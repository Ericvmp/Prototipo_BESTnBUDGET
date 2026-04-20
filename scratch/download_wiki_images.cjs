const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const dataTsPath = 'data.ts';
const imagesDir = path.join(__dirname, '../public/images/items');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const urlRegex = /imageUrl:\s*['"](https:\/\/arcraiders\.wiki[^'"]+)['"]/g;
const urlsToDownload = new Set();
let match;

while ((match = urlRegex.exec(dataTs)) !== null) {
  urlsToDownload.add(match[1]);
}

const urlArray = Array.from(urlsToDownload);
console.log(`Found ${urlArray.length} external Wiki images to download.`);

async function downloadImage(url, filename) {
  const filePath = path.join(imagesDir, filename);
  
  if (fs.existsSync(filePath)) {
    return true;
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
      return false;
    }
    
    // Convert ReadableStream to Node.js Readable
    const dest = fs.createWriteStream(filePath);
    await pipeline(response.body, dest);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return false;
  }
}

async function processAll() {
  let downloadedCount = 0;
  
  for (let i = 0; i < urlArray.length; i++) {
    const url = urlArray[i];
    let filename = decodeURIComponent(url.split('/').pop());
    
    console.log(`[${i+1}/${urlArray.length}] Downloading ${filename}...`);
    const success = await downloadImage(url, filename);
    
    if (success) {
      downloadedCount++;
      const localUrl = `/images/items/${filename}`;
      // Use replace with a string literal to avoid regex escaping issues
      dataTs = dataTs.replace(new RegExp(`imageUrl:\\s*['"]${url.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&')}['"]`, 'g'), `imageUrl: '${localUrl}'`);
    }
  }

  if (downloadedCount > 0) {
    fs.writeFileSync(dataTsPath, dataTs);
    console.log(`\\nSuccessfully downloaded ${downloadedCount} images and updated data.ts to use local paths.`);
  } else {
    console.log('\\nNo images were downloaded or updated.');
  }
}

processAll();
