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
 <path class="fl" stroke-width="2.4" style="stroke-width:2.4" d="M40 170H70L150 45L160 100H240C255 160 268 170 290 170H300"/>
 <circle class="fv" cx="150" cy="45" r="4.5"/><circle class="fv" cx="200" cy="100" r="4.5"/>
 <path class="fx" d="M312 45V100M306 45H318M306 100H318"/><path class="fs" d="M312 104V170M306 104H318M306 170H318"/>
 <g class="ft" font-weight="700"><text x="150" y="34" text-anchor="middle">Ppicco</text><text x="200" y="90" text-anchor="middle">Pplateau</text><text x="46" y="186">PEEP</text>
 <text x="324" y="68">picco − plateau</text><text x="324" y="132">plateau − PEEP</text></g>
 <g class="ft fsm"><text x="200" y="120" text-anchor="middle">pausa inspiratoria</text><text x="324" y="83">= resistenze</text><text x="324" y="147">= driving pressure</text><text x="44" y="14">cmH₂O</text><text x="262" y="215">tempo</text></g></svg>`},
{id:"vent-flusso",t:"Curva flusso-tempo: l'espirazione torna a zero?",c:"Secondo sguardo: il flusso. Sopra lo zero l'aria entra, sotto esce. A sinistra l'espirazione si esaurisce e la curva torna a zero prima dell'atto successivo. A destra l'atto successivo parte quando l'aria sta ancora uscendo: resta intrappolata (auto-PEEP). Serve più tempo per espirare.",
 enc:["curve-ventilatore","ventilazione"],gl:["Auto-PEEP"],st:/ventila/i,
 svg:`<svg viewBox="0 0 440 214" role="img" aria-label="Due curve flusso-tempo: a sinistra il flusso espiratorio torna a zero, a destra no (intrappolamento d'aria)">
 <path class="dash" fill="none" d="M20 112H210M232 112H420"/>
 <path class="fl" style="stroke-width:2.4" d="M24 112H38V64H74V170C84 130 100 113 124 112H140V64H176V170C186 130 198 115 208 113"/>
 <path class="fl" style="stroke-width:2.4" d="M234 112H248V64H284V170C292 152 302 140 318 134V64H354V170C362 152 372 140 388 134V64H414"/>
 <g class="fx"><circle cx="318" cy="134" r="7"/><circle cx="388" cy="134" r="7"/></g>
 <g class="ft" font-weight="700" text-anchor="middle"><text x="115" y="22">Normale</text><text x="326" y="22">Intrappolamento d'aria</text></g>
 <g class="ft fsm" text-anchor="middle"><text x="115" y="37">torna a zero</text><text x="326" y="37">non torna a zero</text><text x="56" y="56">inspirazione</text><text x="104" y="190">espirazione</text><text x="14" y="116">0</text><text x="226" y="116">0</text></g></svg>`},
{id:"vent-volume",t:"Curva volume-tempo: il volume rientra tutto?",c:"Terzo sguardo: il volume. Sale in inspirazione e deve ridiscendere fino alla linea di base. Se la discesa si interrompe prima e la curva viene riportata a zero di scatto, una parte del volume inspirato non è tornata al ventilatore: è una perdita. Si cerca dalla cuffia al circuito e si confrontano volume inspirato ed espirato.",
 enc:["curve-ventilatore","ventilazione"],gl:[],st:/ventila/i,
 svg:`<svg viewBox="0 0 440 214" role="img" aria-label="Due curve volume-tempo: a sinistra il volume torna alla linea di base, a destra la discesa è incompleta (perdita)">
 <path class="lead" d="M20 176H210M232 176H420"/>
 <path class="fl" style="stroke-width:2.4" d="M24 176H40C52 112 64 74 80 72C92 124 104 172 124 176H140C152 112 164 74 180 72C192 124 200 164 208 172"/>
 <path class="fl" style="stroke-width:2.4" d="M234 176H250C262 112 274 74 290 72C300 114 310 140 326 144M326 176C338 112 350 74 366 72C376 114 386 140 402 144M402 176H416"/>
 <path class="fx" style="stroke-width:3.2" d="M326 144V176M402 144V176"/>
 <g class="ft" font-weight="700" text-anchor="middle"><text x="115" y="22">Normale</text><text x="326" y="22">Perdita</text></g>
 <g class="ft fsm" text-anchor="middle"><text x="115" y="37">torna alla linea di base</text><text x="326" y="37">la discesa è incompleta</text><text x="326" y="196">volume che non rientra</text></g></svg>`},
{id:"ecg-quadri",t:"Quattro quadri ECG che non vanno mancati",c:"De Winter: ST sottoslivellato che risale in un'onda T alta, equivalente di infarto. Wellens: onde T profondamente invertite in V2-V3 a dolore passato, stenosi critica dell'interventricolare anteriore. Onda epsilon: piccole oscillazioni alla fine del QRS, cardiomiopatia aritmogena del ventricolo destro. Alternanza elettrica: QRS alti e bassi a battiti alterni, tamponamento cardiaco.",
 enc:["ecg-quadri-tipici","stemi"],gl:["Pattern di De Winter","Pattern di Wellens","Onda epsilon","Alternanza elettrica"],st:/ecg|cuore|torace/i,
 svg:`<svg viewBox="0 0 440 292" role="img" aria-label="Quattro tracciati ECG schematici: pattern di De Winter, pattern di Wellens, onda epsilon, alternanza elettrica">
 <defs><pattern id="fq1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fq5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fq1)"/><path d="M20 0V20H0" class="gp5"/></pattern></defs><rect x="8" y="34" width="206" height="96" rx="6" class="pap"/><rect x="8" y="34" width="206" height="96" rx="6" fill="url(#fq5)"/><rect x="228" y="34" width="206" height="96" rx="6" class="pap"/><rect x="228" y="34" width="206" height="96" rx="6" fill="url(#fq5)"/><rect x="8" y="184" width="206" height="78" rx="6" class="pap"/><rect x="8" y="184" width="206" height="78" rx="6" fill="url(#fq5)"/><rect x="228" y="184" width="206" height="78" rx="6" class="pap"/><rect x="228" y="184" width="206" height="78" rx="6" fill="url(#fq5)"/>
 <path class="etr" d="M14 90h6h10q6 -8 12 0h8l3 4l5 -44l5 52q14 -4 22 -52q10 50 26 40h10q6 -8 12 0h8l3 4l5 -44l5 52q14 -4 22 -52q10 50 26 40"/>
 <path class="etr" d="M234 90h4h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4h10q10 2 16 32q6 -30 16 -32h4h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4h10q10 2 16 32q6 -30 16 -32h4"/>
 <path class="etr" d="M12 240h4h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4l2 -6l2 6l2 -5l2 5h12q10 12 20 0h8h10q6 -8 12 0h8l3 4l5 -44l5 44l3 -4l2 -6l2 6l2 -5l2 5h12q10 12 20 0h8"/>
 <path class="etr" d="M236 240h8q5 -7 10 0h6l3 4l4 -54l4 54l3 -4h8q9 -12 18 0h8q5 -7 10 0h6l3 4l4 -28l4 28l3 -4h8q9 -12 18 0h8q5 -7 10 0h6l3 4l4 -54l4 54l3 -4h8q9 -12 18 0"/>
 <g class="fx" style="stroke-width:2.8;stroke-linecap:round"><path d="M63 102q14 -4 22 -52M154 102q14 -4 22 -52"/><path d="M294 90q10 2 16 32q6 -30 16 -32M386 90q10 2 16 32q6 -30 16 -32"/><path d="M62 240l2 -6l2 6l2 -5l2 5M156 240l2 -6l2 6l2 -5l2 5"/><path style="stroke-width:1.4;stroke-dasharray:4 3" d="M267 186L331 212L395 186"/></g>
 <g class="ft" font-weight="700"><text x="14" y="24">Pattern di De Winter</text><text x="234" y="24">Pattern di Wellens</text><text x="14" y="176">Onda epsilon</text><text x="234" y="176">Alternanza elettrica</text></g>
 <g class="ft fsm"><text x="14" y="146">occlusione coronarica acuta (IVA)</text><text x="234" y="146">stenosi critica dell'IVA prossimale</text><text x="14" y="282">cardiomiopatia aritmogena (ARVC)</text><text x="234" y="282">tamponamento cardiaco</text></g></svg>`},
{id:"ecg-elettroliti",t:"Potassio, calcio e magnesio sull'ECG",c:"Potassio basso: onda T piatta, ST sottoslivellato, onda U. Potassio alto: onda T alta e appuntita, onda P piatta; se molto alto QRS largo fino al tracciato sinusoidale e all'arresto. Calcio basso: QT lungo per allungamento del tratto ST; calcio alto: QT corto. Magnesio basso: QT lungo e T piatta, con rischio di torsione di punta; magnesio alto: PR lungo e QRS largo, fino al blocco.",
 enc:["elettroliti-ecg","elettroliti"],gl:[],st:/ecg|elettrolit|potass/i,
 svg:`<svg viewBox="0 0 524 300" role="img" aria-label="Otto battiti ECG schematici: normale e alterazioni da potassio, calcio e magnesio">
 <defs><pattern id="fe1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fe5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fe1)"/><path d="M20 0V20H0" class="gp5"/></pattern></defs><rect x="8" y="40" width="120" height="76" rx="6" class="pap"/><rect x="8" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="136" y="40" width="120" height="76" rx="6" class="pap"/><rect x="136" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="264" y="40" width="120" height="76" rx="6" class="pap"/><rect x="264" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="392" y="40" width="120" height="76" rx="6" class="pap"/><rect x="392" y="40" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="8" y="190" width="120" height="76" rx="6" class="pap"/><rect x="8" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="136" y="190" width="120" height="76" rx="6" class="pap"/><rect x="136" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="264" y="190" width="120" height="76" rx="6" class="pap"/><rect x="264" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/><rect x="392" y="190" width="120" height="76" rx="6" class="pap"/><rect x="392" y="190" width="120" height="76" rx="6" fill="url(#fe5)"/>
 <path class="etr" style="stroke-width:1.7" d="M12 96h10q7 -9 14 0h8l3 4l4 -46l4 50l3 -8h10q12 -18 24 0h20M140 96h10q7 -9 14 0h8l3 4l4 -46l4 50l3 -4q14 1 24 -4q6 -12 12 0h18M268 96h8q7 -3 14 0h12l3 4l4 -46l4 50l3 -8h6q8 -4 11 -44q3 40 11 44h20M396 96h12c8 -64 14 -64 22 0c8 34 14 34 22 0c10 -40 16 -40 28 0h16M12 246h8q7 -9 14 0h8l3 4l4 -46l4 50l3 -8h30q10 -16 20 0h6M140 246h10q7 -9 14 0h8l3 4l4 -46l4 50l3 -8q9 -18 18 0h36M268 246h8q7 -9 14 0h8l3 4l4 -46l4 50l3 -8h20q12 -7 24 0h12M396 246h6q7 -9 14 0h20l5 4l7 -46l7 50l5 -8h5q10 -14 20 0h5"/>
 <path class="fx" style="stroke-width:2.8;stroke-linecap:round" d="M186.0 100.0q14 1 24 -4q6 -12 12 0M276.0 96q7 -3 14 0M322.0 96.0q8 -4 11 -44q3 40 11 44M408.0 96c8 -64 14 -64 22 0c8 34 14 34 22 0c10 -40 16 -40 28 0M56.0 246.0h30M186.0 246.0q9 -18 18 0M312.0 246.0h20q12 -7 24 0M416.0 246.0h20M436.0 246.0l5 4l7 -46l7 50l5 -8"/>
 <g class="ft" font-weight="700"><text x="8" y="32">Normale</text><text x="136" y="32">K⁺ basso</text><text x="264" y="32">K⁺ alto</text><text x="392" y="32">K⁺ molto alto</text><text x="8" y="182">Ca²⁺ basso</text><text x="136" y="182">Ca²⁺ alto</text><text x="264" y="182">Mg²⁺ basso</text><text x="392" y="182">Mg²⁺ alto</text></g>
 <g class="ft fsm"><text x="8" y="132">battito di riferimento</text><text x="136" y="132">T piatta, ST giù, onda U</text><text x="264" y="132">T a tenda, P piatta</text><text x="392" y="132">QRS largo, sinusoide</text><text x="8" y="282">QT lungo (ST lungo)</text><text x="136" y="282">QT corto</text><text x="264" y="282">QT lungo, T piatta</text><text x="392" y="282">PR lungo, QRS largo</text></g></svg>`},
{id:"ecg-sgarbossa",t:"Criteri di Sgarbossa: l'infarto dietro il blocco di branca sinistra",c:"Nel blocco di branca sinistra il tratto ST e l'onda T vanno dalla parte opposta al QRS (discordanza attesa). Fanno sospettare un infarto: ST sopraslivellato nella stessa direzione di un QRS positivo; ST sottoslivellato in V1-V3, dove il QRS è negativo; ST sopraslivellato opposto al QRS ma troppo alto (almeno 5 mm, oppure almeno un quarto della profondità dell'onda S secondo Smith).",
 enc:["ecg-sgarbossa","ecg-blocchi-branca"],gl:["Criteri di Sgarbossa","Discordanza appropriata"],st:/ecg|infarto|blocco/i,
 svg:`<svg viewBox="0 0 442 312" role="img" aria-label="Quattro tracciati schematici con blocco di branca sinistra: discordanza attesa e i tre criteri di Sgarbossa">
 <defs><pattern id="fs1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="fs5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#fs1)"/><path d="M20 0V20H0" class="gp5"/></pattern></defs><rect x="8" y="34" width="206" height="96" rx="6" class="pap"/><rect x="8" y="34" width="206" height="96" rx="6" fill="url(#fs5)"/><rect x="228" y="34" width="206" height="96" rx="6" class="pap"/><rect x="228" y="34" width="206" height="96" rx="6" fill="url(#fs5)"/><rect x="8" y="190" width="206" height="96" rx="6" class="pap"/><rect x="8" y="190" width="206" height="96" rx="6" fill="url(#fs5)"/><rect x="228" y="190" width="206" height="96" rx="6" class="pap"/><rect x="228" y="190" width="206" height="96" rx="6" fill="url(#fs5)"/>
 <path class="etr" d="M14 70h14q5 -5 10 0h8l3 -5l9 55l10 -56q14 -16 30 6h12h14q5 -5 10 0h8l3 -5l9 55l10 -56q14 -16 30 6h12M234 104h14q5 -5 10 0h8l6 -40l4 6l4 -6l8 28q14 -14 30 12h12h14q5 -5 10 0h8l6 -40l4 6l4 -6l8 28q14 -14 30 12h12M14 222h14q5 -5 10 0h8l3 -5l9 55l10 -40q14 12 30 -10h12h14q5 -5 10 0h8l3 -5l9 55l10 -40q14 12 30 -10h12M234 244h14q5 -5 10 0h8l3 -5l9 45l10 -66q14 -18 30 26h12h14q5 -5 10 0h8l3 -5l9 45l10 -66q14 -18 30 26h12"/>
 <path class="fx" style="stroke-width:2.8;stroke-linecap:round" d="M288.0 92.0q14 -14 30 12M384.0 92.0q14 -14 30 12M68.0 232.0q14 12 30 -10M164.0 232.0q14 12 30 -10M288.0 218.0q14 -18 30 26M384.0 218.0q14 -18 30 26"/>
 <g class="ft" font-weight="700" font-size="11.5"><text x="8" y="26">Discordanza attesa (normale)</text><text x="228" y="26">ST sopraslivellato concordante</text><text x="8" y="182">ST sottoslivellato concordante</text><text x="228" y="182">Discordanza eccessiva</text></g>
 <g class="emt" style="font-family:var(--f-mono)" font-size="10" font-weight="700"><text x="204" y="48" text-anchor="end">V1</text><text x="424" y="48" text-anchor="end">V6</text><text x="204" y="204" text-anchor="end">V2</text><text x="424" y="204" text-anchor="end">V2</text></g>
 <g class="ft fsm"><text x="8" y="146">ST e T opposti al QRS: normale nel blocco</text><text x="228" y="146">≥ 1 mm con QRS positivo: 5 punti</text><text x="8" y="302">≥ 1 mm in V1, V2 o V3: 3 punti</text><text x="228" y="302">≥ 5 mm (2 punti) o ≥ 25% dell'onda S (Smith)</text></g></svg>`},
{id:"stato-di-male",t:"Stato di male epilettico: i tempi del trattamento",c:"Una crisi che dura più di 5 minuti va trattata. A 5 minuti benzodiazepina (lorazepam endovena, midazolam buccale o intranasale, diazepam rettale); a circa 20 minuti, se continua, levetiracetam, fosfenitoina o valproato endovena; a circa 40 minuti anestesia generale in terapia intensiva.",
 enc:["antiepilettici","epilessia"],gl:["Stato di male epilettico"],st:/epile|convuls|crisi/i,
 svg:`<svg viewBox="0 0 440 140" role="img" aria-label="Linea del tempo dello stato di male epilettico: 5, 20 e 40 minuti">
 <path class="fl" style="stroke-width:2.2" d="M40 58H400"/><path class="fx" style="stroke-width:2.2" d="M394 52l8 6l-8 6"/>
 <g class="fv"><circle cx="46" cy="58" r="7"/><circle cx="220" cy="58" r="7"/><circle cx="388" cy="58" r="7"/></g>
 <g class="ft" font-weight="700"><text x="38" y="36">5 min</text><text x="220" y="36" text-anchor="middle">circa 20 min</text><text x="400" y="36" text-anchor="end">circa 40 min</text>
 <text x="38" y="88">Benzodiazepina</text><text x="220" y="88" text-anchor="middle">Secondo farmaco</text><text x="400" y="88" text-anchor="end">Anestesia</text></g>
 <g class="ft fsm"><text x="38" y="104">lorazepam, midazolam</text><text x="38" y="118">o diazepam</text><text x="220" y="104" text-anchor="middle">levetiracetam, fosfenitoina</text><text x="220" y="118" text-anchor="middle">o valproato EV</text><text x="400" y="104" text-anchor="end">terapia intensiva</text></g></svg>`},
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
 <text class="ft fsm" x="20" y="252">La fascia rigida non si espande: la pressione sale (frecce)</text></svg>`}
];
