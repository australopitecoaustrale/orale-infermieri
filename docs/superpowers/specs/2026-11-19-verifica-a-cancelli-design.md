# Verifica a cancelli dei dati clinici

Data: 2026-11-19. Stato: approvato dall'utente («Ok su verifica e cancelli»).

## Perché

L'utente vuole che la correttezza dei dati dell'Atlante sia controllata dal `revisore-clinico` insieme alla skill `clinical-decision-support`, usando i suoi metodi per migliorare. Le fonti di partenza (video, post, manuali tradotti in automatico) contengono errori: due manuali ECG ne avevano più di venti (unità sbagliate, derivazioni confuse, soglie inventate).

## Che cosa prende dalla skill e che cosa no

- **Preso**: la matrice di tracciabilità con nodi di tipo «cancello» (evidence_rule, data_quality_gate, human_review, release_gate), validata da `decision_logic_traceability.py --strict`; l'idea che la presenza di una fonte non provi la qualità del dato; un singolo studio non fissa un valore di riferimento.
- **Non preso**: il profilo GRADE (richiede un panel umano e giudica esiti di interventi, non soglie da manuale); qualunque logica diagnostica o di cura (vietata dalla skill: la matrice descrive il controllo dei contenuti, non decisioni cliniche).

## I cancelli

1. **Estrazione** (`node tools/tracciabilita.js estrai <id…>`): ogni frase con un numero di voce, quiz e glossario diventa un dato con id `voce#campo`.
2. **Fonte**: ogni dato ha PMID/DOI o ente ufficiale, e il tipo di fonte (linea-guida, revisione, studio, manuale, aritmetica).
3. **Triangolazione**: una soglia da linea guida è «confermata» solo se letta nel testo della linea guida o in due fonti indipendenti; altrimenti «da verificare», scritto nella nota `n`.
4. **Coerenza** (`node tools/tracciabilita.js coerenza <termine…>`): lo stesso dato ha lo stesso valore in tutta l'app.
5. **Revisione umana-equivalente**: il `revisore-clinico` giudica ogni dato (confermato, da verificare, errore con correzione).
6. **Rilascio** (`node tools/tracciabilita.js cancello <giudizi.json>`): si unisce in `main` solo se nessun dato è «errore» e ogni confermato ha fonte e tipo.

## Approcci considerati

- Solo revisore-clinico a voce intera (com'era): veloce, ma i numeri sfuggono e non resta traccia di che cosa è stato controllato.
- Profilo GRADE per ogni voce: sproporzionato e fuori scopo per soglie didattiche.
- **Scelto**: estrazione automatica dei dati + giudizio dato per dato + cancello finale, con matrice validata dalla skill.

## Fuori scopo

Nessun uso clinico; i giudizi restano bozze controllate da un agente, non una certificazione.
