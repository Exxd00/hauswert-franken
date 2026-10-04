import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, PDFFont, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { dateDE, money, Quote, quoteNumber, validUntilDate } from './model';
import { letterheadLogo } from './letterhead-logo';

let fontBytes: Promise<Buffer> | undefined;

export async function quotePdf(quote: Quote) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  fontBytes ??= readFile(path.join(process.cwd(), 'public/fonts/NotoSans.ttf'));
  const font = await doc.embedFont(await fontBytes, { subset: true });
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await doc.embedJpg(Buffer.from(letterheadLogo, 'base64'));
  const ink = rgb(24 / 255, 26 / 255, 27 / 255);
  const bronze = rgb(185 / 255, 133 / 255, 70 / 255);
  const cream = rgb(243 / 255, 241 / 255, 236 / 255);
  const muted = rgb(.40, .42, .42);
  const rule = rgb(.86, .85, .82);
  const q = quote.snapshot;
  const number = quoteNumber(quote);
  const W = 595.32, H = 841.92, LEFT = 66.60, RIGHT = 534.36, BODY = RIGHT - LEFT;
  doc.setTitle(`Angebot ${number} - ${q.company.name}`);
  doc.setAuthor(q.company.name);
  doc.setCreationDate(new Date(quote.created_at));

  let page = doc.addPage([W, H]);
  let y = 0;
  const clean = (s: string) => s.replace(/\r/g, '').replace(/\t/g, ' ');
  const width = (s: string, size: number, face = font) => face.widthOfTextAtSize(clean(s), size);
  function draw(s: string, x: number, baseline: number, size = 9, color = ink, face = font) {
    page.drawText(clean(s), { x, y: baseline, size, font: face, color });
  }
  function right(s: string, x: number, baseline: number, size = 9, color = ink, face = font, max = Infinity) {
    const fitted = Math.min(size, size * max / Math.max(width(s, size, face), 1));
    draw(s, x - width(s, fitted, face), baseline, fitted, color, face);
  }
  function wrap(s: string, max: number, size = 9, face: PDFFont = font): string[] {
    return clean(s).split('\n').flatMap(paragraph => {
      const result: string[] = []; let line = '';
      for (const word of paragraph.split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word;
        if (width(candidate, size, face) <= max) { line = candidate; continue; }
        if (line) result.push(line);
        line = '';
        for (const char of word) {
          if (width(line + char, size, face) > max && line) { result.push(line); line = ''; }
          line += char;
        }
      }
      result.push(line); return result;
    });
  }
  function emphasis(s: string) {
    try { bold.encodeText(clean(s)); return bold; } catch { return font; }
  }

  // Preserve the supplied letterhead while allowing saved contact details to wrap.
  const contactLines = [q.company.phone, q.company.email, 'www.rd-frankenbau.de']
    .filter(Boolean).flatMap(value => {
      const face = value === q.company.phone ? emphasis(value) : font;
      return wrap(value, 210, 8.2, face).map(text => ({ text, face }));
    });
  const headerBandTop = Math.max(85.32, 31.44 + contactLines.length * 11 + 12);
  const senderLines = wrap(`${q.company.name} · Inh. Roberto Dreger · ${q.company.address}`, BODY, 6.96);
  const senderBaseline = H - headerBandTop - 33.27;
  const senderBottom = senderBaseline - (senderLines.length - 1) * 10;
  const metadataTop = senderBottom - 4.05;

  const footerColumns = [
    { x: 27.60, max: 217, title: q.company.name.toLocaleUpperCase('de-DE'), lines: ['Inhaber Roberto Dreger', q.company.address] },
    { x: 261.48, max: 144, title: 'KONTAKT', lines: [q.company.phone, q.company.email, 'www.rd-frankenbau.de'].filter(Boolean) },
    { x: 417.36, max: 156, title: 'RECHTLICHES', lines: ['Einzelunternehmen', 'St.-Nr. 238/212/31272 · USt-IdNr.', 'DE360179911', 'Handwerkskammer für Mittelfranken'] },
  ].map(column => ({ ...column, face: emphasis(column.title), heading: wrap(column.title, column.max, 7.56, emphasis(column.title)), body: column.lines.flatMap(line => wrap(line, column.max, 6.96)) }));
  const footerRows = Math.max(...footerColumns.map(column => column.heading.length + column.body.length));
  const footerBandY = 15.60 + footerRows * 8.2 + 6.88;
  const BOTTOM = footerBandY + 26;

  function band(x: number, baseline: number, bronzeWidth: number, blackWidth: number, height: number) {
    page.drawRectangle({ x, y: baseline, width: bronzeWidth, height, color: bronze });
    page.drawRectangle({ x: x + bronzeWidth, y: baseline, width: blackWidth, height, color: ink });
  }
  function header() {
    page.drawImage(logo, { x: 66.48, y: H - 83.76, width: 234.24, height: 52.32 });
    contactLines.forEach((line, i) => right(line.text, RIGHT, H - 41.4 - i * 11, 8.2, ink, line.face));
    band(LEFT, H - headerBandTop - 4.56, 233.88, 233.88, 4.56);
    senderLines.forEach((line, i) => draw(line, LEFT, senderBaseline - i * 10, 6.96, muted));
  }
  function newPage() {
    page = doc.addPage([W, H]);
    header();
    y = senderBottom - 37;
    draw(`Angebot ${number}`, LEFT, y, 12, ink, bold);
    right('Fortsetzung', RIGHT, y, 8.2, muted);
    y -= 33;
  }
  function ensure(height: number) { if (y - height < BOTTOM) newPage(); }
  function paragraph(s: string, size = 9, color = ink) {
    const lines = wrap(s, BODY, size);
    for (let i = 0; i < lines.length; i++) {
      // Keep at least two opening lines together when a paragraph starts.
      ensure(i === 0 ? Math.min(2, lines.length) * 14 : 14);
      draw(lines[i], LEFT, y, size, color); y -= 14;
    }
  }

  header();
  let recipientY = metadataTop - 20.52;
  for (const [value, size, color] of [
    [q.customer.name, 9.96, ink], [q.customer.address, 9.3, ink],
    [q.customer.email, 8.5, muted], [q.customer.phone, 8.5, muted],
  ] as const) {
    if (!value) continue;
    for (const line of wrap(value, 215, size)) { draw(line, LEFT, recipientY, size, color); recipientY -= 13.6; }
  }
  const metadata = [
    ['DATUM', dateDE(quote.created_at)], ['ANSPRECHPARTNER', 'Roberto Dreger'],
    ['PROJEKT', q.project], ['REFERENZ', number],
  ].map(([label, value]) => ({ label, lines: wrap(value, 208.92, 8.52) }));
  const metadataHeight = Math.max(100.32, 12 + metadata.reduce((height, field) => height + 10.8 + field.lines.length * 11 + 2, 0));
  page.drawRectangle({ x: 301.44, y: metadataTop - metadataHeight, width: 232.92, height: metadataHeight, color: cream });
  let fieldY = metadataTop - 15.84;
  for (const field of metadata) {
    draw(field.label, 313.44, fieldY, 7.56, bronze, bold); fieldY -= 10.8;
    for (const line of field.lines) { draw(line, 313.44, fieldY, 8.52); fieldY -= 11; }
    fieldY -= 2;
  }
  y = Math.min(metadataTop - metadataHeight, recipientY) - 32;
  ensure(100);
  draw('Angebot', LEFT, y, 17, ink, bold); y -= 23;
  paragraph(`Gültig bis: ${dateDE(validUntilDate(quote.created_at, q.validityDays))} · Immobilie: ${q.propertyType}`, 8.5, muted);
  if (q.location) paragraph(`Objekt: ${q.location}`, 8.5, muted);
  y -= 8;
  paragraph('Sehr geehrte Damen und Herren,', 9.5);
  paragraph('vielen Dank für Ihre Anfrage. Gerne bieten wir Ihnen folgende Leistungen an:', 9.3);
  y -= 12;

  function tableHead() {
    page.drawRectangle({ x: LEFT, y: y - 8, width: BODY, height: 25, color: cream });
    draw('LEISTUNG', LEFT + 8, y, 7.8, bronze, bold);
    right('MENGE', 354, y, 7.8, bronze, bold);
    right('EINZELPREIS', 438, y, 7.8, bronze, bold);
    right('GESAMT', RIGHT - 8, y, 7.8, bronze, bold);
    y -= 29;
  }
  ensure(64); tableHead();
  const continuationTableY = senderBottom - 70 - 29;
  const freshRowSpace = continuationTableY - BOTTOM;
  for (const [index, line] of q.lines.entries()) {
    const description = `${line.catalogNumber ? `${line.catalogNumber} · ` : ''}${line.description || line.name}`;
    const names = wrap(description, 197, 9);
    let offset = 0;
    while (offset < names.length) {
      const remainingHeight = Math.max(29, (names.length - offset) * 13.2 + 10);
      // Start a long first scope on page one; keep later positions together when they fit a fresh page.
      if ((offset === 0 && index > 0 && remainingHeight <= freshRowSpace && y - remainingHeight < BOTTOM) || y < BOTTOM + 40) {
        newPage(); tableHead();
      }
      if (offset > 0) { draw(`Position ${line.catalogNumber || index + 1} (Fortsetzung)`, LEFT + 8, y, 7.7, muted); y -= 16; }
      const count = Math.max(1, Math.min(names.length - offset, Math.floor((y - BOTTOM - 10) / 13.2)));
      names.slice(offset, offset + count).forEach((name, i) => draw(name, LEFT + 8, y - i * 13.2, 9));
      if (offset === 0) {
        right(`${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 3 }).format(line.quantity)} ${line.unit}`, 354, y, 8.5, ink, font, 76);
        right(money(line.priceCents), 438, y, 8.5, ink, font, 76);
        right(money(line.totalCents), RIGHT - 8, y, 8.5, ink, font, 80);
      }
      offset += count; y -= Math.max(29, count * 13.2 + 10);
      if (offset < names.length) { newPage(); tableHead(); }
    }
    page.drawLine({ start: { x: LEFT, y: y + 12.5 }, end: { x: RIGHT, y: y + 12.5 }, thickness: .5, color: rule });
  }

  y -= 12;
  ensure((q.discountCents ? 5 : 4) * 21 + 27);
  function sum(label: string, cents: number) {
    draw(label, 278, y, 9); right(money(cents), RIGHT - 8, y, 9, ink, font, 82); y -= 21;
  }
  sum('Zwischensumme netto', q.subtotalCents);
  if (q.discountCents) sum(`Rabatt (${q.discountPercent.toLocaleString('de-DE')} %)`, -q.discountCents);
  sum('Summe netto', q.netCents); sum(`MwSt. (${q.taxPercent} %)`, q.taxCents);
  y -= 5;
  page.drawRectangle({ x: 266, y: y - 10, width: RIGHT - 266, height: 31, color: cream });
  draw('Gesamtbetrag', 278, y, 11.5, ink, bold);
  right(money(q.totalCents), RIGHT - 8, y, 11.5, bronze, bold, 100); y -= 35;
  if (q.taxNote) { paragraph(q.taxNote, 8.7); y -= 6; }
  if (q.note) { paragraph(q.note); y -= 6; }
  if (q.defaultNote) { paragraph(q.defaultNote, 8.5, muted); y -= 6; }
  const closingFace = emphasis(q.company.name);
  const closingLines = wrap(q.company.name, BODY, 9.3, closingFace);
  ensure(16 + closingLines.length * 14 + 28);
  draw('Mit freundlichen Grüßen', LEFT, y, 9.3); y -= 16;
  for (const line of closingLines) { draw(line, LEFT, y, 9.3, ink, closingFace); y -= 14; }
  draw('Roberto Dreger', LEFT, y, 9.3); y -= 14;
  draw('Inhaber', LEFT, y, 8.5, muted);

  const pages = doc.getPages();
  pages.forEach((p, i) => {
    page = p;
    right(`Seite ${i + 1} von ${pages.length}`, RIGHT, footerBandY + 12, 7.2, muted);
    band(27.60, footerBandY, 233.88, 311.88, 3.12);
    for (const column of footerColumns) {
      let baseline = footerBandY - 13.47;
      for (const heading of column.heading) { draw(heading, column.x, baseline, 7.56, bronze, column.face); baseline -= 8.2; }
      baseline -= 2.36;
      for (const line of column.body) { draw(line, column.x, baseline, 6.96, muted); baseline -= 8.2; }
    }
  });
  return doc.save();
}
