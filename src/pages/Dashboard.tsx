import { ITEMS } from '../data/items';
import type { Rarity } from '../data/items';
import { useMapRotation } from '../hooks/useMapRotation';
import { getTopItems } from '../utils/analysis';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { currentMap, nextMap, timeLeftFormatted } = useMapRotation();
  const topItems = getTopItems(ITEMS, 3);

  // Calculate statistics
  const rarityCounts = ITEMS.reduce((acc, item) => {
    acc[item.rarity] = (acc[item.rarity] || 0) + 1;
    return acc;
  }, {} as Record<Rarity, number>);

  const totalItems = ITEMS.length;

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <h1 className="text-4xl font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-arc-accent to-blue-300">
          Command Center
        </h1>
        <p className="text-gray-400 mt-2">Overview of ARC Raiders database and operations.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Map Rotation Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-arc-accent border-b border-gray-700 pb-2">Active Drop Zone</h2>
          <div className="flex flex-col space-y-4">
            <div>
              <span className="text-gray-400 text-sm">Current Map:</span>
              <p className="text-2xl font-bold text-white tracking-wide">{currentMap}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Next Rotation:</span>
              <p className="text-lg text-gray-300">{nextMap}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <span className="text-gray-400 text-sm block mb-1">Time Remaining:</span>
              <div className="font-mono text-3xl font-bold text-red-400">
                {timeLeftFormatted}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Database Stats Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-arc-accent border-b border-gray-700 pb-2">Database Intel</h2>
          <div className="text-center mb-6">
            <span className="text-5xl font-black text-white">{totalItems}</span>
            <span className="text-gray-400 block mt-1 uppercase text-sm tracking-widest">Total Items</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded p-2 text-center border-l-2 border-[#94a3b8]">
              <span className="text-2xl font-bold text-[#94a3b8]">{rarityCounts['Common'] || 0}</span>
              <span className="block text-xs text-gray-400">Common</span>
            </div>
            <div className="bg-gray-800/50 rounded p-2 text-center border-l-2 border-[#3b82f6]">
              <span className="text-2xl font-bold text-[#3b82f6]">{rarityCounts['Rare'] || 0}</span>
              <span className="block text-xs text-gray-400">Rare</span>
            </div>
            <div className="bg-gray-800/50 rounded p-2 text-center border-l-2 border-[#a855f7]">
              <span className="text-2xl font-bold text-[#a855f7]">{rarityCounts['Epic'] || 0}</span>
              <span className="block text-xs text-gray-400">Epic</span>
            </div>
            <div className="bg-gray-800/50 rounded p-2 text-center border-l-2 border-[#eab308]">
              <span className="text-2xl font-bold text-[#eab308]">{rarityCounts['Legendary'] || 0}</span>
              <span className="block text-xs text-gray-400">Legendary</span>
            </div>
          </div>
        </motion.div>

        {/* Top Priority Items Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 md:col-span-2 lg:col-span-1"
        >
          <h2 className="text-xl font-semibold mb-4 text-arc-accent border-b border-gray-700 pb-2">Top Priority Gear</h2>
          <ul className="space-y-3">
            {topItems.map((item, index) => (
              <li key={item.id} className="flex items-center space-x-3 bg-gray-800/30 p-2 rounded border border-gray-700 hover:border-arc-accent transition-colors">
                <span className="text-2xl font-bold text-gray-600">#{index + 1}</span>
                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.type} | Score: {item.useValue}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
