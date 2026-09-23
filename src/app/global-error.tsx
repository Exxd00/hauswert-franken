'use client';
import { ContactFallback } from '@/components/ContactFallback';
export default function GlobalError({ reset }: { reset: () => void }) {
  return <html lang="de"><head><title>RD Frankenbau | Kontakt</title><meta name="robots" content="noindex, follow" /></head><body><ContactFallback reset={reset} /></body></html>;
}
