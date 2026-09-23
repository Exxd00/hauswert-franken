'use client';
import type { eventNames } from '@/lib/submission';
type EventName = typeof eventNames[number];
type Attribution = { landingPath: string; referrerHost: string; utmSource: string; utmMedium: string; utmCampaign: string };
const consentKey = 'rd_statistics_consent';
const queueKey = 'rd_event_queue_v2';
const clickPrefix = 'rd_contact_click_v1:';
type ContactClick = { eventId: string; eventName: 'phone_click' | 'email_click'; occurredAt: string; path: string; entryPoint: string; service: string; attribution: Attribution };
const pendingClicks = new Map<string, ContactClick>();
let flushingClicks = false;
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
  if (value === 'no') { clearContactClicks(); try { localStorage.removeItem(queueKey); sessionStorage.removeItem('rd_attribution'); } catch {} }
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
function removeClick(id: string) {
  pendingClicks.delete(id);
  try { localStorage.removeItem(clickPrefix + id); } catch { /* Memory fallback. */ }
}
function storedClickKeys(): string[] {
  try { return Object.keys(localStorage).filter(key => key.startsWith(clickPrefix)); } catch { return []; }
}
function clearContactClicks() {
  pendingClicks.clear();
  for (const key of storedClickKeys()) { try { localStorage.removeItem(key); } catch {} }
}
export async function flushContactClicks() {
  if (typeof window === 'undefined' || consentValue() !== 'yes' || flushingClicks) return;
  for (const key of storedClickKeys()) {
    try {
      const event = JSON.parse(localStorage.getItem(key) || 'null') as ContactClick | null;
      if (!event || key !== clickPrefix + event.eventId || !['phone_click','email_click'].includes(event.eventName) || !Number.isFinite(Date.parse(event.occurredAt))) {
        localStorage.removeItem(key); continue;
      }
      pendingClicks.set(event.eventId, event);
    } catch { /* Keep the current-page memory copy if storage is inaccessible. */ }
  }
  flushingClicks = true;
  try {
    for (const event of [...pendingClicks.values()]) {
      if (consentValue() !== 'yes') break;
      if (Date.parse(event.occurredAt) < Date.now() - 7 * 86400000) { removeClick(event.eventId); continue; }
      try {
        const response = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event), keepalive: true, signal: AbortSignal.timeout(30000) });
        const receipt = await response.json();
        if (!response.ok || receipt.stored !== true || receipt.eventId !== event.eventId || receipt.storage !== 'main_sheet') break;
        removeClick(event.eventId);
      } catch { break; /* Retry on reconnect, the next page load or the next interval. */ }
    }
  } finally { flushingClicks = false; }
}
export function recordEvent(eventName: EventName, params: { entryPoint?: string; service?: string; submissionId?: string } = {}) {
  if (typeof window === 'undefined' || consentValue() !== 'yes' || window.location.pathname.startsWith('/admin')) return;
  const key=eventName+window.location.pathname;
  if(key===lastEvent && Date.now()-lastAt<700) return;
  lastEvent=key; lastAt=Date.now();
  if (eventName === 'phone_click' || eventName === 'email_click') {
    const event: ContactClick = { eventId: crypto.randomUUID(), eventName, occurredAt: new Date().toISOString(), path: window.location.pathname.slice(0,300), entryPoint: (params.entryPoint || '').slice(0,80), service: (params.service || '').slice(0,100), attribution: attribution() };
    pendingClicks.set(event.eventId, event);
    // One key per click prevents tabs from overwriting each other's pending queue.
    try { localStorage.setItem(clickPrefix + event.eventId, JSON.stringify(event)); } catch { /* Retry from memory for this page if storage is full or blocked. */ }
    void flushContactClicks();
  }
  // No contact fields, free text, full URLs or attachments are sent to GA4.
  window.gtag?.('event','rd_'+eventName,{entry_point:(params.entryPoint || '').slice(0,80),service:(params.service || '').slice(0,100)});
}

export function reportLeadSuccess(submissionId: string, service: string) {
  if (consentValue() !== 'yes') return;
  window.gtag?.('event','rd_form_submit_success',{service});
  recordEvent('thank_you_page',{submissionId,service,entryPoint:'contact_form'});
}
