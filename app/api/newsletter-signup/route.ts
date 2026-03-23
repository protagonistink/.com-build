import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_SUBMIT_MS = 1500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  __newsletterRateLimitStore?: Map<string, RateLimitEntry>;
};
const rateLimitStore = globalRateLimitStore.__newsletterRateLimitStore ?? new Map<string, RateLimitEntry>();
if (!globalRateLimitStore.__newsletterRateLimitStore) {
  globalRateLimitStore.__newsletterRateLimitStore = rateLimitStore;
}

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  existing.count += 1;
  return false;
}

function parseBeehiivErrorMessage(errorText: string) {
  if (!errorText) return '';

  try {
    const payload = JSON.parse(errorText) as {
      errors?: Array<{ message?: string }>;
      error?: string;
      message?: string;
    };

    const nestedMessage = payload.errors?.find((entry) => entry.message)?.message;
    return nestedMessage || payload.message || payload.error || errorText;
  } catch {
    return errorText;
  }
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: 'Too many signup attempts. Try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;
  const honeypot = asTrimmedString(payload.companyFax);
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const formStartedAt = Number(payload.formStartedAt);
  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ error: 'Submission blocked.' }, { status: 400 });
  }

  const email = asTrimmedString(payload.email).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId =
    process.env.BEEHIIV_PUBLICATION_ID || 'pub_77861931-514b-4fbb-b6d3-42a0fc9c9ef5';

  if (!apiKey || !publicationId) {
    console.error('[newsletter-signup] Missing Beehiiv configuration');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const referrerHeader = request.headers.get('referer');
  const originHeader = request.headers.get('origin');
  const referringSite = referrerHeader || originHeader || 'https://www.protagonist.ink/blog';

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          double_opt_override: 'not_set',
          utm_source: 'protagonist-ink',
          utm_medium: 'website',
          utm_channel: 'website',
          utm_campaign: 'footer-signup',
          referring_site: referringSite,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      const upstreamMessage = parseBeehiivErrorMessage(errorText);
      console.error('[newsletter-signup] Beehiiv subscription failed', {
        status: response.status,
        body: upstreamMessage.slice(0, 500),
      });

      if (response.status === 400 || response.status === 409) {
        if (upstreamMessage.toLowerCase().includes('already')) {
          return NextResponse.json({ error: 'That email is already subscribed.' }, { status: 400 });
        }

        const detail =
          process.env.NODE_ENV === 'production'
            ? 'Could not complete signup.'
            : `Beehiiv rejected the signup: ${upstreamMessage || 'unknown error'}`;

        return NextResponse.json({ error: detail }, { status: 400 });
      }

      if (response.status === 401 || response.status === 403) {
        const detail =
          process.env.NODE_ENV === 'production'
            ? 'Server configuration error.'
            : `Beehiiv auth failed: ${upstreamMessage || 'check API key permissions'}`;

        return NextResponse.json({ error: detail }, { status: 502 });
      }

      if (response.status === 422) {
        const detail =
          process.env.NODE_ENV === 'production'
            ? 'Could not complete signup.'
            : `Beehiiv validation failed: ${upstreamMessage || 'unknown validation error'}`;

        return NextResponse.json({ error: detail }, { status: 400 });
      }

      const detail =
        process.env.NODE_ENV === 'production'
          ? 'Could not complete signup.'
          : `Beehiiv error ${response.status}: ${upstreamMessage || 'unknown error'}`;

      return NextResponse.json({ error: detail }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[newsletter-signup] Unexpected Beehiiv error', error);
    return NextResponse.json({ error: 'Could not complete signup.' }, { status: 502 });
  }
}
