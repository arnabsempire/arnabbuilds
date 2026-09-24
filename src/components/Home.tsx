import type { Market } from '@/lib/site';
import { COPY } from '@/lib/copy';
import AuroraBackground from './AuroraBackground';
import RevealObserver from './RevealObserver';
import Navbar from './Navbar';
import RouteBand from './RouteBand';
import Portfolio from './Portfolio';
import Walkthroughs from './Walkthroughs';
import ContactForm from './ContactForm';
import ClosingFlight from './ClosingFlight';
import { About, ActionBar, Footer, Hero, Process, Services } from './Sections';

/**
 * `@container/page` is the query root for the whole page. Every breakpoint in
 * this codebase is a container query against it, not a viewport media query —
 * which is what lets the design survive being embedded or resized.
 *
 * `lang` is set here rather than on <html> because both markets share one root
 * layout; assistive tech and search engines read it from the content wrapper.
 *
 * AuroraBackground sits at z-0, fixed behind everything; this wrapper is bumped
 * to z-10 so every section paints above it whatever the DOM order. The wrapper
 * deliberately carries NO background of its own — an opaque fill here would span
 * the full page height and hide the aurora everywhere. `body` still has bg-paper
 * (globals.css) as the root canvas, painting beneath the aurora, so there is a
 * solid base colour wherever no blob reaches.
 */
export default function Home({ market }: { market: Market }) {
  const t = COPY[market];
  return (
    <>
      <AuroraBackground />
      <div lang={t.lang} className="@container/page relative z-10">
        <a
          href="#top"
          className="absolute left-4 top-[-64px] z-[200] rounded-lg bg-ink px-5 py-3 font-bold text-white transition-[top] duration-200 ease-fade focus-visible:top-4"
        >
          {t.skip}
        </a>

        <RevealObserver />
        <Navbar market={market} />
        <main>
          <Hero market={market} />
          <RouteBand market={market} />
          <About market={market} />
          <Services market={market} />
          <Process market={market} />
          <Portfolio market={market} />
          <Walkthroughs market={market} />
          <ContactForm market={market} />
          <ClosingFlight market={market} />
        </main>
        <Footer market={market} />
        <ActionBar market={market} />
      </div>
    </>
  );
}
