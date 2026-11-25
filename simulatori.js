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
 const flow=[0,1,2].map(i=>`<circle class="fv anm" r="3" fill="var(--scrub)"><animateMotion path="M${x1-8} ${125+(i-1)*R(26,8,t)}H${x0+8}" dur="${R(2,3.6,t)}s" begin="${-i*.7}s" repeatCount="indefinite"/></circle>`).join("");
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
 const hull=lost?`<circle cx="${cx}" cy="${cy}" r="${R(80,88,t)}" fill="none" stroke="#d9637b" stroke-width="2.4" stroke-dasharray="${s>=3?"0":"4 5"}"/>`:"";
 let ela="";for(let i=0;i<[0,4,7,10,13][s];i++){const a=rnd(i+2)*6.283,r=R(12,78,rnd(i+5));ela+=`<path d="M${cx+r*Math.cos(a)-4} ${cy+r*Math.sin(a)}l4 -4l4 4l-4 4z" fill="#e0425a"/>`}
 let gas="";for(let i=0;i<[14,12,9,7,5][s];i++){const a=rnd(i+9)*6.283,r=R(8,64,rnd(i+11));gas+=`<circle cx="${cx+r*Math.cos(a)}" cy="${cy+r*Math.sin(a)}" r="3" fill="#3a6fd8"/>`}
 return head(`Acino polmonare nello stadio ${s}: ${lost?lost+" alveoli su 7 hanno perso i setti e sono confluiti":"alveoli integri con setti elastici"}`,
 `<text x="20" y="24" class="ft fb">Acino: alveoli, setti elastici, capillari</text>
 <g transform="translate(${cx} ${cy})"><g>${anim}<g transform="translate(${-cx} ${-cy})">${fill}${sept}${fib}${hull}</g></g></g>${ela}${gas}
 <text x="20" y="${H-24}" class="ft fsm">Superficie di scambio ${["normale","lievemente ridotta","ridotta","molto ridotta","gravemente ridotta"][s]}</text>
 <text x="20" y="${H-8}" class="ft fsm">Ritorno elastico ${["normale","poco ridotto","ridotto","molto ridotto","quasi perso"][s]}${s>=2?": in espirazione le piccole vie aeree collassano":""}</text>`)};
const pol=s=>{const t=s/4,cx=220,top=40,base=R(196,214,t),sc=R(1,1.13,t),dc=R(160,206,t);
 const lung=(dx,f)=>`<path d="M${cx+dx*18} ${top+18}C${cx+dx*(70*sc)} ${top} ${cx+dx*(112*sc)} ${top+90} ${cx+dx*(104*sc)} ${base}Q${cx+dx*60} ${dc+6} ${cx+dx*22} ${base-8}Z" fill="#e2789a" opacity="${R(.9,.55,t)}" stroke="#c2506f"/>`;
 const bul=s>=2?[...Array(s*2)].map((_,i)=>`<circle cx="${cx+(i%2?1:-1)*R(40,90,rnd(i+3))}" cy="${R(70,170,rnd(i+8))}" r="${R(6,14,rnd(i+1))}" fill="#3b3346" opacity=".75"/>`).join(""):"";
 const trap=s?`<ellipse cx="${cx-62*sc}" cy="${base-30}" rx="${R(10,36,t)}" ry="${R(8,26,t)}" fill="#f0a23a" opacity=".55"/><ellipse cx="${cx+62*sc}" cy="${base-30}" rx="${R(10,36,t)}" ry="${R(8,26,t)}" fill="#f0a23a" opacity=".55"/>`:"";
 const amp=R(.06,.015,t);
 return head(`Polmoni nello stadio ${s}: ${s?"iperinflazione, aria intrappolata, diaframma appiattito":"volume normale, diaframma a cupola"}`,
 `<text x="20" y="24" class="ft fb">Meccanica globale e diaframma</text>
 <path d="M${cx} ${top-20}V${top+30}M${cx} ${top+30}l-18 18M${cx} ${top+30}l18 18" class="fl" stroke-width="6" stroke="var(--muted)"/>
 <g transform="translate(${cx} ${base})"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+amp};1" dur="4s" repeatCount="indefinite"/><g transform="translate(${-cx} ${-base})">${lung(-1)}${lung(1)}${bul}${trap}</g></g></g>
 <path d="M${cx-130} ${base+8}Q${cx} ${R(base-30,base+10,t)} ${cx+130} ${base+8}" fill="none" stroke="#d9637b" stroke-width="5" stroke-linecap="round"/>
 <text x="20" y="${H-10}" class="ft fsm">Diaframma ${["a cupola","appena abbassato","abbassato","appiattito","piatto"][s]}</text>`)};
SIM.push({id:"sim-bpco",enc:["bpco"],t:"Simulatore: la BPCO stadio per stadio",d:"Scegli lo stadio spirometrico GOLD e il livello da osservare. Il disegno è schematico: le proporzioni servono a capire, non a misurare. Nello stesso stadio i quadri variano: enfisema e bronchite non crescono sempre insieme alla gravità spirometrica.",
 stadi:["Sano","GOLD 1 lieve","GOLD 2 moderata","GOLD 3 grave","GOLD 4 molto grave"],dur:"4s",fasi:["Inspirazione","Espirazione"],
 livelli:[
  {t:"Bronchiolo",fasi:false,sub:"bronchite cronica",svg:bron,
   val:["Lume libero","Poco ristretto","Ristretto","Molto ristretto","Quasi occluso"],
   testo:["Parete sottile, ciglia numerose che spostano il muco verso l'alto, lume ampio: l'aria passa senza ostacoli.","Il fumo richiama neutrofili e macrofagi; le cellule che producono muco aumentano. Spesso c'è già tosse con espettorato.","La parete si ispessisce, il muco aderisce alle pareti e le ciglia lavorano peggio: il lume si restringe e l'espirazione si allunga.","Infiammazione e fibrosi della parete, tappi di muco: il flusso è molto ridotto, le infezioni e le riacutizzazioni sono più frequenti.","Lume quasi occluso da parete spessa e secrezioni: l'aria esce con grande fatica."]},
  {t:"Alveoli",sub:"enfisema",svg:alv,
   val:["Setti integri","Elastasi attiva","Alveoli confluiti","Enfisema esteso","Bolle"],
   testo:["Alveoli separati da setti sottili ricchi di fibre elastiche (blu) e capillari: grande superficie di scambio e buon ritorno elastico.","Le proteasi delle cellule infiammatorie, come l'elastasi dei neutrofili (rombi rossi), iniziano a superare le difese antiproteasiche.","L'elastina si rompe e alcuni setti spariscono: gli alveoli confluiscono in spazi più grandi e lo scambio di O₂ e CO₂ si riduce.","Molti setti distrutti: il polmone perde la trazione elastica che teneva aperte le piccole vie aeree, che in espirazione collassano.","Grandi spazi aerei e bolle: superficie di scambio gravemente ridotta. Il danno è permanente."]},
  {t:"Polmone intero",sub:"iperinflazione",svg:pol,
   val:["Volume normale","Lieve aria intrappolata","Iperinflazione da sforzo","Diaframma abbassato","Iperinflazione grave"],
   testo:["Il diaframma a cupola si contrae bene e in espirazione il polmone torna al volume di partenza.","Alla fine dell'espirazione resta un po' d'aria nei polmoni, di solito senza sintomi a riposo.","L'aria intrappolata aumenta, soprattutto sotto sforzo (iperinflazione dinamica): compare dispnea da sforzo.","Il torace si espande e il diaframma si abbassa: le fibre accorciate si contraggono male, la dispnea aumenta.","Polmoni iperinflati con bolle, diaframma piatto, uso dei muscoli accessori: respirare costa molta fatica."]}],
 legenda:[["#d9637b","Parete e tessuto"],["#9bc53d","Muco"],["#8e63c9","Neutrofili e macrofagi"],["#3aa0d8","Fibre elastiche"],["#e0425a","Elastasi"],["#3a6fd8","Gas scambiati"],["#f0a23a","Aria intrappolata"],["#3b3346","Bolle"]],
 n:"GOLD 2023 Executive Summary (PMID 36858443); Christenson SA et al. Lancet 2022 (PMID 35533707); Hogg JC et al. N Engl J Med 2004 (PMID 15215480)."});
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
 const no=P([5,3,1,0],s);let o2="";for(let i=0;i<no;i++){const x=200+i*30;o2+=`<circle cx="${x}" cy="${yc+16}" r="3" fill="${O2}"/><circle class="anm" r="3" fill="${O2}"><animateMotion path="M${x} ${yc+8}V${cy-ry+8}" dur="2s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`}
 const nl=P([0,0,8,14],s);let liq="";for(let i=0;i<nl;i++){const x=R(140,410,rnd(i+3)),y=R(yc+14,yc+42,rnd(i+5));liq+=`<path d="M${x} ${y-4}q3 4 0 7q-3-3 0-7z" fill="${LIQ}" opacity=".8"/>`}
 const drip=s>=2?[0,1,2].map(i=>`<circle class="anm" r="2.4" fill="${LIQ}"><animateMotion path="M${180+i*60} ${yc+6}V${yc+34}" dur="1.6s" begin="${-i*.5}s" repeatCount="indefinite"/></circle>`).join(""):"";
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
 const urine=`<path d="M${cx-6} 136h12v7h-12z" fill="#f0d24a" opacity="${P([.8,.55,.3,.12],s)}" stroke="#c9a92a"/>`+[...Array(nd)].map((_,i)=>`<circle class="anm" r="1.8" fill="#c9a92a"><animateMotion path="M${cx} 129V136" dur="${dd}s" begin="${(-i*dd/Math.max(nd,1)).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join("");
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
 ${call(292,184,"start","Altri organi",["funzione normale","meno flusso a","fegato, intestino, polmoni","insufficienza multiorgano"][s],P([0,1,2,2],s),cx+14,121)}
 ${s==1||s==2?`<text x="292" y="205" class="ft fsm">${s==1?"intestino e fegato":"in sofferenza"}</text>`:""}
 ${[["Perfusione adeguata","di tutti gli organi"],["Sangue dirottato verso","cuore e cervello"],["La compensazione","non basta più"],["Danno anche se si","ripristina la pressione"]][s].map((x,i)=>`<text x="20" y="${226+i*13}" class="ft fsm">${x}</text>`).join("")}`)};

