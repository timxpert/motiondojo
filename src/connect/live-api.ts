/* Motion Dojo Connect: Supabase implementation of ConnectApi.
   Every rule (who can post, message, delete) is enforced by row-level security
   in supabase/schema.sql; this file only shapes the data for the UI. */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PAYMENT_NOTE } from './safety';
import type { Comment, ConnectApi, ConnectionStatus, Conversation, Message, Notice, Post, Profile, ProfileInput, StudentFilter } from './types';

const POST_SELECT = '*, author:profiles!posts_author_id_fkey(*)';

function fail(error: { message: string } | null) {
  if (!error) return;
  if (error.message.includes('payment_details')) throw new Error(PAYMENT_NOTE);
  throw new Error(error.message);
}

export function createLiveApi(url: string, anonKey: string, redirectTo: string): ConnectApi {
  const sb: SupabaseClient = createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });

  const uid = async () => (await sb.auth.getSession()).data.session?.user.id ?? null;
  const needUid = async () => {
    const id = await uid();
    if (!id) throw new Error('Sign in first.');
    return id;
  };

  /** Adds like/comment counts and "liked/saved by me" to raw post rows */
  async function decorate(rows: (Omit<Post, 'likes' | 'comments' | 'liked' | 'saved'>)[]): Promise<Post[]> {
    if (rows.length === 0) return [];
    const ids = rows.map((r) => r.id);
    const me = await uid();
    const none = Promise.resolve({ data: [] });
    const [{ data: stats }, mine, saves] = await Promise.all([
      sb.from('post_stats').select('*').in('post_id', ids),
      me ? sb.from('likes').select('post_id').eq('user_id', me).in('post_id', ids) : none,
      me ? sb.from('bookmarks').select('post_id').eq('user_id', me).in('post_id', ids) : none,
    ]);
    const saved = new Set(((saves as unknown as { data: { post_id: string }[] | null }).data ?? []).map((b) => b.post_id));
    const byId = new Map<string, { likes: number; comments: number }>(
      ((stats ?? []) as unknown as { post_id: string; likes: number; comments: number }[]).map((s) => [s.post_id, s]),
    );
    const liked = new Set(((mine as unknown as { data: { post_id: string }[] | null }).data ?? []).map((l) => l.post_id));
    return rows.map((r) => ({
      ...r,
      likes: Number(byId.get(r.id)?.likes ?? 0),
      comments: Number(byId.get(r.id)?.comments ?? 0),
      liked: liked.has(r.id),
      saved: saved.has(r.id),
    }));
  }

  const api: ConnectApi = {
    mode: 'live',

    async session() {
      const s = (await sb.auth.getSession()).data.session;
      return s ? { userId: s.user.id, email: s.user.email ?? '' } : null;
    },
    onAuthChange(cb) {
      const { data } = sb.auth.onAuthStateChange(() => cb());
      return () => data.subscription.unsubscribe();
    },
    async signIn(email) {
      const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
      fail(error);
    },
    async signOut() {
      await sb.auth.signOut();
    },

    async me() {
      const id = await uid();
      if (!id) return null;
      const { data } = await sb.from('profiles').select('*').eq('id', id).maybeSingle();
      return (data as unknown as Profile) ?? null;
    },
    async createProfile(input) {
      const id = await needUid();
      const { data, error } = await sb.from('profiles').insert({ ...input, id }).select().single();
      if (error?.code === '23505') throw new Error('That username is taken. Try another.');
      fail(error);
      return data as unknown as Profile;
    },
    async updateProfile(input) {
      const id = await needUid();
      const { data, error } = await sb.from('profiles').update(input).eq('id', id).select().single();
      if (error?.code === '23505') throw new Error('That username is taken. Try another.');
      fail(error);
      return data as unknown as Profile;
    },
    async refreshStudentStatus() {
      const { data, error } = await sb.rpc('refresh_student_status');
      fail(error);
      return Boolean(data);
    },
    async redeemInvite(code) {
      const { data, error } = await sb.rpc('redeem_invite', { invite: code });
      fail(error);
      return Boolean(data);
    },
    async uploadImage(file, folder) {
      const id = await needUid();
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
      const path = `${id}/${folder}/${Date.now()}.${ext}`;
      const { error } = await sb.storage.from('media').upload(path, file, { upsert: false, contentType: file.type });
      fail(error);
      return sb.storage.from('media').getPublicUrl(path).data.publicUrl;
    },

    async listStudents(filter: StudentFilter) {
      let q = sb.from('profiles').select('*').eq('is_student', true).order('created_at', { ascending: false }).limit(200);
      if (filter.skill) q = q.contains('skills', [filter.skill]);
      if (filter.phase) q = q.eq('phase', filter.phase);
      if (filter.q) {
        const term = filter.q.replace(/[%,()]/g, ' ').trim();
        if (term) q = q.or(`name.ilike.%${term}%,handle.ilike.%${term}%,country.ilike.%${term}%`);
      }
      const { data, error } = await q;
      fail(error);
      return (data ?? []) as unknown as Profile[];
    },
    async getProfile(handle) {
      const { data } = await sb.from('profiles').select('*').eq('handle', handle.toLowerCase()).maybeSingle();
      return (data as unknown as Profile) ?? null;
    },
    async counts(userId) {
      const head = { count: 'exact' as const, head: true };
      const [a, c] = await Promise.all([
        sb.from('connections').select('*', head).eq('status', 'accepted').or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
        sb.from('posts').select('*', head).eq('author_id', userId).eq('community', false),
      ]);
      return { connections: a.count ?? 0, posts: c.count ?? 0 };
    },

    async connectionStatus(userId): Promise<ConnectionStatus> {
      const me = await uid();
      if (!me) return 'none';
      const { data } = await sb
        .from('connections')
        .select('requester_id,status')
        .or(`and(requester_id.eq.${me},addressee_id.eq.${userId}),and(requester_id.eq.${userId},addressee_id.eq.${me})`)
        .maybeSingle();
      const row = data as unknown as { requester_id: string; status: string } | null;
      if (!row) return 'none';
      if (row.status === 'accepted') return 'connected';
      return row.requester_id === me ? 'requested' : 'incoming';
    },
    async requestConnection(userId) {
      const me = await needUid();
      const { error } = await sb.from('connections').insert({ requester_id: me, addressee_id: userId });
      if (error?.code === '23505') throw new Error('There’s already a request between you two.');
      if (error?.message.includes('blocked')) throw new Error('You can’t connect with this member.');
      fail(error);
    },
    async answerRequest(userId, accept) {
      const me = await needUid();
      const q = sb.from('connections');
      const { error } = accept
        ? await q.update({ status: 'accepted' }).eq('requester_id', userId).eq('addressee_id', me)
        : await q.delete().eq('requester_id', userId).eq('addressee_id', me);
      fail(error);
    },
    async removeConnection(userId) {
      const me = await needUid();
      const { error } = await sb
        .from('connections')
        .delete()
        .or(`and(requester_id.eq.${me},addressee_id.eq.${userId}),and(requester_id.eq.${userId},addressee_id.eq.${me})`);
      fail(error);
    },
    async listConnections() {
      const me = await needUid();
      const { data, error } = await sb
        .from('connections')
        .select('requester_id, r:profiles!connections_requester_id_fkey(*), a:profiles!connections_addressee_id_fkey(*)')
        .eq('status', 'accepted')
        .or(`requester_id.eq.${me},addressee_id.eq.${me}`)
        .order('accepted_at', { ascending: false });
      fail(error);
      return ((data ?? []) as unknown as { requester_id: string; r: Profile; a: Profile }[]).map((c) => (c.requester_id === me ? c.a : c.r));
    },
    async listRequests() {
      const me = await needUid();
      const sel = 'requester_id, r:profiles!connections_requester_id_fkey(*), a:profiles!connections_addressee_id_fkey(*)';
      const [inc, out] = await Promise.all([
        sb.from('connections').select(sel).eq('status', 'pending').eq('addressee_id', me).order('created_at', { ascending: false }),
        sb.from('connections').select(sel).eq('status', 'pending').eq('requester_id', me).order('created_at', { ascending: false }),
      ]);
      fail(inc.error || out.error);
      return {
        incoming: ((inc.data ?? []) as unknown as { r: Profile }[]).map((c) => c.r),
        sent: ((out.data ?? []) as unknown as { a: Profile }[]).map((c) => c.a),
      };
    },

    async listNotices() {
      await needUid();
      const { data, error } = await sb
        .from('notifications')
        .select('id, kind, post_id, read_at, created_at, actor:profiles!notifications_actor_id_fkey(*)')
        .order('created_at', { ascending: false })
        .limit(60);
      fail(error);
      return (data ?? []) as unknown as Notice[];
    },
    async unreadCount() {
      if (!(await uid())) return 0;
      const { count } = await sb.from('notifications').select('*', { count: 'exact', head: true }).is('read_at', null);
      return count ?? 0;
    },
    async markNoticesRead() {
      const me = await needUid();
      await sb.from('notifications').update({ read_at: new Date().toISOString() }).eq('user_id', me).is('read_at', null);
    },

    async listPosts({ authorId, feed = 'everyone', limit = 30 }) {
      let q = sb.from('posts').select(POST_SELECT).order('created_at', { ascending: false }).limit(limit);
      if (authorId) q = q.eq('author_id', authorId).eq('community', false);
      else q = q.eq('community', feed === 'community');
      if (feed === 'connections' && !authorId) {
        const people = await api.listConnections();
        if (people.length === 0) return [];
        q = q.in('author_id', people.map((p) => p.id));
      }
      const { data, error } = await q;
      fail(error);
      return decorate((data ?? []) as unknown as Post[]);
    },
    async listSaved() {
      const me = await needUid();
      const { data, error } = await sb
        .from('bookmarks')
        .select(`created_at, post:posts(${POST_SELECT})`)
        .eq('user_id', me)
        .order('created_at', { ascending: false });
      fail(error);
      return decorate(((data ?? []) as unknown as { post: Post | null }[]).map((b) => b.post).filter((p): p is Post => Boolean(p)));
    },
    async setSaved(postId, on) {
      const me = await needUid();
      const { error } = on
        ? await sb.from('bookmarks').upsert({ user_id: me, post_id: postId })
        : await sb.from('bookmarks').delete().eq('user_id', me).eq('post_id', postId);
      fail(error);
    },
    async getPost(id) {
      const { data } = await sb.from('posts').select(POST_SELECT).eq('id', id).maybeSingle();
      if (!data) return null;
      return (await decorate([data as unknown as Post]))[0];
    },
    async createPost(input) {
      const me = await needUid();
      const { data, error } = await sb.from('posts').insert({ ...input, author_id: me }).select(POST_SELECT).single();
      if (error?.message.includes('row-level security')) {
        throw new Error(input.community ? 'Only the grand sensei can post to the Community feed.' : 'Only Keyframe Ninjas can post work.');
      }
      fail(error);
      return (await decorate([data as unknown as Post]))[0];
    },
    async deletePost(id) {
      const { error } = await sb.from('posts').delete().eq('id', id);
      fail(error);
    },
    async setLike(postId, on) {
      const me = await needUid();
      const { error } = on
        ? await sb.from('likes').upsert({ post_id: postId, user_id: me })
        : await sb.from('likes').delete().eq('post_id', postId).eq('user_id', me);
      fail(error);
    },
    async listComments(postId) {
      const { data, error } = await sb
        .from('comments')
        .select('*, author:profiles!comments_author_id_fkey(*)')
        .eq('post_id', postId)
        .order('created_at');
      fail(error);
      return (data ?? []) as unknown as Comment[];
    },
    async addComment(postId, body) {
      const me = await needUid();
      const { data, error } = await sb
        .from('comments')
        .insert({ post_id: postId, author_id: me, body })
        .select('*, author:profiles!comments_author_id_fkey(*)')
        .single();
      fail(error);
      return data as unknown as Comment;
    },
    async deleteComment(id) {
      const { error } = await sb.from('comments').delete().eq('id', id);
      fail(error);
    },

    async listConversations() {
      const me = await needUid();
      const { data, error } = await sb
        .from('conversations')
        .select('*, a:profiles!conversations_user_a_fkey(*), b:profiles!conversations_user_b_fkey(*)')
        .order('last_message_at', { ascending: false });
      fail(error);
      const rows = (data ?? []) as unknown as { id: string; user_a: string; a: Profile; b: Profile; last_message_at: string }[];
      const lasts = await Promise.all(
        rows.map((r) =>
          sb.from('messages').select('body').eq('conversation_id', r.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
        ),
      );
      return rows.map((r, i) => ({
        id: r.id,
        other: r.user_a === me ? r.b : r.a,
        last_message_at: r.last_message_at,
        last_body: (lasts[i].data as unknown as { body: string } | null)?.body ?? '',
      }));
    },
    async openConversation(userId) {
      const { data, error } = await sb.rpc('open_conversation', { other: userId });
      if (error?.message.includes('not connected')) throw new Error('Connect with this member before messaging them.');
      if (error?.message.includes('blocked')) throw new Error('You can’t message this member.');
      fail(error);
      return data as unknown as string;
    },
    async getConversation(id) {
      const me = await needUid();
      const { data } = await sb
        .from('conversations')
        .select('*, a:profiles!conversations_user_a_fkey(*), b:profiles!conversations_user_b_fkey(*)')
        .eq('id', id)
        .maybeSingle();
      if (!data) return null;
      const r = data as unknown as { id: string; user_a: string; a: Profile; b: Profile; last_message_at: string };
      return { id: r.id, other: r.user_a === me ? r.b : r.a, last_message_at: r.last_message_at, last_body: '' } as Conversation;
    },
    async listMessages(conversationId) {
      const { data, error } = await sb.from('messages').select('*').eq('conversation_id', conversationId).order('created_at').limit(500);
      fail(error);
      return (data ?? []) as unknown as Message[];
    },
    async sendMessage(conversationId, body) {
      const me = await needUid();
      const { data, error } = await sb.from('messages').insert({ conversation_id: conversationId, sender_id: me, body }).select().single();
      fail(error);
      return data as unknown as Message;
    },

    async report(target, id, reason) {
      const me = await needUid();
      const { error } = await sb.from('reports').insert({ reporter_id: me, target_type: target, target_id: id, reason });
      fail(error);
    },
    async setBlock(userId, on) {
      const me = await needUid();
      const { error } = on
        ? await sb.from('blocks').upsert({ blocker_id: me, blocked_id: userId })
        : await sb.from('blocks').delete().eq('blocker_id', me).eq('blocked_id', userId);
      fail(error);
    },
    async isBlocked(userId) {
      const me = await uid();
      if (!me) return false;
      const { data } = await sb.from('blocks').select('blocked_id').eq('blocker_id', me).eq('blocked_id', userId).maybeSingle();
      return Boolean(data);
    },
  };
  return api;
}

export type { ProfileInput };
