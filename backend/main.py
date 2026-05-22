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
import uuid
import psutil

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")
API_SPORTS_KEY = os.getenv("API_SPORTS_KEY", "")
CRICKET_API_KEY = os.getenv("CRICKET_API_KEY", "")

# We can initialize the superset later once the user provides the key.
supabase: Optional[Client] = None

import json

def load_json_config(filename, default_val):
    # Try Supabase first if connected
    if supabase:
        try:
            key_name = filename.replace(".json", "")
            res = supabase.table("site_settings").select("value").eq("key", key_name).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]["value"]
            else:
                # If not found in DB, insert the default value
                supabase.table("site_settings").insert({"key": key_name, "value": default_val}).execute()
                return default_val
        except Exception as e:
            # Table doesn't exist yet or other query error
            print(f"Supabase loading failed for {filename}: {e}. Using local fallback.")

    # Fallback to local JSON file
    filepath = os.path.join(os.path.dirname(__file__), filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading local config {filename}: {e}")
    return default_val

def save_json_config(filename, data):
    # Try Supabase first if connected
    if supabase:
        try:
            key_name = filename.replace(".json", "")
            supabase.table("site_settings").upsert({"key": key_name, "value": data}, on_conflict="key").execute()
        except Exception as e:
            print(f"Supabase saving failed for {filename}: {e}. Using local fallback.")

    # Fallback/Backup to local JSON file
    filepath = os.path.join(os.path.dirname(__file__), filename)
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving local config {filename}: {e}")

# Global Admin State (when Supabase is missing)
DEFAULT_CHANNELS = [
    {"id": "1", "name": "Star Sports 1", "category": "Cricket", "region": "India", "viewers": 850000},
    {"id": "2", "name": "JioCinema", "category": "OTT", "region": "India", "viewers": 1200000},
]
admin_channels_mock = load_json_config("admin_channels.json", DEFAULT_CHANNELS)

DEFAULT_PINNED_NEWS = [
    {"id": "1", "title": "Welcome to Stream Arena", "url": "https://streamarena.com", "image": "", "pinned": True, "hidden": False}
]
admin_pinned_news_mock = load_json_config("admin_pinned_news.json", DEFAULT_PINNED_NEWS)

DEFAULT_HERO_BANNER = {
    "badge_text": "Live: Champions League Finals",
    "headline_line1": "STREAM",
    "headline_line2": "ARENA",
    "subtitle": "The ultimate directory for global sports broadcasting. Every game, every channel, zero clutter.",
    "cta_primary_label": "Live Now",
    "cta_primary_href": "/live",
    "cta_secondary_label": "View Schedule",
    "cta_secondary_href": "/schedules",
    "hero_image": "/hero-arena.png",
    "live_ticker": [
        {"label": "Live Match", "team1": "Real Madrid", "team2": "Liverpool", "score": "3 \u2013 2", "elapsed": "78'"},
        {"label": "Live Match", "team1": "Lakers", "team2": "Warriors", "score": "112 \u2013 108", "elapsed": "Q4"}
    ]
}
admin_hero_banner_mock = load_json_config("hero_banner.json", DEFAULT_HERO_BANNER)

DEFAULT_TRENDING_CARDS = {
    "featured": {
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDyN2r0WUIP3hx2EpJ78xDcOrPhHJFjIOUB2nfmBazP1V3eIjc31Z8PGmfXowwR1t1hEow4i4-8t5kXaBDul5JLBLFqqr-XIlf1y5AMEl4LJYqlA9GSdQAofSrlGdfd35dNRbdmOh3RAM1Ce2p-ejPnzo288MFOv-17CigHNO8KaAcJaHJdlXNHr0JC7JVGOZ0JB3PUaDPC9_F0HiKCoB3dA2AEKEQCG5CZS7pZoRf96WQZjPh5HR5tbqcy2L6I8JrIOvgmbV97nWk",
        "badge": "4K Ultra HD",
        "label": "Premier League",
        "title": "Manchester Derby: Live from Etihad",
        "description": "Experience the legendary Manchester Derby live in ultra high definition with multi-camera angles and full English commentary.",
        "viewers": "1.2M",
        "href": "/live"
    },
    "cards": [
        {
            "image": "/nba-card.png",
            "sport_label": "NBA Basketball",
            "title": "Lakers vs Warriors",
            "score": "112 \u2013 108",
            "score_detail": "Q4 04:12",
            "href": "/live"
        },
        {
            "image": "/f1-card.png",
            "sport_label": "Formula 1",
            "title": "Monaco Grand Prix Practice",
            "score": "",
            "score_detail": "LIVE HD",
            "href": "/live"
        }
    ]
}
admin_trending_cards_mock = load_json_config("trending_cards.json", DEFAULT_TRENDING_CARDS)

DEFAULT_API_CONFIG = {
    "api_sports_enabled": True,
    "cricket_api_enabled": True,
    "news_api_enabled": True
}
admin_api_config_mock = load_json_config("api_config.json", DEFAULT_API_CONFIG)

DEFAULT_AD_CONFIG = {
    "home_top": {
        "type": "image",
        "media_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        "redirect_url": "https://store.steampowered.com",
        "active": True,
        "label": "Steam Gaming Store"
    },
    "sidebar_ad": {
        "type": "image",
        "media_url": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
        "redirect_url": "https://www.playstation.com",
        "active": True,
        "label": "PlayStation 5 Console"
    },
    "watch_midroll": {
        "type": "video",
        "media_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "redirect_url": "https://www.nike.com",
        "active": True,
        "skip_seconds": 5,
        "label": "Nike Activewear"
    }
}
admin_ad_config_mock = load_json_config("ad_config.json", DEFAULT_AD_CONFIG)

admin_users_mock = [
    {"id": "mock-1", "email": "demo@streamarena.com", "display_name": "Demo User", "provider": "google.com",
     "location": "Mumbai, IN", "subscribed_newsletter": True, "created_at": "2026-01-15T10:00:00Z", "last_sign_in": "2026-05-10T06:00:00Z"},
    {"id": "mock-2", "email": "fan@sports.io", "display_name": "Sports Fan", "provider": "password",
     "location": "London, UK", "subscribed_newsletter": False, "created_at": "2026-02-20T08:30:00Z", "last_sign_in": "2026-05-08T14:00:00Z"},
]

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
    stream_url: Optional[str] = None

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
    {"name": "Volleyball", "url": "https://v1.volleyball.api-sports.io", "endpoint": "games"},
    {"name": "Tennis", "url": "https://v1.tennis.api-sports.io", "endpoint": "games"},
    {"name": "Boxing", "url": "https://v1.mma.api-sports.io", "endpoint": "fights"}
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
                "time": fixture.get("date", ""),
                "stream_url": item.get("url") or item.get("stream_url")
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
                "time": item.get("date", ""),
                "stream_url": item.get("url") or item.get("stream_url")
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
                "time": item.get("date", ""),
                "stream_url": item.get("url") or item.get("stream_url")
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
                "time": item.get("date", ""),
                "stream_url": item.get("url") or item.get("stream_url")
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
    
    for item in data: 
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
            league=parsed["league"],
            stream_url=parsed.get("stream_url")
        ))
        
        if len(matches) >= 15:
            break
            
    return matches

