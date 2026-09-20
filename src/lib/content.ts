import type { HueName, Market } from './site';

export type Pillar = {
  hue: HueName;
  icon: 'zap' | 'globe' | 'layers';
  title: string;
  copy: string;
  /** Shown only where the market lists pricing. */
  price: string;
  span: 'wide' | 'single' | 'full';
};

export const PILLARS: Pillar[] = [
  {
    hue: 'emerald', icon: 'zap', span: 'wide',
    title: 'AI Agents & Workflow Automation',
    copy: 'WhatsApp booking bots, n8n qualifier workflows, lead scoring and auto-publishing pipelines, wired into the tools you already run.',
    price: 'From ৳25,000 build + ৳8,000/month',
  },
  {
    hue: 'azure', icon: 'globe', span: 'single',
    title: 'Conversion Websites',
    copy: 'Fast, mobile-first business sites and booking engines on Next.js and Tailwind, built to load in under three seconds on 3G.',
    price: '৳18,000 – ৳65,000',
  },
  {
    hue: 'violet', icon: 'layers', span: 'full',
    title: 'Custom Web Apps & Internal Tools',
    copy: 'CRMs, inventory managers, project trackers and client portals on Supabase and PostgreSQL — built to survive real operational load.',
    price: 'From ৳90,000',
  },
];

export const STEPS = [
  { hue: 'emerald' as HueName, n: 1, title: 'Discovery Call', copy: 'A personal, non-transactional audit of where your business actually loses time and money.' },
  { hue: 'cyan' as HueName, n: 2, title: 'Strategy & Proposal', copy: 'Collaborative scoping, then one fixed-price quote. No hourly surprises.' },
  { hue: 'amber' as HueName, n: 3, title: 'Build & Iterate', copy: 'Agile weekly staging previews. You see progress every single week.' },
  { hue: 'rose' as HueName, n: 4, title: 'Launch & Support', copy: 'Deployment, documentation and ongoing maintenance included.' },
];

export type CaseStudy = {
  slug: string;
  hue: HueName;
  /** The blueprint's radical-transparency rule: never blur these two. */
  kind: 'Paid client work' | 'Demonstration build';
  icon: 'building' | 'package' | 'target' | 'chart' | 'chat' | 'kanban';
  title: string;
  challenge: string;
  stack: string;
  outcomeLabel: string;
  outcome: string;
  /** TODO(arnab): confirm against real client data before launch. */
  outcomeVerified: boolean;
  bars: [number, number, number, number];
  steps: [string, string, string];
};

export const CASES: CaseStudy[] = [
  {
    slug: 'resort-booking', hue: 'emerald', kind: 'Paid client work', icon: 'building',
    title: 'Boutique Resort Booking System',
    challenge: 'Rooms were sold over the phone into a paper ledger, so double bookings were routine and nobody could see real availability.',
    stack: 'Next.js, Supabase, transactional email',
    outcomeLabel: 'Outcome', outcome: '40% more direct bookings within 3 months.', outcomeVerified: false,
    bars: [86, 64, 92, 48],
    steps: [
      'Guest picks dates — availability checks against the live calendar',
      'Room held, deposit taken, confirmation email fires automatically',
      'Front desk sees the booking without anyone answering a phone',
    ],
  },
  {
    slug: 'ecommerce-automation', hue: 'azure', kind: 'Demonstration build', icon: 'package',
    title: 'E-Commerce + Automation',
    challenge: 'Stock counts drifted between the shop floor and the online store, and order updates were sent by hand.',
    stack: 'Next.js, Supabase, n8n',
    outcomeLabel: 'Stack', outcome: 'Next.js, Supabase, n8n.', outcomeVerified: true,
    bars: [72, 90, 55, 80],
    steps: [
      'Order placed — stock decrements across every channel at once',
      'WhatsApp notification reaches the customer within seconds',
      "Owner's dashboard reconciles the day without a spreadsheet",
    ],
  },
  {
    slug: 'lead-scoring', hue: 'amber', kind: 'Paid client work', icon: 'target',
    title: 'Lead Scoring Agent',
    challenge: 'Enquiries arrived across three channels and were triaged by hand, so the best leads were answered last.',
    stack: 'n8n, OpenAI, CRM webhook',
    outcomeLabel: 'Outcome', outcome: 'About 60% of manual triage time removed.', outcomeVerified: false,
    bars: [94, 58, 76, 40],
    steps: [
      'Enquiry arrives from form, WhatsApp or email',
      'Agent scores it on fit and intent, then tags and routes it',
      'Sales opens the highest-value conversation first, every morning',
    ],
  },
  {
    slug: 'retail-dashboard', hue: 'violet', kind: 'Demonstration build', icon: 'chart',
    title: 'Retail Operations Dashboard',
    challenge: 'Branch figures only met once a month, in a spreadsheet, long after anything could be done about them.',
    stack: 'Next.js, PostgreSQL, scheduled ETL',
    outcomeLabel: 'Feature', outcome: 'Live multi-branch data on one screen.', outcomeVerified: true,
    bars: [60, 82, 96, 70],
    steps: [
      "Each branch's till and stock feed lands in one store",
      'Figures roll up live — no nightly export, no stale numbers',
      'Operator spots the branch that is short before it costs a sale',
    ],
  },
  {
    slug: 'whatsapp-bot', hue: 'rose', kind: 'Paid client work', icon: 'chat',
    title: 'WhatsApp Booking Bot',
    challenge: 'Customers wanted to book on WhatsApp, but every message needed a human to read it and check the diary.',
    stack: 'WhatsApp Business API, n8n, Supabase',
    outcomeLabel: 'Scale', outcome: '2,400+ bookings handled per month.', outcomeVerified: false,
    bars: [50, 88, 66, 94],
    steps: [
      'Customer messages the business number in their own language',
      'Bot offers slots, confirms, and books straight into the calendar',
      'Reminder goes out the day before — no-shows drop',
    ],
  },
  {
    slug: 'crm-pipeline', hue: 'cyan', kind: 'Demonstration build', icon: 'kanban',
    title: 'CRM & Pipeline Tool',
    challenge: 'A small sales team had outgrown a shared spreadsheet and kept losing follow-ups between stages.',
    stack: 'React, Supabase, Row Level Security',
    outcomeLabel: 'Stack', outcome: 'Supabase + React.', outcomeVerified: true,
    bars: [78, 52, 90, 62],
    steps: [
      'Deal enters the pipeline with its full contact history attached',
      'Stage changes trigger the next follow-up automatically',
      'Nothing sits untouched because someone forgot to chase it',
    ],
  },
];

/** Route band — markers computed to sit exactly on the flight curve. */
export const ROUTE_PATH = 'M 60 200 Q 400 30 720 110 T 1140 70';
export const CITIES = [
  { x: 60, y: 200, name: 'Dhaka', sub: 'Home base', dot: '#10B981', anchor: 'start', side: 'above' },
  { x: 288.9, y: 113.3, name: 'Singapore', sub: 'APAC', dot: '#22D3EE', anchor: 'middle', side: 'below' },
  { x: 513.2, y: 84.4, name: 'Dubai', sub: 'Gulf', dot: '#FBBF24', anchor: 'middle', side: 'above' },
  { x: 720, y: 110, name: 'London', sub: 'UK & EU', dot: '#A78BFA', anchor: 'middle', side: 'below' },
  { x: 1140, y: 70, name: 'New York', sub: 'North America', dot: '#F472B6', anchor: 'end', side: 'above' },
] as const;

export function pillarsFor(market: Market) {
  return PILLARS;
}
