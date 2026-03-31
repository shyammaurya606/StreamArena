export default function Schedules() {
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
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button className="px-5 py-2 rounded-full bg-primary text-white font-headline text-sm font-bold uppercase transition-all whitespace-nowrap">Today</button>
            <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface font-headline text-sm font-bold uppercase hover:bg-surface-container-highest transition-all whitespace-nowrap">Tomorrow</button>
            <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface font-headline text-sm font-bold uppercase hover:bg-surface-container-highest transition-all whitespace-nowrap">Upcoming Week</button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant mr-2 shrink-0">Filter By:</span>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface-container-highest text-primary font-body text-sm font-semibold border border-primary/10 whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">grid_view</span> All Sports
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-body text-sm transition-all whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">sports_soccer</span> Football
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-body text-sm transition-all whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">sports_basketball</span> Basketball
            </button>
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

          {/* Match 1 (Live) */}
          <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch hover:bg-surface-container-low transition-all shadow-sm">
            <div className="w-full md:w-44 bg-surface-container-low flex flex-col items-center justify-center p-6 border-r border-surface-container-high/50">
              <span className="text-red-600 font-headline text-3xl font-black leading-none mb-1">19:45</span>
              <span className="text-on-surface-variant font-label text-xs uppercase tracking-tighter">GMT +1</span>
              <div className="mt-3 px-2 py-0.5 bg-red-600 text-white text-[9px] font-black uppercase rounded pulse-dot">Live Now</div>
            </div>
            <div className="flex-grow p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border-4 border-surface-container-lowest overflow-hidden">
                    <img className="w-9 h-9 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm0jWbEyfiHzQuyyv_fWxFwlmI1ocsfW1D9Bhe-q6I35_M9g5rqm5PQQdNmquzddlYqMd51mwHSSrrDzoPJ3XyyMY-IzyBB_eValQCFFE9eeycA_ONV1YCNw9aI6t_JCGX1yW7JIoUx2B4eLzYZtgppfR9OjNV5yTNahs3I8CgVFjuUlZe_Z4yZMQ6Ruw_xhRVJd1o5gSEY6QlPBZ9AaGFIfsVLH-zrU7QArp0UUmd5NhkGkZ4_WeqyqCQiMQYg3XNGt4I8FefC5I" alt="Team 1" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border-4 border-surface-container-lowest overflow-hidden">
                    <img className="w-9 h-9 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzztIgHNV37HbsLHtzGC790PG50ILShloPwjm1siOX07QdYZGepsSzqStGWe7D_gZ18riSAFm7duCxcTbDXaWp2dvWe-jom8b50jq7xllf806mc8VHJI-Ks_e7ehyBu0v-zeb1pbhoUVrB3uOGbrkRnzM3JxpuESyWbmUxMukeh4YSMEx4-OpaWSCKv5rAgsyKeiLPKCElPse6_IGPpmzIH_k-Li8C2QZBo-Lp3tEHqwr5afPgVorMqvGAhplG6efIo-ZbjqiD-w" alt="Team 2" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-red-600 text-base">sports_soccer</span>
                    <span className="text-xs font-label uppercase text-on-surface-variant tracking-wider">Champions League • Group Stage</span>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">Real Madrid vs Manchester City</h3>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-primary text-white font-headline text-[10px] font-bold uppercase rounded">KINETIC 1 HD</span>
                  <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-headline text-[10px] font-bold uppercase rounded">Prime Video</span>
                </div>
                <button className="px-6 py-2 bg-red-600 text-white font-headline text-xs font-bold uppercase rounded-lg hover:bg-red-700 transition-all active:scale-95">Watch Match</button>
              </div>
            </div>
          </div>
          
          {/* Match 2 */}
          <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch hover:bg-surface-container-low transition-all shadow-sm">
            <div className="w-full md:w-44 bg-surface-container-low flex flex-col items-center justify-center p-6 border-r border-surface-container-high/50">
              <span className="text-on-surface font-headline text-3xl font-black leading-none mb-1">21:00</span>
              <span className="text-on-surface-variant font-label text-xs uppercase">GMT +1</span>
            </div>
            <div className="flex-grow p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  <div className="w-14 h-14 rounded-full bg-surface-container border-4 border-surface-container-lowest overflow-hidden"><img className="w-9 h-9 object-contain m-auto mt-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuEDq-NKXb0g44x256_H5DCsHSN2CfNScZooVZTNv5YZHjrw3F7STedFa-vB8aBCQDb2bx2_Dkl_upID0_Zhyvpz2CB82aw_bmTinD2_02__ACeGtSJ32pTArcP_A9SvMJshaNO6elvRScjnP2cyGjjpF1jLpRWcyfCy5aT_wlHn1-V5Eq5z6mAOvdf37V2lr8EvMnyzvgCrtZsI1QFRU2uF5O5spmuV0tJVYlni6WgBYWqSx5OO68O3h9bPho-abZVjGMRHkmDxY" alt="LAL" /></div>
                  <div className="w-14 h-14 rounded-full bg-surface-container border-4 border-surface-container-lowest overflow-hidden"><img className="w-9 h-9 object-contain m-auto mt-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkyTCkuv43vt4tFFE7ldoAnJmEYe4mjj38mK3wS4YgvSNKftBHCpabyxYd62rZb1ZjoZEF355YkHMkjQkNYPIgtb-cNhupAHClpyyHFCBqOXHc6Cm3UmLNb-8osX0ApfAIghtCGkBpqsy3tu-WyY0T6TgrvCP5jJXqr8vnqtrOLV_t8z7rpYNAiXeISBW2XOsUnrw3DrxOja3e1qeb4eMhrVH5AK-8eq3CTF3otr_Kix4OF0JjhwoaZMheZ5Gx9iNRE6ueOjHEAR0" alt="GSW" /></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-base">sports_basketball</span>
                    <span className="text-xs font-label uppercase text-on-surface-variant tracking-wider">NBA Regular Season</span>
                  </div>
                  <h3 className="text-xl font-headline font-bold">LA Lakers vs Golden State Warriors</h3>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <div className="flex gap-2"><span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-headline text-[10px] font-bold uppercase rounded">ESPN+</span><span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-headline text-[10px] font-bold uppercase rounded">TNT Sports</span></div>
                <button className="px-6 py-2 bg-surface-container-high text-on-surface font-headline text-xs font-bold uppercase rounded-lg hover:bg-surface-container-highest transition-all">Set Reminder</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
