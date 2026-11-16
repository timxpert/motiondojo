'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ConnectProvider, useConnect } from './context';
import { createDemoApi } from './demo-api';
import { useRoute, type Route } from './router';
import type { ConnectApi } from './types';
import { A, Avatar, Icon, Loading } from './ui';
import { Feed, PostScreen, ProfileScreen, Students } from './screens-browse';
import { Chat, Inbox, Login, NewPost, Settings } from './screens-me';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const MAIN_SITE = 'https://joinmotiondojo.com';

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
  { path: '/messages', label: 'Messages', icon: 'chat' as const, match: ['messages', 'chat'] },
];

function Shell({ route }: { route: Route }) {
  const { api, me, signedIn } = useConnect();
  const [menu, setMenu] = useState(false);

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
              </A>
            ))}
          </nav>
          <div className="cx-top-right">
            {me?.is_student && (
              <A path="/new" className="btn btn-primary btn-sm cx-new">
                <Icon name="plus" size={18} />
                <span>Share work</span>
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
          You’re signed in. <A path="/settings">Set up your profile</A> to follow, like, comment and message.
        </p>
      )}

      <main className="cx-main" id="main">
        {screen}
      </main>

      <nav className="cx-tabbar" aria-label="Connect">
        {TABS.map((t) => (
          <A key={t.path} path={t.path} className={t.match.includes(route.name) ? 'is-on' : ''} aria-current={t.match.includes(route.name) ? 'page' : undefined}>
            <Icon name={t.icon} />
            <span>{t.label}</span>
          </A>
        ))}
        {me?.is_student && (
          <A path="/new" className={route.name === 'new' ? 'is-on' : ''}>
            <Icon name="plus" />
            <span>Share</span>
          </A>
        )}
      </nav>
    </div>
  );
}
