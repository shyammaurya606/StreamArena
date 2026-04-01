import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="px-6 py-10 max-w-screen-2xl mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-primary min-h-[560px] flex items-center px-8 md:px-16">
          <div className="absolute inset-0 z-0">
            <img
              alt="Sports Broadcast"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              src="/hero-arena.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full live-gradient text-on-primary font-label text-xs mb-6 tracking-widest uppercase font-bold gap-2">
              <span className="w-2 h-2 rounded-full bg-white pulse-dot"></span>
              Live: Champions League Finals
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black text-white leading-[0.88] tracking-tighter mb-6 uppercase italic">
              STREAM<br />ARENA
            </h1>
            <p className="text-lg text-white/70 font-body mb-8 max-w-md leading-relaxed">
              The ultimate directory for global sports broadcasting. Every game, every channel, zero clutter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/live" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-headline font-bold text-base uppercase tracking-wider active:scale-95 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">sensors</span> Live Now
              </Link>
              <Link to="/schedules" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-headline font-bold text-base uppercase tracking-wider hover:bg-white/20 transition-all">
                View Schedule
              </Link>
            </div>
          </div>
          {/* Live match ticker */}
          <div className="absolute right-8 bottom-8 hidden lg:flex flex-col gap-3 z-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span>
                <span className="text-[10px] font-label uppercase tracking-widest text-white/60">Live Match</span>
              </div>
              <div className="font-headline text-white font-black text-lg leading-tight uppercase">Real Madrid<br /><span className="text-red-400">vs</span> Liverpool</div>
              <div className="text-2xl font-black text-white font-headline mt-1">3 – 2 <span className="text-sm font-normal text-white/50">78'</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span>
                <span className="text-[10px] font-label uppercase tracking-widest text-white/60">Live Match</span>
              </div>
              <div className="font-headline text-white font-black text-lg leading-tight uppercase">Lakers<br /><span className="text-red-400">vs</span> Warriors</div>
              <div className="text-2xl font-black text-white font-headline mt-1">112 – 108 <span className="text-sm font-normal text-white/50">Q4</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="px-6 py-10 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-headline font-black tracking-tighter uppercase">Trending Now</h2>
            <div className="h-1 w-16 bg-red-600 mt-2 rounded-full"></div>
          </div>
          <Link to="/live" className="text-red-600 font-label font-bold uppercase text-xs flex items-center gap-1 hover:gap-2 transition-all">
            View All <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img alt="Manchester Derby" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyN2r0WUIP3hx2EpJ78xDcOrPhHJFjIOUB2nfmBazP1V3eIjc31Z8PGmfXowwR1t1hEow4i4-8t5kXaBDul5JLBLFqqr-XIlf1y5AMEl4LJYqlA9GSdQAofSrlGdfd35dNRbdmOh3RAM1Ce2p-ejPnzo288MFOv-17CigHNO8KaAcJaHJdlXNHr0JC7JVGOZ0JB3PUaDPC9_F0HiKCoB3dA2AEKEQCG5CZS7pZoRf96WQZjPh5HR5tbqcy2L6I8JrIOvgmbV97nWk" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="live-gradient text-white px-2.5 py-1 rounded text-[10px] font-black uppercase font-label tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot"></span>Live</span>
                <span className="bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded text-[10px] font-black uppercase font-label">4K Ultra HD</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-red-600 font-label font-bold text-xs uppercase tracking-widest">Premier League</span>
                  <h3 className="text-2xl md:text-3xl font-headline font-bold mt-1 group-hover:text-red-600 transition-colors">Manchester Derby: Live from Etihad</h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-on-surface-variant font-label text-[10px] uppercase tracking-wider">Watching</p>
                  <p className="text-2xl font-headline font-black text-primary">1.2M</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link to="/live" className="flex-1 bg-primary rounded-xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 shadow-sm relative overflow-hidden">
              <img alt="NBA" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" src="/nba-card.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-red-400 font-label font-bold text-[10px] uppercase tracking-widest">NBA Basketball</span>
                <h4 className="text-xl font-headline font-bold mt-1 text-white group-hover:text-red-600 transition-colors">Lakers vs Warriors</h4>
              </div>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <div className="text-2xl font-black font-headline text-white">112 <span className="text-white/60 text-base font-normal">–</span> 108</div>
                <span className="font-label font-bold text-white/70 text-sm">Q4 04:12</span>
              </div>
            </Link>
            <Link to="/live" className="flex-1 bg-primary rounded-xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 shadow-sm relative overflow-hidden">
              <img alt="Formula 1" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" src="/f1-card.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-red-400 font-label font-bold text-[10px] uppercase tracking-widest">Formula 1</span>
                <h4 className="text-xl font-headline font-bold mt-1 text-white group-hover:text-red-600 transition-colors">Monaco Grand Prix Practice</h4>
              </div>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <span className="material-symbols-outlined text-red-500">podium</span>
                <span className="font-headline font-bold text-white/70 text-sm">LIVE HD</span>
              </div>
            </Link>
            <div className="flex-1 bg-red-600 text-white rounded-xl p-6 flex items-center justify-center text-center">
              <div>
                <p className="font-headline font-black text-xl uppercase tracking-tighter">Stream Arena Pro</p>
                <p className="text-xs font-label uppercase mt-1 opacity-80">Unlock 20+ Premium Channels</p>
                <button className="mt-4 bg-white text-red-600 px-6 py-2 rounded-full font-headline font-bold uppercase text-xs hover:scale-105 transition-transform">Upgrade Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-4xl font-headline font-black tracking-tighter uppercase">Browse by Schedule</h2>
            <p className="text-on-surface-variant mt-2 font-body">Filter through our massive database of sports broadcasts worldwide.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="col-span-2 row-span-2 bg-surface-container-lowest rounded-xl overflow-hidden group relative min-h-[280px]">
              <img alt="Football" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvbxJ0CLMI0UEhJF-9_E-qW5CPUfv87H64mQigd5mNPovfKXeqCByuo1CVHzNcpjnwhwu3uZ_xmMIlpTJnmNtNXY81036uFQKqiHi510mKXkJtqMFD1WhDkPKoje4EgTSPs__qT0YMhZ8QN-RJLa11KDYqEYq3Mqg1_oH2YHwK_TGsALoFFWv3lOg2vxfDtHRGvnkNLk0JKJ9RRQhM950Z5zhItJLqifcVTMfS5DwJimOgJlcH-UStfTMpACxpfU7f-un2oeDfZRk" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white font-headline font-black text-3xl uppercase italic">Football</h3>
                <p className="text-white/70 font-label text-xs uppercase tracking-widest">482 Channels</p>
              </div>
            </div>
            <div className="col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden group relative h-36">
              <img alt="Basketball" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXfH_QbHSPLf-9WjaOg2tmjamaIf-m1Mm-YY22_-vF-31lnHXafZI7hawt83CPimuk3UPpHp1BtTdtsftnHI5EZ5H8s1g2vEfsXSJOQg51FRBEdF_J3oNupJcLoo24r77KnHpdGFEjOhYNGmt-sXpIVuqgUvqS5_VGRrXaeVFFoXc5gBkwIkqe2utQnna_oZOhFmcqMSECO2TL2jdh2wFZ4vd68eWOzLT6g6MVtCYEcYSoZCicdJ_rNQJiME2fQaVbX_fOcdNAsbI" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4"><h3 className="text-white font-headline font-bold text-lg uppercase italic">Basketball</h3></div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group relative h-36 sm:h-full min-h-[144px]">
              <img alt="Tennis" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4"><h3 className="text-white font-headline font-bold text-lg uppercase italic">Tennis</h3></div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group relative h-36 sm:h-full min-h-[144px]">
              <img alt="Cricket" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4"><h3 className="text-white font-headline font-bold text-lg uppercase italic">Cricket</h3></div>
            </div>
            <div className="col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden group relative h-36">
              <img alt="Motorsports" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2hs7M-I1-WaFgBzo2AHAnNXZPeiCkpuzRvacXiscfgnSAMQ4Gzy4WY0VU3ldV256Nsr_vY8dJ8f7mFKayadzViX5MGqyGe_IDVcJ1IAcn6xq5knUdnjkY-6HqEh_qn8FpNkUqwGP77Rz_knKit0zoe067lpsvUZSKvX2etVGKsAzxK2jWViiJv10u2LeOeAirMWruHhmypyITbQgjZbclFyzhPgoauBYRcg3VQKIIXBkXBoNWCB1Od-tmAozGQ8RDkosTL_NyETU" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4"><h3 className="text-white font-headline font-bold text-lg uppercase italic">Motorsports</h3></div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group relative h-36 sm:h-full min-h-[144px]">

             <img alt="Golf" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=500&q=80" />


              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4"><h3 className="text-white font-headline font-bold text-lg uppercase italic">Golf</h3></div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group relative h-36 sm:h-full min-h-[144px]">
              <img alt="Boxing" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4"><h3 className="text-white font-headline font-bold text-lg uppercase italic">Boxing</h3></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS ROW */}
      <section className="px-6 py-10 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/live" className="group bg-surface-container-lowest rounded-xl p-6 flex items-center gap-4 hover:-translate-y-1 transition-all duration-200 shadow-sm border border-outline-variant/10">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors">
              <span className="material-symbols-outlined text-red-600 group-hover:text-white transition-colors">sensors</span>
            </div>
            <div>
              <div className="font-headline font-black uppercase text-sm">Live Now</div>
              <div className="text-[11px] text-on-surface-variant font-label">14 Active Events</div>
            </div>
          </Link>
          <Link to="/directory" className="group bg-surface-container-lowest rounded-xl p-6 flex items-center gap-4 hover:-translate-y-1 transition-all duration-200 shadow-sm border border-outline-variant/10">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
              <span className="material-symbols-outlined text-secondary group-hover:text-white transition-colors">list_alt</span>
            </div>
            <div>
              <div className="font-headline font-black uppercase text-sm">Directory</div>
              <div className="text-[11px] text-on-surface-variant font-label">1,200+ Channels</div>
            </div>
          </Link>
          <Link to="/schedules" className="group bg-surface-container-lowest rounded-xl p-6 flex items-center gap-4 hover:-translate-y-1 transition-all duration-200 shadow-sm border border-outline-variant/10">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
              <span className="material-symbols-outlined text-emerald-600 group-hover:text-white transition-colors">calendar_today</span>
            </div>
            <div>
              <div className="font-headline font-black uppercase text-sm">Schedules</div>
              <div className="text-[11px] text-on-surface-variant font-label">48 Upcoming Matches</div>
            </div>
          </Link>
          <Link to="/platforms" className="group bg-surface-container-lowest rounded-xl p-6 flex items-center gap-4 hover:-translate-y-1 transition-all duration-200 shadow-sm border border-outline-variant/10">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
              <span className="material-symbols-outlined text-amber-600 group-hover:text-white transition-colors">stream</span>
            </div>
            <div>
              <div className="font-headline font-black uppercase text-sm">Platforms</div>
              <div className="text-[11px] text-on-surface-variant font-label">50+ Networks</div>
            </div>
          </Link>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="px-6 py-16 max-w-screen-2xl mx-auto">
        <div className="bg-secondary-container/20 rounded-2xl p-10 md:p-16 relative overflow-hidden text-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter uppercase mb-4">Never Miss a Match</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto mb-8 text-lg">Subscribe to get weekly broadcast schedules and breaking sports news delivered to your inbox.</p>
            <div className="flex flex-col md:flex-row gap-3 justify-center max-w-md mx-auto">
              <input className="flex-1 px-5 py-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 focus:ring-2 focus:ring-red-600/20 focus:outline-none font-body text-sm" placeholder="Enter your email address" type="email" />
              <button className="bg-primary text-white px-7 py-3.5 rounded-lg font-headline font-bold uppercase tracking-widest active:scale-95 transition-transform whitespace-nowrap hover:bg-red-700">Join Now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}