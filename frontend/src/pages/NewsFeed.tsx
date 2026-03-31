export default function NewsFeed() {
  return (
    <>
      <section className="max-w-screen-2xl mx-auto px-6 mb-14">
        <div className="relative group overflow-hidden rounded-xl bg-surface-container-low h-[540px] flex items-end">
          <img alt="Breaking Sports" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUpoc3qmw9JJFc-3b_PxlbtmEdBwo3vreV09Y8-SLnFpQ8dlP9pIK9MOlcUFcwEVVvz385H2jjlqwYNKtDyWKRWes67JbZ_6LY5qS-X-DdySgrA__5WTxAfNvIKmLhVbmz1YHnJlH_2wHxxiEWsuWzDesGEoFeei0Ckw9IhRd_Jkzs89spJPuJdn80WURmx1cOF1Q2hYSM3fXrQTRFhQuE7K1DNBJ572tMV8CXPCrnD-iuO5vpCrroydGpFYJuvDnSkcbvyExQ91s" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="relative p-8 md:p-14 z-10 w-full md:w-2/3">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 text-white font-label text-xs font-bold px-3 py-1 tracking-widest uppercase rounded-sm">Breaking</span>
              <span className="text-white/70 font-label text-xs uppercase tracking-widest">Basketball • 12 mins ago</span>
            </div>
            <h1 className="text-white font-headline text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter mb-6">
              LEGACY DEFINED: CHAMPIONSHIP FINALS SET FOR HISTORIC SHOWDOWN
            </h1>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-headline text-base font-bold flex items-center gap-3 transition-all active:scale-95 rounded-lg">
              READ FULL REPORT <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* FILTERS + CONTENT */}
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* MAIN FEED */}
          <div className="lg:w-2/3">
            <div className="flex gap-3 mb-10 overflow-x-auto pb-3 scrollbar-hide">
              <button className="bg-primary text-white px-5 py-2 rounded-md font-label text-sm font-medium whitespace-nowrap">All News</button>
              <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm font-medium hover:bg-surface-container-highest transition-colors whitespace-nowrap">Football</button>
              <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm font-medium hover:bg-surface-container-highest transition-colors whitespace-nowrap">Motorsports</button>
              <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm font-medium hover:bg-surface-container-highest transition-colors whitespace-nowrap">Tennis</button>
              <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm font-medium hover:bg-surface-container-highest transition-colors whitespace-nowrap">NBA</button>
              <button className="bg-surface-container-high text-on-surface px-5 py-2 rounded-md font-label text-sm font-medium hover:bg-surface-container-highest transition-colors whitespace-nowrap">Cricket</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img alt="F1 Update" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ6aZwHyphThQEs5-MlMCkRxcqI54VbE_urz0vcQrHoefwhRry_AAlsfcOqtRJKJjSyMixEp4qmy193RdYcfjBomcu57DFKM5bvw_NzBXavR2x8uF-6WJZAQ2ZUeNn1mNpoQvZQt0TY12IOMcsxNu0_wH_ER8PgETV2AZy0yJJT2tDbRslhcgAu9ihdiPU-quzKULWEp0e1LhzjhaSje7hvxd6VeO9BD7Qm0Nk6u_m44Zs1c6iI1IfxVdnm_o3gZJB9oyTzhIvJOg" />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Motorsports</span>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors">RED BULL REVEALS RADICAL SIDEPOD UPGRADES FOR MONACO</h3>
                  <p className="text-on-surface-variant text-sm mb-3 line-clamp-2">The championship leaders have shocked the paddock with a bold aerodynamic redesign ahead of the season's most prestigious race.</p>
                  <span className="text-outline text-[10px] font-label uppercase tracking-tighter">45 minutes ago • 4 min read</span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img alt="Football News" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB70HVIXRJkmOqIasZ-DGR3CzdeGNUEQUwlarY7ATmqQT1DFvDYtrpxLcjODGciNwiGUk9Tw0ilRClrPaS_SLVJXlQKOmMnoFNrA6PUU1dqyw-8-i2vcuc7NrDx2cw0C6klnO6Bim7jlDbAJB31TefH3J0YMHUk_lAMiy1CW5f3_Y6uCNqcO6W-K1CdENyOfU-QeDUUJAM5TE_1YjfRwulcj1UTl-yGsh7EOijkkGAtxdOI-NTq4vd1T0Gg1XsEhda8Cu_NsJRAM34" />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Football</span>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors">TRANSFER BLAST: €120M BID REJECTED FOR RISING STAR</h3>
                  <p className="text-on-surface-variant text-sm mb-3 line-clamp-2">Sources confirm that the opening bid for the teenage sensation has been dismissed as "insulting" by his current club.</p>
                  <span className="text-outline text-[10px] font-label uppercase tracking-tighter">2 hours ago • 6 min read</span>
                </div>
              </div>
              {/* Card 3 (Wide) */}
              <div className="md:col-span-2 group flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <img alt="Tennis" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4G7sLddr8rVHrzI-uT1lvXiTuBpfOm6aS3kyCup6RPpAF9To1zjNVOWcGnIGyHryCAyECvn6wkEuxz9Wud0HijEG2kr37p51cMRFZpADADJ3FW8UR0PnSUg5YbHAJvWRChwMav47zo29DJA4KyWldgh5a_kUTVzd-hDnvGVyMid9aArenJwtXYIVxHFvkx1ThXVYk__gZ46T80KoJXNiWYvslm9-WR8FgUZUb9M3t-tF0Z2eM8wOZVu5M2vnE8NpoH_ZSXGhM8SU" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <span className="text-red-600 text-xs font-bold uppercase tracking-widest mb-2">Tennis</span>
                  <h3 className="font-headline text-2xl font-bold leading-tight mb-4 group-hover:text-red-600 transition-colors">CLAY COURT QUEEN: THE UNSTOPPABLE RUN CONTINUES</h3>
                  <p className="text-on-surface-variant mb-5">Explore the technical adjustments and mental shift that led to a 25-match winning streak on the dirt.</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
                      <img alt="Author" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFHS6hl7Q9kMAwP5Om49MRcXkFTRcAeMCxrDjzUaySJJLC8_BUj1mbpB8G6X-WX2Dy2Xbmjf1hhvApREs5yKMxx1c5xD-uG0SWLGYud5a69cMSyEC4qy9m7a74BNpzARHVRdBXbBbbWEgJW6n2yz4WFLM5gQ-J3Lugg-ENjDYgvLrt4Jzm_SQHq2vspewH5dZsVfjH_q0swGQIRtQ-jKokA-kUTRxR7Z1MIHVFJOTw5yXivG72mi2a0hdjdJ9r711ceHHsqSAMO5g" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Sarah Jenkins</p>
                      <p className="text-[10px] text-outline uppercase tracking-wider">Senior Editor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-8">
              {/* Trending */}
              <div>
                <h2 className="font-headline text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-red-600 rounded-full"></span> TRENDING TOPICS
                </h2>
                <div className="space-y-5">
                  <div className="group flex gap-4 cursor-pointer">
                    <span className="font-headline text-4xl font-black text-surface-container-highest group-hover:text-red-600 transition-colors italic">01</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1 leading-snug group-hover:underline uppercase tracking-tight">Mbappe's Madrid Move: Final Details Leaked</h4>
                      <span className="text-[10px] text-outline uppercase font-label">18.4K Readers</span>
                    </div>
                  </div>
                  <div className="group flex gap-4 cursor-pointer">
                    <span className="font-headline text-4xl font-black text-surface-container-highest group-hover:text-red-600 transition-colors italic">02</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1 leading-snug group-hover:underline uppercase tracking-tight">LeBron James Contemplates Retirement After Playoff Exit</h4>
                      <span className="text-[10px] text-outline uppercase font-label">15.2K Readers</span>
                    </div>
                  </div>
                  <div className="group flex gap-4 cursor-pointer">
                    <span className="font-headline text-4xl font-black text-surface-container-highest group-hover:text-red-600 transition-colors italic">03</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1 leading-snug group-hover:underline uppercase tracking-tight">IPL 2024: The Mid-Season Power Rankings</h4>
                      <span className="text-[10px] text-outline uppercase font-label">12.9K Readers</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mini Scoreboard */}
              <div className="bg-primary text-white rounded-xl p-6">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-red-400 flex items-center gap-2 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span> Live Now
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-bold text-sm tracking-tight">LIVERPOOL FC</span>
                    <span className="font-headline font-black text-2xl text-red-400">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-bold text-sm tracking-tight">REAL MADRID</span>
                    <span className="font-headline font-black text-2xl">1</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] font-label text-white/50 uppercase tracking-widest">
                  <span>Champions League • Final</span>
                  <span>82'</span>
                </div>
              </div>
              {/* Newsletter */}
              <div className="bg-surface-container-low p-7 rounded-xl border border-outline-variant/10">
                <h3 className="font-headline text-lg font-bold mb-2 uppercase">THE DAILY KINETIC</h3>
                <p className="text-sm text-on-surface-variant mb-5">Get the top headlines delivered to your inbox every morning at 7 AM.</p>
                <div className="flex flex-col gap-2">
                  <input className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-red-600/20 focus:outline-none" placeholder="email@address.com" type="email" />
                  <button className="bg-red-600 text-white py-3 rounded-lg font-headline font-bold hover:bg-red-700 transition-colors uppercase tracking-widest text-xs">SUBSCRIBE</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
