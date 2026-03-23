const gameUrl = 'https://news.google.com/rss/search?q="Uma+Musume"+Global+OR+"Uma+Musume"&hl=pt-BR&gl=BR&ceid=BR:pt-419';
const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(gameUrl);
fetch(url)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
