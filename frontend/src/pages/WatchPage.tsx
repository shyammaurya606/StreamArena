import { useParams, useNavigate } from "react-router-dom";
import { CHANNELS } from "../data/channels";

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const channel = id ? CHANNELS[id] : null;

  if (!channel) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-headline font-black text-4xl text-white uppercase tracking-tighter mb-4">
          Invalid Stream
        </h1>
        <button
          onClick={() => navigate("/directory")}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-headline font-bold uppercase"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const liveMatch = channel.schedule.find(m => m.highlight) || channel.schedule[0];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* Header / Action Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(`/channel/${channel.id}`)}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-all text-[10px] font-label font-bold uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Exit Theater
          </button>
          <div className="h-4 w-px bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center p-1 overflow-hidden shrink-0">
              <span className="text-black font-headline font-black text-[10px]">{channel.shortName}</span>
            </div>
            <div>
              <h2 className="font-headline font-black text-sm uppercase tracking-tight leading-none">
                {channel.fullName}
              </h2>
              <span className="text-[8px] text-red-500 font-label font-black uppercase tracking-[0.2em] flex items-center gap-1 mt-0.5 animate-pulse">
                <span className="w-1 h-1 rounded-full bg-red-500"></span> LIVE NOW
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <div className="text-right">
              <p className="text-[9px] text-white/40 font-label uppercase tracking-widest">{liveMatch.category}</p>
              <p className="text-[11px] font-bold uppercase truncate max-w-[200px]">{liveMatch.title}</p>
            </div>
          </div>
          <button className="p-2 text-white/40 hover:text-white transition-all">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="p-2 text-white/40 hover:text-white transition-all">
            <span className="material-symbols-outlined">fullscreen</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-surface-container-lowest group">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img
            src={channel.heroImage}
            alt="Theater Backdrop"
            className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40 group-hover:scale-105 transition-transform duration-[10s]"
          />

          {/* Launcher UI Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-black/60 backdrop-blur-[2px]">
            <div className="max-w-2xl px-6">
              <span className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black font-label uppercase tracking-widest mb-6 shadow-lg shadow-red-600/30">
                Official Network Broadcast
              </span>
              <h1 className="font-headline font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4">
                Watch {channel.shortName} <br /> Official Live Feed
              </h1>
              <p className="text-white/60 font-body text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
                Connect to the official {channel.fullName} secure broadcast. You will be authenticated via Velocity Grid and directed to the high-definition stream.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <a
                  href={channel.watchUrl}
                  className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto px-10 py-5 rounded-xl font-headline font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                  Launch Secure Stream
                </a>
                <button
                  onClick={() => navigate(`/channel/${channel.id}`)}
                  className="w-full md:w-auto px-8 py-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-headline font-bold text-sm uppercase tracking-widest transition-all"
                >
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Meta Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-headline font-bold text-xl uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-red-600">info</span>
              Broadcasting Details
            </h3>
            <p className="text-white/60 leading-relaxed text-base font-body mb-8">
              {channel.description} This theater view session is managed by Velocity Grid Pro. Please ensure your network supports high-bandwidth video playback.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-6 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] font-label mb-1">Status</span>
                <span className="text-green-500 font-bold text-xs uppercase">Encrypted</span>
              </div>
              <div>
                <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] font-label mb-1">Source</span>
                <span className="text-white font-bold text-xs uppercase leading-none">{channel.shortName}-HD</span>
              </div>
              <div>
                <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] font-label mb-1">Bitrate</span>
                <span className="text-white font-bold text-xs uppercase leading-none">4.8 GBPS</span>
              </div>
              <div>
                <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] font-label mb-1">Server</span>
                <span className="text-white font-bold text-xs uppercase leading-none">SG-DX-01</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h4 className="font-headline font-bold text-sm uppercase tracking-widest mb-4">Tonight's Lineup</h4>
              <div className="space-y-4">
                {channel.schedule.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-[10px] font-bold text-white/30 pt-1 shrink-0">{item.time}</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-tight">{item.title}</p>
                      <p className="text-[9px] text-red-500 uppercase font-label tracking-widest">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Disclaimer */}
            <div className="px-4 text-[9px] text-white/20 uppercase tracking-widest leading-loose text-center">
              Copyright © 2024 Velocity Grid Networks. Stream authentication is provided by the carrier network. 
              Playback issues? Contact carrier nodes directly.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
