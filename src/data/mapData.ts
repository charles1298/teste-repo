export type MarkerType = 'Loot' | 'Schematic' | 'Extraction' | 'Danger' | 'Boss';

export interface MapMarker {
  id: string;
  name: string;
  type: MarkerType;
  coordinates: [number, number]; // [lat, lng] relative to image bounds
  description: string;
  items?: string[]; // Possible items found here
}

export interface GameMap {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor: string; // Unique color per map
  markers: MapMarker[];
}

export const GAME_MAPS: GameMap[] = [
  // ======================== DAM BATTLEGROUNDS ========================
  {
    id: 'dam-battlegrounds',
    name: 'Campo de Batalha da Represa',
    subtitle: 'Usina Elétrica de Alcântara',
    description: 'Uma paisagem tóxica e alagada ao redor de uma imensa represa hidrelétrica. Amigável para iniciantes, com terreno aberto e saques acessíveis.',
    imageUrl: '/maps/dam_battlegrounds.png',
    accentColor: '#2dd4bf', // teal
    markers: [
      {
        id: 'dam-ext-01',
        name: 'Extração Alpha',
        type: 'Extraction',
        coordinates: [85, 15],
        description: 'Ponto de extração principal próximo ao muro da represa. Alto tráfego de jogadores nos minutos finais.',
      },
      {
        id: 'dam-ext-02',
        name: 'Extração Bravo',
        type: 'Extraction',
        coordinates: [12, 75],
        description: 'Extração secundária a sudeste. Mais segura, mas o tempo de chegada da nave é maior.',
      },
      {
        id: 'dam-loot-01',
        name: 'Torre de Controle',
        type: 'Loot',
        coordinates: [65, 40],
        description: 'Estrutura alta com vista panorâmica para a represa. Múltiplas caixas de armas e suprimentos médicos nos andares superiores.',
        items: ['Caixas de Armas', 'Kits Médicos', 'Células de Energia ARC'],
      },
      {
        id: 'dam-loot-02',
        name: 'Complexo de Cúpulas Hidropônicas',
        type: 'Loot',
        coordinates: [50, 70],
        description: 'Estufas hidropônicas com saques de alto nível e melhorias Scrappy. Múltiplos pontos de entrada.',
        items: ['Melhorias Scrappy', 'Materiais de Criação', 'Bugigangas'],
      },
      {
        id: 'dam-loot-03',
        name: 'Prédio de Pesquisa e Administração',
        type: 'Loot',
        coordinates: [40, 30],
        description: 'Prédio de dois andares com componentes tecnológicos e peças de armamento. Costuma ter armários vermelhos.',
        items: ['Peças de Armas', 'Componentes Eletrônicos', 'Baterias'],
      },
      {
        id: 'dam-schem-01',
        name: 'Complexo de Geração de Energia',
        type: 'Schematic',
        coordinates: [30, 55],
        description: 'Sala de saque secreta acessível com um Bastão de Energia. Alta chance de queda de projetos.',
        items: ['Projeto Rattler', 'Projeto Arpeggio', 'Esquemas de Modificação de Arma'],
      },
      {
        id: 'dam-schem-02',
        name: 'Estação Elétrica Oculta',
        type: 'Schematic',
        coordinates: [72, 82],
        description: 'Mochila escondida próxima à estação elétrica principal. Contém esquemas raros.',
        items: ['Projeto Il Toro', 'Esquema de Silenciador'],
      },
      {
        id: 'dam-danger-01',
        name: 'Vertedouro Radioativo',
        type: 'Danger',
        coordinates: [20, 20],
        description: 'Zona de alta radiação abaixo da represa. Exige equipamento contra radiação. Água extremamente tóxica.',
      },
      {
        id: 'dam-boss-01',
        name: 'Destroços da Nave ARC',
        type: 'Boss',
        coordinates: [55, 50],
        description: 'Nave de transporte ARC caída, defendida por sentinelas de elite. Saque lendário após abatê-los.',
        items: ['Caixas de Armas Lendárias', 'Componentes Essenciais ARC'],
      },
      {
        id: 'dam-loot-04',
        name: 'Esconderijo da Torre de Água',
        type: 'Loot',
        coordinates: [78, 60],
        description: 'Escale as torres de água para encontrar tubos de granadas ocultos e caixas de armas.',
        items: ['Tubos de Granada', 'Caixas de Armas', 'Caixas de Munição'],
      },
    ],
  },

  // ======================== BURIED CITY ========================
  {
    id: 'buried-city',
    name: 'Cidade Enterrada',
    subtitle: 'Ruínas Socavadas Italianas',
    description: 'Uma cidade italiana compacta parcialmente afundada em dunas de areia. As ruas estreitas e a verticalidade a tornam um foco constante de PvP.',
    imageUrl: '/maps/buried_city.png',
    accentColor: '#f59e0b', // amber
    markers: [
      {
        id: 'bc-ext-01',
        name: 'Extração Norte',
        type: 'Extraction',
        coordinates: [90, 50],
        description: 'Extração principal nas dunas ao norte. Área muito aberta — cuidado com atiradores de elite.',
      },
      {
        id: 'bc-ext-02',
        name: 'Extração Subterrânea',
        type: 'Extraction',
        coordinates: [10, 40],
        description: 'Extração secreta atravessando os antigos túneis do metrô. Menos fluxo de jogadores.',
      },
      {
        id: 'bc-loot-01',
        name: 'Apartamentos Grandioso',
        type: 'Loot',
        coordinates: [60, 30],
        description: 'Prédio de múltiplos andares com alta chance de gerar caixas de armas e projetos (blueprints).',
        items: ['Caixas de Armas', 'Projetos (Blueprints)', 'Peças de Armas'],
      },
      {
        id: 'bc-loot-02',
        name: 'Prefeitura (Town Hall)',
        type: 'Loot',
        coordinates: [50, 55],
        description: 'Edifício central com várias salas de saque. Ótimo local para extrair projetos.',
        items: ['Projetos', 'Bugigangas', 'Células de Energia ARC'],
      },
      {
        id: 'bc-loot-03',
        name: 'Hospital',
        type: 'Loot',
        coordinates: [45, 75],
        description: 'Rico em suprimentos médicos, mas um famoso ponto de carnificina em PvP. Múltiplos níveis.',
        items: ['Seringas de Estímulo', 'Antisséptico', 'Kits Médicos'],
      },
      {
        id: 'bc-schem-01',
        name: 'Residências Santa Maria',
        type: 'Schematic',
        coordinates: [70, 65],
        description: 'Zona residencial excelente para coleta de projetos. Verifique dentro de gavetas e cofres escondidos.',
        items: ['Projeto Burletta', 'Projeto Venator', 'Esquema de Armadura'],
      },
      {
        id: 'bc-schem-02',
        name: 'A Galeria',
        type: 'Schematic',
        coordinates: [35, 45],
        description: 'Shopping abandonado com saques eletrônicos de tecnologia e projetos.',
        items: ['Projeto Stitcher', 'Esquemas de Modificação de Arma', 'Grande Verbasco'],
      },
      {
        id: 'bc-schem-03',
        name: 'Apartamento Secreto',
        type: 'Schematic',
        coordinates: [55, 20],
        description: 'Acessível apenas por escada e pulos arriscados pelas beiradas. Saque raro garantido.',
        items: ['Projetos Raros', 'Caixas de Armas Épicas'],
      },
      {
        id: 'bc-danger-01',
        name: 'Beco da Tempestade de Areia',
        type: 'Danger',
        coordinates: [25, 85],
        description: 'Ruas muito estreitas com alta incidência de tempestades de areia e armadilhas PvP.',
      },
      {
        id: 'bc-loot-04',
        name: 'Estação Morano',
        type: 'Loot',
        coordinates: [30, 15],
        description: 'Velha estação de trem com contêineres e cacifos espalhados pelas plataformas.',
        items: ['Caixas de Munição', 'Peças de Armas', 'Bugigangas'],
      },
      {
        id: 'bc-boss-01',
        name: 'Desova de Bombardeiro — Plaza Rosa',
        type: 'Boss',
        coordinates: [40, 50],
        description: 'Praça aberta frequentemente patrulhada por robôs ARC tipo Bombardiers. Alta recompensa ao abater.',
        items: ['Saques Lendários', 'Peças de Vigia ARC'],
      },
    ],
  },

  // ======================== SPACEPORT ========================
  {
    id: 'spaceport',
    name: 'Espaçoporto',
    subtitle: 'Base Espacial de Acerra',
    description: 'Facilidade abandonada de lançamento de naves do Êxodo. Categoria Ouro para saques por causa dos enormes pátios.',
    imageUrl: '/maps/spaceport.png',
    accentColor: '#3b82f6', // blue
    markers: [
      {
        id: 'sp-ext-01',
        name: 'Extração da Plataforma',
        type: 'Extraction',
        coordinates: [82, 70],
        description: 'Extração localizada bem na plataforma de lançamento principal. Visibilidade brutal e de grande risco.',
      },
      {
        id: 'sp-ext-02',
        name: 'Extração de Carga',
        type: 'Extraction',
        coordinates: [15, 25],
        description: 'Ponto de extração escondido cruzando o trilho ferroviário de carga. Fornece cobertura moderada.',
      },
      {
        id: 'sp-loot-01',
        name: 'Torre de Controle A6',
        type: 'Loot',
        coordinates: [70, 35],
        description: 'Vários andares de torre repleta de armários vermelhos e baús pesados.',
        items: ['Caixas de Armas', 'Saque de Armário Vermelho', 'Componentes Eletrônicos'],
      },
      {
        id: 'sp-loot-02',
        name: 'Pátio de Contêineres',
        type: 'Loot',
        coordinates: [55, 60],
        description: 'Enorme cemitério de contêineres com dezenas de baús fáceis de acessar. Tudo pode cair aqui.',
        items: ['Caixas de Armas', 'Materiais de Criação', 'Munição', 'Bugigangas'],
      },
      {
        id: 'sp-loot-03',
        name: 'Terminal de Partida',
        type: 'Loot',
        coordinates: [45, 45],
        description: 'Excelente área contendo saques tecnológicos, salas lacradas e andares repletos de itens.',
        items: ['Projetos', 'Caixas de Armas', 'Células de Energia ARC'],
      },
      {
        id: 'sp-schem-01',
        name: 'Manutenção de Veículos',
        type: 'Schematic',
        coordinates: [35, 80],
        description: 'Área com perigo relativamente menor com muitos contêineres de decodificação rendendo projetos e esquemas.',
        items: ['Projeto Tempest', 'Projeto Bobcat', 'Esquema de Modificação de Arma'],
      },
      {
        id: 'sp-schem-02',
        name: 'Hangar de Montagem de Foguetes',
        type: 'Schematic',
        coordinates: [60, 20],
        description: 'Hangar gigantesco guardando esquemas raros trancados. Uma chave de acesso é absolutamente necessária aqui.',
        items: ['Projeto Bettina', 'Projeto Hullcracker', 'Esquemas de Armadura Raríssimos'],
      },
      {
        id: 'sp-loot-04',
        name: 'Torres da Trincheira',
        type: 'Loot',
        coordinates: [25, 50],
        description: 'Use a tirolesa para alcançar rapidamente armários vermelhos antes da chegada de robôs ARC.',
        items: ['Saque de Armário Vermelho', 'Supressores', 'Peças de Armas'],
      },
      {
        id: 'sp-danger-01',
        name: 'Armazenamento de Combustível',
        type: 'Danger',
        coordinates: [40, 15],
        description: 'Tanques de combustível instáveis e inflamáveis. Qualquer tiro desencadeará explosões massivas em cadeia.',
      },
      {
        id: 'sp-boss-01',
        name: 'Evento do Ceifador ARC (Harvester)',
        type: 'Boss',
        coordinates: [50, 50],
        description: 'Uma enorme entidade Ceifadora costuma vagar aqui. Derrote-a para os projetos mais devastadores do jogo.',
        items: ['Projeto Jupiter', 'Projeto Equaliser', 'Componentes Lendários'],
      },
    ],
  },

  // ======================== THE BLUE GATE ========================
  {
    id: 'blue-gate',
    name: 'O Portão Azul (The Blue Gate)',
    subtitle: 'Fortaleza Alpina',
    description: 'Região serrana coberta com vales, bunkers e o conteúdo PvE mais impiedoso com Rainhas ARC e lutas duríssimas.',
    imageUrl: '/maps/blue_gate.png',
    accentColor: '#22c55e', // green
    markers: [
      {
        id: 'bg-ext-01',
        name: 'Extração do Pico',
        type: 'Extraction',
        coordinates: [88, 50],
        description: 'Instalada na posição mais alta. Excelente linha de visão permitindo defender facilmente.',
      },
      {
        id: 'bg-ext-02',
        name: 'Boca do Túnel (Extração)',
        type: 'Extraction',
        coordinates: [8, 30],
        description: 'Cercada por minérios perto da entrada do túnel de trem. Fuga rápida.',
      },
      {
        id: 'bg-loot-01',
        name: 'Complexo de Armazéns',
        type: 'Loot',
        coordinates: [60, 40],
        description: 'Uma sequência de galpões rústicos com portas trancadas eletronicamente, gerando tubos de granadas aos montes.',
        items: ['Projetos', 'Tubos de Granada', 'Saque de Armários Seguros'],
      },
      {
        id: 'bg-loot-02',
        name: 'Cavernas Subterrâneas',
        type: 'Loot',
        coordinates: [50, 75],
        description: 'Extensos sistemas de cavernas naturais com caches de recursos raros de mineração dispersos na gruta.',
        items: ['Materiais de Criação', 'Cabos de Força', 'Motores'],
      },
      {
        id: 'bg-schem-01',
        name: 'Sala Vigiada da Manutenção',
        type: 'Schematic',
        coordinates: [40, 55],
        description: 'Área com altíssima aglomeração de saque sem o peso das arenas PVP massivas. Incrível de esquemas e modificações de campo.',
        items: ['Projeto Osprey', 'Projeto Torrente', 'Projeto Anvil'],
      },
      {
        id: 'bg-schem-02',
        name: 'Bunker Subterrâneo Secreto',
        type: 'Schematic',
        coordinates: [30, 35],
        description: 'Sistema profundo de túneis e bunkers acessível decodificando um quebra-cabeça. Tem equipamentos incrivelmente valiosos.',
        items: ['Projeto Aphelion', 'Projeto Jupiter', 'Esquema de Armadura Lendária'],
      },
      {
        id: 'bg-schem-03',
        name: 'Local do Quebra-cabeça da Carcaça ARC',
        type: 'Schematic',
        coordinates: [55, 80],
        description: 'Diretamente ao Leste. Decodifique o código de terminal interno da carcaça do robô ARC grande para peças lendárias raras.',
        items: ['Esquemas Raros', 'Projetos de Modificação de Arma'],
      },
      {
        id: 'bg-danger-01',
        name: 'Corredor de Avalanche',
        type: 'Danger',
        coordinates: [70, 20],
        description: 'Uma passagem congelante exposta suscetível a tempestades congelantes limitadoras de radar absoluto.',
      },
      {
        id: 'bg-danger-02',
        name: 'Mina Tóxica',
        type: 'Danger',
        coordinates: [20, 65],
        description: 'Veios estourados espalham gases absurdamente tóxicos que exigem máscaras de oxigênio sob risco de colapso agudo de Vida.',
      },
      {
        id: 'bg-boss-01',
        name: 'Rainha ARC Cárstica',
        type: 'Boss',
        coordinates: [45, 45],
        description: 'O encontro solitário mais agressivo atualmente do mapa principal. A temível Rainha garante baús com espólios surreais após morte.',
        items: ['Projeto Equalizer', 'Caixas de Armas Lendárias', 'Troféu da Rainha ARC'],
      },
    ],
  },

  // ======================== STELLA MONTIS ========================
  {
    id: 'stella-montis',
    name: 'Stella Montis',
    subtitle: 'Base Norte de Instalações Árticas',
    description: 'Bases instaladas diretamente sobre os planaltos polares, repletos de longos e confinados labirintos de contêineres e reatores nucleares quentes.',
    imageUrl: '/maps/stella_montis.png',
    accentColor: '#a855f7', // purple
    markers: [
      {
        id: 'sm-ext-01',
        name: 'Extração de Heliporto',
        type: 'Extraction',
        coordinates: [85, 55],
        description: 'Local de fuga aéreo altamente rápido no convés externo aberto à rajada congelante.',
      },
      {
        id: 'sm-ext-02',
        name: 'Caminho Oculto (Esconderijo)',
        type: 'Extraction',
        coordinates: [10, 45],
        description: 'Túneis de serviço que servem de excelente saída tática do perigo da superfície dos laboratórios.',
      },
      {
        id: 'sm-loot-01',
        name: 'Fábrica de Motores e Montagem',
        type: 'Loot',
        coordinates: [60, 30],
        description: 'Espaço fantástico de saques em progressões sem o grupo maior de emboscadas contendo partes essenciais da tecnologia robótica antiga humana.',
        items: ['Caixas de Armas', 'Componentes de Foguete', 'Peças Eletrônicas'],
      },
      {
        id: 'sm-loot-02',
        name: 'Laboratório Pesquisa Médica Biológica',
        type: 'Loot',
        coordinates: [45, 70],
        description: 'Centrais com farmácia que geram bolsas com vacinas, reagentes e toda assistência curandeira para sobreviver incursões estendidas.',
        items: ['Seringas de Estímulo', 'Antisséptico', 'Kits Médicos', 'Ferramentas Enferrujadas'],
      },
      {
        id: 'sm-schem-01',
        name: 'Depósito Lacrado nos Contêineres de Envio',
        type: 'Schematic',
        coordinates: [35, 45],
        description: 'Uma área obscura por trás do reator que oferece chance surpreendente da exclusiva escopeta ou rifle rústico de fim de nível superior do jogo.',
        items: ['Projeto Deadline', 'Projeto Vulcano', 'Projetos Escassos de Balística'],
      },
      {
        id: 'sm-schem-02',
        name: 'Gabinete Diretivo Sênior',
        type: 'Schematic',
        coordinates: [70, 75],
        description: 'Suíte trancada que exibe obrigatoriamente múltiplas gerações de saquecamuflado. A chave amarela é determinante.',
        items: ['Projeto Bobcat', 'Projeto Renegade', 'Projetos de Armadura Leve Avançados'],
      },
      {
        id: 'sm-loot-03',
        name: 'Salão Crionico Câmaras Frias',
        type: 'Loot',
        coordinates: [55, 55],
        description: 'Dezenas de gabinetes de cápsulas suspensas contendo células modulares e sucatas congeladas preciosas da antiga expansão humana pre ARC.',
        items: ['Materiais de Criação', 'Cabos de Força', 'Células de Energia ARC'],
      },
      {
        id: 'sm-danger-01',
        name: 'Núcleo Central Reativo',
        type: 'Danger',
        coordinates: [25, 25],
        description: 'Radiação violenta irradia diretamente dessa ala central fundida que ataca armaduras impiedosamente e remove percentuais da vida em 50segundos em campo aberto.',
      },
      {
        id: 'sm-boss-01',
        name: 'Vigia Comando Alpha — Guardião Centinela',
        type: 'Boss',
        coordinates: [40, 50],
        description: 'Patrulha central contornando passagens diretas sob constante defesa. Combate requer esquadrão fechado de dano frontal persistido e tiros focados nos resfriadores.',
        items: ['Caixas de Armas Lendárias', 'Núcleo de Guardião', 'Esquema de Titânio Ultraleve'],
      },
      {
        id: 'sm-loot-04',
        name: 'Refugo das Fornalhas (Materiais Oficina)',
        type: 'Loot',
        coordinates: [75, 40],
        description: 'Lugar quase inóspito muito perto de ventilações superaquecidas ideal de farme para extrair as partes exatas necessárias do workshop caseiro.',
        items: ['Ferramentas Enferrujadas', 'Motores', 'Cabos de Força', 'Engrenagens'],
      },
    ],
  },
];
