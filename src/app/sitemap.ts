import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/* required so these generate as files under `output: export` */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.domain, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.domain}/bd`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
