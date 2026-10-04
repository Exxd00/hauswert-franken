const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { PDFDocument, PDFPage } = require('pdf-lib');
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
const { quotePdf } = load('src/lib/quotes/pdf.ts');
const { letterheadLogo } = load('src/lib/quotes/letterhead-logo.ts');
const services = [
  { id: 'walls', catalogNumber: '101', name: 'Wände vorbereiten', description: 'Wände vorbereiten, Unebenheiten ausgleichen und Flächen grundieren.', unit: 'm²', priceCents: 2375, active: true },
  { id: 'paint', catalogNumber: '102', name: 'Malerarbeiten', description: 'Wandflächen zweimal mit hochwertiger weißer Innenfarbe streichen.', unit: 'm²', priceCents: 1540, active: true },
  { id: 'doors', catalogNumber: '103', name: 'Türen lackieren', description: 'Türblätter anschleifen und fachgerecht lackieren.', unit: 'Stück', priceCents: 6570, active: true },
];
function fixture(customServices = services, quantities = [12.5, 20, 2], overrides = {}) {
  const discountPercent = overrides.discountPercent ?? 7;
  const taxPercent = overrides.taxPercent ?? 19;
  return {
    id: '00000000-0000-4000-8000-000000000001', number: 1001,
    created_at: '2026-10-04T10:00:00Z', updated_at: '2026-10-04T10:00:00Z',
    status: 'offen', version: 1, pdf_count: 0, last_pdf_at: null, sheet_synced_version: 0, sheet_error: false,
    snapshot: {
      settingsVersion: 9, company: model.defaultSettings.company,
      customer: { name: 'Max Mustermann · Musterangebot', address: 'Musterstraße 12\n90408 Nürnberg', email: 'max@example.com', phone: '+49 911 1234567' },
      project: 'Renovierung einer Wohnung', location: 'Musterstraße 12, 90408 Nürnberg', propertyType: 'Wohnung',
      validityDays: 30, discountPercent, taxPercent, taxNote: '', note: '', defaultNote: model.defaultSettings.note,
      ...model.calculate(customServices.map((s, i) => ({ serviceId: s.id, quantity: quantities[i] })), customServices, discountPercent, taxPercent),
      ...overrides,
    },
  };
}

async function check(name, quote, verify) {
  const texts = [], images = [];
  const originalText = PDFPage.prototype.drawText, originalImage = PDFPage.prototype.drawImage;
  PDFPage.prototype.drawText = function (text, options) { texts.push({ page: this, text, ...options }); return originalText.call(this, text, options); };
  PDFPage.prototype.drawImage = function (image, options) { images.push({ page: this, image, ...options }); return originalImage.call(this, image, options); };
  let bytes;
  try { bytes = await quotePdf(quote); } finally { PDFPage.prototype.drawText = originalText; PDFPage.prototype.drawImage = originalImage; }
  const doc = await PDFDocument.load(bytes);
  const pages = [...new Set(texts.map(t => t.page))];
  assert.equal(pages.length, doc.getPageCount());
  assert.equal(images.length, pages.length, 'Every page must carry the original letterhead logo');
  for (const [i, page] of doc.getPages().entries()) {
    assert.equal(page.getWidth(), 595.32); assert.equal(page.getHeight(), 841.92);
    const lines = texts.filter(t => t.page === pages[i]);
    assert.ok(lines.some(t => t.text === `Seite ${i + 1} von ${pages.length}`));
    assert.ok(lines.some(t => t.text === 'DE360179911'), 'Legal footer must repeat');
    for (const t of lines) {
      const w = t.font.widthOfTextAtSize(t.text, t.size);
      assert.ok(t.x >= 27 && t.x + w <= 574, `Text outside page margins: ${t.text}`);
      assert.ok(t.y >= 12 && t.y + t.size <= 816, `Text outside page height: ${t.text}`);
      assert.ok(!/[<>]|\ufffd/.test(t.text), 'No template placeholders or replacement characters');
      for (const other of lines) {
        if (other === t || !t.text.trim() || !other.text.trim() || Math.abs(other.y - t.y) > .1) continue;
        const ow = other.font.widthOfTextAtSize(other.text, other.size);
        assert.ok(t.x + w <= other.x + .1 || other.x + ow <= t.x + .1, `Overlapping columns: ${t.text} / ${other.text}`);
      }
    }
  }
  assert.ok(texts.some(t => t.text === model.money(quote.snapshot.totalCents) && t.size > 9), 'Prominent total must match the immutable saved amount');
  await verify({ texts, pages, doc });
  fs.mkdirSync('tmp/pdfs', { recursive: true });
  fs.writeFileSync(`tmp/pdfs/${name}.pdf`, bytes);
  return bytes;
}

