'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ConnectProvider, useConnect } from './context';
import { createDemoApi } from './demo-api';
import { useRoute, type Route } from './router';
import type { ConnectApi } from './types';
import { A, Avatar, Icon, Loading } from './ui';
import { Feed, PostScreen, ProfileScreen, Students } from './screens-browse';
import { Chat, Inbox, Login, NewPost, Settings } from './screens-me';
import { Connections, Notifications, Saved } from './screens-social';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const MAIN_SITE = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://joinmotiondojo.com';

/** Live when Supabase keys are set, otherwise the labelled sample preview */
function useApi(): ConnectApi | null {
  const [api, setApi] = useState<ConnectApi | null>(null);
  useEffect(() => {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      import('./live-api').then(({ createLiveApi }) => setApi(createLiveApi(SUPABASE_URL, SUPABASE_ANON_KEY, window.location.origin + window.location.pathname.replace(/\/login$/, ''))));
    } else {
      setApi(createDemoApi());
    }
  }, []);
  return api;
}

export function ConnectApp() {
  const api = useApi();
  const route = useRoute();
  if (!api || !route) {
    return (
      <div className="cx">
        <Loading />
      </div>
    );
  }
  return (
    <ConnectProvider api={api}>
      <Shell route={route} />
    </ConnectProvider>
  );
}

const TABS = [
  { path: '/', label: 'Feed', icon: 'home' as const, match: ['feed', 'post'] },
  { path: '/students', label: 'Students', icon: 'people' as const, match: ['students', 'profile'] },
  { path: '/connections', label: 'Connections', icon: 'link2' as const, match: ['connections'] },
  { path: '/messages', label: 'Messages', icon: 'chat' as const, match: ['messages', 'chat'] },
];

/** Unread notifications and waiting connection requests, refreshed every 30 seconds */
function useCounts() {
  const { api, me } = useConnect();
  const [c, setC] = useState({ unread: 0, requests: 0 });
  useEffect(() => {
    if (!me) {
      setC({ unread: 0, requests: 0 });
      return;
    }
    let live = true;
    const load = async () => {
      const [unread, r] = await Promise.all([api.unreadCount(), api.listRequests()]);
      if (live) setC({ unread, requests: r.incoming.length });
    };
    load().catch(() => {});
    const t = window.setInterval(() => document.visibilityState === 'visible' && load().catch(() => {}), 30000);
    const on = () => load().catch(() => {});
    window.addEventListener('cx:counts', on);
    return () => {
      live = false;
      window.clearInterval(t);
      window.removeEventListener('cx:counts', on);
    };
  }, [api, me]);
  return c;
}

const Dot = ({ n }: { n: number }) => (n > 0 ? <span className="cx-dot">{n > 9 ? '9+' : n}</span> : null);

function Shell({ route }: { route: Route }) {
  const { api, me, signedIn } = useConnect();
  const [menu, setMenu] = useState(false);
  const counts = useCounts();

  // Close the account menu whenever the page changes
  useEffect(() => setMenu(false), [route]);

  const screen = useMemo(() => {
    switch (route.name) {
      case 'feed':
        return <Feed />;
      case 'students':
        return <Students />;
      case 'profile':
        return <ProfileScreen key={route.handle} handle={route.handle} />;
      case 'post':
        return <PostScreen key={route.id} id={route.id} />;
      case 'messages':
        return <Inbox />;
      case 'chat':
        return <Chat key={route.id} id={route.id} />;
      case 'login':
        return <Login />;
      case 'settings':
        return <Settings />;
      case 'new':
        return <NewPost />;
      case 'connections':
        return <Connections />;
      case 'notifications':
        return <Notifications />;
      case 'saved':
        return <Saved />;
      default:
        return (
          <div className="cx-empty">
            <p className="cx-empty-title">Page not found</p>
            <A path="/">Back to the feed</A>
          </div>
        );
    }
  }, [route]);

  return (
    <div className="cx">
      {api.mode === 'demo' && (
        <p className="cx-preview-bar">Preview with sample members. Nothing here is real until the database is connected.</p>
      )}
      <header className="cx-top">
        <div className="cx-top-row">
          <A path="/" className="cx-logo" aria-label="Motion Dojo Connect, home">
            <img src="/assets/favicon-128.png" alt="" width={32} height={32} />
            <span>
              Motion Dojo <em>Connect</em>
            </span>
          </A>
          <nav className="cx-nav" aria-label="Connect">
            {TABS.map((t) => (
              <A key={t.path} path={t.path} className={t.match.includes(route.name) ? 'is-on' : ''} aria-current={t.match.includes(route.name) ? 'page' : undefined}>
                {t.label}
                {t.path === '/connections' && <Dot n={counts.requests} />}
              </A>
            ))}
          </nav>
          <div className="cx-top-right">
            {(me?.is_student || me?.is_sensei) && (
              <A path="/new" className="btn btn-primary btn-sm cx-new">
                <Icon name="plus" size={18} />
                <span>{me.is_sensei ? 'Post' : 'Share work'}</span>
              </A>
            )}
            {me && (
              <A path="/notifications" className="cx-bell" aria-label={`Notifications${counts.unread ? `, ${counts.unread} new` : ''}`}>
                <Icon name="bell" />
                <Dot n={counts.unread} />
              </A>
            )}
            {signedIn ? (
              <div className="cx-menu">
                <button type="button" className="cx-me" aria-label="Your account" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                  {me ? <Avatar p={me} size={38} /> : <Icon name="user" />}
                </button>
                {menu && (
                  <div className="cx-menu-list" role="menu" onClick={() => setMenu(false)}>
                    {me && (
                      <A path={`/u/${me.handle}`} role="menuitem">
                        Your profile
                      </A>
                    )}
                    {me && (
                      <A path="/saved" role="menuitem">
                        Saved
                      </A>
                    )}
                    <A path="/settings" role="menuitem">
                      {me ? 'Edit profile' : 'Set up profile'}
                    </A>
                    <a href={MAIN_SITE} role="menuitem">
                      Motion Dojo website
                    </a>
                    <button type="button" role="menuitem" onClick={() => api.signOut()}>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <A path="/login" className="btn btn-light btn-sm">
                Sign in
              </A>
            )}
          </div>
        </div>
      </header>

      {signedIn && me === null && route.name !== 'settings' && route.name !== 'login' && (
        <p className="cx-nudge">
          You’re signed in. <A path="/settings">Set up your profile</A> to connect, like, comment and save projects.
        </p>
      )}

      <main className="cx-main" id="main">
        {screen}
      </main>

      <nav className="cx-tabbar" aria-label="Connect">
        {TABS.map((t) => (
          <A key={t.path} path={t.path} className={t.match.includes(route.name) ? 'is-on' : ''} aria-current={t.match.includes(route.name) ? 'page' : undefined}>
            <span className="cx-tab-ico">
              <Icon name={t.icon} />
              {t.path === '/connections' && <Dot n={counts.requests} />}
            </span>
            <span>{t.label}</span>
          </A>
        ))}
      </nav>
    </div>
  );
}