def parse_cricket_data(data, is_live):
    matches = []
    for item in data:
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
            league=item.get("series", "")[:35] if item.get("series") else "Cricket",
            stream_url=item.get("url") or item.get("stream_url")
        ))
        
        if len(matches) >= 15:
            break
            
    return matches

@app.get("/api/matches/live", response_model=List[Match])
async def get_live_matches(sport: Optional[str] = None):
    if live_matches_cache['time'] and (datetime.now() - live_matches_cache['time']).seconds < 120:
        cached_matches = live_matches_cache['data']
        if sport and sport != "All Sports":
            return [m for m in cached_matches if m.sport.lower() == sport.lower()]
        return cached_matches
        
    date = datetime.now().strftime("%Y-%m-%d")
    config = dotenv_values(".env")
    api_key = config.get("API_SPORTS_KEY", os.getenv("API_SPORTS_KEY"))
    
    if admin_api_config_mock.get("api_sports_enabled", True) and api_key and api_key != "your_api_sports_key":
        headers = {"x-apisports-key": api_key}
        async with httpx.AsyncClient() as client:
            tasks = [fetch_sport_api(client, cfg, date, True, headers) for cfg in SPORTS_CONFIG]
            
            # Additional Cricket integration
            cricket_key = config.get("CRICKET_API_KEY", os.getenv("CRICKET_API_KEY"))
            if admin_api_config_mock.get("cricket_api_enabled", True) and cricket_key and cricket_key != "your_cricket_api_key":
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
                    
            # If the API Sports account is suspended/expired, it returns empty results for other sports.
            # We will no longer inject mock events.
            matches.sort(key=lambda x: x.viewers, reverse=True)
            if matches:
                live_matches_cache['time'] = datetime.now()
                live_matches_cache['data'] = matches
                if sport and sport != "All Sports":
                    return [m for m in matches if m.sport.lower() == sport.lower()]
                return matches

    if supabase:
        response = supabase.table("matches").select("*").eq("status", "live").execute()
        matches = response.data or []
        if sport and sport != "All Sports":
            return [m for m in matches if m.get("sport", "").lower() == sport.lower()]
        return matches
    
    # Mock fallback removed, return empty list
    return []

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
    
    if admin_api_config_mock.get("api_sports_enabled", True) and api_key and api_key != "your_api_sports_key":
        headers = {"x-apisports-key": api_key}
        tasks = []
        async with httpx.AsyncClient() as client:
            for cfg in SPORTS_CONFIG:
                for d in dates_to_fetch:
                    tasks.append(fetch_sport_api(client, cfg, d, False, headers))
            
            # Additional Cricket integration
            cricket_key = config.get("CRICKET_API_KEY", os.getenv("CRICKET_API_KEY"))
            if admin_api_config_mock.get("cricket_api_enabled", True) and cricket_key and cricket_key != "your_cricket_api_key":
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
            
            # Fallback for schedules when API Sports is suspended removed.

            if matches:
                def _sort_time(m):
                    return m.time if m.time and m.time != "TBD" else "23:59"
                matches.sort(key=_sort_time)
                schedules_cache[cache_key] = {'time': datetime.now(), 'data': matches}
                return matches

    # Mock fallback removed, return empty list
    return []

