import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Bell, MapPin, ClipboardList, Camera, 
  UtensilsCrossed, User, Search, Settings, HelpCircle, Trophy, ShoppingCart
} from 'lucide-react';

const notifications = [
  { id: 1, type: 'recipe', title: 'Nova receita!', text: '"Omelete de Frango" com itens da despensa!', time: 'Há 5 min', unread: true },
  { id: 2, type: 'coupon', title: 'Novo cupom!', text: 'Você ganhou R$ 5,00 de desconto no Mercado Local.', time: 'Há 30 min', unread: true },
  { id: 3, type: 'price', title: 'Preço baixou!', text: 'Arroz 5kg está R$ 22,90 no Supermercado.', time: 'Há 2 horas', unread: false },
];

export default function Layout() {
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const NavItems = () => (
    <>
      <NavLink to="/" className={({isActive}) => `flex flex-col lg:flex-row items-center gap-1 lg:gap-4 flex-1 lg:flex-none p-2 lg:p-3.5 lg:rounded-2xl transition-all font-medium ${isActive ? 'text-green-600 lg:bg-green-50 lg:shadow-sm' : 'text-gray-400 hover:text-green-500 lg:hover:bg-gray-50'}`}>
        <MapPin size={22} className={location.pathname === '/' ? 'text-green-600' : ''} />
        <span className={`text-[10px] lg:text-[15px] mt-1 lg:mt-0 ${location.pathname === '/' ? 'font-bold' : ''}`}>Dashboard</span>
      </NavLink>
      <NavLink to="/list" className={({isActive}) => `flex flex-col lg:flex-row items-center gap-1 lg:gap-4 flex-1 lg:flex-none p-2 lg:p-3.5 lg:rounded-2xl transition-all font-medium ${isActive ? 'text-green-600 lg:bg-green-50 lg:shadow-sm' : 'text-gray-400 hover:text-green-500 lg:hover:bg-gray-50'}`}>
        <ClipboardList size={22} className={location.pathname === '/list' ? 'text-green-600' : ''} />
        <span className={`text-[10px] lg:text-[15px] mt-1 lg:mt-0 ${location.pathname === '/list' ? 'font-bold' : ''}`}>Minha Lista</span>
      </NavLink>
      
      {/* SCAN - Emphasized on mobile, integrated smoothly on desktop */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 lg:flex-none lg:p-3.5 lg:rounded-2xl lg:bg-gradient-to-r lg:from-green-500 lg:to-green-600 lg:text-white lg:hover:shadow-lg lg:hover:-translate-y-0.5 cursor-pointer -mt-6 lg:mt-2 relative lg:static transition-all shadow-glow-green lg:shadow-md">
        <div className="w-14 h-14 lg:w-auto lg:h-auto rounded-full lg:rounded-none bg-green-500 lg:bg-transparent flex items-center justify-center text-white shadow-lg lg:shadow-none hover:scale-105 active:scale-95 transition-all">
          <Camera size={24} className="lg:w-5 lg:h-5" />
        </div>
        <span className="text-[10px] lg:text-[15px] font-bold text-green-600 lg:text-white mt-1 lg:mt-0 lg:ml-3">Escanear Nota</span>
      </div>

      <NavLink to="/recipes" className={({isActive}) => `flex flex-col lg:flex-row items-center gap-1 lg:gap-4 flex-1 lg:flex-none p-2 lg:p-3.5 lg:rounded-2xl transition-all font-medium ${isActive ? 'text-green-600 lg:bg-green-50 lg:shadow-sm' : 'text-gray-400 hover:text-green-500 lg:hover:bg-gray-50'}`}>
        <UtensilsCrossed size={22} className={location.pathname === '/recipes' ? 'text-green-600' : ''} />
        <span className={`text-[10px] lg:text-[15px] mt-1 lg:mt-0 ${location.pathname === '/recipes' ? 'font-bold' : ''}`}>Despensa</span>
      </NavLink>
      <NavLink to="/profile" className={({isActive}) => `flex flex-col lg:flex-row items-center gap-1 lg:gap-4 flex-1 lg:flex-none p-2 lg:p-3.5 lg:rounded-2xl transition-all font-medium ${isActive ? 'text-green-600 lg:bg-green-50 lg:shadow-sm' : 'text-gray-400 hover:text-green-500 lg:hover:bg-gray-50'}`}>
        <User size={22} className={location.pathname === '/profile' ? 'text-green-600' : ''} />
        <span className={`text-[10px] lg:text-[15px] mt-1 lg:mt-0 ${location.pathname === '/profile' ? 'font-bold' : ''}`}>Meu Perfil</span>
      </NavLink>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#f0f2f5] font-sans">
      
      {/* ====== DESKTOP SIDEBAR ====== */}
      <aside className="hidden lg:flex flex-col w-[280px] border-r border-gray-200 bg-white fixed top-0 bottom-0 left-0 z-50 shadow-sm">
        <div className="p-7 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-md">
             <ShoppingCart size={22} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-800">
            Mercado<span className="text-green-600">Map</span>
          </span>
        </div>
        
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
               PS
             </div>
             <div>
               <p className="text-sm font-bold text-gray-800">Pedro Silva</p>
               <p className="text-xs text-orange-500 font-medium flex items-center gap-1">
                 <Trophy size={12}/> Nível 3 - Caçador
               </p>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1.5 overflow-y-auto python-scrollbar py-2">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 mb-2 mt-2">Navegação Principal</p>
           <NavItems />
           
           <hr className="my-4 border-gray-100 mx-4" />
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Opções</p>
           
           <button className="flex flex-row items-center gap-4 flex-none p-3.5 rounded-2xl transition-all font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 text-[15px] text-left">
             <Settings size={20} /> Configurações
           </button>
           <button className="flex flex-row items-center gap-4 flex-none p-3.5 rounded-2xl transition-all font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 text-[15px] text-left">
             <HelpCircle size={20} /> Ajuda
           </button>
        </nav>
      </aside>

      {/* ====== MAIN CONTENT WRAPPER ====== */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen relative w-full">
        
        {/* ====== HEADER ====== */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl px-5 lg:px-8 py-3.5 flex justify-between items-center w-full border-b border-gray-100 shadow-sm">
          {/* Logo on mobile only inline */}
          <div className="lg:hidden flex items-center gap-2">
            <ShoppingCart className="text-green-500" size={24} />
            <span className="text-xl font-extrabold text-gray-800">M<span className="text-green-600">Map</span></span>
          </div>

          {/* Search bar for desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-full text-sm placeholder-gray-500 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all outline-none text-gray-800" 
                placeholder="Pesquisar produtos, mercados ou receitas..." 
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto" ref={notifRef}>
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-all shadow-sm"
              aria-label="Notificações"
            >
              <Bell size={20} />
              <div className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>

            {notifOpen && (
              <div className="absolute top-16 right-5 lg:right-8 w-80 max-w-[90vw] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden animate-scaleIn origin-top-right z-50">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Notificações</h3>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md cursor-pointer hover:bg-green-100">Marcar lidas</span>
                </div>
                <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                  {notifications.map(n => (
                     <div key={n.id} className={`p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${n.unread ? 'bg-[#f0fdf5]/50' : ''}`}>
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.type === 'recipe' ? 'bg-orange-100 text-orange-600' : n.type === 'coupon' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                         {n.type === 'recipe' ? <UtensilsCrossed size={18}/> : n.type === 'coupon' ? <ShoppingCart size={18}/> : <Bell size={18}/>}
                       </div>
                       <div>
                         <p className="text-[13px] font-bold text-gray-800">{n.title}</p>
                         <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{n.text}</p>
                         <p className="text-[10px] text-gray-400 mt-1 font-medium">{n.time}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ====== PAGE INJECTION ====== */}
        <main className="flex-1 pb-24 lg:pb-10 pt-4 lg:pt-6 w-full">
          <Outlet />
        </main>

        {/* ====== MOBILE BOTTOM NAV ====== */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-[72px] bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] px-2 flex justify-between items-center pb-[env(safe-area-inset-bottom)]">
           <NavItems />
        </nav>
      </div>
    </div>
  );
}
