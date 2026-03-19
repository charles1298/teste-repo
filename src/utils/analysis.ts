import type { Item } from '../data/items';

export type Tier = 'S' | 'A' | 'B' | 'C';

export const calculateTier = (item: Item): Tier => {
  // Simple heuristic for Tier List
  const totalScore = item.useValue + (item.rarity === 'Legendary' ? 40 : item.rarity === 'Epic' ? 25 : item.rarity === 'Rare' ? 15 : item.rarity === 'Uncommon' ? 5 : 0);

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
  const rarityVal = (r: string) => r === 'Legendary' ? 5 : r === 'Epic' ? 4 : r === 'Rare' ? 3 : r === 'Uncommon' ? 2 : 1;
  return [...items].sort((a, b) => {
    const diff = rarityVal(b.rarity) - rarityVal(a.rarity);
    if (diff === 0) return b.useValue - a.useValue;
    return diff;
  }).slice(0, count);
};

export const getBestRecycleItems = (items: Item[], count: number = 3): Item[] => {
  return [...items]
    .sort((a, b) => b.recycleValue - a.recycleValue)
    .slice(0, count);
};