@app.get("/api/channels")
def get_channels(
    search: Optional[str] = Query(None),
    country: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sport: Optional[str] = Query(None),
    is_featured: Optional[bool] = Query(None),
):
    if supabase:
        query = supabase.table("channels").select("*").eq("is_active", True)
        if country:
            query = query.eq("country", country)
        if category:
            query = query.eq("category", category)
        if is_featured is not None:
            query = query.eq("is_featured", is_featured)
        response = query.order("viewers", desc=True).execute()
        data = response.data or []
        # Filter by sport/search in Python (Supabase free tier lacks full-text)
        if sport:
            data = [c for c in data if sport.lower() in [s.lower() for s in (c.get("sports") or [])]]
        if search:
            q = search.lower()
            data = [c for c in data if q in (c.get("full_name") or "").lower()
                    or q in (c.get("short_name") or "").lower()
                    or q in (c.get("category") or "").lower()
                    or q in (c.get("country") or "").lower()]
        return data

    # Rich mock fallback (mirrors channels.ts data)
    MOCK_CHANNELS = [
        {"id":"star-sports-1","short_name":"SS1","full_name":"Star Sports 1 Hindi","tagline":"India's Premier Cricket Broadcaster","established":"Est. 1991","category":"Cricket Hub","country":"India","hero_image":"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80","description":"Star Sports 1 Hindi is India's most-watched sports channel.","sports":["IPL","ODI","T20I","Test","BCCI"],"watch_url":"https://www.hotstar.com/in/sports","is_featured":True,"viewers":850000},
        {"id":"jiocinema","short_name":"JIO","full_name":"JioCinema 4K","tagline":"India's Largest Free Streaming Platform","established":"Est. 2016","category":"OTT Giant","country":"India","hero_image":"https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80","description":"JioCinema redefined sports streaming in India.","sports":["IPL","Premier League","NBA","WWE","F1"],"watch_url":"https://www.jiocinema.com/sports","is_featured":True,"viewers":1200000},
        {"id":"sony-sports","short_name":"SS10","full_name":"Sony Sports Ten 1","tagline":"Home of Rugby, Tennis & More","established":"Est. 2012","category":"Multi-Sport","country":"India","hero_image":"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80","description":"Sony Sports Ten 1 is India's gateway to international sport.","sports":["Rugby","Tennis","Motorsport","UEFA","WWE"],"watch_url":"https://www.sonyliv.com/custompage/sports-2245","is_featured":False,"viewers":320000},
        {"id":"fox-cricket","short_name":"FOX","full_name":"Fox Cricket","tagline":"Australia's Home of Cricket","established":"Est. 2018","category":"Cricket Specialist","country":"Australia","hero_image":"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80","description":"Fox Cricket is Australia's dedicated cricket channel.","sports":["BBL","Test Cricket","ODI","Sheffield Shield","WBBL"],"watch_url":"https://www.foxsports.com.au/cricket","is_featured":True,"viewers":420000},
        {"id":"bein-sports","short_name":"beIN","full_name":"beIN Sports","tagline":"15 Channels Across 3 Continents","established":"Est. 2012","category":"Official Partnership","country":"Qatar","hero_image":"https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=1600&q=80","description":"beIN Media Group is a global sports media powerhouse.","sports":["La Liga","Serie A","Ligue 1","Rugby","Tennis","F1"],"watch_url":"https://www.beinsports.com","is_featured":True,"viewers":780000},
        {"id":"willow-tv","short_name":"WLW","full_name":"Willow TV","tagline":"The Leading Cricket Channel in North America","established":"Est. 2010","category":"Cricket Specialist","country":"United States","hero_image":"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80","description":"Willow TV is the go-to cricket destination for North America.","sports":["ICC Events","IPL","PSL","BBL","International Cricket"],"watch_url":"https://www.willow.tv","is_featured":False,"viewers":260000},
        {"id":"supersport","short_name":"SUP","full_name":"Supersport Africa","tagline":"Sub-Saharan Africa's Premier Sports Broadcaster","established":"Est. 1995","category":"Regional Leader","country":"South Africa","hero_image":"https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1600&q=80","description":"Supersport is Africa's most respected sports broadcaster.","sports":["PSL","Premier League","Rugby","Cricket","F1"],"watch_url":"https://supersport.com/live-sport","is_featured":False,"viewers":340000},
        {"id":"sky-sport-nz","short_name":"SKY","full_name":"Sky Sport New Zealand","tagline":"All Black Nation's Broadcasting Home","established":"Est. 1990","category":"Premium Sports","country":"New Zealand","hero_image":"https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1600&q=80","description":"Sky Sport NZ is New Zealand's leading sports broadcaster.","sports":["Rugby","Cricket","Football","F1","NBA"],"watch_url":"https://www.sky.co.nz/discover/sky-sport","is_featured":False,"viewers":195000},
        {"id":"channel7-sport","short_name":"CH7","full_name":"Channel 7 Sport","tagline":"Australia's Free-To-Air Sports Leader","established":"Est. 1956","category":"Free-To-Air","country":"Australia","hero_image":"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80","description":"Channel 7 Sport is Australia's most watched free-to-air sports broadcaster.","sports":["AFL","Cricket","Olympics","Supercars","Horse Racing"],"watch_url":"https://7plus.com.au/sport","is_featured":False,"viewers":290000},
        {"id":"ptv-sports","short_name":"PTV","full_name":"PTV Sports","tagline":"Pakistan's National Sports Broadcaster","established":"Est. 2012","category":"National Broadcaster","country":"Pakistan","hero_image":"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80","description":"PTV Sports is Pakistan's state-run sports broadcaster.","sports":["PSL","PCB","Hockey","Squash","International Cricket"],"watch_url":"https://www.ptvsports.pk","is_featured":False,"viewers":210000},
        {"id":"fancode","short_name":"FAN","full_name":"FanCode","tagline":"India's Premier Sports Commerce Platform","established":"Est. 2019","category":"Digital Platform","country":"India","hero_image":"https://images.unsplash.com/photo-1523831076786-57a8c462f809?auto=format&fit=crop&w=1600&q=80","description":"FanCode is revolutionizing Indian sports coverage.","sports":["Ranji Trophy","Duleep Trophy","Syed Mushtaq Ali","Women's Domestic","Kabaddi"],"watch_url":"https://fancode.com","is_featured":False,"viewers":180000},
    ]
    if search:
        q = search.lower()
        MOCK_CHANNELS = [c for c in MOCK_CHANNELS if q in c["full_name"].lower() or q in c["category"].lower() or q in c["country"].lower()]
    if country:
        MOCK_CHANNELS = [c for c in MOCK_CHANNELS if c["country"].lower() == country.lower()]
    if category:
        MOCK_CHANNELS = [c for c in MOCK_CHANNELS if c["category"].lower() == category.lower()]
    if sport:
        MOCK_CHANNELS = [c for c in MOCK_CHANNELS if sport.lower() in [s.lower() for s in c["sports"]]]
    if is_featured is not None:
        MOCK_CHANNELS = [c for c in MOCK_CHANNELS if c["is_featured"] == is_featured]
    return sorted(MOCK_CHANNELS, key=lambda x: x["viewers"], reverse=True)

