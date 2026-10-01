import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { defaultSettings, settingsSchema } from './model';

export function adminDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('database_configuration');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (url, init) => fetch(url, { ...init, cache: 'no-store', signal: AbortSignal.timeout(10000) }) } });
}
export async function readSettings() {
  const { data, error } = await adminDb().from('rd_admin_settings').select('data,version').eq('id', true).single();
  if (error || !data) throw new Error('database_unavailable');
  return { settings: settingsSchema.parse(Object.keys(data.data).length ? data.data : defaultSettings), version: data.version as number };
}
