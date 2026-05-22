import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const API = "http://localhost:8000";

interface Stats {
  total_channels: number;
  pinned_news: number;
  api_sports_enabled: boolean;
  cricket_enabled: boolean;
  news_enabled: boolean;
  supabase_connected: boolean;
}

interface AnalyticsData {
  active_viewers_history: { time: string; viewers: number }[];
  popular_channels: { name: string; viewers: number }[];
  database_load_history: { time: string; cpu: number; memory: number; latency_ms: number }[];
  user_analytics: {
    page_hits: { path: string; views: number; clicks: number }[];
    platform_share: { name: string; value: number }[];
    time_spent_stats: { path: string; minutes: number }[];
    clicks_views_history?: { time: string; views: number; clicks: number }[];
    recent_feed: {
      user_email: string;
      event: string;
      path: string;
      target?: string;
      platform: string;
      duration?: number;
      timestamp: string;
      display_name?: string | null;
      photo_url?: string | null;
    }[];
  };
}

const PIE_COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#64748b"];

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 flex items-center gap-4 shadow-lg backdrop-blur-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color} shrink-0`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-gray-400 text-[10px] font-label uppercase tracking-widest truncate">{label}</p>
        <p className="text-xl font-headline font-black text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-950 border border-gray-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-xs font-bold" style={{ color: p.color || p.stroke || "#ef4444" }}>
            {p.name.replace(/_/g, ' ').toUpperCase()}: {p.value.toLocaleString()}{p.unit || ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<"system" | "user">("system");
  const [loading, setLoading] = useState(true);
  const now = new Date();

  const fetchDashboardData = () => {
    Promise.all([
      fetch(`${API}/api/admin/stats`).then(r => r.json()),
      fetch(`${API}/api/admin/analytics`).then(r => r.json())
    ])
      .then(([statsData, analyticsData]) => {
        setStats(statsData);
        setAnalytics(analyticsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
    // Poll updates every 15 seconds to keep the real-time activity feed alive!
    const interval = setInterval(fetchDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-400 text-xs mt-0.5">Real-time application status, database metrics, and user analytics.</p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchDashboardData(); }}
          className="flex items-center gap-2 bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-colors"
        >
          <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>sync</span>
          Refresh Stats
        </button>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon="live_tv" label="Total Channels" value={stats?.total_channels ?? "—"} color="bg-red-600" />
        <StatCard icon="newspaper" label="Pinned News" value={stats?.pinned_news ?? "—"} color="bg-blue-600" />
        <StatCard icon="database" label="Supabase DB" value={stats?.supabase_connected ? "Connected" : "Offline"} color={stats?.supabase_connected ? "bg-emerald-600" : "bg-gray-600"} />
        <StatCard icon="sports_soccer" label="Sports API" value={stats?.api_sports_enabled ? "Active" : "Disabled"} color={stats?.api_sports_enabled ? "bg-amber-500" : "bg-gray-600"} />
        <StatCard icon="sports_cricket" label="Cricket API" value={stats?.cricket_enabled ? "Active" : "Disabled"} color={stats?.cricket_enabled ? "bg-green-600" : "bg-gray-600"} />
        <StatCard icon="feed" label="News API" value={stats?.news_enabled ? "Active" : "Disabled"} color={stats?.news_enabled ? "bg-purple-600" : "bg-gray-600"} />
      </div>

      {/* TABS CONTROLLER */}
      <div className="flex border-b border-gray-800 gap-2">
        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-headline font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === "system"
              ? "border-red-600 text-white font-black"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined text-sm">monitoring</span>
          System Metrics
        </button>
        <button
          onClick={() => setActiveTab("user")}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-headline font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === "user"
              ? "border-red-600 text-white font-black"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined text-sm">analytics</span>
          User Activity Analytics
        </button>
      </div>

      {loading && !analytics ? (
        <div className="flex items-center justify-center py-20 bg-gray-900 border border-gray-800 rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-xs font-headline font-semibold uppercase tracking-widest animate-pulse">Loading Analytics Engine...</p>
          </div>
        </div>
      ) : !analytics ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-900 border border-gray-800 rounded-2xl text-center px-4">
          <span className="material-symbols-outlined text-4xl text-gray-600 mb-3">error_outline</span>
          <p className="text-gray-400 text-sm font-headline font-semibold uppercase tracking-wider">Failed to Load Analytics</p>
          <p className="text-gray-500 text-xs mt-1">Could not connect to the analytics service. Please verify that the backend is running.</p>
          <button
            onClick={() => { setLoading(true); fetchDashboardData(); }}
            className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-colors"
          >
            <span className="material-symbols-outlined text-sm">sync</span>
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {activeTab === "system" ? (
            <>
              {/* CHART 1: ACTIVE VIEWERS */}
              <div className="xl:col-span-2 bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest">Active Viewers Trend (30 Days)</h3>
                  <span className="text-[10px] text-red-500 font-bold uppercase px-2 py-0.5 bg-red-950/50 rounded-full border border-red-900/30">Monthly Timeline</span>
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics?.active_viewers_history} margin={{ left: -10, right: 10, top: 10, bottom: 5 }}>
                      <defs>
                        <linearGradient id="viewersGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                      <XAxis dataKey="time" stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                      <YAxis stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="viewers" name="Active Viewers" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#viewersGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* CHART 2: POPULAR CHANNELS */}
              <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
                <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest mb-4">Top 5 Channel Viewers</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.popular_channels} layout="vertical" margin={{ left: 5, right: 15, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                      <XAxis type="number" stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                      <YAxis dataKey="name" type="category" stroke="#6b7280" tickLine={false} axisLine={false} width={80} style={{ fontSize: "9px", fontWeight: "bold" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="viewers" name="Viewers" fill="#ef4444" radius={[0, 6, 6, 0]}>
                        {analytics?.popular_channels?.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* CHART 3: DATABASE PERFORMANCE */}
              <div className="xl:col-span-3 bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest">Database & Server Load (Last 24 Hours)</h3>
                  <div className="flex gap-4 text-[10px] font-bold">
                    <span className="flex items-center gap-1.5 text-blue-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>CPU (%)</span>
                    <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>MEMORY (%)</span>
                    <span className="flex items-center gap-1.5 text-amber-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>LATENCY (MS)</span>
                  </div>
                </div>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics?.database_load_history} margin={{ left: -10, right: 10, top: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                      <XAxis dataKey="time" stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                      <YAxis stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="cpu" name="CPU Load" stroke="#3b82f6" strokeWidth={2} dot={false} unit="%" />
                      <Line type="monotone" dataKey="memory" name="Memory Load" stroke="#10b981" strokeWidth={2} dot={false} unit="%" />
                      <Line type="monotone" dataKey="latency_ms" name="Query Latency" stroke="#f59e0b" strokeWidth={2} dot={false} unit="ms" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* USER ANALYSIS COLUMNS */}
              <div className="xl:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CHART: PAGE HITS */}
                  <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest">Clicks vs Page Views</h3>
                      <span className="text-[10px] text-red-500 font-bold uppercase px-2 py-0.5 bg-red-950/50 rounded-full border border-red-900/30">Monthly Timeline</span>
                    </div>
                    <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics?.user_analytics?.clicks_views_history} margin={{ left: -10, right: 5, top: 5, bottom: 5 }}>
                          <defs>
                            <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                          <XAxis dataKey="time" stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "9px" }} />
                          <YAxis stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ fontSize: "10px", marginTop: "10px" }} />
                          <Area type="monotone" dataKey="views" name="Page Views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#viewsGrad)" />
                          <Area type="monotone" dataKey="clicks" name="Clicks" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#clicksGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* CHART: PLATFORM DISTRIBUTION */}
                  <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
                    <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest mb-2">User Device / OS Share</h3>
                    <div className="h-[220px] flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics?.user_analytics?.platform_share}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="name"
                          >
                            {analytics?.user_analytics?.platform_share?.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Legend underneath layout */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-gray-500 font-headline uppercase tracking-widest font-black">OS Split</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-[9px] font-bold text-gray-400">
                      {analytics?.user_analytics?.platform_share?.map((p, idx) => (
                        <span key={p.name} className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                          {p.name.toUpperCase()} ({p.value})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CHART: TIME SPENT STATS */}
                <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
                  <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest mb-4">Average Time Spent per Session (Minutes)</h3>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.user_analytics?.time_spent_stats} margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="path" stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "9px" }} />
                        <YAxis stroke="#6b7280" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="minutes" name="Average Minutes" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* LIST: REAL-TIME AUDIT LOG FEED */}
              <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col h-[576px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline font-black text-white text-xs uppercase tracking-widest">User Activity Feed</h3>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold uppercase animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Real-Time
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-thin scrollbar-thumb-gray-800">
                  {analytics?.user_analytics?.recent_feed && analytics.user_analytics.recent_feed.length > 0 ? (
                    analytics.user_analytics.recent_feed.map((log, index) => {
                      const relativeTime = (() => {
                        const secDiff = Math.floor((now.getTime() - new Date(log.timestamp).getTime()) / 1000);
                        if (secDiff < 5) return "Just now";
                        if (secDiff < 60) return `${secDiff}s ago`;
                        const minDiff = Math.floor(secDiff / 60);
                        if (minDiff < 60) return `${minDiff}m ago`;
                        return new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      })();

                      const hasPhoto = !!log.photo_url;

                      return (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-950/50 border border-gray-800/60 rounded-xl hover:border-gray-800 transition-all">
                          {hasPhoto ? (
                            <img
                              src={log.photo_url!}
                              alt={log.display_name || log.user_email}
                              className="w-8 h-8 rounded-lg object-cover shrink-0 border border-gray-800"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = "none";
                                const fallbackEl = (e.currentTarget as HTMLElement).nextElementSibling;
                                if (fallbackEl) {
                                  (fallbackEl as HTMLElement).style.display = "flex";
                                }
                              }}
                            />
                          ) : null}

                          <div 
                            style={{ display: hasPhoto ? 'none' : 'flex' }}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs uppercase ${
                              log.event === 'page_view' ? 'bg-blue-600/20 text-blue-500' :
                              log.event === 'click' ? 'bg-red-600/20 text-red-500' : 'bg-emerald-600/20 text-emerald-500'
                            }`}
                          >
                            <span className="material-symbols-outlined text-base">
                              {log.event === 'page_view' ? 'visibility' :
                               log.event === 'click' ? 'touch_app' : 'favorite'}
                            </span>
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-baseline gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="text-white text-xs font-semibold truncate max-w-[180px]" title={log.display_name || log.user_email}>
                                  {log.display_name || log.user_email}
                                </p>
                                {log.display_name && log.display_name !== log.user_email && (
                                  <p className="text-gray-500 text-[10px] truncate max-w-[180px]" title={log.user_email}>
                                    {log.user_email}
                                  </p>
                                )}
                              </div>
                              <span className="text-[9px] text-gray-500 font-label uppercase font-bold shrink-0">{relativeTime}</span>
                            </div>
                            
                            <p className="text-gray-300 text-[11px] font-body mt-1 leading-snug">
                              {log.event === 'page_view' && <>Visited <code className="bg-gray-800 text-red-400 px-1 rounded text-[9px] font-bold">{log.path}</code></>}
                              {log.event === 'click' && <>Clicked <strong className="text-white font-bold">"{log.target}"</strong> on page <code className="bg-gray-800 text-red-400 px-1 rounded text-[9px] font-bold">{log.path}</code></>}
                              {log.event === 'heartbeat' && <>Spent <strong className="text-white font-bold">10s</strong> actively viewing <code className="bg-gray-800 text-red-400 px-1 rounded text-[9px] font-bold">{log.path}</code></>}
                            </p>
                            
                            <div className="flex gap-2 items-center mt-1.5 text-[8px] text-gray-500 uppercase tracking-wider font-bold">
                              <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">devices</span>{log.platform}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center py-20 text-gray-600 font-headline font-semibold uppercase text-[10px] tracking-widest">No activity captured yet</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* QUICK ACTIONS SECTION */}
      <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
        <h3 className="font-headline font-black text-white uppercase text-xs tracking-widest mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Channel", icon: "add_circle" },
            { label: "Edit Hero Banner", icon: "edit" },
            { label: "Pin News Article", icon: "push_pin" },
            { label: "API Keys", icon: "key" },
          ].map(a => (
            <button key={a.label} className="flex items-center gap-2 bg-gray-800 hover:bg-red-600 text-white text-xs font-headline font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors">
              <span className="material-symbols-outlined text-base">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
