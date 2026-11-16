'use client';

import React, { useState } from 'react';
import { onLinkClick, to } from './router';
import { useConnect } from './context';
import { isTall, timeAgo, toEmbed } from './media';
import { PHASES, type Post, type Profile } from './types';

/* ---------- Icons: one outline set on a 24px grid ---------- */
const PATHS = {
  home: <path d="M4 10.5 12 4l8 6.5V20h-5v-6h-6v6H4z" />,
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.8c1.9.6 3.1 2.2 3.5 4.7" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  comment: <path d="M5 5h14v10H10l-5 4z" />,
  send: <path d="M4 12 20 4l-6 16-3-7z" />,
  back: <path d="M15 5l-7 7 7 7" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 18 5-5 4 4 2.5-2.5L20 19" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1-3.6 3.7-5.5 7-5.5s6 1.9 7 5.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </>
  ),
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  belt: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.6 13.4-1.6 7.1 5-2.6 5 2.6-1.6-7.1" />
    </>
  ),
  out: <path d="M7 17 17 7M9 7h8v8" />,
  bookmark: <path d="M6.5 4h11v16l-5.5-4-5.5 4z" />,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" />,
  link2: (
    <>
      <circle cx="8" cy="12" r="4" />
      <circle cx="16" cy="12" r="4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};
export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 22, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

/* ---------- Links that switch pages without a reload ---------- */
export function A({ path, className, children, ...rest }: { path: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <a href={to(path)} className={className} onClick={(e) => onLinkClick(e, path)} {...rest}>
      {children}
    </a>
  );
}

/* ---------- People ---------- */
const TINTS = ['#6d32e8', '#140a2e', '#a77bff', '#2b1a5c'];
export function Avatar({ p, size = 44 }: { p: Pick<Profile, 'name' | 'avatar_url' | 'handle'>; size?: number }) {
  const initials = p.name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const tint = TINTS[[...p.handle].reduce((n, c) => n + c.charCodeAt(0), 0) % TINTS.length];
  return p.avatar_url ? (
    <img className="cx-avatar" src={p.avatar_url} alt="" width={size} height={size} style={{ width: size, height: size }} />
  ) : (
    <span className="cx-avatar cx-avatar-initials" aria-hidden="true" style={{ width: size, height: size, background: tint, fontSize: size * 0.38 }}>
      {initials || '?'}
    </span>
  );
}

export function NinjaBadge({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? 'cx-badge cx-badge-sm' : 'cx-badge'} title="Keyframe Ninja: a student on Black Belt in Motion Design">
      <Icon name="belt" size={small ? 13 : 15} />
      {!small && 'Keyframe Ninja'}
      {small && <span className="sr-only">Keyframe Ninja</span>}
    </span>
  );
}

export function SenseiBadge() {
  return <span className="cx-badge cx-badge-sensei">Grand Sensei</span>;
}

export function SampleTag() {
  return <span className="cx-sample">Sample</span>;
}

/** Four steps of Black Belt, filled up to the student's current phase */
export function PhaseTrack({ phase }: { phase: number }) {
  return (
    <div className="cx-phases" aria-label={`Black Belt phase ${phase} of 4: ${PHASES[phase - 1]}`}>
      <ol aria-hidden="true">
        {PHASES.map((t, i) => (
          <li key={t} className={i < phase ? 'is-done' : ''} />
        ))}
      </ol>
      <span>
        Phase {phase}: {PHASES[phase - 1]}
      </span>
    </div>
  );
}

export function PersonLine({ p, when }: { p: Profile; when?: string }) {
  return (
    <A path={`/u/${p.handle}`} className="cx-person">
      <Avatar p={p} size={40} />
      <span className="cx-person-text">
        <span className="cx-person-name">
          {p.name}
          {p.is_sensei && <SenseiBadge />}
          {p.is_student && <NinjaBadge small />}
          {p.sample && <SampleTag />}
        </span>
        <span className="cx-person-meta">
          @{p.handle}
          {when && <> · {timeAgo(when)}</>}
        </span>
      </span>
    </A>
  );
}

