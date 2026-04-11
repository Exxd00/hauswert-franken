'use client';

import { useState, useEffect } from 'react';

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const phoneNumberTel = '+4917635589478';

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Left side - Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 rounded-full shadow-lg shadow-stone-200/50 dark:shadow-stone-900/50 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 hover:shadow-xl transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Nach oben scrollen"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Right side - Call button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`tel:${phoneNumberTel}`}
          className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-110 animate-pulse-subtle"
          aria-label="Jetzt anrufen"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>

          {/* Tooltip on hover - Desktop only */}
          <span className="hidden sm:block absolute right-full mr-3 px-3 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            Anrufen
          </span>
        </a>
      </div>

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.3), 0 4px 6px -4px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 10px 25px -3px rgba(245, 158, 11, 0.5), 0 4px 10px -4px rgba(245, 158, 11, 0.5); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
