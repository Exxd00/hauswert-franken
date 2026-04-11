'use client';

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Familie Müller',
    location: 'Nürnberg',
    text: 'Perfekte Arbeit! Die Badsanierung wurde pünktlich fertiggestellt und sieht fantastisch aus. Das Team war immer freundlich und hat sehr sauber gearbeitet.',
    rating: 5,
  },
  {
    name: 'Thomas Weber',
    location: 'Fürth',
    text: 'Sehr professionelles Team. Die Kommunikation war hervorragend und das Ergebnis übertrifft unsere Erwartungen. Preis-Leistung stimmt absolut.',
    rating: 5,
  },
  {
    name: 'Sandra Hoffmann',
    location: 'Erlangen',
    text: 'Von der Beratung bis zur Fertigstellung alles top. Würde RD Bau jederzeit weiterempfehlen! Unsere Kernsanierung wurde perfekt umgesetzt.',
    rating: 5,
  },
  {
    name: 'Michael Schmidt',
    location: 'Bamberg',
    text: 'Die Professionalität merkt man sofort. Termingerecht, sauber und zu einem fairen Preis. Absolut empfehlenswert!',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-stone-50 to-white dark:from-stone-900 dark:to-stone-950"
      aria-labelledby="testimonials-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/50 dark:from-amber-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-stone-200/50 dark:from-stone-800/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Kundenbewertungen
          </div>
          <h2 id="testimonials-heading" className="text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-white mb-4 tracking-tight">
            Was unsere Kunden
            <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              über uns sagen
            </span>
          </h2>
          <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400">
            Qualität, die überzeugt – zufriedene Kunden in ganz Franken
          </p>
        </div>

        {/* Testimonial Card */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-100 dark:border-stone-700 p-6 sm:p-10 lg:p-12 shadow-xl shadow-stone-200/50 dark:shadow-stone-900/50">
            {/* Header with Arrows */}
            <div className="flex items-center justify-between mb-8">
              {/* Google Rating Badge */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-stone-600 dark:text-stone-300 font-semibold">5.0</span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 flex items-center justify-center transition-all duration-300 active:scale-95"
                  aria-label="Vorherige Bewertung"
                >
                  <svg className="w-5 h-5 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 flex items-center justify-center transition-all duration-300 active:scale-95"
                  aria-label="Nächste Bewertung"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="relative min-h-[180px] sm:min-h-[150px]">
              <div className="transition-all duration-500">
                {/* Quote Icon */}
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg sm:text-xl lg:text-2xl text-stone-700 dark:text-stone-200 leading-relaxed mb-8 font-medium">
                  "{currentTestimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-amber-500/30">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 dark:text-white text-base sm:text-lg">{currentTestimonial.name}</p>
                    <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8 pt-6 border-t border-stone-100 dark:border-stone-700">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? 'w-10 h-2.5 bg-amber-500'
                      : 'w-2.5 h-2.5 bg-stone-200 dark:bg-stone-600 hover:bg-stone-300'
                  }`}
                  aria-label={`Bewertung ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mt-12 sm:mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 dark:text-white">
              10<span className="text-amber-500">+</span>
            </div>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">Jahre Erfahrung</div>
          </div>
          <div className="text-center border-l border-r border-stone-200 dark:border-stone-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 dark:text-white">
              100<span className="text-amber-500">%</span>
            </div>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">Zufriedenheit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 dark:text-white">
              5.0
            </div>
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">Google Bewertung</div>
          </div>
        </div>
      </div>
    </section>
  );
}
