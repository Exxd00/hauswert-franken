const fs=require('fs');const path=require('path');const ts=require('typescript');const vm=require('vm');const assert=require('node:assert/strict');
const cache={};let writes=[];let unavailable=false;let emailFails=false;let alreadySent=false;let emails=0;let oldReceiver=false;
const sheetMock={persistToSheets:async(payload,id)=>{writes.push(payload);if(unavailable)throw Error('offline');return {ok:true,id,emailStatus:alreadySent?'sent':'pending',storage:oldReceiver?'analytics_only':'main_sheet',ignored:oldReceiver}}};
function load(file){if(cache[file])return cache[file].exports;const module={exports:{}};cache[file]=module;const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const customRequire=id=>id==='next/server'?{NextResponse:{json:(v,init)=>new Response(JSON.stringify(v),init)}}:id==='resend'?{Resend:class{emails={send:async()=>{emails++;return {error:emailFails?{message:'failure'}:null}}}}}:id==='@/lib/sheets'?sheetMock:id.startsWith('@/')?load(path.join('src',id.slice(2)+'.ts')):require(id);vm.runInNewContext(compiled,{module,exports:module.exports,require:customRequire,process,Response,Request,URL,AbortSignal,console,Error});return module.exports;}
const api=load('src/app/api/contact/route.ts');process.env.RESEND_API_KEY='test-only';
const payload={submissionId:crypto.randomUUID(),phase:'capture',consent:true,projektArt:'Test',immobilienTyp:'Haus',ort:'Nürnberg',vorname:'QA',email:'qa@example.invalid',telefon:'+490000000'};
const call=p=>api.POST(new Request('https://rd-frankenbau.de/api/contact',{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://rd-frankenbau.de'},body:JSON.stringify(p)}));
(async()=>{
let r=await call(payload);assert.equal(r.status,200);assert.equal((await r.json()).saved,true);assert.equal(emails,0);
emailFails=true;r=await call({...payload,phase:'complete'});let result=await r.json();assert.equal(result.success,true);assert.equal(result.emailStatus,'failed');assert.equal(writes.at(-1).recordType,'delivery');assert.equal(writes.at(-1).emailStatus,'failed');
assert.equal(writes.at(-2).recordType,'lead');
alreadySent=true;const before=emails;r=await call({...payload,phase:'complete'});assert.equal(emails,before);assert.equal((await r.json()).emailStatus,'sent');
unavailable=true;r=await call({...payload,phase:'complete'});assert.equal(r.status,503);assert.equal((await r.json()).saved,false);assert.equal(emails,before);
r=await call({...payload,consent:false});assert.equal(r.status,400);
r=await api.POST(new Request('https://rd-frankenbau.de/api/contact',{method:'POST',headers:{Origin:'https://bad.invalid'},body:JSON.stringify(payload)}));assert.equal(r.status,403);
const eventApi=load('src/app/api/events/route.ts');const beforeEvents=writes.length;
const eventId=crypto.randomUUID();r=await eventApi.POST(new Request('https://rd-frankenbau.de/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId,eventName:'phone_click',path:'/kontakt'})}));
result=await r.json();assert.equal(r.status,200);assert.equal(result.eventId,eventId);assert.equal(result.ignored,true);assert.equal(result.storage,'analytics_only');assert.equal(writes.length,beforeEvents,'Retired event queues must not write to Sheets, even when it is unavailable');
const click={eventId,eventName:'phone_click',path:'/kontakt',occurredAt:new Date().toISOString()};
const clickRequest=(event=click)=>new Request('https://rd-frankenbau.de/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event)});
r=await eventApi.POST(clickRequest());assert.equal(r.status,503,'No receipt during sheet outage');
unavailable=false;oldReceiver=true;r=await eventApi.POST(clickRequest());assert.equal(r.status,503,'Ignored events are not storage receipts');
oldReceiver=false;r=await eventApi.POST(clickRequest());result=await r.json();assert.equal(result.stored,true);assert.equal(result.storage,'main_sheet');assert.equal(result.eventId,eventId);
const beforeIgnored=writes.length;r=await eventApi.POST(clickRequest({...click,eventName:'cta_click'}));assert.equal((await r.json()).ignored,true);assert.equal(writes.length,beforeIgnored);
r=await eventApi.POST(clickRequest({...click,occurredAt:new Date(Date.now()-8*86400000).toISOString()}));assert.equal(r.status,400);
r=await eventApi.POST(clickRequest({...click,occurredAt:'invalid'}));assert.equal(r.status,400);
assert.equal(emails,before,'Clicks never send notification emails');
console.log('PASS: save-before-email; failed mail retained; delivery deduplication; consent and origin checks; phone clicks require durable main-sheet receipts; old and other events stay retired.');
})().catch(e=>{console.error(e);process.exitCode=1});
