import { SITE, waLink, type Market } from './site';

/**
 * Every user-facing string, keyed by market.
 *
 * The Bangladesh variant is deliberately hybrid, not a full translation: prose
 * is Bengali, while the words buyers already shop for stay in English — AI,
 * automation, WhatsApp, Next.js, Supabase, CRM. Translating those into Bengali
 * equivalents would make the page harder to scan for the exact audience it is
 * meant to convert. Numerals stay Western throughout for consistency.
 */

export type Action = {
  label: string;
  href: string;
  external?: boolean;
  /** The closing section styles one action solid and one outlined. */
  variant: 'solid' | 'ghost';
};

export type Copy = {
  /** BCP-47 tag for the content, set on the page wrapper. */
  lang: string;
  skip: string;
  nav: { links: { href: string; label: string }[]; status: string };
  hero: {
    eyebrow: string;
    h1: string;
    leadStrong: string;
    leadRest: string;
    stats: [string, string][];
  };
  about: {
    eyebrow: string;
    name: string;
    p1: string;
    p2: string;
    p3: string;
    backgroundLabel: string;
    backgroundValue: string;
    backgroundNote: string;
    expertiseLabel: string;
    expertiseValue: string;
    expertiseNote: string;
    linkedinCta: string;
    emailCta: string;
  };
  route: { eyebrow: string; h2: string; lead: string };
  services: { h2: string; lead: string; bookCta: string; cta: string; swipeHint: string };
  process: { h2: string; lead: string };
  work: {
    h2: string;
    lead: string;
    kinds: Record<'Paid client work' | 'Demonstration build', string>;
    outcomeLabels: Record<'Capability' | 'Stack' | 'Feature', string>;
    stackLabel: string;
    play: string;
    stop: string;
    full: string;
    close: string;
  };
  walkthroughs: { h2: string; lead: string; open: string; note: string };
  contact: {
    h2: string;
    lead: string;
    alt: string;
    or: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    error: string;
    privacy: string;
    honeypot: string;
  };
  closing: {
    /** Words the plane flies over, in order, with the text around them. */
    lead: string;
    w1: string;
    sep1: string;
    w2: string;
    sep2: string;
    w3: string;
    tail: string;
    sub: string;
    takeOff: string;
    /** The right-hand action is always WhatsApp — it is where the light lands. */
    left: Action;
    right: Action;
  };
  footer: {
    tagline: string;
    servicesHeading: string;
    serviceLinks: string[];
    companyHeading: string;
    companyLinks: { href: string; label: string }[];
    coverageHeading: string;
    hubs: string[];
    linkedinLabel: string;
    rights: string;
    builtWith: string;
  };
  actionBar: { whatsapp: string; call: string };
  /** First lines for the prefilled WhatsApp compose box. */
  wa: { hero: string; contact: string; closing: string; bar: string; service: (s: string) => string };
};

