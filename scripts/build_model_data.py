"""Build src/data/modelsData.ts and src/data/benchmarksData.ts from sourced data.

Inputs (all in scripts/model_sources/):
  curated_models.json            which models we list + exact source keys + official price overrides
  snapshots/*.json               dated copies of public sources (refresh with fetch_model_sources.py)

Rules:
  - No number is invented. Every score, price, context size and date comes from a snapshot or an
    official price page named in curated_models.json. Missing data stays missing ("Not listed").
  - The Price vs Arena board is a calculation (stated formula), not a measurement.
  - Artificial Analysis (AA) indexes: each model lists all its AA settings ("aa" slugs); each index uses
    the model's best setting, the same rule as Arena. AA requires visible credit wherever shown.
  - Old model ids listed as aliases / dropped_ids get permanent redirects in vercel.json.

Run:  python scripts/build_model_data.py   (fails loudly if a curated source key is not found)
"""
import datetime
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "model_sources"
SNAP = SRC / "snapshots"
MODELS_TS = ROOT / "src" / "data" / "modelsData.ts"
SHOWDOWNS_TS = ROOT / "src" / "data" / "showdownsData.ts"
SITE_JSON = SRC / "build" / "site_data.json"
BENCH_TS = ROOT / "src" / "data" / "benchmarksData.ts"
VERCEL = ROOT / "vercel.json"

ARENA_URL = "https://arena.ai/leaderboard/text"
OSWORLD_URL = "https://os-world.github.io/"
SWE_URL = "https://www.swebench.com/"
AA_URL = "https://artificialanalysis.ai/"
AA_INDEXES = (("intelligence", "AA Intelligence Index"), ("coding", "AA Coding Index"), ("agentic", "AA Agentic Index"))
PRICE_SOURCES = {
    "anthropic": ("Anthropic API pricing", "https://platform.claude.com/docs/en/about-claude/pricing"),
    "google": ("Gemini API pricing", "https://ai.google.dev/gemini-api/docs/pricing"),
}
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
          "October", "November", "December"]


def load(name):
    return json.loads((SNAP / name).read_text(encoding="utf-8"))


def month_label(iso):
    if not iso:
        return None
    y, m = int(iso[:4]), int(iso[5:7])
    return f"{MONTHS[m - 1]} {y}"


def short_month(iso):
    return f"{MONTHS[int(iso[5:7]) - 1][:3]} {iso[:4]}" if iso else ""


def fmt_ctx(n):
    if not n:
        return "Not listed"
    special = {1048576: "1M", 2097152: "2M", 524288: "512K", 262144: "256K", 131072: "128K", 65536: "64K", 32768: "32K"}
    if n in special:
        return f"{special[n]} tokens"
    if n >= 1_000_000:
        v = f"{n / 1_000_000:.2f}".rstrip("0").rstrip(".")
        return f"{v}M tokens"
    return f"{round(n / 1000)}K tokens"


def money(v):
    return None if v is None or v < 0 else round(float(v), 4)


def blended(p):
    if p["inputPer1M"] is None or p["outputPer1M"] is None:
        return None
    return (3 * p["inputPer1M"] + p["outputPer1M"]) / 4


def model_type(name, open_weights, override, dev=""):
    """Category label from the official name only (whole words, so "Gemini" is not "mini")."""
    if override:
        return override
    words = set(re.split(r"[^a-z0-9]+", name.lower()))
    if open_weights:
        return "Open Weights"
    if words & {"codex", "code", "coder", "laguna"}:
        return "Code & Agent"
    if words & {"flash", "lite", "mini", "nano", "haiku", "luna", "small", "fast", "turbo"}:
        return "Compact / Edge"
    if words & {"thinking"} or name.lower().startswith(("o3", "o4")) or (dev == "OpenAI" and "pro" in words):
        return "Reasoning"
    return "Multimodal Foundation"


# ---------------------------------------------------------------- comparisons
def pct_less(cheap, dear):
    return round((1 - cheap / dear) * 100)


def fmt_blend(v):
    return f"${v:.2f}"


def fmt_usd(v):
    if v is None:
        return "not public"
    digits = 3 if (v < 10 and abs(v * 100 - round(v * 100)) > 1e-9) else 2
    return f"${v:.{digits}f}"


