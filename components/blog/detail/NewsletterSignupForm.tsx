'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

declare global {
  interface Window {
    onNewsletterTurnstileSuccess?: (token: string) => void;
    onNewsletterTurnstileExpired?: () => void;
    onNewsletterTurnstileError?: () => void;
  }
}

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState('');
  const [companyFax, setCompanyFax] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const scrollTopRef = useRef(0);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    window.onNewsletterTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
      setStatus((current) => (current === 'error' ? 'idle' : current));
      setMessage('');
    };
    window.onNewsletterTurnstileExpired = () => {
      setTurnstileToken('');
    };
    window.onNewsletterTurnstileError = () => {
      setTurnstileToken('');
      setStatus('error');
      setMessage('Verification failed. Please retry.');
    };

    return () => {
      delete window.onNewsletterTurnstileSuccess;
      delete window.onNewsletterTurnstileExpired;
      delete window.onNewsletterTurnstileError;
    };
  }, []);

  function restoreScrollPosition() {
    const savedScrollTop = scrollTopRef.current;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollTop, behavior: 'auto' });
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    scrollTopRef.current = window.scrollY;

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus('error');
      setMessage('Use a real email address.');
      restoreScrollPosition();
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus('error');
      setMessage('Complete the verification before joining.');
      restoreScrollPosition();
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          companyFax,
          formStartedAt: startedAt,
          turnstileToken,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setStatus('error');
        setMessage(payload?.error || 'Could not complete signup.');
        restoreScrollPosition();
        return;
      }

      setStatus('success');
      setMessage('Check your inbox for the next step.');
      setEmail('');
      setCompanyFax('');
      setTurnstileToken('');
    } catch {
      setStatus('error');
      setMessage('Could not complete signup.');
    } finally {
      restoreScrollPosition();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[320px]">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletter-company-fax">Leave this blank</label>
        <input
          id="newsletter-company-fax"
          name="companyFax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyFax}
          onChange={(event) => setCompanyFax(event.target.value)}
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="mb-4">
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="dark"
            data-callback="onNewsletterTurnstileSuccess"
            data-expired-callback="onNewsletterTurnstileExpired"
            data-error-callback="onNewsletterTurnstileError"
          />
        </div>
      )}

      <div className="flex items-end gap-0 border-b border-warmwhite/20 pb-2">
        <input
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === 'submitting'}
          aria-label="Email address"
          className="flex-1 bg-transparent text-warmwhite text-[15px] placeholder-warmwhite/40 focus:outline-none font-sans min-w-0 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'submitting' || (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
          className="font-sans text-[15px] text-rust hover:text-warmwhite transition-colors duration-300 ml-4 flex-shrink-0 disabled:opacity-60 disabled:hover:text-rust"
        >
          {status === 'submitting' ? 'Joining...' : status === 'success' ? 'You’re in!' : 'Join now →'}
        </button>
      </div>

      {(status !== 'success' || message) && (
        <p
          className={`mt-3 font-sans text-[13px] leading-relaxed ${
            status === 'error' ? 'text-rust/90' : 'text-white/45'
          }`}
          aria-live="polite"
        >
          {message || 'Essays, field notes, and strategic provocations. No spam, no theater.'}
        </p>
      )}
    </form>
  );
}
