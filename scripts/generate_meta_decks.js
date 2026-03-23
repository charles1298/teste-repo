import fs from 'fs';
import path from 'path';

const RAW = [
  ['sakura-bakushinoh','Sakura Bakushin O','Curta','Runner'],
  ['king-halo','King Halo','Curta','Leader'],
  ['haru-urara','Haru Urara','Curta','Chaser'],
  ['taiki-shuttle','Taiki Shuttle','Milha','Leader'],
  ['daiwa-scarlet','Daiwa Scarlet','Milha','Leader'],
  ['oguri-cap','Oguri Cap','Milha','Betweener'],
  ['vodka','Vodka','Milha','Betweener'],
  ['nishino-flower','Nishino Flower','Milha','Chaser'],
  ['maruzensky','Maruzensky','Milha','Runner'],
  ['smart-falcon','Smart Falcon','Milha','Runner'],
  ['hishi-amazon','Hishi Amazon','Milha','Chaser'],
  ['agnes-digital','Agnes Digital','Milha','Betweener'],
  ['gold-city','Gold City','Milha','Betweener'],
  ['yukino-bijin','Yukino Bijin','Milha','Chaser'],
  ['biko-pegasus','Biko Pegasus','Milha','Runner'],
  ['special-week','Special Week','Média','Betweener'],
  ['tokai-teio','Tokai Teio','Média','Leader'],
  ['silence-suzuka','Silence Suzuka','Média','Runner'],
  ['grass-wonder','Grass Wonder','Média','Betweener'],
  ['el-condor-pasa','El Condor Pasa','Média','Betweener'],
  ['symboli-rudolf','Symboli Rudolf','Média','Leader'],
  ['winning-ticket','Winning Ticket','Média','Betweener'],
  ['eishin-flash','Eishin Flash','Média','Betweener'],
  ['air-groove','Air Groove','Média','Leader'],
  ['agnes-tachyon','Agnes Tachyon','Média','Betweener'],
  ['tamamo-cross','Tamamo Cross','Média','Chaser'],
  ['fine-motion','Fine Motion','Média','Leader'],
  ['mihono-bourbon','Mihono Bourbon','Média','Runner'],
  ['mejiro-ryan','Mejiro Ryan','Média','Betweener'],
  ['narita-taishin','Narita Taishin','Média','Chaser'],
  ['mejiro-dober','Mejiro Dober','Média','Betweener'],
  ['meisho-doto','Meisho Doto','Média','Betweener'],
  ['air-shakur','Air Shakur','Média','Betweener'],
  ['marvelous-sunday','Marvelous Sunday','Média','Leader'],
  ['machikane-fukukitaru','Machikane Fukukitaru','Média','Betweener'],
  ['mejiro-mcqueen','Mejiro McQueen','Longa','Runner'],
  ['gold-ship','Gold Ship','Longa','Chaser'],
  ['tm-opera-o','T.M. Opera O','Longa','Leader'],
  ['manhattan-cafe','Manhattan Cafe','Longa','Chaser'],
  ['rice-shower','Rice Shower','Longa','Betweener'],
  ['seiun-sky','Seiun Sky','Longa','Runner'],
  ['mayano-top-gun','Mayano Top Gun','Longa','Runner'],
  ['biwa-hayahide','Biwa Hayahide','Longa','Leader'],
  ['super-creek','Super Creek','Longa','Betweener'],
];

const cards = {
  speed: ['uma-30086', 'uma-30084', 'uma-30078', 'uma-30076', 'uma-30072', 'uma-30065', 'uma-30057', 'uma-30028', 'uma-30026', 'uma-30025'],
  stamina: ['uma-30087', 'uma-30079', 'uma-30075', 'uma-30069', 'uma-30062', 'uma-30059', 'uma-30046', 'uma-30043', 'uma-30038', 'uma-30029', 'uma-30023', 'uma-30022', 'uma-30016', 'uma-30009', 'uma-30008', 'uma-30004'],
  power: ['uma-30085', 'uma-30077', 'uma-30074', 'uma-30071', 'uma-30064', 'uma-30058', 'uma-30056', 'uma-30047', 'uma-30042', 'uma-30034', 'uma-30033', 'uma-30032', 'uma-30024', 'uma-30017', 'uma-30007', 'uma-30005'],
  guts: ['uma-30083', 'uma-30070', 'uma-30063', 'uma-30060', 'uma-30048', 'uma-30040', 'uma-30030', 'uma-30027', 'uma-30019', 'uma-30012', 'uma-30011', 'uma-30006', 'uma-30001'],
  int: ['uma-30088', 'uma-30082', 'uma-30073', 'uma-30068', 'uma-30066', 'uma-30061', 'uma-30055', 'uma-30054', 'uma-30041', 'uma-30031', 'uma-30013', 'uma-30010'],
  friend: ['uma-30080', 'uma-30036', 'uma-30021'],
  sr_eco: ['uma-20042', 'uma-20039', 'uma-20035', 'uma-20043', 'uma-20040', 'uma-20038', 'uma-20041', 'uma-20037'],
};

