import Image from 'next/image';
import { Globe, Layers, Linkedin, Mail, MapPin, MessageCircle, Phone, Share2, Zap } from 'lucide-react';
import { MARKET, SITE, HUE, type Market } from '@/lib/site';
import { COPY } from '@/lib/copy';
import { pillarsFor, stepsFor } from '@/lib/content';

const PILLAR_ICONS = { zap: Zap, globe: Globe, layers: Layers, share: Share2 } as const;
const shell = 'mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14';
const section = 'border-b border-line py-14 @[720px]/page:py-[76px] @[1120px]/page:py-[104px]';

function Cta({ href, label, variant, external }: { href: string; label: string; variant: 'primary' | 'ghost'; external?: boolean }) {
  const base =
    'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-6 font-bold transition-all duration-200 ease-move hover:-translate-y-0.5 active:translate-y-0 active:scale-[.97] @[720px]/page:w-auto';
  const skin =
    variant === 'primary'
      ? 'bg-brand text-white hover:bg-brand-deep hover:shadow-[0_10px_22px_rgba(4,120,87,.28)]'
      : 'border-[1.5px] border-brand-tint bg-white text-brand hover:bg-hue-emerald-tint';
  return (
    <a href={href} className={`${base} ${skin}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {label}
    </a>
  );
}

export function Hero({ market }: { market: Market }) {
  const cfg = MARKET[market];
  const t = COPY[market].hero;
  return (
    <section id="top" className={section}>
      <div className={shell}>
        <div className="grid grid-cols-1 items-center gap-9 @[1120px]/page:grid-cols-[1.08fr_0.92fr] @[1120px]/page:gap-14">
          <div>
            <p className="mb-5 inline-block animate-riseIn rounded-full bg-hue-emerald-tint px-3.5 py-[7px] text-xs font-bold uppercase tracking-[.08em] text-brand">
              {t.eyebrow}
            </p>
            <h1 className="mb-[18px] text-h1">{t.h1}</h1>
            <p className="mb-4 text-lead text-ink-soft">
              <strong className="text-ink">{t.leadStrong}</strong> {t.leadRest}
            </p>
            <p className="mb-[30px] text-[15px] leading-[1.65] text-ink-muted">{cfg.heroNote}</p>

            <div className="flex flex-col gap-3 @[720px]/page:flex-row @[720px]/page:flex-wrap @[720px]/page:gap-4">
              <Cta href={cfg.primaryCta.href} label={cfg.primaryCta.label} variant="primary" external={cfg.primaryCta.external} />
              <Cta href={cfg.secondaryCta.href} label={cfg.secondaryCta.label} variant="ghost" external={cfg.secondaryCta.external} />
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-7 @[720px]/page:grid-cols-3">
              {t.stats.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-[21px] font-bold">{k}</dt>
                  <dd className="text-[13px] leading-[1.5] text-ink-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid animate-riseIn grid-cols-1 gap-3 rounded-[14px] border border-brand-tint bg-hue-emerald-tint p-5 @[720px]/page:grid-cols-3 @[720px]/page:p-6 @[1120px]/page:grid-cols-1 @[1120px]/page:gap-4 @[1120px]/page:p-8">
            {t.cards.map(([k, v, note]) => (
              <div key={k} className="rounded-[10px] border border-brand-tint bg-white px-[18px] py-4">
                <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink-muted">{k}</p>
                <p className="mt-0.5 font-display text-2xl font-bold @[1120px]/page:text-3xl">{v}</p>
                <p className="text-[13px] leading-[1.5] text-ink-muted">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function About({ market }: { market: Market }) {
  const t = COPY[market].about;
  return (
    <section id="about" className={`${section} bg-white`}>
      <div className={shell}>
        <div className="grid grid-cols-1 items-center gap-8 @[1120px]/page:grid-cols-[0.95fr_1.05fr] @[1120px]/page:gap-16">
          <div className="@[1120px]/page:order-2 @[1120px]/page:justify-self-end">
            {/* An environmental portrait, not a headshot: the cabin behind him is
                the evidence for the aviation claim the copy makes. Sized to the
                column so the 3:2 frame sits level with the text beside it. */}
            <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-line shadow-[0_18px_40px_rgba(15,23,42,.1)] @[1120px]/page:max-w-none">
              <Image
                src="/arnab-aditya-das.jpg"
                alt={`${SITE.founder} in cabin crew uniform aboard an aircraft`}
                width={1264}
                height={843}
                priority
                sizes="(min-width: 1120px) 48vw, (min-width: 720px) 60vw, 90vw"
                className="block h-auto w-full"
              />
            </div>
          </div>

          <div className="@[1120px]/page:order-1">
            <p className="mb-[18px] inline-block rounded-full bg-hue-emerald-tint px-3.5 py-[7px] text-xs font-bold uppercase tracking-[.08em] text-brand">
              {t.eyebrow}
            </p>
            <h2 className="mb-4 text-h2">{t.name}</h2>
            <p className="mb-4 text-base leading-[1.65] text-ink-muted">{t.p1}</p>
            <p className="text-base leading-[1.65] text-ink-muted">{t.p2}</p>

            <div className="my-7 grid grid-cols-2 gap-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink-muted">{t.backgroundLabel}</p>
                <p className="mb-0.5 mt-1 font-bold">{t.backgroundValue}</p>
                <p className="text-[13px] leading-[1.5] text-ink-muted">{t.backgroundNote}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink-muted">{t.expertiseLabel}</p>
                <p className="mb-0.5 mt-1 font-bold">{t.expertiseValue}</p>
                <p className="text-[13px] leading-[1.5] text-ink-muted">{t.expertiseNote}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 @[720px]/page:flex-row @[720px]/page:gap-4">
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-6 font-bold text-white transition-all duration-200 ease-move hover:-translate-y-0.5 hover:bg-[#084E96] @[720px]/page:w-auto">
                <Linkedin size={18} aria-hidden="true" /> {t.linkedinCta}
              </a>
              <a href={`mailto:${SITE.email}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand-tint bg-white px-6 font-bold text-brand transition-all duration-200 ease-move hover:-translate-y-0.5 hover:bg-hue-emerald-tint @[720px]/page:w-auto">
                <Mail size={18} aria-hidden="true" /> {t.emailCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services({ market }: { market: Market }) {
  const showPricing = MARKET[market].showPricing;
  const t = COPY[market].services;
  const pillars = pillarsFor(market);
  return (
    <section id="services" className={section}>
      <div className={shell}>
        <div className="mb-8 max-w-[640px] @[720px]/page:mb-11 @[1120px]/page:mb-[60px]">
          <h2 className="mb-3 text-h2">{t.h2}</h2>
          <p className="text-lead text-ink-soft">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 @[720px]/page:grid-cols-2 @[720px]/page:gap-5 @[1120px]/page:grid-cols-3 @[1120px]/page:gap-6">
          {pillars.map((p) => {
            const Icon = PILLAR_ICONS[p.icon];
            const hue = HUE[p.hue];
            const span =
              p.span === 'wide' ? '@[1120px]/page:col-span-2'
                : p.span === 'full' ? '@[720px]/page:col-span-2 @[1120px]/page:col-span-3'
                : '';
            return (
              <article key={p.title}
                className={`flex flex-col gap-[18px] rounded-[14px] border border-line bg-white p-[26px] transition-all duration-[260ms] ease-move hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(15,23,42,.1)] @[720px]/page:p-[30px] @[1120px]/page:p-9 ${hue.ring} ${span}`}>
                <div className={`flex h-[46px] w-[46px] items-center justify-center rounded-xl ${hue.tint} ${hue.ink}`}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2.5 text-h3">{p.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-ink-muted">{p.copy}</p>
                </div>
                <div className="mt-auto pt-1">
                  {/* Premium positioning: the international site never lists a figure. */}
                  <p className="mb-2.5 text-[13px] leading-[1.5] text-ink-muted">
                    {showPricing ? p.price : t.noPrice}
                  </p>
                  <a href="#work" className={`inline-flex items-center gap-1.5 font-bold ${hue.ink}`}>
                    {t.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Process({ market }: { market: Market }) {
  const t = COPY[market].process;
  const steps = stepsFor(market);
  return (
    <section id="process" className={section}>
      <div className={shell}>
        <div className="mx-auto mb-8 max-w-[640px] text-center @[720px]/page:mb-11 @[1120px]/page:mb-[60px]">
          <h2 className="mb-3 text-h2">{t.h2}</h2>
          <p className="text-lead text-ink-soft">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 @[720px]/page:grid-cols-2 @[720px]/page:gap-[18px] @[1120px]/page:grid-cols-4 @[1120px]/page:gap-6">
          {steps.map((s) => (
            <article key={s.n}
              className="group flex items-start gap-4 rounded-xl border border-line bg-white p-[18px] @[1120px]/page:flex-col @[1120px]/page:items-center @[1120px]/page:gap-[18px] @[1120px]/page:px-6 @[1120px]/page:py-8 @[1120px]/page:text-center">
              <div className={`flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full font-display text-[19px] font-bold text-white transition-transform duration-[280ms] ease-move group-hover:-rotate-[5deg] group-hover:scale-[1.09] @[1120px]/page:h-[60px] @[1120px]/page:w-[60px] @[1120px]/page:text-[23px] ${HUE[s.hue].solid}`}>
                {s.n}
              </div>
              <div>
                <h3 className="mb-1.5 text-[17px] font-bold">{s.title}</h3>
                <p className="text-sm leading-[1.65] text-ink-muted">{s.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ market }: { market: Market }) {
  const t = COPY[market].footer;
  return (
    <footer className="on-night bg-ink pb-7 pt-11 text-slate-300 @[720px]/page:pb-8 @[720px]/page:pt-[60px]">
      <div className={shell}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 border-b border-slate-800 pb-8 @[720px]/page:grid-cols-4 @[720px]/page:gap-8 @[1120px]/page:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 @[720px]/page:col-span-4 @[720px]/page:max-w-[420px] @[1120px]/page:col-span-1 @[1120px]/page:max-w-none">
            <div className="mb-3 flex items-center gap-2.5 font-display text-[19px] font-bold text-slate-50">
              <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-brand text-white">A</span>
              Arnab Builds
            </div>
            <p className="text-sm leading-[1.65] text-slate-400">{t.tagline}</p>
          </div>

          <div>
            <h4 className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[.1em] text-slate-400">{t.servicesHeading}</h4>
            <ul className="flex list-none flex-col gap-2.5 p-0">
              {t.serviceLinks.map((s) => (
                <li key={s}><a href="#services" className="text-sm hover:text-brand-light">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[.1em] text-slate-400">{t.companyHeading}</h4>
            <ul className="flex list-none flex-col gap-2.5 p-0">
              {t.companyLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="text-sm hover:text-brand-light">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[.1em] text-slate-400">{t.coverageHeading}</h4>
            <ul className="flex list-none flex-col gap-2.5 p-0 text-sm text-slate-400">
              {t.hubs.map((city) => (
                <li key={city} className="flex items-center gap-2">
                  <MapPin size={15} aria-hidden="true" /> {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-[18px] pt-7 @[720px]/page:flex-row @[720px]/page:items-end @[720px]/page:justify-between">
          <div className="flex flex-col gap-2.5">
            <span className="inline-flex items-center gap-2.5 text-sm">
              <Mail size={17} aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-light">{SITE.email}</a>
            </span>
            <span className="inline-flex items-center gap-2.5 text-sm">
              <Phone size={17} aria-hidden="true" />
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light">
                {SITE.phoneDisplay}
              </a>
            </span>
            <span className="inline-flex items-center gap-2.5 text-sm">
              <Linkedin size={17} aria-hidden="true" />
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light">
                {t.linkedinLabel}
              </a>
            </span>
          </div>
          <div className="text-[13px] text-slate-400">
            <p>© {new Date().getFullYear()} Arnab Builds. {t.rights}</p>
            <p className="mt-1">{t.builtWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ActionBar({ market }: { market: Market }) {
  const t = COPY[market].actionBar;
  return (
    <div className="safe-bottom sticky bottom-0 z-40 flex gap-2.5 border-t border-line bg-white/95 px-4 pt-3 backdrop-blur-md @[720px]/page:hidden">
      <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand-tint bg-white px-3 text-[15px] font-bold text-brand">
        <MessageCircle size={17} aria-hidden="true" /> {t.whatsapp}
      </a>
      <a href={SITE.cal} target="_blank" rel="noopener noreferrer"
        className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-brand px-3 text-[15px] font-bold text-white">
        {t.call}
      </a>
    </div>
  );
}
