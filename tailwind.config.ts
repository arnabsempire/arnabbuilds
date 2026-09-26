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
        /* Two grounds, because the page alternates dark and light bands. Every
           component is styled once against `--ink`/`--surface`/`--line`, which
           the .band-d and .band-l classes in globals.css rebind. */
        night: { DEFAULT: '#0A0612', 2: '#140C22', 3: '#1D1233' },
        paper: { DEFAULT: '#FAF8FD', 2: '#FFFFFF' },
        'line-d': '#2C1E46',
        'line-l': '#E6E0F0',
        'ink-d': { DEFAULT: '#F6F2FC', soft: '#BCAFD4', muted: '#8A7CA6' },
        'ink-l': { DEFAULT: '#1A1125', soft: '#544966', muted: '#7C7190' },

        /* Band-relative tokens. `.band-d` and `.band-l` in globals.css rebind
           these four variables, so a component written against them paints
           correctly on either ground without knowing which one it is on. This
           is what makes the alternating rhythm one component deep instead of
           two. */
        b: {
          ink: 'var(--b-ink)',
          'ink-soft': 'var(--b-ink-soft)',
          'ink-muted': 'var(--b-ink-muted)',
          line: 'var(--b-line)',
          surface: 'var(--b-surface)',
          accent: 'var(--b-accent)',
          'accent-soft': 'var(--b-accent-soft)',
        },

        /* Cockpit: violet leads, the supports run warm. Each hue carries a
           dark-band value and a light-band value; both clear 4.5:1 on their own
           ground. Measured ratios in docs/CONTRAST.md. */
        hue: {
          /* `-d` paints on a dark band, `-l` on a light one. `-tint`/`-ink` are
             the light-band surface pair a chip or icon tile sits on. */
          'violet-d': '#B39CFB', 'violet-l': '#5B21B6', 'violet-tint': '#EDE9FE', 'violet-ink': '#4C1D95',
          'amber-d': '#FFB020', 'amber-l': '#A1580B', 'amber-tint': '#FEF3C7', 'amber-ink': '#92400E',
          'coral-d': '#FB7185', 'coral-l': '#9F1239', 'coral-tint': '#FFE4E6', 'coral-ink': '#881337',
          'sky-d': '#7DD3FC', 'sky-l': '#0369A1', 'sky-tint': '#E0F2FE', 'sky-ink': '#075985',
          'sodium-d': '#FDBA74', 'sodium-l': '#9A3412', 'sodium-tint': '#FFEDD5', 'sodium-ink': '#7C2D12',
          'indigo-d': '#818CF8', 'indigo-l': '#3730A3', 'indigo-tint': '#E0E7FF', 'indigo-ink': '#312E81',

          /* Two aliases the shared chrome still reaches for by the old names.
             They resolve to Cockpit violet, and go when those call sites move
             to the band tokens. */
          'emerald-tint': '#EDE9FE',
          'rose-ink': '#9F1239',
        },

        /* WhatsApp's own green, reserved for that button on every band and used
           nowhere else. Dark ink on it, never white: white measures ~2.1:1 and
           fails AA. `deep` is the paired teal for any case needing white text. */
        wa: { DEFAULT: '#25D366', deep: '#128C7E', ink: '#052E1A' },

        /* --- legacy tokens, kept until every component is migrated ---------
           The Cockpit repaint moves components over one at a time; deleting
           these in the same commit would break ten files at once and leave
           nothing renderable. They go when the last reference does. */
        ink: { DEFAULT: '#0F172A', soft: '#334155', muted: '#52627A' },
        line: '#E2E8F0',
        brand: { DEFAULT: '#5B21B6', deep: '#4C1D95', tint: '#EDE9FE', light: '#B39CFB', dot: '#B39CFB' },
      },
      fontFamily: {
        /* The Bengali face is unicode-range scoped to U+0980-09FE, so it can
           only ever serve Bengali codepoints — Latin still comes from Manrope
           (and Fraunces in display) no matter where it sits in the stack. */
        sans: ['var(--font-manrope)', 'var(--font-bengali)', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'var(--font-bengali)', 'Georgia', 'Times New Roman', 'serif'],
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
        hint: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(150%)' },
        },
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
