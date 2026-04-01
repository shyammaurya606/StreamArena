import asyncio
import httpx

SPORTS_CONFIG = [
    ("Football", "https://v3.football.api-sports.io", "fixtures"),
    ("AFL", "https://v1.afl.api-sports.io", "games"),
    ("Baseball", "https://v1.baseball.api-sports.io", "games"),
    ("Basketball", "https://v1.basketball.api-sports.io", "games"),
    ("Formula-1", "https://v1.formula-1.api-sports.io", "races"),
    ("Handball", "https://v1.handball.api-sports.io", "games"),
    ("Hockey", "https://v1.hockey.api-sports.io", "games"),
    ("MMA", "https://v1.mma.api-sports.io", "fights"),
    ("NBA", "https://v2.nba.api-sports.io", "games"),
    ("NFL", "https://v1.american-football.api-sports.io", "games"),
    ("Rugby", "https://v1.rugby.api-sports.io", "games"),
    ("Volleyball", "https://v1.volleyball.api-sports.io", "games"),
]
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_SPORTS_KEY", "your_api_sports_key")
headers = {'x-apisports-key': api_key}

async def fetch_sport(client, sport, base, ep):
    url = f"{base}/{ep}?date=2026-04-01"
    try:
        r = await client.get(url, headers=headers)
        return sport, r.status_code, len(r.json().get('response', []))
    except Exception as e:
        return sport, "ERROR", str(e)

async def main():
    async with httpx.AsyncClient() as c:
        tasks = [fetch_sport(c, s, b, e) for s, b, e in SPORTS_CONFIG]
        results = await asyncio.gather(*tasks)
        for r in results:
            print(r)

if __name__ == "__main__":
    asyncio.run(main())
