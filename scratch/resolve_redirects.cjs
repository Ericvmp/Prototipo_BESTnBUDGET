const fs = require('fs');
const https = require('https');

let dataTs = fs.readFileSync('data.ts', 'utf8');

// Find all Special:FilePath URLs in data.ts
const specialRegex = /imageUrl:\s*['"](https:\/\/arcraiders\.wiki\/wiki\/Special:FilePath\/[^'"]+)['"]/g;
let match;
const urlsToResolve = new Set();

while ((match = specialRegex.exec(dataTs)) !== null) {
  urlsToResolve.add(match[1]);
}

const urlArray = Array.from(urlsToResolve);
console.log(`Found ${urlArray.length} Special:FilePath URLs to resolve.`);

async function getFinalUrl(urlStr) {
  return new Promise((resolve) => {
    https.get(urlStr, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        const redirectUrl = new URL(res.headers.location, urlStr).href;
        resolve(getFinalUrl(redirectUrl));
      } else {
        // No more redirects or error
        resolve(urlStr);
      }
    }).on('error', () => {
      resolve(null);
    });
  });
}

async function processUrls() {
  let updated = 0;
  for (const url of urlArray) {
    const finalUrl = await getFinalUrl(url);
    if (finalUrl && finalUrl !== url) {
      console.log(`Resolved: ${url.split('/').pop()} -> ${finalUrl}`);
      // Replace in data.ts
      // We must escape regex characters in the URL just in case, though it's mostly plain text
      const searchStr = `imageUrl: "${url}"`;
      const searchStrSingle = `imageUrl: '${url}'`;
      
      let replaced = false;
      if (dataTs.includes(searchStr)) {
        dataTs = dataTs.replace(searchStr, `imageUrl: "${finalUrl}"`);
        replaced = true;
      } else if (dataTs.includes(searchStrSingle)) {
        dataTs = dataTs.replace(searchStrSingle, `imageUrl: '${finalUrl}'`);
        replaced = true;
      }
      
      if (replaced) updated++;
    }
  }

  if (updated > 0) {
    fs.writeFileSync('data.ts', dataTs);
    console.log(`\\nSuccessfully resolved and updated ${updated} URLs.`);
  } else {
    console.log(`\\nNo URLs were updated.`);
  }
}

processUrls();