SIM.push({id:"sim-shock",enc:["shock"],t:"Simulatore: lo shock stadio per stadio",d:"Esempio: shock ipovolemico da emorragia. Scegli lo stadio e il livello da osservare; il disegno è schematico e non riporta valori.",
 stadi:["Normale","Shock compensato","Shock scompensato","Shock irreversibile"],dur:"4s",
 livelli:[
  {t:"Cellula e microcircolo",sub:"ossigeno e lattati",svg:micro,
   val:["Metabolismo aerobio","Primi lattati","Acidosi lattica","Danno cellulare"],
   testo:["Arteriole e capillari aperti: i globuli rossi portano ossigeno alle cellule, che producono energia (ATP) nei mitocondri con il metabolismo aerobio.","Per la perdita di sangue le arteriole e gli sfinteri precapillari si chiudono: arriva meno ossigeno, una parte dell'energia si produce senza ossigeno e i lattati cominciano a salire.","L'acidosi apre gli sfinteri prima del capillare mentre gli sfinteri dopo il capillare e le venule restano chiusi: il sangue ristagna, la pressione nel capillare sale e il liquido esce nell'interstizio. Le cellule si gonfiano, i lattati sono alti.","Si formano microtrombi, le membrane e i mitocondri sono danneggiati e le cellule muoiono: anche ridando liquidi spesso il tessuto non recupera."]},
  {t:"Cuore e vasi",sub:"frequenza, tono, pressione",svg:circ,
   val:["Pressione normale","Pressione mantenuta","Ipotensione","!Ipotensione refrattaria"],
   testo:["Il cuore si riempie bene e a ogni battito spinge un volume adeguato; frequenza e pressione sono normali.","Torna meno sangue al cuore. Il sistema simpatico aumenta la frequenza e stringe le arteriole: la pressione massima regge, la minima sale e il differenziale si riduce. L'ipotensione è un segno tardivo.","La compensazione non basta: il riempimento è scarso, il cuore batte molto veloce ma spinge poco e la pressione cade. L'indice di shock (frequenza / pressione sistolica) raggiunge o supera circa 1 (nel trauma, soglia associata a maggior fabbisogno trasfusionale).","Le arteriole perdono il tono e il cuore, poco irrorato, cede: la pressione resta bassa nonostante liquidi e farmaci. La frequenza può anche scendere, segno di arresto vicino."]},
  {t:"Organi",sub:"segni clinici",svg:org,
   val:["Organi ben perfusi","Segni precoci","Organi in sofferenza","!Insufficienza multiorgano"],
   testo:["Cute calda e rosea, diuresi normale, paziente vigile e orientato.","Il sangue viene dirottato verso cuore e cervello: cute pallida, fredda e sudata, riempimento capillare lento, diuresi ridotta, ansia e agitazione. Sono i segni da cogliere presto.","Cute fredda e marezzata (prima su ginocchia e gambe), oliguria, confusione e sopore: gli organi lavorano senza abbastanza ossigeno. Si controllano diuresi oraria e lattati.","Reni, polmoni, fegato, intestino e coagulazione si guastano insieme (insufficienza multiorgano); il paziente non risponde. Il danno di solito non è più reversibile."]}],
 legenda:[[RBC,"Globuli rossi"],[O2,"Ossigeno"],[LAT,"Lattati"],[LIQ,"Liquido che esce dai capillari"],[TRO,"Microtrombi"],[MAR,"Marezzatura"],["#9bc53d","Mitocondri"]],
 n:"Voce «shock» dell'Atlante; Vincent JL, De Backer D. Circulatory shock. N Engl J Med 2013 (PMID 24171518); Cecconi M et al. Consensus on circulatory shock and hemodynamic monitoring. Intensive Care Med 2014 (PMID 25392034); Standl T et al. The nomenclature, definition and distinction of types of shock. Dtsch Arztebl Int 2018 (PMID 30573009; doi 10.3238/arztebl.2018.0757); Mutschler M et al. Crit Care 2013 (PMID 23938104) per l'indice di shock nel trauma (registro, studio retrospettivo); Ait-Oufella H et al. Intensive Care Med 2011 (PMID 21373821) per la marezzatura (punteggio 0-5 dalle ginocchia; studio osservazionale in shock settico, n = 60). Schema degli sfinteri pre/postcapillari: schema didattico classico della fase progressiva, da verificare."});
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
 const ej=[...Array(nEj)].map((_,i)=>`<circle class="anm" r="3" fill="#b8324f" opacity="0"><animateMotion path="M${cx+10} ${y0+40+i*6}V${y0-28}Q${cx+10} ${y0-40} ${cx+26} ${y0-40}H${cx+78}" dur="4s" keyPoints="0;1;1" keyTimes="0;.45;1" calcMode="linear" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.04;.42;.46;1" dur="4s" repeatCount="indefinite"/></circle>`).join("");
 const fill=[0,1,2,3].map(i=>`<circle class="anm" r="3" fill="#b8324f" opacity="0"><animateMotion path="M${cx-ar-8+i*8} ${y0-14}V${y0+30+i*10}" dur="4s" keyPoints="0;0;1;1" keyTimes="0;.5;.95;1" calcMode="linear" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.54;.94;1" dur="4s" repeatCount="indefinite"/></circle>`).join("");
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
 const liq=[0,0,0,6,40][s],nI=[0,0,6,10,14][s];
 const br=R(4,1.6,t);
 let inter="";for(let i=0;i<nI;i++){const side=i%2?1:-1;inter+=`<circle cx="${f(mx+side*R(8,sw/2-2,rnd(i+4)))}" cy="${f(R(cy-38,cy+38,rnd(i+9)))}" r="2.4" fill="#3aa0d8" opacity=".85"/>`}
 const leak=s>=2?[0,1,2].map(i=>`<circle class="anm" r="2.4" fill="#3aa0d8"><animateMotion path="M${mx+(i%2?3:-3)} ${cy-20+i*20}h${(i%2?1:-1)*(sw/2+(s>=3?14:0))}" dur="4s" begin="${-i*1.3}s" repeatCount="indefinite"/></circle>`).join(""):"";
 const blood=[0,1,2,3].map(i=>`<circle class="anm" r="2.6" fill="#b8324f"><animateMotion path="M${mx} ${cy-58}V${cy+58}" dur="${R(2,3.2,t)}s" begin="${-i*.5}s" repeatCount="indefinite"/></circle>`).join("");
 const alv=(cx)=>`<g style="transform-origin:${f(cx)}px ${cy}px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.05;1" dur="${f(br)}s" repeatCount="indefinite"/>
  <circle cx="${f(cx)}" cy="${cy}" r="${r}" class="fa"/>${liq?`<path d="${seg(cx,cy,r,liq)}" fill="#3aa0d8" opacity=".55"/>`:""}<circle cx="${f(cx)}" cy="${cy}" r="${r}" fill="none" stroke="#d9637b" stroke-width="1.6"/></g></g>`;
 // paziente a letto: busto sollevato con l'ortopnea
 const th=[0,0,8,28,62][s]*Math.PI/180,hx=362,hy=200,Lb=54,sx=hx-Lb*Math.cos(th),sy=hy-6-Lb*Math.sin(th),hdx=sx-13*Math.cos(th),hdy=sy-13*Math.sin(th);
 const pil=s>=3?`<path d="M${f(hx-8)} ${hy}L${f(sx-10*Math.cos(th))} ${f(sy-10*Math.sin(th)+12)}L${f(sx-10*Math.cos(th))} ${hy}Z" class="eyrow"/>`:`<rect x="${f(sx-22)}" y="${hy-10}" width="26" height="10" rx="4" class="eyrow"/>`;
 const puff=s>=4?[0,1,2].map(i=>`<path d="M${f(hdx-16-i*7)} ${f(hdy-6+i*5)}q-5 5 0 10" fill="none" stroke="var(--muted)" stroke-width="1.4" class="anm" opacity=".2"><animate attributeName="opacity" values=".15;1;.15" dur="${f(br)}s" begin="${f(i*br/6)}s" repeatCount="indefinite"/></path>`).join(""):"";
 const resp=["respiro normale, dorme sdraiato","nessuna dispnea nelle attività ordinarie","dispnea con le attività ordinarie","dispnea con sforzi lievi; ortopnea","dispnea a riposo; sta meglio seduto"][s];
 const lq=["resta nei capillari","resta nei capillari","esce nell'interstizio","nell'interstizio, poco o nulla negli alveoli","può invadere gli alveoli (edema polmonare acuto)"][s];
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
 const na=s?[...Array(Math.round(R(1,5,t)))].map((_,i)=>`<circle class="anm" r="2.4" fill="#3aa0d8"><animateMotion path="M${bx-10} 130Q${bx-34} 108 ${bx-6} 92" dur="3s" begin="${f(-i*.6)}s" repeatCount="indefinite"/></circle>`).join(""):"";
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
 <text x="${x2}" y="20" class="ft fsm" text-anchor="end">${["Nel sano: sistemi in equilibrio","Compenso: attivi senza sintomi","Compenso che diventa dannoso","Circolo vizioso","Congestione, anche sistemica"][s]}</text>
 ${boxes}${loop}`)};

SIM.push({id:"sim-scompenso",enc:["scompenso"],t:"Simulatore: lo scompenso cardiaco classe per classe",d:"Scegli lo stadio e il livello da osservare. Il modello è lo scompenso sinistro con frazione di eiezione ridotta; le classi NYHA descrivono i sintomi, qui affiancate ai cambiamenti più tipici. La classe NYHA dipende dai sintomi e non dalla frazione di eiezione: si può avere una FE molto ridotta anche in classe I. Il disegno è schematico.",
 stadi:["Sano","NYHA I","NYHA II","NYHA III","NYHA IV"],dur:"4s",fasi:["Sistole","Diastole"],
 livelli:[
  {t:"Cuore",sub:"ventricolo sinistro",svg:cuore,
   testo:["Ventricolo di dimensioni normali, parete spessa e ben contrattile: in sistole si svuota di buona parte del sangue e la frazione di eiezione è normale.","Il muscolo si contrae meno (per esempio dopo un infarto) e il ventricolo inizia a dilatarsi; a riposo e negli sforzi ordinari la portata è ancora mantenuta.","Il ventricolo si dilata e la parete si assottiglia (rimodellamento). Un ventricolo più pieno spinge un po' di più (Frank-Starling), ma la quota espulsa a ogni battito cala.","La frazione di eiezione è ridotta: per riempirsi il ventricolo ha bisogno di pressioni più alte, che risalgono verso l'atrio sinistro e i polmoni.","Ventricolo molto dilatato, parete sottile e contrazione debole: la gittata non basta più neanche a riposo e la pressione di riempimento è molto alta."],
   val:["FE normale","FE in calo","FE ridotta","FE ridotta, cuore più dilatato","FE molto ridotta"]},
  {t:"Polmoni e circolo",fasi:false,sub:"congestione",svg:polm,
   testo:["La pressione nei capillari polmonari è bassa: il liquido resta nei vasi, l'interstizio è sottile e gli alveoli sono asciutti. Si dorme sdraiati senza fatica.","Classe I: nessuna limitazione, l'attività fisica ordinaria non provoca dispnea. Il liquido resta ancora nei capillari.","Classe II: lieve limitazione; gli sforzi ordinari (per esempio salire le scale) danno dispnea, affaticamento o palpitazioni. La pressione che risale dal cuore sinistro spinge liquido nell'interstizio.","Classe III: dispnea con sforzi lievi. La congestione aumenta; da sdraiati il sangue che torna dalle gambe la peggiora: ortopnea e dispnea parossistica notturna.","Classe IV: sintomi anche a riposo, che aumentano con qualsiasi attività; la persona respira meglio seduta. Se la pressione nei capillari supera la capacità di drenaggio il liquido invade gli alveoli (rantoli, ipossiemia): è l'edema polmonare acuto, un'emergenza che può comparire anche in classi più basse."],
   val:["Polmoni asciutti","Nessun limite","Limiti negli sforzi ordinari","Limiti negli sforzi lievi","!Sintomi a riposo"]},
  {t:"Organismo",fasi:false,sub:"neuro-ormoni e liquidi",svg:organ,
   testo:["Pressione arteriosa e volume circolante sono in equilibrio: il rene elimina sodio e acqua in eccesso e il peso è stabile.","Il calo della portata attiva il simpatico e il sistema renina-angiotensina-aldosterone: tachicardia e vasocostrizione mantengono la pressione. All'inizio compensano, ma affaticano il cuore.","L'aldosterone fa trattenere sodio e, con esso, acqua: il volume di sangue aumenta e compaiono i primi edemi alle caviglie.","Più volume significa più carico per un cuore già debole: è un circolo vizioso. Edemi declivi evidenti e peso in aumento; avvisare se il peso sale di più di 2 kg in 3 giorni.","Ritenzione marcata ed edemi estesi; se la pressione alta nei polmoni affatica anche il ventricolo destro (scompenso biventricolare) compare congestione sistemica: turgore giugulare, epatomegalia, ascite. Peso quotidiano, bilancio idrico e restrizione idrosalina se prescritta guidano l'assistenza."],
   val:["Peso stabile","Compenso neuro-ormonale","Ritenzione idrosalina","Edemi e peso in aumento","Congestione, anche sistemica"]}],
 legenda:[["#d9637b","Miocardio e sangue"],["#3aa0d8","Liquido (edema)"],["#f0a23a","Renina-angiotensina-aldosterone"],["#8e63c9","Simpatico"]],
 n:"Linee guida ESC 2021 sullo scompenso cardiaco, McDonagh TA et al., Eur Heart J 2021 (PMID 34447992); Jaarsma T et al. Eur J Heart Fail 2021 (PMID 32945600) per il peso; classificazione NYHA come nella voce dell'Atlante; soglia di peso: ESC indica > 2 kg in 3 giorni, da verificare la tabella."});
})();

/* ---- Asma ---- */

/* ---- Asma bronchiale (disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,f1=x=>Math.round(x*10)/10;
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const NOMI=["asma controllata","attacco lieve-moderato","attacco grave","attacco con pericolo di vita (torace silente)"];
const MU="#c0504d",MUC="#e2789a",MK="#9bc53d",EO="#f0a23a",MA="#8e63c9",TR="#3aa0d8",AL="var(--vital)";
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
 <text x="${lx}" y="224" class="ft fsm">asma: variabile, di solito reversibile</text>
 <text x="${lx}" y="236" class="ft fsm">BPCO: ostruzione persistente</text>`)};
