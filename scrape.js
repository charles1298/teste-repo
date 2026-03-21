const https = require('https');

https.get('https://game8.co/games/Umamusume-Pretty-Derby/archives/536352', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Regex to find Character links with images
    const charRegex = /<a[^>]*href="([^"]*archives\/\d+)"[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g;
    let match;
    const results = [];
    while ((match = charRegex.exec(data)) !== null) {
      results.push({
        url: match[1],
        image: match[2],
        name: match[3]
      });
    }
    console.log(JSON.stringify(results.slice(0, 30), null, 2));
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
