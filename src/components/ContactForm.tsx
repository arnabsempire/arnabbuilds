import { ArrowUpRight, CalendarCheck, Mail, MessageCircle } from 'lucide-react';
import { COPY } from '@/lib/copy';
import { SITE, waLink, type Market } from '@/lib/site';

/**
 * Three ways in, and not a form.
 *
 * This site is a static export — there is no server to receive a POST. The
 * previous version submitted to Netlify Forms, which worked only on Netlify and
 * would have failed *silently* anywhere else: the fetch resolves, the success
 * panel appears, and the enquiry goes nowhere. For the one section whose whole
 * job is to not lose a lead, a mechanism that can fail invisibly is the wrong
 * mechanism at any price.
 *
 * So each route is an ordinary link. It either opens or it visibly does not,
 * and a visitor can always see where their message is going before they write
 * it. WhatsApp carries a prefilled first message so the conversation starts with
 * the blank-box pause already removed.
 *
 * WhatsApp also keeps its own brand green rather than the band accent. It is the
 * one colour on this site that names a specific product, and spending it on
 * anything else would stop it reading as WhatsApp.
 */

type Route = {
  href: string;
  external: boolean;
  icon: React.ReactNode;
  title: string;
  body: string;
  /** The WhatsApp row: brand green, and first in the list. */
  primary?: boolean;
};

export default function ContactForm({ market }: { market: Market }) {
  const t = COPY[market].contact;

  const routes: Route[] = [
    {
      href: waLink(COPY[market].wa.contact),
      external: true,
      icon: <MessageCircle size={20} aria-hidden="true" />,
      title: t.waTitle,
      body: t.waBody,
      primary: true,
    },
    {
      href: SITE.cal,
      external: true,
      icon: <CalendarCheck size={20} aria-hidden="true" />,
      title: t.callTitle,
      body: t.callBody,
    },
    {
      href: `mailto:${SITE.email}`,
      external: false,
      icon: <Mail size={20} aria-hidden="true" />,
      title: t.mailTitle,
      body: t.mailBody,
    },
  ];

  return (
    <section id="contact" className="border-b border-b-line py-14 @[720px]/page:py-[76px] @[1120px]/page:py-[104px]">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="grid grid-cols-1 gap-9 @[1120px]/page:grid-cols-[0.9fr_1.1fr] @[1120px]/page:gap-16">
          <div className="reveal">
            <h2 className="mb-3 text-h2">{t.h2}</h2>
            <p className="mb-6 text-lead text-b-ink-soft">{t.lead}</p>
            <p className="text-[15px] leading-[1.65] text-b-ink-muted">{t.reply}</p>
            {/* Spelled out rather than hidden behind the Email card below, because
                people copy an address as often as they click one — but it is a
                real mailto anchor, since anything painted in the accent colour
                reads as clickable and has to actually be. */}
            <a
              href={`mailto:${SITE.email}`}
              data-tap
              className="relative mt-5 inline-block overflow-hidden text-[15px] font-bold text-b-accent underline decoration-b-accent/35 underline-offset-4 transition-colors duration-200 ease-fade hover:decoration-b-accent"
            >
              {SITE.email}
            </a>
          </div>

          <div className="reveal flex flex-col gap-3.5">
            {routes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                data-tap
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group relative flex items-start gap-4 overflow-hidden rounded-[14px] border p-5 transition-all duration-[260ms] ease-move hover:-translate-y-1 @[720px]/page:p-6 ${
                  r.primary
                    ? 'border-wa/45 bg-wa/[.07] hover:border-wa hover:shadow-[0_18px_40px_-14px_rgb(37_211_102/.45)]'
                    : 'border-b-line bg-b-surface hover:border-b-accent hover:shadow-[0_18px_40px_-14px_rgb(0_0_0/.22)]'
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] ${
                    r.primary ? 'bg-wa text-wa-ink' : 'bg-b-accent-soft text-b-accent'
                  }`}
                >
                  {r.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 flex items-center gap-1.5 text-[17px] font-bold text-b-ink">
                    {r.title}
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-b-ink-muted transition-transform duration-200 ease-move group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="block text-sm leading-[1.65] text-b-ink-muted">{r.body}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
