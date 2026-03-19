export type MarkerType = 'Loot' | 'Extraction' | 'Danger' | 'Boss';

export interface MapMarker {
  id: string;
  name: string;
  type: MarkerType;
  coordinates: [number, number]; // [lat, lng] usually based on image bounds
  description: string;
}

// These coordinates are relative to the image map bounds we will use.
// Leaflet uses [Lat, Lng], which translates to [Y, X] for images.
export const MAP_MARKERS: MapMarker[] = [
  {
    id: 'mk-001',
    name: 'Alpha Extraction',
    type: 'Extraction',
    coordinates: [80, 20],
    description: 'Primary extraction point. High player traffic.',
  },
  {
    id: 'mk-002',
    name: 'Abandoned Silo',
    type: 'Loot',
    coordinates: [40, 60],
    description: 'Contains high-tier crafting materials.',
  },
  {
    id: 'mk-003',
    name: 'ARC Dropship Wreck',
    type: 'Boss',
    coordinates: [50, 50],
    description: 'Defended by elite ARC units. Legendary loot chance.',
  },
  {
    id: 'mk-004',
    name: 'Radioactive Zone',
    type: 'Danger',
    coordinates: [20, 80],
    description: 'High radiation. Requires specific gear to enter safely.',
  },
  {
    id: 'mk-005',
    name: 'Bravo Extraction',
    type: 'Extraction',
    coordinates: [10, 30],
    description: 'Secondary, safer extraction. Slower ship arrival.',
  },
];
