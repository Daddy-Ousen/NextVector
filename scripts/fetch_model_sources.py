"""Download the public sources behind the model registry and save small, dated snapshots.

Run:  python scripts/fetch_model_sources.py     (then: python scripts/build_model_data.py)
      python scripts/fetch_model_sources.py artificial_analysis   (one source only)

Sources (all public; only Artificial Analysis needs a free key):
  - arena.ai text leaderboard            -> snapshots/arena_text.json
  - OpenRouter model catalog (API)       -> snapshots/openrouter.json
  - OSWorld-Verified results (xlsx)      -> snapshots/osworld_verified.json
  - swebench.com Verified leaderboard    -> snapshots/swebench_verified.json
  - Gemini API pricing page              -> snapshots/google_pricing.json (for checking curated prices)
  - Artificial Analysis free API         -> snapshots/artificial_analysis.json (needs AA_API_KEY in env or
    .env.local; skipped without it. Attribution to https://artificialanalysis.ai is required wherever shown.)

The snapshots are committed so every number on the site can be traced to a dated source.
"""
import datetime
import html as htmllib
import io
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SNAP = ROOT / "model_sources" / "snapshots"
UA = {"User-Agent": "Mozilla/5.0 (NextVector model registry refresh)"}
NOW = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()


def save(name: str, url: str, data, **meta) -> None:
    SNAP.mkdir(parents=True, exist_ok=True)
    out = {"source": url, "fetchedAt": NOW, **meta, "count": len(data), "data": data}
    (SNAP / name).write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"  {name}: {len(data)} rows")


def fetch_arena() -> None:
    url = "https://arena.ai/leaderboard/text"
    text = get(url).decode("utf-8").replace('\\"', '"')
    rows, seen = [], set()
    for o in re.findall(r'\{"rank":\d+,"rankUpper".*?"releaseType":(?:null|"[^"]*")\}', text):
        try:
            j = json.loads(o)
        except json.JSONDecodeError:
            continue
        if j["modelDisplayName"] in seen:
            continue
        seen.add(j["modelDisplayName"])
        rows.append({k: j.get(k) for k in (
            "rank", "rankUpper", "rankLower", "modelDisplayName", "rating", "ratingUpper", "ratingLower",
            "votes", "modelOrganization", "modelUrl", "license", "inputPricePerMillion",
            "outputPricePerMillion", "contextLength", "releaseType")})
    if len(rows) < 100:
        sys.exit(f"Arena parse failed: only {len(rows)} rows (page layout changed?)")
    save("arena_text.json", url, rows)


def fetch_openrouter() -> None:
    url = "https://openrouter.ai/api/v1/models"
    rows = []
    for m in json.loads(get(url))["data"]:
        p = m.get("pricing") or {}
        per_m = lambda v: round(float(v) * 1e6, 6) if v not in (None, "") else None
        rows.append({
            "id": m["id"], "name": m["name"], "created": m.get("created"),
            "createdDate": datetime.datetime.fromtimestamp(m["created"], datetime.timezone.utc).strftime("%Y-%m-%d") if m.get("created") else None,
            "context_length": m.get("context_length"), "hugging_face_id": m.get("hugging_face_id") or None,
            "input": per_m(p.get("prompt")), "output": per_m(p.get("completion")), "cache_read": per_m(p.get("input_cache_read")),
            "input_modalities": (m.get("architecture") or {}).get("input_modalities"),
            "output_modalities": (m.get("architecture") or {}).get("output_modalities"),
        })
    save("openrouter.json", url, rows)


def read_xlsx(raw: bytes) -> dict:
    ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    z = zipfile.ZipFile(io.BytesIO(raw))
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", ns):
            shared.append("".join(t.text or "" for t in si.iter("{%s}t" % ns["m"])))
    names = [s.get("name") for s in ET.fromstring(z.read("xl/workbook.xml")).find("m:sheets", ns)]
    out = {}
    for i, name in enumerate(names, 1):
        rows = []
        for r in ET.fromstring(z.read(f"xl/worksheets/sheet{i}.xml")).iter("{%s}row" % ns["m"]):
            vals = {}
            for c in r.findall("m:c", ns):
                col = 0
                for ch in re.match(r"[A-Z]+", c.get("r")).group(0):
                    col = col * 26 + ord(ch) - 64
                v = c.find("m:v", ns)
                val = None if v is None else (shared[int(v.text)] if c.get("t") == "s" else v.text)
                vals[col - 1] = val
            if vals:
                rows.append([vals.get(j) for j in range(max(vals) + 1)])
        out[name] = rows
    return out


def fetch_osworld() -> None:
    url = "https://os-world.github.io/static/data/osworld_verified_results.xlsx"
    sheet = read_xlsx(get(url))["Eval Results"]
    head = sheet[0]
    rows = []
    for r in sheet[1:]:
        d = dict(zip(head, r))
        try:
            score = float(d.get("Success rate"))
        except (TypeError, ValueError):
            continue
        try:
            date = (datetime.date(1899, 12, 30) + datetime.timedelta(days=int(float(d["Date"])))).isoformat()
        except (TypeError, ValueError, KeyError):
            date = None
        rows.append({"model": d.get("Model"), "institution": d.get("Institution"), "approach": d.get("Approach type"),
                     "maxSteps": d.get("Max steps"), "successRate": score, "date": date, "link": d.get("PaperLink")})
    save("osworld_verified.json", "https://os-world.github.io/ (osworld_verified_results.xlsx)", rows)


