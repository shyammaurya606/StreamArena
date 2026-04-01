from fastapi import FastAPI, HTTPException, Depends, Query
import httpx
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from contextlib import asynccontextmanager
from supabase import create_client, Client
import os
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv, dotenv_values
import asyncio
import time

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")
API_SPORTS_KEY = os.getenv("API_SPORTS_KEY", "")
CRICKET_API_KEY = os.getenv("CRICKET_API_KEY", "")

# We can initialize the superset later once the user provides the key.
supabase: Optional[Client] = None

# In-memory dictionary to protect free-tier API quotas
schedules_cache = {}
live_matches_cache = {'time': None, 'data': None}

@asynccontextmanager
async def lifespan(app: FastAPI):
    global supabase
    # Only initialize if the URL looks valid (starts with https)
    if SUPABASE_URL and SUPABASE_URL.startswith("https://") and SUPABASE_KEY and SUPABASE_KEY != "your_supabase_key":
        try:
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            print("Successfully connected to Supabase")
        except Exception as e:
            print(f"Failed to connect to Supabase: {e}. Falling back to mock data.")
            supabase = None
    else:
        print("Supabase credentials not configured. Using mock fallback mode.")
    yield
    pass

app = FastAPI(title="Stream Arena API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Channel(BaseModel):
    id: Optional[str]
    name: str
    category: str
    region: str
    viewers: int

class Match(BaseModel):
    id: Optional[str]
    title: str
    sport: str
    score: str
    status: str
    viewers: int
    home_team: str
    away_team: str
    home_logo: Optional[str] = None
    away_logo: Optional[str] = None
    time: Optional[str] = None
    elapsed: Optional[str] = None
    league: Optional[str] = None

class NewsArticle(BaseModel):
    title: str
    description: Optional[str]
    url: str
    urlToImage: Optional[str]
    publishedAt: str
    source_name: str

class NewsResponse(BaseModel):
    status: str
    totalResults: int
    articles: List[NewsArticle]

@app.get("/api/health")
def health_check():
    return {"status": "ok", "supabase_configured": supabase is not None}

SPORTS_CONFIG = [
    {"name": "Football", "url": "https://v3.football.api-sports.io", "endpoint": "fixtures"},
    {"name": "AFL", "url": "https://v1.afl.api-sports.io", "endpoint": "games"},
    {"name": "Baseball", "url": "https://v1.baseball.api-sports.io", "endpoint": "games"},
    {"name": "Basketball", "url": "https://v1.basketball.api-sports.io", "endpoint": "games"},
    {"name": "Formula-1", "url": "https://v1.formula-1.api-sports.io", "endpoint": "races"},
    {"name": "Handball", "url": "https://v1.handball.api-sports.io", "endpoint": "games"},
    {"name": "Hockey", "url": "https://v1.hockey.api-sports.io", "endpoint": "games"},
    {"name": "MMA", "url": "https://v1.mma.api-sports.io", "endpoint": "fights"},
    {"name": "NBA", "url": "https://v2.nba.api-sports.io", "endpoint": "games"},
    {"name": "NFL", "url": "https://v1.american-football.api-sports.io", "endpoint": "games"},
    {"name": "Rugby", "url": "https://v1.rugby.api-sports.io", "endpoint": "games"},
    {"name": "Volleyball", "url": "https://v1.volleyball.api-sports.io", "endpoint": "games"}
]

api_cache = {}

def get_cached_response(cache_key, ttl=300):
    if cache_key in api_cache:
        data, timestamp = api_cache[cache_key]
        if time.time() - timestamp < ttl:
            return data
    return None

def set_cached_response(cache_key, data):
    api_cache[cache_key] = (data, time.time())

def parse_generic_item(item, sport_name):
    try:
        if sport_name == "Football":
            fixture = item.get("fixture", {})
            teams = item.get("teams", {})
            goals = item.get("goals", {})
            status = fixture.get("status", {})
            league = item.get("league", {})
            return {
                "id": str(fixture.get("id", random.randint(1000, 9999))),
                "home_team": teams.get("home", {}).get("name", "Unknown"),
                "away_team": teams.get("away", {}).get("name", "Unknown"),
                "home_logo": teams.get("home", {}).get("logo"),
                "away_logo": teams.get("away", {}).get("logo"),
                "league": league.get("name"),
                "score_str": f"{goals.get('home', 0)} - {goals.get('away', 0)}",
                "status_short": status.get("short", "TBD"),
                "elapsed": str(status.get("elapsed", "")) + "'" if status.get("elapsed") else "",
                "time": fixture.get("date", "")
            }
        elif sport_name == "Formula-1":
            competition = item.get("competition", {})
            circuit = item.get("circuit", {})
            status = item.get("status", "TBD")
            return {
                "id": str(item.get("id", random.randint(1000, 9999))),
                "home_team": competition.get("name", "Unknown"),
                "away_team": circuit.get("name", "Unknown"),
                "league": competition.get("name"),
                "score_str": "",
                "status_short": status,
                "elapsed": "",
                "time": item.get("date", "")
            }
        elif sport_name == "MMA":
            fighters = item.get("fighters", [{}, {}])
            fighter1 = fighters[0] if len(fighters) > 0 else {}
            fighter2 = fighters[1] if len(fighters) > 1 else {}
            status = item.get("status", {})
            league = item.get("league", {})
            return {
                "id": str(item.get("id", random.randint(1000, 9999))),
                "home_team": fighter1.get("name", "Unknown"),
                "away_team": fighter2.get("name", "Unknown"),
                "home_logo": fighter1.get("logo"),
                "away_logo": fighter2.get("logo"),
                "league": league.get("name"),
                "score_str": "",
                "status_short": status.get("short", "TBD"),
                "elapsed": "",
                "time": item.get("date", "")
            }
        else:
            teams = item.get("teams", {})
            scores = item.get("scores", {})
            status = item.get("status", {})
            league = item.get("league", {})
            home_score = scores.get("home", {}).get("total", 0) if isinstance(scores.get("home"), dict) else scores.get("home", 0)
            away_score = scores.get("away", {}).get("total", 0) if isinstance(scores.get("away"), dict) else scores.get("away", 0)
            
            return {
                "id": str(item.get("id", random.randint(1000, 9999))),
                "home_team": teams.get("home", {}).get("name", "Unknown"),
                "away_team": teams.get("away", {}).get("name", "Unknown"),
                "home_logo": teams.get("home", {}).get("logo"),
                "away_logo": teams.get("away", {}).get("logo"),
                "league": league.get("name"),
                "score_str": f"{home_score if home_score is not None else 0} - {away_score if away_score is not None else 0}",
                "status_short": status.get("short", "TBD"),
                "elapsed": "",
                "time": item.get("date", "")
            }
    except Exception as e:
        print(f"Parse error {sport_name}: {e}")
        return None

async def fetch_sport_api(client, sport_config, date, is_live, headers):
    sport_name = sport_config["name"]
    url = f"{sport_config['url']}/{sport_config['endpoint']}?date={date}"
    
    cache_key = f"{sport_name}_{date}"
    cached_data = get_cached_response(cache_key)
    if cached_data is not None:
        data = cached_data
    else:
        try:
            res = await client.get(url, headers=headers)
            if res.status_code == 200:
                data = res.json().get("response", [])
                set_cached_response(cache_key, data)
            else:
                data = []
        except Exception:
            data = []
    
    matches = []
    
    # Optional pseudo-live filter to make sure some results show up for 'live' 
    # if API lacks live results (for testing), but ideally we use actual status.
    for item in data[:15]: 
        parsed = parse_generic_item(item, sport_name)
        if not parsed: continue
        
        is_match_live = parsed["status_short"] in ["1H", "2H", "HT", "LIVE", "IN PLAY", "Q1", "Q2", "Q3", "Q4", "P1", "P2", "P3"]
        if is_live and not is_match_live:
            continue
            
        time_str = "TBD"
        if parsed["time"]:
            try:
                dt = datetime.fromisoformat(parsed["time"].replace("Z", "+00:00"))
                time_str = dt.strftime("%H:%M")
            except:
                pass
                
        matches.append(Match(
            id=f"{sport_name.lower()}_{parsed['id']}",
            title=f"{parsed['home_team']} vs {parsed['away_team']}",
            sport=sport_name,
            score=parsed["score_str"] if (is_match_live or not is_live) else "",
            status="live" if is_match_live else parsed["status_short"],
            viewers=random.randint(10000, 2500000) if is_match_live else 0,
            home_team=parsed["home_team"],
            away_team=parsed["away_team"],
            home_logo=parsed["home_logo"],
            away_logo=parsed["away_logo"],
            elapsed=parsed["elapsed"],
            time=time_str,
            league=parsed["league"]
        ))
    return matches

def parse_cricket_data(data, is_live):
    matches = []
    for item in data[:15]:
        status_text = item.get("status", "")
        match_started = item.get("matchStarted", False)
        match_ended = item.get("matchEnded", False)
        actually_live = match_started and not match_ended
        
        if is_live and not actually_live:
            continue
            
        teams_arr = item.get("teams", [])
        team_info = item.get("teamInfo", [])
        
        home_team = team_info[0].get("name") if len(team_info) > 0 else (teams_arr[0] if len(teams_arr) > 0 else "Unknown")
        away_team = team_info[1].get("name") if len(team_info) > 1 else (teams_arr[1] if len(teams_arr) > 1 else "Unknown")
        
        home_logo = team_info[0].get("img") if len(team_info) > 0 else None
        away_logo = team_info[1].get("img") if len(team_info) > 1 else None
        
        score_arr = item.get("score", [])
        score_str = f"{score_arr[0].get('r',0)}/{score_arr[0].get('w',0)} ({score_arr[0].get('o',0)})" if len(score_arr) > 0 else ""
        if len(score_arr) > 1:
            score_str += f" - {score_arr[1].get('r',0)}/{score_arr[1].get('w',0)} ({score_arr[1].get('o',0)})"
            
        time_val = "TBD"
        date_val = item.get("date", "")
        if date_val:
            try:
                dt = datetime.fromisoformat(date_val.replace("Z", "+00:00"))
                time_val = dt.strftime("%H:%M")
            except:
                pass
                
        matches.append(Match(
            id=f"cricket_{item.get('id', random.randint(1000, 9999))}",
            title=item.get("name", f"{home_team} vs {away_team}"),
            sport="Cricket",
            score=score_str,
            status="live" if actually_live else "NS",
            viewers=random.randint(50000, 3000000) if actually_live else 0,
            home_team=home_team,
            away_team=away_team,
            home_logo=home_logo,
            away_logo=away_logo,
            elapsed=status_text,
            time=time_val,
            league=item.get("series", "")[:35] if item.get("series") else "Cricket"
        ))
    return matches

@app.get("/api/matches/live", response_model=List[Match])
async def get_live_matches():
    if live_matches_cache['time'] and (datetime.now() - live_matches_cache['time']).seconds < 120:
        return live_matches_cache['data']
        
    date = datetime.now().strftime("%Y-%m-%d")
    config = dotenv_values(".env")
    api_key = config.get("API_SPORTS_KEY", os.getenv("API_SPORTS_KEY"))
    
    if api_key and api_key != "your_api_sports_key":
        headers = {"x-apisports-key": api_key}
        async with httpx.AsyncClient() as client:
            tasks = [fetch_sport_api(client, cfg, date, True, headers) for cfg in SPORTS_CONFIG]
            
            # Additional Cricket integration
            cricket_key = config.get("CRICKET_API_KEY", os.getenv("CRICKET_API_KEY"))
            if cricket_key and cricket_key != "your_cricket_api_key":
                async def fetch_cricket():
                    try:
                        res = await client.get(f"https://api.cricapi.com/v1/currentMatches?apikey={cricket_key}&offset=0")
                        if res.status_code == 200:
                            return parse_cricket_data(res.json().get("data", []), True)
                    except Exception as e:
                        print(f"Cricket API error: {e}")
                    return []
                tasks.append(fetch_cricket())
                
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            matches = []
            for r in results:
                if isinstance(r, list):
                    matches.extend(r)
                    
            matches.sort(key=lambda x: x.viewers, reverse=True)
            if matches:
                live_matches_cache['time'] = datetime.now()
                live_matches_cache['data'] = matches
                return matches

    if supabase:
        response = supabase.table("matches").select("*").eq("status", "live").execute()
        return response.data
    
    # Mock fallback
    return [
        Match(id="1", title="Lakers vs Warriors", sport="NBA", score="112 - 108", status="live", viewers=1800000, home_team="Lakers", away_team="Warriors"),
        Match(id="2", title="Real Madrid vs Liverpool", sport="Football", score="3 - 2", status="live", viewers=2400000, home_team="Real Madrid", away_team="Liverpool"),
        Match(id="3", title="Monaco GP", sport="F1", score="", status="live", viewers=840000, home_team="", away_team="")
    ]

@app.get("/api/schedules", response_model=List[Match])
async def get_schedules(date: str = None):
    if not date:
        date = datetime.now().strftime("%Y-%m-%d")
        
    cache_key = f"schedules_{date}"
    if cache_key in schedules_cache and (datetime.now() - schedules_cache[cache_key]['time']).seconds < 300:
        return schedules_cache[cache_key]['data']
        
    dates_to_fetch = []
    if date == "upcoming":
        for i in range(1, 4): # Fetch 3 consecutive future days
            dt = datetime.now() + timedelta(days=i)
            dates_to_fetch.append(dt.strftime("%Y-%m-%d"))
    else:
        dates_to_fetch.append(date)
        
    config = dotenv_values(".env")
    api_key = config.get("API_SPORTS_KEY", os.getenv("API_SPORTS_KEY"))
    
    if api_key and api_key != "your_api_sports_key":
        headers = {"x-apisports-key": api_key}
        tasks = []
        async with httpx.AsyncClient() as client:
            for cfg in SPORTS_CONFIG:
                for d in dates_to_fetch:
                    tasks.append(fetch_sport_api(client, cfg, d, False, headers))
            
            # Additional Cricket integration
            cricket_key = config.get("CRICKET_API_KEY", os.getenv("CRICKET_API_KEY"))
            if cricket_key and cricket_key != "your_cricket_api_key":
                async def fetch_cricket():
                    try:
                        ep = "matches" if date == "upcoming" or date > datetime.now().strftime("%Y-%m-%d") else "currentMatches"
                        res = await client.get(f"https://api.cricapi.com/v1/{ep}?apikey={cricket_key}&offset=0")
                        if res.status_code == 200:
                            data = res.json().get("data", [])
                            filtered = []
                            for item in data:
                                item_date = item.get("date", "") or item.get("dateTimeGMT", "")
                                if date == "upcoming":
                                    filtered.append(item)
                                elif any(fd in item_date for fd in dates_to_fetch):
                                    filtered.append(item)
                            return parse_cricket_data(filtered, False)
                    except Exception as e:
                        print(f"Cricket API error: {e}")
                    return []
                tasks.append(fetch_cricket())
                
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            matches = []
            for r in results:
                if isinstance(r, list):
                    matches.extend(r)
            
            if matches:
                def _sort_time(m):
                    return m.time if m.time and m.time != "TBD" else "23:59"
                matches.sort(key=_sort_time)
                schedules_cache[cache_key] = {'time': datetime.now(), 'data': matches}
                return matches

    # Mock fallback
    return [
        Match(id="101", title="Real Madrid vs Manchester City", sport="Football", score="", status="NS", viewers=0, home_team="Real Madrid", away_team="Manchester City", time="19:45", league="Champions League • Group Stage"),
        Match(id="102", title="LA Lakers vs Golden State Warriors", sport="NBA", score="", status="NS", viewers=0, home_team="LA Lakers", away_team="Golden State Warriors", time="21:00", league="NBA Regular Season"),
    ]

@app.get("/api/channels", response_model=List[Channel])
def get_channels(region: Optional[str] = None):
    if supabase:
        query = supabase.table("channels").select("*")
        if region and region != "Global":
            query = query.eq("region", region)
        response = query.execute()
        return response.data
    
    # Mock fallback
    return [
        Channel(id="1", name="ESPN", category="Sports", region="Global", viewers=50000),
        Channel(id="2", name="Sky Sports", category="Football", region="Europe", viewers=120000),
    ]

@app.get("/api/news", response_model=NewsResponse)
async def get_news(category: str = "sports", q: Optional[str] = None):
    if not NEWS_API_KEY or NEWS_API_KEY == "your_news_api_key_here":
        raise HTTPException(status_code=500, detail="NewsAPI key not configured")

    # Use /everything for specific queries to get broader results
    # Use /top-headlines for the "All News" category
    url = "https://newsapi.org/v2/top-headlines" if not q else "https://newsapi.org/v2/everything"
    
    params = {
        "apiKey": NEWS_API_KEY,
        "language": "en",
        "pageSize": 20
    }
    
    if q:
        # Refine query for "Everything" endpoint to stay in sports context
        params["q"] = f"sport {q}"
        params["sortBy"] = "publishedAt"
    else:
        # Use category for Top Headlines
        params["category"] = category

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Transform data to match our NewsArticle model
            articles = []
            for art in data.get("articles", []):
                # Filter out removed articles
                if art.get("title") == "[Removed]":
                    continue
                    
                articles.append(NewsArticle(
                    title=art.get("title", "No Title"),
                    description=art.get("description", "No description available."),
                    url=art.get("url", "#"),
                    urlToImage=art.get("urlToImage", ""),
                    publishedAt=art.get("publishedAt", ""),
                    source_name=art.get("source", {}).get("name", "Unknown Source")
                ))
            
            return NewsResponse(
                status=data.get("status", "ok"),
                totalResults=data.get("totalResults", 0),
                articles=articles
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
