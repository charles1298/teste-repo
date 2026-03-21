export type Rarity = 'SSR' | 'SR' | 'R';
export type CardType = 'Speed' | 'Stamina' | 'Power' | 'Guts' | 'Intelligence' | 'Friend/Group' | 'Group' | 'Unknown';

export interface SupportCard {
  id: string;
  name: string;
  rarity: Rarity;
  type: CardType;
  typeIconUrl: string;
  imageUrl: string;
  hasUniqueSkill?: boolean;
  isEconomic?: boolean;
}

export const SUPPORT_CARDS: SupportCard[] = [
  {
    "id": "uma-30088",
    "name": "Satono Diamond",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30088.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30087",
    "name": "Mejiro Bright",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30087.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30086",
    "name": "Narita Top Road",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30086.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30085",
    "name": "Agnes Digital",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30085.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30084",
    "name": "Tosen Jordan",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30084.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30083",
    "name": "Sakura Bakushin O",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30083.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30082",
    "name": "Nishino Flower",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30082.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30080",
    "name": "Sasami Anshinzawa",
    "rarity": "SSR",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-30080.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30079",
    "name": "Meisho Doto",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30079.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30078",
    "name": "Matikanefukukitaru",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30078.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30077",
    "name": "Admire Vega",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30077.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30076",
    "name": "Silence Suzuka",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30076.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30075",
    "name": "Manhattan Cafe",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30075.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30074",
    "name": "Marvelous Sunday",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30074.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30073",
    "name": "Narita Taishin",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30073.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30072",
    "name": "Mayano Top Gun",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30072.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30071",
    "name": "Daitaku Helios",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30071.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30070",
    "name": "Yukino Bijin",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30070.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30069",
    "name": "Narita Brian",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30069.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30068",
    "name": "Curren Chan",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30068.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30066",
    "name": "Mihono Bourbon",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30066.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30065",
    "name": "Zenno Rob Roy",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30065.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30064",
    "name": "Tamamo Cross",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30064.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30063",
    "name": "Ikuno Dictus",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30063.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30062",
    "name": "Silence Suzuka",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30062.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30061",
    "name": "Biwa Hayahide",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30061.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30060",
    "name": "Twin Turbo",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30060.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30059",
    "name": "Mihono Bourbon",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30059.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30058",
    "name": "Tokai Teio",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30058.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30057",
    "name": "Gold Ship",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30057.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30056",
    "name": "King Halo",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30056.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30055",
    "name": "Seiun Sky",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30055.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30054",
    "name": "Nice Nature",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30054.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30048",
    "name": "Mejiro Ryan",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30048.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30047",
    "name": "Daiwa Scarlet",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30047.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30046",
    "name": "Winning Ticket",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30046.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30045",
    "name": "Sweep Tosho",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30045.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30044",
    "name": "Narita Brian",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30044.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30043",
    "name": "Nakayama Festa",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30043.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30042",
    "name": "Bamboo Memory",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30042.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30041",
    "name": "Mejiro Dober",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30041.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30040",
    "name": "Hishi Akebono",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30040.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30039",
    "name": "Kawakami Princess",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30039.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30038",
    "name": "Sakura Chiyono O",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30038.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30036",
    "name": "Riko Kashimoto",
    "rarity": "SSR",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-30036.png?v=3",
    "hasUniqueSkill": true,
    "isEconomic": true
  },
  {
    "id": "uma-30034",
    "name": "Rice Shower",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30034.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30033",
    "name": "Winning Ticket",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30033.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30032",
    "name": "Yaeno Muteki",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30032.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30031",
    "name": "Yukino Bijin",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30031.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30030",
    "name": "Matikanetannhauser",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30030.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30029",
    "name": "Satono Diamond",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30029.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30028",
    "name": "Kitasan Black",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30028.png?v=3",
    "hasUniqueSkill": true,
    "isEconomic": true
  },
  {
    "id": "uma-30027",
    "name": "Mejiro Palmer",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30027.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30026",
    "name": "Twin Turbo",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30026.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30025",
    "name": "Special Week",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30025.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30024",
    "name": "Oguri Cap",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30024.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30023",
    "name": "Rice Shower",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30023.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30022",
    "name": "Mejiro McQueen",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30022.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30021",
    "name": "Tazuna Hayakawa",
    "rarity": "SSR",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-30021.png?v=3",
    "hasUniqueSkill": true,
    "isEconomic": true
  },
  {
    "id": "uma-30020",
    "name": "Biko Pegasus",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30020.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30019",
    "name": "Haru Urara",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30019.png?v=3",
    "hasUniqueSkill": true,
    "isEconomic": true
  },
  {
    "id": "uma-30018",
    "name": "Nishino Flower",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30018.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30017",
    "name": "Smart Falcon",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30017.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30016",
    "name": "Super Creek",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30016.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30015",
    "name": "Sakura Bakushin O",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30015.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30014",
    "name": "Gold City",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30014.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30013",
    "name": "Air Shakur",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30013.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30012",
    "name": "Winning Ticket",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30012.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30011",
    "name": "Ines Fujin",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30011.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30010",
    "name": "Fine Motion",
    "rarity": "SSR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-30010.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30009",
    "name": "Tamamo Cross",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30009.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30008",
    "name": "Seiun Sky",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30008.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30007",
    "name": "El Condor Pasa",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30007.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30006",
    "name": "Grass Wonder",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30006.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30005",
    "name": "Vodka",
    "rarity": "SSR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-30005.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30004",
    "name": "Gold Ship",
    "rarity": "SSR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-30004.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30003",
    "name": "Tokai Teio",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30003.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30002",
    "name": "Silence Suzuka",
    "rarity": "SSR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-30002.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-30001",
    "name": "Special Week",
    "rarity": "SSR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-30001.png?v=3",
    "hasUniqueSkill": true
  },
  {
    "id": "uma-20043",
    "name": "Special Week",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20043.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20042",
    "name": "Sakura Bakushin O",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20042.png?v=3"
  },
  {
    "id": "uma-20041",
    "name": "Admire Vega",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20041.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20040",
    "name": "Mejiro Ryan",
    "rarity": "SR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-20040.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20039",
    "name": "Vodka",
    "rarity": "SR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-20039.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20038",
    "name": "Sirius Symboli",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20038.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20037",
    "name": "Fine Motion",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20037.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20035",
    "name": "Tosen Jordan",
    "rarity": "SR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-20035.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20034",
    "name": "Mejiro Ardan",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20034.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20032",
    "name": "Inari One",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20032.png?v=3"
  },
  {
    "id": "uma-20031",
    "name": "Shinko Windy",
    "rarity": "SR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-20031.png?v=3"
  },
  {
    "id": "uma-20030",
    "name": "Ines Fujin",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20030.png?v=3"
  },
  {
    "id": "uma-20029",
    "name": "Seeking the Pearl",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20029.png?v=3"
  },
  {
    "id": "uma-20028",
    "name": "Zenno Rob Roy",
    "rarity": "SR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-20028.png?v=3"
  },
  {
    "id": "uma-20027",
    "name": "Nishino Flower",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20027.png?v=3"
  },
  {
    "id": "uma-20026",
    "name": "Nice Nature",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20026.png?v=3"
  },
  {
    "id": "uma-20025",
    "name": "Ikuno Dictus",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20025.png?v=3"
  },
  {
    "id": "uma-20024",
    "name": "Daitaku Helios",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20024.png?v=3"
  },
  {
    "id": "uma-20023",
    "name": "Sweep Tosho",
    "rarity": "SR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-20023.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20022",
    "name": "Tamamo Cross",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20022.png?v=3"
  },
  {
    "id": "uma-20021",
    "name": "Aoi Kiryuin",
    "rarity": "SR",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-20021.png?v=3"
  },
  {
    "id": "uma-20020",
    "name": "King Halo",
    "rarity": "SR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-20020.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20019",
    "name": "Nice Nature",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20019.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20018",
    "name": "Mejiro Dober",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20018.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20017",
    "name": "Meisho Doto",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20017.png?v=3"
  },
  {
    "id": "uma-20016",
    "name": "Matikanefukukitaru",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20016.png?v=3"
  },
  {
    "id": "uma-20015",
    "name": "Marvelous Sunday",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20015.png?v=3"
  },
  {
    "id": "uma-20014",
    "name": "Narita Taishin",
    "rarity": "SR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-20014.png?v=3"
  },
  {
    "id": "uma-20013",
    "name": "Eishin Flash",
    "rarity": "SR",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-20013.png?v=3"
  },
  {
    "id": "uma-20012",
    "name": "Agnes Tachyon",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20012.png?v=3"
  },
  {
    "id": "uma-20011",
    "name": "Yukino Bijin",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20011.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20010",
    "name": "Mejiro Ryan",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20010.png?v=3"
  },
  {
    "id": "uma-20009",
    "name": "Mihono Bourbon",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20009.png?v=3"
  },
  {
    "id": "uma-20008",
    "name": "Manhattan Cafe",
    "rarity": "SR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-20008.png?v=3"
  },
  {
    "id": "uma-20007",
    "name": "Mayano Top Gun",
    "rarity": "SR",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-20007.png?v=3"
  },
  {
    "id": "uma-20006",
    "name": "Biwa Hayahide",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20006.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20005",
    "name": "Agnes Digital",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20005.png?v=3"
  },
  {
    "id": "uma-20004",
    "name": "Air Groove",
    "rarity": "SR",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-20004.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20003",
    "name": "Hishi Amazon",
    "rarity": "SR",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-20003.png?v=3"
  },
  {
    "id": "uma-20002",
    "name": "Daiwa Scarlet",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20002.png?v=3",
    "isEconomic": true
  },
  {
    "id": "uma-20001",
    "name": "Fuji Kiseki",
    "rarity": "SR",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-20001.png?v=3"
  },
  {
    "id": "uma-10077",
    "name": "Narita Top Road",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10077.png?v=3"
  },
  {
    "id": "uma-10076",
    "name": "Mejiro Bright",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10076.png?v=3"
  },
  {
    "id": "uma-10075",
    "name": "Admire Vega",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10075.png?v=3"
  },
  {
    "id": "uma-10074",
    "name": "Sasami Anshinzawa",
    "rarity": "R",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-10074.png?v=3"
  },
  {
    "id": "uma-10073",
    "name": "Curren Chan",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10073.png?v=3"
  },
  {
    "id": "uma-10072",
    "name": "Narita Brian",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10072.png?v=3"
  },
  {
    "id": "uma-10071",
    "name": "Sirius Symboli",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10071.png?v=3"
  },
  {
    "id": "uma-10070",
    "name": "Tosen Jordan",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10070.png?v=3"
  },
  {
    "id": "uma-10069",
    "name": "Mejiro Ardan",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10069.png?v=3"
  },
  {
    "id": "uma-10068",
    "name": "Inari One",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10068.png?v=3"
  },
  {
    "id": "uma-10067",
    "name": "Nakayama Festa",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10067.png?v=3"
  },
  {
    "id": "uma-10066",
    "name": "Shinko Windy",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10066.png?v=3"
  },
  {
    "id": "uma-10065",
    "name": "Bamboo Memory",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10065.png?v=3"
  },
  {
    "id": "uma-10064",
    "name": "Hishi Akebono",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10064.png?v=3"
  },
  {
    "id": "uma-10063",
    "name": "Kawakami Princess",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10063.png?v=3"
  },
  {
    "id": "uma-10062",
    "name": "Sakura Chiyono O",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10062.png?v=3"
  },
  {
    "id": "uma-10061",
    "name": "Seeking the Pearl",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10061.png?v=3"
  },
  {
    "id": "uma-10060",
    "name": "Riko Kashimoto",
    "rarity": "R",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-10060.png?v=3"
  },
  {
    "id": "uma-10059",
    "name": "Zenno Rob Roy",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10059.png?v=3"
  },
  {
    "id": "uma-10058",
    "name": "Yaeno Muteki",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10058.png?v=3"
  },
  {
    "id": "uma-10057",
    "name": "Matikanetannhauser",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10057.png?v=3"
  },
  {
    "id": "uma-10056",
    "name": "Satono Diamond",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10056.png?v=3"
  },
  {
    "id": "uma-10055",
    "name": "Kitasan Black",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10055.png?v=3"
  },
  {
    "id": "uma-10054",
    "name": "Mejiro Palmer",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10054.png?v=3"
  },
  {
    "id": "uma-10053",
    "name": "Ikuno Dictus",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10053.png?v=3"
  },
  {
    "id": "uma-10052",
    "name": "Daitaku Helios",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10052.png?v=3"
  },
  {
    "id": "uma-10051",
    "name": "Twin Turbo",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10051.png?v=3"
  },
  {
    "id": "uma-10050",
    "name": "Sweep Tosho",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10050.png?v=3"
  },
  {
    "id": "uma-10049",
    "name": "Fuji Kiseki",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10049.png?v=3"
  },
  {
    "id": "uma-10048",
    "name": "King Halo",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10048.png?v=3"
  },
  {
    "id": "uma-10047",
    "name": "Nice Nature",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10047.png?v=3"
  },
  {
    "id": "uma-10046",
    "name": "Mejiro Dober",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10046.png?v=3"
  },
  {
    "id": "uma-10045",
    "name": "Meisho Doto",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10045.png?v=3"
  },
  {
    "id": "uma-10044",
    "name": "Matikanefukukitaru",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10044.png?v=3"
  },
  {
    "id": "uma-10043",
    "name": "Marvelous Sunday",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10043.png?v=3"
  },
  {
    "id": "uma-10042",
    "name": "Biko Pegasus",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10042.png?v=3"
  },
  {
    "id": "uma-10041",
    "name": "Nishino Flower",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10041.png?v=3"
  },
  {
    "id": "uma-10040",
    "name": "Narita Taishin",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10040.png?v=3"
  },
  {
    "id": "uma-10039",
    "name": "Smart Falcon",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10039.png?v=3"
  },
  {
    "id": "uma-10038",
    "name": "Eishin Flash",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10038.png?v=3"
  },
  {
    "id": "uma-10037",
    "name": "Air Shakur",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10037.png?v=3"
  },
  {
    "id": "uma-10036",
    "name": "Agnes Tachyon",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10036.png?v=3"
  },
  {
    "id": "uma-10035",
    "name": "Ines Fujin",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10035.png?v=3"
  },
  {
    "id": "uma-10034",
    "name": "Yukino Bijin",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10034.png?v=3"
  },
  {
    "id": "uma-10033",
    "name": "Mejiro Ryan",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10033.png?v=3"
  },
  {
    "id": "uma-10032",
    "name": "Mihono Bourbon",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10032.png?v=3"
  },
  {
    "id": "uma-10031",
    "name": "Manhattan Cafe",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10031.png?v=3"
  },
  {
    "id": "uma-10030",
    "name": "Mayano Top Gun",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10030.png?v=3"
  },
  {
    "id": "uma-10029",
    "name": "Biwa Hayahide",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10029.png?v=3"
  },
  {
    "id": "uma-10028",
    "name": "Fine Motion",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10028.png?v=3"
  },
  {
    "id": "uma-10027",
    "name": "Tamamo Cross",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10027.png?v=3"
  },
  {
    "id": "uma-10026",
    "name": "Agnes Digital",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10026.png?v=3"
  },
  {
    "id": "uma-10025",
    "name": "Air Groove",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10025.png?v=3"
  },
  {
    "id": "uma-10024",
    "name": "Hishi Amazon",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10024.png?v=3"
  },
  {
    "id": "uma-10023",
    "name": "Daiwa Scarlet",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10023.png?v=3"
  },
  {
    "id": "uma-10022",
    "name": "Aoi Kiryuin",
    "rarity": "R",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-10022.png?v=3"
  },
  {
    "id": "uma-10021",
    "name": "Tazuna Hayakawa",
    "rarity": "R",
    "type": "Unknown",
    "typeIconUrl": "/assets/icons/icon-type-5.png",
    "imageUrl": "/assets/cards/uma-10021.png?v=3"
  },
  {
    "id": "uma-10020",
    "name": "Haru Urara",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10020.png?v=3"
  },
  {
    "id": "uma-10019",
    "name": "Super Creek",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10019.png?v=3"
  },
  {
    "id": "uma-10018",
    "name": "Sakura Bakushin O",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10018.png?v=3"
  },
  {
    "id": "uma-10017",
    "name": "Gold City",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10017.png?v=3"
  },
  {
    "id": "uma-10016",
    "name": "Winning Ticket",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10016.png?v=3"
  },
  {
    "id": "uma-10015",
    "name": "Rice Shower",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10015.png?v=3"
  },
  {
    "id": "uma-10014",
    "name": "Seiun Sky",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10014.png?v=3"
  },
  {
    "id": "uma-10013",
    "name": "Symboli Rudolf",
    "rarity": "R",
    "type": "Intelligence",
    "typeIconUrl": "/assets/icons/icon-type-4.png",
    "imageUrl": "/assets/cards/uma-10013.png?v=3"
  },
  {
    "id": "uma-10012",
    "name": "T.M. Opera O",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10012.png?v=3"
  },
  {
    "id": "uma-10011",
    "name": "El Condor Pasa",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10011.png?v=3"
  },
  {
    "id": "uma-10010",
    "name": "Mejiro McQueen",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10010.png?v=3"
  },
  {
    "id": "uma-10009",
    "name": "Grass Wonder",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10009.png?v=3"
  },
  {
    "id": "uma-10008",
    "name": "Taiki Shuttle",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10008.png?v=3"
  },
  {
    "id": "uma-10007",
    "name": "Vodka",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10007.png?v=3"
  },
  {
    "id": "uma-10006",
    "name": "Gold Ship",
    "rarity": "R",
    "type": "Stamina",
    "typeIconUrl": "/assets/icons/icon-type-1.png",
    "imageUrl": "/assets/cards/uma-10006.png?v=3"
  },
  {
    "id": "uma-10005",
    "name": "Oguri Cap",
    "rarity": "R",
    "type": "Power",
    "typeIconUrl": "/assets/icons/icon-type-2.png",
    "imageUrl": "/assets/cards/uma-10005.png?v=3"
  },
  {
    "id": "uma-10004",
    "name": "Maruzensky",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10004.png?v=3"
  },
  {
    "id": "uma-10003",
    "name": "Tokai Teio",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10003.png?v=3"
  },
  {
    "id": "uma-10002",
    "name": "Silence Suzuka",
    "rarity": "R",
    "type": "Speed",
    "typeIconUrl": "/assets/icons/icon-type-0.png",
    "imageUrl": "/assets/cards/uma-10002.png?v=3"
  },
  {
    "id": "uma-10001",
    "name": "Special Week",
    "rarity": "R",
    "type": "Guts",
    "typeIconUrl": "/assets/icons/icon-type-3.png",
    "imageUrl": "/assets/cards/uma-10001.png?v=3"
  }
];
