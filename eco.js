/* Palestra di ecografia: ecografo simulato (B-mode, modo M, color Doppler, Doppler pulsato).
   Immagini generate dal programma, a solo uso didattico: nessuna immagine reale di pazienti. */
(function(G){
"use strict";
const PI=Math.PI,rnd=Math.random,R=a=>Array.isArray(a)?a[0]+rnd()*(a[1]-a[0]):a,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const f1=(n,d)=>(+n).toFixed(d==null?0:d).replace(".",",");
const RMq=()=>typeof RM!=="undefined"&&RM;
const W=480,H=400;                     /* area immagine in pixel */

/* ---------- tessitura «speckle» ---------- */
let TEX=null,TEXF=null;
function mkTex(){if(TEX)return;const N=200,n=document.createElement("canvas");n.width=n.height=N;const x=n.getContext("2d"),id=x.createImageData(N,N);
  for(let i=0;i<id.data.length;i+=4){const v=30+Math.pow(rnd(),1.7)*225;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=255}x.putImageData(id,0,0);
  TEX=document.createElement("canvas");TEX.width=TEX.height=440;const y=TEX.getContext("2d");y.imageSmoothingEnabled=true;y.filter="blur(.6px)";y.drawImage(n,0,0,440,440);y.filter="none";
  const f=y.getImageData(0,0,440,440);for(let i=0;i<f.data.length;i+=4){if(rnd()<.025){const v=170+rnd()*85;f.data[i]=f.data[i+1]=f.data[i+2]=Math.max(f.data[i],v)}}y.putImageData(f,0,0);
  TEXF=document.createElement("canvas");TEXF.width=TEXF.height=220;const z=TEXF.getContext("2d"),g=z.createImageData(220,220);
  for(let i=0;i<g.data.length;i+=4){const v=rnd()<.5?Math.pow(rnd(),3)*255:0;g.data[i]=g.data[i+1]=g.data[i+2]=v;g.data[i+3]=255}z.putImageData(g,0,0)}

/* ---------- fisiologia ---------- */
const ph=(t,hr)=>((t*hr/60)%1+1)%1;                         /* fase del ciclo cardiaco */
const insp=(t,rr)=>.5-.5*Math.cos(2*PI*((t*rr/60)%1));     /* 0-1, massimo a fine inspirazione */
const pulse=f=>f<.3?Math.sin(PI*f/.3):0;
/* forme d'onda Doppler: cm/s, positive = verso la sonda */
const WF={
 tri:f=>f<.06?105*Math.sin(PI/2*f/.06):f<.16?105*Math.cos(PI/2*(f-.06)/.10):f<.26?-20*Math.sin(PI*(f-.16)/.10):f<.40?14*Math.sin(PI*(f-.26)/.14):0,
 mono:f=>f<.24?11+23*Math.sin(PI/2*f/.24):34-23*Math.pow((f-.24)/.76,.8),
 low:f=>f<.08?30+60*Math.sin(PI/2*f/.08):f<.2?90-45*(f-.08)/.12:f<.26?45-8*Math.sin(PI*(f-.2)/.06):42-12*(f-.26)/.74,
 sten:f=>3.4*WF.low(f),
 zero:()=>0
};
function vel(P,t,S){const hr=P.hr||72,rr=P.rr||14,w=P.wf;
  if(w==="ven"||w==="vencont"){let v=w==="ven"?-(13+11*(1-insp(t,rr)))*(1+.07*Math.sin(2*PI*ph(t,hr))):-(15+.8*Math.sin(t*7));
    if(S&&S.aug!=null){const d=t-S.aug;if(d>0&&d<1.4)v-=(P.noaug?6:48)*Math.sin(PI*d/1.4)}return v}
  return (WF[w]||WF.zero)(ph(t,hr))}
function pwStats(P){if(!P.wf||P.wf==="ven"||P.wf==="vencont"||P.wf==="zero")return null;let mx=-1e9,mn=1e9;for(let i=0;i<200;i++){const v=WF[P.wf](i/200);if(v>mx)mx=v;if(i>150&&v<mn)mn=v}
  const edv=Math.max(0,WF[P.wf](.97));return {psv:mx,edv,ri:(mx-edv)/mx}}

/* ---------- disegno: utilità ---------- */
function geo(P){const D=P.D,s=H/D,Wc=W/s;return {D,s,Wc,cvx:P.probe==="cvx"}}
function fanPath(c,g){const ap={x:g.Wc/2,y:-4.2},r0=4.3,r1=4.2+g.D+.4,a=31*PI/180;c.beginPath();c.arc(ap.x,ap.y,r1,PI/2+a,PI/2-a,true);c.arc(ap.x,ap.y,r0,PI/2-a,PI/2+a,false);c.closePath()}
function texFill(c,g,alpha,o){o=o||{};const p=c.createPattern(o.fine?TEXF:TEX,"repeat");const sc=(o.scale||1)/g.s;p.setTransform(new DOMMatrix().translate(o.dx||0,o.dy||0).scale(sc));
  c.save();c.globalAlpha=alpha;c.fillStyle=p;c.fillRect(-2,-2,g.Wc+4,g.D+4);c.restore()}
function clipDo(c,path,fn){c.save();c.beginPath();path(c);c.clip();fn();c.restore()}
function ell(c,x,y,rx,ry,rot){c.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),rot||0,0,2*PI)}
function anech(c,g,path,t){clipDo(c,path,()=>{c.fillStyle="#020202";c.fillRect(-1,-1,g.Wc+2,g.D+2);texFill(c,g,.05,{fine:1,dx:t*7})})}
function line(c,pts,w,col,a){c.save();c.globalAlpha=a==null?1:a;c.strokeStyle=col||"#fff";c.lineWidth=w;c.lineCap="round";c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.restore()}
function shadow(c,g,x0,x1,y,a){const gr=c.createLinearGradient(0,y,0,g.D);gr.addColorStop(0,`rgba(0,0,0,${a||.92})`);gr.addColorStop(1,`rgba(0,0,0,${(a||.92)*.95})`);c.fillStyle=gr;c.fillRect(x0,y,x1-x0,g.D-y)}
function enh(c,g,x0,x1,y,a){const gr=c.createLinearGradient(0,y,0,g.D);gr.addColorStop(0,`rgba(255,255,255,${a||.16})`);gr.addColorStop(1,"rgba(255,255,255,0)");c.save();c.globalCompositeOperation="lighter";c.fillStyle=gr;c.fillRect(x0,y,x1-x0,g.D-y);c.restore()}
function skin(c,g){line(c,[[0,.06],[g.Wc,.06]],.05,"#fff",.85);c.save();c.globalAlpha=.55;c.fillStyle="#000";c.fillRect(0,.12,g.Wc,.35);c.restore();texFill(c,g,.18,{dy:.3})}
function colorFlow(c,path,v,scale,t,toward,bb){const a=Math.abs(v)/scale;if(a<.04)return;const pos=toward?v>=0:v<0;
  clipDo(c,path,()=>{if(a>1){const B=bb||[0,0,30,30];c.fillStyle=pos?"#ff3b30":"#1d4ed8";c.globalAlpha=.8;c.fillRect(B[0],B[1],B[2],B[3]);for(let i=0;i<90;i++){c.fillStyle=["#ffe14d","#ff3b30","#22d3ee","#1d4ed8","#ffffff","#ff8a00"][Math.floor(rnd()*6)];c.globalAlpha=.9;c.fillRect(B[0]+rnd()*B[2],B[1]+rnd()*B[3],.05+rnd()*.14,.04+rnd()*.08)}c.globalAlpha=1;return}
    const k=clamp(a,0,1);c.globalAlpha=.6+.35*k;c.fillStyle=pos?`rgb(${150+105*k|0},${20+140*k*k|0},${10+20*k|0})`:`rgb(${10+20*k|0},${50+140*k*k|0},${150+105*k|0})`;c.fillRect(-1,-1,40,40);
    c.globalCompositeOperation="destination-out";c.globalAlpha=.32;const pt=c.createPattern(TEXF,"repeat");pt.setTransform(new DOMMatrix().translate(rnd()*50,rnd()*50).scale(.02));c.fillStyle=pt;c.fillRect(-1,-1,40,40);c.globalCompositeOperation="source-over";c.globalAlpha=1})}

