import { SUPPORT_CARDS } from './cards';
import { GAME8_ICONS } from './game8_icons';
import { META_DECKS } from './metaDecks';

export interface RecommendedCard {
  id: string;
  reason: string;
  type: 'Speed' | 'Stamina' | 'Power' | 'Guts' | 'Intelligence' | 'Friend';
  isAlternative?: boolean;
}

export interface DeckVariation {
  name: string;
  tier?: 'S' | 'A' | 'B' | 'C';
  description?: string;
  recommendedIds: string[];
}

export interface ScenarioDeck {
  scenario: string;
  decks: DeckVariation[];
  cards: RecommendedCard[];
}

export function getCharacterIconByName(name: string): string {
  // Fuzzy match base name
  let iconInfo = GAME8_ICONS[name];
  if (!iconInfo) {
    const key = Object.keys(GAME8_ICONS).find(k => k.includes(name));
    if (key) iconInfo = GAME8_ICONS[key];
  }

  if (iconInfo && iconInfo.length > 0) {
    return iconInfo[0].iconUrl;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fce7f3&color=db2777&bold=true`;
}

export interface CharacterVersion {
  id: string;
  name: string;
  iconUrl: string;
  imageUrl: string;
}

export interface PlayableCharacter {
  id: string;
  name: string;
  nameJp: string;
  distance: string;
  style: string;
  versions: CharacterVersion[];
  scenarioDecks: ScenarioDeck[];
}

export function getCardById(id: string) {
  return SUPPORT_CARDS.find(c => c.id === id);
}

// Funções Genéricas Anteriores foram substituídas pela lógica estrita unificada do metaDecks.ts

type CharDef = [string, string, string, string, string];
// [id, name, nameJp, distance, style]
const RAW: CharDef[] = [
  ['sakura-bakushinoh','Sakura Bakushin O','サクラバクシンオー','Curta','Runner'],
  ['king-halo','King Halo','キングヘイロー','Curta','Leader'],
  ['haru-urara','Haru Urara','ハルウララ','Curta','Chaser'],
  ['taiki-shuttle','Taiki Shuttle','タイキシャトル','Milha','Leader'],
  ['daiwa-scarlet','Daiwa Scarlet','ダイワスカーレット','Milha','Leader'],
  ['oguri-cap','Oguri Cap','オグリキャップ','Milha','Betweener'],
  ['vodka','Vodka','ウオッカ','Milha','Betweener'],
  ['nishino-flower','Nishino Flower','ニシノフラワー','Milha','Chaser'],
  ['maruzensky','Maruzensky','マルゼンスキー','Milha','Runner'],
  ['smart-falcon','Smart Falcon','スマートファルコン','Milha','Runner'],
  ['hishi-amazon','Hishi Amazon','ヒシアマゾン','Milha','Chaser'],
  ['agnes-digital','Agnes Digital','アグネスデジタル','Milha','Betweener'],
  ['gold-city','Gold City','ゴールドシチー','Milha','Betweener'],
  ['yukino-bijin','Yukino Bijin','ユキノビジン','Milha','Chaser'],
  ['biko-pegasus','Biko Pegasus','ビコーペガサス','Milha','Runner'],
  ['special-week','Special Week','スペシャルウィーク','Média','Betweener'],
  ['tokai-teio','Tokai Teio','トウカイテイオー','Média','Leader'],
  ['silence-suzuka','Silence Suzuka','サイレンススズカ','Média','Runner'],
  ['grass-wonder','Grass Wonder','グラスワンダー','Média','Betweener'],
  ['el-condor-pasa','El Condor Pasa','エルコンドルパサー','Média','Betweener'],
  ['symboli-rudolf','Symboli Rudolf','シンボリルドルフ','Média','Leader'],
  ['winning-ticket','Winning Ticket','ウイニングチケット','Média','Betweener'],
  ['eishin-flash','Eishin Flash','エイシンフラッシュ','Média','Betweener'],
  ['air-groove','Air Groove','エアグルーヴ','Média','Leader'],
  ['agnes-tachyon','Agnes Tachyon','アグネスタキオン','Média','Betweener'],
  ['tamamo-cross','Tamamo Cross','タマモクロス','Média','Chaser'],
  ['fine-motion','Fine Motion','ファインモーション','Média','Leader'],
  ['mihono-bourbon','Mihono Bourbon','ミホノブルボン','Média','Runner'],
  ['mejiro-ryan','Mejiro Ryan','メジロライアン','Média','Betweener'],
  ['narita-taishin','Narita Taishin','ナリタタイシン','Média','Chaser'],
  ['mejiro-dober','Mejiro Dober','メジロドーベル','Média','Betweener'],
  ['meisho-doto','Meisho Doto','メイショウドトウ','Média','Betweener'],
  ['air-shakur','Air Shakur','エアシャカール','Média','Betweener'],
  ['marvelous-sunday','Marvelous Sunday','マーベラスサンデー','Média','Leader'],
  ['machikane-fukukitaru','Machikane Fukukitaru','マチカネフクキタル','Média','Betweener'],
  ['mejiro-mcqueen','Mejiro McQueen','メジロマックイーン','Longa','Runner'],
  ['gold-ship','Gold Ship','ゴールドシップ','Longa','Chaser'],
  ['tm-opera-o','T.M. Opera O','テイエムオペラオー','Longa','Leader'],
  ['manhattan-cafe','Manhattan Cafe','マンハッタンカフェ','Longa','Chaser'],
  ['rice-shower','Rice Shower','ライスシャワー','Longa','Betweener'],
  ['rice-shower','Rice Shower','ライスシャワー','Longa','Betweener'],
  ['seiun-sky','Seiun Sky','セイウンスカイ','Longa','Runner'],
  ['mayano-top-gun','Mayano Top Gun','マヤノトップガン','Longa','Runner'],
  ['biwa-hayahide','Biwa Hayahide','ビワハヤヒデ','Longa','Leader'],
  ['super-creek','Super Creek','スーパークリーク','Longa','Betweener'],
];

export const PLAYABLE_CHARACTERS: PlayableCharacter[] = RAW.map(([id,name,nameJp,distance,style]) => {
  const matchingKeys = Object.keys(GAME8_ICONS).filter(k => k.startsWith(name));
  
  let allVersions: CharacterVersion[] = [];
  
  if (matchingKeys.length > 0) {
    matchingKeys.forEach((key, idx) => {
      const icons = GAME8_ICONS[key];
      if (icons && icons.length > 0) {
        let versionName = 'Padrão';
        const match = key.match(/\((.*?)\)/);
        if (match) {
          versionName = match[1];
        }
        
        allVersions.push({
          id: `v${idx}`,
          name: versionName,
          iconUrl: icons[0].iconUrl,
          imageUrl: `/assets/characters/${id}.png?v=${idx}`
        });
      }
    });
  }

  if (allVersions.length === 0) {
    allVersions = [
      {
        id: 'base',
        name: 'Padrão',
        iconUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fce7f3&color=db2777&bold=true`,
        imageUrl: `/assets/characters/${id}.png?v=1`
      }
    ];
  }

  return {
    id: `chara-${id}`, name, nameJp, distance, style,
    versions: allVersions,
    scenarioDecks: META_DECKS[`chara-${id}`] || [],
  };
});
