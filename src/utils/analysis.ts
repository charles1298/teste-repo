import type { Item } from '../data/items';

export type Tier = 'S' | 'A' | 'B' | 'C';

export const calculateTier = (item: Item): Tier => {
  // Simple heuristic for Tier List
  const totalScore = item.useValue + (item.rarity === 'Legendary' ? 40 : item.rarity === 'Epic' ? 25 : item.rarity === 'Rare' ? 10 : 0);

  if (totalScore >= 120) return 'S';
  if (totalScore >= 90) return 'A';
  if (totalScore >= 60) return 'B';
  return 'C';
};

export const getTopItems = (items: Item[], count: number = 3): Item[] => {
  return [...items].sort((a, b) => b.useValue - a.useValue).slice(0, count);
};

export const getRarestItems = (items: Item[], count: number = 3): Item[] => {
  // Since 'Legendary' etc are strings, just assign a numeric value for sorting.
  const rarityVal = (r: string) => r === 'Legendary' ? 4 : r === 'Epic' ? 3 : r === 'Rare' ? 2 : 1;
  return [...items].sort((a, b) => {
    const diff = rarityVal(b.rarity) - rarityVal(a.rarity);
    if (diff === 0) return b.useValue - a.useValue;
    return diff;
  }).slice(0, count);
};

export const getBestCraftingItems = (items: Item[], count: number = 3): Item[] => {
  return [...items]
    .filter(item => item.type === 'Crafting' || item.type === 'Resource')
    .sort((a, b) => b.recycleValue - a.recycleValue)
    .slice(0, count);
};
