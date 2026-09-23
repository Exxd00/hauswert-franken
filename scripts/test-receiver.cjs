const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
class Sheet {
 constructor(name, rows=[],id=1){this.name=name;this.rows=rows;this.id=id;this.cols=26;this.capacity=2;}
 getRange(r,c,n=1,m=1){const s=this;const range={getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>s.rows[r-1+i]?.[c-1+j] ?? '')),getValue:()=>s.rows[r-1]?.[c-1] ?? '',setValues:v=>{v.forEach((row,i)=>row.forEach((value,j)=>{s.rows[r-1+i]??=[];s.rows[r-1+i][c-1+j]=value}));return range},setValue:v=>range.setValues([[v]]),createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>{for(let i=r-1;i<r-1+n;i++)if(s.rows[i]?.[c-1]===id)return {getRow:()=>i+1};return null}})}),getRow:()=>r};for(const method of ['setBackground','setFontColor','setFontWeight','setWrap','setVerticalAlignment','setNumberFormat','setDataValidation','clearDataValidations'])range[method]=()=>range;return range;}
 getLastRow(){return this.rows.length}getMaxRows(){return this.capacity}insertRowsAfter(_,n){this.capacity+=n}getMaxColumns(){return this.cols}insertColumnsAfter(_,n){this.cols+=n}setFrozenRows(){}setRowHeight(){}setColumnWidths(){}setColumnWidth(){}
}
const oldHeaders=['Datum','Status','Projekt','Immobilientyp','Ort','Größe (m²)','Budget','Zeitrahmen','Vorname','Nachname','E-Mail','Telefon','Nachricht','Dateien'];
const original=['old date','📞 Kontaktiert','Existing project','','','','','','Existing','','existing@example.invalid','','Do not overwrite','Keine'];
const leads=new Sheet('Sheet1',[oldHeaders.slice(),original.slice()],0);
let spreadsheetReads=0;
const sheets={Sheet1:leads};const book={getId:()=> '13C_KLXECH2R-N1mSf5WT5eWdzPS1Q_WnD1UZrEWJHiU',getSheetById:id=>id===0?leads:null,getSheetByName:name=>sheets[name],insertSheet:()=>{throw Error('A second tab must never be created')}};
const chain={requireValueInList:()=>chain,setAllowInvalid:()=>chain,build:()=>({})};
const ctx={console,SpreadsheetApp:{openById:id=>{spreadsheetReads++;assert.equal(id,book.getId());return book},getActiveSpreadsheet:()=>null,newDataValidation:()=>chain,flush:()=>{}},ContentService:{MimeType:{JSON:'json'},createTextOutput:t=>({text:t,setMimeType(){return this}})},Utilities:{formatDate:d=>d.toISOString(),getUuid:()=>crypto.randomUUID()},LockService:{getScriptLock:()=>({tryLock:()=>true,hasLock:()=>true,releaseLock:()=>{},waitLock:()=>{}})}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('scripts/google-sheets-handler.js','utf8'),ctx);
const post=data=>JSON.parse(ctx.doPost({postData:{contents:JSON.stringify({schemaVersion:2,source:'rd-frankenbau.de',...data})}}).text);
const id=crypto.randomUUID();const lead={recordType:'lead',submissionId:id,consent:true,phase:'capture',vorname:'TEST',nachname:'QA',email:'qa@example.invalid',telefon:'+49000000000',ort:'Nürnberg',projektArt:'Badsanierung',immobilienTyp:'Haus',nachricht:'=unsafe formula',fileNames:['document.pdf']};
assert.equal(post(lead).ok,true);assert.equal(leads.rows.length,3);assert.deepEqual(leads.rows[1],original);
assert.ok(leads.capacity>=3,'Lead sheet capacity expands before writing');
assert.equal(post(lead).duplicate,true);assert.equal(leads.rows.length,3);
assert.equal(leads.rows[2][12],"'=unsafe formula");
assert.equal(post({...lead,phase:'upload_failed',failedFiles:['document.pdf']}).ok,true);assert.equal(leads.rows[2][23],'document.pdf');
assert.equal(post({...lead,phase:'complete',fileUrls:['https://example.invalid/document.pdf']}).ok,true);assert.equal(leads.rows[2][21],'complete');
post(lead);assert.equal(leads.rows[2][21],'complete');assert.equal(leads.rows[2][13],'https://example.invalid/document.pdf');
assert.equal(post({recordType:'delivery',submissionId:id,emailStatus:'failed'}).ok,true);assert.equal(leads.rows[2][15],'failed');assert.equal(leads.rows.length,3);
post({recordType:'delivery',submissionId:id,emailStatus:'sent'});post({recordType:'delivery',submissionId:id,emailStatus:'failed'});assert.equal(leads.rows[2][15],'sent');
const event={recordType:'event',eventId:crypto.randomUUID(),eventName:'phone_click',path:'/kontakt'};
const beforeEvents=spreadsheetReads;
assert.equal(post(event).ignored,true);assert.equal(post(event).storage,'analytics_only');
assert.equal(post({...event,eventName:'invalid'}).ok,false);
assert.equal(spreadsheetReads,beforeEvents,'Retired event queues never access the spreadsheet');
const phone={...event,occurredAt:new Date(Date.now()-60000).toISOString(),email:'private@example.invalid',telefon:'PRIVATE',attribution:{utmSource:'google'}};
assert.equal(post(phone).storage,'main_sheet');assert.equal(leads.rows.length,4);
assert.equal(post(phone).duplicate,true);assert.equal(leads.rows.length,4);
assert.equal(leads.rows[3][25],'Telefon');assert.equal(leads.rows[3][28],"'+49 174 2629258");assert.equal(leads.rows[3][29],phone.eventId);
assert.equal(leads.rows[3][10],'');assert.equal(leads.rows[3][11],'');assert.equal(leads.rows[3][14],'');
assert.equal(leads.rows[3][0],phone.occurredAt);assert.equal(leads.rows[3][17],'google');
const mail={...phone,eventId:crypto.randomUUID(),eventName:'email_click'};
assert.equal(post(mail).ok,true);assert.equal(leads.rows[4][28],'info@rd-frankenbau.de');assert.equal(leads.rows[4][25],'E-Mail');
assert.equal(post({...phone,eventId:crypto.randomUUID(),eventName:'cta_click'}).ignored,true);
assert.equal(post({...phone,eventId:crypto.randomUUID(),occurredAt:new Date(Date.now()-8*86400000).toISOString()}).ok,false);
assert.equal(post({...phone,eventId:crypto.randomUUID(),occurredAt:'invalid'}).ok,false);
assert.equal(post({...phone,eventId:crypto.randomUUID(),path:'https://invalid.test'}).ok,false);
assert.equal(leads.rows.length,5);assert.equal(leads.rows[2][14],id,'Lead and click IDs use different columns');
ctx.setupSheet();assert.deepEqual(Object.keys(sheets),['Sheet1']);assert.equal(leads.rows.length,5);assert.equal(leads.cols,30);
leads.rows[0][0]='Custom header';assert.equal(post({...lead,submissionId:crypto.randomUUID()}).ok,false);assert.equal(leads.rows.length,5);assert.deepEqual(leads.rows[1],original);
assert.equal(post({...lead,submissionId:crypto.randomUUID(),consent:false}).ok,false);
console.log('PASS: single sheet retained; phone/email rows deduplicated, timed and separated from leads; no visitor contact data in clicks; legacy queues retired; existing data, files and confirmed delivery preserved.');
