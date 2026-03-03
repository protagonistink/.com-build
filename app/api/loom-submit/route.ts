import { NextResponse } from 'next/server';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const MIN_SUBMIT_MS = 2500;
const NOTION_API_VERSION = '2022-06-28';
const NOTION_PAGES_ENDPOINT = 'https://api.notion.com/v1/pages';
const NOTION_STAGE_OPTIONS = new Set(['New', 'Reviewing', 'Follow-up', 'Passed', 'Accepted', 'Seed', 'Series A', 'Bootstrapped']);

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  __loomRateLimitStore?: Map<string, RateLimitEntry>;
};
const rateLimitStore = globalRateLimitStore.__loomRateLimitStore ?? new Map<string, RateLimitEntry>();
if (!globalRateLimitStore.__loomRateLimitStore) {
  globalRateLimitStore.__loomRateLimitStore = rateLimitStore;
}

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeWebUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(normalized);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    if (!parsed.hostname.includes('.') || parsed.hostname.startsWith('.') || parsed.hostname.endsWith('.')) return '';
    return normalized;
  } catch {
    return '';
  }
}

function asNotionRichText(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return [];
  return [{ type: 'text', text: { content: trimmed.slice(0, 1900) } }];
}

function normalizeNotionStage(stage: string) {
  const trimmed = stage.trim();
  if (!trimmed) return 'New';
  if (NOTION_STAGE_OPTIONS.has(trimmed)) return trimmed;
  return 'New';
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

async function verifyTurnstile(token: string, ip: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;

  const formData = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ip !== 'unknown') {
    formData.set('remoteip', ip);
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    if (!response.ok) return false;
    const payload = (await response.json()) as { success?: boolean };
    return Boolean(payload.success);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: 'Too many submissions. Try again later.' }, { status: 429 });
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

  const formStartedAtRaw = Number(payload.formStartedAt);
  if (!Number.isFinite(formStartedAtRaw)) {
    return NextResponse.json({ error: 'Missing submission metadata.' }, { status: 400 });
  }

  if (Date.now() - formStartedAtRaw < MIN_SUBMIT_MS) {
    return NextResponse.json({ error: 'Submission blocked.' }, { status: 400 });
  }

  const turnstileToken = asTrimmedString(payload.turnstileToken);
  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return NextResponse.json({ error: 'Captcha verification is required.' }, { status: 400 });
    }

    const turnstileValid = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileValid) {
      return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 400 });
    }
  }

  const email = asTrimmedString(payload.email);
  const url = normalizeWebUrl(asTrimmedString(payload.url));
  const stage = normalizeNotionStage(asTrimmedString(payload.stage));

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (!url) {
    return NextResponse.json({ error: 'Invalid URL.' }, { status: 400 });
  }

  const notionToken = process.env.NOTION_TOKEN;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;
  if (!notionToken || !notionDatabaseId) {
    console.error('[loom-submit] Missing Notion config');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const notionResponse = await fetch(NOTION_PAGES_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_API_VERSION,
      },
      body: JSON.stringify({
        parent: {
          database_id: notionDatabaseId,
        },
        properties: {
          Name: {
            title: [{
              type: 'text',
              text: { content: asTrimmedString(payload.name) || 'Anonymous submission' },
            }],
          },
          Email: { email },
          'Company & One-liner': {
            rich_text: asNotionRichText(asTrimmedString(payload.company)),
          },
          'Review URL': { url },
          Stage: { select: { name: stage } },
          'What Prospects Miss': {
            rich_text: asNotionRichText(asTrimmedString(payload.miss)),
          },
        },
      }),
    });

    if (!notionResponse.ok) {
      const responseBody = await notionResponse.text().catch(() => '');
      console.error('[loom-submit] Notion create page failed', {
        status: notionResponse.status,
        statusText: notionResponse.statusText,
        body: responseBody.slice(0, 500),
      });
      return NextResponse.json({ error: 'Notion rejected the submission.' }, { status: 502 });
    }
  } catch (err) {
    console.error('[loom-submit] Notion request error', err);
    return NextResponse.json({ error: 'Notion delivery failed.' }, { status: 500 });
  }

  const webhookUrl = process.env.MAKE_LOOM_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:                     asTrimmedString(payload.name),
          email,
          company:                  asTrimmedString(payload.company),
          url,
          reviewUrl:                url,
          wishProspectsUnderstood:  asTrimmedString(payload.miss),
          stage,
        }),
      });

      if (!webhookResponse.ok) {
        const responseBody = await webhookResponse.text().catch(() => '');
        console.error('[loom-submit] Optional Make webhook rejected request', {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          body: responseBody.slice(0, 500),
        });
      }
    } catch (err) {
      console.error('[loom-submit] Optional Make webhook error', err);
    }
  }

  return NextResponse.json({ success: true });
}
