import { ChevronRight, MapPin, Clock, Camera, Plus, Map as MapIcon, UtensilsCrossed, Star, TrendingDown } from 'lucide-react';

const products = [
  { id: 1, name: 'Leite Integral Líder', price: 'R$ 4,50', oldPrice: 'R$ 5,20', store: 'Mercado Preço Baixo', updated: '5 min', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop' },
  { id: 2, name: 'Arroz Tio João 5kg', price: 'R$ 22,90', oldPrice: 'R$ 26,00', store: 'Supermercado Extra', updated: '12 min', img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&h=500&fit=crop' },
  { id: 3, name: 'Óleo de Soja Liza', price: 'R$ 6,99', oldPrice: 'R$ 8,50', store: 'Atacadão', updated: '20 min', img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&h=500&fit=crop' },
  { id: 4, name: 'Café Melitta 500g', price: 'R$ 14,90', oldPrice: 'R$ 18,90', store: 'Mercado Preço Baixo', updated: '8 min', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&h=500&fit=crop' },
  { id: 5, name: 'Ovos Caipira 12un', price: 'R$ 12,50', oldPrice: 'R$ 15,00', store: 'Supermercado Dia', updated: '3 min', img: 'https://images.unsplash.com/photo-1598965675045-45c5e72b7d8d?w=500&h=500&fit=crop' },
];

const categories = [
  { id: 'all', label: 'Tudo', active: true },
  { id: 'hortifruti', label: 'Hortifruti', active: false },
  { id: 'acougue', label: 'Açougue', active: false },
  { id: 'higiene', label: 'Higiene', active: false },
  { id: 'padaria', label: 'Padaria', active: false },
  { id: 'bebidas', label: 'Bebidas', active: false },
];

export default function HomePage() {
  return (
    <div className="space-y-6 lg:space-y-8 px-4 lg:px-8 max-w-[1600px] mx-auto font-sans animate-fadeInUp">
      
      {/* 1. Header Details (Desktop) */}
      <div className="hidden lg:flex items-center justify-between pt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
            Bem-vindo de volta, <br/>
            <span className="text-green-600">Pedro Silva!</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Veja as melhores ofertas na sua região de Bebedouro - SP</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                <Star size={24} className="fill-orange-500" />
             </div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seus Pontos</p>
               <p className="text-xl font-black text-gray-800">1.250</p>
             </div>
          </div>
        </div>
      </div>

      {/* 5. Mobile Only Title */}
      <div className="lg:hidden">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Olá, Pedro! <span className="inline-block animate-wave">👋</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin size={14}/> Bebedouro - SP</p>
      </div>

      {/* Categories Scroll */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-full whitespace-nowrap shadow-md hover:bg-green-700 transition">
           <TrendingDown size={16} /> Preços em Queda
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`whitespace-nowrap px-4 py-2 text-[14px] font-bold rounded-full transition-all border ${
              cat.active ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD GRID: Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: Map & Deals (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          
          {/* Map Snippet Header */}
          <div className="bg-white rounded-[24px] overflow-hidden border border-gray-200 shadow-sm relative group cursor-pointer hover:shadow-md transition-shadow">
             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
                 <MapIcon size={18} className="text-green-600" />
                 <span className="font-bold text-gray-800 text-sm">Mapa de Ofertas (Ao Vivo)</span>
             </div>
             <div className="absolute top-4 right-4 z-10 font-bold bg-green-600 text-white px-3 py-1 text-xs rounded-full shadow-sm animate-pulse">
                12 novidades agora
             </div>
             
             {/* Fake Map Background */}
             <div className="h-[200px] lg:h-[280px] w-full bg-[#e8f0e0] relative overflow-hidden flex items-center justify-center">
                 {/* Decorative roads */}
                 <div className="absolute inset-x-0 top-1/3 h-4 bg-white/70 border-y border-[#d9ddd5]"></div>
                 <div className="absolute inset-y-0 left-1/4 w-5 bg-white/70 border-x border-[#d9ddd5]"></div>
                 <div className="absolute inset-y-0 right-1/3 w-3 bg-white/70 border-x border-[#d9ddd5]"></div>
                 
                 {/* Pins */}
                 <div className="absolute top-[20%] left-[35%] bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg animate-float delay-1">R$ 4,50</div>
                 <div className="absolute top-[60%] left-[15%] bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg animate-float delay-2">R$ 22,90</div>
                 <div className="absolute top-[45%] left-[65%] bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg animate-float delay-3 ring-4 ring-red-500/20">R$ 2,99</div>
                 
                 <div className="relative z-0 opacity-20 transform scale-150"><MapIcon size={200} /></div>
             </div>

             <div className="bg-white p-4 flex justify-between items-center">
                <p className="text-sm text-gray-500 font-medium">Veja os preços atualizados colaborativamente por outros usuários próximos a você.</p>
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-green-600 group-hover:bg-green-50 transition-colors">
                  <ChevronRight />
                </div>
             </div>
          </div>

          {/* Product Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
                 <TrendingDown className="text-green-500"/> Mais Buscados na Semana
              </h3>
              <button className="text-sm font-bold text-green-600 bg-green-50 hover:bg-green-100 transition-colors px-3 py-1.5 rounded-xl">
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {products.slice(0, 4).map(product => (
                <div key={product.id} className="bg-white rounded-[20px] p-4 flex flex-col relative group cursor-pointer hover:-translate-y-1 transition-all border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200">
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-lg border border-red-100 z-10 flex items-center gap-1">
                     <TrendingDown size={10}/> Baixou
                  </div>
                  
                  {/* Product Image */}
                  <div className="w-full aspect-square rounded-2xl mb-4 bg-gray-50 p-2 overflow-hidden flex items-center justify-center order-1 mt-6">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-end order-2">
                    <h4 className="text-[13px] font-extrabold text-gray-800 leading-snug mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-[11px] text-gray-400 font-medium mb-3 flex flex-col gap-0.5">
                       <span>{product.store}</span>
                       <span className="flex items-center gap-1"><Clock size={10}/> {product.updated} atrás</span>
                    </p>
                    
                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        <p className="text-[10px] text-gray-400 line-through font-medium">{product.oldPrice}</p>
                        <span className="text-[16px] font-black text-green-700 leading-none">{product.price}</span>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar elements (Spans 1 col on desktop) */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* Minha Despensa Inteligente */}
          <div className="bg-gradient-to-b from-orange-50 to-white rounded-[24px] p-6 border border-orange-100 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-50 -translate-y-10 translate-x-10"></div>
             
             <div className="relative z-10">
               <h3 className="text-xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
                  <UtensilsCrossed className="text-orange-500"/> Despensa Inteligente
               </h3>
               <p className="text-sm text-gray-600 font-medium mb-6">Você tem ingredientes próximos do vencimento. Veja o que fazer:</p>

               <div className="space-y-4">
                 <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 hover:border-orange-200 cursor-pointer transition-colors">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=500&h=500&fit=crop" className="w-full h-full object-cover" alt="Omelete" />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-800 text-[14px]">Omelete de Frango</h4>
                       <p className="text-[12px] text-gray-500 mt-1"><span className="text-red-500 font-bold">Tomate vence amanhã!</span> Use na receita.</p>
                    </div>
                 </div>

                 <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 hover:border-orange-200 cursor-pointer transition-colors">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1548869206-9bfcb64ff73f?w=500&h=500&fit=crop" className="w-full h-full object-cover" alt="Arroz" />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-800 text-[14px]">Mexidão Rápido</h4>
                       <p className="text-[12px] text-gray-500 mt-1"><span className="text-orange-500 font-bold">Linguiça em 2 dias.</span> Ideal com sobras.</p>
                    </div>
                 </div>
               </div>

               <button className="w-full mt-6 py-3 bg-white border-2 border-orange-100 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors">
                 Ver Toda a Despensa
               </button>
             </div>
          </div>

          {/* Colabore e Ganhe Pontos (Scan CTA) */}
          <div className="bg-gray-900 rounded-[24px] p-6 text-white shadow-xl relative overflow-hidden group border border-gray-800">
             <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 rounded-full blur-[60px] opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
             
             <div className="relative z-10 text-center">
                 <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4 transform group-hover:-translate-y-2 transition-transform shadow-glow-green">
                    <Camera size={28} className="text-white" />
                 </div>
                 <h3 className="text-xl font-black mb-2">Escaneie & Ganhe</h3>
                 <p className="text-sm text-gray-400 mb-6 font-medium">Leia o QRCode da sua nota fiscal. Atualize preços e ganhe pontos valiosos.</p>
                 
                 <div className="bg-gray-800 rounded-xl p-4 text-left border border-gray-700 mb-6">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-gray-400">Progresso Nível 4</span>
                       <span className="text-xs font-black text-green-400">1.250 / 2.000 pts</span>
                    </div>
                    <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                       <div className="bg-green-500 h-full w-[62.5%] relative">
                           <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                       </div>
                    </div>
                 </div>

                 <button className="w-full py-3.5 bg-green-500 text-white font-black rounded-xl hover:bg-green-400 transition-colors shadow-lg">
                    Escanear Nota Agora
                 </button>
             </div>
          </div>

        </div>

      </div>

    </div>
  );
}
