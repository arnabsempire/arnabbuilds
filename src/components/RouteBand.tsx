import { CITIES, ROUTE_PATH } from '@/lib/content';
import { PlaneShape } from './Plane';

/**
 * Dual-market positioning stated honestly: this claims reach and working
 * hours, not clients in those cities. The plane follows the curve via CSS
 * Motion Path, driven by a scroll timeline where the browser supports one.
 */
export default function RouteBand() {
  return (
    <section className="on-night bg-night py-12 text-slate-300 @[1120px]/page:py-[72px]">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="mb-5 max-w-[620px]">
          <p className="mb-4 inline-block rounded-full bg-night-2 px-3.5 py-[7px] text-xs font-bold uppercase tracking-[.08em] text-brand-light">
            Dual market
          </p>
          <h2 className="mb-2.5 text-h2 text-slate-50">Built in Dhaka. Shipped to any time zone.</h2>
          <p className="text-lead text-slate-400">
            Local rates and a WhatsApp line for Bangladesh. Async delivery and overlapping hours for
            everyone else.
          </p>
        </div>

        <div>
          <svg
            viewBox="0 -70 1200 380"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Flight path from Dhaka through Singapore, Dubai and London to New York"
            className="block h-auto w-full overflow-visible"
          >
            <path className="route-line" d={ROUTE_PATH} />
            {CITIES.map((c) => (
              <g key={c.name} className={c.side}>
                <circle className="city-dot" cx={c.x} cy={c.y} stroke={c.dot} />
                <text className="city-name" x={c.x} y={c.y} textAnchor={c.anchor}>{c.name}</text>
                <text className="city-sub" x={c.x} y={c.y} textAnchor={c.anchor}>{c.sub}</text>
              </g>
            ))}
            <g className="route-plane">
              <g transform="scale(1.9)"><PlaneShape /></g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
