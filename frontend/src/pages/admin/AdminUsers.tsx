import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API = "http://localhost:8000";

interface UserRecord {
  id: string;
  email: string;
  display_name?: string;
  provider: string;
  location?: string;
  subscribed_newsletter: boolean;
  created_at: string;
  last_sign_in?: string;
  photo_url?: string;
}

function Badge({ label, color }: { label: string; color: string }) {
  return <span className={`px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase ${color}`}>{label}</span>;
}

export default function AdminUsers() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "subscribers">("all");

  useEffect(() => {
    fetch(`${API}/api/admin/users`).then(r => r.json()).then(setUsers).catch(() => {
      // Fallback: show current admin user
      if (currentUser) {
        setUsers([{
          id: currentUser.uid,
          email: currentUser.email ?? "—",
          display_name: currentUser.displayName ?? undefined,
          provider: currentUser.providerData[0]?.providerId ?? "unknown",
          subscribed_newsletter: false,
          created_at: currentUser.metadata.creationTime ?? new Date().toISOString(),
          last_sign_in: currentUser.metadata.lastSignInTime ?? undefined,
          photo_url: currentUser.photoURL ?? undefined,
        }]);
      }
    });
  }, [currentUser]);

  const filtered = users.filter(u => {
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.display_name ?? "").toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || u.subscribed_newsletter;
    return matchSearch && matchTab;
  });

  const deleteUser = async (id: string) => {
    if (!confirm("Remove this user record? (Note: Due to lack of Firebase Admin, this only removes them from the CMS list until they log in again)")) return;
    
    try {
      await fetch(`${API}/api/admin/users/${id}`, { method: "DELETE" });
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const subscribers = users.filter(u => u.subscribed_newsletter).length;

  return (
    <div>
      <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-6">Users & Subscribers</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: users.length, icon: "group", color: "text-blue-400" },
          { label: "Newsletter Subs", value: subscribers, icon: "mark_email_read", color: "text-emerald-400" },
          { label: "Google Auth", value: users.filter(u => u.provider === "google.com").length, icon: "person", color: "text-amber-400" },
          { label: "Email Auth", value: users.filter(u => u.provider === "password").length, icon: "email", color: "text-purple-400" },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <span className={`material-symbols-outlined text-2xl ${s.color}`}>{s.icon}</span>
            <p className="text-2xl font-headline font-black text-white mt-2">{s.value}</p>
            <p className="text-gray-500 text-xs font-label uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 gap-1">
          {(["all", "subscribers"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-headline font-bold uppercase tracking-wide transition-colors ${tab === t ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"}`}>
              {t === "all" ? "All Users" : "Subscribers"}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 gap-2">
          <span className="material-symbols-outlined text-gray-500 text-lg">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…"
            className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-gray-600" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-800">
              {["User", "Provider", "Location", "Newsletter", "Joined", "Last Sign In", "Actions"].map(h => (
                <th key={h} className="text-left px-6 py-4 text-gray-400 text-xs font-label uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {u.photo_url
                      ? <img src={u.photo_url} alt="" className="w-9 h-9 rounded-full object-cover" />
                      : <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-headline font-black text-sm">
                          {(u.display_name || u.email || "?")[0].toUpperCase()}
                        </div>}
                    <div>
                      <p className="text-white text-sm font-body font-medium">{u.display_name || "—"}</p>
                      <p className="text-gray-500 text-xs font-body">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge label={u.provider === "google.com" ? "Google" : u.provider === "password" ? "Email" : u.provider}
                    color={u.provider === "google.com" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"} />
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm font-body">{u.location || "—"}</td>
                <td className="px-6 py-4">
                  {u.subscribed_newsletter
                    ? <Badge label="Subscribed" color="bg-emerald-500/20 text-emerald-400" />
                    : <Badge label="No" color="bg-gray-700 text-gray-500" />}
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs font-body whitespace-nowrap">
                  {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs font-body whitespace-nowrap">
                  {u.last_sign_in ? new Date(u.last_sign_in).toLocaleDateString() : "—"}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteUser(u.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete record">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-600 font-body">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 text-xs font-label mt-4 text-center">
        Full user management → <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-red-500 hover:underline">Firebase Console</a>
      </p>
    </div>
  );
}
