'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackPhoneClick } from '@/lib/utils/analytics';

const footerLinks = {
  leistungen: [
    { name: 'Kernsanierung', href: '/leistung/kernsanierung' },
    { name: 'Badsanierung', href: '/leistung/badsanierung' },
    { name: 'Modernisierung', href: '/leistung/modernisierung' },
    { name: 'Trockenbau', href: '/leistung/trockenbau' },
    { name: 'Alle Leistungen', href: '/leistungen' },
  ],
  unternehmen: [
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Projekte', href: '/projekte' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  regionen: [
    { name: 'Nürnberg', href: '/nuernberg' },
    { name: 'Fürth', href: '/fuerth' },
    { name: 'Erlangen', href: '/erlangen' },
    { name: 'Bamberg', href: '/bamberg' },
    { name: 'Würzburg', href: '/wuerzburg' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
};

const trustBadges = [
  { label: 'Meisterbetrieb', icon: '⭐' },
  { label: 'Faire Preise', icon: '💰' },
  { label: 'Top Qualität', icon: '✓' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePhoneClick = () => {
    trackPhoneClick('+49 174 2629258');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden" role="contentinfo">
      {/* Premium CTA Banner */}
      <div className="relative bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className={`container-custom py-16 lg:py-20 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Bereit für Ihre
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Traumimmobilie?
                </span>
              </h3>
              <p className="text-white/70 text-lg">
                Starten Sie jetzt Ihr Projekt mit unserer kostenlosen Erstberatung.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kontakt">
                <Button
                  size="lg"
                  className="px-8 py-7 text-base rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 group"
                >
                  <span>Projekt anfragen</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <a href="tel:+491742629258" onClick={handlePhoneClick}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-7 text-base rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Jetzt anrufen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#0f0f0f] text-white relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-bl from-stone-800/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-stone-800/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container-custom pt-20 pb-12 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <Link href="/" className="inline-flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-stone-700 via-stone-800 to-stone-700 flex items-center justify-center shadow-xl border border-stone-600/30">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M3 9.5L12 4L21 9.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 20V14H15V20" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-[#0f0f0f]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">RD Bau</span>
                  <span className="text-xs text-white/50 tracking-[0.25em] uppercase font-medium">Franken</span>
                </div>
              </Link>

              <p className="text-white/60 leading-relaxed max-w-sm">
                Hochwertige Sanierung, Modernisierung und Innenausbau in Franken.
                Wir steigern den Wert Ihrer Immobilie mit Struktur, Qualität und Zuverlässigkeit.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm"
                  >
                    <span>{badge.icon}</span>
                    <span className="text-white/70">{badge.label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Links Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Leistungen
                </h3>
                <ul className="space-y-3">
                  {footerLinks.leistungen.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Unternehmen
                </h3>
                <ul className="space-y-3">
                  {footerLinks.unternehmen.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2 mt-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Rechtliches
                </h3>
                <ul className="space-y-3">
                  {footerLinks.rechtliches.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Regionen
                </h3>
                <ul className="space-y-3">
                  {footerLinks.regionen.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-rose-400 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-rose-500 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter & Contact Column */}
            <div className="lg:col-span-3 space-y-8">
              {/* Newsletter */}
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">Newsletter</h3>
                <p className="text-sm text-white/60 mb-4">
                  Tipps & Inspirationen für Ihr Zuhause
                </p>

                {isSubscribed ? (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Erfolgreich angemeldet!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Ihre E-Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        'Anmelden'
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href="tel:+491742629258"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  onClick={handlePhoneClick}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Telefon</p>
                    <span className="font-semibold text-white">+49 174 2629258</span>
                  </div>
                </a>

                <a
                  href="mailto:info@rd-frankenbau.de"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">E-Mail</p>
                    <span className="font-semibold text-white text-sm">info@rd-frankenbau.de</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Adresse</p>
                    <address className="font-semibold text-white text-sm not-italic">
                      Hans Bunte Straße 26<br />
                      90431 Nürnberg
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-custom py-8">
            <div className={`flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <p className="text-sm text-white/40">
                  © 2023 RD Frankenbau. Alle Rechte vorbehalten.
                </p>
                <div className="hidden md:block w-px h-4 bg-white/20" />
                <p className="text-sm text-white/40">
                  Meisterqualität aus Franken
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/40">
                <span>Mit</span>
                <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>gemacht in Nürnberg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
