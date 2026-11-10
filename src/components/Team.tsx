'use client';

import React, { useState } from 'react';
import { TEAM, TeamMember } from '@/data/content';

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
    </svg>
  );
}

/** Front: photo, name and role. Back: bio and a WhatsApp link. Tap to flip either way. */
function FlipCard({ m }: { m: TeamMember }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li className={flipped ? 'flip is-flipped' : 'flip'}>
      <div className="flip-inner">
        <div className="flip-face flip-front" aria-hidden={flipped}>
          <img src={m.photo} alt="" loading="lazy" style={{ objectPosition: m.focus }} />
          <div className="flip-caption">
            <div>
              <h3 className="flip-name">{m.name}</h3>
              <p className="flip-role">{m.role}</p>
            </div>
            {/* tells people the card turns over */}
            <svg className="flip-turn" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M20 12a8 8 0 1 1-2.3-5.6" />
              <path d="M20 4v4.5h-4.5" />
            </svg>
          </div>
          <button
            type="button"
            className="flip-hit"
            onClick={() => setFlipped(true)}
            tabIndex={flipped ? -1 : 0}
            aria-label={`Read about ${m.short} and connect`}
          />
        </div>

        <div className="flip-face flip-back" aria-hidden={!flipped}>
          <button
            type="button"
            className="flip-hit"
            onClick={() => setFlipped(false)}
            tabIndex={flipped ? 0 : -1}
            aria-label={`Flip back to ${m.short}’s photo`}
          />
          <div className="flip-back-body">
            <p className="flip-name">{m.name}</p>
            <p className="flip-role">{m.role}</p>
            <p className="flip-bio">{m.bio}</p>
          </div>
          <div className="flip-actions">
            <a
              className="btn btn-lime"
              href={m.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={flipped ? 0 : -1}
            >
              <WhatsAppIcon />
              Connect with {m.short}
            </a>
            <span className="flip-hint" aria-hidden="true">
              Tap to flip back
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Team() {
  return (
    <section className="section team-section" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="team-title">
            Meet the team
          </h2>
        </div>

        <ul className="flip-grid">
          {TEAM.map((m) => (
            <FlipCard key={m.name} m={m} />
          ))}
        </ul>
      </div>
    </section>
  );
}
