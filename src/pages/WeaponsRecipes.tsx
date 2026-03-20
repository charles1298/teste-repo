import { useState } from 'react';
import { WEAPON_RECIPES } from '../data/recipes';
import { Search, Hammer, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';

const WeaponsRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { inventory } = useInventory();

  const filteredRecipes = WEAPON_RECIPES.filter(recipe => 
    recipe.weaponName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Common': return 'text-gray-400';
      case 'Uncommon': return 'text-green-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-arc-accent/30 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,77,0,0.5)] flex items-center gap-3">
            <Hammer className="text-arc-accent" size={32} />
            Receitas de Arsenal
          </h1>
          <p className="text-gray-400 mt-2">Manual de fabricação e melhoria de armamento</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md leading-5 bg-arc-darker/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-arc-accent focus:border-arc-accent sm:text-sm backdrop-blur-sm transition-all"
            placeholder="Buscar receitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecipes.map(recipe => (
          <div key={recipe.weaponId} className="bg-arc-darker/60 border border-white/5 rounded-lg overflow-hidden group hover:border-arc-accent/30 transition-all duration-300 relative backdrop-blur-sm">
            {/* Decal top right */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-[2px] bg-arc-accent/50 mt-2 mr-2"></div>
              <div className="absolute top-0 right-0 w-[2px] h-8 bg-arc-accent/50 mt-2 mr-2"></div>
            </div>

            <div className="p-5 flex flex-col md:flex-row gap-6 items-start h-full">
              {/* Image Section */}
              <div className="w-full md:w-1/3 flex-shrink-0 bg-black/40 p-4 rounded-md border border-white/5 relative overflow-hidden group-hover:bg-black/60 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-arc-accent/5 to-transparent pointer-events-none"></div>
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.weaponName} 
                  className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col flex-grow w-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{recipe.weaponName}</h3>
                    <p className="text-xs uppercase text-gray-500 tracking-wider font-mono">{recipe.type}</p>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 bg-black/50 rounded border border-white/5 ${getRarityColor(recipe.rarity)}`}>
                    {recipe.rarity}
                  </span>
                </div>

                <div className="flex gap-4 mb-4 text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded">
                    <Clock size={14} className="text-arc-accent" />
                    <span>{recipe.craftingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded">
                    <Hammer size={14} className="text-gray-300" />
                    <span>{recipe.craftingStation}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-1">
                    <h4 className="text-xs font-bold uppercase text-gray-500">Materiais Necessários</h4>
                    {recipe.ingredients.every(ing => (inventory.materials[ing.name] || 0) >= ing.amount) ? (
                      <span className="text-[10px] uppercase font-bold text-green-400 flex items-center gap-1"><CheckCircle2 size={12}/> Pronta para criar</span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-orange-400 flex items-center gap-1"><AlertCircle size={12}/> Faltam materiais</span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ing, idx) => {
                      const haveAmount = inventory.materials[ing.name] || 0;
                      const isEnough = haveAmount >= ing.amount;
                      return (
                        <li key={idx} className="flex justify-between items-center text-sm font-mono text-gray-300">
                          <span className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isEnough ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                            {ing.name}
                          </span>
                          <span className="flex items-center gap-2 text-xs">
                            <span className={isEnough ? "text-green-400" : "text-orange-400 font-bold"}>
                              {haveAmount}/{ing.amount}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Scanline overlay over item */}
            <div className="absolute inset-0 pointer-events-none rounded-lg opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }}></div>
          </div>
        ))}

        {filteredRecipes.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500 bg-black/20 rounded-lg border border-white/5 backdrop-blur-sm">
            <Hammer size={48} className="text-gray-600 mb-4 opacity-50" />
            <p className="text-lg">Nenhuma receita encontrada para a busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaponsRecipes;
