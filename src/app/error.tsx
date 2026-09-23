'use client';
import { ContactFallback } from '@/components/ContactFallback';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <ContactFallback reset={reset} />;
}
