---
name: disegna-figure
description: Usala quando bisogna aggiungere o migliorare disegni esplicativi (figure SVG) nell'Atlante: dopo una voce nuova, dopo un video, quando l'utente chiede più figure, o per decidere quali voci illustrare per prime. Contiene il conteggio dei buchi, la scelta del modello (algoritmo, matrice, curva, confronto, disegno a mano), i controlli e il ciclo per migliorare sempre.
---

# Disegnare figure per l'Atlante

Le regole di stile e le animazioni sono in `figura-animata`. Questa skill dice **che cosa disegnare, come e in che ordine**. Le figure sono disegni originali: da fonti esterne si prendono tecniche, mai immagini (vedi `references/fonti.md`).

## 1. Scegliere che cosa illustrare

```bash
node tools/copertura-figure.js            # riepilogo per area + prime 15 voci da illustrare
node tools/copertura-figure.js --area eco --n 30
```

L'elenco è ordinato per priorità: farmacologia e anestesia, ecografia, area critica, anatomia, poi le materie più complesse (ECG, esami, medicina, chirurgia, infezioni, oncologia). Le priorità sono nella tabella `PESO` dello script: cambiale quando l'utente cambia idea.

Una figura vale la pena se mostra **una cosa che il testo spiega male**: una sequenza, un confronto, una curva, un meccanismo, una forma. Se basta una tabella o un elenco, non disegnare.

## 2. Scegliere il modello

| Contenuto della voce | Modello (`figtpl.js`) | Esempio in `figure.js` |
|---|---|---|
| Sequenza o algoritmo con rami | `box` + `arrow` / `elbow` | `rcp-algoritmo`, `abcde` |
| Tabella 2×2 o classificazione | griglia di `box` con `k` (info, ok, warn, alarm) | `ega-acido-base`, `shock-tipi` |
| Andamento nel tempo o dose | `axes` + `curve` + barre | `pk-curve`, `insuline-profili` |
| Confronto di dispositivi o intervalli | barre su asse comune | `ossigeno-dispositivi` |
| Meccanismo con più attori | forme a mano + `box` di farmaci con frecce tratteggiate | `giunzione-neuromuscolare`, `coagulazione-farmaci` |
| Anatomia, ecografia, forme | disegno a mano con classi del tema | `eco-formazione-immagine`, `eco-sonde` |

I modelli restituiscono testo SVG con solo classi del tema, quindi reggono tema chiaro e scuro. Una figura nuova si scrive in `figure.js` come oggetto (`id`, `t`, `c`, `enc`, `gl`, `st`, `svg`). Accanto alle figure dello stesso argomento.

## 3. Contenuto: solo dati verificati

- Numeri, soglie e nomi vengono **dalla voce** dell'enciclopedia. Se la figura ne richiede di nuovi, verificali (PubMed, siti ufficiali) e aggiungili prima alla voce, con la fonte nel campo `n`.
- Una curva o un profilo qualitativo si dichiara «indicativo» nella didascalia.
- Titolo e didascalia dicono **che cosa insegna** la figura, non solo che cosa rappresenta.
- Il testo della figura non nomina la risposta dei quiz di quella voce.

## 4. Regole di layout (le cause degli errori già visti)

- Larghezza del testo: circa 5,4 unità per carattere a 10,5 px e 6,4 a 12 px grassetto. Dentro un riquadro di larghezza `w`, righe di al massimo `(w − 16) / 5,4` caratteri. Le righe si spezzano a mano.
- Mai testo sopra una freccia, una linea o un altro testo. Dove una linea deve passare dietro un'etichetta si usa la classe `halo` (`c:"halo"`).
- Riquadri affiancati con almeno 4 unità di spazio. Le frecce partono dal bordo, non dal centro.
- Etichette degli assi fuori dal grafico; legenda in alto, non sopra le curve.
- `viewBox` largo 440, altezza quanto serve. Testo minimo 9 px, di norma 10,5 o 12.
- Colori semantici: `alarm` (rosso) per pericolo, `warn` (ambra) per attenzione, `ok` (verde) per bersaglio o buona pratica, `info` per neutro. Non usare il rosso per decorare.

