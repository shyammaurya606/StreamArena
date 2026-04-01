import asyncio
import httpx
import json
import os
from dotenv import load_dotenv

load_dotenv()

async def f():
    async with httpx.AsyncClient() as c:
        try:
            cricket_key = os.getenv("CRICKET_API_KEY", "your_cricket_api_key")
            r1 = await c.get(f'https://api.cricapi.com/v1/matches?apikey={cricket_key}&offset=0')
            data = r1.json()
            if data.get("status") == "success":
                print("Matches count:", len(data.get("data", [])))
                if len(data.get("data", [])) > 0:
                    print(json.dumps(data["data"][0], indent=2))
            else:
                print("Error:", data)
        except Exception as e:
            print("cricapi error:", e)

asyncio.run(f())
