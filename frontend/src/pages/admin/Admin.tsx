import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";
import AdminChannels from "./AdminChannels";
import AdminNews from "./AdminNews";
import AdminHeroBanner from "./AdminHeroBanner";
import AdminApiKeys from "./AdminApiKeys";
import AdminUsers from "./AdminUsers";
import AdminTrendingCards from "./AdminTrendingCards";
import AdminAds from "./AdminAds";

type Section = "dashboard" | "channels" | "news" | "hero" | "trending" | "apikeys" | "users" | "ads";

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "channels", label: "Channels", icon: "live_tv" },
  { id: "news", label: "News", icon: "newspaper" },
  { id: "hero", label: "Hero Banner", icon: "image" },
  { id: "trending", label: "Trending Cards", icon: "trending_up" },
  { id: "ads", label: "Ads Manager", icon: "campaign" },
  { id: "apikeys", label: "API Keys", icon: "key" },
  { id: "users", label: "Users", icon: "group" },
];

export default function Admin() {
  const { currentUser, logout } = useAuth();
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SectionContent = () => {
    switch (active) {
      case "dashboard": return <AdminDashboard />;
      case "channels":  return <AdminChannels />;
      case "news":      return <AdminNews />;
      case "hero":      return <AdminHeroBanner />;
      case "trending":  return <AdminTrendingCards />;
      case "ads":       return <AdminAds />;
      case "apikeys":   return <AdminApiKeys />;
      case "users":     return <AdminUsers />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">shield_person</span>
            </div>
            <div>
              <p className="text-white font-headline font-black text-sm uppercase tracking-tight">Stream Arena</p>
              <p className="text-red-500 text-[10px] font-label uppercase tracking-widest font-bold">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setActive(n.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-headline font-bold uppercase tracking-wide transition-all ${
                active === n.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}>
              <span className="material-symbols-outlined text-xl" style={active === n.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        {/* User info */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-2 mb-3">
            {currentUser?.photoURL
              ? <img src={currentUser.photoURL} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-red-600" />
              : <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm">
                  {(currentUser?.displayName || currentUser?.email || "A")[0].toUpperCase()}
                </div>}
            <div className="min-w-0">
              <p className="text-white text-xs font-body font-medium truncate">{currentUser?.displayName || "Admin"}</p>
              <p className="text-gray-500 text-[10px] font-label truncate">{currentUser?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-label uppercase transition-colors">
              <span className="material-symbols-outlined text-sm">home</span> Site
            </Link>
            <button onClick={logout} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-gray-800 hover:bg-red-600/20 text-gray-400 hover:text-red-500 text-xs font-label uppercase transition-colors">
              <span className="material-symbols-outlined text-sm">logout</span> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <p className="text-white font-headline font-black uppercase text-lg tracking-tight">
                {NAV.find(n => n.id === active)?.label}
              </p>
              <p className="text-gray-500 text-xs font-label hidden sm:block">Stream Arena CMS — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/docs" target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-white text-xs font-label uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-sm">api</span> API Docs
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <SectionContent />
        </main>
      </div>
    </div>
  );
}