## 5. Controllo

```bash
node tools/verifica.js
python3 -m http.server 8765 &
```

Poi uno scatto di ogni figura nuova a 430 px di larghezza, tema scuro e chiaro, e guardarlo per intero (sovrapposizioni, tagli, contrasto): scrivi le figure in un file di lotto (oggetti separati da virgole, come il contenuto di `FIGURE`) e lancia `NODE_PATH=$(npm root -g) node tools/anteprima-figure.js <lotto.js> <cartella>`, senza toccare `figure.js`; a figure approvate si incollano in `figure.js`. Cambiare la versione in `sw.js` nei due punti.

Per ogni lotto di figure con contenuto clinico, **far rivedere i numeri e le frasi al `revisore-clinico`** (PubMed per primo, siti ufficiali dopo) e correggere prima di unire.

## Partire da un video

Se l'utente manda un video da cui trarre spunto, l'obiettivo è una figura (e un'animazione, se il video ne ha una) **il più simile possibile nell'idea**, ma disegnata da zero.

1. Con `watch` guarda i fotogrammi, non solo la trascrizione: per un video con parti visive usa più fotogrammi (`--max-frames 20` o più, risoluzione 640 o più) e leggili tutti. Per i punti chiave aggiungi `--timestamps` con i minuti in cui compaiono gli schemi.
2. Per ogni immagine o animazione utile annota: che cosa mostra, i componenti e la loro disposizione, i colori con il loro significato, la sequenza dei passi (che cosa compare prima, che cosa dopo), le didascalie e i numeri scritti.
3. Ricostruisci la composizione con `figtpl.js` e forme a mano. Se il video è animato, riproduci la sequenza con le classi di `figura-animata` (`ans` a tre passi, `vf` a sei passi, `anm` per un pallino lungo un tracciato, `clipPath` per un tracciato che si disegna), tenendo sempre lo strato fisso completo per «riduci movimento».
4. Dove il video e la voce dell'Atlante dicono cose diverse, vale la voce verificata: segnala la differenza all'utente invece di copiare l'errore.
5. Mai copiare fotogrammi, loghi, nomi di marchio, filigrane o grafica altrui: stessa struttura e stessi passi, tratto e colori del tema dell'Atlante.
6. Inserisci la figura nella voce o nella sezione dedicata (`enc`, `gl`, `st`), controlla in scuro e chiaro, rilettura del `revisore-clinico` per i numeri.

## Più agenti in parallelo

Per un lotto grande (decine di figure) si possono lanciare più subagenti, uno per area, ciascuno con il suo file di lotto in una cartella di lavoro e **senza toccare `figure.js`**: due agenti che modificano lo stesso file si pestano i piedi. Chi coordina incolla i lotti in `figure.js`, controlla gli scatti, fa rileggere i numeri ai `revisore-clinico` (anche in parallelo, uno per lotto), applica le correzioni, cambia la cache e unisce.

## 6. Migliorare sempre

- A ogni sessione di studio (voce, video, trascrizione) lancia `node tools/copertura-figure.js` e aggiungi **almeno una figura** dalla cima dell'elenco, se il tempo lo consente.
- Quando trovi un errore di disegno che si può ripetere (testo che esce, freccia che incrocia, colore illeggibile), aggiungilo a `references/lezioni.md` con la correzione.
- Un modello che serve a due figure diverse e non c'è ancora va aggiunto a `figtpl.js` (e alla tabella del punto 2).
- Ogni tanto, o se l'utente lo chiede, cerca nuove tecniche e strumenti su GitHub con i comandi in `references/fonti.md` e aggiorna quel file, **annotando la licenza** di ciò che trovi.