def task_score(m, name):
    for b in m["benchmarks"]:
        if b["benchmarkName"] == name:
            return float(str(b["score"]).rstrip("%"))
    return None


def arena_relation(a, b):
    """'tie' when the two arena.ai intervals overlap, else the leader. None if either lacks a score."""
    if not (a.get("arenaElo") and b.get("arenaElo")):
        return None
    lo_a, hi_a = a["arenaElo"] - a["arenaCI"], a["arenaElo"] + a["arenaCI"]
    lo_b, hi_b = b["arenaElo"] - b["arenaCI"], b["arenaElo"] + b["arenaCI"]
    if lo_a <= hi_b and lo_b <= hi_a:
        return "tie"
    return "a" if a["arenaElo"] > b["arenaElo"] else "b"


def build_showdown(sd, A, B, as_of):
    """Every sentence is derived from registry fields. No adjectives about capability."""
    pa, pb = blended(A["pricing"]), blended(B["pricing"])
    rel = arena_relation(A, B)
    sentences, adv_a, adv_b, faqs = [], [], [], []

    # Arena
    if rel is None:
        missing = [m["name"] for m in (A, B) if not m.get("arenaElo")]
        arena_txt = f"{' and '.join(missing)} {'has' if len(missing) == 1 else 'have'} no arena.ai text score yet, so we cannot compare them on Arena."
    else:
        gap = abs(A["arenaElo"] - B["arenaElo"])
        base = (f"On the arena.ai text leaderboard, {A['name']} scores {A['arenaElo']} (±{A['arenaCI']}, #{A['arenaRank']}) "
                f"and {B['name']} scores {B['arenaElo']} (±{B['arenaCI']}, #{B['arenaRank']}).")
        if rel == "tie":
            arena_txt = base + f" The {gap}-point gap is inside the margin of error, so treat them as tied on this board."
        else:
            lead, trail = (A, B) if rel == "a" else (B, A)
            arena_txt = base + f" {lead['name']} leads by {gap} points, outside the margin of error."
            (adv_a if rel == "a" else adv_b).append(f"Higher arena.ai text score ({lead['arenaElo']} vs {trail['arenaElo']}).")
    sentences.append(arena_txt)
    faqs.append({"question": f"Which ranks higher on Arena: {A['name']} or {B['name']}?", "answer": arena_txt})

    # Price
    price_line = (f"{A['name']}: {fmt_usd(A['pricing']['inputPer1M'])} input / {fmt_usd(A['pricing']['outputPer1M'])} output per 1M tokens. "
                  f"{B['name']}: {fmt_usd(B['pricing']['inputPer1M'])} / {fmt_usd(B['pricing']['outputPer1M'])}.")
    if pa is None or pb is None:
        price_txt = price_line + " One of them has no public per-token price, so we do not compare cost."
    elif abs(pa - pb) < 1e-9:
        price_txt = price_line + " Blended at 3 input : 1 output, they cost the same."
    else:
        cheap, dear, pc, pd = (A, B, pa, pb) if pa < pb else (B, A, pb, pa)
        pct = pct_less(pc, pd)
        price_txt = price_line + f" Blended at 3 input : 1 output, {cheap['name']} costs {pct}% less ({fmt_blend(pc)} vs {fmt_blend(pd)} per 1M tokens)."
        (adv_a if cheap is A else adv_b).append(f"{pct}% lower blended list price ({fmt_blend(pc)} vs {fmt_blend(pd)} per 1M tokens).")
    sentences.append(price_txt)
    faqs.append({"question": f"Which is cheaper: {A['name']} or {B['name']}?", "answer": price_txt})

    # Context
    ca, cb = A.get("contextTokens"), B.get("contextTokens")
    if ca and cb and max(ca, cb) >= 1.25 * min(ca, cb):
        big, small = (A, B) if ca > cb else (B, A)
        ctx_txt = f"{big['name']} accepts {big['contextWindow']}; {small['name']} accepts {small['contextWindow']}."
        (adv_a if big is A else adv_b).append(f"Larger context window ({big['contextWindow']} vs {small['contextWindow']}).")
    elif ca and cb and ca != cb:
        ctx_txt = f"Context windows are about the same: {A['name']} {A['contextWindow']}, {B['name']} {B['contextWindow']}."
    elif ca and cb:
        ctx_txt = f"Both accept {A['contextWindow']}."
    else:
        ctx_txt = f"Context window: {A['name']} {A['contextWindow']}, {B['name']} {B['contextWindow']}."
    sentences.append(ctx_txt)
    faqs.append({"question": f"Which has the larger context window?", "answer": ctx_txt})

    # Weights
    oa, ob = A["openSourceStatus"] == "Open Weights", B["openSourceStatus"] == "Open Weights"
    if oa and ob:
        w_txt = f"Both publish open weights ({A['license']}; {B['license']}), so both can be self-hosted."
    elif oa or ob:
        o, c = (A, B) if oa else (B, A)
        w_txt = f"{o['name']} has open weights ({o['license']}) and can be self-hosted; {c['name']} is available only as a hosted API."
        (adv_a if oa else adv_b).append(f"Open weights ({o['license']}): can be self-hosted.")
    else:
        w_txt = "Both are proprietary and available only as hosted APIs."
    sentences.append(w_txt)
    faqs.append({"question": f"Can I download {A['name']} or {B['name']}?", "answer": w_txt})

    # Task benchmarks: only compare when both have a result on the same board
    for bench in ("OSWorld-Verified", "SWE-bench Verified"):
        sa, sb = task_score(A, bench), task_score(B, bench)
        if sa is not None and sb is not None and sa != sb:
            hi, lo, hs, ls = (A, B, sa, sb) if sa > sb else (B, A, sb, sa)
            sentences.append(f"On {bench}, {hi['name']} scores {hs:.1f}% vs {ls:.1f}%.")
            (adv_a if hi is A else adv_b).append(f"Higher {bench} result ({hs:.1f}% vs {ls:.1f}%).")
        elif (sa is None) != (sb is None):
            has = A if sa is not None else B
            sentences.append(f"Only {has['name']} has a {bench} result in our sources, so we do not compare them there.")

    if oa and ob:
        category = "Open Weights"
    elif pa and pb and max(pa, pb) / min(pa, pb) >= 3:
        category = "Cost & Pareto"
    else:
        category = "Frontier Flagships"
    no_adv = "No measured advantage in our sources."
    return {
        "slug": sd["slug"], "name": sd["name"], "shortTitle": sd["shortTitle"], "category": category,
        "modelIdA": A["id"], "modelIdB": B["id"],
        "seoTitle": f"{A['name']} vs {B['name']}: Arena Score, Price & Context | NextVector",
        "seoDescription": (f"{A['name']} vs {B['name']} side by side: arena.ai text score, list price per 1M tokens, "
                           f"context window and licence, with sources. Data checked {as_of}."),
        "executiveVerdict": " ".join(sentences),
        "verdictA": {"title": f"Where {A['name']} leads (by the data):", "points": adv_a or [no_adv]},
        "verdictB": {"title": f"Where {B['name']} leads (by the data):", "points": adv_b or [no_adv]},
        "faqs": faqs,
    }


