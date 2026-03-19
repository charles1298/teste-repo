import { useState, useEffect, useMemo } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GAME_MAPS, type MarkerType, type GameMap } from '../data/mapData';
import L from 'leaflet';

// ─── Custom SVG Icons per Marker Type ───────────────────────────────────────
const MARKER_CONFIG: Record<MarkerType, { color: string; label: string; svg: string }> = {
  Loot: {
    color: '#eab308',
    label: 'Saque de Alto Nível',
    svg: `<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="10" fill="#eab308" stroke="#fff" stroke-width="2"/><text x="14" y="18" text-anchor="middle" fill="#000" font-size="12" font-weight="bold">$</text></svg>`,
  },
  Schematic: {
    color: '#06b6d4',
    label: 'Esquemas / Projetos',
    svg: `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="4" width="20" height="20" rx="3" fill="#06b6d4" stroke="#fff" stroke-width="2" transform="rotate(45 14 14)"/><text x="14" y="18" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">✦</text></svg>`,
  },
  Extraction: {
    color: '#22c55e',
    label: 'Ponto de Extração',
    svg: `<svg width="28" height="28" viewBox="0 0 28 28"><polygon points="14,2 26,24 2,24" fill="#22c55e" stroke="#fff" stroke-width="2"/><text x="14" y="21" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">▲</text></svg>`,
  },
  Danger: {
    color: '#ef4444',
    label: 'Zona de Perigo',
    svg: `<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/><text x="14" y="19" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">☠</text></svg>`,
  },
  Boss: {
    color: '#a855f7',
    label: 'Chefe / Elite',
    svg: `<svg width="28" height="28" viewBox="0 0 28 28"><polygon points="14,1 17.5,10 27,10 19.5,16 22,26 14,20 6,26 8.5,16 1,10 10.5,10" fill="#a855f7" stroke="#fff" stroke-width="1.5"/></svg>`,
  },
};

