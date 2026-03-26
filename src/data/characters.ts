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

function normalizeName(name: string): string {
  return name.toLowerCase()
    .replace(/\./g, '') // Remove dots (e.g., T.M. Opera O -> tmoperao)
    .replace(/[^a-z0-9]/g, '')
    .replace('machikane', 'matikane');
}

export function getCharacterIconByName(name: string): string {
  const norm = normalizeName(name);
  
  // Try exact match first
  let iconInfo = GAME8_ICONS[name];
  
  // Try normalized match
  if (!iconInfo) {
    const key = Object.keys(GAME8_ICONS).find(k => normalizeName(k) === norm || normalizeName(k).startsWith(norm));
    if (key) iconInfo = GAME8_ICONS[key];
  }

  // Manual fallback for specific known missing ones
  if (!iconInfo && MANUAL_ICONS[name]) {
    return MANUAL_ICONS[name];
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

export interface RunningStyleDetails {
  statsPriority: string[];
  reasoning: string;
}

export interface PlayableCharacter {
  id: string;
  name: string;
  nameJp: string;
  distance: string;
  style: string;
  versions: CharacterVersion[];
  scenarioDecks: ScenarioDeck[];
  runningStyleDetails?: RunningStyleDetails;
}

export function getCardById(id: string) {
  return SUPPORT_CARDS.find(c => c.id === id);
}

// Special manual mapping for missing characters found on Game8
const MANUAL_ICONS: Record<string, string> = {
  'Nishino Flower': 'https://img.game8.jp/6725788/81ad8ad6c44c54bb02f6ca96a5f5e913.png/show',
  'Biko Pegasus': 'https://img.game8.jp/9547859/d2c0f7e90f3f4601a293545c082466a8.png/show',
  'Yukino Bijin': 'https://img.game8.jp/7215139/eb2c21cbde8117c1ec529df5e37c6565.png/show'
};

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
  ['mejiro-dober','Mejiro Dober','メジroドーベル','Média','Betweener'],
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

const STYLE_DATA: Record<string, RunningStyleDetails> = {
  'Sakura Bakushin O': {
    statsPriority: ['Speed', 'Intelligence', 'Power'],
    reasoning: 'Sendo uma velocista nata, Bakushin O deve focar totalmente em Speed e Intelligence para dominar como Front Runner desde o início.'
  },
  'Tokai Teio': {
    statsPriority: ['Speed', 'Power', 'Stamina'],
    reasoning: 'Com sua agilidade lateral, Teio brilha como Leader, precisando de Power para se posicionar e Speed para a reta final.'
  },
  'Silence Suzuka': {
    statsPriority: ['Speed', 'Intelligence', 'Stamina'],
    reasoning: 'A "Silêncio do Paddock" exige Speed máxima e Intelligence para manter o fôlego na liderança isolada.'
  },
  'Gold Ship': {
    statsPriority: ['Stamina', 'Power', 'Guts'],
    reasoning: 'Como Chaser, Gold Ship precisa de Stamina e Power massivos para realizar sua famosa ultrapassagem na última curva.'
  },
  'Mejiro McQueen': {
    statsPriority: ['Stamina', 'Speed', 'Intelligence'],
    reasoning: 'Uma especialista em longa distância que combina Stamina de ferro com a elegância de uma Runner/Leader.'
  },
  'Rice Shower': {
    statsPriority: ['Stamina', 'Power', 'Guts'],
    reasoning: 'Focada em resistência extrema e força para superar as subidas e dominar em distâncias longas.'
  },
  'Oguri Cap': {
    statsPriority: ['Speed', 'Power', 'Intelligence'],
    reasoning: 'Extremamente versátil, Oguri usa seu Power para se infiltrar entre os corredores e Speed para finalizar como Betweener.'
  },
  'Special Week': {
    statsPriority: ['Speed', 'Stamina', 'Power'],
    reasoning: 'Uma all-rounder clássica que equilibra Speed e Stamina para brilhar em distâncias médias como Betweener.'
  },
  'Daiwa Scarlet': {
    statsPriority: ['Speed', 'Intelligence', 'Stamina'],
    reasoning: 'Brilha como Leader/Runner; use Intelligence para garantir que suas habilidades de controle de ritmo ativem no momento certo.'
  },
  'Vodka': {
    statsPriority: ['Speed', 'Power', 'Stamina'],
    reasoning: 'Focada em Power bruto para furar bloqueios em milhas e Speed para fechar a corrida com força.'
  },
  'Maruzensky': {
    statsPriority: ['Speed', 'Intelligence', 'Power'],
    reasoning: 'A "Rainha das Milhas" precisa de Speed máxima; sua versatilidade permite dominar como Runner em quase qualquer pista curta/milha.'
  },
  'King Halo': {
    statsPriority: ['Speed', 'Power', 'Intelligence'],
    reasoning: 'Uma Leader técnica que necessita de Power para se manter competitiva nas retas de curta distância.'
  },
  'Haru Urara': {
    statsPriority: ['Speed', 'Power', 'Guts'],
    reasoning: 'A pequena guerreira compensa a falta de Stamina com Guts e muito Power para sprints em terra firme (Dirt).'
  },
  'Taiki Shuttle': {
    statsPriority: ['Speed', 'Power', 'Intelligence'],
    reasoning: 'Dominante em Milhas; seu foco em Power permite uma aceleração explosiva na saída das curvas.'
  },
  'Grass Wonder': {
    statsPriority: ['Speed', 'Power', 'Stamina'],
    reasoning: 'Como Betweener, Grass Wonder usa seu Power para se posicionar estrategicamente antes da reta final.'
  }
};

export const PLAYABLE_CHARACTERS: PlayableCharacter[] = RAW.map(([id,name,nameJp,distance,style]) => {
  const norm = normalizeName(name);
  const matchingKeys = Object.keys(GAME8_ICONS).filter(k => {
    const kNorm = normalizeName(k);
    return kNorm === norm || kNorm.startsWith(norm);
  });
  
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
        
        // Use high-res version of the icon for the main card image if it contains /show
        const iconUrl = icons[0].iconUrl;
        const highResImageUrl = iconUrl.includes('/show') 
          ? iconUrl.replace('/show', '/original') 
          : iconUrl;
        
        allVersions.push({
          id: `v${idx}`,
          name: versionName,
          iconUrl: icons[0].iconUrl,
          imageUrl: highResImageUrl
        });
      }
    });
  }

  // Add manual mapping for versions if missing from repository
  if (allVersions.length === 0 && MANUAL_ICONS[name]) {
    const iconUrl = MANUAL_ICONS[name];
    allVersions.push({
      id: 'base-manual',
      name: 'Padrão',
      iconUrl: iconUrl,
      imageUrl: iconUrl.includes('/show') ? iconUrl.replace('/show', '/original') : iconUrl
    });
  }

  // Ultimate fallback
  if (allVersions.length === 0) {
    allVersions = [
      {
        id: 'base',
        name: 'Padrão',
        iconUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fce7f3&color=db2777&bold=true`,
        imageUrl: `https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Uma_Musume_Pretty_Derby_logo.png/400px-Uma_Musume_Pretty_Derby_logo.png`
      }
    ];
  }

  return {
    id: `chara-${id}`, name, nameJp, distance, style,
    versions: allVersions,
    scenarioDecks: META_DECKS[`chara-${id}`] || [],
    runningStyleDetails: STYLE_DATA[name]
  };
});
