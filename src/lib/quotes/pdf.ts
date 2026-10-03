import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { dateDE, money, Quote, quoteNumber, validUntilDate } from './model';

let fontBytes: Promise<Buffer> | undefined;
export async function quotePdf(quote: Quote) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  fontBytes ??= readFile(path.join(process.cwd(), 'public/fonts/NotoSans.ttf'));
  const font = await doc.embedFont(await fontBytes, { subset: true });
  const navy = rgb(0.118, 0.161, 0.231), muted = rgb(0.36, 0.41, 0.49), gold = rgb(0.918, 0.702, 0.031);
  const q = quote.snapshot;
  doc.setTitle(`Angebot ${quoteNumber(quote)} - ${q.company.name}`);
  doc.setAuthor(q.company.name);
  doc.setCreationDate(new Date(quote.created_at));
  let page = doc.addPage([595.28, 841.89]); let y = 792;
  const clean = (s: string) => s.replace(/\r/g, '').replace(/\t/g, ' ');
  const width = (s: string, size: number) => font.widthOfTextAtSize(s, size);
  function draw(s: string, x: number, top: number, size = 10, color = navy) { page.drawText(clean(s), { x, y: top, size, font, color }); }
  function fit(s: string, max: number, size: number) { return Math.min(size, size * max / Math.max(width(s, size), 1)); }
  function right(s: string, x: number, top: number, size = 10) { draw(s, x - width(s, size), top, size); }
  function wrap(s: string, max: number, size = 10): string[] {
    return clean(s).split('\n').flatMap(paragraph => {
      const result: string[] = []; let line = '';
      for (const word of paragraph.split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word;
        if (width(candidate, size) <= max) { line = candidate; continue; }
        if (line) result.push(line);
        line = '';
        for (const char of word) {
          if (width(line + char, size) > max && line) { result.push(line); line = ''; }
          line += char;
        }
      }
      result.push(line); return result;
    });
  }
  function newPage() {
    page = doc.addPage([595.28, 841.89]); y = 790;
    draw(q.company.name, 42, y, fit(q.company.name, 370, 12)); right(quoteNumber(quote), 553, y, 10); y -= 34;
  }
  function ensure(height: number) { if (y - height < 72) newPage(); }
  function paragraph(s: string, max = 511, size = 10, color = navy) {
    for (const line of wrap(s, max, size)) { ensure(16); draw(line, 42, y, size, color); y -= 16; }
  }
  // Reuse the existing house mark as vector paths.
  page.drawSvgPath('M3 9.5L12 4L21 9.5 M19 13V19.4C19 19.73 18.73 20 18.4 20H5.6C5.27 20 5 19.73 5 19.4V13 M9 20V14H15V20', { x: 38, y: 815, scale: 2, borderWidth: 1.5, borderColor: navy });
  draw(q.company.name, 98, 792, fit(q.company.name, 455, 19));
  draw('SANIERUNG · MODERNISIERUNG · INNENAUSBAU', 98, 775, 8, muted);
  page.drawLine({ start: { x: 42, y: 755 }, end: { x: 553, y: 755 }, thickness: 3, color: gold });
  y = 731; paragraph(q.company.address, 511, 8, muted);
  y -= 18; paragraph(q.customer.name, 300, 12); if (q.customer.address) paragraph(q.customer.address, 300);
  if (q.customer.email) paragraph(q.customer.email, 300, 9, muted);
  y -= 25; ensure(95);
  draw('Angebot', 42, y, 25); right(quoteNumber(quote), 553, y, 13); y -= 27;
  const validUntil = validUntilDate(quote.created_at, q.validityDays);
  draw(`Datum: ${dateDE(quote.created_at)}`, 42, y, 9, muted);
  right(`Gültig bis: ${dateDE(validUntil)}`, 553, y, 9); y -= 28;
  paragraph(q.project, 511, 13); if (q.location) paragraph(`Objekt: ${q.location}`, 511, 10, muted);
  paragraph(`Immobilie: ${q.propertyType}`, 511, 9, muted); y -= 18;
  function tableHead() {
    ensure(48); page.drawRectangle({ x: 42, y: y - 9, width: 511, height: 27, color: rgb(.94, .95, .97) });
    draw('Leistung', 50, y, 9); right('Menge', 330, y, 9); right('Einzelpreis', 438, y, 9); right('Gesamt', 545, y, 9); y -= 33;
  }
  tableHead();
  for (const line of q.lines) {
    const description = `${line.catalogNumber ? `${line.catalogNumber} · ` : ''}${line.description || line.name}`;
    const names = wrap(description, 185, 10);
    let offset = 0;
    while (offset < names.length) {
      const remainingHeight = (names.length - offset) * 15 + 16;
      // Keep normal positions together; long scopes continue safely on a new page.
      if ((offset === 0 && remainingHeight <= 650 && y - remainingHeight < 72) || y < 125) { newPage(); tableHead(); }
      if (offset > 0) { draw(`Position ${line.catalogNumber || q.lines.indexOf(line) + 1} (Fortsetzung)`, 50, y, 8, muted); y -= 17; }
      const count = Math.max(1, Math.min(names.length - offset, Math.floor((y - 88) / 15)));
      names.slice(offset, offset + count).forEach((name, i) => draw(name, 50, y - i * 15, 10));
      if (offset === 0) {
        right(`${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 3 }).format(line.quantity)} ${line.unit}`, 330, y, 9);
        right(money(line.priceCents), 438, y, 9); right(money(line.totalCents), 545, y, 9);
      }
      offset += count; y -= Math.max(34, count * 15 + 16);
      if (offset < names.length) { newPage(); tableHead(); }
    }
    page.drawLine({ start: { x: 42, y: y + 10 }, end: { x: 553, y: y + 10 }, thickness: .5, color: rgb(.86, .88, .91) });
  }
  y -= 10; ensure(150);
  function sum(label: string, cents: number, size = 10) { draw(label, 290, y, size); right(money(cents), 545, y, size); y -= 23; }
  sum('Zwischensumme netto', q.subtotalCents);
  if (q.discountCents) sum(`Rabatt (${q.discountPercent.toLocaleString('de-DE')} %)`, -q.discountCents);
  sum('Summe netto', q.netCents); sum(`MwSt. (${q.taxPercent} %)`, q.taxCents);
  page.drawRectangle({ x: 282, y: y - 10, width: 271, height: 32, color: rgb(.99, .95, .79) });
  sum('Gesamtbetrag', q.totalCents, 13); y -= 28;
  if (q.taxNote) { paragraph(q.taxNote, 511, 9); y -= 12; }
  if (q.note) { paragraph(q.note, 511, 10); y -= 12; }
  if (q.defaultNote) paragraph(q.defaultNote, 511, 9, muted);
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    page = p;
    page.drawLine({ start: { x: 42, y: 53 }, end: { x: 553, y: 53 }, thickness: .5, color: rgb(.82, .85, .89) });
    const contact = q.company.email + '  |  ' + q.company.phone;
    draw(contact, 42, 36, fit(contact, 455, 8), muted);
    right(`${i + 1} / ${pages.length}`, 553, 36, 8);
  });
  return doc.save();
}
