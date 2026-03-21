import { useState } from 'react';
import { PLAYABLE_CHARACTERS, getCardById } from '../data/characters';
import type { PlayableCharacter, RecommendedCard } from '../data/characters';
import { Search, ChevronDown, ChevronUp, Trophy, MapPin, Zap } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { useDeck } from '../hooks/useDeck';

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

const typeNames: Record<string, string> = {
  'Speed': 'Velocidade',
  'Stamina': 'Estamina',
  'Power': 'Poder',
  'Guts': 'Determinação',
  'Intelligence': 'Inteligência',
  'Friend': 'Amigo/Grupo',
};

const typeIcons: Record<string, string> = {
  'Speed': '/assets/icons/icon-type-0.png',
  'Stamina': '/assets/icons/icon-type-1.png',
  'Power': '/assets/icons/icon-type-2.png',
  'Guts': '/assets/icons/icon-type-3.png',
  'Intelligence': '/assets/icons/icon-type-4.png',
  'Friend': '/assets/icons/icon-type-5.png',
};

const RecommendedCardItem = ({ item, isOwned = false }: { item: RecommendedCard, isOwned?: boolean }) => {
  const card = getCardById(item.id);
  if (!card) return null;

  return (
    <div className={clsx(
      "flex flex-col items-center group relative p-1 rounded-lg transition-all bg-white hover:shadow-md border border-slate-100",
      isOwned && "ring-2 ring-uma-pink ring-offset-1"
    )}>
      <div className="w-full aspect-[5/7] rounded-md overflow-hidden bg-white border border-pink-100 relative group-hover:scale-[1.02] transition-transform">
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
        {isOwned && (
          <div className="absolute bottom-0 inset-x-0 bg-uma-pink/90 text-white text-[8px] font-black py-0.5 text-center uppercase tracking-tighter">
            Você tem!
          </div>
        )}
      </div>
      <div className="mt-1 w-full flex flex-col items-center gap-0.5">
        <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center leading-tight">{card.name}</span>
        <span className="text-[9px] font-medium text-uma-pink bg-pink-50 px-1 rounded-sm truncate w-full text-center">
          {item.reason}
        </span>
      </div>
    </div>
  );
};

const CharacterCard = ({ character, index, ownedDeck }: { character: PlayableCharacter; index: number; ownedDeck: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeVersionId, setActiveVersionId] = useState(character.versions[0].id);

  const activeVersion = character.versions.find(v => v.id === activeVersionId) || character.versions[0];
  const currentDeck = character.scenarioDecks[activeScenario];
  
  // Group cards by type
  const categories: Record<string, RecommendedCard[]> = {
    'Speed': [], 'Stamina': [], 'Power': [], 'Guts': [], 'Intelligence': [], 'Friend': []
  };
  
  currentDeck.cards.forEach(card => {
    if (categories[card.type]) {
      categories[card.type].push(card);
    }
  });

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
        <div className="w-16 h-16 rounded-full overflow-hidden bg-pink-100 border-2 border-pink-200 flex-shrink-0 shadow-sm relative">
          <img
            src={activeVersion.iconUrl}
            alt={activeVersion.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}&background=fce7f3&color=db2777&bold=true`;
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
            <div className="px-4 pb-4 space-y-4">
              
              {/* Variações de Evento e Imagem Oficial */}
              <div className="bg-gradient-to-br from-pink-50/30 to-purple-50/30 rounded-2xl border border-pink-100/50 p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-shrink-0 w-32 h-44 rounded-xl overflow-hidden shadow-sm bg-white border border-pink-200">
                  <img
                    src={activeVersion.imageUrl}
                    alt={activeVersion.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Uma_Musume_Pretty_Derby_logo.png/400px-Uma_Musume_Pretty_Derby_logo.png';
                    }}
                  />
                </div>
                <div className="flex-grow flex flex-col items-center md:items-start w-full">
                  <h4 className="text-sm font-black text-uma-pink uppercase tracking-wider mb-2">
                    Versões Disponíveis
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {character.versions.map((ver) => (
                      <button
                        key={ver.id}
                        onClick={() => setActiveVersionId(ver.id)}
                        className={clsx(
                          "px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                          activeVersionId === ver.id
                            ? "bg-uma-pink text-white border-uma-pink shadow-md scale-105"
                            : "bg-white text-slate-500 border-slate-200 hover:text-uma-pink hover:border-uma-pink"
                        )}
                      >
                        {ver.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-3 text-center md:text-left">
                    Selecione uma versão para visualizar seu traje e ícone correspondente.
                  </p>
                </div>
              </div>

              {/* Scenarios */}
              <div className="flex flex-wrap gap-2">
                {character.scenarioDecks.map((deck, i) => (
                  <button
                    key={deck.scenario}
                    onClick={() => setActiveScenario(i)}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                      activeScenario === i
                        ? `${scenarioColors[deck.scenario] || 'bg-uma-pink'} text-white shadow-md scale-105`
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    )}
                  >
                    <Trophy size={12} className="inline mr-1" />
                    {deck.scenario}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {/* Recommended Deck - 6 Cards */}
                <div className="bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-2xl p-4 border border-pink-100/50 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
                      <Zap size={16} className="text-amber-400 fill-amber-400" /> 
                      Deck Recomendado - {currentDeck.scenario}
                    </p>
                    <span className="text-[10px] font-bold text-uma-pink bg-white px-2 py-0.5 rounded-full border border-pink-100 shadow-sm">
                      Padrão Meta (6 Cartas)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {currentDeck.recommendedIds.map(id => {
                      const card = getCardById(id);
                      if (!card) return null;
                      return (
                        <div key={id} className="relative group">
                          <RecommendedCardItem 
                            item={{ id, reason: card.type, type: card.type as any }} 
                            isOwned={ownedDeck.includes(id)} 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Categorized Options */}
                <div>
                  <p className="text-xs font-black text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2 px-2">
                    <Search size={14} />
                    Mais Opções por Categoria
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(categories).map(([type, cards]) => (
                      <div key={type} className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 mb-2 border-b border-slate-200/50 pb-1">
                          <img src={typeIcons[type]} alt={type} className="w-5 h-5" />
                          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                            {typeNames[type]}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {cards.map(item => (
                            <RecommendedCardItem key={item.id} item={item} isOwned={ownedDeck.includes(item.id)} />
                          ))}
                          {cards.length === 0 && (
                            <div className="col-span-3 py-2 text-center text-[10px] text-slate-400 font-medium italic">
                              Nenhuma recomendação meta
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
  const { deck: ownedDeck } = useDeck();

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
          <CharacterCard key={character.id} character={character} index={i} ownedDeck={ownedDeck} />
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
