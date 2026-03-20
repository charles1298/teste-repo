import { SUPPORT_CARDS } from '../data/cards';
import { useDeck } from '../hooks/useDeck';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyDeck = () => {
  const { deck, toggleCard } = useDeck();
  const ownedCards = SUPPORT_CARDS.filter(c => deck.includes(c.id));

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-uma-pink drop-shadow-sm flex items-center gap-3">
            Meu Deck <Star className="text-yellow-400 fill-yellow-400" size={28} />
          </h1>
          <p className="text-slate-500 font-medium">Suas cartas de suporte favoritas para treino.</p>
        </div>
        <div className="bg-pink-50 py-2 px-6 rounded-full border border-pink-200">
          <span className="font-bold text-uma-pink text-lg">{ownedCards.length}</span>
          <span className="text-slate-500 font-medium ml-2">cartas salvas</span>
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
              <div className="relative w-full aspect-[3/4] mb-3 overflow-hidden rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100">
                <img 
                  src={card.imageUrl} 
                  alt={card.name} 
                  className="object-cover w-full h-full" 
                />
                <button 
                  onClick={() => toggleCard(card.id)}
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
            <p className="text-xl font-bold text-slate-500 mb-2">Seu deck está vazio.</p>
            <p>Vá até a aba de Cartas de Suporte para preencher seu deck.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDeck;
