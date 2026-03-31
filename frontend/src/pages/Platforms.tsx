export default function Platforms() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <section className="mb-12">
        <nav className="flex items-center gap-2 mb-5 text-sm font-label uppercase tracking-widest text-on-surface-variant">
          <span className="hover:text-red-600 transition-colors cursor-pointer">Categories</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface font-semibold">United Kingdom</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              United <span className="text-red-600 italic">Kingdom</span>
            </h1>
            <p className="mt-4 text-on-surface-variant max-w-2xl text-base">Browse the premium broadcast networks and digital platforms delivering live sports across the British Isles.</p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-600 pulse-dot"></span>
            <span className="font-label text-xs font-bold uppercase tracking-wider">8 Networks Live</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <article className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest rounded-xl flex flex-col md:flex-row shadow-sm hover:-translate-y-1 transition-all duration-300">
          <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5Wxh6xPVfLbtBG1MdXJDQ5SdHzW1rK8FwDRG1vfVfFQzKeOskKf7-MjJ0ESB7SlRaz4ivGTH1omticYksZfLD7dC-TX__X3NnT3l3nJm5XcHW92IYLnUCEqm54WrQoR2vevXDdtqSGuLvNa3LZwsBe_YuUL-ckvLqnJzatigOzAqIF0Kn0w5AnLjGsoO7UNGOs_kGdeCK_Fw4cxhKrvad2BXLVelldsfZHic5NA39llujesE-_Sn_aKsazCW84jvHF6Tciv-jA64" alt="Sky Sports" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r"></div>
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest rounded-sm">Premier Partner</div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline text-3xl font-black italic uppercase tracking-tighter">Sky Sports</h2>
                <span className="material-symbols-outlined text-red-600" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-5 text-sm">The industry leader in the UK, offering unparalleled coverage of the Premier League, Formula 1, Cricket, Golf, and NFL. Experience sports in breathtaking Ultra HD.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-surface-container-high rounded text-[10px] font-bold uppercase tracking-wider font-label">4K HDR</span>
                <span className="px-3 py-1 bg-surface-container-high rounded text-[10px] font-bold uppercase tracking-wider font-label">Multi-View</span>
                <span className="px-3 py-1 bg-surface-container-high rounded text-[10px] font-bold uppercase tracking-wider font-label">11 Channels</span>
              </div>
            </div>
            <button className="w-full py-3.5 bg-primary text-white font-headline font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 group/btn">
              View 11 Channels <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </article>

        <article className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group shadow-sm hover:-translate-y-1 transition-all duration-300">
          <div>
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-5 overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAklVX8bU_503mYRpUpR4GUvHT2T4NqScHB3EGfVtRzWXMETM3BtbFrZ5c6UImQkMKAT0vSijvDzsGuHwB1sv4aueyNfbxG3OQ92kpbwubDOAOytAj88TgK7kENyxc4XcBpwdchzgVOYEmvZFuo4e-6nvFct-QBWZ5iA5HHV27lUBIMI4yuejnctFWqrIb7DW-ARj9GHGjomGdT4NEUA8H2XR4UJRJiOKzWLWycX0qy1EupHuHf742x_B2jYFtufBUZ5ocKD-EMuY0" alt="TNT" />
            </div>
            <h2 className="font-headline text-2xl font-black italic uppercase tracking-tighter mb-3">TNT Sports</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-5">The exclusive home of UEFA Champions League and Europa League in the UK. Also features Premiership Rugby, MotoGP, and UFC.</p>
          </div>
          <div>
            <div className="h-px bg-outline-variant/15 mb-5"></div>
            <button className="w-full py-3 bg-surface-container-low text-on-surface font-headline font-bold uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-all">Explore Channels</button>
          </div>
        </article>
      </div>
      
      <section className="mt-16 p-10 md:p-14 bg-surface-container-highest rounded-2xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-4">Can't find your provider?</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-7">Our directory is constantly updated. If you represent a broadcast network or streaming service in the UK, get in touch to be listed.</p>
          <button className="px-8 py-4 bg-primary text-white font-headline font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform">Contact Directory Admin</button>
        </div>
        <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[180px] opacity-[0.03] rotate-12">map</span>
      </section>
    </div>
  );
}
