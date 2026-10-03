const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const loaded = new Map();
function load(file) {
  file = path.resolve(file); if (loaded.has(file)) return loaded.get(file).exports;
  const module = { exports: {} }; loaded.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const localRequire = name => name === 'server-only' ? {} : name.startsWith('./') ? load(path.join(path.dirname(file), name + '.ts')) : require(name);
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(localRequire, module, module.exports);
  return module.exports;
}
const model = load('src/lib/quotes/model.ts');
const services = [{ id: 'painting', name: 'Malerarbeiten', unit: 'm²', priceCents: 1999, active: true }];
const total = model.calculate([{ serviceId: 'painting', quantity: 2.555 }], services, 10, 19);
assert.equal(total.subtotalCents, 5107); assert.equal(total.discountCents, 511);
assert.equal(total.netCents, 4596); assert.equal(total.taxCents, 873); assert.equal(total.totalCents, 5469);
assert.equal(model.calculate([{ serviceId: 'painting', quantity: 1 }], services, 100, 19).totalCents, 0);
const catalogueService = { ...services[0], catalogNumber: '001', category: 'Testbereich', description: 'Vollständiger Umfang mit Material und Abmessungen', internalNote: 'Privater Prüfhinweis', defaultQuantity: 2, unit: 'Kpl.' };
const snapshotLine = model.calculate([{serviceId: 'painting', quantity: 2}], [catalogueService], 0, 19).lines[0];
assert.equal(snapshotLine.description, catalogueService.description);
assert.equal(snapshotLine.catalogNumber, '001'); assert.equal(snapshotLine.unit, 'Kpl.');
assert.equal('internalNote' in snapshotLine, false, 'Internal catalogue notes must not appear on customer offers');
const largeCatalogue = Array.from({length: model.MAX_SERVICES}, (_, i) => ({...catalogueService, id:`test-${i}`}));
assert.equal(model.settingsSchema.safeParse({...model.defaultSettings,services:largeCatalogue}).success,true);
assert.equal(model.settingsSchema.safeParse({...model.defaultSettings,services:[...largeCatalogue,{...catalogueService,id:'one-too-many'}]}).success,false);
assert.equal(model.settingsSchema.safeParse(model.defaultSettings).success,true,'Existing settings remain compatible');
const catalogue = load('src/lib/quotes/catalogue.ts');
assert.equal(catalogue.matchesService(catalogueService, '001 Material', 'Testbereich'),true);
assert.equal(catalogue.matchesService(catalogueService, 'Privater Prüfhinweis', ''),false);
assert.equal(catalogue.matchesService(catalogueService, '', 'Anderer Bereich'),false);
assert.equal(catalogue.matchesService({...catalogueService,name:'Türen und Fußböden'},'turen fussboden',''),true);
assert.throws(() => model.calculate([{ serviceId: 'painting', quantity: 1 }], [{ ...services[0], priceCents: null }], 0, 19));
assert.throws(() => model.calculate([{ serviceId: 'painting', quantity: NaN }], services, 0, 19));
const input = { id: crypto.randomUUID(), settingsVersion: 1, customer: { name: 'QA Example', address: '', email: '', phone: '' }, project: 'Test', location: '', propertyType: 'Wohnung', lines: [{ serviceId: 'painting', quantity: 1 }], discountPercent: 0, note: '' };
assert.equal(model.quoteInputSchema.safeParse(input).success, true);
assert.equal(model.quoteInputSchema.safeParse({...input,discountPercent:0.29}).success,true);
for (const bad of [{ ...input, lines: [...input.lines, ...input.lines] }, { ...input, lines: [{ serviceId: 'painting', quantity: -1 }] }, { ...input, lines: [{ serviceId: 'painting', quantity: 1.0001 }] }, { ...input, discountPercent: 101 }]) assert.equal(model.quoteInputSchema.safeParse(bad).success, false);
process.env.ADMIN_PASSWORD = 'unit-test-only'; process.env.ADMIN_SESSION_SECRET = 'unit-test-only'.repeat(5);
const auth = load('src/lib/quotes/auth.ts');
const token = auth.createSession(); assert.equal(auth.validSession(token), true);
assert.equal(auth.validSession(token + '0'), false);
assert.equal(auth.validSession(token.replace(/^\d+/, '1000000000000')), false);
process.env.ADMIN_PASSWORD = 'changed-test-password'; assert.equal(auth.validSession(token), false);
assert.equal(auth.sameOrigin(new Request('https://rd-frankenbau.de/api/admin/settings', { headers: { origin: 'https://evil.example' } })), false);
assert.equal(auth.sameOrigin(new Request('https://rd-frankenbau.de/api/admin/settings', { headers: { origin: 'https://rd-frankenbau.de' } })), true);
class Sheet {
  constructor() { this.rows = []; this.cols = 26; this.capacity = 100; }
  getRange(r,c,n=1,m=1) { const range = { getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>this.rows[r-1+i]?.[c-1+j] ?? '')), getValue:()=>this.rows[r-1]?.[c-1] ?? '', setValues:v=>{v.forEach((row,i)=>row.forEach((val,j)=>{this.rows[r-1+i]??=[];this.rows[r-1+i][c-1+j]=val}));return range}, setValue:v=>range.setValues([[v]]), createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>{for(let i=r-1;i<r-1+n;i++) if(this.rows[i]?.[c-1]===id) return {getRow:()=>i+1};return null}})}) }; for(const method of ['setBackground','setFontColor','setFontWeight','setWrap','setVerticalAlignment','setNumberFormat']) range[method]=()=>range; return range; }
  getLastRow(){return this.rows.length} getMaxRows(){return this.capacity} insertRowsAfter(_,n){this.capacity+=n} getMaxColumns(){return this.cols} insertColumnsAfter(_,n){this.cols+=n} setFrozenRows(){} setRowHeight(){}
}
const sheet = new Sheet(); let openCount = 0;
const book = { getSheetByName: name => { assert.equal(name, 'Angebote'); return sheet; } };
const ctx = { BigInt, console, ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({text,setMimeType(){return this}})},
  Utilities:{base64Decode:s=>Array.from(Buffer.from(s,'base64')),base64DecodeWebSafe:s=>Array.from(Buffer.from(s,'base64url')),computeDigest:(_,s)=>Array.from(crypto.createHash('sha256').update(s).digest()),DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},formatDate:d=>d.toISOString()},
  SpreadsheetApp:{openById:()=>{openCount++;return book},flush:()=>{}},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{},hasLock:()=>true})} };
