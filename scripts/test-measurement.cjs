const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const assert=require('node:assert/strict');
const prefix='rd_contact_click_v1:';
function storage(){const value={};Object.defineProperties(value,{getItem:{value:k=>value[k]??null},setItem:{value:(k,v)=>{value[k]=String(v)}},removeItem:{value:k=>{delete value[k]}}});return value;}
const localStorage=storage(),sessionStorage=storage();
const window={location:{pathname:'/kontakt',search:'',origin:'https://rd-frankenbau.de'},dispatchEvent:()=>{},gtag:(...args)=>analytics.push(args)};
let requests=[],analytics=[],offline=true,oldReceiver=false;
const compiled=ts.transpileModule(fs.readFileSync('src/lib/measurement.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function load(){const module={exports:{}};vm.runInNewContext(compiled,{module,exports:module.exports,window,document:{referrer:''},localStorage,sessionStorage,URL,URLSearchParams,Event,AbortSignal,crypto:require('node:crypto').webcrypto,fetch:async(_,options)=>{const event=JSON.parse(options.body);assert.ok(localStorage.getItem(prefix+event.eventId),'Persist before network send');assert.equal(options.keepalive,true);requests.push(event);if(offline)throw Error('offline');return {ok:true,json:async()=>({eventId:event.eventId,stored:!oldReceiver,storage:oldReceiver?'analytics_only':'main_sheet'})}}});return module.exports;}
const tick=()=>new Promise(setImmediate);
(async()=>{
let api=load();api.recordEvent('phone_click');await tick();assert.equal(requests.length,0,'No statistics without consent');
api.setConsent('yes');api.recordEvent('phone_click',{entryPoint:'footer'});api.recordEvent('phone_click',{entryPoint:'footer'});await tick();
assert.equal(requests.length,1,'Suppress duplicate handler clicks');assert.equal(Object.keys(localStorage).filter(k=>k.startsWith(prefix)).length,1);
const first=requests[0];assert.equal(first.entryPoint,'footer');assert.ok(first.occurredAt);
api=load();oldReceiver=true;offline=false;await api.flushContactClicks();assert.ok(localStorage.getItem(prefix+first.eventId),'Ignored receipt must retain click');
oldReceiver=false;await api.flushContactClicks();assert.equal(requests.at(-1).eventId,first.eventId);assert.equal(requests.at(-1).occurredAt,first.occurredAt);assert.equal(localStorage.getItem(prefix+first.eventId),null);
api.recordEvent('email_click',{entryPoint:'header'});await tick();assert.equal(requests.at(-1).eventName,'email_click');assert.equal(Object.keys(localStorage).filter(k=>k.startsWith(prefix)).length,0);
const count=requests.length;api.recordEvent('cta_click');await tick();assert.equal(requests.length,count,'Only phone and email reach Sheets');
offline=true;window.location.pathname='/leistungen';api.recordEvent('phone_click');await tick();api.setConsent('no');assert.equal(Object.keys(localStorage).filter(k=>k.startsWith(prefix)).length,0,'Withdraw consent clears queue');
api.setConsent('yes');const stale={...first,eventId:crypto.randomUUID(),occurredAt:new Date(Date.now()-8*86400000).toISOString()};localStorage.setItem(prefix+stale.eventId,JSON.stringify(stale));const before=requests.length;await api.flushContactClicks();assert.equal(requests.length,before);assert.equal(localStorage.getItem(prefix+stale.eventId),null);
localStorage.setItem('rd_event_queue_v2','old test events');api.clearLegacyEventQueue();assert.equal(localStorage.getItem('rd_event_queue_v2'),null);
assert.ok(analytics.every(call=>!JSON.stringify(call).includes('eventId')),'GA receives no queue identifiers');
console.log('PASS: consent required; saved before fetch; contact-only queue; failed/ignored receipt retained; reload retries same UUID and click time; confirmed receipt, expiry and consent withdrawal clean up.');
})().catch(error=>{console.error(error);process.exitCode=1});
