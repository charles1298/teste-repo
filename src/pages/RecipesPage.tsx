import { useState } from 'react';
import { Clock, Heart, Users, ChefHat, Search, Filter, Flame } from 'lucide-react';

interface Recipe {
  id: number;
  name: string;
  img: string;
  time: string;
  difficulty: string;
  serves: number;
  liked: boolean;
  category: string;
  ingredients: { name: string; available: boolean; expiring?: boolean }[];
  match: number;
}

const allRecipes: Recipe[] = [
  {
    id: 1, name: 'Omelete Especial de Frango', img: '/images/recipes/omelete.png',
    time: '15 min', difficulty: 'Fácil', serves: 2, liked: true, category: 'Rápidos',
    match: 95,
    ingredients: [
      { name: 'Ovos', available: true },
      { name: 'Frango', available: true },
      { name: 'Tomate', available: true, expiring: true },
      { name: 'Cebola', available: true },
      { name: 'Queijo', available: true },
    ]
  },
  {
    id: 2, name: 'Arroz com Feijão Tropeiro', img: '/images/recipes/tropeiro.png',
    time: '40 min', difficulty: 'Médio', serves: 4, liked: false, category: 'Almoço',
    match: 85,
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Feijão', available: true },
      { name: 'Linguiça', available: true, expiring: true },
      { name: 'Ovo', available: true },
      { name: 'Couve', available: false },
    ]
  },
  {
    id: 3, name: 'Bolo de Cenoura', img: '/images/recipes/omelete.png',
    time: '50 min', difficulty: 'Fácil', serves: 8, liked: false, category: 'Sobremesas',
    match: 70,
    ingredients: [
      { name: 'Cenoura', available: true },
      { name: 'Ovos', available: true },
      { name: 'Farinha', available: true },
      { name: 'Açúcar', available: true },
      { name: 'Chocolate', available: false },
    ]
  },
  {
    id: 4, name: 'Sopa de Legumes', img: '/images/recipes/tropeiro.png',
    time: '35 min', difficulty: 'Fácil', serves: 4, liked: true, category: 'Jantar',
    match: 60,
    ingredients: [
      { name: 'Batata', available: true },
      { name: 'Cenoura', available: true },
      { name: 'Cebola', available: true },
      { name: 'Abobrinha', available: false },
      { name: 'Caldo', available: false },
    ]
  },
];

const categories = ['Todos', 'Rápidos', 'Almoço', 'Jantar', 'Sobremesas'];

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedRecipes, setLikedRecipes] = useState<Set<number>>(new Set(allRecipes.filter(r => r.liked).map(r => r.id)));

  const filteredRecipes = allRecipes
    .filter(r => activeCategory === 'Todos' || r.category === activeCategory)
    .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleLike = (id: number) => {
    setLikedRecipes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="px-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
          <ChefHat size={22} className="text-green-500" />
          Receitas
        </h1>
        <p className="text-[12px] text-gray-400 mt-0.5">Baseadas nos ingredientes da sua despensa</p>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center h-10 px-3 bg-white rounded-xl border border-gray-200 focus-within:border-green-400 focus-within:ring-3 focus-within:ring-green-500/15 transition-all">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar receitas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-full ml-2 bg-transparent text-[13px] text-gray-800 placeholder:text-gray-400 outline-none"
          />
        </div>
        <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-green-200 transition-all">
          <Filter size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-none pb-1">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-green-500 text-white shadow-md shadow-green-500/25' 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-green-50 hover:border-green-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="space-y-3">
        {filteredRecipes.map((recipe, i) => (
          <div key={recipe.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex">
              <div className="relative w-[130px] min-h-[170px] shrink-0 overflow-hidden">
                <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                {/* Match badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm">
                  <span className={`text-[10px] font-bold ${recipe.match >= 80 ? 'text-green-400' : recipe.match >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {recipe.match}% match
                  </span>
                </div>
                {/* Like button */}
                <button 
                  onClick={() => toggleLike(recipe.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart size={14} className={likedRecipes.has(recipe.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                </button>
              </div>
              <div className="flex-1 p-3 flex flex-col">
                <h3 className="text-[14px] font-bold text-gray-800 leading-snug mb-1.5">{recipe.name}</h3>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
                  <span className="flex items-center gap-0.5"><Clock size={10} /> {recipe.time}</span>
                  <span className="flex items-center gap-0.5"><Flame size={10} /> {recipe.difficulty}</span>
                  <span className="flex items-center gap-0.5"><Users size={10} /> {recipe.serves}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3 flex-1" style={{ alignContent: 'flex-start' }}>
                  {recipe.ingredients.map((ing, j) => (
                    <span 
                      key={j} 
                      style={{
                        display: 'inline-block',
                        fontSize: '9px',
                        fontWeight: 500,
                        padding: '2px 6px',
                        borderRadius: '12px',
                        lineHeight: '14px',
                        border: `1px solid ${!ing.available ? '#e5e7eb' : ing.expiring ? '#fecaca' : '#bbf7d0'}`,
                        backgroundColor: !ing.available ? '#f9fafb' : ing.expiring ? '#fef2f2' : '#f0fdf4',
                        color: !ing.available ? '#9ca3af' : ing.expiring ? '#ef4444' : '#16a34a',
                        textDecoration: !ing.available ? 'line-through' : 'none',
                      }}
                    >
                      {ing.name}
                    </span>
                  ))}
                </div>
                <button className="self-start px-4 py-1.5 bg-green-500 text-white text-[11px] font-bold rounded-lg hover:bg-green-600 active:scale-95 transition-all shadow-sm shadow-green-500/20">
                  Ver receita completa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
