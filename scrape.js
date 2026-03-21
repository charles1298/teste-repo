import * as cheerio from 'cheerio';
import fs from 'fs';

async function debugGame8Icons() {
  const res = await fetch('https://game8.co/games/Umamusume-Pretty-Derby/archives/536352');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const results = [];
  
  $('a[href*="/archives/"]').each((i, el) => {
    const $img = $(el).find('img');
    if ($img.length > 0) {
      let src = $img.attr('data-src') || $img.attr('src');
      let alt = $img.attr('alt') || $(el).text().trim() || '';
      results.push({ src, alt });
    }
  });

  const exportString = `export const GAME8_ICONS: any = ${JSON.stringify(results.filter(x => x.src), null, 2)};\n`;
  fs.writeFileSync('src/data/game8_icons.ts', exportString);
  console.log('Saved debug icons to src/data/game8_icons.ts');
}

debugGame8Icons().catch(console.error);
