/* Fotografa la figura di una voce in tema chiaro e scuro e segnala gli errori della pagina.
   Prima: python3 -m http.server 8765 (dalla cartella del progetto).
   Uso: node anteprima.js <id-voce> <cartella-di-uscita> [passi]
   "passi" = quanti passi ha l'animazione a classi .vf (k1…kN) o .ans (s1…s3): uno scatto per passo. */
const {chromium}=require("playwright");
(async()=>{
  const [id,out,passi]=process.argv.slice(2);if(!id||!out){console.error("Uso: node anteprima.js <id-voce> <cartella> [passi]");process.exit(2)}
  const n=+passi||1,b=await chromium.launch();let bad=0;
  for(const sc of ["light","dark"]){
    const p=await b.newPage({viewport:{width:900,height:1000},colorScheme:sc,deviceScaleFactor:2});const errs=[];p.on("pageerror",e=>errs.push(e.message));
    await p.goto("http://localhost:8765/index.html#voce-"+id,{waitUntil:"load"});await p.waitForTimeout(800);
    const l=p.locator(".fig:visible .fig-svg").first();
    if(await l.count()){await l.scrollIntoViewIfNeeded();
      for(let k=1;k<=n;k++){
        if(n>1)await p.evaluate(k=>document.querySelectorAll(".fig .vf,.fig .ans").forEach(e=>{const c=e.getAttribute("class")||"",m=c.match(/\b[ks]([1-9])\b/),step=m?+m[1]:1;e.style.animation="none";e.style.opacity=step===k?1:0}),k);
        await l.screenshot({path:`${out}/${id}-${sc}-${k}.png`})}
    }else{console.log(sc+": nessuna figura visibile nella voce");await p.screenshot({path:`${out}/${id}-${sc}.png`})}
    if(errs.length){bad=1;console.log(sc+": errori della pagina:",errs)}
    await p.close()}
  await b.close();console.log(bad?"Ci sono errori.":"Nessun errore della pagina.");process.exit(bad)})();
