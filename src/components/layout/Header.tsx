'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { trackCTAClick } from '@/lib/utils/analytics';
import { majorCities, allCities, cityRegions } from '@/lib/data/cities';
import { mainServices, allServices } from '@/lib/data/services';

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Leistungen', href: '/leistungen', hasDropdown: true, type: 'services' },
  { name: 'Regionen', href: '/regionen', hasDropdown: true, type: 'cities' },
  { name: 'Projekte', href: '/projekte' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

// Get cities for mega menu - limit per region
const menuRegions = cityRegions.map(region => ({
  name: region.name,
  description: region.description,
  cities: region.cities.slice(0, 10)
}));

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    setActiveLink(window.location.pathname);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCTAClick = (ctaName: string) => {
    trackCTAClick(ctaName, 'header');
  };

  const toggleDropdown = (type: string) => {
    setActiveDropdown(activeDropdown === type ? null : type);
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
          <div className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
            <ul className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-full p-1.5 shadow-sm">
              {navigation.map((item) => (
                <li key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(item.type || '')}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1 ${
                        activeDropdown === item.type
                          ? 'text-white bg-stone-900 dark:bg-white dark:text-stone-900 shadow-md'
                          : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-stone-700/80'
                      }`}
                    >
                      {item.name}
                      <svg className={`w-4 h-4 transition-transform ${activeDropdown === item.type ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
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
                  )}
                </li>
              ))}
            </ul>

            {/* Services Mega Menu */}
            {activeDropdown === 'services' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 p-6 animate-fade-up">
                <div className="grid grid-cols-3 gap-6">
                  {/* Main Services */}
                  <div className="col-span-2">
                    <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Kernleistungen</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {mainServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/leistung/${service.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-stone-800 dark:text-white group-hover:text-amber-600 transition-colors block">{service.name}</span>
                            <span className="text-xs text-stone-500 line-clamp-1">{service.shortDescription}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div>
                    <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Weitere Leistungen</h3>
                    <div className="space-y-1">
                      {allServices.slice(3, 12).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/leistung/${service.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/leistungen"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-2 mt-4 px-3 py-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Alle Leistungen
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Cities Mega Menu */}
            {activeDropdown === 'cities' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 p-6 animate-fade-up">
                <div className="grid grid-cols-4 gap-6">
                  {menuRegions.slice(0, 4).map((region) => (
                    <div key={region.name}>
                      <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {region.name}
                      </h3>
                      <div className="space-y-1">
                        {region.cities.map((city) => (
                          <Link
                            key={city.slug}
                            href={`/${city.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className={`block px-2 py-1.5 text-sm rounded-lg transition-colors ${
                              city.isMainCity
                                ? 'font-medium text-stone-800 dark:text-white hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800'
                                : 'text-stone-600 dark:text-stone-400 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`}
                          >
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
                  <p className="text-sm text-stone-500">
                    <span className="font-medium text-amber-600">{allCities.length}+</span> Städte und Gemeinden im Umkreis von 100km
                  </p>
                  <Link
                    href="/regionen"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    Alle Regionen anzeigen
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 ml-6">
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
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l-0 overflow-y-auto">
                <div className="flex flex-col min-h-full bg-gradient-to-b from-white to-stone-50 dark:from-stone-900 dark:to-stone-950">
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
                    {/* Main Nav */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/"
                            className="flex items-center justify-between px-5 py-4 text-base font-medium rounded-2xl transition-all duration-300 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Startseite
                            <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Services Section */}
                    <div className="mb-6">
                      <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-2">Leistungen</h3>
                      <ul className="space-y-1">
                        {allServices.slice(0, 6).map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/leistung/${service.slug}`}
                              className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {service.name}
                              <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/leistungen"
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-amber-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Alle Leistungen anzeigen
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Regions Section */}
                    <div className="mb-6">
                      <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-2">Top Städte</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {majorCities.slice(0, 8).map((city) => (
                          <li key={city.slug}>
                            <Link
                              href={`/${city.slug}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-all text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {city.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Other Links */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {[
                          { name: 'Projekte', href: '/projekte' },
                          { name: 'Galerie', href: '/galerie' },
                          { name: 'Über uns', href: '/ueber-uns' },
                          { name: 'Kontakt', href: '/kontakt' },
                        ].map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="flex items-center justify-between px-5 py-4 text-base font-medium rounded-2xl transition-all text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                              <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="p-6 border-t border-stone-100 dark:border-stone-800 space-y-3 bg-white dark:bg-stone-900">
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
