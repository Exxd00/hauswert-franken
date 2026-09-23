import { NextResponse } from 'next/server';
import { eventSchema, readJson } from '@/lib/submission';
export async function POST(request: Request) {
  try {
    const result = eventSchema.safeParse(await readJson(request, 8000));
    if (!result.success) return NextResponse.json({ ok: false }, { status: 400 });
    // Older tabs may still drain their queue. Acknowledge retirement explicitly;
    // analytics no longer create rows or tabs in the customer spreadsheet.
    return NextResponse.json({ ok: true, eventId: result.data.eventId, ignored: true, storage: 'analytics_only' });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
