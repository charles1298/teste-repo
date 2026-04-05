import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Flame, Lightbulb, Star, Clock, Camera, QrCode, 
  Trophy, Medal, ChevronRight, TrendingDown, AlertTriangle, BoxIcon,
  UtensilsCrossed
} from 'lucide-react';

// ---- PRODUCT DATA ----
const products = [
  { id: 1, name: 'Leite Integral Líder', price: 'R$ 4,50', priceNum: 4.50, store: 'Mercado Preço Baixo', updated: '5 min', img: '/images/products/leite.png' },
  { id: 2, name: 'Arroz Tio João 5kg', price: 'R$ 3,89', priceNum: 3.89, store: 'Supermercado Extra', updated: '12 min', img: '/images/products/arroz.png' },
  { id: 3, name: 'Óleo de Soja Liza', price: 'R$ 6,99', priceNum: 6.99, store: 'Atacadão', updated: '20 min', img: '/images/products/oleo.png' },
  { id: 4, name: 'Café Melitta 500g', price: 'R$ 14,90', priceNum: 14.90, store: 'Mercado Preço Baixo', updated: '8 min', img: '/images/products/cafe.png' },
  { id: 5, name: 'Ovos Caipira 12un', price: 'R$ 12,50', priceNum: 12.50, store: 'Supermercado Dia', updated: '3 min', img: '/images/products/ovos.png' },
  { id: 6, name: 'Açúcar Cristal 1kg', price: 'R$ 4,29', priceNum: 4.29, store: 'Atacadão', updated: '15 min', img: '/images/products/acucar.png' },
];

// ---- MAP MARKERS DATA ----
const mapMarkers = [
  { id: 1, lat: -20.9495, lng: -48.4790, price: 'R$ 4,50', store: 'Mercado Preço Baixo', color: '#22c55e' },
  { id: 2, lat: -20.9465, lng: -48.4750, price: 'R$ 3,89', store: 'Supermercado Extra', color: '#22c55e' },
  { id: 3, lat: -20.9510, lng: -48.4810, price: 'R$ 4,57', store: 'Supermercado Dia', color: '#22c55e' },
  { id: 4, lat: -20.9480, lng: -48.4720, price: 'R$ 2,99', store: 'Atacadão', color: '#ef4444' },
];

// ---- RECIPES DATA ----
const recipes = [
  {
    id: 1,
    name: 'Omelete Especial de Frango',
    img: '/images/recipes/omelete.png',
    badge: 'Rápido',
    badgeColor: 'bg-green-500',
    time: '15 min',
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Ovos', expiring: false },
      { name: 'Frango desfiado', expiring: false },
      { name: 'Tomate', expiring: true, alert: 'vence amanhã' },
      { name: 'Cebola', expiring: false },
      { name: 'Queijo', expiring: false },
    ],
  },
  {
    id: 2,
    name: 'Arroz com Feijão Tropeiro',
    img: '/images/recipes/tropeiro.png',
    badge: 'Favorito',
    badgeColor: 'bg-orange-500',
    time: '40 min',
    difficulty: 'Médio',
    ingredients: [
      { name: 'Arroz', expiring: false },
      { name: 'Feijão', expiring: false },
      { name: 'Linguiça', expiring: true, alert: 'vence em 2 dias' },
      { name: 'Ovo', expiring: false },
      { name: 'Farinha', expiring: false },
    ],
  },
];

// Custom price marker icons
function createPriceIcon(price: string, color: string) {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div style="
        display: flex; flex-direction: column; align-items: center;
        animation: float 3s ease-in-out infinite;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
      ">
        <div style="
          background: ${color};
          color: white;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: 0 2px 8px ${color}66;
        ">${price}</div>
        <div style="
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [80, 32],
    iconAnchor: [40, 32],
  });
}

