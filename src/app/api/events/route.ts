import { NextResponse } from 'next/server';
import { eventSchema, readJson } from '@/lib/submission';
import { persistToSheets } from '@/lib/sheets';
export async function POST(request: Request) {
  try {
    const result = eventSchema.safeParse(await readJson(request, 8000));
    if (!result.success) return NextResponse.json({ ok: false }, { status: 400 });
    const event = result.data;
    if (!['phone_click', 'email_click'].includes(event.eventName) || !event.occurredAt) {
      return NextResponse.json({ ok: true, eventId: event.eventId, ignored: true, storage: 'analytics_only' });
    }
    const time = event.occurredAt ? Date.parse(event.occurredAt) : Date.now();
    if (time < Date.now() - 7 * 86400000 || time > Date.now() + 300000) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const receipt = await persistToSheets({ ...event, recordType: 'event' }, event.eventId);
    // A receiver still running the retired queue version must not discard clicks.
    if (receipt.ignored || receipt.storage !== 'main_sheet') throw new Error('click_not_saved');
    return NextResponse.json({ ok: true, stored: true, eventId: event.eventId, storage: 'main_sheet' });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
