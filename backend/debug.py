import asyncio
from main import get_schedules

async def test():
    try:
        res = await get_schedules("upcoming")
        print("Success, len:", len(res))
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(test())
