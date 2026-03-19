export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type ItemType = 'Weapon' | 'Resource' | 'Crafting' | 'Consumable' | 'Gadget';

export interface Item {
  id: string;
  name: string;
  imageUrl: string;
  rarity: Rarity;
  description: string;
  type: ItemType;
  useValue: number; // 0-100 scale for how useful it is
  recycleValue: number; // 0-100 scale for how good it is to recycle
}

export const ITEMS: Item[] = [
  {
    id: 'wpn-001',
    name: 'Vanguard Assault Rifle',
    imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f1784cb2c6?q=80&w=250&auto=format&fit=crop',
    rarity: 'Common',
    description: 'Standard issue rifle. Reliable but lacks stopping power.',
    type: 'Weapon',
    useValue: 40,
    recycleValue: 60,
  },
  {
    id: 'wpn-002',
    name: 'Plasma Caster Prototype',
    imageUrl: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=250&auto=format&fit=crop',
    rarity: 'Epic',
    description: 'Fires superheated plasma. High damage, slow fire rate.',
    type: 'Weapon',
    useValue: 85,
    recycleValue: 30,
  },
  {
    id: 'wpn-003',
    name: 'Arc Nemesis Sniper',
    imageUrl: 'https://images.unsplash.com/photo-1563245459-f83cb4f2cb37?q=80&w=250&auto=format&fit=crop',
    rarity: 'Legendary',
    description: 'One shot, one kill. The pinnacle of long-range destruction.',
    type: 'Weapon',
    useValue: 98,
    recycleValue: 10,
  },
  {
    id: 'res-001',
    name: 'Scrap Metal',
    imageUrl: 'https://images.unsplash.com/photo-1565439396263-d853e4b7b75d?q=80&w=250&auto=format&fit=crop',
    rarity: 'Common',
    description: 'Basic building block for early crafting.',
    type: 'Resource',
    useValue: 20,
    recycleValue: 10,
  },
  {
    id: 'res-002',
    name: 'Quantum Core',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=250&auto=format&fit=crop',
    rarity: 'Legendary',
    description: 'Extremely rare power source. Essential for endgame tech.',
    type: 'Crafting',
    useValue: 95,
    recycleValue: 90, // Also high recycle value due to rare components
  },
  {
    id: 'cns-001',
    name: 'Nanite Healer',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=250&auto=format&fit=crop',
    rarity: 'Rare',
    description: 'Instantly restores 50% health using programmed nanobots.',
    type: 'Consumable',
    useValue: 75,
    recycleValue: 25,
  },
  {
    id: 'crf-001',
    name: 'Optic Sensor',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=250&auto=format&fit=crop',
    rarity: 'Common',
    description: 'Used to craft basic scopes and vision gear.',
    type: 'Crafting',
    useValue: 30,
    recycleValue: 70, // Better to recycle if you have many
  },
  {
    id: 'gad-001',
    name: 'Grapple Hook',
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-14631d8712bf?q=80&w=250&auto=format&fit=crop',
    rarity: 'Epic',
    description: 'Allows rapid vertical traversal and evasion.',
    type: 'Gadget',
    useValue: 88,
    recycleValue: 40,
  },
];
