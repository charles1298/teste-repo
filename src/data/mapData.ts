export type MarkerType = 'Loot' | 'Schematic' | 'Extraction' | 'Danger' | 'Boss';

export interface MapMarker {
  id: string;
  name: string;
  type: MarkerType;
  coordinates: [number, number]; // [lat, lng] relative to image bounds
  description: string;
  items?: string[]; // Possible items found here
}

export interface GameMap {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor: string; // Unique color per map
  markers: MapMarker[];
}

export const GAME_MAPS: GameMap[] = [
  // ======================== DAM BATTLEGROUNDS ========================
  {
    id: 'dam-battlegrounds',
    name: 'Dam Battlegrounds',
    subtitle: 'Alcântara Power Plant',
    description: 'A toxic, waterlogged landscape around a massive hydroelectric dam. Beginner-friendly with open terrain and accessible loot.',
    imageUrl: '/maps/dam_battlegrounds.png',
    accentColor: '#2dd4bf', // teal
    markers: [
      {
        id: 'dam-ext-01',
        name: 'Alpha Extraction',
        type: 'Extraction',
        coordinates: [85, 15],
        description: 'Primary extraction point near the dam wall. High player traffic during final minutes.',
      },
      {
        id: 'dam-ext-02',
        name: 'Bravo Extraction',
        type: 'Extraction',
        coordinates: [12, 75],
        description: 'Secondary extraction south-east. Safer but slower ship arrival time.',
      },
      {
        id: 'dam-loot-01',
        name: 'Control Tower',
        type: 'Loot',
        coordinates: [65, 40],
        description: 'Tall structure overlooking the dam. Multiple weapon crates and medical supplies on upper floors.',
        items: ['Weapon Cases', 'Medical Bags', 'ARC Powercells'],
      },
      {
        id: 'dam-loot-02',
        name: 'Hydroponic Dome Complex',
        type: 'Loot',
        coordinates: [50, 70],
        description: 'Greenhouse domes with high-tier loot and Scrappy upgrades. Multiple entry points.',
        items: ['Scrappy Upgrades', 'Crafting Materials', 'Trinkets'],
      },
      {
        id: 'dam-loot-03',
        name: 'Research & Admin Building',
        type: 'Loot',
        coordinates: [40, 30],
        description: 'Two-story building with tech loot and weapon parts. Often has a red locker.',
        items: ['Gun Parts', 'Electronic Components', 'Batteries'],
      },
      {
        id: 'dam-schem-01',
        name: 'Power Generation Complex',
        type: 'Schematic',
        coordinates: [30, 55],
        description: 'Hidden loot room accessible with a Power Rod. High chance of blueprint drops.',
        items: ['Rattler Blueprint', 'Arpeggio Blueprint', 'Weapon Mod Schematics'],
      },
      {
        id: 'dam-schem-02',
        name: 'Hidden Electrical Station',
        type: 'Schematic',
        coordinates: [72, 82],
        description: 'Concealed backpack near the electrical station. Contains rare schematics.',
        items: ['Il Toro Blueprint', 'Silencer Schematic'],
      },
      {
        id: 'dam-danger-01',
        name: 'Radioactive Spillway',
        type: 'Danger',
        coordinates: [20, 20],
        description: 'High radiation zone below the dam. Requires hazmat gear. Extremely toxic water.',
      },
      {
        id: 'dam-boss-01',
        name: 'ARC Dropship Wreck',
        type: 'Boss',
        coordinates: [55, 50],
        description: 'Crashed ARC dropship defended by elite ARC sentinels. Legendary loot on defeat.',
        items: ['Legendary Weapon Cases', 'ARC Core Components'],
      },
      {
        id: 'dam-loot-04',
        name: 'Water Tower Cache',
        type: 'Loot',
        coordinates: [78, 60],
        description: 'Climb the water towers for hidden grenade tubes and weapon cases.',
        items: ['Grenade Tubes', 'Weapon Cases', 'Ammo Crates'],
      },
    ],
  },

  // ======================== BURIED CITY ========================
  {
    id: 'buried-city',
    name: 'Buried City',
    subtitle: 'Sand-Covered Italian Ruins',
    description: 'A compact Italian city half-buried in sand dunes. Cramped streets and verticality make it a PvP hotspot.',
    imageUrl: '/maps/buried_city.png',
    accentColor: '#f59e0b', // amber
    markers: [
      {
        id: 'bc-ext-01',
        name: 'North Extraction',
        type: 'Extraction',
        coordinates: [90, 50],
        description: 'Main extraction on the northern dunes. Open area — watch for snipers.',
      },
      {
        id: 'bc-ext-02',
        name: 'Underground Extraction',
        type: 'Extraction',
        coordinates: [10, 40],
        description: 'Hidden extraction through the old subway tunnels. Less player traffic.',
      },
      {
        id: 'bc-loot-01',
        name: 'Grandioso Apartments',
        type: 'Loot',
        coordinates: [60, 30],
        description: 'Multi-story apartments with high chance of weapon cases and blueprint drops.',
        items: ['Weapon Cases', 'Blueprints', 'Gun Parts'],
      },
      {
        id: 'bc-loot-02',
        name: 'Town Hall',
        type: 'Loot',
        coordinates: [50, 55],
        description: 'Central building with multiple loot rooms. Good for blueprint farming.',
        items: ['Blueprints', 'Trinkets', 'ARC Powercells'],
      },
      {
        id: 'bc-loot-03',
        name: 'Hospital',
        type: 'Loot',
        coordinates: [45, 75],
        description: 'Rich in medical supplies but a notorious PvP hotspot. Multiple floors.',
        items: ['Stim-Shots', 'Antiseptics', 'Medical Bags'],
      },
      {
        id: 'bc-schem-01',
        name: 'Santa Maria Houses',
        type: 'Schematic',
        coordinates: [70, 65],
        description: 'Residential area great for blueprint farming. Check inside drawers and safes.',
        items: ['Burletta Blueprint', 'Venator Blueprint', 'Armor Schematic'],
      },
      {
        id: 'bc-schem-02',
        name: 'Galleria',
        type: 'Schematic',
        coordinates: [35, 45],
        description: 'Shopping gallery with tech loot and schematics. Also a source of Great Mullein.',
        items: ['Stitcher Blueprint', 'Weapon Mod Schematics', 'Great Mullein'],
      },
      {
        id: 'bc-schem-03',
        name: 'Secret Apartment',
        type: 'Schematic',
        coordinates: [55, 20],
        description: 'Accessible via ladder and sideways jump. Rare loot and schematic drops.',
        items: ['Rare Blueprints', 'Epic Weapon Cases'],
      },
      {
        id: 'bc-danger-01',
        name: 'Sandstorm Alley',
        type: 'Danger',
        coordinates: [25, 85],
        description: 'Narrow streets with frequent sandstorms reducing visibility. PvP ambush zone.',
      },
      {
        id: 'bc-loot-04',
        name: 'Morano Station',
        type: 'Loot',
        coordinates: [30, 15],
        description: 'Old train station with scattered crates and lockers.',
        items: ['Ammo Crates', 'Gun Parts', 'Trinkets'],
      },
      {
        id: 'bc-boss-01',
        name: 'Plaza Rosa — Bombardier Spawn',
        type: 'Boss',
        coordinates: [40, 50],
        description: 'Open plaza where Bombardier ARC units frequently patrol. High reward on kill.',
        items: ['Legendary Drops', 'ARC Surveyor Parts'],
      },
    ],
  },

  // ======================== SPACEPORT ========================
  {
    id: 'spaceport',
    name: 'Spaceport',
    subtitle: 'Acerra Spaceport',
    description: 'Abandoned space launch facility. S-tier for loot with massive hangars and container yards.',
    imageUrl: '/maps/spaceport.png',
    accentColor: '#3b82f6', // blue
    markers: [
      {
        id: 'sp-ext-01',
        name: 'Launchpad Extraction',
        type: 'Extraction',
        coordinates: [82, 70],
        description: 'Extraction on the main launch pad. Wide open — high sniper risk.',
      },
      {
        id: 'sp-ext-02',
        name: 'Cargo Bay Extraction',
        type: 'Extraction',
        coordinates: [15, 25],
        description: 'Extraction through the old cargo rail system. Moderate cover available.',
      },
      {
        id: 'sp-loot-01',
        name: 'Control Tower A6',
        type: 'Loot',
        coordinates: [70, 35],
        description: 'Multi-floor control tower with red lockers and weapon crates on every level.',
        items: ['Weapon Cases', 'Red Locker Loot', 'Electronic Components'],
      },
      {
        id: 'sp-loot-02',
        name: 'Container Storage',
        type: 'Loot',
        coordinates: [55, 60],
        description: 'Massive container yard with dozens of lootable containers. Can find anything here.',
        items: ['Weapon Cases', 'Crafting Materials', 'Ammo', 'Trinkets'],
      },
      {
        id: 'sp-loot-03',
        name: 'Departure Building',
        type: 'Loot',
        coordinates: [45, 45],
        description: 'Excellent looting spot with multiple floors, breach containers, and hidden rooms.',
        items: ['Blueprints', 'Weapon Cases', 'ARC Powercells'],
      },
      {
        id: 'sp-schem-01',
        name: 'Vehicle Maintenance',
        type: 'Schematic',
        coordinates: [35, 80],
        description: 'Lower-risk zone with red lockers, weapon crates, and breach containers that yield blueprints.',
        items: ['Tempest Blueprint', 'Bobcat Blueprint', 'Weapon Mod Schematics'],
      },
      {
        id: 'sp-schem-02',
        name: 'Rocket Assembly Hall',
        type: 'Schematic',
        coordinates: [60, 20],
        description: 'Huge hangar with rare schematics in locked rooms. Requires key to access inner rooms.',
        items: ['Bettina Blueprint', 'Hullcracker Blueprint', 'Rare Armor Schematics'],
      },
      {
        id: 'sp-loot-04',
        name: 'Trench Towers',
        type: 'Loot',
        coordinates: [25, 50],
        description: 'Use the zipline to access red lockers without needing a key. Quick in-and-out spot.',
        items: ['Red Locker Loot', 'Gun Mods', 'Silencers'],
      },
      {
        id: 'sp-danger-01',
        name: 'Fuel Storage — Explosive Zone',
        type: 'Danger',
        coordinates: [40, 15],
        description: 'Volatile fuel tanks. Explosions can chain-react. Extremely dangerous in firefights.',
      },
      {
        id: 'sp-boss-01',
        name: 'ARC Harvester Zone',
        type: 'Boss',
        coordinates: [50, 50],
        description: 'ARC Harvester event spawn. Defeating it can drop Jupiter and Equaliser blueprints.',
        items: ['Jupiter Blueprint', 'Equaliser Blueprint', 'Legendary Components'],
      },
    ],
  },

  // ======================== THE BLUE GATE ========================
  {
    id: 'blue-gate',
    name: 'The Blue Gate',
    subtitle: 'Alpine Mountain Stronghold',
    description: 'Mountain region with tunnels, bunkers, and the hardest PvE content. Home to Queen events and legendary rewards.',
    imageUrl: '/maps/blue_gate.png',
    accentColor: '#22c55e', // green
    markers: [
      {
        id: 'bg-ext-01',
        name: 'Mountain Peak Extraction',
        type: 'Extraction',
        coordinates: [88, 50],
        description: 'Extraction at the highest point. Long sightlines — easy to spot, hard to ambush.',
      },
      {
        id: 'bg-ext-02',
        name: 'Tunnel Mouth Extraction',
        type: 'Extraction',
        coordinates: [8, 30],
        description: 'Extraction near the main tunnel entrance. Good cover but narrow escape routes.',
      },
      {
        id: 'bg-loot-01',
        name: 'Warehouse Complex',
        type: 'Loot',
        coordinates: [60, 40],
        description: 'Large warehouse area with red lockers containing blueprints, breach doors with grenade tubes, and Security Breach lockers.',
        items: ['Blueprints', 'Grenade Tubes', 'Security Locker Loot'],
      },
      {
        id: 'bg-loot-02',
        name: 'Mountain Caves',
        type: 'Loot',
        coordinates: [50, 75],
        description: 'Natural cave system with scattered loot caches. High tier crafting materials.',
        items: ['Crafting Materials', 'Power Cables', 'Motors'],
      },
      {
        id: 'bg-schem-01',
        name: 'Maintenance Wing Breach Room',
        type: 'Schematic',
        coordinates: [40, 55],
        description: 'Condensed loot room with lower PvP risk. Excellent for schematic farming.',
        items: ['Osprey Blueprint', 'Torrente Blueprint', 'Anvil Blueprint'],
      },
      {
        id: 'bg-schem-02',
        name: 'Underground Bunker',
        type: 'Schematic',
        coordinates: [30, 35],
        description: 'Deep bunker complex accessible via puzzle. Contains rare blueprints and legendary gear.',
        items: ['Aphelion Blueprint', 'Jupiter Blueprint', 'Legendary Armor Schematics'],
      },
      {
        id: 'bg-schem-03',
        name: 'ARC Husk Puzzle Site',
        type: 'Schematic',
        coordinates: [55, 80],
        description: 'East of Maintenance Bunker. Solve the ARC husk puzzle for valuable schematics.',
        items: ['Rare Schematics', 'Weapon Mod Blueprints'],
      },
      {
        id: 'bg-danger-01',
        name: 'Avalanche Corridor',
        type: 'Danger',
        coordinates: [70, 20],
        description: 'Narrow mountain pass prone to avalanches. Extremely hazardous during storms.',
      },
      {
        id: 'bg-danger-02',
        name: 'Toxic Mine Shaft',
        type: 'Danger',
        coordinates: [20, 65],
        description: 'Abandoned mine with toxic gas pockets. Requires breathing apparatus.',
      },
      {
        id: 'bg-boss-01',
        name: 'Queen Event Arena',
        type: 'Boss',
        coordinates: [45, 45],
        description: 'The hardest PvE encounter in the game. Queen ARC boss with legendary reward pool.',
        items: ['Equalizer Blueprint', 'Legendary Weapon Cases', 'ARC Queen Trophy'],
      },
    ],
  },

  // ======================== STELLA MONTIS ========================
  {
    id: 'stella-montis',
    name: 'Stella Montis',
    subtitle: 'Northern Research Facility',
    description: 'Indoor research facility carved into snow-covered mountains. Released Nov 2025 in the Northline update. No First Wave Caches.',
    imageUrl: '/maps/stella_montis.png',
    accentColor: '#a855f7', // purple
    markers: [
      {
        id: 'sm-ext-01',
        name: 'Helipad Extraction',
        type: 'Extraction',
        coordinates: [85, 55],
        description: 'Rooftop helipad extraction. Open to weather but fast pickup.',
      },
      {
        id: 'sm-ext-02',
        name: 'Emergency Exit Extraction',
        type: 'Extraction',
        coordinates: [10, 45],
        description: 'Emergency tunnel leading outside. Good for stealth extractions.',
      },
      {
        id: 'sm-loot-01',
        name: 'Assembly Rocket Thrusters',
        type: 'Loot',
        coordinates: [60, 30],
        description: 'Great solo loot location. Multiple weapon crates and tech components.',
        items: ['Weapon Cases', 'Rocket Components', 'Electronic Parts'],
      },
      {
        id: 'sm-loot-02',
        name: 'Medical Research Wing',
        type: 'Loot',
        coordinates: [45, 70],
        description: 'Primary source for medical items. Multiple rooms with supply cabinets.',
        items: ['Stim-Shots', 'Antiseptics', 'Medical Bags', 'Rusted Tools'],
      },
      {
        id: 'sm-schem-01',
        name: 'Container Loading Bay — Hidden Stash',
        type: 'Schematic',
        coordinates: [35, 45],
        description: 'Hidden stash inside the container bay with extremely high blueprint drop rate, including the Deadline blueprint.',
        items: ['Deadline Blueprint', 'Vulcano Blueprint', 'Rare Weapon Schematics'],
      },
      {
        id: 'sm-schem-02',
        name: 'Director\'s Office',
        type: 'Schematic',
        coordinates: [70, 75],
        description: 'Locked office requiring a keycard. Contains multiple blueprint spawns.',
        items: ['Bobcat Blueprint', 'Renegade Blueprint', 'Armor Mod Schematics'],
      },
      {
        id: 'sm-loot-03',
        name: 'Cryo Storage',
        type: 'Loot',
        coordinates: [55, 55],
        description: 'Cold storage area with scattered loot. Watch for ARC patrols.',
        items: ['Crafting Materials', 'Power Cables', 'ARC Powercells'],
      },
      {
        id: 'sm-danger-01',
        name: 'Reactor Core — Radiation Zone',
        type: 'Danger',
        coordinates: [25, 25],
        description: 'Active reactor area with high radiation. Enter only with proper shielding.',
      },
      {
        id: 'sm-boss-01',
        name: 'Central Command — ARC Guardian',
        type: 'Boss',
        coordinates: [40, 50],
        description: 'Heavy ARC Guardian defends the central command hub. Elite encounter with legendary drops.',
        items: ['Legendary Weapon Cases', 'Guardian Core', 'Rare Schematics'],
      },
      {
        id: 'sm-loot-04',
        name: 'Workshop Upgrade Materials',
        type: 'Loot',
        coordinates: [75, 40],
        description: 'Guaranteed spawn spot for workshop upgrade materials.',
        items: ['Rusted Tools', 'Motors', 'Power Cables', 'Gears'],
      },
    ],
  },
];