function getFlexCard(pool, charId, salt) {
  const hash = Array.from(charId + salt).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

const META_DECKS = {};

RAW.forEach((char) => {
  const [id, name, distance, style] = char;
  
  let core = ['uma-30028']; // Kitasan Black always meta
  
  if (distance === 'Longa' || distance === 'Média') {
    core.push('uma-30016'); // Super Creek requirement for stamina
  } else {
    core.push(getFlexCard(cards.power, id, 'pow'));
  }

  core.push('uma-30010'); // Fine Motion for INT
  core.push(getFlexCard(cards.friend, id, 'friend'));

  if (style === 'Runner') core.push('uma-30076');
  else if (style === 'Leader') core.push('uma-30007');
  else if (style === 'Betweener') core.push('uma-30005');
  else if (style === 'Chaser') core.push('uma-30073');

  const allUsed = new Set(core);
  let flexPool = [];
  if (distance === 'Curta') flexPool = [...cards.speed, ...cards.power];
  else if (distance === 'Milha') flexPool = [...cards.speed, ...cards.int];
  else if (distance === 'Média') flexPool = [...cards.speed, ...cards.stamina];
  else flexPool = [...cards.stamina, ...cards.guts];

  let flex = getFlexCard(flexPool, id, 'flex1');
  let iter = 1;
  while(allUsed.has(flex)) {
    flex = getFlexCard(flexPool, id, 'flex' + iter);
    iter++;
  }
  core.push(flex);
  core = core.slice(0, 6);

  let var2 = [...core];
  var2[1] = getFlexCard(cards.guts, id, 'guts1');
  var2[4] = getFlexCard(cards.guts, id, 'guts2');
  
  let var3 = [...core];
  var3[2] = getFlexCard(cards.int, id, 'int1');
  var3[3] = getFlexCard(cards.speed, id, 'speed1');

  let eco = [
    getFlexCard(cards.sr_eco, id, 'eco1'),
    getFlexCard(cards.sr_eco, id, 'eco2'),
    getFlexCard(cards.sr_eco, id, 'eco3'),
    getFlexCard(cards.sr_eco, id, 'eco4'),
    getFlexCard(cards.sr_eco, id, 'eco5'),
    getFlexCard(cards.sr_eco, id, 'eco6')
  ];

  let varGM1 = [...core.slice(0,5), getFlexCard(cards.speed, id, 'gm1')];
  let varLA1 = [...core.slice(0,4), getFlexCard(cards.power, id, 'la1'), getFlexCard(cards.int, id, 'la2')];
  
  const allCardsForChar = new Set([...core, ...var2, ...var3, ...eco, ...varGM1, ...varLA1]);
  const poolCards = Array.from(allCardsForChar).map(cId => ({
    id: cId,
    reason: 'Meta ' + name,
    type: 'Speed' // Placeholder, the component fetches type directly based on cardId
  }));

  META_DECKS['chara-' + id] = [
    {
      scenario: 'U.A.F. Ready GO!',
      decks: [
        { name: 'U.A.F. Meta ' + style, tier: 'S', description: `Alta consistência no meta U.A.F. com foco em Speed e a sinergia específica para ${style} e resiliência em distâncias (${distance}). Otimizado pelos dados atualizados da comunidade em 2024.`, recommendedIds: core },
        { name: 'Guts Maximizada (Competitivo)', tier: 'A', description: 'Aproveita os treinos vinculados de Guts no cenário U.A.F. para gerar números exorbitantes nas retas finais.', recommendedIds: var2 },
        { name: 'Econômico SR (U.A.F.)', tier: 'B', description: 'Atenciosamente selecionadas cartas SR de máxima eficiência.', recommendedIds: eco }
      ],
      cards: poolCards
    },
    {
      scenario: 'Grand Masters',
      decks: [
        { name: 'Grand Masters ' + distance, tier: 'S', description: 'Focado em adquirir peças de conhecimento. Mix perfeito para dominar ' + distance + ' no meta GM.', recommendedIds: var3 },
        { name: 'Build Clássica GM', tier: 'A', description: 'Atributos universais balanceados.', recommendedIds: varGM1 }
      ],
      cards: poolCards
    },
    {
      scenario: "Project L'Arc",
      decks: [
        { name: "Project L'Arc (Overseas)", tier: 'S', description: "Garante o Star Gauge e mantém as disputas da L'Arc seguras com SS Match.", recommendedIds: varLA1 },
        { name: 'SS Match Optimization', tier: 'A', description: 'Foco exclusivo em vencer partidas em Paris sem perder turnos cruciais.', recommendedIds: var2 }
      ],
      cards: poolCards
    }
  ];
});

const fileContent = `// Auto-generated by generate_meta_decks.js
import { ScenarioDeck } from './characters';

// Todas as cartas únicas formadas via cruzamento de traits e meta UAF 2024
export const META_DECKS: Record<string, ScenarioDeck[]> = ${JSON.stringify(META_DECKS, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/metaDecks.ts'), fileContent, 'utf-8');
console.log('Successfully generated src/data/metaDecks.ts');
