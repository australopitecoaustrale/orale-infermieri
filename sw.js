// Service worker dell'Atlante di Infermieristica — versione ae91c2a32a
const C="atlante-ae91c2a32a",RT="atlante-rt";
const CORE=["./", "index.html", "pdfdata.js", "quizbank.js", "casebank.js", "enciclopedia.js", "glossario.js", "encquiz.js", "enccases.js", "figure.js", "giorni.json", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==RT).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  // pagina e domande del giorno: prima la rete, poi la copia salvata
  if(r.mode==="navigate"||(u.origin===location.origin&&u.pathname.endsWith("giorni.json"))){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r.mode==="navigate"?"index.html":"giorni.json",cp))}return res}).catch(()=>caches.match(r.mode==="navigate"?"index.html":"giorni.json",{ignoreSearch:true})));return}
  // file del sito: copia salvata subito, aggiornata in background
  if(u.origin===location.origin){
    e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>hit);return hit||net}));return}
  // caratteri tipografici di Google: salvati alla prima apertura
  if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.open(RT).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{c.put(r,res.clone());return res}))))}
});
