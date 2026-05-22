import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API = "http://localhost:8000";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=60",
];

const getFallback = (id: string) =>
  FALLBACK_IMAGES[id.charCodeAt(0) % FALLBACK_IMAGES.length];

const imgFallback = (id: string) =>
  (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.dataset.fallback) {
      img.dataset.fallback = "1";
      img.src = getFallback(id);
    }
  };

interface Channel {
  id: string;
  short_name: string;
  full_name: string;
  category: string;
  country: string;
  hero_image: string;
  sports: string[];
  viewers: number;
  is_featured: boolean;
  schedule: { time: string; category: string; title: string; highlight?: boolean }[];
}

const COUNTRY_FLAGS: Record<string, string> = {
  "India": "in", "Australia": "au", "Pakistan": "pk", "New Zealand": "nz",
  "Qatar": "qa", "South Africa": "za", "United States": "us", "United Kingdom": "gb",
  "France": "fr", "Germany": "de", "Spain": "es", "Italy": "it",
  "Canada": "ca", "Brazil": "br", "Singapore": "sg", "Philippines": "ph",
  "United Arab Emirates": "ae", "Saudi Arabia": "sa",
};

const SPORT_ICONS: Record<string, string> = {
  "Football": "sports_soccer", "Cricket": "sports_cricket", "Basketball": "sports_basketball",
  "Tennis": "sports_tennis", "F1": "speed", "Rugby": "sports_rugby",
  "Baseball": "sports_baseball", "Hockey": "sports_hockey", "Boxing": "sports_mma",
  "Multi-Sport": "emoji_events",
};

interface AdSlot {
  type: "image" | "video";
  media_url: string;
  redirect_url: string;
  label: string;
  active: boolean;
  skip_seconds?: number;
}
interface AdConfig {
  home_top: AdSlot;
  sidebar_ad: AdSlot;
  watch_midroll: AdSlot;
}

