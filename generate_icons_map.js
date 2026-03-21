import fs from 'fs';

const fileContent = fs.readFileSync('src/data/game8_icons.ts', 'utf8');
const jsonStr = fileContent.replace('export const GAME8_ICONS: any = ', '').replace(';\\n', '').trim();
const rawIcons = JSON.parse(jsonStr.substring(0, jsonStr.length - 1));

const mapped = {};

rawIcons.forEach(item => {
  // item.alt is something like "Kitasan Black (Gilded Shrine to Glory)" or "Kitasan Black (Gilded Shrine to Glory) Icon"
  let alt = item.alt.replace(/ Icon$/i, '').trim();
  
  let baseName = alt;
  let versionName = 'Padrão';
  
  const match = alt.match(/^([^(]+)\\s*\\(([^)]+)\\)/);
  if (match) {
    baseName = match[1].trim();
    versionName = match[2].trim();
  }
  
  if (!mapped[baseName]) {
    mapped[baseName] = [];
  }
  
  mapped[baseName].push({
    id: versionName === 'Padrão' ? 'base' : versionName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: versionName,
    iconUrl: item.src
  });
});

const exportString = `export const GAME8_ICONS: Record<string, { id: string, name: string, iconUrl: string }[]> = ${JSON.stringify(mapped, null, 2)};\\n`;

fs.writeFileSync('src/data/game8_icons.ts', exportString);
console.log('Successfully structured GAME8_ICONS!');
