import React from 'react';
import { CONTACT, COURSE_URL, DOJO_AI_URL, NAV, NINJAS_SHOWCASE_URL, SOCIAL_LINKS } from '@/config/site';
import { SmartLink } from './SmartLink';

type IconName = 'instagram' | 'youtube' | 'whatsapp' | 'mail' | 'course' | 'ai' | 'keyframe' | 'up';

/** One stroke family for every footer icon (24px grid, 1.8 stroke). */
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
    youtube: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1L4 20Z" />
        <path d="M9.5 9.5c.3 1.6 1.5 3.4 3.5 4.5l1.2-1 1.8.8c-.2 1-1 1.7-2 1.7-3 0-6.5-3.5-6.5-6.5 0-1 .7-1.8 1.7-2l.8 1.8-1 1.2Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    course: (
      <>
        <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
        <path d="M6.5 11v4.5c1.5 1.3 3.3 2 5.5 2s4-.7 5.5-2V11" />
      </>
    ),
    ai: (
      <>
        <path d="M4 17c4 0 5-10 9-10s4.5 6 7 6" />
        <circle cx="4" cy="17" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="20" cy="13" r="1.6" fill="currentColor" stroke="none" />
      </>
    ),
    keyframe: <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" transform="rotate(45 12 12)" />,
    up: <path d="M12 19V5M6 11l6-6 6 6" />,
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

const SOCIAL_ICON: Record<string, IconName> = { Instagram: 'instagram', YouTube: 'youtube' };

export function Footer() {
  const contacts = [
    ...SOCIAL_LINKS.map((s) => ({ label: s.label, href: s.url, icon: SOCIAL_ICON[s.label] ?? 'keyframe' })),
    ...(CONTACT.whatsapp
      ? [{ label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`, icon: 'whatsapp' as IconName }]
      : []),
    ...(CONTACT.email ? [{ label: 'Email', href: `mailto:${CONTACT.email}`, icon: 'mail' as IconName }] : []),
  ];

  const ecosystem: { label: string; href: string; icon: IconName; newTab?: boolean }[] = [
    { label: 'Black Belt in Motion Design', href: COURSE_URL, icon: 'course' },
    { label: 'Dojo’s AI', href: DOJO_AI_URL || '#dojo-ai', icon: 'ai' },
    { label: 'Keyframe Ninjas', href: NINJAS_SHOWCASE_URL, icon: 'keyframe', newTab: true },
  ];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="brand" aria-label="Motion Dojo, back to top">
              <img src="/assets/favicon-128.png" alt="" width={36} height={36} />
              Motion Dojo
            </a>
            <p>A community where motion designers and creatives learn, create, connect, and grow together.</p>
          </div>

          <ul className="socials" aria-label="Follow Motion Dojo">
            {contacts.map((c) => (
              <li key={c.label}>
                <SmartLink href={c.href} newTab={c.href.startsWith('http')} aria-label={c.label} title={c.label}>
                  <Icon name={c.icon} />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <nav aria-label="Footer">
            <h3>Explore</h3>
            <ul className="footer-nav">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>Ecosystem</h3>
            <ul className="footer-eco">
              {ecosystem.map((e) => (
                <li key={e.label}>
                  <SmartLink href={e.href} newTab={e.newTab}>
                    <span className="eco-icon">
                      <Icon name={e.icon} />
                    </span>
                    {e.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Motion Dojo. All rights reserved.</span>
          <a href="#top" className="to-top">
            Back to top
            <Icon name="up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
