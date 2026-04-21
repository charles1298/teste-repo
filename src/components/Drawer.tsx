import { NavLink, useLocation } from 'react-router-dom';
import {
  X, MapPin, ClipboardList, UtensilsCrossed,
  User, Settings, HelpCircle, Trophy, ShoppingBag, Info, ChevronRight,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { to: '/', icon: MapPin, label: 'Dashboard' },
  { to: '/map', icon: MapPin, label: 'Mapa de Ofertas' },
  { to: '/list', icon: ClipboardList, label: 'Minha Lista' },
  { to: '/recipes', icon: UtensilsCrossed, label: 'Despensa & Receitas' },
  { to: '/profile', icon: User, label: 'Meu Perfil' },
];

const secondaryLinks = [
  { icon: ShoppingBag, label: 'Histórico de Compras' },
  { icon: Settings, label: 'Configurações' },
  { icon: HelpCircle, label: 'Central de Ajuda' },
  { icon: Info, label: 'Sobre o App' },
];

export default function Drawer({ isOpen, onClose }: Props) {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`drawer-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="p-6 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #00E676, #16a34a)' }}
            >
              <ShoppingBag size={20} />
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Mercado<span style={{ color: 'var(--green-neon)' }}>Map</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-secondary)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-5">
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: 'rgba(61, 123, 255, 0.15)', color: '#60a5fa' }}
            >
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                Pedro Silva
              </p>
              <p className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--orange-accent)' }}>
                <Trophy size={11} /> Nível 3 — Caçador
              </p>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
          <p
            className="text-[10px] font-bold uppercase tracking-[2px] px-3 mb-2 mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Navegação
          </p>

          {mainLinks.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-[14px] font-medium"
                style={{
                  color: isActive ? 'var(--green-neon)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(0, 230, 118, 0.08)' : 'transparent',
                }}
              >
                <link.icon size={19} />
                {link.label}
              </NavLink>
            );
          })}

          <hr className="my-3 border-0" style={{ borderTop: '1px solid var(--border-subtle)' }} />

          <p
            className="text-[10px] font-bold uppercase tracking-[2px] px-3 mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Opções
          </p>

          {secondaryLinks.map(link => (
            <button
              key={link.label}
              className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-[14px] font-medium text-left w-full"
              style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <link.icon size={19} />
              {link.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
            MercadoMap v2.0 — Bebedouro, SP
          </p>
        </div>
      </div>
    </>
  );
}
