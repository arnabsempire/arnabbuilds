# globals.css — amber-lead accent swap

Apply these against `src/app/globals.css` (or wherever the `.band-d` / `.band-l`
tokens and `.bg-brand` / `.shimmer` rules live). This is the diff behind the
palette you picked in the customizer — everything else (hero background,
hero style, hero copy) is unchanged from the current build.

## 1. Band accent tokens

```css
.band-d { --b-accent: #ffb020; --b-accent-soft: #ffb02021; }
.band-l { --b-accent: #a1580b; --b-accent-soft: #a1580b14; }
```
(was `--b-accent:#b39cfb` / `#5b21b6`)

## 2. Brand button + logo badge

```css
.bg-brand { background-color: rgb(161 88 11); }          /* was rgb(91 33 182) */
.hover\:bg-brand-deep:hover { background-color: rgb(124 74 9); } /* was rgb(76 29 149) */
```
If `site.ts` / `tailwind.config.ts` defines `brand` and `brand-deep` as named
colors instead of literals, change the source there rather than patching the
generated CSS.

## 3. Shimmer headline gradient

```css
.band-d .shimmer {
  background-image: linear-gradient(100deg, #f6f2fc 20%, #ffb020 42%, #fb7185 56%, #f6f2fc 78%);
}
```
(middle stop was `#b39cfb`)

## 4. Lead-accent dot / skip-link

Wherever `bg-hue-violet-d` is used purely as the "this is the lead color"
indicator (the availability dot in the header, the skip-to-content link) —
not the per-service-card hues, which keep their existing violet/amber/coral/
sky/sodium/indigo mapping — swap to amber:

```css
.bg-hue-amber-d { background-color: rgb(255 176 32); }
```
and change those two elements' class from `bg-hue-violet-d` to `bg-hue-amber-d`,
and the availability dot's ring shadow from `rgba(179,156,251,.22)` to
`rgba(255,176,32,.22)`.

## Not touched

- Per-service-card hue assignments (AI Agents=violet, Websites=amber, Social=
  coral, Custom Apps=sky) — those are content-category colors, not the lead
  accent, and stay as-is.
- Hero background (flight paths), hero layout (lean, no metrics panel), hero
  copy (aviation-led line) — all already match what you picked, no change
  needed there.
