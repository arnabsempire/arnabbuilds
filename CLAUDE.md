# CLAUDE.md — arnabbuilds.com

Agency site for **Arnab Builds** (AI automation, conversion websites, custom web apps).
Founder: Arnab Aditya Das. Live at https://arnabbuilds.com.

Written 15 Nov 2026 from the repo and the live site. If this file and the code disagree, the code wins — then fix this file.

## How to work here

- **One feature at a time.** Edit the existing files in place. Do not rebuild pages or swap the design system.
- **Show before you spread.** For design changes, show options or the one changed section first, then wait for a choice.
- **Facts only.** No invented client results, testimonials, logos, metrics or prices. An unbacked claim is a launch blocker.
- Ask a short clarifying question up front when a request is ambiguous, rather than building and explaining afterwards.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript, **static export** (`output: 'export'` → `out/`). No server, no route handlers, no middleware, no image optimiser.
- Tailwind CSS 3.4 with `@tailwindcss/container-queries`. Icons: `lucide-react`.
- Fonts are self-hosted in `src/app/fonts/`: Fraunces (display), Manrope (body), Noto Sans Bengali.

```
npm run dev        # local dev server
npm run build      # static export into out/
npm run typecheck  # tsc --noEmit
npm run lint
```

## Deploy

Push to `main` on `github.com/arnabsempire/arnabbuilds` → Cloudflare Pages project `arnabbuilds` builds and publishes. Arnab commits and pushes with GitHub Desktop.

- Cloudflare build: preset "Next.js (Static HTML Export)", command `npm run build`, output `out`, `NODE_VERSION=22`.
- Headers live in `public/_headers`.
- `README.md`, `DEPLOY.md`, `netlify.toml` and `docs/LAUNCH-CHECKLIST.md` describe the old Netlify pipeline. They are out of date; do not follow them.
- If `npm install` fails on this Windows machine, the Cloudflare build still runs on push.

## Layout of the code

| Path | What it holds |
| --- | --- |
| `src/app/page.tsx`, `src/app/bd/page.tsx` | English `/` and Bangla `/bd`, both render `<Home market>` |
| `src/components/Home.tsx` | Section order and dark/light band rhythm, in one place |
| `src/components/Sections.tsx` | Hero, About, Services, Process, ActionBar, Footer |
| `src/components/` (others) | Navbar, FlightPaths, RouteBand, Walkthroughs, Portfolio, ContactForm (three links, no form), ClosingFlight, ProcessJourney, Spotlight, TouchFeedback, RevealObserver |
| `src/lib/copy.ts` | All user-facing prose, `Record<Market, Copy>`. Components hold no literal strings |
| `src/lib/content.ts` | Pillars, process steps, case studies (English source, `bn` field alongside) |
| `src/lib/site.ts` | Identity, links, `waLink()`, the `MARKET` funnel config, the `HUE` map |
| `src/app/globals.css` | Band system, motion path, scroll timelines, reduced-motion reset |
| `tailwind.config.ts` | Colour tokens, fonts, easings |
| `public/demos/` | Three standalone concept demos (PostPilot, PostPilot Gen-Z, LaunchDesk) |

Section order: Hero → About → Services → Process → RouteBand → Walkthroughs → Portfolio → Contact → Closing, alternating dark/light bands starting dark.

## Code rules that bite

- **Never build Tailwind class names by interpolation** (`` `bg-hue-${name}-l` ``). Tailwind purges them. Write every class out in full; see the `HUE` map in `site.ts`.
- **Breakpoints are container queries** against `@container/page`, not viewport media queries.
- **Bands:** components are styled once against `--b-ink`, `--b-line`, `--b-surface`, `--b-accent`. `.band-d` / `.band-l` rebind them. Do not style a component twice for dark and light.
- Animate `transform` and `opacity` only. Explicit `cubic-bezier` easings. No looping pulses. Respect `prefers-reduced-motion`: nothing may stay hidden when motion is off.
- Scroll-driven effects sit behind `@supports`; Firefox gets the static end state.
- Copy changes go in `copy.ts` / `content.ts` for **both** markets.

## Design system (Cockpit)

- Grounds: dark `#0A0612`, light `#FAF8FD`. Dark hero with the flight-path canvas background. Mixed dark and light bands, never a fully dark page.
- Six hues, each with a dark-band and a light-band value: violet, amber, coral, sky, sodium, indigo. Full table in `docs/cockpit-build-spec.md`.
- WhatsApp green `#25D366` is reserved for the WhatsApp button only.
- Headings Fraunces, body Manrope. Bengali headings drop to weight 600 on dark bands.
- Mobile first: design and check the phone view before desktop. 44px minimum touch targets.
- Budget: loads in under 3 s on 3G, Lighthouse 90+ desktop / 85+ mobile, WCAG AA contrast.

**Open decision:** Arnab picked Ember Amber as the lead accent in place of violet. The patch is in `globals-css-patch.md` and has not been applied; the live site still leads with violet. Ask before applying.

## Content rules

- **No prices anywhere**, on either market. That slot is a "Book a call" / WhatsApp button. (Comments in `site.ts` that mention BDT pricing are stale.)
- Two funnels: international → Cal.com `https://cal.com/arnabbuilds`; Bangladesh → WhatsApp `+8801716205730`. Email `hello@arnabbuilds.com`. All three live in `SITE` in `site.ts`; never hardcode them.
- WhatsApp links go through `waLink()` so the first message is prefilled.
- The contact section is three links (WhatsApp, Cal.com, email). There is no form by design.
- Portfolio items are labelled "Demonstration build" unless they are paid client work. Keep the label honest.
- Aviation career is "a decade". Not "nine years", "9 years" or "seven years". Arnab was a flight attendant and purser and handled live cabin emergencies; this is the differentiator, keep it prominent.
- He is a marketing graduate with marketing experience at Apex Leathercraft Fashion & Accessories Ltd.
- Bengali name: অর্ণব আদিত্য দাশ (দাশ, not দাস).
- `/bd` is hybrid: Bengali prose, English technical terms, Western numerals. See `docs/bengali-localisation.md`.

## Known UI issues (audit, 15 Nov 2026)

Fix one at a time, in this order unless told otherwise:

1. Hero headline is a generic slogan at 32px with one gradient word; the aviation story sits in body text. Lead with the aviation line.
2. Uppercase pill label above every heading (14 of them). Keep only where it adds information.
3. Every section uses the same rounded card; ten different border radii; "→" on seven links.
4. WhatsApp button appears twice on the first screen (hero and sticky bar). Hide the bar until the hero buttons scroll away.
5. Header takes two rows on phones because the Bangla link sits under the wordmark.
6. Route-map labels collide at about 620px wide; the About copy still says "nine years".

## Design skills

If the `design-taste-frontend` (taste skill) is installed, this file overrides it where they conflict: keep the Cockpit palette including violet, keep the dark hero and flight-path background, and edit in place instead of starting from the skill's starter kit.

## More detail

- `docs/cockpit-build-spec.md` — the design spec as built, hue table, audit decisions, bugs already fixed
- `docs/bengali-localisation.md` — how `/bd` copy, fonts and the `Market` plumbing work
- `docs/CONTRAST.md` — measured contrast pairs
