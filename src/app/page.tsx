import type { Metadata } from 'next';
import Home from '@/components/Home';

export const metadata: Metadata = {
  title: 'AI Automation & High-Reliability Web Engineering',
  description:
    'Custom AI agents, conversion websites and internal tools for businesses that cannot afford downtime. Book a discovery call.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <Home market="intl" />;
}
