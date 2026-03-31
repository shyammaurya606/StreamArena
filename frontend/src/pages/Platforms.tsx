import { useState } from "react";

const countries = [
  {
    id: "UK",
    name: "United Kingdom",
    label: "Popular Hub",
    status: "14 Platforms Live",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKxXwzoN7HCD98W0D4MmqgrEyGQHY0zseU2vaS5BXyAJjjEjgmQ-ZizXLDNxJRB12bmRVT-GOf9pjKUmYcoVYCADxPOTxXy4s2fuPryrKFy5YVT0Hr-MStG2RTSmGFmZcmC7zom3Brtk2pyL9R-VPApzPPFT26MWvu_s3zY_BVlMUpsCYSkwhIdBOvC2pFTWrT94PHH1poA0_egVNnwTOLBTKXnEaZz7nQJtBJRlgPFYElfTKaTgd2SNRnEASeJSD2rON2VJVNR98",
    large: false,
  },
  {
    id: "USA",
    name: "United States",
    label: "Market Leader",
    description: "The world's largest selection of premium sports networks, including ESPN+, Peacock, and FOX Sports.",
    status: "Explore 42 Channels",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCma_-ZVPBQGichV6SCcvnoe_fYWp3zf_QfD7FwgMNJLh-wrOaczDSxL0qXoveTfcZ-CpvRhosjZdnEYl3KubTvgetV395AKVj9_uVhFcrTzovJxS2HpaztZ_vDzGcSq7XU20p5QEmWy2OeO8hZ_xsIiTCRmTYT3dHlJDjPZ52Qm4XonbuUJLF7kF2DMwRSRyYjai4AKXax0t7dpdL0FvDeHndqNEmbwpBFdyetFC_7QDxj0QLbtsE9rWHOfoTI687pPjRkS-CBkxs",
    large: true,
  },
  {
    id: "France",
    name: "France",
    status: "9 Platforms Live",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdD986kDslO5A6j_Yz0V9y4LvfeJ0CtuTd9nh0HKQ2_P2oG5VHSqPFiESnzjkmHJlq5EJI1IUfe9mwKGRuTl7zU-uCNaB2KUNxiA2MIGC6sHsF7SCJBME4NSDZxcpwV-O0eNZ-PZb5n8laISFfyVtDek7iIE00Gi3BXvs5HPpVcEXJmy8xy0Vql4-QypPG8AvxzSM0Dgq0y1s-A9qbx1EwuL7TmgTAXl7RIR-eWbTb4ffntHT2rUM6TTuf58KvDSlx0qHJaQzo3z8",
    large: false,
  },
  {
    id: "India",
    name: "India",
    label: "Trending",
    description: "Access the most dynamic cricket ecosystem and localized premium streaming hubs for millions of fans.",
    status: "11 Platforms Live",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClaAhCp2KDcTJ_KycLNtgB0dqnBIpwekyc2TAkcGCJq6JzrH3tHvnug81x-IaKKnBbDeqDnoZbymXj7tnIatAsCDhlB74gGOTKPjid8m2_u8GD2jB1bAONP1cbXO7YBMMgCVDGlUl3m-wXDxtJEjFQw-7P-MHSia4bKZJ87kFTOdxsS4j8xV8cWIIG1ZHIHrIwxoMa2vyZD2Z4bSoKbsP9GSn2Vcaqcbj-KgkbnaV490y_bmlbbcNriz6GGYXu7jqOISJpDWeYRbg",
    large: true,
  },
  {
    id: "Australia",
    name: "Australia",
    status: "12 Platforms Live",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZXVQ4l-c2N2f5Zmf-3uOBKG3x0DtB-qT4z-vbuo5Lxydy9XmVsBaUk2askLzbDCgHPrHwCHWTfUuO1PBAEmYRjM__W_GmXXaNJ9JA8uUCi9gTPbYrZVjUaggSKX703EEFhseAX5ythswj5keqXMfBJ-7gd2pfW26T2o-VldxowDWTNqcH4utI8EuDFC3mcmaQ5wXhKZ4uXspL7fIGGcLoG5YH_Nh0QoBluGbv5Sxmu9zoXRWIk82Jemj1O2sQbt8p8wFUpVpMW9o",
    large: false,
  },
  {
    id: "Germany",
    name: "Germany",
    status: "10 Platforms Live",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Lok1xexrMwpQ2NS5V52r5v4uyAwoPFgCR5r-jgCRWiSoXwhExjKiMluUl8m77MaUpkhtRDWq_UtGLsgsuB0FnubHfO2mhEjabATAeHiziqsLfzOABEoYHlFu0JHCevN7YwASepfZ2inImdLONGNXu9Rv-QuJlOpz5ff72WYleKYq_PQcrIJAc6DetoZqMEGcSmIoiEnNLTxCUYpWYaF4XDliZyeM04AzBQEx4aUToS2mtZ1TwMLPw6f_FLjytDRYbOcUOPAXE8w",
    large: false,
  },
  {
    id: "Japan",
    name: "Japan",
    status: "8 Platforms Live",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-xXGkr6zQXJNCGmZem4gmgIvO7iD2ET9Bb6Bh_j6fLfL9TUAT1MnjQ0hjU9bcfBuCozbViF_0DVOTuvqQSQgKRBCJTjd77njMdSL2TD11nrYmj7bDSIIWtrE1QDqKRVvieUTTbx5sia9ggy4050iw87SfCESLH8ro1xY1uBHGw6mx3hp-CFljWEKwY7QV_7ts_uDOkkSBlYUCc8cEgC1RMQOYATIeDoytr347YuV9xZsL6GJ9XyP_SXMeXcdmrIEW4ZQE2JgJwWY",
    large: false,
  },
];

