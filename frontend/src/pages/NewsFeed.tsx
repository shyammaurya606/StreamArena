import { useState, useEffect } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source_name: string;
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sports");

  const fetchNews = async (query?: string) => {
    setLoading(true);
    try {
      // If query is "sports" (All News), we don't send a q param to get Top Headlines
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const url = query && query !== "sports" 
        ? `${API_BASE_URL}/api/news?q=${query}` 
        : `${API_BASE_URL}/api/news`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeTab);
  }, [activeTab]);

  const categories = [
    { id: "sports", label: "All News" },
    { id: "football", label: "Football" },
    { id: "motorsports", label: "Motorsports" },
    { id: "tennis", label: "Tennis" },
    { id: "basketball", label: "NBA" },
    { id: "cricket", label: "Cricket" },
  ];

  const featured = articles[0];
  const list = articles.slice(1);

  return (
    <>
      <section className="max-w-screen-2xl mx-auto px-6 mb-14">
        {loading ? (
          <div className="w-full h-[540px] bg-surface-container-low rounded-xl animate-pulse flex items-center justify-center">
            <span className="text-on-surface-variant font-headline font-bold uppercase tracking-widest opacity-20 text-4xl italic">Loading Headlines</span>
          </div>
        ) : featured ? (
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low h-[540px] flex items-end">
            <img 
              alt={featured.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={featured.urlToImage || "https://images.unsplash.com/photo-1504450758481-7338ba7524ad?auto=format&fit=crop&w=1200&q=80"} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="relative p-8 md:p-14 z-10 w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white font-label text-xs font-bold px-3 py-1 tracking-widest uppercase rounded-sm">
                  {activeTab === "sports" ? "Breaking" : activeTab}
                </span>
                <span className="text-white/70 font-label text-xs uppercase tracking-widest">
                  {featured.source_name} • {new Date(featured.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-white font-headline text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter mb-6 uppercase">
                {featured.title}
              </h1>
              <a 
                href={featured.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-headline text-base font-bold inline-flex items-center gap-3 transition-all active:scale-95 rounded-lg"
              >
                READ FULL REPORT <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full h-[540px] bg-surface-container-low rounded-xl flex flex-col items-center justify-center text-center p-10">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">newspaper</span>
            <h2 className="text-3xl font-headline font-black uppercase text-on-surface">No Featured Story</h2>
            <p className="text-on-surface-variant max-w-md mx-auto mt-2">We couldn't find a top story for this category right now. Try another filter!</p>
          </div>
        )}
      </section>

      {/* FILTERS + CONTENT */}
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* MAIN FEED */}
          <div className="lg:w-2/3">
            <div className="flex gap-3 mb-10 overflow-x-auto pb-3 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`${
                    activeTab === cat.id
                      ? "bg-primary text-white" 
                      : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                  } px-5 py-2 rounded-md font-label text-sm font-medium transition-colors whitespace-nowrap uppercase tracking-wider`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-sm">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-surface-container-low rounded-xl h-[400px] animate-pulse"></div>
                ))
              ) : list.length > 0 ? (
                list.map((article, idx) => (
                  <div 
                    key={idx} 
                    className={`group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 ${idx === 2 ? 'md:col-span-2 flex flex-col md:flex-row' : ''}`}
                  >
                    <div className={`${idx === 2 ? 'md:w-1/2' : ''} relative h-56 md:h-auto overflow-hidden bg-surface-container-high`}>
                      <img 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={article.urlToImage || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=500&q=80"} 
                      />
                      <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                        {article.source_name}
                      </span>
                    </div>
                    <div className={`${idx === 2 ? 'md:w-1/2 p-8' : 'p-6'} flex flex-col justify-center`}>
                      <h3 className={`${idx === 2 ? 'text-2xl' : 'text-xl'} font-headline font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors uppercase line-clamp-3`}>
                        {article.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-outline text-[10px] font-label uppercase tracking-tighter">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-red-600 text-xs font-bold uppercase tracking-widest hover:underline"
                        >
                          READ MORE
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-20 bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant/30">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">search_off</span>
                  <p className="text-on-surface-variant italic font-label">No news articles found for "{activeTab}".</p>
                  <button onClick={() => setActiveTab('sports')} className="mt-4 text-primary text-xs font-bold uppercase tracking-widest hover:underline">Return to All News</button>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-8">
              {/* Trending */}
              <div>
                <h2 className="font-headline text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-red-600 rounded-full"></span> TRENDING TOPICS
                </h2>
                <div className="space-y-5">
                  <div className="group flex gap-4 cursor-pointer">
                    <span className="font-headline text-4xl font-black text-surface-container-highest group-hover:text-red-600 transition-colors italic">01</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1 leading-snug group-hover:underline uppercase tracking-tight">Champions League: Knockout Phase Preview</h4>
                      <span className="text-[10px] text-outline uppercase font-label">18.4K Readers</span>
                    </div>
                  </div>
                  <div className="group flex gap-4 cursor-pointer">
                    <span className="font-headline text-4xl font-black text-surface-container-highest group-hover:text-red-600 transition-colors italic">02</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1 leading-snug group-hover:underline uppercase tracking-tight">Formula 1: New Regulations for 2026 Season</h4>
                      <span className="text-[10px] text-outline uppercase font-label">15.2K Readers</span>
                    </div>
                  </div>
                  <div className="group flex gap-4 cursor-pointer">
                    <span className="font-headline text-4xl font-black text-surface-container-highest group-hover:text-red-600 transition-colors italic">03</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1 leading-snug group-hover:underline uppercase tracking-tight">NBA Trades: Deadline Day Highlights</h4>
                      <span className="text-[10px] text-outline uppercase font-label">12.9K Readers</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mini Scoreboard */}
              <div className="bg-primary text-white rounded-xl p-6">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-red-400 flex items-center gap-2 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot"></span> Live Now
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-bold text-sm tracking-tight">LIVERPOOL FC</span>
                    <span className="font-headline font-black text-2xl text-red-400">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-bold text-sm tracking-tight">REAL MADRID</span>
                    <span className="font-headline font-black text-2xl">1</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] font-label text-white/50 uppercase tracking-widest">
                  <span>Champions League • Final</span>
                  <span>82'</span>
                </div>
              </div>
              {/* Newsletter */}
              <div className="bg-surface-container-low p-7 rounded-xl border border-outline-variant/10">
                <h3 className="font-headline text-lg font-bold mb-2 uppercase">THE DAILY KINETIC</h3>
                <p className="text-sm text-on-surface-variant mb-5">Get the top headlines delivered to your inbox every morning at 7 AM.</p>
                <div className="flex flex-col gap-2">
                  <input className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-red-600/20 focus:outline-none" placeholder="email@address.com" type="email" />
                  <button className="bg-red-600 text-white py-3 rounded-lg font-headline font-bold hover:bg-red-700 transition-colors uppercase tracking-widest text-xs">SUBSCRIBE</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