def build_guide(models, frontier, as_of):
    """Data-driven picks for the decision guide. Each pick names the rule that chose it."""
    ranked = [m for m in models if m.get("arenaElo") and not m.get("preRelease")]
    priced = [m for m in ranked if blended(m["pricing"]) is not None]

    def top(ms, key):
        return max(ms, key=key) if ms else None

    picks = []

    def add(pid, title, rule, m, metric):
        if m:
            picks.append({"id": pid, "title": title, "rule": rule, "modelId": m["id"], "modelName": m["name"],
                          "developer": m["developer"], "metric": metric(m),
                          "price": f"{fmt_usd(m['pricing']['inputPer1M'])} / {fmt_usd(m['pricing']['outputPer1M'])} per 1M tokens"})

    add("top-arena", "Highest Arena score (released models)", "Highest arena.ai text score among generally released models we track.",
        top(ranked, lambda m: m["arenaElo"]), lambda m: f"Arena {m['arenaElo']} (±{m['arenaCI']}, #{m['arenaRank']})")
    add("value", "Best Arena score under $1 blended", "Highest Arena score with a blended list price under $1 per 1M tokens (3 input : 1 output).",
        top([m for m in priced if blended(m["pricing"]) < 1], lambda m: m["arenaElo"]),
        lambda m: f"Arena {m['arenaElo']} at {fmt_blend(blended(m['pricing']))} blended")
    add("budget", "Best Arena score under $0.20 blended", "Highest Arena score with a blended list price under $0.20 per 1M tokens.",
        top([m for m in priced if blended(m["pricing"]) < 0.2], lambda m: m["arenaElo"]),
        lambda m: f"Arena {m['arenaElo']} at {fmt_blend(blended(m['pricing']))} blended")
    add("open", "Best open-weights model", "Highest Arena score among models with downloadable weights.",
        top([m for m in ranked if m["openSourceStatus"] == "Open Weights"], lambda m: m["arenaElo"]),
        lambda m: f"Arena {m['arenaElo']} · {m['license']}")
    osw = [m for m in models if task_score(m, "OSWorld-Verified") is not None]
    add("computer-use", "Computer use", "Highest OSWorld-Verified success rate (General model runs) among models we track.",
        top(osw, lambda m: task_score(m, "OSWorld-Verified")), lambda m: f"OSWorld-Verified {task_score(m, 'OSWorld-Verified'):.1f}%")
    swe = [m for m in models if task_score(m, "SWE-bench Verified") is not None]
    add("coding", "Coding (shared-harness SWE-bench runs)", "Highest SWE-bench Verified score in mini-SWE-agent runs. These runs stop in early 2026, so newer models are missing.",
        top(swe, lambda m: task_score(m, "SWE-bench Verified")), lambda m: f"SWE-bench Verified {task_score(m, 'SWE-bench Verified'):.1f}%")
    released = [m for m in models if not m.get("preRelease")]
    for field, pid, title in (("aaIntelligence", "aa-intelligence", "Highest Artificial Analysis Intelligence Index"),
                              ("aaCoding", "aa-coding", "Coding (Artificial Analysis Coding Index)"),
                              ("aaAgentic", "aa-agentic", "Agent work (Artificial Analysis Agentic Index)")):
        label = title.split("(")[-1].rstrip(")") if "(" in title else "Artificial Analysis Intelligence Index"
        add(pid, title, f"Highest {label} among generally released models we track (best setting per model).",
            top([m for m in released if m.get(field) is not None], lambda m, f=field: m[f]),
            lambda m, f=field, lb=label: f"{lb.replace('Artificial Analysis', 'AA')} {m[f]}")
    ctx = [m for m in ranked if m.get("contextTokens")]
    add("long-context", "Largest context window", "Largest listed context window among Arena-ranked models; ties go to the higher Arena score.",
        top(ctx, lambda m: (m["contextTokens"], m["arenaElo"])), lambda m: f"{m['contextWindow']} · Arena {m['arenaElo']}")
    return picks


