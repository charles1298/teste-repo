import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Star, MapPin } from 'lucide-react';

const stores = [
  { id: 1, name: 'Mercado Preço Baixo', lat: -20.9495, lng: -48.4790, rating: 4.3, distance: '800m', deals: 12, bestPrice: 'R$ 2,99' },
  { id: 2, name: 'Supermercado Extra', lat: -20.9465, lng: -48.4750, rating: 4.1, distance: '1.2km', deals: 8, bestPrice: 'R$ 3,49' },
  { id: 3, name: 'Supermercado Dia', lat: -20.9510, lng: -48.4810, rating: 3.9, distance: '1.5km', deals: 15, bestPrice: 'R$ 3,19' },
  { id: 4, name: 'Atacadão', lat: -20.9480, lng: -48.4720, rating: 4.5, distance: '2.1km', deals: 24, bestPrice: 'R$ 2,49' },
  { id: 5, name: 'Assaí Atacadista', lat: -20.9530, lng: -48.4770, rating: 4.4, distance: '2.8km', deals: 31, bestPrice: 'R$ 2,29' },
];

function createStoreIcon(bestPrice: string) {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 3px 8px rgba(0,0,0,0.25));">
        <div style="background:linear-gradient(135deg,#22c55e,#16a34a);color:white;font-size:11px;font-weight:800;font-family:'Inter',sans-serif;padding:5px 12px;border-radius:10px;white-space:nowrap;">
          ${bestPrice}
        </div>
        <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #16a34a;"></div>
      </div>
    `,
    iconSize: [80, 38],
    iconAnchor: [40, 38],
  });
}

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-108px-64px)] flex flex-col">
      {/* Map header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-extrabold text-gray-800">
          <MapPin size={18} className="inline-block mr-1 text-green-500" />
          Mercados Próximos
        </h1>
        <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
          {stores.length} encontrados
        </span>
      </div>

      {/* Map */}
      <div className="flex-1 mx-4 rounded-2xl overflow-hidden border border-gray-200 shadow-lg mb-3">
        <MapContainer
          center={[-20.9490, -48.4770]}
          zoom={14}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          {stores.map(store => (
            <Marker key={store.id} position={[store.lat, store.lng]} icon={createStoreIcon(store.bestPrice)}>
              <Popup>
                <div className="p-3 min-w-[200px]">
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{store.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-0.5 text-[11px] text-yellow-600">
                      <Star size={10} fill="currentColor" /> {store.rating}
                    </span>
                    <span className="text-[11px] text-gray-400">• {store.distance}</span>
                    <span className="text-[11px] text-green-600 font-bold">{store.deals} ofertas</span>
                  </div>
                  <button className="w-full py-1.5 bg-green-500 text-white text-[12px] font-bold rounded-lg hover:bg-green-600 transition-colors">
                    Ver ofertas
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Store list */}
      <div className="px-4 pb-4 space-y-2 overflow-y-auto max-h-[200px]">
        {stores.map((store, i) => (
          <div key={store.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-green-200 transition-all cursor-pointer animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-gray-800 truncate">{store.name}</h4>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span className="flex items-center gap-0.5 text-yellow-500"><Star size={8} fill="currentColor" /> {store.rating}</span>
                <span>• {store.distance}</span>
                <span>• {store.deals} ofertas</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-extrabold text-green-600">{store.bestPrice}</span>
              <span className="text-[10px] text-gray-400 block">menor preço</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
