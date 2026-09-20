import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-h2">This page went around</p>
      <p className="mt-3 text-ink-muted">
        That route does not exist. Head back to the homepage and start the approach again.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-brand px-6 font-bold text-white transition-colors duration-200 ease-fade hover:bg-brand-deep"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
