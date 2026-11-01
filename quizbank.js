/* Domande a scelta multipla per sezione della guida Puglia 2026: [materia, sezione, domanda, opzioni, indice corretta, spiegazione] */
const QUIZ2 = [
// 1 SSN
["leg",1,"Il Servizio Sanitario Nazionale è stato istituito con…",["L. 180/1978","L. 833/1978","D.Lgs. 502/1992","L. 42/1999"],1,"L. 23 dicembre 1978, n. 833: universalità, uguaglianza, globalità; ha superato il sistema delle casse mutue."],
["leg",1,"Il D.Lgs. 502/1992 è ricordato soprattutto per…",["L'abolizione del mansionario","L'aziendalizzazione delle USL in ASL e Aziende ospedaliere","L'istituzione degli OPI","I LEA"],1,"«Riforma bis»: personalità giuridica e autonomia imprenditoriale, regionalizzazione, DRG, accreditamento."],
["leg",1,"Per erogare prestazioni per conto del SSN una struttura privata necessita di…",["Solo l'autorizzazione","Autorizzazione, accreditamento istituzionale e accordo contrattuale","Solo l'iscrizione alla Camera di commercio","Il parere dell'OPI"],1,"Il sistema a tre passaggi è stato definito dal D.Lgs. 229/1999 (artt. 8-bis/8-quinquies D.Lgs. 502/1992)."],
["leg",1,"La durata iniziale di un TSO in degenza ospedaliera è di…",["48 ore","7 giorni, rinnovabili","30 giorni","Illimitata"],1,"Oltre i 7 giorni serve una proposta motivata di prolungamento, comunicata al Sindaco e al giudice tutelare."],
["leg",1,"Il sistema sanitario precedente al SSN era basato su…",["Le ASL","Le casse mutue","Le Regioni","I Comuni"],1,"Le mutue coprivano categorie diverse di lavoratori con tutele disomogenee."],
// 2 DM 77
["leg",2,"Lo standard dell'infermiere di famiglia e comunità nel DM 77/2022 è…",["1 ogni 500 abitanti","1 ogni 3.000 abitanti","1 ogni 50.000 abitanti","1 per distretto"],1,"Standard di riferimento: 1 IFeC ogni 3.000 abitanti."],
["leg",2,"L'Unità di Continuità Assistenziale (UCA) è composta da…",["Solo infermieri","1 medico e 1 infermiere ogni 100.000 abitanti","Solo medici di medicina generale","Il 118"],1,"Interviene a domicilio o nelle strutture per casi complessi su attivazione, anche della COT."],
["leg",2,"La Missione 6 del PNRR è dedicata a…",["Digitalizzazione della PA","Salute","Istruzione","Transizione ecologica"],1,"M6C1: reti di prossimità, strutture e telemedicina; M6C2: innovazione, ricerca e digitalizzazione del SSN."],
["leg",2,"Il Piano Nazionale della Cronicità è stato approvato con accordo Stato-Regioni nel…",["2006","2012","2016","2022"],2,"Accordo del 15 settembre 2016: stratificazione, PDTA, empowerment e integrazione ospedale-territorio."],
["leg",2,"La Casa della Comunità hub, secondo il DM 77/2022, è aperta…",["Solo al mattino","h12, 5 giorni su 7","h24, 7 giorni su 7","Solo su appuntamento"],2,"La spoke è aperta h12 per 6 giorni su 7."],
// 3 Gelli-Bianco
["leg",3,"Il SIMES è il sistema per…",["Gestire le liste d'attesa","Monitorare errori ed eventi sentinella","Pagare i ticket","Registrare i crediti ECM"],1,"Sistema informativo per il monitoraggio degli errori in sanità del Ministero della Salute."],
["leg",3,"La Raccomandazione ministeriale n. 1 riguarda…",["L'identificazione del paziente","Il corretto utilizzo delle soluzioni concentrate di cloruro di potassio","Le cadute","La violenza sugli operatori"],1,"KCl concentrato: conservazione separata, etichettatura, prelievo controllato."],
["leg",3,"L'azione di rivalsa della struttura pubblica verso il dipendente (L. 24/2017) è possibile solo per…",["Colpa lieve","Dolo o colpa grave","Qualsiasi errore","Ritardo amministrativo"],1,"Art. 9: rivalsa (e azione della Corte dei conti) solo in caso di dolo o colpa grave."],
["leg",3,"Le linee guida richiamate dalla L. 24/2017 sono pubblicate nel…",["Sito della Regione","Sistema Nazionale Linee Guida (SNLG) dell'Istituto Superiore di Sanità","Albo dell'OPI","Bollettino dell'AIFA"],1,"Art. 5: in mancanza di linee guida si seguono le buone pratiche clinico-assistenziali."],
// 4 Deontologia
["cod",4,"Le sanzioni disciplinari dell'Ordine sono…",["Rimprovero, multa, licenziamento","Avvertimento, censura, sospensione, radiazione","Solo la radiazione","Ammonimento e trasferimento"],1,"Irrogate dall'OPI secondo gravità, volontarietà e reiterazione (art. 51 del Codice)."],
["cod",4,"I quattro principi della bioetica di Beauchamp e Childress sono…",["Autonomia, beneficenza, non maleficenza, giustizia","Libertà, uguaglianza, fraternità, solidarietà","Efficacia, efficienza, equità, economicità","Ascolto, empatia, rispetto, fiducia"],0,"Sono la base di molti ragionamenti etici in sanità, richiamati anche nei codici deontologici."],
["cod",4,"Le DAT (L. 219/2017) possono essere redatte…",["Solo oralmente al medico","Con atto pubblico, scrittura privata autenticata o scrittura privata consegnata all'ufficio di stato civile o alle strutture sanitarie previste","Solo davanti a un giudice","Solo dai familiari"],1,"Per chi non può scrivere sono ammesse videoregistrazione o dispositivi che permettano di comunicare."],
["cod",4,"Il fiduciario nelle DAT è…",["Il medico curante","Una persona maggiorenne e capace che rappresenta il disponente nei rapporti con medico e strutture","L'infermiere referente","Un giudice"],1,"Accetta la nomina sottoscrivendo le DAT o con atto successivo; l'incarico può essere revocato."],
["cod",4,"Quale articolo del Codice 2025 tratta la contenzione?",["Art. 6","Art. 25","Art. 38","Art. 51"],2,"Art. 38: non è atto terapeutico, ha carattere cautelare, eccezionale e temporaneo."],
// 5 Privacy
["pa",5,"Il GDPR è applicato in tutta l'Unione europea dal…",["1 gennaio 2016","25 maggio 2018","30 giugno 2003","19 settembre 2018"],1,"Il D.Lgs. 101/2018 ha adeguato il Codice privacy italiano (D.Lgs. 196/2003)."],
["pa",5,"Il diritto all'oblio è previsto dall'art.…",["9 GDPR","15 GDPR","17 GDPR","37 GDPR"],2,"In sanità ha limiti: la documentazione clinica va conservata per obblighi di legge."],
["pa",5,"Una violazione dei dati personali (data breach) va notificata al Garante entro…",["24 ore","72 ore","15 giorni","30 giorni"],1,"Art. 33 GDPR: entro 72 ore da quando il titolare ne è venuto a conoscenza, salvo improbabilità di rischio."],
["pa",5,"Il principio di accountability significa che il titolare…",["Può delegare tutto al DPO","Deve essere in grado di dimostrare di rispettare il GDPR","Non risponde dei responsabili esterni","Deve chiedere sempre il consenso"],1,"Art. 5, par. 2 GDPR: responsabilizzazione."],
// 6 D.Lgs. 165/2001
["pa",6,"L'art. 97 della Costituzione fissa per la PA i principi di…",["Universalità ed equità","Buon andamento e imparzialità","Sussidiarietà e proporzionalità","Gratuità e solidarietà"],1,"Principi che si applicano anche ai dipendenti delle aziende sanitarie."],
["pa",6,"Il licenziamento disciplinare per falsa attestazione della presenza in servizio è disciplinato dall'art.…",["53","55-quater","35","7"],1,"D.Lgs. 165/2001, art. 55-quater, rafforzato da D.Lgs. 116/2016 e D.Lgs. 75/2017."],
["pa",6,"Le sanzioni disciplinari più gravi del dipendente pubblico sono gestite da…",["Il coordinatore del reparto","L'Ufficio per i procedimenti disciplinari (UPD)","L'OPI","Il Garante privacy"],1,"Le infrazioni di minore gravità sono di competenza del responsabile della struttura."],
["pa",6,"Le incompatibilità e gli incarichi extra-istituzionali del dipendente pubblico sono regolati dall'art.…",["53 D.Lgs. 165/2001","2043 c.c.","9 GDPR","32 Cost."],0,"Gli incarichi retribuiti richiedono l'autorizzazione dell'amministrazione."],
["pa",6,"Il procedimento disciplinare deve concludersi entro…",["30 giorni","60 giorni","120 giorni dalla contestazione","1 anno"],2,"Art. 55-bis D.Lgs. 165/2001 come modificato dal D.Lgs. 75/2017."],
// 7 CCNL e DPR 220
["pa",7,"Il DPR 220/2001 disciplina…",["I concorsi del personale del comparto (non dirigenziale) del SSN","Il profilo dell'infermiere","La privacy","Gli stupefacenti"],0,"Requisiti, commissioni, prove e graduatorie dei concorsi del comparto sanità."],
["pa",7,"L'orario ordinario dell'infermiere del SSN è di…",["32 ore settimanali","36 ore settimanali","38 ore settimanali","40 ore settimanali"],1,"Il CCNL 2022-2024 prevede in via sperimentale la possibile distribuzione su quattro giorni, su base volontaria."],
["pa",7,"Secondo il D.Lgs. 66/2003 il riposo giornaliero minimo è di…",["8 ore consecutive","11 ore consecutive ogni 24 ore","6 ore","24 ore"],1,"La durata media settimanale non può superare 48 ore, straordinario compreso."],
["pa",7,"Nel CCNL vigente il coordinamento infermieristico è attribuito come…",["Categoria DS","Incarico di funzione organizzativa","Posizione dirigenziale","Mansione superiore"],1,"Gli incarichi di funzione possono essere organizzativi (coordinamento) o professionali (es. specialista, esperto)."],
// 8 Documentazione
["dx",8,"Per quanto tempo va conservata la cartella clinica?",["5 anni","10 anni","20 anni","Illimitatamente"],3,"Circolare Min. Sanità 61/1986: conservazione illimitata, in quanto atto ufficiale."],
["dx",8,"Come si corregge un errore nel diario infermieristico?",["Con il correttore","Cancellando con il pennarello","Barrando con una riga che lasci leggibile il testo, con data, ora e firma","Strappando la pagina"],2,"La cartella è atto pubblico: ogni modifica deve restare tracciabile."],
["dx",8,"Il PAI è…",["Il piano assistenziale individualizzato","Il protocollo antincendio","Il piano annuale investimenti","Il prontuario farmaceutico"],0,"È il prodotto del processo di nursing, condiviso con l'équipe e, quando possibile, con la persona."],
["dx",8,"Nel DM 77/2022 le dimissioni protette sono coordinate soprattutto da…",["Il pronto soccorso","La Centrale Operativa Territoriale (COT)","Il Sindaco","L'OPI"],1,"La COT raccorda ospedale, MMG, IFeC, servizi sociali e strutture intermedie."],
// 9 Farmacologia
["cli",9,"L'acronimo ADME della farmacocinetica significa…",["Azione, Dose, Metabolismo, Effetto","Assorbimento, Distribuzione, Metabolismo, Eliminazione","Allergia, Dose, Monitoraggio, Emivita","Assunzione, Digestione, Mescolanza, Escrezione"],1,"Il metabolismo è soprattutto epatico (citocromo P450), l'eliminazione soprattutto renale."],
["cli",9,"Una reazione avversa di tipo B è…",["Dose-dipendente e prevedibile","Dose-indipendente e imprevedibile (es. anafilassi)","Sempre lieve","Un errore di somministrazione"],1,"Le reazioni di tipo A (le più frequenti) sono legate all'effetto farmacologico e alla dose."],
["cli",9,"L'emivita di un farmaco è…",["Il tempo per raggiungere l'effetto massimo","Il tempo in cui la concentrazione plasmatica si dimezza","La durata della confezione","Il tempo di assorbimento"],1,"Servono circa 4-5 emivite per raggiungere lo stato stazionario o eliminare il farmaco."],
["cli",9,"Il registro di carico e scarico degli stupefacenti di reparto si conserva…",["Per 6 mesi","Per 2 anni dall'ultima registrazione","Fino alla fine dell'anno","Non va conservato"],1,"DPR 309/1990: conservazione per due anni dalla data dell'ultima registrazione."],
["cli",9,"Per quali farmaci è raccomandato il doppio controllo indipendente?",["Vitamine","Farmaci ad alto rischio come insulina, anticoagulanti, oppioidi, KCl concentrato","Fisiologica 100 ml","Integratori"],1,"Due operatori verificano separatamente farmaco, dose, via e paziente."],
// 10 Emergenze
["eo",10,"La frequenza delle compressioni toraciche nel BLS è…",["60–80/min","80–100/min","100–120/min","140–160/min"],2,"Compressioni efficaci con rilascio completo del torace e interruzioni minime."],
["eo",10,"Dopo l'erogazione di uno shock con il DAE si deve…",["Controllare il polso per 1 minuto","Riprendere subito la RCP per 2 minuti","Aspettare l'analisi successiva senza toccare","Somministrare 2 ventilazioni e fermarsi"],1,"Il DAE rianalizza il ritmo ogni 2 minuti."],
["eo",10,"Il codice arancione di triage indica un accesso entro…",["Immediato","15 minuti","60 minuti","120 minuti"],1,"Urgenza: rischio evolutivo, possibile compromissione delle funzioni vitali."],
["eo",10,"Nel BLS dell'adulto la valutazione del respiro dura…",["Al massimo 10 secondi","30 secondi","1 minuto","Non si valuta"],0,"Il respiro agonico (gasping) va considerato assente."],
// 11 Prevenzione e 81/2008
["cli",11,"La valutazione dei rischi e il DVR sono un obbligo non delegabile del…",["Medico competente","Datore di lavoro","RLS","Lavoratore"],1,"D.Lgs. 81/2008, art. 17: insieme alla nomina del RSPP."],
["cli",11,"Le precauzioni standard si applicano…",["Solo ai pazienti infetti noti","A tutti i pazienti","Solo in sala operatoria","Solo ai pazienti in isolamento"],1,"Igiene delle mani, DPI in base al rischio, gestione dei taglienti, igiene respiratoria."],
["cli",11,"I momenti OMS per l'igiene delle mani sono…",["3","4","5","7"],2,"Prima del contatto, prima di una manovra asettica, dopo esposizione a liquidi biologici, dopo il contatto, dopo il contatto con l'ambiente del paziente."],
["cli",11,"La profilassi post-esposizione anti-HIV va iniziata…",["Il prima possibile, idealmente entro poche ore e non oltre 72 ore","Dopo una settimana","Solo se il test del paziente fonte è positivo dopo un mese","Non è prevista"],0,"L'incidente va segnalato subito e denunciato come infortunio sul lavoro."],
["cli",11,"Contro le spore di Clostridioides difficile per le mani si usa…",["Solo gel alcolico","Acqua e sapone","Nessuna igiene","Solo guanti senza lavaggio"],1,"Il gel alcolico non è efficace sulle spore: lavaggio con acqua e sapone e precauzioni da contatto."],
// 12 Patologie
["cli",12,"Nella classificazione NYHA la classe IV indica…",["Nessun sintomo","Sintomi solo per sforzi intensi","Sintomi anche a riposo","Solo edemi"],2,"Classe I asintomatico, II sforzi ordinari, III sforzi lievi, IV a riposo."],
["cli",12,"Nello scompenso cardiaco quale aumento di peso deve far scattare l'allarme?",["Oltre 2 kg in 2–3 giorni","Oltre 10 kg in un anno","Qualsiasi calo","Oltre 500 g in un mese"],0,"Segno di ritenzione idrica: il paziente va educato al peso quotidiano."],
["cli",12,"La regola del 15 per l'ipoglicemia prevede…",["15 unità di insulina","15 g di zuccheri semplici e controllo dopo 15 minuti","15 minuti di attività fisica","15 ml di glucagone"],1,"Si ripete se la glicemia resta sotto 70 mg/dl, poi uno spuntino con carboidrati complessi."],
["cli",12,"Una lesione da pressione di categoria 2 è…",["Eritema non sbiancante su cute integra","Perdita parziale dello spessore del derma","Perdita a tutto spessore con esposizione ossea","Danno dei tessuti profondi"],1,"Classificazione NPIAP/EPUAP: si presenta come ulcera superficiale o flittene."],
// 13 Anatomia e fisiologia
["cli",13,"La gittata cardiaca si calcola come…",["FC × gittata sistolica","PA sistolica − PA diastolica","FC / FR","Volume telediastolico × 2"],0,"A riposo circa 5 l/min."],
["cli",13,"Il pH arterioso normale è…",["7,00–7,20","7,35–7,45","7,50–7,60","6,80–7,00"],1,"PaCO2 35–45 mmHg, HCO3⁻ 22–26 mEq/l."],
["cli",13,"pH 7,28 e PaCO2 62 mmHg indicano…",["Alcalosi respiratoria","Acidosi respiratoria","Acidosi metabolica","Alcalosi metabolica"],1,"Tipica della BPCO riacutizzata o della depressione respiratoria."],
["cli",13,"L'aldosterone agisce sul tubulo distale…",["Riassorbendo sodio e secernendo potassio","Riassorbendo potassio","Secernendo glucosio","Riassorbendo solo acqua libera"],0,"Fa parte del sistema renina-angiotensina-aldosterone che regola volemia e pressione."],
["cli",13,"L'INR terapeutico più comune in corso di warfarin (es. fibrillazione atriale, TVP) è…",["0,8–1,2","2–3","4–5","6–8"],1,"Per alcune protesi valvolari meccaniche il range è più alto."],
// 14 Ostetricia
["cli",14,"La pre-eclampsia si definisce come…",["Ipertensione prima della gravidanza","PA ≥ 140/90 dopo la 20ª settimana con proteinuria o danno d'organo","Glicosuria in gravidanza","Edemi alle caviglie"],1,"Va monitorata con PA, proteinuria, diuresi, riflessi osteotendinei e benessere fetale."],
["cli",14,"Il farmaco per prevenire le convulsioni nella pre-eclampsia grave è…",["Diazepam","Solfato di magnesio","Ossitocina","Furosemide"],1,"Durante l'infusione si monitorano riflessi, FR e diuresi per il rischio di tossicità; antidoto: calcio gluconato."],
["cli",14,"La frequenza cardiaca fetale normale è…",["60–100 bpm","110–160 bpm","180–220 bpm","90–110 bpm"],1,"Le decelerazioni tardive suggeriscono ipossia fetale."],
["cli",14,"L'indice di Apgar valuta 5 parametri…",["Solo alla nascita","A 1 e a 5 minuti","Solo a 10 minuti","Ogni ora"],1,"Colorito, frequenza cardiaca, riflessi, tono muscolare, respiro; 0–2 punti ciascuno."],
["cli",14,"Dopo il parto un utero molle e non contratto fa temere…",["Normale involuzione","Atonia uterina ed emorragia post-partum","Mastite","Ritenzione urinaria isolata"],1,"L'atonia è la causa più frequente di EPP (la «T» di tono)."],
// 15 Pediatria
["cli",15,"Con la L. 119/2017 le vaccinazioni obbligatorie per i minori sono…",["4","6","10","12"],2,"Esavalente (6 componenti), morbillo, parotite, rosolia, varicella."],
["cli",15,"Nel lattante la profondità delle compressioni toraciche è di circa…",["2 cm","4 cm (un terzo del torace)","6 cm","8 cm"],1,"Nel bambino circa 5 cm."],
["cli",15,"Nel PBLS con due soccorritori sanitari il rapporto compressioni/ventilazioni è…",["30:2","15:2","5:1","3:1"],1,"Dopo le 5 ventilazioni iniziali di soccorso."],
["cli",15,"L'agente più frequente della bronchiolite del lattante è…",["Streptococco","Virus respiratorio sinciziale (VRS)","Rotavirus","Pertosse"],1,"Trattamento di supporto: ossigeno se SpO2 bassa, aspirazione delle secrezioni, idratazione."],
["cli",15,"Tosse abbaiante e stridore inspiratorio in un bambino di 2 anni fanno pensare a…",["Bronchiolite","Laringite ipoglottica (croup)","Asma","Polmonite"],1,"Nei casi moderati si usa desametasone, nei gravi anche adrenalina nebulizzata."],
// 16 Psichiatria
["cli",16,"Il provvedimento di TSO va notificato al giudice tutelare entro…",["24 ore","48 ore","7 giorni","30 giorni"],1,"Il giudice ha poi 48 ore per convalidare o meno."],
["cli",16,"L'SPDC è…",["Un centro diurno","Il servizio psichiatrico di diagnosi e cura dell'ospedale generale","Una comunità terapeutica","Un ambulatorio privato"],1,"Introdotto con la riforma del 1978 al posto dei manicomi."],
["cli",16,"Gli antidepressivi SSRI mostrano l'effetto clinico di solito dopo…",["Poche ore","2–4 settimane","6 mesi","Un anno"],1,"Informare la persona aiuta l'aderenza; nelle prime settimane va sorvegliato il rischio suicidario."],
["cli",16,"La sentenza di riferimento in Italia sulla contenzione (caso Mastrogiovanni) è…",["Corte cost. 22/2022","Cass. pen. Sez. V 50497/2018","Cass. SU 8770/2018","Corte cost. 242/2019"],1,"La contenzione non è atto medico: è lecita solo come extrema ratio in stato di necessità."],
// 17 Oncologia e palliative
["cli",17,"La scala analgesica OMS prevede…",["2 gradini","3 gradini","5 gradini","Nessun gradino"],1,"Non oppioidi, oppioidi deboli, oppioidi forti, con adiuvanti a ogni livello."],
["cli",17,"La stipsi da oppioidi…",["Scompare in pochi giorni","Non va incontro a tolleranza: servono lassativi preventivi","Non esiste","Si tratta riducendo l'acqua"],1,"Per questo il lassativo si prescrive insieme all'oppioide."],
["cli",17,"Il nadir dopo chemioterapia (minimo dei globuli bianchi) cade in genere…",["Il giorno stesso","Dopo 7–14 giorni","Dopo 3 mesi","Mai"],1,"In questo periodo la febbre è un'emergenza (neutropenia febbrile)."],
["cli",17,"In caso di stravaso di un farmaco vescicante la prima azione è…",["Aumentare la velocità d'infusione","Fermare l'infusione lasciando l'ago e aspirare il possibile","Massaggiare la zona","Applicare sempre calore"],1,"Poi si avvisa il medico, si applica il protocollo specifico e si documenta."],
// 18 Nutrizione
["cli",18,"Un punteggio MUST ≥ 2 indica…",["Rischio basso","Rischio medio","Rischio alto di malnutrizione","Obesità"],2,"Richiede intervento nutrizionale e monitoraggio."],
["cli",18,"La nutrizione parenterale totale richiede di solito…",["Una cannula periferica","Un accesso venoso centrale per l'alta osmolarità","Un sondino nasogastrico","Una PEG"],1,"Rischi principali: infezioni del catetere, iperglicemia, alterazioni metaboliche."],
["cli",18,"La sindrome da rialimentazione è caratterizzata soprattutto da…",["Ipofosfatemia, ipokaliemia, ipomagnesiemia","Ipercalcemia","Iperkaliemia isolata","Anemia macrocitica"],0,"Si previene iniziando lentamente nei pazienti gravemente malnutriti."],
["cli",18,"Durante la nutrizione enterale la testata del letto va tenuta a…",["0°","10°","30–45°","90° fisso"],2,"Riduce il rischio di aspirazione."],
// 19 Geriatria
["cli",19,"Il fenotipo di fragilità di Fried definisce fragile chi ha…",["1 criterio su 5","Almeno 3 criteri su 5","Più di 80 anni","Più di 5 farmaci"],1,"Criteri: calo ponderale, astenia, ridotta forza, lentezza, ridotta attività fisica."],
["cli",19,"Si parla di polifarmacoterapia quando si assumono…",["2 farmaci","3 farmaci","5 o più farmaci","10 o più farmaci"],2,"Strumenti per la revisione: criteri di Beers e STOPP/START."],
["cli",19,"La scala di Lawton valuta…",["Il dolore","Le attività strumentali della vita quotidiana (IADL)","Il rischio di cadute","La deglutizione"],1,"Uso del telefono, spesa, farmaci, denaro, trasporti; il Barthel valuta le ADL di base."],
["cli",19,"La forma di delirium più spesso non riconosciuta è…",["Iperattiva","Ipoattiva","Mista","Nessuna"],1,"Si presenta con sonnolenza e apatia e ha prognosi peggiore."],
// 20 Chirurgia
["cli",20,"L'antibioticoprofilassi chirurgica va somministrata…",["Il giorno prima","Entro 60 minuti prima dell'incisione","Dopo l'intervento","Solo se compare febbre"],1,"Parte delle misure di sicurezza in sala operatoria."],
["cli",20,"Secondo i protocolli ERAS il digiuno preoperatorio è…",["Dalla mezzanotte per tutto","6 ore per i solidi e 2 ore per i liquidi chiari","24 ore","Non previsto"],1,"Il digiuno prolungato aumenta disagio e insulino-resistenza."],
["cli",20,"La complicanza respiratoria precoce più frequente dopo chirurgia addominale è…",["Pneumotorace","Atelettasia","Embolia gassosa","Asma"],1,"Si previene con mobilizzazione precoce, respirazione profonda, spirometria incentivante e controllo del dolore."],
["cli",20,"Le infezioni del sito chirurgico si sorvegliano per…",["48 ore","7 giorni","30 giorni (90 in caso di protesi)","1 anno sempre"],2,"Definizione dei sistemi di sorveglianza ECDC/CDC."],
// 21 Normative aggiuntive
["pa",21,"La tutela di chi segnala illeciti (whistleblowing) è oggi disciplinata da…",["L. 241/1990","D.Lgs. 24/2023","DPR 62/2013","L. 3/2018"],1,"Attua la direttiva UE 2019/1937."],
["pa",21,"L'accesso civico generalizzato (FOIA) è stato introdotto da…",["D.Lgs. 33/2013","D.Lgs. 97/2016","L. 190/2012","GDPR"],1,"Chiunque può chiedere dati e documenti della PA senza motivazione, nei limiti di legge."],
["pa",21,"L'IVG su richiesta della donna è possibile entro…",["30 giorni","90 giorni","180 giorni","Sempre"],1,"L. 194/1978; dopo i 90 giorni solo per gravi motivi di salute previsti dalla legge."],
["pa",21,"L'obiettore di coscienza (L. 194/1978, art. 9) non può rifiutare…",["Nessuna prestazione","L'assistenza quando è indispensabile per salvare la vita della donna in imminente pericolo","Le visite ambulatoriali","Il certificato"],1,"L'obiezione riguarda le procedure dirette all'interruzione, non l'assistenza precedente e successiva."],
["pa",21,"I crediti ECM richiesti nel triennio sono…",["50","100","150","300"],2,"Il sistema è gestito dalla Commissione nazionale per la formazione continua presso AGENAS."],
["pa",21,"Nella L. 241/1990 l'art. 20 disciplina…",["Il diritto di accesso","Il silenzio-assenso","La motivazione","Il responsabile del procedimento"],1,"Decorso il termine senza risposta, in alcuni procedimenti la domanda si intende accolta."],
// 22 Cardiologia
["cli",22,"Nello STEMI l'ECG mostra tipicamente…",["Sottoslivellamento ST","Sopraslivellamento ST persistente","Onde P assenti","QRS normale sempre"],1,"Indica occlusione coronarica acuta: riperfusione con angioplastica primaria il prima possibile."],
["cli",22,"Nel sospetto di sindrome coronarica acuta l'ECG va eseguito entro…",["10 minuti dal primo contatto","1 ora","6 ore","24 ore"],0,"Con monitoraggio continuo e dosaggio delle troponine."],
["cli",22,"La fibrillazione atriale all'ECG mostra…",["Ritmo regolare con onde P","Ritmo irregolarmente irregolare senza onde P","Onde a dente di sega","QRS larghi regolari"],1,"Il rischio principale è il tromboembolismo (ictus)."],
["cli",22,"Si parla di emergenza ipertensiva quando…",["La PA supera 140/90","La PA è molto elevata con danno d'organo acuto","Il paziente è asintomatico","La PA scende rapidamente"],1,"Richiede terapia endovenosa in ambiente monitorato, con riduzione graduale della PA."],
["cli",22,"Il biomarcatore più specifico di necrosi miocardica è…",["CK totale","Troponina","Mioglobina","LDH"],1,"Si dosano troponine ad alta sensibilità con prelievi seriati."],
// 23 Pneumologia
["cli",23,"La diagnosi di BPCO richiede…",["Radiografia del torace","Spirometria con FEV1/FVC < 0,70 dopo broncodilatatore","Emocromo","Saturimetria"],1,"La classificazione GOLD usa il FEV1 % del predetto."],
["cli",23,"La CPAP è il trattamento di prima scelta nel…",["Pneumotorace","Edema polmonare acuto cardiogeno","Arresto cardiaco","Vomito incoercibile"],1,"Riduce il lavoro respiratorio e la necessità di intubazione."],
["cli",23,"Quale condizione è una controindicazione alla NIV?",["BPCO ipercapnica","Paziente incosciente con vie aeree non protette o vomito","Edema polmonare","Polmonite lieve"],1,"Altre controindicazioni: arresto respiratorio, trauma facciale, instabilità grave."],
// 24 + 27 Neurologia
["cli",24,"La trombolisi endovenosa nell'ictus ischemico si esegue entro…",["1 ora","4,5 ore dall'esordio","24 ore","7 giorni"],1,"Prima si esclude l'emorragia con TC; la trombectomia meccanica ha finestre più ampie in casi selezionati."],
["cli",24,"Si parla di stato epilettico convulsivo quando la crisi dura…",["Più di 30 secondi","Più di 5 minuti","Più di 1 ora","Più di 24 ore"],1,"Prima linea: benzodiazepine."],
["cli",27,"La triade del morbo di Parkinson è…",["Febbre, rigidità nucale, cefalea","Tremore a riposo, rigidità, bradicinesia","Atassia, nistagmo, disartria","Ptosi, diplopia, disfagia"],1,"La levodopa va somministrata agli orari esatti per evitare fluttuazioni motorie."],
["cli",27,"Nella sindrome di Guillain-Barré la complicanza più temuta è…",["Convulsioni","Insufficienza respiratoria","Ipertermia","Ittero"],1,"Si monitora la capacità vitale: sotto 20 ml/kg si valuta l'intubazione."],
["cli",27,"Nella miastenia gravis la debolezza…",["È costante","Peggiora con l'affaticamento e migliora col riposo","Colpisce solo le gambe","È sempre unilaterale"],1,"Esordio tipico con ptosi e diplopia."],
["cli",24,"L'acronimo FAST per l'ictus indica…",["Febbre, Astenia, Sudorazione, Tosse","Face, Arm, Speech, Time","Frequenza, Atti, Saturazione, Temperatura","Fegato, Addome, Stomaco, Torace"],1,"Paresi facciale, debolezza di un braccio, disturbo del linguaggio: chiamare subito il 112/118."],
// 25 Nefrologia, anemie, trasfusioni
["cli",25,"Secondo KDIGO un criterio di danno renale acuto è la diuresi…",["< 0,5 ml/kg/h per almeno 6 ore","< 2 l/die","> 3 l/die","Assente per 10 minuti"],0,"Oppure aumento della creatinina ≥ 0,3 mg/dl in 48 ore o ≥ 1,5 volte in 7 giorni."],
["cli",25,"L'anemia microcitica più frequente è…",["Da carenza di B12","Sideropenica (carenza di ferro)","Emolitica","Aplastica"],1,"La ferritina bassa è il marcatore più precoce."],
["cli",25,"Un'anemia macrocitica fa pensare a…",["Carenza di ferro","Carenza di vitamina B12 o folati","Talassemia","Emorragia acuta"],1,"La carenza di B12 può dare anche neuropatia."],
["cli",25,"La causa principale delle reazioni emolitiche acute da trasfusione è…",["Il riscaldamento della sacca","L'incompatibilità ABO, spesso per errore di identificazione","La velocità lenta","La fisiologica"],1,"La prevenzione si basa sull'identificazione attiva del paziente e sul controllo al letto."],
["cli",25,"L'iperkaliemia grave è pericolosa soprattutto per il rischio di…",["Ipoglicemia","Aritmie cardiache","Ittero","Febbre"],1,"Richiede ECG e trattamento urgente."],
// 26 Emergenze avanzate
["eo",26,"Nell'anafilassi dell'adulto il farmaco di prima scelta è…",["Antistaminico per bocca","Adrenalina 0,5 mg intramuscolo nella coscia","Cortisone per bocca","Paracetamolo"],1,"Si può ripetere dopo 5 minuti; poi ossigeno e fluidi."],
["eo",26,"Il «torace silente» in un attacco d'asma indica…",["Miglioramento","Gravità estrema con flusso aereo minimo","Guarigione","Pneumotorace certo"],1,"Segno di pericolo di vita: richiede trattamento immediato."],
["eo",26,"Lo shock neurogeno si distingue per…",["Tachicardia e cute fredda","Ipotensione con bradicardia e cute calda","Febbre alta","Ipertensione"],1,"Causato da lesione midollare alta con perdita del tono simpatico."],
["eo",26,"Nel paziente incosciente con ipoglicemia grave si somministra…",["Zucchero per bocca","Glucosio endovena o glucagone intramuscolo","Insulina","Acqua"],1,"La via orale è controindicata per il rischio di aspirazione."],
["eo",26,"La «triade letale» del trauma comprende…",["Febbre, tosse, dispnea","Ipotermia, acidosi, coagulopatia","Ipertensione, bradicardia, bradipnea","Dolore, ansia, nausea"],1,"Per questo fluidi riscaldati e controllo della temperatura."],
["eo",26,"Nella sepsi un lattato superiore a 4 mmol/l indica…",["Valore normale","Ipoperfusione grave da trattare con fluidi rapidamente","Disidratazione lieve","Errore di laboratorio"],1,"Il bundle della prima ora prevede emocolture, antibiotici, lattato, fluidi e vasopressori se necessario."],
// 28 Gastroenterologia
["cli",28,"La melena è…",["Sangue rosso vivo nelle feci","Feci nere, picee, maleodoranti per sangue digerito","Vomito di sangue","Diarrea acquosa"],1,"Indica in genere un sanguinamento del tratto digestivo superiore."],
["cli",28,"La pancreatite acuta si diagnostica con dolore tipico e…",["Lipasi o amilasi superiori a 3 volte il normale","Glicemia alta","Transaminasi normali","Emocromo normale"],0,"Cause principali: calcoli biliari e alcol."],
["cli",28,"Nella rettocolite ulcerosa l'infiammazione…",["Colpisce tutto il tubo digerente a salti","È continua e parte dal retto, limitata al colon","È solo nello stomaco","È transmurale con fistole"],1,"Il morbo di Crohn invece può colpire qualsiasi tratto, a salti e a tutto spessore."],
["cli",28,"Nel sanguinamento da varici esofagee il farmaco vasoattivo specifico è…",["Furosemide","Terlipressina","Insulina","Adrenalina"],1,"Associato ad antibioticoprofilassi e legatura endoscopica urgente."],
// 29 Endocrinologia
["cli",29,"La causa più frequente di ipotiroidismo è…",["Morbo di Graves","Tiroidite di Hashimoto","Carcinoma tiroideo","Gozzo multinodulare tossico"],1,"Autoanticorpi anti-TPO; terapia con levotiroxina."],
["cli",29,"La levotiroxina va assunta…",["Dopo cena","Al mattino a digiuno, prima della colazione","Con il latte","Solo al bisogno"],1,"Cibo, caffè e alcuni farmaci ne riducono l'assorbimento."],
["cli",29,"La chetoacidosi diabetica è tipica del…",["Diabete tipo 1","Diabete gestazionale","Diabete insipido","Prediabete"],0,"Nel tipo 2 è più tipico lo stato iperglicemico iperosmolare."],
// 30 Microbiologia
["cli",30,"Un paziente con KPC ha un batterio…",["Sensibile a tutti gli antibiotici","Produttore di carbapenemasi, resistente ai carbapenemi","Gram positivo","Non trasmissibile"],1,"Klebsiella pneumoniae carbapenemasi: precauzioni da contatto."],
["cli",30,"Per l'MRSA si utilizzano di solito…",["Penicillina","Vancomicina o linezolid","Amoxicillina","Nessun antibiotico"],1,"Resistente alla meticillina e agli altri beta-lattamici."],
["cli",30,"Una misura chiave per prevenire le infezioni urinarie da catetere è…",["Cambiare il catetere ogni giorno","Valutare ogni giorno la necessità e rimuoverlo il prima possibile","Lavaggi vescicali di routine","Tenere la sacca sopra il livello della vescica"],1,"Sistema chiuso, sacca sotto il livello della vescica, igiene."],
["cli",30,"La stewardship antibiotica serve a…",["Aumentare l'uso di antibiotici","Usare gli antibiotici in modo appropriato per ridurre le resistenze","Sostituire l'igiene delle mani","Ridurre le vaccinazioni"],1,"Fa parte del Piano nazionale di contrasto all'antibiotico-resistenza (PNCAR)."],
// 31 Codice penale e civile
["leg",31,"L'abbandono di persone incapaci è previsto dall'art.…",["328 c.p.","591 c.p.","622 c.p.","365 c.p."],1,"Riguarda chi ha la custodia o la cura di una persona incapace di provvedere a sé."],
["leg",31,"L'art. 200 del codice di procedura penale riguarda…",["L'omissione di referto","La facoltà di astenersi dal testimoniare per segreto professionale","Il falso in atto pubblico","Il consenso informato"],1,"Vale anche per gli esercenti una professione sanitaria."],
["leg",31,"Il termine di prescrizione della responsabilità extracontrattuale è…",["1 anno","5 anni","10 anni","20 anni"],1,"Quello contrattuale (struttura) è di 10 anni."],
["leg",31,"I maltrattamenti contro familiari o conviventi sono puniti dall'art.…",["572 c.p.","590 c.p.","328 c.p.","348 c.p."],0,"Reato procedibile d'ufficio: per l'operatore sanitario scatta l'obbligo di referto o denuncia."]
];
