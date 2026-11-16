'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useConnect } from './context';
import { hasPaymentTalk, PAYMENT_NOTE } from './safety';
import { navigate } from './router';
import { socialUrl, timeAgo } from './media';
import { PHASES, SKILLS, type Comment, type ConnectionStatus, type Post, type Profile } from './types';
import { A, Avatar, Empty, Icon, LikeButton, Loading, Media, NinjaBadge, PersonLine, PostCard, SampleTag, SaveButton, SenseiBadge } from './ui';

/* ================= Feed ================= */
type FeedName = 'community' | 'everyone' | 'connections';
const FEEDS: { key: FeedName; label: string; needsAccount?: boolean }[] = [
  { key: 'community', label: 'Community' },
  { key: 'everyone', label: 'Everyone' },
  { key: 'connections', label: 'Connections', needsAccount: true },
];

export function Feed() {
  const { api, me, signedIn } = useConnect();
  const [tab, setTab] = useState<FeedName>('community');
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let live = true;
    setPosts(null);
    api.listPosts({ feed: tab }).then((p) => live && setPosts(p)).catch(() => live && setPosts([]));
    return () => {
      live = false;
    };
  }, [api, tab]);

  const canShare = me?.is_student || me?.is_sensei;

  return (
    <div className="cx-col cx-stream">
      <h1 className="sr-only">Feed</h1>
      <div className="cx-tabs" role="tablist" aria-label="Feed">
        {FEEDS.filter((f) => !f.needsAccount || me).map((f) => (
          <button key={f.key} type="button" role="tab" aria-selected={tab === f.key} className={tab === f.key ? 'is-on' : ''} onClick={() => setTab(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {canShare && me && (
        <A path="/new" className="cx-composer">
          <Avatar p={me} size={40} />
          <span>{me.is_sensei ? 'Post something to the community…' : 'Share what you’re working on…'}</span>
        </A>
      )}
      {!signedIn && (
        <p className="cx-signin-line">
          <A path="/login">Sign in</A> to connect, comment and save projects.
        </p>
      )}

      {posts === null ? (
        <Loading label="Loading posts" />
      ) : posts.length === 0 ? (
        <Empty title="Nothing here yet">
          {tab === 'connections' ? (
            <p>
              Connect with Ninjas from the <A path="/students">students page</A> and their work shows up here.
            </p>
          ) : tab === 'community' ? (
            <p>Posts from the grand sensei will appear here.</p>
          ) : (
            <p>When Keyframe Ninjas share their work, it appears here.</p>
          )}
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

/* ================= Students directory ================= */
export function Students() {
  const { api } = useConnect();
  const [q, setQ] = useState('');
  const [skill, setSkill] = useState('');
  const [phase, setPhase] = useState<number | null>(null);
  const [list, setList] = useState<Profile[] | null>(null);

  useEffect(() => {
    let live = true;
    const t = window.setTimeout(() => {
      api.listStudents({ q, skill, phase }).then((r) => live && setList(r)).catch(() => live && setList([]));
    }, 200);
    return () => {
      live = false;
      window.clearTimeout(t);
    };
  }, [api, q, skill, phase]);

  return (
    <div className="cx-col">
      <div className="cx-intro">
        <h1 className="cx-h1">Keyframe Ninjas</h1>
        <p>Students of Black Belt in Motion Design.</p>
      </div>

      <div className="cx-filters">
        <label className="cx-search">
          <Icon name="search" size={20} />
          <span className="sr-only">Search students</span>
          <input type="search" placeholder="Search by name or country" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="cx-chips" role="group" aria-label="Filter by skill">
          <button type="button" className={!skill ? 'cx-chip is-on' : 'cx-chip'} onClick={() => setSkill('')} aria-pressed={!skill}>
            All skills
          </button>
          {SKILLS.map((s) => (
            <button key={s} type="button" className={skill === s ? 'cx-chip is-on' : 'cx-chip'} onClick={() => setSkill(skill === s ? '' : s)} aria-pressed={skill === s}>
              {s}
            </button>
          ))}
        </div>
        <label className="cx-select">
          <span>Phase</span>
          <select value={phase ?? ''} onChange={(e) => setPhase(e.target.value ? Number(e.target.value) : null)}>
            <option value="">Any phase</option>
            {PHASES.map((t, i) => (
              <option key={t} value={i + 1}>
                {i + 1}. {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {list === null ? (
        <Loading label="Loading students" />
      ) : list.length === 0 ? (
        <Empty title="No students match">
          <p>Try another name, skill or phase.</p>
        </Empty>
      ) : (
        <ul className="cx-people">
          {list.map((p) => (
            <li key={p.id}>
              <A path={`/u/${p.handle}`} className="cx-person-row">
                <Avatar p={p} size={56} />
                <span className="cx-person-row-text">
                  <span className="cx-person-name">
                    {p.name}
                    <NinjaBadge small />
                    {p.sample && <SampleTag />}
                  </span>
                  <span className="cx-person-meta">
                    @{p.handle}
                    {p.country && <> · {p.country}</>}
                    {p.phase && <> · Phase {p.phase}: {PHASES[p.phase - 1]}</>}
                  </span>
                  {p.skills.length > 0 && <span className="cx-person-skills">{p.skills.slice(0, 4).join(' · ')}</span>}
                </span>
              </A>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================= Profile ================= */
export function ProfileScreen({ handle }: { handle: string }) {
  const { api, me, signedIn, toast, ask } = useConnect();
  const [p, setP] = useState<Profile | null | undefined>(undefined);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [counts, setCounts] = useState({ connections: 0, posts: 0 });
  const [status, setStatus] = useState<ConnectionStatus>('none');
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let live = true;
    setP(undefined);
    api.getProfile(handle).then(async (prof) => {
      if (!live) return;
      setP(prof);
      if (!prof) return;
      const [ps, c, st, b] = await Promise.all([api.listPosts({ authorId: prof.id }), api.counts(prof.id), api.connectionStatus(prof.id), api.isBlocked(prof.id)]);
      if (!live) return;
      setPosts(ps);
      setCounts(c);
      setStatus(st);
      setBlocked(b);
    });
    return () => {
      live = false;
    };
  }, [api, handle]);

  if (p === undefined) return <Loading label="Loading profile" />;
  if (p === null)
    return (
      <Empty title="We couldn’t find that member">
        <p>
          <A path="/students">Browse all students</A>
        </p>
      </Empty>
    );

  const mine = me?.id === p.id;
  const links = [
    { kind: 'instagram' as const, v: p.instagram, label: 'Instagram' },
    { kind: 'youtube' as const, v: p.youtube, label: 'YouTube' },
    { kind: 'website' as const, v: p.website, label: 'Website' },
  ].filter((l) => l.v);

  const act = async (fn: () => Promise<void>, next: ConnectionStatus, msg: string) => {
    if (!signedIn) return navigate('/login');
    if (!me) return navigate('/settings');
    setBusy(true);
    try {
      await fn();
      setStatus(next);
      if (next === 'connected' || status === 'connected') setCounts((c) => ({ ...c, connections: c.connections + (next === 'connected' ? 1 : -1) }));
      toast(msg);
    } catch (e) {
      toast((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const connect = () => act(() => api.requestConnection(p.id), 'requested', `Request sent to ${p.name}.`);
  const cancel = () => act(() => api.removeConnection(p.id), 'none', 'Request cancelled.');
  const accept = () => act(() => api.answerRequest(p.id, true), 'connected', `You’re connected with ${p.name}.`);
  const decline = () => act(() => api.answerRequest(p.id, false), 'none', 'Request declined.');
  const disconnect = async () => {
    setMenu(false);
    const ok = await ask({ title: `Remove ${p.name} from your connections?`, body: 'You won’t be able to message each other until one of you connects again.', confirm: 'Remove', danger: true });
    if (ok) act(() => api.removeConnection(p.id), 'none', 'Connection removed.');
  };
  const message = async () => {
    if (!signedIn) return navigate('/login');
    if (!me) return navigate('/settings');
    try {
      navigate(`/messages/${await api.openConversation(p.id)}`);
    } catch (e) {
      toast((e as Error).message);
    }
  };
  const report = async () => {
    setMenu(false);
    if (!signedIn) return navigate('/login');
    const reason = await ask({ title: 'Report this profile', body: 'A moderator will look at it. The member won’t see who reported them.', input: 'What’s wrong?', confirm: 'Send report' });
    if (reason === null) return;
    await api.report('profile', p.id, reason);
    toast('Thanks. A moderator will take a look.');
  };
  const block = async () => {
    setMenu(false);
    if (!signedIn) return navigate('/login');
    await api.setBlock(p.id, !blocked);
    setBlocked(!blocked);
    if (!blocked) setStatus('none');
    toast(blocked ? `Unblocked ${p.name}.` : `Blocked ${p.name}. They can’t message you.`);
  };

  const skillsLine = p.skills.join(' · ');

  return (
    <div className="cx-pf">
      <div className="cx-pf-cover" aria-hidden="true">
        {p.cover_url ? <img src={p.cover_url} alt="" /> : <DefaultCover seed={p.handle} />}
      </div>

      <div className="cx-pf-inner">
        <div className="cx-pf-top">
          <span className="cx-pf-avatar">
            <Avatar p={p} size={136} />
          </span>
          <div className="cx-pf-actions">
            {mine ? (
              <A path="/settings" className="btn btn-light btn-sm">
                Edit profile
              </A>
            ) : (
              <>
                {!blocked && status === 'none' && (
                  <button type="button" className="btn btn-primary btn-sm" onClick={connect} disabled={busy}>
                    <Icon name="link2" size={18} /> Connect
                  </button>
                )}
                {status === 'requested' && (
                  <button type="button" className="btn btn-light btn-sm" onClick={cancel} disabled={busy} title="Cancel request">
                    Requested
                  </button>
                )}
                {status === 'incoming' && (
                  <>
                    <button type="button" className="btn btn-primary btn-sm" onClick={accept} disabled={busy}>
                      Accept
                    </button>
                    <button type="button" className="btn btn-light btn-sm" onClick={decline} disabled={busy}>
                      Decline
                    </button>
                  </>
                )}
                {status === 'connected' && (
                  <button type="button" className="btn btn-primary btn-sm" onClick={message}>
                    Message
                  </button>
                )}
                <div className="cx-menu">
                  <button type="button" className="cx-icon-btn" aria-label="More options" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                    <Icon name="more" />
                  </button>
                  {menu && (
                    <div className="cx-menu-list" role="menu">
                      {status === 'connected' && (
                        <button type="button" role="menuitem" onClick={disconnect}>
                          Remove connection
                        </button>
                      )}
                      <button type="button" role="menuitem" onClick={report}>
                        Report profile
                      </button>
                      <button type="button" role="menuitem" onClick={block}>
                        {blocked ? 'Unblock' : 'Block'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="cx-pf-info">
          <h1 className="cx-pf-name">
            {p.name}
            {p.is_sensei ? <SenseiBadge /> : p.is_student && <NinjaBadge small />}
            {p.sample && <SampleTag />}
          </h1>
          <p className="cx-pf-handle">
            @{p.handle}
            {status === 'connected' && <span className="cx-pf-connected"> · Connected</span>}
          </p>
          {p.bio && <p className="cx-bio">{p.bio}</p>}

          <ul className="cx-pf-meta">
            {p.is_sensei ? (
              <li>Grand Sensei, Motion Dojo</li>
            ) : p.is_student ? (
              <li>Keyframe Ninja{p.phase ? `, phase ${p.phase}: ${PHASES[p.phase - 1]}` : ''}</li>
            ) : (
              <li>Community member</li>
            )}
            {p.country && <li>{p.country}</li>}
            {links.map((l) => (
              <li key={l.kind}>
                <a href={socialUrl(l.kind, l.v)} target="_blank" rel="noopener noreferrer">
                  <Icon name={l.kind === 'website' ? 'link' : l.kind} size={16} />
                  {l.kind === 'website' ? l.v.replace(/^https?:\/\//, '').replace(/\/$/, '') : l.v.startsWith('http') ? l.label : `@${l.v.replace(/^@/, '')}`}
                </a>
              </li>
            ))}
          </ul>
          {skillsLine && <p className="cx-pf-skills">{skillsLine}</p>}

          <p className="cx-pf-stats">
            <span>
              <strong>{counts.posts}</strong> {counts.posts === 1 ? 'post' : 'posts'}
            </span>
            <span>
              <strong>{counts.connections}</strong> {counts.connections === 1 ? 'connection' : 'connections'}
            </span>
          </p>
        </div>

        <div className="cx-pf-tabs" role="tablist" aria-label="Profile">
          <span role="tab" aria-selected="true" className="is-on">
            Work
          </span>
        </div>

        {posts === null ? (
          <Loading />
        ) : posts.length === 0 ? (
          <p className="cx-pf-empty">
            {p.is_student ? (mine ? 'You haven’t posted any work yet.' : 'No work posted yet.') : 'Only Keyframe Ninjas post work.'}{' '}
            {mine && p.is_student && <A path="/new">Share your first piece</A>}
          </p>
        ) : (
          <ul className="cx-thumbs">
            {posts.map((x) => (
              <li key={x.id}>
                <A path={`/p/${x.id}`} className="cx-thumb" aria-label={x.caption || 'Open post'}>
                  {x.kind === 'image' ? (
                    <img src={x.media_url} alt="" loading="lazy" />
                  ) : (
                    <span className="cx-thumb-video">
                      <Icon name="video" size={30} />
                    </span>
                  )}
                  <span className="cx-thumb-stats">
                    <Icon name="heart" size={16} filled /> {x.likes}
                    <Icon name="comment" size={16} /> {x.comments}
                  </span>
                </A>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Cover for members without their own: a motion curve with keyframes, varied by handle */
function DefaultCover({ seed }: { seed: string }) {
  const n = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bend = 20 + (n % 60);
  return (
    <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="300" fill="#140a2e" />
      <path d={`M-20 ${240 - bend} C 260 ${250 - bend}, 360 ${40 + bend}, 600 ${90 + bend / 2} S 980 ${260 - bend}, 1220 ${60 + bend / 2}`} fill="none" stroke="#6d32e8" strokeWidth="6" />
      <g fill="#c8ff3d">
        <rect x="590" y={80 + bend / 2} width="20" height="20" rx="4" transform={`rotate(45 600 ${90 + bend / 2})`} />
      </g>
    </svg>
  );
}

/* ================= Single post with comments ================= */
export function PostScreen({ id }: { id: string }) {
  const { api, me, signedIn, toast, ask } = useConnect();
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [p, c] = await Promise.all([api.getPost(id), api.listComments(id)]);
    setPost(p);
    setComments(c);
  }, [api, id]);
  useEffect(() => {
    load();
  }, [load]);

  if (post === undefined) return <Loading label="Loading post" />;
  if (post === null)
    return (
      <Empty title="This post isn’t here anymore">
        <p>
          <A path="/">Back to the feed</A>
        </p>
      </Empty>
    );

  const canModerate = me && (me.id === post.author_id || me.is_moderator);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setBusy(true);
    try {
      const c = await api.addComment(post.id, body);
      setComments((cs) => [...cs, c]);
      setDraft('');
    } catch (err) {
      toast((err as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const removePost = async () => {
    if (!(await ask({ title: 'Delete this post?', body: 'Its likes and comments go too. This can’t be undone.', confirm: 'Delete', danger: true }))) return;
    await api.deletePost(post.id);
    toast('Post deleted.');
    navigate(me ? `/u/${me.handle}` : '/');
  };
  const removeComment = async (c: Comment) => {
    await api.deleteComment(c.id);
    setComments((cs) => cs.filter((x) => x.id !== c.id));
  };
  const reportPost = async () => {
    if (!signedIn) return navigate('/login');
    const reason = await ask({ title: 'Report this post', body: 'A moderator will look at it. The member won’t see who reported them.', input: 'What’s wrong?', confirm: 'Send report' });
    if (reason === null) return;
    await api.report('post', post.id, reason);
    toast('Thanks. A moderator will take a look.');
  };

  const canDeleteComment = (c: Comment) => Boolean(me && (me.id === c.author_id || me.id === post.author_id || me.is_moderator));

  return (
    <div className="cx-col cx-stream">
      <header className="cx-bar">
        <button type="button" className="cx-icon-btn cx-icon-flat" onClick={() => window.history.back()} aria-label="Back">
          <Icon name="back" />
        </button>
        <h1>Post</h1>
      </header>

      <article className={post.community ? 'cx-post cx-post-community' : 'cx-post'}>
        <header className="cx-post-head">
          <PersonLine p={post.author} when={post.created_at} />
          {post.community ? <span className="cx-tag">Community</span> : post.tag === 'feedback' && <span className="cx-tag">Wants feedback</span>}
        </header>
        <Media post={post} priority />
        {post.caption && <p className="cx-caption">{post.caption}</p>}
        <footer className="cx-post-actions">
          <LikeButton post={post} />
          <label htmlFor="comment-box" className="cx-act" aria-label={`${comments.length} comments`}>
            <Icon name="comment" />
            <span>{comments.length}</span>
          </label>
          <span className="cx-spacer" />
          <SaveButton post={post} />
          {canModerate ? (
            <button type="button" className="cx-text-btn" onClick={removePost}>
              Delete
            </button>
          ) : (
            <button type="button" className="cx-text-btn" onClick={reportPost}>
              Report
            </button>
          )}
        </footer>
      </article>

      {me ? (
        <form className="cx-reply" onSubmit={submit}>
          <Avatar p={me} size={36} />
          <label className="sr-only" htmlFor="comment-box">
            Write a comment
          </label>
          <textarea
            id="comment-box"
            rows={1}
            maxLength={1000}
            placeholder={post.tag === 'feedback' ? 'What would you change?' : 'Add a comment'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                (e.currentTarget.form as HTMLFormElement).requestSubmit();
              }
            }}
          />
          <button type="submit" className="cx-reply-send" disabled={busy || !draft.trim() || hasPaymentTalk(draft)}>
            Post
          </button>
        </form>
      ) : (
        <p className="cx-signin-line">
          <A path={signedIn ? '/settings' : '/login'}>{signedIn ? 'Finish your profile' : 'Sign in'}</A> to comment.
        </p>
      )}
      {hasPaymentTalk(draft) && (
        <p className="cx-safety" role="alert">
          {PAYMENT_NOTE}
        </p>
      )}

      <section aria-label={post.tag === 'feedback' ? 'Feedback' : 'Comments'}>
        {comments.length === 0 ? (
          <p className="cx-thread-empty">{post.tag === 'feedback' ? 'No feedback yet.' : 'No comments yet.'}</p>
        ) : (
          <ul className="cx-thread">
            {comments.map((c) => (
              <li key={c.id} className="cx-comment">
                <A path={`/u/${c.author.handle}`} tabIndex={-1} aria-hidden="true">
                  <Avatar p={c.author} size={36} />
                </A>
                <div className="cx-comment-main">
                  <p className="cx-comment-body">
                    <A path={`/u/${c.author.handle}`} className="cx-comment-name">
                      {c.author.name}
                    </A>
                    {c.author.is_sensei && <SenseiBadge />}
                    {c.author.is_student && <NinjaBadge small />} {c.body}
                  </p>
                  <p className="cx-comment-meta">
                    <time dateTime={c.created_at}>{timeAgo(c.created_at)}</time>
                    {canDeleteComment(c) && (
                      <button type="button" onClick={() => removeComment(c)}>
                        Delete
                      </button>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
