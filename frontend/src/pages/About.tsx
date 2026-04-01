export default function About() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Sports broadcast stadium" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4MRm7RZxP6zKwQUvj6NOrSyMU6UNbnrrGXdtLa40fRhOBFpo9mg6P1Hp18VtmFIAt-unphKIqcPATalDCgp_hhywb57SR8Xf5WgK2-wDNmmNnY67ein2vTewP91es5LUhhu777o9KUHGSjgNrtCAsnIs5GGxFHUBuipSJCKtbSLHMpAmffVQizvaqajUU0RJ6sLtx2W6AtiG8are6udj2qcTHO_45057qtOUwORWNK6jk8p2wxGNtCXagbqp5nqMyzpOE2XIBcbc" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-surface"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="font-label text-on-primary-container bg-primary-container/20 px-4 py-1 rounded-full text-sm font-semibold mb-8 inline-block tracking-widest uppercase">
            The Kinetic Editorial
          </span>
          <h1 className="font-headline font-black text-6xl md:text-8xl lg:text-9xl text-on-primary leading-none tracking-tighter mb-8 max-w-5xl mx-auto italic">
            DEFINING THE FUTURE OF SPORTS MEDIA.
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="bg-surface-tint text-on-primary font-headline font-bold text-xl px-12 py-5 rounded-lg active:scale-95 transition-transform">
              EXPLORE THE VISION
            </button>
            <button className="bg-surface-container-lowest/10 backdrop-blur-md text-on-primary font-headline font-bold text-xl px-12 py-5 rounded-lg border border-on-primary/20 active:scale-95 transition-transform">
              OUR STORY
            </button>
          </div>
        </div>
      </section>

      {/* Global Reach Section (Bento Grid) */}
      <section className="py-12 bg-surface px-6 lg:px-12 max-w-[1920px] mx-auto">
        <div className="mb-8">
          <h2 className="font-headline font-black text-4xl text-on-surface tracking-tighter italic whitespace-nowrap overflow-visible uppercase">GLOBAL REACH</h2>
          <div className="w-16 h-1.5 bg-surface-tint mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[500px]">
          {/* Map Card */}
          <div className="md:col-span-8 bg-surface-container-low rounded-xl overflow-hidden relative border border-outline-variant/10">
            <div className="absolute top-6 left-6 z-10">
              <div className="font-headline text-3xl font-bold text-white tracking-tight">142 COUNTRIES</div>
              <div className="font-body text-white/70 text-sm">Live streaming across 6 continents</div>
            </div>
            <img 
              className="w-full h-full object-cover grayscale opacity-100 mix-blend-multiply" 
              alt="Detailed dark world map"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh9wl00TB0QnM_ZdWL-g2XThmI9t0cwoLaqRPIUGb-0kr0_LWs1NYU2iEVIaTC2wScFmQtYINKbSTR_qByrrlWUYLr6Jec2CP-XZbFd2ChySuPpSViT3SuWhNUG1cbsFtveZA6q44pDhCj0CgeWAnuu2JnCRjcfbT-1XRAUeC2eN2N1HMrM_kHTTCYvhB5wo3mybd52x57c8v8I5CLnb0QDD5ERurKC2gVQvA7mDA2Zrn7TdH8Z8_QWiJM6X959ZeaeVWCyRQCLmg" 
            />
            <div className="absolute bottom-6 right-6 flex gap-3">
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/5">
                <div className="text-surface-tint font-black font-headline text-2xl italic">2.4B</div>
                <div className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Annual Viewers</div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/5">
                <div className="text-surface-tint font-black font-headline text-2xl italic">24/7</div>
                <div className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Active Operations</div>
              </div>
            </div>
          </div>
          {/* Statistics Stack */}
          <div className="md:col-span-4 grid grid-rows-2 gap-5">
            {/* HYPER-LOCAL Block */}
            <div className="bg-primary text-on-primary p-6 rounded-xl flex flex-col justify-between border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD_BXat0r-uPEh-65DRLEAYzZuGGMhTO5iW_2TcAlkAMCqfVp45AACYfM8zu43O8tcozpyiA6mTVk0a5nyA0K_xGjgANqBzx26fnjc-eqHnnfcofno_s8cOcYcPn6w9HkWsPYcsjlWJjckk8nsGufC0-NhxnIcf2ANKziDn1SGwJPiNr1v94UhXgAUmmnREFgb11TkXt6Bm6m7Up2e7nZaklX99tlPolujRyn4r4VkxtryWzxmkjYgEYSYrBfUq2I3y1gpbKTk5_s"
                  alt="Broadcast background"
                  className="w-full h-full object-cover opacity-80 grayscale group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/40 to-transparent"></div>
              </div>
              <span className="material-symbols-outlined text-3xl text-on-primary-container relative z-10">language</span>
              <div className="relative z-10">
                <h3 className="font-headline text-2xl font-black tracking-tighter italic mb-1 uppercase">HYPER-LOCAL</h3>
                <p className="font-body text-xs text-on-primary/70 leading-relaxed">32 localized language feeds tailored for specific regional sports cultures.</p>
              </div>
            </div>
            {/* CULTURAL SYNC Block */}
            <div className="bg-primary p-6 rounded-xl flex flex-col justify-between border border-white/5 border-b-4 border-b-surface-tint relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUpQAl6DPl0yTRAPbYSwIXX0nLRrkkbAw-C82K73pU6xqlLI-688s1HQjSLVBvgoHpSe4wbf5VQbHnTXQVoVpp_Ee66WI9fSib_IuwwfAoPHrdWA0YknSZkIb1CsDzCji-B_UlNGdwFKuzUF2tlcjrBHO6LvjKbYnVVIecud-61caBBaNhmYOAFDvAZmS6oQDiQRgwSHIAm_hVNEr_xnaLT_SelCXyFubBsNq4wqL2SXCNPvJFey8MCZxowGmjc3t0XbO92vOen1c"
                  alt="Connectivity background"
                  className="w-full h-full object-cover opacity-80 grayscale group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/40 to-transparent"></div>
              </div>
              <span className="material-symbols-outlined text-3xl text-surface-tint relative z-10">diversity_3</span>
              <div className="relative z-10">
                <h3 className="font-headline text-2xl font-black tracking-tighter italic mb-1 text-white uppercase font-bold">CULTURAL SYNC</h3>
                <p className="font-body text-xs text-white/70 leading-relaxed">Bridging the gap between the stadium and the screen across all timezones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section (Asymmetric Editorial Layout) */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-surface-tint absolute -top-4 -left-4 w-32 h-32 -z-10 opacity-20"></div>
            <img 
              alt="Advanced broadcasting technology" 
              className="rounded-xl w-full h-[600px] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD_BXat0r-uPEh-65DRLEAYzZuGGMhTO5iW_2TcAlkAMCqfVp45AACYfM8zu43O8tcozpyiA6mTVk0a5nyA0K_xGjgANqBzx26fnjc-eqHnnfcofno_s8cOcYcPn6w9HkWsPYcsjlWJjckk8nsGufC0-NhxnIcf2ANKziDn1SGwJPiNr1v94UhXgAUmmnREFgb11TkXt6Bm6m7Up2e7nZaklX99tlPolujRyn4r4VkxtryWzxmkjYgEYSYrBfUq2I3y1gpbKTk5_s" 
            />
            <div className="absolute -bottom-10 -right-10 bg-surface-container-lowest p-8 rounded-xl max-w-xs shadow-xl kinetic-overlap">
              <div className="font-label text-surface-tint font-bold text-xs mb-2 uppercase">New Tech</div>
              <p className="font-body text-on-surface font-medium leading-snug italic">"Our proprietary 8K low-latency pipeline delivers the game before the crowd even roars."</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="font-headline font-black text-6xl text-on-surface tracking-tighter leading-none italic uppercase">Innovation in <br/><span className="text-surface-tint">Broadcasting</span></h2>
            <p className="text-xl font-body text-on-surface-variant leading-relaxed">
              We don't just broadcast; we immerse. Through our "Stadium-to-Street" neural network, Kinetic Sports captures 4,000 data points per second, turning every play into a living infographic.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-surface-tint font-bold" style={{fontVariationSettings: "'FILL' 1"}}>speed</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">Zero Latency</h4>
                  <p className="text-sm text-on-surface-variant font-body">Sub-second synchronization for global betting and social feeds.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-surface-tint font-bold" style={{fontVariationSettings: "'FILL' 1"}}>view_in_ar</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">AR Overlays</h4>
                  <p className="text-sm text-on-surface-variant font-body">Real-time tactical analysis directly on the live feed.</p>
                </div>
              </div>
            </div>
            <button className="bg-primary text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-tint transition-colors">The Tech Stack</button>
          </div>
        </div>
      </section>

      {/* Values Section (Dynamic Cards) */}
      <section className="py-32 bg-surface px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline font-black text-6xl text-on-surface tracking-tighter italic">OUR VALUES</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 font-body">The core pillars that maintain our position at the absolute edge of sports media.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Speed */}
          <div className="group">
            <div className="h-80 overflow-hidden rounded-xl bg-surface-container-high relative mb-6">
              <img 
                alt="High speed athletics" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_anUIMn5nubezsW3DNw2nm_4F41EzRITioSfzrhGr-kh39Q1y1504LfW2Ykt76mdKLMGCzxn3zVrc8f79Z1Ut1WA5brbWM3XGeAOAKdVifKlKHZ8lLofXnl5qO6H79yp_jSRuM375NNYIstLfWrHMu3pZflohvZ4Md07f7ESGXNEkSwbtpoeD8ipXLyOYtt_G7qR_qOm9LW1mmS-_qyoHL4Nrz9pUs4oJ5b43Y5KdXeQg7JOdmbJ1vuVJCKEaP7PbyC-kpR83a0w" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <span className="text-on-primary font-headline text-5xl font-black italic uppercase">SPEED</span>
              </div>
            </div>
            <p className="text-on-surface-variant font-body leading-relaxed">In sports, milliseconds matter. In media, they are everything. We prioritize velocity in every stream and every story.</p>
          </div>
          {/* Precision */}
          <div className="group">
            <div className="h-80 overflow-hidden rounded-xl bg-surface-container-high relative mb-6">
              <img 
                alt="Precision timing" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8SsBo9g5dtRgQ1Nb1uBGaxJXBwzZxGzr4bS_PzhC7YtSbuBwkn052nwwp-Q40cjkANzq1mVnKRDkXGGji-WKZUZPtRWQE6pjrK-N39AhvP5Y4r8Wzb5XP4U8CIajDXj4SG_RRqaAKrW0WuPZBd0PyL1WJN_3ZFq_jvQV4MpMW2nnb4E82wpee0lDdkHJzMCc0LLVuAUkoXlomvYdRPXIcJIlAABVSz4IQ5jafGHHMujg_1pHjfOb_doSki_E6K7Dt-ukQBL8Alwg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <span className="text-on-primary font-headline text-5xl font-black italic uppercase">PRECISION</span>
              </div>
            </div>
            <p className="text-on-surface-variant font-body leading-relaxed">Accuracy is our anchor. From the first play to the final whistle, our data integrity remains unchallenged.</p>
          </div>
          {/* Access */}
          <div className="group">
            <div className="h-80 overflow-hidden rounded-xl bg-surface-container-high relative mb-6">
              <img 
                alt="Global connectivity" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUpQAl6DPl0yTRAPbYSwIXX0nLRrkkbAw-C82K73pU6xqlLI-688s1HQjSLVBvgoHpSe4wbf5VQbHnTXQVoVpp_Ee66WI9fSib_IuwwfAoPHrdWA0YknSZkIb1CsDzCji-B_UlNGdwFKuzUF2tlcjrBHO6LvjKbYnVVIecud-61caBBaNhmYOAFDvAZmS6oQDiQRgwSHIAm_hVNEr_xnaLT_SelCXyFubBsNq4wqL2SXCNPvJFey8MCZxowGmjc3t0XbO92vOen1c" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <span className="text-on-primary font-headline text-5xl font-black italic uppercase">ACCESS</span>
              </div>
            </div>
            <p className="text-on-surface-variant font-body leading-relaxed">Democratizing sports for all. We believe the highest quality experience should be available to every fan, everywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer Branding Section */}
     
    </div>
  );
}
