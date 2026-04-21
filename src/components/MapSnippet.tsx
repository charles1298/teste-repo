import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Product } from '../hooks/useRealtimeData';

interface Props {
  products: Product[];
  formatPrice: (v: number) => string;
  onClick?: () => void;
}

// Bebedouro-SP center
const CENTER: [number, number] = [-20.9491, -48.4797];
const ZOOM = 14;

// CartoDB Dark Matter tiles
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://carto.com/">CARTO</a>';

export default function MapSnippet({ products, formatPrice, onClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: false,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
    });

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTR,
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update markers when products change
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Add price pins
    products.forEach((p, i) => {
      const icon = L.divIcon({
        className: 'custom-price-marker',
        html: `
          <div class="price-pin animate-float" style="animation-delay: ${i * 0.3}s">
            ${formatPrice(p.price)}
          </div>
        `,
        iconSize: [90, 40],
        iconAnchor: [45, 40],
      });

      L.marker([p.lat, p.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: Inter, sans-serif;">
            <strong style="font-size: 13px;">${p.name}</strong><br/>
            <span style="color: var(--green-neon); font-weight: 800; font-size: 15px;">${formatPrice(p.price)}</span><br/>
            <span style="color: var(--text-secondary); font-size: 11px;">${p.store}</span>
          </div>`
        );
    });
  }, [products, formatPrice]);

  return (
    <div
      onClick={onClick}
      className="relative rounded-[18px] overflow-hidden cursor-pointer group"
      style={{ height: '220px' }}
    >
      <div ref={mapRef} className="w-full h-full" />

      {/* Overlay gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent, rgba(13, 21, 38, 0.8))',
        }}
      />

      {/* Click hint */}
      <div className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--green-neon)' }}
      >
        Abrir Mapa ↗
      </div>
    </div>
  );
}
