import { useEffect, useState } from "react";

const API = "http://localhost:8000";

interface Banner {
  badge_text: string;
  headline_line1: string;
  headline_line2: string;
  subtitle: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
  hero_image: string;
  live_ticker: { label: string; team1: string; team2: string; score: string; elapsed: string; }[];
}

const DEFAULT: Banner = {
  badge_text: "Live: Champions League Finals",
  headline_line1: "STREAM",
  headline_line2: "ARENA",
  subtitle: "The ultimate directory for global sports broadcasting. Every game, every channel, zero clutter.",
  cta_primary_label: "Live Now",
  cta_primary_href: "/live",
  cta_secondary_label: "View Schedule",
  cta_secondary_href: "/schedules",
  hero_image: "/hero-arena.png",
  live_ticker: [
    { label: "Live Match", team1: "Real Madrid", team2: "Liverpool", score: "3 – 2", elapsed: "78'" },
    { label: "Live Match", team1: "Lakers", team2: "Warriors", score: "112 – 108", elapsed: "Q4" }
  ]
};

const fields: { key: Exclude<keyof Banner, "live_ticker">; label: string }[] = [
  { key: "badge_text", label: "Badge Text (Live pill)" },
  { key: "headline_line1", label: "Headline Line 1" },
  { key: "headline_line2", label: "Headline Line 2" },
  { key: "subtitle", label: "Subtitle / Description" },
  { key: "cta_primary_label", label: "Primary Button Label" },
  { key: "cta_primary_href", label: "Primary Button Link" },
  { key: "cta_secondary_label", label: "Secondary Button Label" },
  { key: "cta_secondary_href", label: "Secondary Button Link" },
];

export default function AdminHeroBanner() {
  const [banner, setBanner] = useState<Banner>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/hero-banner`).then(r => r.json()).then(setBanner).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API}/api/admin/hero-banner`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(banner) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-6">Hero Banner Editor</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-gray-400 text-xs font-label uppercase tracking-widest mb-5">Edit Fields</h3>
          <div className="space-y-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">{f.label}</label>
                <input
                  value={banner[f.key]}
                  onChange={e => setBanner(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="mt-6 pt-5 border-t border-gray-800">
            <h4 className="text-gray-500 text-[10px] font-label uppercase tracking-widest mb-3">Hero Background Image</h4>
            <div>
              <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">Image URL or /local-path</label>
              <input
                value={banner.hero_image}
                onChange={e => setBanner(p => ({ ...p, hero_image: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
                placeholder="/hero-arena.png or https://..."
              />
            </div>
            {banner.hero_image && (
              <div className="mt-3 rounded-xl overflow-hidden h-24">
                <img src={banner.hero_image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Live Ticker */}
          <div className="mt-6 pt-5 border-t border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-gray-500 text-[10px] font-label uppercase tracking-widest">Live Match Ticker (Hero Right Side)</h4>
              <button
                onClick={() => setBanner(p => ({ ...p, live_ticker: [...p.live_ticker, { label: "Live Match", team1: "", team2: "", score: "", elapsed: "" }] }))}
                className="text-green-400 text-[10px] font-label uppercase flex items-center gap-1 border border-green-400/30 px-2 py-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-sm">add</span> Add
              </button>
            </div>
            <div className="space-y-3">
              {banner.live_ticker.map((t, i) => (
                <div key={i} className="border border-gray-700 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-[10px] uppercase font-label">Ticker {i + 1}</span>
                    <button onClick={() => setBanner(p => ({ ...p, live_ticker: p.live_ticker.filter((_, idx) => idx !== i) }))} className="text-red-500 text-[10px] uppercase font-label flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(["team1", "team2", "score", "elapsed"] as const).map(key => (
                      <div key={key}>
                        <label className="text-gray-500 text-[9px] uppercase font-label block mb-0.5">{key}</label>
                        <input value={t[key]} onChange={e => {
                          const tickers = [...banner.live_ticker];
                          tickers[i] = { ...tickers[i], [key]: e.target.value };
                          setBanner(p => ({ ...p, live_ticker: tickers }));
                        }} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-red-600" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={save} disabled={saving}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">{saved ? "check_circle" : "save"}</span>
            {saving ? "Saving…" : saved ? "Saved!" : "Save Banner"}
          </button>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-gray-400 text-xs font-label uppercase tracking-widest mb-5">Live Preview</h3>
          <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-xl p-6 min-h-[320px] flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent rounded-xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] font-label font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {banner.badge_text}
              </div>
              <h1 className="text-4xl font-headline font-black text-white uppercase italic leading-none mb-3">
                {banner.headline_line1}<br />{banner.headline_line2}
              </h1>
              <p className="text-white/60 text-sm font-body max-w-xs leading-relaxed mb-5">{banner.subtitle}</p>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-red-600 text-white text-xs font-headline font-bold uppercase px-4 py-2 rounded-lg">{banner.cta_primary_label}</span>
                <span className="bg-white/10 border border-white/20 text-white text-xs font-headline font-bold uppercase px-4 py-2 rounded-lg">{banner.cta_secondary_label}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-xs font-label mt-3 text-center">Preview only — actual hero uses real imagery</p>
        </div>
      </div>
    </div>
  );
}
