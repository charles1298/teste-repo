export interface Banner {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate?: string;
  imageUrl: string;
  featured: string[];
  isNew?: boolean;
  metaRel?: string;
}

export const BANNERS: Banner[] = [
  {
    "id": "b001",
    "title": "Character banner featuring: TM Opera O",
    "type": "Character Banner",
    "startDate": "Jun 27, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30004.png",
    "featured": ["TM Opera O"]
  },
  {
    "id": "b002",
    "title": "Support banner featuring: Oguri Cap, Sweep Tosho",
    "type": "Support Card Banner",
    "startDate": "Jun 27, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30005.png",
    "featured": ["Oguri Cap", "Sweep Tosho"]
  },
  {
    "id": "b003",
    "title": "Story Event: Chase Your Dreams!",
    "type": "Story Event",
    "startDate": "Jun 27, 2025",
    "imageUrl": "https://uma.moe/assets/images/story/03_chase_your_dreams_banner.png",
    "featured": []
  },
  {
    "id": "b004",
    "title": "Character banner featuring: Mihono Bourbon",
    "type": "Character Banner",
    "startDate": "Jul 2, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30006.png",
    "featured": ["Mihono Bourbon"]
  },
  {
    "id": "b005",
    "title": "Support banner featuring: Twin Turbo, Daitaku Helios",
    "type": "Support Card Banner",
    "startDate": "Jul 2, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30007.png",
    "featured": ["Twin Turbo", "Daitaku Helios"]
  },
  {
    "id": "b006",
    "title": "Character banner featuring: Curren Chan",
    "type": "Character Banner",
    "startDate": "Jul 27, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30008.png",
    "featured": ["Curren Chan"]
  },
  {
    "id": "b007",
    "title": "Support banner featuring: Yukino Bijin, Nishino Flower",
    "type": "Support Card Banner",
    "startDate": "Jul 27, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30009.png",
    "featured": ["Yukino Bijin", "Nishino Flower"]
  },
  {
    "id": "b008",
    "title": "Character banner featuring: Narita Taishin",
    "type": "Character Banner",
    "startDate": "Aug 3, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30010.png",
    "featured": ["Narita Taishin"]
  },
  {
    "id": "b009",
    "title": "Support banner featuring: Yaeno Muteki, Zenno Rob Roy",
    "type": "Support Card Banner",
    "startDate": "Aug 3, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30011.png",
    "featured": ["Yaeno Muteki", "Zenno Rob Roy"]
  },
  {
    "id": "b010",
    "title": "Character banner featuring: Air Groove, Mayano Top Gun",
    "type": "Character Banner",
    "startDate": "Aug 28, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30022.png",
    "featured": ["Air Groove", "Mayano Top Gun"]
  },
  {
    "id": "b011",
    "title": "Support banner featuring: Kawakami Princess, Hishi Akebono",
    "type": "Support Card Banner",
    "startDate": "Aug 28, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30023.png",
    "featured": ["Kawakami Princess", "Hishi Akebono"]
  },
  {
    "id": "b012",
    "title": "Story Event: Blooming Maiden's June Pride",
    "type": "Story Event",
    "startDate": "Aug 28, 2025",
    "imageUrl": "https://uma.moe/assets/images/story/05_blooming_maidens_june_pride_banner.png",
    "featured": []
  },
  {
    "id": "b013",
    "title": "Character banner featuring: Seiun Sky",
    "type": "Character Banner",
    "startDate": "Sep 7, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30024.png",
    "featured": ["Seiun Sky"]
  },
  {
    "id": "b014",
    "title": "Support banner featuring: Silence Suzuka, Tamamo Cross",
    "type": "Support Card Banner",
    "startDate": "Sep 7, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30025.png",
    "featured": ["Silence Suzuka", "Tamamo Cross"]
  },
  {
    "id": "b015",
    "title": "Character banner featuring: Hishi Amazon",
    "type": "Character Banner",
    "startDate": "Sep 17, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30026.png",
    "featured": ["Hishi Amazon"]
  },
  {
    "id": "b016",
    "title": "Support banner featuring: Bamboo Memory, Shinko Windy",
    "type": "Support Card Banner",
    "startDate": "Sep 17, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30027.png",
    "featured": ["Bamboo Memory", "Shinko Windy"]
  },
  {
    "id": "b017",
    "title": "Character banner featuring: Grass Wonder, El Condor Pasa",
    "type": "Character Banner",
    "startDate": "Sep 21, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30028.png",
    "featured": ["Grass Wonder", "El Condor Pasa"]
  },
  {
    "id": "b018",
    "title": "Support banner featuring: Seiun Sky, King Halo",
    "type": "Support Card Banner",
    "startDate": "Sep 21, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30029.png",
    "featured": ["Seiun Sky", "King Halo"]
  },
  {
    "id": "b019",
    "title": "Story Event: Fantasy World Uma Nest",
    "type": "Story Event",
    "startDate": "Sep 21, 2025",
    "imageUrl": "https://uma.moe/assets/images/story/06_fantasy_world_uma_nest_banner.png",
    "featured": []
  },
  {
    "id": "b020",
    "title": "Character banner featuring: Fuji Kiseki",
    "type": "Character Banner",
    "startDate": "Oct 2, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30030.png",
    "featured": ["Fuji Kiseki"]
  },
  {
    "id": "b021",
    "title": "Support banner featuring: Mejiro Ryan, Mejiro Ardan",
    "type": "Support Card Banner",
    "startDate": "Oct 2, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30031.png",
    "featured": ["Mejiro Ryan", "Mejiro Ardan"]
  },
  {
    "id": "b022",
    "title": "Character banner featuring: Gold City",
    "type": "Character Banner",
    "startDate": "Oct 7, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30032.png",
    "featured": ["Gold City"]
  },
  {
    "id": "b023",
    "title": "Support banner featuring: Vodka, Nishino Flower, Narita Brian",
    "type": "Support Card Banner",
    "startDate": "Oct 7, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30033.png",
    "featured": ["Vodka", "Nishino Flower", "Narita Brian"]
  },
  {
    "id": "b024",
    "title": "Character banner featuring: Special Week, Maruzensky",
    "type": "Character Banner",
    "startDate": "Oct 14, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30034.png",
    "featured": ["Special Week", "Maruzensky"]
  },
  {
    "id": "b025",
    "title": "Support banner featuring: Sweep Tosho, Winning Ticket",
    "type": "Support Card Banner",
    "startDate": "Oct 14, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30035.png",
    "featured": ["Sweep Tosho", "Winning Ticket"]
  },
  {
    "id": "b026",
    "title": "Story Event: Uma Musume Summer Story",
    "type": "Story Event",
    "startDate": "Oct 14, 2025",
    "imageUrl": "https://uma.moe/assets/images/story/07_uma_musume_summer_story_banner.png",
    "featured": []
  },
  {
    "id": "b027",
    "title": "Character banner featuring: Meisho Doto",
    "type": "Character Banner",
    "startDate": "Oct 21, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30036.png",
    "featured": ["Meisho Doto"]
  },
  {
    "id": "b028",
    "title": "Support banner featuring: Special Week, Tokai Teio",
    "type": "Support Card Banner",
    "startDate": "Oct 21, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30037.png",
    "featured": ["Special Week", "Tokai Teio"]
  },
  {
    "id": "b029",
    "title": "Character banner featuring: Eishin Flash",
    "type": "Character Banner",
    "startDate": "Oct 30, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30038.png",
    "featured": ["Eishin Flash"]
  },
  {
    "id": "b030",
    "title": "Support banner featuring: Nice Nature, Tosen Jordan",
    "type": "Support Card Banner",
    "startDate": "Oct 30, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30039.png",
    "featured": ["Nice Nature", "Tosen Jordan"]
  },
  {
    "id": "b031",
    "title": "Character banner featuring: Matikanefukukitaru",
    "type": "Character Banner",
    "startDate": "Nov 6, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30040.png",
    "featured": ["Matikanefukukitaru"]
  },
  {
    "id": "b032",
    "title": "Support banner featuring: Rice Shower, Riko Kashimoto",
    "type": "Support Card Banner",
    "startDate": "Nov 6, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30041.png",
    "featured": ["Rice Shower", "Riko Kashimoto"]
  },
  {
    "id": "b033",
    "title": "Character banner featuring: Hishi Akebono",
    "type": "Character Banner",
    "startDate": "Nov 11, 2025",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2021_30042.png",
    "featured": ["Hishi Akebono"]
  },
  {
    "id": "b034",
    "title": "Support banner featuring: Sakura Bakushin O, Biko Pegasus",
    "type": "Support Card Banner",
    "startDate": "Nov 11, 2025",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2021_30043.png",
    "featured": ["Sakura Bakushin O", "Biko Pegasus"]
  },
  {
    "id": "b035",
    "title": "Character banner featuring: Sakura Chiyono O",
    "type": "Character Banner",
    "startDate": "Feb 11, 2026",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2022_30076.png",
    "featured": ["Sakura Chiyono O"]
  },
  {
    "id": "b036",
    "title": "Support banner featuring: Tazuna Hayakawa, Riko Kashimoto",
    "type": "Support Card Banner",
    "startDate": "Feb 11, 2026",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2022_30077.png",
    "featured": ["Tazuna Hayakawa", "Riko Kashimoto"]
  },
  {
    "id": "b037",
    "title": "Character banner featuring: Mihono Bourbon, Eishin Flash",
    "type": "Character Banner",
    "startDate": "Feb 18, 2026",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2022_30078.png",
    "featured": ["Mihono Bourbon", "Eishin Flash"]
  },
  {
    "id": "b038",
    "title": "Support banner featuring: Nishino Flower, Sakura Bakushin O",
    "type": "Support Card Banner",
    "startDate": "Feb 18, 2026",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2022_30079.png",
    "featured": ["Nishino Flower", "Sakura Bakushin O"]
  },
  {
    "id": "b039",
    "title": "Character banner featuring: Kitasan Black, Matikanetannhauser",
    "type": "Character Banner",
    "startDate": "Mar 12, 2026",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2022_30082.png",
    "featured": ["Kitasan Black", "Matikanetannhauser"]
  },
  {
    "id": "b040",
    "title": "Support banner featuring: Narita Top Road, Mejiro Ryan, Admire Vega, Sakura Bakushin O, Mejiro Bright",
    "type": "Support Card Banner",
    "startDate": "Mar 12, 2026",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2022_30083.png",
    "featured": ["Narita Top Road", "Mejiro Ryan", "Admire Vega", "Sakura Bakushin O", "Mejiro Bright"]
  },
  {
    "id": "b041",
    "title": "Story Event: Flapping Run-up!",
    "type": "Story Event",
    "startDate": "Mar 12, 2026",
    "imageUrl": "https://uma.moe/assets/images/story/02_flapping_run_up_banner.png",
    "featured": []
  },
  {
    "id": "b042",
    "title": "Character banner featuring: Satono Diamond",
    "type": "Character Banner",
    "startDate": "Mar 22, 2026",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2022_30084.png",
    "featured": ["Satono Diamond"]
  },
  {
    "id": "b043",
    "title": "Support banner featuring: Marvelous Sunday, Curren Chan",
    "type": "Support Card Banner",
    "startDate": "Mar 22, 2026",
    "imageUrl": "https://uma.moe/assets/images/support/banner/2022_30085.png",
    "featured": ["Marvelous Sunday", "Curren Chan"]
  },
  {
    "id": "b044",
    "title": "Paid banner: 1st Anniversary Lucky Bag (Character)",
    "type": "Paid Banner",
    "startDate": "Mar 23, 2026",
    "imageUrl": "https://uma.moe/assets/images/paid/banner/50192.png",
    "featured": ["Special Week", "Silence Suzuka", "Tokai Teio", "Maruzensky"]
  },
  {
    "id": "b045",
    "title": "Paid banner: 1st Anniversary Lucky Bag (Support)",
    "type": "Paid Banner",
    "startDate": "Mar 23, 2026",
    "imageUrl": "https://uma.moe/assets/images/paid/banner/50193.png",
    "featured": ["Kitasan Black", "Satono Diamond"]
  },
  {
    "id": "b046",
    "title": "Character banner featuring: Mejiro Bright",
    "type": "Character Banner",
    "startDate": "Mar 26, 2026",
    "imageUrl": "https://uma.moe/assets/images/character/banner/2022_30086.png",
    "featured": ["Mejiro Bright"]
  }
].sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
