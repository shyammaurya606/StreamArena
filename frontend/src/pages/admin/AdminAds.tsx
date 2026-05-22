import { useEffect, useState } from "react";

const API = "http://localhost:8000";

interface AdPlacement {
  type: "image" | "video";
  media_url: string;
  redirect_url: string;
  active: boolean;
  label?: string;
  skip_seconds?: number;
}

interface AdConfig {
  home_top: AdPlacement;
  sidebar_ad: AdPlacement;
  watch_midroll: AdPlacement;
}

const DEFAULT_CONFIG: AdConfig = {
  home_top: {
    type: "image",
    media_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    redirect_url: "https://store.steampowered.com",
    active: true,
    label: "Steam Gaming Store"
  },
  sidebar_ad: {
    type: "image",
    media_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
    redirect_url: "https://www.playstation.com",
    active: true,
    label: "PlayStation 5 Console"
  },
  watch_midroll: {
    type: "video",
    media_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    redirect_url: "https://www.nike.com",
    active: true,
    skip_seconds: 5,
    label: "Nike Activewear"
  }
};

export default function AdminAds() {
  const [config, setConfig] = useState<AdConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/ad-config`)
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleToggle = (placement: keyof AdConfig) => {
    setConfig(prev => ({
      ...prev,
      [placement]: {
        ...prev[placement],
        active: !prev[placement].active
      }
    }));
  };

  const handleChange = (placement: keyof AdConfig, field: keyof AdPlacement, value: any) => {
    setConfig(prev => ({
      ...prev,
      [placement]: {
        ...prev[placement],
        [field]: value
      }
    }));
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/ad-config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Ads Manager</h2>
          <p className="text-gray-400 text-xs font-body mt-1">Configure image and video advertisements across major high-visibility sections.</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-headline font-bold uppercase text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
        >
          <span className="material-symbols-outlined text-base">{saved ? "check_circle" : "save"}</span>
          {saving ? "Saving…" : saved ? "Saved Successfully!" : "Save All Ads"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Placement 1: Home Top Banner */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-red-500 font-label text-xs uppercase tracking-wider font-bold">Placement 01</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.home_top.active}
                  onChange={() => handleToggle("home_top")}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 peer-checked:after:bg-white"></div>
              </label>
            </div>
            <h3 className="text-white font-headline font-bold text-lg mb-2">Home Top Banner</h3>
            <p className="text-gray-400 text-xs font-body mb-5">Horizontal image banner positioned above the trending sports cards feed on the main page.</p>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Ad Label / Title</label>
                <input
                  type="text"
                  value={config.home_top.label || ""}
                  onChange={e => handleChange("home_top", "label", e.target.value)}
                  placeholder="e.g. Steam Gaming Store"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Ad Type</label>
                <select
                  value={config.home_top.type}
                  onChange={e => handleChange("home_top", "type", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="image">Image Ad</option>
                  <option value="video">Video Ad</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Media URL</label>
                <input
                  type="text"
                  value={config.home_top.media_url}
                  onChange={e => handleChange("home_top", "media_url", e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Redirect Sponsor Link</label>
                <input
                  type="text"
                  value={config.home_top.redirect_url}
                  onChange={e => handleChange("home_top", "redirect_url", e.target.value)}
                  placeholder="https://sponsor-website.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <h4 className="text-gray-500 text-[10px] font-label uppercase tracking-widest mb-3">Live Placement Preview</h4>
            <div className={`relative border rounded-xl overflow-hidden aspect-[3/1] bg-gray-950 flex items-center justify-center transition-all ${config.home_top.active ? "border-gray-800" : "border-gray-800/40 opacity-40"}`}>
              {config.home_top.active ? (
                <>
                  {config.home_top.type === "video" ? (
                    <video
                      src={config.home_top.media_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={config.home_top.media_url}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                  )}
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-label uppercase text-white px-2 py-0.5 rounded">Sponsored</span>
                </>
              ) : (
                <span className="text-gray-600 text-xs font-label uppercase">Banner Deactivated</span>
              )}
            </div>
          </div>
        </div>

        {/* Placement 2: Sidebar Ad */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-red-500 font-label text-xs uppercase tracking-wider font-bold">Placement 02</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sidebar_ad.active}
                  onChange={() => handleToggle("sidebar_ad")}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 peer-checked:after:bg-white"></div>
              </label>
            </div>
            <h3 className="text-white font-headline font-bold text-lg mb-2">Sidebar Banner</h3>
            <p className="text-gray-400 text-xs font-body mb-5">Square image ad block integrated into the filters sidebar on the Directory navigation page.</p>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Ad Label / Title</label>
                <input
                  type="text"
                  value={config.sidebar_ad.label || ""}
                  onChange={e => handleChange("sidebar_ad", "label", e.target.value)}
                  placeholder="e.g. PlayStation 5 Console"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Ad Type</label>
                <select
                  value={config.sidebar_ad.type}
                  onChange={e => handleChange("sidebar_ad", "type", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="image">Image Ad</option>
                  <option value="video">Video Ad</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Media URL</label>
                <input
                  type="text"
                  value={config.sidebar_ad.media_url}
                  onChange={e => handleChange("sidebar_ad", "media_url", e.target.value)}
                  placeholder="https://example.com/square.jpg"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Redirect Sponsor Link</label>
                <input
                  type="text"
                  value={config.sidebar_ad.redirect_url}
                  onChange={e => handleChange("sidebar_ad", "redirect_url", e.target.value)}
                  placeholder="https://sponsor-website.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <h4 className="text-gray-500 text-[10px] font-label uppercase tracking-widest mb-3">Live Placement Preview</h4>
            <div className={`relative border rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 flex items-center justify-center transition-all ${config.sidebar_ad.active ? "border-gray-800" : "border-gray-800/40 opacity-40"}`}>
              {config.sidebar_ad.active ? (
                <>
                  {config.sidebar_ad.type === "video" ? (
                    <video
                      src={config.sidebar_ad.media_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={config.sidebar_ad.media_url}
                      alt="Sidebar Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  )}
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-label uppercase text-white px-2 py-0.5 rounded">Sponsored</span>
                </>
              ) : (
                <span className="text-gray-600 text-xs font-label uppercase">Sidebar Deactivated</span>
              )}
            </div>
          </div>
        </div>

        {/* Placement 3: Watch Pre-Roll Video Ad */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-red-500 font-label text-xs uppercase tracking-wider font-bold">Placement 03</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.watch_midroll.active}
                  onChange={() => handleToggle("watch_midroll")}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 peer-checked:after:bg-white"></div>
              </label>
            </div>
            <h3 className="text-white font-headline font-bold text-lg mb-2">Watch Video Pre-Roll</h3>
            <p className="text-gray-400 text-xs font-body mb-5">Video ad overlay displayed immediately when loading a live stream. Auto-skips or unlocks with countdown.</p>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Ad Label / Title</label>
                <input
                  type="text"
                  value={config.watch_midroll.label || ""}
                  onChange={e => handleChange("watch_midroll", "label", e.target.value)}
                  placeholder="e.g. Nike Activewear"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Ad Type</label>
                <select
                  value={config.watch_midroll.type}
                  onChange={e => handleChange("watch_midroll", "type", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="video">Video Ad</option>
                  <option value="image">Image Ad</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Video / Media URL</label>
                <input
                  type="text"
                  value={config.watch_midroll.media_url}
                  onChange={e => handleChange("watch_midroll", "media_url", e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Redirect Sponsor Link</label>
                <input
                  type="text"
                  value={config.watch_midroll.redirect_url}
                  onChange={e => handleChange("watch_midroll", "redirect_url", e.target.value)}
                  placeholder="https://sponsor-website.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Skip Ad Countdown (Seconds)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={config.watch_midroll.skip_seconds || 5}
                  onChange={e => handleChange("watch_midroll", "skip_seconds", parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <h4 className="text-gray-500 text-[10px] font-label uppercase tracking-widest mb-3">Live Placement Preview</h4>
            <div className={`relative border rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 flex items-center justify-center transition-all ${config.watch_midroll.active ? "border-gray-800" : "border-gray-800/40 opacity-40"}`}>
              {config.watch_midroll.active ? (
                <>
                  {config.watch_midroll.type === "video" ? (
                    <video
                      src={config.watch_midroll.media_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={config.watch_midroll.media_url}
                      alt="Pre-roll Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-label uppercase text-white px-2 py-0.5 rounded">Pre-Roll Ad</span>
                  <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-white text-[10px] font-label uppercase flex items-center gap-1">
                    <span>Skip in {config.watch_midroll.skip_seconds}s</span>
                  </div>
                </>
              ) : (
                <span className="text-gray-600 text-xs font-label uppercase">Pre-Roll Deactivated</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
