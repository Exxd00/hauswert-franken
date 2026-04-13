import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie RD Frankenbau für eine kostenlose Erstberatung. Sanierung, Modernisierung und Innenausbau in Nürnberg und Franken.',
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
