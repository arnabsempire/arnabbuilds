import type { Metadata } from 'next';
import Home from '@/components/Home';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'ওয়েবসাইট, অটোমেশন ও কাস্টম সফটওয়্যার — Arnab Builds Bangladesh',
  description: `Transparent BDT pricing for websites, WhatsApp automation and custom business tools. Serving ${SITE.hubs.join(', ')}.`,
  alternates: { canonical: '/bd' },
};

export default function Page() {
  return <Home market="bd" />;
}
