import React from 'react';
import { CONTACT, COURSE_URL, DOJO_AI_URL, NINJAS_SHOWCASE_URL, SOCIAL_LINKS } from '@/config/site';

type FLink = { label: string; href: string; note?: string; external?: boolean };

/** Small arrow marking links that leave the site */
function Out() {
  return (
    <svg className="footer-out" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M3 9l6-6M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "@joinmotiondojo" from "https://www.instagram.com/joinmotiondojo" */
function handle(url: string) {
  const last = url.replace(/\/+$/, '').split('/').pop() || '';
  return last.startsWith('@') ? last : `@${last}`;
}

function Column({ title, links }: { title: string; links: FLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="footer-col">
      <h2 className="footer-label">{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {l.label}
              {l.note && <span className="footer-note">{l.note}</span>}
              {l.external && <Out />}
              {l.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const learn: FLink[] = [
    { label: 'Black Belt in Motion Design', href: COURSE_URL },
    { label: 'Keyframe Ninjas', href: NINJAS_SHOWCASE_URL, external: true },
    ...(DOJO_AI_URL ? [{ label: 'Dojo’s AI', href: DOJO_AI_URL }] : []),
  ];
  const dojo: FLink[] = [
    { label: 'About', href: '/#intro' },
    { label: 'Community', href: '/#community' },
    { label: 'Meet the team', href: '/#team' },
  ];
  const elsewhere: FLink[] = [
    ...SOCIAL_LINKS.map((s) => ({ label: s.label, href: s.url, note: handle(s.url), external: true })),
    ...(CONTACT.whatsapp
      ? [{ label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`, external: true }]
      : []),
    ...(CONTACT.email ? [{ label: 'Email', href: `mailto:${CONTACT.email}`, note: CONTACT.email }] : []),
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <a href="/" className="footer-logo" aria-label="Motion Dojo home">
            <img src="/assets/favicon-128.png" alt="" width={40} height={40} />
            Motion Dojo
          </a>
          <a href="#top" className="footer-up">
            Back to top
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <Column title="Learn" links={learn} />
          <Column title="The dojo" links={dojo} />
          <Column title="Elsewhere" links={elsewhere} />
        </nav>

        <div className="footer-bottom">
          <p className="footer-tagline">Train like a ninja. Create like a master.</p>
          <p className="footer-copy">© {new Date().getFullYear()} Motion Dojo</p>
        </div>
      </div>
    </footer>
  );
}
