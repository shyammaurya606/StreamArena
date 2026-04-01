import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const getNavLinkClass = (path: string) => {
    return `font-headline tracking-tight font-bold uppercase text-sm transition-colors ${
      location.pathname === path
        ? "text-red-600 border-b-2 border-red-600 pb-0.5"
        : "text-slate-600 hover:text-red-600 pb-0.5"
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP NAV */}
      <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter font-headline uppercase select-none">
              Velocity Grid
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className={getNavLinkClass("/")}>Home</Link>
              <Link to="/news" className={getNavLinkClass("/news")}>News</Link>
              <Link to="/directory" className={getNavLinkClass("/directory")}>Directory</Link>
               <Link to="/live" className={getNavLinkClass("/live")}>Live Now</Link>
              <Link to="/schedules" className={getNavLinkClass("/schedules")}>Schedules</Link>
              <Link to="/platforms" className={getNavLinkClass("/platforms")}>Categories</Link>
              <Link to="/about" className={getNavLinkClass("/about")}>About</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full min-w-[260px] border border-transparent focus-within:border-surface-tint/20 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-on-surface-variant mr-2 text-lg">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full font-body placeholder-on-surface-variant/60"
                placeholder="Search channels, teams, sports..."
                type="text"
              />
            </div>
            <button className="p-2 text-slate-600 hover:text-red-600 active:scale-95 duration-150 transition-all">
              <span className="material-symbols-outlined lg:hidden">search</span>
            </button>
            <button className="p-2 text-slate-600 hover:text-red-600 active:scale-95 duration-150 transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-surface-container-high transition-colors">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-red-600 transition-colors object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-headline font-black text-sm">
                      {(currentUser.displayName || currentUser.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-outline-variant/10 shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto z-50 origin-top-right scale-95 group-hover:scale-100">
                  <div className="px-4 py-3 border-b border-outline-variant/10">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-label mb-0.5">Signed in as</p>
                    <p className="font-bold text-sm text-slate-900 truncate">{currentUser.displayName || currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2.5 text-sm font-headline uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-red-600 text-white font-headline font-bold text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap ml-1">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-200 bg-slate-50 mt-auto pb-16 md:pb-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12 max-w-screen-2xl mx-auto">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-black text-slate-900 font-headline uppercase tracking-tighter">Velocity Grid</span>
            <p className="mt-3 text-slate-500 font-body text-sm leading-relaxed max-w-xs">
              The premier directory for sports enthusiasts and broadcasters worldwide. Precision engineering for the sports fan.
            </p>
          </div>
          <div>
            <h5 className="font-headline font-black uppercase text-xs tracking-widest mb-4 text-slate-900">Sports</h5>
            <ul className="space-y-2 font-body text-sm text-slate-500">
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Football</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Basketball</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Tennis</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Cricket</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-headline font-black uppercase text-xs tracking-widest mb-4 text-slate-900">Network</h5>
            <ul className="space-y-2 font-body text-sm text-slate-500">
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Motorsports</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Golf</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="/live">Live Directory</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="/schedules">Channel Guide</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-headline font-black uppercase text-xs tracking-widest mb-4 text-slate-900">Legal</h5>
            <ul className="space-y-2 font-body text-sm text-slate-500">
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Privacy Policy</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Terms of Service</Link></li>
              <li><Link className="hover:underline hover:text-slate-900 transition-all" to="#">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="px-6 py-5 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3 max-w-screen-2xl mx-auto">
          <p className="text-slate-500 font-body text-sm">© 2026 Velocity Grid. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-slate-400 hover:text-red-600 cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-red-600 cursor-pointer transition-colors">share</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-red-600 cursor-pointer transition-colors">rss_feed</span>
          </div>
        </div>
      </footer>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-white border-t border-slate-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
        <Link className={`flex flex-col items-center justify-center ${location.pathname==='/'?'text-red-600 font-bold':'text-slate-400'}`} to="/">
          <span className="material-symbols-outlined" style={location.pathname==='/'?{fontVariationSettings:"'FILL' 1"}:{}}>home</span>
          <span className="font-label text-[9px] font-bold uppercase tracking-widest">Home</span>
        </Link>
        <Link className={`flex flex-col items-center justify-center ${location.pathname==='/live'?'text-red-600 font-bold':'text-slate-400'}`} to="/live">
          <span className="material-symbols-outlined" style={location.pathname==='/live'?{fontVariationSettings:"'FILL' 1"}:{}}>sensors</span>
          <span className="font-label text-[9px] font-medium uppercase tracking-widest">Live</span>
        </Link>
         <Link className={`flex flex-col items-center justify-center ${location.pathname==='/news'?'text-red-600 font-bold':'text-slate-400'}`} to="/news">
          <span className="material-symbols-outlined" style={location.pathname==='/news'?{fontVariationSettings:"'FILL' 1"}:{}}>newspaper</span>
          <span className="font-label text-[9px] font-medium uppercase tracking-widest">News</span>
        </Link>
        <Link className={`flex flex-col items-center justify-center ${location.pathname==='/directory'?'text-red-600 font-bold':'text-slate-400'}`} to="/directory">
          <span className="material-symbols-outlined" style={location.pathname==='/directory'?{fontVariationSettings:"'FILL' 1"}:{}}>layers</span>
          <span className="font-label text-[9px] font-medium uppercase tracking-widest">Directory</span>
        </Link>
        <Link className={`flex flex-col items-center justify-center ${location.pathname==='/live'?'text-red-600 font-bold':'text-slate-400'}`} to="/live">
          <span className="material-symbols-outlined" style={location.pathname==='/live'?{fontVariationSettings:"'FILL' 1"}:{}}>live_tv</span>
          <span className="font-label text-[9px] font-medium uppercase tracking-widest">Live</span>
        </Link>
        <Link className={`flex flex-col items-center justify-center ${location.pathname==='/schedules'?'text-red-600 font-bold':'text-slate-400'}`} to="/schedules">
          <span className="material-symbols-outlined" style={location.pathname==='/schedules'?{fontVariationSettings:"'FILL' 1"}:{}}>calendar_today</span>
          <span className="font-label text-[9px] font-medium uppercase tracking-widest">Schedule</span>
        </Link>
        <Link className={`flex (flex-col items-center justify-center) ${location.pathname==='/platforms'?'bg-red-600 text-white rounded-xl p-2 scale-110 shadow-lg shadow-red-600/20':'text-slate-400 p-2'}`} to="/platforms">
          <span className="material-symbols-outlined" style={location.pathname==='/platforms'?{fontVariationSettings:"'FILL' 1"}:{}}>grid_view</span>
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider mt-1">Categories</span>
        </Link>
      </nav>
    </div>
  );
}
