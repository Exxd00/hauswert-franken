import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema, readJson } from '@/lib/submission';
import { persistToSheets } from '@/lib/sheets';

export const maxDuration = 60;

export async function POST(request: Request) {
  let raw: unknown;
  try { raw = await readJson(request); }
  catch (error) {
    const code = error instanceof Error ? error.message : '';
    return NextResponse.json({ success: false, error: 'Ungültige Anfrage.' }, { status: code === 'forbidden' ? 403 : code === 'too_large' ? 413 : 400 });
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ success: false, error: 'Bitte prüfen Sie die Pflichtfelder und Ihre Einwilligung.' }, { status: 400 });
  const data = parsed.data;
  try {
    // Always persist the contact record before uploads or email delivery.
    const receipt = await persistToSheets({ recordType: 'lead', ...data }, data.submissionId);
    if (data.phase !== 'complete') return NextResponse.json({ success: true, saved: true, submissionId: data.submissionId });
    if (receipt.emailStatus === 'sent') return NextResponse.json({ success: true, saved: true, emailStatus: 'sent', submissionId: data.submissionId });
    let emailStatus = 'failed';
    try {
      if (!process.env.RESEND_API_KEY) throw new Error('email_unavailable');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: 'RD Frankenbau <info@rd-frankenbau.de>',
        to: process.env.CONTACT_EMAIL || 'info@rd-frankenbau.de',
        replyTo: data.email,
        subject: `Neue Projektanfrage: ${data.projektArt} (${data.ort})`,
        text: [
          `Anfrage-ID: ${data.submissionId}`, `${data.vorname} ${data.nachname}`,
          `E-Mail: ${data.email}`, `Telefon: ${data.telefon}`, `Ort: ${data.ort}`,
          `Leistung: ${data.projektArt}`, `Immobilie: ${data.immobilienTyp}`,
          `Größe: ${data.objektgroesse}`, `Budget: ${data.budgetrahmen}`,
          `Zeitrahmen: ${data.zeitrahmen}`, '', data.nachricht,
          '', 'Dateien:', ...data.fileUrls,
          '', 'Die Anfrage ist bereits im Google Sheet gespeichert.',
        ].join('\n'),
      }, { idempotencyKey: `rd-contact/${data.submissionId}` });
      if (!result.error) emailStatus = 'sent';
    } catch { /* The lead remains available when email is unavailable. */ }
    try {
      await persistToSheets({ recordType: 'delivery', submissionId: data.submissionId, emailStatus }, data.submissionId);
    } catch { /* Existing row keeps its pending status, never disappears. */ }
    return NextResponse.json({ success: true, saved: true, emailStatus, submissionId: data.submissionId });
  } catch {
    return NextResponse.json({ success: false, saved: false, submissionId: data.submissionId, error: 'Die Speicherung konnte noch nicht bestätigt werden. Ihre Anfrage bleibt auf diesem Gerät für einen erneuten Versuch erhalten.' }, { status: 503 });
  }
}
