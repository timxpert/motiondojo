/* Motion Dojo Connect: shared types */

export type Profile = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  avatar_url: string | null;
  country: string;
  skills: string[];
  phase: number | null;
  instagram: string;
  youtube: string;
  website: string;
  open_messages: boolean;
  is_student: boolean;
  is_moderator: boolean;
  created_at: string;
  /** Preview only: marks invented sample data */
  sample?: boolean;
};

export type Post = {
  id: string;
  author_id: string;
  kind: 'image' | 'video';
  media_url: string;
  caption: string;
  tag: 'sharing' | 'feedback';
  created_at: string;
  author: Profile;
  likes: number;
  comments: number;
  liked: boolean;
};

export type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
  author: Profile;
};

export type Conversation = {
  id: string;
  other: Profile;
  last_message_at: string;
  last_body: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type ProfileInput = Partial<
  Pick<Profile, 'handle' | 'name' | 'bio' | 'avatar_url' | 'country' | 'skills' | 'phase' | 'instagram' | 'youtube' | 'website' | 'open_messages'>
>;

export type StudentFilter = { q?: string; skill?: string; phase?: number | null };

export interface ConnectApi {
  /** 'demo' uses sample data in the browser; 'live' talks to Supabase */
  mode: 'demo' | 'live';
  /** Signed-in user's id, or null */
  session(): Promise<{ userId: string; email: string } | null>;
  onAuthChange(cb: () => void): () => void;
  signIn(email: string): Promise<void>;
  /** Preview only: sign in instantly as a sample student or a sample visitor */
  demoSignIn?(as: 'student' | 'visitor'): Promise<void>;
  signOut(): Promise<void>;

  me(): Promise<Profile | null>;
  createProfile(input: ProfileInput & { handle: string; name: string }): Promise<Profile>;
  updateProfile(input: ProfileInput): Promise<Profile>;
  refreshStudentStatus(): Promise<boolean>;
  redeemInvite(code: string): Promise<boolean>;
  uploadImage(file: File, folder: 'avatars' | 'posts'): Promise<string>;

  listStudents(filter: StudentFilter): Promise<Profile[]>;
  getProfile(handle: string): Promise<Profile | null>;
  counts(userId: string): Promise<{ followers: number; following: number; posts: number }>;
  isFollowing(userId: string): Promise<boolean>;
  setFollow(userId: string, on: boolean): Promise<void>;

  listPosts(opts: { authorId?: string; following?: boolean; limit?: number }): Promise<Post[]>;
  getPost(id: string): Promise<Post | null>;
  createPost(input: { kind: 'image' | 'video'; media_url: string; caption: string; tag: 'sharing' | 'feedback' }): Promise<Post>;
  deletePost(id: string): Promise<void>;
  setLike(postId: string, on: boolean): Promise<void>;
  listComments(postId: string): Promise<Comment[]>;
  addComment(postId: string, body: string): Promise<Comment>;
  deleteComment(id: string): Promise<void>;

  listConversations(): Promise<Conversation[]>;
  openConversation(userId: string): Promise<string>;
  getConversation(id: string): Promise<Conversation | null>;
  listMessages(conversationId: string): Promise<Message[]>;
  sendMessage(conversationId: string, body: string): Promise<Message>;

  report(target: 'post' | 'comment' | 'profile' | 'message', id: string, reason: string): Promise<void>;
  setBlock(userId: string, on: boolean): Promise<void>;
  isBlocked(userId: string): Promise<boolean>;
}

/** The skills people can pick on their profile and filter by in the directory */
export const SKILLS = [
  'Alight Motion',
  'Typography',
  'Logo animation',
  '2D animation',
  'Product visuals',
  'Transitions',
  'Video editing',
  'Graphic design',
  'AI video',
  'Sound design',
];

/** Black Belt in Motion Design phases, as named on the course page */
export const PHASES = ['Foundations', 'Alight Motion mastery', 'Creative execution', 'Portfolio & mastery'];
