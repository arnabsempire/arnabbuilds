import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/* required so these generate as files under `output: export` */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
