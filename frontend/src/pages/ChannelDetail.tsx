import { useParams, useNavigate, Link } from "react-router-dom";
import { CHANNELS } from "../data/channels";

export default function ChannelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const channel = id ? CHANNELS[id] : null;

  if (!channel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <span className="material-symbols-outlined text-7xl text-outline mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>live_tv</span>
        <h1 className="font-headline font-black text-4xl uppercase tracking-tighter mb-4">Channel Not Found</h1>
        <p className="text-on-surface-variant mb-8">This channel doesn't exist or isn't in our directory yet.</p>
        <button
          onClick={() => navigate("/directory")}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-headline font-bold uppercase tracking-widest transition-all"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body px-6 py-10 max-w-[1600px] mx-auto min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/directory")}
        className="flex items-center gap-2 text-on-surface-variant hover:text-red-600 transition-colors font-label text-sm font-bold uppercase tracking-widest mb-8"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Back to Directory
      </button>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-xl bg-primary min-h-[380px] flex items-end p-8 md:p-12 mb-8 group">
        <div className="absolute inset-0 z-0">
          <img
            alt={channel.fullName}
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
            src={channel.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-red-900/20 mix-blend-color-burn"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-2xl flex items-center justify-center p-4 shrink-0 border-4 border-white/10">
              <span className="font-headline font-black text-3xl md:text-4xl text-black tracking-tighter text-center leading-none">
                {channel.shortName}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white px-2.5 py-1 text-[10px] font-black font-label uppercase tracking-widest rounded-sm">
                  {channel.category}
                </span>
                <span className="text-white/60 text-xs font-label tracking-widest uppercase">
                  {channel.established}
                </span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter max-w-3xl">
                {channel.fullName}
              </h1>
              <p className="text-white/60 font-label text-sm mt-2 tracking-widest uppercase">{channel.tagline}</p>
            </div>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              to={`/watch/${channel.id}`}
              className="bg-[#ff291a] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/20"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Watch Live
            </Link>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-wider border border-white/10 transition-all text-center leading-tight shadow-sm">
              Add<br />To Favs
            </button>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-4 flex flex-col gap-8">

          {/* Channel Profile */}
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline font-bold text-lg uppercase mb-6 tracking-wide">Channel Profile</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">{channel.description}</p>
            <div className="flex flex-wrap gap-2">
              {channel.sports.map((sport) => (
                <span key={sport} className="px-3 py-1.5 bg-surface-container-low text-[10px] font-label font-bold uppercase tracking-widest rounded">
                  {sport}
                </span>
              ))}
            </div>
          </div>

          {/* Global Availability */}
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline font-bold text-lg uppercase mb-6 tracking-wide">Global Availability</h2>
            <div className="space-y-3 mb-8">
              {channel.regions.map((region) => (
                <div key={region.country} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                    <span className="font-semibold text-sm">{region.country}</span>
                  </div>
                  <span className="text-[10px] uppercase font-label text-on-surface-variant">{region.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm min-h-full">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-outline-variant/10 pb-6">
              <h2 className="font-headline font-black text-2xl uppercase tracking-tighter">Today's Broadcast Schedule</h2>
              <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
                <button className="px-4 py-2 bg-primary text-white text-[10px] font-label font-bold uppercase tracking-wider rounded-md shadow-sm">Main Feed</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface text-[10px] font-label font-bold uppercase tracking-wider rounded-md transition-colors">HD2</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface text-[10px] font-label font-bold uppercase tracking-wider rounded-md transition-colors">4K</button>
              </div>
            </div>

            {/* Highlighted Match */}
            {channel.schedule[0] && (
              <div className="bg-primary text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center mb-10 relative overflow-hidden shadow-lg">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
                <div className="w-full md:w-3/5 z-10 mb-6 md:mb-0 border-r border-white/10 md:pr-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span>
                    <span className="text-red-400 font-label font-black text-[10px] uppercase tracking-[0.2em]">{channel.schedule[0].category}</span>
                  </div>
                  <h3 className="font-headline font-black text-3xl md:text-4xl uppercase tracking-tighter leading-none mb-3">
                    {channel.schedule[0].title}
                  </h3>
                  <p className="text-white/50 font-label text-xs uppercase tracking-widest">{channel.schedule[0].time} Local Time</p>
                </div>
                <div className="w-full md:w-2/5 z-10 flex flex-col items-center justify-center pl-0 md:pl-8">
                  <div className="bg-red-600/20 text-red-400 px-3 py-1 rounded-sm text-[10px] font-black font-label uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span> Live Now
                  </div>
                  <Link
                    to={`/watch/${channel.id}`}
                    className="bg-white text-primary font-headline font-black text-sm uppercase px-6 py-3 rounded-xl hover:bg-white/90 transition-all active:scale-95 text-center"
                  >
                    Watch Stream
                  </Link>
                </div>
              </div>
            )}

            {/* Schedule list */}
            <div className="space-y-2">
              {channel.schedule.slice(1).map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 rounded-xl ${item.highlight ? "bg-surface-container-low" : "hover:bg-surface-container-low/50"} transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center gap-8 w-full">
                    <span className="font-headline font-semibold text-sm w-24 shrink-0 select-none">{item.time}</span>
                    <div>
                      <span className="text-[9px] font-label font-bold uppercase tracking-widest text-secondary/70 block mb-1">{item.category}</span>
                      <h4 className="font-headline font-black text-base uppercase tracking-tight group-hover:text-red-600 transition-colors select-none">{item.title}</h4>
                    </div>
                  </div>
                  <button className="text-outline-variant hover:text-primary transition-colors p-2 shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NETWORK AFFILIATES */}
      <section className="mt-8 mb-10">
        <div className="border-l-4 border-red-600 pl-4 mb-8">
          <h2 className="font-headline font-black text-2xl uppercase tracking-tighter">Network Affiliates &amp; Related</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {channel.affiliates.map((aff) => (
            <button
              key={aff.id}
              onClick={() => navigate(`/channel/${aff.id}`)}
              className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[160px] text-left"
            >
              <div>
                <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center font-headline font-black text-lg mb-4 text-on-surface uppercase select-none">
                  {aff.id.slice(0, 3).toUpperCase()}
                </div>
                <h4 className="font-headline font-black text-xs uppercase tracking-tight mb-1 group-hover:text-red-600 transition-colors">{aff.name}</h4>
                <p className="text-[9px] font-label text-on-surface-variant uppercase tracking-wider">{aff.subtitle}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-red-600 font-label font-bold text-[9px] uppercase tracking-widest">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                View Channel
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
