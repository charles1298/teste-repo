import { useState } from 'react';
import { PLAYABLE_CHARACTERS, type PlayableCharacter, getCardById } from '../data/characters';
import { Search, ChevronDown, ChevronUp, Trophy, MapPin, Zap, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const scenarioColors: Record<string, string> = {
  'URA Finals': 'bg-blue-500',
  'Aoharu Cup': 'bg-green-500',
  "L'Arc": 'bg-purple-500',
  'Grand Masters': 'bg-amber-500',
  'Deck Econômico': 'bg-rose-400',
};

const distanceColors: Record<string, string> = {
  'Curta': 'bg-red-100 text-red-700 border-red-200',
  'Milha': 'bg-sky-100 text-sky-700 border-sky-200',
  'Média': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Longa': 'bg-violet-100 text-violet-700 border-violet-200',
};

const styleEmoji: Record<string, string> = {
  'Runner': '🏃‍♀️',
  'Leader': '👑',
  'Betweener': '⚡',
  'Chaser': '🎯',
};

const CharacterCard = ({ character, index }: { character: PlayableCharacter; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);

  const currentDeck = character.scenarioDecks[activeScenario];
  const deckCards = currentDeck.cards.map(id => getCardById(id)).filter(Boolean);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-pink-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-pink-50 border-2 border-pink-200 flex-shrink-0 shadow-sm">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.style.display = 'none';
            }}
          />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-base font-black text-gray-800 truncate">{character.name}</h3>
          <p className="text-xs text-slate-400 font-medium">{character.nameJp}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full border', distanceColors[character.distance])}>
              <MapPin size={10} className="inline mr-0.5" />{character.distance}
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {styleEmoji[character.style]} {character.style}
            </span>
          </div>
        </div>
        <div className={clsx(
          "p-2 rounded-full transition-colors flex-shrink-0",
          expanded ? "bg-uma-pink text-white" : "bg-pink-100 text-uma-pink"
        )}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {character.scenarioDecks.map((deck, i) => (
                  <button
                    key={deck.scenario}
                    onClick={() => setActiveScenario(i)}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                      activeScenario === i
                        ? `${scenarioColors[deck.scenario] || 'bg-uma-pink'} text-white shadow-md scale-105`
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    )}
                  >
                    <Trophy size={12} className="inline mr-1" />
                    {deck.scenario}
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-100">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                  <Zap size={12} /> Melhor Deck - {currentDeck.scenario}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {deckCards.map(card => card && (
                    <div key={card.id} className="flex flex-col items-center">
                      <div className="w-full aspect-[5/7] rounded-lg overflow-hidden bg-white border border-pink-200 shadow-sm relative">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Uma_Musume_Pretty_Derby_logo.png/400px-Uma_Musume_Pretty_Derby_logo.png';
                          }}
                        />
                        <div className="absolute top-1 left-1 flex flex-col gap-1">
                          {card.typeIconUrl && (
                            <img src={card.typeIconUrl} alt={card.type} className="w-4 h-4 rounded-full bg-white/70 p-0.5" />
                          )}
                          {card.hasUniqueSkill && (
                            <div className="bg-amber-400 text-white p-0.5 rounded-full shadow-sm w-fit border border-white">
                              <Sparkles size={10} fill="currentColor" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 mt-1 text-center line-clamp-1 w-full">{card.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Characters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('Todas');

  const distances = ['Todas', 'Curta', 'Milha', 'Média', 'Longa'];

  const filtered = PLAYABLE_CHARACTERS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.nameJp.includes(searchTerm);
    const matchDist = distanceFilter === 'Todas' || c.distance === distanceFilter;
    return matchSearch && matchDist;
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-uma-pink drop-shadow-sm">🏇 Personagens</h1>
            <p className="text-slate-500 font-medium text-sm">
              {PLAYABLE_CHARACTERS.length} personagens jogáveis e seus melhores decks de suporte por cenário
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300" size={20} />
            <input
              type="text"
              placeholder="Buscar personagem..."
              className="w-full bg-pink-50 border-2 border-pink-200 text-slate-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-uma-pink focus:ring-2 focus:ring-pink-200 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {distances.map(d => (
            <button
              key={d}
              onClick={() => setDistanceFilter(d)}
              className={clsx(
                'px-4 py-1.5 rounded-full text-xs font-bold border transition-all',
                distanceFilter === d
                  ? 'bg-uma-pink text-white border-uma-pink shadow-md'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-uma-pink hover:text-uma-pink'
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((character, i) => (
          <CharacterCard key={character.id} character={character} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-pink-200">
          <p className="text-xl font-bold">Nenhum personagem encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default Characters;