/* 2. Polmoni: sibili, aria intrappolata, PEF */
const lung=s=>{const t=s/3,cx=120,top=50,base=R(192,202,t),sc=R(1,1.08,t),dc=R(160,192,t);
 const half=dx=>`<path d="M${cx+dx*14} ${top+16}C${cx+dx*56*sc} ${top} ${cx+dx*90*sc} ${top+80} ${cx+dx*84*sc} ${base}Q${cx+dx*48} ${dc} ${cx+dx*16} ${base-8}Z" fill="#e2789a" opacity=".6" stroke="#c2506f"/>`;
 const tree=`<path d="M${cx} 32V${top+34}M${cx} ${top+34}L${cx-30} ${top+62}L${cx-48} ${top+100}M${cx-30} ${top+62}L${cx-22} ${top+108}M${cx} ${top+34}L${cx+30} ${top+62}L${cx+48} ${top+100}M${cx+30} ${top+62}L${cx+22} ${top+108}" fill="none" stroke="var(--muted)" stroke-width="${f1(R(5,3.4,t))}" stroke-linecap="round"/>`;
 const trap=s?[-1,1].map(dx=>`<ellipse cx="${cx+dx*52*sc}" cy="${base-34}" rx="${f1(R(8,26,t))}" ry="${f1(R(6,18,t))}" fill="${TR}" opacity=".5"/>`).join(""):"";
 const nw=[0,2,4,0][s],wp=[[-46,104],[46,104],[-60,150],[60,150]];
 const wz=wp.slice(0,nw).map(([dx,y])=>`<path d="M${cx+dx-12} ${y}q3 -5 6 0t6 0t6 0t6 0" class="fs" opacity="1"><animate attributeName="opacity" values=".35;.35;1;.35" keyTimes="0;.5;.75;1" dur="4s" repeatCount="indefinite"/></path>`).join("");
 const len=R(70,14,t);
 const air=[0,1].map(i=>`<circle class="anm" r="3" fill="var(--scrub)"><animateMotion path="M${cx} 32V${f1(32+len)}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear" dur="4s" begin="${-i*.25}s" repeatCount="indefinite"/></circle>`).join("");
 const amp=R(.05,.01,t);
 const px=320,py=48,ph=140,frac=[.92,.65,.4,.22][s],cy=py+ph*(1-frac);
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
 const say=["«Sto bene, parlo senza fatica.»","«Mi manca un po' il fiato, ma parlo.»","«Non... respiro...»","«...»"][s];
 const row=(y,n,v,k)=>`<text x="244" y="${y}" class="ft fb">${n}</text><text x="244" y="${y+13}" class="ft fsm">${v}</text>${k?`<circle cx="424" cy="${y-4}" r="4" class="${k}"/>`:""}`;
 const kk=["k-ok","k-warn","k-alarm","k-alarm"][s];
 const g0=252,g1=424,gy=218,X=v=>f1(g0+(v-84)/16*(g1-g0)),lev=[98,94,88,85][s];
 return head(`Persona durante ${NOMI[s]}: ${["respira tranquilla e parla normalmente","parla a frasi, preferisce stare seduta, non agitata, muscoli accessori non usati","parla a parole singole, seduta sporta in avanti, agitata, usa i muscoli accessori, saturazione sotto il 90 per cento","sonnolenta o confusa, torace silente, sforzo respiratorio che cala per esaurimento: pericolo di vita"][s]}`,
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
 ${row(88,"Muscoli accessori",["non usati","non usati","usati, rientramenti","sforzo che cala: esaurimento"][s],s>=2?kk:"")}
 ${row(122,"Postura e coscienza",["normale","preferisce stare seduta","seduta in avanti, agitata","sonnolenta o confusa"][s],"")}
 ${row(156,"Torace",["nessun sibilo","sibili espiratori","sibili, FR oltre 30","torace silente"][s],kk)}
 <text x="244" y="188" class="ft fb">SpO₂</text>
 <rect x="${g0}" y="${gy-5}" width="${g1-g0}" height="10" rx="2" class="eyrow"/>
 <rect x="${g0}" y="${gy-5}" width="${f1(X(lev)-g0)}" height="10" rx="2" class="${["k-ok","k-warn","k-alarm","k-alarm"][s]}"/>
 <path d="M${X(92)} ${gy-9}V${gy+9}M${X(90)} ${gy-9}V${gy+9}" class="fl"/>
 <text x="${X(92)}" y="${gy-12}" class="ft fsm" text-anchor="middle">92% BTS/SIGN</text>
 <text x="${X(90)}" y="${gy+20}" class="ft fsm" text-anchor="middle">90% GINA</text>
 <text x="${g1}" y="188" class="ft fsm" text-anchor="end">${["normale","90-95% o normale","sotto il 90%","sotto il 92% (BTS/SIGN)"][s]}</text>`)};
SIM.push({id:"sim-asma",enc:["asma"],t:"Simulatore: l'attacco d'asma passo per passo",d:"Scegli quanto è grave l'attacco e il livello da osservare, dal bronco alla persona. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["Controllata","Attacco lieve-moderato","Attacco grave","Pericolo di vita (torace silente)"],dur:"4s",fasi:["Inspirazione","Espirazione"],
 livelli:[
  {t:"Bronco",sub:"broncospasmo",svg:bron,
   val:["Infiammazione di fondo","Broncospasmo","Spasmo, edema e muco","Lume quasi chiuso"],
   testo:["Anche quando l'asma è controllata la mucosa resta un po' infiammata (eosinofili, mastociti): per questo serve sempre una terapia con cortisonico inalatorio: ogni giorno, oppure al bisogno insieme al formoterolo nell'asma lieve, come prescritto.","Un fattore scatenante (allergene, infezione, sforzo, freddo, fumo) attiva i mastociti, che liberano mediatori: il muscolo liscio si contrae e il lume si restringe.","Al broncospasmo si aggiungono l'edema della mucosa e più muco: il lume si riduce ancora e in espirazione l'aria esce con fatica.","Muscolo contratto, mucosa gonfia e tappi di muco chiudono quasi del tutto il bronco. A differenza della BPCO l'ostruzione è di solito reversibile, ma qui serve un trattamento urgente."]},
  {t:"Polmone",sub:"sibili e PEF",svg:lung,
   val:["Nessun sibilo","Sibili espiratori","Aria intrappolata","!Torace silente"],
   testo:["Le vie aeree sono pervie: niente sibili e il PEF è vicino al migliore valore personale.","L'aria che passa in bronchi stretti fa vibrare le pareti: si sentono sibili, soprattutto in espirazione. Il PEF comincia a calare.","L'espirazione si allunga e non finisce: parte dell'aria resta intrappolata e il torace si gonfia. Sibili forti, PEF basso.","Il flusso è così scarso che i sibili spariscono: il torace silente non è un miglioramento ma un segno di gravità estrema. Il PEF può non essere eseguibile e misurarlo non deve ritardare il trattamento."]},
  {t:"Persona",sub:"segni",svg:pers,
   val:["Parla normalmente","Parla a frasi","Parole singole","!Sonnolenta o confusa"],
   testo:["Respiro tranquillo, parla senza fatica e svolge le attività di ogni giorno.","Fiato corto e sibili, ma riesce a parlare a frasi; preferisce stare seduta, non è agitata e non usa i muscoli accessori. La SpO₂ è tra 90 e 95% o normale.","Sta seduta sporta in avanti, è agitata e riesce a dire solo parole singole; la frequenza respiratoria supera 30 al minuto e usa i muscoli accessori (sternocleidomastoidei, rientramenti intercostali). La SpO₂ è sotto il 90%.","Torace silente e sforzo respiratorio che cala per esaurimento; la persona diventa sonnolenta o confusa: è un'emergenza con pericolo di vita. Secondo BTS/SIGN una SpO₂ sotto il 92% indica pericolo di vita."]}],
 legenda:[["#c0504d","Muscolo liscio"],["#e2789a","Mucosa"],["#9bc53d","Muco"],["#f0a23a","Eosinofili"],["#8e63c9","Mastociti"],["#3aa0d8","Aria intrappolata"],["var(--scrub)","Flusso d'aria e sibili"]],
 n:"GINA, Global Strategy for Asthma Management and Prevention 2024 (ginasthma.org); Reddel HK et al., GINA 2021 executive summary, Am J Respir Crit Care Med 2022 (PMID 34658302); BTS/SIGN British guideline on the management of asthma 2019. Gravità dell'attacco secondo GINA (Summary Guide 2025): lieve-moderato, grave, pericolo di vita. Da verificare: soglie PEF BTS e SpO₂ 90-95% nella Box GINA."});
})();

/* ---- Sindrome coronarica acuta ---- */
/* ---- Sindrome coronarica acuta (disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,C=x=>Math.max(0,Math.min(1,x)),f=x=>+x.toFixed(1);
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const COL={wall:"#d9637b",core:"#f0c040",cap:"#b8956a",plt:"#8e63c9",thr:"#c0283c",old:"#7a1f2b",isc:"#f0a23a",nec:"#b3263a",scar:"#8a8f98",rbc:"#d9637b"};

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
  flow+=occl?`<circle class="anm" r="4" fill="${COL.rbc}" opacity=".6"><animateMotion path="M${x0+6} ${116+dy}H${162-i*9}" keyPoints="0;1;1" keyTimes="0;.6;1" calcMode="linear" dur="${dur}s" begin="${f(-i*.25)}s" repeatCount="indefinite"/></circle>`
  :`<circle class="anm" r="4" fill="${COL.rbc}" opacity=".6"><animateMotion path="${pth.replace("M"+(x0+6)+" 116","M"+(x0+6)+" "+(116+dy))}" dur="${dur}s" begin="${f(-i*dur/n)}s" repeatCount="indefinite"/></circle>`}
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
 let flow="";for(let i=0;i<n;i++)flow+=s>=3?`<circle class="anm" r="3" fill="${COL.rbc}" opacity=".6"><animateMotion path="${stop}" keyPoints="0;1;1" keyTimes="0;.6;1" calcMode="linear" dur="${dur}s" begin="${f(-i*.3)}s" repeatCount="indefinite"/></circle>`
  :`<circle class="anm" r="3" fill="${COL.rbc}" opacity=".6"><animateMotion path="${arc}" dur="${dur}s" begin="${f(-i*dur/n)}s" repeatCount="indefinite"/></circle>`;
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
 <text x="${gx}" y="${gb+30}" class="ft fsm">${["sotto il limite","sotto il limite","sale sopra il limite: NSTEMI","in forte aumento","dopo il picco scende"][s]}</text>`)};

SIM.push({id:"sim-sca",enc:["sca"],t:"Simulatore: la sindrome coronarica acuta stadio per stadio",d:"Scegli lo stadio e il livello da osservare: dalla placca nella coronaria al tracciato e agli esami. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["Coronaria sana","Placca stabile","Rottura e trombo parziale","Occlusione completa","Necrosi e cicatrice"],dur:"4s",
 livelli:[
  {t:"Coronaria",sub:"placca e trombo",svg:cor,
   val:["Flusso normale","Stenosi stabile","Trombo parziale","!Occlusione","Vaso chiuso"],
   testo:["Endotelio liscio e lume libero: i globuli rossi arrivano senza ostacoli al miocardio.","Una placca aterosclerotica, con nucleo lipidico e cappuccio fibroso spesso, restringe il lume: a riposo il flusso basta, sotto sforzo no (angina da sforzo: sindrome coronarica cronica, non ancora acuta).","Il cappuccio fibroso si rompe, oppure l'endotelio sopra la placca si erode (erosione di placca): le piastrine aderiscono, si attivano e formano un trombo che chiude in parte il lume (di solito angina instabile o NSTEMI). Per questo il medico prescrive antiaggreganti (di solito doppia antiaggregazione) e un anticoagulante.","Il trombo chiude del tutto la coronaria e a valle il flusso si ferma (di solito STEMI): serve la riperfusione urgente, con angioplastica primaria o, se non è possibile in tempo, fibrinolisi. Un'occlusione può non dare sopraslivellamento ST (nel NSTEMI con occlusione totale il territorio è soprattutto infero-laterale: coronaria destra e circonflessa).","Se il vaso resta chiuso o si riapre troppo tardi, il territorio a valle va in necrosi e il trombo si organizza."]},
  {t:"Miocardio",sub:"il tempo è muscolo",svg:mio,
   val:["Perfusione normale","Ischemia da sforzo","Ischemia subendocardica","!Ischemia transmurale","Cicatrice"],
   testo:["Il flusso coronarico copre il fabbisogno di ossigeno di tutta la parete, dall'endocardio all'epicardio.","Sotto sforzo il fabbisogno cresce ma la placca limita il flusso (sindrome coronarica cronica, non ancora acuta): soffre per primo il subendocardio, lo strato più lontano dalle coronarie epicardiche. Con il riposo l'ischemia regredisce.","Il trombo parziale riduce il flusso anche a riposo: ischemia subendocardica. Se una piccola parte delle cellule muore e la troponina sale, è un NSTEMI.","Con l'occlusione completa l'ischemia diventa transmurale e la necrosi avanza dal subendocardio verso l'epicardio: prima si riapre il vaso, più miocardio si salva.","Le cellule necrotiche sono sostituite da tessuto cicatriziale: la parete diventa sottile e non si contrae più."]},
  {t:"Tracciato e laboratorio",sub:"ECG e troponina",svg:lab,
   val:["ECG e troponina normali","ST sotto da sforzo","ST sotto, T invertita","!ST sopra","Onda Q"],
   testo:["ECG normale: tratto ST sulla linea di base e onda T positiva. La troponina resta sotto il limite di riferimento.","Nell'angina da sforzo l'ECG a riposo è spesso normale; sotto sforzo può comparire un sottoslivellamento del tratto ST che regredisce con il riposo. La troponina non sale.","Sottoslivellamento ST o onda T invertita, ma l'ECG può anche essere normale. La troponina ad alta sensibilità va ripetuta: se mostra un aumento o un calo, con almeno un valore sopra il 99° percentile del limite superiore di riferimento, in un quadro di ischemia, è un NSTEMI; se resta normale è angina instabile.","Con sintomi di ischemia, un sopraslivellamento ST sopra le soglie in almeno due derivazioni contigue indica uno STEMI: il medico avvia subito la riperfusione, senza aspettare la troponina.","Compaiono onde Q patologiche, segno di necrosi, e onde T invertite; il tratto ST torna verso la linea di base. La troponina, dopo il picco, scende lentamente."]}],
 legenda:[["#d9637b","Parete e miocardio"],["#f0c040","Nucleo lipidico"],["#b8956a","Cappuccio fibroso"],["#8e63c9","Piastrine"],["#c0283c","Trombo"],["#d9637b","Globuli rossi"],["#f0a23a","Ischemia"],["#b3263a","Necrosi"],["#8a8f98","Cicatrice"]],
 n:"Linee guida ESC 2023 sulle sindromi coronariche acute (PMID 37622654; DOI 10.1093/eurheartj/ehad191). Quarta definizione universale di infarto, Thygesen et al., Circulation 2018 (PMID 30571511). Reimer KA et al. Circulation 1977 (PMID 912839; modello canino); Bentzon JF et al. Circ Res 2014 (PMID 24902970); Khan AR et al. Eur Heart J 2017 (PMID 29020244). Disegno originale e schematico."});
})();

