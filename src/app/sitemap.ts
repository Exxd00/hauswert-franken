import type { MetadataRoute } from 'next';
import { getAllCitySlugs, majorCities } from '@/lib/data/cities';
import { getAllServiceSlugs } from '@/lib/data/services';

const BASE_URL = 'https://rd-frankenbau.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/leistungen`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projekte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/leistung/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: majorCities.some(c => c.slug === slug) ? 0.8 : 0.6,
  }));

  // City + Service pages (only for major cities to keep sitemap manageable)
  // In production, you'd generate all combinations or use sitemap index
  const cityServicePages: MetadataRoute.Sitemap = [];

  for (const citySlug of majorCities.map(c => c.slug)) {
    for (const serviceSlug of serviceSlugs) {
      cityServicePages.push({
        url: `${BASE_URL}/${citySlug}/${serviceSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
  ];
}
