/* Motion Dojo Connect: preview implementation of ConnectApi.
   Runs entirely in the browser with invented sample members so the site can
   be clicked through before Supabase is connected. Every sample profile is
   flagged `sample: true` and the UI labels it. Nothing here is real. */

import { assertNoPaymentTalk } from './safety';
import type { Comment, ConnectApi, ConnectionStatus, Conversation, Message, Notice, Post, Profile } from './types';

const now = Date.now();
const ago = (h: number) => new Date(now - h * 3600_000).toISOString();
let seq = 1000;
const nid = () => `d${++seq}`;

/** Abstract sample artwork: keyframe dots on a motion curve, in the brand colours */
function art(bg: string, line: string, dot: string, bend: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" fill="${bg}"/><path d="M80 ${600 - bend} C 260 ${600 - bend}, 300 ${180 + bend}, 420 ${260 + bend / 2} S 640 ${560 - bend}, 720 ${200 + bend}" fill="none" stroke="${line}" stroke-width="10" stroke-linecap="round"/><g fill="${dot}"><rect x="64" y="${584 - bend}" width="32" height="32" rx="6" transform="rotate(45 80 ${600 - bend})"/><rect x="404" y="${244 + bend / 2}" width="32" height="32" rx="6" transform="rotate(45 420 ${260 + bend / 2})"/><rect x="704" y="${184 + bend}" width="32" height="32" rx="6" transform="rotate(45 720 ${200 + bend})"/></g><text x="400" y="740" font-family="sans-serif" font-size="30" fill="${line}" text-anchor="middle" opacity=".7">Sample post</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function profile(p: Partial<Profile> & Pick<Profile, 'id' | 'handle' | 'name'>): Profile {
  return {
    bio: '',
    avatar_url: null,
    cover_url: null,
    country: '',
    skills: [],
    phase: null,
    instagram: '',
    youtube: '',
    website: '',
    is_student: true,
    is_moderator: false,
    is_sensei: false,
    created_at: ago(24 * 30),
    sample: true,
    ...p,
  };
}

const people: Profile[] = [
  profile({ id: 's1', handle: 'sample_ada', name: 'Ada', country: 'Nigeria', phase: 2, skills: ['Alight Motion', 'Typography'], bio: 'Sample profile for the preview. Practising kinetic type.' }),
  profile({ id: 's2', handle: 'sample_tunde', name: 'Tunde', country: 'Nigeria', phase: 3, skills: ['Logo animation', 'Transitions'], bio: 'Sample profile for the preview. Logo reveals and smooth transitions.' }),
  profile({ id: 's3', handle: 'sample_amaka', name: 'Amaka', country: 'Ghana', phase: 1, skills: ['Alight Motion', 'Graphic design'], bio: 'Sample profile for the preview. Graphic designer starting out with motion.' }),
  profile({ id: 's4', handle: 'sample_kemi', name: 'Kemi', country: 'Nigeria', phase: 4, skills: ['Product visuals', '2D animation', 'Sound design'], bio: 'Sample profile for the preview. Building my portfolio in phase four.' }),
  profile({ id: 's5', handle: 'sample_jide', name: 'Jide', country: 'Kenya', phase: 2, skills: ['Video editing', 'AI video'], bio: 'Sample profile for the preview. Editor learning motion.' }),
  profile({ id: 'v1', handle: 'sample_visitor', name: 'Visitor', is_student: false, phase: null, bio: 'Sample visitor account for the preview.' }),
  profile({ id: 'g1', handle: 'sample_sensei', name: 'Grand Sensei', is_student: false, is_sensei: true, phase: null, bio: 'Sample grand sensei account for the preview.' }),
];

