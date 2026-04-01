import { useState, useEffect } from 'react';

const SPORT_FILTERS = [
  { name: 'All Sports', icon: 'grid_view', value: 'all' },
  { name: 'Football', icon: 'sports_soccer', value: 'football' },
  { name: 'AFL', icon: 'sports_rugby', value: 'afl' },
  { name: 'Baseball', icon: 'sports_baseball', value: 'baseball' },
  { name: 'Basketball', icon: 'sports_basketball', value: 'basketball' },
  { name: 'Cricket', icon: 'sports_cricket', value: 'cricket' },
  { name: 'Formula-1', icon: 'sports_motorsports', value: 'formula-1' },
  { name: 'Handball', icon: 'sports_handball', value: 'handball' },
  { name: 'Hockey', icon: 'sports_hockey', value: 'hockey' },
  { name: 'MMA', icon: 'sports_mma', value: 'mma' },
  { name: 'NBA', icon: 'sports_basketball', value: 'nba' },
  { name: 'NFL', icon: 'sports_football', value: 'nfl' },
  { name: 'Rugby', icon: 'sports_rugby', value: 'rugby' },
  { name: 'Volleyball', icon: 'sports_volleyball', value: 'volleyball' },
];

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
  time?: string;
  league?: string;
}

export default function Schedules() {
  const [schedules, setSchedules] = useState<Match[]>([]);
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState<'today' | 'tomorrow' | 'upcoming'>('today');

  useEffect(() => {
    let dateStr = '';
    const now = new Date();
    
    if (selectedDateFilter === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateStr = `?date=${tomorrow.toISOString().split('T')[0]}`;
    } else if (selectedDateFilter === 'upcoming') {
      dateStr = `?date=upcoming`;
    } else {
      dateStr = `?date=${now.toISOString().split('T')[0]}`;
    }
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    fetch(`${API_BASE_URL}/api/schedules${dateStr}`)
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(console.error);
  }, [selectedDateFilter]);

  const filteredSchedules = schedules.filter(m => {
    const s = m.sport?.toLowerCase() || '';
    const matchSport = selectedSport === "all" || s === selectedSport.toLowerCase();
    const isSearchMatch = searchQuery === "" || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.includes(searchQuery.toLowerCase()) || 
      (m.league && m.league.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSport && isSearchMatch;
  });

  return (
    <>
      <section className="px-6 py-10 max-w-screen-2xl mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-primary min-h-[280px] flex items-end p-8 md:p-12">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8MvMmmX5A6n6__jiZptkpbZSGAR8JHUMOZonGi_xaTmgFt2UtD7DIaUmc5qpFtv_1JD2xmipKB5uAiiRTNcVsFeUGH1Eol7fVG0TGnXq0qFKHTXTsPshuDZG5YUJ_5-8TGFeMDKUbaTc4BUPFlk5nq6zRxBETbY1Eot1uDLl3y6esBLuk-dLqQcYCCgEcc5hr3ZT3ZOHMaY637D3D5ktyOQWsWZvt43PTgR7XsLSNnKyNvz6g2ZGuPTqOJYDP1Lnz6xw5xQP2YVw" alt="Stadium" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-red-600 text-white font-label text-xs uppercase tracking-widest mb-4 rounded-sm">Programming Guide</span>
            <h1 className="text-4xl md:text-6xl font-headline font-black text-white leading-none tracking-tighter uppercase mb-4">
              Upcoming Match <br /><span className="text-red-500">Schedule</span>
            </h1>
            <p className="text-white/60 font-body text-base max-w-xl">Your definitive directory for the week's most anticipated sporting events across the globe.</p>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container-high">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 space-y-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedDateFilter('today')}
              className={`px-5 py-2 rounded-full font-headline text-sm font-bold uppercase transition-all whitespace-nowrap ${selectedDateFilter === 'today' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setSelectedDateFilter('tomorrow')}
              className={`px-5 py-2 rounded-full font-headline text-sm font-bold uppercase transition-all whitespace-nowrap ${selectedDateFilter === 'tomorrow' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
            >
              Tomorrow
            </button>
            <button 
              onClick={() => setSelectedDateFilter('upcoming')}
              className={`px-5 py-2 rounded-full font-headline text-sm font-bold uppercase transition-all whitespace-nowrap ${selectedDateFilter === 'upcoming' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
            >
              Upcoming Week
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 pb-1">
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant mr-2 shrink-0">Filter By:</span>
              {SPORT_FILTERS.map((s) => (
                <button 
                  key={s.value}
                  onClick={() => setSelectedSport(s.value)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-body text-sm transition-all whitespace-nowrap ${selectedSport === s.value ? 'bg-surface-container-highest text-primary font-semibold border border-primary/10' : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-sm">{s.icon}</span> {s.name}
                </button>
              ))}
            </div>
            {/* <div className="relative shrink-0 w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search teams or sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-1.5 pl-9 pr-4 text-sm text-on-surface font-body outline-none placeholder:text-on-surface-variant transition-all"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* SCHEDULE LIST */}
      <section className="px-6 max-w-screen-2xl mx-auto py-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight whitespace-nowrap">Today's Primetime</h2>
            <div className="h-px flex-grow bg-surface-container-high"></div>
          </div>

          {filteredSchedules.map((m) => {
            const isLive = m.status === 'live' || m.status === '1H' || m.status === '2H' || m.status === 'HT';

            return (
              <div key={m.id} className="group relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch hover:bg-surface-container-low transition-all shadow-sm">
                <div className="w-full md:w-44 bg-surface-container-low flex flex-col items-center justify-center p-6 border-r border-surface-container-high/50">
                  <span className={isLive ? "text-red-600 font-headline text-3xl font-black leading-none mb-1" : "text-on-surface font-headline text-3xl font-black leading-none mb-1"}>
                    {m.time || "TBD"}
                  </span>
                  <span className="text-on-surface-variant font-label text-xs uppercase tracking-tighter">Local Time</span>
                  {isLive && (
                    <div className="mt-3 px-2 py-0.5 bg-red-600 text-white text-[9px] font-black uppercase rounded pulse-dot">Live Now</div>
                  )}
                </div>
                <div className="flex-grow p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="flex -space-x-3">
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border-4 border-surface-container-lowest overflow-hidden">
                        <img className="w-9 h-9 object-contain" src={m.home_logo || "https://lh3.googleusercontent.com/aida-public/AB6AXuDm0jWbEyfiHzQuyyv_fWxFwlmI1ocsfW1D9Bhe-q6I35_M9g5rqm5PQQdNmquzddlYqMd51mwHSSrrDzoPJ3XyyMY-IzyBB_eValQCFFE9eeycA_ONV1YCNw9aI6t_JCGX1yW7JIoUx2B4eLzYZtgppfR9OjNV5yTNahs3I8CgVFjuUlZe_Z4yZMQ6Ruw_xhRVJd1o5gSEY6QlPBZ9AaGFIfsVLH-zrU7QArp0UUmd5NhkGkZ4_WeqyqCQiMQYg3XNGt4I8FefC5I"} alt={m.home_team} />
                      </div>
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border-4 border-surface-container-lowest overflow-hidden">
                        <img className="w-9 h-9 object-contain" src={m.away_logo || "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzztIgHNV37HbsLHtzGC790PG50ILShloPwjm1siOX07QdYZGepsSzqStGWe7D_gZ18riSAFm7duCxcTbDXaWp2dvWe-jom8b50jq7xllf806mc8VHJI-Ks_e7ehyBu0v-zeb1pbhoUVrB3uOGbrkRnzM3JxpuESyWbmUxMukeh4YSMEx4-OpaWSCKv5rAgsyKeiLPKCElPse6_IGPpmzIH_k-Li8C2QZBo-Lp3tEHqwr5afPgVorMqvGAhplG6efIo-ZbjqiD-w"} alt={m.away_team} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`material-symbols-outlined ${m.sport.toLowerCase() === 'basketball' ? 'text-secondary' : 'text-red-600'} text-base`}>
                          {m.sport.toLowerCase() === 'basketball' ? 'sports_basketball' : 'sports_soccer'}
                        </span>
                        <span className="text-xs font-label uppercase text-on-surface-variant tracking-wider">{m.league || m.sport}</span>
                      </div>
                      <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{m.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-3">
                    {isLive ? (
                      <>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-primary text-white font-headline text-[10px] font-bold uppercase rounded">KINETIC 1 HD</span>
                        </div>
                        <button className="px-6 py-2 bg-red-600 text-white font-headline text-xs font-bold uppercase rounded-lg hover:bg-red-700 transition-all active:scale-95">Watch Match</button>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-headline text-[10px] font-bold uppercase rounded">ESPN+</span>
                        </div>
                        <button className="px-6 py-2 bg-surface-container-high text-on-surface font-headline text-xs font-bold uppercase rounded-lg hover:bg-surface-container-highest transition-all">Set Reminder</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
