/* Fotografa le figure di un lotto in tema scuro e chiaro, a 430 px, senza toccare figure.js.
   Uso: node tools/anteprima-figure.js <lotto.js> <cartella-uscita>
   Il lotto è un file con oggetti-figura separati da virgole (il contenuto di un array FIGURE, senza parentesi quadre); può usare FT (figtpl.js).
   Scrive <cartella>/<tema>-<id>.png e stampa gli errori. Serve Playwright; apre index.html da file, senza server. */
const {chromium}=require("playwright"),fs=require("fs"),path=require("path");
(async()=>{
  const [lotto,out]=process.argv.slice(2);if(!lotto||!out){console.error("Uso: node tools/anteprima-figure.js <lotto.js> <cartella>");process.exit(2)}
  fs.mkdirSync(out,{recursive:true});
  const txt=fs.readFileSync(lotto,"utf8").replace(/^\s*,/,"");
  const url="file://"+path.resolve(__dirname,"..","index.html")+"#oggi";
  const b=await chromium.launch();let bad=0;
  for(const th of ["dark","light"]){
    const c=await b.newContext({viewport:{width:430,height:900},deviceScaleFactor:2,serviceWorkers:"block"});
    await c.addInitScript(t=>{try{localStorage.setItem("orinf_tema",JSON.stringify(t))}catch(e){}},th);
    const p=await c.newPage();const errs=[];p.on("pageerror",e=>errs.push(e.message));
    await p.goto(url,{waitUntil:"load"});await p.waitForTimeout(700);
    let ids;
    try{ids=await p.evaluate(t=>{const L=new Function("FT","return ["+t+"]")(FT);window.__L=L;return L.map(f=>f.id)},txt)}catch(e){console.log("ERRORE nel lotto:",e.message);bad=1;await c.close();continue}
    for(let i=0;i<ids.length;i++){
      await p.evaluate(i=>{let d=document.getElementById("tst");if(!d){d=document.createElement("div");d.id="tst";d.style.cssText="position:fixed;inset:0;z-index:999;background:var(--bg);padding:8px;overflow:auto";document.body.appendChild(d)}d.innerHTML=figHtml(window.__L[i])},i);
      await p.waitForTimeout(120);
      await (await p.$("#tst .fig")).screenshot({path:path.join(out,`${th}-${ids[i]}.png`)});
    }
    if(errs.length){bad=1;console.log(th+": errori della pagina:",errs)}
    await c.close();
  }
  await b.close();console.log(bad?"Ci sono errori.":"Fatto: "+out);process.exit(bad)
})();
