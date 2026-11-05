/* Palestre avanzate: monitor del ventilatore (terapia intensiva), capnografia, casi integrati
   e controllo degli esercizi aggiunti ogni giorno. Valori e tracciati simulati, a solo uso didattico. */
(function(G){
"use strict";
const rnd=Math.random;
const R=(a)=>Array.isArray(a)?a[0]+rnd()*(a[1]-a[0]):a;           /* numero fisso o intervallo [min,max] */
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const f1=(n,d)=>(+n).toFixed(d==null?0:d).replace(".",",");

/* ===================== EGA: generazione dei valori e classificazione ===================== */
function egaGen(sc){const x=sc.x||{};
  const v={fio2:sc.fio2,pco2:R(sc.pco2),hco3:R(sc.hco3),po2:R(sc.po2)};v.ph=6.1+Math.log10(v.hco3/(.0307*v.pco2));
  v.hb=x.hb?R(x.hb):R(sc.sex==="F"?[12.2,14.6]:[13.4,16.2]);v.cohb=x.cohb?R(x.cohb):R([.4,1.6]);v.methb=R([.3,.9]);
  const s=100/(23400/(Math.pow(v.po2,3)+150*v.po2)+1);v.so2=Math.min(99.6,s);v.o2hb=v.so2*(100-v.cohb-v.methb)/100;
  v.na=x.na?R(x.na):R([136,143]);v.k=x.k?R(x.k):R([3.6,4.8]);v.ca=R([1.15,1.29]);v.glu=x.glu?R(x.glu):R([84,128]);v.lac=x.lac?R(x.lac):R([.6,1.6]);
  const gap=sc.gap?R(sc.gap):R([8,12]);v.cl=v.na-v.hco3-gap;v.gap=gap;
  v.be=.93*(v.hco3-24.4+14.8*(v.ph-7.4));v.pao2=v.fio2*713-v.pco2/.8;v.aa=Math.max(2,v.pao2-v.po2);v.cto2=1.34*v.hb*v.o2hb/100+.0031*v.po2;
  return v}
function egaClass(v){const ph=v.ph,c=v.pco2,h=v.hco3;const phc=ph<7.35?0:ph>7.45?2:1;let dis,comp;
  const cH=c>45,cL=c<35,hH=h>26,hL=h<22;
  if(phc===0){if(cH&&hL){dis="mx";comp=3}else if(cH){dis="ra";comp=hH?1:0}else{dis="ma";comp=cL?1:0}}
  else if(phc===2){if(cL&&hH){dis="mx";comp=3}else if(cL){dis="rb";comp=hL?1:0}else{dis="mb";comp=cH?1:0}}
  else{if(cH&&hH){dis=ph<7.4?"ra":"mb";comp=2}else if(cL&&hL){dis=ph<7.4?"ma":"rb";comp=2}else if((cH&&hL)||(cL&&hH)){dis="mx";comp=3}else{dis="no";comp=3}}
  const pf=v.po2/v.fio2,pfc=pf>=300?0:pf>=200?1:pf>=100?2:3;return {phc,dis,comp,pf,pfc}}

/* ===================== Ventilatore: modello a un compartimento ===================== */
/* Paw = PEEP + V/C + R·flusso − Pmus. Il modello simula 8 s di assestamento e poi la finestra mostrata. */
const VDEF={mode:"VC",vt:450,rr:14,peep:5,fio2:.4,ti:1,pause:.3,pins:12,ps:10,R:10,C:50,leak:0,sec:0,water:0,pmus:0,prr:0,pdur:.9,ineff:0,dbl:0,starve:0,disc:0,apnea:0,hold:0,plim:40,etco2:0};
function ventResolve(m0){const m=Object.assign({},VDEF,m0||{});for(const k in m)if(Array.isArray(m[k]))m[k]=R(m[k]);["vt","rr","peep","pins","ps","prr","plim"].forEach(k=>{if(typeof m[k]==="number")m[k]=Math.round(m[k])});m.fio2=Math.round(m.fio2*100)/100;m.ti=Math.round(m.ti*10)/10;m.etco2=Math.round(m.etco2);if(m.Rexp==null)m.Rexp=m.R;else m.Rexp=R(m.Rexp);return m}
function ventSim(m0,T){const m=m0.__r?m0:Object.assign(ventResolve(m0),{__r:1});T=T||10;
  const dt=.01,Tw=8,N=Math.round((T+Tw)/dt),C=m.C/1000;
  const spont=m.mode==="PSV"||m.mode==="CPAP";
  /* sforzi del paziente */
  const eff=[];
  if(m.pmus>0&&!m.starve){const per=60/(m.prr||m.rr);let t=-Tw+.3;let n=0;while(t<T){if(!(m.apnea&&t>(m.apneaAt!=null?m.apneaAt:2.2)))eff.push({s:t,d:m.pdur,ok:!(m.ineff&&(m.mode!=="PSV"||n%2===1)),dbl:0});t+=per*(.94+.12*rnd());n++}}
  const pm=t=>{let p=0;for(const e of eff){if(t>=e.s&&t<e.s+e.d)p+=m.pmus*Math.sin(Math.PI*(t-e.s)/e.d)}return p};
  const effAt=t=>eff.find(e=>t>=e.s&&t<e.s+e.d);
  let V=0,ph="exp",tp=0,nextM=-Tw+.4,lastB=-99,pk=0,vm=0,prevPm=0;
  const out={t:[],p:[],f:[],v:[],co:[]},B=[];let cur=null;
  const disc=m.disc?(typeof m.disc==="number"?m.disc:T*.4):null;
  const startB=(t)=>{ph="insp";tp=0;lastB=t;pk=0;vm=0;nextM=t+60/m.rr;cur={ts:t,pp:0,vti:0,vte:0,pplat:null,te:null,eef:0,vend:0};B.push(cur);
    if(m.starve&&m.pmus>0)eff.push({s:t,d:Math.max(m.pdur,m.ti*.95),ok:0})};
  for(let i=0;i<=N;i++){const t=-Tw+i*dt,P=pm(t),dis=disc!=null&&t>=disc;
    /* avvio dell'atto */
    if(ph==="exp"){let go=false;
      if(!spont&&!m.apnea&&t>=nextM)go=true;
      if(!spont&&m.apnea&&t>=nextM&&t<(m.apneaAt!=null?m.apneaAt:2.2))go=true;
      const e=effAt(t);
      if(e&&e.ok&&P>.8&&prevPm<=.8&&t-lastB>.35)go=true;
      if(go){if(cur){cur.eef=out._lf||0;cur.vend=V}startB(t)}}
    let flow=0,paw=m.peep;
    if(ph==="insp"){tp+=dt;
      if(m.mode==="VC"){const tf=Math.max(.2,m.ti-m.pause),F=m.vt/1000/tf;
        if(tp<=tf){flow=F;paw=m.peep+V/C+m.R*F-P}else{flow=0;paw=m.peep+V/C-P;cur.pplat=paw}
        if(tp>=m.ti){ph="exp";tp=0;cur.te=t;
          if(m.dbl){const e=effAt(t);if(e&&!e.dbl&&pm(t)>1.5){e.dbl=1;cur.eef=0;cur.vend=V;startB(t)}}}}
      else{const lev=m.mode==="PC"?m.pins:m.mode==="PSV"?m.ps:0;const target=m.peep+lev*(1-Math.exp(-tp/.06));
        paw=target;flow=(target-(m.peep+V/C-P))/m.R;if(flow>pk)pk=flow;
        const end=m.mode==="PC"?tp>=m.ti:m.mode==="PSV"?(tp>.25&&flow<.25*pk)||tp>2.2:true;
        if(end){if(Math.abs(flow)<.08)cur.pplat=paw;ph="exp";tp=0;cur.te=t}}}
    else{flow=(P-V/C)/m.Rexp;paw=m.peep-.18*P}
    if(m.mode==="CPAP"){paw=m.peep-.2*P;flow=(P-V/C)/m.Rexp;if(!cur||t-cur.ts>60/(m.prr||12)*.6){}}
    V+=flow*dt;
    /* misura del ventilatore: perdite, disconnessione, rumore */
    let fm=flow,pw=paw;
    if(m.leak&&fm<0)fm*=(1-m.leak);
    if(m.leak&&ph==="insp"&&m.mode!=="VC")fm+=m.leak*.25;
    if(dis){pw=.4+.25*Math.sin(t*9);if(ph==="insp")fm=m.mode==="VC"?m.vt/1000/Math.max(.2,m.ti-m.pause):1.4*(1-Math.exp(-tp/.15));else fm=0}
    if(m.sec&&Math.abs(fm)>.03){const sw=((t*13.7)%1)-.5;fm+=m.sec*sw*.16;pw+=m.sec*sw*1.6}
    if(m.water&&ph!=="insp"&&Math.abs(fm)>.02){const o=Math.sin(t*2*Math.PI*4.3);fm+=m.water*o*.1;pw+=m.water*o*.9}
    vm+=fm*dt;
    if(cur){if(pw>cur.pp)cur.pp=pw;if(fm>0&&ph==="insp")cur.vti+=fm*dt;if(fm<0)cur.vte-=fm*dt}
    out._lf=fm;
    if(m.mode==="CPAP"&&!cur){cur={ts:t,pp:0,vti:0,vte:0,pplat:null,te:null,eef:0,vend:0};B.push(cur)}
    if(m.mode==="CPAP"&&cur&&P>.8&&prevPm<=.8){cur.eef=fm;cur.vend=V;cur={ts:t,pp:0,vti:0,vte:0,pplat:null,te:t+.8,eef:0,vend:0};B.push(cur);vm=0}
    prevPm=P;
    if(t>=0&&i%2===0){out.t.push(t);out.p.push(pw);out.f.push(fm*60);out.v.push(Math.max(-50,vm*1000));out.co.push(ph)}
  }
  /* misure sugli atti completi della finestra */
  const W=B.filter((b,i)=>b.ts>=-.01&&i<B.length-1);const L=W.length?W:B.slice(-2,-1);
  const avg=(a,k)=>a.length?a.reduce((s,b)=>s+(b[k]||0),0)/a.length:0;
  const mm={};
  mm.n=B.filter(b=>b.ts>=0&&b.ts<T).length;
  {const st=B.filter(b=>b.ts>-6&&b.ts<T).map(b=>b.ts);mm.rr=m.apnea||st.length<2?mm.n*60/T:60*(st.length-1)/(st[st.length-1]-st[0])}
  mm.ppeak=Math.max(...out.p);
  const pl=L.filter(b=>b.pplat!=null);mm.pplat=disc!=null?null:pl.length?avg(pl,"pplat"):null;
  mm.vti=avg(L,"vti")*1000;mm.vte=disc!=null?0:avg(L,"vte")*1000;
  if(m.apnea){mm.vte=avg(B.filter(b=>b.ts>-3),"vte")*1000}
  mm.ve=(disc!=null?0:B.filter(b=>b.ts>=0&&b.ts<T).reduce((s,b)=>s+b.vte,0))*60/T;
  mm.eef=Math.min(...L.map(b=>b.eef||0))*60;                              /* l/min a fine espirazione (negativo = ancora in uscita) */
  mm.peepi=Math.max(0,avg(L,"vend")/C);
  mm.pmean=out.p.reduce((a,b)=>a+b,0)/out.p.length;
  mm.peeptot=m.peep+(m.hold?mm.peepi:0);
  mm.dp=mm.pplat!=null?mm.pplat-mm.peeptot:null;
  mm.cst=mm.dp&&mm.dp>0?mm.vte/mm.dp:null;
  mm.ie=(()=>{const b=L[0];if(!b||b.te==null)return null;const ti=b.te-b.ts,tt=60/Math.max(1,mm.rr||m.rr);return tt/ti-1})();
  mm.pres=mm.pplat!=null?mm.ppeak-mm.pplat:null;
  /* curva della CO2 allineata agli atti */
  const et=m.etco2||0;if(et){let lev=0;out.cap=out.t.map((t,i)=>{const ins=out.co[i]==="insp";const tgt=disc!=null&&t>=disc?0:ins?0:et*(.9+.1*Math.min(1,(t%3)/3));lev+=(tgt-lev)*(ins?.45:.22);return Math.max(0,lev)})}
  out.m=m;out.mm=mm;out.T=T;out.disc=disc;
  out.alarms=ventAlarms(m,mm);out.find=ventFind(m,mm);
  return out}
function ventAlarms(m,mm){const A=[];
  if(m.disc)A.push(["r","Disconnessione paziente"],["r","Pressione vie aeree bassa"]);
  if(m.apnea)A.push(["r","Apnea"]);
  if(mm.ppeak>=m.plim)A.push(["r","Pressione vie aeree alta"]);
  if(!m.disc&&!m.apnea){
    if(m.mode==="VC"&&mm.vte<m.vt*.75)A.push(["y","Volume corrente espirato basso"]);
    if(m.mode!=="VC"&&mm.vte<(m.vtlo||300))A.push(["y","Volume corrente espirato basso"]);
    if(m.leak>=.2)A.push(["y","Perdita"]);
    if(mm.ve<4)A.push(["y","Volume minuto basso"]);
    if(mm.ve>15)A.push(["y","Volume minuto alto"]);
    if(mm.rr>35)A.push(["y","Frequenza respiratoria alta"]);}
  if(m.al)m.al.forEach(a=>A.push(a));
  return A.filter((a,i)=>A.findIndex(b=>b[1]===a[1])===i)}
const VFIND={disc:"Pressione che crolla a zero e volume che non torna: disconnessione",apnea:"Nessun atto respiratorio: curve piatte (apnea)",
  leak:"Volume espirato minore dell'inspirato: la curva del volume non torna a zero (perdita)",asinc:"Sforzi del paziente fuori sincronia con il ventilatore (asincronia)",
  saw:"Curve seghettate (secrezioni o condensa nel circuito)",autopeep:"Il flusso espiratorio non torna a zero prima dell'atto successivo (auto-PEEP)",
  res:"Picco alto con plateau normale: picco − plateau oltre 10 cmH₂O (resistenze aumentate)",comp:"Plateau e driving pressure alti: compliance ridotta",none:"Curve regolari, nessuna anomalia evidente"};
function ventFind(m,mm){
  if(m.disc)return "disc";if(m.apnea)return "apnea";if(m.leak>=.2)return "leak";
  if(m.ineff||m.dbl||m.starve)return "asinc";if(m.sec||m.water)return "saw";
  if(mm.eef<-3)return "autopeep";
  if(mm.pres!=null&&mm.pres>10)return "res";
  if((mm.dp!=null&&mm.dp>15)||(mm.cst!=null&&mm.cst<30))return "comp";
  return "none"}
const VMODE={VC:"Volume controllato (VC): flusso costante «a onda quadra», la pressione sale a rampa",PC:"Pressione controllata (PC): pressione «a onda quadra», flusso decelerante",
  PSV:"Pressione di supporto (PSV): ogni atto è avviato dal paziente, durata variabile",CPAP:"CPAP: pressione costante, il paziente respira da solo"};
const VDP=["≤ 15 cmH₂O (ventilazione protettiva)","16-20 cmH₂O","Oltre 20 cmH₂O","Non calcolabile con questi dati (manca il plateau)"];
function ventDpCat(mm){if(mm.dp==null)return 3;const d=Math.round(mm.dp);return d<=15?0:d<=20?1:2}

/* ---- disegno del monitor del ventilatore (impaginazione da terapia intensiva, colori del sito) ---- */
function VW(){return typeof innerWidth!=="undefined"&&innerWidth<640?380:600}
function niceMax(v,step,min){return Math.max(min,Math.ceil(v/step)*step)}
/* grafico con assi: scala uniforme, testo leggibile */
function vChart(a,lo,hi,o){const W=o.W||VW(),H=o.H||120,L=36,Rr=8,Tp=16,B=o.xl?18:6,ih=H-Tp-B,iw=W-L-Rr;
  const Y=v=>Tp+ih-(clamp(v,lo,hi)-lo)/(hi-lo)*ih,X=i=>L+i*iw/(a.length-1);
  const d=a.map((v,i)=>(i?"L":"M")+X(i).toFixed(1)+" "+Y(v).toFixed(1)).join("");
  const tk=(o.ticks||[]).map(v=>`<path class="vc-g${v===0?" z":""}" d="M${L} ${Y(v).toFixed(1)}H${W-Rr}"/><text x="${L-5}" y="${(Y(v)+3.5).toFixed(1)}" class="vc-n" text-anchor="end">${v}</text>`).join("");
  const refs=(o.refs||[]).map(r=>`<path class="vc-ref ${r[1]||""}" d="M${L} ${Y(r[0]).toFixed(1)}H${W-Rr}"/>`).join("");
  let xt="";if(o.xl&&o.T){const stp=W<500?2:1;for(let s=stp;s<o.T-.6;s+=stp){const x=L+s/o.T*iw;xt+=`<path class="vc-g" d="M${x.toFixed(1)} ${Tp+ih}v4"/><text x="${x.toFixed(1)}" y="${H-3}" class="vc-n" text-anchor="middle">${s}</text>`}xt+=`<text x="${W-Rr}" y="${H-3}" class="vc-n" text-anchor="end">s</text>`}
  return `<svg class="vc ${o.cls||""}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><text x="${L+4}" y="11"><tspan class="vc-t">${o.lab}</tspan><tspan class="vc-u" dx="6">${o.unit}</tspan></text>${tk}${refs}<path class="vc-axis" d="M${L} ${Tp}V${Tp+ih}"/>${xt}<path class="vc-w" d="${d}"/>${o.T&&!(typeof RM!=="undefined"&&RM)?`<rect class="vc-gap" x="${L+1}" y="${Tp-2}" width="${Math.round(iw*.045)}" height="${ih+4}" style="--gx:${iw-Math.round(iw*.045)}px;animation-duration:${o.T}s"/>`:""}${o.extra||""}</svg>`}
/* ultimo atto completo: indici [inizio, fine) */
function lastBreath(S){const st=[];for(let i=1;i<S.co.length;i++)if(S.co[i]==="insp"&&S.co[i-1]!=="insp")st.push(i);
  if(st.length>=2)return [st[st.length-2],st[st.length-1]];if(st.length===1)return [st[0],S.co.length];return [0,S.co.length]}
function vLoop(S,pmax,vmax){const W=300,H=210,L=34,B=20,Tp=16,Rr=10,iw=W-L-Rr,ih=H-Tp-B;const [a,b]=lastBreath(S);
  const X=p=>L+clamp(p,0,pmax)/pmax*iw,Y=v=>Tp+ih-clamp(v,0,vmax)/vmax*ih;
  let d="";for(let i=a;i<b;i++)d+=(i===a?"M":"L")+X(S.p[i]).toFixed(1)+" "+Y(S.v[i]).toFixed(1);
  const gx=[0,pmax/2,pmax].map(p=>`<path class="vc-g" d="M${X(p).toFixed(1)} ${Tp}V${Tp+ih}"/><text x="${X(p).toFixed(1)}" y="${H-5}" class="vc-n" text-anchor="middle">${p}</text>`).join("");
  const gy=[0,vmax/2,vmax].map(v=>`<path class="vc-g" d="M${L} ${Y(v).toFixed(1)}H${W-Rr}"/><text x="${L-5}" y="${(Y(v)+3.5).toFixed(1)}" class="vc-n" text-anchor="end">${v}</text>`).join("");
  const per=(b-a)*(S.T/S.p.length);const dot=d&&!(typeof RM!=="undefined"&&RM)&&!S.m.disc&&!S.m.apnea?`<circle r="4.5" class="vc-dot"><animateMotion dur="${Math.max(1,per).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`:"";
  return `<svg class="vc vc-loop" viewBox="0 0 ${W} ${H}" aria-hidden="true"><text x="${L+4}" y="11" class="vc-t">Anello P-V</text><text x="${W-Rr}" y="11" class="vc-u" text-anchor="end">ml / cmH₂O</text>${gx}${gy}<path class="vc-w" d="${d||"M0 0"}"/>${dot}</svg>`}
/* polmone schematico: dimensione = compliance, bronchi = resistenze */
function vLung(S){const m=S.m,mm=S.mm;const sc=clamp((mm.cst||m.C)/60,.62,1.06),hiR=m.R>=18||m.sec,bw=clamp(9-m.R/6,2.6,7.5);
  const lung=(dx,flip)=>`<path class="lu" transform="translate(${dx} 92) scale(${flip?-sc:sc} ${sc})" d="M-6 -62C-30 -62-46 -30-50 6C-54 40-46 58-24 60C-12 61-6 54-6 44Z"/>`;
  const tre=`<path class="br${hiR?" hi":""}" style="stroke-width:${(bw*1.5).toFixed(1)}" d="M150 18V66"/><path class="br${hiR?" hi":""}" style="stroke-width:${bw.toFixed(1)}" d="M150 66C140 74 128 80 118 92M150 66C160 74 172 80 182 92M118 92L106 112M118 92L116 120M182 92L194 112M182 92L184 120"/>`;
  const brk=m.disc?`<path class="brk" d="M136 30L164 30M140 38L160 38"/>`:"";
  const lk=m.leak>=.2?`<g class="lk"><circle cx="138" cy="26" r="3"/><circle cx="131" cy="20" r="2.2"/><circle cx="126" cy="13" r="1.5"/></g>`:"";
  const still=m.disc||m.apnea||(typeof RM!=="undefined"&&RM),per=60/Math.max(4,mm.rr||m.rr||12);
  return `<svg class="vc vc-lung" viewBox="0 0 300 160" aria-hidden="true"><g class="lu-b${still?"":" on"}" style="animation-duration:${per.toFixed(2)}s">${lung(146,0)}${lung(154,1)}</g>${tre}${brk}${lk}</svg>`}
function ventMon(S,o){o=o||{};const m=S.m,mm=S.mm,x=o.x||{},esc=G.esc||(s=>s);
  const pmax=niceMax(mm.ppeak+4,10,30),fA=Math.max(...S.f.map(Math.abs)),fmax=niceMax(fA+5,20,40),vmax=niceMax(Math.max(...S.v)+40,200,600);
  const charts=vChart(S.p,0,pmax,{H:118,lab:"Paw",unit:"cmH₂O",cls:"vc-p",ticks:[0,pmax/2,pmax],refs:[[m.peep,"peep"],[m.plim,"lim"]],T:S.T})
   +vChart(S.f,-fmax,fmax,{H:118,lab:"Flusso",unit:"l/min",cls:"vc-f",ticks:[-fmax,0,fmax],T:S.T})
   +vChart(S.v,0,vmax,{H:100,lab:"Volume",unit:"ml",cls:"vc-v",ticks:[0,vmax/2,vmax],xl:!S.cap,T:S.T})
   +(S.cap?vChart(S.cap,0,60,{H:86,lab:"CO₂",unit:"mmHg",cls:"vc-c",ticks:[0,30,60],xl:1,T:S.T}):"");
  const hide=o.hideMode,modeTxt=(m.niv?"NIV · ":"")+({VC:"VC-AC",PC:"PC-AC",PSV:"PSV",CPAP:"CPAP"}[m.mode]);
  const al=S.alarms,red=al.some(a=>a[0]==="r");
  const NR=(hi,lo,v,lab,unit,cls,alarm)=>`<div class="vm-n${cls?" "+cls:""}${alarm?" al":""}"><span class="lim">${hi!=null?hi:""}<br>${lo!=null?lo:""}</span><b>${v}</b><span class="nm">${lab}<i>${unit}</i></span></div>`;
  const vlo=m.mode==="VC"?Math.round(m.vt*.75):(m.vtlo||300),vhi=m.mode==="VC"?Math.round(m.vt*1.5):900;
  const nums=[NR(m.plim,5,f1(mm.ppeak),"Ppicco","cmH₂O","",mm.ppeak>=m.plim||m.disc),
    NR(vhi,vlo,f1(mm.vte),"VTe","ml","",mm.vte<vlo),
    NR(35,8,f1(mm.rr),"FRtot","/min","",mm.rr>35||m.apnea),
    NR(null,null,mm.pplat!=null&&!m.disc?f1(mm.pplat):"---","Pplat","cmH₂O"),
    NR(15,4,f1(mm.ve,1),"VMe","l/min","",mm.ve<4||mm.ve>15),
    o.kg?NR(null,null,f1(mm.vte/o.kg,1),"VT/PI","ml/kg"):NR(null,null,f1(mm.pmean),"Pmedia","cmH₂O")].join("");
  const rinsp=m.mode==="VC"&&mm.pres!=null&&!m.disc?mm.pres/(m.vt/1000/Math.max(.2,m.ti-m.pause)):null;
  const knob=(v,u,l,hl)=>`<div class="vm-kb${hl?" hl":""}"><span class="vm-ring"><b>${v}</b><i>${u}</i></span><em>${l}</em></div>`;
  const kn=m.mode==="VC"?[[m.rr,"/min","Frequenza"],[m.vt,"ml","Volume"],[m.peep,"cmH₂O","PEEP"],[Math.round(m.fio2*100),"%","Ossigeno"],[f1(m.ti,1),"s","Ti"]]
    :m.mode==="PC"?[[m.rr,"/min","Frequenza"],[m.pins,"cmH₂O","Pinsp"],[m.peep,"cmH₂O","PEEP"],[Math.round(m.fio2*100),"%","Ossigeno"],[f1(m.ti,1),"s","Ti"]]
    :m.mode==="PSV"?[[m.ps,"cmH₂O","Psupporto"],[m.peep,"cmH₂O",m.niv?"EPAP":"PEEP"],[Math.round(m.fio2*100),"%","Ossigeno"],[2,"l/min","Trigger"],[25,"%","Ciclaggio"]]
    :[[m.peep,"cmH₂O","CPAP"],[Math.round(m.fio2*100),"%","Ossigeno"]];
  const vit=Object.entries(x).map(([k,v])=>`<span><i>${esc(k)}</i>${esc(String(v))}</span>`).join("");
  return `<div class="vmon${o.anim&&!(typeof RM!=="undefined"&&RM)?" vm-anim":""}" role="img" aria-label="Monitor del ventilatore: valori misurati, curve di pressione, flusso e volume, polmone e impostazioni">
   <div class="vm-al${al.length?(red?" r":" y"):""}">${al.length?al.map(a=>`<span class="${a[0]}">${esc(a[1])}</span>`).join(""):"<span class=\"ok\">Nessun allarme attivo</span>"}${m.hold?`<span class="hold">PEEP totale <b>${f1(mm.peeptot,1)}</b></span>`:""}</div>
   <div class="vm-grid">
    <div class="vm-nums">${nums}${vit?`<div class="vm-vit">${vit}</div>`:""}</div>
    <div class="vm-mid"><div class="vm-waves">${charts}<div class="vm-sweep" aria-hidden="true"></div></div>
     <div class="vm-panels"><div class="vm-pan"><div class="vm-pan-h"><span>${o.kg?`Adulto · peso ideale ${o.kg} kg`:"Adulto"}</span><span>${m.mode==="VC"||m.mode==="PC"?"Polmone dinamico":"Polmone"}</span></div>${vLung(S)}
       <div class="vm-mini"><span><b>${rinsp!=null?f1(rinsp):"---"}</b><i>Rinsp<br>cmH₂O/l/s</i></span><span><b>${mm.cst!=null&&!m.disc?f1(mm.cst):"---"}</b><i>Cstat<br>ml/cmH₂O</i></span><span><b>${S.cap&&!m.disc?f1(m.etco2):"---"}</b><i>PetCO₂<br>mmHg</i></span><span><b>${x.SpO2?esc(String(x.SpO2).replace(/[^0-9]/g,"").slice(0,3)||"---"):"---"}</b><i>SpO₂<br>%</i></span></div></div>
      <div class="vm-pan">${vLoop(S,pmax,vmax)}</div></div></div>
    <div class="vm-knobs"><div class="vm-modep">${hide?"<span class=\"vm-hid\">modalità ?</span>":esc(modeTxt)}</div>${kn.map(k=>knob(k[0],k[1],k[2])).join("")}</div>
   </div>
   <div class="vm-tabs"><span class="on">Monitoraggio</span><span>Curve</span><span>Allarmi${al.length?` <em>${al.length}</em>`:""}</span><span class="vm-clock mono">${esc(o.clock||"")}</span></div>
  </div>`}
function ventRead(S,kg){const m=S.m,mm=S.mm,L=[];
  if(m.disc){L.push("La pressione crolla vicino a zero e non c'è più flusso espiratorio: il circuito è aperto. Il ventilatore continua a erogare, ma il gas non arriva al paziente e non torna indietro.");return L.join("<br>")}
  if(m.apnea){L.push("Dopo l'ultimo atto non arrivano più sforzi del paziente: in pressione di supporto, senza sforzi non c'è ventilazione. Il ventilatore passa alla ventilazione di riserva (backup) solo dopo il tempo di apnea impostato.");return L.join("<br>")}
  L.push(`<b>Ppicco ${f1(mm.ppeak)} cmH₂O</b>${mm.pplat!=null?` · <b>Pplat ${f1(mm.pplat)}</b> · picco − plateau = ${f1(mm.pres)} (resistenze; normale fino a circa 10)`:""}.`);
  if(mm.dp!=null)L.push(`<b>Driving pressure</b> = Pplat − PEEP${m.hold?" totale":""} = ${f1(mm.pplat)} − ${f1(mm.peeptot)} = <b>${f1(mm.dp)} cmH₂O</b> (obiettivo ≤ 15). <b>Compliance statica</b> ≈ VTe ÷ driving pressure = ${f1(mm.vte)} ÷ ${f1(mm.dp)} ≈ <b>${f1(mm.cst)} ml/cmH₂O</b> (normale 50-100 nel ventilato).`);
  else L.push("Plateau non disponibile: in questa modalità serve una pausa di fine inspirazione per calcolare la driving pressure.");
  L.push(`<b>VTe ${f1(mm.vte)} ml</b>${kg?` = ${f1(mm.vte/kg,1)} ml/kg di peso ideale (protettivo 6-8)`:""} · VMe ${f1(mm.ve,1)} l/min · FR ${f1(mm.rr)}/min.`);
  if(mm.eef<-3)L.push(`A fine espirazione il flusso è ancora ${f1(-mm.eef)} l/min in uscita: l'aria non fa in tempo a uscire${m.hold?`; la pausa espiratoria misura una PEEP totale di ${f1(mm.peeptot)} cmH₂O (auto-PEEP ≈ ${f1(mm.peepi)})`:""}.`);
  if(m.leak>=.2)L.push(`Esce circa il ${Math.round(m.leak*100)}% di volume in meno di quello che entra (VTi ${f1(mm.vti)} ml): la curva del volume non torna a zero e viene «tagliata» all'atto successivo.`);
  return L.join("<br>")}

/* ===================== Capnografia ===================== */
const CSHAPE={norm:"Forma normale: salita ripida, plateau quasi piatto, discesa rapida",shark:"«A pinna di squalo»: salita lenta e plateau inclinato",base:"La linea di base non torna a zero in inspirazione",
  cleft:"Incisura nel plateau (atti spontanei del paziente)",exo:"Poche curve sempre più basse fino a sparire",zero:"La curva scompare all'improvviso",up:"Aumento brusco e marcato dell'EtCO₂",
  down:"Calo brusco dell'EtCO₂ con forma conservata",rise:"Aumento progressivo dell'EtCO₂ atto dopo atto",rcp:"Onde basse con le ondulazioni delle compressioni toraciche",cardio:"Piccole ondulazioni regolari alla fine del plateau (oscillazioni cardiogeniche)"};
const CET=["Assente o vicina a zero","Bassa (< 35 mmHg)","Nella norma (35-45 mmHg)","Alta (> 45 mmHg)"];
function capnoSim(cp0){const cp=Object.assign({rr:12,base:0,at:.5},cp0||{});for(const k in cp)if(Array.isArray(cp[k]))cp[k]=R(cp[k]);
  const per=60/cp.rr,T=clamp(per*5,16,30),dt=.02,n=Math.round(T/dt),y=[],ets=[];
  const nb=Math.ceil(T/per)+1;
  for(let b=0;b<nb;b++){const ts=b*per,fr=ts/T;let e=cp.et;
    if(cp.f==="exo")e=[28,17,9,4,1.5,0,0,0,0][b]*(cp.et/28||1);
    else if(cp.f==="zero")e=fr<cp.at?cp.et:0;
    else if(cp.f==="up")e=fr<cp.at?cp.et0:fr<cp.at+.5*per/T?(cp.et0+cp.et)/2+4:cp.et;
    else if(cp.f==="down")e=fr<cp.at?cp.et0:fr<cp.at+.5*per/T?(cp.et0+cp.et)/2:cp.et;
    else if(cp.f==="rise")e=cp.et0+(cp.et-cp.et0)*clamp(fr/.85,0,1);
    ets.push(e*(.97+.06*rnd()))}
  const comp=cp.f==="rcp"||(cp.f==="up"&&cp.rcp);
  for(let i=0;i<n;i++){const t=i*dt,b=Math.floor(t/per),tb=t-b*per,e=ets[b],ie=per*.36;let v;
    const base=cp.base||0;
    if(tb<ie)v=base;                                   /* inspirazione */
    else{const te=tb-ie,dur=per-ie;
      if(cp.f==="shark"){v=base+(e-base)*(1-Math.exp(-te/(dur*.32)))}
      else{v=base+(e-base)*(te<.14?te/.14*.9:.9+.1*Math.min(1,(te-.14)/(dur-.14)))}
      if(cp.f==="cleft"&&te>dur*.42&&te<dur*.62)v-=(e-base)*.32*Math.sin(Math.PI*(te-dur*.42)/(dur*.2));
      if(cp.f==="cardio"&&te>dur*.55)v+=Math.sin(te*2*Math.PI*1.35)*1.6;
      if(te>dur-.12)v=base+(v-base)*Math.max(0,(dur-te)/.12)}
    if(comp&&(cp.f==="rcp"||t/T<cp.at))v+=Math.max(0,Math.sin(t*2*Math.PI*1.85))*Math.max(2,e*.28);
    y.push(Math.max(0,v+(rnd()-.5)*.5))}
  const li=Math.max(0,Math.min(ets.length-1,Math.ceil(T/per-1e-6)-1)),shown=ets[li];
  return {cp,T,y,ets:ets.slice(0,Math.ceil(T/per)),et:shown,rr:cp.f==="zero"&&shown<1?0:cp.f==="exo"&&shown<1?0:cp.rr}}
function capnoCat(S){const e=S.et;return e<5?0:e<35?1:e<=45?2:3}
function capnoMon(S,o){o=o||{};const esc=G.esc||(s=>s);const top=S.cp.et>58||(S.cp.et0||0)>58?80:60;
  const ticks=top===80?[0,20,40,60,80]:[0,15,30,45,60];
  const chart=vChart(S.y,0,top,{H:170,lab:"CO₂",unit:"mmHg",cls:"vc-c",ticks,refs:[[35,"band"],[45,"band"]],xl:1,T:S.T});
  const bars=S.ets.map(e=>`<i style="height:${Math.max(2,Math.round(e/top*100))}%"><em>${Math.round(e)}</em></i>`).join("");
  const vit=Object.entries(o.x||{}).map(([k,v])=>`<span><i>${esc(k)}</i>${esc(String(v))}</span>`).join("");
  const NR=(hi,lo,v,lab,unit,alarm)=>`<div class="vm-n${alarm?" al":""}"><span class="lim">${hi!=null?hi:""}<br>${lo!=null?lo:""}</span><b>${v}</b><span class="nm">${lab}<i>${unit}</i></span></div>`;
  const al=[];if(S.et<5)al.push(["r","CO₂ assente"]);else if(S.et<30)al.push(["y","EtCO₂ bassa"]);else if(S.et>50)al.push(["y","EtCO₂ alta"]);if((S.cp.base||0)>3)al.push(["y","CO₂ inspirata"]);if(S.rr&&S.rr<8)al.push(["y","Frequenza bassa"]);
  return `<div class="vmon cmon${o.anim&&!(typeof RM!=="undefined"&&RM)?" vm-anim":""}" role="img" aria-label="Capnogramma con valori di EtCO₂ atto per atto">
   <div class="vm-al${al.length?(al.some(a=>a[0]==="r")?" r":" y"):""}">${al.length?al.map(a=>`<span class="${a[0]}">${esc(a[1])}</span>`).join(""):"<span class=\"ok\">Nessun allarme attivo</span>"}</div>
   <div class="vm-grid">
    <div class="vm-nums">${NR(50,30,f1(S.et),"EtCO₂","mmHg",S.et<30||S.et>50)}${NR(30,8,S.rr?f1(S.rr):"---","FR","/min",!S.rr||S.rr<8)}${NR(3,null,f1(S.cp.base||0),"FiCO₂","mmHg",(S.cp.base||0)>3)}${vit?`<div class="vm-vit">${vit}</div>`:""}</div>
    <div class="vm-mid"><div class="vm-waves">${chart}<div class="vm-sweep" aria-hidden="true"></div></div>
     <div class="vm-panels one"><div class="vm-pan"><div class="vm-pan-h"><span>EtCO₂ atto per atto</span><span>${esc(o.where||"campionamento dal circuito")}</span></div><div class="cm-bars">${bars}</div></div></div></div>
   </div>
   <div class="vm-tabs"><span class="on">Capnografia</span><span>Andamento</span><span>Allarmi${al.length?` <em>${al.length}</em>`:""}</span><span class="vm-clock mono">${esc(o.clock||"")}</span></div>
  </div>`}
/* ===================== Scenari del ventilatore ===================== */
const VENT_SC=[
 {id:"vc-ok",n:"Ventilazione in volume controllato ben impostata",rep:"Terapia intensiva",sex:"M",age:[55,75],kg:70,
  st:"Uomo operato di chirurgia addominale maggiore, ancora intubato e sedato in attesa del risveglio. Torace che si espande in modo simmetrico.",
  m:{mode:"VC",vt:[440,470],rr:14,peep:5,fio2:.4,ti:1,pause:.3,R:[9,11],C:[52,60],etco2:[36,40]},x:{FC:84,PA:"128/74",SpO2:"98%"},
  q:"Che cosa controlli e documenti a ogni turno?",o:["Parametri impostati e misurati, allarmi attivi, pressione della cuffia, posizione del tubo (tacca ai denti), testata del letto a 30-45°","Solo la frequenza respiratoria","Che gli allarmi siano disattivati per non disturbare il paziente","Nulla, se le curve sono regolari"],c:0,
  e:"Curve regolari: picco moderato, plateau basso, driving pressure sotto 15 e volume di 6-7 ml/kg di peso ideale. La sorveglianza infermieristica comprende anche la prevenzione della polmonite associata alla ventilazione."},
 {id:"pc-ok",n:"Ventilazione in pressione controllata ben impostata",rep:"Terapia intensiva",sex:"F",age:[45,70],kg:60,
  st:"Donna intubata per un'emorragia cerebrale, sedata. Ventilata con una modalità a pressione impostata.",
  m:{mode:"PC",pins:[10,11],rr:14,peep:5,fio2:.35,ti:1.2,R:[8,10],C:[42,46],etco2:[35,38]},x:{FC:72,PA:"132/78",SpO2:"98%"},
  q:"In pressione controllata, che cosa sorvegli con più attenzione?",o:["Il volume corrente espirato: se cambiano compliance o resistenze, cambia il volume che entra","La pressione di picco, che varia a ogni atto","Il flusso inspiratorio costante","Nulla: la pressione è garantita"],c:0,
  e:"In pressione controllata la pressione è fissa e il volume dipende dal polmone: se la compliance cala o aumentano le resistenze, il volume si riduce. Per questo l'allarme di volume basso va sempre impostato."},
 {id:"secr",n:"Secrezioni nelle vie aeree",rep:"Terapia intensiva",sex:"M",age:[60,80],kg:72,
  st:"Uomo intubato per polmonite. Tossisce, alla trachea si sentono rumori grossolani e la saturazione scende.",
  m:{mode:"VC",vt:[460,480],rr:16,peep:6,fio2:.4,ti:1,pause:.3,R:[21,24],C:[44,48],sec:1,etco2:[44,47]},x:{FC:108,PA:"142/82",SpO2:"90%"},
  q:"Che cosa fai?",o:["Aspirazione endotracheale con tecnica sterile e preossigenazione, poi rivaluti curve e saturazione","Aumenti la PEEP","Sgonfi la cuffia","Aumenti il volume corrente"],c:0,
  e:"Le resistenze aumentano (picco alto, plateau quasi invariato) e le curve sono seghettate: secrezioni. L'aspirazione dura al massimo 10-15 secondi, con un sondino non più largo di metà del diametro interno del tubo."},
 {id:"bronco",n:"Broncospasmo con auto-PEEP",rep:"Terapia intensiva",sex:"F",age:[25,55],kg:58,
  st:"Donna con asma grave, intubata dopo una crisi. Torace iperespanso, sibili diffusi, espirazione molto lunga.",
  m:{mode:"VC",vt:[380,400],rr:18,peep:5,fio2:.5,ti:.9,pause:.2,R:[32,36],C:[55,60],etco2:[48,54]},x:{FC:122,PA:"104/62",SpO2:"92%"},
  q:"Che cosa prepari su prescrizione e che cosa ti aspetti di cambiare?",o:["Broncodilatatori per via inalatoria nel circuito; il medico riduce la frequenza per allungare l'espirazione","Aumento della frequenza respiratoria","Aumento del volume corrente","Sospensione della sedazione"],c:0,
  e:"Picco molto alto per le resistenze e flusso espiratorio che non arriva a zero: l'aria resta intrappolata (auto-PEEP), con rischio di barotrauma e ipotensione. Serve più tempo per espirare."},
 {id:"morso",n:"Tubo morso dal paziente",rep:"Terapia intensiva",sex:"M",age:[30,60],kg:75,
  st:"Uomo intubato dopo un trauma, sedazione appena ridotta. Si muove, serra i denti sul tubo e suona l'allarme di pressione alta.",
  m:{mode:"VC",vt:[480,500],rr:14,peep:5,fio2:.35,ti:1,pause:.3,R:[30,34],Rexp:[12,14],C:[50,56],etco2:[40,44]},x:{FC:112,PA:"152/90",SpO2:"95%"},
  q:"Che cosa fai?",o:["Inserisci un blocca-morso o una cannula orofaringea e avvisi il medico per la sedazione; controlli che il tubo non si sia spostato","Aspiri ripetutamente fino a far scomparire l'allarme","Aumenti la pressione massima d'allarme a 60","Sgonfi la cuffia"],c:0,
  e:"Picco alto con plateau normale: il problema è nel tubo (resistenza), non nel polmone. Il tubo morso si risolve con un blocca-morso e una sedazione adeguata."},
 {id:"ards",n:"ARDS con compliance ridotta",rep:"Terapia intensiva",sex:"M",age:[45,70],kg:70,
  st:"Uomo con ARDS da polmonite bilaterale, intubato da 24 ore. Ventilato con volume basso e PEEP alta.",
  m:{mode:"VC",vt:[415,430],rr:24,peep:12,fio2:.7,ti:.8,pause:.25,R:[11,13],C:[23,26],etco2:[46,50]},x:{FC:104,PA:"118/66",SpO2:"90%"},
  q:"Che cosa segnali al medico?",o:["Driving pressure oltre 15 e plateau vicino a 30: il polmone è rigido, serve rivalutare la strategia protettiva","Che il volume è troppo basso e va portato a 10 ml/kg","Che la PEEP va tolta","Nulla: i valori sono ideali"],c:0,
  e:"Nella ventilazione protettiva si cercano volume 6 ml/kg di peso ideale, plateau ≤ 30 e driving pressure ≤ 15 cmH₂O. Con P/F basso il medico valuta anche la pronazione."},
 {id:"ptx",n:"Pneumotorace iperteso",rep:"Terapia intensiva",sex:"M",age:[25,60],kg:75,
  st:"Uomo ventilato dopo un trauma toracico con fratture costali a destra. Durante la mobilizzazione la saturazione crolla e la pressione scende.",
  m:{mode:"VC",vt:[470,490],rr:16,peep:6,fio2:.5,ti:1,pause:.3,R:[11,13],C:[16,19],etco2:[22,26]},x:{FC:136,PA:"74/40",SpO2:"82%"},
  q:"Che cosa fai?",o:["Chiami subito il medico e il team, FiO₂ al 100% e prepari la decompressione con ago e il drenaggio toracico","Aspiri il tubo e attendi","Aumenti la PEEP","Riduci la frequenza"],c:0,
  e:"Picco e plateau entrambi alti: la compliance crolla all'improvviso. Con ipotensione e desaturazione nel traumatizzato ventilato è un pneumotorace iperteso fino a prova contraria."},
 {id:"selett",n:"Intubazione selettiva del bronco destro",rep:"Terapia intensiva",sex:"F",age:[50,80],kg:58,
  st:"Donna appena rientrata dalla TC. Il murmure è assente a sinistra; la tacca del tubo ai denti è a 25 cm, mentre in consegna era a 21 cm. PA stabile.",
  m:{mode:"VC",vt:[380,400],rr:16,peep:5,fio2:.4,ti:1,pause:.3,R:[12,14],C:[20,22],etco2:[38,42]},x:{FC:96,PA:"124/72",SpO2:"91%"},
  q:"Che cosa fai?",o:["Avvisi il medico per riposizionare il tubo ritirandolo alla misura corretta, poi controllo con auscultazione e radiografia","Aumenti il volume corrente per ventilare anche il polmone sinistro","Spingi il tubo ancora più in profondità","Sgonfi e rigonfi la cuffia senza altro"],c:0,
  e:"Plateau alto con volume normale: tutto il volume finisce in un solo polmone. La tacca spostata e il murmure assente a sinistra indicano il tubo nel bronco destro."},
 {id:"cuffia",n:"Perdita dalla cuffia del tubo",rep:"Terapia intensiva",sex:"M",age:[55,80],kg:70,
  st:"Uomo intubato da 5 giorni. Senti un gorgoglio alla bocca a ogni insufflazione e il paziente riesce a emettere qualche suono.",
  m:{mode:"VC",vt:[460,480],rr:14,peep:6,fio2:.4,ti:1,pause:.3,R:[9,11],C:[48,54],leak:[.32,.4],etco2:[30,34]},x:{FC:92,PA:"130/76",SpO2:"93%"},
  q:"Che cosa fai?",o:["Controlli la pressione della cuffia con il manometro (circa 20-30 cmH₂O) e la posizione del tubo; se la cuffia non tiene avvisi il medico","Gonfi la cuffia con 20 ml d'aria senza misurare","Aumenti il volume corrente fino a far tacere l'allarme","Sedi il paziente perché parla"],c:0,
  e:"Il volume espirato è molto più basso dell'inspirato: parte del gas esce intorno al tubo. La pressione della cuffia va misurata, non stimata: troppo bassa causa perdite e aspirazione, troppo alta lesioni della trachea."},
 {id:"disc",n:"Disconnessione del circuito",rep:"Terapia intensiva",sex:"F",age:[40,75],kg:62,
  st:"Durante l'igiene del letto suona un allarme a tutto volume; la paziente si colora di grigio.",
  m:{mode:"VC",vt:[420,440],rr:14,peep:8,fio2:.5,ti:1,pause:.3,R:[9,11],C:[40,46],disc:4,etco2:[36,40]},x:{FC:118,PA:"110/60",SpO2:"86%"},
  q:"Che cosa fai per primo?",o:["Guardi il paziente e il circuito, ricolleghi subito; se il problema non si risolve ventili con il pallone autoespansibile e ossigeno e chiami aiuto","Silenzi l'allarme e finisci l'igiene","Cambi il filtro senza ricollegare","Aumenti la FiO₂ e attendi"],c:0,
  e:"Pressione a zero, nessun volume di ritorno e nessuna CO₂: il gas non arriva al paziente. Il pallone autoespansibile con ossigeno deve essere sempre pronto al letto del paziente ventilato."},
 {id:"ineff",n:"Sforzi inefficaci (asincronia paziente-ventilatore)",rep:"Terapia intensiva",sex:"M",age:[60,80],kg:68,
  st:"Uomo con BPCO in svezzamento in pressione di supporto. Osservi il torace e l'addome: il paziente fa più sforzi di quanti atti il ventilatore eroghi.",
  m:{mode:"PSV",ps:[14,16],peep:5,fio2:.35,R:[18,20],C:[60,66],pmus:[5,6],prr:[28,30],ineff:1,etco2:[42,46]},x:{FC:98,PA:"136/80",SpO2:"94%"},
  q:"Che cosa fai?",o:["Segnali al medico gli sforzi che non attivano il ventilatore: spesso dipendono da supporto eccessivo o auto-PEEP e richiedono di cambiare le impostazioni","Aumenti la sedazione senza prescrizione","Disattivi il trigger","Nulla: è normale"],c:0,
  e:"Nelle curve di flusso e pressione compaiono piccole deflessioni in espirazione senza atto erogato: sforzi inefficaci. Aumentano la fatica del paziente e allungano lo svezzamento."},
 {id:"doppio",n:"Doppio trigger",rep:"Terapia intensiva",sex:"F",age:[40,70],kg:55,
  st:"Donna con ARDS lieve, sedazione ridotta. Sembra «affamata d'aria»: a volte due atti partono uno dopo l'altro senza espirazione.",
  m:{mode:"VC",vt:[330,350],rr:20,peep:8,fio2:.45,ti:.8,pause:.1,R:[10,12],C:[34,38],pmus:[9,10],pdur:1.7,prr:[19,21],dbl:1,etco2:[38,42]},x:{FC:110,PA:"128/70",SpO2:"93%"},
  q:"Perché il doppio trigger è pericoloso?",o:["Somma due volumi senza espirazione: il polmone riceve quasi il doppio del volume impostato","Riduce il volume corrente","Non ha conseguenze","Abbassa la pressione"],c:0,
  e:"Lo sforzo del paziente dura più del tempo inspiratorio della macchina e fa partire un secondo atto. Il medico valuta tempo inspiratorio, volume e sedazione."},
 {id:"fame",n:"Fame d'aria in volume controllato (flusso insufficiente)",rep:"Terapia intensiva",sex:"M",age:[30,60],kg:78,
  st:"Uomo con sepsi, febbrile e tachipnoico, ventilato in volume controllato. Usa i muscoli accessori durante l'insufflazione.",
  m:{mode:"VC",vt:[480,500],rr:20,peep:6,fio2:.4,ti:1,pause:0,R:[9,11],C:[45,50],pmus:[9,11],starve:1,etco2:[32,36]},x:{FC:118,PA:"110/64",SpO2:"95%"},
  q:"Che cosa noti nella curva di pressione e che cosa fai?",o:["La curva è «scavata» durante l'insufflazione perché il paziente tira più aria di quella erogata: lo segnali per adeguare flusso o modalità","La curva è normale","È una perdita della cuffia","È una disconnessione"],c:0,
  e:"In volume controllato il flusso è fisso: se il paziente vuole più aria, la pressione si abbassa invece di salire in modo lineare. È un'asincronia che aumenta il lavoro respiratorio."},
 {id:"psv-ok",n:"Pressione di supporto ben tollerata (svezzamento)",rep:"Terapia intensiva",sex:"F",age:[50,75],kg:60,
  st:"Donna in svezzamento dopo una polmonite. Sveglia, collaborante, respira con tranquillità.",
  m:{mode:"PSV",ps:[7,8],peep:5,fio2:.3,R:[8,10],C:[50,56],pmus:[6,7],prr:[16,18],etco2:[38,41]},x:{FC:86,PA:"126/74",SpO2:"96%"},
  q:"Quale tra questi è un criterio per proporre al medico la prova di respiro spontaneo?",o:["Paziente sveglio e collaborante, stabile senza vasopressori ad alte dosi, FiO₂ ≤ 40% e PEEP ≤ 5-8 cmH₂O","Febbre alta e secrezioni abbondanti","Ipotensione che richiede noradrenalina in aumento","Frequenza respiratoria di 40/min"],c:0,
  e:"Ogni atto parte dal paziente, con durata e frequenza variabili e volume adeguato: buona tolleranza del supporto. La valutazione quotidiana dello svezzamento riduce i giorni di ventilazione."},
 {id:"psv-apnea",n:"Apnea in pressione di supporto",rep:"Terapia intensiva",sex:"M",age:[60,85],kg:70,
  st:"Uomo in pressione di supporto. Dieci minuti fa ha ricevuto un bolo di sedativo e oppioide per una medicazione dolorosa.",
  m:{mode:"PSV",ps:[10,12],peep:5,fio2:.35,R:[9,11],C:[48,54],pmus:[6,7],prr:[14,16],apnea:1,apneaAt:2.4,etco2:[40,44]},x:{FC:68,PA:"104/60",SpO2:"93%"},
  q:"Che cosa fai?",o:["Controlli il paziente e chiami il medico: serve una modalità controllata o la ventilazione di riserva finché il paziente non riprende a respirare","Aspetti che si svegli da solo","Abbassi il supporto","Silenzi l'allarme di apnea"],c:0,
  e:"In pressione di supporto il ventilatore aiuta solo gli atti che il paziente avvia: se il paziente smette di respirare, non c'è ventilazione. L'allarme di apnea e la ventilazione di riserva sono la rete di sicurezza."},
 {id:"condensa",n:"Condensa nel circuito",rep:"Terapia intensiva",sex:"F",age:[50,80],kg:60,
  st:"Donna ventilata con umidificatore riscaldato. Il tubo corrugato è pieno di goccioline e si sente un gorgoglio nel circuito.",
  m:{mode:"VC",vt:[400,420],rr:14,peep:6,fio2:.35,ti:1,pause:.3,R:[10,12],C:[48,54],water:1,etco2:[37,40]},x:{FC:84,PA:"124/70",SpO2:"96%"},
  q:"Che cosa fai?",o:["Svuoti la trappola dell'acqua senza far scendere la condensa verso il paziente e tieni il circuito più in basso del tubo","Sollevi il circuito sopra la testa del paziente","Instilli soluzione fisiologica nel tubo","Aumenti il trigger"],c:0,
  e:"Le oscillazioni regolari delle curve in espirazione senza segni nel paziente indicano acqua nel circuito. Possono anche causare atti avviati senza sforzo del paziente (autotrigger)."},
 {id:"pc-comp",n:"Compliance ridotta in pressione controllata (edema polmonare)",rep:"Terapia intensiva",sex:"M",age:[60,85],kg:72,
  st:"Uomo con scompenso cardiaco, ventilato in pressione controllata. Nelle ultime ore il volume corrente è sceso; all'aspirazione escono secrezioni schiumose rosate.",
  m:{mode:"PC",pins:[17,18],rr:18,peep:8,fio2:.6,ti:1,R:[10,12],C:[17,19],etco2:[40,44]},x:{FC:112,PA:"146/90",SpO2:"89%"},
  q:"Perché il volume si è ridotto?",o:["In pressione controllata, se il polmone diventa più rigido (edema) con la stessa pressione entra meno volume","Per una perdita della cuffia","Perché il trigger è troppo sensibile","Perché la PEEP è troppo bassa"],c:0,
  e:"Driving pressure alta e compliance molto bassa: il volume per kg è sotto i 6 ml. L'allarme di volume basso è la prima spia in pressione controllata; il medico tratta l'edema e rivede le impostazioni."},
 {id:"bpco-hold",n:"Iperinsufflazione dinamica (auto-PEEP) nella BPCO",rep:"Terapia intensiva",sex:"M",age:[65,82],kg:66,
  st:"Uomo con BPCO, intubato, ipoteso dopo l'aumento della frequenza respiratoria. Il medico ti chiede di eseguire una pausa di fine espirazione.",
  m:{mode:"VC",vt:[450,470],rr:22,peep:5,fio2:.4,ti:1,pause:.2,R:[22,25],C:[68,74],hold:1,etco2:[44,48]},x:{FC:116,PA:"86/50",SpO2:"92%"},
  q:"Che cosa ti aspetti come correzione su prescrizione?",o:["Ridurre la frequenza e il tempo inspiratorio per lasciare più tempo all'espirazione","Aumentare la frequenza per eliminare più CO₂","Aumentare la PEEP impostata a 15","Aumentare il volume corrente"],c:0,
  e:"La pausa espiratoria misura una PEEP totale superiore a quella impostata: è auto-PEEP. L'aria intrappolata comprime il cuore e riduce il ritorno venoso. In caso di ipotensione grave il medico può far staccare brevemente il circuito per far uscire l'aria."}
];
/* ===================== Scenari della capnografia ===================== */
const CAPNO_SC=[
 {id:"cp-norm",n:"Capnogramma normale",rep:"Terapia intensiva",cp:{f:"norm",et:[36,40],rr:12},x:{FC:78,PA:"126/74",SpO2:"98%"},
  st:"Uomo intubato dopo un intervento, stabile. Lo studente in tirocinio ti chiede a che cosa serve la capnografia.",
  q:"Quale affermazione è corretta?",o:["Nel polmone sano l'EtCO₂ è di solito 2-5 mmHg più bassa della PaCO₂: utile per seguire la ventilazione, ma va confrontata con l'EGA","L'EtCO₂ è sempre identica alla PaCO₂","Serve a misurare la saturazione","Non serve nel paziente intubato"],c:0,
  e:"Plateau orizzontale, salita e discesa ripide, base a zero. La differenza tra PaCO₂ ed EtCO₂ aumenta quando c'è spazio morto (embolia, bassa gittata, BPCO)."},
 {id:"cp-iper",n:"Ipocapnia da iperventilazione",rep:"Terapia intensiva",cp:{f:"norm",et:[24,27],rr:26},x:{FC:88,PA:"138/80",SpO2:"99%"},
  st:"Uomo con trauma cranico, ventilato. Il ventilatore è stato impostato con frequenza alta durante il trasporto e non più corretto.",
  q:"Perché va segnalato?",o:["L'ipocapnia restringe i vasi cerebrali e riduce il flusso di sangue al cervello: va corretta su prescrizione","Perché la CO₂ bassa è sempre ideale","Perché indica una disconnessione","Non va segnalato"],c:0,
  e:"Forma normale ma valori bassi con frequenza alta: si elimina troppa CO₂. Nel trauma cranico l'iperventilazione è solo una misura temporanea decisa dal medico."},
 {id:"cp-ipov",n:"Ipoventilazione da oppioidi",rep:"Chirurgia",cp:{f:"norm",et:[60,66],rr:6},x:{FC:62,PA:"108/64",SpO2:"91% in O₂"},where:"cannula nasale con campionamento",
  st:"Donna operata ieri con pompa di morfina; molto sonnolenta, difficile da svegliare. Ha occhialini a 2 l/min.",
  q:"Che cosa fai?",o:["La stimoli, sospendi la pompa, chiami il medico e prepari naloxone su prescrizione; sostieni la ventilazione se serve","Aumenti l'ossigeno e la lasci riposare","Somministri un altro bolo per il dolore","Togli il capnografo"],c:0,
  e:"EtCO₂ alta con frequenza molto bassa: ipoventilazione. La saturazione con l'ossigeno può restare accettabile a lungo e nascondere il problema: la capnografia lo mostra prima."},
 {id:"cp-shark",n:"Broncospasmo (ostruzione all'espirazione)",rep:"Pronto soccorso",cp:{f:"shark",et:[48,54],rr:18},x:{FC:118,PA:"132/80",SpO2:"91%"},
  st:"Uomo con BPCO riacutizzata, sibili diffusi ed espirazione prolungata.",
  q:"Che cosa indica la forma della curva?",o:["Ostacolo all'uscita dell'aria (broncospasmo, BPCO): la CO₂ esce lentamente","Rirespirazione","Ripresa del circolo","Tubo in esofago"],c:0,
  e:"La salita lenta e il plateau inclinato («pinna di squalo») indicano svuotamento disomogeneo del polmone. Dopo il broncodilatatore la curva torna più squadrata."},
 {id:"cp-base",n:"Rirespirazione di CO₂",rep:"Terapia intensiva",cp:{f:"base",et:[44,48],base:[6,8],rr:14},x:{FC:96,PA:"130/78",SpO2:"95%"},
  st:"Paziente ventilato con un circuito appena cambiato. L'EtCO₂ è salita lentamente nell'ultima ora.",
  q:"Che cosa controlli?",o:["Il circuito: valvola espiratoria, filtri o spazio morto aggiunto (in sala operatoria anche la calce sodata esaurita)","La sonda della saturazione","La pressione della cuffia soltanto","La glicemia"],c:0,
  e:"In inspirazione la curva non torna a zero (CO₂ inspirata > 0): il paziente respira di nuovo parte della CO₂ espirata."},
 {id:"cp-cleft",n:"Incisura da atti spontanei (ripresa del respiro)",rep:"Sala di risveglio",cp:{f:"cleft",et:[38,42],rr:12},x:{FC:90,PA:"140/82",SpO2:"98%"},
  st:"Paziente ancora intubato a fine intervento: l'effetto del curaro si sta esaurendo e muove leggermente le spalle.",
  q:"Come interpreti l'incisura nel plateau?",o:["Il paziente fa piccoli sforzi respiratori: il blocco neuromuscolare si sta risolvendo, lo segnali all'anestesista","È un'intubazione esofagea","È un arresto cardiaco","È un errore da ignorare sempre"],c:0,
  e:"L'incisura («cleft», detta anche «segno del curaro») compare quando il paziente inspira durante l'espirazione meccanica."},
 {id:"cp-exo",n:"Intubazione esofagea",rep:"Pronto soccorso",cp:{f:"exo",et:28,rr:12},x:{FC:124,PA:"118/70",SpO2:"88% in calo"},
  st:"Subito dopo l'intubazione si collega il capnografo e si ventila con il pallone. L'addome si gonfia a ogni insufflazione.",
  q:"Che cosa significa e che cosa si fa?",o:["Tubo in esofago: si rimuove, si ventila con pallone e maschera con ossigeno e il medico ripete l'intubazione","Tubo in trachea: tutto bene","Broncospasmo: broncodilatatore","Rirespirazione: si cambia il circuito"],c:0,
  e:"«No trace = wrong place»: dopo pochi atti la CO₂ (portata dall'aria nello stomaco) sparisce. La capnografia è il metodo raccomandato per confermare la posizione del tubo."},
 {id:"cp-zero",n:"Estubazione accidentale o disconnessione",rep:"Terapia intensiva",cp:{f:"zero",et:[36,40],rr:14,at:[.45,.6]},x:{FC:118,PA:"138/84",SpO2:"92% in calo"},
  st:"Durante la mobilizzazione per la prevenzione delle lesioni da pressione, la curva cambia improvvisamente.",
  q:"Che cosa fai?",o:["Controlli subito paziente, tubo e circuito; se il tubo è uscito ventili con pallone e maschera con ossigeno e chiami aiuto","Ricalibri il capnografo","Aspetti qualche minuto","Aumenti la frequenza del ventilatore"],c:0,
  e:"La scomparsa improvvisa della curva con un paziente che prima ventilava bene indica disconnessione, estubazione, tubo ostruito o, raramente, arresto cardiaco."},
 {id:"cp-rcp",n:"RCP poco efficace",rep:"Medicina",cp:{f:"rcp",et:[7,9],rr:10},x:{Polso:"assente",Ritmo:"in corso RCP"},
  st:"Arresto cardiaco in reparto, paziente intubato; le compressioni vanno avanti da 6 minuti con lo stesso soccorritore.",
  q:"Che cosa fai?",o:["Controlli profondità e frequenza delle compressioni e cambi chi comprime: l'EtCO₂ così bassa suggerisce compressioni poco efficaci","Interrompi la rianimazione","Aumenti le ventilazioni a 30 al minuto","Sospendi il monitoraggio della CO₂"],c:0,
  e:"Durante l'RCP l'EtCO₂ riflette il flusso di sangue ai polmoni prodotto dalle compressioni. Valori molto bassi spingono a migliorare la qualità della RCP."},
 {id:"cp-rosc",n:"Ripresa del circolo (ROSC) durante l'RCP",rep:"Medicina",cp:{f:"up",et0:[13,16],et:[40,46],rr:10,at:[.5,.6],rcp:1},x:{Polso:"da verificare",Ritmo:"organizzato"},
  st:"Rianimazione in corso, paziente intubato. A un certo punto, ancora durante le compressioni, la curva cambia così.",
  q:"Che cosa indica?",o:["Un aumento brusco dell'EtCO₂ suggerisce la ripresa del circolo: al controllo del ritmo si verificano polso e segni vitali","Peggioramento dell'arresto","Iperventilazione da ridurre subito","Disconnessione"],c:0,
  e:"Quando il cuore riparte, il sangue torna a portare CO₂ ai polmoni e l'EtCO₂ sale rapidamente. Non si interrompono le compressioni solo per questo segno: si aspetta il controllo del ritmo."},
 {id:"cp-emb",n:"Calo improvviso della portata cardiaca (embolia polmonare massiva)",rep:"Terapia intensiva",cp:{f:"down",et0:[36,39],et:[18,22],rr:14,at:[.4,.5]},x:{FC:138,PA:"78/44",SpO2:"85%"},
  st:"Donna operata, ventilata. Improvvisamente compaiono tachicardia, ipotensione e desaturazione senza cambiamenti nelle pressioni del ventilatore.",
  q:"Che cosa sospetti?",o:["Una brusca riduzione del flusso di sangue ai polmoni (embolia massiva, grave ipotensione): chiami subito il medico","Iperventilazione","Ostruzione del tubo","Ipertermia maligna"],c:0,
  e:"Il calo brusco dell'EtCO₂ con forma conservata e ventilazione invariata indica che meno sangue raggiunge i polmoni (aumento dello spazio morto o calo della gittata)."},
 {id:"cp-ipm",n:"Ipertermia maligna",rep:"Sala operatoria",cp:{f:"rise",et0:[40,43],et:[64,72],rr:14},x:{FC:132,PA:"150/88",T:"38,6 °C in aumento"},
  st:"Ragazzo in anestesia generale con gas alogenati: dopo l'induzione compaiono rigidità del massetere e tachicardia; la CO₂ sale nonostante la ventilazione invariata.",
  q:"Che cosa si fa?",o:["Si allerta subito l'anestesista: sospensione degli alogenati, ossigeno al 100% ad alto flusso, dantrolene su prescrizione e raffreddamento","Si aumenta la profondità dell'anestesia con lo stesso gas","Si attende la fine dell'intervento","Si somministra un altro bolo di succinilcolina"],c:0,
  e:"L'aumento progressivo e inspiegato della CO₂ è uno dei primi segni dell'ipertermia maligna, insieme a tachicardia e rigidità. La febbre spesso arriva dopo."},
 {id:"cp-cardio",n:"Oscillazioni cardiogeniche",rep:"Terapia intensiva",cp:{f:"cardio",et:[35,38],rr:8},x:{FC:80,PA:"122/70",SpO2:"97%"},
  st:"Paziente sedato, ventilato con frequenza bassa e lunghe pause espiratorie.",
  q:"Come interpreti le ondulazioni regolari alla fine della curva?",o:["Sono i battiti del cuore che muovono il gas nelle vie aeree durante l'espirazione lunga: reperto benigno","Sono sforzi respiratori del paziente","Indicano un'intubazione esofagea","Indicano una perdita della cuffia"],c:0,
  e:"Le oscillazioni hanno la stessa frequenza del cuore e compaiono con frequenze respiratorie basse. Non richiedono interventi."}
];
/* ===================== Casi integrati (più esami da leggere insieme) ===================== */
const INTEG_SC=[
 {id:"i-dka",n:"Chetoacidosi diabetica: dall'arrivo alla risoluzione",lv:"medio",rep:"Pronto soccorso",sex:"M",age:[18,28],
  st:"Ragazzo con diabete tipo 1, da due giorni vomito e dolore addominale; ha ridotto l'insulina perché non mangiava. Respiro profondo e frequente, mucose secche.",x:{FC:118,PA:"104/62",FR:28,SpO2:"98%"},
  parts:[
   {t:"lab",pan:["glu","chet","na","k","cl","crea","urea","gb"],ab:{glu:[430,560],chet:[4.5,6.5],na:[129,134],k:[5.3,5.9],crea:{M:[1.3,1.7]},urea:[50,70],gb:[12500,17000]},
    q:"Quali valori orientano verso la chetoacidosi?",o:["Glicemia molto alta con beta-idrossibutirrato elevato","Solo i globuli bianchi alti","Solo il sodio basso","Solo la creatinina alta"],c:0,
    e:"Iperglicemia e chetonemia ≥ 3 mmol/l: manca solo l'acidosi, che confermerà l'emogas. Il sodio è basso perché la glicemia alta richiama acqua nel sangue; creatinina e urea salgono per la disidratazione; la leucocitosi può essere da stress."},
   {t:"ega",fio2:.21,pco2:[19,23],hco3:[7,9],po2:[96,110],gap:[24,30],x:{glu:[430,560],k:[5.3,5.9],lac:[1.2,2]},dis:"ma",
    q:"Che cosa conferma l'emogas?",o:["Acidosi metabolica a gap anionico aumentato con compenso respiratorio (respiro di Kussmaul)","Acidosi respiratoria","Alcalosi metabolica da vomito","Emogas nella norma"],c:0,
    e:"pH basso, bicarbonati molto bassi e gap anionico alto per i chetoacidi. La pCO₂ bassa è il compenso: il paziente iperventila per eliminare acido."},
   {t:"ecg",k:"ipok",hr:[82,96],evo:"Dopo 6 ore di insulina in infusione e liquidi il ragazzo è più sveglio, ma riferisce crampi e debolezza. Il monitor in II mostra questo tracciato.",
    q:"Che cosa sospetti?",o:["Ipopotassiemia: l'insulina fa rientrare il potassio nelle cellule; serve una potassiemia urgente e il reintegro su prescrizione","Iperpotassiemia da trattare con calcio","Infarto: si attiva il percorso STEMI","Artefatto: nessun intervento"],c:0,
    e:"Onda T appiattita, onda U e ST sottoslivellato. Durante la terapia della chetoacidosi il potassio si controlla ogni 1-2 ore e si reintegra già quando è nella norma bassa."},
   {t:"lab",pan:["glu","k","na","chet"],ab:{glu:[200,240],k:[2.9,3.3],chet:[1,1.8]},evo:"Esami di controllo dopo 8 ore.",
    q:"La glicemia è scesa intorno a 200-250 mg/dl. Che cosa ti aspetti dalla prescrizione?",o:["Continuare l'insulina per eliminare i chetoni, aggiungendo una soluzione glucosata","Sospendere l'insulina perché la glicemia è quasi normale","Somministrare bicarbonato a tutti","Ridurre i controlli a uno al giorno"],c:0,
    e:"L'insulina serve a spegnere la produzione di chetoni, non solo ad abbassare la glicemia: si continua e si aggiunge glucosio per evitare l'ipoglicemia."}],
  fin:{q:"Quando si considera risolta la chetoacidosi?",o:["Chetonemia < 0,6 mmol/l e pH > 7,30 (bicarbonati in risalita)","Appena la glicemia scende sotto 200 mg/dl","Quando il potassio è nella norma","Quando smette di vomitare"],c:0,e:"La risoluzione si giudica su chetoni e acido-base; la glicemia si corregge molto prima. Solo allora si passa all'insulina sottocutanea, sovrapposta all'infusione."}},
 {id:"i-irak",n:"Insufficienza renale acuta con iperpotassiemia",lv:"medio",rep:"Medicina",sex:"F",age:[70,84],
  st:"Donna in terapia con ACE-inibitore e spironolattone; da una settimana prende un antinfiammatorio per il mal di schiena. Da ieri urina pochissimo, è debole e nauseata.",x:{FC:52,PA:"108/64",FR:20,SpO2:"96%"},
  parts:[
   {t:"lab",pan:["crea","egfr","urea","na","k","ca","p"],ab:{crea:{F:[3.6,4.6]},urea:[140,190],k:[6.6,7.2],p:[5.5,6.8]},
    q:"Qual è il valore più pericoloso nell'immediato?",o:["Il potassio","L'urea","Il fosforo","La creatinina"],c:0,
    e:"Un potassio sopra 6,5 mmol/l può causare aritmie mortali. ACE-inibitore, spironolattone e antinfiammatorio insieme danneggiano il rene e trattengono potassio."},
   {t:"ecg",k:"iperk",hr:[50,58],q:"Il monitor in II mostra questo tracciato. Che cosa noti?",o:["Onde T alte e appuntite: segno di iperpotassiemia","Onde U: ipopotassiemia","Sopraslivellamento del tratto ST","Fibrillazione atriale"],c:0,
    e:"Le T appuntite sono il primo segno; poi si allargano il QRS e si perdono le onde P, fino ad aritmie gravi. L'ECG indica che il cuore risente del potassio: è un'urgenza."},
   {t:"ega",fio2:.21,pco2:[28,31],hco3:[13,15],po2:[82,96],gap:[16,20],x:{k:[6.6,7.2]},dis:"ma",
    q:"Perché l'acidosi peggiora l'iperpotassiemia?",o:["Gli ioni H⁺ entrano nelle cellule e il potassio esce nel sangue","L'acidosi blocca l'assorbimento intestinale del potassio","Non c'è nessuna relazione","L'acidosi aumenta l'eliminazione renale del potassio"],c:0,
    e:"Acidosi metabolica da insufficienza renale (gap aumentato per acidi non eliminati). Correggere l'acidosi aiuta a spostare il potassio nelle cellule."}],
  fin:{q:"Che cosa prepari per primo su prescrizione?",o:["Calcio endovena con monitoraggio ECG continuo, poi insulina con glucosio; sospensione dei farmaci che trattengono potassio","Potassio cloruro endovena","Un altro antinfiammatorio per il dolore","Spironolattone a dose maggiore"],c:0,e:"Il calcio stabilizza subito il cuore senza abbassare il potassio; insulina con glucosio e salbutamolo lo spostano nelle cellule; resine, diuretici o dialisi lo eliminano. Si sospendono ACE-inibitore, spironolattone e antinfiammatorio."}},
 {id:"i-ards",n:"ARDS in ventilazione meccanica",lv:"difficile",rep:"Terapia intensiva",sex:"M",age:[50,70],
  st:"Uomo con polmonite bilaterale, intubato da 12 ore. Alto 175 cm (peso ideale circa 70 kg), febbre 38,9 °C.",x:{FC:104,PA:"112/64",SpO2:"91%"},
  parts:[
   {t:"vent",kg:70,m:{mode:"VC",vt:560,rr:20,peep:8,fio2:.7,ti:.9,pause:.25,R:[11,13],C:[26,29],etco2:[46,50]},
    q:"Valuta volume corrente e driving pressure: che cosa noti?",o:["Volume di circa 8 ml/kg di peso ideale con driving pressure oltre 15: ventilazione non protettiva da segnalare","Tutto nella norma","La PEEP è troppo alta","C'è una perdita della cuffia"],c:0,
    e:"Nell'ARDS si cerca volume 6 ml/kg di peso ideale, plateau ≤ 30 e driving pressure ≤ 15. Qui il polmone è rigido e riceve troppo volume."},
   {t:"ega",fio2:.7,pco2:[50,56],hco3:[23,25],po2:[72,82],x:{lac:[1.6,2.2]},dis:"ra",
    q:"Come leggi l'ossigenazione?",o:["P/F tra 100 e 200: ARDS moderata, con acidosi respiratoria","Ossigenazione normale perché la pO₂ è sopra 60","Alcalosi metabolica","P/F sopra 300"],c:0,
    e:"pO₂ intorno a 75 con FiO₂ 0,7 dà un P/F di circa 110: ipossiemia moderata-grave. La pCO₂ alta con bicarbonati normali è un'acidosi respiratoria acuta (in parte accettata con la ventilazione protettiva)."},
   {t:"lab",pan:["gb","neu","pcr","pct","lat","crea","plt"],ab:{gb:[16000,21000],neu:[13000,15000],pcr:[18,26],pct:[4,9],lat:[2.4,3.4],crea:{M:[1.4,1.9]},plt:[95000,130000]},
    q:"Che cosa aggiungono gli esami?",o:["Sepsi con danno di altri organi (rene, piastrine, lattati): il quadro è più grave della sola polmonite","Un'infezione banale senza conseguenze","Un'anemia da carenza di ferro","Nulla: sono nella norma"],c:0,
    e:"Procalcitonina e PCR molto alte orientano verso un'infezione batterica; creatinina, piastrine basse e lattati sopra 2 indicano disfunzione d'organo."}],
  fin:{q:"Il medico porta il volume a 6 ml/kg, ma il P/F resta sotto 150. Che cosa prepari?",o:["La pronazione: almeno 5 operatori, protezione di occhi e punti d'appoggio, controllo di tubo, cateteri e drenaggi","L'estubazione","La riduzione della PEEP a zero","La sospensione della sedazione e la mobilizzazione in poltrona"],c:0,e:"Nell'ARDS moderata-grave con P/F < 150 la pronazione per sedute prolungate migliora l'ossigenazione e la sopravvivenza. È una manovra di squadra con rischi (estubazione, lesioni da pressione) che l'infermiere previene."}},
 {id:"i-bpco",n:"BPCO riacutizzata: ossigeno, NIV e controllo",lv:"medio",rep:"Pneumologia",sex:"M",age:[65,80],
  st:"Uomo con BPCO, sonnolento, respiro faticoso. In maschera di Venturi al 35% la saturazione è 97%.",x:{FC:108,PA:"146/86",FR:30,SpO2:"97%"},
  parts:[
   {t:"ega",fio2:.35,pco2:[76,86],hco3:[33,36],po2:[88,104],dis:"ra",
    q:"Che cosa noti, oltre all'acidosi respiratoria?",o:["Saturazione troppo alta per un paziente con BPCO ipercapnico: l'ossigeno in eccesso peggiora la CO₂; obiettivo 88-92%","Nulla di particolare","Ipossiemia grave","Alcalosi metabolica"],c:0,
    e:"Acidosi respiratoria acuta su cronica (bicarbonati alti da compenso renale ma pH basso). Nel BPCO ipercapnico troppo ossigeno peggiora l'ipercapnia: si titola per SpO₂ 88-92%."},
   {t:"vent",m:{mode:"PSV",niv:1,ps:12,peep:5,fio2:.3,R:[17,19],C:[58,64],pmus:[6,7],prr:[22,24],leak:[.38,.45],etco2:0},evo:"Il medico avvia la NIV con maschera oronasale. Dopo 20 minuti il paziente è agitato e la maschera sembra non tenere.",
    q:"Che cosa mostrano le curve e che cosa fai?",o:["Una grande perdita dalla maschera: la riposizioni, verifichi la misura e il cuscinetto e regoli le cinghie senza stringere troppo","Aumenti la FiO₂ al 100%","Sospendi la NIV","Nulla: è normale"],c:0,
    e:"Il volume espirato è molto inferiore all'inspirato. Le perdite riducono l'efficacia della NIV e causano asincronie; una maschera troppo stretta provoca invece lesioni sul naso."},
   {t:"ega",fio2:.3,pco2:[62,66],hco3:[33,34],po2:[58,66],dis:"ra",evo:"Maschera sistemata, il paziente si adatta. Emogas dopo un'ora di NIV:",
    q:"Come sta andando?",o:["Miglioramento: pH e pCO₂ si avvicinano alla norma; si prosegue la NIV e si ricontrolla","Peggioramento: serve l'intubazione immediata","Nessun cambiamento","Alcalosi da correggere"],c:0,
    e:"Il pH risale e la pCO₂ scende: la NIV funziona. Il controllo dell'EGA dopo 1-2 ore è il momento chiave per decidere se continuare."}],
  fin:{q:"Quale tra questi è un segno di fallimento della NIV da segnalare subito?",o:["pH che non migliora o peggiora dopo 1-2 ore, sonnolenza crescente, instabilità emodinamica","Paziente che si addormenta tranquillo con pH in miglioramento","Lieve arrossamento alla radice del naso","Richiesta di bere"],c:0,e:"Il fallimento della NIV si riconosce presto: ritardare l'intubazione peggiora la prognosi. La protezione della cute del viso è comunque parte dell'assistenza."}},
 {id:"i-ptx",n:"Pneumotorace iperteso nel paziente ventilato",lv:"difficile",rep:"Terapia intensiva",sex:"M",age:[30,60],
  st:"Uomo con trauma toracico e fratture costali a destra, intubato e ventilato. Durante la mobilizzazione suona l'allarme di pressione alta e la saturazione scende.",x:{FC:134,PA:"76/42",SpO2:"84%"},
  parts:[
   {t:"vent",kg:75,m:{mode:"VC",vt:480,rr:16,peep:6,fio2:.5,ti:1,pause:.3,R:[11,13],C:[16,19],etco2:[22,26]},
    q:"Che cosa mostra il ventilatore?",o:["Picco e plateau entrambi alti: la compliance è crollata, il problema è nel polmone o nella pleura","Picco alto con plateau normale: tubo ostruito","Perdita dalla cuffia","Nessuna anomalia"],c:0,
    e:"Quando sale anche il plateau il problema non è nel tubo ma nella distensibilità del sistema respiratorio: pneumotorace, intubazione selettiva, edema, atelettasia."},
   {t:"capno",cp:{f:"down",et0:[36,38],et:[20,24],rr:16,at:[.4,.5]},
    q:"Che cosa indica il calo dell'EtCO₂?",o:["Meno sangue arriva ai polmoni: la gittata cardiaca sta crollando","Iperventilazione","Ipertermia maligna","Rirespirazione di CO₂"],c:0,
    e:"Con ventilazione invariata un calo brusco dell'EtCO₂ segnala una riduzione della gittata: nel pneumotorace iperteso la pressione nel torace ostacola il ritorno venoso."},
   {t:"ega",fio2:.5,pco2:[48,54],hco3:[19,21],po2:[52,60],gap:[14,18],x:{lac:[3,4.5]},dis:"mx",
    q:"Che cosa mostra l'emogas?",o:["Acidosi mista: respiratoria (ventilazione inefficace) e metabolica lattica (shock)","Alcalosi respiratoria","Acidosi metabolica pura","Valori nella norma"],c:0,
    e:"pCO₂ alta e bicarbonati bassi spingono il pH nella stessa direzione: disturbo misto. Ipossiemia grave con P/F sotto 150."}],
  fin:{q:"Il torace destro non si espande e il murmure è assente a destra. Che cosa fai?",o:["Chiami subito il medico e il team, FiO₂ al 100%, prepari la decompressione con ago e il drenaggio toracico","Aspiri il tubo e attendi","Aumenti la PEEP","Riduci la sedazione"],c:0,e:"Il pneumotorace iperteso è una diagnosi clinica: non si aspetta la radiografia. La decompressione è immediata."}},
 {id:"i-ep",n:"Embolia polmonare dopo chirurgia ortopedica",lv:"medio",rep:"Ortopedia",sex:"F",age:[55,75],
  st:"Donna operata di protesi d'anca 5 giorni fa, si è alzata poco. Dispnea improvvisa e dolore toracico che aumenta con il respiro.",x:{FC:122,PA:"108/70",FR:28,SpO2:"89% in aria"},
  parts:[
   {t:"ecg",k:"sinus",hr:[118,126],q:"Che ritmo vedi?",o:["Tachicardia sinusale","Fibrillazione atriale","Flutter atriale","Tachicardia ventricolare"],c:0,
    e:"Nell'embolia il reperto ECG più frequente è la tachicardia sinusale; il quadro S1Q3T3 è raro e non serve per la diagnosi."},
   {t:"ega",fio2:.21,pco2:[27,31],hco3:[22.5,24],po2:[54,62],dis:"rb",
    q:"Che cosa mostra l'emogas?",o:["Ipossiemia con ipocapnia: alcalosi respiratoria da iperventilazione","Acidosi respiratoria","Acidosi metabolica","Valori nella norma"],c:0,
    e:"L'ipossiemia stimola il respiro e la CO₂ scende. Il gradiente alveolo-arterioso è aumentato."},
   {t:"lab",pan:["dd","trop","bnp","crea","hb","plt"],ab:{dd:[3200,6800],trop:[38,90],bnp:[700,1600]},
    q:"Che cosa indicano troponina e NT-proBNP alti in questo quadro?",o:["Sofferenza del ventricolo destro: embolia a rischio più alto, da segnalare","Un infarto certo","Nulla di rilevante","Insufficienza renale"],c:0,
    e:"Il D-dimero è alto ma poco specifico dopo un intervento: la diagnosi si fa con l'angio-TC. Troponina e BNP alti indicano che il cuore destro è sotto sforzo."}],
  fin:{q:"In attesa dell'angio-TC che cosa fai?",o:["Ossigeno per SpO₂ 94-98%, riposo a letto, accesso venoso, monitoraggio e anticoagulante su prescrizione","Fai camminare la paziente","Massaggi la gamba gonfia","Rimandi tutto al giorno dopo"],c:0,e:"Il sospetto clinico alto giustifica l'anticoagulazione già prima della conferma, su decisione medica. Se compare ipotensione il rischio è alto e il medico valuta la trombolisi."}},
 {id:"i-stemi",n:"Infarto inferiore con interessamento del ventricolo destro",lv:"medio",rep:"Pronto soccorso",sex:"M",age:[55,75],
  st:"Uomo con dolore epigastrico e nausea da un'ora, sudato e pallido.",x:{FC:56,PA:"88/56",FR:20,SpO2:"95%"},
  parts:[
   {t:"ecg",k:"stemiIII",hr:[54,62],q:"Che cosa vedi in III?",o:["Sopraslivellamento del tratto ST: infarto inferiore","Onde T appuntite da potassio","Blocco di branca destra","Tracciato normale"],c:0,
    e:"ST sopraslivellato nelle derivazioni inferiori: il dolore «di stomaco» può essere un infarto inferiore."},
   {t:"lab",pan:["trop","ck","k","crea","glu","hb"],ab:{trop:[180,900],ck:[260,420],glu:[150,190]},
    q:"Serve aspettare la troponina per attivare la riperfusione?",o:["No: con dolore tipico e ST sopraslivellato si attiva subito il percorso per l'infarto; la troponina conferma ma non deve ritardare","Sì, sempre","Sì, se il paziente è anziano","Solo se anche il CK è alto"],c:0,
    e:"Nello STEMI la diagnosi è elettrocardiografica: il tempo è muscolo cardiaco."}],
  fin:{q:"Il medico sospetta l'interessamento del ventricolo destro (ipotensione, giugulari turgide). Che cosa eviti?",o:["Nitrati e diuretici, che riducono il precarico e fanno crollare la pressione; si registra anche V4R","I liquidi endovena","L'ossigeno se la SpO₂ scende sotto il 90%","L'accesso venoso"],c:0,e:"Il ventricolo destro infartuato dipende dal riempimento: servono liquidi su prescrizione, non vasodilatatori."}},
 {id:"i-acc",n:"Dall'arresto cardiaco alla ripresa del circolo",lv:"difficile",rep:"Medicina",sex:"M",age:[55,75],
  st:"Uomo trovato in arresto in reparto. Hai iniziato la RCP; arriva il team con il defibrillatore.",x:{Polso:"assente",Respiro:"assente"},
  parts:[
   {t:"ecg",k:"fv",hr:[0,0],q:"Il defibrillatore mostra questo ritmo. Che cosa fai?",o:["Shock il prima possibile, poi riprendi subito le compressioni per 2 minuti","Controlli il polso per un minuto","Somministri adrenalina prima dello shock","Sospendi la RCP per registrare un ECG a 12 derivazioni"],c:0,
    e:"Fibrillazione ventricolare: ritmo defibrillabile. Le pause nelle compressioni vanno ridotte al minimo, anche prima e dopo lo shock."},
   {t:"capno",cp:{f:"rcp",et:[7,9],rr:10},evo:"Il paziente viene intubato e collegato al capnografo; la RCP continua con lo stesso soccorritore da diversi minuti.",
    q:"Un'EtCO₂ così bassa durante la RCP che cosa suggerisce?",o:["Compressioni poco efficaci: controlla profondità e frequenza e cambia chi comprime","Ripresa del circolo","Iperventilazione","Tubo certamente in esofago"],c:0,
    e:"La curva c'è (il tubo è in trachea), ma i valori sono molto bassi: il flusso di sangue prodotto dalle compressioni è scarso."},
   {t:"capno",cp:{f:"up",et0:[13,16],et:[40,46],rr:10,at:[.5,.6],rcp:1},evo:"Si cambia chi comprime; dopo il terzo shock la curva cambia così.",
    q:"Che cosa indica?",o:["Aumento brusco dell'EtCO₂: possibile ripresa del circolo, si verificano polso e ritmo al controllo","Peggioramento dell'arresto","Tubo dislocato","Ipoventilazione"],c:0,
    e:"La ripresa del circolo riporta sangue ai polmoni e la CO₂ sale di colpo."},
   {t:"ega",fio2:1,pco2:[56,68],hco3:[14,18],po2:[300,420],gap:[20,26],x:{lac:[7,11]},dis:"mx",evo:"Ripresa del circolo. Il paziente è ventilato con FiO₂ 1. Emogas dopo 10 minuti:",
    q:"Che cosa noti nell'ossigenazione?",o:["Iperossia (pO₂ molto alta): si riduce la FiO₂ per mantenere SpO₂ 94-98%","Ipossiemia grave","Ossigenazione ideale da mantenere","Nulla"],c:0,
    e:"Acidosi mista (respiratoria e lattica). Dopo la ripresa del circolo si evitano sia l'ipossia sia l'iperossia."}],
  fin:{q:"Quale obiettivo di pCO₂ si cerca dopo la ripresa del circolo?",o:["Normocapnia (circa 35-45 mmHg)","Ipocapnia marcata (20-25 mmHg)","Ipercapnia (60-70 mmHg)","Nessun obiettivo"],c:0,e:"Ipocapnia e ipercapnia alterano il flusso di sangue al cervello già sofferente: si regola la ventilazione con EGA e capnografia."}},
 {id:"i-sepsi",n:"Shock settico da infezione urinaria",lv:"medio",rep:"Medicina",sex:"F",age:[70,85],
  st:"Donna con catetere vescicale da 10 giorni: febbre 39,4 °C, brividi, confusa.",x:{FC:124,PA:"84/46",FR:26,SpO2:"94%"},
  parts:[
   {t:"lab",pan:["gb","neu","pcr","pct","lat","crea","plt","bil"],ab:{gb:[17000,24000],neu:[15000,16000],pcr:[14,24],pct:[6,18],lat:[4.2,6],crea:{F:[1.6,2.2]},plt:[85000,120000],bil:[1.4,2.1]},
    q:"Quali valori indicano un danno d'organo?",o:["Lattati, creatinina, piastrine e bilirubina","Solo i globuli bianchi","Solo la PCR","Nessuno"],c:0,
    e:"PCR e procalcitonina descrivono l'infezione; i valori che indicano disfunzione d'organo sono lattati (ipoperfusione), creatinina (rene), piastrine (coagulazione) e bilirubina (fegato)."},
   {t:"ega",fio2:.21,pco2:[27,30],hco3:[13,15],po2:[70,80],gap:[18,23],x:{lac:[4.2,6]},dis:"ma",
    q:"Che tipo di acidosi?",o:["Acidosi metabolica a gap aumentato da lattati (ipoperfusione)","Acidosi respiratoria","Alcalosi metabolica","Acidosi da perdita di bicarbonati (gap normale)"],c:0,
    e:"Gap anionico alto con lattati sopra 4: i tessuti non ricevono abbastanza ossigeno. La pCO₂ bassa è il compenso."}],
  fin:{q:"Nella prima ora che cosa prepari su prescrizione?",o:["Emocolture prima dell'antibiotico, antibiotico entro un'ora, cristalloidi, ricontrollo dei lattati, vasopressore se la pressione non risponde; sostituzione del catetere","Solo il paracetamolo","L'attesa dell'urinocoltura prima di qualsiasi terapia","La restrizione dei liquidi"],c:0,e:"Nella sepsi con ipoperfusione il tempo conta: colture, antibiotico precoce, liquidi e controllo della fonte di infezione."}},
 {id:"i-emo",n:"Emorragia digestiva in terapia anticoagulante",lv:"medio",rep:"Pronto soccorso",sex:"M",age:[70,85],
  st:"Uomo in terapia con warfarin per fibrillazione atriale: feci nere da due giorni, oggi un episodio di lipotimia.",x:{FC:"118 irregolare",PA:"96/58",FR:22,SpO2:"96%"},
  parts:[
   {t:"lab",pan:["hb","ht","mcv","plt","inr","urea","crea"],ab:{hb:{M:[6.8,7.8]},ht:{M:[20,24]},inr:[4.2,5.6],urea:[80,120]},
    q:"Perché l'urea è alta con la creatinina normale?",o:["Il sangue digerito nell'intestino aumenta l'urea: tipico dell'emorragia digestiva alta","Insufficienza renale cronica","Dieta ricca di proteine","Errore del laboratorio"],c:0,
    e:"Hb molto bassa, INR sopra il range terapeutico e urea alta con creatinina normale: emorragia del tratto digestivo alto in eccesso di anticoagulazione."},
   {t:"ecg",k:"fa",hr:[118,132],q:"Che ritmo mostra il monitor?",o:["Fibrillazione atriale ad alta frequenza","Tachicardia sinusale","Flutter atriale 2:1","Tachicardia ventricolare"],c:0,
    e:"Ritmo irregolarmente irregolare senza onde P: la frequenza alta è anche una risposta all'anemia e all'ipovolemia."},
   {t:"ega",fio2:.21,pco2:[32,35],hco3:[17,19],po2:[82,95],gap:[14,17],x:{lac:[2.8,4],hb:[6.8,7.8]},dis:"ma",
    q:"Che cosa indicano i lattati e l'acidosi?",o:["Ipoperfusione da perdita di sangue: shock emorragico iniziale","Chetoacidosi","Insufficienza respiratoria","Niente di rilevante"],c:0,
    e:"Acidosi metabolica lattica: i tessuti ricevono meno ossigeno per la perdita di emoglobina e di volume."}],
  fin:{q:"Quale sequenza è corretta?",o:["Due accessi venosi di grosso calibro, gruppo e prove crociate, liquidi e trasfusione su prescrizione, sospensione del warfarin e antagonismo su prescrizione, digiuno per l'endoscopia","Sondino e lavaggi con acqua ghiacciata","Clistere evacuativo","Dimissione con controllo dell'INR fra una settimana"],c:0,e:"Prima la stabilizzazione emodinamica, poi l'endoscopia entro 24 ore (prima se instabile). Il medico decide l'antagonismo del warfarin (vitamina K e concentrato di complesso protrombinico)."}},
 {id:"i-oppioidi",n:"Depressione respiratoria da oppioidi",lv:"facile",rep:"Chirurgia",sex:"F",age:[60,80],
  st:"Donna operata ieri, con pompa di morfina (PCA). Il marito dice che «dorme troppo».",x:{FC:60,PA:"104/62",FR:6,SpO2:"91% con O₂ 2 l/min"},
  parts:[
   {t:"capno",cp:{f:"norm",et:[60,66],rr:6},where:"cannula nasale con campionamento",q:"Che cosa mostra la capnografia?",o:["EtCO₂ alta con frequenza molto bassa: ipoventilazione","Valori normali","Iperventilazione","Broncospasmo"],c:0,
    e:"Curva normale nella forma ma alta e lenta: la paziente respira troppo poco."},
   {t:"ega",fio2:.28,pco2:[64,72],hco3:[26,27],po2:[62,70],dis:"ra",
    q:"Che tipo di disturbo?",o:["Acidosi respiratoria acuta: i bicarbonati non hanno ancora compensato","Acidosi metabolica","Alcalosi respiratoria","Acidosi respiratoria cronica compensata"],c:0,
    e:"La pCO₂ è salita in poche ore: il rene non ha avuto il tempo di trattenere bicarbonati e il pH scende molto."}],
  fin:{q:"Che cosa fai?",o:["Stimoli la paziente, sospendi la PCA, chiami il medico, prepari naloxone su prescrizione e sostieni la ventilazione se serve","Aumenti l'ossigeno e la lasci dormire","Dai un altro bolo di morfina per il dolore","Aspetti il giro visita"],c:0,e:"La sedazione eccessiva precede la depressione respiratoria: si valuta con una scala di sedazione insieme a FR e, se disponibile, capnografia."}},
 {id:"i-secr",n:"Secrezioni nel paziente intubato",lv:"facile",rep:"Terapia intensiva",sex:"M",age:[60,80],
  st:"Uomo intubato per polmonite. Tossisce, alla trachea senti rumori grossolani e suona l'allarme di pressione.",x:{FC:106,PA:"138/80",SpO2:"90%"},
  parts:[
   {t:"vent",kg:72,m:{mode:"VC",vt:470,rr:16,peep:6,fio2:.4,ti:1,pause:.3,R:[20,24],C:[44,48],sec:1,etco2:[44,47]},
    q:"Che cosa noti?",o:["Picco alto con plateau poco cambiato e curve seghettate: secrezioni nelle vie aeree","Plateau alto: compliance ridotta","Perdita della cuffia","Disconnessione"],c:0,
    e:"La resistenza al passaggio dell'aria aumenta (picco − plateau alto) e il dente di sega nelle curve è tipico delle secrezioni."},
   {t:"capno",cp:{f:"shark",et:[44,48],rr:16},q:"Che forma ha il capnogramma?",o:["Salita lenta e plateau inclinato: ostacolo all'uscita dell'aria","Normale","Base sollevata","Assente"],c:0,
    e:"Anche le secrezioni, come il broncospasmo, rallentano lo svuotamento: la curva perde la forma squadrata."}],
  fin:{q:"Come esegui l'aspirazione endotracheale?",o:["Preossigenazione, sondino non più largo di metà del diametro interno del tubo, aspirazione solo in uscita per massimo 10-15 secondi, con la pressione indicata dal protocollo","Instillazione di soluzione fisiologica di routine","Aspirazione continua per 30 secondi","Sondino largo quanto il tubo"],c:0,e:"L'aspirazione si fa al bisogno, non a orario. L'instillazione di fisiologica non è raccomandata di routine."}}
];

/* ===================== Controllo degli esercizi aggiunti ogni giorno ===================== */
const isR=a=>Array.isArray(a)&&a.length===2&&a.every(n=>typeof n==="number"&&isFinite(n))&&a[0]<=a[1];
const isN=(v,a,b)=>(typeof v==="number"&&isFinite(v)&&v>=a&&v<=b)||(isR(v)&&v[0]>=a&&v[1]<=b);
const S=v=>typeof v==="string"&&v.trim().length>0;
function mcq(s,min){return S(s.q)&&Array.isArray(s.o)&&s.o.length>=(min||3)&&s.o.length<=5&&s.o.every(S)&&Number.isInteger(s.c)&&s.c>=0&&s.c<s.o.length&&S(s.e)}
const EGA_X=["hb","cohb","na","k","glu","lac"];
function chkEga(s,full){const e=[];
  if(full){if(!S(s.n))e.push("n");if(!S(s.st))e.push("st");if(!S(s.rep))e.push("rep");if(!["M","F"].includes(s.sex))e.push("sex");if(!isR(s.age))e.push("age")}
  if(!mcq(s))e.push("domanda");
  if(!isN(s.fio2,.21,1)||Array.isArray(s.fio2))e.push("fio2");
  if(!isR(s.pco2)||s.pco2[0]<10||s.pco2[1]>140)e.push("pco2");if(!isR(s.hco3)||s.hco3[0]<3||s.hco3[1]>60)e.push("hco3");if(!isR(s.po2)||s.po2[0]<25||s.po2[1]>650)e.push("po2");
  if(s.gap!=null&&!isR(s.gap))e.push("gap");
  if(s.x!=null){if(typeof s.x!=="object")e.push("x");else for(const k in s.x)if(!EGA_X.includes(k)||!isR(s.x[k]))e.push("x."+k)}
  if(!["ra","ma","rb","mb","mx","no"].includes(s.dis))e.push("dis");
  if(!e.length){for(let i=0;i<60;i++){const v=egaGen(Object.assign({sex:s.sex||"M"},s));const c=egaClass(v);if(c.dis!==s.dis){e.push("classificazione: atteso "+s.dis+", ottenuto "+c.dis+" (pH "+v.ph.toFixed(2)+")");break}}}
  return e}
function labAN(){return G.LAB_AN||(typeof LAB_AN!=="undefined"?LAB_AN:null)}
function chkLab(s,full){const e=[],A=labAN();if(!A)return ["LAB_AN mancante"];
  if(full){if(!S(s.n))e.push("n");if(!S(s.st))e.push("st");if(!["M","F"].includes(s.sex||"M"))e.push("sex");if(!isR(s.age))e.push("age")}
  if(!mcq(s))e.push("domanda");
  if(!Array.isArray(s.pan)||s.pan.length<3||s.pan.length>14)e.push("pan");else s.pan.forEach(k=>{if(!A[k]||["ph","pco2","hco3"].includes(k))e.push("esame sconosciuto: "+k)});
  if(!s.ab||typeof s.ab!=="object")e.push("ab");else for(const k in s.ab){const r=s.ab[k];if(!s.pan||!s.pan.includes(k))e.push("ab fuori dal pannello: "+k);if(!(isR(r)||(r&&typeof r==="object"&&(isR(r.M)||isR(r.F)))))e.push("intervallo: "+k)}
  if(s.ab&&s.pan){const sex=s.sex||"M";const alt=Object.keys(s.ab).filter(k=>{const A2=A[k];if(!A2)return false;const ref=Array.isArray(A2[2])?A2[2]:A2[2][sex];const r=Array.isArray(s.ab[k])?s.ab[k]:s.ab[k][sex];return r&&(r[1]<ref[0]||r[0]>ref[1])});if(full&&!alt.length)e.push("nessun valore sicuramente alterato")}
  return e}
function poolKeys(){return (G.GYM_POOL||(typeof GYM_POOL!=="undefined"?GYM_POOL:[])).map(g=>g.k)}
function chkEcg(s,full){const e=[];const K=poolKeys();
  if(!K.includes(s.k))e.push("ritmo sconosciuto: "+s.k);if(!isR(s.hr)||s.hr[1]>260)e.push("hr");
  if(full&&!S(s.t))e.push("t");if(!mcq(s))e.push("domanda");return e}
function chkVent(s,full){const e=[];const m=s.m||{};
  if(full){if(!S(s.n))e.push("n");if(!S(s.st))e.push("st")}
  if(!mcq(s))e.push("domanda");
  if(!["VC","PC","PSV","CPAP"].includes(m.mode))e.push("mode");
  const lim={vt:[150,900],rr:[4,40],peep:[0,24],fio2:[.21,1],ti:[.4,2.5],pause:[0,.8],pins:[3,35],ps:[0,30],R:[3,60],Rexp:[3,60],C:[8,120],leak:[0,.8],pmus:[0,15],prr:[0,45],pdur:[.4,2.5],etco2:[0,90],plim:[20,80],sec:[0,1.5],water:[0,1.5],apneaAt:[.5,8]};
  for(const k in m){if(lim[k]&&!isN(m[k],lim[k][0],lim[k][1]))e.push("m."+k)}
  if(s.kg!=null&&!isN(s.kg,30,120))e.push("kg");
  if(!e.length&&s.find){for(let i=0;i<5;i++){const r=ventSim(m,10);if(r.find!==s.find){e.push("curve: atteso "+s.find+", ottenuto "+r.find);break}}}
  return e}
function chkCapno(s,full){const e=[];const c=s.cp||{};
  if(full){if(!S(s.n))e.push("n");if(!S(s.st))e.push("st")}
  if(!mcq(s))e.push("domanda");
  if(!CSHAPE[c.f])e.push("forma: "+c.f);if(!isN(c.et,0,100))e.push("et");if(!isN(c.rr,4,40))e.push("rr");
  if(["up","down","rise"].includes(c.f)&&!isN(c.et0,0,100))e.push("et0");if(c.base!=null&&!isN(c.base,0,20))e.push("base");if(c.at!=null&&!isN(c.at,.15,.85))e.push("at");
  return e}
function chkInteg(s){const e=[];
  if(!S(s.n))e.push("n");if(!S(s.st))e.push("st");if(!["M","F"].includes(s.sex))e.push("sex");if(!isR(s.age))e.push("age");
  if(!Array.isArray(s.parts)||s.parts.length<2||s.parts.length>6)e.push("parts");
  else s.parts.forEach((p,i)=>{const f={ega:chkEga,lab:chkLab,ecg:chkEcg,vent:chkVent,capno:chkCapno}[p.t];if(!f){e.push("parte "+(i+1)+": tipo "+p.t);return}
    const r=f(Object.assign({sex:s.sex},p),false);r.forEach(x=>e.push("parte "+(i+1)+" ("+p.t+"): "+x))});
  if(s.fin&&!mcq(s.fin))e.push("fin");
  if(s.lv&&!["facile","medio","difficile"].includes(s.lv))e.push("lv");
  return e}
const PAL_CHK={ega:s=>chkEga(s,true),lab:s=>chkLab(s,true),ecg:s=>chkEcg(s,true),vent:s=>chkVent(s,true),capno:s=>chkCapno(s,true),integ:chkInteg};

/* unisce gli esercizi dei giorni alle palestre (chiamata da applyDaily nel sito) */
let BASE=null;
function palDaily(days){
  if(typeof EGA_SC==="undefined")return;
  if(!BASE)BASE={ega:EGA_SC.slice(),lab:(typeof LAB_SC!=="undefined"?LAB_SC:[]).slice(),ecg:GYM_CASES.slice(),vent:VENT_SC.slice(),capno:CAPNO_SC.slice(),integ:INTEG_SC.slice()};
  const dst={ega:EGA_SC,lab:typeof LAB_SC!=="undefined"?LAB_SC:null,ecg:GYM_CASES,vent:VENT_SC,capno:CAPNO_SC,integ:INTEG_SC};
  const add={ega:[],lab:[],ecg:[],vent:[],capno:[],integ:[]},skip=[];
  for(const d of days||[]){const P=d&&d.palestre;if(!P||typeof P!=="object")continue;
    for(const k in add){(Array.isArray(P[k])?P[k]:[]).forEach((s,i)=>{if(!s||typeof s!=="object")return;let err;try{err=PAL_CHK[k](s)}catch(x){err=["errore: "+x.message]}
      if(err.length){skip.push([d.date,k,i,err]);return}
      const o=JSON.parse(JSON.stringify(s));o.id="g"+d.date+"-"+k+i;o.date=d.date;if(k==="lab"&&!o.sex)o.sex="M";add[k].push(o)})}}
  for(const k in dst){const a=dst[k];if(!a)continue;a.length=0;BASE[k].forEach(x=>a.push(x));add[k].forEach(x=>a.push(x))}
  PAL.added=add;PAL.skipped=skip;if(skip.length&&G.console)console.warn("Esercizi del giorno scartati:",skip);
}
/* scelta che privilegia gli esercizi arrivati negli ultimi giorni e non ancora visti */
const SEEN=new Set();
function palPick(pool){if(!pool.length)return null;const dates=pool.filter(s=>s.date).map(s=>s.date).sort();const top=dates[dates.length-1];
  if(top){const fresh=pool.filter(s=>s.date&&s.date>=palShift(top,-1)&&!SEEN.has(s.id));if(fresh.length&&rnd()<.6){const s=fresh[Math.floor(rnd()*fresh.length)];SEEN.add(s.id);return s}}
  const s=pool[Math.floor(rnd()*pool.length)];SEEN.add(s.id);return s}
function palShift(d,n){const t=new Date(d+"T12:00:00Z");t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10)}
function palNew(arr){return arr.filter(s=>s.date).length}
function palNewBadge(s){if(!s||!s.date)return "";const esc=G.esc||(x=>x);const d=s.date.split("-");return `<span class="pal-new">Nuovo · ${esc(d[2]+"/"+d[1])}</span>`}

/* ===================== Interfaccia: palestra ventilatore e capnografia ===================== */
const clk=()=>{const d=new Date();return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
const opts=(a)=>a.map((o,j)=>o);
function stepHtml(i,label,num,hint,list,right,ans,attr){const a=ans[i];return `<div class="gym-step"><span class="eyebrow">${num}. ${label}</span>${hint?`<p class="small">${G.esc(hint)}</p>`:""}<div class="opts">${list.map((o,j)=>`<button class="opt${a!=null?(j===right?" right":j===a?" wrong":""):""}" data-${attr}="${i}" data-o="${j}" ${a!=null?"disabled":""}>${G.esc(o)}</button>`).join("")}</div></div>`}
const VG={tab:"vent",mode:"guidato",n:0,ok:0,cur:null,step:0,ans:[],anim:true};
function vgNew(){const sh=G.shuffle;
  if(VG.tab==="vent"){const pool=VENT_SC.filter(s=>!VG.cur||s.id!==VG.cur.sc.id),sc=palPick(pool),S=ventSim(sc.m,10);
    const fk=S.find,fo=sh([fk,...sh(Object.keys(VFIND).filter(k=>k!==fk)).slice(0,3)]);
    VG.cur={tab:"vent",sc,S,fo,names:sh([sc.n,...sh(VENT_SC.filter(s=>s.n!==sc.n).map(s=>s.n)).slice(0,3)]),ao:sh(sc.o.map((_,i)=>i)),age:Math.round(R(sc.age||[50,70])),clock:clk()}}
  else{const pool=CAPNO_SC.filter(s=>!VG.cur||s.id!==VG.cur.sc.id),sc=palPick(pool),S=capnoSim(sc.cp);
    const fk=sc.cp.f,fo=sh([fk,...sh(Object.keys(CSHAPE).filter(k=>k!==fk)).slice(0,3)]);
    VG.cur={tab:"capno",sc,S,fo,names:sh([sc.n,...sh(CAPNO_SC.filter(s=>s.n!==sc.n).map(s=>s.n)).slice(0,3)]),ao:sh(sc.o.map((_,i)=>i)),clock:clk()}}
  VG.step=VG.mode==="rapido"?(VG.tab==="vent"?3:2):0;VG.ans=[];VG.anim=true}
function ventGym(){const app=document.getElementById("app"),esc=G.esc;
  if(!VG.cur||VG.cur.tab!==VG.tab)vgNew();const C=VG.cur,sc=C.sc,S=C.S,RAP=VG.mode==="rapido",V=VG.tab==="vent";
  const steps=V?[["Modalità","Riconoscila dalla forma delle curve: che cosa è costante, la pressione o il flusso? Chi avvia l'atto?",["VC","PC","PSV","CPAP"].map(k=>VMODE[k]),["VC","PC","PSV","CPAP"].indexOf(S.m.mode)],
      ["Driving pressure","Plateau − PEEP: è la pressione che distende davvero il polmone.",VDP,ventDpCat(S.mm)],
      ["Che cosa mostrano le curve?","Guarda picco e plateau, il ritorno a zero di flusso e volume, la regolarità degli atti.",C.fo.map(k=>VFIND[k]),C.fo.indexOf(S.find)],
      ["Che quadro è?","Metti insieme monitor e storia.",C.names,C.names.indexOf(sc.n)],
      ["Che cosa fai?",sc.q,C.ao.map(i=>sc.o[i]),C.ao.indexOf(sc.c)]]
    :[["EtCO₂","Leggi il valore di fine espirazione degli ultimi atti.",CET,capnoCat(S)],
      ["Forma della curva","Base, salita, plateau, discesa e andamento atto per atto.",C.fo.map(k=>CSHAPE[k]),C.fo.indexOf(sc.cp.f)],
      ["Che quadro è?","Metti insieme capnogramma e storia.",C.names,C.names.indexOf(sc.n)],
      ["Che cosa fai?",sc.q,C.ao.map(i=>sc.o[i]),C.ao.indexOf(sc.c)]];
  const S0=RAP?steps.length-2:0,LAST=steps.length-1,done=VG.step>LAST;
  const mon=V?ventMon(S,{x:sc.x,kg:sc.kg,hideMode:!RAP&&VG.ans[0]==null,anim:VG.anim,clock:C.clock}):capnoMon(S,{x:sc.x,where:sc.where,anim:VG.anim,clock:C.clock});
  const read=done?(V?ventRead(S,sc.kg):capnoRead(S,sc)):"";
  app.innerHTML=`<div><span class="eyebrow">Terapia intensiva</span><h2>Palestra ventilatore e capnografia</h2></div>
  <p class="lead">Il monitor del ventilatore come al letto del paziente: valori misurati con i limiti d'allarme, curve di pressione, flusso e volume, polmone dinamico, anello pressione-volume e impostazioni. Leggilo con metodo: modalità, driving pressure, curve, quadro, intervento. ${VENT_SC.length} quadri del ventilatore e ${CAPNO_SC.length} capnogrammi${palNew(VENT_SC)+palNew(CAPNO_SC)?`, di cui ${palNew(VENT_SC)+palNew(CAPNO_SC)} arrivati con gli aggiornamenti giornalieri`:""}; le curve cambiano a ogni esercizio.</p>
  <div class="row"><button class="chip" data-vt="vent" aria-pressed="${V}">Ventilatore</button><button class="chip" data-vt="capno" aria-pressed="${!V}">Capnografia</button><span class="pal-sep" aria-hidden="true"></span><button class="chip" data-vm="guidato" aria-pressed="${!RAP}">Lettura guidata (${V?5:4} passaggi)</button><button class="chip" data-vm="rapido" aria-pressed="${RAP}">Riconoscimento rapido</button><span class="small" style="margin-left:auto">Sessione: <b>${VG.ok}</b> corrette su <b>${VG.n}</b></span></div>
  <div class="pal-mon">${mon}</div>
  <div class="sheet gym" style="display:flex;flex-direction:column;gap:12px">
   <div class="gym-case"><span class="eyebrow">${esc(sc.rep||"")}${sc.kg?` · peso ideale ${sc.kg} kg`:""} ${palNewBadge(sc)}</span><p>${esc(sc.st)}</p></div>
   ${steps.map((st,i)=>i<S0||i>VG.step?"":stepHtml(i,st[0],i+1-S0,st[1],st[2],st[3],VG.ans,"vq")).join("")}
   ${done?`<div class="expl">${read}<br><br><b>${esc(sc.n)}.</b> ${esc(sc.e)}${VG.ans[LAST]===steps[LAST][3]?"":`<br><b>Che cosa fa l'infermiere:</b> ${esc(sc.o[sc.c])}`}</div>
   <div class="row"><button class="btn primary" id="vg-next">${V?"Nuovo monitor":"Nuovo capnogramma"}</button><a class="btn" href="#voce-ventilazione" style="text-decoration:none">Ripassa la ventilazione</a><a class="btn" href="#casi-integrati" style="text-decoration:none">Casi integrati</a></div>`:""}
  </div>`;
  VG.anim=false;
  app.querySelectorAll("[data-vt]").forEach(b=>b.onclick=()=>{VG.tab=b.dataset.vt;vgNew();ventGym()});
  app.querySelectorAll("[data-vm]").forEach(b=>b.onclick=()=>{VG.mode=b.dataset.vm;vgNew();ventGym()});
  app.querySelectorAll("[data-vq]").forEach(b=>b.onclick=()=>{const i=+b.dataset.vq,j=+b.dataset.o;VG.ans[i]=j;VG.step=i+1;
    if(i===LAST){const ks=steps.map((_,k)=>k).filter(k=>k>=S0),good=ks.filter(k=>VG.ans[k]===steps[k][3]).length;VG.n++;if(good===ks.length)VG.ok++;try{G.logEv("mcq","cli",0,good/ks.length,(V?"vent-":"capno-")+sc.id,{gym:1})}catch(e){}}
    ventGym();const p=app.querySelector(".gym .gym-step:last-of-type, .gym .expl");if(p)p.scrollIntoView({block:"nearest"})});
  const nx=document.getElementById("vg-next");if(nx)nx.onclick=()=>{vgNew();ventGym();window.scrollTo({top:0,behavior:"auto"})};
}
function capnoRead(S,sc){const e=S.et,L=[];
  L.push(`<b>EtCO₂ ${f1(e)} mmHg</b> (${CET[capnoCat(S)].toLowerCase()}) con FR ${S.rr?f1(S.rr)+"/min":"non misurabile"}.`);
  L.push(`<b>Forma:</b> ${CSHAPE[S.cp.f].charAt(0).toLowerCase()+CSHAPE[S.cp.f].slice(1)}.`);
  if((S.cp.base||0)>0)L.push(`In inspirazione la CO₂ non torna a zero (${f1(S.cp.base)} mmHg).`);
  const a=S.ets.map(x=>Math.round(x));if(a.length>2)L.push(`Atto per atto: ${a.join(" → ")} mmHg.`);
  return L.join("<br>")}

/* ===================== Interfaccia: casi integrati ===================== */
const IG={cur:null,part:0,ans:[],fin:null,n:0,ok:0,lv:"tutti"};
function palLabVals(p,sex,age){const val={},A=G.LAB_AN||LAB_AN,ab=p.ab||{};
  p.pan.forEach(k=>{const a=ab[k];const rr=a?(Array.isArray(a)?a:a[sex]):null;val[k]=rr?R(rr):G.labNormal(k,sex)});
  if(val.ht!=null&&!ab.ht&&val.hb!=null)val.ht=val.hb*3+R([-1,1]);
  if(val.neu!=null&&val.gb!=null&&!ab.neu)val.neu=val.gb*R([.55,.7]);if(val.neu!=null&&val.gb!=null&&val.neu>val.gb*.9)val.neu=val.gb*R([.8,.9]);
  if(val.lin!=null&&val.gb!=null)val.lin=Math.max(150,Math.min(val.lin,val.gb-(val.neu||0)-150));
  if(val.bild!=null&&val.bil!=null)val.bild=Math.min(val.bild,val.bil*.8);
  if(val.crea!=null&&val.egfr!=null)val.egfr=Math.min(125,G.labEgfr(val.crea,age,sex));
  Object.keys(val).forEach(k=>val[k]=G.labRound(k,val[k]));return val}
function igBuild(sc){const sex=sc.sex,age=Math.round(R(sc.age)),sh=G.shuffle;
  const parts=sc.parts.map((p,i)=>{const o={p,ao:sh(p.o.map((_,j)=>j))};
    if(p.t==="ega"){const s2=Object.assign({sex,rep:sc.rep},p);o.C={sc:Object.assign({n:"",st:"",age:[age,age]},s2),v:egaGen(s2),age,id:"ESE-"+Math.floor(1000+Math.random()*9000),seq:2400+Math.floor(Math.random()*400),t:new Date(Date.now()+i*36e5*.5)};o.C.cls=egaClass(o.C.v)}
    if(p.t==="lab")o.val=palLabVals(p,sex,age);
    if(p.t==="ecg"){const hr=Math.round(R(p.hr));o.f=WAVE.ecgFull(p.k,hr||undefined,6,250,"ig"+Math.random())}
    if(p.t==="vent")o.S=ventSim(p.m,10);
    if(p.t==="capno")o.S=capnoSim(p.cp);
    return o});
  return {sc,age,parts,fao:sc.fin?sh(sc.fin.o.map((_,j)=>j)):null,score:0}}
function igNew(id){const pool=INTEG_SC.filter(s=>IG.lv==="tutti"||s.lv===IG.lv);const sc=id?INTEG_SC.find(s=>s.id===id):palPick(pool.filter(s=>!IG.cur||s.id!==IG.cur.sc.id).length?pool.filter(s=>!IG.cur||s.id!==IG.cur.sc.id):pool);
  if(!sc)return;IG.cur=igBuild(sc);IG.part=0;IG.ans=[];IG.fin=null}
function igEcg(f){const W=150,H=36,b0=21,y=f.y,sc=10;const pd=y.map((v,i)=>(i?"L":"M")+(i*W/(y.length-1)).toFixed(2)+" "+Math.max(.5,Math.min(H-.5,b0-v*sc)).toFixed(2)).join("");
  return `<div class="gym-strip"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Striscia ECG"><defs><pattern id="iga" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0V1H0" fill="none" stroke="#f2bdb9" stroke-width=".08"/></pattern><pattern id="igb" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#iga)"/><path d="M5 0V5H0" fill="none" stroke="#e08a84" stroke-width=".25"/></pattern></defs><rect width="${W}" height="${H}" fill="url(#igb)"/><text x="1.5" y="4" class="eg-t">${f.s.lead} · 25 mm/s · 10 mm/mV</text><path d="${pd}" fill="none" stroke="#1d1d1f" stroke-width=".42" stroke-linejoin="round"/></svg></div>`}
function igLab(o,sex,showFlag){const esc=G.esc,A=G.LAB_AN||LAB_AN;
  const rows=o.p.pan.map(k=>{const st=G.labStatus(k,o.val[k],sex);return `<tr class="lab-row"><td>${esc(A[k][0])}</td><td class="lab-v">${G.labFmt(k,o.val[k])} ${showFlag&&st?`<span class="lab-flag ${st}">${st==="H"?"↑ alto":"↓ basso"}</span>`:""}</td><td class="lab-u">${esc(A[k][1])}</td><td class="lab-r">${G.labRefTxt(k,sex)}</td></tr>`}).join("");
  return `<div class="lab-sheet"><div class="lab-sh"><b>Referto di laboratorio</b><span class="small mono">esercitazione · valori inventati</span></div><table class="lab-t"><thead><tr><th>Esame</th><th>Risultato</th><th>Unità</th><th>Riferimento</th></tr></thead><tbody>${rows}</tbody></table></div>`}
const IG_T={ega:"Emogasanalisi",lab:"Esami di laboratorio",ecg:"Elettrocardiogramma",vent:"Monitor del ventilatore",capno:"Capnografia"};
function integGym(){const app=document.getElementById("app"),esc=G.esc;if(!IG.cur)igNew();const K=IG.cur;if(!K){app.innerHTML="<p>Nessun caso disponibile.</p>";return}const sc=K.sc;
  const nP=K.parts.length,allDone=IG.ans.length>=nP&&IG.ans.every(a=>a!=null),finDone=IG.fin!=null;
  const exhibit=(o,i)=>{const ans=IG.ans[i]!=null;
    if(o.p.t==="ega")return `<div class="ig-ega">${G.egaPaper(o.C,{nf:false,anim:false})}</div>`;
    if(o.p.t==="lab")return igLab(o,sc.sex,ans);
    if(o.p.t==="ecg")return igEcg(o.f);
    if(o.p.t==="vent")return `<div class="pal-mon">${ventMon(o.S,{x:sc.x,kg:o.p.kg,clock:"",anim:i===IG.part&&!ans})}</div>`;
    if(o.p.t==="capno")return `<div class="pal-mon">${capnoMon(o.S,{x:sc.x,where:o.p.where,anim:i===IG.part&&!ans})}</div>`;return ""};
  const partHtml=(o,i)=>{if(i>IG.part)return "";const p=o.p,a=IG.ans[i],right=o.ao.indexOf(p.c);
    return `<section class="sheet ig-part${p.t==="ega"?" ig-split":""}"><div class="ig-ph"><span class="ig-n">${i+1}</span><div><span class="eyebrow">Parte ${i+1} di ${nP} · ${IG_T[p.t]}</span>${p.evo?`<p class="ig-evo">${esc(p.evo)}</p>`:""}</div></div>
     <div class="ig-body"><div class="ig-ex">${exhibit(o,i)}</div>
      <div class="ig-q"><p><b>${esc(p.q)}</b></p><div class="opts">${o.ao.map((k,j)=>`<button class="opt${a!=null?(j===right?" right":j===a?" wrong":""):""}" data-ip="${i}" data-o="${j}" ${a!=null?"disabled":""}>${esc(p.o[k])}</button>`).join("")}</div>
      ${a!=null?`<div class="expl"><b>${a===right?"Corretto.":"Risposta corretta: "+esc(p.o[p.c])+"."}</b> ${esc(p.e)}${p.t==="vent"?"<br><br>"+ventRead(o.S,p.kg):p.t==="capno"?"<br><br>"+capnoRead(o.S,{}):p.t==="ega"?"<br><br>"+G.egaRead(o.C):""}</div>${i===IG.part&&i<nP-1?`<div class="row"><button class="btn primary" data-inext>Parte successiva</button></div>`:""}`:""}</div></div></section>`};
  const good=IG.ans.filter((a,i)=>a!=null&&a===K.parts[i].ao.indexOf(K.parts[i].p.c)).length;
  const F=sc.fin,fr=F?K.fao.indexOf(F.c):-1;
  const finHtml=allDone&&F?`<section class="sheet ig-part ig-fin"><div class="ig-ph"><span class="ig-n">✓</span><div><span class="eyebrow">Sintesi</span><p class="ig-evo">Metti insieme tutto quello che hai letto.</p></div></div><div class="ig-q"><p><b>${esc(F.q)}</b></p><div class="opts">${K.fao.map((k,j)=>`<button class="opt${finDone?(j===fr?" right":j===IG.fin?" wrong":""):""}" data-if="${j}" ${finDone?"disabled":""}>${esc(F.o[k])}</button>`).join("")}</div>${finDone?`<div class="expl"><b>${IG.fin===fr?"Corretto.":"Risposta corretta: "+esc(F.o[F.c])+"."}</b> ${esc(F.e)}</div>`:""}</div></section>`:"";
  const over=allDone&&(!F||finDone),tot=nP+(F?1:0),got=good+(F&&finDone&&IG.fin===fr?1:0);
  app.innerHTML=`<div><span class="eyebrow">Allenamento avanzato</span><h2>Casi integrati: leggi tutto insieme</h2></div>
  <p class="lead">Un paziente, più esami da interpretare uno dopo l'altro: emogas, esami del sangue, ECG, monitor del ventilatore e capnografia. Il quadro si chiarisce parte dopo parte, come in reparto. ${INTEG_SC.length} casi${palNew(INTEG_SC)?` (${palNew(INTEG_SC)} arrivati con gli aggiornamenti giornalieri)`:""}, con valori e tracciati sempre nuovi.</p>
  <div class="row">${["tutti","facile","medio","difficile"].map(l=>`<button class="chip" data-il="${l}" aria-pressed="${IG.lv===l}">${l==="tutti"?"Tutti i livelli":l[0].toUpperCase()+l.slice(1)}</button>`).join("")}<select class="btn" id="ig-sel" aria-label="Scegli un caso"><option value="">Scegli un caso…</option>${INTEG_SC.filter(s=>IG.lv==="tutti"||s.lv===IG.lv).map(s=>`<option value="${s.id}" ${s.id===sc.id?"selected":""}>${esc(s.n)}</option>`).join("")}</select><span class="small" style="margin-left:auto">Casi completati: <b>${IG.ok}</b> su <b>${IG.n}</b></span></div>
  <section class="sheet ig-head"><div><span class="eyebrow">${sc.sex==="F"?"Donna":"Uomo"}, ${K.age} anni · ${esc(sc.rep)} · livello ${esc(sc.lv||"medio")} ${palNewBadge(sc)}</span><h3>${esc(sc.n)}</h3><p>${esc(sc.st)}</p></div>
   ${sc.x?`<div class="ig-vit">${Object.entries(sc.x).map(([k,v])=>`<span><i>${esc(k)}</i><b>${esc(String(v))}</b></span>`).join("")}</div>`:""}
   <div class="ig-prog" aria-label="Avanzamento del caso">${K.parts.map((o,i)=>`<i class="${IG.ans[i]!=null?(IG.ans[i]===o.ao.indexOf(o.p.c)?"ok":"ko"):i===IG.part?"cur":""}" title="${IG_T[o.p.t]}">${IG_T[o.p.t]}</i>`).join("")}${F?`<i class="${finDone?(IG.fin===fr?"ok":"ko"):""}">Sintesi</i>`:""}</div></section>
  ${K.parts.map(partHtml).join("")}${finHtml}
  ${over?`<section class="sheet ig-end"><b>${got} ${got===1?"risposta corretta":"risposte corrette"} su ${tot}.</b><div class="row"><button class="btn primary" id="ig-new">Nuovo caso</button><a class="btn" href="#vent-esercizi" style="text-decoration:none">Palestra ventilatore</a><a class="btn" href="#ega-esercizi" style="text-decoration:none">Palestra EGA</a></div></section>`:""}`;
  app.querySelectorAll("[data-il]").forEach(b=>b.onclick=()=>{IG.lv=b.dataset.il;igNew();integGym()});
  const sel=document.getElementById("ig-sel");sel.onchange=()=>{if(sel.value){igNew(sel.value);integGym();window.scrollTo({top:0})}};
  app.querySelectorAll("[data-ip]").forEach(b=>b.onclick=()=>{const i=+b.dataset.ip;IG.ans[i]=+b.dataset.o;
    if(i===nP-1&&!F)igLog();integGym();const s=app.querySelectorAll(".ig-part")[i];const ex=s&&s.querySelector(".expl");if(ex)ex.scrollIntoView({block:"nearest"})});
  app.querySelectorAll("[data-inext]").forEach(b=>b.onclick=()=>{IG.part++;integGym();const s=app.querySelectorAll(".ig-part")[IG.part];if(s)s.scrollIntoView({block:"start",behavior:(typeof RM!=="undefined"&&RM)?"auto":"smooth"})});
  if(allDone&&F&&!finDone){const s=app.querySelector(".ig-fin");}
  app.querySelectorAll("[data-if]").forEach(b=>b.onclick=()=>{IG.fin=+b.dataset.if;igLog();integGym();const e=app.querySelector(".ig-end");if(e)e.scrollIntoView({block:"nearest"})});
  const nw=document.getElementById("ig-new");if(nw)nw.onclick=()=>{igNew();integGym();window.scrollTo({top:0,behavior:"auto"})};
}
function igLog(){const K=IG.cur;const nP=K.parts.length,F=K.sc.fin;const good=IG.ans.filter((a,i)=>a===K.parts[i].ao.indexOf(K.parts[i].p.c)).length+(F&&IG.fin===K.fao.indexOf(F.c)?1:0),tot=nP+(F?1:0);
  IG.n++;if(good===tot)IG.ok++;try{G.logEv("mcq","cli",0,good/tot,"integ-"+K.sc.id,{gym:1})}catch(e){}}

const PAL={egaGen,egaClass,ventSim,ventMon,ventRead,ventFind,ventDpCat,ventResolve,capnoSim,capnoMon,capnoCat,VFIND,VMODE,VDP,CSHAPE,CET,VENT_SC,CAPNO_SC,INTEG_SC,PAL_CHK,palDaily,palPick,palNew,palNewBadge,added:null,skipped:[]};
G.PAL=PAL;G.egaGen=egaGen;G.egaClass=egaClass;G.VENT_SC=VENT_SC;G.CAPNO_SC=CAPNO_SC;G.INTEG_SC=INTEG_SC;G.palDaily=palDaily;G.palPick=palPick;G.ventGym=ventGym;G.integGym=integGym;G.palNewBadge=palNewBadge;G.palNew=palNew;
})(typeof window!=="undefined"?window:globalThis);
