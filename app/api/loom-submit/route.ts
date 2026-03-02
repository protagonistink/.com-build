import { NextResponse } from 'next/server';

const ALLOWED_STAGES = new Set([
  'Pre-seed',
  'Seed',
  'Series A',
  'Bootstrapped',
  'Other',
]);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const CRAFT_TIMEOUT_MS = 8_000;
const RETRY_DELAY_MS = 400;
const RATE_LIMIT_MAX_KEYS = 5_000;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function getClientKey(request: Request) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent.slice(0, 120)}`;
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size < RATE_LIMIT_MAX_KEYS) return;
  for (const [key, value] of rateLimitStore) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  cleanupRateLimitStore(now);
  const entry = rateLimitStore.get(clientKey);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  rateLimitStore.set(clientKey, entry);
  return false;
}

function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('host');
  if (!host) return false;

  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function craftRequestWithRetry(
  url: string,
  options: RequestInit,
  correlationId: string
) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CRAFT_TIMEOUT_MS);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } catch (error) {
      const isLastAttempt = attempt === 2;
      if (isLastAttempt) {
        console.error(`[loom-submit:${correlationId}] Craft request failed`, error);
        throw error;
      }
      await delay(RETRY_DELAY_MS);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error('Craft request failed after retries');
}

export async function POST(request: Request) {
  const correlationId = crypto.randomUUID();
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin.', correlationId },
        { status: 403 }
      );
    }

    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a minute and try again.', correlationId },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload.', correlationId },
        { status: 400 }
      );
    }

    const payload = (body ?? {}) as Record<string, unknown>;
    const name = asTrimmedString(payload.name);
    const email = asTrimmedString(payload.email);
    const company = asTrimmedString(payload.company);
    const url = asTrimmedString(payload.url);
    const miss = asTrimmedString(payload.miss);
    const stageInput = asTrimmedString(payload.stage);
    const stage = ALLOWED_STAGES.has(stageInput) ? stageInput : 'Other';

    // Validate required fields
    if (!name || !email || !url) {
      return NextResponse.json(
        { error: 'Name, email, and review URL are required.' },
        { status: 400 }
      );
    }
    if (name.length > 120 || company.length > 240 || miss.length > 2000) {
      return NextResponse.json(
        { error: 'One or more fields exceed maximum length.' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }
    if (!isValidHttpUrl(url)) {
      return NextResponse.json(
        { error: 'Please provide a valid URL starting with http:// or https://.' },
        { status: 400 }
      );
    }

    const craftLinkId = process.env.CRAFT_LINK_ID;
    const craftCollectionId = process.env.CRAFT_COLLECTION_ID;

    if (!craftLinkId || !craftCollectionId) {
      console.error(`[loom-submit:${correlationId}] Missing Craft credentials in environment variables`);
      return NextResponse.json(
        { error: 'Server configuration error.', correlationId },
        { status: 500 }
      );
    }

    const response = await craftRequestWithRetry(
      `https://connect.craft.do/links/${craftLinkId}/api/v1/collections/${craftCollectionId}/items`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name,
              properties: {
                email,
                company__one_line: company || '',
                url,
                what_prospects_miss: miss || '',
                stage,
              },
            },
          ],
        }),
      },
      correlationId
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`[loom-submit:${correlationId}] Craft API error`, errorBody);
      return NextResponse.json(
        { error: 'Failed to submit.', correlationId },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[loom-submit:${correlationId}] loom-submit error`, error);
    return NextResponse.json(
      { error: 'Internal server error.', correlationId },
      { status: 500 }
    );
  }
}
