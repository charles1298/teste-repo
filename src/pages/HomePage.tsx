import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, TrendingDown, Plus, Check,
  Camera, QrCode, Trophy, ChevronRight, Clock, MapPin,
} from 'lucide-react';
import useRealtimeData from '../hooks/useRealtimeData';
import MapSnippet from '../components/MapSnippet';
import AnimatedCounter from '../components/AnimatedCounter';

/* ---- static data ---- */
const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'basicos', label: 'Básicos' },
  { id: 'hortifruti', label: 'Hortifruti' },
  { id: 'higiene', label: 'Higiene' },
  { id: 'padaria', label: 'Padaria' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'acougue', label: 'Açougue' },
];

const productCategories: Record<number, string> = {
  1: 'basicos', 2: 'basicos', 3: 'basicos', 4: 'basicos',
  5: 'hortifruti', 6: 'basicos', 7: 'basicos', 8: 'basicos',
};

/* ---- Stars component ---- */
function Stars({ rating, onRate }: { rating: number; onRate?: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="product-card stars" style={{ marginBottom: 0 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={15}
          fill={(hover || rating) >= n ? '#F59E0B' : 'transparent'}
          stroke={(hover || rating) >= n ? '#F59E0B' : '#57534E'}
          style={{ cursor: onRate ? 'pointer' : 'default', transition: 'all 0.15s' }}
          onMouseEnter={() => onRate && setHover(n)}
          onMouseLeave={() => onRate && setHover(0)}
          onClick={() => onRate?.(n)}
        />
      ))}
    </div>
  );
}

/* ---- Progress Bar (inline) ---- */
function ProgressBar({ value, max }: { value: number; max: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth((value / max) * 100), 200); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, max]);
  return (
    <div ref={ref} className="progress-track">
      <div className="progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
}

/* ================================================================
   HOME PAGE
   ================================================================ */
