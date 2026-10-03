import 'server-only';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminDb } from './db';

export const COOKIE = 'rd_owner_session';
export const SESSION_SECONDS = 8 * 60 * 60;
function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32 || !process.env.ADMIN_PASSWORD) throw new Error('auth_configuration');
  // Changing the password also revokes all existing sessions.
  return createHmac('sha256', value).update(process.env.ADMIN_PASSWORD).digest();
}
export function constantEqual(a: string, b: string) {
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}
export function createSession() {
  const payload = `${Date.now() + SESSION_SECONDS * 1000}.${randomBytes(24).toString('hex')}`;
  return `${payload}.${createHmac('sha256', secret()).update(payload).digest('hex')}`;
}
export function validSession(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !/^\d{13}$/.test(parts[0]) || !/^[a-f0-9]{48}$/.test(parts[1]) || !/^[a-f0-9]{64}$/.test(parts[2])) return false;
    const expires = Number(parts[0]);
    if (expires <= Date.now() || expires > Date.now() + SESSION_SECONDS * 1000) return false;
    return constantEqual(parts[2], createHmac('sha256', secret()).update(parts.slice(0, 2).join('.')).digest('hex'));
  } catch { return false; }
}
export async function authenticated() { return validSession((await cookies()).get(COOKIE)?.value || ''); }
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    // Next's internal request URL can use the bind address behind a proxy.
    // Browsers cannot override Host; require it to match Origin exactly.
    return origin === new URL(request.url).origin ||
      (parsed.host === request.headers.get('host') && (parsed.protocol === 'https:' || (process.env.NODE_ENV === 'development' && parsed.protocol === 'http:')));
  } catch { return false; }
}
export function json(data: unknown, status = 200) { return NextResponse.json(data, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } }); }
export async function guard(request: Request, mutation = false) {
  if (mutation && !sameOrigin(request)) return json({ error: 'Ungültige Anfrage. Bitte die Seite neu laden.' }, 403);
  if (!(await authenticated())) return json({ error: 'Bitte erneut anmelden.' }, 401);
  return null;
}
export async function body(request: Request, maxBytes = 50_000) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new Error('payload');
  const raw = await request.text();
  if (Buffer.byteLength(raw, 'utf8') > maxBytes) throw new Error('payload');
  return JSON.parse(raw);
}
const localAttempts = new Map<string, { count: number; until: number }>();
export async function allowLogin(request: Request) {
  // Vercel supplies x-real-ip. Persisted buckets work across serverless instances.
  const ip = request.headers.get('x-real-ip') || 'unknown';
  const key = createHmac('sha256', secret()).update(ip).digest('hex');
  if (process.env.NODE_ENV === 'development' && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const old = localAttempts.get(key);
    const record = old && old.until > Date.now() ? old : { count: 0, until: Date.now() + 900000 };
    localAttempts.set(key, record); return ++record.count <= 10;
  }
  const { data, error } = await adminDb().rpc('rd_admin_login_attempt', { p_key: key });
  if (error) throw new Error('auth_unavailable');
  return data === true;
}
