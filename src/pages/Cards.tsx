import { useState } from 'react';
import { SUPPORT_CARDS, type SupportCard } from '../data/cards';
import { useDeck } from '../hooks/useDeck';
import { Search, Plus, Minus, Star } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const CardItem = ({ card, isOwned, onToggleOwn }: { card: SupportCard, isOwned: boolean, onToggleOwn: () => void }) => {
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'SSR': return 'text-amber-500 bg-amber-100 border-amber-500';
      case 'SR': return 'text-purple-500 bg-purple-100 border-purple-500';
      case 'R': return 'text-blue-500 bg-blue-100 border-blue-500';
      default: return 'text-gray-500 bg-gray-100 border-gray-500';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={clsx(
        "card group", 
        isOwned ? "border-uma-pink shadow-md" : "border-pink-100"
      )}
    >
      <div className="relative w-full aspect-[5/7] mb-3 overflow-hidden rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100 p-1">
        <img 
          src={card.imageUrl} 
          alt={card.name} 
          className="object-contain w-full h-full transform group-hover:scale-110 transition-transform duration-500" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Uma_Musume_Pretty_Derby_logo.png/400px-Uma_Musume_Pretty_Derby_logo.png';
          }}
        />
        <div className={clsx('absolute top-2 right-2 px-2 py-0.5 text-xs font-black rounded-lg border-2 shadow-sm', getRarityColor(card.rarity))}>
          {card.rarity}
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          <img 
            src={card.typeIconUrl} 
            alt={card.type} 
            title={card.type}
            className="w-7 h-7 drop-shadow-md bg-white/50 rounded-full p-0.5" 
          />
          {isOwned && (
            <div className="bg-uma-pink text-white p-1.5 rounded-full shadow-md animate-bounce w-fit">
              <Star size={14} fill="currentColor" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow text-center">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-2">{card.name}</h3>
        <button
          onClick={onToggleOwn}
          className={clsx(
            "mt-auto w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors",
            isOwned 
              ? "bg-pink-100 text-uma-pink hover:bg-pink-200" 
              : "bg-uma-pink text-white hover:bg-uma-pink-hover shadow-md"
          )}
        >
          {isOwned ? (
            <>
              <Minus size={16} /> Remover
            </>
          ) : (
            <>
              <Plus size={16} /> Adicionar
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const Cards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { deck, toggleCard } = useDeck();

  const filteredCards = SUPPORT_CARDS.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-uma-pink drop-shadow-sm">Cartas de Suporte</h1>
          <p className="text-slate-500 font-medium">Veja e adicione as cartas SSR ao seu deck!</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300" size={20} />
          <input
            type="text"
            placeholder="Buscar pelo nome..."
            className="w-full bg-pink-50 border-2 border-pink-200 text-slate-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-uma-pink focus:ring-2 focus:ring-pink-200 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        <AnimatePresence>
          {filteredCards.map(card => (
            <CardItem 
              key={card.id} 
              card={card} 
              isOwned={deck.includes(card.id)} 
              onToggleOwn={() => toggleCard(card.id)} 
            />
          ))}
        </AnimatePresence>
        
        {filteredCards.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-pink-200">
            <p className="text-xl font-bold">Nenhuma carta encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
