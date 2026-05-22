import httpx, json

r = httpx.get("http://localhost:8000/api/channels")
data = r.json()
print(f"Total channels from API: {len(data)}")
print(f"Source: {'Supabase' if len(data) > 0 else 'Mock'}")
for c in data:
    print(f"  - {c['full_name']} ({c['country']}) | {c['viewers']:,} viewers")
