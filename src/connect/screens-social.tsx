'use client';

import React, { useEffect, useState } from 'react';
import { useConnect } from './context';
import { navigate } from './router';
import { timeAgo } from './media';
import type { Notice, Post, Profile } from './types';
import { A, Avatar, Empty, Icon, Loading, NinjaBadge, PostCard, SampleTag, SenseiBadge } from './ui';

function Gate({ profile = false }: { profile?: boolean }) {
  return (
    <Empty title={profile ? 'Finish your profile first' : 'Sign in first'}>
      <A path={profile ? '/settings' : '/login'} className="btn btn-primary btn-sm">
        {profile ? 'Set up profile' : 'Sign in'}
      </A>
    </Empty>
  );
}

function Who({ p }: { p: Profile }) {
  return (
    <A path={`/u/${p.handle}`} className="cx-person">
      <Avatar p={p} size={48} />
      <span className="cx-person-text">
        <span className="cx-person-name">
          {p.name}
          {p.is_sensei && <SenseiBadge />}
          {p.is_student && <NinjaBadge small />}
          {p.sample && <SampleTag />}
        </span>
        <span className="cx-person-meta">
          @{p.handle}
          {p.country && <> · {p.country}</>}
        </span>
      </span>
    </A>
  );
}

/* ================= Connections and requests ================= */
export function Connections() {
  const { api, me, signedIn, toast, ask } = useConnect();
  const [data, setData] = useState<{ incoming: Profile[]; sent: Profile[]; people: Profile[] } | null>(null);

  const load = async () => {
    const [r, people] = await Promise.all([api.listRequests(), api.listConnections()]);
    setData({ ...r, people });
  };
  useEffect(() => {
    if (me) load().catch(() => setData({ incoming: [], sent: [], people: [] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, me]);

  if (!signedIn) return <Gate />;
  if (me === undefined) return <Loading />;
  if (!me) return <Gate profile />;
  if (!data) return <Loading label="Loading connections" />;

  const run = async (fn: () => Promise<void>, msg: string) => {
    try {
      await fn();
      toast(msg);
      await load();
      window.dispatchEvent(new Event('cx:counts'));
    } catch (e) {
      toast((e as Error).message);
    }
  };
  const message = async (p: Profile) => {
    try {
      navigate(`/messages/${await api.openConversation(p.id)}`);
    } catch (e) {
      toast((e as Error).message);
    }
  };
  const remove = async (p: Profile) => {
    const ok = await ask({ title: `Remove ${p.name} from your connections?`, body: 'You won’t be able to message each other until one of you connects again.', confirm: 'Remove', danger: true });
    if (ok) run(() => api.removeConnection(p.id), 'Connection removed.');
  };

  return (
    <div className="cx-col">
      <h1 className="cx-h1">Connections</h1>

      <h2 className="cx-h2">Requests{data.incoming.length > 0 && <span className="cx-count">{data.incoming.length}</span>}</h2>
      {data.incoming.length === 0 ? (
        <p className="cx-muted">No requests waiting.</p>
      ) : (
        <ul className="cx-list">
          {data.incoming.map((p) => (
            <li key={p.id} className="cx-row">
              <Who p={p} />
              <div className="cx-row-actions">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => run(() => api.answerRequest(p.id, true), `You’re connected with ${p.name}.`)}>
                  Accept
                </button>
                <button type="button" className="btn btn-light btn-sm" onClick={() => run(() => api.answerRequest(p.id, false), 'Request declined.')}>
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="cx-h2">Your connections</h2>
      {data.people.length === 0 ? (
        <p className="cx-muted">
          No connections yet. <A path="/students">Find Keyframe Ninjas</A> and tap Connect.
        </p>
      ) : (
        <ul className="cx-list">
          {data.people.map((p) => (
            <li key={p.id} className="cx-row">
              <Who p={p} />
              <div className="cx-row-actions">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => message(p)}>
                  Message
                </button>
                <button type="button" className="cx-icon-btn" aria-label={`Remove ${p.name}`} title="Remove connection" onClick={() => remove(p)}>
                  <Icon name="close" size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {data.sent.length > 0 && (
        <>
          <h2 className="cx-h2">Sent requests</h2>
          <ul className="cx-list">
            {data.sent.map((p) => (
              <li key={p.id} className="cx-row">
                <Who p={p} />
                <button type="button" className="btn btn-light btn-sm" onClick={() => run(() => api.removeConnection(p.id), 'Request cancelled.')}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ================= Notifications ================= */
export function Notifications() {
  const { api, me, signedIn } = useConnect();
  const [list, setList] = useState<Notice[] | null>(null);

  useEffect(() => {
    if (!me) return;
    api
      .listNotices()
      .then(async (n) => {
        setList(n);
        await api.markNoticesRead();
        window.dispatchEvent(new Event('cx:counts'));
      })
      .catch(() => setList([]));
  }, [api, me]);

  if (!signedIn) return <Gate />;
  if (me === undefined) return <Loading />;
  if (!me) return <Gate profile />;
  if (!list) return <Loading label="Loading notifications" />;

  const line = (n: Notice) => {
    const name = n.actor?.name ?? 'Someone';
    if (n.kind === 'community_post') return { text: `${name} posted to the Community feed.`, path: n.post_id ? `/p/${n.post_id}` : '/' };
    if (n.kind === 'connection_request') return { text: `${name} wants to connect with you.`, path: '/connections' };
    return { text: `${name} accepted your connection request.`, path: n.actor ? `/u/${n.actor.handle}` : '/connections' };
  };

  return (
    <div className="cx-col">
      <h1 className="cx-h1">Notifications</h1>
      {list.length === 0 ? (
        <Empty title="You’re all caught up" />
      ) : (
        <ul className="cx-list cx-notices">
          {list.map((n) => {
            const l = line(n);
            return (
              <li key={n.id}>
                <A path={l.path} className={n.read_at ? 'cx-notice' : 'cx-notice is-new'}>
                  {n.actor ? <Avatar p={n.actor} size={44} /> : <Icon name="bell" />}
                  <span className="cx-notice-text">
                    {l.text}
                    <time dateTime={n.created_at}>{timeAgo(n.created_at)}</time>
                  </span>
                </A>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ================= Saved projects ================= */
export function Saved() {
  const { api, me, signedIn } = useConnect();
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    if (me) api.listSaved().then(setPosts).catch(() => setPosts([]));
  }, [api, me]);

  if (!signedIn) return <Gate />;
  if (me === undefined) return <Loading />;
  if (!me) return <Gate profile />;
  if (!posts) return <Loading label="Loading saved projects" />;

  return (
    <div className="cx-col">
      <div className="cx-intro">
        <h1 className="cx-h1">Saved</h1>
        <p>Projects you bookmarked. Only you can see this list.</p>
      </div>
      {posts.length === 0 ? (
        <Empty title="Nothing saved yet">
          <p>Tap the bookmark on any project to keep it here.</p>
        </Empty>
      ) : (
        <div className="cx-feed">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