/* ---------- scene anatomiche (unità: cm) ---------- */
const SCN={
 vasi(c,g,P,S,t){skin(c,g);texFill(c,g,.5,{dx:Math.sin(t*.7)*.02*g.s});
  line(c,[[0,2.35],[g.Wc,2.25]],.05,"#ddd",.7);for(let k=0;k<5;k++)line(c,[[0,2.6+k*.22],[g.Wc,2.55+k*.24]],.025,"#bbb",.28);
  const f=ph(t,P.hr||72),ra=.33*(1+.09*pulse(f)),A={x:1.25,y:1.45},V={x:2.65,y:1.35};
  const comp=S.comp||0,cv=P.dvt?.12*comp:comp,ry=.36*(1-.97*cv)*(1+.04*insp(t,P.rr||14)),rx=.6*(1+.15*cv);
  const pa=k=>ell(k,A.x,A.y+comp*.08,ra,ra),pv=k=>ell(k,V.x,V.y+comp*.12,P.dvt?rx*1.12:rx,P.dvt?Math.max(.34,ry*1.15):ry);
  anech(c,g,pa,t);enh(c,g,A.x-ra,A.x+ra,A.y+ra,.12);
  c.save();c.strokeStyle="#fff";c.globalAlpha=.9;c.lineWidth=.07;c.beginPath();pa(c);c.stroke();c.restore();
  if(P.dvt){clipDo(c,pv,()=>{c.fillStyle="#111";c.fillRect(0,0,g.Wc,g.D);texFill(c,g,.42,{scale:.7})})}else anech(c,g,pv,t);
  if(!P.dvt)enh(c,g,V.x-rx,V.x+rx,V.y+ry,.1);
  c.save();c.strokeStyle="#fff";c.globalAlpha=.55;c.lineWidth=.03;c.beginPath();pv(c);c.stroke();c.restore();
  if(S.mode==="C"){const sc=P.cscale||40;colorFlow(c,pa,10+25*pulse(f),sc,t,true,[A.x-ra,A.y-ra,2*ra,2*ra+.2]);if(!P.dvt&&ry>.05)colorFlow(c,pv,-(14+6*insp(t,P.rr||14)),sc,t,true,[V.x-rx,V.y-ry,2*rx,2*ry+.2])}
  if(P.needle){const ny=P.needle==="parete"?V.y+ry+.22:V.y,nx=V.x+.05;c.save();c.fillStyle="#fff";c.shadowColor="#fff";c.shadowBlur=6;c.beginPath();ell(c,nx,ny,.07,.05);c.fill();c.restore();
   for(let k=1;k<4;k++)line(c,[[nx-.06,ny+k*.12],[nx+.06,ny+k*.12]],.025,"#fff",.55/k)}
  S.gate=P.gate==="ven"?{x:V.x,y:V.y}:{x:A.x,y:A.y};S.mx=V.x;
 },
 vlong(c,g,P,S,t){skin(c,g);texFill(c,g,.48,{dx:Math.sin(t*.6)*.02*g.s});
  const yc=P.y||1.9,r0=P.r||.34,f=ph(t,P.hr||72),pul=P.ven?0:.05*pulse(f),st=P.sten||0,xs=g.Wc*.55;
  const half=x=>{const d=Math.abs(x-xs);return r0*(1+pul)*(1-(d<.7?st*(Math.cos(PI*d/.7)*.5+.5):0))};
  const lum=k=>{k.moveTo(0,yc-half(0));for(let x=0;x<=g.Wc;x+=.05)k.lineTo(x,yc-half(x));for(let x=g.Wc;x>=0;x-=.05)k.lineTo(x,yc+r0*(1+pul));k.closePath()};
  anech(c,g,lum,t);enh(c,g,0,g.Wc,yc+r0,.08);
  const top=[],bot=[];for(let x=0;x<=g.Wc+.01;x+=.05){top.push([x,yc-half(x)]);bot.push([x,yc+r0*(1+pul)])}
  line(c,top,P.ven?.03:.07,"#fff",.85);line(c,bot,P.ven?.03:.07,"#fff",.85);
  if(st){clipDo(c,k=>{k.moveTo(xs-.75,yc-r0-.12);for(let x=xs-.75;x<=xs+.75;x+=.05)k.lineTo(x,yc-half(x));k.lineTo(xs+.75,yc-r0-.12);k.closePath()},()=>{c.fillStyle="#555";c.fillRect(0,0,g.Wc,g.D);texFill(c,g,.6)})}
  if(S.mode==="C"||S.mode==="PW"){const sc=P.cscale||(P.ven?20:40);
   for(let x=g.Wc*.12-.3;x<g.Wc*.88+.3;x+=.12){const narrow=r0/half(x+.06),v=vel(P,t-x*.01,S)/(P.wf==="sten"?3.4:1)*narrow;const top=yc-half(x)-.01,hh=half(x)+r0*(1+pul)+.02,seg=k=>{k.rect(x,top,.13,hh)};
    if(S.mode==="C"){c.save();c.beginPath();lum(c);c.clip();colorFlow(c,seg,x>xs&&x<xs+1.4&&st>.4?v*1.8:v,sc,t,true,[x,top,.13,hh]);c.restore()}}}
  if(P.needleIP){const tip=[g.Wc*.56,yc+.05],st0=[-.1,.12],L=Math.hypot(tip[0]-st0[0],tip[1]-st0[1]),nx=-(tip[1]-st0[1])/L,ny=(tip[0]-st0[0])/L;
   for(let k=3;k>=1;k--)line(c,[[st0[0]+nx*k*.13,st0[1]+ny*k*.13],[tip[0]+nx*k*.13,tip[1]+ny*k*.13]],.03,"#fff",.3/k);
   c.save();c.shadowColor="#fff";c.shadowBlur=5;line(c,[st0,tip],.06,"#fff",.97);c.restore();c.save();c.fillStyle="#fff";c.beginPath();ell(c,tip[0],tip[1],.06,.05);c.fill();c.restore()}
  S.gate={x:P.gx||g.Wc*(st?.58:.45),y:yc};S.mx=g.Wc*.5;
 },
 polmone(c,g,P,S,t){const rr=P.rr||16,sl=P.sliding?.12*Math.sin(2*PI*((t*rr/60)%1)):0,yp=1.45,r1=g.Wc*.16,r2=g.Wc*.84;
  skin(c,g);clipDo(c,k=>k.rect(0,0,g.Wc,yp),()=>texFill(c,g,.5));for(let k=0;k<4;k++)line(c,[[0,.6+k*.2],[g.Wc,.62+k*.2]],.02,"#bbb",.25);
  clipDo(c,k=>k.rect(0,yp,g.Wc,g.D),()=>{c.fillStyle="#050505";c.fillRect(0,yp,g.Wc,g.D);texFill(c,g,P.sliding?.1:.2,{dx:sl*g.s,fine:0,scale:1.3});if(P.sliding){texFill(c,g,.8,{fine:1,dx:rnd()*200,dy:rnd()*200});texFill(c,g,.5,{fine:1,dx:rnd()*200,dy:rnd()*200})}});
  if(!(P.bl>=3)){for(let k=2;k<=4;k++){const y=yp*k;if(y<g.D)line(c,[[r1+.5,y],[r2-.5,y]],.05,"#fff",.55/(k-1))}}
  const nb=P.bl||0;for(let i=0;i<nb;i++){const x=r1+.6+(r2-r1-1.2)*(nb===1?.5:i/(nb-1))+sl+.05*Math.sin(t*3+i);const gr=c.createLinearGradient(0,yp,0,g.D);gr.addColorStop(0,"rgba(255,255,255,.95)");gr.addColorStop(.7,"rgba(255,255,255,.7)");gr.addColorStop(1,"rgba(255,255,255,.35)");c.fillStyle=gr;c.fillRect(x-.06,yp,.12,g.D-yp);c.fillStyle="rgba(255,255,255,.18)";c.fillRect(x-.16,yp,.32,g.D-yp)}
  const segs=[];for(let x=r1+.4;x<r2-.4;x+=.08)segs.push(x);segs.forEach(x=>{const a=.75+(P.sliding?.25*Math.sin((x+sl*6)*9+t*5):.15);line(c,[[x,yp+.02*Math.sin(x*7)],[x+.09,yp+.02*Math.sin((x+.09)*7)]],.075,"#fff",clamp(a,.4,1))});
  [r1,r2].forEach(x=>{c.save();c.fillStyle="#fff";c.globalAlpha=.85;c.beginPath();c.ellipse(x,yp-.15,.55,.16,0,PI,2*PI);c.fill();c.restore();shadow(c,g,x-.55,x+.55,yp-.1,.95)});
  S.mx=g.Wc*.5;
 },
 versamento(c,g,P,S,t){const rr=P.rr||18,b=insp(t,rr)*.5;
  const ly=x=>2.6+(g.Wc*.86-x)*(10.5/(g.Wc*.7))+b;                 /* diaframma: dall'alto a destra verso il basso a sinistra */
  const thor=k=>{k.moveTo(-1,-1);k.lineTo(g.Wc+1,-1);for(let x=g.Wc+1;x>=-1;x-=.2)k.lineTo(x,ly(x));k.closePath()};
  const abd=k=>{k.moveTo(-1,g.D+1);for(let x=-1;x<=g.Wc+1;x+=.2)k.lineTo(x,ly(x)+.08);k.lineTo(g.Wc+1,g.D+1);k.closePath()};
  clipDo(c,abd,()=>texFill(c,g,.55,{scale:.8,dy:b*g.s}));
  clipDo(c,thor,()=>{c.fillStyle="#0b0b0b";c.fillRect(-1,-1,g.Wc+2,g.D+2);texFill(c,g,.22,{scale:1.4,dx:Math.sin(t)*3});
    clipDo(c,k=>{k.moveTo(-1,g.D+1);for(let x=-1;x<=g.Wc+1;x+=.2)k.lineTo(x,ly(x)-4.6);k.lineTo(g.Wc+1,g.D+1);k.closePath()},()=>{c.fillStyle="#020202";c.fillRect(-1,-1,g.Wc+2,g.D+2);texFill(c,g,.04,{fine:1,dx:t*5})});
    c.save();c.translate(g.Wc*.38,ly(g.Wc*.38)-1.1);c.rotate(-.95+.07*Math.sin(t*1.4));c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-1.8,-.7,-3.8,-.3);c.quadraticCurveTo(-1.8,.55,0,.75);c.closePath();c.clip();c.fillStyle="#1a1a1a";c.fillRect(-5,-3,8,6);texFill(c,{s:g.s,Wc:8,D:6},.5);c.restore()});
  const pts=[];for(let x=-1;x<=g.Wc+1;x+=.2)pts.push([x,ly(x)]);line(c,pts,.16,"#fff",.95);
  for(let k=0;k<5;k++){const x=g.Wc*.2+k*.95,y=g.D-1.3-k*.05;c.save();c.fillStyle="#fff";c.globalAlpha=.75;c.fillRect(x,y,.6,.16);c.restore();shadow(c,g,x,x+.6,y+.16,.85)}
  S.mx=g.Wc*.5;
 },
 vescica(c,g,P,S,t){texFill(c,g,.5);line(c,[[0,1.2],[g.Wc,1.25]],.08,"#ddd",.7);
  const bw=P.bw||9,bh=P.bh||7,cx=g.Wc/2,cy=2.6+bh/2,br=k=>{const r=Math.min(bw,bh)*.38;k.roundRect?k.roundRect(cx-bw/2,cy-bh/2,bw,bh,r):k.rect(cx-bw/2,cy-bh/2,bw,bh)};
  if(bw>.5){anech(c,g,br,t);enh(c,g,cx-bw/2+.4,cx+bw/2-.4,cy+bh/2,.22);c.save();c.strokeStyle="#fff";c.globalAlpha=.7;c.lineWidth=.08;c.beginPath();br(c);c.stroke();c.restore()}
  clipDo(c,k=>ell(k,cx,cy+bh/2+1.6,2.4,1.3),()=>{texFill(c,g,.35)});
  if(P.balloon){const by=cy+bh/2-1.2;anech(c,g,k=>ell(k,cx,by,.85,.8),t);c.save();c.strokeStyle="#fff";c.lineWidth=.1;c.globalAlpha=.95;c.beginPath();ell(c,cx,by,.9,.85);c.stroke();c.restore()}
  if(S.cal&&bw>.5){const m=(x,y,n)=>{c.save();c.strokeStyle="#ffe14d";c.lineWidth=.05;c.beginPath();c.moveTo(x-.25,y);c.lineTo(x+.25,y);c.moveTo(x,y-.25);c.lineTo(x,y+.25);c.stroke();c.fillStyle="#ffe14d";c.font=`${.55}px sans-serif`;c.fillText(n,x+.25,y-.25);c.restore()};
   m(cx-bw/2+.1,cy,"1");m(cx+bw/2-.1,cy,"1");m(cx,cy-bh/2+.1,"2");m(cx,cy+bh/2-.1,"2");c.save();c.setLineDash([.15,.15]);c.strokeStyle="#ffe14d";c.lineWidth=.03;c.beginPath();c.moveTo(cx-bw/2+.1,cy);c.lineTo(cx+bw/2-.1,cy);c.moveTo(cx,cy-bh/2+.1);c.lineTo(cx,cy+bh/2-.1);c.stroke();c.restore()}
  S.mx=g.Wc*.5;
 },
 morison(c,g,P,S,t){const b=insp(t,P.rr||16)*.25;texFill(c,g,.6,{scale:.75,dy:b*g.s});
  const kx=g.Wc*.62,ky=9.4+b,kr=k=>ell(k,kx,ky,3.3,1.75,-.25);
  if(P.fluid){const th=P.fluid;anech(c,g,k=>ell(k,kx-.15,ky-.35,3.3+th*.6,1.75+th,-.25),t)}
  clipDo(c,kr,()=>{c.fillStyle="#141414";c.fillRect(0,0,g.Wc,g.D);texFill(c,g,.34)});
  clipDo(c,k=>ell(k,kx,ky,1.9,.8,-.25),()=>texFill(c,g,1,{scale:.7}));clipDo(c,k=>ell(k,kx,ky,1.9,.8,-.25),()=>{c.fillStyle="rgba(255,255,255,.35)";c.fillRect(0,0,g.Wc,g.D)});
  c.save();c.strokeStyle="#fff";c.globalAlpha=.8;c.lineWidth=.07;c.beginPath();kr(c);c.stroke();c.restore();
  const pts=[];for(let x=g.Wc*.45;x<=g.Wc;x+=.2)pts.push([x,3.5-.5*(x-g.Wc*.45)+b]);line(c,pts,.14,"#fff",.9);
  S.mx=g.Wc*.5;
 },
 vci(c,g,P,S,t){const rr=P.rr||14,b=insp(t,rr),hr=P.hr||80;texFill(c,g,.55,{scale:.8,dy:b*.25*g.s});
  const yc=8.4+b*.3,d=P.d*(1-P.col*b)*(1+.025*pulse(ph(t,hr))),y1=yc-d/2,y2=yc+d/2,x0=3.6;
  const ivc=k=>{k.moveTo(x0,y1-.3);k.quadraticCurveTo(x0+1.2,y1,x0+2.4,y1);k.lineTo(g.Wc+1,y1-.15);k.lineTo(g.Wc+1,y2+.15);k.lineTo(x0+2.4,y2);k.quadraticCurveTo(x0+1.2,y2,x0,y2+.4);k.closePath()};
  anech(c,g,ivc,t);anech(c,g,k=>ell(k,2.1,yc-.1,2,1.55+.2*pulse(ph(t,hr))),t);
  anech(c,g,k=>{k.moveTo(x0+2.7,y1+.02);k.quadraticCurveTo(x0+3.7,5.4,x0+5.6,3.6);k.lineTo(x0+5.9,3.9);k.quadraticCurveTo(x0+4.2,5.7,x0+3.3,y1+.02);k.closePath()},t);
  line(c,[[x0+2.4,y1],[g.Wc+1,y1-.15]],.07,"#fff",.85);line(c,[[x0+2.4,y2],[g.Wc+1,y2+.15]],.07,"#fff",.85);
  line(c,[[0,12.3],[g.Wc,12]],.15,"#fff",.7);enh(c,g,x0+2.4,g.Wc,y2,.06);S.mx=g.Wc*.62;
 },
 colecisti(c,g,P,S,t){const b=insp(t,P.rr||16)*.2;texFill(c,g,.6,{scale:.75,dy:b*g.s});
  const gx=g.Wc*.5,gy=5.6+b,gb=k=>ell(k,gx,gy,3.1,1.25,.18),wt=P.wall||.25;
  if(P.peri)anech(c,g,k=>ell(k,gx,gy,3.1+wt+.35,1.25+wt+.3,.18),t);
  anech(c,g,gb,t);c.save();c.strokeStyle="#fff";c.globalAlpha=.75;c.lineWidth=wt>.35?.12:.07;c.beginPath();ell(c,gx,gy,3.1+wt*.3,1.25+wt*.3,.18);c.stroke();if(wt>.35){c.globalAlpha=.4;c.lineWidth=.06;c.beginPath();ell(c,gx,gy,3.1+wt,1.25+wt,.18);c.stroke()}c.restore();enh(c,g,gx-2,gx+1.4,gy+1.3,.14);
  if(P.stone){const sx=gx+1.4,sy=gy+.55;c.save();c.fillStyle="#fff";c.shadowColor="#fff";c.shadowBlur=8;c.beginPath();c.ellipse(sx,sy,.45,.32,0,PI,2*PI);c.fill();c.restore();shadow(c,g,sx-.42,sx+.42,sy+.05,.95)}
  S.mx=g.Wc*.5;
 },
 rene(c,g,P,S,t){const b=insp(t,P.rr||16)*.3;texFill(c,g,.58,{scale:.75,dy:b*g.s});
  const kx=g.Wc*.5,ky=7.2+b,rot=-.12,hy=P.hydro||0,kd=k=>ell(k,kx,ky,5.1,2.35,rot);
  clipDo(c,kd,()=>{c.fillStyle="#121212";c.fillRect(0,0,g.Wc,g.D);texFill(c,g,.36,{scale:.85})});
  const sr=[3.3+hy*.15,.95+hy*.22];clipDo(c,k=>ell(k,kx,ky,sr[0],sr[1],rot),()=>{texFill(c,g,1,{scale:.65});c.fillStyle="rgba(255,255,255,.3)";c.fillRect(0,0,g.Wc,g.D)});
  if(hy){const pc=Math.cos(rot),ps=Math.sin(rot),at=(dx,dy)=>[kx+dx*pc-dy*ps,ky+dx*ps+dy*pc];
   const pel=[.7+hy*.55,.28+hy*.25],cal=[[-2.1,-.55],[-1,-.8],[.4,-.85],[1.6,-.6],[-1.6,.6],[.9,.75]],cr=.18+hy*.17;
   const hp=k=>{const q=at(.6,0);ell(k,q[0],q[1],pel[0],pel[1],rot);if(hy>1)cal.forEach(d=>{const q2=at(d[0]*(1+hy*.05),d[1]*(1+hy*.12));k.moveTo(q2[0]+cr,q2[1]);ell(k,q2[0],q2[1],cr,cr*.85,rot)})};
   anech(c,g,hp,t);if(hy>1)cal.forEach(d=>{const q2=at(d[0]*(1+hy*.05),d[1]*(1+hy*.12)),q=at(.6,0);clipDo(c,k=>{k.moveTo(q[0],q[1]-.14);k.lineTo(q2[0],q2[1]-.12);k.lineTo(q2[0],q2[1]+.12);k.lineTo(q[0],q[1]+.14);k.closePath()},()=>{c.fillStyle="#030303";c.fillRect(0,0,g.Wc,g.D)})})}
  if(P.stone){const q=[kx+.6+(.7+hy*.55)*.8,ky+.05-.12];c.save();c.fillStyle="#fff";c.shadowColor="#fff";c.shadowBlur=7;c.beginPath();c.ellipse(q[0],q[1],.34,.26,0,0,2*PI);c.fill();c.restore();shadow(c,g,q[0]-.32,q[0]+.32,q[1]+.2,.9)}
  c.save();c.strokeStyle="#fff";c.globalAlpha=.85;c.lineWidth=.09;c.beginPath();kd(c);c.stroke();c.restore();
  const pts=[];for(let x=0;x<=g.Wc*.55;x+=.2)pts.push([x,3.1+.25*x+b]);line(c,pts,.08,"#ddd",.45);
  S.mx=g.Wc*.5;
 },
 aorta(c,g,P,S,t){const b=insp(t,P.rr||16)*.12,f=ph(t,P.hr||72);texFill(c,g,.56,{scale:.8,dy:b*g.s});
  const ad=P.ad||2,vy=10.6+b,vx=g.Wc*.5,R0=ad/2*(1+.025*pulse(f)),ax=vx+.55,ay=vy-R0-.55;
  c.save();c.fillStyle="#fff";c.globalAlpha=.9;c.beginPath();c.ellipse(vx,vy+.15,2.3,.55,0,PI,2*PI);c.fill();c.restore();shadow(c,g,vx-2.3,vx+2.3,vy,.95);
  if(P.rupt)clipDo(c,k=>{k.moveTo(ax+R0*.6,ay-R0*.5);k.bezierCurveTo(ax+R0*2.1,ay-R0*.4,ax+R0*2.4,ay+R0*1.1,ax+R0*1.2,vy+.3);k.bezierCurveTo(ax+R0*.4,vy+.1,ax,ay+R0,ax+R0*.6,ay-R0*.5);k.closePath()},()=>{c.fillStyle="#0a0a0a";c.fillRect(0,0,g.Wc,g.D);texFill(c,g,.32,{scale:1.6});texFill(c,g,.18,{scale:.5,dx:5})});
  anech(c,g,k=>ell(k,vx-2.7,ay+.35,1.05,.42+.08*insp(t,P.rr||16)),t);
  const lr=P.thr?R0*(1-P.thr):R0,ly=ay-(R0-lr)*.75,lum=k=>ell(k,ax,ly,lr,lr);
  if(P.thr)clipDo(c,k=>ell(k,ax,ay,R0,R0),()=>{c.fillStyle="#0c0c0c";c.fillRect(0,0,g.Wc,g.D);texFill(c,g,.2,{scale:.55});c.save();c.globalAlpha=.22;c.strokeStyle="#aaa";c.lineWidth=.03;for(let k=1;k<4;k++){c.beginPath();ell(c,ax,ay-(R0-lr)*.75*k/4,lr+(R0-lr)*k/4,lr+(R0-lr)*k/4);c.stroke()}c.restore()});
  anech(c,g,lum,t);enh(c,g,ax-R0*.8,ax+R0*.8,ay+R0,.08);
  c.save();c.strokeStyle="#fff";c.globalAlpha=.9;c.lineWidth=.1;c.beginPath();ell(c,ax,ay,R0,R0);c.stroke();c.restore();
  if(S.mode==="C"){const sc=P.cscale||60,v=12+60*pulse(f);colorFlow(c,k=>{k.moveTo(ax,ly-lr);k.arc(ax,ly,lr,-PI/2,PI/2,false);k.closePath()},v,sc,t,true,[ax,ly-lr,lr,2*lr]);
   if(ad>3)colorFlow(c,k=>{k.moveTo(ax,ly+lr);k.arc(ax,ly,lr,PI/2,3*PI/2,false);k.closePath()},-v*.7,sc,t,true,[ax-lr,ly-lr,lr,2*lr])}
  if(S.cal){c.save();c.strokeStyle="#ffe14d";c.fillStyle="#ffe14d";c.lineWidth=.05;[[ax-R0,ay],[ax+R0,ay],[ax,ay-R0],[ax,ay+R0]].forEach(q=>{c.beginPath();c.moveTo(q[0]-.22,q[1]);c.lineTo(q[0]+.22,q[1]);c.moveTo(q[0],q[1]-.22);c.lineTo(q[0],q[1]+.22);c.stroke()});
   c.setLineDash([.15,.15]);c.lineWidth=.03;c.beginPath();c.moveTo(ax-R0,ay);c.lineTo(ax+R0,ay);c.moveTo(ax,ay-R0);c.lineTo(ax,ay+R0);c.stroke();c.restore()}
  S.mx=ax;
 }
};

