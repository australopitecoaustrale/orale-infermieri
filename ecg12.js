/* ECG a 12 derivazioni: generatore sintetico, carta millimetrata, monitor, esempi ed esercizi.
   Tracciati generati da un modello matematico (somma di onde gaussiane per battito);
   le derivazioni periferiche sono ricavate da DI e DII con le leggi di Einthoven e Goldberger. */
var ECG12=(function(){
const LEADS=["I","II","III","aVR","aVL","aVF","V1","V2","V3","V4","V5","V6"];
const PREC=["V1","V2","V3","V4","V5","V6"];
function rng(seed){let h=2166136261;for(const c of String(seed))h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const N=(over)=>Object.assign({p:0,q:0,r:0,s:0,r2:0,t:0,u:0,st:0,pr:0,d:0,sw:1},over);
/* morfologia normale: ampiezze in mV per DI, DII e precordiali */
const NORM={
 I:N({p:.10,q:-.05,r:.75,s:-.10,t:.22}),
 II:N({p:.16,q:-.06,r:1.05,s:-.15,t:.32}),
 V1:N({p:.07,r:.22,s:-.95,t:.06,d:-.04}),
 V2:N({p:.09,r:.42,s:-1.25,t:.45}),
 V3:N({p:.09,r:.75,s:-.85,t:.48}),
 V4:N({p:.10,q:-.04,r:1.25,s:-.5,t:.45}),
 V5:N({p:.10,q:-.08,r:1.35,s:-.25,t:.38}),
 V6:N({p:.10,q:-.08,r:1.05,s:-.12,t:.30})
};
function base(mod){const o={};for(const k in NORM)o[k]=Object.assign({},NORM[k],(mod&&mod[k])||{});return o}
/* quadri */
const P=[
 {k:"norm",n:"ECG normale (ritmo sinusale)",hr:72,
  d:"Ritmo sinusale regolare: ogni QRS è preceduto da un'onda P positiva in DI, DII e aVF. PR tra 0,12 e 0,20 s, QRS stretto, asse normale (QRS positivo in DI e aVF). In aVR tutto è negativo. Nelle precordiali l'onda R cresce da V1 a V5 (progressione della R) e la transizione cade in V3-V4.",
  look:["II","aVR","V1","V4"],L:base()},
 {k:"stemi-inf",n:"STEMI inferiore",hr:64,
  d:"Sopraslivellamento del tratto ST in DII, DIII e aVF, con sottoslivellamento speculare in DI e aVL. Il territorio è quello della coronaria destra o della circonflessa. Nell'infarto inferiore si cerca anche il coinvolgimento del ventricolo destro (derivazioni destre) e si fa attenzione a bradicardie e blocchi AV.",
  look:["II","III","aVF","aVL"],L:base({I:{st:-.10,t:.08},II:{st:.22,t:.5,q:-.18}})},
 {k:"stemi-ant",n:"STEMI anteriore",hr:96,
  d:"Sopraslivellamento del tratto ST da V1 a V4, spesso con onde T ampie; il territorio è quello dell'arteria discendente anteriore. Quanto più si estende (V1-V6, DI e aVL) tanto più è ampia la zona a rischio. Le alterazioni speculari compaiono nelle inferiori.",
  look:["V2","V3","V4","III"],L:base({I:{st:.04},II:{st:-.04},V1:{st:.22,t:.35,r:.08},V2:{st:.38,t:.75,r:.18},V3:{st:.42,t:.8,r:.3},V4:{st:.3,t:.65},V5:{st:.12}})},
 {k:"stemi-lat",n:"STEMI laterale alto",hr:84,
  d:"Sopraslivellamento del tratto ST in DI, aVL, V5 e V6, con sottoslivellamento speculare in DIII e aVF. È l'infarto della parete laterale, spesso legato alla circonflessa o a un ramo diagonale.",
  look:["I","aVL","V6","III"],L:base({I:{st:.22,t:.45},II:{st:.02},V5:{st:.18,t:.5},V6:{st:.2,t:.45}})},
 {k:"nstemi",n:"Ischemia subendocardica (sottoslivellamento diffuso)",hr:104,
  d:"Sottoslivellamento orizzontale del tratto ST in molte derivazioni (DI, DII, V4-V6) con sopraslivellamento in aVR. È tipico dell'ischemia diffusa da sbilancio tra richiesta e apporto di ossigeno o di una malattia di più vasi; va interpretato con i sintomi e la troponina.",
  look:["V5","V6","II","aVR"],L:base({I:{st:-.1,t:.05},II:{st:-.15,t:.05},V3:{st:-.08},V4:{st:-.18,t:.1},V5:{st:-.2,t:.05},V6:{st:-.16,t:.04}})},
 {k:"pericardite",n:"Pericardite acuta",hr:102,
  d:"Sopraslivellamento del tratto ST diffuso, concavo verso l'alto, in quasi tutte le derivazioni, con sottoslivellamento del tratto PR; in aVR il PR è sopraslivellato e l'ST sottoslivellato. Non c'è un territorio coronarico preciso né alterazioni speculari tipiche dell'infarto.",
  look:["II","V5","aVR","I"],L:base({I:{st:.1,pr:-.05},II:{st:.16,pr:-.07},V2:{st:.12,pr:-.04},V3:{st:.14,pr:-.05},V4:{st:.15,pr:-.06},V5:{st:.15,pr:-.06},V6:{st:.12,pr:-.05}})},
 {k:"bbs",n:"Blocco di branca sinistra",hr:76,qrs:.15,
  d:"QRS largo (almeno 0,12 s). In V1 il complesso è prevalentemente negativo (QS o rS profondo e largo); in DI, aVL, V5 e V6 l'onda R è larga e spesso intaccata, senza onda Q. Il tratto ST e l'onda T sono discordanti, cioè opposti al QRS. Un blocco di branca sinistra di nuova comparsa con dolore toracico si valuta come possibile infarto.",
  look:["V1","V6","I","aVL"],L:base({I:{q:0,r:.7,r2:.65,s:0,t:-.25,st:-.06},II:{q:0,r:.5,r2:.35,s:-.1,t:-.08},V1:{r:.06,s:-1.5,sw:2.2,t:.35,st:.18},V2:{r:.1,s:-1.8,sw:2.2,t:.45,st:.24},V3:{r:.18,s:-1.3,sw:2,t:.38,st:.18},V4:{r:.5,s:-.8,t:.1},V5:{q:0,r:.9,r2:.8,s:0,t:-.3,st:-.1},V6:{q:0,r:.95,r2:.85,s:0,t:-.32,st:-.1}})},
 {k:"bbd",n:"Blocco di branca destra",hr:70,qrs:.13,
  d:"QRS largo con aspetto rSR' («a M») in V1-V2 e onda S larga e impastata in DI, aVL, V5 e V6. Le onde T in V1-V3 sono spesso negative. Può essere presente anche in persone sane; di nuova comparsa può accompagnare un'embolia polmonare.",
  look:["V1","V2","I","V6"],L:base({I:{s:-.35,t:.2},II:{s:-.25},V1:{r:.25,s:-.35,r2:.75,t:-.2},V2:{r:.35,s:-.6,r2:.55,t:-.1},V5:{s:-.45},V6:{s:-.45,t:.25}})},
 {k:"ivs",n:"Ipertrofia ventricolare sinistra",hr:68,
  d:"Voltaggi aumentati: onde S profonde in V1-V2 e onde R alte in V5-V6 (per esempio S in V1 più R in V5 o V6 oltre 3,5 mV, criterio di Sokolow-Lyon). Spesso c'è un sottoslivellamento dell'ST con T negativa asimmetrica in V5-V6 e DI-aVL (aspetto da «sovraccarico»). È frequente nell'ipertensione e nella stenosi aortica.",
  look:["V1","V5","V6","aVL"],L:base({I:{r:1.2,st:-.06,t:-.15},II:{r:1.2},V1:{s:-2.0},V2:{s:-2.4,r:.3},V3:{s:-1.4},V4:{r:2.0,s:-.4},V5:{r:2.6,st:-.12,t:-.3},V6:{r:2.2,st:-.12,t:-.28}})},
 {k:"iperk",n:"Iperpotassiemia",hr:62,qrs:.11,
  d:"Onde T alte, strette e appuntite («a tenda»), più evidenti nelle precordiali. Con valori più alti l'onda P si appiattisce, il PR si allunga e il QRS si allarga, fino a ritmi molto lenti o all'arresto. L'ECG va interpretato insieme al potassio; è un'urgenza.",
  look:["V2","V3","V4","II"],tw:.6,L:base({I:{t:.55,p:.06},II:{t:.85,p:.07},V1:{t:.4},V2:{t:1.4},V3:{t:1.5},V4:{t:1.25},V5:{t:.9},V6:{t:.7}})},
 {k:"ipok",n:"Ipopotassiemia",hr:80,
  d:"Onde T appiattite, sottoslivellamento dell'ST e onde U evidenti dopo la T, soprattutto in V2-V3. La fusione tra T e U può far sembrare il QT lungo. Il rischio è quello di aritmie, in particolare in chi assume digitale.",
  look:["V2","V3","II","V4"],L:base({I:{t:.06,u:.06,st:-.04},II:{t:.08,u:.1,st:-.06},V1:{t:.02,u:.06},V2:{t:.1,u:.22,st:-.06},V3:{t:.1,u:.24,st:-.06},V4:{t:.1,u:.18},V5:{t:.08,u:.12},V6:{t:.07,u:.08}})},
 {k:"fa",n:"Fibrillazione atriale",hr:118,rhythm:"af",
  d:"Intervalli R-R irregolarmente irregolari e assenza di onde P, sostituite da una linea di base ondulata (onde f), più visibile in V1 e DII. La risposta ventricolare può essere rapida. Si valuta stabilità del paziente, durata della fibrillazione e rischio tromboembolico.",
  look:["II","V1","aVF"],L:base({I:{p:0},II:{p:0},V1:{p:0},V2:{p:0},V3:{p:0},V4:{p:0},V5:{p:0},V6:{p:0}})},
 {k:"flutter",n:"Flutter atriale (conduzione 2:1)",hr:150,rhythm:"flutter",
  d:"Onde di flutter regolari, a circa 300 al minuto, con aspetto «a denti di sega» nelle inferiori (DII, DIII, aVF), positive in V1. Con conduzione 2:1 la frequenza ventricolare è vicina a 150 al minuto e un'onda F può nascondersi nel QRS o nella T: una tachicardia regolare a 150 deve far pensare al flutter.",
  look:["II","III","aVF","V1"],L:base({I:{p:0},II:{p:0},V1:{p:0},V2:{p:0},V3:{p:0},V4:{p:0},V5:{p:0},V6:{p:0}})},
 {k:"bav1",n:"Blocco atrioventricolare di primo grado",hr:66,pr:.30,
  d:"Ogni onda P è seguita da un QRS, ma l'intervallo PR è costantemente più lungo di 0,20 s (5 quadratini). Di solito non dà sintomi; può dipendere da farmaci (beta-bloccanti, calcio-antagonisti, digitale), da alterazioni elettrolitiche o da malattie del sistema di conduzione.",
  look:["II","V1"],L:base()},
 {k:"ep",n:"Embolia polmonare: possibili segni",hr:116,
  d:"Il reperto più frequente è la tachicardia sinusale. Possono comparire segni di sovraccarico destro: S profonda in DI, Q e T negativa in DIII (S1Q3T3), T negative in V1-V3, blocco di branca destra. Nessuno di questi segni basta da solo: un ECG normale non esclude l'embolia.",
  look:["I","III","V1","V2"],L:base({I:{s:-.4,t:.15},II:{q:-.12,r:.8,t:.05},V1:{t:-.25},V2:{t:-.3},V3:{t:-.15}})},
 {k:"tv",n:"Tachicardia ventricolare monomorfa",hr:170,rhythm:"vt",qrs:.17,
  d:"Tachicardia regolare a QRS largo, con complessi tutti uguali, senza onde P riconoscibili prima dei QRS (possono comparire dissociate). Va considerata ventricolare fino a prova contraria. Si valuta subito se il paziente ha polso e segni di instabilità.",
  look:["II","V1","V6"],L:base({I:{q:0,r:-.25,s:-.35,r2:0,t:.3,p:0},II:{q:0,r:.8,s:0,r2:.2,t:-.35,p:0},V1:{r:.9,s:0,r2:.3,t:-.35,p:0},V2:{r:.95,s:-.15,t:-.4,p:0},V3:{r:.7,s:-.45,t:-.3,p:0},V4:{r:.45,s:-.7,t:.2,p:0},V5:{r:.25,s:-.9,t:.35,p:0},V6:{r:.15,s:-.85,t:.35,p:0}})}
];
const BY={};P.forEach(p=>BY[p.k]=p);
function g(t,c,w){const z=(t-c)/w;return Math.exp(-.5*z*z)}
function plate(t,a,b,e){if(t<a-e||t>b+e)return 0;const s1=t<a?(.5+.5*Math.cos(Math.PI*(a-t)/e)):1,s2=t>b?(.5+.5*Math.cos(Math.PI*(t-b)/e)):1;return Math.min(s1,s2)}
/* un battito per una derivazione, tempo relativo all'inizio del QRS */
function beat(L,tt,o){
  const q=o.qrs,PR=o.pr,QT=o.qt,tw=o.tw;let v=0;
  if(L.p){v+=L.p*g(tt,-PR+.05,.022);if(L.d)v+=L.d*g(tt,-PR+.085,.02)}
  if(L.pr)v+=L.pr*plate(tt,-PR+.09,-.01,.012);
  v+=L.q*g(tt,q*.12,q*.07)+L.r*g(tt,q*(L.r2?.36:.42),q*(L.r2?.16:.13))+L.s*g(tt,q*(L.r2?.58:.72)*(L.sw>1?.85:1),q*.12*L.sw);
  if(L.r2)v+=L.r2*g(tt,q*(L.s<-.2?.88:.7),q*(L.s<-.2?.11:.16));
  const tc=QT-.09*(o.tw||1);
  v+=L.st*plate(tt,q,tc,.05);
  v+=L.t*g(tt,tc,.045*(tw||1));
  if(L.u)v+=L.u*g(tt,QT+.08,.04);
  return v;
}
function derive(x){const I=x.I,II=x.II;return{I,II,III:II-I,aVR:-(I+II)/2,aVL:I-II/2,aVF:II-I/2}}
/* genera 10 s di tutte le derivazioni */
function gen(k,seed,fs){
  fs=fs||250;const p=BY[k],r=rng(seed||k),D=10,n=Math.round(D*fs);
  const hr=p.hr*(.94+.12*r()),rr0=60/hr,qrs=p.qrs||.09,pr=p.pr||.16,qt=Math.min(.46,.4*Math.sqrt(rr0)+(p.qrs?.04:0));
  const o={qrs,pr,qt,tw:p.tw||1};const rh=p.rhythm||"sinus";
  const beats=[];let t=-r()*rr0;while(t<D+1){beats.push(t);let rr=rr0;if(rh==="af")rr=rr0*(.62+.8*r());else rr=rr0*(1+(r()-.5)*.03);t+=rr}
  const L=p.L,out={};LEADS.forEach(l=>out[l]=new Float32Array(n));
  const fph=r()*6,fl=r();
  for(let i=0;i<n;i++){
    const tm=i/fs;let b=0;for(let j=0;j<beats.length;j++){if(beats[j]-.45<=tm)b=j}
    const vals={};
    for(const key of ["I","II",...PREC]){let v=0;for(let j=Math.max(0,b-1);j<=Math.min(beats.length-1,b+1);j++)v+=beat(L[key],tm-beats[j],o);vals[key]=v}
    /* attività atriale */
    if(rh==="af"){const f=.045*Math.sin(2*Math.PI*6.1*tm+fph)+.03*Math.sin(2*Math.PI*8.7*tm+fph*1.7);vals.I+=f*.4;vals.II+=f;vals.V1+=f*1.6;vals.V2+=f*.8}
    if(rh==="flutter"){const ph=(tm*5+fl)%1,saw=(ph<.82?-(ph/.82):-(1-(ph-.82)/.18))*.28+.14;vals.II+=saw;vals.I+=saw*.1;vals.V1-=saw*.6;vals.V2-=saw*.3}
    const dv=derive(vals);
    const wander=.03*Math.sin(2*Math.PI*.22*tm+fph);
    for(const l of LEADS){const v=(l in dv?dv[l]:vals[l]);out[l][i]=v+wander*(l==="aVR"?-.5:1)+(r()-.5)*.012}
  }
  return {fs,leads:out,hr:Math.round(60/rr0),p};
}
/* carta millimetrata: 25 mm/s, 10 mm/mV */
function paper(k,seed,opt){
  opt=opt||{};const G=gen(k,seed),fs=G.fs,W=262,RH=30,rows=[["I","aVR","V1","V4"],["II","aVL","V2","V5"],["III","aVF","V3","V6"]],H=RH*4+6,pid="ep"+Math.random().toString(36).slice(2,7);
  const path=(arr,x0,t0,t1,y0)=>{let d="";const i0=Math.round(t0*fs),i1=Math.round(t1*fs);for(let i=i0;i<i1;i++){const x=x0+(i/fs-t0)*25,y=y0-arr[i]*10;d+=(i===i0?"M":"L")+x.toFixed(2)+" "+y.toFixed(2)}return d};
  const cal=(x,y)=>`M${x} ${y}h1v-10h5v10h1`;
  let s=`<svg class="e12-paper" viewBox="0 0 ${W} ${H}" role="img" aria-label="ECG a 12 derivazioni: tracciato su carta"><defs><pattern id="${pid}s" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0V1H0" fill="none" stroke="#f3b8bf" stroke-width=".06"/></pattern><pattern id="${pid}b" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#${pid}s)"/><path d="M5 0V5H0" fill="none" stroke="#e48a95" stroke-width=".16"/></pattern></defs><rect width="${W}" height="${H}" fill="#fff6f6"/><rect width="${W}" height="${H}" fill="url(#${pid}b)"/>`;
  rows.forEach((row,ri)=>{const y0=RH*ri+RH*.62;s+=`<path d="${cal(1,y0)}" class="e12-tr"/>`;row.forEach((l,ci)=>{const x0=9+ci*62.5,t0=ci*2.5;s+=`<path d="${path(G.leads[l],x0,t0,t0+2.5,y0)}" class="e12-tr"/><text x="${x0+1}" y="${y0-RH*.45}" class="e12-lb">${l}</text>`;if(ci)s+=`<path d="M${x0} ${y0-4}v8" class="e12-sep"/>`})});
  const yR=RH*3+RH*.62;s+=`<path d="${cal(1,yR)}" class="e12-tr"/><path d="${path(G.leads.II,9,0,10,yR)}" class="e12-tr"/><text x="10" y="${yR-RH*.45}" class="e12-lb">II (striscia del ritmo)</text>`;
  s+=`<text x="${W-2}" y="${H-1.5}" text-anchor="end" class="e12-ft">25 mm/s · 10 mm/mV · FC ≈ ${G.hr}/min</text></svg>`;
  return s;
}
/* monitor: sfondo scuro, 12 riquadri, scansione animata */
function monitor(k,seed){
  const G=gen(k,seed),fs=G.fs,cw=100,ch=34,cols=3,rowsN=4,W=cw*cols,H=ch*rowsN+14,ord=["I","II","III","aVR","aVL","aVF","V1","V2","V3","V4","V5","V6"],cid="em"+Math.random().toString(36).slice(2,7);
  let s=`<svg class="e12-mon" viewBox="0 0 ${W} ${H}" role="img" aria-label="ECG a 12 derivazioni sul monitor"><rect width="${W}" height="${H}" rx="3" fill="#05110c"/><defs><clipPath id="${cid}"><rect x="0" y="0" width="0" height="${H}"><animate attributeName="width" from="0" to="${W}" dur="5s" repeatCount="indefinite"/></rect></clipPath></defs>`;
  s+=`<text x="4" y="10" class="e12-mt">ECG 12 derivazioni</text><text x="${W-4}" y="10" text-anchor="end" class="e12-hr">FC ${G.hr}</text>`;
  ord.forEach((l,i)=>{const c=i%cols,r=Math.floor(i/cols),x0=c*cw,y0=14+r*ch,mid=y0+ch*.6;let d="";const n=Math.round(5*fs);for(let j=0;j<n;j+=2){const x=x0+3+j/fs*(cw-6)/5,y=mid-G.leads[l][j]*9;d+=(j?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)}
    s+=`<rect x="${x0+.5}" y="${y0+.5}" width="${cw-1}" height="${ch-1}" fill="none" stroke="#123326" stroke-width=".4"/><text x="${x0+4}" y="${y0+8}" class="e12-ml">${l}</text><path d="${d}" class="e12-mon-bg"/><path d="${d}" class="e12-mon-tr" clip-path="url(#${cid})"/>`});
  return s+`</svg>`;
}
const CSS=`.e12-paper,.e12-mon{width:100%;height:auto;display:block;border-radius:10px}
.e12-paper{border:1px solid #f0c7cc}.e12-tr{fill:none;stroke:#141414;stroke-width:.32;stroke-linejoin:round}.e12-sep{stroke:#141414;stroke-width:.3}.e12-lb{font:700 3.2px system-ui,sans-serif;fill:#141414}.e12-ft{font:2.6px system-ui,sans-serif;fill:#8a4a52}
.e12-mt,.e12-ml{font:600 5px system-ui,sans-serif;fill:#74e4a6}.e12-hr{font:800 7px system-ui,sans-serif;fill:#ff6b81}.e12-mon-tr{fill:none;stroke:#5cf29c;stroke-width:.7;stroke-linejoin:round}.e12-mon-bg{fill:none;stroke:#5cf29c;stroke-width:.5;opacity:.18}
.e12-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}.e12-scroll .e12-paper{min-width:720px}
.e12-pick{display:flex;flex-wrap:wrap;gap:6px}.e12-look{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.e12-look b{font-size:13px;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,var(--scrub) 14%,var(--paper));border:1px solid var(--line)}
.e12-opts{display:grid;gap:8px}.e12-opts button{text-align:left}.e12-opts button.ok{border-color:#2f9e44;background:color-mix(in srgb,#2f9e44 14%,var(--paper))}.e12-opts button.no{border-color:#e03131;background:color-mix(in srgb,#e03131 12%,var(--paper))}`;
let S={mode:"esempi",k:"norm",seed:1,view:"carta",ex:null,ok:0,n:0};
function newEx(){const pool=P.map(p=>p.k),r=Math.random,k=pool[Math.floor(r()*pool.length)];const others=pool.filter(x=>x!==k).sort(()=>r()-.5).slice(0,3),opts=[k,...others].sort(()=>r()-.5);S.ex={k,opts,seed:"x"+Math.floor(r()*1e9),ans:null}}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function trace(k,seed){return S.view==="monitor"?monitor(k,seed):`<div class="e12-scroll">${paper(k,seed)}</div>`}
function view(){
  if(!document.getElementById("e12-css")){const st=document.createElement("style");st.id="e12-css";st.textContent=CSS;document.head.appendChild(st)}
  const app=document.getElementById("app");if(!app)return;
  const tabs=`<div class="row"><button class="chip" data-e12m="esempi" aria-pressed="${S.mode==="esempi"}">Esempi commentati (${P.length})</button><button class="chip" data-e12m="esercizi" aria-pressed="${S.mode==="esercizi"}">Esercizi di lettura</button><span style="flex:1"></span><button class="chip" data-e12v="carta" aria-pressed="${S.view==="carta"}">Carta</button><button class="chip" data-e12v="monitor" aria-pressed="${S.view==="monitor"}">Monitor</button></div>`;
  let body="";
  if(S.mode==="esempi"){const p=BY[S.k];
    body=`<div class="e12-pick">${P.map(x=>`<button class="chip" data-e12k="${x.k}" aria-pressed="${x.k===S.k}">${esc(x.n)}</button>`).join("")}</div>
    <div class="sheet" style="display:flex;flex-direction:column;gap:12px"><h3 style="margin:0">${esc(p.n)}</h3>${trace(p.k,p.k+S.seed)}
    <div class="e12-look"><span class="small">Derivazioni da guardare:</span>${p.look.map(l=>`<b>${l}</b>`).join("")}</div><p style="margin:0">${esc(p.d)}</p>
    <div class="row"><button class="btn" data-e12new>Nuovo tracciato dello stesso quadro</button></div></div>`}
  else{if(!S.ex)newEx();const X=S.ex,p=BY[X.k];
    body=`<div class="sheet" style="display:flex;flex-direction:column;gap:12px"><div class="row"><b>Che cosa mostra questo ECG a 12 derivazioni?</b><span class="small" style="margin-left:auto">Sessione: <b>${S.ok}</b> corrette su <b>${S.n}</b></span></div>${trace(X.k,X.seed)}
    <p class="small" style="margin:0">Metodo: ritmo e frequenza, onde P e PR, larghezza del QRS, asse (DI e aVF), progressione della R, tratto ST e onde T derivazione per derivazione.</p>
    <div class="e12-opts">${X.opts.map(k=>{let c="";if(X.ans){if(k===X.k)c="ok";else if(k===X.ans)c="no"}return `<button class="btn ${c}" data-e12a="${k}" ${X.ans?"disabled":""}>${esc(BY[k].n)}</button>`}).join("")}</div>
    ${X.ans?`<div class="trace-sol"><span class="eyebrow">${X.ans===X.k?"Corretto":"Non proprio"}</span><p><b>${esc(p.n)}.</b> ${esc(p.d)}</p><div class="e12-look"><span class="small">Derivazioni chiave:</span>${p.look.map(l=>`<b>${l}</b>`).join("")}</div></div><div class="row"><button class="btn primary" data-e12next>Prossimo ECG</button></div>`:""}</div>`}
  app.innerHTML=`<div><span class="eyebrow">Elettrocardiogramma</span><h2>ECG a 12 derivazioni</h2></div>
  <p class="lead">Tracciati completi come escono dall'elettrocardiografo (carta a 25 mm/s, 10 mm/mV, tre righe da 2,5 secondi più la striscia del ritmo in DII) o come appaiono sul monitor. I tracciati sono generati da un modello e cambiano ogni volta: allenano l'occhio, ma non sostituiscono un ECG reale.</p>
  ${tabs}${body}<div class="row"><a class="btn" href="#ecg-esercizi" style="text-decoration:none">Palestra ECG (striscia singola)</a><a class="btn" href="#enciclopedia" style="text-decoration:none">Torna all'Enciclopedia</a></div>`;
  app.querySelectorAll("[data-e12m]").forEach(b=>b.onclick=()=>{S.mode=b.dataset.e12m;view()});
  app.querySelectorAll("[data-e12v]").forEach(b=>b.onclick=()=>{S.view=b.dataset.e12v;view()});
  app.querySelectorAll("[data-e12k]").forEach(b=>b.onclick=()=>{S.k=b.dataset.e12k;S.seed=1;view()});
  const nb=app.querySelector("[data-e12new]");if(nb)nb.onclick=()=>{S.seed++;view()};
  app.querySelectorAll("[data-e12a]").forEach(b=>b.onclick=()=>{if(S.ex.ans)return;S.ex.ans=b.dataset.e12a;S.n++;if(S.ex.ans===S.ex.k)S.ok++;view()});
  const nx=app.querySelector("[data-e12next]");if(nx)nx.onclick=()=>{newEx();view();window.scrollTo({top:0,behavior:"smooth"})};
}
return {LEADS,P,gen,paper,monitor,view};
})();
