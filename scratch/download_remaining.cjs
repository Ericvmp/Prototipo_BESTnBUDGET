const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const dataTsPath = 'data.ts';
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

const urls = [
  'https://arcraiders.wiki/w/images/5/56/Snap_Hook.png',
  'https://arcraiders.wiki/w/images/f/f9/Zipline.png',
  'https://arcraiders.wiki/wiki/Special:FilePath/Raider_Hatch_Key.png',
  'https://arcraiders.wiki/wiki/Special:FilePath/Surge_Coil.png',
  'https://arcraiders.wiki/wiki/Special:FilePath/Tagging_Grenade.png'
];

async function process() {
  for (const url of urls) {
    const filename = decodeURIComponent(url.split('/').pop());
    const filepath = path.join(__dirname, '../public/images/items', filename);
    const res = await fetch(url);
    if(res.ok) {
       const dest = fs.createWriteStream(filepath);
       await pipeline(res.body, dest);
       console.log('Downloaded', filename);
       dataTs = dataTs.replace(url, `/images/items/${filename}`);
    } else {
       console.log('Failed', url);
    }
  }
  fs.writeFileSync(dataTsPath, dataTs);
  console.log('Done');
}
process();
