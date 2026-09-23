import { z } from 'zod';

const text = (max: number) => z.string().trim().max(max).default('');
export const eventNames = ['form_start', 'service_select', 'form_submit_attempt', 'form_submit_success', 'form_submit_error', 'upload_error', 'phone_click', 'email_click', 'cta_click', 'thank_you_page', 'service_view', 'project_view'] as const;
export const attributionSchema = z.object({
  landingPath: text(300), referrerHost: text(200), utmSource: text(150),
  utmMedium: text(150), utmCampaign: text(150),
}).default({ landingPath: '', referrerHost: '', utmSource: '', utmMedium: '', utmCampaign: '' });
export const contactSchema = z.object({
  submissionId: z.string().uuid(), phase: z.enum(['capture', 'complete', 'upload_failed']),
  consent: z.literal(true),
  projektArt: z.string().trim().min(1).max(120), immobilienTyp: z.string().trim().min(1).max(120),
  ort: z.string().trim().min(1).max(200),
  objektgroesse: text(100), zeitrahmen: text(100), budgetrahmen: text(100),
  vorname: z.string().trim().min(1).max(100), nachname: text(150),
  email: z.string().trim().email().max(254), telefon: z.string().trim().min(5).max(60), nachricht: text(6000),
  fileUrls: z.array(z.string().url().max(1500).refine(v => v.startsWith('https://'))).max(5).default([]),
  fileNames: z.array(z.string().max(200)).max(5).default([]),
  failedFiles: z.array(z.string().max(200)).max(5).default([]),
  attribution: attributionSchema, website: z.string().max(0).optional(),
});
export type ContactPayload = z.infer<typeof contactSchema>;
export const eventSchema = z.object({
  eventId: z.string().uuid(), eventName: z.enum(eventNames), submissionId: z.string().uuid().optional(),
  occurredAt: z.string().datetime().optional(),
  path: z.string().startsWith('/').max(300), entryPoint: text(80), service: text(100), attribution: attributionSchema,
});

export async function readJson(request: Request, limit = 32000): Promise<unknown> {
  const site = request.headers.get('sec-fetch-site');
  const origin = request.headers.get('origin');
  if ((site && !['same-origin', 'none'].includes(site)) || (origin && origin !== new URL(request.url).origin)) throw new Error('forbidden');
  if (Number(request.headers.get('content-length')) > limit) throw new Error('too_large');
  const body = await request.text();
  if (body.length > limit) throw new Error('too_large');
  return JSON.parse(body);
}
