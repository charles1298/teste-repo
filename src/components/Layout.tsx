import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Layers, Star, Users, Newspaper, Calendar, ChevronUp } from 'lucide-react';
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

  const Logo = ({ isSidebar = false }: { isSidebar?: boolean }) => (
    <NavLink 
      to="/"
      className={clsx("flex items-center group cursor-pointer", isSidebar ? "justify-center w-full my-6 flex-col gap-3" : "")}
    >
      <div className={clsx(
        "bg-white rounded-full overflow-hidden flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform shadow-md border-2 border-pink-200",
        isSidebar ? "w-20 h-20" : "w-10 h-10 md:w-12 md:h-12"
      )}>
        <img src="/assets/oguri-chibi-logo.png" alt="Logo" className="w-full h-full object-contain p-0.5 relative z-10" />
      </div>
      <div className={clsx("flex flex-col", isSidebar ? "items-center" : "ml-2 md:ml-3")}>
        <span className={clsx("font-black text-gray-800 leading-none group-hover:text-uma-pink transition-colors", isSidebar ? "text-2xl mt-2" : "text-xl md:text-2xl")}>
          Umamusume
        </span>
        <span className={clsx("font-bold text-uma-pink tracking-widest uppercase mt-0.5", isSidebar ? "text-xs" : "text-[10px] md:text-xs")}>
          Pretty Derby
        </span>
      </div>
    </NavLink>
  );

  return (
    <div className="flex bg-transparent min-h-screen">
      
      {/* Desktop Sidebar (lg and up) */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 fixed inset-y-0 bg-white/90 backdrop-blur-xl border-r-4 border-uma-pink z-50 shadow-2xl">
        <Logo isSidebar={true} />
        
        <nav className="flex-1 px-4 mt-6 overflow-y-auto scrollbar-none pb-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                twMerge(
                  clsx(
                    'group relative flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-black transition-all duration-300 w-full',
                    isActive 
                      ? 'text-white bg-gradient-to-r from-uma-pink to-pink-500 shadow-md shadow-pink-200 scale-105' 
                      : 'text-slate-500 hover:text-uma-pink hover:bg-pink-50 hover:scale-105 active:scale-95 border border-transparent hover:border-pink-100'
                  )
                )
              }
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="text-sm xl:text-base">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="bg-pink-50/80 rounded-2xl p-4 border border-pink-100 text-center">
            <span className="text-[10px] uppercase font-black text-uma-pink tracking-widest">Tracen Academy</span>
            <p className="text-xs font-bold text-slate-500 mt-1">Database & Tools</p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-grow lg:ml-64 xl:ml-72 flex flex-col min-h-screen relative w-full">
        
        {/* Mobile/Tablet Top Navbar (hidden on lg) */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b-4 border-uma-pink sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Logo />
              {/* Tablet Hidden Nav? We'll rely on Bottom bar for MD */}
            </div>
          </div>
        </header>

        {/* Main Content Area with Page Transitions */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 relative z-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
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
              className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 p-3.5 bg-uma-pink text-white rounded-full shadow-lg border-3 border-white hover:bg-uma-pink-hover transition-colors"
              title="Voltar ao topo"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mobile/Tablet Navigation Bar */}
        <nav className="lg:hidden fixed bottom-1 left-2 right-2 bg-white/95 backdrop-blur-xl border-2 border-pink-100/50 pb-safe z-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl overflow-hidden">
          <ul className="flex justify-around items-center h-18">
            {navItems.map((item) => {
              const MobileIcon = React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 });
              return (
                <li key={item.to} className="w-full">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      twMerge(
                        clsx(
                          'flex flex-col items-center justify-center w-full h-full p-2 font-bold transition-all duration-300 active:scale-90',
                          isActive ? 'text-uma-pink' : 'text-slate-400 hover:text-uma-pink'
                        )
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <motion.div 
                          animate={isActive ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                          className={clsx(
                            "p-2 rounded-2xl transition-colors", 
                            isActive ? "bg-pink-100 shadow-sm shadow-pink-200/50 mb-1" : "mb-1"
                          )}
                        >
                          {MobileIcon}
                        </motion.div>
                        <span className="text-[9px] uppercase tracking-tighter leading-none">{item.label.split(' ')[0]}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Spacer to prevent content clipping on mobile behind bottom nav */}
        <div className="lg:hidden h-24"></div>
      </div>
    </div>
  );
};

export default Layout;
