---
name: figura-animata
description: Regole e classi per disegnare o animare una figura SVG dell'Atlante (figure.js). Usala prima di creare o modificare un'illustrazione, uno schema o un tracciato ECG schematico.
---

# Figure dell'Atlante

Una figura è un oggetto in `FIGURE` (`figure.js`) con SVG scritto a mano. Viene inserita in pagina da `figHtml` in `index.html`.

## Regole di disegno

- `viewBox` largo circa 440; l'SVG ha `role="img"` e un `aria-label` che descrive il contenuto.
- Colori dal tema, non fissi, per tutto ciò che deve reggere il tema scuro: testo `class="ft"` (piccolo: `ft fsm`), linee `fl`, linee guida `lead`, tratteggio `dash`, riquadri `eyrow`, accento `fv`/`fs`. I colori fissi vanno bene per le campiture semantiche (per esempio verde normale, rosso allarme) con opacità.
- Carta ECG: classi `pap`, `gp1`, `gp5`, traccia `etr`, etichette `elab`, marcatori `emk`/`emt`. Le variabili `--ecg-*` hanno già la versione scura.
- Gli `id` dentro l'SVG (pattern, clipPath) possono ripetersi tra figure: `figHtml` li rende unici a ogni resa.
- Testi: dimensione minima 9 px, mai sopra una freccia o un'altra scritta. Se un'etichetta non entra, accorciala.
- Disegni originali: nessuna copia di immagini, loghi o impaginazioni altrui.

## Animazioni disponibili (CSS in `index.html`)

| Classe | Effetto |
|---|---|
| `anp` | pulsazione continua |
| `ans`, `ans s2`, `ans s3` | tre passi a turno, ciclo di 7,5 s |
| `vf k1` … `vf k6` | sei passi a turno, ciclo di 15 s |
| `ey`, `ey0/3/4/6`, `egz` | movimenti oculari, ciclo di 9 s |
| `<circle class="… anm">` con `animateMotion` | pallino che percorre un tracciato |
| `clipPath` con `<animate attributeName="width">` | tracciato che si disegna |

## Senza animazioni

Con «riduci movimento» attivo gli elementi `ans` e `vf` restano invisibili e i pallini `anm` e gli `<animate>` vengono tolti. Perciò:

- lo strato fisso deve già dire tutto (etichette, colori tenui, tabella dei passi);
- lo strato animato aggiunge solo l'evidenza del passo corrente (contorno, freccia, colore più pieno).

## Controllo

`node tools/verifica.js`, poi gli scatti con `.claude/skills/nuova-voce/scripts/anteprima.js` passando il numero di passi: uno scatto per passo, in tema chiaro e scuro.
