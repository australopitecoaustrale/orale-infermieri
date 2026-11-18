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
 <defs><pattern id="fg1" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0V8H0" class="gp1"/></pattern><pattern id="fg5" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="url(#fg1)"/><path d="M40 0V40H0" class="gp5"/></pattern></defs>
 <rect x=".5" y=".5" width="419" height="209" rx="8" class="pap"/><rect x="0" y="0" width="420" height="210" rx="8" fill="url(#fg5)"/>
 <path d="M10 140H64Q80 118 96 140H120L126 150L138 44L150 162L158 140H196Q228 98 262 140H286Q296 130 306 140H410" class="etr" style="stroke-width:2.4"/>
 <g class="fx" style="stroke-width:4.2;stroke-linecap:round;stroke-linejoin:round"><path class="ans" d="M64 140Q80 118 96 140"/><path class="ans s2" d="M120 140L126 150L138 44L150 162L158 140"/><path class="ans s3" d="M196 140Q228 98 262 140"/></g>
 <g class="emt" style="font-family:var(--f-body)" font-size="12" font-weight="700" text-anchor="end"><text class="ans" x="408" y="196">P: si attivano gli atri</text><text class="ans s2" x="408" y="196">QRS: si attivano i ventricoli</text><text class="ans s3" x="408" y="196">T: i ventricoli si ricaricano</text></g>
 <g class="elab" style="font-family:var(--f-mono)" font-size="13" font-weight="700"><text x="74" y="112">P</text><text x="122" y="40">R</text><text x="112" y="164">Q</text><text x="161" y="167">S</text><text x="224" y="94">T</text><text x="292" y="124">U</text></g>
 <g class="emk" stroke-width="1.6"><path d="M64 190V196M120 190V196M64 193H120"/><path d="M120 172V178M158 172V178M120 175H158"/><path d="M120 18V24M262 18V24M120 21H262"/><path d="M158 128H196" stroke-dasharray="3 3"/></g>
 <g class="emt" style="font-family:var(--f-body)" font-size="12" font-weight="700"><text x="70" y="208">PR 0,12-0,20 s</text><text x="164" y="179">QRS &lt; 0,12 s</text><text x="160" y="15">QT</text><text x="160" y="124" font-size="10">ST</text></g></svg>`},
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
{id:"vent-pressione",t:"Curva pressione-tempo: picco, plateau, PEEP",c:"Primo sguardo: la pressione. La linea di base è la PEEP. Il picco si legge durante il flusso; il plateau compare solo con una pausa a fine inspirazione, a flusso zero. La distanza picco − plateau dipende dalle resistenze (secrezioni, broncospasmo, tubo); la distanza plateau − PEEP è la driving pressure e dipende da quanto è rigido il polmone.",
 enc:["curve-ventilatore","ventilazione","monitoraggio-avanzato"],gl:["Pressione di plateau","Driving pressure","PEEP"],st:/ventila/i,
 svg:`<svg viewBox="0 0 440 226" role="img" aria-label="Curva pressione-tempo di un atto in ventilazione volumetrica con pausa inspiratoria: pressione di picco, plateau e PEEP">
 <path class="lead" d="M40 20V200H300"/>
 <path class="dash" fill="none" d="M40 170H312M150 45H312M240 100H312"/>
 <path class="fl" stroke-width="2.4" style="stroke-width:2.4" d="M40 170H70L150 45L160 100H240C255 160 268 170 290 170H300"/><circle class="fv anm" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M40 170H70L150 45L160 100H240C255 160 268 170 290 170H300"/></circle>
 <circle class="fv" cx="150" cy="45" r="4.5"/><circle class="fv" cx="200" cy="100" r="4.5"/>
 <path class="fx" d="M312 45V100M306 45H318M306 100H318"/><path class="fs" d="M312 104V170M306 104H318M306 170H318"/>
 <g class="ft" font-weight="700"><text x="150" y="34" text-anchor="middle">Ppicco</text><text x="200" y="90" text-anchor="middle">Pplateau</text><text x="46" y="186">PEEP</text>
 <text x="324" y="68">picco − plateau</text><text x="324" y="132">plateau − PEEP</text></g>
 <g class="ft fsm"><text x="200" y="120" text-anchor="middle">pausa inspiratoria</text><text x="324" y="83">= resistenze</text><text x="324" y="147">= driving pressure</text><text x="44" y="14">cmH₂O</text><text x="262" y="215">tempo</text></g></svg>`},
{id:"vent-flusso",t:"Curva flusso-tempo: l'espirazione torna a zero?",c:"Secondo sguardo: il flusso. Sopra lo zero l'aria entra, sotto esce. A sinistra l'espirazione si esaurisce e la curva torna a zero prima dell'atto successivo. A destra l'atto successivo parte quando l'aria sta ancora uscendo: resta intrappolata (auto-PEEP). Serve più tempo per espirare.",
 enc:["curve-ventilatore","ventilazione"],gl:["Auto-PEEP"],st:/ventila/i,
 svg:`<svg viewBox="0 0 440 214" role="img" aria-label="Due curve flusso-tempo: a sinistra il flusso espiratorio torna a zero, a destra no (intrappolamento d'aria)">
 <path class="dash" fill="none" d="M20 112H210M232 112H420"/>
 <path class="fl" style="stroke-width:2.4" d="M24 112H38V64H74V170C84 130 100 113 124 112H140V64H176V170C186 130 198 115 208 113"/><circle class="fv anm" r="5"><animateMotion dur="6s" repeatCount="indefinite" path="M24 112H38V64H74V170C84 130 100 113 124 112H140V64H176V170C186 130 198 115 208 113"/></circle>
 <path class="fl" style="stroke-width:2.4" d="M234 112H248V64H284V170C292 152 302 140 318 134V64H354V170C362 152 372 140 388 134V64H414"/><circle class="fv anm" r="5"><animateMotion dur="6s" repeatCount="indefinite" path="M234 112H248V64H284V170C292 152 302 140 318 134V64H354V170C362 152 372 140 388 134V64H414"/></circle>
 <g class="fx"><circle cx="318" cy="134" r="7"/><circle cx="388" cy="134" r="7"/></g>
 <g class="ft" font-weight="700" text-anchor="middle"><text x="115" y="22">Normale</text><text x="326" y="22">Intrappolamento d'aria</text></g>
 <g class="ft fsm" text-anchor="middle"><text x="115" y="37">torna a zero</text><text x="326" y="37">non torna a zero</text><text x="56" y="56">inspirazione</text><text x="104" y="190">espirazione</text><text x="14" y="116">0</text><text x="226" y="116">0</text></g></svg>`},
{id:"vent-volume",t:"Curva volume-tempo: il volume rientra tutto?",c:"Terzo sguardo: il volume. Sale in inspirazione e deve ridiscendere fino alla linea di base. Se la discesa si interrompe prima e la curva viene riportata a zero di scatto, una parte del volume inspirato non è tornata al ventilatore: è una perdita. Si cerca dalla cuffia al circuito e si confrontano volume inspirato ed espirato.",
 enc:["curve-ventilatore","ventilazione"],gl:[],st:/ventila/i,
 svg:`<svg viewBox="0 0 440 214" role="img" aria-label="Due curve volume-tempo: a sinistra il volume torna alla linea di base, a destra la discesa è incompleta (perdita)">
 <path class="lead" d="M20 176H210M232 176H420"/>
 <path class="fl" style="stroke-width:2.4" d="M24 176H40C52 112 64 74 80 72C92 124 104 172 124 176H140C152 112 164 74 180 72C192 124 200 164 208 172"/><circle class="fv anm" r="5"><animateMotion dur="6s" repeatCount="indefinite" path="M24 176H40C52 112 64 74 80 72C92 124 104 172 124 176H140C152 112 164 74 180 72C192 124 200 164 208 172"/></circle>
 <path class="fl" style="stroke-width:2.4" d="M234 176H250C262 112 274 74 290 72C300 114 310 140 326 144M326 176C338 112 350 74 366 72C376 114 386 140 402 144M402 176H416"/><circle class="fv anm" r="5"><animateMotion dur="6s" repeatCount="indefinite" path="M234 176H250C262 112 274 74 290 72C300 114 310 140 326 144M326 176C338 112 350 74 366 72C376 114 386 140 402 144M402 176H416"/></circle>
 <path class="fx" style="stroke-width:3.2" d="M326 144V176M402 144V176"/>
 <g class="ft" font-weight="700" text-anchor="middle"><text x="115" y="22">Normale</text><text x="326" y="22">Perdita</text></g>
 <g class="ft fsm" text-anchor="middle"><text x="115" y="37">torna alla linea di base</text><text x="326" y="37">la discesa è incompleta</text><text x="326" y="196">volume che non rientra</text></g></svg>`},
{id:"ecg-quadri",t:"Quattro quadri ECG che non vanno mancati",c:"De Winter: ST sottoslivellato che risale in un'onda T alta, equivalente di infarto. Wellens: onde T profondamente invertite in V2-V3 a dolore passato, stenosi critica dell'interventricolare anteriore. Onda epsilon: piccole oscillazioni alla fine del QRS, cardiomiopatia aritmogena del ventricolo destro. Alternanza elettrica: QRS alti e bassi a battiti alterni, tamponamento cardiaco.",
 enc:["ecg-quadri-tipici","stemi"],gl:["Pattern di De Winter","Pattern di Wellens","Onda epsilon","Alternanza elettrica"],st:/ecg|cuore|torace/i,
 svg:`<svg viewBox="0 0 440 292" role="img" aria-label="Quattro tracciati ECG schematici: pattern di De Winter, pattern di Wellens, onda epsilon, alternanza elettrica">
 <defs><pattern id="fq1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fq5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fq1)"/><path d="M20 0V20H0" class="gp5"/></pattern><clipPath id="fqc"><rect x="8" y="34" width="206" height="96"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect><rect x="228" y="34" width="206" height="96"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect><rect x="8" y="184" width="206" height="78"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect><rect x="228" y="184" width="206" height="78"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect></clipPath></defs><rect x="8" y="34" width="206" height="96" rx="6" class="pap"/><rect x="8" y="34" width="206" height="96" rx="6" fill="url(#fq5)"/><rect x="228" y="34" width="206" height="96" rx="6" class="pap"/><rect x="228" y="34" width="206" height="96" rx="6" fill="url(#fq5)"/><rect x="8" y="184" width="206" height="78" rx="6" class="pap"/><rect x="8" y="184" width="206" height="78" rx="6" fill="url(#fq5)"/><rect x="228" y="184" width="206" height="78" rx="6" class="pap"/><rect x="228" y="184" width="206" height="78" rx="6" fill="url(#fq5)"/>
 <g clip-path="url(#fqc)"><path class="etr" d="M14 90h6h10q6 -8 12 0h8l3 4l5 -44l5 52q14 -4 22 -52q10 50 26 40h10q6 -8 12 0h8l3 4l5 -44l5 52q14 -4 22 -52q10 50 26 40"/>
 <path class="etr" d="M234 90h4h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4h10q10 2 16 32q6 -30 16 -32h4h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4h10q10 2 16 32q6 -30 16 -32h4"/>
 <path class="etr" d="M12 240h4h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4l2 -6l2 6l2 -5l2 5h12q10 12 20 0h8h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4l2 -6l2 6l2 -5l2 5h12q10 12 20 0h8"/>
 <path class="etr" d="M236 240h8q5 -7 10 0h6l3 4l4 -54l4 54l3 -4h8q9 -12 18 0h8q5 -7 10 0h6l3 4l4 -28l4 28l3 -4h8q9 -12 18 0h8q5 -7 10 0h6l3 4l4 -54l4 54l3 -4h8q9 -12 18 0"/>
 <g class="fx anp" style="stroke-width:2.8;stroke-linecap:round"><path d="M63 102q14 -4 22 -52M154 102q14 -4 22 -52"/><path d="M294 90q10 2 16 32q6 -30 16 -32M386 90q10 2 16 32q6 -30 16 -32"/><path d="M62 240l2 -6l2 6l2 -5l2 5M156 240l2 -6l2 6l2 -5l2 5"/><path style="stroke-width:1.4;stroke-dasharray:4 3" d="M267 186L331 212L395 186"/></g></g>
 <g class="ft" font-weight="700"><text x="14" y="24">Pattern di De Winter</text><text x="234" y="24">Pattern di Wellens</text><text x="14" y="176">Onda epsilon</text><text x="234" y="176">Alternanza elettrica</text></g>
 <g class="ft fsm"><text x="14" y="146">occlusione coronarica acuta (IVA)</text><text x="234" y="146">stenosi critica dell'IVA prossimale</text><text x="14" y="282">cardiomiopatia aritmogena (ARVC)</text><text x="234" y="282">tamponamento cardiaco</text></g></svg>`},
{id:"ecg-wellens",t:"Sindrome di Wellens: T che rassicurano, arteria che no",c:"Tre passi evidenziati a turno. Tipo B: onda T profondamente invertita e simmetrica in V2-V3. Tipo A: onda T bifasica, prima positiva e poi negativa. Il quadro si vede a dolore passato, con ST quasi piatto, senza onde Q e con troponina normale o poco alta: indica una stenosi critica dell'arteria interventricolare anteriore prossimale. Si tratta come una sindrome coronarica acuta; il test da sforzo è controindicato.",
 enc:["ecg-wellens","ecg-quadri-tipici","stemi"],gl:["Pattern di Wellens"],st:/ecg|wellens|torace|coronar/i,
 svg:`<svg viewBox="0 0 440 330" role="img" aria-label="Sindrome di Wellens: due forme dell'onda T in V2-V3 (bifasica e profondamente invertita), criteri di riconoscimento e comportamento da tenere">
 <defs><pattern id="fw1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fw5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fw1)"/><path d="M20 0V20H0" class="gp5"/></pattern></defs>
<rect x="8" y="4" width="424" height="84" rx="10" class="eyrow"/><rect x="8" y="4" width="424" height="84" rx="10" class="fx ans" fill="none" style="stroke-width:2.6"/>
<g class="ft"><text x="20" y="28" font-weight="700" style="font-size:10.5px">1 · Tipo B (circa 75%)</text><text class="fsm" x="20" y="43" style="font-size:9.6px">onda T profondamente</text><text class="fsm" x="20" y="56" style="font-size:9.6px">invertita e simmetrica</text><text class="fsm" x="20" y="72" style="font-size:9.6px;font-weight:700">V2-V3, dolore già passato</text></g>
<rect x="150" y="14" width="274" height="64" rx="6" style="fill:var(--ecg-bg);stroke:var(--ecg-edge)"/><rect x="150" y="14" width="274" height="64" rx="6" fill="url(#fw5)"/>
<path d="M158 42 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 c4 22 12 22 16 0 h12 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 c4 22 12 22 16 0 h12 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 c4 22 12 22 16 0 h12 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 c4 22 12 22 16 0 h12" class="etr" style="stroke-width:1.7"/>
<text class="ft fsm" x="418" y="28" text-anchor="end" style="font-size:9.6px">V2</text>
<rect x="8" y="96" width="424" height="84" rx="10" class="eyrow"/><rect x="8" y="96" width="424" height="84" rx="10" class="fx ans s2" fill="none" style="stroke-width:2.6"/>
<g class="ft"><text x="20" y="120" font-weight="700" style="font-size:10.5px">2 · Tipo A (circa 25%)</text><text class="fsm" x="20" y="135" style="font-size:9.6px">onda T bifasica: prima</text><text class="fsm" x="20" y="148" style="font-size:9.6px">positiva, poi negativa</text><text class="fsm" x="20" y="164" style="font-size:9.6px;font-weight:700">V2-V3, dolore già passato</text></g>
<rect x="150" y="106" width="274" height="64" rx="6" style="fill:var(--ecg-bg);stroke:var(--ecg-edge)"/><rect x="150" y="106" width="274" height="64" rx="6" fill="url(#fw5)"/>
<path d="M158 134 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 q4 -10 8 -4 q6 30 14 4 h10 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 q4 -10 8 -4 q6 30 14 4 h10 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 q4 -10 8 -4 q6 30 14 4 h10 h4 q3 -5 6 0 h4 l2 2 l3 -9 l4 20 l3 -13 h6 q4 -10 8 -4 q6 30 14 4 h10" class="etr" style="stroke-width:1.7"/>
<text class="ft fsm" x="418" y="120" text-anchor="end" style="font-size:9.6px">V2</text>
<rect x="8" y="188" width="424" height="138" rx="10" class="eyrow"/><rect x="8" y="188" width="424" height="138" rx="10" class="fx ans s3" fill="none" style="stroke-width:2.6"/>
<g class="ft"><text x="20" y="210" font-weight="700" style="font-size:10.5px">3 · Criteri (tutti insieme)</text><text x="228" y="210" font-weight="700" style="font-size:10.5px">Che fare</text></g>
<g class="ft fsm" style="font-size:9.6px"><text x="30" y="230">ST piatto o sopra di meno di 1 mm</text><text x="30" y="250">nessuna onda Q, R conservate</text><text x="30" y="270">nessun dolore al momento dell'ECG</text><text x="30" y="290">troponina normale o poco alta</text></g>
<circle cx="23" cy="227" r="2.6" fill="#2f8f8a"/><circle cx="23" cy="247" r="2.6" fill="#2f8f8a"/><circle cx="23" cy="267" r="2.6" fill="#2f8f8a"/><circle cx="23" cy="287" r="2.6" fill="#2f8f8a"/>
<g class="ft fsm" style="font-size:9.6px"><text x="240" y="230">trattala come sindrome coronarica acuta</text><text x="240" y="250">chiama subito il cardiologo</text><text x="240" y="270">coronarografia precoce</text><text x="240" y="290" fill="#c0392b" font-weight="700">MAI test da sforzo</text></g>
<circle cx="233" cy="227" r="2.6" fill="#2f8f8a"/><circle cx="233" cy="247" r="2.6" fill="#2f8f8a"/><circle cx="233" cy="267" r="2.6" fill="#2f8f8a"/><circle cx="233" cy="287" r="2.6" fill="#c0392b"/>
<text class="ft fsm" x="20" y="314" style="font-size:9.6px">Stenosi critica dell'IVA prossimale: il tracciato rassicura, l'arteria no.</text>
 </svg>`},
{id:"ecg-elettroliti",t:"Potassio, calcio e magnesio sull'ECG",c:"Potassio basso: onda T piatta, ST sottoslivellato, onda U. Potassio alto: onda T alta e appuntita, onda P piatta; se molto alto QRS largo fino al tracciato sinusoidale e all'arresto. Calcio basso: QT lungo per allungamento del tratto ST; calcio alto: QT corto. Magnesio basso: QT lungo e T piatta, con rischio di torsione di punta; magnesio alto: PR lungo e QRS largo, fino al blocco.",
 enc:["elettroliti-ecg","elettroliti"],gl:[],st:/ecg|elettrolit|potass/i,
 svg:`<svg viewBox="0 0 524 300" role="img" aria-label="Otto battiti ECG schematici: normale e alterazioni da potassio, calcio e magnesio">
 <defs><pattern id="fe1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fe5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fe1)"/><path d="M20 0V20H0" class="gp5"/></pattern><clipPath id="fec"><rect x="8" y="40" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="136" y="40" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="264" y="40" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="392" y="40" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="8" y="190" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="136" y="190" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="264" y="190" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect><rect x="392" y="190" width="120" height="76"><animate attributeName="width" values="0;120;120" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/></rect></clipPath></defs><rect x="8" y="40" width="120" height="76" rx="6" class="pap"/><rect x="8" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="136" y="40" width="120" height="76" rx="6" class="pap"/><rect x="136" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="264" y="40" width="120" height="76" rx="6" class="pap"/><rect x="264" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="392" y="40" width="120" height="76" rx="6" class="pap"/><rect x="392" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="8" y="190" width="120" height="76" rx="6" class="pap"/><rect x="8" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="136" y="190" width="120" height="76" rx="6" class="pap"/><rect x="136" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="264" y="190" width="120" height="76" rx="6" class="pap"/><rect x="264" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="392" y="190" width="120" height="76" rx="6" class="pap"/><rect x="392" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/>
 <g clip-path="url(#fec)"><path class="etr" style="stroke-width:1.7" d="M12 96h10q7 -9 14 0h8l3 4l4 -46l4 50l3 -8h10q12 -18 24 0h20M140 96h10q7 -9 14 0h8l3 4l4 -46l4 50l3 -4q14 1 24 -4q6 -12 12 0h18M268 96h8q7 -3 14 0h12l3 4l4 -46l4 50l3 -8h6q8 -4 11 -44q3 40 11 44h20M396 96h12c8 -64 14 -64 22 0c8 34 14 34 22 0c10 -40 16 -40 28 0h16M12 246h8q7 -9 14 0h8l3 4l4 -46l4 50l3 -8h30q10 -16 20 0h6M140 246h10q7 -9 14 0h8l3 4l4 -46l4 50l3 -8q9 -18 18 0h36M268 246h8q7 -9 14 0h8l3 4l4 -46l4 50l3 -8h20q12 -7 24 0h12M396 246h6q7 -9 14 0h20l5 4l7 -46l7 50l5 -8h5q10 -14 20 0h5"/>
 <path class="fx anp" style="stroke-width:2.8;stroke-linecap:round" d="M186.0 100.0q14 1 24 -4q6 -12 12 0M276.0 96q7 -3 14 0M322.0 96.0q8 -4 11 -44q3 40 11 44M408.0 96c8 -64 14 -64 22 0c8 34 14 34 22 0c10 -40 16 -40 28 0M56.0 246.0h30M186.0 246.0q9 -18 18 0M312.0 246.0h20q12 -7 24 0M416.0 246.0h20M436.0 246.0l5 4l7 -46l7 50l5 -8"/></g>
 <g class="ft" font-weight="700"><text x="8" y="32">Normale</text><text x="136" y="32">K⁺ basso</text><text x="264" y="32">K⁺ alto</text><text x="392" y="32">K⁺ molto alto</text><text x="8" y="182">Ca²⁺ basso</text><text x="136" y="182">Ca²⁺ alto</text><text x="264" y="182">Mg²⁺ basso</text><text x="392" y="182">Mg²⁺ alto</text></g>
 <g class="ft fsm"><text x="8" y="132">battito di riferimento</text><text x="136" y="132">T piatta, ST giù, onda U</text><text x="264" y="132">T a tenda, P piatta</text><text x="392" y="132">QRS largo, sinusoide</text><text x="8" y="282">QT lungo (ST lungo)</text><text x="136" y="282">QT corto</text><text x="264" y="282">QT lungo, T piatta</text><text x="392" y="282">PR lungo, QRS largo</text></g></svg>`},
{id:"ecg-sgarbossa",t:"Criteri di Sgarbossa: l'infarto dietro il blocco di branca sinistra",c:"Nel blocco di branca sinistra il tratto ST e l'onda T vanno dalla parte opposta al QRS (discordanza attesa). Fanno sospettare un infarto: ST sopraslivellato nella stessa direzione di un QRS positivo; ST sottoslivellato in V1-V3, dove il QRS è negativo; ST sopraslivellato opposto al QRS ma troppo alto (almeno 5 mm, oppure almeno un quarto della profondità dell'onda S secondo Smith).",
 enc:["ecg-sgarbossa","ecg-blocchi-branca"],gl:["Criteri di Sgarbossa","Discordanza appropriata"],st:/ecg|infarto|blocco/i,
 svg:`<svg viewBox="0 0 442 312" role="img" aria-label="Quattro tracciati schematici con blocco di branca sinistra: discordanza attesa e i tre criteri di Sgarbossa">
 <defs><pattern id="fs1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fs5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fs1)"/><path d="M20 0V20H0" class="gp5"/></pattern><clipPath id="fsc"><rect x="8" y="34" width="206" height="96"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect><rect x="228" y="34" width="206" height="96"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect><rect x="8" y="190" width="206" height="96"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect><rect x="228" y="190" width="206" height="96"><animate attributeName="width" values="0;206;206" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect></clipPath></defs><rect x="8" y="34" width="206" height="96" rx="6" class="pap"/><rect x="8" y="34" width="206" height="96" rx="6" fill="url(#fs5)"/><rect x="228" y="34" width="206" height="96" rx="6" class="pap"/><rect x="228" y="34" width="206" height="96" rx="6" fill="url(#fs5)"/><rect x="8" y="190" width="206" height="96" rx="6" class="pap"/><rect x="8" y="190" width="206" height="96" rx="6" fill="url(#fs5)"/><rect x="228" y="190" width="206" height="96" rx="6" class="pap"/><rect x="228" y="190" width="206" height="96" rx="6" fill="url(#fs5)"/>
 <g clip-path="url(#fsc)"><path class="etr" d="M14 70h14q5 -5 10 0h8l3 -5l9 55l10 -56q14 -16 30 6h12h14q5 -5 10 0h8l3 -5l9 55l10 -56q14 -16 30 6h12M234 104h14q5 -5 10 0h8l6 -40l4 6l4 -6l8 28q14 -14 30 12h12h14q5 -5 10 0h8l6 -40l4 6l4 -6l8 28q14 -14 30 12h12M14 222h14q5 -5 10 0h8l3 -5l9 55l10 -40q14 12 30 -10h12h14q5 -5 10 0h8l3 -5l9 55l10 -40q14 12 30 -10h12M234 244h14q5 -5 10 0h8l3 -5l9 45l10 -66q14 -18 30 26h12h14q5 -5 10 0h8l3 -5l9 45l10 -66q14 -18 30 26h12"/>
 <path class="fx anp" style="stroke-width:2.8;stroke-linecap:round" d="M288.0 92.0q14 -14 30 12M384.0 92.0q14 -14 30 12M68.0 232.0q14 12 30 -10M164.0 232.0q14 12 30 -10M288.0 218.0q14 -18 30 26M384.0 218.0q14 -18 30 26"/></g>
 <g class="ft" font-weight="700" font-size="11.5"><text x="8" y="26">Discordanza attesa (normale)</text><text x="228" y="26">ST sopraslivellato concordante</text><text x="8" y="182">ST sottoslivellato concordante</text><text x="228" y="182">Discordanza eccessiva</text></g>
 <g class="emt" style="font-family:var(--f-mono)" font-size="10" font-weight="700"><text x="204" y="48" text-anchor="end">V1</text><text x="424" y="48" text-anchor="end">V6</text><text x="204" y="204" text-anchor="end">V2</text><text x="424" y="204" text-anchor="end">V2</text></g>
 <g class="ft fsm"><text x="8" y="146">ST e T opposti al QRS: normale nel blocco</text><text x="228" y="146">≥ 1 mm con QRS positivo: 5 punti</text><text x="8" y="302">≥ 1 mm in V1, V2 o V3: 3 punti</text><text x="228" y="302">≥ 5 mm (2 punti) o ≥ 25% dell'onda S (Smith)</text></g></svg>`},
{id:"stato-di-male",t:"Stato di male epilettico: i tempi del trattamento",c:"Una crisi che dura più di 5 minuti va trattata. A 5 minuti benzodiazepina (lorazepam endovena, midazolam buccale o intranasale, diazepam rettale); a circa 20 minuti, se continua, levetiracetam, fosfenitoina o valproato endovena; a circa 40 minuti anestesia generale in terapia intensiva.",
 enc:["antiepilettici","epilessia"],gl:["Stato di male epilettico"],st:/epile|convuls|crisi/i,
 svg:`<svg viewBox="0 0 440 140" role="img" aria-label="Linea del tempo dello stato di male epilettico: 5, 20 e 40 minuti">
 <path class="fl" style="stroke-width:2.2" d="M40 58H400"/><path class="fx" style="stroke-width:2.2" d="M394 52l8 6l-8 6"/>
 <circle class="fx anm" r="11" style="stroke-width:2.2"><animateMotion dur="7s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;.509;.509;1;1" keyTimes="0;.18;.4;.6;.82;1" path="M46 58H388"/></circle><g class="fv"><circle cx="46" cy="58" r="7"/><circle cx="220" cy="58" r="7"/><circle cx="388" cy="58" r="7"/></g>
 <g class="ft" font-weight="700"><text x="38" y="36">5 min</text><text x="220" y="36" text-anchor="middle">circa 20 min</text><text x="400" y="36" text-anchor="end">circa 40 min</text>
 <text x="38" y="88">Benzodiazepina</text><text x="220" y="88" text-anchor="middle">Secondo farmaco</text><text x="400" y="88" text-anchor="end">Anestesia</text></g>
 <g class="ft fsm"><text x="38" y="104">lorazepam, midazolam</text><text x="38" y="118">o diazepam</text><text x="220" y="104" text-anchor="middle">levetiracetam, fosfenitoina</text><text x="220" y="118" text-anchor="middle">o valproato EV</text><text x="400" y="104" text-anchor="end">terapia intensiva</text></g></svg>`},
{id:"paralisi-oculomotori",t:"Paralisi dei nervi III, IV e VI: come si muovono gli occhi",c:"Paziente visto di fronte: il suo occhio destro è alla nostra sinistra. Il punto in alto indica dove guarda. III nervo (oculomotore): occhio giù e in fuori, palpebra abbassata, pupilla dilatata; non riesce a portarsi verso il naso. IV nervo (trocleare): occhio più alto dell'altro, peggio guardando verso il lato opposto; il paziente inclina la testa dalla parte sana. VI nervo (abducente): occhio girato verso il naso, non riesce a guardare in fuori.",
 enc:["paralisi-oculomotori","sistema-nervoso","occhio"],gl:["Diplopia","Ptosi palpebrale","Midriasi"],st:/occhi|nervi cranici|neurolog|pupill/i,
 svg:`<svg viewBox="0 0 440 326" role="img" aria-label="Movimenti degli occhi nello sguardo al centro, a destra e a sinistra: normale e paralisi destra del terzo, quarto e sesto nervo cranico">
 <defs><clipPath id="eyc"><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/></clipPath></defs>
 <path class="dash" fill="none" d="M130 22H310"/><circle class="fv ey egz" cx="220" cy="22" r="6"/>
 <g class="ft fsm"><text x="124" y="26" text-anchor="end">destra del paziente</text><text x="316" y="26">sinistra del paziente</text><text x="160" y="46" text-anchor="middle">occhio destro</text><text x="250" y="46" text-anchor="middle">occhio sinistro</text></g>
 <rect x="4" y="51" width="432" height="62" rx="10" class="eyrow"/><g transform="translate(160 84)"><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey0"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g transform="translate(250 84)"><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey0"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g class="ft"><text x="14" y="88" font-weight="700">Normale</text><text class="fsm" x="298" y="83">gli occhi si muovono</text><text class="fsm" x="298" y="97">insieme in ogni direzione</text></g><rect x="4" y="119" width="432" height="62" rx="10" class="eyrow"/><g transform="translate(160 152)"><ellipse class="fx anp" rx="36" ry="27" style="stroke-width:1.6;stroke-dasharray:4 4"/><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey3"><circle r="11.5" class="eir"/><circle r="7.4" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g><path d="M-27 0Q0 -21 27 0Q0 -1 -27 0Z" fill="#e2b59a"/><path class="fl" d="M-27 0Q0 -1 27 0"/></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g transform="translate(250 152)"><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey0"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g class="ft"><text x="14" y="150" font-weight="700">III nervo destro</text><text class="fsm" x="14" y="165">oculomotore</text><text class="fsm" x="298" y="151">giù e in fuori, ptosi,</text><text class="fsm" x="298" y="165">pupilla dilatata</text></g><rect x="4" y="187" width="432" height="62" rx="10" class="eyrow"/><g transform="translate(160 220)"><ellipse class="fx anp" rx="36" ry="27" style="stroke-width:1.6;stroke-dasharray:4 4"/><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey4"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g transform="translate(250 220)"><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey0"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g class="ft"><text x="14" y="218" font-weight="700">IV nervo destro</text><text class="fsm" x="14" y="233">trocleare</text><text class="fsm" x="298" y="219">occhio più alto, peggio</text><text class="fsm" x="298" y="233">guardando a sinistra</text></g><rect x="4" y="255" width="432" height="62" rx="10" class="eyrow"/><g transform="translate(160 288)"><ellipse class="fx anp" rx="36" ry="27" style="stroke-width:1.6;stroke-dasharray:4 4"/><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey6"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g transform="translate(250 288)"><path d="M-27 0Q0 -21 27 0Q0 21 -27 0Z" fill="#fff"/><g clip-path="url(#eyc)"><g class="ey ey0"><circle r="11.5" class="eir"/><circle r="4.6" fill="#0d1517"/><circle cx="-3" cy="-3.5" r="1.8" fill="#fff"/></g></g><path class="fl" style="stroke-width:2" d="M-27 0Q0 -21 27 0Q0 21 -27 0Z"/><path class="fl" style="stroke-width:3;stroke-linecap:round" d="M-27 -19Q0 -33 27 -21"/></g><g class="ft"><text x="14" y="286" font-weight="700">VI nervo destro</text><text class="fsm" x="14" y="301">abducente</text><text class="fsm" x="298" y="287">occhio girato in dentro,</text><text class="fsm" x="298" y="301">non guarda a destra</text></g></svg>`},
{id:"nervo-facciale",t:"Nervo facciale: decorso in sei tappe",c:"Sei tappe evidenziate a turno. Il facciale nasce dal ponte ed entra con l'VIII nervo nel meato acustico interno; nel canale facciale dà il nervo grande petroso (GP, lacrime), il nervo dello stapedio (St) e la corda del timpano (CT, gusto). Esce dal forame stilomastoideo dando il ramo auricolare posteriore (AP), attraversa la parotide senza innervarla e si divide in cinque rami terminali: temporale, zigomatico, buccale, mandibolare marginale, cervicale. Se la lesione è del nervo (paralisi periferica) è colpita anche la fronte; se è centrale, per esempio un ictus, la fronte è risparmiata.",
 enc:["nervo-facciale","sistema-nervoso","ictus"],gl:["Nervo facciale","Paralisi di Bell","Corda del timpano"],st:/facciale|paralisi|bell|parotide|mimica/i,
 svg:`<svg viewBox="0 0 440 310" role="img" aria-label="Decorso del nervo facciale in sei tappe: ponte e meato acustico interno, canale facciale con tre rami, forame stilomastoideo, parotide, cinque rami terminali e paralisi periferica o centrale">
 <rect x="8" y="8" width="246" height="44" rx="9" class="eyrow"/><rect x="8" y="8" width="246" height="44" rx="9" class="fx vf k1" fill="none" style="stroke-width:2.6"/>
 <circle cx="26" cy="30" r="11" fill="#4a90d9" opacity=".22"/><circle cx="26" cy="30" r="11" fill="none" stroke="#4a90d9" stroke-width="1.6"/><text x="26" y="35" text-anchor="middle" class="ft" font-weight="700" style="font-size:12px">1</text>
 <g class="ft"><text x="46" y="23" font-weight="700" style="font-size:11px">Ponte e meato acustico interno</text><text class="fsm" x="46" y="36" style="font-size:9.6px">entra con l'VIII nervo</text><text class="fsm" x="46" y="47" style="font-size:9.6px">nell'osso temporale</text></g>
 <rect x="8" y="57" width="246" height="44" rx="9" class="eyrow"/><rect x="8" y="57" width="246" height="44" rx="9" class="fx vf k2" fill="none" style="stroke-width:2.6"/>
 <circle cx="26" cy="79" r="11" fill="#3a9d6a" opacity=".22"/><circle cx="26" cy="79" r="11" fill="none" stroke="#3a9d6a" stroke-width="1.6"/><text x="26" y="84" text-anchor="middle" class="ft" font-weight="700" style="font-size:12px">2</text>
 <g class="ft"><text x="46" y="72" font-weight="700" style="font-size:11px">Canale facciale: tre rami</text><text class="fsm" x="46" y="85" style="font-size:9.6px">grande petroso (lacrime), stapedio,</text><text class="fsm" x="46" y="96" style="font-size:9.6px">corda del timpano (gusto)</text></g>
 <rect x="8" y="106" width="246" height="44" rx="9" class="eyrow"/><rect x="8" y="106" width="246" height="44" rx="9" class="fx vf k3" fill="none" style="stroke-width:2.6"/>
 <circle cx="26" cy="128" r="11" fill="#d9902f" opacity=".22"/><circle cx="26" cy="128" r="11" fill="none" stroke="#d9902f" stroke-width="1.6"/><text x="26" y="133" text-anchor="middle" class="ft" font-weight="700" style="font-size:12px">3</text>
 <g class="ft"><text x="46" y="121" font-weight="700" style="font-size:11px">Forame stilomastoideo</text><text class="fsm" x="46" y="134" style="font-size:9.6px">esce dal cranio e dà il ramo</text><text class="fsm" x="46" y="145" style="font-size:9.6px">auricolare posteriore</text></g>
 <rect x="8" y="155" width="246" height="44" rx="9" class="eyrow"/><rect x="8" y="155" width="246" height="44" rx="9" class="fx vf k4" fill="none" style="stroke-width:2.6"/>
 <circle cx="26" cy="177" r="11" fill="#8a5cd6" opacity=".22"/><circle cx="26" cy="177" r="11" fill="none" stroke="#8a5cd6" stroke-width="1.6"/><text x="26" y="182" text-anchor="middle" class="ft" font-weight="700" style="font-size:12px">4</text>
 <g class="ft"><text x="46" y="170" font-weight="700" style="font-size:11px">Parotide</text><text class="fsm" x="46" y="183" style="font-size:9.6px">la attraversa senza innervarla</text><text class="fsm" x="46" y="194" style="font-size:9.6px">(la saliva parotidea è del IX nervo)</text></g>
 <rect x="8" y="204" width="246" height="44" rx="9" class="eyrow"/><rect x="8" y="204" width="246" height="44" rx="9" class="fx vf k5" fill="none" style="stroke-width:2.6"/>
 <circle cx="26" cy="226" r="11" fill="#2f8f8a" opacity=".22"/><circle cx="26" cy="226" r="11" fill="none" stroke="#2f8f8a" stroke-width="1.6"/><text x="26" y="231" text-anchor="middle" class="ft" font-weight="700" style="font-size:12px">5</text>
 <g class="ft"><text x="46" y="219" font-weight="700" style="font-size:11px">Cinque rami terminali</text><text class="fsm" x="46" y="232" style="font-size:9.6px">temporale, zigomatico, buccale,</text><text class="fsm" x="46" y="243" style="font-size:9.6px">mandibolare marginale, cervicale</text></g>
 <rect x="8" y="253" width="246" height="44" rx="9" class="eyrow"/><rect x="8" y="253" width="246" height="44" rx="9" class="fx vf k6" fill="none" style="stroke-width:2.6"/>
 <circle cx="26" cy="275" r="11" fill="#c0392b" opacity=".22"/><circle cx="26" cy="275" r="11" fill="none" stroke="#c0392b" stroke-width="1.6"/><text x="26" y="280" text-anchor="middle" class="ft" font-weight="700" style="font-size:12px">6</text>
 <g class="ft"><text x="46" y="268" font-weight="700" style="font-size:11px">Clinica: paralisi del volto</text><text class="fsm" x="46" y="281" style="font-size:9.6px">periferica: colpisce anche la fronte</text><text class="fsm" x="46" y="292" style="font-size:9.6px">centrale (ictus): fronte risparmiata</text></g>
 <rect x="262" y="8" width="170" height="294" rx="9" class="eyrow"/><rect x="262" y="8" width="170" height="294" rx="9" class="fx vf k6" fill="none" style="stroke-width:2.6"/>
 <g class="fl" fill="none" style="stroke-width:3"><path d="M290 30 L290 62 L325 100 L325 150 L338 205"/></g>
 <g class="fl" fill="none" style="stroke-width:1.8"><path d="M325 100 L360 84 M325 100 L366 100 M325 100 L362 118 M325 150 L286 160"/><path d="M338 205 L292 262 M338 205 L318 262 M338 205 L344 262 M338 205 L370 262 M338 205 L396 262"/></g>
 <ellipse cx="340" cy="212" rx="48" ry="22" fill="#8a5cd6" opacity=".15"/><ellipse cx="340" cy="212" rx="48" ry="22" fill="none" stroke="#8a5cd6" stroke-width="1.5"/>
 <circle cx="290" cy="30" r="6" fill="#4a90d9"/><circle cx="290" cy="62" r="6" fill="#4a90d9"/><circle cx="325" cy="100" r="6" fill="#3a9d6a"/><circle cx="325" cy="150" r="6" fill="#d9902f"/>
 <g fill="#2f8f8a"><circle cx="292" cy="262" r="3.5"/><circle cx="318" cy="262" r="3.5"/><circle cx="344" cy="262" r="3.5"/><circle cx="370" cy="262" r="3.5"/><circle cx="396" cy="262" r="3.5"/></g>
 <g class="ft fsm" style="font-size:9.6px"><text x="300" y="33">ponte</text><text x="300" y="65">meato</text><text x="316" y="104" text-anchor="end">genicolato</text><text x="366" y="87">GP</text><text x="372" y="103">St</text><text x="368" y="121">CT</text><text x="337" y="148">forame</text><text x="337" y="159">stilomast.</text><text x="282" y="164" text-anchor="end">AP</text><text x="392" y="200">parotide</text></g>
 <g class="ft" text-anchor="middle" font-weight="700" style="font-size:12px"><text x="292" y="279">T</text><text x="318" y="279">Z</text><text x="344" y="279">B</text><text x="370" y="279">M</text><text x="396" y="279">C</text></g>
 <text class="ft fsm" x="344" y="295" text-anchor="middle" style="font-size:9.6px">rami terminali</text>
 <rect x="276" y="16" width="62" height="60" rx="8" class="fx vf k1" fill="none" style="stroke-width:2.6"/>
 <rect x="268" y="76" width="128" height="54" rx="8" class="fx vf k2" fill="none" style="stroke-width:2.6"/>
 <rect x="268" y="138" width="112" height="36" rx="8" class="fx vf k3" fill="none" style="stroke-width:2.6"/>
 <ellipse cx="340" cy="212" rx="54" ry="27" class="fx vf k4" fill="none" style="stroke-width:2.6"/>
 <rect x="278" y="250" width="130" height="36" rx="8" class="fx vf k5" fill="none" style="stroke-width:2.6"/>
 </svg>`},
{id:"campo-visivo",t:"Vie ottiche: dalla sede della lesione al difetto del campo visivo",c:"Le vie ottiche viste dall'alto, con sei lesioni a destra evidenziate a turno. I campi sono disegnati come li vede il paziente (S = occhio sinistro, D = occhio destro); la parte scura è quella persa. Prima del chiasma è colpito un solo occhio; al chiasma si perdono le due metà esterne; dietro il chiasma si perde la metà opposta del campo in entrambi gli occhi, tutta o un quadrante.",
 enc:["campo-visivo-difetti","occhio","ictus"],gl:["Emianopsia","Quadrantopsia"],st:/occhi|vista|campo visivo|neurolog/i,
 svg:`<svg viewBox="0 0 440 396" role="img" aria-label="Vie ottiche viste dall'alto con sei sedi di lesione a destra e i sei difetti del campo visivo corrispondenti">
 <rect x="8" y="4" width="424" height="188" rx="10" class="eyrow"/>
 <g class="fs"><path d="M170 30L220 78L260 112M270 30L220 78L180 112"/><path d="M260 112C258 130 250 150 244 170M260 112C330 104 320 168 250 174"/><path d="M180 112C182 130 190 150 196 170M180 112C110 104 120 168 190 174"/></g>
 <g fill="#fbf3c4" stroke="#2f8f8a" stroke-width="1.6"><circle cx="170" cy="28" r="13"/><circle cx="270" cy="28" r="13"/><ellipse cx="180" cy="112" rx="8" ry="5"/><ellipse cx="260" cy="112" rx="8" ry="5"/><ellipse cx="196" cy="174" rx="16" ry="7"/><ellipse cx="244" cy="174" rx="16" ry="7"/></g>
 <circle class="fx vf k1" cx="245" cy="53" r="12" style="stroke-width:2.4"/><circle class="fv" cx="245" cy="53" r="7"/><text x="245" y="56.4" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" style="font-family:var(--f-body)">1</text><circle class="fx vf k2" cx="220" cy="78" r="12" style="stroke-width:2.4"/><circle class="fv" cx="220" cy="78" r="7"/><text x="220" y="81.4" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" style="font-family:var(--f-body)">2</text><circle class="fx vf k3" cx="240" cy="95" r="12" style="stroke-width:2.4"/><circle class="fv" cx="240" cy="95" r="7"/><text x="240" y="98.4" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" style="font-family:var(--f-body)">3</text><circle class="fx vf k4" cx="297" cy="140" r="12" style="stroke-width:2.4"/><circle class="fv" cx="297" cy="140" r="7"/><text x="297" y="143.4" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" style="font-family:var(--f-body)">4</text><circle class="fx vf k5" cx="254" cy="138" r="12" style="stroke-width:2.4"/><circle class="fv" cx="254" cy="138" r="7"/><text x="254" y="141.4" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" style="font-family:var(--f-body)">5</text><circle class="fx vf k6" cx="244" cy="172" r="12" style="stroke-width:2.4"/><circle class="fv" cx="244" cy="172" r="7"/><text x="244" y="175.4" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" style="font-family:var(--f-body)">6</text>
 <g class="ft fsm"><text x="16" y="18">visto dall'alto</text><text x="150" y="32" text-anchor="end">occhio sinistro</text><text x="290" y="32">occhio destro</text><text x="180" y="58" text-anchor="end">nervo ottico</text><text x="204" y="82" text-anchor="end">chiasma</text><text x="188" y="99" text-anchor="end">tratto ottico</text><text x="148" y="116" text-anchor="end">corpo genicolato</text><text x="124" y="146" text-anchor="end">ansa di Meyer</text><text x="124" y="159" text-anchor="end">(temporale)</text><text x="316" y="176">radiazione</text><text x="316" y="187">parietale: 5</text><text x="172" y="188" text-anchor="end">corteccia visiva</text></g>
 <rect x="8" y="200" width="136" height="92" rx="9" class="eyrow"/><rect x="8" y="200" width="136" height="92" rx="9" class="fx vf k1" style="stroke-width:2.6"/><circle cx="52" cy="248" r="17" fill="#fbf3c4"/><circle cx="102" cy="248" r="17" fill="#fbf3c4"/><circle cx="102" cy="248" r="17" fill="#22343a"/><g fill="none" stroke="#2f8f8a" stroke-width="1.4"><circle cx="52" cy="248" r="17"/><circle cx="102" cy="248" r="17"/></g><g class="ft"><text x="16" y="217" font-weight="700" font-size="10.5">1 · Nervo ottico</text><text class="fsm" x="26" y="252" text-anchor="middle">S</text><text class="fsm" x="128" y="252" text-anchor="middle">D</text><text class="fsm" style="font-size:9.6px" x="76" y="284" text-anchor="middle">cecità dell'occhio destro</text></g><rect x="152" y="200" width="136" height="92" rx="9" class="eyrow"/><rect x="152" y="200" width="136" height="92" rx="9" class="fx vf k2" style="stroke-width:2.6"/><circle cx="196" cy="248" r="17" fill="#fbf3c4"/><circle cx="246" cy="248" r="17" fill="#fbf3c4"/><path fill="#22343a" d="M196 231A17 17 0 0 0 196 265Z"/><path fill="#22343a" d="M246 231A17 17 0 0 1 246 265Z"/><g fill="none" stroke="#2f8f8a" stroke-width="1.4"><circle cx="196" cy="248" r="17"/><circle cx="246" cy="248" r="17"/></g><g class="ft"><text x="160" y="217" font-weight="700" font-size="10.5">2 · Chiasma ottico</text><text class="fsm" x="170" y="252" text-anchor="middle">S</text><text class="fsm" x="272" y="252" text-anchor="middle">D</text><text class="fsm" style="font-size:9.6px" x="220" y="284" text-anchor="middle">emianopsia bitemporale</text></g><rect x="296" y="200" width="136" height="92" rx="9" class="eyrow"/><rect x="296" y="200" width="136" height="92" rx="9" class="fx vf k3" style="stroke-width:2.6"/><circle cx="340" cy="248" r="17" fill="#fbf3c4"/><circle cx="390" cy="248" r="17" fill="#fbf3c4"/><path fill="#22343a" d="M340 231A17 17 0 0 0 340 265Z"/><path fill="#22343a" d="M390 231A17 17 0 0 0 390 265Z"/><g fill="none" stroke="#2f8f8a" stroke-width="1.4"><circle cx="340" cy="248" r="17"/><circle cx="390" cy="248" r="17"/></g><g class="ft"><text x="304" y="217" font-weight="700" font-size="10.5">3 · Tratto ottico</text><text class="fsm" x="314" y="252" text-anchor="middle">S</text><text class="fsm" x="416" y="252" text-anchor="middle">D</text><text class="fsm" style="font-size:9.6px" x="364" y="284" text-anchor="middle">emianopsia omonima sinistra</text></g><rect x="8" y="300" width="136" height="92" rx="9" class="eyrow"/><rect x="8" y="300" width="136" height="92" rx="9" class="fx vf k4" style="stroke-width:2.6"/><circle cx="52" cy="348" r="17" fill="#fbf3c4"/><circle cx="102" cy="348" r="17" fill="#fbf3c4"/><path fill="#22343a" d="M52 348L52 331A17 17 0 0 0 35 348Z"/><path fill="#22343a" d="M102 348L102 331A17 17 0 0 0 85 348Z"/><g fill="none" stroke="#2f8f8a" stroke-width="1.4"><circle cx="52" cy="348" r="17"/><circle cx="102" cy="348" r="17"/></g><g class="ft"><text x="16" y="317" font-weight="700" font-size="10.5">4 · Ansa di Meyer</text><text class="fsm" x="26" y="352" text-anchor="middle">S</text><text class="fsm" x="128" y="352" text-anchor="middle">D</text><text class="fsm" style="font-size:9.6px" x="76" y="384" text-anchor="middle">quadrante superiore sinistro</text></g><rect x="152" y="300" width="136" height="92" rx="9" class="eyrow"/><rect x="152" y="300" width="136" height="92" rx="9" class="fx vf k5" style="stroke-width:2.6"/><circle cx="196" cy="348" r="17" fill="#fbf3c4"/><circle cx="246" cy="348" r="17" fill="#fbf3c4"/><path fill="#22343a" d="M196 348L179 348A17 17 0 0 0 196 365Z"/><path fill="#22343a" d="M246 348L229 348A17 17 0 0 0 246 365Z"/><g fill="none" stroke="#2f8f8a" stroke-width="1.4"><circle cx="196" cy="348" r="17"/><circle cx="246" cy="348" r="17"/></g><g class="ft"><text x="160" y="317" font-weight="700" font-size="10.5">5 · Radiazione parietale</text><text class="fsm" x="170" y="352" text-anchor="middle">S</text><text class="fsm" x="272" y="352" text-anchor="middle">D</text><text class="fsm" style="font-size:9.6px" x="220" y="384" text-anchor="middle">quadrante inferiore sinistro</text></g><rect x="296" y="300" width="136" height="92" rx="9" class="eyrow"/><rect x="296" y="300" width="136" height="92" rx="9" class="fx vf k6" style="stroke-width:2.6"/><circle cx="340" cy="348" r="17" fill="#fbf3c4"/><circle cx="390" cy="348" r="17" fill="#fbf3c4"/><path fill="#22343a" d="M340 331A17 17 0 0 0 340 365Z"/><circle cx="340" cy="348" r="4.5" fill="#fbf3c4"/><path fill="#22343a" d="M390 331A17 17 0 0 0 390 365Z"/><circle cx="390" cy="348" r="4.5" fill="#fbf3c4"/><g fill="none" stroke="#2f8f8a" stroke-width="1.4"><circle cx="340" cy="348" r="17"/><circle cx="390" cy="348" r="17"/></g><g class="ft"><text x="304" y="317" font-weight="700" font-size="10.5">6 · Corteccia occipitale</text><text class="fsm" x="314" y="352" text-anchor="middle">S</text><text class="fsm" x="416" y="352" text-anchor="middle">D</text><text class="fsm" style="font-size:9.6px" x="364" y="384" text-anchor="middle">emianopsia sin., macula salva</text></g></svg>`},
{id:"nefrone-diuretici",t:"Dove agiscono i diuretici nel nefrone",c:"Tre gruppi, tre sedi. Diuretici dell'ansa (furosemide): ansa di Henle, i più potenti, usati per togliere liquidi nello scompenso. Tiazidici (indapamide, idroclorotiazide): tubulo distale, soprattutto per la pressione. Risparmiatori di potassio (spironolattone, amiloride): tratto finale del nefrone, trattengono il potassio. Ansa e tiazidici abbassano il potassio, i risparmiatori lo alzano.",
 enc:["diuretici","rene-fisiologia","scompenso"],gl:[],st:/diuretic|rene|nefron/i,
 svg:`<svg viewBox="0 0 440 262" role="img" aria-label="Nefrone schematico con le tre sedi d'azione dei diuretici: ansa di Henle, tubulo distale, tratto finale">
 <path class="fl" style="stroke-width:13;stroke-linecap:round" d="M72 52C92 36 100 72 120 58C128 54 132 60 132 70V150C132 176 164 176 164 150V70C164 50 178 46 188 58C198 72 214 44 226 58C232 64 232 74 232 84V196"/><path d="M72 52C92 36 100 72 120 58C128 54 132 60 132 70V150C132 176 164 176 164 150V70C164 50 178 46 188 58C198 72 214 44 226 58C232 64 232 74 232 84V196" fill="none" stroke="#f6e3c5" stroke-width="9" stroke-linecap="round"/>
 <path d="M132 104V150C132 176 164 176 164 150V84" fill="none" stroke="#d9534f" stroke-width="7" stroke-linecap="round" opacity=".38"/><path class="ans" d="M132 104V150C132 176 164 176 164 150V84" fill="none" stroke="#d9534f" stroke-width="9" stroke-linecap="round"/><path d="M164 70C164 50 178 46 188 58C198 72 214 44 226 58" fill="none" stroke="#2f8f8a" stroke-width="7" stroke-linecap="round" opacity=".38"/><path class="ans s2" d="M164 70C164 50 178 46 188 58C198 72 214 44 226 58" fill="none" stroke="#2f8f8a" stroke-width="9" stroke-linecap="round"/><path d="M228 60C232 66 232 76 232 84V196" fill="none" stroke="#8a5cd6" stroke-width="7" stroke-linecap="round" opacity=".38"/><path class="ans s3" d="M228 60C232 66 232 76 232 84V196" fill="none" stroke="#8a5cd6" stroke-width="9" stroke-linecap="round"/>
 <path d="M40 22L56 42" fill="none" stroke="#c0392b" stroke-width="6" stroke-linecap="round"/><circle cx="62" cy="52" r="14" fill="#e06c5f" stroke="#8f2f27" stroke-width="1.6"/><g fill="#c0392b"><circle cx="57" cy="48" r="4.2"/><circle cx="66" cy="47" r="4.2"/><circle cx="58" cy="57" r="4.2"/><circle cx="67" cy="56" r="4.2"/></g>
 <circle class="fdrop anm" r="2.6" fill="#3b82c4"><animateMotion dur="7s" begin="0s" repeatCount="indefinite" path="M72 52C92 36 100 72 120 58C128 54 132 60 132 70V150C132 176 164 176 164 150V70C164 50 178 46 188 58C198 72 214 44 226 58C232 64 232 74 232 84V196"/></circle><circle class="fdrop anm" r="2.6" fill="#3b82c4"><animateMotion dur="7s" begin="-1.75s" repeatCount="indefinite" path="M72 52C92 36 100 72 120 58C128 54 132 60 132 70V150C132 176 164 176 164 150V70C164 50 178 46 188 58C198 72 214 44 226 58C232 64 232 74 232 84V196"/></circle><circle class="fdrop anm" r="2.6" fill="#3b82c4"><animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite" path="M72 52C92 36 100 72 120 58C128 54 132 60 132 70V150C132 176 164 176 164 150V70C164 50 178 46 188 58C198 72 214 44 226 58C232 64 232 74 232 84V196"/></circle><circle class="fdrop anm" r="2.6" fill="#3b82c4"><animateMotion dur="7s" begin="-5.25s" repeatCount="indefinite" path="M72 52C92 36 100 72 120 58C128 54 132 60 132 70V150C132 176 164 176 164 150V70C164 50 178 46 188 58C198 72 214 44 226 58C232 64 232 74 232 84V196"/></circle>
 <g class="ft fsm"><text x="62" y="84" text-anchor="middle">glomerulo</text><text x="62" y="96" text-anchor="middle">(filtro)</text><text x="148" y="196" text-anchor="middle">ansa di Henle</text><text x="196" y="34" text-anchor="middle">tubulo distale</text><text x="232" y="216" text-anchor="middle">tratto finale</text></g>
 <rect x="262" y="18" width="172" height="54" rx="8" class="eyrow"/><rect x="262" y="18" width="6" height="54" rx="3" fill="#d9534f"/><rect class="ans" x="262" y="18" width="172" height="54" rx="8" fill="none" stroke="#d9534f" stroke-width="2.6"/><g class="ft"><text x="276" y="36" font-weight="700" font-size="11.5">Dell'ansa · furosemide</text><text class="fsm" x="276" y="51">ansa di Henle: i più potenti,</text><text class="fsm" x="276" y="64">tolgono liquidi nello scompenso</text></g><rect x="262" y="80" width="172" height="54" rx="8" class="eyrow"/><rect x="262" y="80" width="6" height="54" rx="3" fill="#2f8f8a"/><rect class="ans s2" x="262" y="80" width="172" height="54" rx="8" fill="none" stroke="#2f8f8a" stroke-width="2.6"/><g class="ft"><text x="276" y="98" font-weight="700" font-size="11.5">Tiazidici · indapamide</text><text class="fsm" x="276" y="113">tubulo distale: soprattutto</text><text class="fsm" x="276" y="126">per la pressione alta</text></g><rect x="262" y="142" width="172" height="54" rx="8" class="eyrow"/><rect x="262" y="142" width="6" height="54" rx="3" fill="#8a5cd6"/><rect class="ans s3" x="262" y="142" width="172" height="54" rx="8" fill="none" stroke="#8a5cd6" stroke-width="2.6"/><g class="ft"><text x="276" y="160" font-weight="700" font-size="11.5">Risparmiatori di potassio</text><text class="fsm" x="276" y="175">spironolattone, amiloride:</text><text class="fsm" x="276" y="188">tratto finale, trattengono K⁺</text></g>
 <rect x="8" y="226" width="424" height="30" rx="8" class="eyrow"/><g class="ft" font-size="10.4"><text x="18" y="245"><tspan font-weight="700">Potassio:</tspan> ansa e tiazidici lo abbassano ↓ · spironolattone e amiloride lo alzano ↑</text></g></svg>`},
{id:"asse-cardiaco",t:"Asse elettrico: i quattro quadranti e i due metodi",c:"Le sei derivazioni degli arti formano una raggiera: DI a 0°, aVF a +90°. Con DI e aVF si trova il quadrante: tutte e due positive, asse normale; DI positiva e aVF negativa, si guarda DII (positiva: tra 0° e −30°, ancora normale; negativa: deviazione a sinistra); DI negativa e aVF positiva, deviazione a destra; tutte e due negative, deviazione estrema. Per stimare i gradi si cerca il QRS isodifasico: l'asse è perpendicolare a quella derivazione.",
 enc:["ecg-asse","ecg-lettura","ecg-basi"],gl:["Asse elettrico cardiaco","Sistema esassiale"],st:/ecg|asse|derivazion/i,
 svg:`<svg viewBox="0 0 440 318" role="img" aria-label="Sistema esassiale con i quattro quadranti dell'asse elettrico e i due metodi per calcolarlo: DI più aVF e derivazione isodifasica">
 <rect x="8" y="4" width="232" height="310" rx="10" class="eyrow"/>
 <path d="M124 150L214.0 150.0A90 90 0 0 1 124.0 240.0Z" fill="#2f8f8a" opacity=".16"/>
 <path d="M124 150L124.0 60.0A90 90 0 0 1 214.0 150.0Z" fill="#d9902f" opacity=".16"/>
 <path d="M124 150L124.0 240.0A90 90 0 0 1 34.0 150.0Z" fill="#d9534f" opacity=".16"/>
 <path d="M124 150L34.0 150.0A90 90 0 0 1 124.0 60.0Z" fill="#8a5cd6" opacity=".16"/>
 <circle cx="124" cy="150" r="90" class="lead"/>
 <path d="M34.0 150.0L214.0 150.0" class="lead" stroke-dasharray="0"/>
 <path d="M79.0 72.1L169.0 227.9" class="lead" stroke-dasharray="3 3"/>
 <path d="M124.0 60.0L124.0 240.0" class="lead" stroke-dasharray="0"/>
 <path d="M169.0 72.1L79.0 227.9" class="lead" stroke-dasharray="3 3"/>
 <path d="M201.9 195.0L46.1 105.0" class="lead" stroke-dasharray="3 3"/>
 <path d="M46.1 195.0L201.9 105.0" class="lead" stroke-dasharray="3 3"/>
 <g class="ft" font-size="10" font-weight="700" text-anchor="middle">
 <text x="229.0" y="153.5" style="font-size:10px">DI</text>
 <text x="176.5" y="244.4" style="font-size:10px">DII</text>
 <text x="124.0" y="258.5" style="font-size:10px">aVF</text>
 <text x="71.5" y="244.4" style="font-size:10px">DIII</text>
 <text x="33.1" y="101.0" style="font-size:10px">aVR</text>
 <text x="214.9" y="101.0" style="font-size:10px">aVL</text>
 </g>
 <g class="ft fsm" text-anchor="middle">
 <text x="21.0" y="153.5" style="font-size:9px">±180°</text>
 <text x="124.0" y="50.5" style="font-size:9px">−90°</text>
 </g>
 <g class="ft" text-anchor="middle" style="font-size:9.6px" font-weight="700">
 <text x="176.0" y="183.0" style="font-size:9.6px">NORMALE</text>
 <text x="176.0" y="123.0" style="font-size:9.6px">SINISTRA</text>
 <text x="72.0" y="183.0" style="font-size:9.6px">DESTRA</text>
 <text x="72.0" y="123.0" style="font-size:9.6px">ESTREMA</text>
 </g>
 <g class="vf k1"><path d="M124 150L214.0 150.0A90 90 0 0 1 124.0 240.0Z" fill="#2f8f8a" opacity=".42"/><g class=""><path d="M124 150L143.9 224.4" stroke="#2f8f8a" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M146.3 233.1L151.7 218.6L134.3 223.3Z" fill="#2f8f8a"/></g></g>
 <g class="vf k2"><path d="M124 150L124.0 60.0A90 90 0 0 1 214.0 150.0Z" fill="#d9902f" opacity=".42"/><g class=""><path d="M124 150L143.9 75.6" stroke="#d9902f" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M146.3 66.9L134.3 76.7L151.7 81.4Z" fill="#d9902f"/></g></g>
 <g class="vf k3"><path d="M124 150L124.0 240.0A90 90 0 0 1 34.0 150.0Z" fill="#d9534f" opacity=".42"/><g class=""><path d="M124 150L104.1 224.4" stroke="#d9534f" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M101.7 233.1L113.7 223.3L96.3 218.6Z" fill="#d9534f"/></g></g>
 <g class="vf k4"><path d="M124 150L34.0 150.0A90 90 0 0 1 124.0 60.0Z" fill="#8a5cd6" opacity=".42"/><g class=""><path d="M124 150L104.1 75.6" stroke="#8a5cd6" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M101.7 66.9L96.3 81.4L113.7 76.7Z" fill="#8a5cd6"/></g></g>
 <g class="vf k5"><path d="M124 150L201.9 105.0A90 90 0 0 1 214.0 150.0Z" fill="#2f8f8a" opacity=".5"/><path d="M124 150L124.0 60.0A90 90 0 0 1 201.9 105.0Z" fill="#d9902f" opacity=".5"/><path d="M79.0 72.1L169.0 227.9" stroke="#2f8f8a" stroke-width="2.6" fill="none"/></g>
 <g class="vf k6"><path d="M46.1 195.0L201.9 105.0" stroke="#d9902f" stroke-width="2.8" fill="none"/><path d="M79.0 72.1L124 150" stroke="#2f8f8a" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/><g class=""><path d="M124 150L162.5 216.7" stroke="#2f8f8a" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M167.0 224.5L168.5 209.1L152.9 218.1Z" fill="#2f8f8a"/></g><path d="M136.1 143.0L143.1 155.1L131.0 162.1" fill="none" stroke="#2f8f8a" stroke-width="1.4"/></g>
 <circle cx="124" cy="150" r="3.4" class="fv"/>
 <g class="ft fsm"><text x="16" y="20">piano frontale · gradi positivi in senso orario</text><text x="124" y="290" text-anchor="middle">asse normale: da −30° a +90°</text><text x="124" y="304" text-anchor="middle">oltre −30° sinistra · oltre +90° destra</text></g>
 <rect x="248" y="4.0" width="184" height="48" rx="8" class="eyrow"/><rect x="248" y="4.0" width="184" height="48" rx="8" class="fx vf k1" fill="none" stroke="#2f8f8a" style="stroke-width:2.6"/>
 <path d="M256 30.0h6l2 2l3 -13l3 14l2 -3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M288 30.0h6l2 2l3 -13l3 14l2 -3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
 <g class="ft"><text class="fsm" x="267" y="16.0" text-anchor="middle" style="font-size:9px">DI</text><text class="fsm" x="299" y="16.0" text-anchor="middle" style="font-size:9px">aVF</text><text x="322" y="25.0" font-weight="700" style="font-size:10.5px">Asse normale</text><text class="fsm" x="322" y="39.0" style="font-size:9.6px">da 0° a +90°</text></g>
 <rect x="248" y="56.4" width="184" height="48" rx="8" class="eyrow"/><rect x="248" y="56.4" width="184" height="48" rx="8" class="fx vf k2" fill="none" stroke="#d9902f" style="stroke-width:2.6"/>
 <path d="M256 82.4h6l2 2l3 -13l3 14l2 -3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M288 82.4h6l2 -2l3 13l3 -14l2 3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
 <g class="ft"><text class="fsm" x="267" y="68.4" text-anchor="middle" style="font-size:9px">DI</text><text class="fsm" x="299" y="68.4" text-anchor="middle" style="font-size:9px">aVF</text><text x="322" y="77.4" font-weight="700" style="font-size:10.5px">Guardare DII</text><text class="fsm" x="322" y="91.4" style="font-size:9.6px">normale o sinistra</text></g>
 <rect x="248" y="108.8" width="184" height="48" rx="8" class="eyrow"/><rect x="248" y="108.8" width="184" height="48" rx="8" class="fx vf k3" fill="none" stroke="#d9534f" style="stroke-width:2.6"/>
 <path d="M256 134.8h6l2 -2l3 13l3 -14l2 3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M288 134.8h6l2 2l3 -13l3 14l2 -3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
 <g class="ft"><text class="fsm" x="267" y="120.8" text-anchor="middle" style="font-size:9px">DI</text><text class="fsm" x="299" y="120.8" text-anchor="middle" style="font-size:9px">aVF</text><text x="322" y="129.8" font-weight="700" style="font-size:10.5px">Deviazione destra</text><text class="fsm" x="322" y="143.8" style="font-size:9.6px">da +90° a 180°</text></g>
 <rect x="248" y="161.2" width="184" height="48" rx="8" class="eyrow"/><rect x="248" y="161.2" width="184" height="48" rx="8" class="fx vf k4" fill="none" stroke="#8a5cd6" style="stroke-width:2.6"/>
 <path d="M256 187.2h6l2 -2l3 13l3 -14l2 3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M288 187.2h6l2 -2l3 13l3 -14l2 3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
 <g class="ft"><text class="fsm" x="267" y="173.2" text-anchor="middle" style="font-size:9px">DI</text><text class="fsm" x="299" y="173.2" text-anchor="middle" style="font-size:9px">aVF</text><text x="322" y="182.2" font-weight="700" style="font-size:10.5px">Deviazione estrema</text><text class="fsm" x="322" y="196.2" style="font-size:9.6px">da −90° a 180°</text></g>
 <rect x="248" y="213.6" width="184" height="48" rx="8" class="eyrow"/><rect x="248" y="213.6" width="184" height="48" rx="8" class="fx vf k5" fill="none" stroke="#2f8f8a" style="stroke-width:2.6"/>
 <path d="M256 239.6h6l2 2l3 -13l3 14l2 -3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M288 239.6h6l2 -2l3 13l3 -14l2 3h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
 <g class="ft"><text class="fsm" x="267" y="225.6" text-anchor="middle" style="font-size:9px">DII</text><text class="fsm" x="299" y="225.6" text-anchor="middle" style="font-size:9px"></text><text x="322" y="234.6" font-weight="700" style="font-size:9.6px">DII + : 0°/−30°, normale</text><text class="fsm" x="322" y="248.6" style="font-size:9.6px">DII − : deviazione sinistra</text></g>
 <rect x="248" y="266.0" width="184" height="48" rx="8" class="eyrow"/><rect x="248" y="266.0" width="184" height="48" rx="8" class="fx vf k6" fill="none" stroke="#2f8f8a" style="stroke-width:2.6"/>
 <path d="M256 292.0h6l2 -1l3 -8l4 16l3 -8l2 1h6" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
 <g class="ft"><text class="fsm" x="269" y="278.0" text-anchor="middle" style="font-size:9px">aVL</text><text x="290" y="287.0" font-weight="700" style="font-size:10.5px">QRS isodifasico</text><text class="fsm" x="290" y="301.0" style="font-size:9.6px">asse a 90° da lì: qui +60°</text></g>
 </svg>`},
{id:"avrt-circuiti",t:"WPW e AVRT: il circuito decide il QRS",c:"Tre circuiti a confronto, evidenziati a turno. Con ritmo sinusale l'impulso passa insieme dal nodo AV e dal Kent: PR corto, onda delta, QRS largo. Nell'AVRT ortodromica scende dal nodo AV e risale dal Kent: QRS stretto, con la P retrograda nell'ST. Nell'antidromica scende dal Kent: QRS largo, simile a una TV. Trappola: nell'antidromica niente farmaci che bloccano il nodo AV.",
 enc:["ecg-avrt","ecg-preeccitazione"],gl:["AVRT","Intervallo RP"],st:/ecg|tachicardi|wpw|pre-eccit/i,
 svg:`<svg viewBox="0 0 440 326" role="img" aria-label="Tre circuiti tra atri e ventricoli: ritmo sinusale con pre-eccitazione, AVRT ortodromica con QRS stretto, AVRT antidromica con QRS largo">
 <rect x="8" y="4" width="424" height="100" rx="10" class="eyrow"/><rect x="8" y="4" width="424" height="100" rx="10" class="fx ans" fill="none" style="stroke-width:2.6"/>
 <rect x="20" y="18" width="104" height="24" rx="5" class="ff fl" style="stroke-width:1.4"/><rect x="20" y="66" width="104" height="26" rx="5" class="ff fl" style="stroke-width:1.4"/>
 <g class="ft fsm" style="font-size:9.6px"><text x="26" y="34">atri</text><text x="26" y="83">ventricoli</text><text x="38" y="57" fill="#c0392b">Kent</text><text x="104" y="57">AV</text></g>
 <path d="M34 42V66" stroke="#c0392b" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M96 42V66" stroke="var(--muted)" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="96" cy="51" r="4" class="ff fl" style="stroke-width:1.4"/>
 <path d="M34 62l-4 -7h8z M96 64l-4 -6h8z" fill="#2f8f8a"/>
 <circle class="fv anm" r="4.5"><animateMotion dur="2.4s" repeatCount="indefinite" calcMode="linear" keyTimes="0;.3;1" keyPoints="0;1;1" path="M34 42V66"/></circle><circle class="fv anm" r="4.5"><animateMotion dur="2.4s" repeatCount="indefinite" calcMode="linear" keyTimes="0;.7;1" keyPoints="0;1;1" path="M96 42V66"/></circle>
 <g class="ft"><text x="150" y="21" font-weight="700" style="font-size:10.5px">1 · Ritmo sinusale con pre-eccitazione</text><text class="fsm" x="150" y="35" style="font-size:9.6px">nodo AV e Kent conducono insieme</text></g>
 <rect x="150" y="42" width="274" height="54" rx="6" style="fill:var(--ecg-bg);stroke:var(--ecg-edge)"/>
 <path d="M160 83h8q4 -6 8 0h6l10 -3l10 -10l8 -13l10 +30l10 -4h14q8 -10 16 0h12 M290 83h8q4 -6 8 0h6l10 -3l10 -10l8 -13l10 +30l10 -4h14q8 -10 16 0h12" class="etr" style="stroke-width:1.7"/>
 <text class="ft fsm" x="418" y="52" text-anchor="end" style="font-size:9.6px">PR corto, onda delta, QRS largo</text>
 <rect x="8" y="112" width="424" height="100" rx="10" class="eyrow"/><rect x="8" y="112" width="424" height="100" rx="10" class="fx ans s2" fill="none" style="stroke-width:2.6"/>
 <rect x="20" y="126" width="104" height="24" rx="5" class="ff fl" style="stroke-width:1.4"/><rect x="20" y="174" width="104" height="26" rx="5" class="ff fl" style="stroke-width:1.4"/>
 <g class="ft fsm" style="font-size:9.6px"><text x="26" y="142">atri</text><text x="26" y="191">ventricoli</text><text x="38" y="165" fill="#c0392b">Kent</text><text x="104" y="165">AV</text></g>
 <path d="M34 150V174" stroke="#c0392b" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M96 150V174" stroke="var(--muted)" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="96" cy="159" r="4" class="ff fl" style="stroke-width:1.4"/>
 <path d="M96 150H34M96 174H34" stroke="#3b7dd8" stroke-width="2.4" opacity=".55" fill="none"/><path d="M34 158l-4 8h8z" fill="#3b7dd8"/><path d="M96 172l-4 -6h8z" fill="#3b7dd8"/>
 <circle class="fv anm" r="4.5"><animateMotion dur="2.4s" repeatCount="indefinite" path="M96 150V174H34V150Z"/></circle>
 <g class="ft"><text x="150" y="129" font-weight="700" style="font-size:10.5px">2 · AVRT ortodromica</text><text class="fsm" x="150" y="143" style="font-size:9.6px">scende dal nodo AV, risale dal Kent</text></g>
 <rect x="150" y="150" width="274" height="54" rx="6" style="fill:var(--ecg-bg);stroke:var(--ecg-edge)"/>
 <path d="M160 191h8l4 3l4 -22l4 +28l4 -9h6q3 -6 6 0h4q6 -7 12 0h6 M222 191h8l4 3l4 -22l4 +28l4 -9h6q3 -6 6 0h4q6 -7 12 0h6 M284 191h8l4 3l4 -22l4 +28l4 -9h6q3 -6 6 0h4q6 -7 12 0h6 M346 191h8l4 3l4 -22l4 +28l4 -9h6q3 -6 6 0h4q6 -7 12 0h6" class="etr" style="stroke-width:1.7"/>
 <text class="ft fsm" x="418" y="160" text-anchor="end" style="font-size:9.6px">QRS stretto, P retrograda nell'ST</text>
 <rect x="8" y="220" width="424" height="100" rx="10" class="eyrow"/><rect x="8" y="220" width="424" height="100" rx="10" class="fx ans s3" fill="none" style="stroke-width:2.6"/>
 <rect x="20" y="234" width="104" height="24" rx="5" class="ff fl" style="stroke-width:1.4"/><rect x="20" y="282" width="104" height="26" rx="5" class="ff fl" style="stroke-width:1.4"/>
 <g class="ft fsm" style="font-size:9.6px"><text x="26" y="250">atri</text><text x="26" y="299">ventricoli</text><text x="38" y="273" fill="#c0392b">Kent</text><text x="104" y="273">AV</text></g>
 <path d="M34 258V282" stroke="#c0392b" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M96 258V282" stroke="var(--muted)" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="96" cy="267" r="4" class="ff fl" style="stroke-width:1.4"/>
 <path d="M96 258H34M96 282H34" stroke="#c0392b" stroke-width="2.4" opacity=".55" fill="none"/><path d="M34 278l-4 -8h8z" fill="#c0392b"/><path d="M96 261l-4 6h8z" fill="#c0392b"/>
 <circle class="fv anm" r="4.5"><animateMotion dur="2.4s" repeatCount="indefinite" path="M34 258V282H96V258Z"/></circle>
 <g class="ft"><text x="150" y="237" font-weight="700" style="font-size:10.5px">3 · AVRT antidromica</text><text class="fsm" x="150" y="251" style="font-size:9.6px">scende dal Kent, risale dal nodo AV</text></g>
 <rect x="150" y="258" width="274" height="54" rx="6" style="fill:var(--ecg-bg);stroke:var(--ecg-edge)"/>
 <path d="M160 299h6l12 5l18 -26l16 +34l10 -13h8q10 -9 20 0h8 M290 299h6l12 5l18 -26l16 +34l10 -13h8q10 -9 20 0h8" class="etr" style="stroke-width:1.7"/>
 <text class="ft fsm" x="418" y="268" text-anchor="end" style="font-size:9.6px">QRS largo, simile a una TV</text>
 </svg>`},
{id:"antipertensivi-desinenze",t:"Antipertensivi: la desinenza dice la classe",c:"Sei classi evidenziate a turno. -pril e -sartan agiscono sul sistema renina-angiotensina (enzima e recettore), -olol frena il cuore, -dipina dilata le arterie, -azosina rilassa i vasi, gli agonisti alfa-2 centrali (clonidina, guanfacina) non hanno una desinenza comune. Attenzione: verapamil e diltiazem sono calcio-antagonisti ma non finiscono in -dipina.",
 enc:["antipertensivi-desinenze","ipertensione","diuretici"],gl:["ACE-inibitori","Beta-bloccanti"],st:/ipertension|pressione|antipert|farmac/i,
 svg:`<svg viewBox="0 0 440 326" role="img" aria-label="Sei classi di farmaci antipertensivi con la desinenza del nome, il meccanismo e gli esempi">
 <rect x="8" y="4" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="4" width="424" height="50" rx="9" class="fx vf k1" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="13" width="80" height="32" rx="16" fill="#4a90d9" opacity=".22"/><rect x="16" y="13" width="80" height="32" rx="16" fill="none" stroke="#4a90d9" stroke-width="1.6"/>
 <text x="56" y="34" text-anchor="middle" class="ft" font-weight="700" style="font-size:14px">-pril</text>
 <g class="ft"><text x="108" y="23" font-weight="700" style="font-size:11px">ACE-inibitori</text><text class="fsm" x="108" y="36" style="font-size:10px">bloccano la produzione di angiotensina II</text><text class="fsm" x="108" y="48" style="font-size:9.6px" font-style="italic">enalapril, ramipril, lisinopril</text></g>
 <circle cx="418" cy="29" r="5" fill="#4a90d9"/>
 <rect x="8" y="58" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="58" width="424" height="50" rx="9" class="fx vf k2" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="67" width="80" height="32" rx="16" fill="#8a5cd6" opacity=".22"/><rect x="16" y="67" width="80" height="32" rx="16" fill="none" stroke="#8a5cd6" stroke-width="1.6"/>
 <text x="56" y="88" text-anchor="middle" class="ft" font-weight="700" style="font-size:12.5px">-sartan</text>
 <g class="ft"><text x="108" y="77" font-weight="700" style="font-size:11px">Sartani (antagonisti AT1)</text><text class="fsm" x="108" y="90" style="font-size:10px">bloccano il recettore dell'angiotensina II</text><text class="fsm" x="108" y="102" style="font-size:9.6px" font-style="italic">losartan, valsartan, candesartan</text></g>
 <circle cx="418" cy="83" r="5" fill="#8a5cd6"/>
 <rect x="8" y="112" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="112" width="424" height="50" rx="9" class="fx vf k3" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="121" width="80" height="32" rx="16" fill="#d9902f" opacity=".22"/><rect x="16" y="121" width="80" height="32" rx="16" fill="none" stroke="#d9902f" stroke-width="1.6"/>
 <text x="56" y="142" text-anchor="middle" class="ft" font-weight="700" style="font-size:14px">-olol</text>
 <g class="ft"><text x="108" y="131" font-weight="700" style="font-size:11px">Beta-bloccanti</text><text class="fsm" x="108" y="144" style="font-size:10px">rallentano e riposano il cuore</text><text class="fsm" x="108" y="156" style="font-size:9.6px" font-style="italic">bisoprololo, metoprololo, atenololo</text></g>
 <circle cx="418" cy="137" r="5" fill="#d9902f"/>
 <rect x="8" y="166" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="166" width="424" height="50" rx="9" class="fx vf k4" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="175" width="80" height="32" rx="16" fill="#2f8f8a" opacity=".22"/><rect x="16" y="175" width="80" height="32" rx="16" fill="none" stroke="#2f8f8a" stroke-width="1.6"/>
 <text x="56" y="196" text-anchor="middle" class="ft" font-weight="700" style="font-size:12.5px">-dipina</text>
 <g class="ft"><text x="108" y="185" font-weight="700" style="font-size:11px">Calcio-antagonisti diidropiridinici</text><text class="fsm" x="108" y="198" style="font-size:10px">dilatano le arterie</text><text class="fsm" x="108" y="210" style="font-size:9.6px" font-style="italic">amlodipina, nifedipina, felodipina</text></g>
 <circle cx="418" cy="191" r="5" fill="#2f8f8a"/>
 <rect x="8" y="220" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="220" width="424" height="50" rx="9" class="fx vf k5" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="229" width="80" height="32" rx="16" fill="#b04fb5" opacity=".22"/><rect x="16" y="229" width="80" height="32" rx="16" fill="none" stroke="#b04fb5" stroke-width="1.6"/>
 <text x="56" y="250" text-anchor="middle" class="ft" font-weight="700" style="font-size:12.5px">-azosina</text>
 <g class="ft"><text x="108" y="239" font-weight="700" style="font-size:11px">Alfa-1 bloccanti</text><text class="fsm" x="108" y="252" style="font-size:10px">rilassano i vasi</text><text class="fsm" x="108" y="264" style="font-size:9.6px" font-style="italic">doxazosina, prazosina, terazosina</text></g>
 <circle cx="418" cy="245" r="5" fill="#b04fb5"/>
 <rect x="8" y="274" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="274" width="424" height="50" rx="9" class="fx vf k6" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="283" width="80" height="32" rx="16" fill="#3a9d6a" opacity=".22"/><rect x="16" y="283" width="80" height="32" rx="16" fill="none" stroke="#3a9d6a" stroke-width="1.6"/>
 <text x="56" y="304" text-anchor="middle" class="ft" font-weight="700" style="font-size:12.5px">nessuna</text>
 <g class="ft"><text x="108" y="293" font-weight="700" style="font-size:11px">Agonisti alfa-2 centrali</text><text class="fsm" x="108" y="306" style="font-size:10px">riducono il tono simpatico dal cervello</text><text class="fsm" x="108" y="318" style="font-size:9.6px" font-style="italic">clonidina, guanfacina</text></g>
 <circle cx="418" cy="299" r="5" fill="#3a9d6a"/>
 </svg>`},
{id:"ipp-pompa",t:"IPP: come bloccano la pompa dell'acido",c:"A sinistra la cellula parietale dello stomaco pompa ioni idrogeno nel lume: è così che si forma l'acido. A destra l'IPP si lega alla pompa e la blocca, gli ioni restano nella cellula e il lume diventa meno acido. Sotto, le indicazioni principali. Non tutti gli IPP hanno le stesse indicazioni autorizzate.",
 enc:["ipp","emorragia-digestiva"],gl:["IPP","Pompa protonica"],st:/stomaco|gastr|ulcer|reflusso|ipp|acid/i,
 svg:`<svg viewBox="0 0 440 300" role="img" aria-label="Pompa protonica della cellula parietale: senza IPP gli ioni idrogeno passano nel lume gastrico, con IPP la pompa è bloccata; sotto le indicazioni principali">
 <rect x="8" y="4" width="208" height="214" rx="10" class="eyrow"/>
 <text x="20" y="22" class="ft" font-weight="700" style="font-size:10.5px">Senza IPP: l'acido esce</text>
 <rect x="20" y="30" width="184" height="46" rx="5" fill="#d9902f" opacity="0.2"/>
 <text x="28" y="46" class="ft fsm" style="font-size:9.6px">lume gastrico</text><text x="196" y="46" text-anchor="end" class="ft fsm" style="font-size:9.6px">molto acido</text>
 <rect x="20" y="84" width="184" height="124" rx="5" class="ff fl" style="stroke-width:1.2"/>
 <text x="28" y="200" class="ft fsm" style="font-size:9.6px">cellula parietale</text>
 <rect x="20" y="76" width="184" height="8" fill="var(--muted)" opacity=".45"/>
 <rect x="89" y="64" width="46" height="30" rx="7" fill="#2f8f8a" opacity=".28" stroke="#2f8f8a" stroke-width="1.8"/><text x="83" y="94" text-anchor="end" class="ft" font-weight="700" style="font-size:9.6px">pompa</text>
 <path d="M112 150V44" stroke="#c0392b" stroke-width="2.4" opacity=".5" fill="none" stroke-linecap="round"/><path d="M112 38l-5 9h10z" fill="#c0392b" opacity=".7"/>
 <circle class="fv anm" r="5"><animateMotion dur="2.4s" begin="0s" repeatCount="indefinite" path="M112 160V34"/></circle>
 <circle class="fv anm" r="5"><animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M112 160V34"/></circle>
 <circle class="fv anm" r="5"><animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite" path="M112 160V34"/></circle>
 <text x="28" y="168" class="ft fsm" style="font-size:9.6px">ioni H⁺ verso il lume</text>
 <rect x="224" y="4" width="208" height="214" rx="10" class="eyrow"/>
 <text x="236" y="22" class="ft" font-weight="700" style="font-size:10.5px">Con IPP: la pompa è bloccata</text>
 <rect x="236" y="30" width="184" height="46" rx="5" fill="#d9902f" opacity="0.06"/>
 <text x="244" y="46" class="ft fsm" style="font-size:9.6px">lume gastrico</text><text x="412" y="46" text-anchor="end" class="ft fsm" style="font-size:9.6px">meno acido</text>
 <rect x="236" y="84" width="184" height="124" rx="5" class="ff fl" style="stroke-width:1.2"/>
 <text x="244" y="200" class="ft fsm" style="font-size:9.6px">cellula parietale</text>
 <rect x="236" y="76" width="184" height="8" fill="var(--muted)" opacity=".45"/>
 <rect x="305" y="64" width="46" height="30" rx="7" fill="#2f8f8a" opacity=".28" stroke="#2f8f8a" stroke-width="1.8"/><text x="299" y="94" text-anchor="end" class="ft" font-weight="700" style="font-size:9.6px">pompa</text>
 <path d="M313 68L343 90M343 68L313 90" stroke="#c0392b" stroke-width="3.4" stroke-linecap="round"/>
 <circle cx="318" cy="106" r="4.6" class="fv" opacity=".75"/>
 <circle cx="330" cy="112" r="4.6" class="fv" opacity=".75"/>
 <circle cx="342" cy="106" r="4.6" class="fv" opacity=".75"/>
 <circle cx="324" cy="124" r="4.6" class="fv" opacity=".75"/>
 <circle cx="338" cy="122" r="4.6" class="fv" opacity=".75"/>
 <circle cx="328" cy="103" r="4.6" class="fv anp"/>
 <rect x="364" y="126" width="48" height="20" rx="10" fill="#d9902f" opacity=".3" stroke="#d9902f" stroke-width="1.6"/><text x="388" y="140" text-anchor="middle" class="ft" font-weight="700" style="font-size:10.5px">IPP</text>
 <path d="M364 132C356 124 350 112 348 96" stroke="#d9902f" stroke-width="1.8" fill="none" stroke-dasharray="4 3"/>
 <text x="244" y="168" class="ft fsm" style="font-size:9.6px">ioni H⁺ trattenuti nella cellula</text>
 <text x="320" y="246" class="ft" font-weight="700" style="font-size:10.5px">Indicazioni principali</text>
 <rect x="8" y="228" width="127" height="24" rx="12" fill="#2f8f8a" opacity=".16"/><rect x="8" y="228" width="127" height="24" rx="12" fill="none" stroke="#2f8f8a" stroke-width="1.4"/><text x="71.5" y="244" text-anchor="middle" class="ft" style="font-size:10px">reflusso ed esofagite</text>
 <rect x="143" y="228" width="159" height="24" rx="12" fill="#2f8f8a" opacity=".16"/><rect x="143" y="228" width="159" height="24" rx="12" fill="none" stroke="#2f8f8a" stroke-width="1.4"/><text x="222.5" y="244" text-anchor="middle" class="ft" style="font-size:10px">ulcera gastrica e duodenale</text>
 <rect x="8" y="258" width="138" height="24" rx="12" fill="#2f8f8a" opacity=".16"/><rect x="8" y="258" width="138" height="24" rx="12" fill="none" stroke="#2f8f8a" stroke-width="1.4"/><text x="77.0" y="274" text-anchor="middle" class="ft" style="font-size:10px">eradicazione di H. pylori</text>
 <rect x="154" y="258" width="143" height="24" rx="12" fill="#2f8f8a" opacity=".16"/><rect x="154" y="258" width="143" height="24" rx="12" fill="none" stroke="#2f8f8a" stroke-width="1.4"/><text x="225.5" y="274" text-anchor="middle" class="ft" style="font-size:10px">gastroprotezione da FANS</text>
 <rect x="305" y="258" width="106" height="24" rx="12" fill="#2f8f8a" opacity=".16"/><rect x="305" y="258" width="106" height="24" rx="12" fill="none" stroke="#2f8f8a" stroke-width="1.4"/><text x="358.0" y="274" text-anchor="middle" class="ft" style="font-size:10px">Zollinger-Ellison</text>
 </svg>`},
{id:"vie-metaboliche",t:"Metabolismo: le tappe che si vedono in corsia",c:"Sei tappe evidenziate a turno. La glicolisi trasforma il glucosio in piruvato; con ossigeno il piruvato alimenta Krebs e catena respiratoria (circa 30 ATP per glucosio), senza ossigeno diventa lattato. Il fegato rifà glucosio dal lattato (ciclo di Cori), produce chetoni quando manca l'insulina e trasforma l'ammoniaca in urea. Ogni blocco ha un riscontro clinico: glicemia, lattato, chetoni, ammoniemia.",
 enc:["vie-metaboliche","es-chetoni","es-ammoniemia"],gl:["Gluconeogenesi","Ciclo di Cori"],st:/metabol|glicemi|lattat|chetoni|ammoni|fegato/i,
 svg:`<svg viewBox="0 0 440 326" role="img" aria-label="Sei tappe del metabolismo che si vedono in corsia: glicolisi, ciclo di Krebs, lattato, ciclo di Cori, chetoni e ciclo dell'urea">
 <rect x="8" y="4" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="4" width="424" height="50" rx="9" class="fx vf k1" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="13" width="80" height="32" rx="16" fill="#4a90d9" opacity=".22"/><rect x="16" y="13" width="80" height="32" rx="16" fill="none" stroke="#4a90d9" stroke-width="1.6"/>
 <text x="56" y="34" text-anchor="middle" class="ft" font-weight="700" style="font-size:13px">Glicolisi</text>
 <g class="ft"><text x="108" y="23" font-weight="700" style="font-size:11px">Glucosio → piruvato</text><text class="fsm" x="108" y="36" style="font-size:10px">citoplasma, senza ossigeno: 2 ATP netti</text><text class="fsm" x="108" y="48" style="font-size:9.6px" font-style="italic">è ciò che misura la glicemia</text></g>
 <circle cx="418" cy="29" r="5" fill="#4a90d9"/>
 <rect x="8" y="58" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="58" width="424" height="50" rx="9" class="fx vf k2" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="67" width="80" height="32" rx="16" fill="#3a9d6a" opacity=".22"/><rect x="16" y="67" width="80" height="32" rx="16" fill="none" stroke="#3a9d6a" stroke-width="1.6"/>
 <text x="56" y="88" text-anchor="middle" class="ft" font-weight="700" style="font-size:13px">Krebs</text>
 <g class="ft"><text x="108" y="77" font-weight="700" style="font-size:11px">Con ossigeno: la centrale dell'ATP</text><text class="fsm" x="108" y="90" style="font-size:10px">mitocondri: ciclo di Krebs e catena respiratoria</text><text class="fsm" x="108" y="102" style="font-size:9.6px" font-style="italic">circa 30 ATP per glucosio</text></g>
 <circle cx="418" cy="83" r="5" fill="#3a9d6a"/>
 <rect x="8" y="112" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="112" width="424" height="50" rx="9" class="fx vf k3" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="121" width="80" height="32" rx="16" fill="#d9902f" opacity=".22"/><rect x="16" y="121" width="80" height="32" rx="16" fill="none" stroke="#d9902f" stroke-width="1.6"/>
 <text x="56" y="142" text-anchor="middle" class="ft" font-weight="700" style="font-size:12.5px">Lattato</text>
 <g class="ft"><text x="108" y="131" font-weight="700" style="font-size:11px">Senza ossigeno il piruvato diventa lattato</text><text class="fsm" x="108" y="144" style="font-size:10px">shock, sepsi, ipoperfusione dei tessuti</text><text class="fsm" x="108" y="156" style="font-size:9.6px" font-style="italic">acidosi lattica</text></g>
 <circle cx="418" cy="137" r="5" fill="#d9902f"/>
 <rect x="8" y="166" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="166" width="424" height="50" rx="9" class="fx vf k4" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="175" width="80" height="32" rx="16" fill="#8a5cd6" opacity=".22"/><rect x="16" y="175" width="80" height="32" rx="16" fill="none" stroke="#8a5cd6" stroke-width="1.6"/>
 <text x="56" y="196" text-anchor="middle" class="ft" font-weight="700" style="font-size:14px">Cori</text>
 <g class="ft"><text x="108" y="185" font-weight="700" style="font-size:11px">Il fegato rifà glucosio dal lattato</text><text class="fsm" x="108" y="198" style="font-size:10px">gluconeogenesi: anche da aminoacidi e glicerolo</text><text class="fsm" x="108" y="210" style="font-size:9.6px" font-style="italic">digiuno, epatopatia, alcol: ipoglicemia</text></g>
 <circle cx="418" cy="191" r="5" fill="#8a5cd6"/>
 <rect x="8" y="220" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="220" width="424" height="50" rx="9" class="fx vf k5" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="229" width="80" height="32" rx="16" fill="#c0392b" opacity=".22"/><rect x="16" y="229" width="80" height="32" rx="16" fill="none" stroke="#c0392b" stroke-width="1.6"/>
 <text x="56" y="250" text-anchor="middle" class="ft" font-weight="700" style="font-size:13px">Chetoni</text>
 <g class="ft"><text x="108" y="239" font-weight="700" style="font-size:11px">Poca insulina: acidi grassi → chetoni</text><text class="fsm" x="108" y="252" style="font-size:10px">digiuno prolungato e diabete senza insulina</text><text class="fsm" x="108" y="264" style="font-size:9.6px" font-style="italic">chetoacidosi diabetica</text></g>
 <circle cx="418" cy="245" r="5" fill="#c0392b"/>
 <rect x="8" y="274" width="424" height="50" rx="9" class="eyrow"/><rect x="8" y="274" width="424" height="50" rx="9" class="fx vf k6" fill="none" style="stroke-width:2.6"/>
 <rect x="16" y="283" width="80" height="32" rx="16" fill="#2f8f8a" opacity=".22"/><rect x="16" y="283" width="80" height="32" rx="16" fill="none" stroke="#2f8f8a" stroke-width="1.6"/>
 <text x="56" y="304" text-anchor="middle" class="ft" font-weight="700" style="font-size:14px">Urea</text>
 <g class="ft"><text x="108" y="293" font-weight="700" style="font-size:11px">Il fegato trasforma l'ammoniaca in urea</text><text class="fsm" x="108" y="306" style="font-size:10px">l'urea esce con le urine</text><text class="fsm" x="108" y="318" style="font-size:9.6px" font-style="italic">epatopatia: ammoniaca alta, encefalopatia</text></g>
 <circle cx="418" cy="299" r="5" fill="#2f8f8a"/>
 </svg>`},
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
 <g class="ft fsm"><text x="232" y="112">sì</text><text x="232" y="178">no</text><text x="232" y="244">presente, ≤ 2 s</text></g></svg>`},
{id:"posizioni",t:"Posizioni del paziente a letto",c:"Fowler (testata a 45-60°): dispnea, pasti, nutrizione enterale. Semi-Fowler (30°): prevenzione dell'aspirazione e della polmonite da ventilazione, minore scivolamento. Supina: esami e riposo. Laterale e Sims (laterale sinistra semiprona): alternanza dei punti d'appoggio, clisteri. Prona: alcune insufficienze respiratorie gravi. Trendelenburg: oggi poco usata nello shock, dove si preferisce il sollevamento passivo delle gambe.",
 enc:["mobilizzazione","lesioni-pressione"],gl:["Decubito"],st:/cute|lesion/i,
 svg:`<svg viewBox="0 0 480 250" role="img" aria-label="Sei posizioni del paziente a letto">
 <g transform="translate(0 0)"><path class="bed" d="M10 66H70L44 26M70 66H150M14 66V78M146 66V78"/><circle class="pz" cx="40" cy="18" r="8"/><path class="pzb" d="M44 28L72 58H148"/><text class="ft" x="80" y="100" text-anchor="middle" font-weight="700">Fowler 45-60°</text></g>
 <g transform="translate(160 0)"><path class="bed" d="M10 66H70L24 44M70 66H150M14 66V78M146 66V78"/><circle class="pz" cx="20" cy="36" r="8"/><path class="pzb" d="M28 42L72 58H148"/><text class="ft" x="80" y="100" text-anchor="middle" font-weight="700">Semi-Fowler 30°</text></g>
 <g transform="translate(320 0)"><path class="bed" d="M10 66H150M14 66V78M146 66V78"/><circle class="pz" cx="22" cy="50" r="8"/><path class="pzb" d="M32 56H146"/><text class="ft" x="80" y="100" text-anchor="middle" font-weight="700">Supina</text></g>
 <g transform="translate(0 125)"><path class="bed" d="M10 66H150M14 66V78M146 66V78"/><circle class="pz" cx="22" cy="50" r="8"/><path class="pzb" d="M32 56H96L118 40L140 48M96 56H146"/><text class="ft" x="80" y="100" text-anchor="middle" font-weight="700">Laterale / Sims</text></g>
 <g transform="translate(160 125)"><path class="bed" d="M10 66H150M14 66V78M146 66V78"/><circle class="pz" cx="22" cy="52" r="8"/><path class="pzb" d="M32 57H146"/><path class="fl" d="M20 60Q24 64 30 60"/><text class="ft" x="80" y="100" text-anchor="middle" font-weight="700">Prona</text></g>
 <g transform="translate(320 125)"><path class="bed" d="M10 76L150 40M18 74V86M144 42V86"/><circle class="pz" cx="24" cy="62" r="8"/><path class="pzb" d="M34 64L148 34"/><text class="ft" x="80" y="100" text-anchor="middle" font-weight="700">Trendelenburg</text></g></svg>`},
{id:"sedi-im",t:"Sedi delle iniezioni intramuscolari",c:"Ventrogluteo (sede preferita nell'adulto): palmo sul grande trocantere, indice sulla spina iliaca antero-superiore, medio verso la cresta iliaca; si inietta al centro della «V», lontano da nervo sciatico e grandi vasi. Deltoide: 2-3 dita sotto l'acromion, piccoli volumi. Vasto laterale: terzo medio della faccia esterna della coscia, sede di scelta nel lattante.",
 enc:["vie-somministrazione"],gl:[],st:/terapia|farmac/i,
 svg:`<svg viewBox="0 0 480 240" role="img" aria-label="Sedi ventroglutea, deltoidea e vasto laterale">
 <g><path class="ff fl" d="M30 40Q80 20 130 44Q150 90 136 150Q120 200 70 214Q36 190 30 140Z"/><path class="fl dash" d="M40 58Q84 34 126 56"/><circle class="fv" cx="114" cy="62" r="5"/><circle class="fl ff" cx="72" cy="150" r="13"/>
  <path class="fs thick" d="M72 150L112 66M72 150L58 58"/><path class="fl" d="M60 168Q72 186 88 168" /><circle cx="84" cy="88" r="7" class="fx"/>
  <g class="ft fsm"><text x="70" y="12">spina iliaca antero-superiore</text><path class="lead" d="M116 16L114 56"/><text x="2" y="30">cresta iliaca</text><text x="40" y="186">grande trocantere</text></g>
  <text class="ft" x="80" y="232" text-anchor="middle" font-weight="700">Ventrogluteo</text></g>
 <g transform="translate(170 0)"><path class="ff fl" d="M40 40Q70 20 104 34Q122 44 120 70L112 200H58L46 80Q36 60 40 40Z"/><circle class="fv" cx="96" cy="38" r="5"/><path class="fl dash" d="M60 62H118M62 92H116"/><path d="M66 70L112 70L90 120Z" class="fa fl"/><circle cx="88" cy="84" r="7" class="fx"/>
  <g class="ft fsm"><text x="100" y="28">acromion</text><text x="122" y="80">2-3 dita sotto</text></g>
  <text class="ft" x="85" y="232" text-anchor="middle" font-weight="700">Deltoide</text></g>
 <g transform="translate(330 0)"><path class="ff fl" d="M40 24H110Q118 120 104 210H52Q34 120 40 24Z"/><path class="fl dash" d="M38 86H114M40 148H112"/><rect x="82" y="92" width="24" height="50" rx="8" class="fa fl"/><circle cx="94" cy="117" r="7" class="fx"/>
  <g class="ft fsm"><text x="4" y="58">terzo superiore</text><text x="4" y="120">terzo medio</text><text x="4" y="182">terzo inferiore</text></g>
  <text class="ft" x="76" y="232" text-anchor="middle" font-weight="700">Vasto laterale</text></g></svg>`},
{id:"strati-cute",t:"Gli strati della cute",c:"Epidermide (cheratinociti, melanociti; senza vasi), derma (collagene, vasi, nervi, follicoli, ghiandole sebacee e sudoripare) e ipoderma (tessuto adiposo). La profondità di ustioni e lesioni si descrive in base agli strati coinvolti.",
 enc:["cute","ustioni","lesioni-pressione"],gl:[],st:/cute/i,
 svg:`<svg viewBox="0 0 480 250" role="img" aria-label="Sezione della cute con epidermide, derma e ipoderma">
 <path d="M20 40Q60 34 100 40T180 40T260 40T340 40V58Q300 52 260 58T180 58T100 58T20 58Z" fill="#e3a98c"/>
 <path d="M20 58Q60 52 100 58T180 58T260 58T340 58V140H20Z" fill="#f3cdb7"/>
 <rect x="20" y="140" width="320" height="90" fill="#f6e1a0"/>
 <g fill="#fbefc6" stroke="#e0c46e" stroke-width="1"><circle cx="50" cy="168" r="16"/><circle cx="86" cy="196" r="18"/><circle cx="130" cy="166" r="15"/><circle cx="176" cy="200" r="17"/><circle cx="222" cy="170" r="16"/><circle cx="268" cy="198" r="18"/><circle cx="310" cy="168" r="15"/></g>
 <path d="M96 20L100 40L106 126Q108 140 98 140Q88 140 92 126L96 40" fill="none" stroke="#5a3a28" stroke-width="2.5"/><ellipse cx="99" cy="132" rx="10" ry="8" fill="#e8b49a" stroke="#b5655a"/>
 <ellipse cx="116" cy="84" rx="9" ry="6" fill="#f7e3a1" stroke="#c9a24a"/>
 <path d="M220 40V100Q220 114 228 120Q240 128 232 136Q220 144 230 150Q242 156 230 160" fill="none" stroke="#5f8fb4" stroke-width="2"/>
 <path d="M20 120Q120 104 200 122T340 116" fill="none" stroke="#c0392b" stroke-width="3"/><path d="M20 128Q120 114 200 130T340 124" fill="none" stroke="#3b5bdb" stroke-width="3"/>
 <g class="ft"><text x="350" y="52" font-weight="700">Epidermide</text><text x="350" y="100" font-weight="700">Derma</text><text x="350" y="190" font-weight="700">Ipoderma</text></g>
 <g class="ft fsm"><text x="62" y="16">pelo</text><text x="128" y="80">gh. sebacea</text><text x="244" y="160">gh. sudoripara</text><text x="246" y="112">vasi</text><text x="20" y="246">tessuto adiposo</text></g></svg>`},
{id:"auscultazione",t:"Focolai di auscultazione cardiaca",c:"Aortico: II spazio intercostale a destra dello sterno. Polmonare: II spazio a sinistra dello sterno. Tricuspidale: IV-V spazio a sinistra dello sterno. Mitralico (itta della punta): V spazio sulla linea emiclaveare sinistra. Nei polmoni si ausculta confrontando punti simmetrici, dagli apici alle basi, davanti e dietro.",
 enc:["esame-obiettivo","cuore-fisiologia"],gl:[],st:/torace|cuore/i,
 svg:`<svg viewBox="0 0 420 300" role="img" aria-label="Torace con i focolai di auscultazione aortico, polmonare, tricuspidale e mitralico">
 <path class="ff fl" d="M110 34Q210 16 310 34L350 66Q366 150 350 240Q320 280 210 284Q100 280 70 240Q54 150 70 66Z"/>
 <rect class="fa fl" x="198" y="54" width="24" height="132" rx="7"/>
 <path class="fl dash" d="M88 92Q210 78 332 92M84 124Q210 110 336 124M82 154Q210 140 338 154M82 184Q210 170 338 184"/><path class="fl dash" d="M272 60V250"/>
 <g class="ft fsm"><text x="6" y="96">II spazio</text><text x="6" y="128">III spazio</text><text x="6" y="158">IV spazio</text><text x="6" y="188">V spazio</text><text x="278" y="262">emiclaveare sx</text></g>
 <g><circle cx="186" cy="86" r="11" fill="#d93a32"/><circle cx="234" cy="86" r="11" fill="#3b5bdb"/><circle cx="232" cy="162" r="11" fill="#e6b800"/><circle cx="272" cy="178" r="11" fill="#2f9e44"/></g>
 <g font-family="var(--f-mono)" font-size="11" font-weight="800" fill="#fff" text-anchor="middle"><text x="186" y="90">A</text><text x="234" y="90">P</text><text x="232" y="166">T</text><text x="272" y="182">M</text></g>
 <g class="ft" font-size="11.5"><text x="104" y="74">Aortico</text><path class="lead" d="M150 78L176 84"/><text x="268" y="74">Polmonare</text><path class="lead" d="M266 78L244 84"/><text x="132" y="214">Tricuspidale</text><path class="lead" d="M204 210L226 170"/><text x="300" y="214">Mitralico</text><path class="lead" d="M310 202L280 186"/></g>
 <text class="ft fsm" x="6" y="20">Destra del paziente a sinistra dell'immagine</text></svg>`},
{id:"compartimentale",t:"Sindrome compartimentale della gamba",c:"Dopo una frattura, un trauma da schiacciamento o un gesso stretto, la pressione cresce dentro un compartimento chiuso dalla fascia e comprime vasi e nervi. Il segno precoce è un dolore sproporzionato che aumenta con lo stiramento passivo; polso assente e paralisi sono tardivi. Si allenta subito ogni bendaggio e si avvisa il medico: può servire la fasciotomia.",
 enc:["ortopedia","maxiemergenza"],gl:["Sindrome da schiacciamento"],st:/^$/,
 svg:`<svg viewBox="0 0 480 260" role="img" aria-label="Sezione della gamba con i quattro compartimenti">
 <ellipse class="ff fl" cx="150" cy="128" rx="112" ry="102"/>
 <path d="M126 50Q160 20 206 34Q236 54 246 92L214 112L120 70Z" fill="color-mix(in srgb,var(--vital) 24%,var(--paper))"/>
 <path class="fl" d="M120 70L212 116" stroke-width="2.4"/><path class="fl" d="M126 50Q164 22 206 34M220 106L254 88M222 134L256 156" stroke-width="2"/>
 <path class="fl" d="M98 80Q118 168 214 136" stroke-width="2"/>
 <ellipse cx="106" cy="66" rx="22" ry="17" fill="#ece5d3" stroke="#a89c80"/><ellipse cx="218" cy="120" rx="11" ry="10" fill="#ece5d3" stroke="#a89c80"/>
 <g class="ft fsm" text-anchor="middle"><text x="106" y="70">tibia</text><text x="218" y="138" font-size="9">perone</text></g>
 <g class="ft" font-size="11" font-weight="700" text-anchor="middle"><text x="176" y="64">Anteriore</text><text x="236" y="124" font-size="10">Lat.</text><text x="150" y="122">Posteriore</text><text x="150" y="135">profondo</text><text x="150" y="196">Posteriore</text><text x="150" y="209">superficiale</text></g>
 <g class="fs"><path d="M200 26L214 10M262 96L282 90M250 196L266 212M44 150L24 158"/></g>
 <g class="ft" font-size="12"><text x="310" y="60" font-weight="700">Le «5 P»</text><text x="310" y="84">Pain · dolore</text><text x="310" y="104">Pallore</text><text x="310" y="124">Parestesie</text><text x="310" y="144">Pulseless · polso assente</text><text x="310" y="164">Paralisi</text></g>
 <text class="ft fsm" x="310" y="190">Primo segno: dolore</text><text class="ft fsm" x="310" y="203">sproporzionato</text><text class="ft fsm" x="310" y="220">Polso e paralisi:</text><text class="ft fsm" x="310" y="233">segni tardivi</text>
 <text class="ft fsm" x="20" y="252">La fascia rigida non si espande: la pressione sale (frecce)</text></svg>`},
/* ---- Area critica ---- */
{id:"abcde",t:"Valutazione ABCDE",c:"Si valuta e si tratta ogni problema prima di passare al successivo. Nel trauma si parte da x: il controllo delle emorragie massive esterne (compressione, tourniquet).",
 enc:["abcde"],gl:[],st:/abcde|valutazione|paziente critico|emergenza/i,
 svg:FT.svg(440,322,"Le cinque lettere dell'ABCDE in sequenza, con che cosa si controlla in ciascuna",
  [["A","Airway · vie aeree",["Parla? Rumori (gorgoglio, stridore)? Aspirazione, cannula","Iperestensione e mento sollevato (trauma: sublussazione)"]],
   ["B","Breathing · respiro",["Frequenza, SpO₂, movimenti del torace, auscultazione","Ossigeno"]],
   ["C","Circulation · circolo",["Polso, pressione, refill (normale < 2 s), cute, diuresi","Accessi venosi e liquidi"]],
   ["D","Disability · coscienza",["AVPU o GCS, pupille","Glicemia"]],
   ["E","Exposure · esposizione",["Esame completo, temperatura, lesioni","Proteggere da ipotermia e privacy"]]
  ].map((r,i)=>{const y=8+i*58;return FT.dot(30,y+25,r[0],{r:18})+FT.box(62,y,370,50,r[1],r[2],"info")+(i<4?FT.arrow(30,y+44,30,y+64):"")}).join("")
  +FT.text(8,312,"Nel trauma si parte da x: emorragie massive esterne (compressione, tourniquet).",{sm:true}))},
{id:"rcp-algoritmo",t:"Arresto cardiaco: sequenza BLS e ALS",c:"Dopo l'analisi del ritmo la strada si divide: ritmi defibrillabili (shock subito) e non defibrillabili (adrenalina il prima possibile). In entrambi i casi la RCP riparte per 2 minuti e si cercano le cause reversibili. Linee guida ERC 2025.",
 enc:["bls-acls"],gl:[],st:/rcp|bls|arresto|rianimazione/i,
 svg:FT.svg(440,424,"Algoritmo dell'arresto cardiaco: chiamata, compressioni, analisi del ritmo, ramo defibrillabile e non defibrillabile, cause reversibili",
  FT.box(70,6,300,34,"Non risponde e non respira normalmente","","alarm")+FT.arrow(220,40,220,56)
  +FT.box(60,56,320,46,"Chiama il 112 e chiedi un DAE",["Compressioni 100-120/min, 5-6 cm · adulto 30:2"],"info")+FT.arrow(220,102,220,118)
  +FT.box(100,118,240,32,"Collega il DAE e analizza il ritmo","","info")
  +FT.elbow([[220,150],[220,162],[111,162],[111,178]])+FT.elbow([[220,150],[220,162],[329,162],[329,178]])
  +FT.box(12,178,198,40,"Defibrillabile","FV · TV senza polso","alarm")+FT.box(230,178,198,40,"Non defibrillabile","Asistolia · PEA","warn")
  +FT.arrow(111,218,111,234)+FT.arrow(329,218,329,234)
  +FT.box(12,234,198,96,"Shock, poi RCP subito",["per 2 minuti","Adrenalina 1 mg dopo il 3° shock,","poi ogni 3-5 min","Amiodarone 300 mg dopo il 3° shock","(150 mg dopo il 5°)"],"alarm")
  +FT.box(230,234,198,96,"RCP subito per 2 minuti",["Adrenalina 1 mg il prima possibile,","poi ogni 3-5 min","Nessuno shock"],"warn")
  +FT.box(12,338,416,24,"Ogni 2 minuti: rivaluta il ritmo e ripeti","","info")
  +FT.box(12,370,416,48,"Cerca e tratta le cause reversibili: 4 I e 4 T",["4 I: ipossia, ipovolemia, ipo/iperkaliemia e metaboliche, ipotermia","4 T: trombosi, tamponamento, tossici, pneumotorace iperteso"],"ok"))},
{id:"shock-tipi",t:"I quattro tipi di shock",c:"Lo shock è una perfusione dei tessuti inadeguata: cambia la causa, il trattamento parte da ciò che manca (volume, pompa, tono dei vasi, via libera al flusso).",
 enc:["shock"],gl:[],st:/shock|emorragia|sepsi/i,
 svg:FT.svg(440,340,"Quattro riquadri con i tipi di shock e le cause, poi i segni comuni e l'indice di shock",
  FT.box(8,8,208,96,"Ipovolemico",["manca volume","emorragia · disidratazione","ustioni"],"info")
  +FT.box(224,8,208,96,"Cardiogeno",["la pompa non spinge","infarto esteso · aritmie","insufficienza di pompa"],"info")
  +FT.box(8,112,208,96,"Distributivo",["vasi dilatati","settico · anafilattico","neurogeno (bradicardia)"],"info")
  +FT.box(224,112,208,96,"Ostruttivo",["ostacolo al flusso","embolia polmonare · tamponamento","pneumotorace iperteso"],"info")
  +FT.box(8,216,424,62,"Segni comuni",["Tachicardia (tranne nel neurogeno), ipotensione (tardiva),","oliguria, lattati alti, coscienza alterata ·","cute fredda e marezzata (calda all'inizio nel distributivo)"],"warn")
  +FT.box(8,286,424,46,"Indice di shock = FC ÷ PAS: oltre 1 suggerisce shock","può restare basso con beta-bloccanti, bradicardia o shock neurogeno","alarm"))},
{id:"ega-acido-base",t:"Emogasanalisi: leggere l'equilibrio acido-base",c:"Si guarda prima il pH, poi PaCO₂ (componente respiratoria) e HCO₃⁻ (componente metabolica). Il disturbo primario è quello che spiega la direzione del pH: PaCO₂ in senso opposto al pH, HCO₃⁻ nello stesso senso; l'altro valore è il compenso.",
 enc:["emogasanalisi"],gl:[],st:/emogas|acido|ega|respir/i,
 svg:FT.svg(440,274,"Tabella dei quattro disturbi acido-base con pH, PaCO₂ e HCO₃⁻ e i quattro passi di lettura",
  FT.box(112,8,156,34,"Acidosi","pH < 7,35","alarm")+FT.box(276,8,156,34,"Alcalosi","pH > 7,45","warn")
  +FT.box(8,48,96,66,"Respiratoria","PaCO₂","info")+FT.box(8,120,96,66,"Metabolica","HCO₃⁻","info")
  +FT.box(112,48,156,66,"Acidosi respiratoria",["PaCO₂ alta","BPCO, ipoventilazione"],"alarm")
  +FT.box(276,48,156,66,"Alcalosi respiratoria",["PaCO₂ bassa","iperventilazione"],"warn")
  +FT.box(112,120,156,66,"Acidosi metabolica",["HCO₃⁻ basso","chetoacidosi, shock,","insufficienza renale"],"alarm")
  +FT.box(276,120,156,66,"Alcalosi metabolica",["HCO₃⁻ alto","vomito, diuretici"],"warn")
  +FT.box(8,198,100,48,"1 · pH",["< 7,35 acidosi","> 7,45 alcalosi"],"ok")+FT.box(116,198,100,48,"2 · PaCO₂",["componente","respiratoria"],"ok")
  +FT.box(224,198,100,48,"3 · HCO₃⁻",["componente","metabolica"],"ok")+FT.box(332,198,100,48,"4 · Compenso",["l'altro sistema","tenta di correggere"],"ok")
  +FT.text(8,264,"Lattati normali < 2 mmol/L · prelievo arterioso radiale dopo il test di Allen",{sm:true}))},
{id:"ossigeno-dispositivi",t:"Ossigeno: dispositivi, flussi e FiO₂",c:"Ogni dispositivo copre un intervallo diverso di FiO₂: si sceglie in base al bisogno e si titola sul bersaglio di SpO₂. La maschera di Venturi dà una FiO₂ precisa.",
 enc:["ossigenoterapia"],gl:[],st:/ossigen|respir|ipossi/i,
 svg:(()=>{const X=p=>140+(p-20)*3.55,row=(i,n,f,a,b,k)=>{const y=34+i*50;return FT.text(8,y+11,n,{b:true})+FT.text(8,y+24,f,{sm:true})+`<rect class="fbx k-${k}" x="${X(a)}" y="${y}" width="${X(b)-X(a)}" height="22" rx="5"/>`+(k==="ok"?FT.text(X(a)-6,y+15,"circa "+a+"-"+b+"%",{a:"end",sm:true,c:"halo"}):FT.text(X(b)+6,y+15,a+"-"+b+"%",{sm:true}))};
  return FT.svg(440,340,"Barre della FiO₂ ottenibile con cannule nasali, maschera semplice, Venturi, reservoir e alti flussi, e il bersaglio di SpO₂",
   [20,40,60,80,100].map(p=>`<path class="dash" d="M${X(p)} 22V228"/>`+FT.text(X(p),16,p+"%",{a:"middle",sm:true})).join("")
   +row(0,"Cannule nasali","1-6 L/min",24,44,"info")+row(1,"Maschera semplice","5-10 L/min",40,60,"info")+row(2,"Maschera di Venturi","FiO₂ precisa",24,60,"warn")
   +row(3,"Reservoir","10-15 L/min",60,90,"ok")
   +FT.text(8,34+4*50+11,"Alti flussi nasali",{b:true})+FT.text(8,34+4*50+24,"fino a 60 L/min",{sm:true})
   +`<rect class="dashbox" x="${X(21)}" y="${34+4*50}" width="${X(100)-X(21)}" height="22" rx="5"/>`+FT.text((X(21)+X(100))/2,34+4*50+15,"FiO₂ regolabile · umidificati e riscaldati",{a:"middle",sm:true})
   +FT.box(8,290,424,40,"Target SpO₂ 94-98%","88-92% nei pazienti a rischio di ipercapnia","ok"));
  })()},
/* ---- Farmacologia e anestesia ---- */
{id:"pk-curve",t:"Concentrazione nel tempo e stato stazionario",c:"Dopo una dose la concentrazione sale, raggiunge un picco e scende; il farmaco funziona se resta nella finestra tra la soglia efficace e quella tossica. Con dosi ripetute si arriva allo stato stazionario in circa 4-5 emivite.",
 enc:["farmacocinetica"],gl:[],st:/farmac|dose|emivita|terapeutic/i,
 svg:(()=>{const A=(t,c)=>[28+160*t,214-150*c],B=(k)=>268+15+(k-1)*30,fr=[.5,.75,.875,.9375,.969];
  return FT.svg(440,300,"A sinistra la curva concentrazione-tempo di una dose orale ed endovenosa con la finestra terapeutica; a destra l'avvicinarsi allo stato stazionario in 5 emivite",
   FT.text(28,14,"Una dose",{b:true})+FT.text(268,14,"Dosi ripetute",{b:true})
   +`<path class="fs" d="M28 32h16"/>`+FT.text(48,36,"orale",{sm:true})+`<path class="fw" d="M92 32h16"/>`+FT.text(112,36,"endovenosa",{sm:true})
   +FT.axes(28,214,160,150,"tempo","concentrazione")
   +`<rect class="band" x="28" y="91" width="160" height="78"/><path class="dash" d="M28 91H188M28 169H188"/>`
   +FT.text(192,94,"tossica",{sm:true})+FT.text(192,172,"efficace",{sm:true})+FT.text(192,130,["finestra","terapeutica"],{sm:true})
   +FT.curve([[0,0],[.1,.22],[.22,.5],[.35,.6],[.5,.54],[.7,.34],[.85,.22],[1,.14]].map(p=>A(p[0],p[1])),"fs")
   +FT.curve([[0,.74],[.12,.64],[.3,.48],[.5,.34],[.75,.22],[1,.14]].map(p=>A(p[0],p[1])),"fw")
   +FT.axes(268,214,150,150,"","")+`<path class="dash" d="M268 64H418"/>`+FT.text(418,58,"stato stazionario",{a:"end",sm:true})
   +fr.map((f,i)=>{const h=150*f,x=B(i+1)-13;return `<rect class="fbx k-info" x="${x}" y="${214-h}" width="26" height="${h}"/>`+FT.text(x+13,214-h+13,Math.round(f*100)+"%",{a:"middle",sm:true})+FT.text(x+13,228,String(i+1),{a:"middle",sm:true})}).join("")
   +FT.text(418,244,"numero di emivite",{a:"end",sm:true})
   +FT.text(8,264,["Emivita: tempo per dimezzare la concentrazione plasmatica.","Stato stazionario dopo circa 4-5 emivite.","Via endovenosa: biodisponibilità 100%."],{sm:true}))})()},
{id:"insuline-profili",t:"Profili d'azione delle insuline",c:"Le ultrarapide agiscono presto e per poco (si danno ai pasti), la regolare più lentamente, le basali restano quasi costanti per circa un giorno. I profili sono indicativi: dipendono da prodotto, dose, sede e persona.",
 enc:["insuline"],gl:[],st:/insulin|diabet|glicem/i,
 svg:(()=>{const P=(h,v)=>[40+385*h/24,200-150*v];
  return FT.svg(440,288,"Tre curve di attività nelle 24 ore: insulina ultrarapida con picco precoce, regolare con picco più tardivo, basale piatta",
   FT.axes(40,200,385,150,"","attività")+FT.text(425,232,"ore dall'iniezione",{a:"end",sm:true})
   +[0,4,8,12,16,20,24].map(h=>`<path class="fl" d="M${P(h,0)[0]} 200v4"/>`+FT.text(P(h,0)[0],214,String(h),{a:"middle",sm:true})).join("")
   +`<path class="fs" d="M40 32h16"/>`+FT.text(60,36,"ultrarapida",{sm:true})+`<path class="fw" d="M150 32h16"/>`+FT.text(170,36,"regolare",{sm:true})+`<path class="fo" d="M250 32h16"/>`+FT.text(270,36,"basale",{sm:true})
   +FT.curve([[0,0],[.25,.05],[.8,.5],[1.5,.85],[2.5,.6],[3.5,.25],[5,0]].map(p=>P(p[0],p[1])),"fs")
   +FT.curve([[0,0],[.5,.04],[1.5,.3],[3,.62],[4.5,.45],[6,.18],[8,0]].map(p=>P(p[0],p[1])),"fw")
   +FT.curve([[0,0],[2,.15],[5,.24],[12,.24],[22,.22],[24,.15]].map(p=>P(p[0],p[1])),"fo")
   +FT.text(8,236,["Ultrarapide (lispro, aspart, glulisina): inizio in 10-15 min, ai pasti","Regolare: la usuale per infusione endovenosa","Basali (glargine, degludec, detemir): profilo quasi piatto, di solito una volta al giorno","Profili indicativi: variano con prodotto, dose, sede di iniezione e persona"],{sm:true}))})()},
{id:"coagulazione-farmaci",t:"Dove agiscono gli anticoagulanti",c:"Warfarin riduce la sintesi dei fattori vitamina K-dipendenti, l'eparina potenzia l'antitrombina, gli anticoagulanti orali diretti (DOAC) bloccano direttamente il fattore Xa o la trombina. Ognuno ha il suo controllo e il suo antidoto.",
 enc:["anticoagulanti"],gl:[],st:/anticoag|eparina|warfarin|coagul/i,
 svg:FT.svg(440,392,"Cascata della coagulazione semplificata con i punti d'azione di warfarin, eparina, anticoagulanti orali diretti e la tabella di antidoti e controlli",
  FT.box(96,6,118,34,"Via intrinseca","si controlla con aPTT","info")+FT.box(226,6,118,34,"Via estrinseca","si controlla con INR","info")
  +FT.arrow(155,40,190,58)+FT.arrow(285,40,250,58)
  +FT.box(145,58,150,34,"Fattore X → Xa","","warn")+FT.arrow(220,92,220,108)
  +FT.box(145,108,150,34,"Protrombina → trombina","","warn")+FT.arrow(220,142,220,158)
  +FT.box(145,158,150,34,"Fibrinogeno → fibrina","","warn")+FT.arrow(220,192,220,208)
  +FT.box(145,208,150,30,"Coagulo stabile","","alarm")
  +FT.box(8,50,104,66,"Warfarin",["riduce i fattori","II, VII, IX, X","(vitamina K)"],"ok")+FT.arrow(112,76,145,72,{dash:true})
  +FT.box(316,42,116,50,"Anti-Xa orali",["rivaroxaban,","apixaban, edoxaban"],"ok")+FT.elbow([[316,82],[306,82],[306,100],[262,100],[262,108]],{dash:true})
  +FT.box(316,100,116,74,["Eparina","non frazionata"],["potenzia","l'antitrombina:","Xa e trombina"],"ok")+FT.arrow(316,137,295,134,{dash:true})
  +FT.box(316,182,116,44,"Dabigatran",["blocca la trombina"],"ok")+FT.arrow(316,204,295,180,{dash:true})
  +FT.text(8,262,"Antidoto e controllo",{b:true})
  +[["Eparina non frazionata","protamina","aPTT"],["Warfarin","vitamina K + PCC","INR"],["Dabigatran","idarucizumab","senza INR"],["Anti-Xa orali","andexanet alfa (emorragia grave)","senza INR"]].map((r,i)=>{const y=270+i*26;return `<rect class="fbx" x="8" y="${y}" width="424" height="22" rx="6"/>`+FT.text(16,y+15,r[0],{b:true})+FT.text(160,y+15,r[1])+FT.text(424,y+15,r[2],{a:"end",sm:true})}).join("")
  +FT.text(8,384,"PCC: concentrato di complesso protrombinico",{sm:true}))},
{id:"giunzione-neuromuscolare",t:"Giunzione neuromuscolare e miorilassanti",c:"L'acetilcolina rilasciata dal nervo attiva i recettori del muscolo e provoca la contrazione. Il blocco si può produrre agendo sul recettore e si inverte aumentando l'acetilcolina (neostigmina) o inattivando il farmaco (sugammadex).",
 enc:["anest-miorilassanti"],gl:[],st:/miorilass|anestes|giunzione|curar/i,
 svg:FT.svg(440,340,"Terminale nervoso che libera acetilcolina sui recettori della fibra muscolare, con i punti d'azione di succinilcolina, miorilassanti non depolarizzanti, neostigmina e sugammadex",
  `<rect class="fbx k-info" x="20" y="12" width="400" height="64" rx="26"/>`+FT.text(38,32,"Terminale del nervo",{b:true})
  +[80,160,235,345].map(x=>`<circle class="fbx k-ok" cx="${x}" cy="56" r="6"/>`).join("")
  +[100,180,235,345].map(x=>FT.arrow(x,68,x,104,{h:6})).join("")
  +[[92,92],[108,96],[172,94],[188,92],[227,96],[243,92],[337,94],[353,96]].map(p=>`<circle class="fh" cx="${p[0]}" cy="${p[1]}" r="2.6"/>`).join("")
  +FT.text(372,100,"acetilcolina",{sm:true})
  +`<rect class="fbx" x="20" y="116" width="400" height="48" rx="8"/>`
  +[60,168].map(x=>`<rect class="fbx k-ok" x="${x-11}" y="110" width="22" height="14" rx="3"/>`).join("")
  +`<rect class="fbx k-warn" x="265" y="92" width="22" height="12" rx="3"/>`
  +FT.text(410,144,"Fibra muscolare",{a:"end",b:true})+FT.text(84,148,"recettori",{sm:true})+FT.text(292,101,"enzima",{sm:true})
  +FT.box(8,186,104,84,["Succinilcolina"],["depolarizzante:","lo attiva in modo","prolungato"],"alarm")+FT.arrow(60,186,60,127,{dash:true,h:6})
  +FT.box(116,186,104,84,["Non","depolarizzanti"],["bloccano il","recettore","(rocuronio…)"],"alarm")+FT.arrow(168,186,168,127,{dash:true,h:6})
  +FT.box(224,186,104,84,"Neostigmina",["blocca l'enzima","dell'ACh: inverte i","non depolarizzanti","(con atropina)"],"ok")+FT.arrow(276,186,276,106,{dash:true,h:6})
  +FT.box(332,186,104,84,"Sugammadex",["avvolge","rocuronio e","vecuronio e li","inattiva"],"ok")
  +FT.box(8,280,428,50,"Prima dell'estubazione",["TOF ratio di almeno 0,9,","misurato con monitor quantitativo"],"info"))},
/* ---- Ecografia ---- */
{id:"eco-formazione-immagine",t:"Come nasce un'immagine ecografica",c:"Gli ultrasuoni attraversano i tessuti e si riflettono dove cambia l'impedenza acustica: più forte la riflessione, più chiaro il punto sullo schermo. L'osso riflette quasi tutto e lascia un'ombra dietro di sé; l'aria blocca il fascio, per questo serve il gel.",
 enc:["eco-principi","eco-artefatti"],gl:[],st:/ecograf|ultrasuon|sonda/i,
 svg:FT.svg(440,296,"Sonda con gel che invia ultrasuoni nei tessuti, echi più deboli dalle interfacce e forti dall'osso con ombra posteriore, e la scala delle luminosità: anecogeno, ipoecogeno, isoecogeno, iperecogeno",
  `<rect class="fbx k-info" x="76" y="8" width="64" height="24" rx="6"/>`+FT.text(108,24,"Sonda",{a:"middle",b:true})
  +`<rect class="fa" x="68" y="34" width="80" height="6"/>`+FT.text(154,40,"gel",{sm:true})
  +`<rect class="ff fl" x="20" y="44" width="200" height="176"/>`
  +`<rect class="fa" x="21" y="96" width="198" height="54"/><path class="dash" d="M21 96H219"/>`
  +FT.text(26,64,"tessuto molle",{sm:true})+FT.text(26,114,"liquido",{sm:true})+FT.text(26,128,"(vescica)",{sm:true})
  +`<rect class="fbx k-warn" x="70" y="150" width="100" height="16" rx="3"/>`+FT.text(120,162,"osso o calcolo",{a:"middle",sm:true})
  +`<rect class="shd" x="70" y="166" width="100" height="52"/>`+FT.text(120,196,"ombra",{a:"middle",sm:true})
  +FT.arrow(100,42,100,146)+FT.arrow(150,98,150,48,{dash:true,h:6})+FT.arrow(122,148,122,48,{dash:true,h:9})
  +FT.text(158,70,"eco debole",{sm:true})+FT.text(166,128,"eco forte",{sm:true})+FT.text(8,236,["L'aria riflette quasi tutto il fascio:","il gel elimina l'aria tra sonda e pelle."],{sm:true})
  +FT.text(252,16,"Come appaiono gli echi",{b:true})
  +[["#050607","Anecogeno",["liquidi, sangue,","urina, cisti"]],["#4a5258","Ipoecogeno",["muscolo, linfonodi"]],["#8b959b","Isoecogeno",["stessa luminosità","del tessuto vicino"]],["#f2f5f6","Iperecogeno",["osso, calcoli, aria,","pleura, aghi"]]].map((r,i)=>{const y=28+i*50;return `<rect class="fl" x="252" y="${y}" width="40" height="38" rx="4" style="fill:${r[0]}"/>`+FT.text(302,y+14,r[1],{b:true})+FT.text(302,y+28,r[2],{sm:true})}).join("")
  +FT.text(8,272,["Frequenze cliniche: da circa 2 a 15 MHz. Più alta la frequenza,","più nitida e meno profonda è l'immagine."],{sm:true}))},
{id:"eco-sonde",t:"Le tre sonde e che cosa mostrano",c:"La forma dell'immagine dipende dalla sonda: lineare rettangolare, convex a ventaglio, settoriale a cono. Alta frequenza dà più dettaglio ma meno profondità; bassa frequenza scende più in profondità.",
 enc:["eco-sonde"],gl:[],st:/ecograf|sonda|vasi/i,
 svg:FT.svg(440,252,"Tre sonde ecografiche con la forma dell'immagine: lineare rettangolare per vasi e superficie, convex a ventaglio per addome e polmone, settoriale per il cuore",
  `<rect class="fbx k-info" x="22" y="12" width="108" height="14" rx="4"/><rect class="fbx" x="22" y="30" width="108" height="84" rx="4"/>`
  +`<rect class="fbx k-info" x="190" y="12" width="60" height="14" rx="6"/><path class="fbx" d="M190 30L158 108Q220 126 282 108L250 30Q220 36 190 30Z"/>`
  +`<rect class="fbx k-info" x="346" y="12" width="36" height="14" rx="6"/><path class="fbx" d="M364 30L304 108Q364 126 424 108Z"/>`
  +FT.text(76,134,"Lineare",{a:"middle",b:true})+FT.text(220,134,"Convex",{a:"middle",b:true})+FT.text(364,134,"Settoriale",{a:"middle",b:true})
  +FT.text(76,148,["alta frequenza","(7-15 MHz)","vasi, accessi venosi,","pleura, nervi"],{a:"middle",sm:true})
  +FT.text(220,148,["bassa frequenza","addome, vescica, eFAST,","polmone in profondità"],{a:"middle",sm:true})
  +FT.text(364,148,["bassa frequenza,","piccolo appoggio:","cuore tra le coste"],{a:"middle",sm:true})
  +FT.box(8,210,424,32,"Più alta la frequenza: più dettaglio, meno profondità","","info"))},
{id:"eco-vci",t:"Vena cava inferiore: diametro e collasso",c:"Nel respiro spontaneo la cava si restringe in inspirazione (il collasso si valuta con una inspirazione rapida, lo «sniff»): una cava ≤ 2,1 cm che collassa molto indica pressione dell'atrio destro bassa, una cava larga e fissa pressione alta. Da leggere insieme al quadro clinico.",
 enc:["eco-vci"],gl:[],st:/ecograf|cava|volemi|liquidi/i,
 svg:FT.svg(440,346,"Tre righe di cava inferiore in espirazione e inspirazione: piccola e molto collassabile, intermedia, dilatata e fissa, con la pressione stimata dell'atrio destro",
  FT.text(186,18,"espirazione",{a:"middle",sm:true})+FT.text(276,18,"inspirazione",{a:"middle",sm:true})
  +[[62,["Cava ≤ 2,1 cm",["collasso > 50%","con inspirazione","profonda (sniff)"]],[22,8],[["PAD","circa 3 mmHg"],"(0-5)","info"]],
    [166,["Intermedia",["tra i due casi"]],[28,16],[["PAD","circa 8 mmHg"],"(5-10)","warn"]],
    [270,["Cava > 2,1 cm",["collasso < 50%","con inspirazione","profonda (sniff)"]],[36,33],[["PAD","circa 15 mmHg"],"(10-20)","alarm"]]
  ].map(r=>{const cy=r[0];return FT.text(8,cy-8,r[1][0],{b:true})+FT.text(8,cy+7,r[1][1],{sm:true})
    +`<rect class="fbx k-info" x="150" y="${cy-r[2][0]/2}" width="72" height="${r[2][0]}" rx="${r[2][0]/2}"/><rect class="fbx k-info" x="240" y="${cy-r[2][1]/2}" width="72" height="${r[2][1]}" rx="${r[2][1]/2}"/>`
    +FT.box(326,cy-34,106,68,r[3][0],r[3][1],r[3][2])}).join("")
  +FT.text(8,322,["PAD = pressione dell'atrio destro. Misura sottocostale in asse lungo,","1-2 cm prima dell'atrio. Non vale in ventilazione a pressione positiva."],{sm:true}))},
{id:"eco-artefatti-figura",t:"Quattro artefatti utili",c:"Le immagini «sbagliate» aiutano la diagnosi: l'ombra indica un calcolo o un osso, il rinforzo posteriore un liquido, le linee A un polmone aerato (o un pneumotorace: serve lo scivolamento pleurico), le linee B numerose una sindrome interstiziale.",
 enc:["eco-artefatti"],gl:[],st:/ecograf|artefatt|polmone/i,
 svg:FT.svg(440,302,"Quattro schermi ecografici: cono d'ombra dietro un calcolo, rinforzo posteriore dietro una cisti, linee A e linee B nel polmone",
  `<rect class="tis" x="8" y="8" width="208" height="84"/><ellipse class="ec" cx="112" cy="30" rx="24" ry="7"/><path class="scr" d="M90 34H134L150 92H74Z"/>`
  +FT.text(8,108,"Cono d'ombra",{b:true})+FT.text(8,122,["Banda nera dietro calcoli e ossa:","riflettono quasi tutto il fascio"],{sm:true})
  +`<rect class="tis" x="224" y="8" width="208" height="84"/><ellipse class="scr" cx="328" cy="36" rx="26" ry="16"/><path class="ecl" d="M302 36H354L366 92H290Z"/>`
  +FT.text(224,108,"Rinforzo posteriore",{b:true})+FT.text(224,122,["Zona più luminosa dietro un liquido","(vescica, cisti): attenua poco"],{sm:true})
  +`<rect class="scr" x="8" y="150" width="208" height="84"/><rect class="tis" x="8" y="150" width="208" height="26"/><path class="ecs" d="M8 176H216" style="stroke-width:3"/><path class="egr" d="M8 200H216M8 224H216"/>`
  +FT.text(8,250,"Linee A",{b:true})+FT.text(8,264,["Linee orizzontali dietro la pleura:","polmone aerato o pneumotorace;","serve lo scivolamento pleurico"],{sm:true})
  +`<rect class="scr" x="224" y="150" width="208" height="84"/><rect class="tis" x="224" y="150" width="208" height="26"/><path class="ecs" d="M224 176H432" style="stroke-width:3"/><path class="ecs" d="M262 176V234M310 176V234M358 176V234M406 176V234" style="stroke-width:2.2"/>`
  +FT.text(224,250,"Linee B",{b:true})+FT.text(224,264,["Linee verticali dalla pleura:","numerose = sindrome interstiziale"],{sm:true}))},
/* lotto: farmacologia */
{id:"calcolo-infusioni",t:"Dal volume alle gocce: calcolo delle infusioni",c:"Si calcola prima il flusso in ml/h (volume ÷ ore), poi lo si traduce in gocce al minuto in base al set: con il deflussore standard da 20 gtt/ml bastano i ml/h divisi per 3, con il microgocciolatore le gocce al minuto sono uguali ai ml/h. La dose da prelevare e le conversioni vanno controllate con la stessa cura.",
 enc:["calcolo-dosaggi"],gl:["Deflussore"],st:/calcol|dosagg|infusion|gocce|pompa/i,
 svg:FT.svg(440,334,"Schema del calcolo di un'infusione: dal volume e dalle ore ai ml/h, poi alle gocce al minuto con deflussore da 20 gtt/ml o microgocciolatore da 60 gtt/ml; formula della dose da prelevare, conversioni ed errori frequenti",
  FT.box(8,6,424,44,"Prima il flusso: ml/h = volume ÷ ore",["Esempio: 1000 ml in 8 ore = 125 ml/h"],"info")
  +FT.arrow(110,50,110,70)+FT.arrow(330,50,330,70)
  +FT.box(8,70,212,92,["Deflussore standard","20 gtt/ml"],["gtt/min = ml × 20 ÷ minuti","regola pratica: ml/h ÷ 3","125 ÷ 3 ≈ 42 gtt/min"],"ok")
  +FT.box(224,70,208,92,["Microgocciolatore","60 gtt/ml"],["gtt/min = ml/h","125 ml/h = 125 gtt/min"],"ok")
  +FT.box(8,172,424,66,"Dose da prelevare",["dose prescritta ÷ concentrazione disponibile × volume","Dose per peso: mg/kg × peso (mcg/kg/min: serve la diluizione)"],"info")
  +FT.box(8,248,208,76,"Conversioni",["1 g = 1000 mg","1 mg = 1000 mcg","1 L = 1000 ml"],"info")
  +FT.box(224,248,208,76,"Errori frequenti",["confondere mg e mcg","errori di virgola:","0,5 non è 5"],"warn"))},
{id:"digossina-controllo",t:"Digossina: frequenza prima della dose e margine stretto",c:"Prima di ogni somministrazione si conta la frequenza cardiaca. Il margine tra dose efficace e tossica è stretto, e l'ipopotassiemia aumenta il rischio di tossicità. Lo schema del margine è qualitativo, senza valori.",
 enc:["digossina"],gl:[],st:/digossin|glicosid|antidot/i,
 svg:FT.svg(440,350,"Prima della dose si controlla la frequenza cardiaca: sotto 60 battiti al minuto in genere non si somministra senza indicazione medica. Confronto schematico tra un farmaco con margine ampio e la digossina con margine stretto, segni di tossicità, ipopotassiemia e antidoto",
  FT.box(50,6,340,34,"Prima della dose: misura la frequenza cardiaca","","info")
  +FT.elbow([[220,40],[220,54],[111,54],[111,70]])+FT.elbow([[220,40],[220,54],[329,54],[329,70]])
  +FT.box(12,70,198,58,"Sotto 60 battiti/min",["in genere non si somministra","senza indicazione medica"],"alarm")
  +FT.box(230,70,198,58,"60 battiti/min o più",["si procede come prescritto"],"ok")
  +FT.text(8,150,"Indice terapeutico stretto",{b:true})
  +`<rect class="fbx" x="120" y="160" width="312" height="18" rx="5"/><rect class="band" x="150" y="160" width="220" height="18"/>`
  +FT.text(8,173,"Margine ampio",{sm:true})+FT.text(260,173,"efficace",{a:"middle",sm:true})
  +`<rect class="fbx" x="120" y="188" width="312" height="18" rx="5"/><rect class="band" x="260" y="188" width="36" height="18"/>`
  +FT.text(8,201,"Digossina",{sm:true,b:true})+FT.text(304,201,"margine ristretto",{sm:true})
  +FT.text(120,222,"dose bassa",{sm:true})+FT.text(432,222,"tossicità",{a:"end",sm:true})
  +FT.box(8,236,208,106,"Segni di tossicità",["nausea, vomito","bradicardia, aritmie","disturbi visivi","(visione gialla-verde)"],"alarm")
  +FT.box(224,236,208,44,"Ipopotassiemia",["aumenta il rischio di tossicità"],"warn")
  +FT.box(224,286,208,56,"Antidoto",["frammenti anticorpali","anti-digossina"],"ok"))},
{id:"giusti-somministrazione",t:"I controlli prima di somministrare: chi, che cosa, come, dopo",c:"I «giusti» della somministrazione si raggruppano per domanda: a chi, che cosa, come, che cosa fare dopo. Per i farmaci ad alto livello di attenzione serve un doppio controllo indipendente, e chi prepara il farmaco lo somministra e firma.",
 enc:["regole-somministrazione","sicurezza-farmaci"],gl:["LASA"],st:/somministraz|errori di terapia|giusti|alto livello/i,
 svg:FT.svg(440,364,"Quattro gruppi di controlli: giusto paziente, farmaco e dose, via e orario, registrazione e monitoraggio; sotto il doppio controllo per i farmaci ad alto livello di attenzione e la regola che chi prepara somministra e firma",
  [["Chi","Giusto paziente",["almeno due identificatori;","allergie verificate prima della prima dose"],"info"],
   ["Cosa","Giusto farmaco e giusta dose",["giusta forma farmaceutica,","giusta preparazione"],"info"],
   ["Come","Giusta via, giusto orario",["via e orario previsti dalla prescrizione"],"info"],
   ["Dopo","Giusta registrazione, giusto monitoraggio",["e diritto al rifiuto della persona"],"info"]
  ].map((r,i)=>{const y=6+i*60;return FT.box(8,y,70,50,r[0],"","ok")+FT.box(86,y,346,50,r[1],r[2],r[3])}).join("")
  +FT.box(8,246,424,52,"Alto livello di attenzione: doppio controllo indipendente",["insulina, eparina, oppioidi, KCl, chemioterapici"],"warn")
  +FT.box(8,306,424,52,"Chi prepara somministra e firma",["non preparare in anticipo farmaci per i turni successivi"],"ok"))},
{id:"interazioni-esempi",t:"Interazioni: chi altera l'effetto di chi",c:"Alcuni farmaci e alimenti cambiano l'effetto di altri: con il warfarin, alcuni antibiotici e amiodarone fanno salire l'INR e i FANS aumentano il rischio di sanguinamento. Più farmaci si assumono, più cresce il rischio, soprattutto negli anziani: per questo si usano criteri di appropriatezza e la riconciliazione.",
 enc:["interazioni","anticoagulanti"],gl:["INR"],st:/interazion|politerapia|warfarin|riconcili/i,
 svg:FT.svg(440,372,"Tre fonti di interazione (FANS, alcuni antibiotici, amiodarone) aumentano il rischio per chi assume warfarin: antibiotici e amiodarone alzano l'INR, i FANS aumentano il sanguinamento; altri esempi: succo di pompelmo e iperico; la polifarmacoterapia aumenta il rischio e si contrasta con criteri di Beers, STOPP/START e riconciliazione",
  FT.text(8,14,"Con il warfarin il rischio aumenta se si associa",{b:true})
  +FT.box(8,24,136,44,"FANS","","warn")+FT.box(152,24,136,44,"Alcuni antibiotici","","warn")+FT.box(296,24,136,44,"Amiodarone","","warn")
  +FT.arrow(76,68,160,98)+FT.arrow(220,68,220,98)+FT.arrow(364,68,280,98)
  +FT.box(110,98,220,50,"Warfarin: più rischio",["INR e sanguinamento da controllare"],"alarm")
  +FT.text(8,172,"Altri esempi",{b:true})
  +FT.box(8,180,212,58,"Succo di pompelmo",["inibisce il CYP3A4:","interagisce con alcuni farmaci"],"info")
  +FT.box(228,180,204,58,"Iperico",["interagisce con","molti farmaci"],"info")
  +FT.box(8,248,424,56,"Polifarmacoterapia: 5 o più farmaci",["più farmaci, più rischio di interazioni, soprattutto negli anziani"],"warn")
  +FT.box(8,312,424,52,"Per ridurre il rischio",["Criteri di Beers e STOPP/START · riconciliazione farmacologica"],"ok"))},
{id:"antidoti-coppie",t:"Tossico e antidoto: le coppie da ricordare",c:"Per ogni sostanza o farmaco il suo antidoto, raggruppati per tipo di problema. Il naloxone ha un effetto più breve di molti oppioidi: si osserva la persona, perché la depressione respiratoria può ripresentarsi.",
 enc:["antidoti","oppioidi","anticoagulanti"],gl:[],st:/antidot|intossicaz|naloxone|protamina/i,
 svg:(()=>{
  const G=[["Sedativi",[["Oppioidi",["naloxone"]],["Benzodiazepine",["flumazenil"]]]],
   ["Anticoagulanti",[["Eparina",["protamina solfato"]],["Warfarin",["vitamina K","complesso protrombinico"]],["Dabigatran",["idarucizumab"]]]],
   ["Cuore",[["Digossina",["frammenti Fab","antidigossina"]]]],
   ["Intossicazioni e metabolismo",[["Paracetamolo",["N-acetilcisteina"]],["Organofosfati",["atropina, pralidossima"]],["Monossido di carbonio",["ossigeno al 100%"],["anche iperbarico"]],["Ipoglicemia da insulina",["glucosio, glucagone"]],["Metanolo, glicole etilenico",["fomepizolo (o etanolo)"]],["Cianuro",["idrossocobalamina"]]]]];
  let y=6,o="";
  G.forEach(g=>{o+=FT.text(8,y+11,g[0],{b:true});y+=18;
   g[1].forEach(r=>{const h=(r[1].length>1||r[2])?38:26;
    o+=FT.box(8,y,200,h,r[0],"","info")+FT.arrow(212,y+h/2,244,y+h/2,{h:6})+FT.box(248,y,184,h,r[1],r[2]||"","ok");y+=h+4});y+=4});
  o+=FT.text(8,y+10,["Naloxone: effetto più breve di molti oppioidi,","possibile ripresa della depressione respiratoria."],{sm:true});
  return FT.svg(440,y+40,"Coppie di tossico o farmaco e relativo antidoto, in quattro gruppi: sedativi, anticoagulanti, cuore, intossicazioni e metabolismo",o)})()},
/* lotto: area-critica */
{id:"glasgow-scala",t:"Glasgow Coma Scale: tre risposte, un totale",c:"Si valutano separatamente occhi (E), parola (V) e movimento (M) e si sommano: da 3 a 15, con 8 o meno che indica coma. Si riportano sempre i tre componenti, non solo il totale.",
 enc:["glasgow"],gl:["Glasgow Coma Scale","GCS"],st:/glasgow|gcs|coscienza|coma|neurolog/i,
 svg:(()=>{
  const X=[36,168,300],W=128,y0=34,rh=30,cols=[["Occhi (E)",{4:"spontanea",3:"alla voce",2:"al dolore",1:"nessuna"}],["Verbale (V)",{5:"orientata",4:"confusa",3:"parole inappropriate",2:"suoni incomprensibili",1:"nessuna"}],["Motoria (M)",{6:"esegue ordini",5:"localizza il dolore",4:"retrae",3:["flessione anomala","(decorticazione)"],2:["estensione","(decerebrazione)"],1:"nessuna"}]];
  let s="";
  cols.forEach((c,i)=>{s+=FT.box(X[i],8,W,24,c[0],null,"info")});
  for(let n=6;n>=1;n--){const y=y0+(6-n)*(rh+2);
   s+=FT.text(26,y+rh/2+4,String(n),{a:"end",b:true});
   cols.forEach((c,i)=>{const v=c[1][n];if(v===undefined)return;
    const two=Array.isArray(v),k=(i===2&&(n===3||n===2))?"warn":(n===1?"alarm":"");
    s+=`<rect class="fbx${k?" k-"+k:""}" x="${X[i]}" y="${y}" width="${W}" height="${rh}" rx="6"/>`+FT.text(X[i]+W/2,two?y+rh/2-2:y+rh/2+4,v,{a:"middle",sm:true});
   });
  }
  s+=FT.box(8,236,424,62,"Totale = E + V + M: da 3 a 15, ≤ 8 coma",["Si riportano sempre i tre componenti (es. E3 V4 M6)","Nel paziente intubato la V si annota come T"],"warn");
  return FT.svg(440,306,"Tabella della Glasgow Coma Scale: apertura degli occhi da 4 a 1, risposta verbale da 5 a 1, risposta motoria da 6 a 1, totale da 3 a 15",s);
 })()},
{id:"triage-5-codici",t:"Triage a 5 codici: colore, urgenza e attesa massima",c:"I codici italiani (Accordo Stato-Regioni 2019) vanno da 1, rosso, a 5, bianco: più il numero sale, più l'attesa massima raccomandata si allunga. Il codice non è definitivo e chi attende va rivalutato.",
 enc:["tri-livelli"],gl:["Triage"],st:/triage|codic|pronto soccorso/i,
 svg:(()=>{
  const rows=[["1","#c62828","#fff","Emergenza · accesso immediato","Funzioni vitali compromesse o a rischio immediato"],
   ["2","#e65100","#fff","Urgenza · entro 15 minuti","Rischio di compromissione delle funzioni vitali o dolore severo"],
   ["3","#0277bd","#fff","Urgenza differibile · entro 60 minuti","Stabile ma con sofferenza o rischio evolutivo, più risorse"],
   ["4","#2e7d32","#fff","Urgenza minore · entro 120 minuti","Stabile, senza rischio evolutivo; in genere una sola risorsa"],
   ["5","#ffffff","#222","Non urgenza · entro 240 minuti","Problema non urgente o di minima rilevanza clinica"]];
  let s="";
  rows.forEach((r,i)=>{const y=8+i*48;
   s+=`<rect x="8" y="${y}" width="44" height="44" rx="8" style="fill:${r[1]};stroke:#888;stroke-width:1.2"/><text x="30" y="${y+30}" text-anchor="middle" style="fill:${r[2]};font-size:20px;font-weight:700;font-family:var(--f-body)">${r[0]}</text>`
   +`<rect class="fbx" x="58" y="${y}" width="374" height="44" rx="8"/>`+FT.text(70,y+19,r[3],{b:true})+FT.text(70,y+34,r[4],{sm:true});
  });
  s+=FT.box(8,254,424,50,"Il codice non è definitivo",["I tempi sono massimi di attesa raccomandati, non obiettivi.","Chi attende va rivalutato: il codice cambia se cambiano le condizioni."],"info");
  return FT.svg(440,312,"Cinque riquadri colorati con i codici di triage: 1 rosso accesso immediato, 2 arancione entro 15 minuti, 3 azzurro entro 60, 4 verde entro 120, 5 bianco entro 240",s);
 })()},
{id:"sepsi-percorso",t:"Sepsi: dallo screening al bundle della prima ora",c:"Il qSOFA (2 criteri su 3) segnala un rischio maggiore di esito sfavorevole ma non basta da solo come screening; il bundle raggruppa gli interventi da fare insieme; lo shock settico è definito da vasopressori e lattati nonostante i liquidi. Il NEWS2 è spesso preferito al qSOFA come allerta.",
 enc:["sepsi","bundle"],gl:["qSOFA","Lattati","NEWS2"],st:/sepsi|settic|qsofa|bundle/i,
 svg:(()=>{
  let s=`<rect class="fbx" x="8" y="8" width="424" height="80" rx="8"/>`+FT.text(220,26,"Screening qSOFA: 2 criteri su 3 = rischio elevato",{a:"middle",b:true});
  [["Frequenza","respiratoria ≥ 22"],["Alterazione","mentale"],["Pressione sistolica","≤ 100 mmHg"]].forEach((c,i)=>{s+=FT.box(16+i*138,36,132,44,c,null,"warn")});
  s+=FT.arrow(220,88,220,106);
  s+=`<rect class="fbx" x="8" y="106" width="424" height="166" rx="8"/>`+FT.text(220,124,"Bundle della prima ora",{a:"middle",b:true});
  ["Lattati","Emocolture prima degli antibiotici","Antibiotici ad ampio spettro","30 ml/kg di cristalloidi se ipotensione o lattati ≥ 4","Vasopressori (noradrenalina) se l'ipotensione persiste"].forEach((t,i)=>{
   const y=132+i*27;s+=`<rect class="fbx k-ok" x="16" y="${y}" width="408" height="23" rx="6"/>`+FT.text(28,y+16,t);});
  s+=FT.arrow(220,272,220,290);
  s+=FT.box(8,290,424,58,"Shock settico",["Vasopressori per PAM ≥ 65 mmHg e lattati > 2 mmol/L","nonostante liquidi adeguati"],"alarm");
  s+=FT.text(8,366,"Il NEWS2 è spesso preferito al qSOFA come strumento di allerta.",{sm:true});
  return FT.svg(440,376,"Percorso della sepsi: screening con i tre criteri del qSOFA, bundle della prima ora in cinque punti, shock settico con vasopressori e lattati",s);
 })()},
{id:"anafilassi-algoritmo",t:"Anafilassi: l'adrenalina viene per prima",c:"Dopo i segni si chiama subito aiuto (118/emergenza) e compare l'adrenalina intramuscolo, secondo protocollo o prescrizione; ossigeno, liquidi e posizione la affiancano. Antistaminici e cortisonici sono di seconda linea e il paziente resta in osservazione per la reazione bifasica.",
 enc:["anafilassi"],gl:[],st:/anafilass|allergi|adrenalina/i,
 svg:FT.svg(440,286,"Algoritmo dell'anafilassi: segni, adrenalina intramuscolo ripetibile dopo 5 minuti, ossigeno liquidi e posizione, poi seconda linea e osservazione",
  FT.box(8,8,424,52,"Segni dopo l'esposizione",["Orticaria, angioedema, broncospasmo, stridore, ipotensione,","sintomi gastrointestinali"],"info")
  +FT.arrow(220,60,220,76)
  +FT.box(8,76,250,62,"Adrenalina intramuscolo",["faccia antero-laterale della coscia","0,5 mg nell'adulto (0,5 ml di 1 mg/ml)"],"alarm")
  +FT.arrow(258,107,282,107)
  +FT.box(282,76,150,62,["Ripetibile","dopo 5 minuti"],null,"warn")
  +FT.arrow(58,138,58,154)+FT.arrow(162,138,162,154)+FT.arrow(240,138,240,154)
  +FT.box(8,154,100,58,"Ossigeno",null,"ok")+FT.box(112,154,100,58,"Liquidi",null,"ok")
  +FT.box(216,154,216,58,"Posizione",["supina con gambe sollevate","(seduta se difficoltà respiratoria)"],"ok")
  +FT.arrow(214,212,214,228)
  +FT.box(8,228,424,50,"Poi: seconda linea e osservazione",["Antistaminici e cortisonici sono di seconda linea;","osservazione per il rischio di reazione bifasica"],"info"))},
{id:"parametri-news2",t:"Parametri vitali: valori normali e fasce NEWS2",c:"Il NEWS2 combina sette parametri in un punteggio che dice quanto è urgente la risposta. La frequenza respiratoria è tra i segni più sensibili di peggioramento e spesso trascurata.",
 enc:["parametri-vitali"],gl:["NEWS2"],st:/parametri|news2|vitali/i,
 svg:(()=>{
  const R=[["Frequenza cardiaca",["60-100 battiti/min"],26],["Frequenza respiratoria",["12-20 atti/min"],26],["Pressione arteriosa",["ottimale < 120/80 mmHg","ipertensione ≥ 140/90"],40],["SpO₂",["94-98%","88-92% se prescritto (ipercapnia)"],40],["Temperatura",["36-37,5 °C (ascellare)"],26]];
  let s="",y=8;
  R.forEach(r=>{s+=FT.text(8,y+r[2]/2+4,r[0],{b:true})+`<rect class="fbx k-ok" x="190" y="${y}" width="242" height="${r[2]}" rx="6"/>`+FT.text(311,r[1].length>1?y+r[2]/2-2:y+r[2]/2+4,r[1],{a:"middle",sm:true});y+=r[2]+4});
  s+=FT.box(8,192,424,56,"NEWS2 combina sette parametri",["frequenza respiratoria, SpO₂, ossigeno sì/no, pressione","sistolica, frequenza cardiaca, coscienza (ACVPU), temperatura"],"info");
  s+=FT.arrow(220,248,220,268);
  s+=FT.box(8,268,136,84,"0-4",["rischio basso","(salvo 3 in un parametro)"],"ok")+FT.box(152,268,136,84,"5-6",["oppure 3 in un","singolo parametro","medio: valutazione","urgente"],"warn")+FT.box(296,268,136,84,"≥ 7",["alto: risposta di","emergenza"],"alarm");
  s+=FT.box(8,360,424,46,"La frequenza respiratoria","è tra i segni più sensibili di peggioramento e spesso trascurata","warn");
  return FT.svg(440,414,"Valori normali dei parametri vitali nell'adulto, i sette parametri del NEWS2 e le tre fasce di punteggio: 0-4 basso, 5-6 medio, 7 o più alto",s);
 })()},
/* lotto: anatomia */
{id:"endocrino-assi",t:"Asse ipotalamo-ipofisi-ghiandole e feedback",c:"L'ipotalamo comanda l'ipofisi, e l'ipofisi comanda con i suoi ormoni tiroide e corticale del surrene. L'ormone prodotto dalla ghiandola periferica, quando è in eccesso, frena a monte la propria produzione (feedback negativo). Paratiroidi, midollare del surrene e pancreas completano il quadro.",
 enc:["sistema-endocrino"],gl:[],st:/endocrin|ormon|tiroid|ipofis/i,
 svg:FT.svg(440,392,"Schema dell'asse ipotalamo, ipofisi, tiroide e corticale del surrene con feedback negativo, e delle altre ghiandole: paratiroidi, midollare del surrene, pancreas",
  FT.box(120,8,200,30,"Ipotalamo","","info")
  +FT.arrow(220,38,220,60)
  +FT.box(70,60,300,66,"Ipofisi",["TSH · ACTH · GH · prolattina","ADH · ossitocina (neuroipofisi)"],"info")
  +FT.arrow(110,126,110,168)+FT.text(118,152,"TSH",{sm:true})
  +FT.arrow(330,126,330,168)+FT.text(322,152,"ACTH",{sm:true,a:"end"})
  +FT.box(20,168,180,56,"Tiroide","T3 e T4: metabolismo","ok")
  +FT.box(240,168,180,56,"Surrene corticale","cortisolo (ACTH), aldosterone","ok")
  +FT.elbow([[20,196],[10,196],[10,23],[120,23]],{dash:true})
  +FT.elbow([[420,196],[432,196],[432,23],[320,23]],{dash:true})
  +FT.text(20,254,"Altre ghiandole",{b:true})
  +FT.box(20,264,130,70,"Paratiroidi",["paratormone:","regola il calcio"],"info")
  +FT.box(155,264,130,70,["Surrene","midollare"],["adrenalina,","noradrenalina"],"info")
  +FT.box(290,264,130,70,"Pancreas",["insulina abbassa","glucagone alza","la glicemia"],"info")
  +`<path class="fl dash" d="M20 366H44"/>`+FT.text(52,370,"feedback negativo: l'eccesso di ormone inibisce la sua produzione",{sm:true}))},
{id:"glicolisi-passi",t:"Glicolisi: investimento e recupero di ATP",c:"Nel citoplasma il glucosio spende 2 ATP (investimento), si scinde in due molecole a 3 atomi di carbonio e queste rendono 4 ATP e 2 NADH (recupero): netto 2 ATP, 2 NADH, 2 piruvato. Tre passaggi irreversibili e regolati, con la PFK-1 come controllo principale. Il destino del piruvato dipende dall'ossigeno.",
 enc:["bc-glicolisi"],gl:[],st:/glicol|glucosio|metabol|biochim/i,
 svg:FT.svg(440,448,"Passi della glicolisi dal glucosio al piruvato con gli enzimi regolati, la fase di investimento di 2 ATP e di recupero di 4 ATP e 2 NADH, e il destino del piruvato con o senza ossigeno",
  `<rect class="fbx k-warn" x="6" y="6" width="428" height="268" rx="12"/><rect class="fbx k-ok" x="6" y="278" width="428" height="72" rx="12"/>`
  +FT.text(246,24,["Investimento (passi 1-5)","spende 2 ATP"],{b:false,sm:true})
  +FT.box(30,14,200,30,"Glucosio","","info")
  +FT.arrow(130,44,130,70)+FT.text(246,56,["esochinasi: −1 ATP"],{sm:true})
  +FT.box(30,70,200,30,"Glucosio-6-fosfato","","info")
  +FT.arrow(130,100,130,126)
  +FT.box(30,126,200,30,"Fruttosio-6-fosfato","","info")
  +FT.arrow(130,156,130,182)+FT.text(246,168,["PFK-1: −1 ATP","(punto di controllo)"],{sm:true,lh:12.5}).replace('y="168"','y="164"')
  +FT.box(30,182,200,30,"Fruttosio-1,6-bisfosfato","","info")
  +FT.arrow(130,212,130,238)+FT.text(246,228,"si scinde in due triosi fosfato",{sm:true})
  +FT.box(30,238,200,30,"2 Gliceraldeide-3-fosfato","","info")
  +FT.arrow(130,268,130,312)+FT.text(246,293,["Recupero (passi 6-10)","due molecole: in totale","+4 ATP, +2 NADH","ultimo: piruvato chinasi","Netto: 2 ATP, 2 NADH"],{sm:true})
  +FT.box(30,312,200,30,"2 Piruvato","","ok")
  +FT.arrow(120,342,120,368)+FT.elbow([[200,342],[200,356],[322,356],[322,368]])
  +FT.box(20,368,200,44,"Con ossigeno","acetil-CoA nei mitocondri","info")
  +FT.box(230,368,190,44,"Senza ossigeno","lattato: riossida il NADH","warn")
  +FT.text(220,432,"Sede: citoplasma · non serve ossigeno",{sm:true,a:"middle"}))},
{id:"krebs-ciclo",t:"Ciclo di Krebs: otto intermedi, tre NADH",c:"L'acetil-CoA (2 C) si lega all'ossalacetato (4 C) e forma citrato (6 C). Girando il ciclo si perdono due CO2 e si raccolgono, per ogni acetil-CoA, 3 NADH, 1 FADH2 e 1 GTP. L'ATP si ricava soprattutto dalla catena respiratoria, che riossida NADH e FADH2: senza ossigeno il ciclo si ferma.",
 enc:["bc-krebs"],gl:[],st:/krebs|ciclo|mitocond|biochim|metabol/i,
 svg:(()=>{
  const N=[["Citrato (6 C)",220,85,100],["Isocitrato",350,123,88],["α-chetoglutarato",370,215,124],["Succinil-CoA",326,307,100],["Succinato",220,345,86],["Fumarato",114,307,86],["Malato",70,215,76],["Ossalacetato (4 C)",90,123,130]];
  const H=13,edge=(a,b)=>{const dx=b[1]-a[1],dy=b[2]-a[2],hw=a[3]/2+4,hh=H+4,t=Math.min(hw/Math.abs(dx||1e-9),hh/Math.abs(dy||1e-9));return [a[1]+dx*t,a[2]+dy*t]};
  let s="";
  N.forEach((n,i)=>{s+=`<rect class="fbx k-info" x="${n[1]-n[3]/2}" y="${n[2]-H}" width="${n[3]}" height="${2*H}" rx="8"/>`+FT.text(n[1],n[2]+4.5,n[0],{a:"middle",b:true})});
  N.forEach((n,i)=>{const m=N[(i+1)%8];const p=edge(n,m),q=edge(m,n);s+=FT.arrow(p[0],p[1],q[0],q[1])});
  s+=FT.box(20,10,110,26,"Acetil-CoA (2 C)","","ok")+FT.elbow([[130,23],[220,23],[220,70]])+FT.text(228,48,"citrato sintasi",{sm:true});
  s+=FT.text(362,164,["NADH","+ CO2"],{sm:true})+FT.text(362,262,["NADH","+ CO2"],{sm:true});
  s+=FT.text(282,343,["GTP"],{sm:true});
  s+=FT.text(168,342,["FADH2","(complesso II)"],{sm:true,a:"end"});
  s+=FT.text(58,172,"NADH",{sm:true,a:"end"});
  s+=FT.text(220,198,"Per ogni acetil-CoA",{a:"middle",b:true})+FT.text(220,214,"3 NADH · 1 FADH2",{a:"middle",sm:true})+FT.text(220,227,"1 GTP · 2 CO2",{a:"middle",sm:true})+FT.text(220,240,"circa 10 ATP",{a:"middle",sm:true})+FT.text(220,253,"matrice mitocondriale",{a:"middle",sm:true});
  s+=FT.text(220,404,"Senza ossigeno NADH e FADH2 non si riossidano:",{sm:true,a:"middle"})+FT.text(220,417,"il ciclo si ferma e il lattato sale",{sm:true,a:"middle"});
  return FT.svg(440,428,"Ciclo di Krebs: acetil-CoA entra come citrato e il ciclo attraversa isocitrato, alfa-chetoglutarato, succinil-CoA, succinato, fumarato, malato e ossalacetato, producendo NADH, FADH2, GTP e CO2",s)})()},
{id:"urea-ciclo",t:"Ciclo dell'urea: dove avviene ogni passo",c:"Il fegato trasforma l'ammoniaca in urea: i primi due passi sono nel mitocondrio (CPS I e OTC), gli altri nel citosol. L'aspartato dà il secondo azoto, il fumarato va al ciclo di Krebs e l'ornitina rientra nel mitocondrio. La CPS I è il passo limitante e serve N-acetilglutammato.",
 enc:["bc-ciclo-urea"],gl:["Ciclo dell'urea"],st:/urea|ammoni|encefalopatia|epatic|biochim/i,
 svg:FT.svg(440,456,"Ciclo dell'urea: nel mitocondrio ammoniaca e CO2 formano carbamoil-fosfato e poi citrullina, che passa nel citosol dove, con aspartato, diventa argininosuccinato, arginina e infine urea con rilascio di ornitina che rientra nel mitocondrio",
  `<rect class="fbx k-info" x="6" y="24" width="220" height="268" rx="18"/>`+FT.text(18,42,"Mitocondrio",{b:true})+FT.text(430,42,"Citosol",{b:true,a:"end"})
  +FT.box(40,54,120,32,"NH3 + CO2","","")
  +FT.arrow(100,86,100,132)+FT.text(112,102,["CPS I: 2 ATP","attivata da","N-acetilglutammato"],{sm:true,lh:12})
  +FT.box(30,132,140,32,"Carbamoil-fosfato","","")
  +FT.arrow(100,164,100,214)+FT.text(112,182,"OTC",{sm:true})
  +FT.box(40,214,120,32,"Citrullina","","")
  +FT.arrow(100,246,100,348)+FT.text(112,314,["argininosuccinato","sintetasi: + aspartato,","1 ATP"],{sm:true,lh:12})
  +FT.box(33,348,134,32,"Argininosuccinato","","")
  +FT.arrow(167,364,280,364)+FT.text(224,398,["liasi: libera fumarato","(va nel ciclo di Krebs)"],{sm:true,a:"middle"})
  +FT.box(280,348,100,32,"Arginina","","")
  +FT.arrow(330,348,330,222)+FT.text(338,284,["arginasi:","arginina →","urea + ornitina"],{sm:true,lh:12})
  +FT.box(265,190,130,32,"Urea + ornitina","","ok")
  +FT.arrow(265,206,104,206)+FT.text(170,224,"ornitina",{sm:true})
  +FT.arrow(330,190,330,164)+FT.text(330,148,["urea eliminata","dal rene"],{sm:true,a:"middle",lh:12})
  +FT.text(220,430,"Un'urea contiene due azoti: uno dall'ammoniaca, uno dall'aspartato",{sm:true,a:"middle"})
  +FT.text(220,444,"Costo: 3 ATP (4 legami ad alta energia) per urea",{sm:true,a:"middle"}))},
{id:"chetogenesi-percorso",t:"Chetogenesi: dal fegato ai tessuti che usano i chetoni",c:"Nei mitocondri del fegato l'acetil-CoA in eccesso diventa acetoacetato, poi beta-idrossibutirrato o acetone. Cervello, cuore e muscolo bruciano i chetoni, il fegato no. Glucagone e digiuno la attivano, l'insulina la frena: senza insulina la produzione supera l'uso e si arriva alla chetoacidosi.",
 enc:["bc-chetogenesi"],gl:[],st:/chet|digiuno|diabet|biochim|metabol/i,
 svg:FT.svg(440,458,"Via della chetogenesi nei mitocondri del fegato: acetil-CoA, acetoacetil-CoA, HMG-CoA, acetoacetato, beta-idrossibutirrato e acetone; i chetoni sono usati da cervello, cuore e muscolo ma non dal fegato",
  `<rect class="fbx k-info" x="6" y="22" width="298" height="322" rx="16"/>`+FT.text(200,42,"Mitocondri epatici",{sm:true})
  +FT.box(20,40,170,30,"Acetil-CoA","","ok")+FT.arrow(105,70,105,100)
  +FT.box(20,100,170,30,"Acetoacetil-CoA","","")+FT.arrow(105,130,105,160)+FT.text(200,141,["HMG-CoA sintasi","mitocondriale","(+ acetil-CoA)"],{sm:true,lh:12})
  +FT.box(20,160,170,30,"HMG-CoA","","")+FT.arrow(105,190,105,220)+FT.text(200,205,["liberato:","acetil-CoA"],{sm:true,lh:12})
  +FT.box(20,220,170,30,"Acetoacetato","","")
  +FT.arrow(190,235,220,235)+FT.box(220,220,76,30,"Acetone","","")
  +FT.text(258,266,["spontaneo,","eliminato","col respiro"],{sm:true,a:"middle",lh:12})
  +FT.arrow(105,250,105,290)+FT.box(20,290,170,40,"Beta-idrossibutirrato",["il più abbondante nel sangue"],"")
  +FT.arrow(190,310,312,310)
  +FT.box(312,278,122,64,["Cervello,","cuore, muscolo"],"usano i chetoni","ok")
  +FT.box(312,40,122,54,"Attivata da",["glucagone,","digiuno"],"ok")
  +FT.box(312,106,122,54,"Inibita da","insulina","warn")
  +FT.box(12,360,416,36,"Il fegato non può usare i chetoni","manca la succinil-CoA transferasi","warn")
  +FT.box(12,404,416,48,"Chetoacidosi",["senza insulina la produzione supera l'uso:","glicemia alta e bicarbonati bassi"],"alarm"))},
/* lotto: eco-esami */
{id:"eco-fast-finestre",t:"eFAST: le cinque finestre in cui appoggiare la sonda",c:"Si cerca liquido libero (striscia anecogena nelle zone declivi) in tre finestre addominali e in quella pericardica, più il torace anteriore per lo scivolamento pleurico. Si parte di solito da Morison o dal pericardio, secondo il protocollo locale. Disegno schematico, non in scala.",
 enc:["eco-fast"],gl:[],st:/efast|fast|ecograf|traum/i,
 svg:FT.svg(440,354,"Sagoma del tronco con i cinque punti di appoggio della sonda numerati: spazio di Morison, spleno-renale, pelvica, sottoxifoidea e torace anteriore, con legenda e nota sul liquido libero",
  FT.text(8,11,"destra del paziente",{sm:true})+FT.text(200,11,"sinistra",{a:"end",sm:true})
  +`<path class="fbx" d="M42 30Q105 16 168 30L186 68L178 284H32L24 68Z"/>`
  +`<ellipse class="fa fl" cx="62" cy="158" rx="36" ry="22"/>`+FT.text(62,162,"fegato",{a:"middle",sm:true})
  +`<ellipse class="fa fl" cx="148" cy="150" rx="16" ry="22"/>`+FT.text(148,154,"milza",{a:"middle",sm:true})
  +`<ellipse class="fa fl" cx="108" cy="92" rx="22" ry="16"/>`+FT.text(108,96,"cuore",{a:"middle",sm:true})
  +`<ellipse class="fa fl" cx="105" cy="254" rx="24" ry="14"/>`+FT.text(105,258,"vescica",{a:"middle",sm:true})
  +FT.dot(50,198,"1",{r:11})+FT.dot(152,194,"2",{r:11})+FT.dot(105,228,"3",{r:11})+FT.dot(108,128,"4",{r:11})+FT.dot(60,60,"5",{r:11})+FT.dot(156,60,"5",{r:11})
  +[["1","Spazio di Morison",["tra fegato e rene destro:","il punto da guardare per primo"]],
    ["2","Finestra spleno-renale",["tra milza e rene sinistro"]],
    ["3","Finestra pelvica",["dietro la vescica (cavo del","Douglas nella donna)"]],
    ["4","Finestra sottoxifoidea",["versamento pericardico"]],
    ["5","Torace anteriore",["scivolamento pleurico:","pneumotorace"]]
  ].map((r,k)=>{const y=22+k*54;return FT.dot(232,y+11,r[0],{r:11})+FT.text(252,y+15,r[1],{b:true})+FT.text(252,y+29,r[2],{sm:true})}).join("")
  +FT.box(8,294,424,52,"Liquido libero: striscia anecogena nelle zone declivi",["Positiva in un paziente instabile: di solito sala operatoria.","Negativa: non esclude lesioni, si ripete."],"info"))},
{id:"eco-polmone-segni",t:"Polmone: il modo M e i segni da riconoscere",c:"In modo M il polmone normale ha l'aspetto della «riva del mare» (righe sopra la pleura, granulare sotto); nel pneumotorace le righe continuano anche sotto la pleura («codice a barre»). Consolidamento e versamento si riconoscono dall'aspetto del polmone e dalla raccolta anecogena sopra il diaframma. La linea chiara è la pleura. Disegni schematici.",
 enc:["eco-polmone"],gl:[],st:/ecograf|polmon|pleur|pneumotorace/i,
 svg:(()=>{
  const mm=(x,y,pn)=>{let s=`<rect class="scr" x="${x}" y="${y}" width="208" height="96"/>`;
   [12,24,36].forEach(d=>{s+=`<path class="egr" d="M${x} ${y+d}H${x+208}"/>`});
   s+=`<path class="ecs" d="M${x} ${y+46}H${x+208}" style="stroke-width:3"/>`;
   [58,67,76,85].forEach((d,i)=>{s+=pn?`<path class="egr" d="M${x} ${y+d}H${x+208}"/>`:`<path class="egr" d="M${x} ${y+d}H${x+208}" style="stroke-dasharray:1.5 2.5;stroke-dashoffset:${i*1.3};stroke-width:2.2"/>`});
   return s};
  return FT.svg(440,382,"Due tracciati in modo M, riva del mare nel polmone normale e codice a barre nel pneumotorace, poi schemi di consolidamento con broncogramma aereo e di versamento sopra il diaframma, e nota sulle linee B",
   mm(8,8,false)+mm(224,8,true)
   +FT.text(8,122,"Normale: «riva del mare»",{b:true})+FT.text(8,136,["righe orizzontali sopra la pleura,","aspetto granulare sotto"],{sm:true})
   +FT.text(224,122,"Pneumotorace: «codice a barre»",{b:true})+FT.text(224,136,["assenza di scivolamento e di","linee B; il «punto polmone»","lo conferma"],{sm:true})
   +`<rect class="tis" x="8" y="176" width="208" height="84"/><path class="ecs" d="M8 196H216" style="stroke-width:3"/><rect class="ecl" x="8" y="200" width="208" height="60"/><path class="ecs" d="M40 208L70 232L110 240M70 232L82 252M130 206L150 230L196 236M150 230L158 254" style="stroke-width:1.6"/>`
   +`<rect class="tis" x="224" y="176" width="208" height="84"/><path class="ecs" d="M224 196H432" style="stroke-width:3"/><rect class="scr" x="224" y="200" width="208" height="42"/><path class="ecl" d="M224 242Q328 222 432 242V260H224Z"/><path class="ecs" d="M224 242Q328 222 432 242" style="stroke-width:3"/>`
   +FT.text(8,278,"Consolidamento",{b:true})+FT.text(8,292,["polmone simile al fegato","(epatizzazione), a volte con","broncogramma aereo"],{sm:true})
   +FT.text(224,278,"Versamento",{b:true})+FT.text(224,292,["raccolta anecogena sopra il","diaframma; la colonna si vede","anche sopra il diaframma"],{sm:true})
   +FT.box(8,332,424,44,"Linee B: 3 o più per scansione = zona positiva","≥ 2 zone per lato, bilaterali: sindrome interstiziale (edema, polmonite, ARDS)","info"));
  })()},
{id:"eco-accessi-assi",t:"Accessi ecoguidati: vena o arteria, asse corto o lungo",c:"Prima di pungere si distingue la vena (ovale, si schiaccia) dall'arteria (rotonda, pulsante, non si schiaccia). Poi si sceglie l'asse: in asse corto il vaso è un cerchio e dell'ago si vede una sezione, in asse lungo si vede tutto l'ago. Schermi schematici.",
 enc:["eco-accessi"],gl:[],st:/accessi|ecograf|vene|vasi|venos/i,
 svg:(()=>{
  const sc=(x,y,w,h)=>`<rect class="tis" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const chev=(cx,y)=>`<path class="ecs" d="M${cx-7} ${y+3}L${cx} ${y+10}L${cx+7} ${y+3}" style="stroke-width:2"/>`;
  const ves=(cx,cy,rx,ry,sw)=>`<ellipse class="scr" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="stroke:#e8eef0;stroke-width:${sw}"/>`;
  return FT.svg(440,442,"Quattro schermi ecografici: vena ovale che si schiaccia con la sonda e arteria rotonda che non si schiaccia; poi schermo in asse corto con vaso circolare e punta dell'ago come punto, e schermo in asse lungo con ago come linea obliqua; riquadri sulla tecnica dinamica della punta e sulla parete posteriore",
   FT.text(112,16,"Vena",{a:"middle",b:true})+FT.text(328,16,"Arteria",{a:"middle",b:true})
   +sc(8,24,100,70)+ves(58,59,24,14,1)+sc(116,24,100,70)+ves(166,59,24,2,1)+chev(166,24)
   +sc(224,24,100,70)+ves(274,59,15,15,3)+sc(332,24,100,70)+ves(382,59,15,15,3)+chev(382,24)
   +[58,166,274,382].map((cx,i)=>FT.text(cx,108,i%2?"premuta":"a riposo",{a:"middle",sm:true})).join("")
   +FT.text(8,128,["ovale, parete sottile, si schiaccia","con lieve pressione, non pulsa"],{sm:true})
   +FT.text(224,128,["rotonda, parete spessa, pulsante,","non si schiaccia"],{sm:true})
   +sc(8,168,208,92)+ves(112,218,18,18,1)+`<circle class="ec" cx="112" cy="186" r="3"/>`
   +sc(224,168,208,92)+`<rect class="scr" x="224" y="206" width="208" height="28" style="stroke:#e8eef0;stroke-width:1"/><path class="ecs" d="M250 176L318 220" style="stroke-width:2.5"/>`
   +FT.text(8,278,"Asse corto (out-of-plane)",{b:true})+FT.text(8,292,["vaso come un cerchio; si vede solo","una sezione dell'ago: si segue la","punta a piccoli passi"],{sm:true})
   +FT.text(224,278,"Asse lungo (in-plane)",{b:true})+FT.text(224,292,["si vede tutto l'ago, ma è più","difficile mantenere il vaso","nel fascio"],{sm:true})
   +FT.box(8,332,424,54,"Posizionamento dinamico della punta",["sposta la sonda in avanti finché la punta scompare,","poi avanza l'ago finché ricompare, e così via"],"ok")
   +FT.box(8,394,424,42,"Punta sotto la vena: parete posteriore passata","ritira lentamente finché torna nel lume","warn"));
  })()},
{id:"eco-tvp-compressione",t:"Compressione: la vena normale si chiude, quella con trombo no",c:"Con una lieve pressione della sonda la vena normale si chiude del tutto; se non si comprime completamente, di solito contiene un trombo. Si comprime su due punti, inguine e cavo popliteo. Schermi schematici, in asse corto, con l'arteria rotonda accanto alla vena.",
 enc:["eco-tvp"],gl:[],st:/trombosi|tvp|trombo|ecograf|compression/i,
 svg:(()=>{
  const sc=(x,y,w,h)=>`<rect class="tis" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const chev=(cx,y)=>`<path class="ecs" d="M${cx-7} ${y+10}L${cx} ${y+17}L${cx+7} ${y+10}" style="stroke-width:2"/>`;
  const art=(x,ry)=>`<ellipse class="scr" cx="${x+30}" cy="76" rx="11" ry="${ry}" style="stroke:#e8eef0;stroke-width:3"/>`;
  const vein=(x,ry,th)=>`<ellipse class="${th?"ecl":"scr"}" cx="${x+68}" cy="76" rx="14" ry="${ry}" style="stroke:#e8eef0;stroke-width:1.2"/>`;
  return FT.svg(440,390,"Quattro schermi: vena normale a riposo e chiusa dalla compressione; vena con trombo che resta aperta anche comprimendo. Sotto, la gamba con i due punti di compressione, inguine e cavo popliteo, e tre riquadri su trombo recente, Doppler ed esame negativo",
   FT.text(112,18,"Vena normale",{a:"middle",b:true})+FT.text(328,18,"Vena con trombo",{a:"middle",b:true})
   +sc(8,32,100,84)+art(8,11)+vein(8,11,false)
   +sc(116,32,100,84)+art(116,9)+vein(116,1.5,false)+chev(166,32)
   +sc(224,32,100,84)+art(224,11)+vein(224,11,true)
   +sc(332,32,100,84)+art(332,9)+vein(332,11,true)+chev(382,32)
   +[58,166,274,382].map((cx,i)=>FT.text(cx,132,i%2?"con compressione":"a riposo",{a:"middle",sm:true})).join("")
   +FT.box(8,142,208,44,"Si chiude completamente","sotto una lieve pressione","ok")
   +FT.box(224,142,208,44,"Non si comprime","di solito la vena contiene un trombo","alarm")
   +FT.text(8,216,"Due punti di compressione",{b:true})
   +`<path class="fbx" d="M34 224L102 224Q100 270 94 296Q92 330 86 352H50Q44 330 42 296Q36 270 34 224Z"/>`
   +FT.dot(68,240,"1",{r:11})+FT.dot(68,300,"2",{r:11})
   +FT.text(112,244,"Inguine",{b:true})+FT.text(112,304,"Cavo popliteo",{b:true})
   +FT.box(224,204,208,62,"Trombo recente",["quasi anecogeno: si usa la","compressione, non l'aspetto"],"info")
   +FT.box(224,272,208,52,"Al Doppler",["nessun flusso, e non aumenta","comprimendo il polpaccio"],"info")
   +FT.box(224,330,208,52,"Esame negativo",["con alto sospetto clinico: si","ripete o si completa"],"warn"));
  })()},
{id:"es-coagulazione-vie",t:"PT e aPTT: quale via guardano e quali valori hanno",c:"Il PT vede la via estrinseca (VII) e la via comune; l'aPTT vede la via intrinseca e la comune. In terapia con warfarin si segue l'INR: bersaglio di solito 2-3, più alto per alcune protesi valvolari meccaniche. Barre indicative.",
 enc:["es-coagulazione"],gl:[],st:/coagul|inr|aptt|warfarin|anticoag/i,
 svg:(()=>{
  const X=v=>20+(v-0.5)*(400/3.5),bar=(y,a,b,k)=>`<rect class="fbx k-${k}" x="${X(a)}" y="${y}" width="${X(b)-X(a)}" height="18" rx="4"/>`;
  return FT.svg(440,408,"Schema della coagulazione con via intrinseca (XII, XI, IX, VIII), via estrinseca (VII) e via comune (X, V, II, I); riquadri su che cosa vedono PT e aPTT; asse dell'INR con gli intervalli senza terapia, con warfarin e per alcune protesi valvolari meccaniche; aPTT in secondi",
   FT.text(8,20,"Via intrinseca",{b:true})
   +["XII","XI","IX","VIII"].map((n,i)=>FT.box(8+i*56,28,44,26,n,"","warn",{rx:5})).join("")
   +[0,1,2].map(i=>FT.arrow(52+i*56,41,64+i*56,41,{h:6})).join("")
   +FT.text(8,78,"Via estrinseca",{b:true})+FT.box(8,84,44,26,"VII","","info",{rx:5})
   +FT.text(242,22,"Via comune",{b:true})
   +["X","V","II","I"].map((n,i)=>FT.box(242+i*50,56,40,26,n,"","",{rx:5})).join("")
   +[0,1,2].map(i=>FT.arrow(282+i*50,69,292+i*50,69,{h:6})).join("")
   +FT.elbow([[220,41],[262,41],[262,56]],{h:6})+FT.elbow([[52,97],[262,97],[262,82]],{h:6})
   +FT.text(242,112,"II = protrombina · I = fibrinogeno",{sm:true})
   +FT.box(8,126,208,62,"PT (espresso come INR)",["via estrinseca (VII) e via","comune (X, V, II, I)"],"info")
   +FT.box(224,126,208,62,"aPTT",["via intrinseca (XII, XI, IX,","VIII) e via comune"],"warn")
   +FT.text(8,214,"INR: intervalli indicativi",{b:true})
   +bar(228,0.8,1.2,"ok")+FT.text(X(1.2)+6,241,"senza terapia (0,8-1,2)",{sm:true})
   +bar(258,2,3,"info")+FT.text(X(2)-6,271,"warfarin (2-3)",{a:"end",sm:true})
   +bar(288,2.5,3.5,"warn")+FT.text(X(2.5)-6,297,["alcune protesi valvolari","meccaniche (2,5-3,5)"],{a:"end",sm:true,lh:11})
   +`<path class="fl" d="M${X(0.5)} 322H${X(4)}"/>`+[1,2,3,4].map(v=>`<path class="fl" d="M${X(v)} 322v5"/>`+FT.text(X(v),340,String(v),{a:"middle",sm:true})).join("")
   +FT.box(8,350,424,50,"aPTT circa 25-35 secondi (o ratio 0,8-1,2)",["con eparina non frazionata di solito 1,5-2,5 volte","il valore di controllo, secondo protocollo"],"info"));
  })()},
{id:"es-sodio-potassio-intervalli",t:"Sodio, potassio e cloro: dove cade il valore normale",c:"Ogni riga ha una scala propria: la banda verde è l'intervallo normale, le zone ambra sono i valori bassi e alti. Per il potassio, sotto 2,5-3 o sopra 6 mmol/l serve il monitoraggio ECG continuo. Il sodio si corregge piano.",
 enc:["es-sodio-potassio"],gl:[],st:/sodio|potassio|elettrol|natriemia|kaliemia/i,
 svg:(()=>{
  const row=(y,nome,lo,hi,mn,mx,zl,zh,nl,nh)=>{const X=v=>24+(v-mn)/(mx-mn)*392,a=X(lo),b=X(hi);
   return FT.text(8,y,nome,{b:true})
   +`<rect class="fbx k-warn" x="24" y="${y+8}" width="392" height="22" rx="5"/><rect class="fbx k-ok" x="${a}" y="${y+8}" width="${b-a}" height="22"/>`
   +FT.text(24+(a-24)/2,y+23,zl,{a:"middle",sm:true})+FT.text((a+b)/2,y+23,nl+"-"+nh,{a:"middle",sm:true})+FT.text((b+416)/2,y+23,zh,{a:"middle",sm:true})
   +FT.text(a,y+44,nl,{a:"middle",sm:true})+FT.text(b,y+44,nh,{a:"middle",sm:true})};
  const Xk=v=>24+(v-2)/5*392;
  return FT.svg(440,322,"Tre barre con la banda normale di sodio 135-145, potassio 3,5-5,0 e cloro circa 98-107 mmol/l, con le zone sotto e sopra; sul potassio i tratti sotto 2,5-3 e sopra 6 con monitoraggio ECG; riquadri su osmolalità e correzione del sodio",
   row(18,"Sodio (Na+), mmol/l",135,145,120,160,"iponatriemia","ipernatriemia","135","145")
   +row(88,"Potassio (K+), mmol/l",3.5,5,2,7,"ipopotassiemia","iperpotassiemia","3,5","5,0")
   +`<path class="fz" d="M24 156H${Xk(3)}M${Xk(6)} 156H416"/>`+FT.text(220,160,"monitoraggio ECG continuo",{a:"middle",sm:true})
   +FT.text(24+(Xk(3)-24)/2,174,"< 2,5-3",{a:"middle",sm:true})+FT.text((Xk(6)+416)/2,174,"> 6",{a:"middle",sm:true})
   +row(196,"Cloro (Cl-), mmol/l",98,107,90,115,"cloro basso","cloro alto","98","107")
   +FT.box(8,250,208,66,"Osmolalità plasmatica",["circa 275-295 mOsm/kg","(glicemia e BUN in mg/dl)","2 × Na + glicemia/18 + BUN/2,8"],"info")
   +FT.box(224,250,208,66,"Correzione del sodio",["iponatriemia cronica: non oltre","8-10 mmol/l nelle 24 ore"],"warn"));
  })()},
/* lotto: senza-figure */
{id:"dir-gerarchia-fonti",t:"La piramide delle fonti del diritto",c:"Una fonte di grado inferiore non può contraddire quella superiore. Salendo verso il vertice la norma prevale; in basso circolari e linee guida danno indicazioni operative ma non sono leggi.",
 enc:["dir-fonti"],gl:[],st:/fonti|gerarchia|diritto|norma/i,
 svg:FT.svg(440,384,"Piramide a cinque livelli: Costituzione, diritto dell'Unione europea, fonti primarie, fonti secondarie, circolari e linee guida; sotto, i criteri per risolvere i conflitti tra norme",
  FT.box(140,8,160,54,"Costituzione",["e leggi costituzionali"],"alarm")
  +FT.box(115,68,210,54,"Diritto dell'UE",["regolamenti e direttive:","prevalgono nelle materie UE"],"warn")
  +FT.box(90,128,260,54,"Fonti primarie",["legge, decreto legislativo, decreto-legge,","leggi regionali (materie delle Regioni)"],"info")
  +FT.box(65,188,310,54,"Fonti secondarie",["regolamenti: DPR, decreti ministeriali","non possono andare contro una legge"],"info")
  +FT.box(40,248,360,54,"Circolari, linee guida, atti aziendali",["indicazioni operative: non sono leggi"],"")
  +FT.arrow(20,20,20,290)
  +FT.box(8,312,424,64,"Conflitto tra norme: tre criteri",["gerarchico: prevale la fonte superiore · cronologico: la più recente","specialità: la norma speciale prevale su quella generale"],""))},
{id:"ml-infortunio-flusso",t:"Infortunio sul lavoro: che cosa si segnala e quando",c:"Il lavoratore avvisa subito; poi la scadenza dipende dalla gravità. Denuncia (prognosi oltre 3 giorni) e semplice comunicazione non sono la stessa cosa. Una puntura accidentale con ago è sempre un infortunio da segnalare.",
 enc:["ml-infortuni","ml-biologico"],gl:[],st:/infortun|inail|lavoro/i,
 svg:FT.svg(440,352,"Flusso dell'infortunio sul lavoro: avviso al datore di lavoro e certificato, poi tre strade con scadenze diverse (comunicazione, denuncia, morte o pericolo di morte), infine l'indennità INAIL",
  FT.box(8,8,424,50,"Infortunio sul lavoro",["causa violenta in occasione di lavoro (es. puntura d'ago)"],"info")
  +FT.arrow(220,58,220,74)
  +FT.box(8,74,424,50,"Il lavoratore avvisa subito il datore di lavoro",["anche se lieve; si fa rilasciare il certificato medico"],"info")
  +FT.elbow([[220,124],[220,135],[76,135],[76,146]])
  +FT.arrow(220,124,220,146)
  +FT.elbow([[220,135],[364,135],[364,146]])
  +FT.box(8,146,136,86,["Assenza","1-3 giorni"],["comunicazione","entro 48 ore,","a fini statistici"],"ok")
  +FT.box(152,146,136,86,["Prognosi","oltre 3 giorni"],["denuncia telematica","entro 2 giorni dalla","ricezione del certificato"],"warn")
  +FT.box(296,146,136,86,["Morte o pericolo","di morte"],["entro 24 ore"],"alarm")
  +FT.box(8,244,424,52,"Indennità INAIL dal 4° giorno",["60% della retribuzione fino al 90° giorno, 75% dal 91°"],"info")
  +FT.box(8,304,424,40,"Puntura accidentale con ago: sempre da segnalare, anche senza assenza","","warn",{}))},
{id:"consenso-chi-decide",t:"Consenso informato: requisiti e chi decide",c:"Il consenso è valido solo se ha tutti i requisiti ed è revocabile in ogni momento. Chi decide dipende dalla situazione: la persona, i genitori o il tutore, l'amministratore di sostegno; in emergenza si interviene per stato di necessità.",
 enc:["consenso-informato","dat"],gl:[],st:/consenso|etica|deontolog/i,
 svg:FT.svg(440,376,"Il consenso informato: sei requisiti in alto e quattro situazioni in basso (persona capace, minore, persona incapace o con amministratore di sostegno, emergenza)",
  FT.box(8,8,424,62,"Consenso informato (L. 219/2017)",["accettare o rifiutare un trattamento, anche salvavita,","dopo informazioni comprensibili"],"info")
  +FT.text(8,90,"Sei requisiti",{sm:true,b:true})
  +FT.box(8,98,136,30,"Personale","","ok")+FT.box(152,98,136,30,"Libero","","ok")+FT.box(296,98,136,30,"Informato","","ok")
  +FT.box(8,134,136,30,"Consapevole","","ok")+FT.box(152,134,136,30,"Attuale","","ok")+FT.box(296,134,136,30,"Revocabile","","ok")
  +FT.text(8,186,"Chi decide",{sm:true,b:true})
  +FT.box(8,194,208,82,"Persona capace",["decide la persona stessa;","forma scritta o videoregistrata,","o con dispositivi adatti; in cartella"],"info")
  +FT.box(224,194,208,82,"Minore",["decidono genitori o tutore,","tenendo conto della volontà","del minore (età e maturità)"],"info")
  +FT.box(8,284,208,82,["Incapace o con","amministratore di sostegno"],["decide il tutore o","l'amministratore, secondo","il decreto di nomina"],"info")
  +FT.box(224,284,208,82,"Emergenza",["si interviene per lo stato","di necessità, salvo un rifiuto","valido già espresso"],"warn"))},
{id:"referto-denuncia-confronto",t:"Referto e denuncia: chi, quando, entro quando",c:"Due obblighi verso l'autorità giudiziaria che non vanno confusi: il referto riguarda chi presta assistenza e ha un termine e un limite precisi; la denuncia riguarda chi è pubblico ufficiale o incaricato di pubblico servizio.",
 enc:["referto-denuncia","segreto-professionale"],gl:[],st:/referto|denuncia|legale|reato/i,
 svg:FT.svg(440,434,"Confronto tra referto e denuncia di reato: chi è obbligato, quando, termine ed eccezione; sotto esempi di delitti procedibili d'ufficio, la qualifica dell'infermiere del SSN e il falso nelle certificazioni",
  FT.box(8,8,208,46,["Referto","art. 365 c.p."],"","info")
  +FT.box(224,8,208,46,["Denuncia","artt. 361-362 c.p."],"","info")
  +FT.box(8,62,208,66,"Chi",["chi presta assistenza in casi che","possono avere i caratteri di un","delitto procedibile d'ufficio"],"")
  +FT.box(224,62,208,66,"Chi",["pubblico ufficiale o incaricato","di pubblico servizio"],"")
  +FT.box(8,136,208,52,"Termine",["entro 48 ore (art. 334 c.p.p.),","o subito se c'è pericolo"],"warn")
  +FT.box(8,196,208,52,"Eccezione",["non è dovuto se espone la persona","assistita a procedimento penale"],"ok")
  +FT.box(224,136,208,112,"Quando",["apprende un delitto d'ufficio","nell'esercizio delle funzioni"],"")
  +FT.box(8,258,424,58,"Delitti procedibili d'ufficio: esempi",["lesioni gravi o gravissime, maltrattamenti in famiglia,","violenza sessuale su minori, omicidio"],"info")
  +FT.box(8,324,424,46,"L'infermiere del SSN è almeno incaricato di pubblico servizio",["art. 358 c.p."],"")
  +FT.box(8,378,424,46,"Il falso nelle certificazioni è reato",["artt. 476-481 c.p."],"alarm"))},
{id:"tbc-percorso",t:"Tubercolosi: dall'infezione alla malattia, diagnosi e misure",c:"Solo la malattia attiva è contagiosa. Per sospetto o conferma si usano test mirati, isolamento respiratorio con protezioni adeguate e una terapia di almeno 6 mesi con più farmaci.",
 enc:["tbc","precauzioni"],gl:[],st:/tubercol|tbc|infezion|isolamento/i,
 svg:FT.svg(440,354,"Percorso della tubercolosi: infezione latente e malattia attiva, test diagnostici, isolamento respiratorio, terapia di almeno 6 mesi, rifampicina e notifica obbligatoria",
  FT.box(8,8,150,66,"Infezione latente",["non contagiosa,","asintomatica"],"ok")
  +FT.arrow(158,41,186,41)
  +FT.box(186,8,246,66,"Malattia attiva",["tosse da più di 2-3 settimane, febbricola","serale, sudorazioni notturne,","calo di peso, emottisi"],"alarm")
  +FT.arrow(220,74,220,88)
  +FT.box(8,88,136,66,"Mantoux",["lettura dopo 48-72 ore:","si misura l'indurimento,","non l'arrossamento"],"info")
  +FT.box(152,88,136,66,"IGRA",["esame del sangue","segnala l'infezione,","non la malattia attiva"],"info")
  +FT.box(296,88,136,66,"Espettorato e RX",["esame dell'espettorato","e RX del torace"],"info")
  +FT.arrow(220,154,220,168)
  +FT.box(8,168,424,52,"Isolamento respiratorio",["stanza singola a pressione negativa · FFP2/FFP3 per gli operatori","mascherina chirurgica al paziente nei trasferimenti"],"warn")
  +FT.arrow(220,220,220,234)
  +FT.box(8,234,424,52,"Terapia",["almeno 6 mesi, più farmaci: isoniazide, rifampicina,","pirazinamide, etambutolo"],"ok")
  +FT.box(8,300,208,46,"Rifampicina",["colora di arancione urine e lacrime"],"")
  +FT.box(224,300,208,46,"Notifica obbligatoria",["malattia a notifica obbligatoria"],"info"))},
{id:"preeclampsia-schema",t:"Preeclampsia: segni, HELLP e magnesio solfato",c:"Ipertensione dopo 20 settimane con proteinuria o danno d'organo; se compaiono convulsioni è eclampsia. Con il magnesio solfato si controllano riflessi, respiro e diuresi, e si tiene pronto l'antidoto. La cura definitiva è il parto.",
 enc:["preeclampsia","gravidanza"],gl:[],st:/preeclampsia|eclampsia|gravidanza|magnesio/i,
 svg:FT.svg(440,312,"Preeclampsia che può evolvere in eclampsia; segni da riconoscere e sindrome HELLP; magnesio solfato con monitoraggio e antidoto; la cura definitiva è il parto",
  FT.box(8,8,200,66,"Preeclampsia",["ipertensione dopo 20 settimane","con proteinuria o danno d'organo"],"warn")
  +FT.arrow(208,41,236,41)
  +FT.box(236,8,196,66,"Eclampsia",["si aggiungono","le convulsioni"],"alarm")
  +FT.arrow(140,74,140,92)
  +FT.box(8,92,264,70,"Segni da riconoscere",["pressione ≥ 140/90, proteinuria, cefalea,","disturbi visivi, dolore epigastrico,","edemi, iperreflessia"],"info")
  +FT.box(280,92,152,70,"Sindrome HELLP",["emolisi, enzimi","epatici elevati,","piastrine basse"],"alarm")
  +FT.arrow(140,162,140,180)
  +FT.arrow(356,162,356,180)
  +FT.box(8,180,424,64,"Magnesio solfato: previene e tratta le convulsioni",["monitorare: riflessi rotulei, frequenza respiratoria, diuresi","antidoto: calcio gluconato"],"ok")
  +FT.arrow(220,244,220,258)
  +FT.box(8,258,424,46,"La cura definitiva è il parto","","info"))}
];
