---
name: nuova-voce
description: Aggiunge o arricchisce una voce dell'enciclopedia dell'Atlante con quiz, termini di glossario e, se serve, una figura. Usala quando l'utente chiede di inserire, studiare o «mettere nell'Atlante» un argomento, anche partendo da un video, un post, un'immagine o un libro.
---

# Nuova voce dell'Atlante

I formati dei dati sono in `CLAUDE.md`. Segui i passi nell'ordine.

## 1. Capire che cosa esiste già

Cerca l'argomento in `enciclopedia.js`, `figure.js`, `glossario.js`, `encquiz.js`. Se una voce c'è, arricchiscila invece di crearne una doppia. Annota gli id delle voci vicine: serviranno per `r`.

## 2. Scrivere la voce

- `id` in minuscolo con trattini; `a` deve essere una chiave di `ENC_AREE`.
- `d`: due frasi. `p`: punti chiave, uno per concetto. `v`: solo numeri e soglie da ricordare. `i`: che cosa fa l'infermiere. `e`: errori frequenti. `n`: fonte o linea guida.
- Inseriscila vicino alle voci dello stesso argomento e aggiungi il rimando `r` anche nelle voci collegate.
- Il materiale di partenza (video, post) è uno spunto: verifica dosi e valori con ciò che sai e con PubMed quando conta, e dichiara all'utente che cosa hai aggiunto di tuo. Per una voce con molti numeri fai rileggere il testo all'agente `revisore-clinico`.

## 3. Quiz e glossario

- 4–6 quiz per voce, 4 opzioni, spiegazione di una o due frasi. Varia la posizione della risposta corretta solo se il blocco in cui scrivi lo fa già.
- 1–2 termini di glossario se la voce introduce parole nuove, con `idVoce`.

## 4. Figura (facoltativa)

Solo se un disegno insegna più del testo. Leggi la skill `figura-animata`. Collega la figura con `enc` e `gl`.

## 5. Cache

Cambia la versione in `sw.js` nei due punti (commento e `const C`), con una nuova stringa esadecimale di 10 caratteri.

## 6. Verifica

```bash
node tools/verifica.js
python3 -m http.server 8765 &
node .claude/skills/nuova-voce/scripts/anteprima.js <id-voce> <cartella-scratch> [passi]
```

Guarda gli scatti in tema chiaro e scuro: testi che si sovrappongono o escono dai riquadri vanno corretti prima del commit. Chiudi il server alla fine.

## 7. Commit e resoconto

Commit sul ramo di lavoro della sessione, messaggio in italiano. Nel resoconto all'utente: che cosa è stato aggiunto, che cosa non viene dalla fonte, che cosa non hai potuto verificare.
