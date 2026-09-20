# Launch checklist

## Blocking

- [ ] **Founder portrait.** `public/arnab-aditya-das.png` is currently an
      80x80 thumbnail carried over from the design canvas. It renders at up to
      420px wide and will look badly degraded. Replace with an original of at
      least 840px on the short edge, then delete this line.
- [ ] **Verify the outcome figures.** Three claims in `src/lib/content.ts`
      carry `outcomeVerified: false` and must be confirmed against real client
      data or removed before launch:
      - "40% more direct bookings within 3 months" (Boutique Resort)
      - "About 60% of manual triage time removed" (Lead Scoring Agent)
      - "2,400+ bookings handled per month" (WhatsApp Booking Bot)
      The first two are client-side outcomes and need the client's own
      reporting. The third is throughput from a system you built, so it should
      be recoverable from your own logs or the WhatsApp Business API records.
      If a number cannot be substantiated, describe the mechanism instead —
      "replaced a manual phone-and-ledger process with real-time availability"
      claims nothing you cannot defend.

## Recommended before launch

- [ ] **Proof band under the hero.** The Trust & Authority pattern wants
      client logos or certifications directly below the hero. Proof currently
      sits fifth, in the portfolio. Needs real logos and permission to use them.
- [ ] **Real product screenshots.** The portfolio demos are abstract frames
      standing in for interfaces. For the paid client work especially, real
      captures will land far harder.
- [ ] **OG image.** No `opengraph-image` exists yet, so link previews will be
      bare. Add `src/app/opengraph-image.png` at 1200x630.
- [ ] Confirm the Cal.com link `https://cal.com/arnabbuilds` is live.
- [ ] Confirm Cloudflare email routing delivers `hello@arnabbuilds.com`.

## Netlify deploy

- [ ] Import the repo in Netlify; confirm it reads `netlify.toml` and does not
      ask you to set a build command manually.
- [ ] If DNS stays on Cloudflare, set the Netlify CNAME to **DNS only** (grey
      cloud). Proxying through Cloudflare on top of Netlify's CDN causes
      redirect loops and blocks certificate provisioning.
- [ ] After the first deploy, check response headers on the live URL —
      `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and
      `Permissions-Policy` should all be present.
- [ ] Confirm `/_next/static/*` returns `Cache-Control: immutable`.
- [ ] Confirm the founder portrait is being served through the Netlify Image
      CDN (the `<img>` src should point at `/_netlify/image?...`).
- [ ] Do **not** add `@netlify/plugin-nextjs` to `package.json`. Netlify
      maintains the adapter and recommends leaving it unpinned.

## Verified in this build

- [x] `tsc --noEmit` passes with no errors.
- [x] `next build` succeeds on Next.js 16.3.5; all 5 routes prerender as static content.
- [x] `netlify.toml` present with build command, publish dir and Node 22 pinned.
- [x] International route shows no pricing; `/bd` lists BDT figures.
- [x] All five local SEO hubs present, Bandarban included.
- [x] LocalBusiness + WebSite JSON-LD emitted on both routes.
- [x] Contrast measured on every colour pair; weakest is 5.02:1.
- [x] No emoji used as icons — Lucide React throughout.
- [x] Paid client work and demonstration builds are labelled distinctly.
