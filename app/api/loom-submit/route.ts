import { NextResponse } from 'next/server';

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  const webhookUrl = process.env.MAKE_LOOM_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[loom-submit] Missing MAKE_LOOM_WEBHOOK_URL');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:                     asTrimmedString(payload.name),
        email:                    asTrimmedString(payload.email),
        company:                  asTrimmedString(payload.company),
        url:                      asTrimmedString(payload.url),
        reviewUrl:                asTrimmedString(payload.url),
        wishProspectsUnderstood:  asTrimmedString(payload.miss),
        stage:                    asTrimmedString(payload.stage),
      }),
    });

    if (!webhookResponse.ok) {
      const responseBody = await webhookResponse.text().catch(() => '');
      console.error('[loom-submit] Make webhook rejected request', {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        body: responseBody.slice(0, 500),
      });
      return NextResponse.json({ error: 'Webhook rejected the submission.' }, { status: 502 });
    }
  } catch (err) {
    console.error('[loom-submit] Make webhook error', err);
    return NextResponse.json({ error: 'Webhook delivery failed.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
