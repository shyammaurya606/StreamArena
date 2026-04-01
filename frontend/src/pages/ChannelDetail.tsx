

export default function ChannelDetail() {
  return (
    <div className="bg-surface text-on-surface font-body px-6 py-10 max-w-[1600px] mx-auto min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-xl bg-primary min-h-[380px] flex items-end p-8 md:p-12 mb-8 group">
        <div className="absolute inset-0 z-0">
          <img
            alt="Sports Studio"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-red-900/20 mix-blend-color-burn"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-2xl flex items-center justify-center p-4 shrink-0 border-4 border-white/10 relative overflow-hidden">
              <span className="font-headline font-black text-5xl md:text-6xl text-black tracking-tighter">ESPN</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white px-2.5 py-1 text-[10px] font-black font-label uppercase tracking-widest rounded-sm">
                  Network Giant
                </span>
                <span className="text-white/60 text-xs font-label tracking-widest uppercase">
                  Est. 1979
                </span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter max-w-3xl">
                Entertainment And<br />Sports Programming<br />Network
              </h1>
            </div>
          </div>
          <div className="flex gap-4 shrink-0">
            <button className="bg-[#ff291a] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/20">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span> Watch Live
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-wider border border-white/10 transition-all text-center leading-tight shadow-sm">
              Add<br/>To Favs
            </button>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* LEFT SIDEBAR (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Channel Profile */}
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline font-bold text-lg uppercase mb-6 tracking-wide">Channel Profile</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              ESPN is the global leader in sports broadcasting, providing comprehensive coverage of major leagues including NFL, NBA, MLB, and NHL. Known for its iconic SportsCenter news program and award-winning documentary series, ESPN defines the modern sports media landscape.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-surface-container-low text-[10px] font-label font-bold uppercase tracking-widest rounded">NFL</span>
              <span className="px-3 py-1.5 bg-surface-container-low text-[10px] font-label font-bold uppercase tracking-widest rounded">NBA</span>
              <span className="px-3 py-1.5 bg-surface-container-low text-[10px] font-label font-bold uppercase tracking-widest rounded">MLB</span>
              <span className="px-3 py-1.5 bg-surface-container-low text-[10px] font-label font-bold uppercase tracking-widest rounded">UFC</span>
              <span className="px-3 py-1.5 bg-surface-container-low text-[10px] font-label font-bold uppercase tracking-widest rounded">F1</span>
            </div>
          </div>

          {/* Global Availability */}
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline font-bold text-lg uppercase mb-6 tracking-wide">Global Availability</h2>
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
                  <span className="font-semibold text-sm">United States</span>
                </div>
                <span className="text-[10px] uppercase font-label text-on-surface-variant">Primary Hub</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
                  <span className="font-semibold text-sm">Canada</span>
                </div>
                <span className="text-[10px] uppercase font-label text-on-surface-variant">TSN Partnership</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
                  <span className="font-semibold text-sm">United Kingdom</span>
                </div>
                <span className="text-[10px] uppercase font-label text-on-surface-variant">BT Sport Affiliate</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
                  <span className="font-semibold text-sm">Australia</span>
                </div>
                <span className="text-[10px] uppercase font-label text-on-surface-variant">Foxtel / Kayo</span>
              </div>
            </div>
            <button className="w-full text-center font-label font-bold text-xs uppercase tracking-widest py-3 border-t border-outline-variant/20 hover:text-red-600 transition-colors">
              View All 42 Countries
            </button>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT (8 columns) */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm min-h-full">
            
            {/* Header + Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-outline-variant/10 pb-6">
              <h2 className="font-headline font-black text-2xl uppercase tracking-tighter">Today's Broadcast Schedule</h2>
              <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
                <button className="px-4 py-2 bg-primary text-white text-[10px] font-label font-bold uppercase tracking-wider rounded-md shadow-sm">Main Feed</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface text-[10px] font-label font-bold uppercase tracking-wider rounded-md transition-colors">ESPN 2</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface text-[10px] font-label font-bold uppercase tracking-wider rounded-md transition-colors">ESPN U</button>
              </div>
            </div>

            {/* Live Now Featured Card */}
            <div className="bg-primary text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center mb-10 relative overflow-hidden shadow-lg">
              {/* Subtle background glow */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
              
              <div className="w-full md:w-3/5 z-10 mb-6 md:mb-0 border-r border-white/10 md:pr-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500 font-label font-black text-[10px] uppercase tracking-[0.2em]">NBA Regular Season</span>
                </div>
                <h3 className="font-headline font-black text-3xl md:text-4xl uppercase tracking-tighter leading-none mb-6">
                  Lakers VS Warriors
                </h3>
                <div className="flex gap-6 text-[10px] font-label uppercase tracking-widest text-white/50 font-semibold">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">home</span> Chase Center, SF</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">mic</span> Comm: Mike Breen</span>
                </div>
              </div>
              
              <div className="w-full md:w-2/5 z-10 flex flex-col items-center justify-center pl-0 md:pl-8">
                <div className="bg-red-600/20 text-red-500 px-3 py-1 rounded-sm text-[10px] font-black font-label uppercase tracking-[0.2em] flex items-center gap-2 mb-6 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span> Live Now
                </div>
                <div className="flex items-center gap-8 md:gap-12 w-full justify-center">
                  <div className="text-center">
                    <span className="font-headline font-black text-4xl leading-none">102</span>
                    <span className="block text-[10px] font-label text-white/50 uppercase tracking-widest mt-2">LAL</span>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div className="text-center">
                    <span className="font-headline font-black text-4xl leading-none">105</span>
                    <span className="block text-[10px] font-label text-white/50 uppercase tracking-widest mt-2">GSW</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Schedule List */}
            <div className="space-y-2">
              {[
                { time: '11:30 PM', category: 'News & Analysis', title: 'SportsCenter With Scott Van Pelt' },
                { time: '01:00 AM', category: 'Talk Show', title: 'First Take: Debate Intensive' },
                { time: '03:00 AM', category: 'MLB Highlights', title: 'Baseball Tonight: Sunday Edition', highlight: true },
                { time: '05:00 AM', category: 'NFL Classic', title: '30 For 30: The 85 Bears' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${item.highlight ? 'bg-surface-container-low' : 'hover:bg-surface-container-low/50'} transition-colors cursor-pointer group`}>
                  <div className="flex items-center gap-8 w-full">
                    <span className="font-headline font-semibold text-sm w-20 shrink-0 select-none">{item.time}</span>
                    <div>
                      <span className={`text-[9px] font-label font-bold uppercase tracking-widest ${item.highlight ? 'text-secondary' : 'text-secondary/70'} block mb-1`}>{item.category}</span>
                      <h4 className="font-headline font-black text-base uppercase tracking-tight group-hover:text-red-600 transition-colors select-none">{item.title}</h4>
                    </div>
                  </div>
                  <button className="text-outline-variant hover:text-primary transition-colors p-2">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>notifications</span>
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* NETWORK AFFILIATES ROW */}
      <section className="mt-8 mb-10">
        <div className="border-l-4 border-red-600 pl-4 mb-8">
          <h2 className="font-headline font-black text-2xl uppercase tracking-tighter">Network Affiliates & Related</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { id: 'FS1', name: 'Fox Sports 1', subtitle: 'Live: NASCAR Qualifiers' },
            { id: 'CBS', name: 'CBS Sports', subtitle: 'UCL Final Coverage' },
            { id: 'SKY', name: 'Sky Sports Main', subtitle: 'Premier League Hub' },
            { id: 'TNT', name: 'TNT Sports', subtitle: 'NBA on TNT Crew' },
            { id: 'DAZ', name: 'DAZN Global', subtitle: 'Fight Night Pre-Show' },
          ].map((ch, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center font-headline font-black text-lg mb-4 text-on-surface uppercase select-none">
                  {ch.id}
                </div>
                <h4 className="font-headline font-black text-xs uppercase tracking-tight mb-1 group-hover:text-red-600 transition-colors">{ch.name}</h4>
                <p className="text-[9px] font-label text-on-surface-variant uppercase tracking-wider">{ch.subtitle}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-red-600 font-label font-bold text-[9px] uppercase tracking-widest">
                <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
                Watch
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