/* ---- Malattia renale cronica ---- */
/* ---- Malattia renale cronica (stadi G KDIGO; disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t;
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const ST=["G1","G2","G3","G4","G5"];
const C={glo:"#d9637b",rbc:"#c62f45",fil:"#3aa0d8",alb:"#f0a23a",ure:"#9c6b3c",k:"#2e9e5b",p:"#8e63c9",h:"#d46bb5"};
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
const bez=(p,u)=>{const v=1-u;return[0,1].map(k=>v*v*v*p[0][k]+3*v*v*u*p[1][k]+3*v*u*u*p[2][k]+u*u*u*p[3][k])};

/* Livello 1: nefroni (sclerosi, iperfiltrazione dei residui, albumina) */
const nef=s=>{const t=s/4,nScl=[0,1,3,4,5][s],ord=[2,4,0,5,1,3];
 const scl=new Set(ord.slice(0,nScl));
 const pos=[[45,62],[100,62],[155,62],[45,140],[100,140],[155,140]];
 const rg=R(10,14,t),dur=R(4,2.6,t).toFixed(2);
 let ic="";pos.forEach((p,i)=>{const[x,y]=p,dead=scl.has(i),r=dead?9:rg,rc=r+5,ty=y+rc;
  const tub=`M${x} ${ty}q9 7 0 14q-9 7 0 14`;
  ic+=`<path d="${tub}" fill="none" stroke="${dead?"var(--muted)":C.fil}" stroke-width="${dead?1.2:R(2,4,t).toFixed(1)}" stroke-linecap="round" opacity="${dead?.6:.9}"/>`;
  ic+=`<circle cx="${x}" cy="${y}" r="${rc}" class="ff" stroke="var(--ink)" stroke-width="1"${dead?' stroke-dasharray="3 2"':""}/>`;
  if(dead)ic+=`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--muted)" opacity=".55"/><path d="M${x-6} ${y-4}l10 10M${x-7} ${y+2}l7 7M${x-2} ${y-8}l9 9" stroke="var(--paper)" stroke-width="1.2"/>`;
  else{ic+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.glo}" opacity=".25"/>`;for(let j=0;j<5;j++){const a=j/5*6.283;ic+=`<circle cx="${(x+r*.45*Math.cos(a)).toFixed(1)}" cy="${(y+r*.45*Math.sin(a)).toFixed(1)}" r="${(r*.42).toFixed(1)}" fill="none" stroke="${C.glo}" stroke-width="1.3"/>`}
   ic+=`<circle class="anm" r="2.4" fill="${C.fil}"><animateMotion path="${tub}" dur="${dur}s" begin="${(-i*.37).toFixed(2)}s" repeatCount="indefinite"/></circle>`}});
 // nefrone residuo ingrandito
 const cx=345,cy=106,Rc=R(42,52,t),Rt=Rc-11,a50=.87;
 const sx=cx+Rc*Math.cos(a50),sy=cy+Rc*Math.sin(a50);
 const tp=[[sx,sy],[sx+22,sy+12],[sx+4,sy+38],[sx+16,196]];
 const tubD=`M${tp[0][0].toFixed(1)} ${tp[0][1].toFixed(1)}C${tp[1].map(v=>v.toFixed(1)).join(" ")} ${tp[2].map(v=>v.toFixed(1)).join(" ")} ${tp[3].map(v=>v.toFixed(1)).join(" ")}`;
 let pet="";for(let j=0;j<7;j++){const a=j/7*6.283+.3;pet+=`<circle cx="${(cx+Rt*.5*Math.cos(a)).toFixed(1)}" cy="${(cy+Rt*.5*Math.sin(a)).toFixed(1)}" r="${(Rt*.36).toFixed(1)}" fill="none" stroke="${C.glo}" stroke-width="1.6"/>`}
 const x0=(cx+Rt*.35*Math.cos(a50)).toFixed(1),y0=(cy+Rt*.35*Math.sin(a50)).toFixed(1);
 const mp=`M${x0} ${y0}L${tp[0][0].toFixed(1)} ${tp[0][1].toFixed(1)}`+tubD.replace(/^M[^C]*/,"");
 const df=R(4,2.4,t).toFixed(2),nA=[1,1,2,3,4][s];
 let dots="";for(let i=0;i<3;i++)dots+=`<circle class="anm" r="2.6" fill="${C.fil}"><animateMotion path="${mp}" dur="${df}s" begin="${(-i*df/3).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
 for(let i=0;i<nA;i++)dots+=`<circle class="anm" r="3.4" fill="${C.alb}"><animateMotion path="${mp}" dur="${df}s" begin="${(-(i*df/nA+.2)).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
 let albS="";for(let i=0;i<nA;i++){const q=bez(tp,.35+i*.15);albS+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="3.4" fill="${C.alb}" stroke="var(--paper)" stroke-width=".8"/>`}
 const ar=(cx+(Rt+2)*Math.cos(a50)).toFixed(1),ar2=(cy+(Rt+2)*Math.sin(a50)).toFixed(1);
 const glom=`<path d="${tubD}" fill="none" stroke="${C.fil}" stroke-width="12" stroke-linecap="round" opacity=".28"/>
 <circle cx="${cx}" cy="${cy}" r="${Rc.toFixed(1)}" class="ff" stroke="var(--ink)" stroke-width="1.4"/>
 <circle cx="${cx}" cy="${cy}" r="${Rt.toFixed(1)}" fill="${C.glo}" opacity=".18"/>${pet}
 <path d="M236 ${cy+6}H${(cx-Rt+8).toFixed(1)}" stroke="${C.glo}" stroke-width="${R(7,12,t).toFixed(1)}" opacity=".85"/>
 <path d="M236 ${cy-16}H${(cx-Rt+6).toFixed(1)}" stroke="${C.glo}" stroke-width="5" opacity=".85"/>
 <path d="M${(cx+Rt*.5*Math.cos(a50)).toFixed(1)} ${(cy+Rt*.5*Math.sin(a50)).toFixed(1)}L${ar} ${ar2}" stroke="${C.fil}" stroke-width="2"/><circle cx="${ar}" cy="${ar2}" r="2.4" fill="${C.fil}"/>
 ${albS}${dots}
 <text x="236" y="${cy-24}" class="ft fsm">efferente</text><text x="236" y="${cy+28}" class="ft fsm">afferente</text>
 <text x="${cx}" y="${(cy-Rc-6).toFixed(1)}" class="ft fsm" text-anchor="middle">capsula di Bowman</text>
 <text x="${(tp[3][0]-16).toFixed(1)}" y="200" class="ft fsm" text-anchor="end">tubulo</text>`;
 return head(`Nefroni nello stadio ${ST[s]}: ${nScl?nScl+" glomeruli su 6 sclerotici, i nefroni residui ingranditi filtrano di più":"tutti i nefroni funzionano"}; passa albumina nel filtrato`,
 `<text x="20" y="24" class="ft fb">Nefroni del rene</text><text x="232" y="24" class="ft fb">Un nefrone residuo</text>
 <path d="M216 36V${H-8}" class="lead"/>${ic}${glom}
 <text x="20" y="${H-28}" class="ft fsm">Nefroni al lavoro: ${["tutti","quasi tutti","circa metà","pochi","pochissimi"][s]}</text>
 <text x="20" y="${H-12}" class="ft fsm">Filtrato totale: ${["normale","poco ridotto","ridotto","molto ridotto","minimo"][s]}</text>
 <text x="232" y="${H-28}" class="ft fsm">Pressione nel glomerulo: ${["normale","in aumento","alta","alta","alta"][s]}</text>
 <text x="232" y="${H-12}" class="ft fsm">Albumina nelle urine: ${["presente","presente","in aumento","in aumento","in aumento"][s]}</text>`)};

/* Livello 2: sangue (scorie, potassio, fosforo, acidi, globuli rossi) */
const san=s=>{const t=s/4,x0=20,x1=200,yT=54,yB=164,L=x1-x0;
 const n={rbc:[10,10,8,6,4][s],ure:[3,4,7,11,15][s],k:[2,2,2,4,6][s],p:[2,2,2,4,6][s],h:[2,2,2,4,6][s]};
 const cols=10,rws=4,cw=L/cols,ch=(yB-yT)/rws,cells=[...Array(cols*rws).keys()].sort((a,b)=>rnd(a+3)-rnd(b+3));
 let k=0,parts="";const put=(nn,f)=>{for(let i=0;i<nn;i++,k++){const c=cells[k%cells.length],px=(x0+(c%cols+.5)*cw+(rnd(c+50)-.5)*cw*.5).toFixed(1),py=(yT+(Math.floor(c/cols)+.5)*ch+(rnd(c+90)-.5)*ch*.5).toFixed(1);parts+=f(+px,+py)}};
 put(n.rbc,(x,y)=>`<circle cx="${x}" cy="${y}" r="5.5" fill="${C.rbc}" opacity=".85"/><circle cx="${x}" cy="${y}" r="2" fill="var(--paper)" opacity=".5"/>`);
 put(n.ure,(x,y)=>`<circle cx="${x}" cy="${y}" r="2.6" fill="${C.ure}"/>`);
 put(n.k,(x,y)=>`<rect x="${x-2.8}" y="${y-2.8}" width="5.6" height="5.6" rx="1" fill="${C.k}"/>`);
 put(n.p,(x,y)=>`<path d="M${x} ${y-3.5}l3.5 6.5h-7z" fill="${C.p}"/>`);
 put(n.h,(x,y)=>`<path d="M${x} ${y-3.5}l3.5 3.5l-3.5 3.5l-3.5-3.5z" fill="${C.h}"/>`);
 const flow=`<defs><clipPath id="vas"><rect x="${x0}" y="${yT}" width="${L}" height="${yB-yT}" rx="18"/></clipPath></defs>
 <rect x="${x0}" y="${yT}" width="${L}" height="${yB-yT}" rx="18" fill="${C.glo}" opacity=".1" stroke="${C.glo}" stroke-width="1.4"/>
 <g clip-path="url(#vas)"><g><animateTransform attributeName="transform" type="translate" values="0 0;${L} 0" dur="4s" repeatCount="indefinite"/>${parts}<g transform="translate(${-L} 0)">${parts}</g></g></g>`;
 // pannello dei valori
 const rows=[["Urea e creatinina",[.3,.4,.56,.78,.95],1],["Potassio (K⁺)",[.3,.3,.33,.52,.74],1],["Fosforo",[.3,.3,.34,.52,.74],1],["Acidi nel sangue",[.3,.3,.35,.55,.76],1],["Globuli rossi",[.6,.6,.48,.4,.3],-1]];
 const bx=232,bw=140;let pan="";
 rows.forEach((r,i)=>{const y=50+i*38,v=r[1][s],up=r[2]>0;
  const lev=up?(v>.65?2:v>.42?1:0):(v<.36?2:v<.5?1:0),col=["var(--ok)","var(--amber)","var(--vital)"][lev];
  const word=lev?(up?(lev>1?"↑↑":"↑"):(lev>1?"↓↓":"↓")):"normale";
  const band=up?[.18,.42]:[.5,.72];
  pan+=`<text x="${bx}" y="${y}" class="ft fsm">${r[0]}</text>
  <rect x="${bx}" y="${y+5}" width="${bw}" height="9" rx="2" class="eyrow"/>
  <rect x="${(bx+band[0]*bw).toFixed(1)}" y="${y+5}" width="${((band[1]-band[0])*bw).toFixed(1)}" height="9" class="band"/>
  <rect x="${bx}" y="${y+7}" width="${(v*bw).toFixed(1)}" height="5" rx="1" fill="${col}"/>
  <text x="${bx+bw+8}" y="${y+13}" class="ft fsm">${word}</text>`});
 return head(`Sangue nello stadio ${ST[s]}: ${s<2?"valori ancora nella norma":"aumentano scorie"+(s>=3?", potassio, fosforo e acidi":"")+"; meno eritropoietina e meno globuli rossi"}`,
 `<text x="20" y="24" class="ft fb">Nel sangue</text><text x="20" y="46" class="ft fsm">vaso sanguigno, il sangue scorre →</text><text x="232" y="24" class="ft fb">Valori (schema)</text><text x="232" y="${H-12}" class="ft fsm">Banda verde: intervallo normale</text>
 <path d="M216 36V${H-8}" class="lead"/>${flow}
 <text x="20" y="${yB+22}" class="ft fsm">Scorie trattenute: ${["poche","appena di più","di più","molte","moltissime"][s]}</text>
 <text x="20" y="${yB+38}" class="ft fsm">Eritropoietina dal rene: ${["adeguata","adeguata","ridotta","ridotta","molto ridotta"][s]}</text>
 ${pan}`)};

/* Livello 3: organismo (pressione, edemi, prurito, nausea, anemia, dialisi) */
const org=s=>{const t=s/4,cx=150,body="color-mix(in srgb,var(--ink) 11%,var(--paper))";
 const kd=R(1,.68,t);
 const kid=(x,f)=>`<path d="M${x} ${116-11*kd}c${f*9*kd} 0 ${f*9*kd} ${22*kd} 0 ${22*kd}c${-f*5*kd} 0 ${-f*2*kd} ${-7*kd} ${-f*1*kd} ${-11*kd}c${f*1*kd} ${-4*kd} ${-f*4*kd} ${-11*kd} ${f*1*kd} ${-11*kd}z" fill="#b5534f" opacity=".75"/>`;
 const ed=s>=2?R(0,1,(s-1)/3):0;
 const edema=ed?[cx-14,cx+14].map(x=>`<ellipse cx="${x}" cy="212" rx="${(8+4*ed).toFixed(1)}" ry="${(5+3*ed).toFixed(1)}" fill="${C.fil}" opacity="${(.25+.3*ed).toFixed(2)}"/>`).join(""):"";
 const amp=R(.08,.18,t).toFixed(2);
 const heart=`<g style="transform-origin:${cx+8}px 94px;transform-box:view-box"><g><animateTransform attributeName="transform" type="scale" additive="sum" values="1;${1+ +amp};1;1" keyTimes="0;.15;.3;1" dur="1s" repeatCount="indefinite"/><path d="M${cx+8} 100c-9-6-12-10-9-14c2-3 7-3 9 1c2-4 7-4 9-1c3 4 0 8-9 14z" fill="${C.glo}"/></g></g>`;
 const itch=s>=3?`<g stroke="#e0425a" stroke-width="1.6" stroke-linecap="round" opacity="${s>3?1:.7}"><animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/><path d="M193 121l9-4M195 128l9-4M197 135l9-4"/></g>`:"";
 const naus=s>=3?`<path d="M168 36q4-4 8 0t8 0M168 44q4-4 8 0t8 0" fill="none" stroke="var(--muted)" stroke-width="1.6" opacity="${s>3?1:.7}"/>`:"";
 const fist=s>=3?`<circle cx="103" cy="134" r="4" fill="none" stroke="var(--vital)" stroke-width="1.6"/><text x="98" y="120" class="ft fsm" text-anchor="end">fistola</text>`:"";
 const dial=s===4?`<rect x="16" y="104" width="44" height="66" rx="2" class="fbx"/><text x="38" y="118" class="ft fsm" text-anchor="middle">dialisi</text>
  <rect x="30" y="124" width="16" height="34" rx="6" fill="none" stroke="var(--ink)" stroke-width="1.2"/><path d="M30 132h16M30 141h16M30 150h16" class="lead"/>
  <path d="M101 131C88 126 76 132 60 132" fill="none" stroke="${C.rbc}" stroke-width="2.2"/><path d="M60 150C80 150 90 142 104 138" fill="none" stroke="${C.fil}" stroke-width="2.2"/>
  ${[0,1].map(i=>`<circle class="anm" r="2.4" fill="${C.rbc}"><animateMotion path="M101 131C88 126 76 132 60 132" dur="2s" begin="${-i}s" repeatCount="indefinite"/></circle><circle class="anm" r="2.4" fill="${C.fil}"><animateMotion path="M60 150C80 150 90 142 104 138" dur="2s" begin="${-(i+.5)}s" repeatCount="indefinite"/></circle>`).join("")}`:"";
 const fig=`<circle cx="${cx}" cy="44" r="15" fill="${body}"/><rect x="${cx-6}" y="57" width="12" height="10" fill="${body}"/>
 <path d="M${cx-32} 68Q${cx} 62 ${cx+32} 68L${cx+36} 142Q${cx} 150 ${cx-36} 142Z" fill="${body}"/>
 <path d="M${cx-30} 72L${cx-42} 110L${cx-48} 150M${cx+30} 72L${cx+42} 110L${cx+48} 150M${cx-14} 144L${cx-14} 222M${cx+14} 144L${cx+14} 222" fill="none" stroke="${body}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
 ${kid(cx-16,-1)}${kid(cx+16,1)}`;
 const L=[["Nausea, poco appetito",["assente","assente","rara","possibile","frequente"],[0,0,0,1,2],[184,40]],
  ["Pressione alta",["possibile","frequente","frequente","quasi sempre","quasi sempre"],[1,1,1,2,2],[176,94]],
  ["Stanchezza (anemia)",["rara","rara","possibile","frequente","frequente"],[0,0,1,2,2],null],
  ["Prurito",["assente","assente","raro","possibile","frequente"],[0,0,0,1,2],[206,124]],
  ["Edemi",["di solito assenti","di solito assenti","possibili","frequenti","frequenti"],[0,0,1,2,2],[180,214]],
  ["Dialisi o trapianto",["non serve","non serve","non serve","si prepara","spesso necessari"],[0,0,0,1,2],null]];
 let rows="";L.forEach((r,i)=>{const y=40+i*34,lev=r[2][s];
  if(r[3])rows+=`<path d="M246 ${y-4}L${r[3][0]} ${r[3][1]}" class="lead" stroke-dasharray="${lev?"0":"2 3"}"/>`;
  rows+=`<rect x="250" y="${y-9}" width="9" height="9" rx="2" class="${["k-ok","k-warn","k-alarm"][lev]}"/>
  <text x="264" y="${y}" class="ft">${r[0]}</text><text x="264" y="${y+13}" class="ft fsm">${r[1][s]}</text>`});
 return head(`Organismo nello stadio ${ST[s]}: ${["di solito nessun sintomo","pochi sintomi, pressione da controllare","pressione alta, possibili edemi e anemia","edemi, prurito e nausea possibili, si prepara la terapia sostitutiva","sindrome uremica, terapia sostitutiva, per esempio emodialisi dalla fistola al braccio"][s]}`,
 `<text x="20" y="24" class="ft fb">Organismo</text>${fig}${edema}${heart}${itch}${naus}${fist}${dial}${rows}`)};

const V=["eGFR ≥ 90 ml/min/1,73 m²","eGFR 60-89","eGFR 30-59 (G3a 45-59, G3b 30-44)","eGFR 15-29","!eGFR < 15"];
SIM.push({id:"sim-insufficienza-renale",enc:["insufficienza-renale"],t:"Simulatore: la malattia renale cronica stadio per stadio",d:"Scegli lo stadio KDIGO del filtrato glomerulare (G1-G5) e il livello da osservare. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["G1 normale","G2 lieve calo","G3 calo moderato","G4 calo grave","G5 insufficienza renale"],dur:"4s",
 livelli:[
  {t:"Nefrone",sub:"glomeruli",svg:nef,val:V,
   testo:["Il filtrato è normale ma c'è già un segno di danno renale, spesso albumina nelle urine (proteinuria): per parlare di malattia renale cronica deve durare più di 3 mesi.","Alcuni glomeruli si cicatrizzano (sclerosi). I nefroni rimasti si ingrandiscono e filtrano di più per compensare: il filtrato totale cala di poco.","Molti nefroni non lavorano più. Nei glomeruli residui pressione e filtrato aumentano (iperfiltrazione): il sovraccarico li danneggia e passa più albumina.","Restano pochi nefroni, ciascuno sovraccarico, e la sclerosi si estende: è un circolo vizioso che fa progredire la malattia.","Pochissimi nefroni ancora attivi: il filtrato non basta più a depurare il sangue. Il danno è irreversibile."]},
  {t:"Sangue",sub:"esami",svg:san,val:V,
   testo:["Il rene elimina ancora bene scorie, potassio, fosforo e acidi e produce abbastanza eritropoietina: gli esami del sangue sono normali.","Urea e creatinina possono salire appena; gli altri valori di solito restano normali.","Urea e creatinina aumentano. Il rene produce meno eritropoietina e può comparire anemia; salgono gli ormoni che regolano il fosforo (PTH). In G3b possono iniziare iperpotassiemia, acidosi e aumento del fosforo.","Il rene non elimina più abbastanza potassio, fosforo e acidi: diventano frequenti iperpotassiemia, iperfosforemia e acidosi metabolica (bicarbonato basso). L'anemia peggiora.","Scorie molto alte (uremia), iperpotassiemia che può dare aritmie pericolose, acidosi e anemia marcate: il medico valuta la terapia sostitutiva (dialisi o trapianto), che si inizia quando compaiono sintomi o complicanze, non per il solo valore di eGFR."]},
  {t:"Organismo",sub:"sintomi",svg:org,val:V,
   testo:["Di solito nessun sintomo: la malattia si scopre con gli esami. L'ipertensione può esserci già, come causa o come conseguenza.","Ancora pochi sintomi. Controllare pressione e glicemia (ipertensione e diabete sono le cause più frequenti) rallenta la progressione.","Il rene trattiene sodio e acqua: la pressione sale e possono comparire edemi. L'anemia dà stanchezza.","Edemi e ipertensione più difficili da controllare; possono comparire prurito, nausea e poco appetito. Si prepara la terapia sostitutiva, per esempio la fistola artero-venosa.","Sindrome uremica: nausea, prurito, stanchezza, rischio di edema polmonare e iperpotassiemia. Si decide la terapia sostitutiva (dialisi o trapianto) o, in alcuni casi, una terapia conservativa; sul braccio della fistola non si misura la pressione e non si fanno prelievi."]}],
 legenda:[["#d9637b","Glomerulo e vasi"],["var(--muted)","Glomerulo sclerotico"],["#3aa0d8","Filtrato e liquidi"],["#f0a23a","Albumina"],["#c62f45","Globuli rossi"],["#9c6b3c","Urea e creatinina"],["#2e9e5b","Potassio"],["#8e63c9","Fosforo"],["#d46bb5","Acidi (H⁺)"]],
 n:"KDIGO 2024 sulla malattia renale cronica (Kidney Int 2024; PMID 38490803), stadi G come nella voce es-creatinina dell'Atlante; Moranne O et al. J Am Soc Nephrol 2009 (PMID 19005010); Cooper BA et al. N Engl J Med 2010, studio IDEAL (PMID 20581422)."});
})();

/* ---- Cirrosi epatica ---- */

/* ---- Cirrosi epatica (disegno originale) ---- */
(function(){
const W=440,H=250,R=(a,b,t)=>a+(b-a)*t,cl=x=>Math.max(0,Math.min(1,x)),f=n=>+n.toFixed(1);
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
// colori semantici
const EP="#c98a5e",EPS="#a8683e",FAT="#f3dc7a",FATS="#c9a227",STL="#e0662e",STQ="#e0a030",COL="#3f9e97",VEN="#6b5fb5",ART="#d9637b",BIL="#3aa55d",LIV="#b5524a",ASC="#4ea3d8",GIA="#e8c020";
// grandezze per stadio (0 sano … 4 scompensata)
const FAT_=[0,1,.8,.55,.35],FIB_=[0,0,.5,1,1],NOD_=[0,0,0,1,1],PRE_=[0,0,.25,.65,1],VAR_=[0,0,0,.6,1],SPL_=[0,0,.15,.6,1],SC_=[1,1.1,1.04,.9,.78];
const STADIO=["fegato sano","steatosi","fibrosi","cirrosi compensata","cirrosi scompensata"];
const liverPath=(cx,cy,rx,ry,nod)=>{let d="";for(let i=0;i<=96;i++){const a=i/96*6.2832,x=Math.cos(a),y=Math.sin(a),nx=(x+1)/2,fy=(1-.55*nx)*(y<0?.8:1),b=1+nod*.06*(Math.abs(Math.sin(9*a))-.6);d+=(i?"L":"M")+f(cx+rx*x*b)+" "+f(cy+ry*y*fy*b)}return d+"Z"};

/* Livello 1: lobulo e sinusoide */
const lob=s=>{const t=s/4,cx=118,cy=132,Rh=86,ap=Rh*Math.cos(Math.PI/6),fat=FAT_[s],fib=FIB_[s],nod=NOD_[s],sw=[0,0,2.6,4,6.5][s];
 const V=[...Array(6)].map((_,k)=>[cx+Rh*Math.cos(k*Math.PI/3),cy+Rh*Math.sin(k*Math.PI/3)]);
 const hex="M"+V.map(p=>f(p[0])+" "+f(p[1])).join("L")+"Z";
 const edge=a=>{const m=((a%60)+60)%60;return ap/Math.cos((m-30)*Math.PI/180)};
 let cords="";for(let i=0;i<18;i++){const a=i*20+10,r=a*Math.PI/180,d=edge(a)-7;cords+=`<path d="M${f(cx+15*Math.cos(r))} ${f(cy+15*Math.sin(r))}L${f(cx+d*Math.cos(r))} ${f(cy+d*Math.sin(r))}" stroke="${EP}" stroke-width="7" stroke-dasharray="7 1.6" opacity="${f(.75*(1-nod))}" fill="none"/>`}
 let fl="";const nfl=[6,6,6,3,3][s];for(let i=0;i<nfl;i++){const a=(i*360/nfl+20)*Math.PI/180,d=edge(i*360/nfl+20)-6;fl+=`<circle class="anm" r="2.2" fill="${ART}"><animateMotion path="M${f(cx+d*Math.cos(a))} ${f(cy+d*Math.sin(a))}L${f(cx+10*Math.cos(a))} ${f(cy+10*Math.sin(a))}" dur="${f(R(3,6,t))}s" begin="-${f(i*.6)}s" repeatCount="indefinite"/></circle>`}
 const NODS=[[28,-34,24],[58,14,15],[-28,34,24],[-58,-14,15]];let fd="";const nf=Math.round(26*fat);for(let i=0;i<nf;i++){const a=rnd(i+3)*6.2832,r=R(18,68,rnd(i+17)),px=r*Math.cos(a),py=r*Math.sin(a);if(nod&&!NODS.some(([dx,dy,q])=>Math.hypot(px-dx,py-dy)<q-6))continue;fd+=`<circle cx="${f(cx+r*Math.cos(a))}" cy="${f(cy+r*Math.sin(a))}" r="${f(R(2.5,5.5,rnd(i+31)))}" fill="${FAT}" stroke="${FATS}" stroke-width=".8"/>`}
 let sep="";if(fib>0){for(let k=0;k<6;k++){const A=V[k],B=V[(k+1)%6],h=fib*.5;sep+=`<path d="M${f(A[0])} ${f(A[1])}L${f(R(A[0],B[0],h))} ${f(R(A[1],B[1],h))}M${f(B[0])} ${f(B[1])}L${f(R(B[0],A[0],h))} ${f(R(B[1],A[1],h))}" stroke="${COL}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`}
  const bf=Math.min(1,fib*1.1);[1,4].forEach(k=>{sep+=`<path d="M${f(V[k][0])} ${f(V[k][1])}L${f(R(V[k][0],cx,bf))} ${f(R(V[k][1],cy,bf))}" stroke="${COL}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`})}
 let nd="";if(nod>0){const rr=s===4?.82:1;NODS.forEach(([dx,dy,r],j)=>{const x=cx+dx,y=cy+dy,q=r*rr;let c="";for(let gx=-q;gx<=q;gx+=7)for(let gy=-q;gy<=q;gy+=7){const ox=gx+((gy/7)%2?3.5:0);if(Math.hypot(ox,gy)<q-5)c+=`<rect x="${f(x+ox-2.8)}" y="${f(y+gy-2.8)}" width="5.6" height="5.6" rx="1.2" fill="${EP}" opacity=".85"/>`}
  nd+=`<circle cx="${x}" cy="${y}" r="${f(q)}" fill="${EP}" opacity=".25"/>${c}<circle cx="${x}" cy="${y}" r="${f(q+sw/2)}" fill="none" stroke="${COL}" stroke-width="${sw}"/>`})}
 const star=(x,y,act)=>{const L=act?7:3.5,c=act?STL:STQ;return `<path d="M${x-L} ${y}L${x+L} ${y}M${x} ${y-L*.6}L${x} ${y+L*.6}M${x-L*.7} ${y-L*.5}L${x+L*.7} ${y+L*.5}" stroke="${c}" stroke-width="${act?1.6:1.2}" fill="none"/><circle cx="${x}" cy="${y}" r="${act?2.6:1.8}" fill="${c}"/>`};
 const act=s>=2;let st="";if(nod<1)[[cx-52,cy-30],[cx+46,cy+38],[cx-20,cy+60],[cx+16,cy-58],[cx+62,cy-10],[cx-60,cy+20]].forEach(p=>st+=star(p[0],p[1],act));
 const tri=V.map(p=>`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="4.6" fill="${VEN}"/><circle cx="${f(p[0]+5)}" cy="${f(p[1]-4)}" r="2.4" fill="${ART}"/><circle cx="${f(p[0]-5)}" cy="${f(p[1]-4)}" r="2.2" fill="${BIL}"/>`).join("");
 // riquadro ingrandito
 const X0=252,X1=428,Y0=40,Y1=206,dz=R(5,14,fib),yt=Y0+46+dz,yb=Y1-46-dz,ym=(yt+yb)/2,fen=1-fib;
 let hep="";[Y0+6,Y1-46].forEach((y,row)=>{for(let k=0;k<4;k++){const x=X0+4+k*43.5,w=40,fr=15*fat,hx=x+w/2,hy=y+20;hep+=`<rect x="${f(x)}" y="${y}" width="${w}" height="40" rx="3" fill="${EP}" opacity=".55" stroke="${EPS}" stroke-width=".8"/>`;
  if(fr>0)hep+=`<circle cx="${f(hx-3)}" cy="${hy}" r="${f(fr)}" fill="${FAT}" stroke="${FATS}" stroke-width=".8"/>`;
  hep+=`<circle cx="${f(fr>4?x+w-7:hx)}" cy="${f(fr>4?hy+row*0+(k%2?-8:8):hy)}" r="4.2" fill="#7a4a2e" opacity=".85"/>`}});
 const dis=`<rect x="${X0}" y="${Y0+46}" width="${X1-X0}" height="${f(dz)}" fill="${COL}" opacity="${f(R(.1,.8,fib))}"/><rect x="${X0}" y="${f(yb)}" width="${X1-X0}" height="${f(dz)}" fill="${COL}" opacity="${f(R(.1,.8,fib))}"/>`;
 const da=fen>0?`stroke-dasharray="${f(8+(1-fen)*20)} ${f(4*fen)}"`:"";
 const endo=`<path d="M${X0} ${f(yt)}H${X1}M${X0} ${f(yb)}H${X1}" stroke="var(--muted)" stroke-width="1.6" ${da} fill="none"/>`;
 const lum=`<rect x="${X0}" y="${f(yt)}" width="${X1-X0}" height="${f(yb-yt)}" fill="${ART}" opacity=".1"/>`;
 const sc=(x,y,a)=>{if(!a)return `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.4" fill="${STQ}"/><circle cx="${x-2}" cy="${y}" r="1.1" fill="${FAT}"/><circle cx="${x+2}" cy="${y}" r="1.1" fill="${FAT}"/>`;
  let fb="";for(let i=0;i<4;i++)fb+=`<path d="M${x-26+i*14} ${f(y-1.5+i%2*3)}h12" stroke="${COL}" stroke-width="1.2"/>`;return fb+`<ellipse cx="${x}" cy="${y}" rx="9" ry="3.4" fill="${STL}"/><path d="M${x-9} ${y}l-8 -2M${x+9} ${y}l8 2" stroke="${STL}" stroke-width="1.4"/>`};
 const rbc=[0,1,2].map(i=>`<circle class="anm" r="4" fill="${ART}" opacity=".85"><animateMotion path="M${X0+6} ${f(ym)}H${X1-6}" dur="${f(R(2.6,5,t))}s" begin="-${f(i*R(.9,1.7,t))}s" repeatCount="indefinite"/></circle>`).join("");
 const IX=cx+20,IY=cy-10;
 return head(`Lobulo epatico, ${STADIO[s]}: ${["lamine di epatociti ordinate dalle triadi portali alla vena centrale","gocce di grasso negli epatociti","cellule stellate attivate e setti fibrosi tra le triadi","noduli di rigenerazione circondati da setti fibrosi","noduli piccoli e setti spessi, pochi epatociti funzionanti"][s]}`,
 `<text x="14" y="24" class="ft fb">Lobulo epatico</text><text x="340" y="30" class="ft fb" text-anchor="middle">Sinusoide ingrandito</text>
 <path d="${hex}" class="eyrow"/>${nod?`<path d="${hex}" fill="${COL}" opacity=".16"/>`:""}${cords}${fl}${nd}${sep}${fd}${st}
 <circle cx="${cx}" cy="${cy}" r="8" fill="${VEN}" opacity="${nod?.35:.7}" stroke="${VEN}"/>${tri}
 <text x="${f(V[5][0]+10)}" y="${f(V[5][1]-4)}" class="ft fsm">Triade portale</text>
 <rect x="${IX}" y="${IY}" width="24" height="14" fill="none" stroke="var(--ink)" stroke-width="1"/><path d="M${IX+24} ${IY}L${X0} ${Y0}M${IX+24} ${IY+14}L${X0} ${Y1}" class="lead" stroke-dasharray="3 3"/>
 <rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}" class="ff" stroke="var(--line)"/>${hep}${dis}${lum}${endo}${rbc}${sc(318,f(Y0+46+dz/2),act)}${sc(384,f(yb+dz/2),act)}
 <text x="14" y="${H-12}" class="ft fsm">${["Lamine ordinate verso la vena centrale","Gocce di grasso negli epatociti","Setti fibrosi uniscono le triadi","Noduli circondati da setti","Noduli piccoli, setti spessi"][s]}</text>
 <text x="${X0}" y="${H-26}" class="ft fsm">Cellula stellata: ${act?"attivata, fa collagene":"quiescente"}</text>
 <text x="${X0}" y="${H-12}" class="ft fsm">Endotelio: ${["fenestrato","fenestrato","fenestre ridotte","fenestre perse","fenestre perse"][s]}</text>`)};