@app.get("/api/channels/{channel_id}")
def get_channel_detail(channel_id: str):
    if supabase:
        res = supabase.table("channels").select("*").eq("id", channel_id).single().execute()
        if res.data:
            return res.data
        raise HTTPException(status_code=404, detail="Channel not found")
    raise HTTPException(status_code=404, detail="Channel not found (Supabase not configured)")

@app.get("/api/news", response_model=NewsResponse)
async def get_news(category: str = "sports", q: Optional[str] = None):
    if not admin_api_config_mock.get("news_api_enabled", True) or not NEWS_API_KEY or NEWS_API_KEY == "your_news_api_key_here":
        raise HTTPException(status_code=500, detail="NewsAPI key not configured or disabled")

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

# ─────────────────────────────────────────────
#  ADMIN — USERS
# ─────────────────────────────────────────────

class UserSyncInput(BaseModel):
    id: str
    email: str
    display_name: Optional[str] = None
    photo_url: Optional[str] = None
    provider: str
    created_at: Optional[str] = None
    last_sign_in: Optional[str] = None
    location: Optional[str] = None

@app.post("/api/users/sync")
def sync_user(u: UserSyncInput):
    data = u.model_dump() if hasattr(u, "model_dump") else u.dict()
    data["subscribed_newsletter"] = False
    
    if supabase:
        try:
            existing = supabase.table("user_profiles").select("id").eq("id", u.id).execute()
            if existing.data:
                supabase.table("user_profiles").update({"last_sign_in": u.last_sign_in}).eq("id", u.id).execute()
                return {"success": True}
            else:
                supabase.table("user_profiles").insert(data).execute()
                return {"success": True}
        except Exception:
            pass
            
    # Mock fallback
    for i, user in enumerate(admin_users_mock):
        if user["id"] == u.id:
            admin_users_mock[i]["last_sign_in"] = u.last_sign_in
            return {"success": True}
    admin_users_mock.append(data)
    return {"success": True}

@app.get("/api/admin/users")
def get_admin_users():
    if supabase:
        try:
            res = supabase.table("user_profiles").select("*").order("created_at", desc=True).execute()
            if res.data is not None:
                return res.data
        except Exception as e:
            print(f"user_profiles table error: {e}")
    return admin_users_mock

@app.delete("/api/admin/users/{user_id}")
def delete_admin_user(user_id: str):
    if supabase:
        try:
            supabase.table("user_profiles").delete().eq("id", user_id).execute()
            return {"success": True}
        except Exception:
            pass
    global admin_users_mock
    admin_users_mock = [u for u in admin_users_mock if u["id"] != user_id]
    return {"success": True}


# ─────────────────────────────────────────────
#  MOCK STATE FOR ADMIN (Moved to top of file)
# ─────────────────────────────────────────────

# ─────────────────────────────────────────────
#  ADMIN — STATS
# ─────────────────────────────────────────────
@app.get("/api/admin/stats")
def get_admin_stats():
    total_channels = 0
    if supabase:
        try:
            res = supabase.table("channels").select("*", count="exact").execute()
            total_channels = res.count if hasattr(res, 'count') and res.count is not None else len(res.data or [])
        except Exception:
            total_channels = len(admin_channels_mock)
    else:
        total_channels = len(admin_channels_mock)
        
    pinned_news = 0
    if supabase:
        try:
            res = supabase.table("pinned_news").select("*", count="exact").execute()
            pinned_news = res.count if hasattr(res, 'count') and res.count is not None else len(res.data or [])
        except Exception:
            pinned_news = len(admin_pinned_news_mock)
    else:
        pinned_news = len(admin_pinned_news_mock)

    return {
        "total_channels": total_channels,
        "pinned_news": pinned_news,
        "api_sports_enabled": admin_api_config_mock["api_sports_enabled"],
        "cricket_enabled": admin_api_config_mock["cricket_api_enabled"],
        "news_enabled": admin_api_config_mock["news_api_enabled"],
        "supabase_connected": supabase is not None
    }


# ─────────────────────────────────────────────
#  TELEMETRY & USER ACTIVITY TRACKING
# ─────────────────────────────────────────────

class TelemetryEvent(BaseModel):
    user_email: Optional[str] = "Anonymous"
    event: str  # "page_view", "click", "heartbeat"
    path: str
    target: Optional[str] = None
    platform: Optional[str] = "Unknown"
    duration: Optional[int] = 0
    timestamp: Optional[str] = None
    session_id: Optional[str] = None

