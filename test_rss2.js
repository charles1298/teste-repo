const urls = [
  'https://news.google.com/rss/search?q="Uma+Musume"+when:1m&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  'https://news.google.com/rss/search?q="Uma+Musume"+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  'https://news.google.com/rss/search?q=Uma+Musume+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  'https://news.google.com/rss/search?q="ウマ娘"+when:1m&hl=ja&gl=JP&ceid=JP:ja' // As a backup to see if JA has 2026 news we could translate? No, user wants PT.
];

async function test() {
  for (const u of urls) {
    const api = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(u);
    try {
      const r = await fetch(api);
      const j = await r.json();
      console.log('Query:', u);
      console.log('Items:', j.items ? j.items.length : 0);
      if (j.items && j.items.length > 0) {
        console.log('  First title:', j.items[0].title);
        console.log('  Date:', j.items[0].pubDate);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
test();
