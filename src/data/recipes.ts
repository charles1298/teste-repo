import { ITEMS, type Item } from './items';

export interface RecipeIngredient {
  name: string;
  amount: number;
}

export interface WeaponRecipe {
  weaponId: string;
  weaponName: string;
  imageUrl: string;
  rarity: string;
  type: string;
  ingredients: RecipeIngredient[];
  craftingTime: string;
  craftingStation: string;
}

// Map of weapon IDs to their item data for easy access
const itemMap = new Map<string, Item>(ITEMS.map(item => [item.id, item]));

const createRecipe = (
  weaponId: string, 
  ingredients: RecipeIngredient[], 
  craftingTime: string = '5m', 
  craftingStation: string = 'Bancada de Armas'
): WeaponRecipe | null => {
  const item = itemMap.get(weaponId);
  if (!item) return null;

  return {
    weaponId: item.id,
    weaponName: item.name,
    imageUrl: item.imageUrl,
    rarity: item.rarity,
    type: item.type,
    ingredients,
    craftingTime,
    craftingStation
  };
};

const rawRecipes = [
  // ASSAULT RIFLES
  createRecipe('ar-001', [
    { name: 'Sucata de Nível Baixo', amount: 50 },
    { name: 'Peças de Arma', amount: 10 }
  ], '2m'),
  createRecipe('ar-002', [
    { name: 'Sucata de Nível Médio', amount: 40 },
    { name: 'Peças de Arma', amount: 15 },
    { name: 'Bateria ARC Quebrada', amount: 1 }
  ], '5m'),
  createRecipe('ar-003', [
    { name: 'Sucata de Nível Médio', amount: 60 },
    { name: 'Peças de Arma', amount: 25 },
    { name: 'Placa de Circuito ARC', amount: 2 }
  ], '10m'),
  createRecipe('ar-004', [
    { name: 'Sucata de Nível Alto', amount: 50 },
    { name: 'Peças de Arma de Alta Qualidade', amount: 20 },
    { name: 'Núcleo ARC Intacto', amount: 1 }
  ], '20m', 'Montador Avançado'),
  createRecipe('ar-005', [
    { name: 'Sucata de Nível Alto', amount: 80 },
    { name: 'Peças de Arma de Alta Qualidade', amount: 30 },
    { name: 'Núcleo ARC Intacto', amount: 2 },
    { name: 'Lente de Precisão', amount: 1 }
  ], '30m', 'Montador Avançado'),

  // BATTLE RIFLES
  createRecipe('br-001', [
    { name: 'Sucata de Nível Baixo', amount: 60 },
    { name: 'Tubo de Aço', amount: 2 }
  ], '3m'),
  createRecipe('br-002', [
    { name: 'Sucata de Nível Médio', amount: 70 },
    { name: 'Peças de Arma', amount: 20 },
    { name: 'Componentes Eletrônicos', amount: 5 }
  ], '15m'),
  createRecipe('br-003', [
    { name: 'Metal ARC Refinado', amount: 100 },
    { name: 'Célula de Energia de Alta Densidade', amount: 5 },
    { name: 'Emissor de Feixe', amount: 1 }
  ], '1h', 'Bancada ARC Especial'),

  // SMGS
  createRecipe('smg-001', [
    { name: 'Sucata de Nível Baixo', amount: 40 },
    { name: 'Molas', amount: 5 }
  ], '2m'),
  createRecipe('smg-002', [
    { name: 'Sucata de Nível Alto', amount: 45 },
    { name: 'Peças de Arma', amount: 25 },
    { name: 'Mecanismo de Disparo Rápido', amount: 1 }
  ], '15m', 'Montador Avançado'),

  // SHOTGUNS
  createRecipe('sg-001', [
    { name: 'Sucata de Nível Médio', amount: 50 },
    { name: 'Esponja de Choque', amount: 2 },
    { name: 'Tubo de Aço Pesado', amount: 1 }
  ], '10m'),
  createRecipe('sg-002', [
    { name: 'Sucata de Nível Alto', amount: 60 },
    { name: 'Componentes Eletrônicos', amount: 10 },
    { name: 'Cano Reforçado', amount: 1 }
  ], '20m', 'Montador Avançado'),

  // PISTOLS
  createRecipe('pst-001', [
    { name: 'Sucata de Nível Baixo', amount: 20 },
    { name: 'Silenciador Improvisado', amount: 1 }
  ], '1m'),
  createRecipe('pst-002', [
    { name: 'Sucata de Nível Médio', amount: 30 },
    { name: 'Gatilho Sensível', amount: 1 }
  ], '5m'),
  createRecipe('pst-003', [
    { name: 'Sucata de Nível Médio', amount: 45 },
    { name: 'Sistema de Rajada Tripla (Quebrado)', amount: 1 },
    { name: 'Placa de Circuito ARC', amount: 1 }
  ], '10m'),

  // HAND CANNONS
  createRecipe('hc-001', [
    { name: 'Sucata de Nível Médio', amount: 80 },
    { name: 'Aço Temperado', amount: 5 },
    { name: 'Armação Extra Forte', amount: 1 }
  ], '15m'),

  // LMGS
  createRecipe('lmg-001', [
    { name: 'Sucata de Nível Alto', amount: 100 },
    { name: 'Corrente de Munição', amount: 2 },
    { name: 'Sistema de Resfriamento ARC', amount: 1 }
  ], '25m', 'Montador Avançado'),

  // SNIPER RIFLES
  createRecipe('sr-001', [
    { name: 'Sucata de Nível Médio', amount: 65 },
    { name: 'Cano Longo Estriado', amount: 1 },
    { name: 'Ótica Básica', amount: 1 }
  ], '15m'),
  createRecipe('sr-002', [
    { name: 'Metal ARC Refinado', amount: 80 },
    { name: 'Ótica Avançada de Detecção Termal', amount: 1 },
    { name: 'Núcleo de Ferrolho Pesado', amount: 1 },
    { name: 'Bipé Estabilizador', amount: 1 }
  ], '1h', 'Bancada ARC Especial'),

  // SPECIAL
  createRecipe('spc-001', [
    { name: 'Metal ARC Refinado', amount: 120 },
    { name: 'Cristal de Foco de Feixe', amount: 1 },
    { name: 'Matriz de Condensação de Plasma', amount: 1 },
    { name: 'Núcleo de IA Corrompido', amount: 1 }
  ], '2h', 'Bancada ARC Especial'),
  createRecipe('spc-002', [
    { name: 'Sucata de Nível Alto', amount: 100 },
    { name: 'Ogiva Perfurante', amount: 5 },
    { name: 'Sensor de Proximidade ARC', amount: 3 }
  ], '45m', 'Montador Avançado'),
];

export const WEAPON_RECIPES = rawRecipes.filter((recipe): recipe is WeaponRecipe => recipe !== null);
