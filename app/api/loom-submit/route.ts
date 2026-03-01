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
const NOTION_TIMEOUT_MS = 8_000;
const RETRY_DELAY_MS = 400;
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

function isRateLimited(clientKey: string) {
  const now = Date.now();
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

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function notionRequestWithRetry(
  url: string,
  options: RequestInit,
  correlationId: string
) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), NOTION_TIMEOUT_MS);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } catch (error) {
      const isLastAttempt = attempt === 2;
      if (isLastAttempt) {
        console.error(`[loom-submit:${correlationId}] Notion request failed`, error);
        throw error;
      }
      await delay(RETRY_DELAY_MS);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error('Notion request failed after retries');
}

export async function POST(request: Request) {
  const correlationId = crypto.randomUUID();
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a minute and try again.', correlationId },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = asTrimmedString(body?.name);
    const email = asTrimmedString(body?.email);
    const company = asTrimmedString(body?.company);
    const url = asTrimmedString(body?.url);
    const miss = asTrimmedString(body?.miss);
    const stageInput = asTrimmedString(body?.stage);
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

    const notionToken = process.env.NOTION_TOKEN;
    const notionDatabase = process.env.NOTION_DATABASE_ID;

    if (!notionToken || !notionDatabase) {
      console.error(`[loom-submit:${correlationId}] Missing Notion credentials in environment variables`);
      return NextResponse.json(
        { error: 'Server configuration error.', correlationId },
        { status: 500 }
      );
    }

    const response = await notionRequestWithRetry(
      'https://api.notion.com/v1/pages',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: notionDatabase },
          properties: {
            Name: {
              title: [{ text: { content: name } }],
            },
            Email: {
              email: email,
            },
            'Company & One-liner': {
              rich_text: [{ text: { content: company || '' } }],
            },
            'Review URL': {
              url: url,
            },
            'What Prospects Miss': {
              rich_text: [{ text: { content: miss || '' } }],
            },
            Stage: {
              select: { name: stage },
            },
          },
        }),
      },
      correlationId
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`[loom-submit:${correlationId}] Notion API error`, errorBody);
      return NextResponse.json(
        { error: 'Failed to submit to Notion.', correlationId },
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
