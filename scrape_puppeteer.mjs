import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrape() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log('Navigating to GameTora...');
  // Use a long timeout just in case it's slow to load
  await page.goto('https://gametora.com/umamusume/support-cards', { waitUntil: 'networkidle2', timeout: 60000 });
  
  console.log('Extracting data from DOM...');
  const data = await page.evaluate(() => {
    const cards = [];
    const links = document.querySelectorAll('a[href*="/umamusume/support-cards/"]');
    
    // Some links might not belong to cards, but cards usually have images.
    for (const link of links) {
      const href = link.getAttribute('href');
      // Look for format: /umamusume/support-cards/30043-special-week
      const match = href.match(/\/umamusume\/support-cards\/(\d+)(-.+)?/);
      if (match) {
        const id = match[1];
        
        // Find image inside link to confirm it's a card and grab the name from alt text or nearby text
        const img = link.querySelector('img');
        const name = (img && img.alt) || link.innerText.trim() || ("Unknown Card " + id);
        
        // Exclude generic links
        if (id.length >= 4 && !cards.find(c => c.id === id)) {
           // We can't perfectly extract rarity from just the link without class details, but usually rarity is in text or icon.
           // For simplicity, assign SSR to 30xxx, SR to 20xxx, R to 10xxx. GameTora usually prefixes SSR with 30, SR with 20.
           let rarity = "SSR";
           if (id.startsWith('2')) rarity = "SR";
           if (id.startsWith('1')) rarity = "R";
           
           cards.push({ id, name, rarity });
        }
      }
    }
    return cards;
  });
  
  console.log(`Found ${data.length} cards in DOM.`);
  
  const assetsDir = path.join(__dirname, 'src', 'assets', 'cards');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const results = [];
  let count = 0;
  
  // To avoid timeouts, let's only do the first 50 cards (or all if the array is small, but GameTora has hundreds). 
  // Let's do the first 60 unique cards to provide the users with a good subset of global server cards.
  const topCards = data.slice(0, 60);

  for (const c of topCards) {
    const imageUrl = `https://gametora.com/images/umamusume/support_cards/support_card_${c.id}.png`;
    const localFilename = `uma-${c.id}.png`;
    const localPath = path.join(assetsDir, localFilename);
    const cleanedName = c.name.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    results.push({
      id: `uma-${c.id}`,
      name: cleanedName,
      rarity: c.rarity,
      imageUrl: `/assets/cards/${localFilename}`
    });

    if (!fs.existsSync(localPath)) {
      try {
        const viewSource = await page.goto(imageUrl, { timeout: 15000 });
        const buffer = await viewSource.buffer();
        fs.writeFileSync(localPath, buffer);
        count++;
        if (count % 10 === 0) console.log(`Downloaded ${count} images...`);
      } catch (e) {
        console.log(`Failed to download ${imageUrl} - ${e.message}`);
        results[results.length - 1].imageUrl = imageUrl; 
      }
    }
  }

  const tsCode = `export type Rarity = 'SSR' | 'SR' | 'R';\n\nexport interface SupportCard {\n  id: string;\n  name: string;\n  rarity: Rarity;\n  imageUrl: string;\n}\n\nexport const SUPPORT_CARDS: SupportCard[] = ${JSON.stringify(results, null, 2)};\n`;

  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'cards.ts'), tsCode, 'utf-8');
  console.log(`Updated cards.ts with ${results.length} global cards!`);
  
  await browser.close();
}

scrape().catch(console.error);
