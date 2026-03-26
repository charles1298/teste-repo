import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Layers, Star, Users, Newspaper, Calendar, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { to: '/', label: 'Início', icon: <Home size={20} /> },
    { to: '/cards', label: 'Cartas de Suporte', icon: <Layers size={20} /> },
    { to: '/deck', label: 'Meu Deck', icon: <Star size={20} /> },
    { to: '/characters', label: 'Personagens', icon: <Users size={20} /> },
    { to: '/news', label: 'Notícias', icon: <Newspaper size={20} /> },
    { to: '/timeline', label: 'Timeline', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b-4 border-uma-pink sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <NavLink 
                to="/"
                className="flex items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform shadow-md border-2 border-pink-200 bg-white">
                  <img src="/assets/oguri-chibi-logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-2xl font-black text-gray-800 leading-none group-hover:text-uma-pink transition-colors">
                    Umamusume
                  </span>
                  <span className="text-xs font-bold text-uma-pink tracking-widest uppercase mt-0.5">
                    Pretty Derby
                  </span>
                </div>
              </NavLink>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block z-10">
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        twMerge(
                          clsx(
                            'group relative flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300',
                            isActive 
                              ? 'text-white bg-uma-pink shadow-md scale-105' 
                              : 'text-slate-500 hover:text-uma-pink hover:bg-pink-50 hover:scale-105 active:scale-95'
                          )
                        )
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area with Page Transitions */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="page-transition"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-8 right-6 z-50 p-3 bg-uma-pink text-white rounded-full shadow-lg border-2 border-white hover:bg-uma-pink-hover transition-colors"
            title="Voltar ao topo"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t-2 border-pink-100 pb-safe z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.to} className="w-full">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  twMerge(
                    clsx(
                      'flex flex-col items-center justify-center w-full h-full p-2 text-[10px] font-bold transition-all duration-300 active:scale-90',
                      isActive ? 'text-uma-pink' : 'text-slate-400 hover:text-uma-pink'
                    )
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div 
                      animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                      className={clsx("p-1.5 rounded-full transition-colors", isActive && "bg-pink-100 mb-0.5")}
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Spacer to prevent content clipping on mobile behind bottom nav */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default Layout;
