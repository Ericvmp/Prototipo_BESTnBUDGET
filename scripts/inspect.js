import https from 'https';
import fs from 'fs';

https.get('https://arctracker.io/items', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('No NEXT_DATA found. Checking scripts...');
    const scriptMatches = data.match(/<script.*?>[\s\S]*?<\/script>/g);
    if (scriptMatches) {
      console.log('Found', scriptMatches.length, 'scripts');
      
      const buildIdMatch = data.match(/"buildId":"([^"]+)"/);
      if (buildIdMatch) {
         console.log('Build ID:', buildIdMatch[1]);
      }
      
      const reactDataMatch = data.match(/self\.__next_f\.push/g);
      if (reactDataMatch) {
         console.log('Found next_f pushes:', reactDataMatch.length);
      }
    }
    fs.writeFileSync('arctracker2.html', data);
  });
}).on('error', err => console.error(err));
