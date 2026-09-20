/** Nose points +X so `offset-rotate: auto` banks it along the route. */
export function PlaneShape() {
  return (
    <>
      <path d="M 15 0 C 11 -2.2, 3 -3.2, -6 -3.2 L -15 -3.2 L -9.5 0 L -15 3.2 L -6 3.2 C 3 3.2, 11 2.2, 15 0 Z" fill="currentColor" />
      <path d="M 1 -1.4 L -8 -13 L -2.5 -13 L 6 -1.4 Z" fill="currentColor" />
      <path d="M 1 1.4 L -8 13 L -2.5 13 L 6 1.4 Z" fill="currentColor" />
    </>
  );
}

export function PlaneIcon({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="-18 -16 36 32" width={size} height={size} aria-hidden="true">
      <PlaneShape />
    </svg>
  );
}
