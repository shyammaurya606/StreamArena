import os
import asyncio
import httpx

from dotenv import load_dotenv
load_dotenv()

async def main():
    api_key = os.getenv("API_SPORTS_KEY", "your_api_sports_key")
    headers = {"x-apisports-key": api_key}
    async with httpx.AsyncClient() as client:
        res = await client.get("https://v3.football.api-sports.io/fixtures?live=all", headers=headers)
        data = res.json()
        print("Live matches:", len(data.get("response", [])))
        print("Errors:", data.get("errors"))
        print("Results:", data.get("results"))

        res2 = await client.get("https://v3.football.api-sports.io/fixtures?date=2024-05-18", headers=headers)
        data2 = res2.json()
        print("Schedule matches:", len(data2.get("response", [])))

asyncio.run(main())
