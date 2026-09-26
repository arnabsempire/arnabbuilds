import type { Market } from '@/lib/site';
import { COPY } from '@/lib/copy';
import FlightPaths from './FlightPaths';
import RevealObserver from './RevealObserver';
import Spotlight from './Spotlight';
import TouchFeedback from './TouchFeedback';
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
 * FlightPaths sits at z-0, fixed behind everything; this wrapper is bumped to
 * z-10 so every band paints above it whatever the DOM order. The wrapper
 * deliberately carries NO background of its own — an opaque fill here would
 * span the full page height and hide the arcs everywhere. `body` is bg-night
 * (globals.css), the base the arcs are drawn on; the light bands paint their
 * own paper over the top.
 */

/**
 * Section order and band rhythm, both in one place because they are one
 * decision. This is "Trust first": the aviation record is the only thing on
 * this site a competitor cannot copy, so it lands in slot two, before price
 * enters anyone's head. The sticky action bar is what makes that safe — a
 * visitor who already knows what they want is never more than one tap from
 * WhatsApp, whatever they are reading.
 *
 * `band-d` and `band-l` rebind the ink, line and surface variables that every
 * component below is written against, so changing this list changes the whole
 * page and nothing else has to know.
 */
function Band({ tone, children }: { tone: 'd' | 'l'; children: React.ReactNode }) {
  return <div className={`relative ${tone === 'd' ? 'band-d' : 'band-l'}`}>{children}</div>;
}

export default function Home({ market }: { market: Market }) {
  const t = COPY[market];
  return (
    <>
      <FlightPaths />
      <Spotlight />
      <div lang={t.lang} className="@container/page relative z-10">
        <a
          href="#top"
          className="absolute left-4 top-[-64px] z-[200] rounded-lg bg-hue-violet-d px-5 py-3 font-bold text-night transition-[top] duration-200 ease-fade focus-visible:top-4"
        >
          {t.skip}
        </a>

        <RevealObserver />
        <TouchFeedback />
        <Navbar market={market} />
        <main>
          <Band tone="d"><Hero market={market} /></Band>
          <Band tone="l"><About market={market} /></Band>
          <Band tone="d"><Services market={market} /></Band>
          <Band tone="l"><Process market={market} /></Band>
          <Band tone="d"><RouteBand market={market} /></Band>
          {/* Walkthroughs sits on paper deliberately: the three demos it links
              to are light HTML pages, so a dark band here would hand the
              visitor a white flash and a page that reads as pasted in. Putting
              the section on the same ground as its destinations costs nothing
              and works identically on both widths. Portfolio takes the dark
              slot, which also puts the interactive proof before the case list. */}
          <Band tone="l"><Walkthroughs market={market} /></Band>
          <Band tone="d"><Portfolio market={market} /></Band>
          <Band tone="l"><ContactForm market={market} /></Band>
          <Band tone="d"><ClosingFlight market={market} /></Band>
        </main>
        <Footer market={market} />
        <ActionBar market={market} />
      </div>
    </>
  );
}
