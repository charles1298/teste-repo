import { SUPPORT_CARDS } from './cards';

export interface ScenarioDeck {
  scenario: string;
  cards: string[];
}

export interface PlayableCharacter {
  id: string;
  name: string;
  nameJp: string;
  distance: string;
  style: string;
  imageUrl: string;
  scenarioDecks: ScenarioDeck[];
}

export function getCardById(id: string) {
  return SUPPORT_CARDS.find(c => c.id === id);
}

// Meta deck templates by distance
const SHORT_DECKS: ScenarioDeck[] = [
  { scenario: 'URA Finals', cards: ['uma-30078','uma-30028','uma-30004','uma-30010','uma-30021','uma-30024'] },
  { scenario: 'Aoharu Cup', cards: ['uma-30077','uma-30028','uma-30004','uma-30085','uma-30024','uma-30005'] },
  { scenario: "L'Arc", cards: ['uma-30078','uma-30028','uma-30010','uma-30004','uma-30024','uma-30021'] },
  { scenario: 'Grand Masters', cards: ['uma-30028','uma-30078','uma-30042','uma-30010','uma-30004','uma-30085'] },
  { scenario: 'Deck Econômico', cards: ['uma-20018','uma-20004','uma-20008','uma-20023','uma-20013','uma-30028'] },
];
const MILE_DECKS: ScenarioDeck[] = [
  { scenario: 'URA Finals', cards: ['uma-30078','uma-30028','uma-30010','uma-30024','uma-30021','uma-30016'] },
  { scenario: 'Aoharu Cup', cards: ['uma-30077','uma-30028','uma-30085','uma-30024','uma-30005','uma-30016'] },
  { scenario: "L'Arc", cards: ['uma-30078','uma-30028','uma-30016','uma-30010','uma-30024','uma-30021'] },
  { scenario: 'Grand Masters', cards: ['uma-30028','uma-30078','uma-30010','uma-30042','uma-30016','uma-30085'] },
  { scenario: 'Deck Econômico', cards: ['uma-20004','uma-20008','uma-20023','uma-20019','uma-20028','uma-30028'] },
];
const MED_DECKS: ScenarioDeck[] = [
  { scenario: 'URA Finals', cards: ['uma-30078','uma-30028','uma-30016','uma-30010','uma-30021','uma-30024'] },
  { scenario: 'Aoharu Cup', cards: ['uma-30077','uma-30028','uma-30016','uma-30085','uma-30024','uma-30005'] },
  { scenario: "L'Arc", cards: ['uma-30078','uma-30016','uma-30075','uma-30010','uma-30028','uma-30021'] },
  { scenario: 'Grand Masters', cards: ['uma-30028','uma-30077','uma-30016','uma-30042','uma-30010','uma-30085'] },
  { scenario: 'Deck Econômico', cards: ['uma-20004','uma-20019','uma-20011','uma-20023','uma-20028','uma-30010'] },
];
const LONG_DECKS: ScenarioDeck[] = [
  { scenario: 'URA Finals', cards: ['uma-30078','uma-30028','uma-30016','uma-30075','uma-30021','uma-30010'] },
  { scenario: 'Aoharu Cup', cards: ['uma-30077','uma-30028','uma-30016','uma-30075','uma-30085','uma-30024'] },
  { scenario: "L'Arc", cards: ['uma-30078','uma-30016','uma-30075','uma-30010','uma-30028','uma-30021'] },
  { scenario: 'Grand Masters', cards: ['uma-30028','uma-30016','uma-30075','uma-30042','uma-30010','uma-30085'] },
  { scenario: 'Deck Econômico', cards: ['uma-20019','uma-20010','uma-20015','uma-20023','uma-20027','uma-30016'] },
];

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
  ['seiun-sky','Seiun Sky','セイウンスカイ','Longa','Runner'],
  ['mayano-top-gun','Mayano Top Gun','マヤノトップガン','Longa','Runner'],
  ['biwa-hayahide','Biwa Hayahide','ビワハヤヒデ','Longa','Leader'],
  ['super-creek','Super Creek','スーパークリーク','Longa','Betweener'],
];

const deckMap: Record<string, ScenarioDeck[]> = {
  'Curta': SHORT_DECKS, 'Milha': MILE_DECKS,
  'Média': MED_DECKS, 'Longa': LONG_DECKS,
};

export const PLAYABLE_CHARACTERS: PlayableCharacter[] = RAW.map(([id,name,nameJp,distance,style]) => ({
  id: `chara-${id}`, name, nameJp, distance, style,
  imageUrl: `/assets/characters/${id}.png?v=1`,
  scenarioDecks: deckMap[distance] || MED_DECKS,
}));
