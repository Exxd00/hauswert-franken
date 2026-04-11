'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { trackCTAClick } from '@/lib/utils/analytics';

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Projekte', href: '/projekte' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Set active link based on current path
    setActiveLink(window.location.pathname);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (ctaName: string) => {
    trackCTAClick(ctaName, 'header');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl shadow-lg shadow-stone-200/20 dark:shadow-stone-900/50 border-b border-stone-100 dark:border-stone-800'
          : 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md'
      }`}
    >
      <nav className="container-custom" aria-label="Hauptnavigation">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Premium Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="RD Bau - Zur Startseite"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-13 lg:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-stone-300/30 dark:shadow-stone-900/50">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M3 9.5L12 4L21 9.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 20V14H15V20" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Accent dot */}
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white dark:border-stone-900 shadow-sm" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-stone-800 dark:text-white group-hover:text-amber-500 transition-colors">
                RD Bau
              </span>
              <span className="text-[8px] sm:text-[10px] lg:text-xs -mt-0.5 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium text-stone-500 dark:text-stone-400">
                Franken
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-full p-1.5 shadow-sm">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      activeLink === item.href
                        ? 'text-white bg-stone-900 dark:bg-white dark:text-stone-900 shadow-md'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-stone-700/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 ml-6">
              {/* Theme Toggle */}
              <ThemeToggle />

              <a href="tel:+4917635589478">
                <Button
                  className="text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-900 rounded-full px-6 py-5 shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all duration-300 group"
                  onClick={() => handleCTAClick('Jetzt anrufen')}
                >
                  <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0176 35589478
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile: Theme Toggle and Menu Button */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200/90 dark:hover:bg-stone-700/90 transition-colors"
                  aria-label="Menü öffnen"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700 dark:text-stone-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l-0">
                <div className="flex flex-col h-full bg-gradient-to-b from-white to-stone-50 dark:from-stone-900 dark:to-stone-950">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-stone-100 dark:border-stone-800">
                    <Link
                      href="/"
                      className="flex items-center gap-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 flex items-center justify-center shadow-lg">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M3 9.5L12 4L21 9.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-stone-800 dark:text-white">RD Bau</span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 -mt-0.5 tracking-[0.2em] uppercase font-medium">Franken</span>
                      </div>
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-6 overflow-y-auto">
                    <ul className="space-y-2">
                      {navigation.map((item, index) => (
                        <li key={item.name} style={{ animationDelay: `${index * 50}ms` }}>
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between px-5 py-4 text-base font-medium rounded-2xl transition-all duration-300 ${
                              activeLink === item.href
                                ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-lg'
                                : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                            <svg className={`w-5 h-5 ${activeLink === item.href ? 'text-amber-400 dark:text-amber-500' : 'text-stone-400 dark:text-stone-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="p-6 border-t border-stone-100 dark:border-stone-800 space-y-3 bg-white dark:bg-stone-900">
                    <Link href="/kontakt" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-center rounded-2xl py-6 text-base font-semibold border-2 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                      >
                        Beratung anfordern
                      </Button>
                    </Link>
                    <Link href="/kontakt" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        className="w-full justify-center rounded-2xl py-6 text-base font-semibold bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 dark:from-amber-500 dark:via-orange-500 dark:to-amber-500 shadow-lg"
                      >
                        Projekt anfragen
                        <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Button>
                    </Link>
                  </div>

                  {/* Contact Info */}
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-2xl">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-stone-500 dark:text-stone-400 text-xs">Rufen Sie uns an</p>
                          <a href="tel:+4917635589478" className="font-semibold text-stone-800 dark:text-white">0176 35589478</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
