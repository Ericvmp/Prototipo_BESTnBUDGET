import fs from 'fs';

const text = fs.readFileSync('data.ts', 'utf-8');
const urls = [];
const regex = /imageUrl:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(text)) !== null) {
  urls.push(match[1]);
}

const uniqueUrls = [...new Set(urls)];
console.log(`Checking ${uniqueUrls.length} unique URLs...`);

let broken = [];
let localBroken = [];

async function checkUrl(url) {
  if (url.startsWith('/')) {
    const localPath = 'public' + url;
    if (!fs.existsSync(localPath)) {
      localBroken.push(url);
    }
    return;
  }

  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) {
      broken.push({ url, status: res.status });
      return;
    }
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      broken.push({ url, status: `Not an image: ${contentType}` });
    }
  } catch (err) {
    broken.push({ url, status: err.message });
  }
}

async function run() {
  const batchSize = 5;
  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const batch = uniqueUrls.slice(i, i + batchSize);
    await Promise.all(batch.map(checkUrl));
  }
  
  if (localBroken.length > 0) {
    console.log('\n--- BROKEN LOCAL IMAGES ---');
    localBroken.forEach(u => console.log(u));
  }
  if (broken.length > 0) {
    console.log(`\n--- BROKEN EXTERNAL IMAGES (${broken.length}) ---`);
    broken.forEach(b => console.log(`[${b.status}] ${b.url}`));
  }
  if (localBroken.length === 0 && broken.length === 0) {
    console.log('\nAll images are OK!');
  }
}

run();
