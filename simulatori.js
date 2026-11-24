/* Simulatori interattivi di fisiopatologia dell'Atlante.
   Formato: SIM.push({id,enc:[idVoci],t,d,stadi:[nomi],dur:"4s",fasi:["Inspirazione","Espirazione"]?,
     livelli:[{t,sub,svg:s=>`<svg viewBox=…>…</svg>`,testo:[uno per stadio],val:[uno per stadio]?}],legenda:[[classe,etichetta]]?,n:"fonti"})
   svg(s) riceve l'indice dello stadio e restituisce un SVG con classi .fig (temi chiaro e scuro) e animazioni SMIL facoltative. */
var SIM=[];

/* ---- BPCO (spunto: reel con simulatore per stadi GOLD; disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t;
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const bron=s=>{const t=s/4,cx=330,cy=125,Ro=78,wall=R(10,34,t),Rl=Ro-wall,mu=R(0,.55,t)*Rl;
 let cil="";const nc=Math.round(R(36,10,t));for(let i=0;i<nc;i++){const a=i/nc*6.283,r1=Rl,r2=Rl-6;cil+=`<path d="M${cx+r1*Math.cos(a)} ${cy+r1*Math.sin(a)}L${cx+r2*Math.cos(a)} ${cy+r2*Math.sin(a)}" class="lead"/>`}
 let cells="";const nn=Math.round(R(0,16,t));for(let i=0;i<nn;i++){const a=rnd(i+1)*6.283,r=Rl+wall*R(.25,.75,rnd(i+7));cells+=`<circle cx="${cx+r*Math.cos(a)}" cy="${cy+r*Math.sin(a)}" r="3" fill="#8e63c9"/>`}
 const mucus=mu>0?`<circle cx="${cx}" cy="${cy}" r="${Rl}" fill="#9bc53d" opacity=".75"/><circle cx="${cx}" cy="${cy}" r="${Rl-mu}" class="ff"/>`:"";
 // sezione longitudinale
 const x0=30,x1=210,yT=48,yB=202,wt=R(10,30,t),gap=(yB-yT)-2*wt,mh=R(0,.28,t)*gap;
 const flow=[0,1,2].map(i=>`<circle r="3" class="fv anm" fill="var(--scrub)"><animateMotion path="M${x1-8} ${125+(i-1)*R(26,8,t)}H${x0+8}" dur="${R(2,3.6,t)}s" begin="${i*.5}s" repeatCount="indefinite"/></circle>`).join("");
 return head(`Bronchiolo nello stadio ${s}: parete ${t?"ispessita e infiammata, muco nel lume":"sottile, lume ampio"}`,
 `<text x="${x0}" y="30" class="ft fb">Sezione longitudinale</text><text x="${cx}" y="30" class="ft fb" text-anchor="middle">Sezione trasversale</text>
 <rect x="${x0}" y="${yT}" width="${x1-x0}" height="${yB-yT}" class="eyrow"/>
 <rect x="${x0}" y="${yT}" width="${x1-x0}" height="${wt}" fill="#d9637b" opacity=".8"/><rect x="${x0}" y="${yB-wt}" width="${x1-x0}" height="${wt}" fill="#d9637b" opacity=".8"/>
 ${mh?`<path d="M${x0} ${yT+wt}${[...Array(9)].map((_,i)=>`Q${x0+(i+.5)*20} ${yT+wt+mh*(1+rnd(i)*.6)} ${x0+(i+1)*20} ${yT+wt}`).join("")}Z" fill="#9bc53d" opacity=".75"/><path d="M${x0} ${yB-wt}${[...Array(9)].map((_,i)=>`Q${x0+(i+.5)*20} ${yB-wt-mh*(1+rnd(i+3)*.6)} ${x0+(i+1)*20} ${yB-wt}`).join("")}Z" fill="#9bc53d" opacity=".75"/>`:""}
 ${flow}
 <circle cx="${cx}" cy="${cy}" r="${Ro}" fill="#d9637b" opacity=".8"/><circle cx="${cx}" cy="${cy}" r="${Rl}" class="ff"/>${mucus}${cil}${cells}
 <circle cx="${cx}" cy="${cy}" r="${Rl}" class="fl"/>
 <text x="${x0}" y="${H-12}" class="ft fsm">Flusso d'aria ${t>.6?"molto ridotto":t>0?"ridotto":"libero"}</text><text x="${cx}" y="${H-12}" class="ft fsm" text-anchor="middle">Lume ${["libero","poco ristretto","ristretto","molto ristretto","quasi occluso"][s]}</text>`)};
const alv=s=>{const t=s/4,cx=220,cy=124;
 const pos=[[cx,cy]].concat([...Array(6)].map((_,i)=>{const a=i/6*6.283-1.57;return[cx+50*Math.cos(a),cy+50*Math.sin(a)]}));
 const lost=[0,1,3,5,7][s]; // setti persi (0-7)
 const amp=R(.08,.02,t),back=R(1,1.05,t);
 const anim=`<animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};${back}" keyTimes="0;.5;1" dur="4s" repeatCount="indefinite"/>`;
 const fill=pos.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i<lost?R(31,40,t):29}" class="fa"/>`).join("");
 const sept=pos.map((p,i)=>i<lost?"":`<circle cx="${p[0]}" cy="${p[1]}" r="29" fill="none" stroke="#d9637b" stroke-width="2.4"/>`).join("");
 const fib=pos.map((p,i)=>i<lost?"":`<path d="M${p[0]-20} ${p[1]+21}q20 6 40 0" fill="none" stroke="#3aa0d8" stroke-width="2"/>`).join("");
 const hull=lost?`<circle cx="${cx}" cy="${cy}" r="${R(80,92,t)}" fill="none" stroke="#d9637b" stroke-width="2.4" stroke-dasharray="${s>=3?"0":"4 5"}"/>`:"";
 let ela="";for(let i=0;i<[0,4,7,10,13][s];i++){const a=rnd(i+2)*6.283,r=R(12,78,rnd(i+5));ela+=`<path d="M${cx+r*Math.cos(a)-4} ${cy+r*Math.sin(a)}l4 -4l4 4l-4 4z" fill="#e0425a"/>`}
 let gas="";for(let i=0;i<[14,12,9,7,5][s];i++){const a=rnd(i+9)*6.283,r=R(8,64,rnd(i+11));gas+=`<circle cx="${cx+r*Math.cos(a)}" cy="${cy+r*Math.sin(a)}" r="3" fill="#3a6fd8"/>`}
 return head(`Acino polmonare nello stadio ${s}: ${lost?lost+" alveoli su 7 hanno perso i setti e sono confluiti":"alveoli integri con setti elastici"}`,
 `<text x="20" y="24" class="ft fb">Acino: alveoli, setti elastici, capillari</text>
 <g style="transform-origin:${cx}px ${cy}px;transform-box:view-box"><g>${anim}${fill}${sept}${fib}${hull}</g></g>${ela}${gas}
 <text x="20" y="${H-28}" class="ft fsm">Superficie di scambio ${["normale","lievemente ridotta","ridotta","molto ridotta","gravemente ridotta"][s]}</text>
 <text x="20" y="${H-12}" class="ft fsm">Ritorno elastico ${["normale","poco ridotto","ridotto","molto ridotto","quasi perso"][s]}${s>=2?": in espirazione le piccole vie aeree collassano":""}</text>`)};
const pol=s=>{const t=s/4,cx=220,top=40,base=R(196,214,t),sc=R(1,1.13,t),dc=R(160,206,t);
 const lung=(dx,f)=>`<path d="M${cx+dx*18} ${top+18}C${cx+dx*(70*sc)} ${top} ${cx+dx*(112*sc)} ${top+90} ${cx+dx*(104*sc)} ${base}Q${cx+dx*60} ${dc+6} ${cx+dx*22} ${base-8}Z" fill="#e2789a" opacity="${R(.9,.55,t)}" stroke="#c2506f"/>`;
 const bul=s>=2?[...Array(s*2)].map((_,i)=>`<circle cx="${cx+(i%2?1:-1)*R(40,90,rnd(i+3))}" cy="${R(70,170,rnd(i+8))}" r="${R(6,14,rnd(i+1))}" fill="#3b3346" opacity=".75"/>`).join(""):"";
 const trap=s?`<ellipse cx="${cx-62*sc}" cy="${base-30}" rx="${R(10,36,t)}" ry="${R(8,26,t)}" fill="#f0a23a" opacity=".55"/><ellipse cx="${cx+62*sc}" cy="${base-30}" rx="${R(10,36,t)}" ry="${R(8,26,t)}" fill="#f0a23a" opacity=".55"/>`:"";
 const amp=R(.06,.015,t);
 return head(`Polmoni nello stadio ${s}: ${s?"iperinflazione, aria intrappolata, diaframma appiattito":"volume normale, diaframma a cupola"}`,
 `<text x="20" y="24" class="ft fb">Meccanica globale e diaframma</text>
 <path d="M${cx} ${top-20}V${top+30}M${cx} ${top+30}l-18 18M${cx} ${top+30}l18 18" class="fl" stroke-width="6" stroke="var(--muted)"/>
 <g style="transform-origin:${cx}px ${base}px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};1" dur="4s" repeatCount="indefinite"/>${lung(-1)}${lung(1)}${bul}${trap}</g></g>
 <path d="M${cx-130} ${base+16}Q${cx} ${R(base-30,base+10,t)} ${cx+130} ${base+16}" fill="none" stroke="#d9637b" stroke-width="5" stroke-linecap="round"/>
 <text x="20" y="${H-10}" class="ft fsm">Diaframma ${["a cupola","appena abbassato","abbassato","appiattito","piatto"][s]}</text>`)};
SIM.push({id:"sim-bpco",enc:["bpco"],t:"Simulatore: la BPCO stadio per stadio",d:"Scegli lo stadio spirometrico GOLD e il livello da osservare. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["Sano","GOLD 1 lieve","GOLD 2 moderata","GOLD 3 grave","GOLD 4 molto grave"],dur:"4s",fasi:["Inspirazione","Espirazione"],
 livelli:[
  {t:"Bronchiolo",sub:"bronchite cronica",svg:bron,
   testo:["Parete sottile, ciglia numerose che spostano il muco verso l'alto, lume ampio: l'aria passa senza ostacoli.","Il fumo richiama neutrofili e macrofagi; le cellule che producono muco aumentano. Spesso c'è già tosse con espettorato.","La parete si ispessisce, il muco aderisce alle pareti e le ciglia lavorano peggio: il lume si restringe e l'espirazione si allunga.","Infiammazione e fibrosi della parete, tappi di muco: il flusso è molto ridotto, le infezioni e le riacutizzazioni sono più frequenti.","Lume quasi occluso da parete spessa e secrezioni: l'aria esce con grande fatica."]},
  {t:"Alveoli",sub:"enfisema",svg:alv,
   testo:["Alveoli separati da setti sottili ricchi di fibre elastiche (blu) e capillari: grande superficie di scambio e buon ritorno elastico.","Le proteasi delle cellule infiammatorie, come l'elastasi dei neutrofili (rombi rossi), iniziano a superare le difese antiproteasiche.","L'elastina si rompe e alcuni setti spariscono: gli alveoli confluiscono in spazi più grandi e lo scambio di O₂ e CO₂ si riduce.","Molti setti distrutti: il polmone perde la trazione elastica che teneva aperte le piccole vie aeree, che in espirazione collassano.","Grandi spazi aerei e bolle: superficie di scambio gravemente ridotta. Il danno è permanente."]},
  {t:"Polmone intero",sub:"iperinflazione",svg:pol,
   testo:["Volume normale; il diaframma a cupola si contrae bene e in espirazione il polmone torna al volume di partenza.","Lieve aria intrappolata alla fine dell'espirazione, di solito senza sintomi a riposo.","L'aria intrappolata aumenta, soprattutto sotto sforzo (iperinflazione dinamica): compare dispnea da sforzo.","Il torace si espande e il diaframma si abbassa: le fibre accorciate si contraggono male, la dispnea aumenta.","Polmoni iperinflati con bolle, diaframma piatto, uso dei muscoli accessori: respirare costa molta fatica."]}],
 legenda:[["#d9637b","Parete e tessuto"],["#9bc53d","Muco"],["#8e63c9","Neutrofili e macrofagi"],["#3aa0d8","Fibre elastiche"],["#e0425a","Elastasi"],["#3a6fd8","Gas scambiati"],["#f0a23a","Aria intrappolata"],["#3b3346","Bolle"]],
 n:"GOLD 2023 Executive Summary (PMID 36858443); Christenson SA et al. Lancet 2022 (PMID 35533707)."});
})();
