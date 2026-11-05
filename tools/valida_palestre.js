#!/usr/bin/env node
/* Controlla gli esercizi delle palestre in un file del giorno (giorni/AAAA-MM-GG.json, campo "palestre").
   Uso: node tools/valida_palestre.js giorni/AAAA-MM-GG.json
   Esce con codice 1 se qualcosa va corretto: il sito scarterebbe quegli esercizi. */
const fs=require("fs"),vm=require("vm"),path=require("path");
const root=path.join(__dirname,"..");
const file=process.argv[2];if(!file){console.error("Indica il file del giorno");process.exit(2)}
const ctx={console,Math,JSON,Set,Date,Number,String,Array,Object};ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,"enciclopedia.js"),"utf8"),ctx);
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
vm.runInContext(html.match(/const GYM_POOL=\[[\s\S]*?\];/)[0].replace("const GYM_POOL","GYM_POOL"),ctx);
vm.runInContext(fs.readFileSync(path.join(root,"palestre.js"),"utf8"),ctx);
const P=ctx.PAL,day=JSON.parse(fs.readFileSync(file,"utf8")),pal=day.palestre;
if(!pal){console.log("Nessun campo \"palestre\" nel file.");process.exit(1)}
let bad=0,tot=0;
for(const k of ["ega","lab","ecg","vent","capno","integ"]){const a=pal[k]||[];
  a.forEach((s,i)=>{tot++;let e;try{e=P.PAL_CHK[k](s)}catch(x){e=["errore: "+x.message]}
    const info=[];
    if(k==="vent"&&!e.length){const r=P.ventSim(s.m,10);info.push("curve: "+r.find+" · Ppicco "+r.mm.ppeak.toFixed(0)+(r.mm.pplat!=null?" · Pplat "+r.mm.pplat.toFixed(0)+" · DP "+r.mm.dp.toFixed(0):"")+" · VTe "+r.mm.vte.toFixed(0)+" · allarmi: "+(r.alarms.map(a=>a[1]).join(", ")||"nessuno"))}
    if(k==="capno"&&!e.length){const r=P.capnoSim(s.cp);info.push("EtCO2 mostrata "+r.et.toFixed(0)+" · "+P.CET[P.capnoCat(r)])}
    if(k==="integ"&&!e.length)(s.parts||[]).forEach((p,j)=>{if(p.t==="vent"){const r=P.ventSim(p.m,10);info.push("parte "+(j+1)+" curve: "+r.find)}});
    if(e.length)bad++;
    console.log((e.length?"ERRORE ":"ok     ")+k+"["+i+"] "+(s.n||s.t||"").slice(0,70)+(e.length?"\n        - "+e.join("\n        - "):"")+(info.length?"\n        "+info.join("\n        "):""))})}
console.log(`\n${tot-bad} esercizi validi su ${tot}.`);
const need={ega:2,lab:2,ecg:2,vent:1,capno:1,integ:1};const miss=Object.keys(need).filter(k=>(pal[k]||[]).length<need[k]);
if(miss.length)console.log("Mancano esercizi in: "+miss.join(", "));
process.exit(bad||miss.length?1:0);
