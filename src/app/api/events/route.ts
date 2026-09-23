import { NextResponse } from 'next/server';
import { eventSchema, readJson } from '@/lib/submission';
import { persistToSheets } from '@/lib/sheets';
export const maxDuration = 30;
export async function POST(request: Request) {
  try {
    const result = eventSchema.safeParse(await readJson(request, 8000));
    if (!result.success) return NextResponse.json({ ok: false }, { status: 400 });
    await persistToSheets({ recordType: 'event', ...result.data }, result.data.eventId);
    return NextResponse.json({ ok: true, eventId: result.data.eventId });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
