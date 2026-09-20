/**
 * Single source of truth for the dual-funnel. The blueprint is explicit that
 * the international site shows NO prices and routes to Cal.com, while the
 * Bangladesh site shows transparent BDT pricing and routes to WhatsApp.
 * Every component takes a Market and reads from here rather than hardcoding.
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
    closingPrimary: { label: 'Book a call', href: SITE.cal, external: true },
    closingSecondary: { label: 'WhatsApp', href: SITE.whatsapp, external: true },
    heroNote:
      'Custom AI automation, conversion websites and web applications for businesses that cannot afford downtime.',
    switchLabel: 'বাংলাদেশে আছেন? দাম দেখুন',
    switchHref: '/bd',
  },
  bd: {
    locale: 'en',
    path: '/bd',
    /** Transparency wins with Bangladeshi SMBs — every figure is listed. */
    showPricing: true,
    primaryCta: { label: 'WhatsApp — talk now', href: SITE.whatsapp, external: true },
    secondaryCta: { label: 'Book a call instead', href: SITE.cal, external: true },
    closingPrimary: { label: 'WhatsApp — Bangladesh', href: SITE.whatsapp, external: true },
    closingSecondary: { label: 'Book a call', href: SITE.cal, external: true },
    heroNote:
      'Websites, WhatsApp automation and custom business tools for Bangladeshi companies — with every price listed up front.',
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
