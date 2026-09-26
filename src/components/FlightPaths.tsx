'use client';

import { useEffect, useRef } from 'react';

/**
 * The page background: curved arcs with a light travelling along each one.
 *
 * It is the one image that carries both halves of the positioning at once — an
 * arc between two points reads as a route map and as a data pipeline, so it
 * says aviation and automation without picking a side. That is why it beats the
 * decorative options (embers, aurora): those are pretty and say nothing.
 *
 * One canvas, one rAF loop, seven arcs. Everything is drawn in the Cockpit hues
 * so the background and the foreground share a palette rather than sitting in
 * two unrelated colour worlds.
 *
 * Fixed and aria-hidden. It paints behind the light bands too, which is the
 * point of the seam gradient in globals.css — the arcs fade out under paper
 * rather than being clipped at a hard edge.
 */

/* Cockpit, as canvas-ready rgb triplets. Kept in sync with tailwind.config.ts
   by hand: the config is TypeScript that Tailwind consumes at build time, and
   reading it at runtime would ship the whole config to the browser. */
const HUES = [
  '179,156,251', // violet
  '255,176,32',  // amber
  '251,113,133', // coral
  '125,211,252', // sky
  '253,186,116', // sodium
  '129,140,248', // indigo
];

type Arc = {
  x0: number; y0: number; cx: number; cy: number; x1: number; y1: number;
  col: string; t: number; v: number;
};

export default function FlightPaths() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Motion is opt-out at the platform level. Reduced motion gets one static
       frame — the arcs are still drawn, they simply do not move, so the page
       keeps its texture instead of going flat. */
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let arcs: Arc[] = [];
    let raf = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      arcs = Array.from({ length: 7 }, (_, i) => {
        const x0 = rand(-0.1, 0.35) * w;
        const y0 = rand(0.04, 0.96) * h;
        const x1 = rand(0.65, 1.1) * w;
        const y1 = rand(0.04, 0.96) * h;
        return {
          x0, y0, x1, y1,
          cx: (x0 + x1) / 2,
          cy: (y0 + y1) / 2 - rand(0.1, 0.3) * h,
          col: HUES[i % HUES.length],
          t: Math.random(),
          v: rand(0.0014, 0.0038),
        };
      });
    }

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (still) draw();
    }

    function glow(x: number, y: number, r: number, col: string, a: number) {
      const g = ctx!.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(0.35, `rgba(${col},${a * 0.34})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fill();
    }

    function draw() {
      if (!w || !h) return;
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = 'lighter';
      ctx!.lineWidth = 1;
      ctx!.setLineDash([3, 7]);

      for (const a of arcs) {
        ctx!.beginPath();
        ctx!.moveTo(a.x0, a.y0);
        ctx!.quadraticCurveTo(a.cx, a.cy, a.x1, a.y1);
        ctx!.strokeStyle = `rgba(${a.col},.15)`;
        ctx!.stroke();

        /* Five dots of decreasing size and opacity make the comet. Drawing a
           real trail would mean keeping a history buffer per arc; this reads
           the same and costs five gradients. */
        for (let k = 0; k < 5; k++) {
          const u = a.t - k * 0.022;
          if (u < 0 || u > 1) continue;
          const m = 1 - u;
          const x = m * m * a.x0 + 2 * m * u * a.cx + u * u * a.x1;
          const y = m * m * a.y0 + 2 * m * u * a.cy + u * u * a.y1;
          glow(x, y, 11 - k * 1.6, a.col, (0.85 - k * 0.16) * 0.85);
        }

        glow(a.x0, a.y0, 7, a.col, 0.3);
        glow(a.x1, a.y1, 7, a.col, 0.3);
      }

      ctx!.setLineDash([]);
      ctx!.globalCompositeOperation = 'source-over';
    }

    function tick() {
      for (const a of arcs) {
        a.t += a.v;
        if (a.t > 1.12) a.t = -0.12;
      }
      draw();
      raf = requestAnimationFrame(tick);
    }

    size();
    window.addEventListener('resize', size);
    if (!still) raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', size);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
