'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/utils/analytics';

const uniqueFeatures = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    highlight: 'Premium',
    title: 'Meisterqualität',
    description: 'Höchste Handwerkskunst',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    highlight: 'Festpreis',
    title: 'Keine Überraschungen',
    description: 'Keine versteckten Kosten',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    highlight: 'Blitzschnell',
    title: 'Antwort in 24h',
    description: 'Garantiert am selben Tag',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    highlight: 'Regional',
    title: 'Ihr Nachbar',
    description: 'Aus Franken, für Franken',
  },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
          alt="Premium Immobilie"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f2e]/95 via-[#1a1f2e]/85 to-[#1a1f2e]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-[#1a1f2e]/30" />
      </div>

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="container-custom relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[100vh] flex items-center">
        <div className="w-full max-w-6xl">

          {/* Top Badge */}
          <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-amber-600" />
              <span className="text-sm font-medium text-amber-500 tracking-[0.15em] uppercase">
                Sanierung · Modernisierung · Qualität
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`mb-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.1] tracking-[-0.02em]">
              Wir steigern den Wert
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white/60 leading-[1.1] tracking-[-0.02em] mt-2">
              Ihrer Immobilie.
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg sm:text-xl text-white/50 leading-relaxed mb-12 max-w-2xl transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Hochwertige Sanierung und Modernisierung in Franken.
            Von der Badsanierung bis zur Komplettsanierung –
            <span className="text-white/70"> strukturiert, termingerecht, in Meisterqualität.</span>
          </p>

          {/* CTA Section */}
          <div className={`flex flex-col sm:flex-row items-start gap-4 mb-16 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="px-8 py-6 text-base bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                onClick={() => trackCTAClick('Beratung anfordern', 'hero')}
              >
                Kostenlose Beratung
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/projekte">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300"
                onClick={() => trackCTAClick('Projekte ansehen', 'hero')}
              >
                Unsere Projekte
              </Button>
            </Link>
          </div>

          {/* Marketing Features - Compact Cards */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 max-w-4xl transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {uniqueFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-3 sm:p-4 lg:p-5 bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/[0.12] hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon + Highlight Row - Mobile: Compact */}
                <div className="flex items-center gap-2 sm:block">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white sm:mb-3 lg:mb-4 shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:shadow-amber-500/40 transition-all duration-300 flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 [&>svg]:w-full [&>svg]:h-full">
                      {feature.icon}
                    </div>
                  </div>
                  {/* Mobile: Highlight next to icon */}
                  <div className="text-amber-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase sm:mb-1">
                    {feature.highlight}
                  </div>
                </div>

                {/* Title */}
                <div className="text-white font-bold text-sm sm:text-base lg:text-lg mt-2 sm:mt-0 sm:mb-1 lg:mb-2 leading-tight">
                  {feature.title}
                </div>

                {/* Description - Hidden on very small screens */}
                <p className="text-white/50 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Trust Badges - Bottom */}
          <div className={`mt-12 sm:mt-16 pt-8 border-t border-white/10 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              {[
                { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', label: 'Transparente Abrechnung' },
                { icon: 'M5 13l4 4L19 7', label: 'Termingerecht' },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Persönliche Beratung' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/40 text-sm">
                  <svg className="w-4 h-4 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-amber-500/80 animate-scroll-line" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
          51% { transform: translateY(-100%); }
          100% { transform: translateY(-100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
