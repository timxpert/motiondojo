'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useConnect } from './context';
import { hasPaymentTalk, PAYMENT_NOTE } from './safety';
import { navigate } from './router';
import { timeAgo, toEmbed } from './media';
import { PHASES, SKILLS, type Conversation, type Message, type Profile } from './types';
import { A, Avatar, Empty, Icon, Loading, Media, NinjaBadge, SampleTag } from './ui';

/* ================= Sign in ================= */
export function Login() {
  const { api, signedIn, me } = useConnect();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (signedIn && me) navigate('/');
    else if (signedIn && me === null) navigate('/settings');
  }, [signedIn, me]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setErr('Enter a valid email address.');
    setBusy(true);
    try {
      await api.signIn(email.trim());
      setSent(true);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cx-narrow">
      <div className="cx-panel">
        <h1 className="cx-h1">Sign in to Connect</h1>
        {sent ? (
          <p className="cx-lead">
            Check <strong>{email}</strong> for a sign-in link. It works once and expires after an hour.
          </p>
        ) : (
          <>
            <p className="cx-lead">
              We’ll email you a link, no password needed. Students: use the email you enrolled with and your Keyframe Ninja badge
              turns on automatically.
            </p>
            <form className="cx-form" onSubmit={submit} noValidate>
              <label className="field">
                <span>Email address</span>
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              {err && (
                <p className="cx-error" role="alert">
                  {err}
                </p>
              )}
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? 'Sending…' : 'Email me a sign-in link'}
              </button>
            </form>
          </>
        )}
        {api.demoSignIn && (
          <div className="cx-demo">
            <p>
              <strong>Preview:</strong> email sign-in starts working once the database is connected. Try it with a sample account:
            </p>
            <div className="cx-demo-btns">
              <button type="button" className="btn btn-lime btn-sm" onClick={() => api.demoSignIn!('student')}>
                Sample Keyframe Ninja
              </button>
              <button type="button" className="btn btn-light btn-sm" onClick={() => api.demoSignIn!('visitor')}>
                Sample visitor
              </button>
              <button type="button" className="btn btn-light btn-sm" onClick={() => api.demoSignIn!('sensei')}>
                Sample grand sensei
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= Profile setup and editing ================= */
const toHandle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 24);

export function Settings() {
  const { api, me, signedIn, refreshMe, toast } = useConnect();
  const creating = me === null;
  const [f, setF] = useState({
    name: '',
    handle: '',
    bio: '',
    country: '',
    skills: [] as string[],
    phase: null as number | null,
    instagram: '',
    youtube: '',
    website: '',
    avatar_url: null as string | null,
    cover_url: null as string | null,
  });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [invite, setInvite] = useState('');

  useEffect(() => {
    if (me) {
      setF({
        name: me.name,
        handle: me.handle,
        bio: me.bio,
        country: me.country,
        skills: me.skills,
        phase: me.phase,
        instagram: me.instagram,
        youtube: me.youtube,
        website: me.website,
        avatar_url: me.avatar_url,
        cover_url: me.cover_url,
      });
    }
  }, [me]);

  if (!signedIn) {
    return (
      <Empty title="Sign in to set up your profile">
        <A path="/login" className="btn btn-primary btn-sm">
          Sign in
        </A>
      </Empty>
    );
  }
  if (me === undefined) return <Loading />;

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));
  const toggleSkill = (s: string) => set('skills', f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s].slice(0, 6));

  const pickAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) return toast('Pick an image under 3 MB.');
    try {
      set('avatar_url', await api.uploadImage(file, 'avatars'));
    } catch (e2) {
      toast((e2 as Error).message);
    }
  };

  const pickCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast('Pick an image under 5 MB.');
    try {
      set('cover_url', await api.uploadImage(file, 'covers'));
    } catch (e2) {
      toast((e2 as Error).message);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const handle = toHandle(f.handle || f.name);
    if (!f.name.trim()) return setErr('Add your name.');
    if (handle.length < 3) return setErr('Your username needs at least 3 letters or numbers.');
    if (hasPaymentTalk(f.bio, f.name)) return setErr(PAYMENT_NOTE);
    setBusy(true);
    try {
      const input = { ...f, name: f.name.trim(), handle, bio: f.bio.trim() };
      const saved = creating ? await api.createProfile(input) : await api.updateProfile(input);
      await refreshMe();
      toast(creating ? 'Welcome to Motion Dojo Connect.' : 'Profile saved.');
      navigate(`/u/${saved.handle}`);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const checkStudent = async () => {
    const ok = await api.refreshStudentStatus();
    await refreshMe();
    toast(ok ? 'You’re verified as a Keyframe Ninja.' : 'We couldn’t find an enrolment for this email yet.');
  };
  const useInvite = async () => {
    const ok = await api.redeemInvite(invite);
    await refreshMe();
    toast(ok ? 'Invite accepted. You’re a Keyframe Ninja.' : 'That code didn’t work. Check it with the community manager.');
  };

  return (
    <div className="cx-narrow">
      <form className="cx-panel cx-form" onSubmit={save} noValidate>
        <h1 className="cx-h1">{creating ? 'Set up your profile' : 'Edit profile'}</h1>

        <div className="cx-cover-pick" style={f.cover_url ? { backgroundImage: `url(${f.cover_url})` } : undefined}>
          <label className="btn btn-light btn-sm">
            {f.cover_url ? 'Change cover' : 'Add a cover image'}
            <input type="file" accept="image/*" className="sr-only" onChange={pickCover} />
          </label>
        </div>
        <div className="cx-avatar-pick">
          <Avatar p={{ name: f.name || '?', handle: f.handle || 'x', avatar_url: f.avatar_url }} size={88} />
          <label className="btn btn-light btn-sm">
            {f.avatar_url ? 'Change photo' : 'Add a photo'}
            <input type="file" accept="image/*" className="sr-only" onChange={pickAvatar} />
          </label>
        </div>

        <label className="field">
          <span>Name</span>
          <input value={f.name} maxLength={60} autoComplete="name" onChange={(e) => set('name', e.target.value)} />
        </label>
        <label className="field">
          <span>Username</span>
          <input value={f.handle} maxLength={24} placeholder={toHandle(f.name) || 'your_name'} onChange={(e) => set('handle', toHandle(e.target.value))} />
          <small>Letters, numbers and underscores. Your profile link uses it.</small>
        </label>
        <label className="field">
          <span>Bio</span>
          <textarea rows={3} maxLength={400} value={f.bio} onChange={(e) => set('bio', e.target.value)} />
          <small>{400 - f.bio.length} characters left</small>
        </label>
        <label className="field">
          <span>Country</span>
          <input value={f.country} maxLength={60} autoComplete="country-name" onChange={(e) => set('country', e.target.value)} />
        </label>

        <fieldset className="cx-fieldset">
          <legend>What you’re working on (up to 6)</legend>
          <div className="cx-chips">
            {SKILLS.map((s) => (
              <button key={s} type="button" className={f.skills.includes(s) ? 'cx-chip is-on' : 'cx-chip'} aria-pressed={f.skills.includes(s)} onClick={() => toggleSkill(s)}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        {me?.is_student && !me.is_sensei && (
          <label className="field">
            <span>Your Black Belt phase</span>
            <select value={f.phase ?? ''} onChange={(e) => set('phase', e.target.value ? Number(e.target.value) : null)}>
              <option value="">Prefer not to show</option>
              {PHASES.map((t, i) => (
                <option key={t} value={i + 1}>
                  Phase {i + 1}: {t}
                </option>
              ))}
            </select>
          </label>
        )}

        <fieldset className="cx-fieldset">
          <legend>Links</legend>
          <label className="field">
            <span>Instagram</span>
            <input value={f.instagram} placeholder="@yourname" onChange={(e) => set('instagram', e.target.value)} />
          </label>
          <label className="field">
            <span>YouTube</span>
            <input value={f.youtube} placeholder="@yourchannel" onChange={(e) => set('youtube', e.target.value)} />
          </label>
          <label className="field">
            <span>Website or portfolio</span>
            <input value={f.website} placeholder="yoursite.com" onChange={(e) => set('website', e.target.value)} />
          </label>
        </fieldset>

        {err && (
          <p className="cx-error" role="alert">
            {err}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? 'Saving…' : creating ? 'Create profile' : 'Save changes'}
        </button>
      </form>

      {me && !me.is_student && !me.is_sensei && (
        <div className="cx-panel cx-verify">
          <h2 className="cx-h2">Are you on Black Belt in Motion Design?</h2>
          <p className="cx-muted">If you enrolled with this email, check again. If you paid another way, enter the invite code from the community manager.</p>
          <button type="button" className="btn btn-light btn-sm" onClick={checkStudent}>
            Check my enrolment
          </button>
          <div className="cx-invite">
            <label className="sr-only" htmlFor="invite">
              Invite code
            </label>
            <input id="invite" placeholder="Invite code" value={invite} onChange={(e) => setInvite(e.target.value.toUpperCase())} />
            <button type="button" className="btn btn-primary btn-sm" disabled={!invite.trim()} onClick={useInvite}>
              Use code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= New post (students) ================= */
export function NewPost() {
  const { api, me, toast } = useConnect();
  const [kind, setKind] = useState<'image' | 'video'>('video');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [tag, setTag] = useState<'sharing' | 'feedback'>('sharing');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const sensei = Boolean(me?.is_sensei);

  if (me === undefined) return <Loading />;
  if (!me?.is_student && !sensei) {
    return (
      <Empty title="Posting is for Keyframe Ninjas">
        <p>Students on Black Belt in Motion Design share their work here. Everyone can like, comment, save and connect.</p>
      </Empty>
    );
  }

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) return setErr('Pick an image under 8 MB.');
    setErr('');
    try {
      setImage(await api.uploadImage(file, 'posts'));
    } catch (e2) {
      setErr((e2 as Error).message);
    }
  };
  const validVideo = kind === 'video' && toEmbed(url) !== null;
  const ready = kind === 'image' ? Boolean(image) : validVideo;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return setErr(kind === 'image' ? 'Add an image first.' : 'Paste a YouTube, Vimeo, Instagram or TikTok link.');
    setBusy(true);
    try {
      const p = await api.createPost({ kind, media_url: kind === 'image' ? image! : url.trim(), caption: caption.trim(), tag, community: sensei });
      toast(sensei ? 'Posted to the Community feed. Every student has been notified.' : 'Posted.');
      navigate(`/p/${p.id}`);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cx-narrow">
      <form className="cx-panel cx-form" onSubmit={submit} noValidate>
        <h1 className="cx-h1">{sensei ? 'Post to the community' : 'Share your work'}</h1>
        {sensei && <p className="cx-muted">This goes to the Community feed, and every Keyframe Ninja gets a notification.</p>}

        <div className="cx-seg" role="radiogroup" aria-label="What are you sharing?">
          {(['video', 'image'] as const).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={kind === k} className={kind === k ? 'is-on' : ''} onClick={() => setKind(k)}>
              <Icon name={k} size={18} /> {k === 'video' ? 'Video link' : 'Image'}
            </button>
          ))}
        </div>

        {kind === 'video' ? (
          <label className="field">
            <span>Video link</span>
            <input value={url} placeholder="Paste a YouTube, Vimeo, Instagram or TikTok link" onChange={(e) => setUrl(e.target.value)} />
            <small>Upload the video there first, then paste its share link.</small>
          </label>
        ) : (
          <label className="cx-drop">
            {image ? <img src={image} alt="" /> : <><Icon name="image" size={32} />Choose an image (PNG, JPG or GIF)</>}
            <input type="file" accept="image/*" className="sr-only" onChange={pick} />
          </label>
        )}

        {validVideo && <Media post={{ kind: 'video', media_url: url, caption: '' }} />}

        <label className="field">
          <span>Caption</span>
          <textarea rows={3} maxLength={1000} value={caption} placeholder="What did you make, and what did you learn?" onChange={(e) => setCaption(e.target.value)} />
        </label>

        {!sensei && (
        <div className="cx-seg" role="radiogroup" aria-label="What do you want from people?">
          <button type="button" role="radio" aria-checked={tag === 'sharing'} className={tag === 'sharing' ? 'is-on' : ''} onClick={() => setTag('sharing')}>
            Just sharing
          </button>
          <button type="button" role="radio" aria-checked={tag === 'feedback'} className={tag === 'feedback' ? 'is-on' : ''} onClick={() => setTag('feedback')}>
            I want feedback
          </button>
        </div>
        )}

        {hasPaymentTalk(caption) && (
          <p className="cx-safety" role="alert">
            {PAYMENT_NOTE}
          </p>
        )}
        {err && (
          <p className="cx-error" role="alert">
            {err}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy || hasPaymentTalk(caption)}>
          {busy ? 'Posting…' : sensei ? 'Post and notify students' : 'Post'}
        </button>
      </form>
    </div>
  );
}

/* ================= Messages ================= */
export function Inbox() {
  const { api, me, signedIn } = useConnect();
  const [list, setList] = useState<Conversation[] | null>(null);
  useEffect(() => {
    if (!me) return;
    api.listConversations().then(setList).catch(() => setList([]));
  }, [api, me]);

  if (!signedIn) return <Gate />;
  if (me === undefined || (me && list === null)) return <Loading label="Loading messages" />;
  if (!me) return <Gate profile />;

  return (
    <div className="cx-col">
      <h1 className="cx-h1">Messages</h1>
      {list!.length === 0 ? (
        <Empty title="No conversations yet">
          <p>
            Open someone’s profile and tap Message. <A path="/students">Find Ninjas</A>
          </p>
        </Empty>
      ) : (
        <ul className="cx-inbox">
          {list!.map((c) => (
            <li key={c.id}>
              <A path={`/messages/${c.id}`} className="cx-inbox-row">
                <Avatar p={c.other} size={48} />
                <span className="cx-inbox-text">
                  <span className="cx-person-name">
                    {c.other.name}
                    {c.other.is_student && <NinjaBadge small />}
                    {c.other.sample && <SampleTag />}
                  </span>
                  <span className="cx-inbox-last">{c.last_body || 'Say hello'}</span>
                </span>
                <span className="cx-inbox-time">{timeAgo(c.last_message_at)}</span>
              </A>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Chat({ id }: { id: string }) {
  const { api, me, signedIn, toast } = useConnect();
  const [conv, setConv] = useState<Conversation | null | undefined>(undefined);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const end = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setMsgs(await api.listMessages(id));
  }, [api, id]);

  useEffect(() => {
    if (!me) return;
    api.getConversation(id).then(setConv);
    load();
    // New messages: check every few seconds while the chat is open
    const t = window.setInterval(() => document.visibilityState === 'visible' && load(), 4000);
    return () => window.clearInterval(t);
  }, [api, id, me, load]);

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' });
  }, [msgs.length]);

  if (!signedIn) return <Gate />;
  if (me === undefined || conv === undefined) return <Loading />;
  if (!me) return <Gate profile />;
  if (conv === null) return <Empty title="Conversation not found" />;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setDraft('');
    try {
      const m = await api.sendMessage(id, body);
      setMsgs((xs) => [...xs, m]);
    } catch (e2) {
      setDraft(body);
      toast((e2 as Error).message);
    }
  };

  return (
    <div className="cx-col cx-chat">
      <header className="cx-chat-head">
        <A path="/messages" className="cx-icon-btn" aria-label="All messages">
          <Icon name="back" />
        </A>
        <A path={`/u/${conv.other.handle}`} className="cx-person">
          <Avatar p={conv.other} size={40} />
          <span className="cx-person-text">
            <span className="cx-person-name">
              {conv.other.name}
              {conv.other.is_student && <NinjaBadge small />}
            </span>
            <span className="cx-person-meta">@{conv.other.handle}</span>
          </span>
        </A>
      </header>
      <p className="cx-safety-note">Never send money or bank details to anyone on Connect. Report anyone who asks.</p>
      <ol className="cx-msgs">
        {msgs.map((m) => (
          <li key={m.id} className={m.sender_id === me.id ? 'cx-msg is-mine' : 'cx-msg'}>
            <p>{m.body}</p>
            <time dateTime={m.created_at}>{timeAgo(m.created_at)}</time>
          </li>
        ))}
        <div ref={end} />
      </ol>
      {hasPaymentTalk(draft) && (
        <p className="cx-safety" role="alert">
          {PAYMENT_NOTE}
        </p>
      )}
      <form className="cx-compose cx-chat-compose" onSubmit={send}>
        <label className="sr-only" htmlFor="msg-box">
          Message
        </label>
        <textarea
          id="msg-box"
          rows={1}
          maxLength={2000}
          placeholder="Write a message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              (e.currentTarget.form as HTMLFormElement).requestSubmit();
            }
          }}
        />
        <button type="submit" className="cx-send" disabled={!draft.trim() || hasPaymentTalk(draft)} aria-label="Send">
          <Icon name="send" size={20} />
        </button>
      </form>
    </div>
  );
}

function Gate({ profile = false }: { profile?: boolean }) {
  return (
    <Empty title={profile ? 'Finish your profile first' : 'Sign in to see your messages'}>
      <A path={profile ? '/settings' : '/login'} className="btn btn-primary btn-sm">
        {profile ? 'Set up profile' : 'Sign in'}
      </A>
    </Empty>
  );
}

export type { Profile };
