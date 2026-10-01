// Explicit local end-to-end check using the connected project. Run cleanup after UI/PDF inspection.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
require('node:module').createRequire(require.resolve('next/package.json'))('@next/env').loadEnvConfig(process.cwd());
const { createClient } = require('@supabase/supabase-js');
const base = process.env.RD_TEST_ORIGIN || 'http://localhost:3100';
if (!['localhost','127.0.0.1'].includes(new URL(base).hostname)) throw Error('Integration test is restricted to a local server.');
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth:{ persistSession:false } });
const statePath = 'tmp/rd-admin-qa.json';
let cookie = '';
async function request(url, body, method='GET') { return fetch(base+url,{method,headers:{origin:base,'Content-Type':'application/json',cookie},...(body ? {body:JSON.stringify(body)} : {})}); }
async function data(response) { const value=await response.json(); if (!response.ok) throw Error(`${response.status}: ${value.error}`); return value; }
(async()=>{
  if(process.argv.includes('--cleanup')) {
    const state=JSON.parse(fs.readFileSync(statePath,'utf8'));
    const {data:current,error}=await db.from('rd_admin_settings').select('*').eq('id',true).single(); if(error) throw error;
    const restored={...current.data,services:current.data.services.filter(s=>s.id!==state.serviceId)};
    const {error:restoreError}=await db.from('rd_admin_settings').update({data:restored,version:current.version+1}).eq('id',true).eq('version',current.version); if(restoreError) throw restoreError;
    const {data:candidates,error:readError}=await db.from('rd_quotes').select('id,snapshot').eq('snapshot->>project','QA – automatischer Funktionstest'); if(readError) throw readError;
    const ids=candidates.filter(q=>q.snapshot.lines.some(line=>line.serviceId===state.serviceId)).map(q=>q.id);
    if(ids.length) { const {error:deleteError}=await db.from('rd_quotes').delete().in('id',ids).eq('snapshot->>project','QA – automatischer Funktionstest'); if(deleteError) throw deleteError; }
    fs.writeFileSync(statePath,JSON.stringify({...state,cleanedIds:ids},null,2));
    console.log('Database test offers and test-only price removed. Sheet rows must be removed separately by these exact IDs: '+ids.join(', '));
    return;
  }
  if(fs.existsSync(statePath)) throw Error('QA state already exists; inspect and clean it first.');
  assert.equal((await request('/api/admin/settings')).status,401);
  assert.equal((await fetch(base+'/api/admin/settings',{method:'PUT',headers:{origin:'https://invalid.example'}})).status,403);
  const login=await request('/api/admin/session',{password:process.env.ADMIN_PASSWORD},'POST'); await data(login);
  cookie=login.headers.get('set-cookie').split(';')[0]; assert.ok(login.headers.get('set-cookie').includes('HttpOnly')); assert.ok(login.headers.get('set-cookie').includes('SameSite=strict'));
  const before=await data(await request('/api/admin/settings'));
  const serviceId='qa-'+crypto.randomUUID().slice(0,8), id=crypto.randomUUID();
  fs.mkdirSync('tmp',{recursive:true}); fs.writeFileSync(statePath,JSON.stringify({id,serviceId,settingsBefore:before},null,2));
  const configured=await data(await request('/api/admin/settings',{version:before.version,settings:{...before.settings,services:[...before.settings.services,{id:serviceId,name:'QA Testleistung – nicht verwenden',unit:'m²',priceCents:1234,active:true}]}},'PUT'));
  assert.equal(configured.version,before.version+1);
  assert.equal((await request('/api/admin/settings',{version:before.version,settings:before.settings},'PUT')).status,409);
  const quoteInput={id,settingsVersion:configured.version,customer:{name:'QA Musterkunde – Test',address:'Musterstraße 1\n90408 Nürnberg',email:'qa@example.invalid',phone:''},project:'QA – automatischer Funktionstest',location:'Testobjekt Nürnberg',propertyType:'Wohnung',lines:[{serviceId,quantity:2.5}],discountPercent:10,note:'Testangebot. Kein echtes Kundenangebot.'};
  const saved=await data(await request('/api/admin/quotes',quoteInput,'POST')); assert.equal(saved.quote.snapshot.totalCents,3303); assert.equal(saved.quote.sheet_synced_version,saved.quote.version,'Sheet receipt required');
  const retry=await data(await request('/api/admin/quotes',quoteInput,'POST')); assert.equal(retry.quote.number,saved.quote.number);
  assert.equal((await request('/api/admin/quotes',{...quoteInput,project:'different'},'POST')).status,409);
  const eventId=crypto.randomUUID();
  const pdf=await request(`/api/admin/quotes/${id}/pdf`,{eventId},'POST'); if(!pdf.ok) await data(pdf); assert.equal(pdf.headers.get('content-type'),'application/pdf'); assert.equal(pdf.headers.get('x-sheet-synced'),'true');
  const bytes=Buffer.from(await pdf.arrayBuffer()); assert.equal(bytes.subarray(0,5).toString(),'%PDF-'); fs.mkdirSync('output/pdf',{recursive:true}); fs.writeFileSync('output/pdf/rd-frankenbau-testangebot.pdf',bytes);
  const retryPdf=await request(`/api/admin/quotes/${id}/pdf`,{eventId},'POST'); assert.equal(retryPdf.status,200); await retryPdf.arrayBuffer();
  const {data:stored,error}=await db.from('rd_quotes').select('*').eq('id',id).single(); if(error) throw error; assert.equal(stored.pdf_count,1); assert.equal(stored.version,2); assert.equal(stored.sheet_synced_version,2);
  const anon=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,{auth:{persistSession:false}}); const denied=await anon.from('rd_quotes').select('*').eq('id',id); assert.ok(denied.error || denied.data?.length===0);
  const deniedRpc=await anon.rpc('rd_pending_quotes'); assert.ok(deniedRpc.error);
  console.log(JSON.stringify({result:'PASS: real auth, CSRF, settings persistence/conflicts, authoritative amounts, idempotent saving and PDF, Sheets receipts, anonymous table/RPC denial',id,number:stored.number,pdfBytes:bytes.length,pdfCount:stored.pdf_count}));
})().catch(error=>{console.error(error.message);process.exitCode=1});