type RawPost = Omit<Post, 'author' | 'likes' | 'comments' | 'liked' | 'saved'>;
let posts: RawPost[] = [
  { id: 'a1', author_id: 'g1', kind: 'image', media_url: art('#6d32e8', '#f7f5ff', '#c8ff3d', 30), caption: 'Sample community post: this week’s practice brief is a 5-second logo reveal. Post yours with the “I want feedback” tag by Friday.', tag: 'sharing', community: true, created_at: ago(2) },
  { id: 'p1', author_id: 's2', kind: 'image', media_url: art('#140a2e', '#a77bff', '#c8ff3d', 0), caption: 'Sample post: first logo reveal I’m happy with. The overshoot on the last keyframe took a while.', tag: 'sharing', community: false, created_at: ago(3) },
  { id: 'p2', author_id: 's1', kind: 'image', media_url: art('#6d32e8', '#f7f5ff', '#c8ff3d', 80), caption: 'Sample post: kinetic type practice. Does the ease feel too slow at the end?', tag: 'feedback', community: false, created_at: ago(9) },
  { id: 'p3', author_id: 's4', kind: 'image', media_url: art('#c8ff3d', '#140a2e', '#6d32e8', 40), caption: 'Sample post: product turn for my portfolio, phase four project.', tag: 'sharing', community: false, created_at: ago(26) },
  { id: 'p4', author_id: 's3', kind: 'image', media_url: art('#f6f4fb', '#6d32e8', '#140a2e', 120), caption: 'Sample post: day three of daily practice. Bouncing ball, take two.', tag: 'feedback', community: false, created_at: ago(50) },
  { id: 'p5', author_id: 's5', kind: 'image', media_url: art('#140a2e', '#c8ff3d', '#a77bff', 60), caption: 'Sample post: transition study between two scenes.', tag: 'sharing', community: false, created_at: ago(80) },
];
let likes = new Set<string>(['p1:s1', 'p1:s4', 'p2:s2', 'p3:s1', 'p3:s2', 'p3:s5']);
let comments: Omit<Comment, 'author'>[] = [
  { id: 'c1', post_id: 'p2', author_id: 's4', body: 'Sample comment: try a slightly faster ease-out on the last word.', created_at: ago(8) },
  { id: 'c2', post_id: 'p2', author_id: 's2', body: 'Sample comment: agree, the rest feels smooth.', created_at: ago(7) },
  { id: 'c3', post_id: 'p1', author_id: 's1', body: 'Sample comment: that overshoot is clean.', created_at: ago(2) },
];
/** requester:addressee -> status */
let links = new Map<string, 'pending' | 'accepted'>([
  ['s1:s2', 'accepted'],
  ['s4:s1', 'accepted'],
  ['s3:s1', 'pending'],
  ['s5:s3', 'accepted'],
]);
let saves = new Set<string>(['s1:p3']);
let notices: { id: string; user: string; kind: Notice['kind']; actor: string; post: string | null; read: boolean; at: string }[] = [
  { id: 'n1', user: 's1', kind: 'community_post', actor: 'g1', post: 'a1', read: false, at: ago(2) },
  { id: 'n2', user: 's1', kind: 'connection_request', actor: 's3', post: null, read: false, at: ago(4) },
];
const linkOf = (x: string, y: string) => (links.has(`${x}:${y}`) ? `${x}:${y}` : links.has(`${y}:${x}`) ? `${y}:${x}` : null);
const notify = (user: string, kind: Notice['kind'], actor: string, post: string | null = null) =>
  notices.unshift({ id: nid(), user, kind, actor, post, read: false, at: new Date().toISOString() });
let blocks = new Set<string>();
let convs: { id: string; a: string; b: string; last: string }[] = [{ id: 'm1', a: 's1', b: 's2', last: ago(5) }];
let messages: Message[] = [
  { id: 'x1', conversation_id: 'm1', sender_id: 's2', body: 'Sample message: how did you get that text bounce?', created_at: ago(6) },
  { id: 'x2', conversation_id: 'm1', sender_id: 's1', body: 'Sample message: graph editor, overshoot on the second keyframe.', created_at: ago(5) },
];

let current: string | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((f) => f());
const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 120));
const who = (id: string) => people.find((p) => p.id === id)!;

function full(p: RawPost): Post {
  const all = [...likes].filter((k) => k.startsWith(p.id + ':'));
  return {
    ...p,
    author: who(p.author_id),
    likes: all.length,
    comments: comments.filter((c) => c.post_id === p.id).length,
    liked: current ? likes.has(`${p.id}:${current}`) : false,
    saved: current ? saves.has(`${current}:${p.id}`) : false,
  };
}
const needMe = () => {
  if (!current) throw new Error('Sign in first.');
  return current;
};

