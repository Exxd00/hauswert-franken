'use client';
import type { eventNames } from '@/lib/submission';
type EventName = typeof eventNames[number];
type Attribution = { landingPath: string; referrerHost: string; utmSource: string; utmMedium: string; utmCampaign: string };
const consentKey = 'rd_statistics_consent';
const queueKey = 'rd_event_queue_v2';
let lastEvent = '';
let lastAt = 0;
let consentMemory: string | null = null;
declare global { interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[]; } }
export function consentValue(): string | null {
  try { return localStorage.getItem(consentKey) || consentMemory; } catch { return consentMemory; }
}
export function setConsent(value: 'yes' | 'no') {
  consentMemory = value;
  (window as unknown as Record<string, unknown>)['ga-disable-G-SX3GXK901G'] = value !== 'yes';
  try { localStorage.setItem(consentKey,value); } catch { /* Use current-page preference. */ }
  if (value === 'no') { try { localStorage.removeItem(queueKey); sessionStorage.removeItem('rd_attribution'); } catch {} }
  window.dispatchEvent(new Event('rd-consent'));
}
export function attribution(): Attribution {
  const empty = { landingPath: window.location.pathname, referrerHost: '', utmSource: '', utmMedium: '', utmCampaign: '' };
  if (consentValue() !== 'yes') return empty;
  try {
    const stored = sessionStorage.getItem('rd_attribution');
    if (stored) return JSON.parse(stored);
    const query = new URLSearchParams(window.location.search);
    const value = { ...empty, referrerHost: document.referrer ? new URL(document.referrer).hostname : '', utmSource: (query.get('utm_source') || '').slice(0,150), utmMedium: (query.get('utm_medium') || '').slice(0,150), utmCampaign: (query.get('utm_campaign') || '').slice(0,150) };
    sessionStorage.setItem('rd_attribution', JSON.stringify(value)); return value;
  } catch { return empty; }
}
export function clearLegacyEventQueue() {
  try { localStorage.removeItem(queueKey); } catch { /* Storage can be unavailable. */ }
}
export function recordEvent(eventName: EventName, params: { entryPoint?: string; service?: string; submissionId?: string } = {}) {
  if (typeof window === 'undefined' || consentValue() !== 'yes' || window.location.pathname.startsWith('/admin')) return;
  const key=eventName+window.location.pathname;
  if(key===lastEvent && Date.now()-lastAt<700) return;
  lastEvent=key; lastAt=Date.now();
  // No contact fields, free text, full URLs or attachments are sent to GA4.
  window.gtag?.('event','rd_'+eventName,{entry_point:(params.entryPoint || '').slice(0,80),service:(params.service || '').slice(0,100)});
}

export function reportLeadSuccess(submissionId: string, service: string) {
  if (consentValue() !== 'yes') return;
  window.gtag?.('event','rd_form_submit_success',{service});
  recordEvent('thank_you_page',{submissionId,service,entryPoint:'contact_form'});
}
