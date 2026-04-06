import { useState } from 'react';
import { 
  User, Gift, ChevronRight, Settings, LogOut, Bell, Shield, Heart, MapPin, 
  CreditCard, Clock, Check
} from 'lucide-react';

const dietPreferences = [
  { id: 'veg', label: 'Vegetarian' },
  { id: 'spicy', label: 'Spicy Food' },
  { id: 'low-carb', label: 'Low Carb' },
  { id: 'gluten-free', label: 'Gluten Free' },
  { id: 'dairy-free', label: 'Dairy Free' },
  { id: 'halal', label: 'Halal' },
];

const favorites = [
  { id: 1, name: 'Japan Hainanese Sashimi', store: 'Kupa Kitchen', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop' },
  { id: 2, name: 'Hot & Sour Corn Soup', store: 'Kupa Kitchen', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=100&h=100&fit=crop' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(['veg', 'spicy']);

  const togglePref = (id: string) => {
    setSelectedPrefs(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pt-4 pb-12 font-sans fade-in-section max-w-3xl mx-auto">
      
      {/* 1. Kupa Style Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            <User size={40} className="text-green-600" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center border-2 border-white shadow-sm hover:scale-110 transition-transform">
            <Settings size={14} />
          </button>
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Pedro Silva</h1>
          <p className="text-sm font-medium text-gray-400 mt-1">pedro@example.com <span className="mx-1">•</span> +55 11 99999-9999</p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-xs font-bold">
            <Gift size={14} /> Gold Member
          </div>
        </div>
      </div>

      {/* 2. Interactive Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-2xl w-full max-w-sm mx-auto md:mx-0">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'profile' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          My Profile
        </button>
        <button 
          onClick={() => setActiveTab('preferences')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'preferences' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Preferences
        </button>
      </div>

      {/* 3. Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid md:grid-cols-2 gap-6 animate-fadeInUp">
          
          {/* Quick Links Group */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider mb-4 px-2">Account Settings</h3>
            {[
              { icon: MapPin, title: 'Delivery Addresses', desc: 'Manage your saved locations' },
              { icon: CreditCard, title: 'Payment Methods', desc: 'Add or remove cards' },
              { icon: Clock, title: 'Order History', desc: 'View past orders' },
              { icon: Bell, title: 'Notifications', desc: 'Alerts and Promos' },
              { icon: Shield, title: 'Privacy & Security', desc: 'Password and security' },
            ].map((item, i) => (
              <button key={i} className="w-full bg-white border border-gray-100 hover:border-green-200 rounded-2xl p-4 flex items-center gap-4 group transition-all hover:shadow-[0_4px_20px_rgba(48,122,89,0.06)] hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-green-50 flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-colors">
                  <item.icon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[15px] font-bold text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              </button>
            ))}
            
            <button className="w-full bg-red-50 hover:bg-red-100 border border-transparent rounded-2xl p-4 flex items-center gap-4 transition-all mt-6 text-red-600">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                <LogOut size={20} />
              </div>
              <span className="flex-1 text-left text-[15px] font-bold">Log Out</span>
            </button>
          </div>

          {/* Right Column: Favorites etc */}
          <div className="space-y-6">
            <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider px-2">Favorite Foods</h3>
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
              {favorites.map((fav) => (
                <div key={fav.id} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <img src={fav.img} alt={fav.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800">{fav.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">{fav.store}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm hover:border-green-300 hover:text-green-600 transition-colors">
                View All Favorites
              </button>
            </div>
          </div>
          
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="animate-fadeInUp space-y-8">
          
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">Dietary Preferences</h2>
            <p className="text-sm text-gray-400 font-medium mb-6">
              Select your preferences below and we'll customize your menu feed so you only see what you love.
            </p>

            <div className="flex flex-wrap gap-3">
              {dietPreferences.map(pref => {
                const isSelected = selectedPrefs.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    onClick={() => togglePref(pref.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                        : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {isSelected && <Check size={16} className="text-green-600" />}
                    {pref.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">Cooking & Delivery</h2>
            <div className="space-y-4 max-w-md mt-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                   <p className="text-sm font-bold text-gray-800">Leave at door</p>
                   <p className="text-xs text-gray-400 mt-1">Delivery partner will leave order at door</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                   <p className="text-sm font-bold text-gray-800">Extra Cutlery</p>
                   <p className="text-xs text-gray-400 mt-1">Include plastic spoons, forks, etc</p>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