const createIcon = (type: MarkerType) => {
  const config = MARKER_CONFIG[type];
  return new L.DivIcon({
    className: 'custom-map-marker',
    html: `<div class="marker-icon-wrapper" style="filter: drop-shadow(0 0 6px ${config.color});">${config.svg}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
};

// ─── Map Bounds Sync Component ──────────────────────────────────────────────
const MapBoundsComponent = ({ bounds, mapId }: { bounds: L.LatLngBoundsExpression; mapId: string }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
    map.setZoom(2);
  }, [map, bounds, mapId]);
  return null;
};

// ─── Main MapPage Component ─────────────────────────────────────────────────
const MapPage = () => {
  const [activeMapId, setActiveMapId] = useState(GAME_MAPS[0].id);
  const [activeFilters, setActiveFilters] = useState<Set<MarkerType>>(
    new Set(['Loot', 'Schematic', 'Extraction', 'Danger', 'Boss'])
  );

  const activeMap: GameMap = useMemo(
    () => GAME_MAPS.find((m) => m.id === activeMapId) || GAME_MAPS[0],
    [activeMapId]
  );

  const filteredMarkers = useMemo(
    () => activeMap.markers.filter((m) => activeFilters.has(m.type)),
    [activeMap, activeFilters]
  );

  const toggleFilter = (type: MarkerType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const bounds: L.LatLngBoundsExpression = [[0, 0], [100, 100]];

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] w-full flex flex-col space-y-3 pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-gray-800 pb-2 relative pl-4">
        <div className="absolute -left-0 top-0 bottom-0 w-1 bg-arc-accent shadow-[0_0_10px_var(--color-arc-accent)]"></div>
        <h1 className="text-3xl font-black text-white uppercase tracking-[0.1em] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          Mapa <span className="text-arc-accent">Tático</span>
        </h1>
        <p className="text-arc-cyan/80 font-mono text-sm tracking-widest uppercase mt-1">Selecione uma zona de incursão e explore pontos de interesse.</p>
      </div>

      {/* ─── Map Selector Tabs ─── */}
      <div className="flex flex-wrap gap-2">
        {GAME_MAPS.map((gmap) => (
          <button
            key={gmap.id}
            onClick={() => setActiveMapId(gmap.id)}
            className="relative px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 border"
            style={
              activeMapId === gmap.id
                ? {
                    backgroundColor: gmap.accentColor + '22',
                    borderColor: gmap.accentColor,
                    color: gmap.accentColor,
                    boxShadow: `0 0 15px ${gmap.accentColor}44, inset 0 0 15px ${gmap.accentColor}11`,
                  }
                : {
                    backgroundColor: 'transparent',
                    borderColor: '#374151',
                    color: '#9ca3af',
                  }
            }
          >
            {gmap.name}
            {activeMapId === gmap.id && (
              <span
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3/4 h-0.5 rounded-full"
                style={{ backgroundColor: gmap.accentColor }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ─── Map Description ─── */}
      <div className="flex items-center gap-3 bg-arc-darker/80 tech-border px-4 py-2 mt-2">
        <div
          className="w-2 h-8 flex-shrink-0"
          style={{ backgroundColor: activeMap.accentColor, boxShadow: `0 0 10px ${activeMap.accentColor}` }}
        />
        <div>
          <span className="text-white font-bold tracking-wider uppercase text-lg">{activeMap.name}</span>
          <span className="text-arc-cyan font-mono text-xs ml-2 uppercase tracking-widest">— {activeMap.subtitle}</span>
          <p className="text-gray-400 text-sm leading-snug">{activeMap.description}</p>
        </div>
      </div>

      {/* ─── Map + Controls Container ─── */}
      <div className="flex-1 relative overflow-hidden tech-border shadow-[0_0_30px_rgba(0,0,0,0.8)] mt-2">
        {/* Leaflet Map */}
        <MapContainer
          center={[50, 50]}
          zoom={2}
          minZoom={1}
          maxZoom={5}
          crs={L.CRS.Simple}
          style={{ height: '100%', width: '100%', backgroundColor: '#020617' }}
          maxBounds={[[-20, -20], [120, 120]]}
          key={activeMap.id} // Force re-mount on map change
        >
          <ImageOverlay
            url={activeMap.imageUrl}
            bounds={bounds}
            opacity={0.85}
            className="map-image-overlay"
          />

          <MapBoundsComponent bounds={bounds} mapId={activeMap.id} />

          {filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.coordinates}
              icon={createIcon(marker.type)}
            >
              <Popup className="custom-popup" maxWidth={280}>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 mb-2">
                    {marker.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold mb-2"
                    style={{
                      backgroundColor: MARKER_CONFIG[marker.type].color + '22',
                      color: MARKER_CONFIG[marker.type].color,
                      border: `1px solid ${MARKER_CONFIG[marker.type].color}44`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: MARKER_CONFIG[marker.type].color }}
                    />
                    {marker.type}
                  </span>
                  <p className="text-xs text-gray-700 leading-snug mb-2">
                    {marker.description}
                  </p>
                  {marker.items && marker.items.length > 0 && (
                    <div className="border-t border-gray-200 pt-2">
                      <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-wider">
                        Possíveis Saques
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {marker.items.map((item, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* ─── Filter Panel (overlays the map) ─── */}
        <div className="absolute top-3 left-3 z-[400] tech-border bg-arc-darker/90 backdrop-blur-md px-3 py-3 w-48">
          <h4 className="text-white text-xs font-bold uppercase mb-2 tracking-wider border-b border-gray-700 pb-1">
            Filtros
          </h4>
          <div className="space-y-1.5">
            {(Object.entries(MARKER_CONFIG) as [MarkerType, typeof MARKER_CONFIG[MarkerType]][]).map(
              ([type, config]) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.has(type)}
                    onChange={() => toggleFilter(type)}
                    className="sr-only"
                  />
                  <div
                    className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                    style={{
                      borderColor: activeFilters.has(type) ? config.color : '#4b5563',
                      backgroundColor: activeFilters.has(type) ? config.color : 'transparent',
                    }}
                  >
                    {activeFilters.has(type) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: config.color,
                      boxShadow: activeFilters.has(type) ? `0 0 6px ${config.color}` : 'none',
                    }}
                  />
                  <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                    {config.label}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* ─── Legend Panel ─── */}
        <div className="absolute top-3 right-3 z-[400] tech-border bg-arc-darker/90 backdrop-blur-md p-3 pointer-events-none w-48">
          <h4 className="text-white text-xs font-bold uppercase mb-2 tracking-wider border-b border-gray-700 pb-1">
            Legenda
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-300">
            {(Object.entries(MARKER_CONFIG) as [MarkerType, typeof MARKER_CONFIG[MarkerType]][]).map(
              ([type, config]) =>
                activeFilters.has(type) && (
                  <li key={type} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: config.color,
                        boxShadow: `0 0 5px ${config.color}`,
                      }}
                    />
                    {config.label}
                  </li>
                )
            )}
          </ul>
          <div className="mt-2 pt-2 border-t border-gray-700 text-[10px] text-gray-500">
            {filteredMarkers.length} marcadores exibidos
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