const intl: Copy = {
  lang: 'en',
  skip: 'Skip to main content',
  nav: {
    links: [
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#process', label: 'Process' },
      { href: '#work', label: 'Portfolio' },
      { href: '#contact', label: 'Contact' },
    ],
    status: SITE.status,
  },
  hero: {
    eyebrow: 'Arnab Builds — high-reliability tech lab',
    h1: 'Automate, Build, Scale — With AI That Works',
    leadStrong: 'From flight emergencies to digital transformation.',
    leadRest:
      'Aviation taught me what reliability costs when it fails. That discipline now runs on AI agents, automation pipelines and code I audit myself.',
    stats: [
      ['Aviation-trained', 'Purser, live emergency response'],
      ['AI & automation', 'Agents, LLM workflows, n8n pipelines'],
      ['Security-minded', 'Site audits and vulnerability checks'],
    ],
  },
  about: {
    eyebrow: 'Meet the founder',
    name: SITE.founder,
    p1: 'I build AI agents and LLM workflows, automation pipelines that wire a business\u2019s existing tools together, conversion websites and custom web applications. Alongside that I run security audits \u2014 vulnerability checks on sites I ship and sites I am asked to look at \u2014 because it is the part of the craft I find hardest to put down.',
    p2: 'The discipline came from somewhere unusual. I spent nine years in commercial aviation, ending as a purser: live cabin emergencies, crisis response, crews led through an evacuation, a crash landing and an in-cabin fire. Aviation teaches that a system is only as good as what it does on its worst day, and that checklists exist because memory fails.',
    p3: 'The route between the two ran through a BBA in Marketing, commercial roles at Nestl\u00e9 and Apex Leathercraft, and freelance work advising clients on what to build before building it \u2014 small design jobs through to full-stack software.',
    backgroundLabel: 'Background',
    backgroundValue: 'Aviation and commercial',
    backgroundNote: 'Purser; Nestlé, Apex Leathercraft',
    expertiseLabel: 'Focus now',
    expertiseValue: 'AI, automation, security',
    expertiseNote: 'Next.js, Supabase, n8n, LLM tooling',
    linkedinCta: 'Connect on LinkedIn',
    emailCta: 'Get in touch',
  },
  wa: {
    hero: "Hi Arnab — I'd like to book a discovery call.",
    contact: "Hi Arnab — I'd like to talk about a project.",
    closing: "Hi Arnab — I'd like to book a discovery call.",
    bar: "Hi Arnab — I'd like to book a discovery call.",
    service: (s: string) => `Hi Arnab — I'd like to talk about ${s}.`,
  },
  route: {
    eyebrow: 'Dual market',
    h2: 'Built in Dhaka. Shipped to any time zone.',
    lead: 'Local rates and a WhatsApp line for Bangladesh. Async delivery and overlapping hours for everyone else.',
  },
  services: {
    h2: 'Four pillars of service',
    lead: 'Custom solutions built around reliability, precision and the outcome you are actually paying for.',
    bookCta: 'Book a call',
    cta: 'See the work →',
    swipeHint: 'Swipe through all four',
  },
  process: {
    h2: 'A transparent four-step process',
    lead: 'From discovery to launch, you are never guessing where the project stands.',
  },
  work: {
    h2: 'Portfolio & proof',
    lead: 'Recent work across tourism, retail, e-commerce and automation. Demonstration builds are labelled as such — no borrowed credit.',
    kinds: {
      'Paid client work': 'Paid client work',
      'Demonstration build': 'Demonstration build',
    },
    outcomeLabels: { Capability: 'What it does', Stack: 'Stack', Feature: 'Feature' },
    stackLabel: 'Stack',
    play: 'Play in card',
    stop: 'Stop',
    full: 'Full demo',
    close: 'Close demo',
  },
  walkthroughs: {
    h2: 'Builds you can walk through',
    lead: 'Concept products, built end to end. Open any of them and use it — these are whole pages, not screenshots.',
    open: 'Open the demo →',
    note: 'Each of these is a concept build made to demonstrate an approach. None is a live commercial product.',
  },
  contact: {
    h2: "Tell me what's eating your week",
    lead: 'Describe the task you keep repeating. I will tell you whether it is worth automating, and roughly what it would take.',
    alt: 'Prefer something faster? Message me on',
    or: 'or email',
    nameLabel: 'Your name',
    namePlaceholder: 'How should I address you?',
    emailLabel: 'Email',
    emailPlaceholder: 'you@company.com',
    whatsappLabel: 'WhatsApp number (optional)',
    whatsappPlaceholder: '+880 1XXX XXXXXX',
    messageLabel: "What's eating your week?",
    messagePlaceholder: 'Every booking comes in by phone and someone has to write it into a diary...',
    submit: 'Send it over',
    sending: 'Sending',
    sentTitle: 'Got it.',
    sentBody: 'I read every one of these myself. Expect a reply within one working day — sooner if you left a WhatsApp number.',
    error: 'That did not send. Try again, or message me on',
    privacy: 'Your details go to me and nowhere else. No list, no newsletter.',
    honeypot: 'Leave this field empty',
  },
  closing: {
    lead: 'Ready to',
    w1: 'automate',
    sep1: ', ',
    w2: 'build',
    sep2: ' and ',
    w3: 'scale?',
    tail: '',
    sub: 'Two ways in: an international consultation call, or a direct WhatsApp line for Bangladesh.',
    takeOff: 'Take off',
    left: { label: 'Book a call', href: SITE.cal, external: true, variant: 'solid' },
    right: { label: 'WhatsApp', href: waLink("Hi Arnab — I'd like to book a discovery call."), external: true, variant: 'ghost' },
  },
  footer: {
    tagline: SITE.tagline,
    servicesHeading: 'Services',
    serviceLinks: ['AI agents', 'Websites', 'Web apps', 'Automation'],
    companyHeading: 'Company',
    companyLinks: [
      { href: '#about', label: 'About' },
      { href: '#work', label: 'Portfolio' },
      { href: '#process', label: 'Process' },
      { href: '#contact', label: 'Contact' },
    ],
    coverageHeading: 'Local coverage',
    hubs: [...SITE.hubs],
    linkedinLabel: 'LinkedIn profile',
    rights: 'All rights reserved.',
    builtWith: 'Built with Next.js, Tailwind CSS and high-reliability discipline.',
  },
  actionBar: { whatsapp: 'WhatsApp', call: 'Book a call' },
};