/* Livello 2: fegato e circolo portale */
const por=s=>{const t=s/4,p=PRE_[s],vr=VAR_[s],sp=SPL_[s],sc=SC_[s],fat=FAT_[s],nod=NOD_[s];
 const lcx=118,lcy=80,rx=95*sc,ry=46*sc,lp=liverPath(lcx,lcy,rx,ry,nod),hx=130,hy=f(lcy+ry*.66);
 let nds="";if(nod)for(let i=0;i<12;i++){const a=rnd(i+40)*6.2832,r=R(.15,.7,rnd(i+50));nds+=`<circle cx="${f(lcx-20+rx*.7*r*Math.cos(a))}" cy="${f(lcy+ry*.55*r*Math.sin(a))}" r="${f(R(4,7,rnd(i+60))*sc)}" fill="none" stroke="#7a2e28" stroke-width="1.1" opacity=".8"/>`}
 const scx=398,scy=128,srx=R(22,34,sp),sry=R(34,52,sp),shx=f(scx-srx*.8);
 const pw=f(R(9,15,p)),spl=`M${shx} 140C320 178 250 186 190 186`,col="M232 184C250 160 262 128 280 112L287 98";
 let vx="";if(vr>0){const a=R(2,5,vr);let d="M287 98";for(let y=98,i=0;y>34;y-=8,i++)d+=`Q${i%2?287+a*1.6:287-a*1.6} ${y-4} 287 ${y-8}`;vx=`<path d="${d}" stroke="${VEN}" stroke-width="${f(R(2,5,vr))}" fill="none" stroke-linecap="round"/>`}
 const dot=(path,n,dur,c)=>[...Array(n)].map((_,i)=>`<circle class="anm" r="3" fill="${c||"var(--scrub)"}"><animateMotion path="${path}" dur="${f(dur)}s" begin="-${f(i*dur/n)}s" repeatCount="indefinite"/></circle>`).join("");
 const dmain=dot(`${spl}L${hx} ${hy}`,s>=3?3:4,R(3.5,6.5,p)),dsmv=dot(`M190 244V186L${hx} ${hy}`,2,R(2.4,4.5,p)),dcol=vr>0?dot(`${col}V36`,s===4?3:2,3.2):"";
 const ble=s===4?`<path d="M292 62q6 8 0 11q-6 -3 0 -11z" fill="#e0425a"/><path d="M283 78q5 7 0 10q-5 -3 0 -10z" fill="#e0425a"/><circle class="anm" r="2.6" fill="#e0425a"><animateMotion path="M287 66V96" dur="1.6s" repeatCount="indefinite"/></circle>`:"";
 const gc=p<.3?"#3aa55d":p<.8?"#e0a030":"#e0425a";
 return head(`Fegato e circolo portale, ${STADIO[s]}: ${["pressione portale normale, tutto il sangue portale attraversa il fegato","fegato ingrandito e giallastro, flusso normale","pressione portale in aumento","ipertensione portale: possibili collaterali, varici esofagee e milza ingrandita","ipertensione portale grave, varici che sanguinano, fegato piccolo e nodulare"][s]}`,
 `<text x="14" y="18" class="ft fb">Fegato e circolo portale</text>
 <path d="${lp}" fill="${LIV}" opacity=".75" stroke="#8a3a33"/>${fat&&s<3?`<path d="${lp}" fill="${GIA}" opacity="${f(fat*.45)}"/>`:""}${nds}
 <rect x="280" y="26" width="14" height="74" rx="4" fill="#e2a3a0" opacity=".45" stroke="#c27770"/>
 <path d="M286 98C318 86 350 104 346 140C342 172 300 180 280 166C268 156 276 142 292 136C300 128 296 112 286 98Z" fill="#e2a3a0" opacity=".45" stroke="#c27770"/>
 <ellipse cx="${scx}" cy="${scy}" rx="${f(srx)}" ry="${f(sry)}" fill="#8e3b5b" opacity=".7" stroke="#6e2a45"/>
 <path d="${col}" stroke="${VEN}" stroke-width="${f(R(1.5,5,vr))}" fill="none" stroke-linecap="round" opacity=".85"/>${vx}
 <path d="${spl}" stroke="${VEN}" stroke-width="${f(R(6,10,p))}" fill="none" stroke-linecap="round" opacity=".8"/>
 <path d="M190 244V186" stroke="${VEN}" stroke-width="8" fill="none" opacity=".8"/>
 <path d="M190 186L${hx} ${hy}" stroke="${VEN}" stroke-width="${pw}" fill="none" stroke-linecap="round" opacity=".8"/>
 ${dsmv}${dmain}${dcol}${ble}
 <text x="14" y="146" class="ft fsm">Fegato${["",", ingrandito",""," nodulare",", piccolo e nodulare"][s]}</text>
 <text x="152" y="170" class="ft fsm" text-anchor="end">Vena porta</text>
 <text x="182" y="242" class="ft fsm" text-anchor="end">Vena mesenterica superiore</text>
 <text x="300" y="204" class="ft fsm" text-anchor="middle">Vena splenica</text>
 <text x="316" y="152" class="ft fsm" text-anchor="middle">Stomaco</text>
 <text x="${scx}" y="${f(scy+sry+14)}" class="ft fsm" text-anchor="middle">Milza${sp>.5?" grande":""}</text>
 <text x="300" y="36" class="ft fsm">Esofago</text>${vr?`<text x="300" y="50" class="ft fsm">Varici esofagee</text>`:""}${s===4?`<text x="300" y="64" class="ft fsm">rottura: emorragia</text>`:""}
 ${s>=3?`<text x="250" y="132" class="ft fsm" text-anchor="end">collaterali</text>`:""}
 <text x="20" y="190" class="ft fsm">Pressione portale: ${["normale","normale","in aumento","alta","molto alta"][s]}</text>
 <rect x="20" y="196" width="130" height="8" class="eyrow"/><rect x="20" y="196" width="${f(R(18,130,p))}" height="8" fill="${gc}" opacity=".85"/>`)};

