'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { MARKET, type Market } from '@/lib/site';
import { COPY } from '@/lib/copy';

export default function Navbar({ market }: { market: Market }) {
  const [open, setOpen] = useState(false);
  const cfg = MARKET[market];
  const t = COPY[market];

  return (
    <header className="sticky top-0 z-50 border-b border-b-line bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1312px] items-center justify-between gap-4 px-5 py-3 @[720px]/page:px-8 @[1120px]/page:min-h-[76px] @[1120px]/page:px-14">
        <div className="flex min-w-0 flex-col gap-1.5">
          <Link href={cfg.path} className="flex items-center gap-2.5 font-display text-[19px] font-bold text-b-ink @[1120px]/page:text-[22px]">
            <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-brand text-white">A</span>
            <span>Arnab Builds</span>
          </Link>

          {/*
            The market switch is the single most important link for a visitor
            who landed on the wrong side of the dual-market split, and burying
            it in a burger menu means most of them never find it. It sits in
            the open under the wordmark up to 1120px, where the desktop nav
            takes over and carries it inline instead.
          */}
          <Link
            href={cfg.switchHref}
            data-tap
            className="relative ml-[46px] inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full border border-b-line bg-b-accent-soft px-3 py-1 text-[13px] font-bold text-b-accent transition-colors duration-200 ease-fade hover:border-b-accent @[1120px]/page:hidden"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-b-accent" />
            {cfg.switchLabel}
          </Link>
        </div>

        <nav className="hidden items-center gap-7 @[1120px]/page:flex">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-semibold text-b-ink transition-colors duration-200 ease-fade hover:text-b-accent">
              {l.label}
            </a>
          ))}
          <span className="flex items-center gap-2 text-[13px] font-semibold text-b-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-hue-violet-d shadow-[0_0_0_3px_rgba(179,156,251,.22)]" />
            {t.nav.status}
          </span>
          <Link href={cfg.switchHref} className="text-[13px] font-bold text-b-accent hover:text-b-accent-deep">
            {cfg.switchLabel}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-b-line bg-b-surface text-b-ink transition-colors duration-200 ease-fade hover:bg-b-accent-soft hover:text-b-accent @[1120px]/page:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="origin-top border-t border-b-line bg-b-surface pb-4 pt-2 @[1120px]/page:hidden">
          {t.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center border-b border-b-line px-5 text-[17px] font-semibold text-b-ink"
            >
              {l.label}
            </a>
          ))}
          {/* The market switch is NOT repeated here — it sits in the open
              under the wordmark, so duplicating it inside the menu would give
              the same destination two controls and no reason to prefer one. */}
          <div className="px-5 pt-4">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-b-ink-soft">
              <span className="h-2.5 w-2.5 rounded-full bg-hue-violet-d shadow-[0_0_0_3px_rgba(179,156,251,.22)]" />
              {t.nav.status}
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
