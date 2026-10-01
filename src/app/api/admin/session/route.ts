import { NextResponse } from 'next/server';
import { allowLogin, body, constantEqual, COOKIE, createSession, json, sameOrigin, SESSION_SECONDS } from '@/lib/quotes/auth';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Ungültige Anfrage.' }, 403);
  try {
    if (!process.env.ADMIN_PASSWORD || !(process.env.ADMIN_SESSION_SECRET?.length && process.env.ADMIN_SESSION_SECRET.length >= 32)) throw new Error('configuration');
    if (!(await allowLogin(request))) return json({ error: 'Zu viele Versuche. Bitte in 15 Minuten erneut versuchen.' }, 429);
    const input = await body(request);
    if (typeof input.password !== 'string' || input.password.length > 256 || !constantEqual(input.password, process.env.ADMIN_PASSWORD)) return json({ error: 'Das Passwort stimmt nicht.' }, 401);
    const response = json({ ok: true });
    response.cookies.set(COOKIE, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: SESSION_SECONDS });
    return response;
  } catch { return json({ error: 'Anmeldung derzeit nicht verfügbar. Bitte die Server-Verbindung prüfen.' }, 503); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Ungültige Anfrage.' }, 403);
  const response: NextResponse = json({ ok: true });
  response.cookies.set(COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}
