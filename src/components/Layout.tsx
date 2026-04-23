import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Bell, MapPin, ClipboardList, Camera,
  UtensilsCrossed, User, Menu, X, ShoppingBag,
  Settings, HelpCircle, Info, Trophy, ChevronRight, Home, MessageSquare
} from 'lucide-react';

const notifications = [
  { id: 1, type: 'recipe', title: 'Nova receita disponível', text: 'Omelete de Frango com itens da sua despensa!', time: 'Há 5 min', unread: true },
  { id: 2, type: 'coupon', title: 'Cupom de desconto', text: 'R$ 5,00 off no Mercado Local.', time: 'Há 30 min', unread: true },
  { id: 3, type: 'price', title: 'Alerta de preço', text: 'Arroz 5kg caiu para R$ 22,90.', time: 'Há 2 horas', unread: false },
];

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/map', label: 'Mapa' },
    { to: '/feed', label: 'Comunidade' },
    { to: '/list', label: 'Lista' },
    { to: '/recipes', label: 'Despensa' },
    { to: '/profile', label: 'Perfil' },
  ];

  return (
    <>
      {/* ====== DRAWER ====== */}
      <div className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`drawer-panel ${drawerOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '20px' }}>
              Mercado<span style={{ color: 'var(--accent)' }}>Map</span>
            </span>
          </div>
          <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-sub)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>PS</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14 }}>Pedro Silva</p>
              <p style={{ fontSize: 11, color: 'var(--amber)', display: 'flex', alignItems: 'center', gap: 4 }}><Trophy size={11} /> Nível 3 — Caçador</p>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--text-dim)' }} />
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 16px' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--text-dim)', padding: '0 8px', marginBottom: 8 }}>Navegação</p>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setDrawerOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px',
                fontSize: 14, fontWeight: location.pathname === link.to ? 700 : 500,
                color: location.pathname === link.to ? 'var(--accent)' : 'var(--text-sub)',
                transition: 'color 0.2s', textDecoration: 'none',
              }}
            >
              {link.label}
            </NavLink>
          ))}

          <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--text-dim)', padding: '0 8px', marginBottom: 8 }}>Opções</p>

          {[
            { icon: ShoppingBag, label: 'Histórico de Compras' },
            { icon: Settings, label: 'Configurações' },
            { icon: HelpCircle, label: 'Ajuda' },
            { icon: Info, label: 'Sobre' },
          ].map(item => (
            <button
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px', fontSize: 14, color: 'var(--text-sub)', background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            >
              <item.icon size={17} /> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: 20, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-dim)' }}>
          MercadoMap v2.0 · Bebedouro, SP
        </div>
      </div>

      {/* ====== HEADER ====== */}
      <header className="site-header">
        {/* Left: Logo + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setDrawerOpen(true)}
            className="nav-link"
            style={{ padding: 4, display: 'flex' }}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>
              Mercado<span style={{ color: 'var(--accent)' }}>Map</span>
            </span>
          </div>
        </div>

        {/* Center: Nav (desktop only) */}
        <nav style={{ display: 'flex', gap: '32px' }} className="hidden-mobile">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: CTA + Bell */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="cta-header-btn hidden-mobile">
            Escanear Nota <span>→</span>
          </button>

          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="nav-link"
              style={{ padding: 4, display: 'flex', position: 'relative' }}
              aria-label="Notificações"
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--red)', boxShadow: '0 0 6px rgba(239,68,68,0.6)',
                }} />
              )}
            </button>

            {notifOpen && (
              <div className="notif-panel" style={{ position: 'absolute', top: 44, right: 0, width: 320, zIndex: 50 }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Notificações</span>
                  <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none' }}>Marcar lidas</button>
                </div>
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '12px 16px', cursor: 'pointer',
                      borderBottom: '1px solid var(--border)',
                      background: n.unread ? 'rgba(34,197,94,0.03)' : 'transparent',
                      transition: 'background 0.2s',
                    }}>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-sub)', marginTop: 2 }}>{n.text}</p>
                      <p style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 4 }}>{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ====== MAIN ====== */}
      <main>
        <Outlet />
      </main>

      {/* ====== MOBILE BOTTOM NAV ====== */}
      <nav className="bottom-nav">
        <NavLink to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Home size={20} />
          <span>Início</span>
        </NavLink>
        <NavLink to="/map" className={`nav-item ${location.pathname === '/map' ? 'active' : ''}`}>
          <MapPin size={20} />
          <span>Mapa</span>
        </NavLink>
        <NavLink to="/feed" className={`nav-item ${location.pathname === '/feed' ? 'active' : ''}`}>
          <MessageSquare size={20} />
          <span>Comunidade</span>
        </NavLink>
        <button className="scan-fab" aria-label="Escanear">
          <Camera size={22} />
        </button>
        <NavLink to="/recipes" className={`nav-item ${location.pathname === '/recipes' ? 'active' : ''}`}>
          <UtensilsCrossed size={20} />
          <span>Despensa</span>
        </NavLink>
        <NavLink to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <User size={20} />
          <span>Perfil</span>
        </NavLink>
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
