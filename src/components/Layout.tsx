import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, Bell, Search, X, MapPin, ClipboardList, Camera, 
  UtensilsCrossed, User, Settings, History, Tag, Trophy, 
  HelpCircle, Info, ShoppingCart, ChevronRight
} from 'lucide-react';

// ---- NOTIFICATION DATA ----
const notifications = [
  {
    id: 1,
    type: 'recipe' as const,
    title: 'Nova receita!',
    text: '"Bolo de Cenoura" com ingredientes da sua despensa!',
    time: 'Há 5 min',
    unread: true,
  },
  {
    id: 2,
    type: 'coupon' as const,
    title: 'Novo cupom!',
    text: 'Você ganhou R$ 5,00 de desconto no Mercado Preço Baixo.',
    time: 'Há 30 min',
    unread: true,
  },
  {
    id: 3,
    type: 'price' as const,
    title: 'Preço baixou!',
    text: 'Arroz Tio João está R$ 3,89 no Mercado Extra.',
    time: 'Há 2 horas',
    unread: false,
  },
];

// ---- SIDEBAR LINKS ----
const sidebarLinks = [
  { icon: Settings, label: 'Configurações' },
  { icon: History, label: 'Histórico de Compras' },
  { icon: Tag, label: 'Meus Cupons' },
  { icon: Trophy, label: 'Ranking' },
  { icon: HelpCircle, label: 'Ajuda' },
  { icon: Info, label: 'Sobre o App' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close panels on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close sidebar on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const categories = [
    { label: 'Hortifruti', icon: '🥕' },
    { label: 'Açougue', icon: '🥩' },
    { label: 'Higiene', icon: '🧴' },
    { label: 'Padaria', icon: '🍞' },
    { label: 'Bebidas', icon: '🍷' },
    { label: 'Laticínios', icon: '🧀' },
    { label: 'Limpeza', icon: '🧹' },
    { label: 'Congelados', icon: '🧊' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* ====== HEADER ====== */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-100 glass">
        <div className="h-full flex items-center justify-between px-4" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all active:scale-90"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 select-none">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <ShoppingCart size={20} className="text-green-500" />
            <MapPin size={10} className="absolute -top-0.5 -right-1 text-green-700 animate-float" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-gray-800">
            Mercado<span className="text-green-500">Map</span>
          </span>
        </div>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all active:scale-90"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-badge-pulse">
              3
            </span>
          </button>

          {/* Notifications Panel */}
          {notifOpen && (
            <div className="absolute top-12 right-0 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-scaleIn origin-top-right z-[200]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm">Notificações</h3>
                <button onClick={() => setNotifOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${n.unread ? 'bg-green-50/50' : ''}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm ${
                      n.type === 'recipe' ? 'bg-amber-100 text-amber-600' :
                      n.type === 'coupon' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {n.type === 'recipe' ? '🍳' : n.type === 'coupon' ? '🏷️' : '📉'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-700 leading-snug">
                        <strong>{n.title}</strong> {n.text}
                      </p>
                      <span className="text-[11px] text-gray-400 mt-1 block">{n.time}</span>
                    </div>
                    {n.unread && <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 text-center border-t border-gray-100">
                <button className="text-[13px] font-semibold text-green-600 hover:text-green-700 transition-colors">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </header>

      {/* ====== SEARCH BAR ====== */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100" ref={searchRef}>
        <div className="px-4 py-2" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div className={`flex items-center h-11 rounded-2xl px-4 transition-all duration-300 ${
          searchFocused 
            ? 'bg-white border-green-400 ring-3 ring-green-500/15 shadow-lg border' 
            : 'bg-gray-50 border border-gray-200 shadow-sm'
        }`}>
          <Search size={16} className={`shrink-0 transition-colors ${searchFocused ? 'text-green-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Pesquisar produtos ou mercados..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            className="flex-1 h-full ml-3 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
          {searchValue && (
            <button onClick={() => setSearchValue('')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {searchFocused && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl px-4 py-4 animate-fadeInUp">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Buscas recentes</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Leite Integral', 'Arroz 5kg', 'Café', 'Sabão em pó'].map(term => (
                <button key={term} onClick={() => { setSearchValue(term); setSearchFocused(false); }}
                  className="px-3 py-1.5 text-[13px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all">
                  {term}
                </button>
              ))}
            </div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Categorias populares</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c.label} onClick={() => { setSearchValue(c.label); setSearchFocused(false); }}
                  className="px-3 py-1.5 text-[13px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all flex items-center gap-1.5">
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* ====== SIDEBAR OVERLAY ====== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-[3px] animate-fadeIn" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ====== SIDEBAR ====== */}
      <aside className={`fixed top-0 left-0 bottom-0 z-[310] w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="relative px-5 pt-6 pb-5 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 text-white">
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:bg-white/15 transition-colors">
            <X size={16} />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
            <User size={28} className="text-white/90" />
          </div>
          <h3 className="font-bold text-base">Pedro Silva</h3>
          <p className="text-green-100 text-[13px] font-medium mt-0.5">Nível 3 — Caçador 🏹</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[62%] bg-white/90 rounded-full" />
            </div>
            <span className="text-[11px] text-green-100 font-medium">1.250 pts</span>
          </div>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {sidebarLinks.map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center gap-3.5 px-5 py-3 text-[14px] font-medium text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all group">
              <Icon size={18} className="text-gray-400 group-hover:text-green-500 transition-colors" />
              <span className="flex-1 text-left">{label}</span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-green-400 transition-colors" />
            </button>
          ))}
        </nav>
        <div className="px-5 py-3 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400">MercadoMap v1.0 — © 2026</p>
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <main className="pt-[108px] pb-20 min-h-screen" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <Outlet />
      </main>

      {/* ====== BOTTOM NAVIGATION ====== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
        <div className="h-full flex items-center justify-around px-2" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <NavLink to="/" className="nav-item flex flex-col items-center justify-center flex-1 h-full relative group">
          {isActive('/') && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-green-500 rounded-b-full" />}
          <MapPin size={20} className={`transition-colors ${isActive('/') ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${isActive('/') ? 'text-green-500' : 'text-gray-400'}`}>Mapa</span>
        </NavLink>

        <NavLink to="/list" className="nav-item flex flex-col items-center justify-center flex-1 h-full relative group">
          {isActive('/list') && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-green-500 rounded-b-full" />}
          <ClipboardList size={20} className={`transition-colors ${isActive('/list') ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${isActive('/list') ? 'text-green-500' : 'text-gray-400'}`}>Lista</span>
        </NavLink>

        {/* SCAN BUTTON — CENTRAL & HIGHLIGHTED */}
        <div className="flex flex-col items-center justify-center flex-1 -mt-5 relative">
          <button className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-110 active:scale-95 transition-all relative">
            <Camera size={24} />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-[scanPulse_2.5s_ease-out_infinite]" />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 mt-1">Escanear</span>
        </div>

        <NavLink to="/recipes" className="nav-item flex flex-col items-center justify-center flex-1 h-full relative group">
          {isActive('/recipes') && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-green-500 rounded-b-full" />}
          <UtensilsCrossed size={20} className={`transition-colors ${isActive('/recipes') ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${isActive('/recipes') ? 'text-green-500' : 'text-gray-400'}`}>Receitas</span>
        </NavLink>

        <NavLink to="/profile" className="nav-item flex flex-col items-center justify-center flex-1 h-full relative group">
          {isActive('/profile') && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-green-500 rounded-b-full" />}
          <User size={20} className={`transition-colors ${isActive('/profile') ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${isActive('/profile') ? 'text-green-500' : 'text-gray-400'}`}>Perfil</span>
        </NavLink>
        </div>
      </nav>
    </div>
  );
}