def fetch_swebench() -> None:
    url = "https://www.swebench.com/"
    page = get(url).decode("utf-8")
    dec = json.JSONDecoder()
    rows = []
    for m in re.finditer(r'\{"name": "Verified", "results": \[', page):
        obj, _ = dec.raw_decode(page, m.start())
        for r in obj["results"]:
            rows.append({k: r.get(k) for k in ("name", "agent", "model_display", "model_org", "model_release_date",
                                                "date", "resolved", "os_model", "reasoning_effort", "site")})
    if not rows:
        sys.exit("SWE-bench parse failed (page layout changed?)")
    save("swebench_verified.json", url, rows)


def fetch_google_pricing() -> None:
    url = "https://ai.google.dev/gemini-api/docs/pricing"
    t = get(url).decode("utf-8")
    t = re.sub(r"<script.*?</script>|<style.*?</style>", "", t, flags=re.S)
    t = htmllib.unescape(re.sub(r"<[^>]+>", " ", t))
    t = re.sub(r"[ \t\r\f\v]+", " ", t)
    lines = [l.strip() for l in re.sub(r"\n\s*\n+", "\n", t).split("\n")]
    rows = []
    for i, l in enumerate(lines):
        if l.startswith("Try it"):
            chunk = "\n".join(lines[i:i + 40])
            grab = lambda label: (re.search(label + r"[^\n]*\n(?:Free of charge|Not available)\n(.*)", chunk) or [None, None])[1]
            rows.append({"title": lines[i - 2], "ids": lines[i - 1], "input": grab("Input price"),
                         "output": grab("Output price"), "cache": grab("Context caching price")})
    save("google_pricing.json", url, rows)


def aa_api_key():
    """Artificial Analysis key from the AA_API_KEY env var or from .env.local (git-ignored). Never committed."""
    import os
    key = os.environ.get("AA_API_KEY")
    env_file = ROOT.parent / ".env.local"
    if not key and env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            if line.strip().startswith("AA_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    return key or None


def fetch_artificial_analysis() -> None:
    """Free-tier model list with the Intelligence / Coding / Agentic indexes. Attribution to artificialanalysis.ai is required."""
    key = aa_api_key()
    if not key:
        print("  artificial_analysis.json: skipped (no AA_API_KEY in env or .env.local); old snapshot kept")
        return
    url = "https://artificialanalysis.ai/api/v2/language/models/free"
    items, version, page = [], None, 1
    while True:
        req = urllib.request.Request(f"{url}?page={page}", headers={**UA, "x-api-key": key})
        with urllib.request.urlopen(req, timeout=90) as r:
            payload = json.loads(r.read())
        items += payload["data"]
        version = payload.get("intelligence_index_version") or version
        if not (payload.get("pagination") or {}).get("has_more") or page >= 20:
            break
        page += 1
    rows = []
    for m in items:
        ev = m.get("evaluations") or {}
        creator = m.get("model_creator") or {}
        rows.append({
            "id": m.get("id"), "slug": m.get("slug"), "name": m.get("name"),
            "creator": creator.get("name"), "creatorSlug": creator.get("slug"),
            "releaseDate": m.get("release_date"),
            "intelligence": ev.get("artificial_analysis_intelligence_index"),
            "coding": ev.get("artificial_analysis_coding_index"),
            "agentic": ev.get("artificial_analysis_agentic_index"),
        })
    if len(rows) < 50:
        sys.exit(f"Artificial Analysis parse failed: only {len(rows)} rows (API changed?)")
    # Full list stays local (git-ignored) for mapping new models. The committed snapshot keeps only the
    # rows our curated models use, because AA's terms reserve redistribution of their dataset.
    save("artificial_analysis_full.json", url, rows, indexVersion=version, pages=page)
    curated = json.loads((ROOT / "model_sources" / "curated_models.json").read_text(encoding="utf-8"))
    used = {s for c in curated["models"] for s in c.get("aa", [])}
    save("artificial_analysis.json", url, [r for r in rows if r["slug"] in used], indexVersion=version,
         note="Only rows used by curated_models.json. Data: Artificial Analysis, https://artificialanalysis.ai")


if __name__ == "__main__":
    print(f"Fetching model sources at {NOW}")
    fetchers = (fetch_arena, fetch_openrouter, fetch_osworld, fetch_swebench, fetch_google_pricing, fetch_artificial_analysis)
    # Optional name filter, e.g. `python scripts/fetch_model_sources.py artificial_analysis` refreshes only that source
    wanted = sys.argv[1:]
    for fn in fetchers:
        if not wanted or any(w in fn.__name__ for w in wanted):
            fn()
    print("Done. Next: python scripts/build_model_data.py")
