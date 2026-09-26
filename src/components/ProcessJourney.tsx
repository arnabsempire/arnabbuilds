import { HUE } from '@/lib/site';
import { PlaneShape } from './Plane';
import type { Step } from '@/lib/content';

/**
 * The four-step process drawn as a route with four destinations.
 *
 * A plane flies the route as the section scrolls, settling at each stop before
 * carrying on, and parks at the fourth — handover, the delivered product. The
 * hold at each destination is in the keyframes, not the timeline: the plane
 * reaches a stop's offset-distance and stays there for a slice of the scroll
 * before moving again, which is what reads as landing rather than passing over.
 *
 * Two paths, one mechanism. Below 1120px the route runs vertically down the
 * page beside stacked cards; above it runs horizontally across the top with the
 * cards in a row underneath. Both are `offset-path` with the same keyframes —
 * the container query only swaps which path string is in play.
 *
 * The stop percentages below were measured against the real paths with
 * getPointAtLength rather than estimated, so the plane lands on the markers
 * instead of near them.
 */

/* Desktop route — four points on a shallow wave, left to right. */
const H_PATH = 'M 80 158 C 220 120, 300 82, 420 92 C 560 104, 650 124, 780 142 C 900 160, 1000 118, 1120 72';
const H_STOPS = [
  { x: 80, y: 158 },
  { x: 420, y: 92 },
  { x: 780, y: 142 },
  { x: 1120, y: 72 },
];

/* Mobile route — the same four points turned down the page. */
const V_PATH = 'M 34 52 C 82 130, 92 222, 60 300 C 30 380, 22 472, 58 560 C 92 650, 96 742, 62 836';
const V_STOPS = [
  { x: 34, y: 52 },
  { x: 60, y: 300 },
  { x: 58, y: 560 },
  { x: 62, y: 836 },
];

/**
 * Every class here is written out in full. Tailwind scans source text, so a
 * template literal like `journey-svg--${variant}` is invisible to it and the
 * rule is purged at build — the same trap the HUE map in site.ts documents.
 * The variant therefore carries its class strings rather than its initial.
 */
type Variant = {
  svg: string;
  plane: string;
  dot: Record<string, string>;
  halo: Record<string, string>;
};

const DOT = {
  violet: 'journey-dot--violet', amber: 'journey-dot--amber', coral: 'journey-dot--coral',
  sky: 'journey-dot--sky', sodium: 'journey-dot--sodium', indigo: 'journey-dot--indigo',
};
const HALO = {
  violet: 'journey-halo--violet', amber: 'journey-halo--amber', coral: 'journey-halo--coral',
  sky: 'journey-halo--sky', sodium: 'journey-halo--sodium', indigo: 'journey-halo--indigo',
};

const HORIZONTAL: Variant = {
  svg: 'journey-svg journey-svg--h',
  plane: 'journey-plane journey-plane--h',
  dot: DOT, halo: HALO,
};
const VERTICAL: Variant = {
  svg: 'journey-svg journey-svg--v',
  plane: 'journey-plane journey-plane--v',
  dot: DOT, halo: HALO,
};

function Route({
  variant,
  path,
  stops,
  steps,
  viewBox,
}: {
  variant: Variant;
  path: string;
  stops: { x: number; y: number }[];
  steps: Step[];
  viewBox: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={variant.svg}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* The route itself, dashed like a flight plan rather than a solid road. */}
      <path d={path} className="journey-line" />

      {stops.map((p, i) => {
        return (
          <g key={i} className="journey-stop" style={{ '--i': i } as React.CSSProperties}>
            <circle cx={p.x} cy={p.y} r="26" className={`journey-halo ${variant.halo[steps[i].hue]}`} />
            <circle cx={p.x} cy={p.y} r="9" className={`journey-dot ${variant.dot[steps[i].hue]}`} />
            <text x={p.x} y={p.y + 4.5} className="journey-num">
              {steps[i].n}
            </text>
            <title>{steps[i].title}</title>
          </g>
        );
      })}

      <g className={variant.plane}>
        <PlaneShape />
      </g>
    </svg>
  );
}

export default function ProcessJourney({ steps }: { steps: Step[] }) {
  return (
    <div className="journey">
      <Route variant={VERTICAL} path={V_PATH} stops={V_STOPS} steps={steps} viewBox="0 0 120 900" />
      <Route variant={HORIZONTAL} path={H_PATH} stops={H_STOPS} steps={steps} viewBox="0 46 1200 148" />

      <ol className="journey-cards">
        {steps.map((s, i) => (
          <li key={s.n} className="journey-card" style={{ '--i': i } as React.CSSProperties}>
            <p className={`journey-card-n ${HUE[s.hue].text}`}>
              {s.n}
              <span className="journey-card-rule" />
            </p>
            <h3 className="mb-1.5 text-[17px] font-bold text-b-ink">{s.title}</h3>
            <p className="text-sm leading-[1.65] text-b-ink-muted">{s.copy}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
