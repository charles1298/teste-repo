import * as cheerio from 'cheerio';
import https from 'https';
import fs from 'fs';

https.get('https://game8.co/games/Umamusume-Pretty-Derby/archives/536352', {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) width=1920 height=1080'}}, res => {
  let d=''; res.on('data', c=>d+=c);
  res.on('end', () => {
    const $ = cheerio.load(d);
    const results = new Map();
    $('img').each((i, el) => {
      let src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src') || '';
      if(src.startsWith('//')) src = 'https:' + src;
      const alt = $(el).attr('alt') || '';
      if (src.includes('img.game8') && src.includes('.png') && alt.length > 5 && alt.includes('(')) {
         results.set(alt, src);
      }
    });

    // Also check for 'a' tags that wrap images without alt, using text content
    $('a').each((i, el) => {
      const text = $(el).text().trim();
      const img = $(el).find('img');
      if (img.length && text.length > 5 && text.includes('(')) {
        let src = img.attr('src') || img.attr('data-src') || '';
        if(src.startsWith('//')) src = 'https:' + src;
        if(src.includes('img.game8')) results.set(text, src);
      }
    });

    const chars = [];
    for(const [name, url] of results) {
       let slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
       let baseName = name;
       let eventName = 'Base';
       const m = name.match(/^(.*?)\s*\((.*?)\)$/);
       if (m) { baseName = m[1].trim(); eventName = m[2].trim(); }
       chars.push({ slug, name, baseName, eventName, url });
    }
    fs.writeFileSync('game8_chars.json', JSON.stringify(chars, null, 2));
    console.log('Saved', chars.length, 'characters to game8_chars.json');
  });
});
