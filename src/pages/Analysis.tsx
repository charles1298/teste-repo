import { useMemo } from 'react';
import { ITEMS } from '../data/items';
import type { Item } from '../data/items';
import { calculateTier, getTopItems, getRarestItems, getBestRecycleItems } from '../utils/analysis';
import type { Tier } from '../utils/analysis';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const TierRow = ({ tier, items }: { tier: Tier; items: Item[] }) => {
  const tierColors = {
    S: 'bg-red-900 border-red-500 text-red-100',
    A: 'bg-orange-900 border-orange-500 text-orange-100',
    B: 'bg-yellow-900 border-yellow-500 text-yellow-100',
    C: 'bg-green-900 border-green-500 text-green-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col md:flex-row mb-4 bg-arc-darker border border-gray-800 rounded shadow-[0_4px_15px_rgba(0,0,0,0.5)] overflow-hidden tech-border"
    >
      <div className={clsx('flex items-center justify-center p-6 w-full md:w-32 border-b md:border-b-0 md:border-r font-black text-5xl', tierColors[tier])}>
        {tier}
      </div>
      <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.length === 0 ? (
          <span className="text-gray-500 italic flex items-center col-span-full">Sem dados neste nível.</span>
        ) : (
          items.map(item => (
            <div key={item.id} className="relative group overflow-hidden rounded border border-gray-700 hover:border-arc-accent transition-colors bg-black/40">
              <img src={item.imageUrl} alt={item.name} className="w-full h-24 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="text-xs font-bold text-white truncate">{item.name}</p>
                <p className="text-[10px] text-gray-400">{item.rarity}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

const Analysis = () => {
  const tierList = useMemo(() => {
    const tiers: Record<Tier, Item[]> = { S: [], A: [], B: [], C: [] };
    ITEMS.forEach(item => {
      const tier = calculateTier(item);
      tiers[tier].push(item);
    });
    // Sort items within tiers by useValue descending
    Object.keys(tiers).forEach(t => {
      tiers[t as Tier].sort((a, b) => b.useValue - a.useValue);
    });
    return tiers;
  }, []);

  const topOverall = useMemo(() => getTopItems(ITEMS, 3), []);
  const topRare = useMemo(() => getRarestItems(ITEMS, 3), []);
  const topCrafting = useMemo(() => getBestRecycleItems(ITEMS, 3), []);

  return (
    <div className="space-y-12 pb-20 md:pb-10">
      <div className="border-b border-gray-800 pb-6 relative pl-4">
        <div className="absolute -left-0 top-0 bottom-0 w-1 bg-arc-accent shadow-[0_0_10px_var(--color-arc-accent)]"></div>
        <h1 className="text-3xl font-black text-white uppercase tracking-[0.1em] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Análise Tática</h1>
        <p className="text-arc-cyan/80 font-mono text-sm tracking-widest uppercase mt-1">Listas de eficácia e raridade geradas pela Rede.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-arc-accent mb-6 uppercase tracking-widest flex items-center">
          <span className="bg-arc-accent w-2 h-6 mr-3"></span> Lista de Níveis Automatizada
        </h2>
        <div className="space-y-4">
          <TierRow tier="S" items={tierList.S} />
          <TierRow tier="A" items={tierList.A} />
          <TierRow tier="B" items={tierList.B} />
          <TierRow tier="C" items={tierList.C} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="tech-border p-6 border-t-4 border-t-arc-accent">
          <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Melhor Equipamento de Campo</h3>
          <ul className="space-y-3">
            {topOverall.map((item, idx) => (
              <li key={item.id} className="flex items-center space-x-3 text-sm">
                <span className="text-arc-accent font-bold">0{idx + 1}</span>
                <span className="text-gray-300 flex-1 truncate">{item.name}</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Pontuação {item.useValue}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-border p-6 border-t-4 border-t-arc-cyan">
          <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Descobertas Mais Raras</h3>
          <ul className="space-y-3">
            {topRare.map((item, idx) => (
              <li key={item.id} className="flex items-center space-x-3 text-sm">
                <span className="text-yellow-500 font-bold">0{idx + 1}</span>
                <span className="text-gray-300 flex-1 truncate">{item.name}</span>
                <span className="text-[10px] bg-yellow-900/30 text-yellow-500 border border-yellow-700/50 px-2 py-1 rounded uppercase">{item.rarity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-border p-6 border-t-4 border-t-purple-500">
          <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Resgate de Sucata</h3>
          <ul className="space-y-3">
            {topCrafting.map((item, idx) => (
              <li key={item.id} className="flex items-center space-x-3 text-sm">
                <span className="text-purple-500 font-bold">0{idx + 1}</span>
                <span className="text-gray-300 flex-1 truncate">{item.name}</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-purple-400">Rendimento {item.recycleValue}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Analysis;
