/* Modelli per le figure dell'Atlante (usati da figure.js). Ogni funzione restituisce testo SVG che usa solo le classi del tema (ft, fsm, fl, fbx, k-*, fh, dash, fs…), così regge tema chiaro e scuro.
   Coordinate in unità del viewBox. Le righe di testo sono già spezzate da chi chiama: i modelli non vanno a capo da soli. */
const FT=(()=>{
  const e=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const r=v=>Math.round(v*10)/10;
  /* contenitore: w, h, descrizione per i lettori di schermo, contenuto */
  const svg=(w,h,label,inner)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${e(label)}">${inner}</svg>`;
  /* testo: righe (stringa o elenco), x, y della prima riga; opzioni: a (start|middle|end), sm (piccolo), b (grassetto), c (classe in più), lh (interlinea) */
  const text=(x,y,lines,o={})=>{
    lines=[].concat(lines);const lh=o.lh||(o.sm?12.5:14.5),a=o.a||"start";
    return `<text class="ft${o.sm?" fsm":""}${o.b?" fb":""}${o.c?" "+o.c:""}" x="${x}" y="${y}" text-anchor="${a}">${lines.map((s,i)=>`<tspan x="${x}" dy="${i?lh:0}">${e(s)}</tspan>`).join("")}</text>`;
  };
  /* riquadro con titolo (grassetto) e righe piccole, centrati; k = info | ok | warn | alarm | (vuoto) */
  const box=(x,y,w,h,t,s,k,o={})=>{
    t=[].concat(t);s=s?[].concat(s):[];
    const th=14.5,sh=12.5,total=t.length*th+(s.length?s.length*sh+3:0);
    let ty=y+(h-total)/2+11;
    let out=`<rect class="fbx${k?" k-"+k:""}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx||8}"/>`;
    out+=text(x+w/2,r(ty),t,{a:"middle",b:true,c:o.tc});
    if(s.length)out+=text(x+w/2,r(ty+t.length*th+3),s,{a:"middle",sm:true});
    return out;
  };
  /* freccia da (x1,y1) a (x2,y2) con punta piena */
  const arrow=(x1,y1,x2,y2,o={})=>{
    const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,hl=o.h||7,hw=hl/2;
    const bx=x2-ux*hl,by=y2-uy*hl;
    return `<path class="${o.dash?"fl dash":"fl"}" d="M${r(x1)} ${r(y1)}L${r(bx)} ${r(by)}"/><path class="fh" d="M${r(x2)} ${r(y2)}L${r(bx-uy*hw)} ${r(by+ux*hw)}L${r(bx+uy*hw)} ${r(by-ux*hw)}Z"/>`;
  };
  /* linea spezzata con punta finale: punti [[x,y],…] */
  const elbow=(pts,o={})=>{
    const n=pts.length,[x2,y2]=pts[n-1],[x1,y1]=pts[n-2];
    const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,hl=o.h||7,hw=hl/2,bx=x2-ux*hl,by=y2-uy*hl;
    const d=pts.slice(0,n-1).map((p,i)=>(i?"L":"M")+r(p[0])+" "+r(p[1])).join("")+`L${r(bx)} ${r(by)}`;
    return `<path class="${o.dash?"fl dash":"fl"}" d="${d}"/><path class="fh" d="M${r(x2)} ${r(y2)}L${r(bx-uy*hw)} ${r(by+ux*hw)}L${r(bx+uy*hw)} ${r(by-ux*hw)}Z"/>`;
  };
  /* curva liscia (Catmull-Rom) per punti [[x,y],…]; cls = classe del tratto */
  const curve=(pts,cls)=>{
    let d=`M${r(pts[0][0])} ${r(pts[0][1])}`;
    for(let i=0;i<pts.length-1;i++){
      const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
      d+=`C${r(p1[0]+(p2[0]-p0[0])/6)} ${r(p1[1]+(p2[1]-p0[1])/6)} ${r(p2[0]-(p3[0]-p1[0])/6)} ${r(p2[1]-(p3[1]-p1[1])/6)} ${r(p2[0])} ${r(p2[1])}`;
    }
    return `<path class="${cls||"fs"}" d="${d}"/>`;
  };
  /* assi: origine (x,y) in basso a sinistra, larghezza w, altezza h, nomi degli assi */
  const axes=(x,y,w,h,xl,yl)=>
    `<path class="fl" d="M${x} ${y-h}V${y}H${x+w}"/>`+
    text(x+w,y+16,xl||"",{a:"end",sm:true})+text(x+4,y-h+2,yl||"",{sm:true});
  /* pallino numerato o con lettera */
  const dot=(x,y,s,o={})=>`<circle class="fbx k-info" cx="${x}" cy="${y}" r="${o.r||14}"/>`+text(x,y+5,s,{a:"middle",b:true});
  return {svg,text,box,arrow,elbow,curve,axes,dot,e};
})();
