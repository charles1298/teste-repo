import * as cheerio from 'cheerio';
import fs from 'fs';

async function mapGame8Icons() {
  console.log('Fetching game8...');
  const res = await fetch('https://game8.co/games/Umamusume-Pretty-Derby/archives/536352');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const game8Chars = [];
  
  // Find tables or links with character images
  // Example: <a href="..."><img src="..." alt="Character Name"></a>
  $('a[href*="/archives/"]').each((i, el) => {
    const $img = $(el).find('img');
    if ($img.length > 0) {
      const img = $img.attr('data-src') || $img.attr('src');
      let name = $img.attr('alt') || $(el).text().trim() || '';
      
      // Cleanup name: e.g. "Kitasan Black (Gilded Shrine to Glory)" -> "Kitasan Black" for base mapping
      // Or we can map sub-versions.
      if (img && name && img.includes('akamai')) {
        game8Chars.push({ name: name.trim(), img });
      }
    }
  });

  console.log(`Found ${game8Chars.length} images on game8.`);
  fs.writeFileSync('game8_chars.json', JSON.stringify(game8Chars, null, 2));
  
  // Now we update characters.ts
  const charFilePath = 'src/data/characters.ts';
  let charFile = fs.readFileSync(charFilePath, 'utf8');
  
  // We need to match the PLAYABLE_CHARACTERS RAW data names with game8.
  // We can just dump game8 mapping and replace `iconUrl` if we find a match.
}

mapGame8Icons().catch(console.error);
