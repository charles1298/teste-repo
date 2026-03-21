import { NavLink, Outlet } from 'react-router-dom';
import { Home, Layers, Star, Users } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Layout = () => {
  const navItems = [
    { to: '/', label: 'Início', icon: <Home size={20} /> },
    { to: '/cards', label: 'Cartas de Suporte', icon: <Layers size={20} /> },
    { to: '/deck', label: 'Meu Deck', icon: <Star size={20} /> },
    { to: '/characters', label: 'Personagens', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-white border-b-4 border-uma-pink sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div 
                className="flex items-center group cursor-pointer" 
                onClick={() => window.location.href = '/'}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform shadow-md border-2 border-pink-200 bg-white">
                  <img src="/assets/oguri-peeking.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-2xl font-black text-gray-800 leading-none">
                    Umamusume
                  </span>
                  <span className="text-xs font-bold text-uma-pink tracking-widest uppercase mt-0.5">
                    Pretty Derby
                  </span>
                </div>
              </div>
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
                            'group relative flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold transition-all duration-200',
                            isActive 
                              ? 'text-white bg-uma-pink shadow-md' 
                              : 'text-slate-500 hover:text-uma-pink hover:bg-pink-50'
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

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-100 pb-safe z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.to} className="w-full">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  twMerge(
                    clsx(
                      'flex flex-col items-center justify-center w-full h-full p-2 text-[10px] font-bold transition-all',
                      isActive ? 'text-uma-pink' : 'text-slate-400 hover:text-uma-pink'
                    )
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={clsx("p-1.5 rounded-full", isActive && "bg-pink-100 mb-0.5")}>
                      {item.icon}
                    </div>
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
