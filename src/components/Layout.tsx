import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, ActivitySquare, Map as MapIcon, Wrench, Briefcase } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Layout = () => {
  const navItems = [
    { to: '/', label: 'Painel Central', icon: <LayoutDashboard size={20} /> },
    { to: '/items', label: 'Arsenal e Itens', icon: <PackageSearch size={20} /> },
    { to: '/analysis', label: 'Análise Avançada', icon: <ActivitySquare size={20} /> },
    { to: '/map', label: 'Mapa Interativo', icon: <MapIcon size={20} /> },
    { to: '/recipes', label: 'Receitas', icon: <Wrench size={20} /> },
    { to: '/inventory', label: 'Inventário', icon: <Briefcase size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-arc-darker/80 border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Tech decorative line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-arc-accent/50 to-transparent"></div>
          
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center group cursor-pointer" onClick={() => window.location.href = '/'}>
                <img 
                  src="/arc-logo.png" 
                  alt="ARC Raiders Logo" 
                  className="h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,77,0,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(255,77,0,0.9)] transition-all duration-300" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-2xl font-bold tracking-[0.2em] text-white uppercase ml-3" style={{ textShadow: '0 0 10px var(--color-arc-accent)' }}>
                  ARC <span className="text-arc-accent">Raiders</span>
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block z-10">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        twMerge(
                          clsx(
                            'group relative flex items-center space-x-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden clip-bevel',
                            isActive 
                              ? 'text-white bg-arc-accent/10 border border-arc-accent/50 shadow-[inset_0_0_10px_rgba(255,77,0,0.2)]' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                          )
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className={clsx(
                            "absolute left-0 top-0 bottom-0 w-1 transition-all duration-300",
                            isActive ? "bg-arc-accent" : "bg-transparent group-hover:bg-white/20"
                          )}></div>
                          <span className={clsx("relative z-10", isActive ? "text-arc-accent drop-shadow-[0_0_5px_rgba(255,77,0,0.8)]" : "")}>
                            {item.icon}
                          </span>
                          <span className="relative z-10">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Global Screen Effects */}
      <div className="scanlines pointer-events-none"></div>
      <div className="vignette pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-arc-darker border-t border-gray-800 pb-safe z-50">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  twMerge(
                    clsx(
                      'flex flex-col items-center justify-center w-full h-full p-2 text-xs transition-colors',
                      isActive ? 'text-arc-accent' : 'text-gray-400 hover:text-gray-200'
                    )
                  )
                }
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Spacer to prevent content clipping on mobile behind bottom nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Layout;
