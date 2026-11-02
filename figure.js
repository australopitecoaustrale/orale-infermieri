/* Illustrazioni originali dell'Atlante (SVG). Campi: id, t (titolo), c (didascalia), svg, enc (voci), gl (termini del glossario), st (regex sui titoli delle schede di studio) */
const FIGURE=[
{id:"conduzione",t:"Sistema di conduzione del cuore",c:"L'impulso nasce nel nodo seno-atriale, attraversa gli atri, rallenta nel nodo atrio-ventricolare e scende lungo il fascio di His e le branche fino alle fibre del Purkinje. Ogni centro ha una propria frequenza di scarica: se quelli superiori si fermano, subentrano quelli inferiori, più lenti.",
 enc:["cuore-fisiologia","ritmi","blocchi-av"],gl:[],st:/torace|cuore|ecg/i,
 svg:`<svg viewBox="0 0 520 300" role="img" aria-label="Schema del sistema di conduzione del cuore">
 <g transform="translate(60 0)">
 <path class="ff fl" d="M200 62C168 22 96 26 86 92C78 150 128 206 200 272C272 206 322 150 314 92C304 26 232 22 200 62Z"/>
 <path class="fa" d="M200 62C168 22 96 26 86 92Q86 112 98 132H302Q314 112 314 92C304 26 232 22 200 62Z" opacity=".55"/>
 <path class="fl dash" d="M98 132H302"/><path class="fl" d="M200 70V258"/>
 <path class="fs thick" d="M128 86Q160 100 186 128"/><path class="fs thick" d="M128 86Q150 70 190 80"/>
 <path class="fs thick" d="M190 130H200V164"/><path class="fs thick" d="M200 164Q186 196 160 236"/><path class="fs thick" d="M200 164Q222 200 252 234"/>
 <path class="fs" d="M160 236Q140 220 132 196M160 236Q176 252 196 258M252 234Q270 214 276 190M252 234Q232 252 206 258"/>
 <circle class="fv" cx="128" cy="86" r="8"/><circle class="fv" cx="190" cy="130" r="7"/>
 <g class="ft fsm" text-anchor="middle"><text x="140" y="118">Atrio dx</text><text x="258" y="112">Atrio sx</text><text x="150" y="170">Ventricolo dx</text><text x="252" y="170">Ventricolo sx</text></g>
 </g>
 <g class="ft"><text x="6" y="40">Nodo seno-atriale</text><text x="6" y="54" class="fsm">60-100/min</text><path class="lead" d="M120 46L182 82"/>
 <text x="380" y="40">Nodo atrio-</text><text x="380" y="54">ventricolare</text><text x="380" y="68" class="fsm">40-60/min</text><path class="lead" d="M378 56L256 128"/>
 <text x="380" y="190">Fascio di His</text><path class="lead" d="M378 186L262 156"/>
 <text x="380" y="236">Branca sinistra</text><path class="lead" d="M378 232L314 226"/>
 <text x="6" y="236">Branca destra</text><path class="lead" d="M100 232L216 230"/>
 <text x="170" y="294">Fibre del Purkinje · 20-40/min</text></g></svg>`},
{id:"onde-ecg",t:"Onde e intervalli dell'ECG",c:"P = depolarizzazione degli atri; QRS = depolarizzazione dei ventricoli; T = ripolarizzazione dei ventricoli. Sulla carta a 25 mm/s un quadratino da 1 mm vale 0,04 s e un quadrato grande da 5 mm vale 0,20 s.",
 enc:["ecg-basi","ecg-lettura"],gl:["Elettrocardiografo"],st:/ecg|torace|cuore/i,
 svg:`<svg viewBox="0 0 420 210" role="img" aria-label="Onde P, QRS, T e intervalli PR, QRS, QT">
 <defs><pattern id="fg1" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0V8H0" fill="none" stroke="#f0b8b3" stroke-width=".5"/></pattern><pattern id="fg5" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="url(#fg1)"/><path d="M40 0V40H0" fill="none" stroke="#e08a84" stroke-width="1"/></pattern></defs>
 <rect x="0" y="0" width="420" height="210" rx="8" fill="#fff7f6"/><rect x="0" y="0" width="420" height="210" fill="url(#fg5)"/>
 <path d="M10 140H64Q80 118 96 140H120L126 150L138 44L150 162L158 140H196Q228 98 262 140H286Q296 130 306 140H410" fill="none" stroke="#1a1a1a" stroke-width="2.4" stroke-linejoin="round"/>
 <g font-family="var(--f-mono)" font-size="13" font-weight="700" fill="#1a1a1a"><text x="74" y="112">P</text><text x="122" y="40">R</text><text x="112" y="164">Q</text><text x="150" y="180">S</text><text x="224" y="94">T</text><text x="292" y="124">U</text></g>
 <g stroke="#b0413b" stroke-width="1.6" fill="none"><path d="M64 190V196M120 190V196M64 193H120"/><path d="M120 172V178M158 172V178M120 175H158"/><path d="M120 18V24M262 18V24M120 21H262"/><path d="M158 128H196" stroke-dasharray="3 3"/></g>
 <g font-family="var(--f-body)" font-size="12" fill="#b0413b" font-weight="700"><text x="70" y="208">PR 0,12-0,20 s</text><text x="164" y="179">QRS &lt; 0,12 s</text><text x="160" y="15">QT</text><text x="160" y="124" font-size="10">ST</text></g></svg>`},
{id:"elettrodi",t:"Posizione degli elettrodi dell'ECG a 12 derivazioni",c:"Precordiali: V1 IV spazio intercostale a destra dello sterno; V2 IV spazio a sinistra dello sterno; V4 V spazio sulla linea emiclaveare; V3 a metà tra V2 e V4; V5 linea ascellare anteriore e V6 linea ascellare media, alla stessa altezza di V4. Arti: rosso braccio destro, giallo braccio sinistro, verde gamba sinistra, nero gamba destra.",
 enc:["ecg-basi"],gl:["Elettrocardiografo"],st:/ecg|torace|cuore/i,
 svg:`<svg viewBox="0 0 460 330" role="img" aria-label="Torace con la posizione degli elettrodi V1-V6 e degli arti">
 <path class="ff fl" d="M150 44Q230 28 310 44L350 74Q366 150 350 236Q320 272 230 276Q140 272 110 236Q94 150 110 74Z"/>
 <path class="fl" d="M150 56Q190 64 224 62M236 62Q270 64 310 56"/><rect class="fa fl" x="220" y="66" width="20" height="118" rx="6"/>
 <path class="fl dash" d="M112 148Q230 134 348 148M112 172Q230 158 348 172"/><path class="fl dash" d="M288 74V250M326 86V244M350 100V230"/>
 <g class="ft fsm"><text x="6" y="146">IV spazio intercostale</text><text x="6" y="176">V spazio intercostale</text><path class="lead" d="M120 143H150M120 171H150"/>
 <text x="262" y="292">emiclaveare</text><text x="300" y="306">ascellare anteriore</text><text x="340" y="320">ascellare media</text>
 <path class="lead" d="M288 252V282M326 246V296M350 232V310"/></g>
 <g class="fv-dot"><circle cx="210" cy="142" r="10"/><circle cx="250" cy="142" r="10"/><circle cx="269" cy="155" r="10"/><circle cx="288" cy="166" r="10"/><circle cx="326" cy="166" r="10"/><circle cx="350" cy="166" r="10"/></g>
 <g font-family="var(--f-mono)" font-size="9.5" font-weight="700" fill="#fff" text-anchor="middle"><text x="210" y="145.5">V1</text><text x="250" y="145.5">V2</text><text x="269" y="158.5">V3</text><text x="288" y="169.5">V4</text><text x="326" y="169.5">V5</text><text x="350" y="169.5">V6</text></g>
 <circle cx="90" cy="54" r="11" fill="#d93a32"/><circle cx="370" cy="54" r="11" fill="#e6b800"/><circle cx="150" cy="300" r="11" fill="#222" stroke="#999" stroke-width="1.5"/><circle cx="210" cy="300" r="11" fill="#2f9e44"/>
 <g class="ft fsm" text-anchor="middle"><text x="90" y="30">braccio destro</text><text x="370" y="30">braccio sinistro</text><text x="150" y="324">gamba dx</text><text x="214" y="324">gamba sx</text></g>
 <text class="ft fsm" x="6" y="20">Destra del paziente a sinistra dell'immagine</text></svg>`},
{id:"regola9",t:"Regola del 9 di Wallace (adulto)",c:"Stima della superficie corporea ustionata nell'adulto. Davanti: testa 4,5%, ogni arto superiore 4,5%, tronco 18%, ogni arto inferiore 9%, genitali 1%; dietro lo stesso, senza i genitali. Il palmo della mano del paziente vale circa 1%. Nei bambini si usa la tabella di Lund-Browder, perché la testa pesa di più.",
 enc:["ustioni"],gl:["Regola del 9 di Wallace"],st:/ustion|cute/i,
 svg:`<svg viewBox="0 0 420 300" role="img" aria-label="Sagome anteriore e posteriore con le percentuali della regola del 9">
 <g transform="translate(110 0)"><circle class="fa fl" cx="0" cy="36" r="20"/><rect class="fa fl" x="-34" y="60" width="68" height="96" rx="14"/><rect class="fa fl" x="-58" y="62" width="20" height="96" rx="9"/><rect class="fa fl" x="38" y="62" width="20" height="96" rx="9"/><rect class="fa fl" x="-32" y="160" width="28" height="118" rx="11"/><rect class="fa fl" x="4" y="160" width="28" height="118" rx="11"/></g><g transform="translate(310 0)"><circle class="fa fl" cx="0" cy="36" r="20"/><rect class="fa fl" x="-34" y="60" width="68" height="96" rx="14"/><rect class="fa fl" x="-58" y="62" width="20" height="96" rx="9"/><rect class="fa fl" x="38" y="62" width="20" height="96" rx="9"/><rect class="fa fl" x="-32" y="160" width="28" height="118" rx="11"/><rect class="fa fl" x="4" y="160" width="28" height="118" rx="11"/></g>
 <g class="ft" text-anchor="middle" font-weight="700"><text x="110" y="40">4,5</text><text x="110" y="112">18</text><text x="62" y="112" font-size="11">4,5</text><text x="158" y="112" font-size="11">4,5</text><text x="96" y="222">9</text><text x="124" y="222">9</text><rect x="102" y="152" width="16" height="12" rx="3" class="fv"/><text x="110" y="162" font-size="9" fill="#fff">1</text>
 <text x="310" y="40">4,5</text><text x="310" y="112">18</text><text x="262" y="112" font-size="11">4,5</text><text x="358" y="112" font-size="11">4,5</text><text x="296" y="222">9</text><text x="324" y="222">9</text></g>
 <g class="ft fsm" text-anchor="middle"><text x="110" y="296">Davanti</text><text x="310" y="296">Dietro</text></g></svg>`},
{id:"lpp",t:"Stadi delle lesioni da pressione (NPIAP/EPUAP)",c:"Stadio 1: eritema che non sbianca alla pressione, cute integra. Stadio 2: perdita parziale dello spessore con derma esposto (anche flittena). Stadio 3: perdita a tutto spessore della cute, adipe visibile. Stadio 4: perdita a tutto spessore dei tessuti con muscolo, tendine o osso esposti.",
 enc:["lesioni-pressione","medicazioni-avanzate","cute"],gl:["Scala di Braden","Scala di Norton","Escara","Slough"],st:/cute|lesion|scale/i,
 svg:`<svg viewBox="0 0 520 210" role="img" aria-label="Sezioni della cute nei quattro stadi delle lesioni da pressione">
 <g transform="translate(8 0)"><rect x="0" y="40" width="112" height="8" fill="#e3a98c"/><rect x="0" y="48" width="112" height="34" fill="#f3cdb7"/><rect x="0" y="82" width="112" height="40" fill="#f6e1a0"/><rect x="0" y="122" width="112" height="38" fill="#d77a70"/><path d="M0 160H112V176Q56 168 0 176Z" fill="#ece5d3"/></g><g transform="translate(136 0)"><rect x="0" y="40" width="112" height="8" fill="#e3a98c"/><rect x="0" y="48" width="112" height="34" fill="#f3cdb7"/><rect x="0" y="82" width="112" height="40" fill="#f6e1a0"/><rect x="0" y="122" width="112" height="38" fill="#d77a70"/><path d="M0 160H112V176Q56 168 0 176Z" fill="#ece5d3"/></g><g transform="translate(264 0)"><rect x="0" y="40" width="112" height="8" fill="#e3a98c"/><rect x="0" y="48" width="112" height="34" fill="#f3cdb7"/><rect x="0" y="82" width="112" height="40" fill="#f6e1a0"/><rect x="0" y="122" width="112" height="38" fill="#d77a70"/><path d="M0 160H112V176Q56 168 0 176Z" fill="#ece5d3"/></g><g transform="translate(392 0)"><rect x="0" y="40" width="112" height="8" fill="#e3a98c"/><rect x="0" y="48" width="112" height="34" fill="#f3cdb7"/><rect x="0" y="82" width="112" height="40" fill="#f6e1a0"/><rect x="0" y="122" width="112" height="38" fill="#d77a70"/><path d="M0 160H112V176Q56 168 0 176Z" fill="#ece5d3"/></g>
 <ellipse cx="64" cy="40" rx="30" ry="5" fill="#c0392b" opacity=".75"/>
 <path d="M164 40Q192 66 220 40Z" fill="#fff7f6" stroke="#b5655a"/>
 <path d="M286 40Q320 108 354 40Z" fill="#fff7f6" stroke="#b5655a"/>
 <path d="M412 40Q448 190 484 40Z" fill="#fff7f6" stroke="#b5655a"/>
 <g class="ft" text-anchor="middle" font-weight="700"><text x="64" y="26">Stadio 1</text><text x="192" y="26">Stadio 2</text><text x="320" y="26">Stadio 3</text><text x="448" y="26">Stadio 4</text></g>
 <g class="ft fsm"><text x="8" y="196">epidermide · derma · ipoderma · muscolo · osso (dall'alto in basso)</text></g></svg>`},
{id:"iniezioni",t:"Angoli delle iniezioni",c:"Intradermica 10-15° (appena sotto l'epidermide, es. Mantoux); sottocutanea 45-90° nel tessuto adiposo (eparine, insulina); intramuscolare 90° fino al muscolo (sede preferita nell'adulto: ventrogluteo).",
 enc:["vie-somministrazione"],gl:[],st:/terapia|farmac/i,
 svg:`<svg viewBox="0 0 420 210" role="img" aria-label="Aghi per iniezione intradermica, sottocutanea e intramuscolare">
 <rect x="0" y="60" width="420" height="10" fill="#e3a98c"/><rect x="0" y="70" width="420" height="22" fill="#f3cdb7"/><rect x="0" y="92" width="420" height="46" fill="#f6e1a0"/><rect x="0" y="138" width="420" height="60" fill="#d77a70"/>
 <g class="ft fsm"><text x="6" y="56">epidermide</text><text x="6" y="86">derma</text><text x="6" y="120">sottocute</text><text x="6" y="176">muscolo</text></g>
 <g stroke-linecap="round"><path d="M70 30L128 74" stroke="#7a8a90" stroke-width="3"/><path d="M200 22L250 112" stroke="#7a8a90" stroke-width="3"/><path d="M340 14V170" stroke="#7a8a90" stroke-width="3"/></g>
 <g fill="var(--scrub)"><rect x="54" y="18" width="24" height="12" rx="3" transform="rotate(37 66 24)"/><rect x="186" y="8" width="24" height="12" rx="3" transform="rotate(60 198 14)"/><rect x="328" y="2" width="24" height="12" rx="3"/></g>
 <g class="ft" font-weight="700"><text x="96" y="206" text-anchor="middle">ID 10-15°</text><text x="226" y="206" text-anchor="middle">SC 45-90°</text><text x="340" y="206" text-anchor="middle">IM 90°</text></g></svg>`},
{id:"addome",t:"Le nove regioni dell'addome",c:"Due linee orizzontali (sottocostale e bisiliaca) e due verticali (emiclaveari) dividono l'addome in nove regioni, utili per descrivere sede e irradiazione del dolore. Il punto di McBurney (appendicite) si trova a un terzo della linea tra spina iliaca anteriore superiore destra e ombelico.",
 enc:["esame-addome","addome-acuto","apparato-digerente"],gl:[],st:/addome/i,
 svg:`<svg viewBox="0 0 400 300" role="img" aria-label="Addome diviso in nove regioni">
 <path class="ff fl" d="M80 30Q200 10 320 30L330 230Q300 290 200 292Q100 290 70 230Z"/>
 <path class="fl dash" d="M70 104H330M72 190H328M150 26V290M250 26V290"/>
 <g class="ft fsm" text-anchor="middle"><text x="110" y="70">Ipocondrio</text><text x="110" y="84">destro</text><text x="200" y="76">Epigastrio</text><text x="290" y="70">Ipocondrio</text><text x="290" y="84">sinistro</text>
 <text x="110" y="150">Fianco</text><text x="110" y="164">destro</text><text x="200" y="138">Regione</text><text x="200" y="152">ombelicale</text><text x="290" y="150">Fianco</text><text x="290" y="164">sinistro</text>
 <text x="110" y="232">Fossa iliaca</text><text x="110" y="246">destra</text><text x="200" y="240">Ipogastrio</text><text x="290" y="232">Fossa iliaca</text><text x="290" y="246">sinistra</text></g>
 <circle cx="200" cy="168" r="4" class="fl ff"/><circle cx="128" cy="210" r="6" class="fv"/><path class="lead" d="M134 214L170 262"/><text class="ft fsm" x="150" y="276">McBurney</text>
 <text class="ft fsm" x="8" y="296">Destra del paziente a sinistra</text></svg>`},
{id:"maslow",t:"Piramide dei bisogni di Maslow",c:"Si soddisfano prima i bisogni alla base: per questo, nello stabilire le priorità assistenziali, vie aeree, respiro e circolo vengono prima di sicurezza, relazione e autostima.",
 enc:["teorie-infermieristiche","bisogni-henderson","processo-nursing"],gl:["Abraham Maslow"],st:/processo|diagnosi più|definizione/i,
 svg:`<svg viewBox="0 0 420 260" role="img" aria-label="Piramide di Maslow a cinque livelli">
 <path d="M210 14L246 66H174Z" class="mz" style="--o:.95"/><path d="M174 70H246L282 118H138Z" class="mz" style="--o:.78"/><path d="M138 122H282L318 170H102Z" class="mz" style="--o:.6"/><path d="M102 174H318L354 222H66Z" class="mz" style="--o:.42"/><path d="M66 226H354L366 244H54Z" class="mz" style="--o:.28"/>
 <g class="ft" text-anchor="middle" font-size="12" font-weight="700"><text x="210" y="56" fill="#fff">Auto-</text><text x="210" y="100">Stima</text><text x="210" y="152">Appartenenza e affetto</text><text x="210" y="204">Sicurezza</text><text x="210" y="240" font-size="11">Bisogni fisiologici: respiro, cibo, acqua, sonno, eliminazione</text></g>
 <text class="ft fsm" x="290" y="40">realizzazione</text><path class="lead" d="M288 36L236 46"/></svg>`},
{id:"evidenze",t:"Piramide delle prove scientifiche",c:"Più si sale, più lo studio è solido contro gli errori sistematici. In cima le revisioni sistematiche e le meta-analisi di studi randomizzati; alla base l'opinione degli esperti.",
 enc:["livelli-evidenza","ebn","studi"],gl:["Archibald Cochrane"],st:/evidence|ebn|ricerca/i,
 svg:`<svg viewBox="0 0 620 250" role="img" aria-label="Piramide delle prove">
 <path d="M210 10L238 48H182Z" class="mz" style="--o:.95"/><path d="M182 52H238L266 90H154Z" class="mz" style="--o:.8"/><path d="M154 94H266L294 132H126Z" class="mz" style="--o:.65"/><path d="M126 136H294L322 174H98Z" class="mz" style="--o:.5"/><path d="M98 178H322L350 216H70Z" class="mz" style="--o:.36"/><path d="M70 220H350L362 238H58Z" class="mz" style="--o:.22"/>
 <g class="ft" font-size="12" font-weight="700"><text x="250" y="34">Revisioni sistematiche e meta-analisi</text><text x="272" y="76">Studi randomizzati controllati</text><text x="300" y="118">Studi di coorte</text><text x="328" y="160">Studi caso-controllo</text><text x="356" y="200" font-size="11">Serie di casi</text></g>
 <text class="ft" x="210" y="234" text-anchor="middle" font-size="11" font-weight="700">Opinione di esperti</text></svg>`},
{id:"scala-oms",t:"Scala analgesica dell'OMS",c:"Si sale di gradino se il dolore persiste o aumenta. A ogni gradino si possono associare farmaci adiuvanti; nel dolore cronico i farmaci si danno a orari fissi, con dosi di soccorso per il dolore episodico.",
 enc:["dolore","oppioidi","cure-palliative"],gl:["NRS","VAS"],st:/dolore/i,
 svg:`<svg viewBox="0 0 420 240" role="img" aria-label="Scala a tre gradini dell'OMS">
 <path d="M20 220H150V160H270V100H400V220Z" class="fa fl"/><path d="M150 220V160M270 220V100" class="fl"/>
 <g class="ft" font-weight="700" text-anchor="middle"><text x="85" y="186">1</text><text x="210" y="134">2</text><text x="335" y="74">3</text></g>
 <g class="ft fsm" text-anchor="middle"><text x="85" y="202">Lieve (NRS 1-3)</text><text x="85" y="150">Non oppioidi</text><text x="85" y="164">± adiuvanti</text>
 <text x="210" y="150">Moderato (4-6)</text><text x="210" y="90">Oppioidi deboli</text><text x="210" y="104">± non oppioidi</text>
 <text x="335" y="92">Grave (7-10)</text><text x="335" y="30">Oppioidi forti</text><text x="335" y="44">± non oppioidi</text></g></svg>`},
{id:"contagio",t:"Catena del contagio",c:"Un'infezione si trasmette solo se tutti gli anelli sono presenti: basta interromperne uno. L'igiene delle mani agisce sulla modalità di trasmissione, i DPI sulle porte di uscita e di ingresso, la vaccinazione sull'ospite suscettibile.",
 enc:["ica","precauzioni","igiene-mani"],gl:[],st:/infezion|igiene|sicurezza/i,
 svg:`<svg viewBox="0 0 420 300" role="img" aria-label="Sei anelli della catena del contagio">
 <circle cx="210" cy="150" r="96" class="fl dash" fill="none"/>
 <g class="chain"><circle cx="210" cy="54" r="38"/><circle cx="293" cy="102" r="38"/><circle cx="293" cy="198" r="38"/><circle cx="210" cy="246" r="38"/><circle cx="127" cy="198" r="38"/><circle cx="127" cy="102" r="38"/></g>
 <g class="ft" text-anchor="middle" font-size="11" font-weight="700"><text x="210" y="52">Agente</text><text x="210" y="65">infettivo</text><text x="293" y="106">Serbatoio</text><text x="293" y="196">Porta di</text><text x="293" y="209">uscita</text><text x="210" y="243">Modalità di</text><text x="210" y="256">trasmissione</text><text x="127" y="196">Porta di</text><text x="127" y="209">ingresso</text><text x="127" y="100">Ospite</text><text x="127" y="113">suscettibile</text></g>
 <g class="ft fsm" text-anchor="middle" fill="var(--scrub)"><text x="210" y="146">Igiene delle mani,</text><text x="210" y="160">DPI, vaccini</text></g></svg>`},
{id:"start",t:"Triage START nella maxiemergenza",c:"Meno di un minuto per vittima. Durante il triage si fanno solo manovre salvavita rapide: apertura delle vie aeree, controllo di un'emorragia massiva, posizione laterale di sicurezza. Il triage si ripete al Posto medico avanzato.",
 enc:["maxiemergenza","triage"],gl:["Triage START","JumpSTART"],st:/abcde|triage/i,
 svg:`<svg viewBox="0 0 440 330" role="img" aria-label="Diagramma di flusso del triage START">
 <g class="box"><rect x="150" y="6" width="140" height="30" rx="8"/><rect x="150" y="62" width="140" height="30" rx="8"/><rect x="150" y="128" width="140" height="30" rx="8"/><rect x="150" y="194" width="140" height="30" rx="8"/><rect x="150" y="260" width="140" height="30" rx="8"/></g>
 <g class="ft" text-anchor="middle" font-size="11.5" font-weight="700"><text x="220" y="25">Cammina?</text><text x="220" y="81">Respira?</text><text x="220" y="147">FR &gt; 30?</text><text x="220" y="213">Polso radiale / refill</text><text x="220" y="279">Esegue ordini semplici?</text></g>
 <g class="fl" fill="none"><path d="M220 36V62M220 92V128M220 158V194M220 224V260"/><path d="M290 21H330M150 77H110M290 143H330M150 209H110M290 275H330M220 290V310"/></g>
 <g font-size="11" font-weight="700" text-anchor="middle"><rect x="330" y="8" width="94" height="26" rx="6" fill="#2f9e44"/><text x="377" y="25" fill="#fff">sì → VERDE</text>
 <rect x="10" y="64" width="100" height="26" rx="6" fill="#222"/><text x="60" y="76" fill="#fff" font-size="9.5">no, anche dopo</text><text x="60" y="87" fill="#fff" font-size="9.5">apertura → NERO</text>
 <rect x="330" y="130" width="94" height="26" rx="6" fill="#d93a32"/><text x="377" y="147" fill="#fff">sì → ROSSO</text>
 <rect x="4" y="196" width="106" height="26" rx="6" fill="#d93a32"/><text x="57" y="208" fill="#fff" font-size="9.5">assente o &gt; 2 s</text><text x="57" y="219" fill="#fff" font-size="9.5">→ ROSSO</text>
 <rect x="330" y="262" width="94" height="26" rx="6" fill="#d93a32"/><text x="377" y="279" fill="#fff">no → ROSSO</text>
 <rect x="170" y="306" width="100" height="22" rx="6" fill="#e6b800"/><text x="220" y="321" fill="#222">sì → GIALLO</text></g>
 <g class="ft fsm"><text x="232" y="112">sì</text><text x="232" y="178">no</text><text x="232" y="244">presente, ≤ 2 s</text></g></svg>`}
];
