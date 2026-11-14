# arnabbuilds.com — Cockpit build (v2, audit closed)

> Copied from the Claude project on 15 Nov 2026. Written 26 Sept 2026, before the move to Cloudflare Pages.
> The "Still outstanding" section at the end is out of date: the contact form was replaced by three links and
> the site no longer deploys through Netlify. See `CLAUDE.md` for the current state.

Chosen by Arnab from the Violet Band Motion Lab, then revised by the production
audit returned 2026-09-26. Supersedes the aurora/light design that sits
unpublished in Netlify preview.

## The spec as built

| Decision | Value |
| --- | --- |
| Palette | **Cockpit** — violet lead, warm supports |
| Reserved colour | WhatsApp `#25D366`, that button only, every band |
| Display face | **Fraunces**, self-hosted `wght` subset, 36KB |
| Body face | Manrope |
| Section order | Hero → About → Services → Process → RouteBand → **Walkthroughs** → **Portfolio** → Contact → Closing |
| Band rhythm | Alternating D-L-D-L-D-L-D-L-D |
| Background | Flight paths — canvas arcs with travelling comets |
| Headline | Shimmer sweep, dark band only |
| Scroll reveal | Fade up |
| Card layout | Swipe carousel below 720px, four-column grid above |
| Card hover | Lift, desktop only |
| Extras | Sticky action bar, tap ripple, cursor spotlight |

### Cockpit hues — dark band / light band

| Slot | Name | Dark | Light | Tint | Ink |
| --- | --- | --- | --- | --- | --- |
| h1 | Violet | `#B39CFB` | `#5B21B6` | `#EDE9FE` | `#4C1D95` |
| h2 | Amber | `#FFB020` | `#A1580B` | `#FEF3C7` | `#92400E` |
| h3 | Coral | `#FB7185` | `#9F1239` | `#FFE4E6` | `#881337` |
| h4 | Sky | `#7DD3FC` | `#0369A1` | `#E0F2FE` | `#075985` |
| h5 | Sodium | `#FDBA74` | `#9A3412` | `#FFEDD5` | `#7C2D12` |
| h6 | Indigo | `#818CF8` | `#3730A3` | `#E0E7FF` | `#312E81` |
| — | WhatsApp | `#25D366` | `#25D366` | — | ink `#052E1A` |

Grounds — dark `#0A0612`, surface `rgba(26,16,48,.72)`, line `#2C1E46`, ink
`#F6F2FC` / `#BCAFD4` / `#8A7CA6`. Light `#FAF8FD`, surface `#FFFFFF`, line
`#E6E0F0`, ink `#1A1125` / `#544966` / `#6A6080`.

## Audit decisions, all implemented

**No prices anywhere.** The `price` field is deleted from `content.ts` and every
৳ figure with it, on both markets. The slot each occupied is a WhatsApp button
carrying that service's name into the compose box.

**Process is a flight journey.** Four destinations on a route; a plane flies it
as the section scrolls and parks at Launch & Support. The landing is in the
keyframes rather than the timeline — the plane reaches a stop's
`offset-distance` and holds there for a slice of the scroll, because a
constant-speed pass reads as a flyover. Stop percentages were measured against
the real path geometry with `getPointAtLength`: horizontal 0 / 32.8 / 67 / 100,
vertical 0 / 32 / 65 / 100, all within 0.3 user units. Horizontal route on
desktop, vertical rail on mobile, one mechanism. Firefox and reduced-motion
viewers get every destination lit and the plane parked at handover.

**Walkthroughs sits on a light band.** The three demo files are light HTML
pages; rather than dark-passing all three or building a shell, the section that
links to them moved onto paper and swapped places with Portfolio. Alternation
survives, the demos no longer flash white, and the interactive proof now comes
before the static case list.

**Bengali on dark.** Light text on a dark ground blooms and closes the matras
first. Noto Sans Bengali is variable 400–800, so headings drop to weight 600 on
`.band-d` with `letter-spacing: 0.012em` to reopen the counters; body text takes
`0.006em`. Light bands keep the weights as drawn. Measured: 600 on dark, 700 on
light.

**Hero.** Metric panel (99.9% uptime, Sub-3s, Lighthouse 90+) deleted with its
`cards` data — those were targets a visitor reads as measurements. Stat labels
moved from Fraunces to Manrope so "Aviation-trained" stops wrapping. Lead
rewritten: *"Aviation taught me what reliability costs when it fails. That
discipline now runs on AI agents, automation pipelines and code I audit
myself."*

**Market switch out of the burger.** `বাংলাদেশে আছেন?` sits as a chip under the
wordmark up to 1120px, where the desktop nav carries it inline. The duplicate
inside the menu is gone.

**Click-to-chat, tier 1.** `waLink()` in `site.ts` builds `wa.me/…?text=…` so
every WhatsApp CTA opens with the first message already typed. Nine links on
`/`, ten on `/bd`, all prefilled except the footer's phone-number display, which
is correctly left plain. Service cards carry their own service name into the
message. **This is not the WhatsApp Business API** — nothing sends
automatically, no WABA or template approval is involved.

## Automation tiers, for when tier 1 stops being enough

1. **Click-to-chat** (built). Zero infrastructure, zero cost, no approval.
2. **Cal.com + branded email.** Cal already sends confirmations on booking; a
   Netlify Function on its webhook would replace them with branded mail.
3. **Full WhatsApp automation.** Business-initiated messages need a Meta
   Business account, a WABA, a dedicated number no longer usable in the normal
   app, and a Meta-approved template per message. Days of approval, per-
   conversation cost, and a function or automation platform in between. Cannot
   run from a static site.

## Verified

Production build green, `tsc --noEmit` clean. Zero console errors, zero
horizontal overflow and zero stranded reveals across `/` and `/bd` at 1440px and
390px. Reduced motion: plane parked at 100%, action bar visible. Contrast
re-measured after the repaint — no real failures.

## Known bugs found and fixed during the build

1. **Contrast, three failures.** Service card links rendered light-band ink on
   dark at 1.65:1; muted ink was 4.31:1 on paper. Fixed with band-aware hue
   classes and a darker muted ink.
2. **Action bar invisible under reduced motion and on Firefox.** It was hidden
   by default and revealed only by an animation that does not run there.
   Visible is now the resting state.
3. **Swipe hint never appeared.** Unconditional `display: none` was written
   after the container query setting it to `flex`; same specificity, source
   order won.
4. **Journey classes purged by Tailwind.** Built by interpolation
   (`` `journey-svg--${variant}` ``), so Tailwind never saw them and both routes
   rendered at once. Every class is now written out in full — the same trap the
   `HUE` map in `site.ts` documents.

## Still outstanding

- Contact form has never been submitted for real. Arnab deferred this to after
  launch; it should still be tested on the preview deploy.
- Portrait vignette for dark bands — not needed while About sits on paper, but
  it breaks if the rhythm ever changes.
- Nothing has touched the repo or the machine. Production auto-publishing on the
  `arnabbuilds` Netlify project is still **locked**; `netlify.toml` must keep
  `[[plugins]] package = "@netlify/plugin-nextjs"` declared.
