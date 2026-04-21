import { useState, useEffect, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  store: string;
  updatedMinutes: number;
  img: string;
  lat: number;
  lng: number;
}

export interface Recipe {
  id: number;
  name: string;
  img: string;
  ingredients: { name: string; daysUntilExpiry: number }[];
}

export interface GamificationData {
  points: number;
  level: number;
  levelName: string;
  nextLevelPoints: number;
  ranking: number;
  totalContributions: number;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Leite Integral Líder', price: 4.50, oldPrice: 5.20, store: 'Mercado Preço Baixo', updatedMinutes: 5, img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop', lat: -20.9475, lng: -48.4810 },
  { id: 2, name: 'Arroz Tio João 5kg', price: 22.90, oldPrice: 26.00, store: 'Supermercado Extra', updatedMinutes: 12, img: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&h=400&fit=crop', lat: -20.9510, lng: -48.4750 },
  { id: 3, name: 'Óleo de Soja Liza', price: 6.99, oldPrice: 8.50, store: 'Atacadão', updatedMinutes: 20, img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&h=400&fit=crop', lat: -20.9440, lng: -48.4860 },
  { id: 4, name: 'Café Melitta 500g', price: 14.90, oldPrice: 18.90, store: 'Mercado Preço Baixo', updatedMinutes: 8, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop', lat: -20.9520, lng: -48.4830 },
  { id: 5, name: 'Ovos Caipira 12un', price: 12.50, oldPrice: 15.00, store: 'Supermercado Dia', updatedMinutes: 3, img: 'https://images.unsplash.com/photo-1598965675045-45c5e72b7d8d?w=400&h=400&fit=crop', lat: -20.9480, lng: -48.4770 },
  { id: 6, name: 'Açúcar Refinado 1kg', price: 4.29, oldPrice: 5.40, store: 'Atacadão', updatedMinutes: 15, img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop', lat: -20.9495, lng: -48.4790 },
  { id: 7, name: 'Feijão Carioca 1kg', price: 7.89, oldPrice: 9.50, store: 'Supermercado Extra', updatedMinutes: 7, img: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=400&fit=crop', lat: -20.9460, lng: -48.4820 },
  { id: 8, name: 'Macarrão Barilla 500g', price: 5.49, oldPrice: 7.20, store: 'Mercado Preço Baixo', updatedMinutes: 2, img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop', lat: -20.9505, lng: -48.4775 },
];

const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Omelete Especial de Frango',
    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop',
    ingredients: [
      { name: 'Ovos', daysUntilExpiry: 5 },
      { name: 'Tomate', daysUntilExpiry: 1 },
      { name: 'Frango desfiado', daysUntilExpiry: 2 },
      { name: 'Queijo', daysUntilExpiry: 4 },
    ],
  },
  {
    id: 2,
    name: 'Mexidão Rápido',
    img: 'https://images.unsplash.com/photo-1548869206-9bfcb64ff73f?w=500&h=400&fit=crop',
    ingredients: [
      { name: 'Arroz', daysUntilExpiry: 30 },
      { name: 'Linguiça', daysUntilExpiry: 2 },
      { name: 'Cebola', daysUntilExpiry: 6 },
      { name: 'Pimentão', daysUntilExpiry: 3 },
    ],
  },
];

const GAMIFICATION: GamificationData = {
  points: 1250,
  level: 3,
  levelName: 'Caçador',
  nextLevelPoints: 2000,
  ranking: 47,
  totalContributions: 83,
};

const formatPrice = (value: number): string =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;

export default function useRealtimeData() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [recipes] = useState<Recipe[]>(RECIPES);
  const [gamification, setGamification] = useState<GamificationData>(GAMIFICATION);
  const [liveUpdates, setLiveUpdates] = useState(0);
  const [isLive, setIsLive] = useState(true);

  // Simulate price fluctuation
  const fluctuatePrices = useCallback(() => {
    setProducts(prev =>
      prev.map(p => {
        const shouldUpdate = Math.random() > 0.5;
        if (!shouldUpdate) return { ...p, updatedMinutes: p.updatedMinutes + 1 };

        const delta = (Math.random() - 0.55) * 1.5; // slight downward bias
        const newPrice = Math.max(p.price + delta, p.price * 0.7);
        return {
          ...p,
          price: Math.round(newPrice * 100) / 100,
          updatedMinutes: Math.floor(Math.random() * 5) + 1,
        };
      })
    );
    setLiveUpdates(prev => prev + Math.floor(Math.random() * 3) + 1);
    setGamification(prev => ({
      ...prev,
      points: prev.points + Math.floor(Math.random() * 15),
      totalContributions: prev.totalContributions + 1,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(fluctuatePrices, 30_000);
    return () => clearInterval(interval);
  }, [fluctuatePrices]);

  // Blink live indicator
  useEffect(() => {
    const blink = setInterval(() => setIsLive(v => !v), 1500);
    return () => clearInterval(blink);
  }, []);

  return { products, recipes, gamification, liveUpdates, isLive, formatPrice };
}
