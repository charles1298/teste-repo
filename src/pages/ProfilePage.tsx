import { useState } from 'react';
import { 
  User, Medal, Trophy, Camera, Star, Gift, ChevronRight, 
  TrendingUp, ShoppingBag, Receipt, Target, Crown,
  Settings, LogOut, Bell, Shield
} from 'lucide-react';

const achievements = [
  { icon: '🏹', label: 'Caçador', desc: 'Escaneou 20+ notas', unlocked: true },
  { icon: '🛒', label: 'Comprador Expert', desc: 'Criou 10+ listas', unlocked: true },
  { icon: '👨‍🍳', label: 'Chef Iniciante', desc: 'Fez 5+ receitas', unlocked: true },
  { icon: '🌟', label: 'Top 10', desc: 'Ranking regional', unlocked: false },
  { icon: '💰', label: 'Economista', desc: 'Economizou R$100+', unlocked: false },
  { icon: '🔥', label: 'Streak 30', desc: '30 dias seguidos', unlocked: false },
];

const coupons = [
  { id: 1, store: 'Mercado Preço Baixo', discount: 'R$ 5,00', minOrder: 'em compras acima de R$ 50', expires: '15/04/2026', used: false },
  { id: 2, store: 'Atacadão', discount: '10% OFF', minOrder: 'em produtos de limpeza', expires: '20/04/2026', used: false },
  { id: 3, store: 'Supermercado Extra', discount: 'R$ 3,00', minOrder: 'na primeira compra', expires: '01/04/2026', used: true },
];

const stats = [
  { icon: Receipt, label: 'Notas enviadas', value: '23', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  { icon: ShoppingBag, label: 'Economizados', value: 'R$ 47', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: Trophy, label: 'Ranking', value: '#12', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  { icon: Target, label: 'Receitas feitas', value: '8', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'coupons' | 'achievements'>('stats');

  return (
    <div className="px-4 max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="premium-card p-6 mb-4 relative overflow-hidden animate-fadeInUp">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <User size={32} className="text-white/90" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-extrabold text-white">Pedro Silva</h1>
              <p className="text-green-100 text-[13px] font-medium flex items-center gap-1.5 mt-0.5">
                <Crown size={12} /> Nível 3 — Caçador
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-white/90 rounded-full" />
                </div>
                <span className="text-[11px] text-green-100 font-bold">1.250 / 2.000</span>
              </div>
              <p className="text-[10px] text-green-200 mt-1">750 pontos para o Nível 4 — Mestre</p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 bg-white/15 text-white text-[11px] font-bold rounded-xl backdrop-blur-sm hover:bg-white/25 transition-all flex items-center justify-center gap-1.5">
              <Camera size={12} /> Escanear Nota
            </button>
            <button className="flex-1 py-2 bg-white/15 text-white text-[11px] font-bold rounded-xl backdrop-blur-sm hover:bg-white/25 transition-all flex items-center justify-center gap-1.5">
              <Gift size={12} /> Resgatar Cupom
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {stats.map((stat, i) => (
          <div key={i} className={`text-center p-2.5 rounded-xl ${stat.bg} border ${stat.border} animate-fadeInUp`} style={{ animationDelay: `${i * 0.06}s` }}>
            <stat.icon size={16} className={`${stat.color} mx-auto mb-1`} />
            <span className={`text-base font-extrabold ${stat.color} block`}>{stat.value}</span>
            <span className="text-[9px] font-medium text-gray-500 leading-tight block">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4">
        {['stats', 'coupons', 'achievements'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all ${
              activeTab === tab 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'stats' ? '📊 Atividade' : tab === 'coupons' ? '🏷️ Cupons' : '🏆 Conquistas'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'stats' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="premium-card p-4">
            <h3 className="text-[13px] font-bold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-green-500" /> Economia dos últimos 30 dias
            </h3>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-24">
              {[30, 45, 20, 60, 35, 80, 55, 70, 40, 90, 65, 47].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm transition-all duration-500 hover:from-green-600 hover:to-green-500"
                    style={{ height: `${val}%`, animationDelay: `${i * 0.05}s` }}
                  />
                  <span className="text-[7px] text-gray-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="premium-card p-4">
            <h3 className="text-[13px] font-bold text-gray-800 mb-3">Atividade recente</h3>
            {[
              { action: 'Escaneou nota fiscal', store: 'Atacadão', points: '+50 pts', time: 'Hoje, 14:30', icon: '📸' },
              { action: 'Ganhou cupom', store: 'Preço Baixo', points: '+R$ 5,00', time: 'Ontem', icon: '🎁' },
              { action: 'Fez receita', store: 'Omelete de Frango', points: '+20 pts', time: 'Há 2 dias', icon: '🍳' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-gray-800 truncate">{item.action}</p>
                  <p className="text-[10px] text-gray-400">{item.store} • {item.time}</p>
                </div>
                <span className="text-[11px] font-bold text-green-600">{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div className="space-y-3 animate-fadeIn">
          {coupons.map((coupon, i) => (
            <div key={coupon.id} className={`premium-card p-4 animate-fadeInUp ${coupon.used ? 'opacity-50' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${coupon.used ? 'bg-gray-100' : 'bg-green-100'}`}>
                  <Gift size={20} className={coupon.used ? 'text-gray-400' : 'text-green-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-800">{coupon.discount}</h4>
                  <p className="text-[11px] text-gray-500">{coupon.store} • {coupon.minOrder}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Válido até {coupon.expires}</p>
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  coupon.used 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-sm shadow-green-500/20'
                }`}>
                  {coupon.used ? 'Usado' : 'Resgatar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-3 gap-2 animate-fadeIn">
          {achievements.map((ach, i) => (
            <div key={i} className={`premium-card p-3 text-center animate-scaleIn ${!ach.unlocked ? 'opacity-40 grayscale' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="text-2xl block mb-1">{ach.icon}</span>
              <p className="text-[11px] font-bold text-gray-800">{ach.label}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{ach.desc}</p>
              {ach.unlocked && (
                <div className="w-4 h-4 rounded-full bg-green-500 mx-auto mt-1.5 flex items-center justify-center">
                  <Star size={8} className="text-white" fill="white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Settings links */}
      <div className="mt-6 mb-4 space-y-1">
        {[
          { icon: Settings, label: 'Configurações' },
          { icon: Bell, label: 'Preferências de notificação' },
          { icon: Shield, label: 'Privacidade e segurança' },
          { icon: LogOut, label: 'Sair da conta', danger: true },
        ].map((item, i) => (
          <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all text-[13px] font-medium ${item.danger ? 'text-red-500' : 'text-gray-600'}`}>
            <item.icon size={16} className={item.danger ? 'text-red-400' : 'text-gray-400'} />
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
