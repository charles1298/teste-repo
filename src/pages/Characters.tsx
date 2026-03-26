import { useState } from 'react';
import { PLAYABLE_CHARACTERS, getCardById } from '../data/characters';
import type { PlayableCharacter, RecommendedCard } from '../data/characters';
import { Search, ChevronDown, ChevronUp, Trophy, MapPin, X, Info } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { useDeck } from '../hooks/useDeck';

const scenarioColors: Record<string, string> = {
  'U.A.F. Ready GO!': 'bg-rose-500',
  'Grand Masters': 'bg-amber-500',
  'Project L\'Arc': 'bg-blue-600',
  'URA Finale': 'bg-slate-500',
  'Unity Cup': 'bg-green-500',
  'Trackblazer': 'bg-purple-500',
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
  'Friend/Group': '/assets/icons/icon-type-5.png',
  'Unknown': '/assets/icons/icon-type-5.png',
  'Group': '/assets/icons/icon-type-5.png',
};

const getMockCardEffect = (card: any, reason: string) => {
  const effects = [];
  if (card.type === 'Speed') effects.push('Aumenta significativamente a Velocidade (Speed) durante os treinos.');
  else if (card.type === 'Stamina') effects.push('Focado no ganho de Estamina (Stamina) e bônus de recuperação máxima.');
  else if (card.type === 'Power') effects.push('Melhora o ganho de Poder (Power) e oferece melhores bônus de corrida.');
  else if (card.type === 'Guts') effects.push('Fornece bônus vitais de Guts (Determinação) e bônus de motivação.');
  else if (card.type === 'Intelligence') effects.push('Garante maior recuperação de energia e atributos de Inteligência.');
  else if (card.type === 'Friend' || card.type === 'Friend/Group' || card.type === 'Group' || card.type === 'Unknown') effects.push('Reduz o consumo de energia e previne falhas em treinamentos.');

  effects.push(`Foco principal desta carta: ${reason}.`);
  if (card.hasUniqueSkill) effects.push('Possui Habilidade Única (Gold Skill) que tem ótimo desempenho na corrida.');
  if (card.isEconomic) effects.push('Carta com excelente custo-benefício para jogadores F2P.');
  
  return effects;
};

const CardModal = ({ card, reason, onClose }: { card: any, reason: string, onClose: () => void }) => {
  if (!card) return null;
  const effects = getMockCardEffect(card, reason);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full relative border border-pink-100"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors">
          <X size={18} />
        </button>
        
        <div className="flex gap-4 items-start pr-8">
          <div className="w-24 shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-pink-50">
            <img src={card.imageUrl} alt={card.name} className="w-full h-auto object-contain" />
          </div>
          <div className="flex flex-col pt-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={clsx(
                "px-2 py-0.5 rounded-md text-[10px] font-black",
                card.rarity === 'SSR' ? 'bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900' :
                card.rarity === 'SR' ? 'bg-slate-200 text-slate-700' : 'bg-orange-200 text-orange-900'
              )}>
                {card.rarity || 'SSR'}
              </span>
              <img src={typeIcons[card.type]} alt={card.type} className="w-4 h-4 object-contain" />
            </div>
            <h3 className="text-base font-black text-slate-800 leading-tight">{card.name}</h3>
            <p className="text-xs font-bold text-uma-pink mt-1">{card.type}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="bg-pink-50/50 rounded-xl p-3 border border-pink-100">
            <h4 className="text-xs font-black text-slate-700 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
              <Info size={14} className="text-uma-pink" /> 
              Detalhes e Efeitos
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 font-medium">
              {effects.map((ef, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-uma-pink mt-0.5">•</span>
                  <span>{ef}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RecommendedCardItem = ({ item, isOwned = false, onClick }: { item: RecommendedCard, isOwned?: boolean, onClick?: () => void }) => {
  const card = getCardById(item.id);
  if (!card) return null;

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "flex flex-col items-center group relative p-1 rounded-xl transition-all bg-white hover:shadow-xl border border-slate-100",
        onClick && "cursor-pointer hover:border-pink-300 hover:shadow-pink-100",
        isOwned && "ring-2 ring-uma-pink ring-offset-1"
      )}
      onClick={onClick}
    >
      <div className="w-full aspect-[5/7] rounded-lg overflow-hidden bg-white border border-pink-100 relative shadow-sm group-hover:shadow-md transition-all">
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
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-uma-pink to-pink-500 text-white text-[8px] font-black py-0.5 text-center uppercase tracking-tighter shadow-lg">
            Possuída
          </div>
        )}
      </div>
      <div className="mt-1.5 w-full flex flex-col items-center gap-0.5 px-0.5">
        <span className="text-[10px] font-black text-slate-700 truncate w-full text-center leading-tight group-hover:text-uma-pink transition-colors">{card.name}</span>
        <span className="text-[8px] font-bold text-uma-pink bg-pink-50 px-1.5 py-0.5 rounded-full truncate w-full text-center border border-pink-100/50">
          {item.reason}
        </span>
      </div>
    </motion.div>
  );
};

