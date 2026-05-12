/**
 * download_wiki_images.cjs
 * Baixa as imagens externas da wiki, converte para WebP 75% e atualiza blueprintData.ts
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ITEMS_DIR = path.join(ROOT, 'public', 'images', 'items');

// Mapeamento: id do blueprint → { url externa, nome do arquivo local }
const EXTERNAL_IMAGES = [
  {
    id: 'red-light-stick',
    url: 'https://arcraiders.wiki/w/images/9/93/Red_Light_Stick.png',
    localName: 'Red_Light_Stick',
  },
  {
    id: 'crash-mat',
    url: 'https://arcraiders.wiki/w/images/7/75/Crash_Mat.png',
    localName: 'Crash_Mat',
  },
  {
    id: 'tactical-mk3-smoke',
    url: 'https://arcraiders.wiki/w/images/d/d6/Tactical_Mk._3_%28Smoke%29.png',
    localName: 'Tactical_Mk._3_(Smoke)',
  },
  {
    id: 'white-flag',
    url: 'https://arcraiders.wiki/w/images/4/43/White_Flag.png',
    localName: 'White_Flag',
  },
  {
    id: 'remote-raider-flare',
    url: 'https://arcraiders.wiki/w/images/f/ff/Remote_Raider_Flare.png',
    localName: 'Remote_Raider_Flare',
  },
  {
    id: 'powered-descender',
    url: 'https://arcraiders.wiki/w/images/2/21/Powered_Descender.png',
    localName: 'Powered_Descender',
  },
  {
    id: 'green-light-stick',
    url: 'https://arcraiders.wiki/w/images/2/27/Green_Light_Stick.png',
    localName: 'Green_Light_Stick',
  },
  {
    id: 'fireworks-box',
    url: 'https://arcraiders.wiki/w/images/0/0f/Fireworks_Box.png',
    localName: 'Fireworks_Box',
  },
  {
    id: 'yellow-light-stick',
    url: 'https://arcraiders.wiki/w/images/1/1f/Yellow_Light_Stick.png',
    localName: 'Yellow_Light_Stick',
  },
  {
    id: 'blue-light-stick',
    url: 'https://arcraiders.wiki/w/images/c/cc/Blue_Light_Stick.png',
    localName: 'Blue_Light_Stick',
  },
];

// ── Baixar uma URL como Buffer ──────────────────────────────────────────────────
function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StashPlanner/1.0)',
        'Referer': 'https://arcraiders.wiki/',
      },
      timeout: 15000,
    }, (res) => {
      // Seguir redirecionamentos
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`   ↪ Redirecionando para: ${res.headers.location}`);
        resolve(downloadBuffer(res.headers.location));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} para ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error(`Timeout ao baixar ${url}`));
    });
  });
}

// ── Principal ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌐 Baixando imagens externas da wiki...\n');

  const results = [];

  for (const item of EXTERNAL_IMAGES) {
    const webpName = `${item.localName}.webp`;
    const webpPath = path.join(ITEMS_DIR, webpName);
    const localPath = `/images/items/${webpName}`;

    process.stdout.write(`⬇️  ${item.localName.padEnd(35)} `);

    try {
      const buffer = await downloadBuffer(item.url);
      const origSize = buffer.length;

      await sharp(buffer)
        .webp({ quality: 75, lossless: false })
        .toFile(webpPath);

      const newSize = fs.statSync(webpPath).size;
      const saving = (((origSize - newSize) / origSize) * 100).toFixed(1);

      console.log(`✅  ${(origSize / 1024).toFixed(0).padStart(5)} KB → ${(newSize / 1024).toFixed(0).padStart(4)} KB  (-${saving}%)`);
      results.push({ id: item.id, localPath, success: true });
    } catch (err) {
      console.log(`❌  FALHOU: ${err.message}`);
      results.push({ id: item.id, localPath: null, success: false });
    }
  }

  // ── Atualizar blueprintData.ts ──────────────────────────────────────────────
  console.log('\n✏️  Atualizando blueprintData.ts...');

  const dataPath = path.join(ROOT, 'blueprintData.ts');
  let content = fs.readFileSync(dataPath, 'utf8');
  let updatedCount = 0;

  for (const result of results) {
    if (!result.success) continue;
    const item = EXTERNAL_IMAGES.find(i => i.id === result.id);
    // Substitui a URL externa pela local
    // A URL pode estar URL-encoded ou não, então substituímos a linha pelo id
    const urlPattern = new RegExp(
      `(id:\\s*'${result.id}'[^}]*image:\\s*')[^'"]*(https?://[^'"]+)('[^}]*})`,
      'g'
    );
    // Abordagem mais simples: buscar a linha com a URL original e substituir
    const lines = content.split('\n');
    const newLines = lines.map(line => {
      if (line.includes(`'${result.id}'`) && line.includes('http')) {
        // Extrai a URL original da linha e a substitui
        const urlMatch = line.match(/https?:\/\/[^\s'"]+/);
        if (urlMatch) {
          const newLine = line.replace(urlMatch[0], result.localPath);
          if (newLine !== line) {
            updatedCount++;
            return newLine;
          }
        }
      }
      return line;
    });
    content = newLines.join('\n');
  }

  fs.writeFileSync(dataPath, content, 'utf8');
  console.log(`   ${updatedCount} referência(s) atualizada(s) no blueprintData.ts\n`);

  // ── Resumo ──────────────────────────────────────────────────────────────────
  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('═'.repeat(55));
  console.log('📊 RESULTADO');
  console.log('═'.repeat(55));
  console.log(`  ✅ Baixadas e convertidas : ${success} imagens`);
  if (failed > 0) {
    console.log(`  ❌ Falhas                 : ${failed} imagens`);
    console.log(`     (essas permanecem apontando para a wiki)`);
  }
  console.log('═'.repeat(55));
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err);
  process.exit(1);
});
