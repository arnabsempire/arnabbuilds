'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { COPY } from '@/lib/copy';
import { SITE, waLink, type Market } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-lg border border-b-line bg-b-surface px-4 py-3 text-base text-b-ink outline-none transition-colors duration-200 ease-fade placeholder:text-b-ink-muted focus-visible:border-b-accent focus-visible:ring-[3px] focus-visible:ring-b-accent';
const label = 'mb-1.5 block text-[13px] font-bold text-b-ink-soft';

/**
 * Posts to /__forms.html, where the form is declared for Netlify's build-time
 * parser. Submitting with fetch rather than a native POST keeps the visitor on
 * the page, so the success state can stay in place with their own words still
 * visible above it.
 *
 * `company-website` is the honeypot: real people never see it, bots fill it,
 * and Netlify silently drops anything that has it set.
 */
export default function ContactForm({ market }: { market: Market }) {
  const [status, setStatus] = useState<Status>('idle');
  const t = COPY[market].contact;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    data.set('form-name', 'enquiry');
    data.set('market', market);
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="border-b border-b-line py-14 @[720px]/page:py-[76px] @[1120px]/page:py-[104px]">
      <div className="mx-auto w-full max-w-[1312px] px-5 @[720px]/page:px-8 @[1120px]/page:px-14">
        <div className="grid grid-cols-1 gap-9 @[1120px]/page:grid-cols-[0.9fr_1.1fr] @[1120px]/page:gap-16">
          <div className="reveal">
            <h2 className="mb-3 text-h2">{t.h2}</h2>
            <p className="mb-6 text-lead text-b-ink-soft">{t.lead}</p>
            <p className="text-[15px] leading-[1.65] text-b-ink-muted">
              {t.alt}{' '}
              <a href={waLink(COPY[market].wa.contact)} target="_blank" rel="noopener noreferrer" className="font-bold text-b-accent hover:text-b-accent-deep">
                WhatsApp
              </a>{' '}
              {t.or}{' '}
              <a href={`mailto:${SITE.email}`} className="font-bold text-b-accent hover:text-b-accent-deep">
                {SITE.email}
              </a>
              .
            </p>
          </div>

          {status === 'sent' ? (
            <div
              role="status"
              className="flex flex-col items-start gap-3 self-start rounded-[14px] border border-b-line bg-b-accent-soft p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                <Check size={22} aria-hidden="true" />
              </span>
              <h3 className="text-h3">{t.sentTitle}</h3>
              <p className="text-[15px] leading-[1.65] text-b-ink-muted">{t.sentBody}</p>
            </div>
          ) : (
            <form
              name="enquiry"
              method="POST"
              action="/__forms.html"
              onSubmit={onSubmit}
              className="reveal flex flex-col gap-4"
            >
              <input type="hidden" name="form-name" value="enquiry" />
              <p className="hidden">
                <label>
                  {t.honeypot}
                  <input name="company-website" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="grid grid-cols-1 gap-4 @[720px]/page:grid-cols-2">
                <div>
                  <label className={label} htmlFor="cf-name">{t.nameLabel}</label>
                  <input id="cf-name" name="name" required autoComplete="name" className={field} placeholder={t.namePlaceholder} />
                </div>
                <div>
                  <label className={label} htmlFor="cf-email">{t.emailLabel}</label>
                  <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} placeholder={t.emailPlaceholder} />
                </div>
              </div>

              <div>
                <label className={label} htmlFor="cf-whatsapp">{t.whatsappLabel}</label>
                <input id="cf-whatsapp" name="whatsapp" inputMode="tel" autoComplete="tel" className={field} placeholder={t.whatsappPlaceholder} />
              </div>

              <div>
                <label className={label} htmlFor="cf-message">{t.messageLabel}</label>
                <textarea id="cf-message" name="message" required rows={5} className={`${field} resize-y`} placeholder={t.messagePlaceholder} />
              </div>

              {status === 'error' && (
                <p role="alert" className="text-[14px] font-semibold text-hue-rose-ink">
                  {t.error}{' '}
                  <a href={waLink(COPY[market].wa.contact)} target="_blank" rel="noopener noreferrer" className="underline">
                    WhatsApp
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-lg bg-brand px-7 font-bold text-white transition-all duration-200 ease-move hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0 active:scale-[.97] disabled:translate-y-0 disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <Loader2 size={18} aria-hidden="true" className="animate-spin" />
                ) : (
                  <Send size={18} aria-hidden="true" />
                )}
                {status === 'sending' ? t.sending : t.submit}
              </button>

              <p className="text-[13px] leading-[1.5] text-b-ink-muted">{t.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
