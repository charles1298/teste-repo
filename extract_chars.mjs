// Download Game8 character icons
import fs from 'fs';
import path from 'path';
import https from 'https';

const destDir = 'public/assets/characters';
fs.mkdirSync(destDir, { recursive: true });

// Game8 article_id -> slug mapping
// URL pattern: https://img.game8.co/{id}/a123ccfe8167f08dcd57abda9fca0fae.png/show
const CHARACTERS = [
  // [articleId, slug, displayName, event, distance, style]
  // === OVERALL / BASE ===
  [536322, 'special-week', 'Special Week', 'Base', 'Média', 'Betweener'],
  [536320, 'tokai-teio', 'Tokai Teio', 'Base', 'Média', 'Leader'],
  [536321, 'silence-suzuka', 'Silence Suzuka', 'Base', 'Média', 'Runner'],
  [536319, 'maruzensky', 'Maruzensky', 'Base', 'Milha', 'Runner'],
  [536318, 'oguri-cap', 'Oguri Cap', 'Base', 'Milha', 'Betweener'],
  [536316, 'mejiro-mcqueen', 'Mejiro McQueen', 'Base', 'Longa', 'Runner'],
  [536314, 'symboli-rudolf', 'Symboli Rudolf', 'Base', 'Média', 'Leader'],
  [536315, 'tm-opera-o', 'T.M. Opera O', 'Base', 'Longa', 'Leader'],
  [536313, 'rice-shower', 'Rice Shower', 'Base', 'Longa', 'Betweener'],
  [536312, 'mihono-bourbon', 'Mihono Bourbon', 'Base', 'Média', 'Runner'],
  [536317, 'taiki-shuttle', 'Taiki Shuttle', 'Base', 'Milha', 'Leader'],
  // === EVENT VARIANTS ===
  [556853, 'special-week-hoppin', 'Special Week', "Hopp'n♪Happy Heart", 'Média', 'Betweener'],
  [537150, 'tokai-teio-horizon', 'Tokai Teio', 'Beyond the Horizon', 'Média', 'Leader'],
  [556411, 'maruzensky-summer', 'Maruzensky', 'Hot☆Summer Night', 'Milha', 'Runner'],
  [572578, 'oguri-cap-ashen', 'Oguri Cap', 'Ashen Miracle', 'Milha', 'Betweener'],
  [537151, 'mejiro-mcqueen-skies', 'Mejiro McQueen', 'End of the Skies', 'Longa', 'Runner'],
  [570624, 'symboli-rudolf-archer', 'Symboli Rudolf', 'Archer by Moonlight', 'Média', 'Leader'],
  [575507, 'tm-opera-o-newyear', 'T.M. Opera O', 'New Year, Same Radiance!', 'Longa', 'Leader'],
  [567547, 'rice-shower-vampire', 'Rice Shower', 'Vampire Makeover!', 'Longa', 'Betweener'],
  [580437, 'mihono-bourbon-icing', 'Mihono Bourbon', 'CODE: ICING', 'Média', 'Runner'],
  // === SEASONAL / SPECIAL ===
  [547834, 'seiun-sky-fishing', 'Seiun Sky', 'Reeling in the Big One', 'Longa', 'Runner'],
  [568614, 'manhattan-cafe-shadow', 'Manhattan Cafe', 'Creeping Shadow', 'Longa', 'Chaser'],
  [541215, 'narita-taishin-nevertheless', 'Narita Taishin', 'Nevertheless', 'Média', 'Chaser'],
  [575246, 'tamamo-cross-lightning', 'Tamamo Cross', 'Fast as Lightning', 'Média', 'Chaser'],
  [541253, 'smart-falcon-love', 'Smart Falcon', 'LOVE☆4EVER', 'Milha', 'Runner'],
  [541251, 'mayano-topgun-bouquet', 'Mayano Top Gun', 'Sunlight Bouquet', 'Longa', 'Runner'],
  [547833, 'hishi-amazon-azure', 'Hishi Amazon', 'Azure Amazon', 'Milha', 'Chaser'],
  [547832, 'el-condor-pasa-kukulkan', 'El Condor Pasa', 'Kukulkan Warrior', 'Média', 'Betweener'],
  [566109, 'agnes-digital-fangirl', 'Agnes Digital', 'Full-Color Fangirling', 'Milha', 'Betweener'],
  [572255, 'mejiro-dober-offline', 'Mejiro Dober', 'Off the Line', 'Média', 'Betweener'],
  [557789, 'meisho-doto-turbulent', 'Meisho Doto', 'Turbulent Blue', 'Média', 'Betweener'],
  [558104, 'eishin-flash-meister', 'Eishin Flash', 'Meisterschaft', 'Média', 'Betweener'],
  [580438, 'eishin-flash-choco', 'Eishin Flash', 'Precise Chocolatier', 'Média', 'Betweener'],
  [573474, 'fine-motion-noble', 'Fine Motion', 'Noble Seamair', 'Média', 'Leader'],
  [555980, 'gold-city-authentic', 'Gold City', 'Authentic / 1928', 'Milha', 'Betweener'],
  [562609, 'machikane-fukukitaru-lucky', 'Machikane Fukukitaru', 'Lucky Tidings', 'Média', 'Betweener'],
  [572583, 'biwa-hayahide-rouge', 'Biwa Hayahide', 'Rouge Caroler', 'Longa', 'Leader'],
  [567548, 'super-creek-mummy', 'Super Creek', 'Chiffon-Wrapped Mummy', 'Longa', 'Betweener'],
  [575508, 'haru-urara-newyear', 'Haru Urara', 'New Year ♪ New Urara!', 'Curta', 'Chaser'],
  [583950, 'kitasan-black-shrine', 'Kitasan Black', 'Gilded Shrine to Glory', 'Longa', 'Runner'],
  [583792, 'admire-vega-nocturne', 'Admire Vega', 'Starry Nocturne', 'Média', 'Chaser'],
  [541252, 'narita-brian-maverick', 'Narita Brian', 'Maverick', 'Longa', 'Betweener'],
  [553122, 'fuji-kiseki-shooting', 'Fuji Kiseki', 'Shooting Star Revue', 'Milha', 'Runner'],
  [547831, 'grass-wonder-jade', 'Grass Wonder', 'Saintly Jade Cleric', 'Média', 'Betweener'],
  [537177, 'curren-chan-eclair', 'Curren Chan', 'Fille Éclair', 'Milha', 'Chaser'],
  [541250, 'air-groove-quercus', 'Air Groove', 'Quercus Civilis', 'Média', 'Leader'],
  [581631, 'mejiro-ardan-crystal', 'Mejiro Ardan', 'Crystalline', 'Longa', 'Betweener'],
  [564091, 'hishi-akebono-buono', 'Hishi Akebono', 'Buono☆Alla Moda', 'Longa', 'Leader'],
  [571291, 'tosen-jordan-jokester', 'Tosen Jordan', 'Jokester ☆ Vibes', 'Média', 'Betweener'],
  [568906, 'kawakami-princess-pink', 'Kawakami Princess', 'Princess of Pink', 'Média', 'Chaser'],
  [570623, 'gold-city-cosmos', 'Gold City', 'Autumn Cosmos', 'Milha', 'Betweener'],
  [579926, 'sakura-chiyono-bloom', 'Sakura Chiyono O', 'Strength in Full Bloom', 'Milha', 'Runner'],
  [585855, 'matikane-tannhauser-clop', 'Matikane Tannhauser', 'Clippety Tippety Clop', 'Média', 'Runner'],
  [325, 'gold-ship-red', 'Gold Ship', 'Red Strife', 'Longa', 'Chaser'], // 536305 - SR page
  // === R/SR BASE ===
  [536298, 'sakura-bakushinoh-blossom', 'Sakura Bakushin O', 'Blossom in Learning', 'Curta', 'Runner'],
  [536307, 'mayano-topgun-scramble', 'Mayano Top Gun', 'Scramble Zone', 'Longa', 'Runner'],
  [536305, 'gold-ship-strife', 'Gold Ship', 'Red Strife', 'Longa', 'Chaser'],
  [536304, 'el-condor-pasa-numero', 'El Condor Pasa', 'El Numero 1', 'Média', 'Betweener'],
  [536309, 'super-creek-murmuring', 'Super Creek', 'Murmuring Stream', 'Longa', 'Betweener'],
  [536306, 'grass-wonder-piercing', 'Grass Wonder', 'Stone-Piercing Blue', 'Média', 'Betweener'],
  [536303, 'daiwa-scarlet-peak', 'Daiwa Scarlet', 'Peak Blue', 'Milha', 'Leader'],
  [536310, 'vodka-topgear', 'Vodka', 'Wild Top Gear', 'Milha', 'Betweener'],
  [536293, 'agnes-tachyon-tech', 'Agnes Tachyon', 'Tach-nology', 'Média', 'Betweener'],
  [536302, 'air-groove-empress', 'Air Groove', 'Empress Road', 'Média', 'Leader'],
  [536297, 'mejiro-ryan-down', 'Mejiro Ryan', 'Down the Line', 'Média', 'Betweener'],
  [536287, 'nice-nature-ribbon', 'Nice Nature', 'Poinsettia Ribbon', 'Média', 'Betweener'],
  [536299, 'winning-ticket-win', 'Winning Ticket', 'Get to Winning!', 'Média', 'Betweener'],
  [536296, 'machikane-fukukitaru-rising', 'Machikane Fukukitaru', 'Rising Fortune', 'Média', 'Betweener'],
  [536294, 'haru-urara-bestest', 'Haru Urara', 'Bestest Prize', 'Curta', 'Chaser'],
  [536295, 'king-halo-emeralds', 'King Halo', 'King of Emeralds', 'Curta', 'Leader'],
  [536325, 'biwa-hayahide-winning', 'Biwa Hayahide', 'pf. Winning Equation...', 'Longa', 'Leader'],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://game8.co/' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', e => { file.close(); fs.unlinkSync(dest); reject(e); });
  });
}

let ok = 0, fail = 0;
for (const [artId, slug] of CHARACTERS) {
  const url = `https://img.game8.co/${artId}/a123ccfe8167f08dcd57abda9fca0fae.png/show`;
  const dest = path.join(destDir, `${slug}.png`);
  try {
    await download(url, dest);
    const stat = fs.statSync(dest);
    if (stat.size < 500) {
      fs.unlinkSync(dest);
      fail++;
      console.log(`Too small (${stat.size}b): ${slug}`);
    } else {
      ok++;
    }
  } catch (e) {
    fail++;
    console.log(`Failed: ${slug} - ${e.message}`);
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed`);
