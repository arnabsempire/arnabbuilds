'use client';

import { useEffect } from 'react';

/**
 * The mobile answer to hover.
 *
 * Card lift, glow borders and tilt all need a pointer, so on a phone — which is
 * where most Bangladeshi traffic arrives — they are dead code. A thumb gets no
 * feedback at all unless something is built for it. This draws a ripple from
 * the exact touch point on every card, button and link that opts in with
 * `data-tap`, which is the only interaction confirmation those visitors ever
 * see.
 *
 * One delegated listener on the document rather than one per element, so
 * adding a card later needs no wiring. The ripple is a plain DOM node with a
 * CSS animation and removes itself; nothing is retained between taps.
 */
export default function TouchFeedback() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onDown(e: PointerEvent) {
      const host = (e.target as Element | null)?.closest?.<HTMLElement>('[data-tap]');
      if (!host) return;

      const r = host.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.1;
      const dot = document.createElement('span');
      dot.className = 'tap-ripple';
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX - r.left}px`;
      dot.style.top = `${e.clientY - r.top}px`;

      /* A ripple is positioned against its host, so the host must establish a
         containing block. Most already do; this covers the ones that don't
         without every call site having to remember. */
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.appendChild(dot);
      window.setTimeout(() => dot.remove(), 640);
    }

    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  return null;
}
