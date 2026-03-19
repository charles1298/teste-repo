import type { Item } from '../data/items';

export interface RecyclingRecommendation {
  action: 'KEEP' | 'RECYCLE';
  reason: string;
}

export const evaluateItem = (item: Item): RecyclingRecommendation => {
  // Logic: 
  // High use value or high rarity implies we keep it.
  // High recycle value relative to use value implies we recycle.
  
  if (item.rarity === 'Legendary') {
    return {
      action: 'KEEP',
      reason: 'Legendary items are too valuable to recycle. Keep for endgame.',
    };
  }
  
  if (item.useValue >= 80) {
    return {
      action: 'KEEP',
      reason: 'Extremely useful item in combat or survival.',
    };
  }
  
  if (item.recycleValue > item.useValue + 20) {
    return {
      action: 'RECYCLE',
      reason: 'Yields high-value materials. Better recycled than stored.',
    };
  }
  
  if (item.rarity === 'Common' && item.useValue < 50) {
    return {
      action: 'RECYCLE',
      reason: 'Low utility common item. Recycle for basic scrap.',
    };
  }

  return {
    action: 'KEEP',
    reason: 'Balanced item. Keep until you find better gear.',
  };
};
