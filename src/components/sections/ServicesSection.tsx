'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { mainServices } from '@/lib/data/services';

const serviceIcons: Record<string, React.ReactNode> = {
  building: (
    <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  droplet: (
    <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-4.97 4.97-7 8.97-7 12a7 7 0 1014 0c0-3.03-2.03-7.03-7-12z" />
    </svg>
  ),
  home: (
    <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
};

const serviceColors = [
  { bg: 'from-amber-500 to-orange-600', light: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
  { bg: 'from-cyan-500 to-blue-600', light: 'bg-cyan-50 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400' },
  { bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
];

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.72;
      const newActiveCard = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(newActiveCard, mainServices.length - 1));
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.72;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#faf9f7] dark:bg-stone-900"
      aria-labelledby="services-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-amber-100/30 dark:from-amber-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tl from-stone-200/40 dark:from-stone-700/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className={`container-custom text-center max-w-3xl mx-auto mb-8 sm:mb-16 lg:mb-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 dark:bg-amber-500 animate-pulse" />
            Unsere Kernleistungen
          </div>
          <h2 id="services-heading" className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Spezialisiert auf
            <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Wertsteigerung
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
            Drei Leistungsbereiche, ein Ziel: Ihre Immobilie in besten Händen.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="sm:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {mainServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/leistung/${service.slug}`}
                className={`flex-shrink-0 w-[72vw] snap-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <article className={`relative h-full bg-white dark:bg-stone-800 rounded-2xl p-4 shadow-lg border-2 ${activeCard === index ? 'border-amber-400 dark:border-amber-500' : 'border-stone-100 dark:border-stone-700'} overflow-hidden transition-all duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[index].bg} opacity-[0.04] dark:opacity-[0.1]`} />

                  <span className="absolute -top-1 -right-1 text-[50px] font-black text-stone-100 dark:text-stone-700/50 select-none leading-none">
                    {index + 1}
                  </span>

                  <div className="relative flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${serviceColors[index].bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <div className="text-white">{serviceIcons[service.icon]}</div>
                    </div>
                    <h3 className="text-sm font-bold text-stone-800 dark:text-white leading-tight">
                      {service.name}
                    </h3>
                  </div>

                  <p className="relative text-xs text-stone-500 dark:text-stone-400 mb-3 line-clamp-2">
                    {service.shortDescription}
                  </p>

                  {service.features && (
                    <ul className="relative space-y-1.5 mb-3">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[11px] text-stone-600 dark:text-stone-300">
                          <span className={`flex-shrink-0 w-3.5 h-3.5 rounded-full ${serviceColors[index].light} ${serviceColors[index].text} flex items-center justify-center`}>
                            <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="relative flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700">
                    <span className="text-xs font-semibold text-stone-700 dark:text-white">Details</span>
                    <span className={`w-7 h-7 rounded-full bg-gradient-to-br ${serviceColors[index].bg} flex items-center justify-center shadow-sm`}>
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {mainServices.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToCard(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeCard === index
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-stone-300 dark:bg-stone-600'
                }`}
                aria-label={`Karte ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:block container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mainServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/leistung/${service.slug}`}
                className={`group block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <article className="relative h-full bg-white dark:bg-stone-800 rounded-3xl p-8 lg:p-10 shadow-sm border border-stone-100 dark:border-stone-700 hover:shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-stone-900/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[index].bg} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />

                  <span className="absolute -top-1 -right-1 text-[80px] lg:text-[120px] font-black text-stone-100 dark:text-stone-700/50 group-hover:text-stone-50 dark:group-hover:text-stone-700/70 transition-colors duration-500 select-none leading-none">
                    {index + 1}
                  </span>

                  <div className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${serviceColors[index].light} ${serviceColors[index].text} flex items-center justify-center mb-6 lg:mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    {serviceIcons[service.icon]}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${serviceColors[index].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {serviceIcons[service.icon]}
                    </div>
                  </div>

                  <h3 className="relative text-xl lg:text-2xl font-bold text-stone-800 dark:text-white mb-4 group-hover:text-stone-900 dark:group-hover:text-white transition-colors duration-300">
                    {service.name}
                  </h3>

                  <p className="relative text-base text-stone-500 dark:text-stone-400 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {service.features && (
                    <ul className="relative space-y-3 mb-8">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-300">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full ${serviceColors[index].light} ${serviceColors[index].text} flex items-center justify-center`}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="relative flex items-center gap-3 font-semibold text-base text-stone-800 dark:text-white group-hover:text-stone-900 dark:group-hover:text-white">
                    <span>Mehr erfahren</span>
                    <span className={`w-8 h-8 rounded-full ${serviceColors[index].light} flex items-center justify-center group-hover:translate-x-1 transition-all duration-300`}>
                      <svg className={`w-4 h-4 ${serviceColors[index].text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>

                  <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${serviceColors[index].bg} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 rounded-tl-full`} />
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* All Services Link */}
        <div className={`container-custom text-center mt-10 sm:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/leistungen">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm hover:border-stone-300 dark:hover:border-stone-600 hover:bg-white dark:hover:bg-stone-700 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-7 text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-200 transition-all duration-300 group"
            >
              <span>Alle Leistungen</span>
              <span className="ml-2 sm:ml-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center group-hover:bg-stone-200 dark:group-hover:bg-stone-600 group-hover:translate-x-1 transition-all">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