/* Livello 3: organismo */
const org=s=>{const t=s/4,dec=s===4,asc=dec?1:0,b=asc*14,jau=dec?1:0,sp=SPL_[s],sc=SC_[s],nod=NOD_[s],vr=VAR_[s];
 const torso=`M182 72Q220 62 258 72C262 110 ${258+b} 140 ${256+b} 170C${f(256+b*.8)} 192 250 204 246 214L194 214C190 204 ${f(184-b*.8)} 192 ${184-b} 170C${182-b} 140 178 110 182 72Z`;
 const body=(fill,op)=>`<g opacity="${op}"><g fill="${fill}"><circle cx="220" cy="40" r="19"/><rect x="212" y="56" width="16" height="12"/><path d="${torso}"/><rect x="196" y="212" width="20" height="36" rx="4"/><rect x="224" y="212" width="20" height="36" rx="4"/></g><g stroke="${fill}" stroke-width="12" stroke-linecap="round" fill="none"><path d="M184 78L167 168"/><path d="M256 78L273 168"/></g></g>`;
 const hand=`<g><rect x="268" y="168" width="11" height="16" rx="4" fill="#d9a27a" opacity=".8"/>${jau?`<rect x="268" y="168" width="11" height="16" rx="4" fill="${GIA}" opacity=".5"/>`:""}${dec?`<animateTransform attributeName="transform" type="rotate" values="0 273 168;-28 273 168;0 273 168;0 273 168" keyTimes="0;.15;.3;1" dur="1.4s" repeatCount="indefinite"/>`:""}</g>`;
 const eyes=[213,227].map(x=>`<circle cx="${x}" cy="38" r="3.2" fill="${jau?GIA:"#ffffff"}" stroke="#7a4a2e" stroke-width=".6"/><circle cx="${x}" cy="38" r="1.2" fill="#3b3346"/>`).join("");
 const brain=`<path d="M205 33C203 20 213 23 220 24C227 23 237 20 235 33C228 30 212 30 205 33Z" fill="${dec?"#9b6bd0":"#c98bb0"}" opacity=".8"/><path d="M212 27q3 3 0 5M220 25v6M228 27q-3 3 0 5" stroke="#6e3f78" stroke-width=".8" fill="none"/>`;
 const gut=`<path d="M200 182q6 -10 12 0t12 0t12 0t12 0M202 196q6 -10 12 0t12 0t12 0" class="lead"/>`;
 const asF=asc?`<path d="M${184-b+4} 150C${184-b} 190 200 206 220 206C240 206 ${256+b} 190 ${256+b-4} 150Z" fill="${ASC}" opacity=".45"/>`:"";
 const lv=`<path d="${liverPath(208,112,26*sc,13*sc,nod)}" fill="${LIV}" opacity=".85" stroke="#8a3a33"/>`;
 const spl=`<ellipse cx="244" cy="116" rx="${f(R(4,9,sp))}" ry="${f(R(7,12,sp))}" fill="#8e3b5b" opacity=".75"/>`;
 const eso=`<path d="M220 60V100" stroke="#c27770" stroke-width="4" fill="none" opacity=".8"/>${vr?`<path d="M220 100q-${f(3*vr)} -4 0 -8t0 -8t0 -8t0 -8" stroke="${VEN}" stroke-width="${f(R(2,3.5,vr))}" fill="none"/>`:""}${dec?`<circle cx="223" cy="82" r="4" fill="#e0425a"/><circle class="anm" r="2.2" fill="#e0425a"><animateMotion path="M223 84V104" dur="1.6s" repeatCount="indefinite"/></circle>`:""}`;
 const bru=dec?`<ellipse cx="270" cy="124" rx="5" ry="3.5" fill="#7b4fa0" opacity=".7"/><ellipse cx="172" cy="140" rx="4.5" ry="3" fill="#7b4fa0" opacity=".7"/>`:"";
 const nh=(path,n,dur)=>[...Array(n)].map((_,i)=>`<circle class="anm" r="3.2" fill="#3aa55d" stroke="var(--paper)" stroke-width="1"><animateMotion path="${path}" dur="${dur}s" begin="-${f(i*dur/n)}s" repeatCount="indefinite"/></circle>`).join("");
 const amm=nh("M222 186C220 160 214 140 210 118",2,2.6)+(dec?nh("M232 186C268 150 262 70 226 32",3,3.6):"");
 const C=["var(--muted)","#e0a030","#e0425a"];
 const items=[["Encefalopatia",14,48,206,34,[[0,"assente"],[0,"assente"],[0,"assente"],[0,"non evidente"],[2,"confusione, asterixis"]]],
  ["Varici esofagee",14,108,218,86,[[0,"assenti"],[0,"assenti"],[0,"assenti"],[1,"presenti, rischio"],[2,"sanguinano"]]],
  ["Ascite",14,168,196,176,[[0,"assente"],[0,"assente"],[0,"assente"],[0,"assente"],[2,"addome disteso"]]],
  ["Ittero",300,48,229,38,[[0,"assente"],[0,"assente"],[0,"assente"],[0,"assente"],[2,"cute e sclere gialle"]]],
  ["Coagulopatia",300,108,272,124,[[0,"assente"],[0,"assente"],[0,"assente"],[0,"di solito assente"],[2,"INR alto, piastrine basse"]]],
  ["Funzione epatica",300,168,226,114,[[0,"normale"],[0,"conservata"],[0,"conservata"],[1,"ancora sufficiente"],[2,"insufficiente"]]]];
 const lab=items.map(([n,x,y,tx,ty,v])=>{const [l,w]=v[s],left=x<100,ex=left?150:294;return `<path d="M${ex} ${y-4}L${tx} ${ty}" class="lead" stroke-dasharray="2 3"${l?"":` opacity=".5"`}/><circle cx="${left?x+5:x+5}" cy="${y-4}" r="5" fill="${C[l]}"/><text x="${x+14}" y="${y}" class="ft fb">${n}</text><text x="${x+14}" y="${y+14}" class="ft fsm">${w}</text>`}).join("");
 return head(`Organismo, ${STADIO[s]}: ${dec?"ascite, ittero, encefalopatia con asterixis, ecchimosi ed emorragia da varici":s===3?"nessun segno di scompenso, ma milza ingrandita e varici":"nessun segno clinico evidente"}`,
 `${body("#d9a27a",".55")}${jau?body(GIA,".45"):""}${asF}${gut}${lv}${spl}${eso}${brain}${eyes}${bru}${hand}${amm}${lab}
 <text x="14" y="18" class="ft fb">Organismo: segni e complicanze</text>
 <text x="14" y="${H-26}" class="ft fsm">Pallini verdi: ammoniaca (NH₃)</text><text x="14" y="${H-12}" class="ft fsm">${dec?"supera il fegato e va al cervello":"il fegato la trasforma in urea"}</text>`)};

