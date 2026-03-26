import React from 'react';
import { motion } from 'framer-motion';
import { User, Layers, Info, ExternalLink } from 'lucide-react';
import type { Banner } from '../data/banners';
import clsx from 'clsx';

interface BannerCardProps {
  banner: Banner;
  index: number;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner, index }) => {
  const isCharacter = banner.type.includes('Character');
  const isSupport = banner.type.includes('Support');
  const isPaid = banner.type.includes('Paid');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index % 3 * 0.1 }}
      className="relative flex flex-col items-center w-full mb-16"
    >
      {/* Date floating label for desktop */}
      <div className="hidden md:block absolute -left-4 top-10 -translate-x-full">
         <div className="flex flex-col items-end">
            <span className="text-sm font-black text-slate-300 uppercase tracking-tighter">{banner.startDate}</span>
            <div className="w-8 h-1 bg-pink-100 rounded-full mt-1" />
         </div>
      </div>

      {/* Timeline Bullet (Desktop) */}
      <div className="absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-white border-4 border-uma-pink z-10 hidden md:block" />

      {/* Main Card */}
      <div className="w-full max-w-2xl px-4 z-20">
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-pink-50 group hover:border-uma-pink/50 transition-all duration-500 transform hover:-translate-y-1">
          
          {/* Header Strip */}
          <div className={clsx(
            "px-4 py-2 flex items-center justify-between border-b border-slate-50",
            isCharacter ? "bg-blue-50/50" : isSupport ? "bg-green-50/50" : isPaid ? "bg-yellow-50/50" : "bg-orange-50/50"
          )}>
            <div className="flex items-center space-x-2">
               <div className={clsx(
                 "p-1 rounded-lg text-white",
                 isCharacter ? "bg-blue-400" : isSupport ? "bg-green-400" : isPaid ? "bg-yellow-400" : "bg-orange-400"
               )}>
                 {isCharacter ? <User size={14} /> : isSupport ? <Layers size={14} /> : <Info size={14} />}
               </div>
               <span className={clsx(
                 "text-[11px] font-black uppercase tracking-wider",
                 isCharacter ? "text-blue-500" : isSupport ? "text-green-500" : isPaid ? "text-yellow-600" : "text-orange-500"
               )}>
                 {banner.type}
               </span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
               <span className="text-[10px] font-bold md:hidden">{banner.startDate}</span>
               <ExternalLink size={12} className="group-hover:text-uma-pink transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Banner Image Container - FIXED ASPECT RATIO 3.61:1 */}
          <div className="relative w-full aspect-[3.61/1] bg-slate-100 overflow-hidden">
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              className="w-full h-full object-contain sm:object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              loading="lazy"
            />
            {/* Soft overlay on hover */}
            <div className="absolute inset-0 bg-uma-pink/0 group-hover:bg-uma-pink/5 transition-colors duration-500" />
          </div>

          {/* Content Area */}
          <div className="p-5">
            <h3 className="text-lg font-black text-slate-800 leading-snug group-hover:text-uma-pink transition-colors">
              {banner.title}
            </h3>
            
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {banner.featured.map(item => (
                  <span key={item} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black rounded-full border border-slate-100 uppercase tracking-tighter">
                    {item}
                  </span>
                ))}
              </div>
              
              <button className="flex items-center space-x-1.5 px-4 py-1.5 bg-uma-pink text-white rounded-full text-[11px] font-black hover:bg-uma-pink-hover transition-colors shadow-sm active:scale-95 transform">
                <span>VER DETALHES</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BannerCard;
