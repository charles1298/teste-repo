import { useState } from 'react';
import { ITEMS } from '../data/items';
import { WEAPON_RECIPES } from '../data/recipes';
import { useInventory } from '../hooks/useInventory';
import { Briefcase, Package, LayoutGrid, List } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// Extract all existing materials in the game from recipes
const ALL_MATERIALS = Array.from(new Set(WEAPON_RECIPES.flatMap(r => r.ingredients.map(i => i.name)))).sort();

const Inventory = () => {
  const { inventory, toggleWeapon, updateMaterial } = useInventory();
  const [activeTab, setActiveTab] = useState<'weapons' | 'materials'>('weapons');

  const ownedItems = ITEMS.filter(item => inventory.ownedWeapons.includes(item.id));

  const rarityColors: Record<string, string> = {
    Common: 'text-gray-400 border-gray-400',
    Uncommon: 'text-green-400 border-green-400',
    Rare: 'text-blue-400 border-blue-400',
    Epic: 'text-purple-400 border-purple-400',
    Legendary: 'text-yellow-400 border-yellow-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-arc-accent/30 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,77,0,0.5)] flex items-center gap-3">
            <Briefcase className="text-arc-accent" size={32} />
            Meu Inventário
          </h1>
          <p className="text-gray-400 mt-2">Gerencie suas armas e controle seus recursos</p>
        </div>
        
        <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
          <button 
            onClick={() => setActiveTab('weapons')}
            className={clsx("flex items-center gap-2 px-4 py-2 rounded-md transition-all", activeTab === 'weapons' ? "bg-arc-accent text-black font-bold" : "text-gray-400 hover:text-white")}
          >
            <LayoutGrid size={18} />
            Arsenal
          </button>
          <button 
            onClick={() => setActiveTab('materials')}
            className={clsx("flex items-center gap-2 px-4 py-2 rounded-md transition-all", activeTab === 'materials' ? "bg-arc-accent text-black font-bold" : "text-gray-400 hover:text-white")}
          >
            <Package size={18} />
            Recursos
          </button>
        </div>
      </div>

      {activeTab === 'weapons' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {ownedItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="tech-border relative flex flex-col h-full bg-arc-darker/80 border-arc-accent/50 transition-all duration-300"
              >
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded">
                  <div className="absolute top-2 left-2 z-10">
                    <button 
                      onClick={() => toggleWeapon(item.id)}
                      className="p-2 rounded-full backdrop-blur-md transition-all duration-300 border bg-arc-accent text-black border-arc-accent shadow-[0_0_10px_rgba(255,77,0,0.8)]"
                      title="Remover do Inventário"
                    >
                      <Briefcase size={16} />
                    </button>
                  </div>
                  <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full filter brightness-90 transition-all duration-500" />
                  <div className={clsx('absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase tracking-widest bg-black/80 rounded border', rarityColors[item.rarity])}>
                    {item.rarity}
                  </div>
                </div>
                <div className="flex-grow p-4">
                  <h3 className="text-xl font-bold tracking-wider text-white mb-1 uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{item.name}</h3>
                  <p className="text-sm text-arc-cyan font-mono mb-3 tracking-widest">{item.type}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {ownedItems.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 bg-black/20 rounded-lg border border-white/5 backdrop-blur-sm">
              <Briefcase size={48} className="text-gray-600 mb-4 opacity-50" />
              <p className="text-xl text-white mb-2">Seu arsenal está vazio.</p>
              <p>Vá até a aba "Arsenal e Itens" para adicionar armas ao seu inventário.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="bg-arc-darker/60 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <List className="text-arc-accent" size={24} />
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Controle de Materiais</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_MATERIALS.map(material => {
              const amount = inventory.materials[material] || 0;
              return (
                <div key={material} className="flex flex-col bg-black/40 border border-white/5 rounded p-3 hover:border-arc-accent/30 transition-colors">
                  <span className="text-sm font-bold text-gray-300 mb-2 truncate" title={material}>{material}</span>
                  <div className="flex items-center gap-2 mt-auto">
                    <button 
                      onClick={() => updateMaterial(material, Math.max(0, amount - 1))}
                      className="w-8 h-8 rounded bg-gray-800 text-white flex items-center justify-center hover:bg-arc-accent hover:text-black transition-colors"
                    >-</button>
                    <input 
                      type="number"
                      min="0"
                      value={amount || ''}
                      onChange={(e) => updateMaterial(material, parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full bg-black border border-gray-700 text-center text-white py-1 rounded focus:outline-none focus:border-arc-accent"
                    />
                    <button 
                      onClick={() => updateMaterial(material, amount + 1)}
                      className="w-8 h-8 rounded bg-gray-800 text-white flex items-center justify-center hover:bg-arc-accent hover:text-black transition-colors"
                    >+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
