import { NextRequest, NextResponse } from 'next/server';
import { normalizeEnvValue } from './lib/env';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Studio"',
    },
  });
}

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

export function proxy(request: NextRequest) {
  const username = normalizeEnvValue(process.env.STUDIO_BASIC_AUTH_USERNAME);
  const password = normalizeEnvValue(process.env.STUDIO_BASIC_AUTH_PASSWORD);
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!username || !password) {
    return isDevelopment ? NextResponse.next() : notFound();
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Basic ')) {
    return unauthorized();
  }

  const encoded = authHeader.slice(6).trim();
  const decoded = decodeCredentials(encoded);
  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) {
    return unauthorized();
  }

  const providedUsername = decoded.slice(0, separatorIndex);
  const providedPassword = decoded.slice(separatorIndex + 1);
  if (providedUsername !== username || providedPassword !== password) {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

export const config = {
  matcher: ['/studio/:path*'],
};
