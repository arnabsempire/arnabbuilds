'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BarChart3, Building2, KanbanSquare, MessageCircle, Package, Target } from 'lucide-react';
import { casesFor, type CaseStudy } from '@/lib/content';
import { COPY, type Copy } from '@/lib/copy';
import { HUE, type Market } from '@/lib/site';

const ICONS = {
  building: Building2, package: Package, target: Target,
  chart: BarChart3, chat: MessageCircle, kanban: KanbanSquare,
} as const;

/** Abstract stand-in for the product UI. Only transform animates. */
function DemoFrame({ bars, big = false }: { bars: readonly number[]; big?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute flex flex-col rounded-[9px] bg-white/[.16] ${
        big ? 'inset-[18px] gap-2.5 p-4' : 'inset-2.5 gap-[7px] p-[11px]'
      }`}
    >
      {bars.map((width, i) => (
        <span
          key={i}
          className={`block origin-left animate-growX rounded-[4px] bg-white/[.85] ${big ? 'h-2.5' : 'h-[7px]'}`}
          style={{ width: `${width}%`, animationDelay: `${60 + i * 140}ms` }}
        />
      ))}
    </div>
  );
}

function CaseCard({
  study, t, playing, onPlay, onOpen,
}: { study: CaseStudy; t: Copy['work']; playing: boolean; onPlay: () => void; onOpen: () => void }) {
  const hue = HUE[study.hue];
  const Icon = ICONS[study.icon];

  return (
    <article className={`flex flex-col overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-[260ms] ease-move hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(15,23,42,.1)] ${hue.ring}`}>
      <div className={`relative flex h-[124px] items-end justify-between p-[18px] text-white @[720px]/page:h-[140px] @[1120px]/page:h-[152px] ${hue.solid}`}>
        <span className={`transition-opacity duration-[240ms] ease-fade ${playing ? 'opacity-0' : 'opacity-100'}`}>
          <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <span className={`font-display text-[13px] transition-opacity duration-[240ms] ease-fade ${playing ? 'opacity-0' : 'opacity-85'}`}>
          {study.title.split(' ')[0]}
        </span>
        {playing && <DemoFrame bars={study.bars} />}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <span className={`inline-block w-fit rounded-full px-[11px] py-[5px] text-[11px] font-bold uppercase tracking-[.06em] ${hue.tint} ${hue.ink}`}>
          {t.kinds[study.kind]}
        </span>
        <h3 className="text-h3">{study.title}</h3>
        <p className="text-[15px] leading-[1.65] text-ink-muted">{study.challenge}</p>
        <p className="mt-auto border-t border-line pt-3.5 text-[13px] text-ink-muted">
          <strong className="text-ink">{t.outcomeLabels[study.outcomeLabel]}:</strong> {study.outcome}
        </p>
        <div className="mt-3 flex gap-2.5">
          <button type="button" onClick={onPlay}
            className={`min-h-11 flex-1 rounded-lg border border-line bg-white text-[13px] font-bold transition-colors duration-200 ease-fade ${hue.ink}`}>
            {playing ? t.stop : t.play}
          </button>
          <button type="button" onClick={onOpen}
            className={`min-h-11 flex-1 rounded-lg border border-line bg-white text-[13px] font-bold transition-colors duration-200 ease-fade ${hue.ink}`}>
            {t.full}
          </button>
        </div>
      </div>
    </article>
  );
}

function DemoModal({ study, t, onClose }: { study: CaseStudy; t: Copy['work']; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const hue = HUE[study.hue];

  /* Escape closes, focus lands inside, and the page behind cannot scroll. */
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/70 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-[560px] overflow-y-auto rounded-[18px] bg-white shadow-[0_30px_80px_rgba(15,23,42,.35)]"
      >
        <div className={`relative h-[190px] ${hue.solid}`}>
          <DemoFrame bars={study.bars} big />
        </div>
        <div className="p-[26px]">
          <span className={`inline-block rounded-full px-[11px] py-[5px] text-[11px] font-bold uppercase tracking-[.06em] ${hue.tint} ${hue.ink}`}>
            {t.kinds[study.kind]}
          </span>
          <h3 id="demo-title" className="mb-2 mt-3 text-h3">{study.title}</h3>
          <p className="text-[15px] leading-[1.65] text-ink-muted">{study.challenge}</p>

          <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
            {study.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-[1.55] text-ink-muted">
                <em className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full text-xs font-bold not-italic ${hue.tint} ${hue.ink}`}>
                  {i + 1}
                </em>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-line pt-3.5 text-[13px] text-ink-muted">
            <strong className="text-ink">{t.stackLabel}:</strong> {study.stack}
          </p>
          <button ref={closeRef} type="button" onClick={onClose}
            className="mt-5 min-h-12 w-full rounded-lg bg-ink font-bold text-white transition-colors duration-200 ease-fade hover:bg-ink-soft">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ market }: { market: Market }) {
  const [playing, setPlaying] = useState(-1);
  const [modal, setModal] = useState(-1);
  const close = useCallback(() => setModal(-1), []);
  const t = COPY[market].work;
  const cases = casesFor(market);

  return (
    <section id="work" className="border-b border-line py-14 @[720px]/page:py-[76px] @[1120px]/page:py-[104px]">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="mb-8 max-w-[640px] @[720px]/page:mb-11 @[1120px]/page:mb-[60px]">
          <h2 className="mb-3 text-h2">{t.h2}</h2>
          <p className="text-lead text-ink-soft">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-[18px] @[720px]/page:grid-cols-2 @[720px]/page:gap-[22px] @[1120px]/page:grid-cols-3 @[1120px]/page:gap-[26px]">
          {cases.map((study, i) => (
            <CaseCard
              key={study.slug}
              study={study}
              t={t}
              playing={playing === i}
              onPlay={() => setPlaying((p) => (p === i ? -1 : i))}
              onOpen={() => setModal(i)}
            />
          ))}
        </div>
      </div>

      {modal >= 0 && <DemoModal study={cases[modal]} t={t} onClose={close} />}
    </section>
  );
}
