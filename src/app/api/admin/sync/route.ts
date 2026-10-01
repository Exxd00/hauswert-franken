import { constantEqual, guard, json } from '@/lib/quotes/auth';
import { syncPending } from '@/lib/quotes/sync';
export const maxDuration = 60;
async function run() { try { return json(await syncPending()); } catch { return json({ error: 'Synchronisierung derzeit nicht verfügbar.' }, 503); } }
export async function POST(request: Request) { const denied = await guard(request, true); return denied || run(); }
export async function GET(request: Request) {
  const key = process.env.CRON_SECRET;
  if (!key || !constantEqual(request.headers.get('authorization') || '', `Bearer ${key}`)) return json({ error: 'Unauthorized' }, 401);
  return run();
}
