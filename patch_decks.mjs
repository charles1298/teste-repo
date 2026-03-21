import fs from 'fs';

let content = fs.readFileSync('src/data/characters.ts', 'utf-8');

const regex1 = /export interface ScenarioDeck \{[\s\S]*?cards: RecommendedCard\[\];\s+\}/;

const replace1 = `export interface DeckVariation {
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
  return \`https://ui-avatars.com/api/?name=\${encodeURIComponent(name)}&background=fce7f3&color=db2777&bold=true\`;
}`;

content = content.replace(regex1, replace1);

const regex2 = /\/\/ Meta deck templates by distance[\s\S]*?(?=type CharDef = \[string, string, string, string, string\];)/;

const replace2 = `// Meta deck templates by distance
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

`;

content = content.replace(regex2, replace2);

fs.writeFileSync('src/data/characters.ts', content);
console.log('Finished updating characters.ts');
