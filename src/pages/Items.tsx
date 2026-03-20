import { useState } from 'react';
import { ITEMS } from '../data/items';
import type { Rarity, Item } from '../data/items';
import { evaluateItem } from '../utils/recycling';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Briefcase } from 'lucide-react';
import clsx from 'clsx';
import { useInventory } from '../hooks/useInventory';

const ItemCard = ({ item, isOwned, onToggleOwn, onClick }: { item: Item; isOwned: boolean; onToggleOwn: (e: React.MouseEvent) => void; onClick: () => void }) => {
  const rarityColors = {
    Common: 'text-gray-400 border-gray-400',
    Uncommon: 'text-green-400 border-green-400',
    Rare: 'text-blue-400 border-blue-400',
    Epic: 'text-purple-400 border-purple-400',
    Legendary: 'text-yellow-400 border-yellow-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(255, 77, 0, 0.4)' }}
      className="tech-border cursor-pointer flex flex-col h-full bg-arc-darker/80 hover:border-arc-accent transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded">
        <div className="absolute top-2 left-2 z-10">
          <button 
            onClick={onToggleOwn}
            className={clsx(
              "p-2 rounded-full backdrop-blur-md transition-all duration-300 border",
              isOwned 
                ? "bg-arc-accent text-black border-arc-accent shadow-[0_0_10px_rgba(255,77,0,0.8)]" 
                : "bg-black/50 text-gray-400 border-white/20 hover:bg-black/80 hover:text-white hover:border-white/50"
            )}
            title={isOwned ? "Remover do Inventário" : "Adicionar ao Inventário"}
          >
            <Briefcase size={16} />
          </button>
        </div>
        <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full filter brightness-75 hover:brightness-100 transition-all duration-500" />
        <div className={clsx('absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase tracking-widest bg-black/80 rounded border', rarityColors[item.rarity])}>
          {item.rarity}
        </div>
      </div>
      <div className="flex-grow p-4">
        <h3 className="text-xl font-bold tracking-wider text-white mb-1 uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{item.name}</h3>
        <p className="text-sm text-arc-cyan font-mono mb-3 tracking-widest">{item.type}</p>
        <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  );
};

const ItemModal = ({ item, onClose }: { item: Item; onClose: () => void }) => {
  const recommendation = evaluateItem(item);
  
  const isKeep = recommendation.action === 'KEEP';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="tech-border bg-arc-darker w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 w-full">
          <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full rounded-t-lg opacity-80" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-arc-darker to-transparent">
            <h2 className="text-3xl font-black text-white uppercase tracking-wider">{item.name}</h2>
            <span className="text-arc-accent font-mono">{item.type} | {item.rarity}</span>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-700 pb-1">Descrição</h3>
            <p className="text-gray-200 leading-relaxed">{item.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
              <span className="text-xs text-gray-400 uppercase block mb-1">Avaliação de Utilidade</span>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-400">{item.useValue}</span>
                <span className="text-sm text-gray-500 mb-1 ml-1">/ 100</span>
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
              <span className="text-xs text-gray-400 uppercase block mb-1">Rendimento de Reciclagem</span>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-orange-400">{item.recycleValue}</span>
                <span className="text-sm text-gray-500 mb-1 ml-1">/ 100</span>
              </div>
            </div>
          </div>

          <div className={clsx(
            'p-4 rounded border',
            isKeep ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'
          )}>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 border-b border-gray-700/50 pb-1 flex items-center">
              Recomendação da IA: 
              <span className={clsx('ml-2 px-2 py-0.5 rounded text-xs font-bold', isKeep ? 'bg-green-500 text-black' : 'bg-red-500 text-white')}>
                {recommendation.action}
              </span>
            </h3>
            <p className="text-gray-300 italic">"{recommendation.reason}"</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Items = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { inventory, toggleWeapon } = useInventory();

  const filteredItems = ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = rarityFilter === 'All' || item.rarity === rarityFilter;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div className="relative pl-4">
          <div className="absolute -left-0 top-0 bottom-0 w-1 bg-arc-accent shadow-[0_0_10px_var(--color-arc-accent)]"></div>
          <h1 className="text-3xl font-black text-white uppercase tracking-[0.1em] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Arsenal e Recursos</h1>
          <p className="text-arc-cyan/80 font-mono text-sm tracking-widest uppercase mt-1">Banco de dados de equipamentos identificados.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Pesquisar itens..."
              className="w-full sm:w-64 bg-gray-900 border border-gray-700 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-arc-accent transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <select
              className="w-full sm:w-auto bg-gray-900 border border-gray-700 text-white rounded-md pl-10 pr-8 py-2 appearance-none focus:outline-none focus:border-arc-accent transition-colors"
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value as Rarity | 'All')}
            >
              <option value="All">Todas as Raridades</option>
              <option value="Common">Comum</option>
              <option value="Uncommon">Incomum</option>
              <option value="Rare">Raro</option>
              <option value="Epic">Épico</option>
              <option value="Legendary">Lendário</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              isOwned={inventory.ownedWeapons.includes(item.id)}
              onToggleOwn={(e) => {
                e.stopPropagation();
                toggleWeapon(item.id);
              }}
              onClick={() => setSelectedItem(item)} 
            />
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p className="text-xl">Nenhum item corresponde aos filtros atuais.</p>
            <button 
              className="mt-4 text-arc-accent hover:underline"
              onClick={() => { setSearchTerm(''); setRarityFilter('All'); }}
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Items;
