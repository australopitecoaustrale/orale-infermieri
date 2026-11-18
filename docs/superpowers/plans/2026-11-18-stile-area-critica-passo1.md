# Stile «Area critica» — Passo 1 (pelle) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Tema scuro predefinito con identità «monitor di reparto», selettore scuro/chiaro e animazioni sobrie, senza toccare testi e logica.

**Architecture:** Un piccolo script in `<head>` imposta `data-theme` prima del primo disegno (scuro se l'utente non ha scelto). Un blocco CSS finale ridefinisce le variabili nel tema `dark` e aggiunge le animazioni dentro `@media (prefers-reduced-motion: no-preference)`. Nessun nuovo file, nessun nuovo font.

**Tech Stack:** HTML/CSS/JS statici in `index.html`; `sw.js`; `tools/verifica.js`; `anteprima.js` per gli scatti.

**Spec:** `docs/superpowers/specs/2026-11-18-stile-area-critica-design.md`

## Global Constraints

- Nessuna build, nessuna dipendenza, nessun font da CDN (solo `vendor/fonts`).
- Dopo ogni modifica: versione di `sw.js` cambiata **in due punti** (commento prima riga e `const C="atlante-…"`); `node tools/verifica.js` prima di ogni commit.
- Animare solo `transform` e `opacity` (più alone con `box-shadow` solo sull'errore, breve).
- Ogni animazione dentro `prefers-reduced-motion: no-preference`.
- Testo corrente contrasto ≥ 4,5:1; bersagli di tocco ≥ 44 px.
- Nessun testo clinico cambiato; chiave di salvataggio `orinf_tema` via `LS`.
- Palette di partenza: sfondo `#07100f`-`#0c1416`, carte `#0f1b1a`-`#142024`, testo `#e8fff8`, neon `#2cf5b0`, allarme `#ff6b6b`; valori finali fissati guardando gli scatti.

## Review Focus

- `localStorage` bloccato o vuoto: l'app parte scura e il selettore funziona per la sessione.
- Prima visita con telefono in chiaro: scuro comunque, senza lampo bianco.
- Scelta «chiaro» salvata: ricaricando resta chiaro, anche con sistema scuro.
- «Riduci movimento» attivo: nessuna animazione nuova parte.
- Cambio vista (colore `--va`): testi e bordi restano leggibili in ogni sezione, in scuro.
- Figure ed ECG (usano variabili `--ecg-*`): nessuna regressione in scuro e chiaro.

---

### Task 1: Tema scuro predefinito e selettore

**Files:** Modify `index.html` (`<head>`, `header.top`, JS dell'app).

**Interfaces:**
- Produces: `setTema(t: "dark"|"light"): void` (imposta `document.documentElement.dataset.theme`, aggiorna `<meta name="theme-color">`, salva con `LS.set("tema",t)`); `<button class="tema-btn" aria-label>` nella testata.

- [ ] Script inline in `<head>` prima dei CSS: legge `localStorage["orinf_tema"]` in try/catch (valore JSON), default `"dark"`, imposta `dataset.theme`.
- [ ] `setTema` e pulsante (icona luna/sole in SVG, 44×44 px, in `.top-in`); `theme-color` `#07100f` per scuro, `#0d7a6f` per chiaro.
- [ ] Verifica: aprire l'app con `prefers-color-scheme: light` e senza scelta → scuro; cliccare il pulsante → chiaro, ricarica → chiaro.

### Task 2: Palette e testata «monitor»

**Files:** Modify `index.html` (nuovo blocco CSS in fondo al `<style>` principale, prima di `/* pelle studio: fine */`).

**Interfaces:** Consumes `data-theme="dark"`. Produces variabile `--neon` e ridefinizioni di `--bg --paper --ink --muted --line --head --grid --vital --ok`.

- [ ] Blocco `:root[data-theme="dark"]{…}` con la palette; `--neon:#2cf5b0`; `--va` per vista riportati a luminosità coerente (accento e fasce, non sfondo del testo).
- [ ] Testata: sfondo `--head` quasi nero, `.brand .ecg`, `.hdr-dot`, `.hdr-sweep` in neon con alone; testo bianco invariato.
- [ ] Verifica: scatti `anteprima.js` di Oggi, Progressi, Enciclopedia, una voce, Allenamento, Quiz, Calcoli, ECG in scuro e chiaro; controllo contrasto del testo su carte e bande.

### Task 3: Numeri da parametro vitale

**Files:** Modify `index.html` (CSS `.sb-v`, `.kpi-v`, `.statband`).

- [ ] `.sb-v`/`.kpi-v` in `var(--f-mono)`, peso 600, neon nel tema scuro, unità con `.small`; fascia `.statband` su `--head` con bordo sottile neon al 25%.
- [ ] Verifica: vista Oggi e Progressi, a 360 px di larghezza, senza testo tagliato.

### Task 4: Animazioni (battito, allarme, stellina, entrata schede)

**Files:** Modify `index.html` (CSS; template di «Oggi» per la classe del contatore giorni; punto dove si assegna `.opt.right`).

**Interfaces:** Produces classi `.beat` (battito sul valore dei giorni di fila), `.opt.wrong` con alone, `.opt.right::before` con ★ che compare (scala e opacità), `#app > *` con entrata (opacità e spostamento di 8 px, 0,35 s).

- [ ] Tutte le regole dentro `@media (prefers-reduced-motion: no-preference)`; senza di essa restano colori e ✓/✕ già presenti.
- [ ] Verifica: nel browser con movimento ridotto attivo e disattivo, rispondere giusto e sbagliato in un quiz; il battito non parte con «riduci movimento».

### Task 5: Cache, verifica, commit

**Files:** Modify `sw.js` (due punti).

- [ ] Nuova versione cache; `node tools/verifica.js` ok; commit e push sul ramo `ccr-c82dfc78-h92xol`.
- [ ] Mostrare gli scatti all'utente per l'approvazione prima di unire in `main` (il passo 1 si approva guardando).
