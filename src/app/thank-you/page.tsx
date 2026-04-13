'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { trackEvent, trackPhoneClick } from '@/lib/utils/analytics';

export default function ThankYouPage() {
  useEffect(() => {
    // Track thank you page view for conversion tracking
    trackEvent('thank_you_page');
  }, []);

  return (
    <>
      {/* No-index meta tag */}
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <Header />
      <main className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-6 animate-fade-up">
              Vielen Dank für Ihre Anfrage
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-up delay-100">
              Wir haben Ihre Projektanfrage erhalten und werden uns innerhalb von
              <span className="text-foreground font-semibold"> 24 Stunden </span>
              bei Ihnen melden.
            </p>

            {/* What Happens Next */}
            <div className="bg-secondary/30 rounded-2xl p-8 mb-8 text-left animate-fade-up delay-200">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Was passiert als Nächstes?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Prüfung Ihrer Anfrage</p>
                    <p className="text-sm text-muted-foreground">Wir analysieren Ihre Projektbeschreibung sorgfältig.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Persönliche Kontaktaufnahme</p>
                    <p className="text-sm text-muted-foreground">Ein Mitarbeiter meldet sich telefonisch oder per E-Mail bei Ihnen.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Terminvereinbarung</p>
                    <p className="text-sm text-muted-foreground">Wir vereinbaren einen Besichtigungstermin vor Ort.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-8 animate-fade-up delay-300">
              <p className="text-muted-foreground mb-4">
                Sie möchten nicht warten? Rufen Sie uns direkt an:
              </p>
              <a
                href="tel:+4917635589478"
                className="inline-flex items-center gap-3 text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
                onClick={() => trackPhoneClick('0176 35589478')}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0176 35589478
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                Oder per E-Mail: <a href="mailto:Info@rd-frankenbau.de" className="text-primary hover:underline">Info@rd-frankenbau.de</a>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Zur Startseite
                </Button>
              </Link>
              <Link href="/projekte">
                <Button size="lg" className="w-full sm:w-auto">
                  Unsere Projekte ansehen
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
