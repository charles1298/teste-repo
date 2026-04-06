import { useState } from 'react';
import { Search, ChevronRight, MapPin, Clock, Plus } from 'lucide-react';

// Use reliable high-quality Unsplash image URLs for food
const products = [
  { id: 1, name: 'Japan Hainanese Sashimi', price: 'R$ 39,99', store: 'Kupa Kitchen', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop', badge: 'Discount 25%' },
  { id: 2, name: 'Hot & Sour Corn Soup', price: 'R$ 25,99', store: 'Kupa Kitchen', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=500&fit=crop', badge: '' },
  { id: 3, name: 'Black Pepper Beef Rice', price: 'R$ 27,12', store: 'Asian Bowl', img: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&h=500&fit=crop', badge: '' },
  { id: 4, name: 'Squid Sweet & Sour Salad', price: 'R$ 19,99', store: 'Seafood King', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', badge: '' },
  { id: 5, name: 'Spicy Ramen Bowl', price: 'R$ 32,50', store: 'Tokyo Express', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop', badge: 'Hot' },
];

const categories = [
  { id: 'all', label: 'All', active: true },
  { id: 'featured', label: 'Featured', active: false },
  { id: 'top', label: 'Top of Week', active: false },
  { id: 'soup', label: 'Soup', active: false },
  { id: 'seafood', label: 'Seafood', active: false },
  { id: 'asian', label: 'Asian', active: false },
];

export default function HomePage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="space-y-8 pt-4 pb-12 font-sans fade-in-section">
      
      {/* 1. Header Details (Desktop mostly, adds context with generous spacing) */}
      <h1 className="text-3xl font-extrabold text-gray-800 hidden lg:block leading-tight pt-2">
        Discover <br/>
        <span className="text-green-600">Special For You</span>
      </h1>

      {/* 2. Search Bar - Increased height and padding for more breathing room */}
      <div className="flex items-center h-14 rounded-[20px] bg-[#f9fafb] border border-gray-100 px-5 shadow-sm focus-within:ring-4 focus-within:ring-green-100 transition-all hover:bg-white group cursor-text">
        <Search size={22} className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
        <input
          type="text"
          placeholder="Search Our Menu..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 h-full ml-4 bg-transparent text-base text-gray-800 placeholder:text-gray-400 outline-none"
        />
      </div>

      {/* 3. Promo Banner - Increased padding and softer shadow */}
      <div className="bg-green-700 rounded-3xl p-8 relative overflow-hidden flex items-center justify-between shadow-[0_10px_40px_rgba(48,122,89,0.3)] hover:shadow-[0_15px_50px_rgba(48,122,89,0.4)] transition-shadow">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-60 translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-800 rounded-full blur-2xl opacity-80 -translate-x-10 translate-y-10" />
        
        <div className="relative z-10 w-full flex items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-white font-extrabold text-xl mb-3 tracking-wide">Delivery to Home</p>
            <div className="flex items-center gap-2 text-green-100 text-xs mb-4 font-medium opacity-90">
               <MapPin size={14} /> Utama Street no. 1A, Mumbai
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold shadow-inner">
              <Clock size={12} /> 2.4 km
            </div>
          </div>
          <button className="relative z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white backdrop-blur-md transition-all active:scale-90">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 5. Mobile Only Title */}
      <h2 className="text-2xl font-extrabold text-gray-800 lg:hidden py-1">
        Special For You
      </h2>

      {/* 6. Categories Scroll - more spacing and thicker border */}
      <div className="flex gap-6 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`whitespace-nowrap px-2 py-2 text-[15px] font-bold border-b-[3px] transition-all hover:-translate-y-0.5 ${
              cat.active ? 'text-gray-800 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 7. Product Grid - Using a more comfortable responsive grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-extrabold text-gray-800 uppercase tracking-wider">Top of Week</h3>
          <button className="text-sm font-bold text-gray-400 flex items-center gap-1 hover:text-green-600 transition-colors px-2 py-1 rounded-lg hover:bg-green-50">
            See all <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-[#FBFCFD] rounded-[28px] p-5 flex flex-col relative group cursor-pointer hover:bg-green-50/70 transition-all border-2 border-transparent hover:border-green-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1">
              
              {/* Product Image */}
              <div className="w-full aspect-square rounded-full mb-5 bg-white p-2 shadow-sm order-1">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              {/* Details */}
              <div className="flex-1 flex flex-col justify-end order-2">
                <h4 className="text-[15px] font-extrabold text-gray-800 leading-snug mb-1.5 text-center px-1">{product.name}</h4>
                <p className="text-xs text-gray-400 font-medium text-center mb-5">{product.store}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[15px] font-black text-green-700">{product.price}</span>
                  <button className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors shadow-sm active:scale-90">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Discount Badge */}
              {product.badge && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-br-[14px] rounded-tl-[26px] shadow-sm z-10">
                  {product.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
