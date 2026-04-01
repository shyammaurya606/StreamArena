import asyncio
import httpx
import json
import os
from dotenv import load_dotenv

load_dotenv()

async def fetch():
    api_key = os.getenv("API_SPORTS_KEY", "your_api_sports_key")
    headers = {'x-apisports-key': api_key}
    async with httpx.AsyncClient() as c:
        r = await c.get('https://v1.basketball.api-sports.io/games?date=2026-04-01', headers=headers)
        data = r.json()
        print(json.dumps(data.get('response', [])[:2], indent=2))

if __name__ == "__main__":
    asyncio.run(fetch())
