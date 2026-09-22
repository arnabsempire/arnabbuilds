import type { HueName, Market } from './site';

/**
 * Content carries both languages. English is the source of truth; `bn` holds
 * the Bengali prose used on /bd. Product and stack names are not translated —
 * "WhatsApp Booking Bot" and "Supabase" are what the buyer already calls them.
 */

export type Pillar = {
  hue: HueName;
  icon: 'zap' | 'globe' | 'layers';
  title: string;
  copy: string;
  /** Shown only where the market lists pricing. */
  price: string;
  span: 'wide' | 'single' | 'full';
  bn: { copy: string };
};

export const PILLARS: Pillar[] = [
  {
    hue: 'emerald', icon: 'zap', span: 'wide',
    title: 'AI Agents & Workflow Automation',
    copy: 'WhatsApp booking bots, n8n qualifier workflows, lead scoring and auto-publishing pipelines, wired into the tools you already run.',
    price: 'From ৳25,000 build + ৳8,000/month',
    bn: {
      copy: 'WhatsApp বুকিং বট, n8n কোয়ালিফায়ার ওয়ার্কফ্লো, লিড স্কোরিং আর অটো-পাবলিশিং পাইপলাইন — আপনি এখন যে টুলগুলো চালান, তার সঙ্গেই যুক্ত।',
    },
  },
  {
    hue: 'azure', icon: 'globe', span: 'single',
    title: 'Conversion Websites',
    copy: 'Fast, mobile-first business sites and booking engines on Next.js and Tailwind, built to load in under three seconds on 3G.',
    price: '৳18,000 – ৳65,000',
    bn: {
      copy: 'Next.js আর Tailwind-এ দ্রুত, মোবাইল-ফার্স্ট বিজনেস সাইট ও বুকিং ইঞ্জিন — 3G-তে তিন সেকেন্ডের কমে লোড হওয়ার জন্য তৈরি।',
    },
  },
  {
    hue: 'violet', icon: 'layers', span: 'full',
    title: 'Custom Web Apps & Internal Tools',
    copy: 'CRMs, inventory managers, project trackers and client portals on Supabase and PostgreSQL — built to survive real operational load.',
    price: 'From ৳90,000',
    bn: {
      copy: 'Supabase আর PostgreSQL-এ CRM, ইনভেন্টরি ম্যানেজার, প্রজেক্ট ট্র্যাকার আর ক্লায়েন্ট পোর্টাল — বাস্তব অপারেশনাল চাপ সামলানোর জন্য তৈরি।',
    },
  },
];

export type Step = {
  hue: HueName;
  n: number;
  title: string;
  copy: string;
  bn: { title: string; copy: string };
};

export const STEPS: Step[] = [
  {
    hue: 'emerald', n: 1,
    title: 'Discovery Call',
    copy: 'A personal, non-transactional audit of where your business actually loses time and money.',
    bn: {
      title: 'ডিসকভারি কল',
      copy: 'আপনার ব্যবসা আসলে কোথায় সময় আর টাকা হারাচ্ছে — তার একটি ব্যক্তিগত, বিক্রির চাপমুক্ত অডিট।',
    },
  },
  {
    hue: 'cyan', n: 2,
    title: 'Strategy & Proposal',
    copy: 'Collaborative scoping, then one fixed-price quote. No hourly surprises.',
    bn: {
      title: 'স্ট্র্যাটেজি ও প্রপোজাল',
      copy: 'একসঙ্গে স্কোপ ঠিক করা, তারপর একটাই ফিক্সড-প্রাইস কোট। ঘণ্টার হিসাবে কোনো চমক নেই।',
    },
  },
  {
    hue: 'amber', n: 3,
    title: 'Build & Iterate',
    copy: 'Agile weekly staging previews. You see progress every single week.',
    bn: {
      title: 'বিল্ড ও ইটারেট',
      copy: 'প্রতি সপ্তাহে স্টেজিং প্রিভিউ। অগ্রগতি আপনি প্রতি সপ্তাহেই নিজের চোখে দেখবেন।',
    },
  },
  {
    hue: 'rose', n: 4,
    title: 'Launch & Support',
    copy: 'Deployment, documentation and ongoing maintenance included.',
    bn: {
      title: 'লঞ্চ ও সাপোর্ট',
      copy: 'ডিপ্লয়মেন্ট, ডকুমেন্টেশন আর চলমান রক্ষণাবেক্ষণ — সবই অন্তর্ভুক্ত।',
    },
  },
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
  outcomeLabel: 'Capability' | 'Stack' | 'Feature';
  outcome: string;
  /**
   * Every line in `outcome` must be a statement Arnab can defend without
   * producing a client's private data. Performance figures were removed in
   * September 2026 because none of them were measured.
   */
  outcomeVerified: boolean;
  bars: [number, number, number, number];
  steps: [string, string, string];
  bn: { challenge: string; outcome: string; steps: [string, string, string] };
};

