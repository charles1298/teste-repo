import { useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_MARKERS } from '../data/mapData';
import L from 'leaflet';

// Import map image (using a generic high-tech/sci-fi grid image from unsplash)
const mapImageUrl = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop';

// Custom icons based on marker type
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const getIconForType = (type: string) => {
  switch (type) {
    case 'Extraction': return createCustomIcon('#38bdf8'); // arc-accent
    case 'Loot': return createCustomIcon('#eab308'); // yellow
    case 'Danger': return createCustomIcon('#ef4444'); // red
    case 'Boss': return createCustomIcon('#a855f7'); // purple
    default: return createCustomIcon('#ffffff');
  }
};

const MapBoundsComponent = ({ bounds }: { bounds: L.LatLngBoundsExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, [map, bounds]);
  return null;
};

const MapPage = () => {
  // Define coordinates bounds for the image
  // [y, x] where [0,0] is bottom left
  const bounds: L.LatLngBoundsExpression = [[0, 0], [100, 100]];

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] w-full flex flex-col space-y-4 pb-20 md:pb-0">
      <div className="border-b border-gray-800 pb-2">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Tactical Map</h1>
        <p className="text-gray-400">Real-time topographical and tactical overlay.</p>
      </div>
      
      <div className="flex-1 bg-black/50 border-2 border-gray-800 rounded-lg overflow-hidden shadow-2xl relative z-0">
        <MapContainer
          center={[50, 50]}
          zoom={2}
          minZoom={1}
          maxZoom={4}
          crs={L.CRS.Simple} // Simple CRS is important for flat images instead of geographical maps
          style={{ height: '100%', width: '100%', backgroundColor: '#020617' }}
          maxBounds={[[ -20, -20 ], [ 120, 120 ]]}
        >
          <ImageOverlay
            url={mapImageUrl}
            bounds={bounds}
            opacity={0.8}
            className="filter sepia hue-rotate-180 brightness-75 contrast-125" // Styling the image to look more sci-fi/radar like
          />
          
          <MapBoundsComponent bounds={bounds} />

          {MAP_MARKERS.map(marker => (
            <Marker 
              key={marker.id} 
              position={marker.coordinates}
              icon={getIconForType(marker.type)}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2 text-gray-900">{marker.name}</h3>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-gray-200 text-gray-800 mb-2">
                    {marker.type}
                  </span>
                  <p className="text-sm text-gray-700 leading-tight">
                    {marker.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute top-4 right-4 z-[400] bg-arc-darker/90 backdrop-blur border border-gray-700 p-4 rounded-lg pointer-events-none">
          <h4 className="text-white text-sm font-bold uppercase mb-2 border-b border-gray-700 pb-1">Legend</h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#38bdf8] mr-2 shadow-[0_0_5px_#38bdf8]"></div> Extraction</li>
            <li className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#eab308] mr-2 shadow-[0_0_5px_#eab308]"></div> High-tier Loot</li>
            <li className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2 shadow-[0_0_5px_#ef4444]"></div> Danger Zone</li>
            <li className="flex items-center"><div className="w-3 h-3 rounded-full bg-[#a855f7] mr-2 shadow-[0_0_5px_#a855f7]"></div> Boss / Elite</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
