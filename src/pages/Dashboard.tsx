import { ArrowRight, Trophy, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const FloatingCarrots = ({ count = 5, className = "" }: { count?: number, className?: string }) => {
  return (
    <div className={clsx("absolute pointer-events-none overflow-hidden", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0, 
            x: Math.random() * 100 - 50, 
            y: Math.random() * 100 - 50,
            rotate: Math.random() * 360 
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            x: [
              Math.random() * 30 - 15, 
              Math.random() * 50 - 25, 
              Math.random() * 70 - 35
            ],
            y: [
              Math.random() * 30 - 15, 
              Math.random() * -40 - 20, 
              Math.random() * -60 - 30
            ],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          className="absolute text-xl filter drop-shadow-sm select-none"
          style={{ 
            left: "50%", 
            top: "50%",
          }}
        >
          🥕
        </motion.span>
      ))}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="relative mt-8">
        <div className="absolute -top-16 right-4 md:right-12 z-20 group">
          <FloatingCarrots count={6} className="inset-0" />
          {/* Side Carrots - More Centralized */}
          <motion.span 
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-10 text-2xl select-none z-20"
          >
            🥕
          </motion.span>
          <motion.span 
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-2 top-14 text-xl select-none z-20"
          >
            🥕
          </motion.span>

          <motion.img 
            src="/assets/oguri-peeking.png" 
            alt="Oguri Cap" 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-32 md:w-40 h-auto object-contain drop-shadow-[0_10px_10px_rgba(236,72,153,0.3)] cursor-help rounded-full bg-white p-1 border-2 border-pink-200 transition-all duration-300 relative z-10"
          />
        </div>
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-uma-pink to-pink-400 p-8 md:p-12 shadow-xl border-4 border-pink-200">
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/assets/uma-pattern.png')", backgroundSize: "200px", animation: "scroll-pattern 20s linear infinite" }}></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full translate-y-1/4 -translate-x-1/4 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-white">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-md cursor-default">
              Bem-vindo à <br/><span className="text-yellow-300">Tracen Academy!</span>
            </h1>
            <p className="text-pink-50 text-lg md:text-xl font-medium max-w-xl mb-8 leading-relaxed">
              Prepare suas garotas cavalo (Umamusume) para a glória no Twinkle Series. Monte o melhor deck de cartas de suporte e conquiste a vitória!
            </p>
            <NavLink to="/characters" className="inline-block bg-white text-uma-pink font-bold text-lg px-8 py-3 rounded-full hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all shadow-lg border-2 border-white">
               Treinar Personagens
            </NavLink>
          </div>
          <div className="hidden md:flex relative w-64 h-64 bg-white/10 rounded-full border-4 border-white/20 items-center justify-center p-4 backdrop-blur-sm shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500 overflow-visible group/logo">
             <FloatingCarrots count={6} className="inset-0" />
             {/* Side Carrots for Chibi - More Centralized */}
             <motion.span 
               animate={{ y: [0, -5, 0], rotate: [-10, 10, -10] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute left-2 bottom-12 text-2xl select-none z-20"
             >
               🥕
             </motion.span>
             <motion.span 
               animate={{ y: [0, -8, 0], rotate: [10, -10, 10] }}
               transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
               className="absolute right-2 top-12 text-2xl select-none z-20"
             >
               🥕
             </motion.span>
             
             <img 
               src="/assets/oguri-chibi-logo.png" 
               alt="Oguri Cap Logo" 
               className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover/logo:scale-110 transition-transform duration-500 relative z-10"
             />
          </div>
        </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl p-6 shadow-md border-2 border-pink-100 hover:border-uma-pink hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-pink-100 text-uma-pink rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Heart size={24} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Construa Laços</h2>
          <p className="text-gray-500 mb-4 font-medium leading-relaxed">
            As cartas de suporte são essenciais para treinar os atributos das suas Umamusume de forma eficaz.
          </p>
          <NavLink to="/cards" className="text-uma-pink font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Explorar Cartas <ArrowRight size={18} />
          </NavLink>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl p-6 shadow-md border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Trophy size={24} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Monte seu Deck</h2>
          <p className="text-gray-500 mb-4 font-medium leading-relaxed">
            Selecione até 6 cartas para preencher seu deck perfeito de treinamento e participar de eventos.
          </p>
          <NavLink to="/deck" className="text-blue-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Ver Meu Deck <ArrowRight size={18} />
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