(async () => {
  // Reproduce the shared-buffer allocation used by Node 24 in serverless
  // instances: a JPEG can begin after unrelated bytes in the same ArrayBuffer.
  const originalBufferFrom = Buffer.from;
  Buffer.from = function (...args) {
    const value = originalBufferFrom.apply(Buffer, args);
    if (args[0] === letterheadLogo && args[1] === 'base64') {
      const allocation = Buffer.alloc(value.length + 16); value.copy(allocation, 16);
      return allocation.subarray(16);
    }
    return value;
  };
  try {
    await check('letterhead-pooled-buffer', fixture(), ({ pages }) => assert.equal(pages.length, 1));
  } finally { Buffer.from = originalBufferFrom; }
  const sample = fixture();
  assert.equal(sample.snapshot.totalCents, 81484);
  const preview = await check('letterhead-sample', sample, ({ texts, pages }) => {
    assert.equal(pages.length, 1, 'A normal short offer should fit one page');
    for (const expected of ['Rabatt (7 %)', '-51,54 €', '684,74 €', '130,10 €', '814,84 €', 'REFERENZ', 'PROJEKT']) assert.ok(texts.some(t => t.text === expected), expected);
    assert.ok(texts.some(t => t.text.includes('3.11.2026')));
  });
  fs.mkdirSync('output/pdf', { recursive: true });
  fs.writeFileSync('output/pdf/rd-frankenbau-angebot-vorlage.pdf', preview);

  const longDescription = Array.from({ length: 76 }, (_, i) => `Umfang-${String(i + 1).padStart(3, '0')}`).join('\n');
  await check('letterhead-long-scope', fixture([{ ...services[0], description: longDescription }], [1]), ({ texts, pages }) => {
    assert.ok(pages.length >= 3);
    assert.ok(texts.some(t => t.page === pages[0] && t.text.includes('Umfang-001')), 'Long first position must begin on the first page');
    for (let i = 1; i <= 76; i++) assert.equal(texts.filter(t => t.text.includes(`Umfang-${String(i).padStart(3, '0')}`)).length, 1, 'Every scope line must survive pagination exactly once');
    assert.ok(texts.some(t => t.text.includes('Position 101 (Fortsetzung)')));
  });
  const many = Array.from({ length: 60 }, (_, i) => ({ ...services[0], id: `scope-${i}`, catalogNumber: String(i + 201), description: `Prüfposition ${i + 1}: Untergrund prüfen und Arbeiten sorgfältig ausführen.`, unit: 'pauschal', priceCents: 1234 }));
  await check('letterhead-many-positions', fixture(many, many.map(() => 100000), { discountPercent: .29, note: 'Zusätzliche Hinweise und Absprachen zur Ausführung. '.repeat(38) }), ({ texts, pages }) => {
    assert.ok(pages.length >= 4);
    for (let i = 0; i < many.length; i++) assert.equal(texts.filter(t => t.text.startsWith(`${i + 201} · `)).length, 1);
  });
  await check('letterhead-maximum-amount', fixture([{ ...services[0], priceCents: 1000000 }], [100000], { taxPercent: 0, discountPercent: 0 }), ({ texts }) => {
    assert.ok(texts.some(t => t.text === '1.000.000.000,00 €'));
  });
  const longCompany = { name: 'RD Frankenbau '.repeat(7).trim(), address: 'Sehr lange Geschäftsadresse mit zusätzlichen Angaben '.repeat(3).trim(), email: `${'kontakt'.repeat(17)}@example.com`, phone: '+49 174 2629258 · Büro und Verwaltung' };
  await check('letterhead-long-details', fixture(services, [12.5, 20, 2], {
    company: longCompany, project: 'Umfangreiche Modernisierung mit umfassender Abstimmung '.repeat(2),
    customer: { name: 'Виктор Мюллер · Eigentümergemeinschaft '.repeat(3).trim(), address: 'Ausführliche Anschrift mit langem Straßennamen und Zusatzangaben '.repeat(4), email: `${'kunde'.repeat(23)}@example.com`, phone: '+49 911 1234567' },
    location: 'Mehrere Gebäudeteile an derselben Anschrift '.repeat(5),
  }), ({ texts }) => {
    assert.ok(texts.some(t => t.text.includes('Виктор')));
    assert.ok(texts.some(t => t.text.includes('Eigentümergemeinschaft')));
  });
  console.log('PASS: pooled serverless JPEG buffers; original logo and legal footer on every A4 page; short, long, 60-position, Unicode and maximum-amount offers; no lost scopes, overlapping columns or out-of-page text; saved totals unchanged.');
})().catch(error => { console.error(error); process.exitCode = 1; });
