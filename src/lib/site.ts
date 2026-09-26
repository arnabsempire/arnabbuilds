/**
 * Single source of truth for the dual-funnel. The blueprint is explicit that
 * the international site shows NO prices and routes to Cal.com, while the
 * Bangladesh site shows transparent BDT pricing and routes to WhatsApp.
 * Every component takes a Market and reads from here rather than hardcoding.
 *
 * Prose lives in ./copy.ts. This file holds identity, links and funnel shape.
 */
export type Market = 'intl' | 'bd';

/**
 * A WhatsApp link with the first message already written.
 *
 * wa.me accepts a `text` parameter and opens the chat with it in the compose
 * box, so the visitor sends rather than composes. This is not the WhatsApp
 * Business API — nothing is sent automatically and no template approval is
 * involved; it just removes the blank-box pause that loses people. Pass the
 * context (which service, which page) so the conversation starts with the
 * answer to the first question already given.
 */
export function waLink(message?: string): string {
  return message ? `${SITE.whatsapp}?text=${encodeURIComponent(message)}` : SITE.whatsapp;
}

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
    primaryCta: { label: 'WhatsApp-এ কথা বলুন', href: waLink('হ্যালো Arnab — আমি একটা ডিসকভারি কল বুক করতে চাই।'), external: true },
    secondaryCta: { label: 'কল বুক করুন', href: SITE.cal, external: true },
    heroNote:
      'বাংলাদেশি ব্যবসার জন্য ওয়েবসাইট, WhatsApp অটোমেশন আর কাস্টম বিজনেস টুল — প্রতিটির দাম আগেই বলা আছে।',
    /* Points back at the English site, so this label stays English on purpose. */
    switchLabel: 'International enquiries',
    switchHref: '/',
  },
} as const satisfies Record<Market, unknown>;

export type HueName = 'violet' | 'amber' | 'coral' | 'sky' | 'sodium' | 'indigo';

/**
 * The six Cockpit hues. The page alternates dark and light bands and the same
 * card is painted on both, so a hue needs a value for each ground.
 *
 * `text` and `chip` are band-aware: globals.css defines them twice, once under
 * `.band-d` and once under `.band-l`, and the band picks. Emitting both values
 * as utility classes on the element cannot work — whichever came last in the
 * stylesheet would always win regardless of ground.
 *
 * `solid`, `tint`, `ink` and `ring` are the fixed light-band trio, for places
 * that are always on paper.
 *
 * Classes are written out in full because Tailwind scans source text — a
 * template literal like `bg-hue-${name}-l` would be purged at build.
 */
export const HUE: Record<HueName, { solid: string; tint: string; ink: string; ring: string; text: string; chip: string }> = {
  violet: { solid: 'bg-hue-violet-l', tint: 'bg-hue-violet-tint', ink: 'text-hue-violet-ink', ring: 'hover:border-hue-violet-l', text: 'hue-violet', chip: 'chip-violet' },
  amber:  { solid: 'bg-hue-amber-l',  tint: 'bg-hue-amber-tint',  ink: 'text-hue-amber-ink',  ring: 'hover:border-hue-amber-l',  text: 'hue-amber', chip: 'chip-amber' },
  coral:  { solid: 'bg-hue-coral-l',  tint: 'bg-hue-coral-tint',  ink: 'text-hue-coral-ink',  ring: 'hover:border-hue-coral-l',  text: 'hue-coral', chip: 'chip-coral' },
  sky:    { solid: 'bg-hue-sky-l',    tint: 'bg-hue-sky-tint',    ink: 'text-hue-sky-ink',    ring: 'hover:border-hue-sky-l',    text: 'hue-sky', chip: 'chip-sky' },
  sodium: { solid: 'bg-hue-sodium-l', tint: 'bg-hue-sodium-tint', ink: 'text-hue-sodium-ink', ring: 'hover:border-hue-sodium-l', text: 'hue-sodium', chip: 'chip-sodium' },
  indigo: { solid: 'bg-hue-indigo-l', tint: 'bg-hue-indigo-tint', ink: 'text-hue-indigo-ink', ring: 'hover:border-hue-indigo-l', text: 'hue-indigo', chip: 'chip-indigo' },
};
