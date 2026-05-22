import { useState, useEffect } from 'react';

interface Match {
  id: string;
  title: string;
  sport: string;
  score: string;
  status: string;
  viewers: number;
  home_team: string;
  away_team: string;
  home_logo?: string;
  away_logo?: string;
  elapsed?: string;
  league?: string;
  stream_url?: string;
}

const TeamLogoFallback = ({ logo, teamName, imgClass, textClass }: { logo?: string, teamName: string, imgClass?: string, textClass?: string }) => {
  const [hasError, setHasError] = useState(false);
  const displayName = (teamName && teamName.trim().length > 0) ? teamName : "??";
  
  if (logo && !hasError) {
    return (
      <img 
        src={logo} 
        alt={teamName} 
        className={imgClass}
        onError={() => setHasError(true)} 
      />
    );
  }
  
  return (
    <span className={textClass}>
      {displayName.slice(0, 2).toUpperCase()}
    </span>
  );
};

const formatViewers = (count: number) => {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
  return count.toString();
};

const getSportBanner = (sport: string): string => {
  const sportLower = (sport || '').toLowerCase();
  if (sportLower.includes('basketball') || sportLower.includes('nba')) {
    return '/nba-card.png';
  }
  if (sportLower.includes('f1') || sportLower.includes('motorsport') || sportLower.includes('formula')) {
    return '/f1-card.png';
  }
  return '/hero-arena.png';
};

const getMatchRegion = (match: Match): string => {
  const text = `${match.league || ''} ${match.title || ''} ${match.sport || ''}`.toLowerCase();
  if (text.includes('nba') || text.includes('nfl') || text.includes('mlb') || text.includes('us') || text.includes('america') || text.includes('lakers') || text.includes('warriors')) {
    return 'North America';
  }
  if (text.includes('premier league') || text.includes('laliga') || text.includes('la liga') || text.includes('serie a') || text.includes('ligue 1') || text.includes('champions league') || text.includes('uefa') || text.includes('europa') || text.includes('liverpool') || text.includes('real madrid') || text.includes('europe')) {
    return 'Europe';
  }
  if (text.includes('ipl') || text.includes('bcci') || text.includes('cricket') || text.includes('india') || text.includes('australia') || text.includes('asia') || text.includes('pacific') || text.includes('afl')) {
    return 'Asia Pacific';
  }
  return 'Global';
};