const bd: Copy = {
  lang: 'bn',
  skip: 'মূল কনটেন্টে যান',
  nav: {
    links: [
      { href: '#about', label: 'আমার সম্পর্কে' },
      { href: '#services', label: 'সার্ভিস' },
      { href: '#process', label: 'প্রসেস' },
      { href: '#work', label: 'পোর্টফোলিও' },
      { href: '#contact', label: 'যোগাযোগ' },
    ],
    status: 'Q4-এর প্রজেক্ট নিচ্ছি',
  },
  hero: {
    eyebrow: 'Arnab Builds — নির্ভরযোগ্য টেক ল্যাব',
    h1: 'অটোমেট, বিল্ড, স্কেল — কাজ করে এমন AI দিয়ে',
    leadStrong: 'ফ্লাইট ইমার্জেন্সি থেকে ডিজিটাল ট্রান্সফরমেশন।',
    leadRest:
      'এভিয়েশন শিখিয়েছে, নির্ভরযোগ্যতা ভেঙে পড়লে তার দাম কত। সেই ডিসিপ্লিনই এখন চলে AI এজেন্ট, অটোমেশন পাইপলাইন আর নিজের অডিট করা কোডের উপর।',
    stats: [
      ['এভিয়েশন-ট্রেইনড', 'পার্সার, লাইভ ইমার্জেন্সি রেসপন্স'],
      ['AI ও অটোমেশন', 'এজেন্ট, LLM ওয়ার্কফ্লো, n8n পাইপলাইন'],
      ['সিকিউরিটি-সচেতন', 'সাইট অডিট আর vulnerability চেক'],
    ],
  },
  about: {
    eyebrow: 'ফাউন্ডার সম্পর্কে',
    name: 'অর্ণব আদিত্য দাশ',
    p1: 'আমি AI এজেন্ট আর LLM ওয়ার্কফ্লো বানাই, অটোমেশন পাইপলাইন যেগুলো একটা ব্যবসার চালু টুলগুলোকে একসাথে জুড়ে দেয়, কনভার্শন ওয়েবসাইট আর কাস্টম ওয়েব অ্যাপ্লিকেশন। পাশাপাশি সিকিউরিটি অডিট করি — যে সাইট আমি বানাই আর যেগুলো দেখতে বলা হয়, দুটোরই vulnerability চেক। কাজের এই অংশটাই সবচেয়ে বেশি টানে।',
    p2: 'এই ডিসিপ্লিনটা এসেছে একটু অন্য জায়গা থেকে। নয় বছর কমার্শিয়াল এভিয়েশনে ছিলাম, শেষ করেছি পার্সার হিসেবে — লাইভ কেবিন ইমার্জেন্সি, ক্রাইসিস রেসপন্স, আর ইভ্যাকুয়েশন, একটি ক্র্যাশ ল্যান্ডিং ও কেবিনে আগুনের মধ্য দিয়ে ক্রুদের নেতৃত্ব। এভিয়েশন শেখায়, একটা সিস্টেম ততটাই ভালো যতটা সে সবচেয়ে খারাপ দিনে করতে পারে; আর চেকলিস্ট থাকে কারণ স্মৃতির উপর ভরসা চলে না।',
    p3: 'দুটোর মাঝের পথটা গেছে মার্কেটিংয়ে BBA, Nestlé আর Apex Leathercraft-এ কমার্শিয়াল রোল, আর ফ্রিল্যান্স কাজের ভেতর দিয়ে — ক্লায়েন্টকে কী বানানো দরকার সেই পরামর্শ দিয়ে, তারপর সেটাই বানিয়ে; ছোট ডিজাইন কাজ থেকে ফুল-স্ট্যাক সফটওয়্যার পর্যন্ত।',
    backgroundLabel: 'ব্যাকগ্রাউন্ড',
    backgroundValue: 'এভিয়েশন ও কমার্শিয়াল',
    backgroundNote: 'পার্সার; Nestlé, Apex Leathercraft',
    expertiseLabel: 'এখনকার ফোকাস',
    expertiseValue: 'AI, অটোমেশন, সিকিউরিটি',
    expertiseNote: 'Next.js, Supabase, n8n, LLM টুলিং',
    linkedinCta: 'LinkedIn-এ যুক্ত হোন',
    emailCta: 'যোগাযোগ করুন',
  },
  wa: {
    hero: 'হ্যালো Arnab — আমি একটা ডিসকভারি কল বুক করতে চাই।',
    contact: 'হ্যালো Arnab — একটা প্রজেক্ট নিয়ে কথা বলতে চাই।',
    closing: 'হ্যালো Arnab — আমি একটা ডিসকভারি কল বুক করতে চাই।',
    bar: 'হ্যালো Arnab — আমি একটা ডিসকভারি কল বুক করতে চাই।',
    service: (s: string) => `হ্যালো Arnab — ${s} নিয়ে কথা বলতে চাই।`,
  },
  route: {
    eyebrow: 'ডুয়াল মার্কেট',
    h2: 'ঢাকায় তৈরি। যেকোনো টাইম জোনে ডেলিভার।',
    lead: 'বাংলাদেশের জন্য লোকাল রেট আর সরাসরি WhatsApp লাইন। বাকি সবার জন্য অ্যাসিঙ্ক ডেলিভারি আর ওভারল্যাপিং আওয়ার।',
  },
  services: {
    h2: 'সার্ভিসের চারটি স্তম্ভ',
    lead: 'নির্ভরযোগ্যতা, নিখুঁততা আর আপনি আসলে যে ফলাফলের জন্য টাকা দিচ্ছেন — সব ঘিরে তৈরি কাস্টম সলিউশন।',
    bookCta: 'কল বুক করুন',
    swipeHint: 'চারটিই দেখতে সোয়াইপ করুন',
    cta: 'কাজ দেখুন →',
  },
  process: {
    h2: 'স্বচ্ছ চার ধাপের প্রসেস',
    lead: 'ডিসকভারি থেকে লঞ্চ — প্রজেক্ট কোথায় দাঁড়িয়ে আছে, তা নিয়ে আপনাকে কখনও অনুমান করতে হবে না।',
  },
  work: {
    h2: 'পোর্টফোলিও ও প্রমাণ',
    lead: 'ট্যুরিজম, রিটেইল, ই-কমার্স আর অটোমেশনে সাম্প্রতিক কাজ। ডেমনস্ট্রেশন বিল্ডগুলো আলাদা করে চিহ্নিত — অন্যের কৃতিত্ব নিজের বলে চালানো হয়নি।',
    kinds: {
      'Paid client work': 'পেইড ক্লায়েন্ট ওয়ার্ক',
      'Demonstration build': 'ডেমনস্ট্রেশন বিল্ড',
    },
    outcomeLabels: { Capability: 'যা করে', Stack: 'স্ট্যাক', Feature: 'ফিচার' },
    stackLabel: 'স্ট্যাক',
    play: 'কার্ডে চালান',
    stop: 'থামান',
    full: 'ফুল ডেমো',
    close: 'ডেমো বন্ধ করুন',
  },
  walkthroughs: {
    h2: 'ঘুরে দেখার মতো বিল্ড',
    lead: 'কনসেপ্ট প্রোডাক্ট, শুরু থেকে শেষ পর্যন্ত বানানো। যেকোনোটা খুলে ব্যবহার করে দেখুন — এগুলো স্ক্রিনশট নয়, পুরো পেজ।',
    open: 'ডেমো খুলুন →',
    note: 'এগুলোর প্রতিটি একটি পদ্ধতি দেখানোর জন্য বানানো কনসেপ্ট বিল্ড। কোনোটিই চালু বাণিজ্যিক প্রোডাক্ট নয়।',
  },
  contact: {
    h2: 'আপনার সপ্তাহটা কোথায় চলে যাচ্ছে?',
    lead: 'যে কাজটা বারবার করতে হয়, সেটা লিখুন। অটোমেট করা যায় কি না, আর করলে মোটামুটি কী লাগবে — জানিয়ে দেব।',
    alt: 'আরও দ্রুত চাইলে মেসেজ করুন',
    or: 'অথবা ইমেইল',
    nameLabel: 'আপনার নাম',
    namePlaceholder: 'নাম লিখুন',
    emailLabel: 'ইমেইল',
    emailPlaceholder: 'you@company.com',
    whatsappLabel: 'WhatsApp নম্বর (ঐচ্ছিক)',
    whatsappPlaceholder: '+880 1XXX XXXXXX',
    messageLabel: 'কোন কাজটা সময় খেয়ে ফেলছে?',
    messagePlaceholder: 'প্রতিটা বুকিং ফোনে আসে, আর কাউকে সেটা খাতায় লিখে রাখতে হয়...',
    submit: 'পাঠিয়ে দিন',
    sending: 'পাঠানো হচ্ছে',
    sentTitle: 'পেয়েছি।',
    sentBody: 'প্রতিটি মেসেজ আমি নিজে পড়ি। এক কর্মদিবসের মধ্যেই উত্তর পাবেন — WhatsApp নম্বর দিলে আরও আগে।',
    error: 'পাঠানো যায়নি। আবার চেষ্টা করুন, অথবা মেসেজ করুন',
    privacy: 'আপনার তথ্য শুধু আমার কাছেই আসে, আর কোথাও নয়। কোনো লিস্ট নেই, নিউজলেটার নেই।',
    honeypot: 'এই ঘরটি খালি রাখুন',
  },
  closing: {
    /* Bengali puts the verb last, so the three words come first and the
       question closes behind them. The plane still crosses w1, w2, w3 in order. */
    lead: '',
    w1: 'অটোমেট',
    sep1: ', ',
    w2: 'বিল্ড',
    sep2: ' আর ',
    w3: 'স্কেল',
    tail: ' করতে প্রস্তুত?',
    sub: 'দুটো পথ: সরাসরি WhatsApp, অথবা একটি কনসাল্টেশন কল বুক করা।',
    takeOff: 'টেক অফ',
    left: { label: 'কল বুক করুন', href: SITE.cal, external: true, variant: 'ghost' },
    right: { label: 'WhatsApp — বাংলাদেশ', href: waLink('হ্যালো Arnab — আমি একটা ডিসকভারি কল বুক করতে চাই।'), external: true, variant: 'solid' },
  },
  footer: {
    tagline: 'নির্ভরযোগ্যতার জন্য তৈরি AI অটোমেশন আর কাস্টম ওয়েব ইঞ্জিনিয়ারিং।',
    servicesHeading: 'সার্ভিস',
    serviceLinks: ['AI এজেন্ট', 'ওয়েবসাইট', 'ওয়েব অ্যাপ', 'অটোমেশন'],
    companyHeading: 'কোম্পানি',
    companyLinks: [
      { href: '#about', label: 'আমার সম্পর্কে' },
      { href: '#work', label: 'পোর্টফোলিও' },
      { href: '#process', label: 'প্রসেস' },
      { href: '#contact', label: 'যোগাযোগ' },
    ],
    coverageHeading: 'লোকাল কভারেজ',
    hubs: ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'কক্সবাজার', 'বান্দরবান'],
    linkedinLabel: 'LinkedIn প্রোফাইল',
    rights: 'সর্বস্বত্ব সংরক্ষিত।',
    builtWith: 'Next.js, Tailwind CSS আর হাই-রিলায়েবিলিটি ডিসিপ্লিন দিয়ে তৈরি।',
  },
  actionBar: { whatsapp: 'WhatsApp', call: 'কল বুক করুন' },
};

export const COPY: Record<Market, Copy> = { intl, bd };