const CharacterCard = ({ character, index, ownedDeck, onCardClick }: { character: PlayableCharacter; index: number; ownedDeck: string[]; onCardClick: (card: any, reason: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [activeVersionId, setActiveVersionId] = useState(character.versions[0].id);

  const activeVersion = character.versions.find(v => v.id === activeVersionId) || character.versions[0];
  const currentDeck = character.scenarioDecks[activeScenario];
  
  const categories: Record<string, RecommendedCard[]> = {
    'Speed': [], 'Stamina': [], 'Power': [], 'Guts': [], 'Intelligence': [], 'Friend': []
  };
  
  if (currentDeck) {
    currentDeck.cards.forEach(card => {
      if (categories[card.type]) {
        categories[card.type].push(card);
      }
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-pink-50/30 to-purple-50/30 rounded-2xl border border-pink-100/50 p-4 flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden shadow-md bg-white border-2 border-white">
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
                  <div className="flex-grow flex flex-col items-center sm:items-start w-full">
                    <h4 className="text-[10px] font-black text-uma-pink uppercase tracking-widest mb-2">
                      Trajes e Versões
                    </h4>
                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      {character.versions.map((ver) => (
                        <button
                          key={ver.id}
                          onClick={() => setActiveVersionId(ver.id)}
                          className={clsx(
                            "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border",
                            activeVersionId === ver.id
                              ? "bg-uma-pink text-white border-uma-pink shadow-sm scale-105"
                              : "bg-white text-slate-400 border-slate-100 hover:text-uma-pink hover:border-pink-200"
                          )}
                        >
                          {ver.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden shadow-lg border border-slate-800">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-uma-pink/10 blur-3xl rounded-full -mr-10 -mt-10" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-black text-uma-pink uppercase tracking-widest">Build & Estratégia</h4>
                      <div className="bg-white/10 px-2 py-0.5 rounded-full text-[9px] font-bold border border-white/10">
                        {character.style}
                      </div>
                    </div>
                    
                    {(() => {
                      const details = character.runningStyleDetails;
                      if (!details) {
                        return (
                          <div className="flex items-center justify-center h-full text-slate-500 text-[10px] italic">
                            Dados de build em atualização...
                          </div>
                        );
                      }
                      
                      return (
                        <div className="space-y-3 flex-grow">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] text-slate-400 font-bold">Foco:</span>
                            {details.statsPriority.map((stat, i) => (
                              <div key={stat} className="flex items-center">
                                <span className={clsx(
                                  "text-[10px] font-black px-1.5 py-0.5 rounded-md",
                                  i === 0 ? "bg-uma-pink text-white shadow-sm" : "bg-white/10 text-slate-200"
                                )}>
                                  {stat}
                                </span>
                                {i < details.statsPriority.length - 1 && (
                                  <span className="mx-1 text-slate-600 text-[8px]">▶</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic border-l-2 border-uma-pink/30 pl-2">
                            "{details.reasoning}"
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {character.scenarioDecks.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-2 rounded-2xl border border-slate-100 mt-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 mr-1 pl-2">Cenário:</span>
                    {character.scenarioDecks.map((deck, i) => (
                      <button
                        key={deck.scenario}
                        onClick={() => { setActiveScenario(i); setActiveDeckIdx(0); }}
                        className={clsx(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                          activeScenario === i
                            ? `${scenarioColors[deck.scenario] || 'bg-uma-pink'} text-white shadow-sm`
                            : "bg-white text-slate-500 hover:bg-slate-200 border border-slate-200"
                        )}
                      >
                        <Trophy size={12} className="inline mr-1" />
                        {deck.scenario}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x mt-2">
                        {currentDeck.decks.map((deckVar, dIdx) => (
                          <button
                            key={dIdx}
                            onClick={() => setActiveDeckIdx(dIdx)}
                            className={clsx(
                              "flex-shrink-0 px-4 py-2 text-xs font-black rounded-xl border transition-all snap-start",
                              activeDeckIdx === dIdx
                                ? (deckVar.tier === 'S' ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-400 text-amber-900 shadow-sm ring-1 ring-amber-300' : 'bg-pink-50 border-uma-pink text-uma-pink shadow-sm')
                                : "bg-white border-slate-200 text-slate-500 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/30"
                            )}
                          >
                            {deckVar.tier && (
                              <span className={clsx(
                                "mr-1.5 px-1.5 py-0.5 rounded text-[9px] uppercase font-black tracking-wider",
                                deckVar.tier === 'S' ? 'bg-amber-400 text-amber-950' :
                                deckVar.tier === 'A' ? 'bg-rose-400 text-white' : 'bg-blue-400 text-white'
                              )}>
                                Tier {deckVar.tier}
                              </span>
                            )}
                            {deckVar.name}
                          </button>
                        ))}
                      </div>

                      {(() => {
                        const deckVar = currentDeck.decks[activeDeckIdx];
                        return (
                          <motion.div
                            key={`${character.id}-${activeScenario}-${activeDeckIdx}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={clsx(
                              "rounded-2xl p-4 sm:p-5 border relative overflow-hidden",
                              deckVar.tier === 'S' ? "bg-gradient-to-br from-amber-50/50 to-orange-50/30 border-amber-300 shadow-md ring-1 ring-amber-100" :
                              deckVar.tier === 'A' ? "bg-gradient-to-br from-rose-50/50 to-pink-50/30 border-rose-200 shadow-sm" :
                              "bg-white border-slate-200 shadow-sm"
                            )}
                          >
                            <div className="flex flex-col mb-4 border-b border-black/5 pb-4 relative z-10">
                              <div className="flex items-center gap-3">
                                <h4 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1.5">
                                  {deckVar.tier === 'S' && <Trophy size={18} className="text-amber-500 fill-amber-500 drop-shadow-sm" />}
                                  {deckVar.name}
                                </h4>
                                <span className="ml-auto text-[10px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200 shadow-sm">
                                  {deckVar.recommendedIds.length} Cartas
                                </span>
                              </div>
                              {deckVar.description && (
                                <p className="text-[13px] font-medium text-slate-600 mt-2.5 leading-relaxed bg-white/70 p-3 rounded-xl border border-white shadow-sm inline-block italic">
                                  {deckVar.description}
                                </p>
                              )}
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 relative z-10">
                              {deckVar.recommendedIds.map(id => {
                                const card = getCardById(id);
                                if (!card) return null;
                                const poolCard = currentDeck.cards.find(c => c.id === id);
                                return (
                                  <div key={id} className="relative group flex justify-center w-full">
                                    <RecommendedCardItem 
                                      item={{ id, reason: poolCard?.reason || card.type, type: poolCard?.type || (card.type as any) }} 
                                      isOwned={ownedDeck.includes(id)} 
                                      onClick={() => onCardClick(card, poolCard?.reason || card.type as string)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })()}
                    </div>

                    <div className="pt-2 border-t border-dashed border-slate-200 mt-6">
                      <button
                        onClick={() => setShowCategories(!showCategories)}
                        className="w-full py-3 flex items-center justify-center gap-2 text-xs font-black text-slate-500 hover:text-uma-pink bg-slate-50 hover:bg-pink-50 rounded-xl transition-colors border border-slate-100 hover:border-pink-200"
                      >
                        <Search size={14} />
                        {showCategories ? 'Ocultar Opções Extras por Categoria' : 'Ver Opções Extras por Categoria'}
                        {showCategories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      
                      <AnimatePresence>
                        {showCategories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                              {Object.entries(categories).map(([type, cards]) => (
                                <div key={type} className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                                  <div className="flex items-center gap-1.5 mb-3 border-b border-slate-200/50 pb-2 pl-1">
                                    <img src={typeIcons[type]} alt={type} className="w-5 h-5 drop-shadow-sm" />
                                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider">
                                      {typeNames[type]}
                                    </span>
                                    <span className="ml-auto text-[9px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded-full border border-slate-100">
                                      {cards.length}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    {cards.map(item => (
                                      <RecommendedCardItem 
                                        key={item.id} 
                                        item={item} 
                                        isOwned={ownedDeck.includes(item.id)} 
                                        onClick={() => {
                                          const card = getCardById(item.id);
                                          if (card) onCardClick(card, item.reason);
                                        }}
                                      />
                                    ))}
                                    {cards.length === 0 && (
                                      <div className="col-span-3 py-3 text-center text-[10px] text-slate-400 font-medium italic bg-white rounded-lg border border-dashed border-slate-200">
                                        Nenhuma recomendação meta
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </>
              )}
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
  const [selectedCardInfo, setSelectedCardInfo] = useState<{card: any, reason: string} | null>(null);
  const { decks } = useDeck();
  const ownedDeck = decks ? decks.flatMap(d => d.cards) : [];

  const distances = ['Todas', 'Curta', 'Milha', 'Média', 'Longa'];

  const filtered = PLAYABLE_CHARACTERS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.nameJp.includes(searchTerm);
    const matchDist = distanceFilter === 'Todas' || c.distance === distanceFilter;
    return matchSearch && matchDist;
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="sticky top-0 z-50 pt-4 pb-2 bg-slate-50/80 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6 mb-6 border-b border-pink-100/50">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-pink-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-uma-pink drop-shadow-sm flex items-center gap-2">
                <span className="bg-uma-pink text-white p-1 rounded-lg text-xl sm:text-2xl">🏇</span> 
                Personagens
              </h1>
              <p className="text-slate-400 font-bold text-xs sm:text-sm mt-1">
                {PLAYABLE_CHARACTERS.length} corredoras e seus melhores decks
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300" size={18} />
              <input
                type="text"
                placeholder="Buscar personagem..."
                className="w-full bg-pink-50 border-2 border-pink-200 text-slate-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-uma-pink focus:ring-4 focus:ring-pink-100 transition-all font-bold text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {distances.map(d => (
              <button
                key={d}
                onClick={() => setDistanceFilter(d)}
                className={clsx(
                  'px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black border transition-all uppercase tracking-wider',
                  distanceFilter === d
                    ? 'bg-uma-pink text-white border-uma-pink shadow-lg scale-105'
                    : 'bg-white text-slate-400 border-slate-100 hover:border-uma-pink hover:text-uma-pink shadow-sm'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((character, i) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              index={i} 
              ownedDeck={ownedDeck} 
              onCardClick={(card, reason) => setSelectedCardInfo({ card, reason })}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-pink-200"
        >
          <p className="text-xl font-bold">Nenhum personagem encontrado.</p>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedCardInfo && (
          <CardModal 
            card={selectedCardInfo.card} 
            reason={selectedCardInfo.reason} 
            onClose={() => setSelectedCardInfo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Characters;
