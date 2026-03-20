import https from 'https';
import fs from 'fs';
import path from 'path';

function getHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://game8.co/' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fs.unlinkSync(dest);
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} - ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', e => { fs.unlinkSync(dest); reject(e); });
  });
}

// Convert "Oguri Cap (Starlight Beat)" into slug "oguri-cap-starlight"
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function scrape() {
  console.log('Fetching Game8 Tier List HTML...');
  const html = await getHTML('https://game8.co/games/Umamusume-Pretty-Derby/archives/536352');
  
  // Regex to find links enclosing images, typically: 
  // <a href="..."> <img data-src="https://img.game8.co/4428700/6ee256690af9074148e795eeabe7b18a.png/show" alt="Kitasan Black (Gilded Shrine to Glory)"> </a>
  const regex = /<img[^>]*?(?:src|data-src|data-lazy-src)="([^"]*?img\.game8\.co[^"]*\.png[^"]*)"[^>]*?alt="([^"]+?)"/g;
  
  const characters = new Map();
  let match;
  while ((match = regex.exec(html)) !== null) {
    let url = match[1];
    let name = match[2].trim();
    
    // Clean up Game8 lazy loader issues
    if (url.startsWith('//')) url = 'https:' + url;
    
    // Filter out standard non-character images 
    if (name.length > 3 && !name.includes('Icon') && !name.includes('Game8')) {
      if (!characters.has(name)) {
        characters.set(name, url);
      }
    }
  }

  // Also check tooltips span structure:
  // <span class="js-discription-tooltip" data-tooltip-content="Matikane Tannhauser (Clippety Tippety Clop)">
  //   <img src="...png/show"...
  const tooltipRegex = /data-tooltip-content="([^"]+)"[^>]*>.*?<img[^>]*?(?:src|data-src|data-lazy-src)="([^"]*?img\.game8\.co[^"]*\.png[^"]*)"/gs;
  while ((match = tooltipRegex.exec(html)) !== null) {
    let name = match[1].trim();
    let url = match[2];
    if (url.startsWith('//')) url = 'https:' + url;
    if (name.length > 3 && !characters.has(name)) {
      characters.set(name, url);
    }
  }

  console.log(`Found ${characters.size} unique character icons.`);
  
  const destDir = path.join(process.cwd(), 'public', 'assets', 'characters');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const finalChars = [];
  let downloaded = 0;
  
  for (const [name, url] of characters) {
    // Only process character variants (names with parentheses) or known base characters
    if (!name.includes('(') && !name.includes(' ')) continue;
    
    const slug = toSlug(name);
    const dest = path.join(destDir, `${slug}.png`);
    
    try {
      if (!fs.existsSync(dest)) {
        await downloadImage(url, dest);
      }
      downloaded++;
      
      // Parse base name vs event name
      let baseName = name;
      let eventName = 'Base';
      const pMatch = name.match(/^(.*?)\s*\((.*?)\)$/);
      if (pMatch) {
        baseName = pMatch[1].trim();
        eventName = pMatch[2].trim();
      }
      
      finalChars.push({ slug, name, baseName, eventName, imageUrl: `/assets/characters/${slug}.png?v=2` });
    } catch (e) {
      console.log(`Failed to dl ${name}: ${e.message}`);
    }
  }
  
  console.log(`Successfully acquired ${downloaded} character portraits.`);
  fs.writeFileSync('game8_chars.json', JSON.stringify(finalChars, null, 2));
  console.log('Saved mapping to game8_chars.json');
}

scrape().catch(console.error);