const countryDetails: Record<string, any> = {
  "UK": {
    name: "United Kingdom",
    nameSpan: "Kingdom",
    description: "Browse the premium broadcast networks and digital platforms delivering live sports across the British Isles.",
    liveCount: "8 Networks Live",
    slots: [
      {
        id: "sky",
        name: "Sky Sports",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Wxh6xPVfLbtBG1MdXJDQ5SdHzW1rK8FwDRG1vfVfFQzKeOskKf7-MjJ0ESB7SlRaz4ivGTH1omticYksZfLD7dC-TX__X3NnT3l3nJm5XcHW92IYLnUCEqm54WrQoR2vevXDdtqSGuLvNa3LZwsBe_YuUL-ckvLqnJzatigOzAqIF0Kn0w5AnLjGsoO7UNGOs_kGdeCK_Fw4cxhKrvad2BXLVelldsfZHic5NA39llujesE-_Sn_aKsazCW84jvHF6Tciv-jA64",
        partnerLabel: "Premier Partner",
        description: "The industry leader in the UK, offering unparalleled coverage of the Premier League, Formula 1, Cricket, Golf, and NFL. Experience sports in breathtaking Ultra HD.",
        tags: ["4K HDR", "Multi-View"],
        action: "View 11 Channels"
      },
      {
        id: "tnt",
        name: "TNT Sports",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAklVX8bU_503mYRpUpR4GUvHT2T4NqScHB3EGfVtRzWXMETM3BtbFrZ5c6UImQkMKAT0vSijvDzsGuHwB1sv4aueyNfbxG3OQ92kpbwubDOAOytAj88TgK7kENyxc4XcBpwdchzgVOYEmvZFuo4e-6nvFct-QBWZ5iA5HHV27lUBIMI4yuejnctFWqrIb7DW-ARj9GHGjomGdT4NEUA8H2XR4UJRJiOKzWLWycX0qy1EupHuHf742x_B2jYFtufBUZ5ocKD-EMuY0",
        description: "The exclusive home of UEFA Champions League and Europa League in the UK. Also features Premiership Rugby, MotoGP, and UFC.",
        action: "Explore Channels"
      },
      {
        id: "bbc",
        name: "BBC Sport",
        label: "Free-to-Air",
        icon: "public",
        description: "National broadcaster covering major events including Wimbledon, the Olympics, FA Cup, and Six Nations. Trusted editorial and live radio commentary via 5 Live.",
        action: "View Schedule"
      },
      {
        id: "eurosport",
        name: "Eurosport",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANAL1CAgl0vHiDAtxF6wnFdjz68eb5ItZrPd-T3tAfzPNHBg2e9lufcO9sBWSp--7xN1O_mqwqdIcL-5JCq5OpJ9p95Kajhlbq7ClNimEq_FUrbs1KBaXmBeIhkIgG--AFd_KvTuOBKN5GJg7Tuuy4mw37LjyoZ65bdh142EUWxpEATanYN3RgJ6FB56BFXP3m-ID2aLzrfERII4QVVhMVyb3_FMhICMSdQ7RKTC1xUlb3CR4W0tWL6LtZ3I6oAfE4B2rhMAjgnmo",
        description: "The pan-European specialist. Unrivaled coverage of Grand Tour Cycling, Tennis Grand Slams, and Snooker.",
        metadata: "Discovery+ Integration",
        action: "View Channels"
      },
      {
        id: "dazn",
        name: "DAZN",
        label: "Global Digital",
        description: "The \"Netflix of Sports.\" Premier destination for Matchroom Boxing, MMA, and the Saudi Pro League.",
        action: "Subscription Plans"
      },
      {
        id: "itv",
        name: "ITV Sport",
        icon: "drone_2",
        description: "Home of the England National Team matches, Rugby World Cup, and British Horse Racing. High-quality free-to-air coverage.",
        action: "Watch Live"
      },
      {
        id: "viaplay",
        name: "Viaplay",
        streams: "3 Active Streams",
        description: "Specialist coverage of La Liga, Scottish Cup football, and NHL. Perfect for the international sports enthusiast.",
        action: "Explore Viaplay"
      }
    ]
  },
  "USA": {
    name: "United States",
    nameSpan: "States",
    description: "The world's largest market for professional sports broadcasting, from coastal flagship networks to global streaming giants.",
    liveCount: "42 Channels Live",
    slots: [
      {
        id: "espn",
        name: "ESPN+",
        image: "https://images.unsplash.com/photo-1504450758481-7338ba7524ad?auto=format&fit=crop&w=1200&q=80",
        partnerLabel: "Official Streamer",
        description: "Bringing you thousands of live events from MLB, NHL, MLS, and top-tier combat sports. The ultimate home of the UFC and La Liga in the US.",
        tags: ["Dynamic Stats", "On-Demand"],
        action: "Explore ESPN+ Hub"
      },
      {
        id: "peacock",
        name: "Peacock",
        thumbnail: "https://images.unsplash.com/photo-1511994298241-608e28f14f66?auto=format&fit=crop&w=500&q=80",
        description: "The home of the Premier League, Sunday Night Football, and the Olympic Games. Premium access to NBC Sports originals.",
        action: "Get Started"
      },
      {
        id: "paramount",
        name: "Paramount+",
        label: "Big Game",
        icon: "stadium",
        description: "Home of the UEFA Champions League, NFL on CBS, and Serie A. Exclusive digital-first access to global football.",
        action: "Watch on CBS"
      },
      {
        id: "fox",
        name: "Fox Sports",
        image: "https://images.unsplash.com/photo-1551698618-1ffafe58a8f4?auto=format&fit=crop&w=800&q=80",
        description: "The definitive home of the NFL, MLB, and the World Cup. Unrivaled collegiate sports coverage through Big Ten Network.",
        metadata: "Live 4K Streams",
        action: "Open App"
      },
      {
        id: "hbo",
        name: "Max",
        label: "Premium",
        description: "Discover B/R Sports on Max, featuring NBA, NHL, and MLB regular season and postseason games in Dolby Vision.",
        action: "Add Extension"
      },
      {
        id: "cbs",
        name: "CBS Sports Network",
        icon: "sensors",
        description: "Continuous national coverage of collegiate athletics, professional golf, and international soccer leagues.",
        action: "See Listings"
      },
      {
        id: "hulu",
        name: "Hulu + Live TV",
        streams: "Unlimited Screen",
        description: "A complete bundle of local sports networks and national broadcasters in one seamless interface.",
        action: "Compare Plans"
      }
    ]
  },
  "India": {
    name: "India",
    nameSpan: "India",
    description: "The heart of global cricket and a rapidly growing hub for international football, tennis, and domestic kabaddi leagues.",
    liveCount: "11 Platforms Live",
    slots: [
      {
        id: "hotstar",
        name: "Disney+ Hotstar",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
        partnerLabel: "Cricket Home",
        description: "The definitive platform for cricket fans, hosting the IPL, ICC World Cup, and Premier League. Streaming sports in up to 4K resolution.",
        tags: ["Regional Audio", "4K Video"],
        action: "Watch All Sports"
      },
      {
        id: "jiocinema",
        name: "JioCinema",
        thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=500&q=80",
        description: "Offering free-to-air access to the world's biggest sporting events, including the Olympics, IPL, and major European football.",
        action: "Download App"
      },
      {
        id: "sonyliv",
        name: "Sony LIV",
        label: "Football Central",
        icon: "sports_soccer",
        description: "The home of UEFA Champions League, Sony LIV delivers world-class football, Tennis Grand Slams, and Olympic coverage.",
        action: "Live Stream"
      },
      {
        id: "star",
        name: "Star Sports",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
        description: "The legacy leader in Indian sports broadcasting. Full coverage of ICC events, Pro Kabaddi, and domestic cricket.",
        metadata: "Dolby Atmos Audio",
        action: "Channel Guide"
      },
      {
        id: "fancode",
        name: "FanCode",
        label: "Niche Leader",
        description: "Personalized sports experience for thousands of obscure leagues, emphasizing stats and immersive fan interactions.",
        action: "Shop Merch"
      },
      {
        id: "prime",
        name: "Prime Video",
        icon: "movie",
        description: "Exclusive home of New Zealand Cricket in India and growing coverage of international tennis tours.",
        action: "Join Prime"
      },
      {
        id: "zee5",
        name: "Zee5 Sports",
        streams: "HD Streaming",
        description: "Providing broad access to domestic tournaments and specialized international leagues with global appeal.",
        action: "Start Trial"
      }
    ]
  }
};

