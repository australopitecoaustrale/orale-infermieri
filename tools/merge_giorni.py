"""Unisce i file giorni/AAAA-MM-GG.json in giorni.json (letto dal sito)."""
import json, glob, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
docs = []
for p in sorted(glob.glob(os.path.join(root, "giorni", "????-??-??.json"))):
    d = json.load(open(p, encoding="utf-8"))
    d = d.get("data", d)  # accetta anche il formato con "data"
    docs.append({k: d[k] for k in ("date", "topic", "created", "items", "casi") if k in d})
docs.sort(key=lambda x: x["date"])
json.dump(docs, open(os.path.join(root, "giorni.json"), "w", encoding="utf-8"), ensure_ascii=False)
print(len(docs), "giorni:", ", ".join(f'{d["date"]} ({len(d.get("items", []))} domande)' for d in docs))