/* ---------- rendering di un fotogramma ---------- */
function frame(st,t){const P=st.P,c=st.ctx,g=geo(P),S=st.S;mkTex();
  c.setTransform(1,0,0,1,0,0);c.fillStyle="#000";c.fillRect(0,0,W,H);
  c.setTransform(g.s,0,0,g.s,0,0);c.save();if(g.cvx){fanPath(c,g);c.clip()}else{c.beginPath();c.rect(0,0,g.Wc,g.D);c.clip()}
  SCN[P.scene](c,g,P,S,t);
  const gr=c.createLinearGradient(0,0,0,g.D);gr.addColorStop(0,"rgba(0,0,0,0)");gr.addColorStop(1,"rgba(0,0,0,.42)");c.fillStyle=gr;c.fillRect(0,0,g.Wc,g.D);
  const gn=S.gain||1;if(gn<1){c.fillStyle=`rgba(0,0,0,${(1-gn)*.9})`;c.fillRect(0,0,g.Wc,g.D)}else if(gn>1){c.save();c.globalCompositeOperation="lighter";c.fillStyle=`rgba(90,90,90,${(gn-1)*.7})`;c.fillRect(0,0,g.Wc,g.D);c.restore()}
  if(S.mode==="C")drawRoi(c,g,P,S);
  if(S.mode==="PW"&&S.gate)drawGate(c,g,S.gate);
  if(S.mode==="M"){c.save();c.setLineDash([.12,.12]);c.strokeStyle="rgba(255,255,255,.75)";c.lineWidth=.03;c.beginPath();c.moveTo(S.mx,0);c.lineTo(S.mx,g.D);c.stroke();c.restore()}
  c.restore();
  /* righello della profondità e marcatori */
  c.setTransform(1,0,0,1,0,0);c.fillStyle="rgba(220,226,232,.85)";c.font="10px sans-serif";c.textAlign="right";
  for(let d=0;d<=g.D+1e-6;d+=g.D>8?1:.5){const y=d*g.s;c.fillRect(W-8,y,d%(g.D>8?5:1)===0?8:4,1);if(d%(g.D>8?5:1)===0&&d>0)c.fillText(f1(d),W-11,y+4)}
  const fy=(P.focus||g.D*.45)*g.s;c.fillStyle="#ffd84a";c.beginPath();c.moveTo(W-1,fy-5);c.lineTo(W-7,fy);c.lineTo(W-1,fy+5);c.fill();
  c.fillStyle="#7ec8ff";c.beginPath();c.arc(12,12,4,0,2*PI);c.fill();
  if(st.frozen){c.fillStyle="rgba(255,216,74,.95)";c.font="bold 12px sans-serif";c.textAlign="left";c.fillText("FREEZE",10,H-10)}}
