// Analytics Events for Conversion Tracking

type EventName =
  | 'form_submit'
  | 'thank_you_page'
  | 'phone_click'
  | 'cta_click'
  | 'image_upload'
  | 'project_request_start'
  | 'service_view'
  | 'project_view'
  | 'contact_form_open';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// Track custom events
export function trackEvent(eventName: EventName, params?: EventParams): void {
  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${eventName}`, params);
  }
}

// Track page views
export function trackPageView(url: string, title?: string): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
      page_title: title,
    });
  }
}

// Track form submission
export function trackFormSubmit(formType: string, formData?: Record<string, string>): void {
  trackEvent('form_submit', {
    form_type: formType,
    ...formData,
  });
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, ctaLocation: string): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
}

// Track phone clicks
export function trackPhoneClick(phoneNumber: string): void {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
  });
}

// Track image uploads
export function trackImageUpload(imageCount: number): void {
  trackEvent('image_upload', {
    image_count: imageCount,
  });
}

// Track project request start
export function trackProjectRequestStart(): void {
  trackEvent('project_request_start');
}
