import { useState } from 'react';
import { SUPPORT_CARDS, type SupportCard } from '../data/cards';
import { useDeck, type Deck } from '../hooks/useDeck';
import { Search, Star, Sparkles, X, Layers } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const CardItem = ({ card, isOwned, onManage }: { card: SupportCard, isOwned: boolean, onManage: () => void }) => {
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
          {card.hasUniqueSkill && (
            <div className="bg-amber-400 text-white p-1.5 rounded-full shadow-md w-fit border border-white" title="Habilidade Única">
              <Sparkles size={14} fill="currentColor" />
            </div>
          )}
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
          onClick={onManage}
          className={clsx(
            "mt-auto w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors",
            isOwned 
              ? "bg-pink-100 text-uma-pink hover:bg-pink-200" 
              : "bg-uma-pink text-white hover:bg-uma-pink-hover shadow-md"
          )}
        >
          {isOwned ? (
            <>
              <Layers size={16} /> Gerenciar
            </>
          ) : (
            <>
              <Layers size={16} /> Adicionar
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const DeckSelectionModal = ({ card, decks, onToggle, onClose }: { card: SupportCard, decks: Deck[], onToggle: (deckId: string) => void, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md relative border border-pink-100"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors">
          <X size={18} />
        </button>
        
        <div className="flex gap-4 items-center mb-6">
          <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-pink-50 flex items-center justify-center p-1">
            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 leading-tight">Configurar Decks</h3>
            <p className="text-sm font-medium text-slate-500 line-clamp-1">{card.name}</p>
          </div>
        </div>

        <div className="space-y-2">
          {decks.map(deck => {
            const isOwned = deck.cards.includes(card.id);
            const isFull = deck.cards.length >= 6;
            
            return (
              <div key={deck.id} className={clsx(
                "flex justify-between items-center p-3 rounded-xl border-2 transition-colors",
                isOwned ? "bg-pink-50 border-pink-200" : "bg-white border-slate-100 hover:border-pink-100"
              )}>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{deck.name}</span>
                  <span className={clsx(
                    "text-xs font-bold", 
                    isFull && !isOwned ? "text-red-500" : "text-slate-500"
                  )}>
                    {deck.cards.length}/6 cartas {isFull && !isOwned && "(Lotado)"}
                  </span>
                </div>
                <button
                  disabled={!isOwned && isFull}
                  onClick={() => onToggle(deck.id)}
                  className={clsx(
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-50",
                    isOwned ? "bg-red-100 text-red-600 hover:bg-red-200 border border-red-200 text-shadow-sm" :
                    "bg-uma-pink text-white border border-pink-500 hover:bg-uma-pink-hover shadow-sm"
                  )}
                >
                  {isOwned ? "Remover" : "Adicionar"}
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

const Cards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas');
  const { decks, toggleCardInDeck } = useDeck();
  const [managingCard, setManagingCard] = useState<SupportCard | null>(null);

  const categories = ['Todas', 'Econômicas', 'SSR', 'SR', 'Speed', 'Stamina', 'Power', 'Guts', 'Intelligence', 'Friend/Group'];
  const typeMap: Record<string, string> = {
    'Speed': 'Velocidade',
    'Stamina': 'Estamina',
    'Power': 'Poder',
    'Guts': 'Determinação',
    'Intelligence': 'Inteligência',
    'Friend/Group': 'Amigo/Grupo'
  };

  const filteredCards = SUPPORT_CARDS.filter(card => {
    const matchSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchCategory = true;
    if (category === 'SSR') matchCategory = card.rarity === 'SSR';
    else if (category === 'SR') matchCategory = card.rarity === 'SR';
    else if (category === 'Econômicas') matchCategory = !!card.isEconomic;
    else if (typeMap[category]) matchCategory = card.type === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-pink-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-black text-uma-pink drop-shadow-sm">Cartas de Suporte</h1>
          <p className="text-slate-500 font-bold text-xs sm:text-base">Veja e adicione as cartas SSR ao seu deck!</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300" size={18} />
          <input
            type="text"
            placeholder="Buscar pelo nome..."
            className="w-full bg-pink-50 border-2 border-pink-200 text-slate-700 rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-uma-pink focus:ring-4 focus:ring-pink-100 transition-all font-bold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-full text-xs font-black transition-all border shadow-sm",
              category === cat
                ? "bg-uma-pink text-white border-uma-pink scale-105"
                : "bg-white text-slate-500 border-slate-100 hover:text-uma-pink hover:border-uma-pink active:scale-95"
            )}
          >
            {typeMap[cat] || cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        <AnimatePresence>
          {filteredCards.map(card => {
            const isInAnyDeck = decks.some(d => d.cards.includes(card.id));
            return (
              <CardItem 
                key={card.id} 
                card={card} 
                isOwned={isInAnyDeck} 
                onManage={() => setManagingCard(card)} 
              />
            )
          })}
        </AnimatePresence>
        
        {filteredCards.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-pink-200">
            <p className="text-xl font-bold">Nenhuma carta encontrada.</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {managingCard && (
          <DeckSelectionModal
            card={managingCard}
            decks={decks}
            onToggle={(deckId) => toggleCardInDeck(deckId, managingCard.id)}
            onClose={() => setManagingCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cards;