MODALITY = {"text": "Text", "image": "Vision", "audio": "Audio", "video": "Video", "file": "Files"}


def main():
    cur = json.loads((SRC / "curated_models.json").read_text(encoding="utf-8"))
    arena_snap, or_snap = load("arena_text.json"), load("openrouter.json")
    osw_snap, swe_snap = load("osworld_verified.json"), load("swebench_verified.json")
    aa_snap = load("artificial_analysis.json")
    aa_rows = {r["slug"]: r for r in aa_snap["data"]}
    aa_version, aa_as_of = aa_snap.get("indexVersion"), aa_snap["fetchedAt"][:10]
    arena = {e["modelDisplayName"]: e for e in arena_snap["data"]}
    orr = {m["id"]: m for m in or_snap["data"]}
    arena_total = len(arena_snap["data"])
    as_of = arena_snap["fetchedAt"][:10]
    errors = []

    # Best OSWorld-Verified result per model among "General model" rows (bare models, no extra framework)
    osw_best = {}
    for r in osw_snap["data"]:
        if r["approach"] != "General model":
            continue
        if r["model"] not in osw_best or r["successRate"] > osw_best[r["model"]]["successRate"]:
            osw_best[r["model"]] = r
    # Best SWE-bench Verified result per model with the shared mini-SWE-agent (bash only) harness
    swe_best = {}
    for r in swe_snap["data"]:
        if r.get("agent") != "mini-SWE-agent" or not r.get("model_display"):
            continue
        k = r["model_display"]
        if k not in swe_best or float(r["resolved"]) > float(swe_best[k]["resolved"]):
            swe_best[k] = r

    models, ids = [], set()
    for c in cur["models"]:
        if c["id"] in ids:
            errors.append(f"duplicate id {c['id']}")
        ids.add(c["id"])
        a = arena.get(c.get("arena")) if c.get("arena") else None
        o = orr.get(c.get("or")) if c.get("or") else None
        if c.get("arena") and not a:
            errors.append(f"{c['name']}: arena key '{c['arena']}' not in snapshot")
        if c.get("or") and not o:
            errors.append(f"{c['name']}: OpenRouter id '{c['or']}' not in snapshot")
        if c.get("osw") and c["osw"] not in osw_best:
            errors.append(f"{c['name']}: OSWorld key '{c['osw']}' not found")
        if c.get("swe") and c["swe"] not in swe_best:
            errors.append(f"{c['name']}: SWE-bench key '{c['swe']}' not found")
        for slug in c.get("aa", []):
            if slug not in aa_rows:
                errors.append(f"{c['name']}: Artificial Analysis slug '{slug}' not in snapshot")
        if not (a or o or c.get("price")):
            errors.append(f"{c['name']}: no source at all (needs arena, OpenRouter or official price)")

        sources = []
        # ---- price: official page > OpenRouter > Arena listing
        pricing = {"inputPer1M": None, "outputPer1M": None, "cachedInputPer1M": None}
        if c.get("price"):
            p = c["price"]
            pricing.update(inputPer1M=p["in"], outputPer1M=p["out"], cachedInputPer1M=p.get("cache"))
            if pricing["cachedInputPer1M"] is None and o:
                pricing["cachedInputPer1M"] = money(o.get("cache_read"))
            label, url = PRICE_SOURCES[p["src"]]
            pricing["source"] = label
            if p.get("note"):
                pricing["note"] = p["note"]
            sources.append({"label": label, "url": url})
        elif o and money(o.get("input")) is not None and money(o.get("output")) is not None:
            pricing.update(inputPer1M=money(o["input"]), outputPer1M=money(o["output"]), cachedInputPer1M=money(o.get("cache_read")))
            pricing["source"] = "OpenRouter list price"
        elif a and a.get("inputPricePerMillion") is not None:
            pricing.update(inputPer1M=a["inputPricePerMillion"], outputPer1M=a["outputPricePerMillion"])
            pricing["source"] = "arena.ai model listing"
        else:
            pricing["note"] = c.get("access") or "No public per-token price"
        pricing = {k: v for k, v in pricing.items() if v is not None}
        if "inputPer1M" not in pricing:
            pricing["inputPer1M"] = None
            pricing["outputPer1M"] = None

        # ---- context, dates, modalities, licence
        ctx = c.get("ctx") or (o and o.get("context_length")) or (a and a.get("contextLength"))
        released = c.get("released") or (o and o.get("createdDate"))
        hf = o.get("hugging_face_id") if o else None
        lic = (a or {}).get("license")
        open_weights = bool(hf) or (lic not in (None, "Proprietary"))
        license_text = lic or ("Open weights (see Hugging Face)" if hf else "Proprietary")
        if o and o.get("input_modalities"):
            mods = sorted((MODALITY.get(x, x.title()) for x in o["input_modalities"]), key=lambda x: (x != "Text", x))
            outs = o.get("output_modalities") or []
            if "image" in outs:
                mods.append("Image output")
            if "audio" in outs:
                mods.append("Audio output")
        else:
            mods = c.get("modalities") or ["Text"]

        link = (a or {}).get("modelUrl") or c.get("link") or (f"https://openrouter.ai/{c['or']}" if c.get("or") else None)
        if link:
            sources.insert(0, {"label": "Official page", "url": link}) if (a and a.get("modelUrl")) or c.get("link") else None
        if o:
            sources.append({"label": "OpenRouter listing", "url": f"https://openrouter.ai/{c['or']}"})
        if hf:
            sources.append({"label": "Hugging Face weights", "url": f"https://huggingface.co/{hf}"})

        # ---- benchmarks (each with its own source)
        benchmarks = []
        m = {
            "id": c["id"], "name": c["name"], "developer": c["dev"],
            "releaseDate": month_label(released) or "Not listed",
            "releaseDateSource": ("OpenRouter listing date" if (o and not c.get("released")) else ("Lab announcement" if c.get("released") else None)),
            "modelType": model_type(c["name"], open_weights, c.get("type"), c["dev"]),
            "modalities": mods,
            "contextWindow": fmt_ctx(ctx),
            "contextTokens": ctx or None,
            "parameters": c.get("params") or ("Not disclosed" if not open_weights else "Not listed in our sources"),
            "pricing": pricing,
            "openSourceStatus": "Open Weights" if open_weights else "Proprietary API",
            "license": license_text,
            "hardwareRequirements": c.get("access") or (f"Open weights on Hugging Face ({hf})" if hf else ("Open weights" if open_weights else "Hosted API")),
        }
        if a:
            ci = round((a["ratingUpper"] - a["ratingLower"]) / 2)
            benchmarks.append({
                "benchmarkName": "Arena Text Elo", "score": round(a["rating"]),
                "vsPreviousGen": f"#{a['rank']} of {arena_total} on arena.ai · ±{ci} · {a['votes']:,} votes · variant: {a['modelDisplayName']}",
                "sourceUrl": ARENA_URL,
            })
            m["arenaRank"], m["arenaElo"] = a["rank"], round(a["rating"])
            m["arenaVotes"], m["arenaCI"], m["arenaVariant"] = a["votes"], ci, a["modelDisplayName"]
            # Arena's pre-release tag can lag; a public API listing or official price means it is released
            if a.get("releaseType") in ("pre_release", "co_release") and not (o or c.get("price")):
                m["preRelease"] = True
            sources.append({"label": "arena.ai text leaderboard", "url": ARENA_URL})
        if c.get("osw"):
            r = osw_best[c["osw"]]
            benchmarks.append({
                "benchmarkName": "OSWorld-Verified", "score": f"{r['successRate']:.1f}%",
                "vsPreviousGen": f"Success rate · {r['maxSteps']} steps · tested {r['date']}",
                "sourceUrl": OSWORLD_URL,
            })
            sources.append({"label": "OSWorld-Verified leaderboard", "url": OSWORLD_URL})
        if c.get("swe"):
            r = swe_best[c["swe"]]
            benchmarks.append({
                "benchmarkName": "SWE-bench Verified", "score": f"{float(r['resolved']):.1f}%",
                "vsPreviousGen": f"mini-SWE-agent (bash only) · run '{r['name']}' · {r['date']}",
                "sourceUrl": SWE_URL,
            })
            sources.append({"label": "SWE-bench Verified leaderboard", "url": SWE_URL})
        variants = [aa_rows[s] for s in c.get("aa", []) if s in aa_rows]
        for field, label in AA_INDEXES:
            scored = [r for r in variants if r.get(field) is not None]
            if not scored:
                continue
            best = max(scored, key=lambda r: r[field])
            benchmarks.append({
                "benchmarkName": label, "score": round(best[field], 1),
                "vsPreviousGen": f"Artificial Analysis v{aa_version} · best setting: {best['name']} · checked {aa_as_of}",
                "sourceUrl": f"{AA_URL}models/{best['slug']}",
            })
            m["aa" + field.title()] = round(best[field], 1)
            if field == "intelligence":
                m["aaVariant"] = best["name"]
                sources.append({"label": "Artificial Analysis", "url": f"{AA_URL}models/{best['slug']}"})
        m["benchmarks"] = benchmarks
        m["keyImprovements"], m["knownLimitations"], m["realWorldApplications"] = [], [], []
        m["architectureNotes"] = ""
        if c.get("params") and c.get("paramsSrc", "").startswith("http"):
            sources.append({"label": "Parameter count", "url": c["paramsSrc"]})
        if link:
            m["link"] = link
        if c.get("access"):
            m["access"] = c["access"]

        # plain factual summary built only from the fields above
        bits = [f"{m['openSourceStatus'].replace('Proprietary API', 'Proprietary')} model from {c['dev']}"]
        if m["releaseDate"] != "Not listed":
            bits[0] += f", listed {m['releaseDate']}"
        if a:
            bits.append(f"Arena text score {m['arenaElo']} (#{a['rank']} of {arena_total} entries)")
        if pricing["inputPer1M"] is not None:
            bits.append(f"${pricing['inputPer1M']:.2f} input / ${pricing['outputPer1M']:.2f} output per 1M tokens")
        if ctx:
            bits.append(f"{fmt_ctx(ctx)} context")
        if c.get("access"):
            bits.append(c["access"])
        m["summary"] = ". ".join(bits) + "."
        # de-duplicate sources by url, keep order
        seen, uniq = set(), []
        for s in sources:
            if s["url"] not in seen:
                seen.add(s["url"])
                uniq.append(s)
        m["sources"] = uniq
        m["dataAsOf"] = as_of
        models.append(m)

    if errors:
        print("BUILD FAILED:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    by_name = {m["name"]: m for m in models}
    name_by_osw = {c.get("osw"): c["name"] for c in cur["models"] if c.get("osw")}
    name_by_swe = {c.get("swe"): c["name"] for c in cur["models"] if c.get("swe")}

    def entry(rank, name, dev, score, date, model_id=None, cost=None, note=None):
        e = {"rank": rank, "modelName": name, "developer": dev, "score": score, "date": date}
        if model_id:
            e["modelId"] = model_id
        if cost:
            e["costPerRun"] = cost
        if note:
            e["note"] = note
        return e

    arena_month = short_month(as_of)
    # 1. Arena: tracked models only, real arena.ai rank (gaps = models we do not track)
    arena_rows = sorted((m for m in models if m.get("arenaRank")), key=lambda m: m["arenaRank"])
    arena_board = [entry(m["arenaRank"], m["name"], m["developer"], m["arenaElo"], arena_month, m["id"],
                         note=f"±{m['arenaCI']} · {m['arenaVotes']:,} votes" + (" · pre-release" if m.get("preRelease") else "")) for m in arena_rows]

    # 2. OSWorld-Verified: all "General model" results, best per model
    osw_rows = sorted(osw_best.values(), key=lambda r: -r["successRate"])
    osw_board = []
    for i, r in enumerate(osw_rows, 1):
        nm = name_by_osw.get(r["model"])
        osw_board.append(entry(i, nm or r["model"], by_name[nm]["developer"] if nm else (r["institution"] or ""),
                               round(r["successRate"], 2), short_month(r["date"]), by_name[nm]["id"] if nm else None,
                               note=f"{r['maxSteps']} steps"))

    # 3. SWE-bench Verified: mini-SWE-agent (bash only) runs, best per model
    swe_rows = sorted(swe_best.values(), key=lambda r: -float(r["resolved"]))
    swe_board = []
    for i, r in enumerate(swe_rows, 1):
        nm = name_by_swe.get(r["model_display"])
        swe_board.append(entry(i, nm or r["model_display"], by_name[nm]["developer"] if nm else (r.get("model_org") or ""),
                               round(float(r["resolved"]), 2), short_month(r["date"]), by_name[nm]["id"] if nm else None,
                               note=r["name"]))

    # 4. Price vs Arena: Pareto frontier. A model is on it if no cheaper tracked model scores higher.
    priced = [m for m in models if m.get("arenaElo") and blended(m["pricing"]) is not None]
    priced.sort(key=lambda m: (blended(m["pricing"]), -m["arenaElo"]))
    frontier, best = [], -1
    for m in priced:
        if m["arenaElo"] > best:
            frontier.append(m)
            best = m["arenaElo"]
    frontier.sort(key=lambda m: -m["arenaElo"])
    pareto_board = [entry(i, m["name"], m["developer"], m["arenaElo"], arena_month, m["id"],
                          cost=f"${blended(m['pricing']):.2f} / 1M blended",
                          note="pre-release on arena.ai" if m.get("preRelease") else None) for i, m in enumerate(frontier, 1)]

    # 5. Artificial Analysis Intelligence Index: tracked models only, best setting per model
    aa_ranked = sorted((m for m in models if m.get("aaIntelligence") is not None), key=lambda m: -m["aaIntelligence"])
    aa_board = []
    for i, m in enumerate(aa_ranked, 1):
        extra = [f"Coding {m['aaCoding']}" if m.get("aaCoding") is not None else None,
                 f"Agentic {m['aaAgentic']}" if m.get("aaAgentic") is not None else None,
                 "pre-release" if m.get("preRelease") else None]
        aa_board.append(entry(i, m["name"], m["developer"], m["aaIntelligence"], short_month(aa_as_of), m["id"],
                              note=" · ".join(x for x in extra if x) or None))

    header = (f"// GENERATED by scripts/build_model_data.py on {as_of}. Do not edit by hand.\n"
              f"// Edit scripts/model_sources/curated_models.json, refresh snapshots with fetch_model_sources.py, then rebuild.\n")
    MODELS_TS.write_text(
        header + "import { AIModel } from '../types';\n\n"
        f"export const MODEL_DATA_AS_OF = '{as_of}';\n"
        f"export const ARENA_TOTAL_ENTRIES = {arena_total};\n\n"
        "export const ALL_MODELS: AIModel[] = " + json.dumps(models, ensure_ascii=False, indent=2) + ";\n\n"
        "export const ARENA_LEADERBOARD_ENTRIES = " + json.dumps(arena_board, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")
    BENCH_TS.write_text(
        header + "import { LeaderboardEntry } from '../types';\n\n"
        f"export const OSWORLD_DATA_AS_OF = '{osw_snap['fetchedAt'][:10]}';\n"
        f"export const SWE_BENCH_DATA_AS_OF = '{swe_snap['fetchedAt'][:10]}';\n"
        f"export const SWE_BENCH_LATEST_RUN = '{max(r['date'] for r in swe_rows)}';\n\n"
        "export const OSWORLD_LEADERBOARD_ENTRIES: LeaderboardEntry[] = " + json.dumps(osw_board, ensure_ascii=False, indent=2) + ";\n\n"
        "export const SWE_BENCH_LEADERBOARD_ENTRIES: LeaderboardEntry[] = " + json.dumps(swe_board, ensure_ascii=False, indent=2) + ";\n\n"
        "export const PRICE_PERFORMANCE_LEADERBOARD_ENTRIES: LeaderboardEntry[] = " + json.dumps(pareto_board, ensure_ascii=False, indent=2) + ";\n\n"
        f"export const AA_DATA_AS_OF = '{aa_as_of}';\n"
        f"export const AA_INDEX_VERSION = '{aa_version}';\n\n"
        "export const AA_LEADERBOARD_ENTRIES: LeaderboardEntry[] = " + json.dumps(aa_board, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")

    # Head-to-head showdowns and decision-guide picks, computed from the fields above
    by_id = {m["id"]: m for m in models}
    showdowns = []
    for sd in cur.get("showdowns", []):
        if sd["a"] not in by_id or sd["b"] not in by_id:
            sys.exit(f"Showdown {sd['slug']} names an unknown model id")
        showdowns.append(build_showdown(sd, by_id[sd["a"]], by_id[sd["b"]], as_of))
    guide = build_guide(models, frontier, as_of)
    SHOWDOWNS_TS.write_text(
        header + "import { PresetShowdown, GuidePick } from '../types';\n\n"
        "export const PRESET_SHOWDOWNS: PresetShowdown[] = " + json.dumps(showdowns, ensure_ascii=False, indent=2) + ";\n\n"
        "export const GUIDE_PICKS: GuidePick[] = " + json.dumps(guide, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")
    # One JSON for the Python prerender and verify scripts (no regex parsing of TypeScript)
    SITE_JSON.parent.mkdir(parents=True, exist_ok=True)
    SITE_JSON.write_text(json.dumps({
        "asOf": as_of, "arenaTotal": arena_total, "models": models,
        "boards": {"arena": arena_board, "osworld": osw_board, "swebench": swe_board, "pareto": pareto_board, "aa": aa_board},
        "aa": {"asOf": aa_as_of, "indexVersion": aa_version, "url": AA_URL},
        "showdowns": showdowns, "guide": guide,
    }, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    # Redirects for merged / renamed / dropped model pages
    redirects = []
    for c in cur["models"]:
        for old in c.get("aliases", []):
            redirects.append({"source": f"/models/{old}", "destination": f"/models/{c['id']}", "permanent": True})
    for old in cur.get("dropped_ids", []):
        redirects.append({"source": f"/models/{old}", "destination": "/models", "permanent": True})
    vc = json.loads(VERCEL.read_text(encoding="utf-8"))
    keep = [r for r in vc.get("redirects", []) if not r["source"].startswith("/models/")]
    vc["redirects"] = keep + redirects
    VERCEL.write_text(json.dumps(vc, indent=2) + "\n", encoding="utf-8")

    print(f"Built {len(models)} models (data as of {as_of}).")
    print(f"  Arena board {len(arena_board)} | OSWorld {len(osw_board)} | SWE-bench {len(swe_board)} | Pareto {len(pareto_board)} | AA {len(aa_board)}")
    print(f"  Redirects: {len(redirects)} | Showdowns: {len(showdowns)} | Guide picks: {len(guide)}")


if __name__ == "__main__":
    main()