export default function Platforms() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) {
    const detail = countryDetails[selectedId] || countryDetails["UK"];
    const s = detail.slots;

    return (
      <div className="bg-surface text-on-surface font-body selection:bg-surface-tint selection:text-on-primary min-h-screen">
        <main className="max-w-screen-2xl mx-auto px-6 pt-8 pb-24 animate-in fade-in slide-in-from-right-4 duration-500">

          {/* Breadcrumbs & Title Section */}
          <section className="mb-12">
            <nav className="flex items-center gap-2 mb-4 text-sm font-label uppercase tracking-widest text-on-surface-variant">
              <span
                className="hover:text-surface-tint transition-colors cursor-pointer"
                onClick={() => setSelectedId(null)}
              >
                Categories
              </span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface font-semibold">{detail.name}</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                  {detail.name.replace(detail.nameSpan, "")} <span className="text-surface-tint italic">{detail.nameSpan}</span>
                </h1>
                <p className="mt-4 text-on-surface-variant max-w-2xl text-lg">
                  {detail.description}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
                <span className="w-3 h-3 rounded-full bg-surface-tint animate-pulse"></span>
                <span className="font-label text-xs font-bold uppercase tracking-wider">{detail.liveCount}</span>
              </div>
            </div>
          </section>

          {/* Bento Grid for Streaming Platforms */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Slot 1: Featured Partner (8 cols) */}
            <article className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest rounded-xl flex flex-col md:flex-row shadow-sm border-l-4 border-surface-tint">
              <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={s[0].image}
                  alt={s[0].name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute top-4 left-4 bg-surface-tint text-white px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {s[0].partnerLabel}
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-headline text-3xl font-black italic uppercase tracking-tighter">{s[0].name}</h2>
                    <span className="material-symbols-outlined text-surface-tint" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    {s[0].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {s[0].tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-surface-container-high rounded text-[10px] font-bold uppercase tracking-wider font-label">{tag}</span>
                    ))}
                  </div>
                </div>
                <button className="w-full py-4 bg-primary-container text-on-primary font-headline font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group/btn">
                  {s[0].action}
                  <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </article>

            {/* Slot 2: Standard Center (4 cols) */}
            <article className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group shadow-sm border-l-4 border-surface-tint">
              <div>
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6 overflow-hidden">
                  <img className="w-full h-full object-cover" src={s[1].thumbnail} alt={s[1].name} />
                </div>
                <h2 className="font-headline text-2xl font-black italic uppercase tracking-tighter mb-4">{s[1].name}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {s[1].description}
                </p>
              </div>
              <div>
                <div className="h-px bg-outline-variant/15 mb-6"></div>
                <button className="w-full py-3 bg-surface-container-low text-on-surface font-headline font-bold uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-all">
                  {s[1].action}
                </button>
              </div>
            </article>

            {/* Slot 3: Editorial Focus (5 cols) */}
            <article className="md:col-span-5 bg-surface-container-low rounded-xl p-8 flex flex-col group border-l-4 border-surface-tint shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="font-headline text-2xl font-black italic uppercase tracking-tighter">{s[2].name}</h2>
                  <span className="font-label text-[10px] text-surface-tint font-bold uppercase tracking-widest">{s[2].label}</span>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-20">{s[2].icon}</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed flex-grow">
                {s[2].description}
              </p>
              <button className="mt-8 flex items-center gap-2 text-surface-tint font-headline font-bold uppercase tracking-widest hover:gap-4 transition-all">
                {s[2].action} <span className="material-symbols-outlined">east</span>
              </button>
            </article>

            {/* Slot 4: Kinetic/Visual (7 cols) */}
            <article className="md:col-span-7 relative bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm border-l-4 border-surface-tint">
              <div className="flex flex-col md:flex-row h-full">
                <div className="p-8 md:w-3/5">
                  <h2 className="font-headline text-2xl font-black italic uppercase tracking-tighter mb-4">{s[3].name}</h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {s[3].description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-2 bg-primary text-white font-headline font-bold uppercase text-xs tracking-widest rounded-lg">View Channels</button>
                    <span className="text-[10px] font-label font-bold uppercase tracking-tighter opacity-40">{s[3].metadata}</span>
                  </div>
                </div>
                <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={s[3].image} alt={s[3].name} />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-surface-container-lowest hidden md:block"></div>
                </div>
              </div>
            </article>

            {/* Slot 5: Subscription/Dark (4 cols) */}
            <article className="md:col-span-4 bg-primary text-on-primary rounded-xl p-8 group shadow-xl border-l-4 border-surface-tint">
              <div className="mb-12">
                <h2 className="font-headline text-4xl font-black italic uppercase tracking-tighter mb-2">{s[4].name}</h2>
                <div className="inline-block px-2 py-0.5 border border-on-primary/30 rounded text-[9px] font-label font-bold tracking-[0.2em] uppercase">{s[4].label}</div>
              </div>
              <p className="text-on-primary/70 text-sm leading-relaxed mb-8">
                {s[4].description}
              </p>
              <button className="w-full py-3 bg-on-primary text-primary font-headline font-bold uppercase tracking-wider rounded-lg hover:bg-surface-tint hover:text-white transition-all">
                {s[4].action}
              </button>
            </article>

            {/* Slot 6: Minimalist (4 cols) */}
            <article className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between shadow-sm border-l-4 border-surface-tint">
              <div>
                <h2 className="font-headline text-2xl font-black italic uppercase tracking-tighter mb-4">{s[5].name}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {s[5].description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="material-symbols-outlined text-outline">{s[5].icon}</span>
                <button className="font-headline font-bold uppercase tracking-widest text-sm hover:text-surface-tint transition-colors">{s[5].action}</button>
              </div>
            </article>

            {/* Slot 7: Multi-Stream/Bordered (4 cols) */}
            <article className="md:col-span-4 bg-surface-container-low rounded-xl p-8 border-l-4 border-surface-tint border-y border-r border-outline-variant/10 shadow-sm">
              <h2 className="font-headline text-2xl font-black italic uppercase tracking-tighter mb-4">{s[6].name}</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {s[6].description}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                </div>
                <span className="ml-auto text-[10px] font-label font-bold uppercase opacity-50">{s[6].streams}</span>
              </div>
            </article>
          </div>

          {/* Footer CTA */}
          <section className="mt-20 p-12 bg-surface-container-highest rounded-2xl text-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-4">Can't find your provider?</h3>
              <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
                Our directory is constantly updated. If you represent a broadcast network or streaming service in {detail.name}, get in touch to be listed.
              </p>
              <button className="px-8 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform">
                Contact Directory Admin
              </button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[200px] opacity-[0.03] rotate-12">map</span>
          </section>
        </main>
      </div>
    );
  }

  // --- MAIN GRID VIEW ---
  const pageItems = currentPage === 0 ? countries.slice(0, 6) : countries.slice(6);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-surface-tint/30">
      <main className="max-w-screen-2xl mx-auto px-6 py-12 md:py-20">

        {/* HERO SECTION */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="font-label text-surface-tint uppercase tracking-[0.2em] font-bold text-xs mb-4 block">
                Global Coverage
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-6">
                Explore by <br />
                <span className="text-on-primary-container">Region</span>
              </h1>
              <p className="text-on-surface-variant text-lg max-w-md">
                Access localized streaming hubs and discover platform availability across 40+ global territories with real-time updates.
              </p>
            </div>
            <div className="w-full md:w-96">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant">search</span>
                </div>
                <input
                  className="w-full pl-12 pr-6 py-4 bg-surface-container-low border-none rounded-full font-body text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-surface-tint/20 transition-all editorial-shadow"
                  placeholder="Search for a country..."
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* KINETIC FILTERS */}
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-label text-sm font-semibold whitespace-nowrap">
              All Regions
            </button>
            <button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-md font-label text-sm font-semibold hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              Europe
            </button>
            <button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-md font-label text-sm font-semibold hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              North America
            </button>
            <button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-md font-label text-sm font-semibold hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              Asia Pacific
            </button>
            <button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-md font-label text-sm font-semibold hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              South America
            </button>
            <button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-md font-label text-sm font-semibold hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              Africa
            </button>
          </div>
        </section>

        {/* COUNTRY BENTO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {pageItems.map((country) => (
            <div
              key={country.id}
              onClick={() => setSelectedId(country.id)}
              className={`${country.large ? 'md:col-span-2 aspect-[16/9] md:aspect-auto p-10' : 'aspect-[4/5] p-8'} group relative overflow-hidden rounded-2xl flex flex-col justify-end cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500`}
            >
              <img
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${country.large ? 'group-hover:scale-105' : 'group-hover:scale-110'}`}
                src={country.img}
                alt={country.name}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${country.large ? 'md:bg-gradient-to-r' : ''}`}></div>
              <div className="relative z-10 text-white">
                {country.label && (
                  <span className="font-label text-red-500 text-[10px] font-black tracking-widest uppercase mb-2 block">
                    {country.label}
                  </span>
                )}
                <h3 className={`${country.large ? 'text-6xl md:text-7xl mb-6' : 'text-4xl mb-3'} font-headline font-black uppercase tracking-tighter leading-none`}>
                  {country.name}
                </h3>
                {country.large && (
                  <p className="font-body text-white/70 max-w-sm text-lg leading-relaxed mb-8 hidden md:block">
                    {country.description}
                  </p>
                )}
                {(country.id === 'USA' || country.id === 'India') ? (
                  <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-label text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-lg shadow-red-600/40 mt-4">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {country.status}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></span>
                    <p className="font-label text-[10px] font-bold text-white/70 uppercase tracking-widest">
                      {country.status}
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute top-8 right-8 material-symbols-outlined text-white/30 group-hover:text-white transition-colors">
                north_east
              </div>
            </div>
          ))}
        </section>

        {/* PAGINATION CONTROLS */}
        <section className="mt-12 flex justify-center items-center gap-6">
          <button
            onClick={() => setCurrentPage(0)}
            className={`p-2 rounded-full transition-all ${currentPage === 0 ? 'text-outline-variant cursor-not-allowed' : 'text-primary hover:bg-surface-container-high active:scale-95'}`}
            disabled={currentPage === 0}
          >
            <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage(0)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === 0 ? 'bg-red-600 scale-125' : 'bg-outline-variant hover:bg-outline'}`}
            />
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === 1 ? 'bg-red-600 scale-125' : 'bg-outline-variant hover:bg-outline'}`}
            />
          </div>

          <button
            onClick={() => setCurrentPage(1)}
            className={`p-2 rounded-full transition-all ${currentPage === 1 ? 'text-outline-variant cursor-not-allowed' : 'text-primary hover:bg-surface-container-high active:scale-95'}`}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined text-3xl">arrow_forward_ios</span>
          </button>
        </section>

        {/* DYNAMIC CATEGORY SECTION */}
        <section className="mt-24 bg-primary text-on-primary rounded-3xl p-12 overflow-hidden relative kinetic-gradient shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
                Can't find your <br />
                territory?
              </h2>
              <p className="text-surface-container-highest/70 text-lg mb-8 max-w-sm font-medium">
                We're constantly expanding our directory to include every sports broadcast license globally. Submit a request for your region.
              </p>
              <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-wide hover:bg-red-700 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-red-600/30">
                Request Region
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-red-500 mb-4 text-3xl">public</span>
                <h4 className="font-headline font-bold uppercase tracking-tighter text-xl">40+ Countries</h4>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-red-500 mb-4 text-3xl">update</span>
                <h4 className="font-headline font-bold uppercase tracking-tighter text-xl">Real-time Data</h4>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-red-500 mb-4 text-3xl">stadium</span>
                <h4 className="font-headline font-bold uppercase tracking-tighter text-xl">150+ Sports</h4>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-red-500 mb-4 text-3xl">verified</span>
                <h4 className="font-headline font-bold uppercase tracking-tighter text-xl">Verified Links</h4>
              </div>
            </div>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600 opacity-20 rounded-full blur-3xl"></div>
        </section>
      </main>
    </div>
  );
}
