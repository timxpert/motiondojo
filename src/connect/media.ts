/* Turns a video share link into an embeddable player URL.
   Supported: YouTube, Vimeo (incl. unlisted), Instagram posts/reels, TikTok. */

export function toEmbed(url: string): string | null {
  let u: URL;
  try {
    u = new URL(url.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\.|^m\./, '');

  if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
  if (host === 'youtube.com') {
    const id = u.searchParams.get('v') || u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const m = u.pathname.match(/(\d+)(?:\/([\da-f]+))?/);
    if (!m) return null;
    const hash = m[2] || u.searchParams.get('h');
    return `https://player.vimeo.com/video/${m[1]}${hash ? `?h=${hash}` : ''}`;
  }
  if (host === 'instagram.com') {
    const m = u.pathname.match(/^\/(p|reel|tv)\/([\w-]+)/);
    return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
  }
  if (host === 'tiktok.com') {
    const m = u.pathname.match(/\/video\/(\d+)/);
    return m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null;
  }
  return null;
}

/** Vertical platforms get a tall player */
export const isTall = (url: string) => /instagram\.com|tiktok\.com|youtube\.com\/shorts/.test(url);

export function timeAgo(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

/** "https://instagram.com/ada" or "@ada" or "ada" -> full URL */
export function socialUrl(kind: 'instagram' | 'youtube' | 'website', v: string) {
  const t = v.trim();
  if (!t) return '';
  if (/^https?:\/\//.test(t)) return t;
  const h = t.replace(/^@/, '');
  if (kind === 'instagram') return `https://instagram.com/${h}`;
  if (kind === 'youtube') return `https://youtube.com/@${h}`;
  return `https://${t}`;
}
