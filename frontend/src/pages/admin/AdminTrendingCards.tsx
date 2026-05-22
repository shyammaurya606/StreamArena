import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface TrendingCard { image: string; sport_label: string; title: string; score: string; score_detail: string; href: string; }
interface FeaturedCard { image: string; badge: string; label: string; title: string; viewers: string; href: string; description?: string; }
interface TrendingData { featured: FeaturedCard; cards: TrendingCard[]; }

const DEFAULT: TrendingData = {
  featured: { image: "", badge: "4K Ultra HD", label: "Premier League", title: "Manchester Derby: Live from Etihad", viewers: "1.2M", href: "/live", description: "Experience the legendary Manchester Derby live in ultra high definition with multi-camera angles and full English commentary." },
  cards: [
    { image: "/nba-card.png", sport_label: "NBA Basketball", title: "Lakers vs Warriors", score: "112 – 108", score_detail: "Q4 04:12", href: "/live" },
    { image: "/f1-card.png", sport_label: "Formula 1", title: "Monaco Grand Prix Practice", score: "", score_detail: "LIVE HD", href: "/live" },
  ]
};

const inputCls = "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors";
const labelCls = "text-gray-400 text-xs font-label uppercase tracking-widest block mb-1";

export default function AdminTrendingCards() {
  const [data, setData] = useState<TrendingData>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/trending-cards`).then(r => r.json()).then(setData).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API}/api/admin/trending-cards`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setFeatured = (key: keyof FeaturedCard, val: string) =>
    setData(d => ({ ...d, featured: { ...d.featured, [key]: val } }));

  const setCard = (i: number, key: keyof TrendingCard, val: string) =>
    setData(d => { const cards = [...d.cards]; cards[i] = { ...cards[i], [key]: val }; return { ...d, cards }; });

  const addCard = () => setData(d => ({ ...d, cards: [...d.cards, { image: "", sport_label: "", title: "", score: "", score_detail: "", href: "/live" }] }));
  const removeCard = (i: number) => setData(d => ({ ...d, cards: d.cards.filter((_, idx) => idx !== i) }));

  return (
    <div>
      <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-2">Trending Cards Editor</h2>
      <p className="text-gray-500 text-sm font-label mb-6">Control the "Trending Now" section on the home page. Changes are reflected immediately after saving.</p>

      <div className="space-y-6">

        {/* Featured Big Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-red-500 text-xs font-label uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">star</span> Featured Card (Large — Left Side)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([
              ["image", "Image URL"],
              ["label", "Sport Label (e.g. Premier League)"],
              ["title", "Match Title"],
              ["badge", "Badge Text (e.g. 4K Ultra HD)"],
              ["viewers", "Viewer Count (e.g. 1.2M)"],
              ["href", "Click Link (e.g. /live)"],
            ] as [keyof FeaturedCard, string][]).map(([key, lbl]) => (
              <div key={key}>
                <label className={labelCls}>{lbl}</label>
                <input value={data.featured[key] || ""} onChange={e => setFeatured(key, e.target.value)} className={inputCls} />
              </div>
            ))}
          </div>
          {/* Description Textarea */}
          <div className="mt-4">
            <label className={labelCls}>Description</label>
            <textarea
              rows={3}
              value={data.featured.description || ""}
              onChange={e => setFeatured("description", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors resize-none"
              placeholder="Enter featured match description..."
            />
          </div>
          {/* Image Preview */}
          {data.featured.image && (
            <div className="mt-4 rounded-xl overflow-hidden h-32">
              <img src={data.featured.image} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Side Cards */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-red-500 text-xs font-label uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">view_column</span> Side Cards (Right Column)
            </h3>
            <button onClick={addCard} className="flex items-center gap-1 text-xs font-label font-bold uppercase text-green-400 hover:text-green-300 transition-colors border border-green-400/30 px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-sm">add</span> Add Card
            </button>
          </div>
          <div className="space-y-6">
            {data.cards.map((card, i) => (
              <div key={i} className="border border-gray-700 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-xs font-label uppercase tracking-widest">Card {i + 1}</span>
                  <button onClick={() => removeCard(i)} className="text-red-500 hover:text-red-400 text-xs font-label uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">delete</span> Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {([
                    ["image", "Image URL"],
                    ["sport_label", "Sport Label"],
                    ["title", "Match Title"],
                    ["score", "Score (leave blank for icon)"],
                    ["score_detail", "Detail (e.g. Q4 04:12 or LIVE HD)"],
                    ["href", "Click Link"],
                  ] as [keyof TrendingCard, string][]).map(([key, lbl]) => (
                    <div key={key}>
                      <label className={labelCls}>{lbl}</label>
                      <input value={card[key]} onChange={e => setCard(i, key, e.target.value)} className={inputCls} />
                    </div>
                  ))}
                </div>
                {card.image && (
                  <div className="mt-3 rounded-lg overflow-hidden h-24">
                    <img src={card.image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button onClick={save} disabled={saving}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base">{saved ? "check_circle" : "save"}</span>
          {saving ? "Saving…" : saved ? "Saved!" : "Save Trending Cards"}
        </button>
      </div>
    </div>
  );
}
