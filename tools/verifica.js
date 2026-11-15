#!/usr/bin/env node
/* Controlla i file di contenuti dell'Atlante senza aprire il browser.
   Uso: node tools/verifica.js            controllo completo
        node tools/verifica.js --cache    in più segnala contenuti modificati senza cambio di cache in sw.js
   Esce con codice 1 se qualcosa va corretto. */
const fs=require("fs"),vm=require("vm"),path=require("path"),cp=require("child_process");
const root=path.join(__dirname,"..");
const FILES=["enciclopedia.js","glossario.js","encquiz.js","figure.js"];
const err=[];
const ctx={console};ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of FILES){
  try{vm.runInContext(fs.readFileSync(path.join(root,f),"utf8"),ctx,{filename:f})}
  catch(e){err.push(`${f}: errore di sintassi o di esecuzione: ${e.message}`)}
}
const get=n=>{try{return vm.runInContext(`typeof ${n}!=="undefined"?${n}:null`,ctx)}catch(e){return null}};
const ENC=get("ENC")||[],AREE=get("ENC_AREE")||{},QUIZ=get("QUIZ3")||[],GLOSS=get("GLOSS")||[],FIG=get("FIGURE")||[];
if(!err.length){
  const ids=new Set(),seen=new Set();
  for(const e of ENC){if(seen.has(e.id))err.push(`voce duplicata: ${e.id}`);seen.add(e.id);ids.add(e.id)}
  for(const e of ENC){
    if(!e.id||!e.t||!e.d)err.push(`voce senza id, titolo o descrizione: ${e.id||e.t}`);
    if(!AREE[e.a])err.push(`${e.id}: area sconosciuta "${e.a}"`);
    for(const r of e.r||[])if(!ids.has(r))err.push(`${e.id}: collegamento a voce inesistente "${r}"`);
  }
  QUIZ.forEach((q,i)=>{
    if(!ids.has(q[0]))err.push(`quiz ${i+1}: voce inesistente "${q[0]}"`);
    if(!Array.isArray(q[2])||q[2].length!==4)err.push(`quiz ${i+1} (${q[0]}): servono 4 opzioni`);
    else if(!(q[3]>=0&&q[3]<4))err.push(`quiz ${i+1} (${q[0]}): indice della risposta corretta non valido`);
    if(!q[4])err.push(`quiz ${i+1} (${q[0]}): manca la spiegazione`);
  });
  const gl=new Set(GLOSS.map(g=>g[0]));
  for(const g of GLOSS)if(g[4]&&!ids.has(g[4]))err.push(`glossario "${g[0]}": voce inesistente "${g[4]}"`);
  const fseen=new Set();
  for(const f of FIG){
    if(fseen.has(f.id))err.push(`figura duplicata: ${f.id}`);fseen.add(f.id);
    for(const r of f.enc||[])if(!ids.has(r))err.push(`figura ${f.id}: voce inesistente "${r}"`);
    for(const t of f.gl||[])if(!gl.has(t))err.push(`figura ${f.id}: termine di glossario inesistente "${t}"`);
    if(!/^<svg[\s\S]*<\/svg>\s*$/.test(f.svg||""))err.push(`figura ${f.id}: SVG mancante o non chiuso`);
    const o=(f.svg.match(/<(g|text|svg|defs|pattern|clipPath)\b(?:[^>]*[^/])?>/g)||[]).length,c=(f.svg.match(/<\/(g|text|svg|defs|pattern|clipPath)>/g)||[]).length;
    if(o!==c)err.push(`figura ${f.id}: tag aperti e chiusi non corrispondono (${o}/${c})`);
  }
}
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
const v1=(sw.match(/versione ([0-9a-f]+)/)||[])[1],v2=(sw.match(/const C="atlante-([0-9a-f]+)"/)||[])[1];
if(!v1||v1!==v2)err.push(`sw.js: la versione nel commento (${v1}) e in const C (${v2}) non coincidono`);
if(process.argv.includes("--cache")){
  try{
    const ch=cp.execSync("git status --porcelain",{cwd:root,encoding:"utf8"}).split("\n").map(l=>l.slice(3).trim()).filter(Boolean);
    const cont=ch.filter(f=>/\.(js|html|json|css|webmanifest)$/.test(f)&&f!=="sw.js"&&!f.startsWith("tools/")&&!f.startsWith(".claude/")&&!f.startsWith("giorni"));
    if(cont.length&&!ch.includes("sw.js"))err.push(`contenuti modificati (${cont.join(", ")}) ma sw.js no: cambiare il nome della cache`);
  }catch(e){}
}
if(err.length){console.error("Da correggere:\n- "+err.join("\n- "));process.exit(1)}
console.log(`Tutto a posto: ${ENC.length} voci, ${QUIZ.length} quiz, ${GLOSS.length} termini, ${FIG.length} figure, cache ${v2}.`);
