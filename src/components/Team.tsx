import React from 'react';
import { TEAM } from '@/data/content';

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
    </svg>
  );
}

export function Team() {
  return (
    <section className="section" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="team-title">
            Meet the team
          </h2>
          <p className="lede">The people who keep the dojo running. Message any of them on WhatsApp to say hello.</p>
        </div>

        <ul className="team-grid">
          {TEAM.map((m) => (
            <li className="member" key={m.name}>
              <a
                className="member-photo"
                href={m.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${m.short} on WhatsApp`}
              >
                <img src={m.photo} alt="" loading="lazy" style={{ objectPosition: m.focus }} />
              </a>
              <div className="member-text">
                <h3 className="member-name">{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-bio">{m.bio}</p>
              </div>
              <a className="member-link" href={m.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Message {m.short}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
