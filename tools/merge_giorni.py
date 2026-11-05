"""Unisce i file giorni/AAAA-MM-GG.json in giorni.json (letto dal sito).
Sul sito restano solo gli ultimi 7 giorni (oggi compreso): i file più vecchi vengono spostati
in giorni/archivio/, dove servono solo per non ripetere domande ed esercizi già usati."""
import json, glob, os, shutil, datetime
try:
    from zoneinfo import ZoneInfo
    today = datetime.datetime.now(ZoneInfo("Europe/Rome")).date()
except Exception:
    today = datetime.date.today()
KEEP = 7
cut = (today - datetime.timedelta(days=KEEP - 1)).isoformat()
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arch = os.path.join(root, "giorni", "archivio")
docs, moved = [], []
for p in sorted(glob.glob(os.path.join(root, "giorni", "????-??-??.json"))):
    name = os.path.basename(p)[:10]
    if name < cut:
        os.makedirs(arch, exist_ok=True)
        shutil.move(p, os.path.join(arch, os.path.basename(p)))
        moved.append(name)
        continue
    d = json.load(open(p, encoding="utf-8"))
    d = d.get("data", d)  # accetta anche il formato con "data"
    docs.append({k: d[k] for k in ("date", "topic", "created", "items", "casi", "palestre") if k in d})
docs.sort(key=lambda x: x["date"])
json.dump(docs, open(os.path.join(root, "giorni.json"), "w", encoding="utf-8"), ensure_ascii=False)
print(len(docs), "giorni sul sito:", ", ".join(f'{d["date"]} ({len(d.get("items", []))} domande)' for d in docs))
if moved:
    print("archiviati (più vecchi di", KEEP, "giorni):", ", ".join(moved))
print("nel database vanno eliminati i documenti con data precedente a", cut)
