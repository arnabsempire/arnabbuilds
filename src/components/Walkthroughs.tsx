import { ArrowUpRight } from 'lucide-react';
import { walkthroughsFor } from '@/lib/content';
import { COPY } from '@/lib/copy';
import { HUE, type Market } from '@/lib/site';

/**
 * Carried over from the previous site. These are whole working pages, not
 * screenshots — the strongest proof on the site, because a visitor can click
 * in and use the thing. They open in a new tab so the visitor never loses
 * their place here, and each demo states on its own page that it is a concept.
 */
export default function Walkthroughs({ market }: { market: Market }) {
  const t = COPY[market].walkthroughs;
  const items = walkthroughsFor(market);

  return (
    <section id="demos" className="border-b border-line bg-white py-14 @[720px]/page:py-[76px] @[1120px]/page:py-[104px]">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="mb-8 max-w-[640px] @[720px]/page:mb-11 @[1120px]/page:mb-[60px]">
          <h2 className="mb-3 text-h2">{t.h2}</h2>
          <p className="text-lead text-ink-soft">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-[18px] @[720px]/page:grid-cols-3 @[720px]/page:gap-[22px] @[1120px]/page:gap-[26px]">
          {items.map((w) => {
            const hue = HUE[w.hue];
            return (
              <a
                key={w.slug}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col overflow-hidden rounded-[14px] border border-line bg-paper transition-all duration-[260ms] ease-move hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(15,23,42,.1)] ${hue.ring}`}
              >
                <div className={`flex h-[104px] items-end justify-between p-[18px] text-white @[1120px]/page:h-[120px] ${hue.solid}`}>
                  <span className="font-display text-[19px] font-bold">{w.title}</span>
                  <ArrowUpRight
                    size={22}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-move group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3.5 p-[22px]">
                  <p className="text-[15px] leading-[1.65] text-ink-muted">{w.tagline}</p>
                  <ul className="mt-auto flex list-none flex-wrap gap-1.5 p-0">
                    {w.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full px-[11px] py-[5px] text-[12px] font-bold ${hue.tint} ${hue.ink}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className={`inline-flex items-center gap-1.5 text-[14px] font-bold ${hue.ink}`}>
                    {t.open}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-6 text-[13px] leading-[1.5] text-ink-muted">{t.note}</p>
      </div>
    </section>
  );
}
