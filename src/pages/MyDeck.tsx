import { useState, useRef, useEffect } from 'react';
import { SUPPORT_CARDS } from '../data/cards';
import { useDeck } from '../hooks/useDeck';
import { Star, Sparkles, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const MyDeck = () => {
  const { decks, renameDeck, toggleCardInDeck } = useDeck();
  const [activeDeckId, setActiveDeckId] = useState(decks[0]?.id || 'deck-1');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const activeDeck = decks.find(d => d.id === activeDeckId) || decks[0];
  const ownedCards = SUPPORT_CARDS.filter(c => activeDeck.cards.includes(c.id));

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingName]);

  const handleSaveName = () => {
    if (editNameValue.trim()) {
      renameDeck(activeDeckId, editNameValue.trim());
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveName();
    if (e.key === 'Escape') setIsEditingName(false);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-pink-100 flex flex-col gap-4">
        {/* Header and Deck count */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-uma-pink drop-shadow-sm flex items-center justify-center md:justify-start gap-2">
              Meus Decks <Star className="text-yellow-400 fill-yellow-400" size={24} />
            </h1>
            <p className="text-slate-500 font-bold text-xs sm:text-base">Organize até 5 decks de suporte diferentes.</p>
          </div>
          <div className="bg-pink-50 py-1.5 px-5 rounded-full border border-pink-200 shadow-inner flex items-center">
            <span className={clsx("font-black text-base sm:text-lg", ownedCards.length === 6 ? "text-red-500" : "text-uma-pink")}>{ownedCards.length}</span>
            <span className="text-uma-pink font-black text-base sm:text-lg">/6</span>
            <span className="text-slate-500 font-bold ml-2 text-xs sm:text-sm">cartas salvas</span>
          </div>
        </div>

        {/* Deck Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mt-2">
          {decks.map(deck => (
            <button
              key={deck.id}
              onClick={() => {
                setActiveDeckId(deck.id);
                setIsEditingName(false);
              }}
              className={clsx(
                "flex-shrink-0 px-5 py-2.5 text-sm font-black rounded-xl border-2 transition-all",
                activeDeckId === deck.id
                  ? "bg-pink-50 border-uma-pink text-uma-pink shadow-sm transform scale-105"
                  : "bg-white border-slate-200 text-slate-500 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/30"
              )}
            >
              <div className="flex items-center gap-2">
                {deck.name}
                <span className="text-[10px] font-bold text-white bg-slate-300 px-1.5 py-0.5 rounded-full ml-1">
                  {deck.cards.length}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Deck Editor */}
        <div className="flex justify-between items-center bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
          <div className="flex items-center gap-3 w-full max-w-sm">
            {isEditingName ? (
              <div className="flex items-center w-full gap-2">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={editNameValue}
                  onChange={e => setEditNameValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveName}
                  maxLength={20}
                  className="flex-grow bg-white border-2 border-uma-pink rounded-lg px-3 py-1.5 text-slate-700 font-bold focus:outline-none"
                />
                <button onMouseDown={e => e.preventDefault()} onClick={handleSaveName} className="p-2 bg-uma-pink text-white rounded-lg hover:bg-uma-pink-hover">
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-700">{activeDeck.name}</h3>
                <button 
                  onClick={() => {
                    setEditNameValue(activeDeck.name);
                    setIsEditingName(true);
                  }}
                  className="text-slate-400 hover:text-uma-pink transition-colors"
                  title="Renomear Deck"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        <AnimatePresence>
          {ownedCards.map(card => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={card.id}
              className="card group border-uma-pink shadow-md flex flex-col"
            >
              <div className="relative w-full aspect-[5/7] mb-3 overflow-hidden rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100 p-1">
                <img 
                  src={card.imageUrl} 
                  alt={card.name} 
                  className="object-contain w-full h-full" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Uma_Musume_Pretty_Derby_logo.png/400px-Uma_Musume_Pretty_Derby_logo.png';
                  }}
                />
                
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
                </div>
                <button 
                  onClick={() => toggleCardInDeck(activeDeckId, card.id)}
                  className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  title="Remover do deck"
                >
                  <Star size={16} className="fill-red-500" />
                </button>
              </div>
              <div className="flex flex-col flex-grow text-center justify-center">
                <h3 className="text-sm font-bold text-gray-800 line-clamp-2">{card.name}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {ownedCards.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-pink-200">
            <Star size={48} className="mx-auto text-pink-200 mb-4" />
            <p className="text-xl font-bold text-slate-500 mb-2">Este deck está vazio.</p>
            <p>Vá até a aba de Cartas de Suporte para adicionar cartas em "{activeDeck.name}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDeck;
