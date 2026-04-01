import { Link } from "react-router-dom";

export default function Directory() {
  return (
    <div className="flex max-w-screen-2xl mx-auto min-h-screen">
      {/* SIDEBAR */}
      <aside className="hidden md:block w-64 shrink-0 px-6 py-8 sticky top-[72px] self-start">
        <h2 className="font-headline text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4 px-3">Continents</h2>
        <nav className="space-y-1">
          <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label text-sm transition-all group" href="#">
            <span className="material-symbols-outlined text-lg">public</span><span>Europe</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label text-sm transition-all group" href="#">
            <span className="material-symbols-outlined text-lg">south_america</span><span>Americas</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary text-white font-label text-sm shadow-sm" href="#">
            <span className="material-symbols-outlined text-lg">language</span><span>Asia &amp; Pacific</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label text-sm transition-all group" href="#">
            <span className="material-symbols-outlined text-lg">explore</span><span>Africa</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label text-sm transition-all group" href="#">
            <span className="material-symbols-outlined text-lg">travel_explore</span><span>Middle East</span>
          </a>
        </nav>
        <div className="mt-6 border-t border-outline-variant/20 pt-6">
          <h2 className="font-headline text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4 px-3">Favorite Sports</h2>
          <nav className="space-y-1">
            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label text-sm transition-all" href="#">
              <span className="material-symbols-outlined text-lg">sports_soccer</span><span>Football</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-xl bg-red-600/10 text-red-600 font-label text-sm" href="#">
              <span className="material-symbols-outlined text-lg">sports_cricket</span><span>Cricket</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-red-600 pulse-dot"></span>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-label text-sm transition-all" href="#">
              <span className="material-symbols-outlined text-lg">sports_motorsports</span><span>Motorsports</span>
            </a>
          </nav>
        </div>
        <div className="mt-8 p-5 rounded-xl bg-surface-container-low border border-outline-variant/10">
          <h3 className="font-headline text-sm font-bold uppercase mb-2">Pro Access</h3>
          <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">Unlock HD streams and 4K multi-view recording.</p>
          <button className="w-full bg-primary text-white font-headline text-xs font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity uppercase">UPGRADE NOW</button>
        </div>
      </aside>

      {/* MAIN */}
      <section className="flex-grow px-4 md:px-12 py-8 bg-surface-container-low md:rounded-tl-3xl">
        <div className="max-w-5xl">
          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <span className="font-label text-xs font-bold text-red-600 bg-red-600/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Directory</span>
                <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter text-on-surface uppercase">GLOBAL CHANNELS</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full font-label text-xs font-bold hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-base">filter_list</span> FILTER BY SPORT
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-label text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-base">sports_cricket</span> CRICKET
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>
            <p className="font-body text-on-surface-variant text-base">Showing premium broadcasters for <span className="text-on-surface font-bold">Cricket</span> in <span className="text-on-surface font-bold">Asia &amp; Pacific</span>.</p>
          </header>

          {/* CHANNELS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* India (Expanded) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-surface-container-lowest rounded-xl p-7 ring-2 ring-primary relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-7">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-14 rounded-lg overflow-hidden shadow-sm border border-outline-variant/20 flex-shrink-0">
                    <img src="https://flagcdn.com/in.svg" alt="India" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold tracking-tight">India</h3>
                    <p className="font-label text-xs text-on-surface-variant">4 Cricket Channels Active</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 font-label text-sm font-bold text-on-surface hover:text-red-600 transition-colors">
                  View All <span className="material-symbols-outlined">expand_less</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/channel/star-sports-1" className="block p-4 rounded-xl bg-surface-container-low border-l-4 border-red-600 hover:bg-surface-container-high transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 pulse-dot"></span>Live Now
                    </span>
                    <span className="material-symbols-outlined text-lg text-outline-variant group-hover:text-primary transition-colors">star</span>
                  </div>
                  <h4 className="font-headline font-bold text-base mb-1">Star Sports 1 Hindi</h4>
                  <p className="text-xs text-on-surface-variant">IPL: Mumbai Indians vs CSK</p>
                </Link>
                <Link to="/channel/jiocinema" className="block p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label text-[10px] font-black uppercase text-on-surface-variant tracking-widest">4K Ultra</span>
                    <span className="material-symbols-outlined text-lg text-outline-variant group-hover:text-primary transition-colors">star</span>
                  </div>
                  <h4 className="font-headline font-bold text-base mb-1">JioCinema 4K</h4>
                  <p className="text-xs text-on-surface-variant">T20 World Cup Warm-ups</p>
                </Link>
                <Link to="/channel/sony-sports" className="block p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label text-[10px] font-black uppercase text-on-surface-variant tracking-widest">Premium</span>
                    <span className="material-symbols-outlined text-lg text-outline-variant group-hover:text-primary transition-colors">star</span>
                  </div>
                  <h4 className="font-headline font-bold text-base mb-1">Sony Sports Ten 1</h4>
                  <p className="text-xs text-on-surface-variant">India Tour of Australia Highlights</p>
                </Link>
                <Link to="/channel/fancode" className="block p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label text-[10px] font-black uppercase text-on-surface-variant tracking-widest">Digital</span>
                    <span className="material-symbols-outlined text-lg text-outline-variant group-hover:text-primary transition-colors">star</span>
                  </div>
                  <h4 className="font-headline font-bold text-base mb-1">FanCode</h4>
                  <p className="text-xs text-on-surface-variant">Domestic Ranji Trophy Finals</p>
                </Link>
              </div>
            </div>

            {/* Australia */}
            <div className="bg-surface-container-lowest rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm border border-outline-variant/10 group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-10 rounded overflow-hidden shadow-sm flex-shrink-0 border border-outline-variant/10">
                  <img src="https://flagcdn.com/au.svg" alt="Australia" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold tracking-tight">Australia</h3>
                  <p className="font-label text-[10px] text-on-surface-variant uppercase">2 Cricket Channels</p>
                </div>
              </div>
              <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <Link to="/channel/fox-cricket" className="flex justify-between items-center text-sm border-b border-surface-container-high pb-2 hover:text-red-600 transition-colors">
                  <span className="font-medium">Fox Cricket</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                </Link>
                <Link to="/channel/channel7-sport" className="flex justify-between items-center text-sm pb-2 hover:text-red-600 transition-colors">
                  <span className="font-medium">Channel 7 Sport</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                </Link>
              </div>
            </div>

            {/* Pakistan */}
            <div className="bg-surface-container-lowest rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm border border-outline-variant/10 group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-10 rounded overflow-hidden shadow-sm flex-shrink-0 border border-outline-variant/10">
                  <img src="https://flagcdn.com/pk.svg" alt="Pakistan" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold tracking-tight">Pakistan</h3>
                  <p className="font-label text-[10px] text-on-surface-variant uppercase">2 Cricket Channels</p>
                </div>
              </div>
              <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <Link to="/channel/ptv-sports" className="flex justify-between items-center text-sm border-b border-surface-container-high pb-2 hover:text-red-600 transition-colors">
                  <span className="font-medium">PTV Sports</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                </Link>
                <Link to="/channel/ten-sports-pk" className="flex justify-between items-center text-sm pb-2 hover:text-red-600 transition-colors">
                  <span className="font-medium">Ten Sports PK</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                </Link>
              </div>
            </div>

            {/* New Zealand */}
            <div className="bg-surface-container-lowest rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm border border-outline-variant/10 group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-10 rounded overflow-hidden shadow-sm flex-shrink-0 border border-outline-variant/10">
                  <img src="https://flagcdn.com/nz.svg" alt="New Zealand" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold tracking-tight">New Zealand</h3>
                  <p className="font-label text-[10px] text-on-surface-variant uppercase">1 Cricket Channel</p>
                </div>
              </div>
              <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <Link to="/channel/sky-sport-nz" className="flex justify-between items-center text-sm pb-2 hover:text-red-600 transition-colors">
                  <span className="font-medium">Sky Sport NZ</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                </Link>
              </div>
            </div>
          </div>

          {/* GLOBAL NETWORK PARTNERS */}
          <div className="mt-20 mb-10">
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-7">GLOBAL NETWORK PARTNERS</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Link to="/channel/bein-sports" className="md:col-span-2 bg-primary p-8 rounded-2xl flex flex-col justify-between min-h-[260px] relative overflow-hidden group hover:-translate-y-1 transition-all">
                <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="z-10">
                  <span className="font-label text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-3 block">Official Partnership</span>
                  <h3 className="font-headline text-3xl text-white font-bold leading-none mb-3">beIN Media Group</h3>
                  <p className="text-white/60 max-w-xs leading-relaxed text-sm">Access 15 channels across 3 continents with a single Kinetic ID subscription.</p>
                </div>
                <button className="z-10 w-fit px-6 py-2.5 bg-white text-primary rounded-full font-headline text-sm font-bold active:scale-95 transition-all mt-6">Explore Network</button>
              </Link>
              <Link to="/channel/supersort" className="bg-surface-container-highest p-7 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined text-4xl text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>sports_soccer</span>
                <div>
                  <h4 className="font-headline text-lg font-bold mb-1">Supersport</h4>
                  <p className="text-xs text-on-surface-variant">Sub-Saharan Africa's premier sports broadcaster.</p>
                </div>
              </Link>
              <Link to="/channel/willow-tv" className="bg-surface-container-highest p-7 rounded-2xl flex flex-col justify-between border-2 border-primary hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined text-4xl text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>sports_cricket</span>
                <div>
                  <h4 className="font-headline text-lg font-bold mb-1">Willow TV</h4>
                  <p className="text-xs text-on-surface-variant">The leading cricket broadcaster in North America.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
