export interface Channel {
  id: string;
  shortName: string;
  fullName: string;
  tagline: string;
  established: string;
  category: string;
  country: string;
  heroImage: string;
  description: string;
  sports: string[];
  watchUrl: string;
  regions: Array<{ country: string; note: string }>;
  schedule: Array<{ time: string; category: string; title: string; highlight?: boolean }>;
  affiliates: Array<{ id: string; name: string; subtitle: string }>;
}

export const CHANNELS: Record<string, Channel> = {
  "star-sports-1": {
    id: "star-sports-1",
    shortName: "SS1",
    fullName: "Star Sports 1 Hindi",
    tagline: "India's Premier Cricket Broadcaster",
    established: "Est. 1991",
    category: "Cricket Hub",
    country: "India",
    heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
    description:
      "Star Sports 1 Hindi is India's most-watched sports channel, delivering live IPL coverage, international cricket, and exclusive behind-the-scenes content to over 800 million viewers across South Asia.",
    sports: ["IPL", "ODI", "T20I", "Test", "BCCI"],
    watchUrl: "https://www.hotstar.com/in/sports",
    regions: [
      { country: "India", note: "Primary Broadcaster" },
      { country: "Sri Lanka", note: "Cable Rebroadcast" },
      { country: "Bangladesh", note: "OTT via Hotstar" },
      { country: "Nepal", note: "Satellite Distribution" },
    ],
    schedule: [
      { time: "7:00 PM", category: "IPL 2024", title: "Mumbai Indians vs CSK — LIVE", highlight: true },
      { time: "10:30 PM", category: "Cricket Analysis", title: "Game Plan with Harsha Bhogle" },
      { time: "12:00 AM", category: "Highlights", title: "Match Replay: RCB vs KKR" },
      { time: "6:00 AM", category: "Women's Cricket", title: "India Women's T20 Series" },
    ],
    affiliates: [
      { id: "star-sports-2", name: "Star Sports 2", subtitle: "English Commentary Feed" },
      { id: "jiocinema", name: "JioCinema 4K", subtitle: "Digital Streaming Partner" },
      { id: "hotstar", name: "Disney+ Hotstar", subtitle: "OTT Streaming Platform" },
      { id: "star-sports-select", name: "Star Sports Select", subtitle: "Premium HD Tier" },
      { id: "willow-tv", name: "Willow TV", subtitle: "North America Distribution" },
    ],
  },
  "jiocinema": {
    id: "jiocinema",
    shortName: "JIO",
    fullName: "JioCinema 4K",
    tagline: "India's Largest Free Streaming Platform",
    established: "Est. 2016",
    category: "OTT Giant",
    country: "India",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
    description:
      "JioCinema redefined sports streaming in India by making IPL available for free to 400 million+ users. With 4K streaming capabilities and multi-cam options, it is the most technologically advanced sports platform in Asia.",
    sports: ["IPL", "Premier League", "NBA", "WWE", "F1"],
    watchUrl: "https://www.jiocinema.com/sports",
    regions: [
      { country: "India", note: "Primary Streaming" },
      { country: "United Arab Emirates", note: "Jio International" },
      { country: "United Kingdom", note: "JioTV UK" },
      { country: "United States", note: "JioTV App" },
    ],
    schedule: [
      { time: "7:30 PM", category: "T20 World Cup", title: "India vs Australia — 4K LIVE", highlight: true },
      { time: "11:00 PM", category: "Premier League", title: "Manchester City vs Arsenal" },
      { time: "2:00 AM", category: "NBA", title: "Lakers vs Knicks — Highlights" },
      { time: "8:00 AM", category: "Cricket", title: "Morning Warm-Up Shows" },
    ],
    affiliates: [
      { id: "star-sports-1", name: "Star Sports 1", subtitle: "Broadcast Partner" },
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "Australia Content" },
      { id: "sky-sport-nz", name: "Sky Sport NZ", subtitle: "NZ Content Partner" },
      { id: "willow-tv", name: "Willow TV", subtitle: "North America" },
      { id: "bein-sports", name: "beIN Sports", subtitle: "MENA Region" },
    ],
  },
  "sony-sports": {
    id: "sony-sports",
    shortName: "SS10",
    fullName: "Sony Sports Ten 1",
    tagline: "Home of Rugby, Tennis & More",
    established: "Est. 2012",
    category: "Multi-Sport",
    country: "India",
    heroImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80",
    description:
      "Sony Sports Ten 1 is India's gateway to international sport. Broadcasting Rugby World Cup, Australian Open, UEFA Champions League, and exclusive motorsport content for over a decade of premium coverage.",
    sports: ["Rugby", "Tennis", "Motorsport", "UEFA", "WWE"],
    watchUrl: "https://www.sonyliv.com/custompage/sports-2245",
    regions: [
      { country: "India", note: "Primary Network" },
      { country: "Pakistan", note: "LivTV App" },
      { country: "Maldives", note: "Cable Distribution" },
      { country: "South Asia", note: "Regional Partner" },
    ],
    schedule: [
      { time: "6:30 PM", category: "Tennis", title: "Wimbledon: Semi Finals — LIVE", highlight: true },
      { time: "9:00 PM", category: "Rugby", title: "Six Nations: England vs France" },
      { time: "11:30 PM", category: "Champions League", title: "Real Madrid vs Bayern Preview" },
      { time: "3:00 AM", category: "Motorsport", title: "Formula E: Tokyo ePrix Highlights" },
    ],
    affiliates: [
      { id: "star-sports-1", name: "Star Sports 1", subtitle: "Cricket Co-Broadcast" },
      { id: "bein-sports", name: "beIN Sports", subtitle: "Rugby Rights Partner" },
      { id: "sky-sport-nz", name: "Sky Sport NZ", subtitle: "ANZ Content" },
      { id: "supersport", name: "Supersport", subtitle: "Africa Distribution" },
      { id: "jiocinema", name: "JioCinema", subtitle: "Digital Partner" },
    ],
  },
  "fancode": {
    id: "fancode",
    shortName: "FAN",
    fullName: "FanCode",
    tagline: "India's Premier Sports Commerce Platform",
    established: "Est. 2019",
    category: "Digital Platform",
    country: "India",
    heroImage: "https://images.unsplash.com/photo-1523831076786-57a8c462f809?auto=format&fit=crop&w=1600&q=80",
    description:
      "FanCode is revolutionizing Indian sports coverage by live-streaming domestic cricket tournaments like the Ranji Trophy, Duleep Trophy, and Syed Mushtaq Ali Trophy — events previously unavailable on mainstream television.",
    sports: ["Ranji Trophy", "Duleep Trophy", "Syed Mushtaq Ali", "Women's Domestic", "Kabaddi"],
    watchUrl: "https://fancode.com",
    regions: [
      { country: "India", note: "Exclusive Domestic Rights" },
      { country: "Global", note: "Web App Available" },
    ],
    schedule: [
      { time: "9:30 AM", category: "Ranji Trophy", title: "Mumbai vs Delhi — Day 3 LIVE", highlight: true },
      { time: "2:00 PM", category: "Women's Cricket", title: "Challenger Trophy: Red vs Blue" },
      { time: "7:00 PM", category: "Kabaddi", title: "Pro Kabaddi League: Jaipur Pink Panthers" },
      { time: "9:30 PM", category: "Analysis", title: "The Cricket Show: Domestic Roundup" },
    ],
    affiliates: [
      { id: "star-sports-1", name: "Star Sports 1", subtitle: "IPL Content Partner" },
      { id: "jiocinema", name: "JioCinema", subtitle: "T20 World Cup" },
      { id: "sony-sports", name: "Sony Sports", subtitle: "Tennis Co-Broadcast" },
      { id: "willow-tv", name: "Willow TV", subtitle: "USA Streaming" },
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "Australia Content Exchange" },
    ],
  },
  "fox-cricket": {
    id: "fox-cricket",
    shortName: "FOX",
    fullName: "Fox Cricket",
    tagline: "Australia's Home of Cricket",
    established: "Est. 2018",
    category: "Cricket Specialist",
    country: "Australia",
    heroImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80",
    description:
      "Fox Cricket is Australia's dedicated cricket channel, providing comprehensive coverage of all Australian domestic and international cricket, the Big Bash League, and global tournaments around the clock.",
    sports: ["BBL", "Test Cricket", "ODI", "Sheffield Shield", "WBBL"],
    watchUrl: "https://www.foxsports.com.au/cricket",
    regions: [
      { country: "Australia", note: "Primary Broadcast (Foxtel)" },
      { country: "New Zealand", note: "Sky Sport NZ Agreement" },
      { country: "Pacific Islands", note: "Satellite Distribution" },
    ],
    schedule: [
      { time: "2:00 PM", category: "Test Match", title: "Australia vs South Africa — Day 2", highlight: true },
      { time: "6:00 PM", category: "BBL", title: "Sydney Thunder vs Melbourne Stars" },
      { time: "9:00 PM", category: "Analysis", title: "Fox Cricket: The Debrief" },
      { time: "12:00 AM", category: "Highlights", title: "60 Over Highlights Package" },
    ],
    affiliates: [
      { id: "channel7-sport", name: "Channel 7 Sport", subtitle: "Free-to-Air Share" },
      { id: "sky-sport-nz", name: "Sky Sport NZ", subtitle: "NZ Simulcast" },
      { id: "star-sports-1", name: "Star Sports India", subtitle: "India Bilateral" },
      { id: "bein-sports", name: "beIN Sports", subtitle: "MENA Rights" },
      { id: "willow-tv", name: "Willow TV", subtitle: "North America" },
    ],
  },
  "channel7-sport": {
    id: "channel7-sport",
    shortName: "CH7",
    fullName: "Channel 7 Sport",
    tagline: "Australia's Free-To-Air Sports Leader",
    established: "Est. 1956",
    category: "Free-To-Air",
    country: "Australia",
    heroImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
    description:
      "Channel 7 Sport is Australia's most watched free-to-air sports broadcaster, home to the Olympic Games, AFL, cricket, Supercars, horse racing and iconic Australian sporting events reaching 16M+ viewers.",
    sports: ["AFL", "Cricket", "Olympics", "Supercars", "Horse Racing"],
    watchUrl: "https://7plus.com.au/sport",
    regions: [
      { country: "Australia", note: "National Free-to-Air" },
      { country: "New Zealand", note: "TVNZ Partnership" },
    ],
    schedule: [
      { time: "3:30 PM", category: "AFL", title: "Collingwood vs Richmond — LIVE", highlight: true },
      { time: "7:00 PM", category: "News", title: "Sport Tonight: Friday Edition" },
      { time: "9:30 PM", category: "Cricket", title: "Border-Gavaskar: Day 1 Highlights" },
      { time: "11:00 PM", category: "Supercars", title: "Supercars: Bathurst 1000 Qualifying" },
    ],
    affiliates: [
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "Cricket Co-Broadcast" },
      { id: "star-sports-1", name: "Star Sports India", subtitle: "Cricket Exchange" },
      { id: "sky-sport-nz", name: "Sky Sport NZ", subtitle: "Trans-Tasman Content" },
      { id: "supersport", name: "Supersport", subtitle: "Africa AFL Feed" },
    ],
  },
  "ptv-sports": {
    id: "ptv-sports",
    shortName: "PTV",
    fullName: "PTV Sports",
    tagline: "Pakistan's National Sports Broadcaster",
    established: "Est. 2012",
    category: "National Broadcaster",
    country: "Pakistan",
    heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
    description:
      "PTV Sports is Pakistan's state-run sports broadcaster providing free cricket coverage to millions of fans. Home to Pakistan Super League, Pakistan Men's and Women's cricket, and international touring coverage.",
    sports: ["PSL", "PCB", "Hockey", "Squash", "International Cricket"],
    watchUrl: "https://www.ptvsports.pk",
    regions: [
      { country: "Pakistan", note: "Free-to-Air National" },
      { country: "Afghanistan", note: "Satellite Feed" },
      { country: "Middle East", note: "Diaspora Coverage" },
    ],
    schedule: [
      { time: "6:00 PM", category: "PSL 2024", title: "Karachi Kings vs Lahore Qalandars", highlight: true },
      { time: "9:30 PM", category: "Analysis", title: "Cricket Ki Baat" },
      { time: "11:00 PM", category: "Highlights", title: "Today's PSL Match Highlights" },
      { time: "7:00 AM", category: "Hockey", title: "Asia Cup Hockey: Pakistan vs India" },
    ],
    affiliates: [
      { id: "ten-sports-pk", name: "Ten Sports PK", subtitle: "International Rights" },
      { id: "sony-sports", name: "Sony Sports", subtitle: "India Bilateral" },
      { id: "star-sports-1", name: "Star Sports 1", subtitle: "India-Pakistan Series" },
      { id: "bein-sports", name: "beIN Sports", subtitle: "MENA Distribution" },
    ],
  },
  "ten-sports-pk": {
    id: "ten-sports-pk",
    shortName: "TEN",
    fullName: "Ten Sports Pakistan",
    tagline: "Premium International Sports for Pakistan",
    established: "Est. 2000",
    category: "Premium Sports",
    country: "Pakistan",
    heroImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80",
    description:
      "Ten Sports Pakistan brings world-class international sport to Pakistani audiences including UEFA Champions League, Wimbledon, Formula 1, and WWE. A core part of the Sony Pictures Networks distribution.",
    sports: ["Football", "Tennis", "F1", "WWE", "Cricket"],
    watchUrl: "https://www.sonyliv.com/custompage/sports-2245",
    regions: [
      { country: "Pakistan", note: "Primary Market" },
      { country: "South Asia", note: "Regional Broadcast" },
    ],
    schedule: [
      { time: "1:00 AM", category: "Champions League", title: "PSG vs Real Madrid — LIVE", highlight: true },
      { time: "7:00 PM", category: "WWE", title: "SmackDown: Live & Uncut" },
      { time: "9:30 PM", category: "Football", title: "La Liga: Barcelona vs Atletico" },
      { time: "11:00 PM", category: "Motorsport", title: "F1 Japanese GP Qualifying" },
    ],
    affiliates: [
      { id: "ptv-sports", name: "PTV Sports", subtitle: "PSL Co-Broadcast" },
      { id: "sony-sports", name: "Sony Sports India", subtitle: "Parent Network" },
      { id: "bein-sports", name: "beIN Sports", subtitle: "Football Rights" },
    ],
  },
  "sky-sport-nz": {
    id: "sky-sport-nz",
    shortName: "SKY",
    fullName: "Sky Sport New Zealand",
    tagline: "All Black Nation's Broadcasting Home",
    established: "Est. 1990",
    category: "Premium Sports",
    country: "New Zealand",
    heroImage: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1600&q=80",
    description:
      "Sky Sport NZ is New Zealand's leading sports broadcaster, home to All Blacks rugby, Black Caps cricket, Formula 1, English Premier League and the NBA. With 9 dedicated sports channels, it covers every major global sport.",
    sports: ["Rugby", "Cricket", "Football", "F1", "NBA"],
    watchUrl: "https://www.sky.co.nz/discover/sky-sport",
    regions: [
      { country: "New Zealand", note: "Primary Subscription TV" },
      { country: "Pacific Islands", note: "Extended Distribution" },
    ],
    schedule: [
      { time: "7:35 PM", category: "Rugby Union", title: "All Blacks vs South Africa — LIVE", highlight: true },
      { time: "11:00 PM", category: "Cricket", title: "Black Caps: T20 vs Pakistan" },
      { time: "2:00 AM", category: "Premier League", title: "Liverpool vs Tottenham" },
      { time: "6:00 AM", category: "Formula 1", title: "Bahrain GP: Free Practice 2" },
    ],
    affiliates: [
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "Australia Content Sharing" },
      { id: "channel7-sport", name: "Channel 7 Sport", subtitle: "Trans-Tasman Agreement" },
      { id: "star-sports-1", name: "Star Sports India", subtitle: "Cricket Exchange" },
      { id: "bein-sports", name: "beIN Sports", subtitle: "Football Rights" },
    ],
  },
  "bein-sports": {
    id: "bein-sports",
    shortName: "beIN",
    fullName: "beIN Sports",
    tagline: "15 Channels Across 3 Continents",
    established: "Est. 2012",
    category: "Official Partnership",
    country: "Qatar",
    heroImage: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=1600&q=80",
    description:
      "beIN Media Group is a global sports media powerhouse broadcasting across the Middle East, North Africa, Asia, Americas and Australia. With exclusive rights to La Liga, Serie A, Ligue 1 and more, beIN is the world's premier international sports network.",
    sports: ["La Liga", "Serie A", "Ligue 1", "Rugby", "Tennis", "F1"],
    watchUrl: "https://www.beinsports.com",
    regions: [
      { country: "Middle East & North Africa", note: "Primary Markets (24 Countries)" },
      { country: "Australia", note: "Foxtel Partnership" },
      { country: "France", note: "beIN Sports France" },
      { country: "United States", note: "beIN Sports Connect" },
    ],
    schedule: [
      { time: "10:00 PM", category: "La Liga", title: "Real Madrid vs Atletico Madrid — El Derbi", highlight: true },
      { time: "12:30 AM", category: "Serie A", title: "Inter Milan vs Juventus: Derby d'Italia" },
      { time: "3:00 AM", category: "Ligue 1", title: "PSG vs Marseille: Le Classique" },
      { time: "5:00 PM", category: "Tennis", title: "Roland Garros: Women's Semi Final" },
    ],
    affiliates: [
      { id: "star-sports-1", name: "Star Sports India", subtitle: "Asia Content Exchange" },
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "Australia Cricket Rights" },
      { id: "sky-sport-nz", name: "Sky Sport NZ", subtitle: "Pacific Distribution" },
      { id: "supersport", name: "Supersport", subtitle: "Africa Football" },
    ],
  },
  "supersport": {
    id: "supersort",
    shortName: "SUP",
    fullName: "Supersport Africa",
    tagline: "Sub-Saharan Africa's Premier Sports Broadcaster",
    established: "Est. 1995",
    category: "Regional Leader",
    country: "South Africa",
    heroImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1600&q=80",
    description:
      "Supersport is Africa's most respected sports broadcaster, delivering Premier League, PSL, Rugby, Cricket South Africa, and Formula 1 to 48 sub-Saharan countries across 20 dedicated channels.",
    sports: ["PSL", "Premier League", "Rugby", "Cricket", "F1"],
    watchUrl: "https://supersport.com/live-sport",
    regions: [
      { country: "South Africa", note: "DStv Primary Channel" },
      { country: "Sub-Saharan Africa", note: "48 Country Distribution" },
    ],
    schedule: [
      { time: "9:00 PM", category: "Premier League", title: "Chelsea vs Manchester United", highlight: true },
      { time: "3:30 PM", category: "PSL", title: "Kaizer Chiefs vs Orlando Pirates: Soweto Derby" },
      { time: "7:30 PM", category: "Rugby", title: "Springboks vs New Zealand: The Rugby Championship" },
      { time: "1:00 AM", category: "F1", title: "Italian Grand Prix: Race Highlights" },
    ],
    affiliates: [
      { id: "bein-sports", name: "beIN Sports", subtitle: "Football Rights Partner" },
      { id: "star-sports-1", name: "Star Sports India", subtitle: "Cricket Content" },
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "Australia Cricket" },
    ],
  },
  "willow-tv": {
    id: "willow-tv",
    shortName: "WLW",
    fullName: "Willow TV",
    tagline: "The Leading Cricket Channel in North America",
    established: "Est. 2010",
    category: "Cricket Specialist",
    country: "United States",
    heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
    description:
      "Willow TV is the go-to cricket destination for 4+ million South Asian fans in the United States and Canada. With rights to all major ICC tournaments, IPL, Pakistan Super League, and all bilateral series, it keeps the diaspora connected to their sport.",
    sports: ["ICC Events", "IPL", "PSL", "BBL", "International Cricket"],
    watchUrl: "https://www.willow.tv",
    regions: [
      { country: "United States", note: "Primary Broadcaster" },
      { country: "Canada", note: "Willow Canada" },
    ],
    schedule: [
      { time: "9:00 AM EST", category: "ICC World Cup", title: "India vs England — LIVE", highlight: true },
      { time: "2:00 PM EST", category: "IPL", title: "Chennai Super Kings vs GT" },
      { time: "7:30 PM EST", category: "Test Cricket", title: "Australia vs West Indies: Day 3" },
      { time: "11:00 PM EST", category: "PSL", title: "Peshawar Zalmi vs Multan Sultans" },
    ],
    affiliates: [
      { id: "star-sports-1", name: "Star Sports India", subtitle: "IPL Rights Partner" },
      { id: "ptv-sports", name: "PTV Sports", subtitle: "PSL Content" },
      { id: "fox-cricket", name: "Fox Cricket", subtitle: "BBL Rights" },
      { id: "jiocinema", name: "JioCinema", subtitle: "Digital Complement" },
    ],
  },
};
