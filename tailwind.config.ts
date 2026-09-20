import type { Config } from 'tailwindcss';

/**
 * Brand tokens live here, not in a stylesheet, so every colour is reachable as
 * a utility. Each accent carries three values: `solid` (white text clears
 * 4.5:1 on it), `tint` (page-light surface) and `ink` (dark text on that tint).
 * Measured ratios are in docs/CONTRAST.md.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F9F9F9',
        ink: { DEFAULT: '#0F172A', soft: '#334155', muted: '#52627A' },
        line: '#E2E8F0',
        night: { DEFAULT: '#0B1220', 2: '#16243A', 3: '#1E3050' },
        brand: { DEFAULT: '#047857', deep: '#065F46', tint: '#D1FAE5', light: '#6EE7B7', dot: '#10B981' },
        hue: {
          'emerald-solid': '#047857', 'emerald-tint': '#D1FAE5', 'emerald-ink': '#065F46',
          'azure-solid': '#1D4ED8', 'azure-tint': '#DBEAFE', 'azure-ink': '#1E3A8A',
          'amber-solid': '#B45309', 'amber-tint': '#FEF3C7', 'amber-ink': '#92400E',
          'violet-solid': '#6D28D9', 'violet-tint': '#EDE9FE', 'violet-ink': '#5B21B6',
          'rose-solid': '#BE185D', 'rose-tint': '#FCE7F3', 'rose-ink': '#9D174D',
          'cyan-solid': '#0E7490', 'cyan-tint': '#CFFAFE', 'cyan-ink': '#155E75',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        h1: ['clamp(2rem, 4.6cqi, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5625rem, 3.6cqi, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.125rem, 1.9cqi, 1.4375rem)', { lineHeight: '1.3' }],
        lead: ['clamp(1rem, 1.35cqi, 1.125rem)', { lineHeight: '1.65' }],
      },
      transitionTimingFunction: {
        move: 'cubic-bezier(.32,.72,0,1)',
        fade: 'cubic-bezier(.22,.61,.36,1)',
      },
      keyframes: {
        riseIn: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        growX: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        beamOn: { from: { opacity: '0', transform: 'scale(.7)' }, to: { opacity: '1', transform: 'scale(1)' } },
        wordLit: {
          '0%': { backgroundSize: '0% 0.14em', transform: 'scale(1)' },
          '45%': { backgroundSize: '100% 0.92em', transform: 'scale(1.07)' },
          '100%': { backgroundSize: '100% 0.16em', transform: 'scale(1)' },
        },
      },
      animation: {
        riseIn: 'riseIn 420ms cubic-bezier(.22,.61,.36,1) both',
        growX: 'growX 620ms cubic-bezier(.22,.61,.36,1) both',
        beamOn: 'beamOn 820ms cubic-bezier(.22,.61,.36,1) both',
        wordLit: 'wordLit 820ms cubic-bezier(.32,.72,0,1) both',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};

export default config;