def append_local_activity_log(event_data: dict):
    filepath = os.path.join(os.path.dirname(__file__), "user_activity_logs.json")
    try:
        logs = []
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                try:
                    logs = json.load(f)
                except Exception:
                    logs = []
        logs.append(event_data)
        if len(logs) > 5000:  # Cap log size
            logs = logs[-5000:]
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(logs, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving local activity log: {e}")

def read_local_activity_logs():
    filepath = os.path.join(os.path.dirname(__file__), "user_activity_logs.json")
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def measure_db_latency():
    start_time = time.perf_counter()
    if supabase:
        try:
            supabase.table("channels").select("id").limit(1).execute()
        except Exception as e:
            print(f"Supabase latency check failed: {e}")
            read_local_activity_logs()
    else:
        read_local_activity_logs()
    end_time = time.perf_counter()
    return int((end_time - start_time) * 1000)

def get_hourly_metrics_history(now):
    filepath = os.path.join(os.path.dirname(__file__), "server_metrics_history.json")
    history_data = {}
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                history_data = json.load(f)
        except Exception as e:
            print(f"Error loading server metrics history: {e}")
            history_data = {}

    try:
        cpu_percent = int(psutil.cpu_percent(interval=0.01))
        cpu_percent = min(100, max(1, cpu_percent))
        
        memory_info = psutil.virtual_memory()
        memory_percent = int(memory_info.percent)
        memory_percent = min(100, max(1, memory_percent))
    except Exception as e:
        print(f"psutil query failed: {e}")
        cpu_percent = random.randint(10, 30)
        memory_percent = random.randint(30, 60)

    latency_ms = measure_db_latency()
    latency_ms = min(2000, max(1, latency_ms))

    current_hour_key = now.strftime("%Y-%m-%d-%H")
    history_data[current_hour_key] = {
        "cpu": cpu_percent,
        "memory": memory_percent,
        "latency_ms": latency_ms
    }

    sorted_keys = sorted(history_data.keys())
    if len(sorted_keys) > 48:
        for k in sorted_keys[:-48]:
            history_data.pop(k, None)

    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(history_data, f, indent=4)
    except Exception as e:
        print(f"Error saving server metrics history: {e}")

    hourly_history = []
    for i in range(24):
        hour_point = now - timedelta(hours=23 - i)
        hour_key = hour_point.strftime("%Y-%m-%d-%H")
        time_label = hour_point.strftime("%I:00 %p")
        if time_label.startswith("0"):
            time_label = time_label[1:]

        if hour_key in history_data:
            metric = history_data[hour_key]
            cpu_val = metric["cpu"]
            memory_val = metric["memory"]
            latency_val = metric["latency_ms"]
        else:
            random.seed(hash(hour_key))
            cpu_val = random.randint(12, 28)
            memory_val = random.randint(40, 55)
            latency_val = random.randint(10, 25)
            
        hourly_history.append({
            "time": time_label,
            "cpu": cpu_val,
            "memory": memory_val,
            "latency_ms": latency_val
        })

    return hourly_history


@app.post("/api/analytics/track")
def track_event(event: TelemetryEvent):
    event_data = event.dict()
    if not event_data.get("timestamp"):
        event_data["timestamp"] = datetime.utcnow().isoformat() + "Z"
    
    if supabase:
        try:
            supabase.table("user_activity_logs").insert(event_data).execute()
            return {"status": "success", "source": "database"}
        except Exception as e:
            print(f"Supabase logging failed: {e}. Falling back to local JSON.")
            append_local_activity_log(event_data)
            return {"status": "success", "source": "local_fallback"}
    else:
        append_local_activity_log(event_data)
        return {"status": "success", "source": "local"}

@app.get("/api/admin/analytics")
def get_admin_analytics():
    now = datetime.utcnow()
    
    # Load user activity logs
    logs = []
    if supabase:
        try:
            res = supabase.table("user_activity_logs").select("*").order("timestamp", desc=True).limit(5000).execute()
            logs = res.data or []
        except Exception:
            logs = read_local_activity_logs()
    else:
        logs = read_local_activity_logs()

    # Helper function to resolve user session
    def get_session_key(log):
        return log.get("session_id") or f"{log.get('user_email', 'Anonymous')}_{log.get('platform', 'Unknown')}"

    # 1. Calculate genuine active viewers (unique sessions in last 5 minutes)
    active_sessions_5m = set()
    five_min_ago = now - timedelta(minutes=5)
    for log in logs:
        ts_str = log.get("timestamp")
        if ts_str:
            try:
                log_time = datetime.fromisoformat(ts_str.replace("Z", "+00:00")).replace(tzinfo=None)
                if log_time >= five_min_ago:
                    active_sessions_5m.add(get_session_key(log))
            except Exception:
                pass
    current_viewers = max(1, len(active_sessions_5m))
        
    # 2. Active Viewers History (30 days timeline based on genuine session logs)
    active_viewers_history = []
    for i in range(30):
        time_point = now - timedelta(days=29-i)
        date_str = time_point.strftime("%b %d")
        
        day_start = datetime(time_point.year, time_point.month, time_point.day, 0, 0, 0)
        day_end = datetime(time_point.year, time_point.month, time_point.day, 23, 59, 59)
        
        unique_sessions_day = set()
        for log in logs:
            ts_str = log.get("timestamp")
            if ts_str:
                try:
                    log_time = datetime.fromisoformat(ts_str.replace("Z", "+00:00")).replace(tzinfo=None)
                    if day_start <= log_time <= day_end:
                        unique_sessions_day.add(get_session_key(log))
                except Exception:
                    pass
        
        val = len(unique_sessions_day)
        if i == 29 and val == 0:
            val = 1
            
        active_viewers_history.append({
            "time": date_str,
            "viewers": val
        })
        
    # 3. Popular Channels
    popular_channels = []
    if supabase:
        try:
            res = supabase.table("channels").select("id, full_name, viewers").eq("is_active", True).order("viewers", desc=True).limit(5).execute()
            popular_channels = [{"name": c.get("full_name") or c.get("id"), "viewers": c.get("viewers", 0)} for c in res.data or []]
        except Exception:
            pass
    if not popular_channels:
        sorted_mocks = sorted(admin_channels_mock, key=lambda x: x.get("viewers", 0), reverse=True)
        popular_channels = [{"name": c.get("name") or c.get("full_name") or c.get("id"), "viewers": c.get("viewers", 0)} for c in sorted_mocks[:5]]
        
    # 4. Database Load History
    database_load_history = get_hourly_metrics_history(now)
        
    # 5. User Activity Logs
    logs = []
    if supabase:
        try:
            res = supabase.table("user_activity_logs").select("*").order("timestamp", desc=True).limit(1000).execute()
            logs = res.data or []
        except Exception:
            logs = read_local_activity_logs()
    else:
        logs = read_local_activity_logs()
        
    # If no logs yet, supply robust realistic mock data to pre-populate charts
    if len(logs) == 0:
        logs = [
            {"user_email": "shyammaurya606@gmail.com", "event": "page_view", "path": "/", "platform": "Windows", "timestamp": (now - timedelta(minutes=1)).isoformat() + "Z"},
            {"user_email": "shyammaurya606@gmail.com", "event": "click", "path": "/", "target": "JioCinema 4K", "platform": "Windows", "timestamp": (now - timedelta(minutes=1, seconds=15)).isoformat() + "Z"},
            {"user_email": "shyammaurya606@gmail.com", "event": "page_view", "path": "/watch/jiocinema", "platform": "Windows", "timestamp": (now - timedelta(minutes=1, seconds=16)).isoformat() + "Z"},
            {"user_email": "shyammaurya606@gmail.com", "event": "heartbeat", "path": "/watch/jiocinema", "platform": "Windows", "duration": 120, "timestamp": (now - timedelta(seconds=30)).isoformat() + "Z"},
            
            {"user_email": "demo@streamarena.com", "event": "page_view", "path": "/", "platform": "macOS", "timestamp": (now - timedelta(minutes=5)).isoformat() + "Z"},
            {"user_email": "demo@streamarena.com", "event": "click", "path": "/", "target": "Star Sports 1 Hindi", "platform": "macOS", "timestamp": (now - timedelta(minutes=4)).isoformat() + "Z"},
            {"user_email": "demo@streamarena.com", "event": "page_view", "path": "/watch/star-sports-1", "platform": "macOS", "timestamp": (now - timedelta(minutes=4, seconds=5)).isoformat() + "Z"},
            {"user_email": "demo@streamarena.com", "event": "heartbeat", "path": "/watch/star-sports-1", "platform": "macOS", "duration": 180, "timestamp": (now - timedelta(minutes=1)).isoformat() + "Z"},
            
            {"user_email": "fan@sports.io", "event": "page_view", "path": "/directory", "platform": "Android", "timestamp": (now - timedelta(minutes=12)).isoformat() + "Z"},
            {"user_email": "fan@sports.io", "event": "click", "path": "/directory", "target": "Football Filter", "platform": "Android", "timestamp": (now - timedelta(minutes=11)).isoformat() + "Z"},
            {"user_email": "fan@sports.io", "event": "page_view", "path": "/news", "platform": "Android", "timestamp": (now - timedelta(minutes=8)).isoformat() + "Z"},
            
            {"user_email": "Anonymous", "event": "page_view", "path": "/platforms", "platform": "iOS", "timestamp": (now - timedelta(minutes=15)).isoformat() + "Z"},
            {"user_email": "Anonymous", "event": "page_view", "path": "/about", "platform": "Windows", "timestamp": (now - timedelta(minutes=20)).isoformat() + "Z"},
        ]
        
    # Aggregate stats from logs
    path_stats = {}
    platform_counts = {}
    path_durations = {}
    
    for log in logs:
        p = log.get("path", "/")
        if p.startswith("/watch/"):
            p = "/watch/:id"
        elif p.startswith("/channel/"):
            p = "/channel/:id"
            
        # Normal path counts
        if p not in path_stats:
            path_stats[p] = {"path": p, "views": 0, "clicks": 0}
        
        evt = log.get("event")
        if evt == "page_view":
            path_stats[p]["views"] += 1
        elif evt == "click":
            path_stats[p]["clicks"] += 1
            
        # Platform share
        plat = log.get("platform", "Unknown")
        platform_counts[plat] = platform_counts.get(plat, 0) + 1
        
        # Duration pings
        if evt == "heartbeat":
            dur = log.get("duration", 0) or 0
            if p not in path_durations:
                path_durations[p] = {"path": p, "total_seconds": 0, "sessions": set()}
            path_durations[p]["total_seconds"] += dur
            session_key = log.get("user_email") or "anon"
            path_durations[p]["sessions"].add(session_key)

    # Compile analytics arrays
    page_hits = sorted(path_stats.values(), key=lambda x: x["views"] + x["clicks"], reverse=True)[:6]
    platform_share = [{"name": k, "value": v} for k, v in platform_counts.items()]
    
    time_spent_stats = []
    for p, data in path_durations.items():
        sessions_count = len(data["sessions"]) or 1
        avg_minutes = round((data["total_seconds"] / sessions_count) / 60, 1)
        time_spent_stats.append({
            "path": p,
            "minutes": avg_minutes
        })
    time_spent_stats = sorted(time_spent_stats, key=lambda x: x["minutes"], reverse=True)[:6]
    
    recent_feed_raw = sorted(logs, key=lambda x: x.get("timestamp", ""), reverse=True)[:50]
    
    # Enrich recent_feed with user profiles if synced
    user_profiles = get_admin_users()
    user_map = {}
    for u in user_profiles:
        email_key = u.get("email", "").lower() if u.get("email") else ""
        if email_key:
            user_map[email_key] = {
                "display_name": u.get("display_name"),
                "photo_url": u.get("photo_url")
            }
            
    recent_feed = []
    for log in recent_feed_raw:
        email = log.get("user_email", "Anonymous")
        profile = user_map.get(email.lower()) if email else None
        enriched_log = dict(log)
        if profile:
            enriched_log["display_name"] = profile.get("display_name")
            enriched_log["photo_url"] = profile.get("photo_url")
        else:
            enriched_log["display_name"] = None
            enriched_log["photo_url"] = None
        recent_feed.append(enriched_log)
    
    # 6. Monthly Clicks vs Page Views History (30 days timeline)
    clicks_views_history = []
    for i in range(30):
        time_point = now - timedelta(days=29-i)
        date_str = time_point.strftime("%b %d")
        
        day_start = datetime(time_point.year, time_point.month, time_point.day, 0, 0, 0)
        day_end = datetime(time_point.year, time_point.month, time_point.day, 23, 59, 59)
        
        views_count = 0
        clicks_count = 0
        for log in logs:
            ts_str = log.get("timestamp")
            if ts_str:
                try:
                    log_time = datetime.fromisoformat(ts_str.replace("Z", "+00:00")).replace(tzinfo=None)
                    if day_start <= log_time <= day_end:
                        evt = log.get("event")
                        if evt == "page_view":
                            views_count += 1
                        elif evt == "click":
                            clicks_count += 1
                except Exception:
                    pass
        
        # Seed realistic values if logs are sparse (mostly mock/empty database)
        if len(logs) <= 13:
            random.seed(1337 + i)
            if i > 20:
                views_count = random.randint(8, 25)
                clicks_count = random.randint(3, 12)
            else:
                views_count = random.randint(1, 5)
                clicks_count = random.randint(0, 2)

        clicks_views_history.append({
            "time": date_str,
            "views": views_count,
            "clicks": clicks_count
        })

    return {
        "active_viewers_history": active_viewers_history,
        "popular_channels": popular_channels,
        "database_load_history": database_load_history,
        "user_analytics": {
            "page_hits": page_hits,
            "platform_share": platform_share,
            "time_spent_stats": time_spent_stats,
            "recent_feed": recent_feed,
            "clicks_views_history": clicks_views_history
        }
    }


# ─────────────────────────────────────────────
#  ADMIN — CHANNELS
# ─────────────────────────────────────────────
class AdminChannelInput(BaseModel):
    name: str
    category: str
    region: str
    viewers: int
    logo: Optional[str] = ""
    stream_url: Optional[str] = ""
    description: Optional[str] = ""

@app.get("/api/admin/channels")
def admin_get_channels():
    if supabase:
        res = supabase.table("channels").select("*").order("full_name").execute()
        data = res.data or []
        return [
            {
                "id": c["id"],
                "name": c.get("full_name", ""),
                "category": c.get("category", ""),
                "region": c.get("country", ""),
                "viewers": c.get("viewers", 0),
                "logo": c.get("hero_image", ""),
                "stream_url": c.get("watch_url", ""),
                "description": c.get("description", "")
            }
            for c in data
        ]
    return admin_channels_mock

@app.post("/api/admin/channels")
def admin_add_channel(c: AdminChannelInput):
    supabase_data = {
        "id": str(uuid.uuid4()),
        "full_name": c.name,
        "short_name": c.name[:3].upper(),
        "category": c.category,
        "country": c.region,
        "viewers": c.viewers,
        "hero_image": c.logo,
        "watch_url": c.stream_url,
        "description": c.description,
        "is_active": True,
        "is_featured": False
    }
    
    if supabase:
        res = supabase.table("channels").insert(supabase_data).execute()
        return res.data
        
    mock_data = c.model_dump() if hasattr(c, "model_dump") else c.dict()
    mock_data["id"] = supabase_data["id"]
    admin_channels_mock.append(mock_data)
    save_json_config("admin_channels.json", admin_channels_mock)
    return mock_data

@app.put("/api/admin/channels/{channel_id}")
def admin_update_channel(channel_id: str, c: AdminChannelInput):
    supabase_data = {
        "full_name": c.name,
        "short_name": c.name[:3].upper(),
        "category": c.category,
        "country": c.region,
        "viewers": c.viewers,
        "hero_image": c.logo,
        "watch_url": c.stream_url,
        "description": c.description,
    }
    if supabase:
        res = supabase.table("channels").update(supabase_data).eq("id", channel_id).execute()
        return res.data
        
    mock_data = c.model_dump() if hasattr(c, "model_dump") else c.dict()
    for i, ch in enumerate(admin_channels_mock):
        if ch["id"] == channel_id:
            admin_channels_mock[i].update(mock_data)
            save_json_config("admin_channels.json", admin_channels_mock)
            return admin_channels_mock[i]
    return {}

@app.delete("/api/admin/channels/{channel_id}")
def admin_delete_channel(channel_id: str):
    if supabase:
        supabase.table("channels").delete().eq("id", channel_id).execute()
        return {"success": True}
    global admin_channels_mock
    admin_channels_mock = [c for c in admin_channels_mock if c["id"] != channel_id]
    save_json_config("admin_channels.json", admin_channels_mock)
    return {"success": True}

# ─────────────────────────────────────────────
#  ADMIN — PINNED NEWS
# ─────────────────────────────────────────────
class PinnedNewsInput(BaseModel):
    title: str
    url: str
    image: Optional[str] = ""
    pinned: bool
    hidden: bool

@app.get("/api/admin/pinned-news")
def admin_get_pinned_news():
    if supabase:
        try:
            res = supabase.table("pinned_news").select("*").execute()
            if res.data is not None:
                return res.data
        except Exception:
            pass
    return admin_pinned_news_mock

@app.post("/api/admin/pinned-news")
def admin_add_pinned_news(n: PinnedNewsInput):
    data = n.model_dump() if hasattr(n, "model_dump") else n.dict()
    if supabase:
        try:
            res = supabase.table("pinned_news").insert(data).execute()
            return res.data
        except Exception:
            pass
    data["id"] = str(uuid.uuid4())
    admin_pinned_news_mock.append(data)
    save_json_config("admin_pinned_news.json", admin_pinned_news_mock)
    return data

@app.put("/api/admin/pinned-news/{news_id}")
def admin_update_pinned_news(news_id: str, n: PinnedNewsInput):
    data = n.model_dump() if hasattr(n, "model_dump") else n.dict()
    if supabase:
        try:
            res = supabase.table("pinned_news").update(data).eq("id", news_id).execute()
            return res.data
        except Exception:
            pass
    for i, item in enumerate(admin_pinned_news_mock):
        if item["id"] == news_id:
            admin_pinned_news_mock[i].update(data)
            save_json_config("admin_pinned_news.json", admin_pinned_news_mock)
            return admin_pinned_news_mock[i]
    return {}

@app.delete("/api/admin/pinned-news/{news_id}")
def admin_delete_pinned_news(news_id: str):
    if supabase:
        try:
            supabase.table("pinned_news").delete().eq("id", news_id).execute()
            return {"success": True}
        except Exception:
            pass
    global admin_pinned_news_mock
    admin_pinned_news_mock = [x for x in admin_pinned_news_mock if x["id"] != news_id]
    save_json_config("admin_pinned_news.json", admin_pinned_news_mock)
    return {"success": True}

# ─────────────────────────────────────────────
#  ADMIN — HERO BANNER
# ─────────────────────────────────────────────
@app.get("/api/admin/hero-banner")
def admin_get_hero_banner():
    global admin_hero_banner_mock
    admin_hero_banner_mock = load_json_config("hero_banner.json", admin_hero_banner_mock)
    return admin_hero_banner_mock

@app.put("/api/admin/hero-banner")
def admin_update_hero_banner(banner: dict):
    global admin_hero_banner_mock
    admin_hero_banner_mock.update(banner)
    save_json_config("hero_banner.json", admin_hero_banner_mock)
    return admin_hero_banner_mock

# ─────────────────────────────────────────────
#  ADMIN — API CONFIG
# ─────────────────────────────────────────────
@app.get("/api/admin/api-config")
def admin_get_api_config():
    global admin_api_config_mock
    admin_api_config_mock = load_json_config("api_config.json", admin_api_config_mock)
    return admin_api_config_mock

@app.put("/api/admin/api-config")
def admin_update_api_config(config: dict):
    global admin_api_config_mock
    admin_api_config_mock.update(config)
    save_json_config("api_config.json", admin_api_config_mock)
    return admin_api_config_mock

# ─────────────────────────────────────────────
#  ADMIN — AD CONFIG
# ─────────────────────────────────────────────
@app.get("/api/admin/ad-config")
def admin_get_ad_config():
    global admin_ad_config_mock
    admin_ad_config_mock = load_json_config("ad_config.json", admin_ad_config_mock)
    return admin_ad_config_mock

@app.put("/api/admin/ad-config")
def admin_update_ad_config(config: dict):
    global admin_ad_config_mock
    admin_ad_config_mock.update(config)
    save_json_config("ad_config.json", admin_ad_config_mock)
    return admin_ad_config_mock

# ─────────────────────────────────────────────
#  ADMIN — TRENDING CARDS
# ─────────────────────────────────────────────
@app.get("/api/admin/trending-cards")
def admin_get_trending_cards():
    global admin_trending_cards_mock
    admin_trending_cards_mock = load_json_config("trending_cards.json", admin_trending_cards_mock)
    return admin_trending_cards_mock

@app.put("/api/admin/trending-cards")
def admin_update_trending_cards(data: dict):
    global admin_trending_cards_mock
    admin_trending_cards_mock.update(data)
    save_json_config("trending_cards.json", admin_trending_cards_mock)
    return admin_trending_cards_mock

gemini_stream_cache = {}

@app.get("/api/matches/gemini-link")
async def get_gemini_link(home_team: str, away_team: str, sport: str):
    cache_key = f"{home_team}_{away_team}_{sport}"
    if cache_key in gemini_stream_cache:
        return {"url": gemini_stream_cache[cache_key]}
        
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key:
        return {"url": ""}
        
    prompt = f"Find the official live streaming URL or a highly reliable search link for the live {sport} match between {home_team} and {away_team}. Return ONLY the direct URL as plain text, no markdown, no other words."
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "tools": [{"googleSearch": {}}],
        "generationConfig": {"temperature": 0.2, "maxOutputTokens": 800}
    }
    
    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(url, json=payload, timeout=30.0)
            if res.status_code == 200:
                data = res.json()
                text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "").strip()
                # Clean up any markdown formatting if present
                text = text.replace("```", "").replace("html", "").replace("json", "").strip()
                if text.startswith("http"):
                    gemini_stream_cache[cache_key] = text
                    return {"url": text}
    except Exception as e:
        print(f"Gemini API Error: {e}")
        
    return {"url": ""}

