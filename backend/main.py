from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from contextlib import asynccontextmanager
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# We can initialize the superset later once the user provides the key.
supabase: Optional[Client] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global supabase
    if SUPABASE_URL and SUPABASE_KEY:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    yield
    pass

app = FastAPI(title="Velocity Grid API", lifespan=lifespan)

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

@app.get("/api/health")
def health_check():
    return {"status": "ok", "supabase_configured": supabase is not None}

@app.get("/api/matches/live", response_model=List[Match])
def get_live_matches():
    if supabase:
        response = supabase.table("matches").select("*").eq("status", "live").execute()
        return response.data
    
    # Mock fallback
    return [
        Match(id="1", title="Lakers vs Warriors", sport="NBA", score="112 - 108", status="live", viewers=1800000, home_team="Lakers", away_team="Warriors"),
        Match(id="2", title="Real Madrid vs Liverpool", sport="Football", score="3 - 2", status="live", viewers=2400000, home_team="Real Madrid", away_team="Liverpool"),
        Match(id="3", title="Monaco GP", sport="F1", score="", status="live", viewers=840000, home_team="", away_team="")
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
