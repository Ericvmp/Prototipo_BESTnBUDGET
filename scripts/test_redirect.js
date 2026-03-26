import fs from 'fs';

async function testUrl() {
  const url = 'https://arcraiders.wiki/wiki/Special:FilePath/Rattler.png';
  const res = await fetch(url, { method: 'HEAD' });
  console.log('Good URL Final:', res.url);
  console.log('Good Content-Type:', res.headers.get('content-type'));

  const badUrl = 'https://arcraiders.wiki/wiki/Special:FilePath/FakeWeapon123.png';
  const badRes = await fetch(badUrl, { method: 'HEAD' });
  console.log('Bad URL Final:', badRes.url);
  console.log('Bad Content-Type:', badRes.headers.get('content-type'));
}

testUrl();
