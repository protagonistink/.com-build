import { NextRequest, NextResponse } from 'next/server';
import { normalizeEnvValue } from '@/lib/env';

const REQUIRED_STUDIO_ENV_VARS = [
  'STUDIO_BASIC_AUTH_USERNAME',
  'STUDIO_BASIC_AUTH_PASSWORD',
] as const;

function notFound() {
  return new NextResponse('Not Found', { status: 404 });
}

function decodeCredentials(encoded: string) {
  try {
    return atob(encoded);
  } catch {
    return '';
  }
}

function isAuthorized(request: NextRequest) {
  const username = normalizeEnvValue(process.env.STUDIO_BASIC_AUTH_USERNAME);
  const password = normalizeEnvValue(process.env.STUDIO_BASIC_AUTH_PASSWORD);
  if (!username || !password) return false;

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Basic ')) return false;

  const decoded = decodeCredentials(authHeader.slice(6).trim());
  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) return false;

  const providedUsername = decoded.slice(0, separatorIndex);
  const providedPassword = decoded.slice(separatorIndex + 1);
  return providedUsername === username && providedPassword === password;
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' && !isAuthorized(request)) {
    return notFound();
  }

  const missing = REQUIRED_STUDIO_ENV_VARS.filter((name) => !normalizeEnvValue(process.env[name]));
  const ok = missing.length === 0;

  return NextResponse.json(
    {
      ok,
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 }
  );
}
