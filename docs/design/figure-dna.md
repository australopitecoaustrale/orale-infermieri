# Figure dell'Atlante: Design DNA e specifica

Stile unico per tutte le figure SVG (`figure.js`, `figtpl.js`, regole `.fig` in `index.html`). Nasce dalla richiesta dell'utente (2026-11-22) di uniformare le figure. Fonti di metodo:
- `awesome-design`: linguaggio visivo piatto e ingegneristico, ispirato a Carbon/IBM, senza loghi né marchi;
- `design-dna`: i tre livelli sistema, stile ed effetti;
- `diagram-design`: niente ombre, un solo accento, densità bassa, griglia da 4;
- `design-handoff`: token, componenti, stati.

## Design DNA

```json
{
  "design_system": {
    "color": {
      "ink": "var(--ink): testo e tratti principali",
      "muted": "var(--muted): testo secondario, linee guida, frecce secondarie",
      "line": "var(--line): separatori sottili, contorni dei riquadri neutri",
      "surface": "var(--paper); riquadro neutro: color-mix(--ink 4%, --paper)",
      "accent": "var(--scrub): un solo accento, al massimo 1-2 elementi focali per figura",
      "semantic": "k-ok (verde), k-warn (ambra), k-alarm (rosso) solo per significato clinico; k-info = accento tenue"
    },
    "typography": {
      "family": "var(--f-body) (Atkinson Hyperlegible), un'unica famiglia",
      "title": "12px, peso 600 (classe fb)",
      "body": "12px, peso 400 (ft)",
      "small": "10.5px, muted (fsm); minimo assoluto 9px",
      "rule": "la gerarchia si fa con dimensione e colore, non con il grassetto pieno (700)"
    },
    "spacing": "griglia da 4 unità del viewBox; margini interni dei riquadri ≥ 8",
    "shape": {
      "box_radius": "2 (riquadri, etichette, schede: classi fbx, eyrow, k-*)",
      "organic_shapes": "corpi, organi, strumenti e pillole restano con le loro curve",
      "border": "1px; il tratto spesso (fs, 2.2) solo per il percorso focale"
    },
    "elevation": "nessuna ombra, nessun gradiente decorativo",
    "motion": "classi esistenti (ans, vf, anm, anp); lo strato fisso dice tutto"
  },
  "design_style": {
    "mood": "tecnico, calmo, preciso: una tavola da manuale clinico, non un'infografica pubblicitaria",
    "composition": "allineamenti a griglia, separatori sottili al posto delle scatole piene, molto bianco",
    "ornament": "minimo; il colore pieno è riservato ad allarme ed evidenza"
  },
  "visual_effects": {"canvas_webgl": false, "particles": false, "svg_animation": "solo didattica, già esistente"}
}
```

## Specifica di passaggio (handoff)

### Token

| Token / classe | Valore | Uso |
|---|---|---|
| `.fbx` | riempimento paper, tratto `--line` 1px | riquadro neutro |
| `.fbx.k-info` | accento al 10% | riquadro evidenziato (uno per figura) |
| `.k-ok` `.k-warn` `.k-alarm` | colori semantici tenui, tratto 1px | normale / attenzione / allarme |
| `.eyrow` | neutro (ink 4%), tratto `--line` | righe e bande di sfondo |
| `.fb` | peso 600 | titoli dei riquadri |
| `.fl` | `--ink`, 1.4 | tratti e frecce |
| `.lead` | `--muted`, 1 | linee di richiamo, separatori |
| `rx` dei riquadri | 2 | tutte le classi di riquadro sopra |

### Componenti
- **Riquadro** (`FT.box`): `rx` 2, titolo peso 600 e righe piccole muted.
- **Freccia** (`FT.arrow`, `FT.elbow`): tratto `.fl` e punta piena `.fh`. Preferire i gomiti ortogonali alle diagonali nei diagrammi a blocchi.
- **Etichetta o pillola**: rettangolo `rx` 2. Le pillole tonde restano solo se sono un oggetto (farmaco, compressa).

### Stati
Tema chiaro e scuro con le variabili del tema; «riduci movimento» mostra lo strato fisso. Ingrandita (`.fig.big`), la figura cresce senza cambiare stile.

### Casi limite
- Testi lunghi: accorciare, mai sotto i 9px.
- Figure ECG (`pap`, `gp1`, `gp5`, `etr`): non cambiano, la carta millimetrata ha già un suo stile.
- Disegni anatomici con colori fissi (cute, organi): restano. Si tolgono solo i colori fissi usati come decorazione dei riquadri.

### Accessibilità
`role="img"` e `aria-label` su ogni SVG. Contrasto del testo ≥ 4.5:1 in entrambi i temi. Il significato non deve stare solo nel colore: serve anche un'etichetta.
