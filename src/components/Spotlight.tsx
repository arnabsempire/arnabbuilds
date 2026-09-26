'use client';

import { useEffect, useRef } from 'react';

/**
 * A pool of violet light that follows the cursor across the page.
 *
 * Desktop only by construction — it is driven by pointer coordinates, so a
 * phone never lights it and nothing needs to be feature-detected. That also
 * means it can never be the thing carrying the hero: most visitors will not
 * see it at all.
 *
 * Coordinates are written as custom properties and the paint is left to CSS,
 * so the pointer handler never touches layout. The element is `fixed`, so
 * viewport coordinates are exactly what the gradient wants and no
 * getBoundingClientRect is needed per move.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onMove(e: PointerEvent) {
      if (e.pointerType === 'touch') return;
      el!.style.setProperty('--sx', `${e.clientX}px`);
      el!.style.setProperty('--sy', `${e.clientY}px`);
      el!.dataset.lit = 'true';
    }
    function onLeave() {
      el!.dataset.lit = 'false';
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="spotlight" data-lit="false" />;
}