export const CASES: CaseStudy[] = [
  {
    slug: 'resort-booking', hue: 'emerald', kind: 'Paid client work', icon: 'building',
    title: 'Boutique Resort Booking System',
    challenge: 'Rooms were sold over the phone into a paper ledger, so double bookings were routine and nobody could see real availability.',
    stack: 'Next.js, Supabase, transactional email',
    outcomeLabel: 'Capability', outcome: 'Live availability, deposit capture and automatic confirmation.', outcomeVerified: true,
    bars: [86, 64, 92, 48],
    steps: [
      'Guest picks dates — availability checks against the live calendar',
      'Room held, deposit taken, confirmation email fires automatically',
      'Front desk sees the booking without anyone answering a phone',
    ],
    bn: {
      challenge: 'রুম বিক্রি হতো ফোনে, লেখা হতো কাগজের খাতায় — ফলে ডাবল বুকিং ছিল নিয়মিত ঘটনা, আর আসল অ্যাভেইলেবিলিটি কেউ দেখতে পেত না।',
      outcome: 'লাইভ অ্যাভেইলেবিলিটি, ডিপোজিট নেওয়া আর স্বয়ংক্রিয় কনফার্মেশন।',
      steps: [
        'গেস্ট তারিখ বাছেন — লাইভ ক্যালেন্ডারে অ্যাভেইলেবিলিটি মিলিয়ে দেখা হয়',
        'রুম হোল্ড হয়, ডিপোজিট নেওয়া হয়, কনফার্মেশন ইমেইল নিজে থেকেই চলে যায়',
        'ফোন না ধরেই ফ্রন্ট ডেস্ক বুকিংটা দেখতে পায়',
      ],
    },
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
    bn: {
      challenge: 'দোকানের স্টক আর অনলাইন স্টোরের হিসাব মিলত না, আর অর্ডার আপডেট যেত হাতে পাঠিয়ে।',
      outcome: 'Next.js, Supabase, n8n.',
      steps: [
        'অর্ডার হলো — সব চ্যানেলে স্টক একসঙ্গে কমে যায়',
        'কয়েক সেকেন্ডেই কাস্টমারের কাছে WhatsApp নোটিফিকেশন পৌঁছায়',
        'স্প্রেডশিট ছাড়াই মালিকের ড্যাশবোর্ডে দিনের হিসাব মিলে যায়',
      ],
    },
  },
  {
    slug: 'lead-scoring', hue: 'amber', kind: 'Paid client work', icon: 'target',
    title: 'Lead Scoring Agent',
    challenge: 'Enquiries arrived across three channels and were triaged by hand, so the best leads were answered last.',
    stack: 'n8n, OpenAI, CRM webhook',
    outcomeLabel: 'Capability', outcome: 'Scores and routes every enquiry the moment it arrives.', outcomeVerified: true,
    bars: [94, 58, 76, 40],
    steps: [
      'Enquiry arrives from form, WhatsApp or email',
      'Agent scores it on fit and intent, then tags and routes it',
      'Sales opens the highest-value conversation first, every morning',
    ],
    bn: {
      challenge: 'তিনটি আলাদা চ্যানেলে আসা এনকোয়ারি হাতে বাছাই হতো, ফলে সবচেয়ে ভালো লিডের উত্তর যেত সবার শেষে।',
      outcome: 'প্রতিটি এনকোয়ারি আসামাত্রই স্কোর করে সঠিক জায়গায় পাঠায়।',
      steps: [
        'ফর্ম, WhatsApp বা ইমেইল — যেকোনো জায়গা থেকে এনকোয়ারি আসে',
        'এজেন্ট ফিট আর ইনটেন্ট দেখে স্কোর দেয়, ট্যাগ করে সঠিক জায়গায় পাঠায়',
        'প্রতিদিন সকালে সেলস সবচেয়ে দামি কথোপকথনটাই আগে খোলে',
      ],
    },
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
    bn: {
      challenge: 'ব্রাঞ্চের হিসাব এক জায়গায় আসত মাসে একবার, স্প্রেডশিটে — কিছু করার সময় পেরিয়ে যাওয়ার অনেক পরে।',
      outcome: 'এক স্ক্রিনে সব ব্রাঞ্চের লাইভ ডেটা।',
      steps: [
        'প্রতিটি ব্রাঞ্চের বিক্রি আর স্টকের ডেটা এক জায়গায় জমা হয়',
        'হিসাব লাইভ যোগ হয় — রাতের এক্সপোর্ট নেই, পুরনো সংখ্যাও নেই',
        'বিক্রি হাতছাড়া হওয়ার আগেই অপারেটর ধরতে পারেন কোন ব্রাঞ্চে ঘাটতি',
      ],
    },
  },
  {
    slug: 'whatsapp-bot', hue: 'rose', kind: 'Paid client work', icon: 'chat',
    title: 'WhatsApp Booking Bot',
    challenge: 'Customers wanted to book on WhatsApp, but every message needed a human to read it and check the diary.',
    stack: 'WhatsApp Business API, n8n, Supabase',
    outcomeLabel: 'Capability', outcome: 'Books, confirms and reminds entirely inside WhatsApp.', outcomeVerified: true,
    bars: [50, 88, 66, 94],
    steps: [
      'Customer messages the business number in their own language',
      'Bot offers slots, confirms, and books straight into the calendar',
      'Reminder goes out the day before — no-shows drop',
    ],
    bn: {
      challenge: 'কাস্টমাররা WhatsApp-এই বুক করতে চাইতেন, কিন্তু প্রতিটি মেসেজ পড়ে ডায়েরি মেলানোর জন্য একজন মানুষ লাগত।',
      outcome: 'বুকিং, কনফার্মেশন আর রিমাইন্ডার — পুরোটাই WhatsApp-এর ভেতরে।',
      steps: [
        'কাস্টমার নিজের ভাষায় বিজনেস নম্বরে মেসেজ করেন',
        'বট স্লট দেখায়, কনফার্ম করে, সরাসরি ক্যালেন্ডারে বুক করে',
        'আগের দিন রিমাইন্ডার যায় — না-আসার হার কমে',
      ],
    },
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
    bn: {
      challenge: 'ছোট সেলস টিমের জন্য শেয়ার্ড স্প্রেডশিট আর যথেষ্ট ছিল না — এক ধাপ থেকে আরেক ধাপে গিয়ে ফলো-আপ হারিয়ে যেত।',
      outcome: 'Supabase + React.',
      steps: [
        'ডিল পাইপলাইনে ঢোকে, সঙ্গে পুরো যোগাযোগের ইতিহাস',
        'ধাপ বদলালেই পরের ফলো-আপ নিজে থেকে চালু হয়',
        'কেউ তাড়া দিতে ভুলে গেছে বলে কিছু আর পড়ে থাকে না',
      ],
    },
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

/* Resolvers return the shape the components already render, with the localised
   strings swapped in, so no component needs to know that `bn` exists. */

export function pillarsFor(market: Market): Pillar[] {
  return market === 'bd' ? PILLARS.map((p) => ({ ...p, copy: p.bn.copy })) : PILLARS;
}

export function stepsFor(market: Market): Step[] {
  return market === 'bd' ? STEPS.map((s) => ({ ...s, title: s.bn.title, copy: s.bn.copy })) : STEPS;
}

export function casesFor(market: Market): CaseStudy[] {
  return market === 'bd'
    ? CASES.map((c) => ({ ...c, challenge: c.bn.challenge, outcome: c.bn.outcome, steps: c.bn.steps }))
    : CASES;
}
