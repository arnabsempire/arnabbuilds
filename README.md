# Arnab Builds — arnabbuilds.com

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3.4

## The dual funnel is the architecture

Two routes share one component tree and differ only by a `Market` value read
from `src/lib/site.ts`:

| Route  | Market | Pricing | Primary CTA |
|--------|--------|---------|-------------|
| `/`    | `intl` | **Hidden** — premium positioning, scoped on the call | Cal.com discovery call |
| `/bd`  | `bd`   | **Listed in BDT** — transparency wins with local SMBs | WhatsApp |

This mirrors the blueprint exactly. Prices must never appear on `/`; that is
enforced by the `showPricing` flag, not by remembering to leave them out.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000  and  /bd
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

### Building without network access

`src/app/layout.tsx` uses `next/font/google` for Manrope, which fetches the
font at build time. On Vercel this is fine. In an offline or proxied CI
environment the build fails with `Failed to fetch Manrope from Google Fonts`.
If you hit that, download the Manrope woff2 files into `src/app/fonts/` and
swap the import for `next/font/local` — no other file needs to change, because
everything reads the `--font-manrope` CSS variable.

## Deployment — Netlify

Netlify supports Next.js 16 with zero configuration, including Turbopack.
`netlify.toml` in the repo root pins the build command, publish directory and
Node version so CI matches local.

1. Push to GitHub, then **Add new project → Import an existing project** in
   Netlify and pick the repo. Netlify detects Next.js and reads `netlify.toml`.
2. Point `arnabbuilds.com` at Netlify. If DNS stays with Cloudflare, add the
   CNAME Netlify gives you and set that record to **DNS only** (grey cloud) —
   proxying it through Cloudflare on top of Netlify's own CDN causes redirect
   loops and breaks Netlify's certificate provisioning.
3. Keep the Cloudflare email route for `hello@arnabbuilds.com`; it is
   independent of where the site is hosted.
4. No environment variables are required — the site is fully static.

### The adapter is deliberately not pinned

Netlify installs and maintains `@netlify/plugin-nextjs` itself, and explicitly
recommends against pinning it so every build picks up the current version.
It is therefore absent from `package.json` and from any `[[plugins]]` block.
Do not add it.

### Local development

```bash
npm run dev        # plain Next dev server
netlify dev        # Netlify CLI — emulates redirects, headers and Image CDN
```

Use `netlify dev` when you want to check anything defined in `netlify.toml`.

### What Netlify handles for you

- `next/image` is served through the **Netlify Image CDN** automatically. No
  loader config is needed, which is why `next.config.mjs` only sets formats.
- Security and cache headers come from `netlify.toml` rather than
  `next.config.mjs`, so Netlify's CDN applies them to every asset — including
  static files that never reach the Next.js server. One source of truth.

All five routes prerender as static content, so the sub-3-second-on-3G target
is a CDN problem rather than a rendering one.

## Why no Framer Motion

The blueprint lists it, and it has been deliberately left out. Every animation
here is CSS — transforms and opacity only, on the compositor. Adding a motion
library costs roughly 30KB gzipped of JavaScript on a page whose hard
constraints are sub-3s on 3G and Lighthouse 90+/85+. Nothing in this design
needs gesture handling or interruptible spring physics, which is where Framer
Motion actually earns its weight. Revisit if a future feature does.

## Where the CSS lives

Tailwind utilities do almost everything, per the blueprint's utility-first
rule. `src/app/globals.css` holds only what Tailwind has no utilities for:
CSS Motion Path, scroll-driven timelines, SVG geometry properties (`r`,
`stroke-width`, `fill`), and the global reduced-motion reset. Each block says
why it is there.

## Breakpoints are container queries

Every responsive rule is an `@container/page` query, not a viewport media
query. The page root declares `@container/page`; components use
`@[720px]/page:` and `@[1120px]/page:`. Container queries are Baseline
(Chrome/Edge 105, Safari 16, Firefox 110), so no fallback layer is needed.

## Accessibility

- One visible focus ring site-wide, lightened on dark sections via `.on-night`.
- Skip-to-content link is the first focusable element.
- 48px minimum touch targets.
- Demo modal traps focus, closes on Escape, and locks background scroll.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- Contrast ratios are recorded in `docs/CONTRAST.md`; the weakest pair is 5.02:1.

## Before you launch

See `docs/LAUNCH-CHECKLIST.md`. Two items are blocking.