export default function HomePage() {
  const { products, recipes, gamification, formatPrice } = useRealtimeData();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const [ratings, setRatings] = useState<Record<number, number>>({
    1: 5, 2: 5, 3: 4, 4: 5, 5: 4, 6: 4, 7: 5, 8: 5,
  });
  const [selectedRecipe, setSelectedRecipe] = useState(0);

  const toggleAdd = useCallback((id: number) => {
    setAddedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => productCategories[p.id] === activeCategory);

  const discount = (old: number, cur: number) => {
    const pct = Math.round(((old - cur) / old) * 100);
    return pct > 0 ? `-${pct}%` : null;
  };

  const currentRecipe = recipes[selectedRecipe] || recipes[0];

  return (
    <>
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=900&fit=crop)' }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow" style={{ marginBottom: 12 }}>O Waze dos Mercados</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: 16 }}>
            Encontre os Melhores<br />
            Preços de <span style={{ color: 'var(--accent)' }}>Bebedouro</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 520, fontSize: 16 }}>
            Preços atualizados colaborativamente por mais de 2.000 usuários.
            Compare, economize e ganhe pontos.
          </p>
          <button className="hero-cta" onClick={() => navigate('/map')}>
            Explorar Mapa <ArrowRight size={16} />
          </button>
        </div>

        {/* Live counter in hero */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 40, zIndex: 2,
        }}>
          {[
            { label: 'Produtos rastreados', value: 1847 },
            { label: 'Colaboradores ativos', value: 2031 },
            { label: 'Mercados mapeados', value: 23 },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 28, color: 'var(--text)',
              }}>
                <AnimatedCounter target={stat.value} duration={2500} />
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--text-sub)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          MELHORES PREÇOS SECTION
          ============================================================ */}
      <section className="section">
        <div className="section-header">
          <span className="eyebrow">Ofertas em Destaque</span>
          <h2 className="section-title">Melhores Preços Hoje</h2>
          <p className="section-subtitle">
            Preços verificados por usuários reais, atualizados em tempo real.
          </p>
          <div className="section-divider" />
        </div>

        {/* Live badge + Map toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--accent)' }}>
              Ao vivo
            </span>
          </div>
          <button
            onClick={() => navigate('/map')}
            style={{
              fontSize: 12, fontWeight: 600, color: 'var(--text-sub)',
              background: 'none', border: '1px solid var(--border)', padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-sub)'; }}
          >
            <MapPin size={14} /> Ver no Mapa
          </button>
        </div>

        {/* Category Tabs */}
        <div className="cat-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product, i) => {
            const disc = discount(product.oldPrice, product.price);
            const isAdded = addedItems.has(product.id);
            return (
              <div
                key={product.id}
                className="product-card animate-fadeInUp"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Image */}
                <div className="img-wrap">
                  <img src={product.img} alt={product.name} loading="lazy" />
                  {disc && (
                    <div className="badge">
                      <TrendingDown size={10} style={{ marginRight: 3, verticalAlign: -1 }} />
                      {disc}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="info">
                  <h3 className="name">{product.name}</h3>
                  <p className="store">
                    {product.store} · <Clock size={10} style={{ verticalAlign: -1 }} /> {product.updatedMinutes} min
                  </p>

                  <Stars
                    rating={ratings[product.id] || 4}
                    onRate={n => setRatings(prev => ({ ...prev, [product.id]: n }))}
                  />

                  <div className="price-row" style={{ marginTop: 10 }}>
                    <span className="price">{formatPrice(product.price)}</span>
                    <span className="old-price">{formatPrice(product.oldPrice)}</span>
                  </div>

                  <button
                    className={`add-btn ${isAdded ? 'added' : ''}`}
                    onClick={() => toggleAdd(product.id)}
                  >
                    {isAdded ? <><Check size={14} /> Adicionado</> : <>Adicionar <ArrowRight size={14} /></>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          DESPENSA SECTION (Split Layout like the reference)
          ============================================================ */}
      <section className="despensa-section">
        {/* Left: Text */}
        <div className="despensa-text">
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>Sua Cozinha</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 16 }}>
            Despensa<br />Inteligente
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 24 }}>
            Ingredientes próximos do vencimento na sua despensa virtual.
            Sugerimos receitas para evitar desperdício — cozinhe agora e
            economize depois.
          </p>

          {/* Recipe nav */}
          <div className="recipe-nav-dots" style={{ marginBottom: 24 }}>
            {recipes.map((_, i) => (
              <button
                key={i}
                className={`recipe-dot ${selectedRecipe === i ? 'active' : ''}`}
                onClick={() => setSelectedRecipe(i)}
              />
            ))}
          </div>

          <button className="despensa-cta" onClick={() => navigate('/recipes')}>
            Ver Receitas <ArrowRight size={14} />
          </button>
        </div>

        {/* Right: Recipe Image */}
        <div className="despensa-recipes">
          <div className="recipe-slide">
            <img
              src={currentRecipe.img}
              alt={currentRecipe.name}
              loading="lazy"
            />
            <div className="recipe-overlay">
              <h3>{currentRecipe.name}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                {currentRecipe.ingredients.map(ing => {
                  const isDanger = ing.daysUntilExpiry <= 1;
                  const isWarn = ing.daysUntilExpiry <= 3 && !isDanger;
                  return (
                    <span
                      key={ing.name}
                      className={`ingredient-tag ${isDanger ? 'danger' : isWarn ? 'warning' : 'ok'}`}
                    >
                      {ing.name}
                      {isDanger && ' (vence amanhã!)'}
                      {isWarn && ` (${ing.daysUntilExpiry}d)`}
                    </span>
                  );
                })}
              </div>
              <button
                className="despensa-cta"
                style={{ marginTop: 20, background: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--accent)' }}
              >
                Cozinhar <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAPA SNIPPET (full-width band)
          ============================================================ */}
      <section style={{ padding: '60px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>Mapa ao Vivo</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700 }}>
              Ofertas Próximas de Você
            </h3>
          </div>
          <button
            onClick={() => navigate('/map')}
            style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const,
              color: 'var(--accent)', background: 'none', border: '1px solid var(--border-accent)',
              padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
          >
            Abrir Mapa Completo <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
          <MapSnippet
            products={products.slice(0, 6)}
            formatPrice={formatPrice}
            onClick={() => navigate('/map')}
          />
        </div>
      </section>

      {/* ============================================================
          COLABORE SECTION
          ============================================================ */}
      <section className="collab-section">
        <div className="section-header">
          <span className="eyebrow">Comunidade</span>
          <h2 className="section-title">Colabore e Ganhe Pontos</h2>
          <p className="section-subtitle">
            Escaneie notas fiscais, atualize preços e suba no ranking da região.
          </p>
          <div className="section-divider" />
        </div>

        <div className="collab-grid">
          {/* Scan Card */}
          <div className="scan-card">
            <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'white', marginBottom: 8 }}>
              Escaneie Sua Nota Fiscal
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 0 }}>
              Leia o QRCode ou tire uma foto. Atualize preços e ganhe pontos.
            </p>

            <div className="scan-icons">
              <div className="scan-icon-box">
                <Camera size={28} />
              </div>
              <div className="scan-icon-box">
                <QrCode size={28} />
              </div>
            </div>

            <button className="scan-main-btn">
              Escanear Agora
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Seus Pontos</div>
              <div className="stat-value green">
                <AnimatedCounter target={gamification.points} />
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' as const, letterSpacing: 1 }}>
                    Progresso Nível {gamification.level + 1}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent)' }}>
                    {gamification.points.toLocaleString('pt-BR')} / {gamification.nextLevelPoints.toLocaleString('pt-BR')}
                  </span>
                </div>
                <ProgressBar value={gamification.points} max={gamification.nextLevelPoints} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="stat-card">
                <div className="stat-label">Nível</div>
                <div className="stat-value amber">
                  <Trophy size={24} style={{ marginRight: 8, verticalAlign: -4 }} />
                  {gamification.level}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-sub)', marginTop: 4 }}>{gamification.levelName}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Contribuições</div>
                <div className="stat-value">
                  <AnimatedCounter target={gamification.totalContributions} />
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-label">Ranking Regional</div>
                <p style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>
                  Você está em <span style={{ color: 'var(--accent)', fontWeight: 800 }}>#{gamification.ranking}</span> em Bebedouro
                </p>
              </div>
              <button className="ranking-link">
                Ver Ranking <ChevronRight size={14} style={{ verticalAlign: -2 }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div style={{ height: 80 }} />
    </>
  );
}
