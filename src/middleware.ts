import { NextResponse, type NextRequest } from 'next/server';

/**
 * connect.joinmotiondojo.com serves the Connect app from this same project:
 * a request for connect.joinmotiondojo.com/students is answered by /connect/students.
 * Everything else (the main site, /api, files) passes through untouched.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') || '').toLowerCase();
  if (!host.startsWith('connect.')) return NextResponse.next();

  const url = req.nextUrl.clone();
  if (url.pathname === '/connect' || url.pathname.startsWith('/connect/')) return NextResponse.next();
  url.pathname = `/connect${url.pathname === '/' ? '' : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension
  matcher: ['/((?!_next/|api/|.*\\.[\\w]+$).*)'],
};
