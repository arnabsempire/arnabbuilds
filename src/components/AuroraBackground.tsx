/**
 * Three large, softly-blurred radial-gradient blobs, fixed behind the page and
 * drifting on a slow CSS loop. Purely decorative and aria-hidden, so it needs
 * no JS and no fallback — it is plain @keyframes rather than scroll-linked
 * motion, and the sitewide `prefers-reduced-motion: reduce` rule in globals.css
 * already freezes it.
 *
 * Sits at z-0. Home wraps the rest of the page in a `relative z-10` div so every
 * section paints above it regardless of DOM order. For the aurora to be visible
 * at all, the section wrappers that used to paint a flat bg-white fill were made
 * transparent — cards and inputs stay opaque, so the glow reads in the negative
 * space around them and never behind body text.
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="aurora pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span className="aurora-blob aurora-blob--a" />
      <span className="aurora-blob aurora-blob--b" />
      <span className="aurora-blob aurora-blob--c" />
    </div>
  );
}