vm.createContext(ctx); vm.runInContext(fs.readFileSync('scripts/google-sheets-handler.js','utf8'), ctx);
const keys = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }); ctx.RD_QUOTE_PUBLIC_N = keys.publicKey.export({format:'jwk'}).n;
const quote = { id:input.id, offerNumber:'RD-QA-01001', version:1, status:'offen', created_at:new Date().toISOString(), updated_at:new Date().toISOString(), pdf_count:0, snapshot:{...input,...total,customer:{...input.customer,name:'=IMPORTXML("bad")'},taxPercent:19} };
const sheetPayload = load('src/lib/quotes/sheet-payload.ts');
const longQuote = {...quote,number:1001,snapshot:{...quote.snapshot,note:'N'.repeat(2000),defaultNote:'N'.repeat(2000),lines:Array.from({length:60},(_,i)=>({...snapshotLine,serviceId:`long-${i}`,name:'L'.repeat(90),catalogNumber:'001',description:'Scope '.repeat(160)}))}};
const compact = sheetPayload.sheetQuote(longQuote);
assert.ok(JSON.stringify(compact).length < 30000,'Large offers must fit the existing signed Sheet receiver');
assert.equal('description' in compact.snapshot.lines[0],false);
assert.ok(compact.snapshot.lines[0].name.startsWith('001 · '));
assert.ok(longQuote.snapshot.lines[0].description.length > 900,'Sheet formatting must preserve the original private snapshot');
const sign = q => { const quoteJson=JSON.stringify(q); return {schemaVersion:2,source:'rd-frankenbau.de',recordType:'quote',submissionId:q.id,quoteJson,signature:crypto.sign('RSA-SHA256',Buffer.from(quoteJson),keys.privateKey).toString('base64')}; };
const post = p => JSON.parse(ctx.doPost({postData:{contents:JSON.stringify(p)}}).text);
assert.equal(post({...sign(quote),signature:'x'.repeat(344)}).ok,false); assert.equal(openCount,0);
assert.equal(post(sign(quote)).ok,true); assert.equal(sheet.rows.length,2); assert.equal(sheet.rows[1][1],`'=IMPORTXML("bad")`);
assert.equal(sheet.rows[1][10],54.69); assert.equal(post(sign(quote)).duplicate,true); assert.equal(sheet.rows.length,2);
const second = {...quote,version:2,pdf_count:1,last_pdf_at:new Date().toISOString()}; assert.equal(post(sign(second)).ok,true); assert.equal(sheet.rows[1][11],1);
assert.equal(post(sign(quote)).quoteVersion,2); assert.equal(sheet.rows[1][11],1,'Old signed retries cannot overwrite a newer download');
const changed=sign(second); changed.quoteJson=changed.quoteJson.replace('QA-01001','QA-FAKE'); assert.equal(post(changed).ok,false);
assert.equal(post({...sign(second),submissionId:crypto.randomUUID()}).ok,false);
console.log('PASS: cent rounding, discounts/tax, unknown prices, invalid inputs, session tampering/expiry/password rotation, CSRF, real RSA verification, formula injection, quote deduplication and monotonic sheet updates.');
