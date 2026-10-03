import { z } from 'zod';

const text = (max: number) => z.string().trim().max(max).refine(v => !/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(v), 'Ungültige Zeichen');
export const units = ['m²', 'm³', 'm', 'Stück', 'Stunden', 'Tage', 'Kpl.', 'pauschal'] as const;
export const MAX_SERVICES = 600;
export const serviceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,60}$/), name: text(90).min(2),
  unit: z.enum(units), priceCents: z.number().int().min(0).max(100_000_000).nullable(), active: z.boolean(),
  catalogNumber: text(20).optional(), category: text(60).optional(), description: text(1000).optional(),
  internalNote: text(600).optional(),
  defaultQuantity: z.number().positive().max(100_000).refine(v => Math.abs(v * 1000 - Math.round(v * 1000)) < 0.00001, 'Maximal 3 Nachkommastellen').optional(),
});
export const settingsSchema = z.object({
  company: z.object({ name: text(100).min(2), address: text(180).min(5), email: z.email().max(150), phone: text(40) }),
  taxPercent: z.union([z.literal(0), z.literal(7), z.literal(19)]),
  taxNote: text(300), validityDays: z.number().int().min(1).max(365),
  note: text(2000), services: z.array(serviceSchema).min(1).max(MAX_SERVICES),
  catalogue: z.object({ title: text(100), importedAt: z.iso.datetime(), count: z.number().int().nonnegative().max(MAX_SERVICES), notes: z.array(text(1000)).max(10) }).optional(),
}).refine(v => new Set(v.services.map(s => s.id)).size === v.services.length, 'Doppelte Leistung');
export type Settings = z.infer<typeof settingsSchema>;
export type Service = Settings['services'][number];
export const defaultSettings: Settings = {
  company: { name: 'RD Frankenbau', address: 'Wilderstraße 19, 90408 Nürnberg', email: 'info@rd-frankenbau.de', phone: '+49 174 2629258' },
  taxPercent: 19, taxNote: '', validityDays: 30,
  note: 'Leistungsumfang und Ausführung nach gemeinsamer Abstimmung. Zusätzliche Leistungen nur nach gesonderter Vereinbarung.',
  services: [
    ['malerarbeiten', 'Malerarbeiten', 'm²'], ['trockenbau', 'Trockenbau', 'm²'],
    ['bodenverlegung', 'Bodenverlegung', 'm²'], ['fliesenarbeiten', 'Fliesenarbeiten', 'm²'],
    ['badsanierung', 'Badsanierung', 'pauschal'], ['kernsanierung', 'Kernsanierung', 'm²'],
    ['modernisierung', 'Modernisierung', 'pauschal'], ['wohnungssanierung', 'Wohnungssanierung', 'm²'],
    ['altbausanierung', 'Altbausanierung', 'm²'], ['entruempelung', 'Entrümpelung & Räumung', 'pauschal'],
    ['gartengestaltung', 'Gartengestaltung', 'pauschal'], ['elektroinstallation', 'Elektroinstallation', 'pauschal'],
    ['sanitaerinstallation', 'Sanitärinstallation', 'pauschal'], ['tueren-fenster', 'Türen & Fenster', 'Stück'],
    ['heizungsmodernisierung', 'Heizungsmodernisierung', 'pauschal'], ['kuechensanierung', 'Küchensanierung', 'pauschal'],
    ['dachgeschossausbau', 'Dachgeschossausbau', 'm²'],
  ].map(([id, name, unit]) => ({ id, name, unit: unit as Service['unit'], priceCents: null, active: true })),
};
export const quoteInputSchema = z.object({
  id: z.uuid(), settingsVersion: z.number().int().positive(),
  customer: z.object({ name: text(120).min(2, 'Bitte Kundennamen eingeben.'), address: text(250), email: z.union([z.literal(''), z.email().max(150)]), phone: text(40) }),
  project: text(150).min(2, 'Bitte Projektbezeichnung eingeben.'), location: text(250),
  propertyType: z.enum(['Wohnung', 'Haus', 'Gewerbe', 'Sonstiges']),
  lines: z.array(z.object({ serviceId: text(60), quantity: z.number().positive().max(100_000).refine(v => Math.abs(v * 1000 - Math.round(v * 1000)) < 0.00001, 'Maximal 3 Nachkommastellen') })).min(1, 'Bitte eine Leistung auswählen.').max(60),
  discountPercent: z.number().min(0).max(100).refine(v => Math.abs(v * 100 - Math.round(v * 100)) < 0.00001, 'Maximal 2 Nachkommastellen'),
  note: text(2000),
}).refine(v => new Set(v.lines.map(l => l.serviceId)).size === v.lines.length, 'Leistungen bitte nur einmal auswählen.');
export type QuoteInput = z.infer<typeof quoteInputSchema>;
export type QuoteLine = { serviceId: string; name: string; description?: string; catalogNumber?: string; unit: Service['unit']; quantity: number; priceCents: number; totalCents: number };
export function calculate(lines: QuoteInput['lines'], services: Service[], discountPercent: number, taxPercent: number) {
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) throw new Error('Rabatt muss zwischen 0 und 100 % liegen.');
  const calculated: QuoteLine[] = lines.map(line => {
    if (!Number.isFinite(line.quantity) || line.quantity <= 0 || line.quantity > 100000) throw new Error('Bitte eine gültige Menge größer als 0 eingeben.');
    const service = services.find(s => s.id === line.serviceId && s.active);
    if (!service || service.priceCents === null) throw new Error('Bitte zuerst die Preise der gewählten Leistungen in den Einstellungen hinterlegen.');
    const totalCents = Math.round((Math.round(line.quantity * 1000) * service.priceCents) / 1000);
    if (!Number.isSafeInteger(totalCents) || totalCents > 100_000_000_000) throw new Error('Betrag zu groß.');
    return { ...line, name: service.name, ...(service.description ? { description: service.description } : {}), ...(service.catalogNumber ? { catalogNumber: service.catalogNumber } : {}), unit: service.unit, priceCents: service.priceCents, totalCents };
  });
  const subtotalCents = calculated.reduce((sum, line) => sum + line.totalCents, 0);
  if (subtotalCents > 100_000_000_000) throw new Error('Maximaler Angebotsbetrag überschritten.');
  const discountCents = Math.round(subtotalCents * Math.round(discountPercent * 100) / 10000);
  const netCents = subtotalCents - discountCents;
  const taxCents = Math.round(netCents * taxPercent / 100);
  if (netCents + taxCents > 100_000_000_000) throw new Error('Maximaler Angebotsbetrag überschritten.');
  return { lines: calculated, subtotalCents, discountCents, netCents, taxCents, totalCents: netCents + taxCents };
}
export type QuoteSnapshot = ReturnType<typeof calculate> & Omit<QuoteInput, 'id' | 'lines'> & { company: Settings['company']; taxPercent: number; taxNote: string; validityDays: number; defaultNote: string };
export type Quote = { id: string; number: number; snapshot: QuoteSnapshot; created_at: string; updated_at: string; status: 'offen' | 'angenommen' | 'abgelehnt' | 'archiviert'; version: number; pdf_count: number; last_pdf_at: string | null; sheet_synced_version: number; sheet_error: boolean };
export const money = (cents: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
export const quoteNumber = (quote: Pick<Quote, 'number' | 'created_at'>) => `RD-${new Date(quote.created_at).getUTCFullYear()}-${String(quote.number).padStart(5, '0')}`;
export const dateDE = (date: string) => new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin' }).format(new Date(date));
