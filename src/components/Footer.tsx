import React from 'react';
import { INSTAGRAM_URL, LEARN_MORE_URL, NINJAS_DIRECTORY_URL, YOUTUBE_URL } from '@/config/site';

const LINKS = [
  { href: LEARN_MORE_URL, label: 'Black Belt course', external: false },
  { href: NINJAS_DIRECTORY_URL, label: 'Keyframe Ninjas', external: true },
  { href: INSTAGRAM_URL, label: 'Instagram', external: true },
  { href: YOUTUBE_URL, label: 'YouTube', external: true },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div>
          <a href="#top" className="brand" aria-label="Motion Dojo, back to top">
            <img src="/assets/favicon-128.png" alt="" width={28} height={28} />
            Motion Dojo
          </a>
          <p className="footer-tag">Train like a ninja, create like a master.</p>
        </div>

        <ul className="footer-links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="wrap footer-copy">© {new Date().getFullYear()} Motion Dojo</p>
    </footer>
  );
}