// ---- COMPONENTS ----

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <div 
      className="flex-shrink-0 w-[150px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-green-200 transition-all duration-300 cursor-pointer group animate-fadeInUp"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative w-full h-[100px] bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-3 overflow-hidden">
        <img src={product.img} alt={product.name} className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
        {product.priceNum < 5 && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <TrendingDown size={10} className="text-white" />
          </div>
        )}
      </div>
      <div className="p-2.5">
        <h4 className="text-[12px] font-bold text-gray-800 leading-tight mb-1 line-clamp-2">{product.name}</h4>
        <span className="text-base font-extrabold text-green-600 block">{product.price}</span>
        <span className="text-[10px] text-gray-400 block mt-0.5">{product.store}</span>
        <span className="text-[10px] text-gray-300 flex items-center gap-1 mt-1">
          <Clock size={8} /> {product.updated} atrás
        </span>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, index }: { recipe: typeof recipes[0]; index: number }) {
  const [cooking, setCooking] = useState(false);

  return (
    <div 
      className="flex gap-3 bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-green-200 transition-all duration-300 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative w-[120px] min-h-[160px] shrink-0 overflow-hidden">
        <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase text-white rounded-md ${recipe.badgeColor} backdrop-blur-sm`}>
          {recipe.badge}
        </span>
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
          <span className="text-[10px] text-white/90 font-medium flex items-center gap-1">
            <Clock size={8} /> {recipe.time}
          </span>
        </div>
      </div>
      <div className="flex-1 py-3 pr-3 flex flex-col">
        <h4 className="text-sm font-bold text-gray-800 leading-snug mb-2">{recipe.name}</h4>
        <div className="flex flex-wrap gap-1 mb-3 flex-1" style={{ alignContent: 'flex-start' }}>
          {recipe.ingredients.map((ing, i) => (
            <span 
              key={i} 
              style={{
                display: 'inline-block',
                fontSize: '10px',
                fontWeight: 500,
                padding: '2px 8px',
                borderRadius: '12px',
                lineHeight: '16px',
                border: `1px solid ${ing.expiring ? '#fecaca' : '#e5e7eb'}`,
                backgroundColor: ing.expiring ? '#fef2f2' : '#f9fafb',
                color: ing.expiring ? '#dc2626' : '#6b7280',
              }}
            >
              {ing.name}
              {ing.expiring && (
                <strong style={{ marginLeft: '2px' }}>({ing.alert})</strong>
              )}
            </span>
          ))}
        </div>
        <button 
          onClick={() => {
            setCooking(true);
            setTimeout(() => setCooking(false), 2500);
          }}
          className={`self-start px-4 py-2 rounded-lg text-[12px] font-bold transition-all active:scale-95 flex items-center gap-1.5 ${
            cooking 
              ? 'bg-green-700 text-white'
              : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md hover:shadow-green-500/25'
          }`}
        >
          {cooking ? '✓ Preparando...' : (
            <>
              <UtensilsCrossed size={12} /> Cozinhar
            </>
          )}
        </button>
      </div>
    </div>
  );
}




// ---- MAIN PAGE ----
export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [progressAnimated, setProgressAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setProgressAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 max-w-lg mx-auto space-y-4">
      
      {/* ========== CARD 1: MELHORES PREÇOS HOJE ========== */}
      <section className="premium-card gradient-border p-5 animate-fadeInUp delay-1">
        <h2 className="flex items-center gap-2 text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4">
          <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
            <Flame size={16} className="text-orange-500" />
          </div>
          Melhores Preços Hoje
        </h2>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 shadow-sm">
          <div className="h-[200px] relative">
            <MapContainer
              center={[-20.9490, -48.4770]}
              zoom={15}
              scrollWheelZoom={false}
              zoomControl={false}
              attributionControl={false}
              className="h-full w-full z-0"
              style={{ borderRadius: '12px' }}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {mapMarkers.map(marker => (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  icon={createPriceIcon(marker.price, marker.color)}
                >
                  <Popup>
                    <div className="p-3 text-center">
                      <p className="font-bold text-gray-800 text-sm">{marker.store}</p>
                      <p className="text-lg font-extrabold text-green-600 my-1">{marker.price}</p>
                      <p className="text-[11px] text-gray-400">Leite Integral 1L</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <div className="absolute bottom-2 left-2 z-[400] glass px-2 py-1 rounded-md">
              <span className="text-[11px] font-semibold text-gray-600">📍 Bebedouro — SP</span>
            </div>
            <div className="absolute top-2 right-2 z-[400] glass px-2 py-1 rounded-md">
              <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> AO VIVO
              </span>
            </div>
          </div>
        </div>

        {/* Products carousel */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Ofertas em destaque</p>
            <button className="text-[11px] font-semibold text-green-600 flex items-center gap-0.5 hover:text-green-700 transition-colors">
              Ver tudo <ChevronRight size={12} />
            </button>
          </div>
          <div ref={carouselRef} className="flex gap-3 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1 snap-x snap-mandatory">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CARD 2: MINHA DESPENSA INTELIGENTE ========== */}
      <section className="premium-card p-5 animate-fadeInUp delay-3 relative overflow-hidden">
        {/* Gradient border override */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 via-yellow-400 to-green-500 rounded-t-2xl" />
        
        <h2 className="flex items-center gap-2 text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4">
          <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Lightbulb size={16} className="text-yellow-600" />
          </div>
          Minha Despensa Inteligente
        </h2>

        {/* Expiring alert banner */}
        <div className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-red-50 border border-red-200">
          <AlertTriangle size={14} className="text-red-500 shrink-0" />
          <p className="text-[11px] text-red-600 font-medium">
            <strong>2 ingredientes</strong> estão próximos do vencimento. Use-os nas receitas abaixo!
          </p>
        </div>

        {/* Recipe cards */}
        <div className="space-y-3 mb-4">
          {recipes.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>

        {/* View pantry button */}
        <button className="w-full py-3 rounded-xl text-sm font-bold text-green-600 bg-white border-2 border-green-400 hover:bg-green-50 hover:border-green-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <BoxIcon size={16} /> Ver Toda Despensa
        </button>
      </section>

      {/* ========== CARD 3: COLABORE E GANHE PONTOS ========== */}
      <section className="premium-card p-5 animate-fadeInUp delay-5 relative overflow-hidden">
        {/* Gradient border override */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-500 to-green-500 rounded-t-2xl" />

        <h2 className="flex items-center gap-2 text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
            <Star size={16} className="text-blue-500" />
          </div>
          Colabore e Ganhe Pontos
        </h2>

        {/* Scan CTA */}
        <button className="w-full relative rounded-xl overflow-hidden p-5 mb-5 text-left group cursor-pointer hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 animate-gradient" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Camera size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="text-white font-extrabold text-sm uppercase tracking-wide block">
                Escaneie sua Nota Fiscal
              </span>
              <span className="text-blue-200 text-[11px] font-medium block mt-0.5">
                Contribua com preços reais e ganhe pontos!
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <QrCode size={22} className="text-white" />
            </div>
          </div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
        </button>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold text-gray-500">Progresso para o Nível 4</span>
            <span className="text-[12px] font-extrabold text-green-600">1.250 / 2.000 pts</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: progressAnimated ? '62.5%' : '0%' }}
            >
              <div className="absolute inset-0 animate-shimmer rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Medal size={18} className="text-orange-400" />
            <p className="text-[13px] text-gray-600">
              Você tem <strong className="text-gray-800">1.250 pontos</strong> <span className="text-gray-400">(Nível 3 — Caçador)</span>
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2.5 rounded-xl bg-green-50 border border-green-100">
            <span className="text-lg font-extrabold text-green-600 block">23</span>
            <span className="text-[10px] font-medium text-gray-500">Notas enviadas</span>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-lg font-extrabold text-blue-600 block">R$ 47</span>
            <span className="text-[10px] font-medium text-gray-500">Economizados</span>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-orange-50 border border-orange-100">
            <span className="text-lg font-extrabold text-orange-600 block">#12</span>
            <span className="text-[10px] font-medium text-gray-500">No ranking</span>
          </div>
        </div>

        {/* Ranking link */}
        <a href="#" className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-blue-500 underline underline-offset-2 hover:text-blue-600 transition-colors">
          <Trophy size={16} className="text-orange-400" />
          Ver Ranking da Região
        </a>
      </section>

      {/* Footer spacer */}
      <div className="h-4" />
    </div>
  );
}
