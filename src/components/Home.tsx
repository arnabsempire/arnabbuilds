import type { Market } from '@/lib/site';
import { COPY } from '@/lib/copy';
import Navbar from './Navbar';
import RouteBand from './RouteBand';
import Portfolio from './Portfolio';
import ClosingFlight from './ClosingFlight';
import { About, ActionBar, Footer, Hero, Process, Services } from './Sections';

/**
 * `@container/page` is the query root for the whole page. Every breakpoint in
 * this codebase is a container query against it, not a viewport media query —
 * which is what lets the design survive being embedded or resized.
 *
 * `lang` is set here rather than on <html> because both markets share one root
 * layout; assistive tech and search engines read it from the content wrapper.
 */
export default function Home({ market }: { market: Market }) {
  const t = COPY[market];
  return (
    <div lang={t.lang} className="@container/page relative bg-paper">
      <a
        href="#top"
        className="absolute left-4 top-[-64px] z-[200] rounded-lg bg-ink px-5 py-3 font-bold text-white transition-[top] duration-200 ease-fade focus-visible:top-4"
      >
        {t.skip}
      </a>

      <Navbar market={market} />
      <main>
        <Hero market={market} />
        <RouteBand market={market} />
        <About market={market} />
        <Services market={market} />
        <Process market={market} />
        <Portfolio market={market} />
        <ClosingFlight market={market} />
      </main>
      <Footer market={market} />
      <ActionBar market={market} />
    </div>
  );
}
