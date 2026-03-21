import { SUPPORT_CARDS } from './cards';
import { GAME8_ICONS } from './game8_icons';

export interface RecommendedCard {
  id: string;
  reason: string;
  type: 'Speed' | 'Stamina' | 'Power' | 'Guts' | 'Intelligence' | 'Friend';
  isAlternative?: boolean;
}

export interface DeckVariation {
  name: string;
  recommendedIds: string[];
}

export interface ScenarioDeck {
  scenario: string;
  decks: DeckVariation[];
  cards: RecommendedCard[];
}

export function getCharacterIconByName(name: string): string {
  const iconInfo = GAME8_ICONS[name];
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

// Meta deck templates by distance
function generateScenarios(
  baseRec: string[], 
  baseEco: string[], 
  cardsPool: RecommendedCard[]
): ScenarioDeck[] {
  const var1 = [...baseRec]; var1[0] = 'uma-30076'; // Aceleração
  const var2 = [...baseRec]; var2[1] = 'uma-30045'; // Foco
  const var3 = [...baseRec]; var3[2] = 'uma-30022'; // Stamina/Recovery
  
  return ['URA Finale', 'Unity Cup', 'Trackblazer'].map(scenario => ({
    scenario,
    decks: [
      { name: 'Deck Recomendado', recommendedIds: baseRec },
      { name: 'Deck Econômico', recommendedIds: baseEco },
      { name: 'Variação 1 (Meta Speed)', recommendedIds: var1 },
      { name: 'Variação 2 (Meta Guts)', recommendedIds: var2 },
      { name: 'Variação 3 (Meta Stamina)', recommendedIds: var3 },
    ],
    cards: cardsPool
  }));
}

const SHORT_POOL: RecommendedCard[] = [
  { id: 'uma-30078', type: 'Speed', reason: 'Vel. Elite' },
  { id: 'uma-30028', type: 'Speed', reason: 'Bônus' },
  { id: 'uma-30020', type: 'Speed', reason: 'Acel. S.' },
  { id: 'uma-30016', type: 'Stamina', reason: 'Resis.' },
  { id: 'uma-30007', type: 'Power', reason: 'Força' },
  { id: 'uma-30010', type: 'Intelligence', reason: 'Visão' },
  { id: 'uma-20018', type: 'Speed', reason: 'SR Alta' },
  { id: 'uma-20004', type: 'Speed', reason: 'Efic. SR' },
  { id: 'uma-20039', type: 'Speed', reason: 'Rápido' },
  { id: 'uma-20019', type: 'Stamina', reason: 'SR Stamina' },
  { id: 'uma-20002', type: 'Power', reason: 'SR Força' },
  { id: 'uma-20011', type: 'Intelligence', reason: 'Int. SR' },
  { id: 'uma-30076', type: 'Speed', reason: 'Aceleração' },
  { id: 'uma-30045', type: 'Speed', reason: 'Sweep' },
  { id: 'uma-30022', type: 'Stamina', reason: 'McQueen' }
];

const MILE_POOL: RecommendedCard[] = [
  ...SHORT_POOL
];

const MED_POOL: RecommendedCard[] = [
  ...SHORT_POOL
];

const LONG_POOL: RecommendedCard[] = [
  ...SHORT_POOL
];

const SHORT_DECKS = generateScenarios(
  ['uma-30078', 'uma-30028', 'uma-30020', 'uma-30016', 'uma-30007', 'uma-30010'],
  ['uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20002', 'uma-20011'],
  SHORT_POOL
);

const MILE_DECKS = generateScenarios(
  ['uma-30028', 'uma-30086', 'uma-30020', 'uma-30016', 'uma-30017', 'uma-30010'],
  ['uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20002', 'uma-20011'],
  MILE_POOL
);

const MED_DECKS = generateScenarios(
  ['uma-30028', 'uma-30086', 'uma-30016', 'uma-30029', 'uma-30024', 'uma-30010'],
  ['uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20002', 'uma-20011'],
  MED_POOL
);

const LONG_DECKS = generateScenarios(
  ['uma-30028', 'uma-30086', 'uma-30016', 'uma-30062', 'uma-30034', 'uma-30010'],
  ['uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20002', 'uma-20011'],
  LONG_POOL
);

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

const deckMap: Record<string, ScenarioDeck[]> = {
  'Curta': SHORT_DECKS, 'Milha': MILE_DECKS,
  'Média': MED_DECKS, 'Longa': LONG_DECKS,
};

export const PLAYABLE_CHARACTERS: PlayableCharacter[] = RAW.map(([id,name,nameJp,distance,style]) => {
  const charIcons = GAME8_ICONS[name] || [];

  const versions: CharacterVersion[] = charIcons.length > 0 ? charIcons.map((icon, i) => ({
    id: icon.id || `v${i}`,
    name: icon.name,
    iconUrl: icon.iconUrl,
    imageUrl: `/assets/characters/${id}.png?v=${i}`
  })) : [
    {
      id: 'base',
      name: 'Padrão',
      iconUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fce7f3&color=db2777&bold=true`,
      imageUrl: `/assets/characters/${id}.png?v=1`
    }
  ];

  return {
    id: `chara-${id}`, name, nameJp, distance, style,
    versions,
    scenarioDecks: deckMap[distance] || MED_DECKS,
  };
});
