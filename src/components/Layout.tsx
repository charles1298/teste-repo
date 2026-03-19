import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, ActivitySquare, Map as MapIcon } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Layout = () => {
  const navItems = [
    { to: '/', label: 'Painel Central', icon: <LayoutDashboard size={20} /> },
    { to: '/items', label: 'Arsenal e Itens', icon: <PackageSearch size={20} /> },
    { to: '/analysis', label: 'Análise Avançada', icon: <ActivitySquare size={20} /> },
    { to: '/map', label: 'Mapa Interativo', icon: <MapIcon size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-arc-darker/90 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-widest text-white uppercase" style={{ textShadow: '0 0 10px var(--color-arc-accent)' }}>
                ARC <span className="text-arc-accent">Raiders</span> Guia
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        twMerge(
                          clsx(
                            'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-white',
                            isActive ? 'bg-arc-accent text-white shadow-[0_0_15px_var(--color-arc-accent)]' : 'text-gray-300 hover:bg-gray-800'
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
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
