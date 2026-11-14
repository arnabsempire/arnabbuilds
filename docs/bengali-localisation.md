# Bengali localisation of /bd — arnabbuilds.com

> Copied from the Claude project on 15 Nov 2026. Written September 2026, before the Cockpit redesign.
> Since then: all ৳ prices were removed from both markets, the three unverified outcome figures were taken
> off the site, and the display face changed from Georgia to Fraunces. The architecture and the copy rule
> below still hold.

Decision and implementation notes, September 2026.

## The decision

The /bd page was English apart from the ৳ symbol and the page title. It now runs a **hybrid**: prose in Bengali, technical vocabulary in English. Arnab chose this over a full translation and over leaving it English.

The rule the copy follows: anything a buyer would type into a search box or say out loud to a developer stays English — AI, automation, WhatsApp, Next.js, Supabase, PostgreSQL, CRM, n8n, Lighthouse, 3G. Everything around those words is Bengali. Numerals stay Western throughout so they match the ৳ prices rather than mixing ৯ with 25,000.

Case-study titles stay English for the same reason ("WhatsApp Booking Bot", "CRM & Pipeline Tool"); their descriptions, outcomes and step lists are Bengali.

The international page is untouched. Its only Bengali is the market-switch link.

## Architecture

All user-facing prose moved out of components into `src/lib/copy.ts`, a `Record<Market, Copy>`. Components take a `market` prop and read from it; none of them hold literal strings any more. `About`, `Process`, `Portfolio` and `RouteBand` gained the prop.

Per-item content (pillars, process steps, case studies) keeps English as the source of truth in `src/lib/content.ts` with a `bn` field alongside. Three resolvers — `pillarsFor`, `stepsFor`, `casesFor` — return the shape components already render with the localised strings swapped in, so no component knows `bn` exists.

`src/lib/site.ts` keeps identity, links and funnel shape only.

`lang` is set on the page wrapper in `Home.tsx`, not on `<html>`, because both markets share one root layout.

## Typography

Manrope carries no Bengali glyphs. Without a Bengali webfont the page falls back to whatever the device ships, which renders conjuncts badly on older Android. Noto Sans Bengali Variable is now self-hosted via `@fontsource-variable/noto-sans-bengali` and declared second in both font stacks, scoped with the subset's own `unicode-range` (U+0980–09FE and friends). It can only ever serve Bengali codepoints, so Latin still comes from Manrope and Georgia. It is not preloaded — the browser fetches it only when Bengali is actually painted. 107 KB.

A serif Bengali (Noto Serif Bengali) was tried so headings would match Georgia rather than sitting in a sans. Rejected: the visual difference is marginal and it costs another 187 KB, which on 3G contradicts the site's own sub-3s promise. Swapping it in later is a one-line change in `tailwind.config.ts`.

Bengali needs looser setting than Manrope. Rules at the end of `globals.css`, deliberately after `@tailwind utilities` so they win on equal specificity, zero the negative tracking on h1/h2, raise their line-height to 1.25, and relax the `tracking-[…]` utilities on eyebrow labels.

## Two bugs fixed on the way

The closing section's landing light and chat icon sat on `closingSecondary`, which on /bd was "Book a call" — the light landed on the wrong button and the WhatsApp icon labelled a calendar link. The closing actions are now `left` and `right` in copy, with their own solid/ghost variant; `right` is always WhatsApp, always the beam target, on both markets.

The mobile action bar rendered a WhatsApp button plus `primaryCta`, which on /bd was also WhatsApp — two identical buttons. It now reads WhatsApp and Cal directly.

## The founder's name

Confirmed by Arnab: **অর্ণব আদিত্য দাশ** — দাশ, not দাস. Set in `copy.ts` under `bd.about.name`. The English page keeps "Arnab Aditya Das" from `SITE.founder`.

## Still open

The founder portrait is still an 80×80 file rendering at up to 420px, and it is very visible in the About section. The three `outcomeVerified: false` figures are still unverified.
