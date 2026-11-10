import React from 'react';
import {
  COMMUNITY_JOIN_URL,
  CONTACT,
  COURSE_URL,
  DOJO_AI_URL,
  NAV,
  NINJAS_SHOWCASE_URL,
  SOCIAL_LINKS,
} from '@/config/site';
import { SmartLink } from './SmartLink';

export function Footer() {
  const contact = [
    CONTACT.email && { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.whatsapp && { label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="brand" aria-label="Motion Dojo, back to top">
              <img src="/assets/favicon-128.png" alt="" width={34} height={34} />
              Motion Dojo
            </a>
            <p>A community where motion designers and creatives learn, create, connect, and grow together.</p>
            <a href={COMMUNITY_JOIN_URL} className="btn btn-primary btn-sm">
              Join the community
            </a>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h3>Explore</h3>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h3>Ecosystem</h3>
              <ul>
                <li>
                  <a href={COURSE_URL}>Black Belt in Motion Design</a>
                </li>
                <li>
                  <a href={DOJO_AI_URL || '#dojo-ai'}>Dojo’s AI</a>
                </li>
                <li>
                  <SmartLink href={NINJAS_SHOWCASE_URL} newTab>
                    Keyframe Ninjas
                  </SmartLink>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Follow</h3>
              <ul>
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <SmartLink href={s.url} newTab>
                      {s.label}
                    </SmartLink>
                  </li>
                ))}
                {contact.map((c) => (
                  <li key={c.href}>
                    <SmartLink href={c.href} newTab={c.href.startsWith('http')}>
                      {c.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Motion Dojo. All rights reserved.</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
