import { SUPPORT_CARDS } from './cards';

export interface RecommendedCard {
  id: string;
  reason: string;
  isAlternative?: boolean;
}

export interface ScenarioDeck {
  scenario: string;
  cards: RecommendedCard[];
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
  { scenario: 'URA Finals', cards: [
    { id: 'uma-30078', reason: 'Velocidade Elite' },
    { id: 'uma-30028', reason: 'Bônus de Treino' },
    { id: 'uma-30004', reason: 'Habilidade de Sprint' },
    { id: 'uma-30010', reason: 'Ganho de Skill Points' },
    { id: 'uma-30021', reason: 'Suporte Flexível' },
    { id: 'uma-30013', reason: 'Poder de Curta' },
    { id: 'uma-30024', reason: 'Meta Speed', isAlternative: true },
    { id: 'uma-30005', reason: 'Opção de Agilidade', isAlternative: true }
  ]},
  { scenario: 'Aoharu Cup', cards: [
    { id: 'uma-30077', reason: 'Sinergia de Time' },
    { id: 'uma-30028', reason: 'Bônus Estatístico' },
    { id: 'uma-30004', reason: 'Potência de Curta' },
    { id: 'uma-30085', reason: 'Skill Arrojada' },
    { id: 'uma-30024', reason: 'Aceleração Meta' },
    { id: 'uma-30016', reason: 'Recuperação Est' },
    { id: 'uma-30005', reason: 'Velocidade Máxima', isAlternative: true },
    { id: 'uma-30016', reason: 'Suporte de Energia', isAlternative: true }
  ]},
  { scenario: 'Deck Econômico', cards: [
    { id: 'uma-20018', reason: 'Baixo Custo / Alta Vel' },
    { id: 'uma-20004', reason: 'Eficiência de SR' },
    { id: 'uma-20008', reason: 'Básico Curta Distância' },
    { id: 'uma-20023', reason: 'Fácil de Maximizar' },
    { id: 'uma-20013', reason: 'Bônus de Evento' },
    { id: 'uma-20003', reason: 'Suporte SR Versátil' },
    { id: 'uma-30028', reason: 'Coringa SSR Ativo', isAlternative: true }
  ]},
];

const MILE_DECKS: ScenarioDeck[] = [
  { scenario: 'Grand Masters', cards: [
    { id: 'uma-30028', reason: 'Velocidade Absoluta' },
    { id: 'uma-30078', reason: 'Poder de Ultrapassagem' },
    { id: 'uma-30010', reason: 'Estamina Equilibrada' },
    { id: 'uma-30042', reason: 'Habilidades Chave' },
    { id: 'uma-30016', reason: 'Recuperação de Fadiga' },
    { id: 'uma-30075', reason: 'Força de Milha' },
    { id: 'uma-30085', reason: 'Finalização Forte', isAlternative: true }
  ]},
  { scenario: 'Deck Econômico', cards: [
    { id: 'uma-20004', reason: 'SR de Alta Performance' },
    { id: 'uma-20008', reason: 'Milha Básica' },
    { id: 'uma-20023', reason: 'Bônus de Amizade' },
    { id: 'uma-20019', reason: 'Energia Sustentada' },
    { id: 'uma-20028', reason: 'Habilidade de Milha' },
    { id: 'uma-20011', reason: 'SR de Inteligência' },
    { id: 'uma-30028', reason: 'Peça Central SSR', isAlternative: true }
  ]},
];

const MED_DECKS: ScenarioDeck[] = [
  { scenario: "L'Arc", cards: [
    { id: 'uma-30078', reason: 'Meta de Velocidade' },
    { id: 'uma-30016', reason: 'Cura de Estamina' },
    { id: 'uma-30075', reason: 'Habilidade Média' },
    { id: 'uma-30010', reason: 'Equilíbrio Total' },
    { id: 'uma-30028', reason: 'Bônus Global' },
    { id: 'uma-30058', reason: 'Poder Técnico' },
    { id: 'uma-30021', reason: 'Suporte Versátil', isAlternative: true },
    { id: 'uma-30024', reason: 'Alternativa de Força', isAlternative: true }
  ]},
  { scenario: 'Deck Econômico', cards: [
    { id: 'uma-20004', reason: 'Melhor SR de Vel' },
    { id: 'uma-20019', reason: 'Estamina Barata/Boa' },
    { id: 'uma-20011', reason: 'Bônus de Inteligência' },
    { id: 'uma-20023', reason: 'Fácil de Usar' },
    { id: 'uma-20028', reason: 'Skill de Distância' },
    { id: 'uma-20027', reason: 'Equilíbrio SR' },
    { id: 'uma-30010', reason: 'SSR Acessível', isAlternative: true }
  ]},
];

const LONG_DECKS: ScenarioDeck[] = [
  { scenario: 'Grand Masters', cards: [
    { id: 'uma-30028', reason: 'Velocidade Nec.' },
    { id: 'uma-30016', reason: 'Cura Mestra' },
    { id: 'uma-30075', reason: 'Potência em Longa' },
    { id: 'uma-30042', reason: 'Skill de Vitória' },
    { id: 'uma-30010', reason: 'Resistência Máxima' },
    { id: 'uma-30018', reason: 'Meta Energia' },
    { id: 'uma-30085', reason: 'Suporte de Força', isAlternative: true }
  ]},
  { scenario: 'Deck Econômico', cards: [
    { id: 'uma-20019', reason: 'Estamina Indispensável' },
    { id: 'uma-20010', reason: 'Bônus de Longa' },
    { id: 'uma-20015', reason: 'Recuperação SR' },
    { id: 'uma-20023', reason: 'Ganhos Constantes' },
    { id: 'uma-20027', reason: 'Habilidade Defensiva' },
    { id: 'uma-20011', reason: 'Inteligência SR' },
    { id: 'uma-30016', reason: 'Cura SSR Essencial', isAlternative: true }
  ]},
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
