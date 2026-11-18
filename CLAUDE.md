# Atlante di Infermieristica

App web statica installabile per la prova orale del concorso Infermieri Puglia 2026. Nessuna build, nessuna dipendenza: GitHub Pages pubblica il ramo `main` così com'è. Tutto il testo rivolto a chi studia è in italiano.

## File

| File | Contenuto |
|---|---|
| `index.html` | Tutta l'app: CSS e JavaScript sono dentro la pagina |
| `enciclopedia.js` | `ENC_AREE` e `ENC` (voci, in più blocchi `ENC.push(...)`) |
| `encquiz.js` | Quiz sulle voci (`QUIZ3` e blocchi `QUIZ_*`) |
| `glossario.js` | `GLOSS` |
| `figure.js` | `FIGURE`: illustrazioni SVG originali |
| `figtpl.js` | `FT`: modelli per le figure (riquadri, frecce, assi, curve) |
| `ecg12.js`, `palestre.js` | ECG a 12 derivazioni e palestre |
| `sw.js` | Service worker con il nome della cache |
| `giorni.json`, `giorni/` | Domande del giorno |
| `tools/verifica.js` | Controllo dei contenuti |
| `tools/copertura-figure.js` | Dove mancano figure, con le priorità |

## Formati

- **Voce**: `{id,a,t,d,p:[],v:[[nome,valore]],i:[],n:"",e:[],r:[]}` — `a` area (chiave di `ENC_AREE`), `d` definizione, `p` punti chiave, `v` valori, `i` assistenza infermieristica, `n` nota sulle fonti, `e` errori frequenti, `r` id di voci collegate. `v` e `n` sono facoltativi.
- **Quiz**: `[idVoce, domanda, [4 opzioni], indiceCorretta, spiegazione]`.
- **Glossario**: `[voce, categoria, definizione, inglese, idVoce]`; categorie `t p s d g n`.
- **Figura**: `{id,t,c,enc:[idVoci],gl:[termini],st:/regex/i,svg:\`<svg viewBox=…>…</svg>\`}`.

Una voce nuova va accanto a quelle dello stesso argomento, non in fondo al file.

## Regole

- Dopo ogni modifica ai contenuti cambiare la versione in `sw.js` **in due punti**: nel commento della prima riga e in `const C="atlante-…"`. Senza questo chi ha l'app installata non vede l'aggiornamento.
- Eseguire `node tools/verifica.js` prima di ogni commit (lo fanno anche gli agganci in `.claude/settings.json`).
- I contenuti clinici (dosi, soglie, valori) vanno scritti con parole proprie e verificati; indicare la fonte nel campo `n`. Video e post sono spunti, non fonti.
- Le figure sono disegni originali: non copiare immagini, loghi o grafica altrui.
- Dopo ogni video (`/watch`, con trascrizione dell'audio quando c'è) e dopo ogni trascrizione: scritti voce, quiz e glossario, far rivedere sempre il lavoro all'agente `revisore-clinico`, con controllo su PubMed, e applicare le correzioni prima di unire in `main`.
- Alla fine di ogni video, dopo l'unione in `main`, chiudere la risposta ricordando all'utente di eseguire `/compact` (è un comando che può lanciare solo l'utente).
- **Casi clinici nuovi** (anche quelli della routine «Domande della settimana»): in ogni gruppo di casi creati insieme devono esserci almeno un caso con ventilatore (`vent` con `etco2`, ed eventualmente `abp` o `resp`), almeno un caso con emogasanalisi arteriosa nei dati `esami` (pH, PaCO₂, HCO₃⁻, PaO₂, lattati e FiO₂, coerenti tra loro e col quadro) e almeno un caso integrato: lo stesso paziente letto con più strumenti (monitor con ECG, ventilatore e capnografia, EGA, esami di laboratorio), con passaggi che chiedono di interpretare ciascuno e di decidere cosa fare. Un solo caso può soddisfare più requisiti. La storia non nomina il ritmo o il pattern che il monitor mostra, e i numeri devono essere coerenti (picco − plateau, driving pressure, EtCO₂, pH con Henderson-Hasselbalch).
- **Figure**: a ogni voce, video o trascrizione studiata, dopo l'unione in `main`, eseguire `node tools/copertura-figure.js` e aggiungere almeno una figura dalla cima dell'elenco (skill `disegna-figure`), con rilettura del `revisore-clinico` per i numeri. Priorità dell'utente: farmacologia e anestesia, anatomia, ecografia, area critica, poi le materie più complesse.
- Niente pull request se non richiesta in modo esplicito.

## Verifica nel browser

```bash
python3 -m http.server 8765 &
node .claude/skills/nuova-voce/scripts/anteprima.js <id-voce> <cartella> [passi]
```

Una voce si apre con `index.html#voce-<id>`. Guardare sempre tema chiaro e scuro.

## Skill del progetto

- `nuova-voce`: aggiungere una voce completa (quiz, glossario, figura, cache, verifica).
- `figura-animata`: classi e regole per le figure SVG.
- `disegna-figure`: che cosa illustrare, scelta del modello (`figtpl.js`), controlli e ciclo per migliorare sempre; fonti di tecniche su GitHub in `references/fonti.md`.
- `watch`: guardare un video; `design-dna`: analisi di stile.
- Da `K-Dense-AI/scientific-agent-skills` (MIT, 13 su 177): `literature-review`, `citation-management`, `paper-lookup`, `research-lookup`, `scientific-critical-thinking`, `scholar-evaluation`, `clinical-decision-support`, `treatment-plans`, `clinical-reports`, `infographics`, `scientific-schematics`, `markdown-mermaid-writing`, `database-lookup`. Sono di supporto: i contenuti dell'Atlante seguono comunque le regole sopra.
