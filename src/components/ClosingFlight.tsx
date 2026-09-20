'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Plane } from 'lucide-react';
import { MARKET, type Market } from '@/lib/site';
import { PlaneIcon } from './Plane';

const FLIGHT_MS = 3300;

/**
 * The closing section is one continuous flight: the plane crosses each of the
 * three words in turn, banks down past the call button and settles with a
 * landing light on the WhatsApp button. User-triggered only — nothing moves
 * until the visitor hovers or presses, so it never becomes ambient motion.
 * The light fades up once and holds; it never pulses.
 */
export default function ClosingFlight({ market }: { market: Market }) {
  const [phase, setPhase] = useState<'idle' | 'flying' | 'landed'>('idle');
  const landTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const replayTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cfg = MARKET[market];

  useEffect(
    () => () => {
      clearTimeout(landTimer.current);
      clearTimeout(replayTimer.current);
    },
    [],
  );

  const takeOff = useCallback(() => {
    clearTimeout(landTimer.current);
    clearTimeout(replayTimer.current);
    // drop to idle for a frame so the CSS animation restarts on replay
    setPhase('idle');
    replayTimer.current = setTimeout(() => {
      setPhase('flying');
      landTimer.current = setTimeout(() => setPhase('landed'), FLIGHT_MS);
    }, 40);
  }, []);

  const flying = phase !== 'idle';
  const landed = phase === 'landed';
  const word = (delay: string, text: string) => (
    <span
      className={`focus-word ${flying ? 'animate-wordLit' : 'focus-word--off'}`}
      style={flying ? { animationDelay: delay } : undefined}
    >
      {text}
    </span>
  );

  return (
    <section className="border-t border-brand-tint bg-hue-emerald-tint/60 py-14 @[720px]/page:py-20">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="relative text-center" onMouseEnter={takeOff}>
          <h2 className="mx-auto mb-4 max-w-[700px] text-h2">
            <span className="block">Ready to</span>
            <span className="flex flex-wrap justify-center gap-x-[0.34em]">
              {word('620ms', 'automate')},{word('1180ms', 'build')} and{word('1720ms', 'scale?')}
            </span>
          </h2>

          <p className="mx-auto mb-2.5 max-w-[560px] text-lead text-ink-soft">
            Two ways in: an international consultation call, or a direct WhatsApp line for Bangladesh.
          </p>

          <p className="mb-6">
            <button
              type="button"
              onClick={takeOff}
              className="inline-flex min-h-11 items-center gap-2 px-1 font-bold text-brand transition-colors duration-200 ease-fade hover:text-brand-deep"
            >
              <Plane size={17} aria-hidden="true" />
              Take off
            </button>
          </p>

          <div className="flex flex-col items-center justify-center gap-3 @[720px]/page:flex-row @[720px]/page:gap-4">
            <a
              href={cfg.closingPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-6 font-bold text-white transition-all duration-200 ease-move hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_10px_22px_rgba(4,120,87,.28)] active:translate-y-0 active:scale-[.97] @[720px]/page:w-auto"
            >
              {cfg.closingPrimary.label}
            </a>

            <span className="relative inline-flex w-full @[720px]/page:w-auto">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-2.5 rounded-2xl ${landed ? 'animate-beamOn' : 'opacity-0'}`}
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(110,231,183,.85), rgba(110,231,183,0) 72%)',
                }}
              />
              <a
                href={cfg.closingSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] bg-white px-6 font-bold text-brand transition-all duration-200 ease-move hover:-translate-y-0.5 hover:bg-hue-emerald-tint active:translate-y-0 active:scale-[.97] @[720px]/page:w-auto ${
                  landed
                    ? 'border-brand-light shadow-[0_0_0_3px_rgba(110,231,183,.55),0_14px_38px_rgba(4,120,87,.4)]'
                    : 'border-brand-tint'
                }`}
              >
                <MessageCircle size={18} aria-hidden="true" />
                {cfg.closingSecondary.label}
              </a>
            </span>
          </div>

          {flying && (
            <div
              aria-hidden="true"
              className="cl-plane pointer-events-none absolute left-0 top-0 z-[3] -ml-[22px] -mt-[22px] h-11 w-11 text-brand"
            >
              <PlaneIcon />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
