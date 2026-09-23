const fs=require('fs');const path=require('path');const ts=require('typescript');const vm=require('vm');const assert=require('node:assert/strict');
const cache={};let writes=[];let unavailable=false;let emailFails=false;let alreadySent=false;let emails=0;
const sheetMock={persistToSheets:async(payload,id)=>{writes.push(payload);if(unavailable)throw Error('offline');return {ok:true,id,emailStatus:alreadySent?'sent':'pending'}}};
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
console.log('PASS: persistence precedes notification; failed email retains accepted lead; retries skip confirmed delivery; missing receipt is 503; consent and cross-origin checks reject invalid requests.');
})().catch(e=>{console.error(e);process.exitCode=1});

