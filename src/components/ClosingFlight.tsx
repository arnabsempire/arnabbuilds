'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Plane } from 'lucide-react';
import { type Market } from '@/lib/site';
import { COPY, type Action } from '@/lib/copy';
import { PlaneIcon } from './Plane';

const FLIGHT_MS = 3300;

const SOLID =
  'bg-brand text-white hover:bg-brand-deep hover:shadow-[0_10px_22px_rgba(4,120,87,.28)]';
const GHOST = 'bg-b-surface text-b-accent hover:bg-b-accent-soft';

/**
 * The closing section is one continuous flight: the plane crosses each of the
 * three words in turn, banks down past the first button and settles with a
 * landing light on the WhatsApp button. User-triggered only — nothing moves
 * until the visitor hovers or presses, so it never becomes ambient motion.
 * The light fades up once and holds; it never pulses.
 *
 * Word order is read from copy because Bengali puts the verb last: the three
 * words still arrive in sequence, but the question closes behind them.
 */
export default function ClosingFlight({ market }: { market: Market }) {
  const [phase, setPhase] = useState<'idle' | 'flying' | 'landed'>('idle');
  const landTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const replayTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const t = COPY[market].closing;

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

  const skin = (a: Action) => (a.variant === 'solid' ? SOLID : `border-[1.5px] border-b-line ${GHOST}`);

  return (
    <section className="border-t border-b-line bg-b-accent-soft/60 py-14 @[720px]/page:py-20">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="relative text-center" onMouseEnter={takeOff}>
          <h2 className="mx-auto mb-4 max-w-[700px] text-h2">
            {t.lead && <span className="block">{t.lead}</span>}
            {/* Inline flow, not flex: a flex gap would open a space in front of
                the comma. The separators carry their own spacing instead. */}
            <span className="block">
              {word('620ms', t.w1)}
              {t.sep1}
              {word('1180ms', t.w2)}
              {t.sep2}
              {word('1720ms', t.w3)}
              {t.tail}
            </span>
          </h2>

          <p className="mx-auto mb-2.5 max-w-[560px] text-lead text-b-ink-soft">{t.sub}</p>

          <p className="mb-6">
            <button
              type="button"
              onClick={takeOff}
              className="inline-flex min-h-11 items-center gap-2 px-1 font-bold text-b-accent transition-colors duration-200 ease-fade hover:text-b-accent-deep"
            >
              <Plane size={17} aria-hidden="true" />
              {t.takeOff}
            </button>
          </p>

          <div className="flex flex-col items-center justify-center gap-3 @[720px]/page:flex-row @[720px]/page:gap-4">
            <a
              href={t.left.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg px-6 font-bold transition-all duration-200 ease-move hover:-translate-y-0.5 active:translate-y-0 active:scale-[.97] @[720px]/page:w-auto ${skin(t.left)}`}
            >
              {t.left.label}
            </a>

            {/* The light always lands here, and this is always WhatsApp. */}
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
                href={t.right.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-6 font-bold transition-all duration-200 ease-move hover:-translate-y-0.5 active:translate-y-0 active:scale-[.97] @[720px]/page:w-auto ${skin(t.right)} ${
                  landed
                    ? 'shadow-[0_0_0_3px_rgba(110,231,183,.55),0_14px_38px_rgba(4,120,87,.4)]'
                    : ''
                }`}
              >
                <MessageCircle size={18} aria-hidden="true" />
                {t.right.label}
              </a>
            </span>
          </div>

          {flying && (
            <div
              aria-hidden="true"
              className="cl-plane pointer-events-none absolute left-0 top-0 z-[3] -ml-[22px] -mt-[22px] h-11 w-11 text-b-accent"
            >
              <PlaneIcon />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
