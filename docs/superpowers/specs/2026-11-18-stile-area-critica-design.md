# Stile «Area critica» con stelle — design

Data: 2026-11-18. Stato: da approvare.

## Intento

L'Atlante deve sembrare, a chi ha 20-40 anni e studia sul telefono, un monitor di reparto e non un libro: scuro, vivo, con tracciati che si muovono, e una ricompensa visibile (le stelle) quando si risponde bene. Obiettivo: far venire voglia di aprirlo ogni giorno, senza togliere nulla alla leggibilità dei contenuti clinici.

Scelto dall'utente il 2026-11-18, dopo tre bozze animate: direzione **A «Area critica»** (sfondo monitor scuro, verde acqua neon, rosso allarme, numeri grandi in stile parametri vitali, tracciato ECG che scorre) con le **stelle della B** («Turno di giorno») come ricompensa. Realizzazione scelta: **pelle + stelle vere, in due passi**.

## Obiettivi

- Identità visiva coerente e riconoscibile, in tema scuro per impostazione predefinita.
- Animazioni che danno carattere (ECG, battito, allarme, stelle) senza pesare sul telefono.
- Stelle, giorni di fila e livelli per area che restano sul dispositivo.
- Rispetto di «riduci movimento» e dei contrasti (testo corrente almeno 4,5:1).

## Non obiettivi e anti-obiettivi

- Nessun ridisegno dei layout di home, voci e quiz; nessuna nuova pagina.
- Nessun account, server, tracciamento o dato inviato fuori dal telefono.
- Nessun testo clinico cambiato in questo lavoro.
- Anti-obiettivo: un aspetto «da videogioco» che distrae o banalizza la clinica (rosso solo per allarmi veri, stelle sobrie, niente suoni).
- Anti-obiettivo: perdere la distinzione per sezione (il colore di ogni area deve restare riconoscibile).
- Nessun asset di terzi: grafica originale, font già nel repo (`vendor/fonts`).

## Stato attuale (verificato nel codice)

- Un solo `index.html` (circa 740 KB) con CSS e JS; colori in variabili (`--va` per sezione, `--paper`, `--ink`, `--head`, `--vital`, `--ok`…); tema scuro già definito ma **solo dal sistema** (`prefers-color-scheme`); i selettori `data-theme` servono agli strumenti di anteprima. **Non esiste un selettore di tema** nell'interfaccia.
- Testata `header.top` con tracciato ECG (`.hdr-ecg`) e canvas (`.hdr-fx`); GSAP, ScrollTrigger e Lenis già in `vendor/`.
- I giorni di fila esistono già nella vista «Oggi» (`streak`, da `LS "daily2-<data>"`). Stelle e livelli non esistono.
- Il salvataggio locale passa da `LS.get/LS.set`, chiavi con prefisso `orinf_`.
- Il file ha già molti strati di «pelle» in CSS, uno sopra l'altro (righe circa 26-1460).

## Approcci considerati

1. **Solo pelle**: veloce, ma le stelle sarebbero scenografia. Scartato come punto di arrivo.
2. **Pelle + stelle vere, in due passi** — scelto dall'utente.
3. **Ridisegno completo**: troppo rischioso su 437 voci e un file da 740 KB. Scartato.

## Passo 1 — Pelle (si approva guardando)

- **Palette** (decisione di progetto, da affinare guardando): sfondo `#07100f`-`#0c1416`, carte `#0f1b1a`-`#142024`, testo `#e8fff8`-`#e4eeec`, accento neon `#2cf5b0`, allarme `#ff6b6b`, avviso ambra. Le variabili esistenti vengono ridefinite, non sostituite, così le centinaia di regole che le usano continuano a funzionare.
- **Tema**: scuro predefinito per tutti. Nuovo piccolo selettore (scuro / chiaro) nella testata, scelta salvata con `LS`. Il chiaro resta come tema «referto» con la stessa identità. Prima di scrivere il selettore, controllare che nulla dipenda dal tema di sistema.
- **Colore di sezione**: `--va` resta, ma nel tema scuro viene riportato a luminosità e saturazione coerenti con il neon (tinta di sezione ammessa solo come accento e fascia, non come sfondo del testo).
- **Tipografia**: titoli e numeri grandi con Geist Mono / Inter Tight già presenti; numeri di dashboard in stile parametro vitale (grandi, monospaziati, con unità piccola). Nessun nuovo font da CDN.
- **Animazioni** (tutte spente con «riduci movimento»): tracciato ECG che scorre in testata (esiste già: riuso e raffinamento); battito sul contatore dei giorni; breve alone rosso su risposta sbagliata; effetto «stellina» alla risposta giusta (solo visivo in questo passo); entrata dolce delle schede (opacità e spostamento breve).
- **Controllo**: `node tools/verifica.js`, scatti in tema scuro e chiaro con `anteprima.js`, controllo dei contrasti sulle viste principali (Oggi, Progressi, Enciclopedia/voce, Allenamento, Quiz, Calcoli, ECG), versione della cache in `sw.js`.

## Passo 2 — Stelle, giorni di fila, livelli (dopo l'approvazione del passo 1)

- **Stelle**: assegnate a ogni sessione completata e alle risposte giuste, secondo regole semplici e prevedibili (da fissare nel piano; devono premiare lo studio costante, non il solo indovinare); conteggio totale e per area, salvato con `LS` (nuove chiavi `orinf_stelle-*`).
- **Giorni di fila**: si riusa il conteggio esistente; si aggiunge il battito animato e la soglia dei traguardi (es. 3, 7, 14, 30 giorni).
- **Livelli per area**: da stelle e risposte, con nome sobrio (es. «Studente», «Tirocinante», «In turno», «Esperto»); mostrati in «Progressi».
- **Dati**: tutto locale; nessuna sincronizzazione; se `localStorage` non funziona l'app resta usabile e le stelle non vengono mostrate.
- **Controllo**: prova manuale di un'intera sessione di quiz, di un cambio di giorno e di un reset; verifica che i dati esistenti non vengano toccati o persi.

## Vincoli

- Nessuna build, nessuna dipendenza nuova; GitHub Pages serve `main` così com'è.
- Dopo ogni modifica ai contenuti o all'aspetto: nuova versione di `sw.js` in due punti; `node tools/verifica.js` prima di ogni commit.
- Costo prestazioni: niente canvas o animazioni continue extra oltre a quelle già presenti; animare solo `transform` e `opacity`.
- Accessibilità: `prefers-reduced-motion`, contrasto, bersagli di tocco di almeno 44 px, le stelle non sono mai l'unico modo di dare un'informazione.

## Lasciato a chi costruisce

- Valori esatti dei colori e delle ombre, dopo averli visti negli scatti.
- Quali strati CSS vecchi eliminare e quali ridefinire (preferire ridefinire le variabili).
- Regole precise di assegnazione delle stelle e delle soglie dei livelli (da proporre nel piano e far approvare).
- Posizione e forma del selettore di tema.
- Se le animazioni a base di GSAP già caricato convengono ai CSS puri.

## Scelte mie (da controllare)

- Tema scuro predefinito per tutti, anche per chi ha il telefono in chiaro.
- `--va` mantenuto per sezione ma riarmonizzato.
- Nessun suono né vibrazione.
- Nessun nome o testo nuovo nei contenuti clinici.
