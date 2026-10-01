'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Download, Plus, Save, Trash2, ArrowUpRight } from 'lucide-react';
import { calculate, dateDE, money, Quote, QuoteInput, quoteInputSchema, quoteNumber, Settings } from '@/lib/quotes/model';
import { adminApi, message } from './api';
import { downloadOffer } from './Offers';
type Props = { settings: Settings; version: number; ready: boolean; initialQuote: Quote | null; onSaved: (quote: Quote) => void; onSettings: () => void; onDirty: (dirty: boolean) => void; refreshOffers: () => Promise<void> };
const blankDraft = (): Omit<QuoteInput, 'id' | 'settingsVersion'> => ({ customer: { name: '', address: '', email: '', phone: '' }, project: 'Sanierungsarbeiten', location: '', propertyType: 'Wohnung', lines: [], discountPercent: 0, note: '' });
export function CalculatorForm({ settings, version, ready, initialQuote, onSaved, onSettings, onDirty, refreshOffers }: Props) {
  const [draft, setDraft] = useState<Omit<QuoteInput, 'id' | 'settingsVersion'>>(() => initialQuote ? {
    customer: initialQuote.snapshot.customer, project: initialQuote.snapshot.project, location: initialQuote.snapshot.location, propertyType: initialQuote.snapshot.propertyType,
    lines: initialQuote.snapshot.lines.map(l => ({ serviceId: l.serviceId, quantity: l.quantity })), discountPercent: initialQuote.snapshot.discountPercent, note: initialQuote.snapshot.note,
  } : blankDraft());
  const id = useRef(''); const downloadId = useRef(''); const [saved, setSaved] = useState<Quote | null>(null);
  const [busy, setBusy] = useState(''); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const [serviceSearch, setServiceSearch] = useState(''); const [showAll, setShowAll] = useState(false); const [dirty, setDirty] = useState(Boolean(initialQuote));
  useEffect(() => { onDirty(dirty && !saved); }, [dirty, saved, onDirty]);
  const matchingServices = settings.services.filter(s => s.active && s.name.toLocaleLowerCase('de').includes(serviceSearch.toLocaleLowerCase('de')));
  const services = showAll || serviceSearch ? matchingServices : matchingServices.slice(0, 6);
  let totals: ReturnType<typeof calculate> | undefined; let priceError = '';
  try { totals = calculate(draft.lines, settings.services, draft.discountPercent, settings.taxPercent); } catch (e) { priceError = message(e); }
  const visibleTotals = saved?.snapshot || totals;
  const missingPrices = draft.lines.some(line => !settings.services.some(s => s.id === line.serviceId && s.active && s.priceCents !== null));
  function update(patch: Partial<typeof draft>) { if (saved || busy) return; setDraft(d => ({ ...d, ...patch })); setDirty(true); setError(''); setNotice(''); }
  function toggle(serviceId: string) { update({ lines: draft.lines.some(l => l.serviceId === serviceId) ? draft.lines.filter(l => l.serviceId !== serviceId) : [...draft.lines, { serviceId, quantity: 1 }] }); }
  async function save(pdf: boolean) {
    setError(''); setNotice(''); setBusy(pdf ? 'pdf' : 'save');
    try {
      let quote = saved;
      if (!quote) {
        id.current ||= crypto.randomUUID();
        const parsed = quoteInputSchema.safeParse({ ...draft, id: id.current, settingsVersion: version });
        if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || 'Bitte Eingaben prüfen.');
        const result = await adminApi<{ quote: Quote }>('/api/admin/quotes', { method: 'POST', body: JSON.stringify(parsed.data) });
        quote = result.quote; setSaved(quote); setDirty(false); onSaved(quote);
      }
      if (pdf) {
        downloadId.current ||= crypto.randomUUID();
        const synced = await downloadOffer(quote, downloadId.current); downloadId.current = '';
        setNotice(synced ? 'PDF bereitgestellt und im Sheet erfasst.' : 'PDF bereitgestellt. Die Übertragung an Google Sheets wird erneut versucht.');
        await refreshOffers().catch(() => {});
      } else setNotice(quote.sheet_synced_version >= quote.version ? 'Angebot gespeichert und im Sheet erfasst.' : 'Angebot gespeichert. Übertragung an Google Sheets steht aus.');
    } catch (e) { setError(message(e)); } finally { setBusy(''); }
  }
  function reset() {
    if (dirty && !saved && !window.confirm('Aktuelle Berechnung verwerfen?')) return;
    id.current = ''; downloadId.current = ''; setSaved(null); setDirty(false); setNotice(''); setError(''); setDraft(blankDraft());
  }
  return <div className="rd-calculator-grid"><div className="rd-flow">
    {saved && <div className="rd-alert rd-success"><Check size={20} /><span><strong>{quoteNumber(saved)} gespeichert</strong><br />{dateDE(saved.created_at)} · Die Preise dieses Angebots sind gesichert.</span><button className="rd-text-link" onClick={reset}>Neues Angebot <Plus size={16} /></button></div>}
    {initialQuote && !saved && <p className="rd-alert rd-warning">Kopie von {quoteNumber(initialQuote)}. Es gelten die aktuellen Katalogpreise. Bitte den neuen Betrag prüfen.</p>}
    <fieldset disabled={Boolean(saved || busy)} className="rd-panel"><div className="rd-section-heading"><span className="rd-step">1</span><div><h2>Was wird gemacht?</h2><p>Leistungen antippen. Mehrfachauswahl möglich.</p></div><button className="rd-text-link" type="button" onClick={onSettings}>Preise <ArrowUpRight size={16} /></button></div>
      <label className="rd-field rd-search">Leistung finden<input type="search" placeholder="z. B. Malerarbeiten" value={serviceSearch} onChange={e => setServiceSearch(e.target.value)} /></label>
      <div className="rd-service-grid">{services.map(s => { const selected = draft.lines.some(l => l.serviceId === s.id); return <button type="button" key={s.id} className={`rd-service ${selected ? 'selected' : ''}`} aria-pressed={selected} onClick={() => toggle(s.id)}><span className="rd-service-check">{selected ? <Check size={15} /> : <Plus size={15} />}</span><strong>{s.name}</strong><small>{s.priceCents === null ? 'Preis noch festlegen' : `${money(s.priceCents)} / ${s.unit}`}</small></button>; })}</div>
      {!serviceSearch && matchingServices.length > 6 && <button type="button" className="rd-text-link rd-full" onClick={() => setShowAll(!showAll)}>{showAll ? 'Weniger anzeigen' : `Alle ${matchingServices.length} Leistungen anzeigen`}<ChevronDown size={16} /></button>}
      {services.length === 0 && <p className="rd-muted">Keine passende Leistung gefunden. Neue Leistungen können Sie in den Einstellungen anlegen.</p>}
      {draft.lines.length > 0 && <div className="rd-quantities"><h3>Mengen eintragen</h3>{draft.lines.map(line => { const s = saved?.snapshot.lines.find(s => s.serviceId === line.serviceId) || settings.services.find(s => s.id === line.serviceId); return <div key={line.serviceId} className="rd-quantity-row"><div><strong>{s?.name || 'Nicht mehr verfügbare Leistung'}</strong><small>{s?.priceCents == null ? 'Preis fehlt' : `${money(s.priceCents)} netto / ${s.unit}`}</small></div><label className="rd-quantity"><span className="rd-sr-only">Menge {s?.name}</span><input type="number" inputMode="decimal" min="0.001" max="100000" step="0.001" value={Number.isNaN(line.quantity) ? '' : line.quantity} onChange={e => update({ lines: draft.lines.map(l => l.serviceId === line.serviceId ? { ...l, quantity: e.target.value === '' ? NaN : Number(e.target.value) } : l) })} /><span>{s?.unit}</span></label><button type="button" className="rd-icon-button" aria-label={`${s?.name} entfernen`} onClick={() => toggle(line.serviceId)}><Trash2 size={17} /></button></div>; })}</div>}
    </fieldset>
    <fieldset disabled={Boolean(saved || busy)} className="rd-panel"><div className="rd-section-heading"><span className="rd-step">2</span><div><h2>Für wen ist das Angebot?</h2><p>Nur Name und Projekt sind erforderlich.</p></div></div><div className="rd-fields"><label className="rd-field">Kunde / Firma *<input autoComplete="name" value={draft.customer.name} maxLength={120} onChange={e => update({ customer: { ...draft.customer, name: e.target.value } })} placeholder="z. B. Max Mustermann" /></label><label className="rd-field">Projekt *<input value={draft.project} maxLength={150} onChange={e => update({ project: e.target.value })} /></label><label className="rd-field">Immobilie<select value={draft.propertyType} onChange={e => update({ propertyType: e.target.value as QuoteInput['propertyType'] })}>{['Wohnung', 'Haus', 'Gewerbe', 'Sonstiges'].map(v => <option key={v}>{v}</option>)}</select></label><label className="rd-field">Objektadresse <small>optional</small><input value={draft.location} maxLength={250} onChange={e => update({ location: e.target.value })} placeholder="Straße, PLZ, Ort" /></label></div>
      <details className="rd-details"><summary>Adresse und Kontaktdaten ergänzen <ChevronDown size={16} /></summary><div className="rd-fields"><label className="rd-field rd-span">Kundenanschrift<textarea rows={2} value={draft.customer.address} maxLength={250} onChange={e => update({ customer: { ...draft.customer, address: e.target.value } })} /></label><label className="rd-field">E-Mail<input type="email" autoComplete="email" value={draft.customer.email} onChange={e => update({ customer: { ...draft.customer, email: e.target.value } })} /></label><label className="rd-field">Telefon<input type="tel" autoComplete="tel" value={draft.customer.phone} maxLength={40} onChange={e => update({ customer: { ...draft.customer, phone: e.target.value } })} /></label></div></details>
    </fieldset>
    <fieldset disabled={Boolean(saved || busy)} className="rd-panel"><details className="rd-details rd-details-clean"><summary>Rabatt und Hinweise <span>optional</span><ChevronDown size={16} /></summary><div className="rd-fields"><label className="rd-field">Rabatt in %<input type="number" inputMode="decimal" min="0" max="100" step="0.01" value={Number.isNaN(draft.discountPercent) ? '' : draft.discountPercent} onChange={e => update({ discountPercent: e.target.value === '' ? 0 : Number(e.target.value) })} /></label><label className="rd-field rd-span">Hinweise für dieses Angebot<textarea rows={3} maxLength={2000} value={draft.note} onChange={e => update({ note: e.target.value })} placeholder="z. B. Materialauswahl oder vereinbarter Leistungsumfang" /></label></div></details></fieldset>
  </div><aside className="rd-summary"><div className="rd-summary-heading"><span className="rd-eyebrow">AUF EINEN BLICK</span><h2>{saved ? quoteNumber(saved) : 'Ihr Angebot'}</h2></div>
    {draft.lines.length === 0 ? <div className="rd-summary-empty"><span>01</span><p>Wählen Sie die erste Leistung aus.</p></div> : <div className="rd-summary-lines">{(saved?.snapshot.lines || draft.lines).map(l => { const s = settings.services.find(s => s.id === l.serviceId); const total = visibleTotals?.lines.find(row => row.serviceId === l.serviceId)?.totalCents; return <div key={l.serviceId}><span>{'name' in l ? String(l.name) : s?.name}<small>{Number.isFinite(l.quantity) ? l.quantity : '–'} {'unit' in l ? String(l.unit) : s?.unit}</small></span><strong>{total !== undefined && Number.isFinite(total) ? money(total) : '–'}</strong></div>; })}</div>}
    {priceError && !saved && <p className="rd-alert rd-warning">{priceError}{missingPrices && <button className="rd-text-link" onClick={onSettings}>Preise hinterlegen</button>}</p>}
    <div className="rd-totals"><div><span>Zwischensumme</span><strong>{money(visibleTotals?.subtotalCents || 0)}</strong></div>{Boolean(visibleTotals?.discountCents) && <div><span>Rabatt</span><strong>− {money(visibleTotals?.discountCents || 0)}</strong></div>}<div><span>Netto</span><strong>{money(visibleTotals?.netCents || 0)}</strong></div><div><span>MwSt. {saved?.snapshot.taxPercent ?? settings.taxPercent} %</span><strong>{money(visibleTotals?.taxCents || 0)}</strong></div></div>
    <div className="rd-grand-total"><span>Gesamtbetrag</span><strong>{money(visibleTotals?.totalCents || 0)}</strong><small>inklusive MwSt.</small></div>
    <div className="rd-summary-actions">{error && <p className="rd-alert rd-error" role="alert">{error}</p>}{notice && <p className="rd-alert rd-success" role="status">{notice}</p>}
      <button className="rd-button rd-primary rd-full" disabled={Boolean(busy) || !ready || !draft.lines.length || (!saved && Boolean(priceError))} onClick={() => void save(true)}><Download size={18} />{busy === 'pdf' ? 'PDF wird erstellt …' : saved ? 'PDF herunterladen' : 'Speichern & PDF laden'}</button>
      {!saved && <button className="rd-button rd-secondary rd-full" disabled={Boolean(busy) || !ready || !draft.lines.length || Boolean(priceError)} onClick={() => void save(false)}><Save size={18} />{busy === 'save' ? 'Wird gespeichert …' : 'Nur Angebot speichern'}</button>}
      <p className="rd-muted rd-caption">{saved ? 'Sie finden das Angebot jederzeit unter „Angebote“.' : 'Wird in der Datenbank gespeichert und an Ihr Google Sheet übertragen.'}</p>
      {!saved && dirty && <button className="rd-text-link rd-full" onClick={reset} disabled={Boolean(busy)}>Berechnung zurücksetzen</button>}
    </div></aside></div>;
}
