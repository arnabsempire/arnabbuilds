'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { MARKET, SITE, type Market } from '@/lib/site';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#work', label: 'Portfolio' },
];

export default function Navbar({ market }: { market: Market }) {
  const [open, setOpen] = useState(false);
  const cfg = MARKET[market];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1312px] items-center justify-between gap-4 px-5 py-3 @[720px]/page:px-8 @[1120px]/page:min-h-[76px] @[1120px]/page:px-14">
        <Link href={cfg.path} className="flex items-center gap-2.5 font-display text-[19px] font-bold text-ink @[1120px]/page:text-[22px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-brand text-white">A</span>
          <span>Arnab Builds</span>
        </Link>

        <nav className="hidden items-center gap-7 @[1120px]/page:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-semibold text-ink transition-colors duration-200 ease-fade hover:text-brand">
              {l.label}
            </a>
          ))}
          <span className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-dot shadow-[0_0_0_3px_rgba(16,185,129,.2)]" />
            {SITE.status}
          </span>
          <Link href={cfg.switchHref} className="text-[13px] font-bold text-brand hover:text-brand-deep">
            {cfg.switchLabel}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-line bg-white text-ink transition-colors duration-200 ease-fade hover:bg-hue-emerald-tint hover:text-brand @[1120px]/page:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="origin-top border-t border-line bg-white pb-4 pt-2 @[1120px]/page:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center border-b border-slate-100 px-5 text-[17px] font-semibold text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 px-5 pt-4">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-dot shadow-[0_0_0_3px_rgba(16,185,129,.2)]" />
              {SITE.status}
            </span>
            <Link href={cfg.switchHref} className="text-sm font-bold text-brand">
              {cfg.switchLabel}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
