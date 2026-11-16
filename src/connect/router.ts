'use client';
/* A small client router for Connect.
   - On connect.joinmotiondojo.com paths are clean: /students, /u/ada
   - On the main domain they live under /connect: /connect/students
   - In the preview build it runs on the URL hash: #/students */

import { useEffect, useState, type MouseEvent } from 'react';

export type Route =
  | { name: 'feed' }
  | { name: 'students' }
  | { name: 'profile'; handle: string }
  | { name: 'post'; id: string }
  | { name: 'messages' }
  | { name: 'chat'; id: string }
  | { name: 'login' }
  | { name: 'settings' }
  | { name: 'new' }
  | { name: 'connections' }
  | { name: 'notifications' }
  | { name: 'saved' }
  | { name: 'notfound' };

const hashMode = () => typeof window !== 'undefined' && Boolean((window as unknown as { __CONNECT_HASH__?: boolean }).__CONNECT_HASH__);
const prefix = () =>
  typeof window !== 'undefined' && !hashMode() && window.location.pathname.startsWith('/connect') ? '/connect' : '';

function currentPath() {
  if (hashMode()) return window.location.hash.replace(/^#/, '') || '/';
  const p = window.location.pathname.replace(/^\/connect(?=\/|$)/, '');
  return p || '/';
}

export function parse(path: string): Route {
  const parts = path.split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
  const [a, b] = parts;
  if (!a) return { name: 'feed' };
  if (a === 'students' && !b) return { name: 'students' };
  if (a === 'u' && b) return { name: 'profile', handle: b };
  if (a === 'p' && b) return { name: 'post', id: b };
  if (a === 'messages') return b ? { name: 'chat', id: b } : { name: 'messages' };
  if (a === 'login') return { name: 'login' };
  if (a === 'settings') return { name: 'settings' };
  if (a === 'new') return { name: 'new' };
  if (a === 'connections') return { name: 'connections' };
  if (a === 'notifications') return { name: 'notifications' };
  if (a === 'saved') return { name: 'saved' };
  return { name: 'notfound' };
}

/** Turns an app path ("/u/ada") into a real href for the current host */
export function to(path: string) {
  if (hashMode()) return `#${path}`;
  return `${prefix()}${path === '/' && prefix() ? '' : path}` || '/';
}

export function navigate(path: string) {
  if (hashMode()) {
    window.location.hash = path;
  } else {
    window.history.pushState({}, '', to(path));
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  window.scrollTo({ top: 0 });
}

export function useRoute(): Route | null {
  const [route, setRoute] = useState<Route | null>(null);
  useEffect(() => {
    const update = () => setRoute(parse(currentPath()));
    update();
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);
  return route;
}

/** Intercepts clicks on internal links so pages switch without a reload */
export function onLinkClick(e: MouseEvent<HTMLAnchorElement>, path: string) {
  if (hashMode() || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(path);
}
