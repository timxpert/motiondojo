import { NextResponse, type NextRequest } from 'next/server';

/**
 * Serves the Connect app from this same project on its own domain.
 * Set CONNECT_HOSTS in Vercel to the domain(s) you use for Connect, comma-separated,
 * e.g. "ninjas.example.com,www.ninjas.example.com". Any host starting with "connect."
 * also works. A request for <that domain>/students is answered by /connect/students.
 * Everything else (the main site, /api, files) passes through untouched.
 */
const HOSTS = (process.env.CONNECT_HOSTS || '')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0];
  const isConnect = HOSTS.includes(host) || host.startsWith('connect.');
  if (!isConnect) return NextResponse.next();

  const url = req.nextUrl.clone();
  if (url.pathname === '/connect' || url.pathname.startsWith('/connect/')) return NextResponse.next();
  url.pathname = `/connect${url.pathname === '/' ? '' : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension
  matcher: ['/((?!_next/|api/|.*\\.[\\w]+$).*)'],
};
