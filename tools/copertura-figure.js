/* Mostra dove mancano figure nell'enciclopedia, con le priorità dell'utente in cima.
   Uso: node tools/copertura-figure.js [--area <chiave>] [--n <quante>]   (senza opzioni: riepilogo per area e prime 15 voci da illustrare) */
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.join(__dirname,"..");
const ctx={console};ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of ["enciclopedia.js","figtpl.js","figure.js"])vm.runInContext(fs.readFileSync(path.join(root,f),"utf8"),ctx,{filename:f});
const get=n=>vm.runInContext(`typeof ${n}!=="undefined"?${n}:null`,ctx);
const ENC=get("ENC"),FIG=get("FIGURE"),AREE=get("ENC_AREE");
const arg=n=>{const i=process.argv.indexOf("--"+n);return i>0?process.argv[i+1]:null};
/* priorità: più alto = prima. Farmacologia/anestesia, anatomia, ecografia, area critica per prime (richiesta dell'utente); poi le materie più complesse. */
const PESO={farm:10,eco:10,emerg:10,anat:9,ecg:8,med:7,chir:7,esami:7,infett:6,onco:6,diagn:5,igiene:5,riab:4,nutr:4,mat:4,psi:4,fond:4,lavoro:3,diritto:3,org:3,legale:3,etica:3,codice:2,rel:2,ricerca:2};
const con=new Set();FIG.forEach(f=>(f.enc||[]).forEach(i=>con.add(i)));
const aree={};ENC.forEach(v=>{const a=aree[v.a]=aree[v.a]||{n:0,f:0,senza:[]};a.n++;con.has(v.id)?a.f++:a.senza.push(v)});
const solo=arg("area"),n=+(arg("n")||15);
if(!solo){
  console.log(`Voci con figura: ${ENC.filter(v=>con.has(v.id)).length}/${ENC.length} · figure: ${FIG.length}\n`);
  console.log("area".padEnd(9),"voci".padStart(4),"figure".padStart(7),"  %   peso  nome");
  Object.entries(aree).sort((x,y)=>(PESO[y[0]]||1)-(PESO[x[0]]||1)||y[1].senza.length-x[1].senza.length).forEach(([k,a])=>
    console.log(k.padEnd(9),String(a.n).padStart(4),String(a.f).padStart(7),`${String(Math.round(100*a.f/a.n)).padStart(3)}%`,String(PESO[k]||1).padStart(5)," ",(AREE[k]&&(AREE[k].n||AREE[k].t||AREE[k].name||AREE[k]))||""));
  console.log("\nProssime voci da illustrare:");
}
const lista=ENC.filter(v=>!con.has(v.id)&&!v.x&&(!solo||v.a===solo)).sort((x,y)=>(PESO[y.a]||1)-(PESO[x.a]||1));
lista.slice(0,n).forEach(v=>console.log(`  [${v.a}] ${v.id} — ${v.t}`));
if(lista.length>n)console.log(`  … altre ${lista.length-n} (usa --n o --area)`);