export default function Directory() {
  const [searchParams] = useSearchParams();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    searchParams.get("country") || "All"
  );
  const [selectedSport, setSelectedSport] = useState<string>(
    searchParams.get("sport") || "All"
  );
  const [search, setSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [sportSearch, setSportSearch] = useState("");
  const [sportDropdownOpen, setSportDropdownOpen] = useState(false);
  const [adConfig, setAdConfig] = useState<AdConfig | null>(null);


  useEffect(() => {
    fetch(`${API}/api/channels`)
      .then(r => r.json())
      .then(data => { setChannels(data); setLoading(false); })
      .catch(() => setLoading(false));

    fetch(`${API}/api/admin/ad-config`)
      .then(r => r.json())
      .then(setAdConfig)
      .catch(() => {});
  }, []);

  // Derive unique countries + sports from data
  const countries = ["All", ...Array.from(new Set(channels.map(c => c.country))).sort()];
  const allSports = Array.from(new Set(channels.flatMap(c => c.sports || []))).sort();
  const sports = ["All", ...allSports];

  // Filter channels
  const filtered = channels.filter(c => {
    const countryMatch = selectedCountry === "All" || c.country === selectedCountry;
    const sportMatch = selectedSport === "All" || (c.sports || []).includes(selectedSport);
    const searchMatch = search === "" ||
      c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      (c.sports || []).some(s => s.toLowerCase().includes(search.toLowerCase()));
    return countryMatch && sportMatch && searchMatch;
  });

  // Group filtered by country for display
  const grouped: Record<string, Channel[]> = {};
  filtered.forEach(c => {
    if (!grouped[c.country]) grouped[c.country] = [];
    grouped[c.country].push(c);
  });

  const liveChannel = channels.find(c => c.is_featured);

  return (
    <div className="flex max-w-screen-2xl mx-auto min-h-screen">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 px-4 py-8 sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto">

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 mb-6">
          <span className="material-symbols-outlined text-base text-on-surface-variant">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search channels..."
            className="bg-transparent text-sm text-on-surface w-full focus:outline-none placeholder:text-on-surface-variant" />
          {search && <button onClick={() => setSearch("")}><span className="material-symbols-outlined text-sm text-on-surface-variant">close</span></button>}
        </div>

        {/* Countries — Searchable Dropdown */}
        <h2 className="font-headline text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-3 px-2">Country</h2>
        <div className="relative mb-6">
          {/* Trigger button */}
          <button
            onClick={() => { setCountryDropdownOpen(o => !o); setCountrySearch(''); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all font-label text-sm"
          >
            {selectedCountry !== 'All' && COUNTRY_FLAGS[selectedCountry] ? (
              <img src={`https://flagcdn.com/${COUNTRY_FLAGS[selectedCountry]}.svg`} alt={selectedCountry} className="w-5 h-3.5 rounded-sm object-cover border border-outline-variant/20 shrink-0" />
            ) : (
              <span className="material-symbols-outlined text-base text-on-surface-variant">public</span>
            )}
            <span className="flex-1 text-left truncate text-on-surface">{selectedCountry}</span>
            <span className="material-symbols-outlined text-base text-on-surface-variant transition-transform" style={{transform: countryDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>expand_more</span>
          </button>

          {/* Dropdown panel */}
          {countryDropdownOpen && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-xl overflow-hidden">
              {/* Search input inside dropdown */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-outline-variant/10">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">search</span>
                <input
                  autoFocus
                  value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                  placeholder="Search country..."
                  className="bg-transparent text-sm text-on-surface w-full focus:outline-none placeholder:text-on-surface-variant"
                />
                {countrySearch && <button onClick={() => setCountrySearch('')}><span className="material-symbols-outlined text-sm text-on-surface-variant">close</span></button>}
              </div>
              {/* Options list */}
              <div className="max-h-56 overflow-y-auto">
                {countries
                  .filter(c => c === 'All' || c.toLowerCase().includes(countrySearch.toLowerCase()))
                  .map(c => (
                    <button key={c} onClick={() => { setSelectedCountry(c); setCountryDropdownOpen(false); setCountrySearch(''); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 font-label text-sm transition-all ${
                        selectedCountry === c
                          ? 'bg-primary text-white font-bold'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}>
                      {c !== 'All' && COUNTRY_FLAGS[c] ? (
                        <img src={`https://flagcdn.com/${COUNTRY_FLAGS[c]}.svg`} alt={c} className="w-5 h-3.5 rounded-sm object-cover border border-outline-variant/20 shrink-0" />
                      ) : c === 'All' ? (
                        <span className="material-symbols-outlined text-base">public</span>
                      ) : (
                        <span className="material-symbols-outlined text-base">flag</span>
                      )}
                      <span className="flex-1 text-left truncate">{c}</span>
                      {c !== 'All' && (
                        <span className="text-[10px] font-bold opacity-60">{channels.filter(ch => ch.country === c).length}</span>
                      )}
                    </button>
                  ))
                }
                {countries.filter(c => c === 'All' || c.toLowerCase().includes(countrySearch.toLowerCase())).length === 0 && (
                  <p className="text-center text-xs text-on-surface-variant py-4">No country found</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sports filter — Searchable Dropdown */}
        <h2 className="font-headline text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-3 px-2">Sport</h2>
        <div className="relative mb-6">
          {/* Trigger button */}
          <button
            onClick={() => { setSportDropdownOpen(o => !o); setSportSearch(''); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all font-label text-sm"
          >
            <span className="material-symbols-outlined text-base text-red-600">
              {selectedSport === 'All' ? 'emoji_events' : SPORT_ICONS[selectedSport] || 'sports'}
            </span>
            <span className="flex-1 text-left truncate text-on-surface">{selectedSport}</span>
            <span className="material-symbols-outlined text-base text-on-surface-variant transition-transform" style={{transform: sportDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>expand_more</span>
          </button>

          {/* Dropdown panel */}
          {sportDropdownOpen && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-outline-variant/10">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">search</span>
                <input
                  autoFocus
                  value={sportSearch}
                  onChange={e => setSportSearch(e.target.value)}
                  placeholder="Search sport..."
                  className="bg-transparent text-sm text-on-surface w-full focus:outline-none placeholder:text-on-surface-variant"
                />
                {sportSearch && <button onClick={() => setSportSearch('')}><span className="material-symbols-outlined text-sm text-on-surface-variant">close</span></button>}
              </div>
              {/* Options list */}
              <div className="max-h-56 overflow-y-auto">
                {sports
                  .filter(s => s === 'All' || s.toLowerCase().includes(sportSearch.toLowerCase()))
                  .map(s => (
                    <button key={s} onClick={() => { setSelectedSport(s); setSportDropdownOpen(false); setSportSearch(''); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 font-label text-sm transition-all ${
                        selectedSport === s
                          ? 'bg-red-600/10 text-red-600 font-bold'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}>
                      <span className="material-symbols-outlined text-base">
                        {s === 'All' ? 'emoji_events' : SPORT_ICONS[s] || 'sports'}
                      </span>
                      <span className="flex-1 text-left">{s}</span>
                    </button>
                  ))
                }
                {sports.filter(s => s === 'All' || s.toLowerCase().includes(sportSearch.toLowerCase())).length === 0 && (
                  <p className="text-center text-xs text-on-surface-variant py-4">No sport found</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR AD SLOT */}
        {adConfig?.sidebar_ad?.active && adConfig.sidebar_ad.media_url && (
          <div className="mt-auto pt-6 border-t border-outline-variant/10">
            <a
              href={adConfig.sidebar_ad.redirect_url}
              target="_blank"
              rel="noreferrer"
              className="group relative block w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors bg-gray-900"
            >
              {adConfig.sidebar_ad.type === "image" ? (
                <img
                  src={adConfig.sidebar_ad.media_url}
                  alt={adConfig.sidebar_ad.label}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <video
                  src={adConfig.sidebar_ad.media_url}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[8px] font-label font-bold text-red-500 uppercase tracking-[0.2em] mb-1 bg-red-950/40 px-1.5 py-0.5 rounded self-start">Sponsored</span>
                <h4 className="text-xs font-headline font-bold text-white uppercase tracking-tight group-hover:text-red-500 transition-colors leading-tight">
                  {adConfig.sidebar_ad.label}
                </h4>
              </div>
            </a>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <section className="flex-grow px-4 md:px-10 py-8 bg-surface-container-low md:rounded-tl-3xl min-h-screen">

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
            <div>
              <span className="font-label text-xs font-bold text-red-600 bg-red-600/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                {loading ? "Loading..." : `${filtered.length} Channels`}
              </span>
              <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-on-surface uppercase">
                {selectedCountry === "All" ? "Global Channels" : selectedCountry}
              </h1>
            </div>
            {/* Mobile filters */}
            <div className="flex gap-2 md:hidden flex-wrap">
              {countries.slice(1, 6).map(c => (
                <button key={c} onClick={() => setSelectedCountry(c === selectedCountry ? "All" : c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-label font-bold transition-all ${
                    selectedCountry === c ? "bg-primary text-white" : "bg-surface-container-low border border-outline-variant/30"
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <p className="font-body text-on-surface-variant text-sm">
            {selectedSport !== "All" && <span>Filtered by <strong className="text-on-surface">{selectedSport}</strong> · </span>}
            {search && <span>Search: <strong className="text-on-surface">"{search}"</strong> · </span>}
            <span>{filtered.length} channel{filtered.length !== 1 ? "s" : ""} found</span>
          </p>
        </header>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-on-surface-variant font-label text-sm">Fetching channels from database...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <span className="material-symbols-outlined text-6xl text-outline-variant">live_tv</span>
            <h3 className="font-headline font-bold text-xl uppercase">No Channels Found</h3>
            <p className="text-on-surface-variant text-sm">Try a different country or sport filter.</p>
            <button onClick={() => { setSelectedCountry("All"); setSelectedSport("All"); setSearch(""); }}
              className="mt-2 px-6 py-2 bg-primary text-white rounded-xl font-label font-bold text-sm">
              Clear Filters
            </button>
          </div>
        )}

        {/* FEATURED LIVE BANNER */}
        {!loading && selectedCountry === "All" && selectedSport === "All" && !search && liveChannel && (
          <Link to={`/channel/${liveChannel.id}`}
            className="block mb-10 relative overflow-hidden rounded-2xl min-h-[200px] group">
            <img src={liveChannel.hero_image} alt={liveChannel.full_name}
              referrerPolicy="no-referrer"
              onError={imgFallback(liveChannel.id)}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="relative z-10 p-8 flex items-end justify-between h-full min-h-[200px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 font-label font-black text-[10px] uppercase tracking-[0.2em]">Featured Channel</span>
                </div>
                <h2 className="font-headline font-black text-3xl md:text-4xl text-white uppercase tracking-tighter">{liveChannel.full_name}</h2>
                <p className="text-white/60 text-sm mt-1">{liveChannel.country} · {liveChannel.category}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(liveChannel.sports || []).slice(0, 4).map(s => (
                    <span key={s} className="px-2 py-1 bg-white/10 text-white text-[10px] font-label font-bold uppercase rounded">{s}</span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 hidden md:flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-headline font-bold text-sm uppercase tracking-wide">
                <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>play_arrow</span>
                Watch Live
              </div>
            </div>
          </Link>
        )}

        {/* GROUPED BY COUNTRY */}
        {!loading && Object.entries(grouped).map(([country, chs]) => (
          <div key={country} className="mb-12">
            {/* Country header */}
            <div className="flex items-center gap-4 mb-5">
              {COUNTRY_FLAGS[country]
                ? <img src={`https://flagcdn.com/${COUNTRY_FLAGS[country]}.svg`} alt={country}
                    className="w-10 h-7 rounded object-cover border border-outline-variant/20 shadow-sm" />
                : <span className="material-symbols-outlined text-2xl text-on-surface-variant">public</span>}
              <div>
                <h3 className="font-headline text-xl font-black tracking-tight uppercase">{country}</h3>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {chs.length} Channel{chs.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button onClick={() => setSelectedCountry(country)}
                className="ml-auto text-xs font-label font-bold text-on-surface-variant hover:text-red-600 transition-colors flex items-center gap-1">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Channel cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {chs.map(ch => {
                const liveItem = ch.schedule?.find(s => s.highlight) || ch.schedule?.[0];
                return (
                  <Link key={ch.id} to={`/channel/${ch.id}`}
                    className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 hover:border-red-600/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img src={ch.hero_image} alt={ch.full_name}
                        referrerPolicy="no-referrer"
                        onError={imgFallback(ch.id)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      {/* Short name badge */}
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-md">
                        <span className="font-headline font-black text-black text-[10px] text-center leading-none">{ch.short_name}</span>
                      </div>
                      {/* Viewers */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[10px]" style={{fontVariationSettings:"'FILL' 1"}}>visibility</span>
                        <span className="text-[9px] font-label font-bold">{(ch.viewers/1000).toFixed(0)}K</span>
                      </div>
                      {ch.is_featured && (
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-headline font-black text-sm uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors line-clamp-1">
                          {ch.full_name}
                        </h4>
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-surface-container-low text-[9px] font-label font-bold uppercase tracking-widest rounded mb-3 text-on-surface-variant">
                        {ch.category}
                      </span>
                      {/* Sports tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(ch.sports || []).slice(0, 3).map(s => (
                          <span key={s} className="px-1.5 py-0.5 bg-red-600/10 text-red-600 text-[8px] font-label font-bold uppercase rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                      {/* Live item */}
                      {liveItem && (
                        <p className="text-[10px] text-on-surface-variant font-label truncate border-t border-outline-variant/10 pt-2">
                          <span className="text-red-500 font-bold">{liveItem.time}</span> · {liveItem.title}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
