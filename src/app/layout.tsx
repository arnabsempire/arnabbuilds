import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SITE } from '@/lib/site';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/jsonld';
import './globals.css';

/*
 * Manrope is self-hosted from @fontsource-variable/manrope rather than fetched
 * from Google Fonts at build time. Three reasons: the build no longer needs
 * network access (it works in offline and proxied CI), visitors make no
 * third-party request, and one variable font file covers 400-800 instead of
 * five static weights.
 */
const manrope = localFont({
  src: './fonts/manrope-latin-variable.woff2',
  display: 'swap',
  variable: '--font-manrope',
  weight: '400 800',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'Arnab Builds — AI Automation & High-Reliability Web Engineering',
    template: '%s | Arnab Builds',
  },
  description:
    'Custom AI automation, conversion websites and web applications. Aviation-trained founder, zero-downtime discipline. Serving Bangladesh and international clients.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Arnab Builds — AI Automation & High-Reliability Web Engineering',
    description: SITE.tagline,
    url: SITE.domain,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F9F9F9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <script
          type="application/ld+json"
          // schema payload is built from local constants, never user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessJsonLd(), websiteJsonLd()]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
