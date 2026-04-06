import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Bell, X, MapPin, ClipboardList, Camera, 
  UtensilsCrossed, User
} from 'lucide-react';

const notifications = [
  { id: 1, type: 'recipe', title: 'Nova receita!', text: '"Bolo de Cenoura" com ingredientes da sua despensa!', time: 'Há 5 min', unread: true },
  { id: 2, type: 'coupon', title: 'Novo cupom!', text: 'Você ganhou R$ 5,00 de desconto no Mercado Preço Baixo.', time: 'Há 30 min', unread: true },
  { id: 3, type: 'price', title: 'Preço baixou!', text: 'Arroz Tio João está R$ 3,89 no Mercado Extra.', time: 'Há 2 horas', unread: false },
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
      <NavLink to="/" className={({isActive}) => `flex flex-col md:flex-row items-center gap-1 md:gap-4 flex-1 md:flex-none p-2 md:p-3 md:rounded-xl transition-colors ${isActive ? 'text-green-600 md:bg-green-50' : 'text-gray-400 hover:text-green-500'}`}>
        <MapPin size={22} className={location.pathname === '/' ? 'text-green-600' : ''} />
        <span className={`text-[10px] md:text-sm md:font-bold mt-1 md:mt-0 ${location.pathname === '/' ? 'font-bold' : 'font-medium'}`}>Início</span>
      </NavLink>
      <NavLink to="/list" className={({isActive}) => `flex flex-col md:flex-row items-center gap-1 md:gap-4 flex-1 md:flex-none p-2 md:p-3 md:rounded-xl transition-colors ${isActive ? 'text-green-600 md:bg-green-50' : 'text-gray-400 hover:text-green-500'}`}>
        <ClipboardList size={22} className={location.pathname === '/list' ? 'text-green-600' : ''} />
        <span className={`text-[10px] md:text-sm md:font-bold mt-1 md:mt-0 ${location.pathname === '/list' ? 'font-bold' : 'font-medium'}`}>Lista</span>
      </NavLink>
      
      {/* SCAN - Emphasized on mobile, regular on desktop */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 md:flex-none md:p-3 md:rounded-xl md:bg-green-600 md:text-white md:hover:bg-green-700 cursor-pointer -mt-6 md:mt-0 relative md:static">
        <div className="w-14 h-14 md:w-auto md:h-auto rounded-full md:rounded-none bg-green-600 md:bg-transparent flex items-center justify-center text-white shadow-lg md:shadow-none hover:scale-105 active:scale-95 transition-all">
          <Camera size={24} className="md:w-5 md:h-5" />
        </div>
        <span className="text-[10px] md:text-sm md:font-bold font-bold text-green-600 md:text-white mt-1 md:mt-0 md:ml-3">Escanear</span>
      </div>

      <NavLink to="/recipes" className={({isActive}) => `flex flex-col md:flex-row items-center gap-1 md:gap-4 flex-1 md:flex-none p-2 md:p-3 md:rounded-xl transition-colors ${isActive ? 'text-green-600 md:bg-green-50' : 'text-gray-400 hover:text-green-500'}`}>
        <UtensilsCrossed size={22} className={location.pathname === '/recipes' ? 'text-green-600' : ''} />
        <span className={`text-[10px] md:text-sm md:font-bold mt-1 md:mt-0 ${location.pathname === '/recipes' ? 'font-bold' : 'font-medium'}`}>Receitas</span>
      </NavLink>
      <NavLink to="/profile" className={({isActive}) => `flex flex-col md:flex-row items-center gap-1 md:gap-4 flex-1 md:flex-none p-2 md:p-3 md:rounded-xl transition-colors ${isActive ? 'text-green-600 md:bg-green-50' : 'text-gray-400 hover:text-green-500'}`}>
        <User size={22} className={location.pathname === '/profile' ? 'text-green-600' : ''} />
        <span className={`text-[10px] md:text-sm md:font-bold mt-1 md:mt-0 ${location.pathname === '/profile' ? 'font-bold' : 'font-medium'}`}>Perfil</span>
      </NavLink>
    </>
  );

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* ====== DESKTOP SIDEBAR ====== */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-100 bg-white fixed top-0 bottom-0 left-0 z-50">
        <div className="p-8">
          <span className="text-2xl font-extrabold tracking-tight text-gray-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-lg overflow-hidden">
               🍜
            </div>
            Kupa<span className="text-green-600">Map</span>
          </span>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-2">
           <NavItems />
        </nav>
      </aside>

      {/* ====== MAIN CONTENT WRAPPER ====== */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative w-full">
        
        {/* ====== HEADER ====== */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg px-5 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
              <User size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-medium">Delivery to</p>
              <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
                Rua Utama No.20 <X className="rotate-45" size={14} />
              </p>
            </div>
          </div>

          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
              aria-label="Notificações"
            >
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {notifOpen && (
              <div className="absolute top-12 right-0 w-80 max-w-[90vw] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden animate-scaleIn origin-top-right z-50">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                       <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">🔔</div>
                       <div>
                         <p className="text-sm font-bold text-gray-800">{n.title}</p>
                         <p className="text-xs text-gray-500 mt-0.5">{n.text}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ====== PAGE INJECTION ====== */}
        <main className="flex-1 pb-24 lg:pb-8 px-4 md:px-8 w-full max-w-7xl mx-auto">
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
