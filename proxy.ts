import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/studio' || request.nextUrl.pathname.startsWith('/studio/')) {
    return NextResponse.redirect('https://protagonistink.sanity.studio', 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*'],
};
