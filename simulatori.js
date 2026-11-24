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
