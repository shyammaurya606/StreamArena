import httpx
import asyncio

async def main():
    async with httpx.AsyncClient() as c:
        # Check tomorrow
        print("Fetching tomorrow...")
        r = await c.get("http://localhost:8000/api/schedules?date=2026-04-03")
        matches = r.json()
        cricket = [m for m in matches if m.get("sport") == "Cricket"]
        print(f"Tomorrow cricket count: {len(cricket)}")
        
        # Check upcoming
        print("Fetching upcoming...")
        r2 = await c.get("http://localhost:8000/api/schedules?date=upcoming")
        matches2 = r2.json()
        cricket2 = [m for m in matches2 if m.get("sport") == "Cricket"]
        print(f"Upcoming cricket count: {len(cricket2)}")

asyncio.run(main())