/* ---------- Media ---------- */
export function Media({ post, priority = false }: { post: Pick<Post, 'kind' | 'media_url' | 'caption'>; priority?: boolean }) {
  if (post.kind === 'image') {
    return (
      <div className="cx-media">
        <img src={post.media_url} alt={post.caption ? post.caption.slice(0, 120) : 'Posted work'} loading={priority ? 'eager' : 'lazy'} />
      </div>
    );
  }
  const embed = toEmbed(post.media_url);
  if (!embed) {
    return (
      <a className="cx-media cx-media-link" href={post.media_url} target="_blank" rel="noopener noreferrer">
        <Icon name="video" size={28} />
        Watch the video
      </a>
    );
  }
  return (
    <div className={isTall(post.media_url) ? 'cx-media cx-media-tall' : 'cx-media cx-media-wide'}>
      <iframe src={embed} title="Posted video" loading="lazy" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen />
    </div>
  );
}

/* ---------- Posts ---------- */
export function LikeButton({ post, onChange }: { post: Post; onChange?: (p: Post) => void }) {
  const { api, signedIn, toast } = useConnect();
  const [state, setState] = useState({ liked: post.liked, likes: post.likes });
  const [pop, setPop] = useState(false);
  const toggle = async () => {
    if (!signedIn) {
      toast('Sign in to like posts.');
      return;
    }
    const next = { liked: !state.liked, likes: state.likes + (state.liked ? -1 : 1) };
    setState(next);
    if (next.liked) {
      setPop(true);
      window.setTimeout(() => setPop(false), 500);
    }
    try {
      await api.setLike(post.id, next.liked);
      onChange?.({ ...post, ...next });
    } catch (e) {
      setState(state);
      toast((e as Error).message);
    }
  };
  return (
    <button
      type="button"
      className={['cx-act', state.liked ? 'is-liked' : '', pop ? 'is-pop' : ''].join(' ').trim()}
      onClick={toggle}
      aria-pressed={state.liked}
      aria-label={state.liked ? 'Unlike' : 'Like'}
    >
      <Icon name="heart" filled={state.liked} />
      <span>{state.likes}</span>
    </button>
  );
}

export function SaveButton({ post }: { post: Post }) {
  const { api, signedIn, me, toast } = useConnect();
  const [saved, setSaved] = useState(post.saved);
  if (signedIn && me && me.id === post.author_id) return null;
  const toggle = async () => {
    if (!signedIn || !me) {
      toast('Sign in to save projects.');
      return;
    }
    setSaved(!saved);
    try {
      await api.setSaved(post.id, !saved);
      toast(saved ? 'Removed from Saved.' : 'Saved. Find it under Saved in your menu.');
    } catch (e) {
      setSaved(saved);
      toast((e as Error).message);
    }
  };
  return (
    <button type="button" className={saved ? 'cx-act is-saved' : 'cx-act'} onClick={toggle} aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save project'}>
      <Icon name="bookmark" filled={saved} />
    </button>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className={post.community ? 'cx-post cx-post-community' : 'cx-post'}>
      <header className="cx-post-head">
        <PersonLine p={post.author} when={post.created_at} />
        {post.community ? <span className="cx-tag">Community</span> : post.tag === 'feedback' && <span className="cx-tag">Wants feedback</span>}
      </header>
      <A path={`/p/${post.id}`} className="cx-post-media" aria-label="Open post">
        <Media post={post} />
      </A>
      {post.caption && <p className="cx-caption">{post.caption}</p>}
      <footer className="cx-post-actions">
        <LikeButton post={post} />
        <A path={`/p/${post.id}`} className="cx-act" aria-label={`${post.comments} comments`}>
          <Icon name="comment" />
          <span>{post.comments}</span>
        </A>
        <span className="cx-spacer" />
        <SaveButton post={post} />
      </footer>
    </article>
  );
}

/* ---------- States ---------- */
export function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="cx-loading" role="status">
      <span className="cx-spinner" aria-hidden="true" />
      {label}…
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="cx-empty">
      <p className="cx-empty-title">{title}</p>
      {children}
    </div>
  );
}
