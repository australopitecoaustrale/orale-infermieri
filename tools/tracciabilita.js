/* Tracciabilità dei dati clinici (metodo a cancelli, vedi docs/superpowers/specs/2026-11-19-verifica-a-cancelli-design.md).
   Uso:
     node tools/tracciabilita.js estrai <id-voce> [...]            -> elenco dei dati con un numero (JSON) su stdout
     node tools/tracciabilita.js coerenza <termine> [...]          -> tutte le frasi dell'app con il termine e un numero
     node tools/tracciabilita.js cancello <giudizi.json> [id…]     -> controlla i giudizi del revisore e dice se si può unire;
                                                                     con gli id delle voci blocca anche i dati rimasti senza giudizio
   Il file dei giudizi è un elenco di {id, testo, fonte, tipo, stato, nota}:
     tipo  = linea-guida | revisione | studio | manuale | aritmetica
     stato = confermato | da-verificare | errore | corretto
   Non giudica nulla da solo: raccoglie e controlla che ogni dato abbia fonte e giudizio. */
const fs=require("fs"),vm=require("vm"),path=require("path");
const R=path.join(__dirname,"..");
function carica(){
  const ctx={window:{},console};ctx.self=ctx.window;vm.createContext(ctx);
  for(const f of ["enciclopedia.js","encquiz.js","glossario.js"]){vm.runInContext(fs.readFileSync(path.join(R,f),"utf8").replace(/^(const|let) /gm,"var "),ctx,{filename:f})}
  return {ENC:ctx.ENC||[],QUIZ:ctx.QUIZ3||[],GLOSS:ctx.GLOSS||[]};
}
const NUM=/\d/;
function estrai(ids){
  const {ENC,QUIZ,GLOSS}=carica();const out=[];
  for(const id of ids){
    const v=ENC.find(x=>x.id===id);if(!v){console.error("voce inesistente: "+id);process.exitCode=1;continue}
    const add=(campo,t)=>{if(NUM.test(t))out.push({id:`${id}#${campo}`,testo:t,fonte:"",tipo:"",stato:"",nota:""})};
    add("d",v.d);(v.p||[]).forEach((t,i)=>add("p"+i,t));(v.v||[]).forEach((t,i)=>add("v"+i,t.join(": ")));(v.i||[]).forEach((t,i)=>add("i"+i,t));
    QUIZ.filter(q=>q[0]===id).forEach((q,i)=>add("q"+i,q[1]+" → "+q[2][q[3]]+" ("+q[4]+")"));
    GLOSS.filter(g=>g[4]===id).forEach(g=>add("gl:"+g[0],g[2]));
  }
  return out;
}
function coerenza(termini){
  const {ENC,QUIZ,GLOSS}=carica();const righe=[];
  const scan=(dove,t)=>{for(const term of termini){if(t.toLowerCase().includes(term.toLowerCase())&&NUM.test(t))righe.push([term,dove,t])}};
  for(const v of ENC){scan(v.id+"#d",v.d);(v.p||[]).forEach((t,i)=>scan(v.id+"#p"+i,t));(v.v||[]).forEach((t,i)=>scan(v.id+"#v"+i,t.join(": ")));if(v.n)scan(v.id+"#n",v.n)}
  QUIZ.forEach(q=>scan(q[0]+"#quiz",q[1]+" "+q[4]));GLOSS.forEach(g=>scan("glossario:"+g[0],g[2]));
  return righe;
}
function cancello(file,ids){
  const G=JSON.parse(fs.readFileSync(file,"utf8"));const err=[],warn=[];
  /* con gli id delle voci: ogni dato estratto oggi deve avere un giudizio */
  if(ids&&ids.length){const giud=new Set(G.map(g=>g.id));for(const d of estrai(ids))if(!giud.has(d.id))err.push(`${d.id}: dato senza giudizio («${d.testo.slice(0,60)}…»)`)}
  const TIPI=["linea-guida","revisione","studio","manuale","aritmetica"],STATI=["confermato","da-verificare","errore","corretto"];
  for(const g of G){
    if(!STATI.includes(g.stato))err.push(`${g.id}: giudizio mancante o non valido (${g.stato||"vuoto"})`);
    if(g.stato==="errore")err.push(`${g.id}: errore non corretto`);
    if(g.stato==="confermato"&&!g.fonte)err.push(`${g.id}: confermato senza fonte`);
    if(g.stato==="confermato"&&!TIPI.includes(g.tipo))err.push(`${g.id}: tipo di fonte mancante`);
    if(g.stato==="confermato"&&g.tipo==="studio")warn.push(`${g.id}: confermato da un solo studio; un singolo studio non fissa un valore di riferimento`);
    if(g.stato==="confermato"&&g.tipo==="manuale")warn.push(`${g.id}: confermato solo da un manuale`);
    if(g.stato==="da-verificare")warn.push(`${g.id}: da verificare; va scritto nella nota n della voce`);
  }
  const conta=s=>G.filter(g=>g.stato===s).length;
  console.log(`Dati: ${G.length}; confermati ${conta("confermato")}, corretti ${conta("corretto")}, da verificare ${conta("da-verificare")}, errori ${conta("errore")}.`);
  warn.forEach(w=>console.log("Avviso: "+w));err.forEach(e=>console.log("BLOCCA: "+e));
  console.log(err.length?"Cancello chiuso: non unire in main.":"Cancello aperto: si può unire.");
  process.exitCode=err.length?1:0;
}
const [cmd,...arg]=process.argv.slice(2);
if(cmd==="estrai")console.log(JSON.stringify(estrai(arg),null,1));
else if(cmd==="coerenza")for(const r of coerenza(arg))console.log(r.join(" | "));
else if(cmd==="cancello")cancello(arg[0],arg.slice(1));
else{console.error("Uso: estrai <id…> | coerenza <termine…> | cancello <giudizi.json>");process.exitCode=2}
