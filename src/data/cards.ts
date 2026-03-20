export type Rarity = 'SSR' | 'SR' | 'R';

export interface SupportCard {
  id: string;
  name: string;
  rarity: Rarity;
  imageUrl: string;
}

export const SUPPORT_CARDS: SupportCard[] = [
  {
    id: "uma-001",
    name: "Oguri Cap (Starlight Beat)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5144547/6ae0a1b1e9b0e1e9b0e1e9b0e1e9b0e1.png/show"
  },
  {
    id: "uma-002",
    name: "Oguri Cap (Ashen Miracle)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/6104445/7d0a2b4c10e3b9f1d2e4a5b6c7d8e9f0.png/show"
  },
  {
    id: "uma-003",
    name: "Seiun Sky (Reeling in the Big One)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5478344/b9e1c2d3e4f5a6b7c8d9e0f1a2b3c4d5.png/show"
  },
  {
    id: "uma-004",
    name: "Maruzensky (Hot☆Summer Night)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5564111/d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6.png/show"
  },
  {
    id: "uma-005",
    name: "Taiki Shuttle (Wild Frontier)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363177/e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7.png/show"
  },
  {
    id: "uma-006",
    name: "Mihono Bourbon (CODE: ICING)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5804377/f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8.png/show"
  },
  {
    id: "uma-007",
    name: "Kitasan Black (Gilded Shrine to Glory)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5839500/a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9.png/show"
  },
  {
    id: "uma-008",
    name: "Tamamo Cross (Fast as Lightning)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363211/b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0.png/show"
  },
  {
    id: "uma-009",
    name: "Rice Shower (Make up Mayhem!)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363199/c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1.png/show"
  },
  {
    id: "uma-010",
    name: "Super Creek (Hazy Amber Waiting)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363077/d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2.png/show"
  },
  {
    id: "uma-011",
    name: "Mejiro Ardan (Yatobun no Ichi, Setsugetsufuka)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5686144/e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3.png/show"
  },
  {
    id: "uma-012",
    name: "Narita Top Road (Road to the Top)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5412155/f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4.png/show"
  },
  {
    id: "uma-013",
    name: "Fine Motion (Elegant Line)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5752466/a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5.png/show"
  },
  {
    id: "uma-014",
    name: "Curren Chan (O-U-T-I-N-G)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363055/b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6.png/show"
  },
  {
    id: "uma-015",
    name: "Sakura Bakushin O (Bakushin! Bakushin!)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5362988/c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7.png/show"
  },
  {
    id: "uma-016",
    name: "Special Week (Hoppin' Vitamin Vitamin)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363044/d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8.png/show"
  },
  {
    id: "uma-017",
    name: "Silence Suzuka (Beyond the Silence)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5412511/e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9.png/show"
  },
  {
    id: "uma-018",
    name: "Tokai Teio (Beyond the Top)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5363144/f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0.png/show"
  },
  {
    id: "uma-019",
    name: "Mejiro McQueen (End of the Sky)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5362977/a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1.png/show"
  },
  {
    id: "uma-020",
    name: "Gold Ship (Red Fire)",
    rarity: "SSR",
    imageUrl: "https://img.game8.jp/5722555/b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2.png/show"
  }
];
