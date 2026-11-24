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
 <g transform="translate(${cx} ${cy})"><g>${anim}<g transform="translate(${-cx} ${-cy})">${fill}${sept}${fib}${hull}</g></g></g>${ela}${gas}
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
 <g transform="translate(${cx} ${base})"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};1" dur="4s" repeatCount="indefinite"/><g transform="translate(${-cx} ${-base})">${lung(-1)}${lung(1)}${bul}${trap}</g></g></g>
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

/* ---- Shock ---- */

/* ---- Shock (generale, esempio ipovolemico; disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,P=(a,s)=>a[s];
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const RBC="#c8384b",O2="#3a6fd8",LAT="#e39a2d",LIQ="#3fbfb6",TRO="#6e2433",MAR="#8e63c9";
const bar=(x,y,lab,f,c,st)=>`<text x="${x}" y="${y}" class="ft fsm">${lab}: ${st}</text><rect x="${x}" y="${y+5}" width="104" height="6" rx="2" class="eyrow"/><rect x="${x}" y="${y+5}" width="${Math.max(2,104*f)}" height="6" rx="2" fill="${c}" opacity=".85"/>`;

/* Livello 1: microcircolo e cellula */
const micro=s=>{const t=s/3,yc=62;
 const ra=P([12,6,7,10],s),rc=5,rv=P([12,10,8,7],s),pre=P([5,2.2,5,5],s),post=P([12,9,4,4],s);
 const ves=`<path d="M20 ${yc-ra}H110L122 ${yc-pre}H318L330 ${yc-rv}H420V${yc+rv}H330L318 ${yc+pre}H122L110 ${yc+ra}H20Z" fill="${RBC}" opacity=".16"/>
 <path d="M20 ${yc-ra}H110L122 ${yc-pre}H318L330 ${yc-rv}H420M20 ${yc+ra}H110L122 ${yc+pre}H318L330 ${yc+rv}H420" class="fl"/>
 <path d="M122 ${yc-pre-5}V${yc-pre}M122 ${yc+pre+5}V${yc+pre}M318 ${yc-pre-5}V${yc-pre}M318 ${yc+pre+5}V${yc+pre}" stroke="#d9637b" stroke-width="4" stroke-linecap="round"/>`;
 const sph=(x,r)=>r<rc?`<path d="M${x} ${yc-rc-4}V${yc-r}M${x} ${yc+rc+4}V${yc+r}" stroke="#d9637b" stroke-width="4" stroke-linecap="round"/>`:"";
 const nr=P([6,4,4,2],s),dr=P([2.4,3.4,6,9],s);
 const rbc=[...Array(nr)].map((_,i)=>`<circle class="anm" r="3.6" fill="${RBC}"><animateMotion path="M24 ${yc}H416" dur="${dr}s" begin="-${(i*dr/nr).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join("");
 const rbcFix=[...Array(nr)].map((_,i)=>`<circle cx="${R(150,300,nr>1?i/(nr-1):.5)}" cy="${yc}" r="3.4" fill="${RBC}" opacity=".55"/>`).join("");
 const nt=P([0,0,0,3],s);let tro="";for(let i=0;i<nt;i++)tro+=`<ellipse cx="${170+i*55}" cy="${yc}" rx="7" ry="${rc-0.5}" fill="${TRO}"/>`;
 const cx=270,cy=158,rx=R(64,78,t),ry=R(30,38,t);
 const no=P([5,3,1,0],s);let o2="";for(let i=0;i<no;i++){const x=200+i*30;o2+=`<circle cx="${x}" cy="${yc+16}" r="3" fill="${O2}"/><circle class="anm" r="3" fill="${O2}"><animateMotion path="M${x} ${yc+8}V${cy-ry+8}" dur="2s" begin="${(i*.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`}
 const nl=P([0,0,8,14],s);let liq="";for(let i=0;i<nl;i++){const x=R(140,410,rnd(i+3)),y=R(yc+14,yc+42,rnd(i+5));liq+=`<path d="M${x} ${y-4}q3 4 0 7q-3-3 0-7z" fill="${LIQ}" opacity=".8"/>`}
 const drip=s>=2?[0,1,2].map(i=>`<circle class="anm" r="2.4" fill="${LIQ}"><animateMotion path="M${180+i*60} ${yc+6}V${yc+34}" dur="1.6s" begin="${i*.5}s" repeatCount="indefinite"/></circle>`).join(""):"";
 const nla=P([0,3,9,14],s);let lat="";for(let i=0;i<nla;i++){const a=rnd(i+11)*6.283,r=R(.25,.85,rnd(i+13));lat+=`<rect x="${cx+rx*r*Math.cos(a)-2.5}" y="${cy+ry*r*Math.sin(a)-2.5}" width="5" height="5" fill="${LAT}" transform="rotate(45 ${cx+rx*r*Math.cos(a)} ${cy+ry*r*Math.sin(a)})"/>`}
 const mito=[[-34,-8],[-30,14],[30,-12]].map(([dx,dy],i)=>`<ellipse cx="${cx+dx}" cy="${cy+dy}" rx="11" ry="5.5" fill="#9bc53d" opacity="${R(.85,.35,t)}" stroke="#6f9a1f" ${s==3?'stroke-dasharray="2 2"':""}/><path d="M${cx+dx-7} ${cy+dy}q2-3 4 0t4 0t4 0" fill="none" stroke="#6f9a1f" stroke-width=".8"/>`).join("");
 const cell=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#d9637b" opacity=".1"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="fl" ${s==3?'stroke-dasharray="6 4"':""}/><ellipse cx="${cx+4}" cy="${cy+6}" rx="13" ry="10" fill="#8e63c9" opacity=".35" stroke="#8e63c9"/>`;
 return head(`Microcircolo e cellula, stadio ${["normale","di shock compensato","di shock scompensato","di shock irreversibile"][s]}: ${["capillari aperti, ossigeno alla cellula, metabolismo aerobio","arteriole e sfinteri chiusi, meno ossigeno, primi lattati","sangue che ristagna, liquido che esce nell'interstizio, molti lattati","microtrombi, cellula gonfia e danneggiata, metabolismo fermo"][s]}`,
 `<text x="20" y="20" class="ft fb">Arteriola, capillare e venula</text>
 <text x="22" y="${yc-ra-5}" class="ft fsm">arteriola</text><text x="418" y="${yc-rv-5}" class="ft fsm" text-anchor="end">venula</text><text x="122" y="${yc-16}" class="ft fsm" text-anchor="middle">sfintere precapillare</text><text x="318" y="${yc-16}" class="ft fsm" text-anchor="middle">sfintere postcapillare</text>
 ${ves}${sph(122,pre)}${sph(318,post)}${rbcFix}${rbc}${tro}${liq}${drip}${o2}${cell}${mito}${lat}
 <text x="${cx}" y="${cy+ry+14}" class="ft fsm" text-anchor="middle">${["cellula: metabolismo aerobio","cellula: inizia il metabolismo anaerobio","cellula gonfia: pompe di membrana in difficoltà","cellula danneggiata: muore"][s]}</text>
 ${bar(20,112,"O₂ ai tessuti",P([1,.65,.35,.1],s),O2,["adeguato","ridotto","scarso","minimo"][s])}
 ${bar(20,146,"Energia (ATP)",P([1,.7,.35,.08],s),"#6f9a1f",["normale","ridotta","bassa","esaurita"][s])}
 ${bar(20,180,"Lattati",P([.06,.35,.7,1],s),LAT,["bassi","in aumento","alti","molto alti"][s])}
 <text x="20" y="${H-10}" class="ft fsm">Capillari: ${["aperti, flusso regolare","chiusi dalla vasocostrizione","sangue fermo, la parete lascia uscire liquido","microtrombi, parete danneggiata"][s]}</text>`)};

/* Livello 2: cuore e vasi */
const circ=s=>{const t=s/3,hx=82,hy=132;
 const beat=P([1,.6,.5,.75],s),fill=P([1,.66,.42,.3],s),amp=P([.07,.06,.04,.025],s);
 const heart=`<path d="M${hx} ${hy+52}C${hx-30} ${hy+30} ${hx-58} ${hy+6} ${hx-52} ${hy-24}C${hx-46} ${hy-50} ${hx-14} ${hy-50} ${hx} ${hy-28}C${hx+14} ${hy-50} ${hx+46} ${hy-50} ${hx+52} ${hy-24}C${hx+58} ${hy+6} ${hx+30} ${hy+30} ${hx} ${hy+52}Z" fill="#d9637b" opacity=".85" stroke="#b44a60"/>`;
 const cham=`<ellipse cx="${hx+6}" cy="${hy+4}" rx="${R(10,22,fill)}" ry="${R(8,26,fill)}" fill="${RBC}" stroke="#8c2332"/><ellipse cx="${hx+6}" cy="${hy+4}" rx="22" ry="26" fill="none" stroke="var(--paper)" stroke-dasharray="3 3" opacity=".9"/>`;
 const anim=`<animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1-amp};1" keyTimes="0;.3;1" dur="${beat}s" repeatCount="indefinite"/>`;
 const yc=60,lum=P([11,6.5,5.5,10],s),wall=P([4,8,9,4],s);
 const art=`<path d="M${hx+20} ${hy-44}Q${hx+30} ${yc} 170 ${yc}" fill="none" stroke="#d9637b" stroke-width="10" opacity=".85"/>
 <rect x="170" y="${yc-lum-wall}" width="250" height="${wall}" fill="#d9637b" opacity=".8"/><rect x="170" y="${yc+lum}" width="250" height="${wall}" fill="#d9637b" opacity=".8"/><rect x="170" y="${yc-lum}" width="250" height="${2*lum}" fill="${RBC}" opacity=".14"/>`;
 const nf=P([6,5,4,2],s),df=P([2,2.4,3.4,5],s);
 const flow=[...Array(nf)].map((_,i)=>`<circle class="anm" r="3.2" fill="${RBC}"><animateMotion path="M174 ${yc}H416" dur="${df}s" begin="-${(i*df/nf).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join("");
 const fix=[...Array(nf)].map((_,i)=>`<circle cx="${190+i*44}" cy="${yc}" r="3" fill="${RBC}" opacity=".35"/>`).join("");
 // curva di pressione arteriosa (schema senza valori)
 const x0=180,x1=364,yT=122,yB=200,ref=R(yT,yB,.42);
 const sys=R(yT,yB,P([.12,.2,.52,.75],s)),dia=R(yT,yB,P([.62,.56,.8,.9],s)),nb=P([3,5,6,4],s),w=(x1-x0)/nb;
 let d=`M${x0} ${dia}`;for(let i=0;i<nb;i++){const a=x0+i*w;d+=`C${a+w*.08} ${dia} ${a+w*.12} ${sys} ${a+w*.22} ${sys}C${a+w*.32} ${sys} ${a+w*.36} ${R(sys,dia,.45)} ${a+w*.42} ${R(sys,dia,.5)}L${a+w*.46} ${R(sys,dia,.42)}C${a+w*.6} ${R(sys,dia,.5)} ${a+w*.8} ${dia} ${a+w} ${dia}`}
 const pan=`<rect x="${x0-8}" y="${yT-26}" width="${420-x0+8}" height="${yB-yT+44}" rx="2" class="eyrow"/>
 <text x="${x0}" y="${yT-12}" class="ft fsm fb">Pressione arteriosa (schema)</text>
 <path d="M${x0} ${R(yT,yB,.12)}H${x1}M${x0} ${R(yT,yB,.62)}H${x1}" class="lead" stroke-dasharray="3 3"/>
 <text x="${x1+6}" y="${R(yT,yB,.12)+4}" class="ft fsm">massima</text><text x="${x1+6}" y="${R(yT,yB,.62)+4}" class="ft fsm">minima</text><text x="${x0}" y="${yB+14}" class="ft fsm">tratteggio: valori normali</text>
 <path d="${d}" class="fs"/><circle class="anm" r="4" fill="var(--ink)"><animateMotion path="${d}" dur="${(beat*nb).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
 return head(`Cuore e vasi, stadio ${["normale","di shock compensato","di shock scompensato","di shock irreversibile"][s]}: ${["frequenza e pressione normali","frequenza alta, vasocostrizione, pressione mantenuta con differenziale ridotto","frequenza molto alta, pressione che cade, riempimento scarso","pressione molto bassa nonostante la compensazione, vasi senza tono"][s]}`,
 `<text x="20" y="20" class="ft fb">Pompa, arterie e pressione</text>
 <text x="170" y="${yc-lum-wall-6}" class="ft fsm">arteriole: ${["tono normale","vasocostrizione","vasocostrizione massima","perdono il tono"][s]}</text>
 ${art}${fix}${flow}
 <g transform="translate(${hx} ${hy})"><g>${anim}<g transform="translate(${-hx} ${-hy})">${heart}${cham}</g></g></g>
 <text x="${hx}" y="${hy+70}" class="ft fsm" text-anchor="middle">Frequenza: ${["normale","alta","molto alta","alta o in calo"][s]}</text>
 <text x="${hx}" y="${hy+84}" class="ft fsm" text-anchor="middle">Riempimento: ${["normale","ridotto","molto ridotto","minimo"][s]}</text>
 <text x="${hx}" y="${hy+98}" class="ft fsm" text-anchor="middle">(tratteggio = cuore pieno)</text>
 ${pan}
 <text x="${x0-8}" y="${H-8}" class="ft fsm">Pressione: ${["normale","regge, differenziale ridotto","cade (ipotensione)","molto bassa, non risponde"][s]}</text>`)};

/* Livello 3: organi e organismo */
const org=s=>{const t=s/3,cx=220;
 const ext=P(["#e8b89a","#d9c3c3","#b9b3d6","#9a94c8"],s);
 const body=`<circle cx="${cx}" cy="40" r="17" fill="#e8b89a" stroke="#b98a6c"/>
 <path d="M${cx-30} 64Q${cx} 56 ${cx+30} 64L${cx+34} 140Q${cx} 148 ${cx-34} 140Z" fill="#e8b89a" stroke="#b98a6c"/>
 <path d="M${cx-30} 66L${cx-48} 130M${cx+30} 66L${cx+48} 130" stroke="#e8b89a" stroke-width="12" stroke-linecap="round"/>
 ${s?`<path d="M${cx-41} 105L${cx-48} 130M${cx+41} 105L${cx+48} 130" stroke="${ext}" stroke-width="12" stroke-linecap="round"/>`:""}
 <path d="M${cx-16} 144L${cx-20} 228M${cx+16} 144L${cx+20} 228" stroke="#e8b89a" stroke-width="15" stroke-linecap="round"/>
 ${s?`<path d="M${cx-18.5} 196L${cx-20} 228M${cx+18.5} 196L${cx+20} 228" stroke="${ext}" stroke-width="15" stroke-linecap="round"/>`:""}`;
 const nm=P([0,0,7,14],s);let mar="";for(let i=0;i<nm;i++){const side=i%2?1:-1,y=R(160,222,rnd(i+21)),x=cx+side*R(15,21,(y-144)/84)+R(-5,5,rnd(i+23));mar+=`<path d="M${x-4} ${y}q2-4 5-2t3 4q-2 3-5 2t-3-4z" fill="${MAR}" opacity=".75"/>`}
 const brain=`<path d="M${cx-11} 36q-2-10 6-12q5-6 11 0q8 2 5 12q-4 6-11 5q-8 1-11-5z" fill="${["#f2a7b5","#f2a7b5","#cf9aa8","#a78f98"][s]}" stroke="#b5657a"/>`;
 const hb=P([1,.6,.5,.75],s);
 const heart=`<g transform="translate(${cx+8} 84)"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;.86;1" keyTimes="0;.3;1" dur="${hb}s" repeatCount="indefinite"/><path d="M0 12c-10-7-16-12-15-19c1-6 9-7 15-1c6-6 14-5 15 1c1 7-5 12-15 19z" fill="#d9637b" stroke="#b44a60"/></g></g>`;
 const lungs=`<path d="M${cx-6} 72q-18 0-20 30q12 4 20-2z" fill="#e2789a" opacity="${R(.55,.3,t)}"/><path d="M${cx+20} 72q10 6 10 28q-6 2-10 0z" fill="#e2789a" opacity="${R(.55,.3,t)}"/>`;
 const kid=[-1,1].map(k=>`<ellipse cx="${cx+k*14}" cy="106" rx="6" ry="9" fill="${["#b5523b","#a5513f","#8e5148","#6e4a4a"][s]}"/>`).join("");
 const gut=`<path d="M${cx-14} 118q4-6 8 0t8 0t8 0t8 0M${cx-12} 124q4-5 8 0t8 0t8 0" fill="none" stroke="${["#d49a7a","#c99683","#b98d8a","#9a7f86"][s]}" stroke-width="3" stroke-linecap="round"/>`;
 const nd=P([3,2,1,0],s),dd=P([1.6,2.6,4,4],s);
 const urine=`<path d="M${cx-6} 136h12v7h-12z" fill="#f0d24a" opacity="${P([.8,.55,.3,.12],s)}" stroke="#c9a92a"/>`+[...Array(nd)].map((_,i)=>`<circle class="anm" r="1.8" fill="#c9a92a"><animateMotion path="M${cx} 129V136" dur="${dd}s" begin="${(i*dd/Math.max(nd,1)).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join("");
 const K=["k-ok","k-warn","k-alarm","k-alarm"],kk=v=>K[v];
 const call=(x,y,anchor,title,txt,lvl,lx,ly)=>{  return `<path d="M${anchor=="end"?x+4:x-4} ${y-4}L${lx} ${ly}" class="lead"/><rect x="${anchor=="end"?x-120:x}" y="${y-15}" width="9" height="9" rx="2" class="${kk(lvl)}"/>
  <text x="${anchor=="end"?x-107:x+13}" y="${y-7}" class="ft fsm fb">${title}</text><text x="${anchor=="end"?x-120:x}" y="${y+7}" class="ft fsm">${txt}</text>`};
 return head(`Organi, stadio ${["normale","di shock compensato","di shock scompensato","di shock irreversibile"][s]}: ${["organi ben perfusi","cute pallida e fredda, diuresi ridotta, agitazione","cute marezzata, oliguria, confusione","insufficienza multiorgano"][s]}`,
 `<text x="20" y="20" class="ft fb">Organi e segni al letto</text>
 ${body}${mar}${lungs}${heart}${brain}${kid}${gut}${urine}
 ${call(150,48,"end","Cervello",["vigile, orientato","ansioso, agitato","confuso, soporoso","non risponde"][s],P([0,1,2,2],s),cx-18,40)}
 ${call(150,128,"end","Cute",["calda, rosea","pallida, fredda, sudata","fredda, marezzata","marezzata, cianotica"][s],P([0,1,2,2],s),cx-46,124)}
 ${call(150,196,"end","Gambe e ginocchia",["colorito normale","estremità fredde","marezzatura","marezzatura estesa"][s],P([0,1,2,2],s),cx-20,190)}
 ${call(292,84,"start","Cuore",["frequenza normale","tachicardia","tachicardia, ipotensione","pompa che cede"][s],P([0,1,2,2],s),cx+22,84)}
 ${call(292,124,"start","Reni",["diuresi normale","diuresi ridotta","oliguria","anuria"][s],P([0,1,2,2],s),cx+14,108)}
 ${call(292,184,"start","Altri organi",["funzione normale","ancora protetti","fegato, intestino, polmoni","insufficienza multiorgano"][s],P([0,0,2,2],s),cx+14,121)}
 ${s==2?`<text x="292" y="205" class="ft fsm">in sofferenza</text>`:""}
 ${[["Perfusione adeguata","di tutti gli organi"],["Sangue dirottato verso","cuore e cervello"],["La compensazione","non basta più"],["Danno anche se si","ripristina la pressione"]][s].map((x,i)=>`<text x="20" y="${226+i*13}" class="ft fsm">${x}</text>`).join("")}`)};

SIM.push({id:"sim-shock",enc:["shock"],t:"Simulatore: lo shock stadio per stadio",d:"Esempio: shock ipovolemico da emorragia. Scegli lo stadio e il livello da osservare; il disegno è schematico e non riporta valori.",
 stadi:["Normale","Shock compensato","Shock scompensato","Shock irreversibile"],dur:"4s",
 livelli:[
  {t:"Cellula e microcircolo",sub:"ossigeno e lattati",svg:micro,
   val:["Metabolismo aerobio","Primi lattati","Acidosi lattica","Danno cellulare"],
   testo:["Arteriole e capillari aperti: i globuli rossi portano ossigeno alle cellule, che producono energia (ATP) nei mitocondri con il metabolismo aerobio.","Per la perdita di sangue le arteriole e gli sfinteri precapillari si chiudono: arriva meno ossigeno, una parte dell'energia si produce senza ossigeno e i lattati cominciano a salire.","L'acidosi apre gli sfinteri prima del capillare mentre le venule restano chiuse: il sangue ristagna, la pressione nel capillare sale e il liquido esce nell'interstizio. Le cellule si gonfiano, i lattati sono alti.","Si formano microtrombi, le membrane e i mitocondri sono danneggiati e le cellule muoiono: anche ridando liquidi il tessuto non recupera."]},
  {t:"Cuore e vasi",sub:"frequenza, tono, pressione",svg:circ,
   val:["Pressione normale","Pressione mantenuta","Ipotensione","Ipotensione refrattaria"],
   testo:["Il cuore si riempie bene e a ogni battito spinge un volume adeguato; frequenza e pressione sono normali.","Torna meno sangue al cuore. Il sistema simpatico aumenta la frequenza e stringe le arteriole: la pressione massima regge, la minima sale e il differenziale si riduce. L'ipotensione è un segno tardivo.","La compensazione non basta: il riempimento è scarso, il cuore batte molto veloce ma spinge poco e la pressione cade. L'indice di shock (frequenza / pressione sistolica) supera 1.","Le arteriole perdono il tono e il cuore, poco irrorato, cede: la pressione resta bassa nonostante liquidi e farmaci. La frequenza può anche scendere, segno di arresto vicino."]},
  {t:"Organi",sub:"segni clinici",svg:org,
   val:["Organi ben perfusi","Segni precoci","Organi in sofferenza","Insufficienza multiorgano"],
   testo:["Cute calda e rosea, diuresi normale, paziente vigile e orientato.","Il sangue viene dirottato verso cuore e cervello: cute pallida, fredda e sudata, riempimento capillare lento, diuresi ridotta, ansia e agitazione. Sono i segni da cogliere presto.","Cute fredda e marezzata (prima su ginocchia e gambe), oliguria, confusione e sopore: gli organi lavorano senza abbastanza ossigeno. Si controllano diuresi oraria e lattati.","Reni, polmoni, fegato, intestino e coagulazione si guastano insieme (insufficienza multiorgano); il paziente non risponde. Il danno non è più reversibile."]}],
 legenda:[[RBC,"Globuli rossi"],[O2,"Ossigeno"],[LAT,"Lattati"],[LIQ,"Liquido che esce dai capillari"],[TRO,"Microtrombi"],[MAR,"Marezzatura"],["#9bc53d","Mitocondri"]],
 n:"Voce «shock» dell'Atlante; Vincent JL, De Backer D. Circulatory shock. N Engl J Med 2013 (PMID 24171518); Cecconi M et al. Consensus on circulatory shock and hemodynamic monitoring. Intensive Care Med 2014 (PMID 25392034); Standl T et al. Hypovolemic shock. Dtsch Arztebl Int 2018 (PMID 30573009). PMID da verificare: PubMed non raggiungibile dall'ambiente di lavoro."});
})();

/* ---- Scompenso cardiaco ---- */
/* ---- Scompenso cardiaco (disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,f=x=>Math.round(x*10)/10;
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const ST=["sano","classe NYHA I","classe NYHA II","classe NYHA III","classe NYHA IV"];
/* sistole nella prima metà del ciclo (come l'etichetta delle fasi), diastole nella seconda */
const KT="0;.22;.45;.62;1";

/* ---- 1. Cuore: ventricolo sinistro in sezione lungo l'asse ---- */
const cav=(cx,y0,a,L)=>`M${f(cx-a)} ${y0}C${f(cx-a)} ${f(y0+L*.72)} ${f(cx-a*.42)} ${f(y0+L)} ${cx} ${f(y0+L)}C${f(cx+a*.42)} ${f(y0+L)} ${f(cx+a)} ${f(y0+L*.72)} ${f(cx+a)} ${y0}Z`;
const cuore=s=>{const t=s/4,cx=116,y0=80;
 const a=R(32,52,t),L=R(112,136,t),w=R(17,9,t),k=R(.7,.92,t);
 const ws=w*R(1.45,1.12,t);               // in sistole la parete si ispessisce meno quando è malata
 const dIn=cav(cx,y0,a,L),sIn=cav(cx,y0,a*k,L*k),dOut=cav(cx,y0,a+w,L+w),sOut=cav(cx,y0,a*k+ws,L*k+ws);
 const mv=(d1,d2)=>`<animate attributeName="d" values="${d1};${d2};${d2};${d1};${d1}" keyTimes="${KT}" dur="4s" repeatCount="indefinite"/>`;
 const ar=R(20,30,t);
 const nEj=Math.round(R(6,2,t));
 const ej=[...Array(nEj)].map((_,i)=>`<circle r="3" fill="#b8324f" class="anm" opacity="0"><animateMotion path="M${cx+10} ${y0+40+i*6}V${y0-28}Q${cx+10} ${y0-40} ${cx+26} ${y0-40}H${cx+78}" dur="4s" keyPoints="0;1;1" keyTimes="0;.45;1" calcMode="linear" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.04;.42;.46;1" dur="4s" repeatCount="indefinite"/></circle>`).join("");
 const fill=[0,1,2,3].map(i=>`<circle r="3" fill="#b8324f" class="anm" opacity="0"><animateMotion path="M${cx-ar-8+i*8} ${y0-14}V${y0+30+i*10}" dur="4s" keyPoints="0;0;1;1" keyTimes="0;.5;.95;1" calcMode="linear" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.54;.94;1" dur="4s" repeatCount="indefinite"/></circle>`).join("");
 // pannello dei volumi
 const vol=(aa,LL)=>aa*aa*LL, Vmax=vol(52,136), bw=150;
 const Vd=vol(a,L)/Vmax*bw, Vs=Vd*k*k*k, x0=270;
 const fe=["normale","in calo","ridotta","ridotta","molto ridotta"][s];
 return head(`Ventricolo sinistro, ${ST[s]}: ${s?"cavità dilatata, parete più sottile, frazione di eiezione "+fe:"dimensioni normali, parete spessa, frazione di eiezione normale"}`,
 `<text x="16" y="20" class="ft fb">Ventricolo sinistro (sezione)</text>
 <path d="M${cx+10} ${y0+2}V${y0-28}Q${cx+10} ${y0-40} ${cx+26} ${y0-40}H${cx+96}" fill="none" stroke="#d9637b" stroke-width="14" opacity=".45"/>
 <text x="${cx+60}" y="${y0-54}" class="ft fsm">Aorta</text>
 <ellipse cx="${f(cx-ar-2)}" cy="${y0-12}" rx="${f(ar)}" ry="${f(R(12,17,t))}" fill="#d9637b" opacity=".35" stroke="#c2506f"/>
 <text x="${f(cx-ar-2)}" y="${f(y0-16-R(12,17,t))}" class="ft fsm" text-anchor="middle">Atrio sin.</text>
 <path d="${dOut}" fill="#d9637b" opacity=".85">${mv(dOut,sOut)}</path>
 <path d="${dIn}" class="ff">${mv(dIn,sIn)}</path>
 <path d="${dIn}" fill="#d9637b" opacity=".2">${mv(dIn,sIn)}</path>
 <path d="${sIn}" fill="none" class="lead" stroke-dasharray="4 3"/>
 ${fill}${ej}
 <text x="16" y="${H-8}" class="ft fsm">Pieno: fine diastole · tratteggio: fine sistole</text>
 <line x1="254" y1="34" x2="254" y2="224" class="lead"/>
 <text x="${x0}" y="44" class="ft fb">Volumi a ogni battito</text>
 <rect x="${x0}" y="54" width="${f(Vd)}" height="16" class="eyrow"/>
 <rect x="${x0}" y="54" width="${f(Vd-Vs)}" height="16" fill="#d9637b" opacity=".75"/>
 <text x="${x0}" y="86" class="ft fsm">Colore: sangue espulso</text>
 <text x="${x0}" y="100" class="ft fsm">Grigio: sangue che resta</text>
 <text x="${x0}" y="126" class="ft">Parete</text>
 <text x="${x0}" y="141" class="ft fb">${["spessa","spessa","più sottile","sottile","molto sottile"][s]}</text>
 <text x="${x0}" y="164" class="ft">Frazione di eiezione</text>
 <text x="${x0}" y="179" class="ft fb"${s>=2?` style="fill:#c2506f"`:""}>${fe}</text>
 <text x="${x0}" y="202" class="ft">Pressione di riempimento</text>
 <text x="${x0}" y="217" class="ft fb">${["normale","normale","in aumento","alta","molto alta"][s]}</text>`)};

/* ---- 2. Polmoni e circolo: alveoli, interstizio e posizione del paziente ---- */
const seg=(cx,cy,r,h)=>{if(h<=0)return"";const y=cy+r-h,c=Math.sqrt(Math.max(0,r*r-(y-cy)*(y-cy)));return`M${f(cx-c)} ${f(y)}A${r} ${r} 0 ${h>r?1:0} 0 ${f(cx+c)} ${f(y)}Z`};
const polm=s=>{const t=s/4,cy=124,r=44,sw=R(12,30,t),mx=124,aL=mx-sw/2-r,aR=mx+sw/2+r;
 const liq=[0,0,0,14,40][s],nI=[0,0,6,10,14][s];
 const br=R(4,1.6,t);
 let inter="";for(let i=0;i<nI;i++){const side=i%2?1:-1;inter+=`<circle cx="${f(mx+side*R(8,sw/2-2,rnd(i+4)))}" cy="${f(R(cy-38,cy+38,rnd(i+9)))}" r="2.4" fill="#3aa0d8" opacity=".85"/>`}
 const leak=s>=2?[0,1,2].map(i=>`<circle r="2.4" fill="#3aa0d8" class="anm"><animateMotion path="M${mx+(i%2?3:-3)} ${cy-20+i*20}h${(i%2?1:-1)*(sw/2+(s>=3?14:0))}" dur="4s" begin="${i*1.3}s" repeatCount="indefinite"/></circle>`).join(""):"";
 const blood=[0,1,2,3].map(i=>`<circle r="2.6" class="anm" fill="#b8324f"><animateMotion path="M${mx} ${cy-58}V${cy+58}" dur="${R(2,3.2,t)}s" begin="${i*.5}s" repeatCount="indefinite"/></circle>`).join("");
 const alv=(cx)=>`<g style="transform-origin:${f(cx)}px ${cy}px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.05;1" dur="${f(br)}s" repeatCount="indefinite"/>
  <circle cx="${f(cx)}" cy="${cy}" r="${r}" class="fa"/>${liq?`<path d="${seg(cx,cy,r,liq)}" fill="#3aa0d8" opacity=".55"/>`:""}<circle cx="${f(cx)}" cy="${cy}" r="${r}" fill="none" stroke="#d9637b" stroke-width="1.6"/></g></g>`;
 // paziente a letto: busto sollevato con l'ortopnea
 const th=[0,0,8,28,62][s]*Math.PI/180,hx=362,hy=200,Lb=54,sx=hx-Lb*Math.cos(th),sy=hy-6-Lb*Math.sin(th),hdx=sx-13*Math.cos(th),hdy=sy-13*Math.sin(th);
 const pil=s>=3?`<path d="M${f(hx-8)} ${hy}L${f(sx-10*Math.cos(th))} ${f(sy-10*Math.sin(th)+12)}L${f(sx-10*Math.cos(th))} ${hy}Z" class="eyrow"/>`:`<rect x="${f(sx-22)}" y="${hy-10}" width="26" height="10" rx="4" class="eyrow"/>`;
 const puff=s>=4?[0,1,2].map(i=>`<path d="M${f(hdx-16-i*7)} ${f(hdy-6+i*5)}q-5 5 0 10" fill="none" stroke="var(--muted)" stroke-width="1.4" class="anm" opacity=".2"><animate attributeName="opacity" values=".15;1;.15" dur="${f(br)}s" begin="${f(i*br/6)}s" repeatCount="indefinite"/></path>`).join(""):"";
 const resp=["respiro normale, dorme sdraiato","nessuna dispnea nelle attività ordinarie","dispnea con le attività ordinarie","dispnea con sforzi lievi; ortopnea","dispnea a riposo; sta meglio seduto"][s];
 const lq=["resta nei capillari","resta nei capillari","esce nell'interstizio","nell'interstizio e negli alveoli","riempie gli alveoli (edema polmonare)"][s];
 return head(`Polmoni, ${ST[s]}: liquido ${lq}; ${resp}`,
 `<text x="16" y="20" class="ft fb">Alveoli e capillare polmonare</text>
 <text x="16" y="36" class="ft fsm">Pressione nel capillare: ${["normale","normale","in aumento","alta","molto alta"][s]}</text>
 <rect x="${f(mx-sw/2)}" y="${cy-64}" width="${f(sw)}" height="128" class="eyrow"/>
 ${alv(aL)}${alv(aR)}
 <rect x="${mx-5}" y="${cy-64}" width="10" height="128" fill="#d9637b" opacity=".55"/>
 ${inter}${blood}${leak}
 <text x="${mx}" y="${cy+80}" class="ft fsm" text-anchor="middle">Interstizio con capillare</text>
 <text x="${f(aL)}" y="${cy-50}" class="ft fsm" text-anchor="middle">Alveolo</text>
 <line x1="254" y1="34" x2="254" y2="214" class="lead"/>
 <text x="270" y="36" class="ft fb">Dispnea e posizione</text>
 ${["Sforzi ordinari","Sforzi lievi","Riposo"].map((a,i)=>`<text x="270" y="${60+i*18}" class="ft fsm">${a}</text><text x="424" y="${60+i*18}" class="ft fsm" text-anchor="end"${s>=i+2?` style="fill:#c2506f"`:""}>${s>=i+2?"dispnea":"no"}</text>`).join("")}
 <rect x="270" y="${hy}" width="158" height="8" rx="2" class="eyrow"/>
 ${pil}
 <path d="M${hx} ${hy-6}H420" stroke="var(--ink)" stroke-width="7" stroke-linecap="round" opacity=".55"/>
 <path d="M${hx} ${hy-6}L${f(sx)} ${f(sy)}" stroke="var(--ink)" stroke-width="10" stroke-linecap="round" opacity=".55"/>
 <circle cx="${f(hdx)}" cy="${f(hdy)}" r="9" fill="var(--ink)" opacity=".55"/>
 ${puff}
 <text x="16" y="${H-24}" class="ft fsm">Liquido: ${lq}</text>
 <text x="16" y="${H-10}" class="ft fsm">Respiro: ${resp}</text>`)};

/* ---- 3. Organismo: risposta neuro-ormonale, ritenzione, edemi, peso ---- */
const organ=s=>{const t=s/4,bx=74;
 const act=[1,1,1,2,3],box=["Il cuore pompa meno: portata ridotta","Simpatico: tachicardia, vasocostrizione","Rene: renina → angiotensina II → aldosterone","Trattenuti sodio e acqua: più volume","Edemi declivi e aumento di peso"];
 const x1=150,x2=408,bh=26,g=12,y0=34;
 const boxes=box.map((b,i)=>{const y=y0+i*(bh+g),on=s>=act[i];
  return `<rect x="${x1}" y="${y}" width="${x2-x1}" height="${bh}" rx="2" class="eyrow"${on?"":` stroke-dasharray="3 3"`}/>${on?`<rect x="${x1}" y="${y}" width="${x2-x1}" height="${bh}" rx="2" fill="${i==1?"#8e63c9":i==4?"#3aa0d8":"#f0a23a"}" opacity="${f(R(.18,.42,t))}"/>`:""}
  <text x="${x1+8}" y="${y+bh/2}" dominant-baseline="middle" class="ft fsm"${on?` style="fill:var(--ink)"`:""}>${b}</text>${i<4?`<path d="M${(x1+x2)/2} ${y+bh+1}v${g-3}m-3 -4l3 4l3 -4" class="lead"/>`:""}`}).join("");
 const loop=s>=3?`<path d="M${x2} ${y0+3*(bh+g)+bh/2}h12V${y0+bh/2}h-10m4 -4l-4 4l4 4" fill="none" stroke="#c2506f" stroke-width="1.6"/><text transform="translate(${x2+26} ${y0+80}) rotate(90)" class="ft fsm" text-anchor="middle">circolo vizioso</text>`:"";
 // corpo
 const ed=s>=2?R(0,1,(s-1)/3):0;
 const leg=(dx)=>`<path d="M${bx+dx*10} 156L${bx+dx*14} 226" stroke="var(--ink)" stroke-width="12" stroke-linecap="round" opacity=".5"/>${ed?`<ellipse cx="${bx+dx*14}" cy="${f(220-ed*3)}" rx="${f(5+ed*4)}" ry="${f(5+ed*6)}" fill="#3aa0d8" opacity=".6"/>`:""}`;
 const hr=f(R(1,.6,t));
 const sym=s?`<path d="M${bx+2} 70l6 6l-6 6l6 6l-6 6l6 6l-6 6" fill="none" stroke="#8e63c9" stroke-width="1.8" opacity="${f(R(.5,1,t))}" stroke-dasharray="4 3" class="anm"><animate attributeName="stroke-dashoffset" values="14;0" dur="${f(R(1.6,.6,t))}s" repeatCount="indefinite"/></path>`:"";
 const na=s?[...Array(Math.round(R(1,5,t)))].map((_,i)=>`<circle r="2.4" fill="#3aa0d8" class="anm"><animateMotion path="M${bx-10} 130Q${bx-34} 108 ${bx-6} 92" dur="3s" begin="${f(i*.6)}s" repeatCount="indefinite"/></circle>`).join(""):"";
 const kid=(dx)=>`<ellipse cx="${bx+dx*12}" cy="130" rx="6" ry="9" fill="${s?"#f0a23a":"#d9637b"}" opacity="${s?f(R(.6,1,t)):.5}"/>`;
 const wArrow=s>=2?`<path d="M${bx+54} 212V${f(212-R(16,56,(s-2)/2))}m-6 8l6 -8l6 8" fill="none" stroke="#c2506f" stroke-width="2"/><text x="${bx+54}" y="226" class="ft fsm" text-anchor="middle">Peso</text>`:"";
 return head(`Organismo, ${ST[s]}: ${s?"simpatico e sistema renina-angiotensina-aldosterone attivi"+(s>=2?", ritenzione di sodio e acqua":"")+(s>=3?", edemi declivi e aumento di peso":""):"sistemi in equilibrio, nessun edema"}`,
 `<text x="16" y="20" class="ft fb">Risposta dell'organismo</text>
 <circle cx="${bx}" cy="44" r="13" fill="var(--ink)" opacity=".5"/>
 <path d="M${bx-22} 64h44l-4 96h-36z" fill="var(--ink)" opacity=".18"/>
 <path d="M${bx-22} 68l-12 70M${bx+22} 68l12 70" stroke="var(--ink)" stroke-width="9" stroke-linecap="round" opacity=".4"/>
 ${leg(-1)}${leg(1)}
 <g style="transform-origin:${bx+8}px 92px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.15;1;1" keyTimes="0;.2;.45;1" dur="${hr}s" repeatCount="indefinite"/><path d="M${bx+8} 102c-10 -8 -12 -16 -6 -19c3 -2 6 0 6 3c0 -3 3 -5 6 -3c6 3 4 11 -6 19z" fill="#d9637b"/></g></g>
 ${kid(-1)}${kid(1)}${sym}${na}${wArrow}
 <text x="${bx}" y="${H-4}" class="ft fsm" text-anchor="middle">${ed?"Edemi alle caviglie":"Caviglie asciutte"}</text>
 <text x="${x2}" y="20" class="ft fsm" text-anchor="end">${["Nel sano: sistemi in equilibrio","Compenso: attivi senza sintomi","Compenso che diventa dannoso","Circolo vizioso","Congestione sistemica"][s]}</text>
 ${boxes}${loop}`)};

SIM.push({id:"sim-scompenso",enc:["scompenso"],t:"Simulatore: lo scompenso cardiaco classe per classe",d:"Scegli lo stadio e il livello da osservare. Il modello è lo scompenso sinistro con frazione di eiezione ridotta; le classi NYHA descrivono i sintomi, qui affiancate ai cambiamenti più tipici. Il disegno è schematico.",
 stadi:["Sano","NYHA I","NYHA II","NYHA III","NYHA IV"],dur:"4s",fasi:["Sistole","Diastole"],
 livelli:[
  {t:"Cuore",sub:"ventricolo sinistro",svg:cuore,
   testo:["Ventricolo di dimensioni normali, parete spessa e ben contrattile: in sistole si svuota di buona parte del sangue e la frazione di eiezione è normale.","Il muscolo si contrae meno (per esempio dopo un infarto) e il ventricolo inizia a dilatarsi; a riposo e negli sforzi ordinari la portata è ancora mantenuta.","Il ventricolo si dilata e la parete si assottiglia (rimodellamento). Un ventricolo più pieno spinge un po' di più (Frank-Starling), ma la quota espulsa a ogni battito cala.","La frazione di eiezione è ridotta: per riempirsi il ventricolo ha bisogno di pressioni più alte, che risalgono verso l'atrio sinistro e i polmoni.","Ventricolo molto dilatato, parete sottile e contrazione debole: la gittata non basta più neanche a riposo e la pressione di riempimento è molto alta."],
   val:["FE normale","FE in calo","FE ridotta","FE ridotta","FE molto ridotta"]},
  {t:"Polmoni e circolo",sub:"congestione",svg:polm,
   testo:["La pressione nei capillari polmonari è bassa: il liquido resta nei vasi, l'interstizio è sottile e gli alveoli sono asciutti. Si dorme sdraiati senza fatica.","Classe I: nessuna limitazione, l'attività fisica ordinaria non provoca dispnea. Il liquido resta ancora nei capillari.","Classe II: dispnea con gli sforzi ordinari, per esempio salire le scale. La pressione che risale dal cuore sinistro spinge liquido nell'interstizio.","Classe III: dispnea con sforzi lievi. Il liquido arriva negli alveoli; da sdraiati il sangue che torna dalle gambe aumenta la congestione: ortopnea e dispnea parossistica notturna.","Classe IV: dispnea a riposo, la persona respira meglio seduta. Gli alveoli si riempiono di liquido (rantoli) e l'ossigenazione peggiora: il quadro estremo è l'edema polmonare acuto."],
   val:["Polmoni asciutti","Nessun limite","Limiti negli sforzi ordinari","Limiti negli sforzi lievi","Sintomi a riposo"]},
  {t:"Organismo",sub:"neuro-ormoni e liquidi",svg:organ,
   testo:["Pressione arteriosa e volume circolante sono in equilibrio: il rene elimina sodio e acqua in eccesso e il peso è stabile.","Il calo della portata attiva il simpatico e il sistema renina-angiotensina-aldosterone: tachicardia e vasocostrizione mantengono la pressione. All'inizio compensano, ma affaticano il cuore.","L'aldosterone fa trattenere sodio e, con esso, acqua: il volume di sangue aumenta e compaiono i primi edemi alle caviglie.","Più volume significa più carico per un cuore già debole: è un circolo vizioso. Edemi declivi evidenti e peso in aumento; avvisare se il peso sale di più di 2 kg in 2-3 giorni.","Ritenzione marcata: edemi estesi e congestione sistemica (turgore giugulare, epatomegalia, ascite). Peso quotidiano, bilancio idrico e restrizione idrosalina se prescritta guidano l'assistenza."],
   val:["Peso stabile","Compenso neuro-ormonale","Ritenzione idrosalina","Edemi e peso in aumento","Congestione sistemica"]}],
 legenda:[["#d9637b","Miocardio e sangue"],["#3aa0d8","Liquido (edema)"],["#f0a23a","Renina-angiotensina-aldosterone"],["#8e63c9","Simpatico"]],
 n:"Linee guida ESC 2021 sullo scompenso cardiaco, McDonagh TA et al., Eur Heart J 2021 (PMID 34447992, da verificare); classificazione NYHA e soglia di peso come nella voce dell'Atlante."});
})();

/* ---- Asma ---- */

/* ---- Asma bronchiale (disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,f1=x=>Math.round(x*10)/10;
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const NOMI=["asma controllata","attacco lieve","attacco moderato","attacco grave con torace silente"];
const MU="#c0504d",MUC="#e2789a",MK="#9bc53d",EO="#f0a23a",MA="#8e63c9",TR="#3aa0d8",AL="#d23a52";
const pol=(cx,cy,rf)=>{let d="";for(let i=0;i<=72;i++){const a=i/72*6.283,r=rf(a);d+=(i?"L":"M")+f1(cx+r*Math.cos(a))+" "+f1(cy+r*Math.sin(a))}return d+"Z"};
/* 1. Bronco in sezione trasversale */
const bron=s=>{const t=s/3,cx=122,cy=130,Ro=R(90,74,t),mw=R(7,14,t),Ri=Ro-mw,ed=R(10,22,t),Rl=Ri-ed,A=R(1.5,8,t),mu=R(.06,.62,t);
 const lum=a=>Rl-A*(1+Math.cos(10*a))/2;
 let spin="";for(let i=0;i<24;i++){const a=i/24*6.283,r=Ri+mw/2;spin+=`<ellipse cx="${f1(cx+r*Math.cos(a))}" cy="${f1(cy+r*Math.sin(a))}" rx="${f1(mw*.32)}" ry="5" transform="rotate(${f1(a*57.3)} ${f1(cx+r*Math.cos(a))} ${f1(cy+r*Math.sin(a))})" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".8"/>`}
 const at=(a,r)=>[f1(cx+r*Math.cos(a)),f1(cy+r*Math.sin(a))];
 const band=(k)=>Rl+2+(Ri-Rl-6)*R(.2,.8,rnd(k));
 let eo="";const ne=Math.round(R(3,16,t));for(let i=0;i<ne;i++){const a=i===0?.5:rnd(i+3)*6.283,[x,y]=at(a,i===0?(Rl+Ri)/2:band(i+11));eo+=`<circle cx="${x}" cy="${y}" r="3.2" fill="${EO}" stroke="${MU}" stroke-width=".6"/>`}
 let ma="";const nm=Math.round(R(2,6,t));for(let i=0;i<nm;i++){const a=i===0?.95:rnd(i+21)*6.283,[x,y]=at(a,i===0?(Rl+Ri)/2:band(i+31));ma+=`<circle cx="${x}" cy="${y}" r="5" fill="${MA}"/><circle cx="${x-1.6}" cy="${y-1}" r=".9" class="ff"/><circle cx="${x+1.6}" cy="${y+.6}" r=".9" class="ff"/><circle cx="${x}" cy="${y+2}" r=".9" class="ff"/>`;
  if(s>0)for(let j=0;j<s+1;j++){const b=a+(rnd(i*7+j)-.5)*.5,rr=(i===0?(Rl+Ri)/2:band(i+31))+(rnd(i+j*3)-.5)*12;const[p,q]=at(b,rr);ma+=`<circle cx="${p}" cy="${q}" r="1.3" fill="${MA}" opacity=".8"/>`}}
 const free=a=>lum(a)*(1-mu)*(1+.07*t*Math.sin(3*a+1));
 const amp=R(.035,.008,t);
 const anim=`<animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};1" keyTimes="0;.5;1" dur="4s" repeatCount="indefinite"/>`;
 const pts=[[-.8,(Ri+Ro)/2],[-.35,(Rl+Ri)/2],[.08,Rl*(1-mu/2)-A/2],[.5,(Rl+Ri)/2],[.95,(Rl+Ri)/2]].map(([a,r])=>at(a,r));
 const L=[["Muscolo liscio",["rilassato","in contrazione","contratto","contratto al massimo"][s]],["Mucosa",["poco edematosa","edema","edema marcato","edema grave"][s]],["Muco",["scarso","aumentato","abbondante","tappi di muco"][s]],["Eosinofili",["pochi","in aumento","numerosi","moltissimi"][s]],["Mastociti",["a riposo","liberano mediatori","degranulano","degranulano"][s]]];
 const ly=i=>52+i*28,lx=252;
 const labs=L.map((l,i)=>`<path d="M${pts[i][0]} ${pts[i][1]}L${lx-30} ${ly(i)-4}H${lx-4}" class="lead"/><circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="1.8" class="fh"/><text x="${lx}" y="${ly(i)}" class="ft fb">${l[0]}</text><text x="${lx}" y="${ly(i)+12}" class="ft fsm">${l[1]}</text>`).join("");
 return head(`Bronco in sezione, ${NOMI[s]}: muscolo liscio ${L[0][1]}, mucosa con ${L[1][1]}, muco ${L[2][1]}, lume ${["ampio","ristretto","molto ristretto","quasi chiuso"][s]}`,
 `<text x="16" y="18" class="ft fb">Bronco in sezione trasversale</text>
 <g style="transform-origin:${cx}px ${cy}px;transform-box:view-box"><g>${anim}
 <circle cx="${cx}" cy="${cy}" r="${f1(Ro+6)}" class="eyrow"/>
 <circle cx="${cx}" cy="${cy}" r="${f1(Ri+mw/2)}" fill="none" stroke="${MU}" stroke-opacity=".85" stroke-width="${f1(mw)}"/>${spin}
 <circle cx="${cx}" cy="${cy}" r="${f1(Ri)}" fill="${MUC}" opacity=".8"/>
 <path d="${pol(cx,cy,lum)}" fill="${MK}" opacity=".8"/><path d="${pol(cx,cy,free)}" class="ff"/>
 <path d="${pol(cx,cy,lum)}" class="fl"/>${eo}${ma}</g></g>
 ${labs}
 <text x="${cx}" y="${H-6}" class="ft fsm" text-anchor="middle">Lume ${["ampio","ristretto","molto ristretto","quasi chiuso"][s]}</text>
 <rect x="${lx-8}" y="196" width="${W-lx}" height="46" rx="2" class="fbx k-info"/>
 <text x="${lx}" y="211" class="ft fb">Diverso dalla BPCO</text>
 <text x="${lx}" y="224" class="ft fsm">asma: ostruzione variabile, reversibile</text>
 <text x="${lx}" y="236" class="ft fsm">BPCO: ostruzione persistente</text>`)};
/* 2. Polmoni: sibili, aria intrappolata, PEF */
const lung=s=>{const t=s/3,cx=120,top=50,base=R(192,202,t),sc=R(1,1.08,t),dc=R(160,192,t);
 const half=dx=>`<path d="M${cx+dx*14} ${top+16}C${cx+dx*56*sc} ${top} ${cx+dx*90*sc} ${top+80} ${cx+dx*84*sc} ${base}Q${cx+dx*48} ${dc} ${cx+dx*16} ${base-8}Z" fill="#e2789a" opacity=".6" stroke="#c2506f"/>`;
 const tree=`<path d="M${cx} 32V${top+34}M${cx} ${top+34}L${cx-30} ${top+62}L${cx-48} ${top+100}M${cx-30} ${top+62}L${cx-22} ${top+108}M${cx} ${top+34}L${cx+30} ${top+62}L${cx+48} ${top+100}M${cx+30} ${top+62}L${cx+22} ${top+108}" fill="none" stroke="var(--muted)" stroke-width="${f1(R(5,3.4,t))}" stroke-linecap="round"/>`;
 const trap=s?[-1,1].map(dx=>`<ellipse cx="${cx+dx*52*sc}" cy="${base-34}" rx="${f1(R(8,26,t))}" ry="${f1(R(6,18,t))}" fill="${TR}" opacity=".5"/>`).join(""):"";
 const nw=[0,2,4,0][s],wp=[[-46,104],[46,104],[-60,150],[60,150]];
 const wz=wp.slice(0,nw).map(([dx,y])=>`<path d="M${cx+dx-12} ${y}q3 -5 6 0t6 0t6 0t6 0" class="fs" opacity="1"><animate attributeName="opacity" values=".35;.35;1;.35" keyTimes="0;.5;.75;1" dur="4s" repeatCount="indefinite"/></path>`).join("");
 const len=R(70,14,t);
 const air=[0,1].map(i=>`<circle r="3" class="anm" fill="var(--scrub)"><animateMotion path="M${cx} 32V${f1(32+len)}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear" dur="4s" begin="${i*.25}s" repeatCount="indefinite"/></circle>`).join("");
 const amp=R(.05,.01,t);
 const px=320,py=48,ph=140,frac=[.92,.72,.5,.22][s],cy=py+ph*(1-frac);
 const silent="";
 return head(`Polmoni, ${NOMI[s]}: ${["nessun sibilo, PEF vicino al migliore personale","sibili espiratori, poca aria intrappolata, PEF in calo","sibili forti, aria intrappolata, PEF basso","nessun sibilo perché l'aria quasi non si muove, torace silente, PEF molto basso o non eseguibile"][s]}`,
 `<text x="16" y="18" class="ft fb">Polmoni: sibili e aria intrappolata</text>
 <g style="transform-origin:${cx}px ${base}px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};1" keyTimes="0;.5;1" dur="4s" repeatCount="indefinite"/>${half(-1)}${half(1)}${trap}</g></g>
 ${tree}${air}${wz}${silent}
 <path d="M${cx-104} ${base+14}Q${cx} ${f1(R(base-26,base+4,t))} ${cx+104} ${base+14}" fill="none" stroke="#d9637b" stroke-width="4" stroke-linecap="round"/>
 ${s===3?`<text x="16" y="${H-20}" class="ft fb" style="fill:${AL}">Torace silente</text><text x="16" y="${H-6}" class="ft fsm">niente sibili: l'aria quasi non si muove</text>`:`<text x="16" y="${H-6}" class="ft fsm">Sibili: ${["assenti","espiratori","forti, in tutto il torace"][s]}</text>`}
 <path d="M246 30V236" class="lead"/>
 <text x="${px+15}" y="30" class="ft fb" text-anchor="middle">PEF</text>
 <rect x="${px}" y="${py}" width="30" height="${ph}" rx="2" class="eyrow"/>
 <rect x="${px+6}" y="${py+ph}" width="18" height="16" rx="2" class="eyrow"/>
 <path d="M${px-6} ${py+ph*.08}H${px+36}" class="lead" stroke-dasharray="3 3"/>
 <text x="${px+42}" y="${f1(py+ph*.08+4)}" class="ft fsm">migliore</text><text x="${px+42}" y="${f1(py+ph*.08+16)}" class="ft fsm">personale</text>
 <rect x="${px+2}" y="${f1(cy-3)}" width="26" height="6" rx="1" fill="var(--scrub)"><animate attributeName="y" values="${py+ph-6};${py+ph-6};${f1(cy-3)};${f1(cy-3)}" keyTimes="0;.5;.6;1" dur="4s" repeatCount="indefinite"/></rect>
 <path d="M${px-24} ${f1(cy)}H${px-2}" class="lead"/><text x="${px-28}" y="${f1(cy+4)}" class="ft fsm" text-anchor="end">oggi</text>
 <text x="258" y="${H-24}" class="ft fsm">PEF ${["vicino al migliore","in calo","basso","molto basso o"][s]}</text>
 <text x="258" y="${H-10}" class="ft fsm">${["personale","rispetto al migliore","rispetto al migliore","non eseguibile"][s]}</text>`)};
/* 3. Persona */
const pers=s=>{const t=s/3,cx=104,hy=88,lean=R(0,9,t);
 const scm=s>=2?`<path d="M${cx-15} ${hy+19}L${cx-5} ${hy+50}M${cx+15} ${hy+19}L${cx+5} ${hy+50}" stroke="#d9637b" stroke-width="${s===2?3.2:5}" stroke-linecap="round" fill="none"/>`:`<path d="M${cx-15} ${hy+19}L${cx-5} ${hy+50}M${cx+15} ${hy+19}L${cx+5} ${hy+50}" class="lead" stroke-dasharray="2 3"/>`;
 const ribs=[0,1,2,3].map(i=>`<path d="M${cx-46} ${hy+70+i*22}q46 ${12} 92 0" class="lead"/>`).join("");
 const retr=s>=2?[0,1,2].map(i=>`<path d="M${cx-30} ${hy+80+i*22}l5 4l-5 4M${cx+30} ${hy+80+i*22}l-5 4l5 4" stroke="${AL}" stroke-width="1.4" fill="none"/>`).join(""):"";
 const amp=R(.03,.012,t);
 const say=["«Sto bene, parlo senza fatica.»","«Mi manca un po' il fiato, ma parlo.»","«Faccio... fatica... a parlare...»","«Aiuto...»"][s];
 const row=(y,n,v,k)=>`<text x="244" y="${y}" class="ft fb">${n}</text><text x="244" y="${y+13}" class="ft fsm">${v}</text>${k?`<circle cx="424" cy="${y-4}" r="4" class="${k}"/>`:""}`;
 const kk=["k-ok","k-ok","k-warn","k-alarm"][s];
 const g0=252,g1=424,gy=218,X=v=>f1(g0+(v-84)/16*(g1-g0)),lev=[98,96,93,87][s];
 return head(`Persona durante ${NOMI[s]}: ${["respira tranquilla e parla normalmente","parla a frasi, muscoli accessori non usati","parla a frasi spezzate, usa i muscoli accessori","parla a parole singole, sporta in avanti, muscoli accessori molto attivi, saturazione sotto il 90 per cento"][s]}`,
 `<path d="M150 20H${s===3?262:412}a2 2 0 0 1 2 2V50a2 2 0 0 1 -2 2H156L140 66L148 52H150a2 2 0 0 1 -2 -2V22a2 2 0 0 1 2 -2Z" class="fbx"/>
 <text x="160" y="40" class="ft">${say}</text>
 <g transform="rotate(${f1(lean)} ${cx} 240)">
 <g style="transform-origin:${cx}px 240px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};1" keyTimes="0;.5;1" dur="4s" repeatCount="indefinite"/>
 <path d="M${cx-14} ${hy+18}V${hy+46}Q${cx-60} ${hy+50} ${cx-70} ${hy+70}L${cx-72} 244H${cx+72}L${cx+70} ${hy+70}Q${cx+60} ${hy+50} ${cx+14} ${hy+46}V${hy+18}Z" class="fa"/>
 <path d="M${cx-14} ${hy+18}V${hy+46}Q${cx-60} ${hy+50} ${cx-70} ${hy+70}L${cx-72} 244M${cx+72} 244L${cx+70} ${hy+70}Q${cx+60} ${hy+50} ${cx+14} ${hy+46}V${hy+18}" class="fl"/>
 ${ribs}${retr}</g></g>
 <circle cx="${cx}" cy="${hy}" r="24" class="ff"/><circle cx="${cx}" cy="${hy}" r="24" class="fl"/>${scm}
 ${s>=2?`<ellipse cx="${cx}" cy="${hy+11}" rx="${s===3?6:4.5}" ry="${s===3?5:3.5}" class="fl"/>`:`<path d="M${cx-7} ${hy+11}H${cx+7}" class="fl"/>`}<circle cx="${cx-8}" cy="${hy-4}" r="1.8" class="fh"/><circle cx="${cx+8}" cy="${hy-4}" r="1.8" class="fh"/></g>
 <path d="M234 74V236" class="lead"/>
 ${row(88,"Muscoli accessori",["non usati","di solito non usati","spesso usati","usati, rientramenti"][s],s>=2?kk:"")}
 ${row(122,"Postura",["normale","può stare sdraiata","preferisce stare seduta","seduta, sporta in avanti"][s],"")}
 ${row(156,"Torace",["nessun sibilo","sibili espiratori","sibili forti","torace silente"][s],kk)}
 <text x="244" y="188" class="ft fb">SpO₂</text>
 <rect x="${g0}" y="${gy-5}" width="${g1-g0}" height="10" rx="2" class="eyrow"/>
 <rect x="${g0}" y="${gy-5}" width="${f1(X(lev)-g0)}" height="10" rx="2" class="${["k-ok","k-ok","k-warn","k-alarm"][s]}"/>
 <path d="M${X(92)} ${gy-9}V${gy+9}M${X(90)} ${gy-9}V${gy+9}" class="fl"/>
 <text x="${X(92)}" y="${gy-12}" class="ft fsm" text-anchor="middle">92% BTS/SIGN</text>
 <text x="${X(90)}" y="${gy+20}" class="ft fsm" text-anchor="middle">90% GINA</text>
 <text x="${g1}" y="188" class="ft fsm" text-anchor="end">${["normale","normale","può calare","sotto il 90%"][s]}</text>`)};
SIM.push({id:"sim-asma",enc:["asma"],t:"Simulatore: l'attacco d'asma passo per passo",d:"Scegli quanto è grave l'attacco e il livello da osservare, dal bronco alla persona. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["Controllata","Attacco lieve","Attacco moderato","Attacco grave (torace silente)"],dur:"4s",fasi:["Inspirazione","Espirazione"],
 livelli:[
  {t:"Bronco",sub:"broncospasmo",svg:bron,
   val:["Infiammazione di fondo","Broncospasmo","Spasmo, edema e muco","Lume quasi chiuso"],
   testo:["Anche quando l'asma è controllata la mucosa resta un po' infiammata (eosinofili, mastociti): per questo la terapia di fondo con cortisonico inalatorio va presa ogni giorno.","Un fattore scatenante (allergene, infezione, sforzo, freddo, fumo) attiva i mastociti, che liberano mediatori: il muscolo liscio si contrae e il lume si restringe.","Al broncospasmo si aggiungono l'edema della mucosa e più muco: il lume si riduce ancora e in espirazione l'aria esce con fatica.","Muscolo contratto, mucosa gonfia e tappi di muco chiudono quasi del tutto il bronco. A differenza della BPCO l'ostruzione è reversibile, ma qui serve un trattamento urgente."]},
  {t:"Polmone",sub:"sibili e PEF",svg:lung,
   val:["Nessun sibilo","Sibili espiratori","Aria intrappolata","Torace silente"],
   testo:["Le vie aeree sono pervie: niente sibili e il PEF è vicino al migliore valore personale.","L'aria che passa in bronchi stretti fa vibrare le pareti: si sentono sibili, soprattutto in espirazione. Il PEF comincia a calare.","L'espirazione si allunga e non finisce: parte dell'aria resta intrappolata e il torace si gonfia. Sibili forti, PEF basso.","Il flusso è così scarso che i sibili spariscono: il torace silente non è un miglioramento ma un segno di gravità estrema. Spesso il PEF non si riesce a misurare."]},
  {t:"Persona",sub:"segni",svg:pers,
   val:["Parla normalmente","Parla a frasi","Frasi spezzate","Parole singole"],
   testo:["Respiro tranquillo, parla senza fatica e svolge le attività di ogni giorno.","Fiato corto e sibili, ma riesce a parlare a frasi e a stare sdraiata; muscoli accessori di solito a riposo.","Parla a frasi spezzate, preferisce stare seduta e usa i muscoli accessori (sternocleidomastoidei, rientramenti intercostali). La SpO₂ può calare.","Parla a parole singole o non riesce a parlare, sta seduta sporta in avanti, torace silente e SpO₂ sotto il 90% (sotto il 92% secondo BTS/SIGN indica rischio per la vita): è un'emergenza."]}],
 legenda:[["#c0504d","Muscolo liscio"],["#e2789a","Mucosa"],["#9bc53d","Muco"],["#f0a23a","Eosinofili"],["#8e63c9","Mastociti"],["#3aa0d8","Aria intrappolata"],["var(--scrub)","Flusso d'aria e sibili"]],
 n:"GINA, Global Strategy for Asthma Management and Prevention 2024 (ginasthma.org); Reddel HK et al., GINA 2021 executive summary, Am J Respir Crit Care Med 2022 (PMID 34658302, da verificare); BTS/SIGN British guideline on the management of asthma 2019. Classificazione in quattro gradi e segni per grado (frasi, postura, muscoli accessori, sibili) dalle tabelle GINA della gravità dell'attacco: da verificare."});
})();

/* ---- Sindrome coronarica acuta ---- */
/* ---- Sindrome coronarica acuta (disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,C=x=>Math.max(0,Math.min(1,x)),f=x=>+x.toFixed(1);
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const COL={wall:"#d9637b",core:"#f0c040",cap:"#b8956a",plt:"#8e63c9",thr:"#c0283c",old:"#7a1f2b",isc:"#f0a23a",nec:"#b3263a",scar:"#8a8f98",rbc:"#e0425a"};

/* 1. Coronaria in sezione longitudinale */
const cor=s=>{const t=s/4,x0=20,x1=420,yo=56,yi=72,yb=160,yob=176,cx=220;
 const hp=f(R(0,44,C(t*4)));                 // altezza della placca
 const th=s<2?0:s===2?30:yb-yi-hp;           // altezza del trombo sopra la placca
 const top=yb-hp-th;                         // margine superiore dell'ostacolo
 const gap=f(top-yi);                        // lume residuo
 const plaque=hp?`<path d="M140 ${yb}C176 ${yb} 178 ${yb-hp} ${cx} ${yb-hp}C262 ${yb-hp} 264 ${yb} 300 ${yb}Z" fill="${COL.core}" opacity=".85"/>
 <path d="M146 ${yb}C178 ${yb-2} 180 ${yb-hp} ${cx} ${yb-hp}C260 ${yb-hp} 262 ${yb-2} 294 ${yb}" fill="none" stroke="${COL.cap}" stroke-width="5" ${s>=2?`stroke-dasharray="74 22 200"`:""}/>`:"";
 const thromb=th?`<path d="M${s===2?186:170} ${yb-hp+6}C${s===2?190:172} ${top+6} ${s===2?200:174} ${top} ${cx} ${top}C${s===2?240:266} ${top} ${s===2?250:268} ${top+6} ${s===2?254:270} ${yb-hp+6}Z" fill="${s===4?COL.old:COL.thr}" opacity=".9"/>`:"";
 let plt="";if(s>=2){for(let i=0;i<9;i++){const x=R(s===2?190:176,s===2?250:264,rnd(i+3)),y=R(top+6,yb-hp,rnd(i+11));plt+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="4" ry="2.4" fill="${COL.plt}"/>`}}
 // pallini del flusso: passano sopra l'ostacolo oppure si fermano davanti
 const occl=s>=3,yc=top>yi?f((yi+top)/2):116,n=[7,7,4,5,5][s],dur=[2.2,2.6,4,4,4][s];
 const pth=`M${x0+6} 116H150Q${cx-30} ${yc} ${cx} ${yc}Q${cx+30} ${yc} 290 116H${x1-6}`;
 let flow="";for(let i=0;i<n;i++){const dy=(i%3-1)*(occl?14:Math.min(10,gap/4));
  flow+=occl?`<circle class="anm" r="4" fill="${COL.rbc}"><animateMotion path="M${x0+6} ${116+dy}H${162-i*9}" keyPoints="0;1;1" keyTimes="0;.6;1" calcMode="linear" dur="${dur}s" begin="${f(i*.25)}s" repeatCount="indefinite"/></circle>`
  :`<circle class="anm" r="4" fill="${COL.rbc}"><animateMotion path="${pth.replace("M"+(x0+6)+" 116","M"+(x0+6)+" "+(116+dy))}" dur="${dur}s" begin="${f(i*dur/n)}s" repeatCount="indefinite"/></circle>`}
 // strato fisso: globuli rossi fermi
 let rbc="";const nr=[10,9,6,6,6][s];for(let i=0;i<nr;i++){const x=occl?R(34,150,i/(nr-1)):R(34,404,i/(nr-1));if(!occl&&x>150&&x<290&&gap<30)continue;const y=x>150&&x<290?yc:116+((i%3)-1)*10;rbc+=`<circle cx="${f(x)}" cy="${f(y)}" r="4" fill="${COL.rbc}" opacity=".35"/>`}
 const lab=[];
 if(hp){lab.push(`<path d="M${cx} ${yb-hp*.45}V196" class="lead"/><text x="${cx}" y="206" class="ft fsm" text-anchor="middle">Nucleo lipidico</text>`);
  lab.push(`<path d="M154 ${yb-6}L118 196" class="lead"/><text x="118" y="206" class="ft fsm" text-anchor="middle">Cappuccio fibroso</text>`)}
 if(s>=2)lab.push(`<path d="M${cx} ${top}V46" class="lead"/><text x="${cx}" y="42" class="ft fsm" text-anchor="middle">${s===2?"Rottura e trombo parziale":s===3?"Trombo occlusivo":"Trombo organizzato"}</text><path d="M${s===2?248:262} ${yb-hp-4}L326 46" class="lead"/><text x="326" y="42" class="ft fsm">Piastrine</text>`);
 if(!s)lab.push(`<text x="${cx}" y="42" class="ft fsm" text-anchor="middle">Endotelio liscio, lume libero</text>`);
 return head(`Coronaria, stadio ${s}: ${["lume libero e flusso normale","placca stabile che restringe il lume","placca rotta con trombo che chiude in parte il lume","trombo che chiude del tutto il lume, flusso fermo","vaso chiuso da trombo organizzato, a valle necrosi"][s]}`,
 `<text x="${x0}" y="20" class="ft fb">Coronaria in sezione longitudinale</text>
 <rect x="${x0}" y="${yo}" width="${x1-x0}" height="${yi-yo}" fill="${COL.wall}" opacity=".8"/><rect x="${x0}" y="${yb}" width="${x1-x0}" height="${yob-yb}" fill="${COL.wall}" opacity=".8"/>
 <rect x="${x0}" y="${yi}" width="${x1-x0}" height="${yb-yi}" class="ff"/>
 ${rbc}${plaque}${thromb}${plt}${flow}${lab.join("")}
 <text x="${x0}" y="190" class="ft fsm">dall'aorta</text><text x="${x1}" y="190" class="ft fsm" text-anchor="end">verso il miocardio</text>
 <text x="${x0}" y="226" class="ft fsm">Lume ${["libero","ristretto dalla placca","ristretto da placca e trombo","chiuso dal trombo","chiuso"][s]}</text>
 <text x="${x0}" y="242" class="ft fsm">Flusso a valle ${["normale","sufficiente a riposo, non sotto sforzo","molto ridotto anche a riposo","assente","assente"][s]}</text>`)};

/* 2. Miocardio: ventricolo sinistro in sezione trasversale */
const P=(cx,cy,r,a)=>`${f(cx+r*Math.cos(a*Math.PI/180))} ${f(cy+r*Math.sin(a*Math.PI/180))}`;
const sect=(cx,cy,r1,r2,a1,a2,attr)=>`<path d="M${P(cx,cy,r2,a1)}A${r2} ${r2} 0 0 1 ${P(cx,cy,r2,a2)}L${P(cx,cy,r1,a2)}A${r1} ${r1} 0 0 0 ${P(cx,cy,r1,a1)}Z" ${attr}/>`;
const mio=s=>{const t=s/4,cx=128,cy=134,Ro=80,Ri=42,a1=-150,a2=-30;
 const iscR=[Ri,Ri+12,Ri+18,Ro,Ro][s];                 // ischemia: dal subendocardio a tutta la parete
 const necR=[Ri,Ri,Ri+5,Ri+20,Ro][s];                  // necrosi che avanza verso l'epicardio
 const inner=s===4?Ri+16:Ri;                           // parete assottigliata nella cicatrice
 let body=`<circle cx="${cx}" cy="${cy}" r="${(Ro+Ri)/2}" fill="none" stroke="${COL.wall}" stroke-width="${Ro-Ri}" opacity=".8"/><circle cx="${cx}" cy="${cy}" r="${Ri}" class="ff"/>`;
 if(s===4)body+=sect(cx,cy,Ri-1,inner,a1,a2,`class="ff"`)+sect(cx,cy,inner,Ro,a1,a2,`fill="${COL.scar}" opacity=".9"`);
 else{if(s)body+=sect(cx,cy,Ri,iscR,a1,a2,`fill="${COL.isc}" opacity="${s===1?.6:.85}"`);
  if(necR>Ri)body+=sect(cx,cy,Ri,necR,a1,a2,`fill="${COL.nec}" opacity=".9"`)}
 // fronte della necrosi che avanza (solo animazione, stadio 3)
 const wave=s===3?`<path d="${sect(cx,cy,Ri,Ri+20,a1,a2,"").match(/d="([^"]+)"/)[1]}" fill="${COL.nec}" opacity=".9"><animate attributeName="d" values="${sect(cx,cy,Ri,Ri+6,a1,a2,"").match(/d="([^"]+)"/)[1]};${sect(cx,cy,Ri,Ro-4,a1,a2,"").match(/d="([^"]+)"/)[1]};${sect(cx,cy,Ri,Ro-4,a1,a2,"").match(/d="([^"]+)"/)[1]}" keyTimes="0;.8;1" dur="4s" repeatCount="indefinite"/></path>`:"";
 // coronaria epicardica sulla parete anteriore
 const Rc=Ro+9,ca1=-172,ca2=-14,occA=-150;
 const arc=`M${P(cx,cy,Rc,ca1)}A${Rc} ${Rc} 0 0 1 ${P(cx,cy,Rc,ca2)}`;
 const stop=`M${P(cx,cy,Rc,ca1)}A${Rc} ${Rc} 0 0 1 ${P(cx,cy,Rc,occA-4)}`;
 const n=[5,5,3,4,4][s],dur=[2.4,2.8,4,3,3][s];
 let flow="";for(let i=0;i<n;i++)flow+=s>=3?`<circle class="anm" r="3" fill="${COL.rbc}"><animateMotion path="${stop}" keyPoints="0;1;1" keyTimes="0;.6;1" calcMode="linear" dur="${dur}s" begin="${f(i*.3)}s" repeatCount="indefinite"/></circle>`
  :`<circle class="anm" r="3" fill="${COL.rbc}"><animateMotion path="${arc}" dur="${dur}s" begin="${f(i*dur/n)}s" repeatCount="indefinite"/></circle>`;
 const occ=s>=1?`<circle cx="${P(cx,cy,Rc,occA).split(" ")[0]}" cy="${P(cx,cy,Rc,occA).split(" ")[1]}" r="${s>=3?6:s===2?5:4}" fill="${s>=3?(s===4?COL.old:COL.thr):s===2?COL.thr:COL.core}" stroke="var(--paper)" stroke-width="1"/>`:"";
 // pannello: il tempo è muscolo
 const px=262,rows=[["Perfuso",COL.wall],["Ischemia",COL.isc],["Necrosi",COL.nec],["Cicatrice",COL.scar]];
 const act=[[0],[1],[1,2],[1,2],[3]][s];
 const panel=rows.map((r,i)=>{const y=44+i*30,on=act.includes(i)||(s===0&&i===0);return `${on?`<rect x="${px-6}" y="${y-14}" width="174" height="24" rx="2" class="fbx k-info"/>`:""}<rect x="${px}" y="${y-8}" width="12" height="12" rx="2" fill="${r[1]}" opacity="${on?.9:.35}"/><text x="${px+20}" y="${y+2}" class="ft ${on?"fb":"fsm"}">${r[0]}</text><text x="${px+164}" y="${y+2}" class="ft fsm" text-anchor="end">${["",i===1?"reversibile":"",i===2?"irreversibile":"",""][i]||(i===3?"non si contrae":"")}</text>`}).join("");
 const by=176,bw=164,nf=[0,0,.12,.45,1][s];
 const bar=`<text x="${px}" y="${by-8}" class="ft fb">Il tempo è muscolo</text>
 <rect x="${px}" y="${by}" width="${bw}" height="14" rx="2" fill="${s?COL.isc:COL.wall}" opacity=".55"/>
 ${nf?`<rect x="${px}" y="${by}" width="${f(bw*nf)}" height="14" rx="2" fill="${s===4?COL.scar:COL.nec}" opacity=".9"/>`:""}
 ${s===3?`<rect class="anm" x="${px}" y="${by}" height="14" rx="2" fill="${COL.nec}" width="${f(bw*nf)}"><animate attributeName="width" values="${f(bw*.1)};${f(bw*.95)};${f(bw*.95)}" keyTimes="0;.8;1" dur="4s" repeatCount="indefinite"/></rect>`:""}
 <rect x="${px}" y="${by}" width="${bw}" height="14" rx="2" fill="none" class="lead"/>
 <text x="${px}" y="${by+28}" class="ft fsm">${["Tutto il miocardio è perfuso","Ischemia solo sotto sforzo","Necrosi limitata (se c'è)","Più tempo, più necrosi:","Necrosi completata"][s]}</text>
 <text x="${px}" y="${by+42}" class="ft fsm">${["",  "e reversibile con il riposo","al subendocardio","riaprire presto salva muscolo","sostituita da cicatrice"][s]}</text>`;
 return head(`Ventricolo sinistro in sezione, stadio ${s}: ${["parete tutta perfusa","ischemia subendocardica da sforzo","ischemia subendocardica a riposo con possibile piccola necrosi","ischemia transmurale con necrosi che avanza verso l'epicardio","cicatrice sottile al posto del miocardio necrotico"][s]}`,
 `<text x="20" y="20" class="ft fb">Ventricolo sinistro in sezione trasversale</text>
 ${body}${wave}<path d="${arc}" fill="none" stroke="${COL.wall}" stroke-width="7" stroke-linecap="round" opacity=".55"/>${occ}${flow}
 <text x="${cx}" y="${cy+4}" class="ft fsm" text-anchor="middle">cavità</text>
 <path d="M${P(cx,cy,Ri+3,160)}L18 ${cy+52}" class="lead"/><text x="16" y="${cy+64}" class="ft fsm">Endocardio</text>
 <path d="M${P(cx,cy,Ro,25)}L212 ${cy+52}" class="lead"/><text x="212" y="${cy+64}" class="ft fsm" text-anchor="middle">Epicardio</text>
 <path d="M${P(cx,cy,Rc+3,-128)}L46 46" class="lead"/><text x="20" y="42" class="ft fsm">Coronaria</text>
 ${panel}${bar}`)};

/* 3. Tracciato e laboratorio */
const beat=(x,y,p)=>{const {st,ta,r,q}=p;let d=`L${x+6} ${y}Q${x+11} ${y-7} ${x+16} ${y}L${x+24} ${y}`;
 d+=q?`L${x+27} ${y+14}L${x+31} ${y-r}L${x+34} ${y+5}`:`L${x+26} ${y+3}L${x+30} ${y-r}L${x+34} ${y+8}`;
 d+=`L${x+37} ${y-st}`;
 d+=st>8?`Q${x+44} ${y-st-ta} ${x+52} ${y-st+2}Q${x+56} ${y-2} ${x+60} ${y}`:`L${x+44} ${y-st}Q${x+51} ${y-st-ta} ${x+58} ${y}`;
 return d+`L${x+64} ${y}`};
const lab=s=>{const t=s/4,ex=16,ey=40,ew=208,eh=124,y0=112;
 const p=[{st:0,ta:10,r:38,q:0},{st:-6,ta:7,r:38,q:0},{st:-6,ta:-8,r:36,q:0},{st:16,ta:8,r:34,q:0},{st:0,ta:-9,r:20,q:1}][s];
 let tr=`M${ex+4} ${y0}`;for(let i=0;i<3;i++)tr+=beat(ex+8+i*66,y0,p);
 const grid=`<defs><pattern id="g1" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0V4H0" class="gp1"/></pattern><pattern id="g5" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="url(#g1)"/><path d="M20 0V20H0" class="gp5"/></pattern></defs>
 <rect x="${ex}" y="${ey}" width="${ew}" height="${eh}" rx="2" class="pap"/><rect x="${ex}" y="${ey}" width="${ew}" height="${eh}" fill="url(#g5)"/>`;
 // segno sul tratto ST o sull'onda Q del secondo battito
 const bx=ex+8+66;
 const mark=s===0?""
  :s===4?`<path d="M${bx+27} ${y0+18}V${y0+24}" class="emk"/><text x="${bx+27}" y="${y0+34}" class="emt fsm" text-anchor="middle">onda Q</text>`
  :`<path d="M${bx+36} ${y0}H${bx+48}" class="emk" stroke-dasharray="2 2"/><path d="M${bx+42} ${y0}V${y0-p.st+(p.st>0?2:-2)}" class="emk"/><text x="${p.st>0?bx+60:bx+42}" y="${p.st>0?y0-p.st-p.ta-6:y0+24}" class="emt fsm" text-anchor="middle">ST ${p.st>0?"sopra":"sotto"}</text>`;
 const dot=`<circle class="anm" r="3" fill="var(--ecg-lab)"><animateMotion path="${tr}" dur="4s" repeatCount="indefinite"/></circle>`;
 // troponina
 const gx=262,gy=48,gw=162,gh=116,gb=gy+gh,lim=gb-22;
 const A=[0,0,48,98,98][s];
 const pts=[];for(let i=0;i<=40;i++){const u=i/40;const rise=A?A*(u<.38?(u/.38)**1.6:Math.exp(-(u-.38)*1.9)):0;pts.push([f(gx+u*gw),f(gb-8-rise)])}
 const curve=`M${pts.map(q=>q.join(" ")).join("L")}`;
 const now=[.3,.3,.42,.42,.88][s],ni=Math.round(now*40);
 const samp=[[.08,"1°"],[.3,"2°"]];
 const sm=samp.map(([u,l])=>{const q=pts[Math.round(u*40)];return `<rect x="${q[0]-3}" y="${q[1]-3}" width="6" height="6" fill="var(--scrub)"/><text x="${q[0]+5}" y="${A?q[1]+13:q[1]-5}" class="ft fsm">${l}</text>`}).join("");
 const tdot=`<circle class="anm" r="3.5" fill="var(--scrub)"><animateMotion path="${curve}" keyPoints="0;${now};${now}" keyTimes="0;.85;1" calcMode="linear" dur="4s" repeatCount="indefinite"/></circle>`;
 return head(`ECG schematico e troponina, stadio ${s}: ${["ECG normale, troponina sotto il limite","sottoslivellamento ST da sforzo, troponina normale","sottoslivellamento ST e onda T invertita, troponina che può salire","sopraslivellamento ST, troponina in forte aumento","onda Q e onda T invertita, troponina che scende dopo il picco"][s]}`,
 `<text x="20" y="20" class="ft fb">ECG schematico</text>${grid}
 <path d="${tr}" class="etr"/>${mark}${dot}
 <text x="${ex}" y="${ey+eh+16}" class="ft fsm">${["Tratto ST sulla linea di base, onda T positiva","Sottoslivellamento ST durante lo sforzo","Sottoslivellamento ST, onda T invertita","Sopraslivellamento ST","Onda Q e onda T invertita"][s]}</text>
 <text x="${ex}" y="${ey+eh+30}" class="ft fsm">${["","a riposo l'ECG è spesso normale","l'ECG può anche essere normale","in almeno due derivazioni contigue","segno di necrosi"][s]}</text>
 <text x="${gx}" y="20" class="ft fb">Troponina ad alta sensibilità</text>
 <path d="M${gx} ${gy}V${gb}H${gx+gw}" class="fl" fill="none"/>
 <path d="M${gx} ${lim}H${gx+gw}" class="lead" stroke-dasharray="4 3"/><path d="M${gx} 33H${gx+16}" class="lead" stroke-dasharray="4 3"/><text x="${gx+20}" y="36" class="ft fsm">limite di riferimento</text>
 <path d="${curve}" fill="none" stroke="var(--scrub)" stroke-width="2.2"/>
 <path d="M${pts[ni][0]} ${gy}V${gb}" class="lead" stroke-dasharray="2 3"/><text x="${pts[ni][0]+(now>.6?-4:4)}" y="${gy+10}" class="ft fsm" text-anchor="${now>.6?"end":"start"}">ora</text>
 ${sm}${tdot}
 <text x="${gx}" y="${gb+16}" class="ft fsm">tempo dall'esordio dei sintomi</text>
 <text x="${gx}" y="${gb+30}" class="ft fsm">${["sotto il limite","sotto il limite","sopra il limite: NSTEMI","in forte aumento","dopo il picco scende"][s]}</text>`)};

SIM.push({id:"sim-sca",enc:["sca"],t:"Simulatore: la sindrome coronarica acuta stadio per stadio",d:"Scegli lo stadio e il livello da osservare: dalla placca nella coronaria al tracciato e agli esami. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["Coronaria sana","Placca stabile","Rottura e trombo parziale","Occlusione completa","Necrosi e cicatrice"],dur:"4s",
 livelli:[
  {t:"Coronaria",sub:"placca e trombo",svg:cor,
   val:["Flusso normale","Stenosi stabile","Trombo parziale","Occlusione","Vaso chiuso"],
   testo:["Endotelio liscio e lume libero: i globuli rossi arrivano senza ostacoli al miocardio.","Una placca aterosclerotica, con nucleo lipidico e cappuccio fibroso spesso, restringe il lume: a riposo il flusso basta, sotto sforzo no (angina da sforzo).","Il cappuccio fibroso si rompe: le piastrine aderiscono, si attivano e formano un trombo che chiude in parte il lume (angina instabile o NSTEMI). Per questo si danno doppia antiaggregazione e anticoagulante.","Il trombo chiude del tutto la coronaria e a valle il flusso si ferma (STEMI): serve la riperfusione urgente, con angioplastica primaria o, se non è possibile in tempo, fibrinolisi.","Se il vaso resta chiuso o si riapre troppo tardi, il territorio a valle va in necrosi e il trombo si organizza."]},
  {t:"Miocardio",sub:"il tempo è muscolo",svg:mio,
   val:["Perfusione normale","Ischemia da sforzo","Ischemia subendocardica","Ischemia transmurale","Cicatrice"],
   testo:["Il flusso coronarico copre il fabbisogno di ossigeno di tutta la parete, dall'endocardio all'epicardio.","Sotto sforzo il fabbisogno cresce ma la placca limita il flusso: soffre per primo il subendocardio, lo strato più lontano dalle coronarie epicardiche. Con il riposo l'ischemia regredisce.","Il trombo parziale riduce il flusso anche a riposo: ischemia subendocardica. Se una piccola parte delle cellule muore e la troponina sale, è un NSTEMI.","Con l'occlusione completa l'ischemia diventa transmurale e la necrosi avanza dal subendocardio verso l'epicardio: prima si riapre il vaso, più miocardio si salva.","Le cellule necrotiche sono sostituite da tessuto cicatriziale: la parete diventa sottile e non si contrae più."]},
  {t:"Tracciato e laboratorio",sub:"ECG e troponina",svg:lab,
   val:["ECG e troponina normali","ST sotto da sforzo","ST sotto, T invertita","ST sopra","Onda Q"],
   testo:["ECG normale: tratto ST sulla linea di base e onda T positiva. La troponina resta sotto il limite di riferimento.","Nell'angina da sforzo l'ECG a riposo è spesso normale; sotto sforzo può comparire un sottoslivellamento del tratto ST che regredisce con il riposo. La troponina non sale.","Sottoslivellamento ST o onda T invertita, ma l'ECG può anche essere normale. La troponina ad alta sensibilità va ripetuta: se sale oltre il limite è un NSTEMI, se resta normale è angina instabile.","Sopraslivellamento del tratto ST in almeno due derivazioni contigue: è uno STEMI e si avvia subito la riperfusione, senza aspettare il risultato della troponina.","Compaiono onde Q patologiche, segno di necrosi, e onde T invertite; il tratto ST torna verso la linea di base. La troponina, dopo il picco, scende lentamente."]}],
 legenda:[["#d9637b","Parete e miocardio"],["#f0c040","Nucleo lipidico"],["#b8956a","Cappuccio fibroso"],["#8e63c9","Piastrine"],["#c0283c","Trombo"],["#e0425a","Globuli rossi"],["#f0a23a","Ischemia"],["#b3263a","Necrosi"],["#8a8f98","Cicatrice"]],
 n:"Linee guida ESC 2023 sulle sindromi coronariche acute (PMID 37622654; DOI 10.1093/eurheartj/ehad191). Quarta definizione universale di infarto, Thygesen et al., Circulation 2018 (PMID 30571511). Disegno originale e schematico."});
})();
