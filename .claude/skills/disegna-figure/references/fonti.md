# Fonti di tecniche per le figure

Regola: dall'esterno si prendono **tecniche e idee**, non immagini né grafica. Una figura dell'Atlante è sempre disegnata da zero. Prima di riutilizzare codice di terzi guarda la licenza della singola cartella o file, non solo quella dell'archivio, e annotala qui.

## Trovate su GitHub (ricerca del 2026-11-18; licenza come riportata dall'archivio)

| Archivio | Licenza | A che cosa serve a noi |
|---|---|---|
| antvis/X6 | MIT | Idee per diagrammi a nodi e frecce (algoritmi e flussi) |
| alibaba/butterfly | MIT | Come si organizza un diagramma di flusso con livelli e rami |
| jongalloway/DiagramForge | MIT | «Testo → SVG pulito e autonomo»: modello per descrivere una figura con pochi dati |
| julianolarteramos/specimen | MIT | Figure isometriche di anatomia in SVG: idee di composizione per schemi anatomici |
| melihcolpan/MuscleMap | MIT | Come suddividere un corpo in regioni cliccabili: idea per figure con zone etichettate |
| cawfree/react-native-rough | MIT | Effetto «a mano libera» (Rough.js): tecnica per tratti irregolari, se mai servisse |

Non sono immagini da copiare: sono riferimenti per il modo di costruire. Nessun codice di questi archivi è stato incluso nell'Atlante.

## Come aggiornare la ricerca

```bash
gh api -X GET search/repositories -f q='svg diagram library javascript license:mit' -f per_page=5 --jq '.items[]|[.full_name,.license.spdx_id,.stargazers_count,.description]|@tsv'
gh api -X GET search/repositories -f q='topic:anatomy svg license:mit' -f per_page=5 --jq '.items[]|[.full_name,.license.spdx_id,.stargazers_count]|@tsv'
gh api -X GET search/repositories -f q='interactive medical illustration svg' -f per_page=5 --jq '.items[]|[.full_name,(.license.spdx_id//"nessuna"),.stargazers_count]|@tsv'
```

Aggiungi alla tabella solo ciò che ha una licenza chiara e permissiva e che porta un'idea nuova; scrivi che cosa insegna. Le immagini con licenza «attribuzione» o «non commerciale» restano solo ispirazione.
