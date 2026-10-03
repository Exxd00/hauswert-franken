import { body, guard, json } from '@/lib/quotes/auth';
import { adminDb, readSettings } from '@/lib/quotes/db';
import { settingsSchema } from '@/lib/quotes/model';
export async function GET(request: Request) {
  const denied = await guard(request); if (denied) return denied;
  try { return json(await readSettings()); }
  catch { return json({ error: 'Die Datenbank ist noch nicht verbunden. Einstellungen können erst danach gespeichert werden.' }, 503); }
}
export async function PUT(request: Request) {
  const denied = await guard(request, true); if (denied) return denied;
  try {
    const input = await body(request, 1_500_000);
    const parsed = settingsSchema.safeParse(input.settings);
    if (!parsed.success || !Number.isInteger(input.version) || input.version < 1) return json({ error: parsed.error?.issues[0]?.message || 'Einstellungen prüfen.' }, 400);
    const { data, error } = await adminDb().from('rd_admin_settings').update({ data: parsed.data, version: input.version + 1 }).eq('id', true).eq('version', input.version).select('version').maybeSingle();
    if (error) throw error;
    if (!data) return json({ error: 'Die Einstellungen wurden inzwischen geändert. Bitte neu laden.' }, 409);
    return json({ settings: parsed.data, version: data.version });
  } catch (error) {
    if (error instanceof Error && error.message === 'payload') return json({ error: 'Der Katalog ist zu groß. Bitte Leistungsbeschreibungen kürzen.' }, 413);
    if (error instanceof SyntaxError) return json({ error: 'Ungültige Einstellungen. Bitte neu laden.' }, 400);
    return json({ error: 'Einstellungen nicht gespeichert. Bitte erneut versuchen.' }, 503);
  }
}
