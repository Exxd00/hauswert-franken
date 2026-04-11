import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingButtons } from "@/components/ui/floating-buttons";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://rd-frankenbau.de'),
  title: {
    default: "RD Frankenbau | Hochwertige Sanierung in Franken",
    template: "%s | RD Frankenbau"
  },
  description: "Hochwertige Sanierung, Modernisierung und Innenausbau in Franken. Kernsanierung, Badsanierung und Wohnungsrenovierung in Nürnberg und Umgebung. Steigern Sie den Wert Ihrer Immobilie.",
  keywords: ["Sanierung", "Kernsanierung", "Badsanierung", "Modernisierung", "Nürnberg", "Franken", "Renovierung", "Innenausbau", "RD Frankenbau"],
  authors: [{ name: "RD Frankenbau" }],
  creator: "RD Frankenbau",
  publisher: "RD Frankenbau",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://rd-frankenbau.de',
    siteName: 'RD Frankenbau',
    title: 'RD Frankenbau | Hochwertige Sanierung in Franken',
    description: 'Hochwertige Sanierung, Modernisierung und Innenausbau in Franken. Steigern Sie den Wert Ihrer Immobilie.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RD Frankenbau - Hochwertige Sanierung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RD Frankenbau | Hochwertige Sanierung in Franken',
    description: 'Hochwertige Sanierung, Modernisierung und Innenausbau in Franken.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://rd-frankenbau.de',
  },
};

// Structured Data for LocalBusiness
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://rd-frankenbau.de/#organization",
  name: "RD Frankenbau",
  description: "Hochwertige Sanierung, Modernisierung und Innenausbau in Franken",
  url: "https://rd-frankenbau.de",
  telephone: "+49176 35589478",
  email: "Info@rd-frankenbau.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hans Bunte Straße 26",
    addressLocality: "Nürnberg",
    postalCode: "90431",
    addressRegion: "Bayern",
    addressCountry: "DE"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.4521,
    longitude: 11.0767
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 49.4521,
      longitude: 11.0767
    },
    geoRadius: "100000"
  },
  priceRange: "€€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00"
    }
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sanierungsleistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kernsanierung & Komplettsanierung",
          description: "Umfassende Sanierung von Häusern und Wohnungen"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Badsanierung & Innenausbau",
          description: "Hochwertige Badsanierung und professioneller Innenausbau"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Modernisierung",
          description: "Gezielte Modernisierung zur Wertsteigerung"
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SX3GXK901G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SX3GXK901G');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <FloatingButtons />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