function drawRoi(c,g,P,S){c.save();c.strokeStyle="rgba(230,230,230,.75)";c.lineWidth=.025;c.setLineDash([.1,.08]);const x0=g.Wc*.12,x1=g.Wc*.88,y0=g.cvx?2:.5,y1=g.cvx?g.D*.75:g.D*.82;
  c.beginPath();if(P.scene==="vlong"){c.moveTo(x0+.4,y0);c.lineTo(x1+.4,y0);c.lineTo(x1-.4,y1);c.lineTo(x0-.4,y1);c.closePath()}else c.rect(x0,y0,x1-x0,y1-y0);c.stroke();c.restore()}
function drawGate(c,g,gt){c.save();c.strokeStyle="rgba(255,255,255,.9)";c.lineWidth=.03;c.setLineDash([.08,.08]);c.beginPath();c.moveTo(gt.x+.9,0);c.lineTo(gt.x-gt.y*.0,gt.y);c.stroke();c.setLineDash([]);c.lineWidth=.04;
  c.beginPath();c.moveTo(gt.x-.18,gt.y-.12);c.lineTo(gt.x+.18,gt.y-.12);c.moveTo(gt.x-.18,gt.y+.12);c.lineTo(gt.x+.18,gt.y+.12);c.stroke();
  c.strokeStyle="#7ec8ff";c.beginPath();c.moveTo(gt.x-.3,gt.y+.52);c.lineTo(gt.x+.3,gt.y-.52);c.stroke();c.restore()}

/* ---------- tracciato inferiore: spettro Doppler o modo M ---------- */
const TW=W,TH=150;
function traceCol(st,x,t){const tc=st.tctx,P=st.P,S=st.S;
  if(S.mode==="PW"){const sc=P.scale||120,base=P.wf==="ven"||P.wf==="vencont"?TH*.32:TH*.72,Vp=sc,Vn=sc*(TH-base)/base;
   tc.fillStyle="#000";tc.fillRect(x,0,2,TH);for(let k=0;k<3;k++){tc.fillStyle=`rgba(255,255,255,${rnd()*.25})`;tc.fillRect(x,rnd()*TH,2,1)}
   let v=vel(P,t,S);if(P.wf==="zero")v=0;const br=P.broad||(P.wf==="sten"?.85:.25);
   const draw=(v0,v1)=>{const y0=base-v0/Vp*base,y1=base-v1/Vp*base;const lo=Math.min(y0,y1),hi=Math.max(y0,y1);const n=Math.max(2,Math.ceil((hi-lo)/3));
     for(let i=0;i<n;i++){const fr=i/n,yy=lo+(hi-lo)*fr,near=v1>=0?1-fr:fr;const bright=near<br?.95:.18+.2*rnd();tc.fillStyle=`rgba(255,255,255,${bright*(.65+.35*rnd())})`;tc.fillRect(x,yy,2,(hi-lo)/n+1)}};
   if(Math.abs(v)>1){if(v>Vp){draw(0,Vp);draw(-Vn,-Vn+(v-Vp))}else if(v<-Vn){draw(0,-Vn);draw(Vp,Vp-(-v-Vn))}else draw(0,v)}
   tc.fillStyle="rgba(126,200,255,.8)";tc.fillRect(x,base,2,1)}
  else if(S.mode==="M"){const g=geo(P),mx=Math.round(S.mx*g.s)+4;try{const col=st.ctx.getImageData(clamp(mx,0,W-1),0,1,H);const tmp=st.mtmp||(st.mtmp=document.createElement("canvas"));tmp.width=1;tmp.height=H;tmp.getContext("2d").putImageData(col,0,0);tc.drawImage(tmp,0,0,1,H,x,0,2,TH)}catch(e){}}
  tc.fillStyle="#000";tc.fillRect((x+2)%TW,0,8,TH)}
function traceAxis(st){const P=st.P,S=st.S,ax=st.axis;if(!ax)return;
  if(S.mode==="PW"){const sc=P.scale||120,ven=P.wf==="ven"||P.wf==="vencont",base=ven?.32:.72,Vn=Math.round(sc*(1-base)/base);
   ax.innerHTML=`<span style="top:0">${sc}</span><span style="top:${base*100}%">0</span><span style="bottom:0">−${Vn}</span><em>cm/s</em>`}
  else ax.innerHTML=`<span style="top:0">0</span><span style="bottom:0">${f1(geo(P).D)}</span><em>cm</em>`}

/* ---------- ciclo di animazione ---------- */
const LIVE=new Set();let RAF=0,T0=performance.now();
function loop(now){RAF=0;const t=(now-T0)/1000;let any=false;
  LIVE.forEach(st=>{if(!st.cv.isConnected){LIVE.delete(st);return}any=true;if(st.frozen)return;
    frame(st,t);if(st.tctx&&(st.S.mode==="PW"||st.S.mode==="M")){const px=(t*(st.S.mode==="M"?60:95))%TW;let x=st.lastX==null?px:st.lastX;let guard=0;
      while(Math.round(x)!==Math.round(px)&&guard++<40){x=(x+2)%TW;traceCol(st,Math.round(x),t)}st.lastX=px}});
  if(any)RAF=requestAnimationFrame(loop)}
function startLoop(){if(!RAF)RAF=requestAnimationFrame(loop)}
function prefill(st){if(!st.tctx)return;const tc=st.tctx;tc.fillStyle="#000";tc.fillRect(0,0,TW,TH);if(st.S.mode!=="PW"&&st.S.mode!=="M")return;
  const now=(performance.now()-T0)/1000,sp=st.S.mode==="M"?60:95;for(let x=0;x<TW;x+=2){const tt=now-(TW-x)/sp;if(st.S.mode==="M"&&x%2===0)frame(st,tt);traceCol(st,x,tt)}frame(st,now);st.lastX=null}

/* ---------- interfaccia dell'ecografo ---------- */
const PROBE={lin:["L 3-12","lineare"],cvx:["C 1-6","convex"]};
function paramList(P,S){const g=geo(P);const L=[["B",""],["Frq",P.probe==="lin"?"Gen 10,0":"Pen 3,5"],["Gn",Math.round(50*(S.gain||1))],["DR","66"],["FA","4"],["D",f1(g.D,1)+" cm"]];
  if(S.mode==="C")L.push(["C",""],["Frq","Mid"],["Gn","48"],["PRF",P.scene==="vlong"&&P.sten?"2,5k":"1,5k"],["WF","3"]);
  if(S.mode==="PW")L.push(["PW",""],["SV","2,0 mm"],["Ang","60°"],["PRF",f1((P.scale||120)/40,1)+"k"],["WF","2"]);
  if(S.mode==="M")L.push(["M",""],["Spd","3"]);return L}
function measBox(P,S){if(S.mode==="PW"){const s=pwStats(P);if(!s)return "";return `<div class="us-meas"><b>Misure</b><span>PSV <i>${f1(s.psv,1)} cm/s</i></span><span>EDV <i>${f1(s.edv,1)} cm/s</i></span><span>RI <i>${f1(s.ri,2)}</i></span></div>`}
  if(S.cal&&P.meas)return `<div class="us-meas"><b>Misure</b>${P.meas.map(m=>`<span>${m[0]} <i>${m[1]}</i></span>`).join("")}</div>`;return ""}
