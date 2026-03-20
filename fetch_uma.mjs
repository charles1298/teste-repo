import fs from 'fs';

async function main() {
  const url = 'https://game8.co/games/Umamusume-Pretty-Derby/archives/536352';
  try {
    const res = await fetch(url);
    const html = await res.text();

    const oguriIdx = html.indexOf('Oguri Cap');
    if (oguriIdx !== -1) {
      console.log(html.substring(Math.max(0, oguriIdx - 400), oguriIdx + 400));
    } else {
      console.log("Oguri Cap not found");
    }
  } catch (err) {
    console.error(err);
  }
}

main();
