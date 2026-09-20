import { SITE } from './site';

/**
 * LocalBusiness schema for the Bangladesh hubs. Emitted on both routes so the
 * NAP data is consistent wherever Google lands first.
 */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.domain}/#business`,
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.domain,
    email: SITE.email,
    telephone: SITE.phoneE164,
    founder: { '@type': 'Person', name: SITE.founder, sameAs: SITE.linkedin },
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    areaServed: SITE.hubs.map((city) => ({ '@type': 'City', name: city })),
    sameAs: [SITE.linkedin],
    knowsAbout: [
      'AI workflow automation',
      'WhatsApp Business API automation',
      'Next.js web development',
      'Supabase application development',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.domain,
    publisher: { '@id': `${SITE.domain}/#business` },
  };
}
