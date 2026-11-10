import React from 'react';
import { CONTACT, COURSE_URL, DOJO_AI_URL, NINJAS_SHOWCASE_URL, SOCIAL_LINKS } from '@/config/site';
import { SmartLink } from './SmartLink';

type IconName = 'instagram' | 'youtube' | 'whatsapp' | 'mail';

/** Outline social icons, drawn on one 24px grid. */
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
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
        <path d="m10 9 5 3-5 3V9Z" />
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
  };
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
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
  const socials = [
    ...SOCIAL_LINKS.filter((s) => SOCIAL_ICON[s.label]).map((s) => ({
      label: s.label,
      href: s.url,
      icon: SOCIAL_ICON[s.label],
    })),
    ...(CONTACT.whatsapp
      ? [{ label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`, icon: 'whatsapp' as IconName }]
      : []),
    ...(CONTACT.email ? [{ label: 'Email', href: `mailto:${CONTACT.email}`, icon: 'mail' as IconName }] : []),
  ];

  const ecosystem = [
    { label: 'Black Belt in Motion Design', href: COURSE_URL, newTab: true },
    { label: 'Dojo’s AI', href: DOJO_AI_URL || '/#dojo-ai' },
    { label: 'Keyframe Ninjas', href: NINJAS_SHOWCASE_URL, newTab: true },
  ];
  const site = [
    { label: 'About', href: '/#intro' },
    { label: 'Community', href: '/#community' },
    { label: 'Meet the team', href: '/#team' },
  ];

  return (
    <footer className="footer">
      <div className="footer-box">
        <div className="footer-brand">
          <a href="/" className="footer-logo" aria-label="Motion Dojo home">
            <img src="/assets/favicon-128.png" alt="" width={48} height={48} />
            Motion Dojo
          </a>
          <p className="footer-tagline">Train like a ninja. Create like a master.</p>

          <p className="footer-follow">Follow us</p>
          <ul className="footer-socials">
            {socials.map((s) => (
              <li key={s.label}>
                <SmartLink href={s.href} newTab={s.href.startsWith('http')} aria-label={s.label} title={s.label}>
                  <Icon name={s.icon} />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <ul>
            {ecosystem.map((l) => (
              <li key={l.label}>
                <SmartLink href={l.href} newTab={l.newTab}>
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <ul>
            {site.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="footer-copy">Motion Dojo {new Date().getFullYear()}. © All rights reserved.</p>
    </footer>
  );
}
