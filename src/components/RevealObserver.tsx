'use client';

import { useEffect } from 'react';

/**
 * Progressive-enhancement scroll reveal for `.reveal` elements.
 *
 * Browsers with native CSS scroll-driven animations need nothing from this
 * component — the `@supports` rule in globals.css handles entry entirely in
 * CSS, which is cheaper and can never hide content if a script fails.
 *
 * Firefox has no scroll-timeline support and gets this IntersectionObserver
 * instead. `.reveal` elements are fully visible by default; this effect only
 * opts them into the hidden, waiting-to-rise state at the moment it starts
 * observing them, so a slow or broken script never leaves content invisible.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (
      typeof CSS !== 'undefined' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)')
    ) {
      return;
    }

    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!els.length) return;

    els.forEach((el) => el.classList.add('reveal-js'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
