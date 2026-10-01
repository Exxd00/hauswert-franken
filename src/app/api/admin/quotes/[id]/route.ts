import { z } from 'zod';
import { body, guard, json } from '@/lib/quotes/auth';
import { adminDb } from '@/lib/quotes/db';
import { syncQuote } from '@/lib/quotes/sync';
export const maxDuration = 60;
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guard(request, true); if (denied) return denied;
  try {
    const { id } = await context.params;
    const input = z.object({ status: z.enum(['offen', 'angenommen', 'abgelehnt', 'archiviert']), version: z.number().int().positive() }).safeParse(await body(request));
    if (!z.uuid().safeParse(id).success || !input.success) return json({ error: 'Ungültige Eingabe.' }, 400);
    const { data, error } = await adminDb().from('rd_quotes').update({ status: input.data.status, version: input.data.version + 1, updated_at: new Date().toISOString() }).eq('id', id).eq('version', input.data.version).select('*').maybeSingle();
    if (error) throw error;
    if (!data) return json({ error: 'Das Angebot wurde inzwischen geändert. Bitte Liste neu laden.' }, 409);
    const { input_hash: _hash, ...safe } = data;
    return json({ quote: await syncQuote(safe) });
  } catch { return json({ error: 'Status konnte nicht gespeichert werden.' }, 503); }
}
