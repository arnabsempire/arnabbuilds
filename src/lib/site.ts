/**
 * Single source of truth for the dual-funnel. The blueprint is explicit that
 * the international site shows NO prices and routes to Cal.com, while the
 * Bangladesh site shows transparent BDT pricing and routes to WhatsApp.
 * Every component takes a Market and reads from here rather than hardcoding.
 *
 * Prose lives in ./copy.ts. This file holds identity, links and funnel shape.
 */
export type Market = 'intl' | 'bd';

export const SITE = {
  name: 'Arnab Builds',
  domain: 'https://arnabbuilds.com',
  tagline: 'AI automation and custom web engineering, built for reliability.',
  founder: 'Arnab Aditya Das',
  email: 'hello@arnabbuilds.com',
  phoneE164: '+8801716205730',
  phoneDisplay: '+880 1716 205730',
  whatsapp: 'https://wa.me/8801716205730',
  cal: 'https://cal.com/arnabbuilds',
  linkedin: 'https://www.linkedin.com/in/arnab-aditya-das-17247860/',
  status: 'Available for Q4 Projects',
  /** Local SEO hubs — all five from the blueprint. */
  hubs: ['Dhaka', 'Chattogram', 'Sylhet', "Cox's Bazar", 'Bandarban'],
} as const;

export const MARKET = {
  intl: {
    locale: 'en',
    path: '/',
    /** Premium positioning: pricing is deliberately withheld. */
    showPricing: false,
    primaryCta: { label: 'Book a discovery call', href: SITE.cal, external: true },
    secondaryCta: { label: 'Email the founder', href: `mailto:${SITE.email}`, external: false },
    heroNote:
      'Custom AI automation, conversion websites and web applications for businesses that cannot afford downtime.',
    /* No price wording here — the international site never mentions cost. */
    switchLabel: 'বাংলাদেশে আছেন?',
    switchHref: '/bd',
  },
  bd: {
    locale: 'bn',
    path: '/bd',
    /** Transparency wins with Bangladeshi SMBs — every figure is listed. */
    showPricing: true,
    primaryCta: { label: 'WhatsApp-এ কথা বলুন', href: SITE.whatsapp, external: true },
    secondaryCta: { label: 'কল বুক করুন', href: SITE.cal, external: true },
    heroNote:
      'বাংলাদেশি ব্যবসার জন্য ওয়েবসাইট, WhatsApp অটোমেশন আর কাস্টম বিজনেস টুল — প্রতিটির দাম আগেই বলা আছে।',
    /* Points back at the English site, so this label stays English on purpose. */
    switchLabel: 'International enquiries',
    switchHref: '/',
  },
} as const satisfies Record<Market, unknown>;

export type HueName = 'emerald' | 'azure' | 'amber' | 'violet' | 'rose' | 'cyan';

/**
 * Hue classes are written out in full because Tailwind scans source text —
 * a template literal like `bg-hue-${name}-solid` would be purged at build.
 */
export const HUE: Record<HueName, { solid: string; tint: string; ink: string; ring: string }> = {
  emerald: { solid: 'bg-hue-emerald-solid', tint: 'bg-hue-emerald-tint', ink: 'text-hue-emerald-ink', ring: 'hover:border-hue-emerald-solid' },
  azure:   { solid: 'bg-hue-azure-solid',   tint: 'bg-hue-azure-tint',   ink: 'text-hue-azure-ink',   ring: 'hover:border-hue-azure-solid' },
  amber:   { solid: 'bg-hue-amber-solid',   tint: 'bg-hue-amber-tint',   ink: 'text-hue-amber-ink',   ring: 'hover:border-hue-amber-solid' },
  violet:  { solid: 'bg-hue-violet-solid',  tint: 'bg-hue-violet-tint',  ink: 'text-hue-violet-ink',  ring: 'hover:border-hue-violet-solid' },
  rose:    { solid: 'bg-hue-rose-solid',    tint: 'bg-hue-rose-tint',    ink: 'text-hue-rose-ink',    ring: 'hover:border-hue-rose-solid' },
  cyan:    { solid: 'bg-hue-cyan-solid',    tint: 'bg-hue-cyan-tint',    ink: 'text-hue-cyan-ink',    ring: 'hover:border-hue-cyan-solid' },
};
