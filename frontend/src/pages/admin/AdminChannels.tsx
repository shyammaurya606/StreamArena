import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface Channel {
  id: string;
  name: string;
  category: string;
  region: string;
  viewers: number;
  logo?: string;
  stream_url?: string;
  description?: string;
}

const EMPTY: Omit<Channel, "id"> = { name: "", category: "", region: "", viewers: 0, logo: "", stream_url: "", description: "" };

export default function AdminChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [form, setForm] = useState<Omit<Channel, "id">>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const load = () => {
    fetch(`${API}/api/admin/channels`).then(r => r.json()).then(setChannels).catch(() => {});
  };
  useEffect(load, []);

  const save = async () => {
    setLoading(true);
    const url = editingId ? `${API}/api/admin/channels/${editingId}` : `${API}/api/admin/channels`;
    const method = editingId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm(EMPTY); setEditingId(null); setShowForm(false); setLoading(false); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this channel?")) return;
    await fetch(`${API}/api/admin/channels/${id}`, { method: "DELETE" });
    load();
  };

  const startEdit = (c: Channel) => {
    setForm({ name: c.name, category: c.category, region: c.region, viewers: c.viewers, logo: c.logo ?? "", stream_url: c.stream_url ?? "", description: c.description ?? "" });
    setEditingId(c.id); setShowForm(true);
  };

  const filtered = channels.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Channels</h2>
        <button onClick={() => { setForm(EMPTY); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-headline font-bold uppercase text-sm transition-colors">
          <span className="material-symbols-outlined text-base">add</span> Add Channel
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 mb-5 gap-2">
        <span className="material-symbols-outlined text-gray-500 text-lg">search</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search channels..." className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-gray-600" />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg">
            <h3 className="text-xl font-headline font-black text-white uppercase mb-6">{editingId ? "Edit" : "Add"} Channel</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "name", label: "Name", type: "text", full: true },
                { key: "category", label: "Category", type: "text" },
                { key: "region", label: "Region", type: "text" },
                { key: "viewers", label: "Viewers", type: "number" },
                { key: "logo", label: "Logo URL", type: "text", full: true },
                { key: "stream_url", label: "Stream URL", type: "text", full: true },
                { key: "description", label: "Description", type: "text", full: true },
              ].map(f => (
                <div key={f.key} className={f.full ? "col-span-2" : ""}>
                  <label className="text-gray-400 text-xs font-label uppercase tracking-widest block mb-1">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: f.type === "number" ? +e.target.value : e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors disabled:opacity-50">
                {loading ? "Saving..." : "Save Channel"}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-headline font-bold uppercase text-sm transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              {["Channel", "Category", "Region", "Viewers", "Actions"].map(h => (
                <th key={h} className="text-left px-6 py-4 text-gray-400 text-xs font-label uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {c.logo ? <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-cover bg-gray-800" /> :
                      <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center"><span className="material-symbols-outlined text-red-500 text-sm">live_tv</span></div>}
                    <span className="text-white font-body font-medium text-sm">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg text-xs font-label">{c.category}</span></td>
                <td className="px-6 py-4 text-gray-400 text-sm font-body">{c.region}</td>
                <td className="px-6 py-4 text-gray-300 text-sm font-body">{c.viewers.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(c)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button onClick={() => del(c.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-600 font-body">No channels found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
