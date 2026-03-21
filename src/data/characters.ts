import { SUPPORT_CARDS } from './cards';

export interface RecommendedCard {
  id: string;
  reason: string;
  type: 'Speed' | 'Stamina' | 'Power' | 'Guts' | 'Intelligence' | 'Friend';
  isAlternative?: boolean;
}

export interface ScenarioDeck {
  scenario: string;
  recommendedIds: string[];
  cards: RecommendedCard[];
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
const SHORT_DECKS: ScenarioDeck[] = [
  { 
    scenario: 'URA Finals', 
    recommendedIds: ['uma-30078', 'uma-30028', 'uma-30020', 'uma-30016', 'uma-30007', 'uma-30010'],
    cards: [
      { id: 'uma-30078', type: 'Speed', reason: 'Velocidade Elite' },
      { id: 'uma-30028', type: 'Speed', reason: 'Bônus de Treino' },
      { id: 'uma-30020', type: 'Speed', reason: 'Aceleração S.' },
      { id: 'uma-30016', type: 'Stamina', reason: 'Resistência Nec.' },
      { id: 'uma-30004', type: 'Stamina', reason: 'Cura Básica' },
      { id: 'uma-30075', type: 'Stamina', reason: 'Suporte de Energia' },
      { id: 'uma-30007', type: 'Power', reason: 'Força de Arrancada' },
      { id: 'uma-30024', type: 'Power', reason: 'Poder de Curta' },
      { id: 'uma-30085', type: 'Power', reason: 'Finalização' },
      { id: 'uma-30077', type: 'Guts', reason: 'Persistência' },
      { id: 'uma-30063', type: 'Guts', reason: 'Ganho de Guts' },
      { id: 'uma-30060', type: 'Guts', reason: 'Energia Extra' },
      { id: 'uma-30010', type: 'Intelligence', reason: 'Visão de Pista' },
      { id: 'uma-30054', type: 'Intelligence', reason: 'Tática de Curta' },
      { id: 'uma-30082', type: 'Intelligence', reason: 'Estratégia' },
      { id: 'uma-30021', type: 'Friend', reason: 'Suporte Flex' },
      { id: 'uma-30036', type: 'Friend', reason: 'Treino Urbano' },
      { id: 'uma-30080', type: 'Friend', reason: 'Dica Especial' }
    ]
  },
  { 
    scenario: 'Deck Econômico', 
    recommendedIds: ['uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20002', 'uma-20011'],
    cards: [
      { id: 'uma-20018', type: 'Speed', reason: 'SR Vel. Alta' },
      { id: 'uma-20004', type: 'Speed', reason: 'Eficiência SR' },
      { id: 'uma-20039', type: 'Speed', reason: 'Ganho Rápido' },
      { id: 'uma-20019', type: 'Stamina', reason: 'SR Stamina' },
      { id: 'uma-20035', type: 'Stamina', reason: 'Cura Acessível' },
      { id: 'uma-20040', type: 'Stamina', reason: 'Básico Longa' },
      { id: 'uma-20002', type: 'Power', reason: 'SR de Força' },
      { id: 'uma-20043', type: 'Power', reason: 'Poder SR' },
      { id: 'uma-20037', type: 'Power', reason: 'Força Extra' },
      { id: 'uma-20041', type: 'Guts', reason: 'Guts Econômico' },
      { id: 'uma-20006', type: 'Guts', reason: 'Persistência SR' },
      { id: 'uma-20038', type: 'Guts', reason: 'Resistência SR' },
      { id: 'uma-20011', type: 'Intelligence', reason: 'Inteligência SR' },
      { id: 'uma-20034', type: 'Intelligence', reason: 'Estudo SR' },
      { id: 'uma-20023', type: 'Intelligence', reason: 'Dica SR' },
      { id: 'uma-30021', type: 'Friend', reason: 'Amigo Versátil' },
      { id: 'uma-20020', type: 'Friend', reason: 'Suporte SR' },
      { id: 'uma-30036', type: 'Friend', reason: 'Alternativa SSR' }
    ]
  },
];

const MILE_DECKS: ScenarioDeck[] = [
  { 
    scenario: 'Grand Masters', 
    recommendedIds: ['uma-30028', 'uma-30086', 'uma-30020', 'uma-30016', 'uma-30017', 'uma-30010'],
    cards: [
      { id: 'uma-30028', type: 'Speed', reason: 'Velocidade Abs.' },
      { id: 'uma-30086', type: 'Speed', reason: 'Peachy Meta' },
      { id: 'uma-30020', type: 'Speed', reason: 'Bônus de Vel.' },
      { id: 'uma-30016', type: 'Stamina', reason: 'Cura Mestra' },
      { id: 'uma-30062', type: 'Stamina', reason: 'Energia Milha' },
      { id: 'uma-30075', type: 'Stamina', reason: 'Recuperação' },
      { id: 'uma-30017', type: 'Power', reason: 'Força Explosiva' },
      { id: 'uma-30024', type: 'Power', reason: 'Meta Power' },
      { id: 'uma-30007', type: 'Power', reason: 'Empurrão' },
      { id: 'uma-30063', type: 'Guts', reason: 'Garra de Milha' },
      { id: 'uma-30077', type: 'Guts', reason: 'Foco em Guts' },
      { id: 'uma-30019', type: 'Guts', reason: 'Energia SR+' },
      { id: 'uma-30010', type: 'Intelligence', reason: 'Gênio de Milha' },
      { id: 'uma-30054', type: 'Intelligence', reason: 'Estratégia Meta' },
      { id: 'uma-30041', type: 'Intelligence', reason: 'Análise' },
      { id: 'uma-30036', type: 'Friend', reason: 'Meta Friend' },
      { id: 'uma-30021', type: 'Friend', reason: 'Clássico' },
      { id: 'uma-30080', type: 'Friend', reason: 'Suporte' }
    ]
  },
  { 
    scenario: 'Deck Econômico', 
    recommendedIds: ['uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20002', 'uma-20011'],
    cards: [
      { id: 'uma-20018', type: 'Speed', reason: 'SR Vel. Alta' },
      { id: 'uma-20004', type: 'Speed', reason: 'Eficiência SR' },
      { id: 'uma-20039', type: 'Speed', reason: 'Ganho Rápido' },
      { id: 'uma-20019', type: 'Stamina', reason: 'SR Stamina' },
      { id: 'uma-20035', type: 'Stamina', reason: 'Cura Acessível' },
      { id: 'uma-20040', type: 'Stamina', reason: 'Básico Longa' },
      { id: 'uma-20002', type: 'Power', reason: 'SR de Força' },
      { id: 'uma-20043', type: 'Power', reason: 'Poder SR' },
      { id: 'uma-20037', type: 'Power', reason: 'Força Extra' },
      { id: 'uma-20041', type: 'Guts', reason: 'Guts Econômico' },
      { id: 'uma-20006', type: 'Guts', reason: 'Persistência SR' },
      { id: 'uma-20038', type: 'Guts', reason: 'Resistência SR' },
      { id: 'uma-20011', type: 'Intelligence', reason: 'Inteligência SR' },
      { id: 'uma-20034', type: 'Intelligence', reason: 'Estudo SR' },
      { id: 'uma-20023', type: 'Intelligence', reason: 'Dica SR' },
      { id: 'uma-30021', type: 'Friend', reason: 'Amigo Versátil' },
      { id: 'uma-20020', type: 'Friend', reason: 'Suporte SR' },
      { id: 'uma-30036', type: 'Friend', reason: 'Alternativa SSR' }
    ]
  },
];

const MED_DECKS: ScenarioDeck[] = [
  { 
    scenario: "L'Arc", 
    recommendedIds: ['uma-30028', 'uma-30086', 'uma-30016', 'uma-30029', 'uma-30024', 'uma-30010'],
    cards: [
      { id: 'uma-30028', type: 'Speed', reason: 'Velocidade Nec.' },
      { id: 'uma-30086', type: 'Speed', reason: 'Estágio Final' },
      { id: 'uma-30078', type: 'Speed', reason: 'Aceleração Meta' },
      { id: 'uma-30016', type: 'Stamina', reason: 'Resistência Média' },
      { id: 'uma-30029', type: 'Stamina', reason: 'Cura Estratégica' },
      { id: 'uma-30008', type: 'Stamina', reason: 'Vigor' },
      { id: 'uma-30058', type: 'Power', reason: 'Força Média' },
      { id: 'uma-30024', type: 'Power', reason: 'Poder Meta' },
      { id: 'uma-30007', type: 'Power', reason: 'Arrancada' },
      { id: 'uma-30063', type: 'Guts', reason: 'Guts Média' },
      { id: 'uma-30012', type: 'Guts', reason: 'Resiliência' },
      { id: 'uma-30083', type: 'Guts', reason: 'Suporte Novo' },
      { id: 'uma-30010', type: 'Intelligence', reason: 'Gênio Média' },
      { id: 'uma-30088', type: 'Intelligence', reason: 'Visão Global' },
      { id: 'uma-30054', type: 'Intelligence', reason: 'Consistência' },
      { id: 'uma-30036', type: 'Friend', reason: 'Melhor Amigo' },
      { id: 'uma-30021', type: 'Friend', reason: 'Treino' },
      { id: 'uma-30080', type: 'Friend', reason: 'Dica' }
    ]
  },
  { 
    scenario: 'Deck Econômico', 
    recommendedIds: ['uma-20018', 'uma-20019', 'uma-20002', 'uma-20011', 'uma-20023', 'uma-20020'],
    cards: [
      { id: 'uma-20018', type: 'Speed', reason: 'SR Vel. Alta' },
      { id: 'uma-20004', type: 'Speed', reason: 'Eficiência SR' },
      { id: 'uma-20039', type: 'Speed', reason: 'Ganho Rápido' },
      { id: 'uma-20019', type: 'Stamina', reason: 'SR Stamina' },
      { id: 'uma-20035', type: 'Stamina', reason: 'Cura Acessível' },
      { id: 'uma-20040', type: 'Stamina', reason: 'Básico Longa' },
      { id: 'uma-20002', type: 'Power', reason: 'SR de Força' },
      { id: 'uma-20043', type: 'Power', reason: 'Poder SR' },
      { id: 'uma-20037', type: 'Power', reason: 'Força Extra' },
      { id: 'uma-20041', type: 'Guts', reason: 'Guts Econômico' },
      { id: 'uma-20006', type: 'Guts', reason: 'Persistência SR' },
      { id: 'uma-20038', type: 'Guts', reason: 'Resistência SR' },
      { id: 'uma-20011', type: 'Intelligence', reason: 'Inteligência SR' },
      { id: 'uma-20034', type: 'Intelligence', reason: 'Estudo SR' },
      { id: 'uma-20023', type: 'Intelligence', reason: 'Dica SR' },
      { id: 'uma-30021', type: 'Friend', reason: 'Amigo Versátil' },
      { id: 'uma-20020', type: 'Friend', reason: 'Suporte SR' },
      { id: 'uma-30036', type: 'Friend', reason: 'Alternativa SSR' }
    ]
  },
];

const LONG_DECKS: ScenarioDeck[] = [
  { 
    scenario: 'Grand Masters', 
    recommendedIds: ['uma-30028', 'uma-30086', 'uma-30016', 'uma-30062', 'uma-30034', 'uma-30010'],
    cards: [
      { id: 'uma-30028', type: 'Speed', reason: 'Velocidade Crucial' },
      { id: 'uma-30086', type: 'Speed', reason: 'Sprint Final' },
      { id: 'uma-30076', type: 'Speed', reason: 'Aceleração' },
      { id: 'uma-30016', type: 'Stamina', reason: 'Resistência Longa' },
      { id: 'uma-30062', type: 'Stamina', reason: 'Cura Absoluta' },
      { id: 'uma-30018', type: 'Stamina', reason: 'Vigor Máximo' },
      { id: 'uma-30034', type: 'Power', reason: 'Força Longa' },
      { id: 'uma-30024', type: 'Power', reason: 'Poder Meta' },
      { id: 'uma-30007', type: 'Power', reason: 'Arrancada' },
      { id: 'uma-30063', type: 'Guts', reason: 'Guts Longa' },
      { id: 'uma-30019', type: 'Guts', reason: 'Resiliência' },
      { id: 'uma-30011', type: 'Guts', reason: 'Persistência' },
      { id: 'uma-30010', type: 'Intelligence', reason: 'Gênio Longa' },
      { id: 'uma-30088', type: 'Intelligence', reason: 'Estratégia' },
      { id: 'uma-30054', type: 'Intelligence', reason: 'Consistência' },
      { id: 'uma-30036', type: 'Friend', reason: 'Guia' },
      { id: 'uma-30021', type: 'Friend', reason: 'Mestre' },
      { id: 'uma-30080', type: 'Friend', reason: 'Extra' }
    ]
  },
  { 
    scenario: 'Deck Econômico', 
    recommendedIds: ['uma-20018', 'uma-20019', 'uma-20010', 'uma-20015', 'uma-20011', 'uma-20023'],
    cards: [
      { id: 'uma-20018', type: 'Speed', reason: 'SR Vel. Alta' },
      { id: 'uma-20004', type: 'Speed', reason: 'Eficiência SR' },
      { id: 'uma-20039', type: 'Speed', reason: 'Ganho Rápido' },
      { id: 'uma-20019', type: 'Stamina', reason: 'SR Stamina' },
      { id: 'uma-20035', type: 'Stamina', reason: 'Cura Acessível' },
      { id: 'uma-20040', type: 'Stamina', reason: 'Básico Longa' },
      { id: 'uma-20002', type: 'Power', reason: 'SR de Força' },
      { id: 'uma-20043', type: 'Power', reason: 'Poder SR' },
      { id: 'uma-20037', type: 'Power', reason: 'Força Extra' },
      { id: 'uma-20041', type: 'Guts', reason: 'Guts Econômico' },
      { id: 'uma-20006', type: 'Guts', reason: 'Persistência SR' },
      { id: 'uma-20038', type: 'Guts', reason: 'Resistência SR' },
      { id: 'uma-20011', type: 'Intelligence', reason: 'Inteligência SR' },
      { id: 'uma-20034', type: 'Intelligence', reason: 'Estudo SR' },
      { id: 'uma-20023', type: 'Intelligence', reason: 'Dica SR' },
      { id: 'uma-30021', type: 'Friend', reason: 'Amigo Versátil' },
      { id: 'uma-20020', type: 'Friend', reason: 'Suporte SR' },
      { id: 'uma-30036', type: 'Friend', reason: 'Alternativa SSR' }
    ]
  },
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

export const PLAYABLE_CHARACTERS: PlayableCharacter[] = RAW.map(([id,name,nameJp,distance,style], index) => {
  // Mock some variations. E.g. every 3rd gets a Christmas version, every 5th a Summer version.
  const hasChristmas = index % 3 === 0;
  const hasSummer = index % 5 === 0;

  const versions: CharacterVersion[] = [
    {
      id: 'base',
      name: 'Padrão',
      iconUrl: `/assets/icons/char-${id}.png`,
      imageUrl: `/assets/characters/${id}.png?v=1`
    }
  ];

  if (hasChristmas) {
    versions.push({
      id: 'event-christmas',
      name: 'Natal',
      iconUrl: `/assets/icons/char-${id}-xmas.png`,
      imageUrl: `/assets/characters/${id}.png?variant=xmas` // We reuse base image as mock
    });
  }

  if (hasSummer) {
    versions.push({
      id: 'event-summer',
      name: 'Verão',
      iconUrl: `/assets/icons/char-${id}-summer.png`,
      imageUrl: `/assets/characters/${id}.png?variant=summer`
    });
  }

  // If no mocks added, add a generic alternate version.
  if (versions.length === 1) {
    versions.push({
      id: 'event-gala',
      name: 'Gala',
      iconUrl: `/assets/icons/char-${id}-gala.png`,
      imageUrl: `/assets/characters/${id}.png?variant=gala`
    });
  }

  return {
    id: `chara-${id}`, name, nameJp, distance, style,
    versions,
    scenarioDecks: deckMap[distance] || MED_DECKS,
  };
});