export default function LiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('All Sports');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global');
  const [loadingStreamId, setLoadingStreamId] = useState<string | null>(null);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    let url = `${API_BASE_URL}/api/matches/live`;
    if (selectedSport && selectedSport !== 'All Sports') {
      url += `?sport=${encodeURIComponent(selectedSport)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(console.error);
  }, [selectedSport]);

  const handleWatchStream = async (match: Match) => {
    if (match.stream_url) {
      window.open(match.stream_url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    setLoadingStreamId(match.id || 'unknown');
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${API_BASE_URL}/api/matches/gemini-link?home_team=${encodeURIComponent(match.home_team)}&away_team=${encodeURIComponent(match.away_team)}&sport=${encodeURIComponent(match.sport)}`);
      const data = await res.json();
      
      if (data && data.url) {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      } else {
        // Fallback to YouTube Live Search
        const query = `${match.home_team} vs ${match.away_team} ${match.sport} live stream`;
        const youtubeLiveUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgJAAQ%253D%253D`;
        window.open(youtubeLiveUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error(err);
      // Fallback
      const query = `${match.home_team} vs ${match.away_team} ${match.sport} live stream`;
      const youtubeLiveUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgJAAQ%253D%253D`;
      window.open(youtubeLiveUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoadingStreamId(null);
    }
  };

  // Combine requested predefined sports with any dynamic ones from live matches
  const predefinedSports = ['All Sports', 'Cricket', 'Football', 'Basketball', 'Tennis', 'Formula-1', 'Rugby', 'Boxing'];
  const dynamicSports = Array.from(new Set([...predefinedSports, ...matches.map(m => m.sport)]));

  // Perform dynamic filtering based on selections
  const filteredMatches = matches.filter(m => {
    const matchesSport = selectedSport === 'All Sports' || m.sport === selectedSport;
    const matchRegion = getMatchRegion(m);
    const matchesRegion = selectedRegion === 'Global' || matchRegion === selectedRegion;
    return matchesSport && matchesRegion;
  });

  const heroMatch = filteredMatches.length > 0 ? filteredMatches[0] : null;
  const gridMatches = filteredMatches.length > 1 ? filteredMatches.slice(1) : [];

  return (
    <>
      {/* HERO MATCH */}
      <section className="relative min-h-[600px] overflow-hidden bg-black flex items-end">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover opacity-75" src={heroMatch ? getSportBanner(heroMatch.sport).replace('w=800', 'w=1600') : "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80"} alt={heroMatch ? `${heroMatch.sport} environment` : "Live stadium environment"} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 pb-16 pt-40 w-full">
          {heroMatch ? (
            <>
              <div className="flex items-center gap-3 mb-5">
                <span className="live-gradient text-white px-4 py-1.5 rounded-sm font-label text-xs tracking-widest uppercase flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-white pulse-dot"></span> Live Now
                </span>
                <span className="text-white/60 font-label text-xs uppercase tracking-widest">{heroMatch.league || heroMatch.sport}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <TeamLogoFallback logo={heroMatch.home_logo} teamName={heroMatch.home_team} imgClass="w-14 h-14 object-contain bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10" textClass="w-14 h-14 bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center text-white font-headline font-black text-xl" />
                    <TeamLogoFallback logo={heroMatch.away_logo} teamName={heroMatch.away_team} imgClass="w-14 h-14 object-contain bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10" textClass="w-14 h-14 bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center text-white font-headline font-black text-xl" />
                  </div>
                  <h1 className="text-white font-headline text-5xl md:text-7xl font-black italic uppercase leading-[0.88] tracking-tighter mb-5">
                    {heroMatch.home_team}<br /><span className="text-red-500">vs</span> {heroMatch.away_team}
                  </h1>
                  <div className="flex items-center gap-8 text-white mt-6">
                    <div className="flex flex-col">
                      <span className="text-5xl font-black font-headline text-red-500">{heroMatch.score || "0 - 0"}</span>
                      <span className="text-xs uppercase font-label tracking-widest text-white/50">Current Score</span>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold font-headline">{heroMatch.elapsed || "LIVE"}</span>
                      <span className="text-xs uppercase font-label tracking-widest text-white/50">Time Elapsed</span>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold font-headline flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500">visibility</span> {formatViewers(heroMatch.viewers)}
                      </span>
                      <span className="text-xs uppercase font-label tracking-widest text-white/50">Watching Now</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button onClick={() => handleWatchStream(heroMatch)} disabled={loadingStreamId === heroMatch.id} className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-headline font-bold text-lg uppercase transition-all active:scale-95 flex items-center gap-3 rounded-lg disabled:opacity-70 disabled:cursor-wait">
                      {loadingStreamId === heroMatch.id ? 'Finding Stream...' : 'Watch Stream'} <span className="material-symbols-outlined">{loadingStreamId === heroMatch.id ? 'hourglass_empty' : 'play_circle'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-white/70 py-10 font-headline text-2xl uppercase font-black">
              No live matches matching filters
            </div>
          )}
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-surface-container-low sticky top-[72px] z-40 border-b border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {dynamicSports.map(sport => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-5 py-2 rounded-md font-label text-sm whitespace-nowrap transition-all font-bold ${
                  selectedSport === sport
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {sport === 'Formula-1' ? 'F1' : sport}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-label uppercase text-on-surface-variant font-bold tracking-widest">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-surface-container-highest border-none font-label text-sm focus:ring-0 cursor-pointer rounded-lg px-3 py-2 text-on-surface"
            >
              <option value="Global">Global</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Asia Pacific">Asia Pacific</option>
            </select>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-2 h-2 rounded-full bg-red-600 pulse-dot"></div>
              <span className="text-red-600 font-bold text-xs uppercase tracking-widest font-label">
                {filteredMatches.length} Live Events
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MATCH GRID */}
      <section className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">Stream Arena</h2>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mt-1">Active matches sorted by global viewership</p>
          </div>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="py-24 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/40 mb-3">sports_score</span>
            <h3 className="font-headline text-2xl font-black uppercase tracking-tight">No Match Found</h3>
            <p className="text-on-surface-variant font-body text-sm mt-1 max-w-md mx-auto">There are no live broadcasts matching the selected sport or region at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroMatch && (
              <div key={heroMatch.id} className="lg:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <img className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110" src={getSportBanner(heroMatch.sport)} alt={heroMatch.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                  
                  {/* Dynamic Interactive Score Board Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-8 px-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-md">
                        <TeamLogoFallback logo={heroMatch.home_logo} teamName={heroMatch.home_team} imgClass="w-full h-full object-contain" textClass="text-white font-headline font-black text-xl" />
                      </div>
                      <span className="text-white text-xs font-label uppercase tracking-wider font-bold max-w-[120px] text-center truncate">{heroMatch.home_team || "TBD"}</span>
                    </div>
                    
                    <div className="bg-red-600/90 text-white font-headline font-black px-4 py-2 rounded-lg text-3xl tracking-wide shadow-lg border border-red-500/20">
                      {heroMatch.score || "0 - 0"}
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-md">
                        <TeamLogoFallback logo={heroMatch.away_logo} teamName={heroMatch.away_team} imgClass="w-full h-full object-contain" textClass="text-white font-headline font-black text-xl" />
                      </div>
                      <span className="text-white text-xs font-label uppercase tracking-wider font-bold max-w-[120px] text-center truncate">{heroMatch.away_team || "TBD"}</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="live-gradient text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 rounded"><span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot"></span>Live</span>
                    <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 rounded"><span className="material-symbols-outlined text-xs">visibility</span> {formatViewers(heroMatch.viewers)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 onClick={() => handleWatchStream(heroMatch)} className="font-headline text-3xl font-black italic uppercase leading-none mb-1 group-hover:text-red-600 transition-colors cursor-pointer">{heroMatch.title}</h3>
                      <p className="text-xs font-label text-on-surface-variant tracking-widest uppercase">{heroMatch.league || heroMatch.sport}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-500/10 px-2.5 py-1 rounded inline-block">{heroMatch.elapsed || "LIVE"}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gridMatches.map((m) => (
              <div key={m.id} className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <img className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110" src={getSportBanner(m.sport)} alt={m.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                  
                  {/* Dynamic Score Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 px-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20 shadow-md">
                        <TeamLogoFallback logo={m.home_logo} teamName={m.home_team} imgClass="w-full h-full object-contain" textClass="text-white font-headline font-black text-xs" />
                      </div>
                      <span className="text-white text-[9px] font-label uppercase tracking-wider font-bold max-w-[80px] text-center truncate">{m.home_team || "TBD"}</span>
                    </div>
                    
                    <div className="bg-red-600/90 text-white font-headline font-black px-2.5 py-1 rounded text-lg tracking-wide shadow-md border border-red-500/20">
                      {m.score || "0 - 0"}
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20 shadow-md">
                        <TeamLogoFallback logo={m.away_logo} teamName={m.away_team} imgClass="w-full h-full object-contain" textClass="text-white font-headline font-black text-xs" />
                      </div>
                      <span className="text-white text-[9px] font-label uppercase tracking-wider font-bold max-w-[80px] text-center truncate">{m.away_team || "TBD"}</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="live-gradient text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 rounded"><span className="w-1 h-1 rounded-full bg-white pulse-dot"></span>Live</span>
                    <span className="bg-black/60 backdrop-blur-md text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 rounded"><span className="material-symbols-outlined text-[10px]">visibility</span> {formatViewers(m.viewers)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 onClick={() => handleWatchStream(m)} className="font-headline text-xl font-black italic uppercase leading-none truncate max-w-[180px] group-hover:text-red-600 transition-colors cursor-pointer">{m.title}</h3>
                  </div>
                  <p className="text-[10px] font-label text-on-surface-variant tracking-widest uppercase mb-3 line-clamp-1">{m.league || m.sport}</p>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-500/10 px-2 py-0.5 rounded">{m.elapsed || "LIVE"}</span>
                    <button onClick={() => handleWatchStream(m)} disabled={loadingStreamId === m.id} className="text-red-600 hover:text-red-700 font-headline font-bold text-xs uppercase flex items-center gap-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait">
                      {loadingStreamId === m.id ? 'Loading...' : 'Watch'} <span className="material-symbols-outlined text-sm">{loadingStreamId === m.id ? 'hourglass_empty' : 'play_arrow'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
