/* Casi clinici aggiuntivi. Campi: id, lv, title, tags, area, story, vit [[nome, valore, alterato]], esami [[nome, valore, alterato]], steps [[domanda, risposta guida, evoluzione facoltativa mostrata prima della domanda]], dx (diagnosi/problemi attesi), oral */
const CASES2 = [
{id:"k11",lv:"facile",area:"Territorio",title:"Lesione da pressione a domicilio",tags:["dx","eo"],
 story:"Anna, 84 anni, allettata dopo un ictus di 6 mesi fa, vive con la figlia che lavora. L'infermiere di famiglia e comunità la visita su segnalazione del medico di medicina generale: in zona sacrale c'è un'area di cute arrossata con una piccola flittene. Mangia poco e beve meno di un litro al giorno.",
 vit:[["PA","125/75"],["FC","84"],["TC","36,8"],["Braden","11",1],["MUST","2",1],["Peso","−4 kg in 3 mesi",1]],
 esami:[["Albumina","3,0 g/dl",1],["Hb","11,2 g/dl",1]],
 steps:[
  ["Come classifichi la lesione e quali dati raccogli?","Lesione da pressione di categoria 2 (perdita parziale dello spessore del derma con flittene) secondo NPIAP/EPUAP. Raccolgo: dimensioni, fondo, essudato, cute perilesionale, dolore; rivaluto Braden (11 = rischio alto) e stato nutrizionale (MUST 2 = rischio alto); valuto incontinenza, mobilità residua, rete familiare e ausili presenti."],
  ["Formula le diagnosi infermieristiche principali.","Compromissione dell'integrità cutanea correlata a pressione prolungata e ridotta mobilità, evidenziata da lesione di categoria 2 in sede sacrale.\nNutrizione squilibrata / rischio di malnutrizione correlato a ridotta assunzione.\nMobilità fisica compromessa.\nRischio di tensione nel ruolo di caregiver (figlia che lavora)."],
  ["Quali interventi pianifichi a domicilio?","Riposizionamento programmato con schema scritto, superficie antidecubito (materasso ad aria richiesto tramite ASL), protezione dei talloni, cura della cute e gestione dell'umidità, medicazione avanzata adatta alla lesione, integrazione nutrizionale concordata con il medico, idratazione. Educazione della figlia e coinvolgimento di un OSS o dell'assistenza domiciliare integrata."],
  ["Con chi ti raccordi nella rete territoriale?","MMG, servizio di assistenza domiciliare integrata (ADI), Centrale Operativa Territoriale per attivare i servizi, dietista, servizi sociali per il supporto al caregiver. Secondo il DM 77/2022 l'IFeC prende in carico la persona e la famiglia in modo proattivo.","Dopo 3 settimane la lesione è ridotta del 50% e la figlia esegue correttamente le mobilizzazioni."]
 ],
 dx:["Integrità cutanea compromessa","Rischio di malnutrizione","Rischio di tensione nel ruolo di caregiver"],
 oral:"Collega la lesione da pressione alla valutazione del rischio (Braden), alla nutrizione e alla presa in carico territoriale del DM 77/2022."},
{id:"k12",lv:"facile",area:"Ostetricia",title:"Puerpera in seconda giornata",tags:["dx","eo"],
 story:"Giulia, 31 anni, primipara, parto spontaneo 36 ore fa. Riferisce dolore ai capezzoli durante la poppata e teme di non avere abbastanza latte. Il neonato ha perso il 6% del peso alla nascita. Chiede se può dare il biberon.",
 vit:[["PA","118/72"],["FC","80"],["TC","37,2"],["Lochi","rossi, moderati"],["Utero","contratto, ombelicale"]],
 esami:[["Hb","11,0 g/dl"]],
 steps:[
  ["Cosa valuti nella puerpera?","Involuzione uterina (utero contratto, a livello ombelicale o poco sotto), lochi (quantità, colore, odore), perineo, minzione, dolore, segni di infezione, umore, seno e capezzoli (ragadi), tecnica di attacco al seno."],
  ["Il calo di peso del neonato è preoccupante?","Un calo fino a circa il 7-10% nei primi giorni è fisiologico e va recuperato entro 10-15 giorni. Si monitorano numero di poppate (8-12 al giorno), pannolini bagnati e feci, stato generale. Non serve di regola integrare con formula se il quadro è normale."],
  ["Come affronti il dolore ai capezzoli e il desiderio del biberon?","Osservo una poppata e correggo l'attacco (bocca ben aperta, areola in bocca, mento sul seno), propongo posizioni diverse, uso del latte materno sulle ragadi. Rassicuro con informazioni concrete, sostengo l'allattamento esclusivo come raccomandato dall'OMS, rispettando la scelta informata della madre (art. 17 e 19 del Codice)."],
  ["Quali segni di allarme insegni prima della dimissione?","Febbre, lochi maleodoranti o sanguinamento abbondante, dolore al polpaccio, seno arrossato e dolente con febbre (mastite), tristezza persistente o pensieri negativi oltre le prime due settimane (depressione post-partum), nel neonato ittero esteso, poche poppate, sonnolenza."]
 ],
 dx:["Allattamento al seno inefficace (rischio)","Conoscenza insufficiente","Ansia"],
 oral:"Mostra che sai distinguere il fisiologico (calo di peso, maternity blues) dal patologico."},
{id:"k13",lv:"medio",area:"Medicina",title:"Brivido durante una trasfusione",tags:["leg","eo"],
 story:"Mario, 70 anni, anemia sintomatica, riceve la prima di due unità di emazie. Dopo 10 minuti dall'inizio riferisce brividi, dolore lombare e senso di oppressione. È agitato.",
 vit:[["PA","92/55",1],["FC","118",1],["TC","38,6",1],["FR","24",1],["SpO2","94%"]],
 esami:[["Hb pre","7,4 g/dl",1],["Urine","scure",1]],
 steps:[
  ["Cosa fai immediatamente?","Fermo subito la trasfusione, mantengo l'accesso venoso con soluzione fisiologica e un nuovo set, chiamo il medico, valuto ABCDE e monitoro i parametri. Ricontrollo l'identità del paziente e i dati della sacca."],
  ["Che tipo di reazione sospetti?","Reazione emolitica acuta, più probabilmente da incompatibilità ABO: compare nei primi minuti con febbre, brividi, dolore lombare, ipotensione, tachicardia, urine scure (emoglobinuria). È un'emergenza."],
  ["Cosa conservi e chi informi?","Conservo la sacca e il set chiusi e li invio al servizio trasfusionale con i campioni di sangue del paziente e la prima urina; compilo la segnalazione di reazione trasfusionale. Documento orari, volume infuso, sintomi e interventi.","Il controllo rivela che la sacca era destinata a un paziente omonimo di un'altra stanza."],
  ["Quali aspetti di sicurezza e responsabilità emergono?","Errore di identificazione: è un evento sentinella da segnalare (Raccomandazione ministeriale n. 5 sulle reazioni da incompatibilità ABO e n. 3 sull'identificazione). Gestione con incident reporting e analisi delle cause; informazione al paziente secondo le procedure. Prevenzione: identificazione attiva al letto con due operatori e braccialetto, controllo sacca-paziente-richiesta."]
 ],
 dx:["CP: reazione emolitica acuta","CP: insufficienza renale acuta","Rischio di shock"],
 oral:"La parola chiave è identificazione: al letto, con due operatori, sempre."},
{id:"k14",lv:"medio",area:"Medicina",title:"Ipoglicemia notturna",tags:["eo","dx"],
 story:"Luigi, 76 anni, diabete tipo 2 in terapia con insulina basale e rapida, ricoverato per polmonite. Alle 3 di notte l'OSS lo trova sudato, confuso e poco risvegliabile. A cena ha mangiato metà del pasto ma ha ricevuto la dose piena di insulina rapida.",
 vit:[["GCS","12",1],["FC","104",1],["PA","150/85"],["SpO2","95%"]],
 esami:[["Glicemia","38 mg/dl",1]],
 steps:[
  ["Cosa fai nei primi minuti?","Riconosco l'ipoglicemia grave (paziente non in grado di assumere per bocca): niente zuccheri per bocca per il rischio di aspirazione. Avviso il medico e somministro glucosio endovena secondo protocollo (es. glucosata 10% o 33% in bolo) o glucagone intramuscolo se non c'è accesso. Posizione laterale di sicurezza, monitoraggio."],
  ["Come prosegui dopo la correzione?","Ricontrollo la glicemia dopo 15 minuti e ripeto se ancora < 70 mg/dl; quando è vigile do carboidrati complessi. Monitoraggio glicemico ravvicinato nelle ore successive per il rischio di recidiva.","Dopo 15 minuti la glicemia è 112 mg/dl e il paziente è orientato."],
  ["Qual è la causa e cosa cambia nella pianificazione?","Insulina rapida somministrata senza adeguare la dose all'assunzione di cibo, in un anziano con infezione. Si concorda con il medico la somministrazione della rapida dopo il pasto in base a quanto mangiato, si rivede lo schema, si controlla la glicemia prima di dormire."],
  ["Quali aspetti di documentazione e sicurezza?","Documentare in cartella glicemie, orari, farmaci e risposta (art. 36 del Codice); l'insulina è un farmaco ad alto rischio: doppio controllo, schemi chiari, segnalazione dell'evento con incident reporting se c'è stato un errore di processo."]
 ],
 dx:["Rischio di glicemia instabile","Confusione acuta","Rischio di aspirazione"],
 oral:"Se il paziente non è vigile, la via orale è controindicata: dillo esplicitamente."},
{id:"k15",lv:"medio",area:"Pediatria",title:"Convulsione febbrile a 18 mesi",tags:["eo","cod"],
 story:"Sofia, 18 mesi, arriva in pronto soccorso in braccio alla madre: a casa ha avuto una crisi con scosse a tutti e quattro gli arti durata circa 2 minuti, durante un rialzo febbrile. Ora è sonnolenta ma risvegliabile e piange. La madre è molto spaventata.",
 vit:[["TC","39,4",1],["FC","150",1],["FR","32"],["SpO2","97%"],["Glicemia","96 mg/dl"]],
 esami:[],
 steps:[
  ["Quali sono le priorità all'arrivo?","Valutazione ABCDE pediatrica, posizione sicura, ossigeno se necessario, monitoraggio dei parametri e dello stato di coscienza, glicemia (normale), ricerca della causa della febbre. Se una nuova crisi dura più di 5 minuti si tratta con benzodiazepine secondo prescrizione/protocollo."],
  ["Come classifichi l'episodio?","Convulsione febbrile semplice: età tra 6 mesi e 5 anni, crisi generalizzata, durata inferiore a 15 minuti, unica nelle 24 ore, con recupero completo. Le forme complesse (focali, prolungate, ripetute) richiedono ulteriori accertamenti."],
  ["Cosa insegni ai genitori?","Durante una crisi: mantenere la calma, mettere la bambina su un fianco su una superficie sicura, non mettere nulla in bocca, guardare l'ora e chiamare il 112 se dura più di 5 minuti o se non si riprende. Gli antipiretici servono per il benessere ma non prevengono le crisi. Rischio di recidiva presente ma prognosi in genere ottima."],
  ["Quali aspetti relazionali e deontologici richiami?","Accoglienza dell'ansia dei genitori, informazioni chiare e verificate con il teach-back, coinvolgimento come persone di riferimento (art. 19), attenzione al dolore e al comfort della bambina (art. 25), rispetto della volontà del minore in base all'età (art. 24)."]
 ],
 dx:["Ipertermia","Rischio di lesione","Ansia dei genitori","Conoscenza insufficiente"],
 oral:"Il messaggio ai genitori «se dura più di 5 minuti chiamate il 112» è quello che la commissione vuole sentire."},
{id:"k16",lv:"medio",area:"Psichiatria",title:"Paziente agitato che rifiuta la terapia",tags:["leg","cod"],
 story:"Marco, 32 anni, disturbo bipolare noto, è accompagnato in pronto soccorso dai familiari: da una settimana non dorme, parla senza sosta, ha speso tutti i risparmi e ora urla e minaccia di andarsene. Rifiuta qualsiasi farmaco e dice di non essere malato.",
 vit:[["PA","145/90"],["FC","112",1],["TC","36,9"],["SpO2","98%"]],
 esami:[["Litiemia","0,2 mEq/l",1]],
 steps:[
  ["Come gestisci la fase acuta di agitazione?","Sicurezza di tutti: ambiente tranquillo, poche persone, stimolazione ridotta, tono calmo e frasi brevi (de-escalation verbale), mantenere una via di uscita, rimuovere oggetti pericolosi, chiedere supporto del team. La contenzione è solo l'estrema ratio (art. 38 del Codice)."],
  ["Cosa indica la litiemia?","0,2 mEq/l è sotto il range terapeutico (circa 0,6-1,2): probabile sospensione della terapia, causa frequente della recidiva maniacale."],
  ["Il paziente rifiuta le cure: è possibile un TSO?","Il TSO (L. 833/1978 artt. 33-35) richiede tre condizioni: alterazioni psichiche tali da richiedere urgenti interventi terapeutici, rifiuto delle cure, impossibilità di adottare tempestive misure extraospedaliere. Servono la proposta motivata di un medico, la convalida di un secondo medico della struttura pubblica e l'ordinanza del Sindaco, notificata al giudice tutelare entro 48 ore. Ricovero in SPDC.","Il ricovero avviene in SPDC con TSO."],
  ["Qual è il ruolo dell'infermiere durante il TSO?","Garantire sicurezza e dignità, continuare a cercare il consenso e l'alleanza terapeutica, informare il paziente su cosa accade e sui suoi diritti, monitorare parametri, idratazione, sonno ed effetti dei farmaci, documentare comportamenti e interventi, evitare la contenzione salvo stato di necessità."]
 ],
 dx:["Rischio di violenza","Gestione inefficace della salute","Disturbo del modello di sonno"],
 oral:"Distingui bene ricovero volontario, TSO e stato di necessità."},
{id:"k17",lv:"difficile",area:"Emergenza",title:"Arresto cardiaco in reparto",tags:["eo","leg"],
 story:"Durante il giro delle 6 trovi Carlo, 67 anni, ricoverato per dolore toracico in attesa di coronarografia, a letto, non risponde e respira in modo agonico. Sei con un collega e un OSS. Il carrello delle emergenze è in corridoio.",
 vit:[["Coscienza","non risponde",1],["Respiro","gasping",1],["Polso","assente",1]],
 esami:[["Monitor","fibrillazione ventricolare",1]],
 steps:[
  ["Cosa fai nel primo minuto?","Riconosco l'arresto (non risponde, respiro agonico = assente), chiamo aiuto e il team di emergenza, inizio subito le compressioni toraciche (100-120/min, 5-6 cm) mentre il collega porta carrello e defibrillatore. L'OSS può chiamare e posizionare l'asse rigida."],
  ["Il monitor mostra fibrillazione ventricolare: come procedi?","Ritmo defibrillabile: shock il prima possibile, poi riprendo subito la RCP per 2 minuti senza verificare il polso, rianalisi del ritmo ogni 2 minuti. Secondo il protocollo ALS: accesso venoso o intraosseo, adrenalina 1 mg e amiodarone 300 mg dopo il terzo shock, gestione delle vie aeree, ricerca delle cause reversibili (4 I e 4 T)."],
  ["Come organizzi il team?","Un leader, ruoli chiari (compressioni a rotazione ogni 2 minuti, vie aeree, defibrillatore, farmaci, registrazione dei tempi), comunicazione a circuito chiuso, minime interruzioni delle compressioni.","Dopo il secondo shock compare un ritmo organizzato con polso: ROSC."],
  ["Cosa fai dopo il ROSC?","ABCDE, ECG a 12 derivazioni, SpO2 94-98%, normocapnia, PA sistolica > 100 mmHg, controllo della glicemia e della temperatura (evitare la febbre), preparazione al trasferimento in emodinamica/terapia intensiva. Sostegno ai familiari."],
  ["Cosa documenti e perché?","Orari di riconoscimento, inizio RCP, shock (numero ed energia), farmaci, ritmi, ROSC, persone presenti. La documentazione precisa è un obbligo (art. 36 del Codice) e tutela professionisti e paziente; dopo l'evento è utile un debriefing del team e la verifica del carrello."]
 ],
 dx:["CP: arresto cardiaco","CP: sindrome post-arresto","Ansia/lutto anticipatorio dei familiari"],
 oral:"Ritmo, shock, compressioni subito dopo: la commissione apprezza la sequenza senza esitazioni."},
{id:"k18",lv:"difficile",area:"Neurologia",title:"Deficit neurologico improvviso",tags:["eo","dx"],
 story:"Alle 10:40 la figlia ti chiama: Rosa, 72 anni, ricoverata per scompenso, non riesce a muovere il braccio destro e parla in modo confuso. Alle 10:00 durante la colazione stava bene. È in terapia con un anticoagulante orale per fibrillazione atriale.",
 vit:[["PA","178/96",1],["FC","96 irregolare",1],["SpO2","95%"],["GCS","14",1]],
 esami:[["Glicemia","132 mg/dl"],["INR","1,3"]],
 steps:[
  ["Cosa sospetti e quali dati raccogli subito?","Ictus: deficit improvviso (FAST: faccia, braccio, linguaggio). Annoto l'ultima volta in cui era vista in buona salute (10:00), misuro glicemia per escludere l'ipoglicemia, parametri, GCS, pupille; avviso subito il medico per attivare il percorso ictus (stroke code)."],
  ["Perché l'orario è così importante?","Il tempo dall'esordio decide il trattamento: trombolisi endovenosa entro 4,5 ore se è escluso il sanguinamento con TC; trombectomia meccanica in finestre più ampie per occlusioni dei grandi vasi. «Time is brain»."],
  ["Cosa NON fai in attesa della TC?","Non do nulla per bocca (cibo, acqua, farmaci) finché non è stato eseguito lo screening della deglutizione; non abbasso la pressione in modo aggressivo di mia iniziativa; non ritardo il trasporto.","La TC esclude l'emorragia; si valuta con lo specialista la terapia di riperfusione considerando l'anticoagulante."],
  ["Quali diagnosi infermieristiche e interventi nelle ore successive?","Rischio di aspirazione (screening della disfagia prima di alimentare), mobilità fisica compromessa (posizionamento, prevenzione di lesioni e cadute), comunicazione verbale compromessa (strategie alternative), monitoraggio neurologico seriato e della PA secondo protocollo, sostegno alla famiglia."]
 ],
 dx:["Rischio di aspirazione","Comunicazione verbale compromessa","Mobilità fisica compromessa","CP: emorragia/trasformazione emorragica"],
 oral:"Tieni a mente due cose: ultima volta vista bene e niente per bocca prima dello screening della deglutizione."},
{id:"k19",lv:"difficile",area:"Medicina",title:"Anafilassi da antibiotico",tags:["eo","leg"],
 story:"Elena, 45 anni, ricoverata per pielonefrite. Pochi minuti dopo l'inizio della prima infusione di un antibiotico betalattamico riferisce prurito diffuso, gonfiore delle labbra e difficoltà a respirare. In anamnesi non erano riportate allergie.",
 vit:[["PA","78/40",1],["FC","132",1],["FR","30",1],["SpO2","89%",1]],
 esami:[["Torace","sibili diffusi",1],["Cute","orticaria",1]],
 steps:[
  ["Quali sono le prime azioni?","Fermo l'infusione, chiamo aiuto, posizione supina con gambe sollevate (seduta se prevale la dispnea), ossigeno ad alto flusso. Adrenalina intramuscolo nella faccia anterolaterale della coscia, 0,5 mg nell'adulto, ripetibile dopo 5 minuti, secondo protocollo/prescrizione."],
  ["Cosa prepari dopo l'adrenalina?","Accesso venoso di grosso calibro e infusione rapida di cristalloidi per l'ipotensione, monitoraggio continuo, preparazione per la gestione avanzata delle vie aeree; antistaminici e corticosteroidi sono terapie di seconda linea.","Dopo la seconda dose di adrenalina la PA risale a 105/65 e la SpO2 a 96%."],
  ["Perché il paziente va osservato a lungo?","Per il rischio di reazione bifasica nelle ore successive: osservazione prolungata e monitoraggio secondo indicazione medica."],
  ["Quali adempimenti dopo l'evento?","Documentazione completa; segnalazione della reazione avversa al responsabile di farmacovigilanza tramite la rete nazionale AIFA; registrazione dell'allergia in cartella e sul braccialetto o nei sistemi di allerta; informazione alla paziente con indicazioni per il futuro."]
 ],
 dx:["CP: shock anafilattico","Compromissione degli scambi gassosi","Ansia"],
 oral:"Adrenalina intramuscolo prima di tutto: antistaminico e cortisone vengono dopo."},
{id:"k20",lv:"medio",area:"Territorio",title:"Telemonitoraggio di un paziente con BPCO",tags:["dx","leg"],
 story:"Pietro, 74 anni, BPCO in ossigenoterapia domiciliare a 1,5 l/min, è seguito dalla Casa della Comunità con telemonitoraggio. La piattaforma segnala da due giorni SpO2 in calo e aumento della frequenza respiratoria. Al telefono dice di avere più catarro, giallo.",
 vit:[["SpO2","87% in O2",1],["FR","24",1],["FC","98"],["TC","37,8",1]],
 esami:[["Peso","stabile"]],
 steps:[
  ["Come interpreti gli allarmi?","Possibile riacutizzazione di BPCO (aumento di dispnea, quantità e purulenza dell'espettorato). SpO2 87% in ossigeno è sotto il target abituale per BPCO (88-92%) e la FR è aumentata: serve una valutazione rapida."],
  ["Quali azioni attivi?","Video-chiamata o visita domiciliare dell'IFeC, verifica dell'aderenza a inalatori e ossigeno, segni di gravità (confusione, sonnolenza, cianosi, dispnea a riposo); contatto con il MMG per la terapia; se compaiono segni di gravità attivo il 112. La COT coordina eventuali passaggi tra setting.","Il MMG prescrive la terapia per la riacutizzazione; Pietro resta a domicilio con controlli ravvicinati."],
  ["Cosa insegni a Pietro e alla famiglia?","Riconoscere i segni di peggioramento e il piano d'azione, tecnica corretta degli inalatori, uso sicuro dell'ossigeno (niente fumo o fiamme libere, flusso prescritto), idratazione, vaccinazioni, respirazione a labbra socchiuse, quando chiamare."],
  ["Quali norme regolano questo modello?","DM 77/2022 (Case della Comunità, IFeC, COT, telemedicina) e PNRR Missione 6; trattamento dei dati sanitari nel rispetto del GDPR e consenso informato all'uso della telemedicina (L. 219/2017)."]
 ],
 dx:["Liberazione inefficace delle vie aeree","Compromissione degli scambi gassosi","Gestione efficace della salute (da promuovere)"],
 oral:"Mostra che il territorio è un sistema: IFeC, MMG, COT, telemonitoraggio."}
];
