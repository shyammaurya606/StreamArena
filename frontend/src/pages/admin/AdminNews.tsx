import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface NewsItem { id: string; title: string; url: string; image?: string; pinned: boolean; hidden: boolean; }
const EMPTY = { title: "", url: "", image: "", pinned: true, hidden: false };

export default function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => fetch(`${API}/api/admin/pinned-news`).then(r => r.json()).then(data => {
    if (Array.isArray(data)) setItems(data);
    else setItems([]);
  }).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async () => {
    const url = editingId ? `${API}/api/admin/pinned-news/${editingId}` : `${API}/api/admin/pinned-news`;
    await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm(EMPTY); setEditingId(null); setShowForm(false); load();
  };

  const del = async (id: string) => {
    await fetch(`${API}/api/admin/pinned-news/${id}`, { method: "DELETE" }); load();
  };

  const toggle = async (item: NewsItem, field: "pinned" | "hidden") => {
    await fetch(`${API}/api/admin/pinned-news/${item.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, [field]: !item[field] }),
    });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Pinned News</h2>
        <button onClick={() => { setForm(EMPTY); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-headline font-bold uppercase text-sm transition-colors">
          <span className="material-symbols-outlined text-base">add</span> Pin Article
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg">
            <h3 className="text-xl font-headline font-black text-white uppercase mb-6">{editingId ? "Edit" : "Pin"} Article</h3>
            {[
              { key: "title", label: "Headline", type: "text" },
              { key: "url", label: "Article URL", type: "text" },
              { key: "image", label: "Image URL (optional)", type: "text" },
            ].map(f => (
              <div key={f.key} className="mb-4">
                <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors" />
              </div>
            ))}
            <div className="flex gap-6 mb-6">
              {(["pinned", "hidden"] as const).map(f => (
                <label key={f} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={(form as any)[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.checked }))}
                    className="w-4 h-4 rounded accent-red-600" />
                  <span className="text-gray-300 text-sm font-label capitalize">{f}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={save} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {(!items || items.length === 0) && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-600 font-body">
            No pinned articles yet. Pin one to feature it on the site.
          </div>
        )}
        {Array.isArray(items) && items.map(item => (
          <div key={item.id} className={`bg-gray-900 border ${item.hidden ? "border-gray-800 opacity-50" : "border-gray-800"} rounded-2xl p-5 flex items-center gap-4`}>
            {item.image && <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-800 shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="text-white font-body font-medium text-sm truncate">{item.title}</p>
              <a href={item.url} target="_blank" rel="noreferrer" className="text-gray-500 text-xs hover:text-red-500 transition-colors truncate block">{item.url}</a>
              <div className="flex gap-2 mt-2">
                {item.pinned && <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-label uppercase font-bold">Pinned</span>}
                {item.hidden && <span className="bg-gray-700 text-gray-400 px-2 py-0.5 rounded text-[10px] font-label uppercase font-bold">Hidden</span>}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggle(item, "pinned")} title={item.pinned ? "Unpin" : "Pin"}
                className="p-2 text-gray-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">{item.pinned ? "push_pin" : "keep"}</span>
              </button>
              <button onClick={() => toggle(item, "hidden")} title={item.hidden ? "Show" : "Hide"}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">{item.hidden ? "visibility" : "visibility_off"}</span>
              </button>
              <button onClick={() => { setForm({ title: item.title, url: item.url, image: item.image ?? "", pinned: item.pinned, hidden: item.hidden }); setEditingId(item.id); setShowForm(true); }}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
              <button onClick={() => del(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