function ecoScreen(id,P,S,o){o=o||{};const pr=PROBE[P.probe]||PROBE.lin,esc=G.esc||(x=>x);const d=new Date(),ds=`${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
  const md=P.modes||["B"],split=S.mode==="PW"||S.mode==="M";
  const btn=(k,l,on,dis)=>`<button type="button" class="us-key${on?" on":""}" data-us="${k}" ${dis?"disabled":""}>${l}</button>`;
  return `<div class="us-dev" id="${id}">
   <div class="us-screen">
    <div class="us-top"><span class="us-logo">ATLANTE<b>US</b></span><span class="us-pid">ID ${esc(o.pid||"ESE-0000")}<i>${esc(o.pname||"Esercitazione")}</i></span><span class="us-probe">${pr[0]}<i>${esc(P.preset||"Generale")}</i></span><span class="us-idx">MI 0,9<br>TIs 0,3</span><span class="us-dt">${ds}<br><b class="us-clock">--:--:--</b></span></div>
    <div class="us-main${split?" split":""}">
     <div class="us-params">${paramList(P,S).map(p=>p[1]===""?`<b class="hd">${p[0]}</b>`:`<span>${p[0]}<i>${p[1]}</i></span>`).join("")}</div>
     <div class="us-img"><canvas width="${W}" height="${H}" class="us-cv" aria-label="Immagine ecografica simulata"></canvas>
      ${S.mode==="C"?`<div class="us-cbar"><span>+${P.cscale||40}</span><i></i><span>−${P.cscale||40}</span><em>cm/s</em></div>`:`<div class="us-gbar"><i></i></div>`}
      ${split?`<div class="us-trace"><canvas width="${TW}" height="${TH}" class="us-tc" aria-hidden="true"></canvas><div class="us-axis"></div></div>`:""}
      ${measBox(P,S)}</div>
    </div>
    <div class="us-foot"><span class="us-thumbs"><i></i><i></i><i class="on"></i></span><span>${S.mode==="PW"?"Doppler pulsato":S.mode==="C"?"Color Doppler":S.mode==="M"?"Modo M":"B-mode"} · ${pr[1]}</span><span class="us-fr">FR ${S.mode==="C"?14:S.mode==="PW"?"—":32} Hz</span></div>
    <div class="us-glass" aria-hidden="true"></div>
   </div>
   <div class="us-touch">
    <div class="us-row">${["B","M","C","PW"].map(k=>btn("m-"+k,k==="C"?"Color":k,S.mode===k,!md.includes(k))).join("")}</div>
    <div class="us-row">${btn("freeze",S.frozen?"Unfreeze":"Freeze",S.frozen)}${P.compress?btn("comp",P.compress,S.comp>0):""}${P.wf==="ven"?btn("aug","Comprimi il polpaccio",false):""}${P.meas?btn("cal","Calibri",S.cal):""}
     <label class="us-gain">Gain<input type="range" min="0.6" max="1.5" step="0.05" value="${S.gain||1}" data-us="gain" aria-label="Guadagno"></label></div>
   </div>
   <div class="us-base"><span class="us-ball" aria-hidden="true"></span><span class="us-knob" aria-hidden="true"><i></i></span><span class="us-knob" aria-hidden="true"><i></i></span><span class="us-led" aria-hidden="true"></span></div>
  </div>`}
/* monta il dispositivo nel contenitore e collega i comandi */
function ecoMount(root,P,S,o){const st={P,S,frozen:!!S.frozen};root.innerHTML=ecoScreen("us-"+Math.random().toString(36).slice(2,7),P,S,o);
  st.cv=root.querySelector(".us-cv");st.ctx=st.cv.getContext("2d",{willReadFrequently:true});const tcv=root.querySelector(".us-tc");st.tctx=tcv?tcv.getContext("2d"):null;st.axis=root.querySelector(".us-axis");
  traceAxis(st);mkTex();prefill(st);frame(st,(performance.now()-T0)/1000);
  if(RMq()&&!st.frozen){st.frozen=true}LIVE.add(st);startLoop();
  const rerender=()=>ecoMount(root,P,S,o);
  root.querySelectorAll("[data-us]").forEach(b=>{const k=b.dataset.us;
    if(k==="gain"){b.oninput=()=>{S.gain=+b.value;const p=root.querySelector(".us-params");if(p)p.innerHTML=paramList(P,S).map(p=>p[1]===""?`<b class="hd">${p[0]}</b>`:`<span>${p[0]}<i>${p[1]}</i></span>`).join("");if(st.frozen)frame(st,(performance.now()-T0)/1000)};return}
    b.onclick=()=>{if(k.startsWith("m-")){S.mode=k.slice(2);rerender();return}
      if(k==="freeze"){S.frozen=!S.frozen;rerender();return}
      if(k==="cal"){S.cal=!S.cal;rerender();return}
      if(k==="comp"){const on=!(S.comp>0);const t0=performance.now(),from=S.comp||0,to=on?1:0;const step=()=>{const k2=Math.min(1,(performance.now()-t0)/500);S.comp=from+(to-from)*k2;if(st.frozen)frame(st,(performance.now()-T0)/1000);if(k2<1)requestAnimationFrame(step)};step();b.classList.toggle("on",on);return}
      if(k==="aug"){S.aug=(performance.now()-T0)/1000;b.classList.add("on");setTimeout(()=>b.classList.remove("on"),1400)}}});
  return st}
function clockTick(){document.querySelectorAll(".us-clock").forEach(c=>{const d=new Date();c.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,"0")).join(":")})}
if(typeof window!=="undefined")setInterval(()=>{if(!document.hidden)clockTick()},1000);

/* ---------- quadri della palestra ---------- */
const ECO_SC=[
 {id:"us-vasi",n:"Arteria e vena dell'avambraccio",rep:"Medicina",P:{scene:"vasi",probe:"lin",D:3.5,preset:"Accessi vascolari",modes:["B","C"],compress:"Comprimi con la sonda"},
  st:"Devi posizionare un ago cannula con guida ecografica in una donna con vene non visibili né palpabili. Sonda lineare in trasversale sull'avambraccio. Prova a comprimere con la sonda e ad accendere il color Doppler.",
  s:[{q:"Quale delle due strutture è la vena?",o:["Quella ovale a destra: si schiaccia premendo con la sonda e non pulsa","Quella rotonda a sinistra, con parete spessa e pulsante","Entrambe sono vene","Nessuna delle due: sono tendini"],c:0},
     {q:"Che cosa controlli prima di pungere?",o:["Profondità, calibro e decorso della vena, assenza di flusso arterioso al color Doppler e distanza dall'arteria","Che la vena pulsi","Solo il colore della cute","Che la vena sia il più profonda possibile"],c:0}],
  e:"La vena è ovale, a parete sottile, comprimibile e non pulsa; l'arteria è rotonda, a parete spessa, pulsante e resiste alla compressione. Al color Doppler il flusso arterioso cambia a ogni battito, quello venoso è più continuo."},
 {id:"us-ago-lume",n:"Punta dell'ago nel lume della vena",rep:"Pronto soccorso",P:{scene:"vasi",probe:"lin",D:3.5,preset:"Accessi vascolari",modes:["B"],needle:"lume"},
  st:"Stai inserendo un ago cannula con guida ecografica in asse corto (sonda trasversale al vaso). Sullo schermo compare un punto molto luminoso.",
  s:[{q:"Dove si trova la punta dell'ago?",o:["Al centro del lume della vena: punto iperecogeno con una piccola coda di riverbero","Dentro l'arteria","Nel tessuto sottocutaneo, sopra la vena","Oltre la parete posteriore della vena"],c:0},
     {q:"Come prosegui?",o:["Abbasso leggermente l'ago e lo faccio avanzare di pochi millimetri seguendo la punta con la sonda, poi faccio scorrere il catetere nel vaso","Spingo l'ago a fondo senza guardare lo schermo","Ritiro tutto e cambio sede","Inclino l'ago verso l'arteria"],c:0}],
  e:"In asse corto lo schermo mostra solo una sezione dell'ago: per essere sicuri di guardare la punta e non il corpo, si fa avanzare la sonda e poi l'ago, a piccoli passi (posizionamento dinamico della punta). Una buona parte del catetere deve restare dentro la vena per ridurre il rischio di fuoriuscita."},
 {id:"us-ago-parete",n:"Ago oltre la parete posteriore",rep:"Medicina",P:{scene:"vasi",probe:"lin",D:3.5,preset:"Accessi vascolari",modes:["B"],needle:"parete"},
  st:"Durante la puntura ecoguidata non vedi più la punta nel lume: il punto luminoso è comparso sotto la vena.",
  s:[{q:"Che cosa è successo?",o:["La punta ha attraversato la parete posteriore della vena","La punta è al centro del lume","L'ago è nell'arteria","È un artefatto: si può proseguire"],c:0},
     {q:"Che cosa fai?",o:["Ritiro lentamente l'ago guardando lo schermo finché la punta ricompare nel lume; se si forma un ematoma interrompo e comprimo","Spingo ancora per trovare un'altra vena","Lascio il catetere in quella posizione","Inietto soluzione fisiologica per controllare"],c:0}],
  e:"La perforazione della parete posteriore è la causa più frequente di fallimento: la punta va sempre seguita. Se la vena si gonfia di un ematoma, si interrompe, si comprime e si sceglie un altro punto."},
 {id:"us-tvp",n:"Trombosi venosa profonda alla compressione",rep:"Medicina",P:{scene:"vasi",probe:"lin",D:3.5,preset:"Venoso",modes:["B","C"],dvt:1,compress:"Comprimi con la sonda"},
  st:"Uomo allettato da 10 giorni con il polpaccio destro gonfio e dolente. Il medico esegue l'ecografia con compressione a livello della vena femorale comune. Premi «Comprimi» e accendi il color Doppler.",
  s:[{q:"Che cosa vedi premendo con la sonda?",o:["La vena non si schiaccia, contiene materiale ecogeno e al color non mostra flusso","La vena si chiude completamente","Si schiaccia l'arteria","Non c'è differenza tra arteria e vena"],c:0},
     {q:"Qual è il ruolo dell'infermiere?",o:["Avvisare il medico, somministrare l'anticoagulante prescritto, non massaggiare la gamba e sorvegliare i segni di embolia polmonare (dispnea, dolore toracico, tachicardia)","Massaggiare la gamba per sciogliere il trombo","Applicare un impacco caldo e un bendaggio stretto senza indicazione","Nessuno: è un compito del solo medico"],c:0}],
  e:"Una vena normale si chiude completamente sotto la pressione della sonda: se non si comprime, contiene un trombo. L'ecografia con compressione su due punti (inguine e cavo popliteo) è l'esame di primo livello."},
 {id:"us-tri",n:"Arteria periferica normale: onda trifasica",rep:"Ambulatorio vascolare",P:{scene:"vlong",probe:"lin",D:4,preset:"Arterioso",modes:["B","C","PW"],wf:"tri",scale:120,cscale:110,hr:68},startMode:"PW",
  st:"Controllo dell'arteria femorale comune in un uomo di 55 anni senza disturbi. Il Doppler pulsato è già posizionato al centro del vaso.",
  s:[{q:"Che forma ha l'onda?",o:["Trifasica: picco sistolico rapido, breve flusso invertito e piccola onda in diastole","Monofasica, lenta e smorzata","Venosa, variabile con il respiro","Assenza di flusso"],c:0},
     {q:"Che cosa significa il breve flusso sotto la linea di base?",o:["È normale: a riposo le arteriole a valle hanno alta resistenza e il flusso si inverte brevemente all'inizio della diastole","Indica una stenosi grave","È un artefatto da eliminare","Indica una trombosi venosa"],c:0}],
  e:"Le arterie degli arti a riposo hanno un flusso ad alta resistenza: picco sistolico rapido, inversione protodiastolica e assenza (o quasi) di flusso in diastole. Con l'esercizio o a valle di una stenosi la forma cambia."},
 {id:"us-mono",n:"Onda monofasica smorzata a valle di una stenosi",rep:"Ambulatorio vascolare",P:{scene:"vlong",probe:"lin",D:4,preset:"Arterioso",modes:["B","C","PW"],wf:"mono",scale:60,cscale:40,hr:76},startMode:"PW",
  st:"Uomo di 68 anni, diabetico e fumatore, con dolore ai polpacci dopo 200 metri di cammino. Doppler dell'arteria poplitea.",
  s:[{q:"Che cosa mostra lo spettro?",o:["Onda monofasica con salita lenta, picco basso e arrotondato e flusso continuo: tipica di un'arteria a valle di una stenosi o occlusione","Onda trifasica normale","Velocità altissime con aliasing","Flusso venoso fasico"],c:0},
     {q:"Che cosa eviti nell'assistenza finché non è stato misurato l'indice caviglia-braccio?",o:["Calze o bendaggi compressivi","Il cammino supervisionato","L'educazione allo stop al fumo","L'ispezione quotidiana dei piedi"],c:0}],
  e:"A valle di un restringimento il flusso arriva più tardi e più debole (onda «tardus parvus»). Nell'arteriopatia periferica la compressione può peggiorare l'ischemia: prima si misura l'indice caviglia-braccio."},
 {id:"us-sten",n:"Stenosi carotidea significativa",rep:"Neurologia",P:{scene:"vlong",probe:"lin",D:4,preset:"Carotide",modes:["B","C","PW"],wf:"sten",scale:400,cscale:95,sten:.6,hr:74,gx:2.95},startMode:"C",
  st:"Donna di 72 anni con un episodio di debolezza transitoria alla mano destra. Eco-Doppler della carotide interna sinistra: osserva prima il color, poi il Doppler pulsato nel punto più stretto.",
  s:[{q:"Che cosa noti?",o:["Placca che restringe il lume, mosaico di colori (aliasing) e velocità molto alte con spettro «riempito»: stenosi emodinamicamente significativa","Flusso normale","Occlusione completa senza flusso","Flusso venoso"],c:0},
     {q:"Perché nel punto stretto compaiono colori invertiti e a mosaico?",o:["Le velocità superano il limite della scala impostata (limite di Nyquist): è l'aliasing, si riduce alzando la scala","Il sangue torna davvero indietro","La sonda è guasta","La vena accanto si è svuotata"],c:0}],
  e:"Nella stenosi il sangue accelera per passare nel restringimento: velocità alte, turbolenza a valle (lo spettro perde la «finestra» scura) e aliasing al color. La carotide interna ha normalmente un flusso a bassa resistenza, continuo anche in diastole."},
 {id:"us-carotide",n:"Carotide interna normale: flusso a bassa resistenza",rep:"Neurologia",P:{scene:"vlong",probe:"lin",D:4,preset:"Carotide",modes:["B","C","PW"],wf:"low",scale:120,cscale:100,hr:70},startMode:"PW",
  st:"Controllo eco-Doppler dei tronchi sovra-aortici in un uomo iperteso, senza sintomi. Spettro della carotide interna.",
  s:[{q:"Come descrivi il flusso?",o:["Flusso continuo anche in diastole: bassa resistenza, tipico di un'arteria che irrora il cervello","Flusso trifasico ad alta resistenza","Assenza di flusso","Flusso venoso"],c:0},
     {q:"Come si calcola l'indice di resistenza mostrato in basso?",o:["(velocità sistolica di picco − velocità telediastolica) ÷ velocità sistolica di picco","Velocità di picco × 2","Velocità media ÷ frequenza cardiaca","Pressione sistolica − diastolica"],c:0}],
  e:"Cervello, reni e fegato hanno bisogno di flusso continuo: le loro arterie hanno bassa resistenza e un flusso diastolico ben presente (indice di resistenza basso)."},
 {id:"us-ven",n:"Vena femorale normale: flusso fasico",rep:"Medicina",P:{scene:"vlong",probe:"lin",D:4,preset:"Venoso",modes:["B","C","PW"],wf:"ven",ven:1,r:.45,scale:60,cscale:20,rr:14},startMode:"PW",
  st:"Studio della vena femorale comune in una donna con edema bilaterale. Osserva lo spettro, poi premi «Comprimi il polpaccio».",
  s:[{q:"Che cosa mostra lo spettro?",o:["Flusso fasico che varia con il respiro e aumenta comprimendo il polpaccio: vena pervia senza ostruzioni a monte","Flusso pulsatile arterioso","Assenza di flusso","Flusso continuo e piatto"],c:0},
     {q:"Perché il flusso cambia con il respiro?",o:["Con l'inspirazione aumenta la pressione addominale e il ritorno dalle gambe si riduce; in espirazione riprende","Perché il cuore si ferma in inspirazione","È un difetto dell'apparecchio","Perché l'arteria comprime la vena"],c:0}],
  e:"Il flusso venoso normale degli arti inferiori è fasico con il respiro e aumenta con la compressione distale (augmentation). Se la fasicità scompare, bisogna cercare un'ostruzione più in alto."},
 {id:"us-vencont",n:"Flusso venoso continuo: ostruzione a monte",rep:"Medicina",P:{scene:"vlong",probe:"lin",D:4,preset:"Venoso",modes:["B","C","PW"],wf:"vencont",ven:1,r:.45,scale:60,cscale:20},startMode:"PW",
  st:"Donna con tumore pelvico e gamba sinistra gonfia. Spettro della vena femorale comune sinistra.",
  s:[{q:"Che cosa noti?",o:["Flusso continuo e piatto, senza variazioni con il respiro","Flusso fasico normale","Flusso arterioso trifasico","Aliasing"],c:0},
     {q:"Che cosa può indicare?",o:["Un'ostruzione più in alto (vene iliache o cava), per trombosi o compressione esterna: va segnalato","Una vena normale","Una stenosi carotidea","Una disidratazione"],c:0}],
  e:"Quando la fasicità respiratoria scompare in una sola gamba, il ritorno venoso è ostacolato più a monte: trombosi iliaca o compressione da masse pelviche."},
 {id:"us-pnorm",n:"Polmone normale: scivolamento e linee A",rep:"Pneumologia",P:{scene:"polmone",probe:"lin",D:5,preset:"Polmone",modes:["B","M"],sliding:1,bl:0,rr:16},
  st:"Ecografia del torace anteriore in un uomo sano. Guarda la linea della pleura, poi passa al modo M.",
  s:[{q:"Che cosa vedi sotto la linea pleurica?",o:["La pleura «scivola» con il respiro e sotto compaiono linee orizzontali ripetute (linee A): polmone ben aerato","Molte linee verticali luminose","Un'area nera senza echi","Un organo solido simile al fegato"],c:0},
     {q:"Che cosa mostra il modo M?",o:["Righe orizzontali sopra la pleura e aspetto granulare sotto: il «segno della riva del mare», normale","Righe orizzontali anche sotto la pleura (codice a barre)","Solo nero","Un'onda sinusoidale"],c:0}],
  e:"Le linee A sono riverberi della pleura: indicano aria nel polmone. Lo scivolamento (sliding) dimostra che i foglietti pleurici sono a contatto: in quel punto non c'è pneumotorace."},
 {id:"us-blinee",n:"Linee B diffuse: edema polmonare",rep:"Medicina",P:{scene:"polmone",probe:"lin",D:5,preset:"Polmone",modes:["B","M"],sliding:1,bl:5,rr:26},
  st:"Donna di 81 anni con scompenso cardiaco, dispnea da 2 giorni, crepitii bilaterali. Lo stesso quadro si vede in tutti i campi anteriori e laterali.",
  s:[{q:"Che cosa vedi?",o:["Molte linee verticali luminose che partono dalla pleura e arrivano al fondo dello schermo, muovendosi con il respiro (linee B)","Linee A normali","Assenza di scivolamento","Versamento pleurico"],c:0},
     {q:"Che cosa prepari su prescrizione e che cosa sorvegli?",o:["Posizione seduta, ossigeno per la saturazione indicata, diuretico endovena, bilancio idrico e peso; le linee B si riducono se la terapia funziona","Liquidi in bolo","Posizione supina","Nessun intervento: è normale nell'anziano"],c:0}],
  e:"Tre o più linee B per campo indicano una sindrome interstiziale; se diffuse e bilaterali, in un contesto di scompenso, sono il segno ecografico dell'edema polmonare. Diminuiscono con la terapia decongestionante."},
 {id:"us-ptx",n:"Pneumotorace",rep:"Pronto soccorso",P:{scene:"polmone",probe:"lin",D:5,preset:"Polmone",modes:["B","M"],sliding:0,bl:0,rr:28},startMode:"M",
  st:"Uomo di 24 anni, alto e magro, con dolore toracico improvviso a destra e dispnea. Sonda sul torace anteriore destro.",
  s:[{q:"Che cosa mostra il modo M?",o:["Righe orizzontali anche sotto la pleura («codice a barre»): manca lo scivolamento pleurico","Il segno della riva del mare, normale","Linee B diffuse","Un versamento"],c:0},
     {q:"Che cosa fai?",o:["Avvisi subito il medico, ossigeno, monitoraggio, posizione semiseduta; prepari il materiale per il drenaggio toracico","Lo fai camminare","Applichi una fascia toracica stretta","Aspetti che passi da solo senza dirlo"],c:0}],
  e:"Assenza di scivolamento e di linee B con linee A presenti fanno sospettare il pneumotorace; il «punto polmone» (dove lo scivolamento ricompare) lo conferma. In modo M il pattern a righe orizzontali è detto codice a barre o stratosfera."},
 {id:"us-versamento",n:"Versamento pleurico",rep:"Medicina",P:{scene:"versamento",probe:"cvx",D:14,preset:"Addome",modes:["B"],rr:20},
  st:"Donna con tumore ovarico, dispnea progressiva. Sonda convex sulla base del torace destro, paziente seduta.",
  s:[{q:"Che cosa vedi sopra il diaframma?",o:["Una raccolta anecogena (nera) con il polmone compresso che ondeggia dentro e la colonna visibile sopra il diaframma: versamento pleurico","Un pneumotorace","Polmone normale con linee A","Fegato normale"],c:0},
     {q:"Il medico decide una toracentesi ecoguidata. Che cosa prepari?",o:["Paziente seduta appoggiata in avanti, materiale sterile, monitoraggio di saturazione e parametri, controllo di dolore e tosse durante l'evacuazione","Paziente supina con le gambe sollevate","Nessuna asepsi: è una procedura rapida","Sedazione profonda di routine"],c:0}],
  e:"Il liquido conduce bene gli ultrasuoni: il versamento appare anecogeno e rende visibile la colonna sopra il diaframma (segno della colonna), che normalmente l'aria nasconde."},
 {id:"us-ritenzione",n:"Ritenzione urinaria: calcolo del volume",rep:"Chirurgia",P:{scene:"vescica",probe:"cvx",D:14,preset:"Vescica",modes:["B"],bw:9.2,bh:7.4,meas:[["D1 (trasversale)","11,2 cm"],["D2 (antero-posteriore)","9,0 cm"],["D3 (longitudinale)","12,5 cm"]]},
  st:"Uomo di 74 anni operato di protesi d'anca, non urina da 8 ore e ha dolore sovrapubico. Premi «Calibri» per vedere le misure.",
  s:[{q:"Con la formula dell'ellissoide (D1 × D2 × D3 × 0,52) quanta urina c'è in vescica?",o:["Circa 650 ml","Circa 65 ml","Circa 1.300 ml","Circa 260 ml"],c:0},
     {q:"Che cosa fai?",o:["Segnalo la ritenzione ed eseguo il cateterismo evacuativo secondo prescrizione o protocollo, con tecnica asettica, annotando quantità e aspetto delle urine","Aspetto altre 8 ore","Faccio bere un litro d'acqua","Somministro un diuretico"],c:0}],
  e:"11,2 × 9,0 × 12,5 × 0,52 ≈ 655 ml. La vescica piena è anecogena con rinforzo posteriore. Misurare il volume con l'ecografia evita cateterismi inutili, che aumentano il rischio di infezioni urinarie."},
 {id:"us-foley",n:"Catetere vescicale ostruito",rep:"Medicina",P:{scene:"vescica",probe:"cvx",D:14,preset:"Vescica",modes:["B"],bw:8.4,bh:6.6,balloon:1},
  st:"Donna con catetere vescicale: nella sacca non arriva urina da 3 ore ed è agitata. Sonda sopra il pube.",
  s:[{q:"Che cosa vedi?",o:["Vescica piena con il palloncino del catetere visibile all'interno: il catetere è in vescica ma non drena","Vescica vuota con il palloncino al centro: tutto regolare","Il palloncino fuori dalla vescica","Una cisti ovarica"],c:0},
     {q:"Che cosa controlli per primo?",o:["Pieghe o schiacciamenti del tubo e la posizione della sacca; poi, secondo protocollo, lavaggio o sostituzione del catetere (coaguli, incrostazioni)","Gonfio ancora il palloncino","Somministro un diuretico","Rimuovo il catetere e aspetto"],c:0}],
  e:"Il palloncino si vede come un piccolo cerchio anecogeno con parete luminosa. Se la vescica è piena intorno al palloncino, il drenaggio è ostruito: le cause più comuni sono pieghe del tubo, coaguli e incrostazioni."},
 {id:"us-fast",n:"eFAST positiva: liquido nello spazio di Morison",rep:"Pronto soccorso",P:{scene:"morison",probe:"cvx",D:15,preset:"Addome FAST",modes:["B"],fluid:.7,rr:24},
  st:"Motociclista di 30 anni, PA 84/50, FC 128, dolore addominale. Il medico esegue l'eFAST: finestra epato-renale destra.",
  s:[{q:"Che cosa vedi tra fegato e rene?",o:["Una striscia anecogena (nera) tra fegato e rene: liquido libero nello spazio di Morison","Fegato e rene a contatto, senza liquido","Un calcolo renale","Un pneumotorace"],c:0},
     {q:"Che cosa fai?",o:["Avvisi il team del trauma, due accessi venosi di grosso calibro, campioni per gruppo e prove crociate, preparazione alla trasfusione e alla sala operatoria","Lo mandi a casa","Aspetti la TC senza altri interventi","Fai bere il paziente"],c:0}],
  e:"Nel trauma il sangue libero è anecogeno e si raccoglie nelle zone più declivi: lo spazio di Morison è il punto da guardare per primo. Con instabilità emodinamica una FAST positiva indica di solito la sala operatoria."},
 {id:"us-vci-piena",n:"Vena cava dilatata che non collassa",rep:"Cardiologia",P:{scene:"vci",probe:"cvx",D:15,preset:"Addome",modes:["B","M"],d:2.6,col:.12,rr:16,hr:96},startMode:"M",
  st:"Uomo con scompenso destro, giugulari turgide ed edemi. Vena cava inferiore in sottocostale, respiro spontaneo.",
  s:[{q:"Come appare la vena cava?",o:["Diametro di circa 2,6 cm con variazione respiratoria minima (meno del 50%): pressione dell'atrio destro alta","Vena cava piccola che collassa quasi del tutto","Vena cava assente","Diametro normale con collasso completo"],c:0},
     {q:"Che cosa è prudente evitare finché il medico non rivaluta?",o:["Somministrare liquidi in bolo","Misurare la diuresi","Pesare il paziente","Sollevare la testata del letto"],c:0}],
  e:"Secondo le raccomandazioni ecocardiografiche, una cava sopra 2,1 cm che collassa meno del 50% con l'inspirazione indica una pressione dell'atrio destro elevata (circa 15 mmHg). Il dato va letto con la clinica e non vale nel paziente ventilato."},
 {id:"us-vci-vuota",n:"Vena cava piccola che collassa: ipovolemia",rep:"Medicina d'urgenza",P:{scene:"vci",probe:"cvx",D:15,preset:"Addome",modes:["B","M"],d:1.1,col:.75,rr:24,hr:118},startMode:"M",
  st:"Donna di 80 anni con diarrea da 4 giorni, mucose secche, PA 92/55, FC 118. Vena cava inferiore in sottocostale, respiro spontaneo.",
  s:[{q:"Come appare la vena cava?",o:["Piccola (circa 1 cm) e collassa per più del 50% in inspirazione: pressione dell'atrio destro bassa, compatibile con ipovolemia","Dilatata e fissa","Normale e fissa","Non visibile"],c:0},
     {q:"Che cosa prepari su prescrizione?",o:["Una prova di carico con cristalloidi, con controllo di PA, frequenza, diuresi e segni di sovraccarico","Un diuretico","La restrizione dei liquidi","Nessun intervento"],c:0}],
  e:"Una cava sotto 2,1 cm che collassa più del 50% suggerisce una pressione atriale destra bassa (circa 3 mmHg). L'ecografia aiuta a decidere, ma la risposta ai liquidi si verifica sempre sul paziente."},
 {id:"us-calcolo",n:"Calcolo della colecisti con ombra acustica",rep:"Chirurgia",P:{scene:"colecisti",probe:"cvx",D:12,preset:"Addome",modes:["B"],stone:1,wall:.25},
  st:"Donna di 46 anni con dolore all'ipocondrio destro dopo un pasto grasso, durato 3 ore e poi passato. Ecografia dell'addome superiore.",
  s:[{q:"Che cosa vedi nella colecisti?",o:["Un'immagine iperecogena (bianca) nella parte declive con un cono d'ombra nero dietro: calcolo","Una massa solida senza ombra","Liquido libero","Aria nel colon"],c:0},
     {q:"Quale informazione dai per la prossima ecografia dell'addome?",o:["Venire a digiuno da almeno 6-8 ore, perché la colecisti resti distesa e l'aria intestinale non disturbi","Bere molto latte prima dell'esame","Mangiare un pasto grasso prima","Non serve alcuna preparazione"],c:0}],
  e:"Il calcolo riflette quasi tutti gli ultrasuoni: è bianco e lascia un cono d'ombra posteriore. La bile è anecogena. Il digiuno mantiene la colecisti distesa e riduce i gas intestinali."},
 {id:"us-idro",n:"Colica renale con idronefrosi",rep:"Pronto soccorso",P:{scene:"rene",probe:"cvx",D:14,preset:"Rene",modes:["B"],hydro:2,stone:1,rr:18},
  st:"Uomo di 42 anni con dolore al fianco sinistro a ondate, irradiato all'inguine, e nausea; T 37,2 °C. Ecografia del rene sinistro in asse lungo.",
  s:[{q:"Che cosa vedi al centro del rene?",o:["Bacinetto e calici dilatati, neri e comunicanti tra loro, con un'immagine bianca e cono d'ombra all'uscita del bacinetto: idronefrosi da calcolo","Una cisti singola della corticale","Rene normale: il centro è chiaro e compatto","Liquido intorno al rene"],c:0},
     {q:"Che cosa sorvegli con più attenzione?",o:["Temperatura e segni di infezione: febbre con la via urinaria ostruita va segnalata subito, perché può servire un drenaggio urgente; intanto analgesia prescritta, diuresi e urine filtrate se richiesto","Far bere tre litri d'acqua in un'ora","Nulla: il calcolo passa sempre da solo","Ghiaccio sul fianco e dimissione"],c:0}],
  e:"Il centro del rene (seno renale) è normalmente chiaro per il grasso. Quando le vie urinarie sono dilatate compaiono al suo interno spazi neri ramificati: bacinetto e calici. Il calcolo è bianco con cono d'ombra. Un rene ostruito e infetto (febbre, brividi) è un'urgenza: va decompresso con nefrostomia o stent."},
 {id:"us-idro-globo",n:"Reni dilatati per vescica troppo piena",rep:"Medicina",P:{scene:"rene",probe:"cvx",D:14,preset:"Rene",modes:["B"],hydro:1,rr:16},
  st:"Uomo di 81 anni con ipertrofia prostatica, confuso, perde urina goccia a goccia di continuo. Entrambi i reni appaiono così; la vescica contiene circa 900 ml.",
  s:[{q:"Che cosa vedi nel rene?",o:["Lieve dilatazione del bacinetto (area nera al centro del seno renale), senza calcoli","Idronefrosi grave con corticale assottigliata","Rene normale","Calcolo a stampo"],c:0},
     {q:"Qual è il passo successivo?",o:["Svuotare la vescica con il cateterismo prescritto e ricontrollare i reni: se la dilatazione si riduce, era dovuta alla vescica sovradistesa","Nefrostomia bilaterale immediata","Diuretico per «lavare» i reni","Ridurre i liquidi e aspettare"],c:0}],
  e:"Una vescica molto distesa può dilatare le vie urinarie di entrambi i reni; anche gravidanza e reflusso danno dilatazione senza un vero ostacolo. Per questo una dilatazione lieve si rivaluta dopo la minzione o il cateterismo. Nell'anziano la perdita continua di urina può essere incontinenza da rigurgito, cioè una ritenzione."},
 {id:"us-aaa",n:"Aneurisma dell'aorta addominale",rep:"Ambulatorio vascolare",P:{scene:"aorta",probe:"cvx",D:14,preset:"Aorta",modes:["B","C"],ad:5.6,thr:.35,hr:70,cscale:70,meas:[["Diametro antero-posteriore","5,6 cm"],["Diametro trasverso","5,5 cm"]]},
  st:"Uomo di 70 anni, fumatore e iperteso, senza sintomi. Ecografia dell'aorta addominale in scansione trasversale. Premi «Calibri» e prova il Color.",
  s:[{q:"Che cosa mostra l'immagine?",o:["Aorta dilatata (circa 5,6 cm) con trombo grigio sulla parete intorno al lume nero: aneurisma dell'aorta addominale","Aorta normale, sotto i 3 cm","Vena cava dilatata","Cisti del rene"],c:0},
     {q:"Che cosa ti aspetti e che cosa insegni alla persona?",o:["Valutazione chirurgica vascolare a breve, perché il diametro è vicino alla soglia di intervento; controllo della pressione, stop al fumo e accesso immediato in pronto soccorso se compare dolore improvviso all'addome o alla schiena","Un controllo tra 5 anni","Sport intensi per «rinforzare» la parete","Nessuna indicazione"],c:0}],
  e:"L'aorta addominale normale misura circa 2 cm; sopra i 3 cm si parla di aneurisma. Si misura in scansione trasversale, perpendicolare all'asse del vaso, da parete a parete: se si misura solo il lume colorato, il trombo fa sottostimare il calibro. Nell'uomo la riparazione si valuta di solito da 5,5 cm (da circa 5 cm nella donna) o se il diametro cresce rapidamente."},
 {id:"us-aaa-rotto",n:"Aneurisma aortico in rottura",rep:"Pronto soccorso",P:{scene:"aorta",probe:"cvx",D:14,preset:"Aorta",modes:["B","C"],ad:7,thr:.3,rupt:1,hr:124,cscale:70,meas:[["Diametro antero-posteriore","7,0 cm"]]},
  st:"Uomo di 76 anni con dolore lombare improvviso, sudato, PA 78/45, FC 124, massa pulsante nell'addome. Ecografia al letto, scansione trasversale.",
  s:[{q:"Che cosa vedi?",o:["Aorta di circa 7 cm con un'area grigia irregolare accanto alla parete: grosso aneurisma con probabile rottura","Aorta normale","Calcolo renale","Ansa intestinale piena di liquido"],c:0},
     {q:"Che cosa fai?",o:["Allerta immediata di chirurgo vascolare e sala operatoria, due accessi venosi di grosso calibro, prove crociate e sangue pronto, liquidi secondo indicazione medica mantenendo una pressione bassa ma sufficiente","Grandi volumi di liquidi per riportare subito la PA a 130","TC programmata in giornata","Antidolorifico e osservazione"],c:0}],
  e:"Dolore all'addome o alla schiena, ipotensione e massa pulsante sono la triade della rottura. Un aneurisma grande in un paziente in shock si considera rotto fino a prova contraria; l'ecografia vede male l'ematoma dietro il peritoneo, quindi un esame dubbio non deve ritardare la chirurgia. Fino al controllo del sanguinamento si accetta una pressione più bassa del normale (ipotensione permissiva)."},
 {id:"us-residuo",n:"Residuo post-minzionale",rep:"Urologia",P:{scene:"vescica",probe:"cvx",D:14,preset:"Vescica",modes:["B"],bw:5.2,bh:3.6,meas:[["D1 (trasversale)","6,0 cm"],["D2 (antero-posteriore)","4,0 cm"],["D3 (longitudinale)","5,5 cm"]]},
  st:"Donna di 68 anni con infezioni urinarie ripetute. Ha appena urinato: misuri il residuo. Premi «Calibri».",
  s:[{q:"Quanto vale il residuo (D1 × D2 × D3 × 0,52)?",o:["Circa 70 ml","Circa 7 ml","Circa 700 ml","Circa 130 ml"],c:0},
     {q:"Come lo interpreti e che cosa fai?",o:["Residuo modesto ma non trascurabile: lo registro con l'ora della minzione, lo comunico e lo ripeto come da protocollo, perché un residuo che si ripete favorisce le infezioni","Catetere a permanenza subito","Ritenzione grave: chiamo l'urgenza","Lo ignoro: il residuo non conta"],c:0}],
  e:"6,0 × 4,0 × 5,5 × 0,52 ≈ 69 ml. La misura va fatta subito dopo la minzione. Nell'adulto un residuo di poche decine di millilitri è trascurabile, valori ripetuti tra 50 e 100 ml meritano attenzione e oltre 150-200 ml si parla di solito di ritenzione; le soglie precise dipendono dal protocollo."},
 {id:"us-gain",n:"Immagine troppo chiara: regolare il guadagno",rep:"Medicina",P:{scene:"vasi",probe:"lin",D:3.5,preset:"Accessi vascolari",modes:["B","C"],compress:"Comprimi con la sonda"},startGain:1.45,
  st:"Cerchi una vena per un accesso ecoguidato, ma l'immagine è lattiginosa e i vasi non sono neri. Prova a spostare il cursore Gain.",
  s:[{q:"Perché l'immagine appare così?",o:["Il guadagno è troppo alto: amplifica tutti gli echi e riempie di falsi echi anche i vasi","La vena è trombizzata","La sonda è rotta","Il paziente è disidratato"],c:0},
     {q:"Che cosa fai?",o:["Abbasso il guadagno finché il sangue nei vasi è nero e i tessuti grigi, poi regolo profondità e fuoco sul vaso","Alzo ancora il guadagno","Premo più forte con la sonda","Passo alla sonda convex"],c:0}],
  e:"Il guadagno amplifica gli echi di ritorno: troppo alto crea falsi echi nei vasi e può far pensare a un trombo, troppo basso fa sparire strutture deboli. Il TGC lo regola per fasce di profondità. Prima di parlare di trombosi conviene controllare le regolazioni e provare la compressione."},
 {id:"us-inplane",n:"Ago visto in asse lungo (in-plane)",rep:"Medicina",P:{scene:"vlong",probe:"lin",D:4,preset:"Accessi vascolari",modes:["B"],ven:1,r:.45,needleIP:1},
  st:"Accesso venoso ecoguidato: la sonda è posta lungo la vena e l'ago entra dal lato corto della sonda, nello stesso piano del fascio.",
  s:[{q:"Che cosa vedi?",o:["L'ago intero come una linea bianca obliqua, con la punta dentro il lume della vena","Solo un punto luminoso","L'ago fuori dal vaso, sopra la parete","Una valvola venosa"],c:0},
     {q:"Qual è il vantaggio principale di questo approccio?",o:["La punta resta visibile in ogni momento e si evita di attraversare la parete posteriore; serve però tenere ago e sonda perfettamente allineati","Non serve la sterilità","Si vede meglio l'arteria vicina","Non richiede di regolare la profondità"],c:0}],
  e:"In asse lungo (in-plane) l'ago entra nel piano del fascio e si vede per tutta la lunghezza; le linee sottili parallele sotto l'ago sono riverberi. In asse corto (out-of-plane) l'ago attraversa il piano e appare come un punto, ed è facile scambiare il corpo dell'ago per la punta. Spesso si usa l'asse corto per trovare la vena e l'asse lungo per seguire l'ago."}
];

/* ---------- palestra ---------- */
const EG={cur:null,step:0,ans:[],n:0,ok:0,S:null};
function egNew(id){const sh=G.shuffle;const pool=ECO_SC.filter(s=>!EG.cur||s.id!==EG.cur.sc.id);const sc=id?ECO_SC.find(s=>s.id===id):(G.palPick?G.palPick(pool):pool[Math.floor(rnd()*pool.length)]);
  EG.cur={sc,ao:sc.s.map(q=>sh(q.o.map((_,i)=>i))),pid:"ESE-"+Math.floor(1000+rnd()*9000)};EG.step=0;EG.ans=[];
  EG.S={mode:sc.startMode||"B",gain:sc.startGain||1,comp:0,cal:false,frozen:false}}
function ecoGym(){const app=document.getElementById("app"),esc=G.esc;if(!EG.cur)egNew();const C=EG.cur,sc=C.sc,done=EG.step>=sc.s.length;
  const steps=sc.s.map((q,i)=>{if(i>EG.step)return "";const a=EG.ans[i],ao=C.ao[i],right=ao.indexOf(q.c);
    return `<div class="gym-step"><span class="eyebrow">${i+1}. ${i===sc.s.length-1?"Che cosa fai":"Che cosa vedi"}</span><p><b>${esc(q.q)}</b></p><div class="opts">${ao.map((k,j)=>`<button class="opt${a!=null?(j===right?" right":j===a?" wrong":""):""}" data-uq="${i}" data-o="${j}" ${a!=null?"disabled":""}>${esc(q.o[k])}</button>`).join("")}</div></div>`}).join("");
  app.innerHTML=`<div><span class="eyebrow">Allenamento</span><h2>Palestra di ecografia ed eco-Doppler</h2></div>
  <p class="lead">Un ecografo da carrello simulato: immagine in tempo reale, color Doppler, Doppler pulsato con lo spettro che scorre e modo M. Cambia modalità dal pannello touch, comprimi con la sonda, regola il guadagno, congela l'immagine e misura. ${ECO_SC.length} quadri: accessi venosi ecoguidati, vasi e trombosi, forme d'onda Doppler, polmone, vescica e residuo post-minzionale, eFAST, vena cava, colecisti, rene e aorta addominale, oltre alla regolazione del guadagno.</p>
  <div class="row"><select class="btn" id="eg-sel" aria-label="Scegli un quadro"><option value="">Scegli un quadro…</option>${ECO_SC.map(s=>`<option value="${s.id}" ${s.id===sc.id?"selected":""}>${esc(s.n)}</option>`).join("")}</select><a class="btn" href="#voce-eco-principi" style="text-decoration:none">Ripassa le basi</a><span class="small" style="margin-left:auto">Sessione: <b>${EG.ok}</b> quadri corretti su <b>${EG.n}</b></span></div>
  <div class="us-wrap" id="eg-dev"></div>
  <div class="sheet gym" style="display:flex;flex-direction:column;gap:12px">
   <div class="gym-case"><span class="eyebrow">${esc(sc.rep)} · sonda ${PROBE[sc.P.probe][1]} ${G.palNewBadge?G.palNewBadge(sc):""}</span><p>${esc(sc.st)}</p></div>
   ${steps}
   ${done?`<div class="expl"><b>${esc(sc.n)}.</b> ${esc(sc.e)}</div><div class="row"><button class="btn primary" id="eg-next">Nuovo quadro</button></div>`:""}
  </div>`;
  ecoMount(document.getElementById("eg-dev"),sc.P,EG.S,{pid:C.pid,pname:sc.rep});
  document.getElementById("eg-sel").onchange=e=>{if(e.target.value){egNew(e.target.value);ecoGym()}};
  app.querySelectorAll("[data-uq]").forEach(b=>b.onclick=()=>{const i=+b.dataset.uq,j=+b.dataset.o;EG.ans[i]=j;EG.step=i+1;
    if(EG.step>=sc.s.length){const good=sc.s.filter((q,k)=>C.ao[k].indexOf(q.c)===EG.ans[k]).length;EG.n++;if(good===sc.s.length)EG.ok++;try{G.logEv("mcq","eo",0,good/sc.s.length,"eco-"+sc.id,{gym:1})}catch(e){}}
    const keepS=EG.S;ecoGym();EG.S=keepS;const p=app.querySelector(".gym .gym-step:last-of-type, .gym .expl");if(p)p.scrollIntoView({block:"nearest"})});
  const nx=document.getElementById("eg-next");if(nx)nx.onclick=()=>{egNew();ecoGym();window.scrollTo({top:0,behavior:"auto"})};
}
G.ECO_SC=ECO_SC;G.ecoGym=ecoGym;G.ecoMount=ecoMount;G.ECO={vel,WF,pwStats,ECO_SC,frame};
})(typeof window!=="undefined"?window:globalThis);
