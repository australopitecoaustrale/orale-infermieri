/* Casi clinici costruiti sui temi dell'enciclopedia (stesso formato dei casi aggiuntivi) */
const CASES3 = [
{id:"k21",lv:"facile",area:"Medicina",title:"Ipoglicemia notturna in reparto",tags:["eo","dx"],
 story:"Giuseppe, 78 anni, diabete tipo 2 in terapia con insulina basale e rapida ai pasti, ricoverato per polmonite. Alle 3 di notte l'infermiere lo trova sudato, agitato e confuso; a cena ha mangiato metà del pasto ma la dose di insulina rapida è stata somministrata per intero.",
 vit:[["Glicemia","48 mg/dl",1],["FC","108",1],["PA","145/85"],["SpO2","95%"],["GCS","14 (E4 V4 M6)",1]],
 esami:[],
 steps:[
  ["Che cosa sta succedendo e che cosa fai subito?","Ipoglicemia (< 70 mg/dl) con sintomi adrenergici (sudorazione, tachicardia) e neuroglicopenici (confusione). Giuseppe deglutisce in sicurezza? Se è vigile e collaborante: 15 g di zuccheri semplici per bocca e ricontrollo dopo 15 minuti (regola del 15). Se non è in grado di deglutire: niente per bocca, glucosio endovena secondo protocollo o glucagone, e chiamo il medico."],
  ["Dopo 15 minuti la glicemia è 92 mg/dl. Che cosa fai?","Spuntino con carboidrati complessi per evitare la ricaduta, rivalutazione neurologica, controlli glicemici ravvicinati nelle ore successive, informo il medico per rivedere lo schema insulinico.","Il medico modifica la prescrizione: la rapida si somministra in base a quanto il paziente mangia."],
  ["Quali fattori di rischio individui e come previeni nuovi episodi?","Età avanzata, ridotto apporto alimentare durante la malattia acuta, insulina rapida a dose piena nonostante il pasto incompleto, possibile peggioramento della funzione renale. Prevenzione: verifica dell'assunzione del pasto prima della rapida, monitoraggio, educazione del paziente a riconoscere i sintomi, segnalazione dell'evento tramite incident reporting."],
  ["Formula la diagnosi infermieristica.","Rischio di livello glicemico instabile correlato ad apporto alimentare ridotto e gestione della terapia insulinica non adeguata all'assunzione del pasto."]
 ],
 dx:["Rischio di livello glicemico instabile","Rischio di cadute (agitazione notturna)"],
 oral:"Collega la regola del 15, la sicurezza della terapia insulinica (farmaci ad alto livello di attenzione) e l'incident reporting."},
{id:"k22",lv:"medio",area:"Chirurgia",title:"Seconda giornata dopo emicolectomia",tags:["eo","dx"],
 story:"Laura, 66 anni, seconda giornata dopo emicolectomia destra per tumore del colon. Ha un drenaggio addominale, un catetere vescicale e un'analgesia con elastomero. Dice di avere dolore 7/10 alla ferita, non si è ancora alzata dal letto e respira in modo superficiale per non sentire male.",
 vit:[["TC","37,9 °C",1],["FR","24",1],["SpO2","92% in aria",1],["FC","104",1],["PA","118/70"],["Diuresi","25 ml/h nelle ultime 4 ore",1]],
 esami:[["Hb","10,8 g/dl"],["PCR","8,5 mg/dl",1]],
 steps:[
  ["Quali complicanze sospetti e quali dati raccogli?","Febbricola, tachipnea, desaturazione e respiro superficiale fanno pensare ad atelettasia o polmonite; oliguria e tachicardia a ipovolemia o sepsi iniziale; vanno esclusi emorragia (drenaggio e ferita), infezione del sito chirurgico, deiscenza anastomotica e TVP. Raccolgo: NEWS2, auscultazione, caratteristiche del liquido nel drenaggio, ferita, bilancio idrico, polpacci, canalizzazione."],
  ["Calcola il NEWS2 (FR 24, SpO2 92% in aria, PA 118, FC 104, vigile, TC 37,9) e decidi.","FR 24 = 2; SpO2 92% = 2; aria = 0; PA 118 = 0; FC 104 = 1; vigile = 0; TC 37,9 = 0 (38,1-39 = 1). Totale 5: rischio medio, valutazione urgente del medico e monitoraggio almeno ogni ora."],
  ["Quali interventi infermieristici metti in atto?","Controllo del dolore con rivalutazione (l'analgesia è la base per respirare e muoversi), spirometria incentivante ed esercizi respiratori, posizione semi-Fowler, mobilizzazione precoce assistita, monitoraggio della diuresi oraria e del bilancio, rivalutazione della necessità del catetere, profilassi antitrombotica come prescritta, sorveglianza del drenaggio.","Dopo l'analgesia aggiuntiva il dolore scende a 3/10; Laura esegue gli esercizi e si siede in poltrona."],
  ["Formula due diagnosi infermieristiche.","Modello di respirazione inefficace correlato a dolore e immobilità, evidenziato da tachipnea, respiro superficiale e SpO2 92%. Dolore acuto correlato alla ferita chirurgica, evidenziato da NRS 7/10 e riluttanza a muoversi."]
 ],
 dx:["Modello di respirazione inefficace","Dolore acuto","Mobilità nel letto compromessa","CP: deiscenza anastomotica, sepsi"],
 oral:"Mostra il collegamento tra dolore, respiro e mobilizzazione nel postoperatorio e l'uso del NEWS2."},
{id:"k23",lv:"medio",area:"Emergenza",title:"Triage di un dolore toracico",tags:["eo","leg"],
 story:"Marco, 58 anni, fumatore, iperteso, arriva in pronto soccorso a piedi con dolore toracico oppressivo iniziato 40 minuti fa mentre saliva le scale, irradiato al braccio sinistro, con sudorazione.",
 vit:[["PA","150/95",1],["FC","96"],["SpO2","96%"],["FR","20"],["NRS","8/10",1]],
 esami:[["ECG","sopraslivellamento ST in V1-V4",1]],
 steps:[
  ["Quale codice di triage assegni e perché?","Dolore toracico tipico per sindrome coronarica acuta in paziente con fattori di rischio: codice ad alta priorità; con l'ECG che mostra sopraslivellamento ST si tratta di un'emergenza (codice 1 rosso). L'ECG va eseguito entro 10 minuti dal primo contatto."],
  ["Interpreta l'ECG.","Sopraslivellamento ST in V1-V4: STEMI anteriore, di solito per occlusione della discendente anteriore. Serve la riperfusione: angioplastica primaria il prima possibile.","Si attiva l'emodinamica."],
  ["Quali interventi immediati esegui?","Monitoraggio ECG continuo con defibrillatore pronto, accesso venoso, prelievi (troponina), somministrazione dei farmaci prescritti (antiaggreganti, anticoagulante, analgesia), ossigeno solo se SpO2 < 90%, riposo, rassicurazione, preparazione per la sala di emodinamica, consenso."],
  ["Dopo l'angioplastica per via radiale, che cosa sorvegli?","Sito di puntura e dispositivo di compressione (sanguinamento, ematoma), polso, colore, temperatura e sensibilità della mano, aritmie da riperfusione, dolore, parametri; poi educazione su terapia antiaggregante, smettere di fumare e riabilitazione cardiologica."]
 ],
 dx:["Dolore acuto","Ansia","CP: aritmie, shock cardiogeno, sanguinamento"],
 oral:"Unisce triage, lettura dell'ECG, tempi della riperfusione e assistenza dopo la procedura."},
{id:"k24",lv:"difficile",area:"Medicina",title:"Anziana confusa dopo il ricovero",tags:["dx","cod"],
 story:"Rosa, 86 anni, ricoverata da due giorni per frattura di omero trattata con tutore. A casa era autonoma con il bastone. Stanotte cerca di scavalcare le spondine, strappa la cannula venosa e non riconosce la figlia. Di giorno è sonnolenta. Da ieri non urina in modo regolare; le è stato dato un sedativo al bisogno.",
 vit:[["TC","37,6 °C"],["FC","98"],["PA","130/70"],["SpO2","94%"],["4AT","8",1],["Ultima evacuazione","4 giorni fa",1]],
 esami:[["Sodio","131 mEq/L",1],["Residuo vescicale (bladder scanner)","650 ml",1]],
 steps:[
  ["Delirium o demenza? Motiva.","Delirium: esordio acuto in una persona prima orientata e autonoma, andamento fluttuante (agitata di notte, sonnolenta di giorno), disattenzione; 4AT 8 (≥ 4 probabile delirium). È un'urgenza: va cercata la causa."],
  ["Quali cause individui dai dati?","Ritenzione urinaria (650 ml), stipsi (4 giorni), farmaci (sedativo, possibili oppioidi), dolore, iponatriemia lieve, ambiente estraneo, possibile infezione. Informo il medico; la ritenzione va risolta (cateterismo estemporaneo o secondo prescrizione).","Dopo il cateterismo e la gestione della stipsi Rosa è più tranquilla."],
  ["La notte successiva un collega propone di legarla al letto. Come rispondi?","La contenzione non è un atto terapeutico, è ammessa solo in stato di necessità come misura eccezionale e temporanea (art. 13 Cost., art. 54 c.p., Codice 2025 art. 38) e peggiora il delirium e il rischio di lesioni. Propongo alternative: letto basso, abbassare le spondine, sorveglianza, presenza della figlia, luce soffusa, orientamento, occhiali e protesi acustiche, mobilizzazione di giorno, gestione del dolore, revisione dei farmaci sedativi."],
  ["Formula le diagnosi infermieristiche.","Confusione acuta correlata a ritenzione urinaria, stipsi, farmaci e ambiente estraneo, evidenziata da disorientamento, agitazione fluttuante e 4AT 8. Rischio di cadute correlato a confusione e agitazione."]
 ],
 dx:["Confusione acuta","Rischio di cadute","Ritenzione urinaria","Stipsi"],
 oral:"Mostra la differenza tra delirium e demenza, la ricerca delle cause e le alternative alla contenzione."},
{id:"k25",lv:"difficile",area:"Area critica",title:"Sepsi da infezione urinaria",tags:["eo","dx"],
 story:"Antonio, 72 anni, portatore di catetere vescicale da tre settimane dopo un ricovero, arriva dal domicilio con brividi, febbre e confusione iniziata nel pomeriggio. Le urine nella sacca sono torbide.",
 vit:[["TC","39,2 °C",1],["FC","118",1],["PA","88/50",1],["FR","26",1],["SpO2","93%",1],["Coscienza","confuso (nuova confusione)",1]],
 esami:[["Lattati","4,2 mmol/L",1],["Globuli bianchi","18.500/mm³",1],["Creatinina","2,1 mg/dl",1]],
 steps:[
  ["Che cosa sospetti? Usa qSOFA e NEWS2.","Sepsi, verosimilmente urinaria (catetere a permanenza). qSOFA 3/3 (FR ≥ 22, alterazione mentale, sistolica ≤ 100). NEWS2: FR 26 = 3; SpO2 93% = 2; aria ambiente = 0; PA 88 = 3; FC 118 = 2; confusione = 3; TC 39,2 = 2; totale 15: risposta di emergenza."],
  ["Quali interventi della prima ora attivi con il medico?","Due accessi venosi, prelievi con lattati, emocolture (almeno 2 set) e urinocoltura dal raccordo del catetere (meglio dopo la sostituzione del catetere) prima dell'antibiotico senza ritardarlo, antibiotico ad ampio spettro entro un'ora, cristalloidi 30 ml/kg per ipotensione e lattati ≥ 4, ossigeno per SpO2 94-98%, monitoraggio continuo, diuresi oraria.","Dopo 2 litri di cristalloidi la PA è 84/48: il medico avvia noradrenalina."],
  ["Che cosa significa la necessità di noradrenalina con lattati elevati?","Shock settico: vasopressori necessari per una PAM ≥ 65 mmHg e lattati > 2 mmol/L nonostante un riempimento adeguato. Serve trasferimento in area critica, accesso venoso centrale per i vasopressori, monitoraggio della pressione invasiva."],
  ["Quale riflessione di prevenzione fai su questo caso?","Il catetere a permanenza è la prima causa di infezioni urinarie correlate all'assistenza: va posizionato solo con indicazione appropriata e rimosso il prima possibile; a domicilio vanno spiegati gestione del sistema chiuso, idratazione e segni di allarme. È un tema di bundle e di continuità ospedale-territorio."]
 ],
 dx:["CP: shock settico, insufficienza renale acuta","Ipertermia","Rischio di perfusione renale inefficace"],
 oral:"Collega criteri di sepsi, bundle della prima ora e prevenzione delle infezioni da catetere."},
{id:"k26",lv:"facile",area:"Pediatria",title:"Lattante con febbre e disidratazione",tags:["eo","dx"],
 story:"Sofia, 10 mesi, 8,5 kg, portata in pronto soccorso pediatrico dai genitori per vomito e diarrea da 36 ore. Beve poco, ha bagnato due pannolini nelle ultime 24 ore ed è più sonnolenta del solito.",
 vit:[["TC","38,4 °C",1],["FC","168",1],["FR","42",1],["Refill","3 secondi",1],["Peso","8,1 kg (−0,4 kg)",1]],
 esami:[],
 steps:[
  ["Valuta la gravità della disidratazione.","Perdita di peso di circa il 5%, pochi pannolini bagnati, sonnolenza, tachicardia (oltre i valori del lattante, 100-160), refill allungato: disidratazione moderata da gastroenterite. Controllo fontanella, mucose, lacrime, glicemia."],
  ["Che cosa proponi come trattamento e come lo spieghi ai genitori?","Reidratazione orale con soluzione reidratante a piccoli sorsi frequenti (cucchiaino o siringa) secondo prescrizione; se fallisce o i segni peggiorano, reidratazione per sondino o endovena. Proseguire l'allattamento. Paracetamolo in base al peso (circa 10-15 mg/kg per dose) se prescritto; niente acido acetilsalicilico.","Dopo 4 ore Sofia beve, ha bagnato un pannolino ed è più reattiva."],
  ["Quali segni di allarme insegni alla dimissione?","Vomito incoercibile, sangue nelle feci, nessun pannolino bagnato per 6-8 ore, sonnolenza o irritabilità marcata, respiro frequente, febbre persistente; igiene delle mani e del cambio per evitare il contagio in famiglia."],
  ["Formula la diagnosi infermieristica.","Volume di liquidi insufficiente correlato a perdite gastrointestinali e ridotto apporto, evidenziato da calo di peso del 5%, ridotta diuresi e tachicardia."]
 ],
 dx:["Volume di liquidi insufficiente","Ipertermia","Conoscenze insufficienti dei genitori (da promuovere)"],
 oral:"Mostra i parametri pediatrici, la reidratazione e il coinvolgimento dei genitori."},
{id:"k27",lv:"medio",area:"Salute mentale",title:"Paziente in terapia con litio",tags:["eo","cod"],
 story:"Elena, 45 anni, disturbo bipolare stabile in terapia con litio da anni. Da una settimana prende un antinfiammatorio per mal di schiena e, per il caldo, ha avuto diarrea. Il marito la porta al CSM perché è confusa, ha tremori grossolani alle mani e cammina in modo instabile.",
 vit:[["PA","105/65"],["FC","62"],["TC","36,9"],["Litiemia","2,1 mEq/L",1]],
 esami:[["Creatinina","1,6 mg/dl",1],["Sodio","133 mEq/L",1]],
 steps:[
  ["Che cosa sospetti e perché?","Intossicazione da litio (litiemia 2,1 mEq/L, oltre l'intervallo terapeutico di circa 0,6-1,2): tremori grossolani, atassia, confusione. Fattori precipitanti: FANS (riducono l'eliminazione renale del litio), disidratazione da diarrea e caldo, peggioramento della funzione renale."],
  ["Che cosa fai?","Invio urgente in ospedale per sospensione del litio su indicazione medica, idratazione, monitoraggio di litiemia, funzione renale, elettroliti ed ECG, valutazione neurologica; nei casi gravi dialisi.","In ospedale si sospende il litio e si avvia l'idratazione."],
  ["Quale educazione fai per prevenire nuovi episodi?","Non assumere FANS senza consultare il medico, bere a sufficienza soprattutto con caldo, febbre, vomito o diarrea, eseguire i controlli periodici della litiemia, riconoscere i segni precoci di tossicità (nausea, diarrea, tremori, sonnolenza)."],
  ["Elena dice che vuole sospendere per sempre il litio. Come ti comporti?","Ascolto le sue preoccupazioni senza giudicare, rispetto la sua autonomia e fornisco informazioni chiare sui rischi di ricaduta, la coinvolgo nella decisione con lo psichiatra (Codice 2025: relazione di cura, informazione, rispetto delle scelte)."]
 ],
 dx:["CP: intossicazione da litio","Rischio di cadute","Conoscenze insufficienti sulla terapia"],
 oral:"Collega farmacologia (indice terapeutico stretto, interazioni), educazione terapeutica e relazione."},
{id:"k28",lv:"difficile",area:"Cure palliative",title:"Ultimi giorni di vita a domicilio",tags:["cod","leg"],
 story:"Franco, 79 anni, tumore del polmone in fase avanzata, seguito a domicilio dall'unità di cure palliative. Ha espresso con la pianificazione condivisa delle cure la volontà di morire a casa e di non essere più ricoverato. Oggi la moglie chiama perché è molto agitato, respira con un rumore gorgogliante e non beve più. Il figlio, arrivato da fuori, chiede di chiamare l'ambulanza e di «mettergli una flebo».",
 vit:[["FR","28 con pause",1],["Cute","fredda e marezzata alle gambe",1],["Diuresi","scarsa",1],["Coscienza","agitato, a tratti non risponde",1]],
 esami:[],
 steps:[
  ["Che cosa sta accadendo?","Segni di morte imminente: respiro irregolare con pause, rantolo terminale da secrezioni, cute fredda e marezzata, oliguria, alterazione della coscienza con agitazione (delirium terminale)."],
  ["Quali interventi assistenziali attivi?","Controllo dei sintomi con la terapia prescritta dall'équipe di cure palliative (anche per via sottocutanea): agitazione, dolore, dispnea, secrezioni; posizionamento sul fianco, cura della bocca con garze umide, sospensione di interventi inutili; se sintomi refrattari, valutazione della sedazione palliativa con midazolam secondo il consenso già espresso."],
  ["Come gestisci la richiesta del figlio?","Ascolto la sua paura, spiego con parole semplici che cosa sta accadendo, che il rantolo non indica soffocamento e che l'idratazione artificiale in questa fase non dà benefici e può aumentare le secrezioni; ricordo la volontà espressa da Franco nella pianificazione condivisa delle cure, che va rispettata (L. 219/2017, artt. 1 e 5; Codice 2025, artt. 26-27), e coinvolgo il medico dell'équipe.","Il figlio accetta di restare accanto al padre."],
  ["Che cosa fai dopo il decesso?","Supporto alla famiglia, rispetto dei riti e delle volontà, cura della salma, comunicazione al medico per la constatazione e le certificazioni, attenzione al lutto (indicazioni sui servizi di sostegno)."]
 ],
 dx:["Modello di respirazione inefficace (fine vita)","Processi familiari interrotti","Disponibilità a migliorare la morte dignitosa"],
 oral:"Unisce assistenza negli ultimi giorni, legge 219/2017, Codice deontologico e comunicazione con la famiglia."}
];