SIM.push({id:"sim-epatopatie",enc:["epatopatie"],t:"Simulatore: dal fegato sano alla cirrosi scompensata",d:"Scegli lo stadio della malattia e il livello da osservare, dal lobulo all'organismo intero. Il disegno è schematico: le proporzioni servono a capire, non a misurare.",
 stadi:["Sano","Steatosi","Fibrosi","Cirrosi compensata","Cirrosi scompensata"],dur:"4s",
 livelli:[
  {t:"Lobulo epatico",sub:"epatociti e sinusoidi",svg:lob,
   val:["Architettura normale","Grasso negli epatociti","Fibrosi a ponte","Noduli di rigenerazione","Noduli e setti spessi"],
   testo:["Gli epatociti formano lamine che vanno dalle triadi portali (vena porta, arteria epatica, dotto biliare) alla vena centrale; il sangue scorre nei sinusoidi. Le cellule stellate dello spazio di Disse sono quiescenti e conservano vitamina A.",
    "Gocce di grasso (trigliceridi) si accumulano negli epatociti, per alcol o per alterazioni metaboliche (MASLD). Se si toglie la causa, la steatosi può regredire.",
    "Il danno ripetuto attiva le cellule stellate, che diventano miofibroblasti e producono collagene: i setti fibrosi partono dalle triadi e le collegano con ponti. L'endotelio perde le fenestrature e gli scambi con gli epatociti peggiorano.",
    "Setti completi circondano noduli di rigenerazione: l'architettura del lobulo è sovvertita. Il fegato svolge ancora le sue funzioni, ma il sangue lo attraversa con più resistenza.",
    "Setti più spessi e meno epatociti funzionanti: la massa di fegato attiva non basta più. Calano la sintesi di albumina e fattori della coagulazione, la trasformazione dell'ammoniaca e l'eliminazione della bilirubina."]},
  {t:"Fegato e circolo portale",sub:"ipertensione portale",svg:por,
   val:["Pressione portale normale","Flusso normale","Resistenza in aumento","Ipertensione portale","!Ipertensione portale grave"],
   testo:["Il sangue di intestino e milza arriva al fegato con la vena porta, attraversa i sinusoidi ed esce dalle vene sovraepatiche verso il cuore. La pressione nella vena porta è bassa.",
    "Il fegato steatosico può essere ingrandito e giallastro; il flusso portale resta normale.",
    "La fibrosi aumenta la resistenza al passaggio del sangue nel fegato: la pressione nella vena porta comincia a salire.",
    "Il sangue cerca vie alternative verso le vene sistemiche (circoli collaterali). La vena gastrica sinistra porta sangue alle vene dell'esofago, che si dilatano in varici; la milza si ingrandisce e trattiene piastrine.",
    "Pressione portale molto alta e fegato piccolo e nodulare: le varici possono rompersi e dare un'emorragia digestiva alta grave, con ematemesi e melena."]},
  {t:"Organismo",sub:"complicanze",svg:org,
   val:["Nessun segno","Di solito asintomatica","Spesso asintomatica","Compensata","!Scompensata"],
   testo:["Il fegato trasforma l'ammoniaca che arriva dall'intestino in urea, produce albumina e fattori della coagulazione, elimina la bilirubina con la bile.",
    "La steatosi di solito non dà sintomi: spesso si scopre per caso con esami del sangue o un'ecografia.",
    "Anche la fibrosi è spesso silenziosa; la stanchezza è un sintomo aspecifico. Per questo il danno si cerca con esami mirati.",
    "La persona può stare bene a lungo. Possono esserci già varici e milza ingrandita, ma non ascite, ittero, encefalopatia o emorragia.",
    "Basta che compaia una di queste complicanze, cioè ascite (ipertensione portale con ritenzione di sodio e acqua; l'albumina bassa contribuisce), emorragia da varici, encefalopatia (l'ammoniaca, che il fegato non trasforma e che passa per i collaterali, arriva al cervello: confusione, asterixis) o ittero. Gli esami della coagulazione sono alterati, ma il rischio di sanguinare non dipende solo dall'INR."]}],
 legenda:[[EP,"Epatociti"],[FAT,"Gocce di grasso"],[STL,"Cellule stellate attivate"],[COL,"Collagene, setti fibrosi"],[VEN,"Vene (porta e collaterali)"],[ART,"Sangue, arteria epatica"],[BIL,"Dotto biliare, ammoniaca"],[ASC,"Ascite"],[GIA,"Ittero"]],
 n:"Ginès P et al. Liver cirrhosis. Lancet 2021 (PMID 34543610); EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis, J Hepatol 2018 (PMID 29653741); Tsochatzis EA, Bosch J, Burroughs AK. Liver cirrhosis. Lancet 2014 (PMID 24480518); Baveno VII (PMID 35120736); Tripodi A, Mannucci PM. N Engl J Med 2011 (PMID 21751907)."});
})();

/* ---- Creatina ---- */

