import { recordEvent } from '@/lib/measurement';
type Params = Record<string, string | number | boolean | undefined>;
export function trackEvent(name: string, params: Params = {}) {
  if (name === 'thank_you_page') return; // Only confirmed submissions emit success.
  if (name === 'phone_click') recordEvent('phone_click');
  if (name === 'cta_click') recordEvent('cta_click',{entryPoint:String(params.cta_location || '')});
}
export function trackFormSubmit(_form: string, _data?: Record<string,string>) { /* Persisted by the contact API. */ }
export function trackCTAClick(_name: string, location: string) { recordEvent('cta_click',{entryPoint:location}); }
export function trackPhoneClick(_number: string) { recordEvent('phone_click'); }
export function trackImageUpload(_count: number) { /* File names stay out of analytics. */ }
export function trackProjectRequestStart() { recordEvent('form_start'); }
export function trackPageView(_url: string, _title?: string) { /* Page metrics are managed by the consent provider. */ }
