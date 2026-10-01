import { z } from 'zod';
import { body, guard, json } from '@/lib/quotes/auth';
import { adminDb } from '@/lib/quotes/db';
import { quotePdf } from '@/lib/quotes/pdf';
import { quoteNumber } from '@/lib/quotes/model';
import { syncQuote } from '@/lib/quotes/sync';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guard(request, true); if (denied) return denied;
  try {
    const { id } = await context.params;
    const input = z.object({ eventId: z.uuid() }).safeParse(await body(request));
    if (!z.uuid().safeParse(id).success || !input.success) return json({ error: 'Ungültige Anfrage.' }, 400);
    const db = adminDb();
    const { data: original, error: readError } = await db.from('rd_quotes').select('*').eq('id', id).maybeSingle();
    if (readError) throw readError;
    if (!original) return json({ error: 'Angebot nicht gefunden.' }, 404);
    // Generate first; failed generation must never increment the download counter.
    const pdf = await quotePdf(original);
    const { data, error } = await db.rpc('rd_record_pdf', { p_quote_id: id, p_event_id: input.data.eventId });
    if (error) throw error;
    const quote = await syncQuote(data);
    return new Response(Buffer.from(pdf), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${quoteNumber(quote)}.pdf"`, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'X-Sheet-Synced': quote.sheet_synced_version >= quote.version ? 'true' : 'false' } });
  } catch { return json({ error: 'PDF konnte nicht bereitgestellt werden. Das gespeicherte Angebot bleibt erhalten.' }, 503); }
}