/* ---- Creatina monoidrato nel tempo (disegno originale) ---- */
(function(){
const W=440,H=250,f=n=>+n.toFixed(1);
const head=(lab,body)=>`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">${body}</svg>`;
const rnd=k=>{let x=Math.sin(k*999)*1e4;return x-Math.floor(x)};
// colori semantici
const CR="#8e63c9",PCR="#e08a2e",ATP="#2e9e5b",H2O="#3aa0d8",MU="#d9637b",CRN="#9c6b3c",KID="#b5534f";
const BODY="color-mix(in srgb,var(--ink) 11%,var(--paper))";
const ST=["senza integratore","fase di carico","mantenimento","settimane con allenamento di forza","sospensione"];
// grandezze per stadio (schematiche, senza unità)
const RS=[.4,.75,.92,.95,.55],   // riserva di creatina e fosfocreatina
 WA=[.3,.7,.75,.8,.4],           // acqua nella cellula
 NIN=[1,4,2,2,1],                // pallini di creatina che entrano
 NBL=[2,6,4,4,1];                // creatina nel sangue
const bar=(x,y,w,v,col,b)=>`<rect x="${x}" y="${y}" width="${w}" height="9" rx="2" class="eyrow"/><rect x="${x}" y="${y+2}" width="${f(v*w)}" height="5" rx="1" fill="${col}"/>${b!=null?`<path d="M${f(x+b*w)} ${y-3}V${y+12}" stroke="var(--ink)" stroke-width="1.2" stroke-dasharray="2 2"/>`:""}`;

/* Livello 1: cellula muscolare e ciclo della fosfocreatina */
const cel=s=>{const rs=RS[s],wa=WA[s],cw=f(176+10*wa);
 const tk={x:34,y:76,w:62,h:58},lvY=f(tk.y+tk.h*(1-rs)),bY=f(tk.y+tk.h*(1-RS[0]));
 let blood="";for(let i=0;i<NBL[s];i++)blood+=`<circle class="anm" r="3" fill="${CR}"><animateMotion path="M24 42H160" dur="4s" begin="${f(-i*4/NBL[s]-.3)}s" repeatCount="indefinite"/></circle>`;
 let ent="";for(let i=0;i<NIN[s];i++)ent+=`<circle class="anm" r="3" fill="${CR}"><animateMotion path="M65 42V${f(+lvY+6)}" dur="2s" begin="${f(-i*2/NIN[s]-.2)}s" repeatCount="indefinite"/></circle>`;
 // molecole nella riserva: PCr (arancio) e Cr (viola)
 let mol="";const nm=Math.round(4+rs*10);for(let i=0;i<nm;i++){const px=f(tk.x+6+rnd(i+3)*(tk.w-12)),py=f(+lvY+5+rnd(i+11)*(tk.y+tk.h-lvY-10));mol+=i%3?`<rect x="${px-2.5}" y="${py-2.5}" width="5" height="5" rx="1" fill="${PCR}"/>`:`<circle cx="${px}" cy="${py}" r="2.6" fill="${CR}"/>`}
 let dr="";const nd=Math.round(3+wa*9);for(let i=0;i<nd;i++){const px=f(120+rnd(i+21)*76),py=f(78+rnd(i+31)*52);dr+=`<path d="M${px} ${py-4}q3.2 4 0 6.4q-3.2-2.4 0-6.4z" fill="${H2O}" opacity=".85"/>`}
 let fib="";for(let j=0;j<3;j++){const y=158+j*11;fib+=`<path d="M32 ${y}H${f(20+ +cw-12)}" stroke="${MU}" stroke-width="3" opacity=".45"/>`;for(let k=0;k<9;k++)fib+=`<path d="M${36+k*19} ${y-3}v6" class="lead"/>`}
 // ciclo
 const cx=322,cy=116,r=48,rp=f(10+10*rs);
 const arcL=`M${cx} ${cy-r}A${r} ${r} 0 0 0 ${cx} ${cy+r}`,arcR=`M${cx} ${cy+r}A${r} ${r} 0 0 0 ${cx} ${cy-r}`;
 const blink=(a,b)=>`<animate attributeName="opacity" values="${a};${b}" keyTimes="0;.5" calcMode="discrete" dur="4s" begin="-4s" repeatCount="indefinite"/>`;
 return head(`Cellula muscolare, ${ST[s]}: riserva di creatina e fosfocreatina ${["di base","che si riempie","piena","piena","che torna al valore di base"][s]}, acqua nella cellula ${["di base","in aumento","aumentata","aumentata","che torna al valore di base"][s]}; a destra il ciclo in cui la fosfocreatina rigenera l'ATP`,
 `<text x="20" y="24" class="ft fb">Cellula muscolare</text><text x="232" y="24" class="ft fb">Il ciclo della fosfocreatina</text>
 <path d="M216 36V${H-8}" class="lead"/>
 <rect x="20" y="34" width="146" height="16" rx="8" fill="${MU}" opacity=".14" stroke="${MU}"/><text x="172" y="46" class="ft fsm">sangue</text>${blood}
 <rect x="20" y="60" width="${cw}" height="136" rx="16" fill="${MU}" opacity=".1" stroke="${MU}" stroke-width="1.4"/>
 <rect x="60" y="57" width="10" height="6" rx="2" fill="${CR}" opacity=".8"/>
 <rect x="${tk.x}" y="${tk.y}" width="${tk.w}" height="${tk.h}" rx="3" class="ff" stroke="var(--ink)"/>
 <rect x="${tk.x}" y="${lvY}" width="${tk.w}" height="${f(tk.y+tk.h-lvY)}" rx="2" fill="${PCR}" opacity=".22"/>${mol}
 <path d="M${tk.x-4} ${bY}H${tk.x+tk.w+4}" stroke="var(--ink)" stroke-width="1.2" stroke-dasharray="3 2"/><text x="${tk.x+tk.w+6}" y="${f(+bY+3)}" class="ft fsm">base</text>
 ${ent}${dr}${fib}
 <text x="${tk.x+tk.w/2}" y="148" class="ft fsm" text-anchor="middle">riserva Cr + PCr</text><text x="160" y="148" class="ft fsm" text-anchor="middle">acqua</text>
 <text x="20" y="${H-28}" class="ft fsm">Ingresso: ${["solo dieta e sintesi","molta creatina (carico)","moderato (mantenimento)","moderato (mantenimento)","solo dieta e sintesi"][s]}</text>
 <text x="20" y="${H-12}" class="ft fsm">Acqua nella cellula: ${["di base","in aumento","aumentata","aumentata","torna alla base"][s]}</text>
 <path d="${arcL}" fill="none" stroke="${PCR}" stroke-width="2.2"/><path d="${arcR}" fill="none" stroke="${ATP}" stroke-width="2.2"/>
 <path d="M${cx-r-4} ${cy-2}l4 7l4-7z" fill="${PCR}"/><path d="M${cx+r-4} ${cy+2}l4-7l4 7z" fill="${ATP}"/>
 <circle cx="${cx}" cy="${cy-r}" r="${rp}" fill="${PCR}" opacity=".9"/><text x="${cx}" y="${cy-r+4}" class="ft fb" text-anchor="middle" style="fill:#2b1700">PCr</text>
 <circle cx="${cx}" cy="${cy+r}" r="13" fill="${CR}" opacity=".9"/><text x="${cx}" y="${cy+r+4}" class="ft fb" text-anchor="middle" style="fill:#fff">Cr</text>
 <text x="${cx-r-8}" y="${cy+4}" class="ft fsm" text-anchor="end">sforzo</text><text x="${cx+r+8}" y="${cy+4}" class="ft fsm">recupero</text>
 <g>${blink(1,.35)}<text x="${cx-22}" y="${cy-4}" class="ft fsm" text-anchor="middle">ADP</text><path d="M${cx-22} ${cy}v8" class="fl"/><text x="${cx-22}" y="${cy+20}" class="ft fb" text-anchor="middle" style="fill:${ATP}">ATP</text></g>
 <g>${blink(.35,1)}<text x="${cx+22}" y="${cy-4}" class="ft fsm" text-anchor="middle">ATP</text><path d="M${cx+22} ${cy}v8" class="fl"/><text x="${cx+22}" y="${cy+20}" class="ft fsm" text-anchor="middle">ADP</text></g>
 <circle class="anm" r="4" fill="${PCR}" stroke="var(--paper)"><animateMotion path="${arcL}${arcR.replace(/^M[^A]*/,"")}" dur="4s" begin="-4s" repeatCount="indefinite"/></circle>
 <text x="232" y="${H-28}" class="ft fsm">Sforzo: PCr + ADP → Cr + ATP</text>
 <text x="232" y="${H-12}" class="ft fsm">Recupero: Cr + ATP → PCr + ADP</text>`)};

/* Livello 2: muscolo e prestazione */
const mus=s=>{const wa=WA[s],rs=RS[s],tr=s===3;
 const ex=f(15+5*wa);let dr="";const nd=Math.round(2+wa*7);for(let i=0;i<nd;i++){const a=rnd(i+41)*6.283,q=.25+.6*rnd(i+47),px=f(84+ex*.7*q*Math.cos(a)),py=f(110+32*q*Math.sin(a));dr+=`<path d="M${px} ${py-3.5}q2.8 3.5 0 5.6q-2.8-2.1 0-5.6z" fill="${H2O}"/>`}
 const fore=`<path d="M70 160L156 160" stroke="${BODY}" stroke-width="14" stroke-linecap="round"/><circle cx="160" cy="160" r="9" fill="${BODY}"/>
 <path d="M160 140V180" stroke="var(--ink)" stroke-width="3"/><rect x="153" y="134" width="14" height="10" rx="2" fill="var(--ink)" opacity=".75"/><rect x="153" y="176" width="14" height="10" rx="2" fill="var(--ink)" opacity=".75"/>`;
 const arm=tr?`<g transform="rotate(-25 70 160)"><g><animateTransform attributeName="transform" type="rotate" values="20 70 160;-30 70 160;20 70 160" dur="4s" begin="-2s" repeatCount="indefinite"/>${fore}</g></g>`:fore;
 const rows=[["Riserva di fosfocreatina",[[rs,PCR]],["di base","si riempie","piena","piena","torna alla base"]],
  ["Sforzi brevi e intensi",[[[.4,.46,.52,.52,.42][s],PCR]],["di base","più scorta di energia","più scorta di energia","più scorta di energia","scorta che cala"]],
  ["Forza",[[.4,"var(--muted)"],[[0,0,0,.14,.14][s],"var(--ink)"],[[0,0,0,.07,0][s],CR]],["di base","senza allenamento: prove scarse","senza allenamento: prove scarse","un poco più del solo allenamento","resta quella dell'allenamento"]],
  ["Peso corporeo",[[.4,"var(--muted)"],[[0,.12,.13,.14,.03][s],H2O]],["di base","+ acqua nelle cellule, non grasso","+ acqua nelle cellule, non grasso","+ acqua nelle cellule, non grasso","l'acqua in più si perde"]]];
 const bx=232,bw=180;let pan="";
 rows.forEach((r,i)=>{const y=44+i*44;let x=bx,segs="";r[1].forEach(([v,c])=>{if(v>0){segs+=`<rect x="${f(x)}" y="${y+7}" width="${f(v*bw-1.5)}" height="5" fill="${c}"${c==="var(--ink)"?' opacity=".55"':""}/>`;x+=v*bw}});
  pan+=`<text x="${bx}" y="${y}" class="ft">${r[0]}</text><rect x="${bx}" y="${y+5}" width="${bw}" height="9" rx="2" class="eyrow"/>${segs}
  <path d="M${f(bx+.4*bw)} ${y+2}V${y+17}" stroke="var(--ink)" stroke-width="1.2" stroke-dasharray="2 2"/><text x="${bx}" y="${y+27}" class="ft fsm">${r[2][s]}</text>`});
 return head(`Muscolo e prestazione, ${ST[s]}: riserva di fosfocreatina ${rows[0][2][s]}; forza ${rows[2][2][s]}; peso ${rows[3][2][s]}`,
 `<text x="20" y="24" class="ft fb">Muscolo</text><text x="232" y="24" class="ft fb">Prestazione (schema)</text>
 <path d="M216 36V${H-8}" class="lead"/>
 <circle cx="70" cy="52" r="10" fill="${BODY}"/><path d="M70 60V160" stroke="${BODY}" stroke-width="16" stroke-linecap="round"/>
 <ellipse cx="84" cy="110" rx="${ex}" ry="34" fill="${MU}" opacity=".75"/>${dr}
 ${arm}<circle cx="70" cy="160" r="8" fill="${BODY}"/>
 <path d="M${f(84+ex)} 90L128 70" class="lead"/><text x="130" y="68" class="ft fsm">bicipite</text>
 <text x="130" y="82" class="ft fsm">${s===0?"riserva di base":s===4?"si svuota piano":"riserva piena"}</text>
 <text x="20" y="${H-28}" class="ft fsm">${tr?"Allenamento di forza regolare":"Senza allenamento di forza"}</text>
 <text x="20" y="${H-12}" class="ft fsm">Peso in più: ${s===0?"nessuno":s===4?"in calo":"acqua, non grasso"}</text>
 ${pan}<text x="${bx}" y="${H-12}" class="ft fsm">Tratteggio: base · viola: creatina</text>`)};

/* Livello 3: sangue, reni ed esami */
const ren=s=>{const nb=[3,5,5,6,3][s];
 const path="M56 98H176C181 98 184 104 184 112V186";
 let mov="";for(let i=0;i<3;i++)mov+=`<circle class="anm" r="3" fill="${CRN}"><animateMotion path="${path}" dur="4s" begin="${f(-i*4/3-.2)}s" repeatCount="indefinite"/></circle>`;
 let st="";for(let i=0;i<nb;i++)st+=`<circle cx="${f(70+i*(70/nb)+rnd(i+5)*6)}" cy="${f(94+rnd(i+9)*8)}" r="2.6" fill="${CRN}" opacity=".85"/>`;
 let mc="";const nm=Math.round(4+RS[s]*8);for(let i=0;i<nm;i++)mc+=`<circle cx="${f(28+rnd(i+61)*22)}" cy="${f(70+rnd(i+67)*52)}" r="2.4" fill="${i%3?PCR:CR}"/>`;
 const kid=`<path d="M186 68C208 68 210 124 186 124C172 124 170 112 175 105C178 101 178 95 175 91C170 82 172 68 186 68Z" fill="${KID}" opacity=".75"/>`;
 const rows=[["Creatininemia",[.35,.48,.5,.55,.38][s],["di base","↑ un poco","↑ circa +0,13 mg/dL","↑ di più con allenamento (1 trial)","torna verso la base"][s],s&&s<4?"var(--amber)":"var(--ok)"],
  ["eGFR calcolato dalla creatinina",[.7,.6,.58,.55,.67][s],["di base","↓ possibile, non prova un danno","↓ possibile, non prova un danno","↓ possibile, non prova un danno","torna verso la base"][s],s&&s<4?"var(--amber)":"var(--ok)"],
  ["Danno renale (adulti sani)",[0,0,0,0,0][s],s?"non dimostrato":"nessuno (adulto sano)","var(--ok)"]];
 const bx=232,bw=180;let pan="";
 rows.forEach((r,i)=>{const y=44+i*42;pan+=`<text x="${bx}" y="${y}" class="ft">${r[0]}</text>${i<2?bar(bx,y+5,bw,r[1],r[3],[.35,.7][i]):`<rect x="${bx}" y="${y+5}" width="9" height="9" rx="2" class="k-ok"/>`}<text x="${i<2?bx:bx+14}" y="${i<2?y+27:y+13}" class="ft fsm">${r[2]}</text>`});
 return head(`Sangue, reni ed esami, ${ST[s]}: la creatina del muscolo diventa creatinina; creatininemia ${rows[0][2]}, eGFR ${rows[1][2]}, danno renale negli adulti sani non dimostrato; l'infermiere annota l'integratore e avvisa il medico`,
 `<text x="20" y="24" class="ft fb">Dal muscolo alle urine</text><text x="232" y="24" class="ft fb">Esami (schema)</text>
 <path d="M216 36V${H-8}" class="lead"/>
 <rect x="20" y="62" width="38" height="68" rx="10" fill="${MU}" opacity=".18" stroke="${MU}"/>${mc}<text x="39" y="144" class="ft fsm" text-anchor="middle">muscolo</text>
 <rect x="58" y="88" width="118" height="20" rx="10" fill="${MU}" opacity=".12" stroke="${MU}"/>${st}
 <text x="106" y="82" class="ft fsm" text-anchor="middle">sangue: creatinina</text>
 ${kid}<path d="M184 120V184" stroke="${KID}" stroke-width="3" opacity=".6"/><text x="186" y="62" class="ft fsm" text-anchor="middle">rene</text>
 <path d="M172 184h24v14a12 12 0 0 1-24 0z" fill="#e8c020" fill-opacity=".25" stroke="#c9a227"/><text x="164" y="200" class="ft fsm" text-anchor="end">urine</text>
 ${mov}
 <text x="20" y="${H-28}" class="ft fsm">Cr → creatinina: spontanea, ogni giorno</text>
 <text x="20" y="${H-12}" class="ft fsm">Creatinina prodotta: ${["di base","di più","di più","di più","torna alla base"][s]}</text>
 ${pan}
 <rect x="${bx}" y="176" width="${bw}" height="58" rx="2" class="fbx k-info"/>
 <text x="${bx+8}" y="192" class="ft fsm">Infermiere: annota l'integratore</text>
 <text x="${bx+8}" y="206" class="ft fsm">in anamnesi e avvisa il medico</text>
 <text x="${bx+8}" y="220" class="ft fsm">quando legge creatinina ed eGFR</text>`)};

SIM.push({id:"sim-creatina",enc:["creatina-adulti"],t:"Simulatore: la creatina monoidrato nel tempo",d:"Scegli il momento dell'integrazione e il livello da osservare, dalla cellula muscolare agli esami del sangue. Il disegno è schematico: le proporzioni servono a capire, non a misurare, e i tempi sono indicativi.",
 stadi:["Senza integratore","Fase di carico (5-7 giorni)","Mantenimento 3-5 g al giorno","Settimane con allenamento di forza","Sospensione"],dur:"4s",fasi:["Sforzo: la PCr rigenera l'ATP","Recupero: si riforma la PCr"],
 livelli:[
  {t:"Cellula muscolare",sub:"fosfocreatina e ATP",svg:cel,
   val:["Riserva di base","Riserva che si riempie","Riserva piena","Riserva piena","Ritorno al valore di base"],
   testo:["Senza integratore la creatina arriva solo dalla dieta (carne, pesce) e dalla sintesi di rene e fegato. Nel muscolo una parte diventa fosfocreatina (PCr), una riserva rapida che rigenera l'ATP durante lo sforzo.",
    "Nella fase di carico, facoltativa (circa 0,3 g/kg al giorno per 5-7 giorni), molta creatina passa dal sangue nella cellula: la riserva di creatina e fosfocreatina si riempie in pochi giorni e la cellula trattiene più acqua.",
    "Con il mantenimento (3-5 g al giorno) la riserva resta piena. Senza la fase di carico si arriva allo stesso punto, ma più lentamente, in circa 4 settimane (con 3 g al giorno).",
    "Durante lo sforzo la fosfocreatina cede il suo fosfato all'ADP e riforma ATP; nel recupero i mitocondri ricostruiscono la fosfocreatina. Con la riserva piena il ciclo ha più scorta per gli sforzi brevi.",
    "Alla sospensione non arriva più creatina in più: la riserva cala lentamente e in circa 4 settimane torna al valore di base; si riduce anche l'acqua in più nella cellula."]},
  {t:"Muscolo e prestazione",fasi:false,sub:"forza e peso",svg:mus,
   val:["Prestazione di base","Peso un po' più alto (acqua)","Riserva piena","Forza un poco più alta","Vantaggio che si riduce"],
   testo:["La fosfocreatina del muscolo basta per pochi secondi di sforzo molto intenso; e insieme lavorano gli altri sistemi energetici. Forza e peso sono quelli di partenza.",
    "Nei primi giorni il peso può salire: è acqua trattenuta dentro le cellule del muscolo, non grasso. Senza allenamento le prove sono scarse: un trial a 45-65 anni (10 g al giorno per 12 settimane) ha visto più forza e massa magra anche senza esercizio, ma negli over 60 mancano prove solide.",
    "Con la riserva piena il muscolo ha più scorta per sforzi brevi e intensi, come scatti e serie di ripetizioni. La creatina non sostituisce l'allenamento né una buona alimentazione proteica.",
    "Con l'allenamento di forza la creatina aumenta la forza un poco più del solo allenamento (meta-analisi negli over 60, certezza moderata); sulla massa muscolare e sulla funzione negli anziani le prove sono incerte.",
    "Dopo la sospensione la riserva torna al valore di base in circa 4 settimane, si riduce anche l'acqua in più e il peso cala un poco; resta il beneficio dell'allenamento, se si continua ad allenarsi."]},
  {t:"Sangue, reni ed esami",fasi:false,sub:"creatinina ed eGFR",svg:ren,
   val:["Creatininemia di base","Creatininemia un poco più alta","Creatininemia circa +0,13 mg/dL","eGFR forse più basso, senza prova di danno","Ritorno al valore di base"],
   testo:["Ogni giorno una parte della creatina del muscolo si trasforma spontaneamente in creatinina, che passa nel sangue e il rene elimina con le urine. La creatininemia di base dipende soprattutto dalla massa muscolare.",
    "Con più creatina nell'organismo si forma più creatinina: la creatininemia sale un poco. Un aumento isolato non dimostra che i reni filtrino meno.",
    "In una meta-analisi di studi randomizzati la creatininemia sale di circa 0,13 mg/dL; l'eGFR calcolato dalla creatinina non risulta significativamente diverso (stima imprecisa, un calo anche non trascurabile non è escluso (IC 95% da −15,0 a +4,6 mL/min/1,73 m², solo 8 studi)), e negli adulti sani un danno renale non è dimostrato. L'infermiere annota l'integratore in anamnesi e avvisa il medico quando legge gli esami.",
    "L'allenamento può alzare ancora un poco la creatininemia. Per distinguere, il medico può usare un indicatore che non dipende dal muscolo, come la cistatina C. Nelle malattie renali o con farmaci nefrotossici decide il medico se assumere creatina.",
    "Dopo la sospensione la riserva del muscolo torna al valore di base in circa 4 settimane; poi tornano verso la base anche la creatinina prodotta e la creatininemia. Segnalare al medico anche la sospensione aiuta a leggere gli esami successivi."]}],
 legenda:[["#8e63c9","Creatina (Cr)"],["#e08a2e","Fosfocreatina (PCr)"],["#2e9e5b","ATP"],["#3aa0d8","Acqua nella cellula"],["#d9637b","Muscolo"],["#9c6b3c","Creatinina"],["#b5534f","Rene"]],
 n:"Kreider RB et al., ISSN position stand 2017 (PMID 28615996): dose 3-5 g al giorno; Antonio J et al., «Common questions and misconceptions about creatine supplementation», J Int Soc Sports Nutr 2021 (PMID 33557850): acqua intracellulare, creatinina e falsi miti; Hultman E et al., J Appl Physiol 1996 (PMID 8828669): aumento di circa il 20% della creatina muscolare in 28 giorni con 3 g al giorno, come con 20 g al giorno per 6 giorni; dopo il carico di 20 g al giorno per 6 giorni, senza mantenimento, ritorno al valore di base entro 30 giorni; Vandenberghe K et al., J Appl Physiol 1997 (PMID 9390981): in donne sedentarie, fosfocreatina di nuovo normale entro 4 settimane dalla sospensione; più forza e massa magra con l'allenamento; Dawson B et al., Scand J Med Sci Sports 1997 (PMID 9241025): ricostituzione della PCr in circa 3 minuti (84-90%) dopo sprint brevi; studio fisiologico, senza integratore; Tsiaras A et al., J Ren Nutr 2026 (PMID 42035842): meta-analisi, creatininemia circa +0,13 mg/dL senza differenza significativa dell'eGFR; Chun J et al., J Int Soc Sports Nutr 2026 (PMID 42578920): RCT, 64 adulti di 45-65 anni, 10 g al giorno per 12 settimane; Yao L et al., Front Nutr 2026 (PMID 42712402): meta-analisi di 11 studi, forza g 0,31 con certezza moderata; massa e funzione non significative; non applicabile ad anziani fragili. Carico facoltativo circa 0,3 g/kg al giorno per 5-7 giorni, poi 3-5 g al giorno (ISSN 2017, testo; nei trial 20 g al giorno per 4-6 giorni). Da verificare: i tempi di ritorno al valore di base di creatininemia e acqua nella cellula dopo la sospensione; l'aumento ulteriore della creatininemia con l'allenamento, descritto nella voce per un solo trial."});
})();
