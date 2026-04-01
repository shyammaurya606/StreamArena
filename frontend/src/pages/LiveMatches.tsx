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
}

const formatViewers = (count: number) => {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
  return count.toString();
};

export default function LiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    fetch(`${API_BASE_URL}/api/matches/live`)
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(console.error);
  }, []);

  const heroMatch = matches.length > 0 ? matches[0] : null;
  const gridMatches = matches.length > 1 ? matches.slice(1) : [];


  return (
    <>
      {/* HERO MATCH */}
      <section className="relative min-h-[600px] overflow-hidden bg-black flex items-end">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover opacity-55" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJpvZhaI-gkuzpqDrey8LEdhc8GbyQjiUTOnwmG2F-_MSZ7czA8O9hYwXvO1nNadraclUhfNAHesIeR8LjB1NIlAaOO5BsJtjOaw_vQKskFL6rKORF2QlmUkELHpKChLAyOPTeZe7LqgRQudKdQ3XqFxk9yfFdeB2sJZEAKHhpk4oOWcVuKRcVKhChkkPnwNStI1xTzMQAzrtoBPMNeoHMyP7ACqx6KDzh0oRtg3oqaTpCh0OHV5xK9AHbE91xFTlunQYl9XX547w" alt="Champion League stadium" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 pb-16 pt-40 w-full">
          {heroMatch && (
            <>
              <div className="flex items-center gap-3 mb-5">
                <span className="live-gradient text-white px-4 py-1.5 rounded-sm font-label text-xs tracking-widest uppercase flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-white pulse-dot"></span> Live Now
                </span>
                <span className="text-white/60 font-label text-xs uppercase tracking-widest">{heroMatch.league || heroMatch.sport}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                <div>
                  <h1 className="text-white font-headline text-5xl md:text-7xl font-black italic uppercase leading-[0.88] tracking-tighter mb-5">
                    {heroMatch.home_team}<br /><span className="text-red-500">vs</span> {heroMatch.away_team}
                  </h1>
                  <div className="flex items-center gap-8 text-white mt-6">
                    <div className="flex flex-col">
                      <span className="text-5xl font-black font-headline">{heroMatch.score || "0 - 0"}</span>
                      <span className="text-xs uppercase font-label tracking-widest text-white/50">Current Score</span>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold font-headline">{heroMatch.elapsed || "-"}</span>
                      <span className="text-xs uppercase font-label tracking-widest text-white/50">Minutes</span>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold font-headline flex items-center gap-2"><span className="material-symbols-outlined text-red-500">visibility</span> {formatViewers(heroMatch.viewers)}</span>
                      <span className="text-xs uppercase font-label tracking-widest text-white/50">Watching Now</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-headline font-bold text-lg uppercase transition-all active:scale-95 flex items-center gap-3 rounded-lg">
                      Watch Stream <span className="material-symbols-outlined">play_circle</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-surface-container-low sticky top-[72px] z-40 border-b border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="bg-primary text-white px-5 py-2 rounded-md font-label text-sm whitespace-nowrap font-bold">All Sports</button>
            <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Football</button>
            <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Basketball</button>
            <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Tennis</button>
            <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Cricket</button>
            <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Motorsports</button>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-label uppercase text-on-surface-variant font-bold tracking-widest">Region:</span>
            <select className="bg-surface-container-highest border-none font-label text-sm focus:ring-0 cursor-pointer rounded-lg px-3 py-2">
              <option>Global</option>
              <option>Europe</option>
              <option>North America</option>
              <option>Asia Pacific</option>
            </select>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-2 h-2 rounded-full bg-red-600 pulse-dot"></div>
              <span className="text-red-600 font-bold text-xs uppercase tracking-widest font-label">14 Live Events</span>
            </div>
          </div>
        </div>
      </section>

      {/* MATCH GRID */}
      <section className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">Velocity Grid</h2>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mt-1">Active matches sorted by global viewership</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridMatches.map((m, index) => {
            if (index === 0) {
              return (
                <div key={m.id} className="lg:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={m.home_logo || "https://lh3.googleusercontent.com/aida-public/AB6AXuBK3AygP9Og9B6xVlVhc6hAMlxARzggbpaxkGvPlmyLQNKWnc7hU54ZFV3tg2yhgVC58rhV_6VegacHnLD9JZCpXis2uhITtooL7U9Vqi80NvpehvNyv5bN2ZG_3kahIxQrh7v63SaVlvE4yyrAjcCFV1Li-oWG7nkt56ItNJaylR0PeVr5u8bnEUwPcz4EVrNu6HSGUae6bxSuf63HJMwyP-tAB5x60mfhURk8TuOpahaTqGg3V4zHGmavbhOlqGSxhtI5if6lB_0"} alt={m.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="live-gradient text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot"></span>Live</span>
                      <span className="bg-black/40 backdrop-blur-md text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-xs">visibility</span> {formatViewers(m.viewers)}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-headline text-3xl font-black italic uppercase leading-none mb-1">{m.title}</h3>
                        <p className="text-xs font-label text-on-surface-variant tracking-widest uppercase">{m.league || m.sport}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black font-headline text-red-600">{m.score || "0 - 0"}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{m.elapsed || "LIVE"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={m.id} className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={m.away_logo || "https://lh3.googleusercontent.com/aida-public/AB6AXuBhHZMihCkMR1ToB-Iv0KG_ge219S4Ex2pV_CDHMZQvQam4CHxWshcL61ME0UIb4SAuRX_SQtp1kl-b8mB7Th_9NaCsVL-JgPieG-EngACupuBES771zjmqdWp4kLIcOfgfzwSwFqolTXDFqWXFO7K8AeqDcVtfEHMvIqdWVCpMC9UiYJzcAUq8uZEmGGVGpxMa_aQYjI3r5PqAaf3rJxBkovGpa8eLqEll-_c582OaPTUmK_C4SX31Yqqvn7aVfyk1I3gwpIUIZIw"} alt={m.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="live-gradient text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot"></span>Live</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-headline text-2xl font-black italic uppercase leading-none truncate max-w-[200px]">{m.title}</h3>
                    <span className="bg-surface-container text-on-surface-variant px-2 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 rounded shrink-0"><span className="material-symbols-outlined text-xs">visibility</span> {formatViewers(m.viewers)}</span>
                  </div>
                  <p className="text-xs font-label text-on-surface-variant tracking-widest uppercase mb-3 line-clamp-1">{m.league || m.sport}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10">
                    <div className="text-xl font-black font-headline truncate max-w-[120px]">{m.score || "0 - 0"}</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 shrink-0">{m.elapsed || "LIVE"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <button className="bg-surface-container-low hover:bg-surface-container-high text-on-surface px-12 py-4 font-headline font-bold uppercase tracking-widest transition-all border border-outline-variant/20 rounded-lg">
            Load More Events
          </button>
        </div>
      </section>
    </>
  );
}
