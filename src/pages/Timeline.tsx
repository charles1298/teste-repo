import React from 'react';
import { motion } from 'framer-motion';
import { BANNERS } from '../data/banners';
import BannerCard from '../components/BannerCard';
import { Clock, TrendingUp, Search, Filter } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-pink-100/50 text-uma-pink rounded-full border border-pink-200 mb-4 shadow-sm">
          <Clock size={16} />
          <span className="text-xs font-black uppercase tracking-widest">Global Timeline</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 drop-shadow-sm">
          Timeline de <span className="text-uma-pink">Banners</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Acompanhe o histórico de lançamentos, eventos e banners de personagens e cartas de suporte. 
          Use para o seu planejamento de meta no Umamusume Pretty Derby Global.
        </p>
      </motion.div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-2 bg-white rounded-full border-2 border-slate-100 text-slate-500 font-bold hover:border-uma-pink hover:text-uma-pink transition-all shadow-sm">
            <Filter size={18} />
            <span>Filtrar</span>
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-uma-pink transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar banner..." 
              className="pl-10 pr-4 py-2 bg-white border-2 border-slate-100 rounded-full focus:border-uma-pink outline-none shadow-sm transition-all w-full sm:w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-400">
          <TrendingUp size={18} className="text-uma-green" />
          <span>Focado no Meta atual</span>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative">
        {/* The Central Line (Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-slate-100 rounded-full hidden md:block" />
        
        {/* The Lateral Line (Mobile) */}
        <div className="absolute left-1 transform -translate-x-1/2 w-1 h-full bg-pink-50 rounded-full md:hidden" />

        <div className="space-y-4 md:space-y-0 relative">
          {BANNERS.map((banner, index) => (
            <BannerCard key={banner.id} banner={banner} index={index} />
          ))}
        </div>

        {/* Ending Marker */}
        <div className="flex justify-center mt-12 pb-20">
          <div className="px-8 py-3 bg-slate-50 text-slate-400 font-black rounded-full border-2 border-slate-100 uppercase tracking-widest text-xs">
            Início do Serviço Global
          </div>
        </div>
      </div>

      {/* Floating Today Button (Simplified) */}
      <button className="fixed bottom-24 right-8 bg-uma-pink text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 border-4 border-white">
        <Clock size={24} />
      </button>
    </div>
  );
};

export default Timeline;
