#!/usr/bin/env node
/* Aggancio per Claude Code (vedi .claude/settings.json).
   node tools/hook.js modifica   dopo Edit/Write: controlla i contenuti se è stato toccato un file di dati
   node tools/hook.js fine       a fine turno: avvisa se i contenuti sono cambiati senza cambiare la cache
   Codice di uscita 2 = il messaggio torna a Claude perché corregga. */
const cp=require("child_process"),path=require("path");
let inp="";process.stdin.on("data",d=>inp+=d).on("end",()=>{
  let j={};try{j=JSON.parse(inp||"{}")}catch(e){}
  const mode=process.argv[2],args=[path.join(__dirname,"verifica.js")];
  if(mode==="modifica"){
    const f=path.basename((j.tool_input&&j.tool_input.file_path)||"");
    if(!["enciclopedia.js","glossario.js","encquiz.js","figure.js","sw.js"].includes(f))process.exit(0);
  }else if(mode==="fine"){
    if(j.stop_hook_active)process.exit(0);
    args.push("--cache");
  }else process.exit(0);
  const r=cp.spawnSync(process.execPath,args,{encoding:"utf8"});
  if(r.status){process.stderr.write(r.stderr||r.stdout||"verifica fallita");process.exit(2)}
  process.exit(0);
});