@app.post("/api/chat")
async def api_chat(payload: dict):
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key:
        return {"response": "Gemini API key is not configured in the backend."}
        
    client_messages = payload.get("messages", [])
    
    contents = []
    for msg in client_messages:
        role = "model" if msg.get("role") in ["model", "assistant", "bot", "ai"] else "user"
        text = msg.get("text", "") or msg.get("content", "")
        if text:
            contents.append({
                "role": role,
                "parts": [{"text": text}]
            })
            
    if not contents:
        return {"response": "No messages provided."}

    system_instruction = {
        "parts": [{
            "text": (
                "You are the Stream Arena AI Assistant, a friendly and helpful guide for Stream Arena, "
                "the premier directory for sports enthusiasts. Your goal is to help users navigate the "
                "site, find matches, and answer sports streaming questions. "
                "Guidance for navigation:\n"
                "- Suggest visiting the Live Matches page ('/live') to watch live streams and see active events.\n"
                "- Suggest visiting the Schedules page ('/schedules') for upcoming channels and game times.\n"
                "- Suggest visiting the Directory page ('/directory') to explore sports networks.\n"
                "- Suggest visiting the Categories page ('/platforms') to filter by specific broadcasting systems.\n"
                "- Suggest visiting the News Feed page ('/news') for sports articles and pins.\n"
                "Be brief, enthusiastic about sports, and helpful. Use the googleSearch tool to answer real-time "
                "sports questions, live scores, or lookup stream queries."
            )
        }]
    }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    api_payload = {
        "contents": contents,
        "systemInstruction": system_instruction,
        "tools": [{"googleSearch": {}}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 800
        }
    }

    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(url, json=api_payload, timeout=30.0)
            if res.status_code == 200:
                data = res.json()
                text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "").strip()
                return {"response": text}
            else:
                print(f"Gemini Chat API Error: {res.status_code} {res.text}")
                return {"response": "Sorry, I encountered an error communicating with the AI service. Please try again later."}
    except Exception as e:
        print(f"Gemini Chat Exception: {e}")
        return {"response": "Sorry, I am having trouble connecting right now. Please try again."}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

