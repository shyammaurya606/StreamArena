import { useEffect, useState } from "react";

const API = "http://localhost:8000";

interface Config { api_sports_enabled: boolean; cricket_api_enabled: boolean; news_api_enabled: boolean; }
const DEFAULT: Config = { api_sports_enabled: true, cricket_api_enabled: true, news_api_enabled: true };

const API_DETAILS = [
  { key: "api_sports_enabled" as const, label: "API-Sports", description: "Powers Football, Basketball, F1, and 9 other sports live scores & schedules.", icon: "sports_soccer", color: "amber" },
  { key: "cricket_api_enabled" as const, label: "CricAPI", description: "Powers live cricket scores, match details, and schedules via CricAPI.", icon: "sports_cricket", color: "green" },
  { key: "news_api_enabled" as const, label: "NewsAPI", description: "Fetches top sports headlines and article feeds across categories.", icon: "feed", color: "purple" },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${value ? "bg-emerald-500" : "bg-gray-700"}`}>
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${value ? "left-7" : "left-1"}`} />
    </button>
  );
}

export default function AdminApiKeys() {
  const [config, setConfig] = useState<Config>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/api-config`).then(r => r.json()).then(setConfig).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API}/api/admin/api-config`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const colorMap: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-400",
    green: "bg-green-500/10 text-green-400",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div>
      <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-2">API Key Controls</h2>
      <p className="text-gray-500 text-sm font-body mb-6">Toggle external APIs on or off. Disabled APIs fall back to mock data.</p>

      <div className="space-y-4 mb-6">
        {API_DETAILS.map(api => (
          <div key={api.key} className={`bg-gray-900 border ${config[api.key] ? "border-gray-800" : "border-gray-800/40 opacity-60"} rounded-2xl p-6 flex items-center gap-5 transition-all`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[api.color]}`}>
              <span className="material-symbols-outlined text-2xl">{api.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-headline font-bold text-base">{api.label}</p>
                <span className={`px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase ${config[api.key] ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700 text-gray-500"}`}>
                  {config[api.key] ? "Active" : "Disabled"}
                </span>
              </div>
              <p className="text-gray-500 text-sm font-body">{api.description}</p>
            </div>
            <Toggle value={config[api.key]} onChange={v => setConfig(p => ({ ...p, [api.key]: v }))} />
          </div>
        ))}
      </div>

      {/* Keys info box */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <h3 className="text-gray-400 text-xs font-label uppercase tracking-widest mb-3">API Key Storage</h3>
        <p className="text-gray-500 text-sm font-body leading-relaxed">
          API keys are stored securely in the <code className="bg-gray-800 text-red-400 px-1.5 py-0.5 rounded text-xs">backend/.env</code> file.
          To update a key, edit that file and restart the backend server. Keys are never exposed to the frontend.
        </p>
        <div className="mt-4 space-y-2">
          {[
            { label: "API_SPORTS_KEY", hint: "api-sports.io" },
            { label: "CRICKET_API_KEY", hint: "cricapi.com" },
            { label: "NEWS_API_KEY", hint: "newsapi.org" },
          ].map(k => (
            <div key={k.label} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-2.5">
              <code className="text-green-400 text-xs font-mono">{k.label}</code>
              <span className="text-gray-500 text-xs font-label">{k.hint}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={save} disabled={saving}
        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors flex items-center gap-2">
        <span className="material-symbols-outlined text-base">{saved ? "check_circle" : "save"}</span>
        {saving ? "Saving…" : saved ? "Saved!" : "Save Config"}
      </button>
    </div>
  );
}