export function createDemoApi(): ConnectApi {
  return {
    mode: 'demo',
    session: () => wait(current ? { userId: current, email: `${who(current).handle}@example.com` } : null),
    onAuthChange(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    async signIn() {
      throw new Error('Email sign-in works once Supabase is connected. In this preview, use the sample accounts below.');
    },
    async demoSignIn(as) {
      current = as === 'student' ? 's1' : as === 'sensei' ? 'g1' : 'v1';
      emit();
    },
    async signOut() {
      current = null;
      emit();
    },

    me: () => wait(current ? who(current) : null),
    async createProfile(input) {
      throw new Error(`Profiles are created after email sign-in. (${input.handle})`);
    },
    async updateProfile(input) {
      const me = who(needMe());
      assertNoPaymentTalk(input.bio, input.name);
      if (input.handle && input.handle !== me.handle && people.some((p) => p.handle === input.handle)) {
        throw new Error('That username is taken. Try another.');
      }
      Object.assign(me, input);
      if (!me.is_student) me.phase = null;
      return wait(me);
    },
    refreshStudentStatus: () => wait(Boolean(current && who(current).is_student)),
    redeemInvite: () => wait(false),
    async uploadImage(file) {
      return new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(new Error('Could not read that image.'));
        r.readAsDataURL(file);
      });
    },

    listStudents(f) {
      const q = (f.q || '').toLowerCase();
      return wait(
        people.filter(
          (p) =>
            p.is_student &&
            (!f.skill || p.skills.includes(f.skill)) &&
            (!f.phase || p.phase === f.phase) &&
            (!q || `${p.name} ${p.handle} ${p.country}`.toLowerCase().includes(q)),
        ),
      );
    },
    getProfile: (h) => wait(people.find((p) => p.handle === h.toLowerCase()) ?? null),
    counts: (id) =>
      wait({
        connections: [...links].filter(([k, v]) => v === 'accepted' && k.split(':').includes(id)).length,
        posts: posts.filter((p) => p.author_id === id && !p.community).length,
      }),
    connectionStatus(id): Promise<ConnectionStatus> {
      if (!current) return wait('none');
      const k = linkOf(current, id);
      if (!k) return wait('none');
      if (links.get(k) === 'accepted') return wait('connected');
      return wait(k.startsWith(current + ':') ? 'requested' : 'incoming');
    },
    async requestConnection(id) {
      const me = needMe();
      if (linkOf(me, id)) throw new Error('There’s already a request between you two.');
      if (blocks.has(`${me}:${id}`) || blocks.has(`${id}:${me}`)) throw new Error('You can’t connect with this member.');
      links.set(`${me}:${id}`, 'pending');
      notify(id, 'connection_request', me);
    },
    async answerRequest(id, accept) {
      const me = needMe();
      const k = `${id}:${me}`;
      if (!links.has(k)) return;
      notices = notices.filter((n) => !(n.user === me && n.actor === id && n.kind === 'connection_request'));
      if (accept) {
        links.set(k, 'accepted');
        notify(id, 'connection_accepted', me);
      } else links.delete(k);
    },
    async removeConnection(id) {
      const k = linkOf(needMe(), id);
      if (k) links.delete(k);
    },
    listConnections() {
      const me = needMe();
      return wait([...links].filter(([k, v]) => v === 'accepted' && k.split(':').includes(me)).map(([k]) => who(k.split(':').find((x) => x !== me)!)));
    },
    listRequests() {
      const me = needMe();
      const pend = [...links].filter(([, v]) => v === 'pending').map(([k]) => k.split(':'));
      return wait({
        incoming: pend.filter(([, b]) => b === me).map(([a]) => who(a)),
        sent: pend.filter(([a]) => a === me).map(([, b]) => who(b)),
      });
    },
    listNotices() {
      const me = needMe();
      return wait(
        notices
          .filter((n) => n.user === me)
          .map<Notice>((n) => ({ id: n.id, kind: n.kind, actor: who(n.actor), post_id: n.post, read_at: n.read ? n.at : null, created_at: n.at })),
      );
    },
    unreadCount: () => wait(current ? notices.filter((n) => n.user === current && !n.read).length : 0),
    async markNoticesRead() {
      const me = needMe();
      notices = notices.map((n) => (n.user === me ? { ...n, read: true } : n));
    },

    listPosts({ authorId, feed = 'everyone' }) {
      let list = [...posts].sort((a, b) => b.created_at.localeCompare(a.created_at));
      if (authorId) list = list.filter((p) => p.author_id === authorId && !p.community);
      else list = list.filter((p) => p.community === (feed === 'community'));
      if (feed === 'connections' && !authorId) {
        const me = needMe();
        list = list.filter((p) => links.get(linkOf(me, p.author_id) ?? '') === 'accepted');
      }
      return wait(list.map(full));
    },
    listSaved() {
      const me = needMe();
      return wait(posts.filter((p) => saves.has(`${me}:${p.id}`)).map(full));
    },
    async setSaved(postId, on) {
      const k = `${needMe()}:${postId}`;
      if (on) saves.add(k);
      else saves.delete(k);
    },
    getPost: (id) => wait(posts.find((p) => p.id === id) ? full(posts.find((p) => p.id === id)!) : null),
    async createPost(input) {
      const me = who(needMe());
      assertNoPaymentTalk(input.caption);
      const community = Boolean(input.community);
      if (community && !me.is_sensei) throw new Error('Only the grand sensei can post to the Community feed.');
      if (!community && !me.is_student && !me.is_sensei) throw new Error('Only Keyframe Ninjas can post work.');
      const p: RawPost = { id: nid(), author_id: me.id, created_at: new Date().toISOString(), ...input, community };
      posts = [p, ...posts];
      if (community) people.filter((x) => x.is_student).forEach((x) => notify(x.id, 'community_post', me.id, p.id));
      return full(p);
    },
    async deletePost(id) {
      posts = posts.filter((p) => p.id !== id);
    },
    async setLike(postId, on) {
      const k = `${postId}:${needMe()}`;
      if (on) likes.add(k);
      else likes.delete(k);
    },
    listComments: (postId) =>
      wait(comments.filter((c) => c.post_id === postId).map((c) => ({ ...c, author: who(c.author_id) }))),
    async addComment(postId, body) {
      assertNoPaymentTalk(body);
      const c = { id: nid(), post_id: postId, author_id: needMe(), body, created_at: new Date().toISOString() };
      comments = [...comments, c];
      return { ...c, author: who(c.author_id) };
    },
    async deleteComment(id) {
      comments = comments.filter((c) => c.id !== id);
    },

    listConversations() {
      const me = needMe();
      const mine = convs
        .filter((c) => c.a === me || c.b === me)
        .sort((x, y) => y.last.localeCompare(x.last))
        .map<Conversation>((c) => {
          const last = messages.filter((m) => m.conversation_id === c.id).slice(-1)[0];
          return { id: c.id, other: who(c.a === me ? c.b : c.a), last_message_at: c.last, last_body: last?.body ?? '' };
        });
      return wait(mine);
    },
    async openConversation(userId) {
      const me = needMe();
      if (blocks.has(`${me}:${userId}`) || blocks.has(`${userId}:${me}`)) throw new Error('You can’t message this member.');
      const found = convs.find((c) => (c.a === me && c.b === userId) || (c.a === userId && c.b === me));
      if (found) return found.id;
      if (links.get(linkOf(me, userId) ?? '') !== 'accepted') throw new Error('Connect with this member before messaging them.');
      const c = { id: nid(), a: me, b: userId, last: new Date().toISOString() };
      convs = [...convs, c];
      return c.id;
    },
    getConversation(id) {
      const me = needMe();
      const c = convs.find((x) => x.id === id && (x.a === me || x.b === me));
      return wait(c ? { id: c.id, other: who(c.a === me ? c.b : c.a), last_message_at: c.last, last_body: '' } : null);
    },
    listMessages: (id) => wait(messages.filter((m) => m.conversation_id === id)),
    async sendMessage(id, body) {
      assertNoPaymentTalk(body);
      const m: Message = { id: nid(), conversation_id: id, sender_id: needMe(), body, created_at: new Date().toISOString() };
      messages = [...messages, m];
      convs = convs.map((c) => (c.id === id ? { ...c, last: m.created_at } : c));
      return m;
    },

    async report() {
      needMe();
    },
    async setBlock(id, on) {
      const k = `${needMe()}:${id}`;
      if (on) {
        blocks.add(k);
        const l = linkOf(needMe(), id);
        if (l) links.delete(l);
      }
      else blocks.delete(k);
    },
    isBlocked: (id) => wait(Boolean(current && blocks.has(`${current}:${id}`))),
  };
}
