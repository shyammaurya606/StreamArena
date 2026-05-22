import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

interface Channel {
  id: string; short_name: string; full_name: string; tagline: string;
  category: string; country: string; hero_image: string; description: string;
  sports: string[]; watch_url: string;
  schedule: { time: string; category: string; title: string; highlight?: boolean }[];
}

interface AdSlot {
  type: "image" | "video";
  media_url: string;
  redirect_url: string;
  label: string;
  active: boolean;
  skip_seconds?: number;
}
interface AdConfig {
  home_top: AdSlot;
  sidebar_ad: AdSlot;
  watch_midroll: AdSlot;
}

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [adConfig, setAdConfig] = useState<AdConfig | null>(null);
  const [adPlaying, setAdPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${API}/api/channels/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setChannel)
      .catch(() => setChannel(null))
      .finally(() => setLoading(false));

    fetch(`${API}/api/admin/ad-config`)
      .then(r => r.json())
      .then(setAdConfig)
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!adPlaying || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [adPlaying, timeLeft]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-headline font-black text-4xl text-white uppercase tracking-tighter mb-4">Invalid Stream</h1>
        <button onClick={() => navigate("/directory")} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-headline font-bold uppercase">Back to Directory</button>
      </div>
    );
  }

  const liveMatch = channel.schedule?.find(m => m.highlight) || channel.schedule?.[0];


  const handleLaunchStream = () => {
    if (adConfig?.watch_midroll?.active && adConfig.watch_midroll.media_url) {
      setAdPlaying(true);
      setTimeLeft(adConfig.watch_midroll.skip_seconds ?? 5);
    } else {
      window.open(channel?.watch_url, "_blank");
    }
  };

  const handleSkipAd = () => {
    setAdPlaying(false);
    window.open(channel?.watch_url, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(`/channel/${channel.id}`)}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-all text-[10px] font-label font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Exit Theater
          </button>
          <div className="h-4 w-px bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center p-1 overflow-hidden shrink-0">
              <span className="text-black font-headline font-black text-[10px]">{channel.short_name}</span>
            </div>
            <div>
              <h2 className="font-headline font-black text-sm uppercase tracking-tight leading-none">{channel.full_name}</h2>
              <span className="text-[8px] text-red-500 font-label font-black uppercase tracking-[0.2em] flex items-center gap-1 mt-0.5 animate-pulse">
                <span className="w-1 h-1 rounded-full bg-red-500" /> LIVE NOW
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {liveMatch && (
            <div className="hidden lg:flex items-center gap-4 mr-4">
              <div className="text-right">
                <p className="text-[9px] text-white/40 font-label uppercase tracking-widest">{liveMatch.category}</p>
                <p className="text-[11px] font-bold uppercase truncate max-w-[200px]">{liveMatch.title}</p>
              </div>
            </div>
          )}
          <button className="p-2 text-white/40 hover:text-white transition-all"><span className="material-symbols-outlined">settings</span></button>
          <button className="p-2 text-white/40 hover:text-white transition-all"><span className="material-symbols-outlined">fullscreen</span></button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-surface-container-lowest group">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img src={channel.hero_image} alt="Theater Backdrop"
            className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40 group-hover:scale-105 transition-transform duration-[10s]" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-black/60 backdrop-blur-[2px]">
            <div className="max-w-2xl px-6">
              <span className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black font-label uppercase tracking-widest mb-6 shadow-lg shadow-red-600/30">
                Official Network Broadcast
              </span>
              <h1 className="font-headline font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4">
                Watch {channel.short_name} <br /> Official Live Feed
              </h1>
              <p className="text-white/60 font-body text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
                Connect to the official {channel.full_name} secure broadcast. You will be authenticated via Stream Arena and directed to the high-definition stream.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleLaunchStream}
                  className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto px-10 py-5 rounded-xl font-headline font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Launch Secure Stream
                </button>
                <button onClick={() => navigate(`/channel/${channel.id}`)}
                  className="w-full md:w-auto px-8 py-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-headline font-bold text-sm uppercase tracking-widest transition-all">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-headline font-bold text-xl uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-red-600">info</span> Broadcasting Details
            </h3>
            <p className="text-white/60 leading-relaxed text-base font-body mb-8">
              {channel.description} This theater view session is managed by Stream Arena Pro.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-6 bg-white/5 rounded-2xl border border-white/5">
              {[["Status","Encrypted","text-green-500"],["Source",`${channel.short_name}-HD`,"text-white"],["Bitrate","4.8 GBPS","text-white"],["Server","SG-DX-01","text-white"]].map(([label, value, cls]) => (
                <div key={label}>
                  <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] font-label mb-1">{label}</span>
                  <span className={`${cls} font-bold text-xs uppercase leading-none`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h4 className="font-headline font-bold text-sm uppercase tracking-widest mb-4">Tonight's Lineup</h4>
              <div className="space-y-4">
                {channel.schedule?.slice(0, 3).map((item, idx) => (
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
            <div className="px-4 text-[9px] text-white/20 uppercase tracking-widest leading-loose text-center">
              Copyright © 2026 Stream Arena Networks. Stream authentication is provided by the carrier network.
            </div>
          </div>
        </div>
      </main>

      {/* PRE-ROLL VIDEO AD OVERLAY */}
      {adPlaying && adConfig?.watch_midroll && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 md:p-12 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-label font-bold text-red-500 uppercase tracking-[0.2em] bg-red-950/40 px-2.5 py-1 rounded">Sponsored Ad</span>
              <p className="text-white/60 font-body text-xs md:text-sm">
                Supporting free streaming on Stream Arena
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-headline font-bold text-sm uppercase tracking-tight">
                {adConfig.watch_midroll.label || "Sponsored Ad"}
              </p>
            </div>
          </div>

          {/* Centered Video Player */}
          <div className="flex-1 flex items-center justify-center my-6 max-h-[70vh] relative group/player">
            <a
              href={adConfig.watch_midroll.redirect_url}
              target="_blank"
              rel="noreferrer"
              className="relative block w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black cursor-pointer shadow-2xl"
            >
              {adConfig.watch_midroll.type === "image" ? (
                <img
                  src={adConfig.watch_midroll.media_url}
                  alt={adConfig.watch_midroll.label || "Sponsored Ad"}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  src={adConfig.watch_midroll.media_url}
                  className="w-full h-full object-contain"
                  autoPlay
                  playsInline
                  muted={isMuted}
                  loop
                />
              )}

              {/* Click overlay hint */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/player:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-white font-label font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-xl flex items-center gap-2">
                  Visit Sponsor Website <span className="material-symbols-outlined text-sm">open_in_new</span>
                </span>
              </div>
            </a>

            {/* Mute toggle button */}
            {adConfig.watch_midroll.type === "video" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {isMuted ? "volume_off" : "volume_up"}
                </span>
              </button>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
            <p className="text-white/40 text-xs font-body text-center md:text-left">
              Click the video to visit our sponsor. Stream will launch automatically when you skip or complete the ad.
            </p>
            <div className="flex items-center gap-4 w-full md:w-auto">
              {timeLeft > 0 ? (
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-widest text-white/60 flex items-center gap-2 w-full md:w-auto justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  Skip Ad in {timeLeft}s
                </div>
              ) : (
                <button
                  onClick={handleSkipAd}
                  className="bg-white text-black hover:bg-red-600 hover:text-white px-8 py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  Skip Ad
                  <span className="material-symbols-outlined text-lg">skip_next</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
