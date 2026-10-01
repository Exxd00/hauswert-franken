import { createHash } from 'node:crypto';
import { body, guard, json } from '@/lib/quotes/auth';
import { adminDb, readSettings } from '@/lib/quotes/db';
import { calculate, quoteInputSchema, QuoteSnapshot } from '@/lib/quotes/model';
import { syncQuote } from '@/lib/quotes/sync';
export const maxDuration = 60;
export async function GET(request: Request) {
  const denied = await guard(request); if (denied) return denied;
  try {
    const before = Number(new URL(request.url).searchParams.get('before'));
    let query = adminDb().from('rd_quotes').select('id,number,snapshot,created_at,updated_at,status,version,pdf_count,last_pdf_at,sheet_synced_version,sheet_error').order('number', { ascending: false }).limit(51);
    if (Number.isSafeInteger(before) && before > 0) query = query.lt('number', before);
    const { data, error } = await query;
    if (error) throw error;
    return json({ quotes: data.slice(0, 50), hasMore: data.length > 50 });
  } catch { return json({ error: 'Die gespeicherten Angebote konnten nicht geladen werden.' }, 503); }
}
export async function POST(request: Request) {
  const denied = await guard(request, true); if (denied) return denied;
  try {
    const parsed = quoteInputSchema.safeParse(await body(request));
    if (!parsed.success) return json({ error: parsed.error.issues[0]?.message || 'Bitte Eingaben prüfen.' }, 400);
    const input = parsed.data;
    const hash = createHash('sha256').update(JSON.stringify(input)).digest('hex');
    const db = adminDb();
    // An ambiguous network retry returns the original saved snapshot, even if rates changed.
    const { data: existing, error: lookupError } = await db.from('rd_quotes').select('*').eq('id', input.id).maybeSingle();
    if (lookupError) throw lookupError;
    if (existing) {
      if (existing.input_hash !== hash) return json({ error: 'Dieses Angebot wurde bereits gespeichert. Bitte eine neue Kopie erstellen.' }, 409);
      const { input_hash: _hash, ...safe } = existing;
      return json({ quote: await syncQuote(safe) });
    }
    const { settings, version } = await readSettings();
    if (version !== input.settingsVersion) return json({ error: 'Die Preise wurden geändert. Bitte Einstellungen neu laden und den Betrag prüfen.' }, 409);
    let totals;
    try { totals = calculate(input.lines, settings.services, input.discountPercent, settings.taxPercent); }
    catch (error) { return json({ error: (error as Error).message }, 400); }
    if (settings.taxPercent === 0 && !settings.taxNote) return json({ error: 'Bitte bei 0 % MwSt. einen passenden Steuerhinweis in den Einstellungen hinterlegen.' }, 400);
    const { id, ...details } = input;
    const snapshot: QuoteSnapshot = { ...details, ...totals, company: settings.company, taxPercent: settings.taxPercent, taxNote: settings.taxNote, validityDays: settings.validityDays, defaultNote: settings.note };
    const { data, error } = await db.rpc('rd_save_quote', { p_id: id, p_snapshot: snapshot, p_hash: hash, p_settings_version: version });
    if (error?.message?.includes('conflict')) return json({ error: 'Daten wurden inzwischen geändert. Bitte neu laden.' }, 409);
    if (error) throw error;
    return json({ quote: await syncQuote(data) }, 201);
  } catch { return json({ error: 'Angebot nicht bestätigt. Bitte erneut speichern; derselbe Vorgang erzeugt kein Duplikat.' }, 503); }
}
