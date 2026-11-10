import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';

export function FinalCTA() {
  return (
    <section className="section dark-section final" data-reveal-section aria-labelledby="final-title">
      <svg className="final-art" viewBox="0 0 800 500" aria-hidden="true" data-parallax="0.08">
        <defs>
          <linearGradient id="finalGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#6D32E8" />
            <stop offset="0.55" stopColor="#A77BFF" />
            <stop offset="1" stopColor="#C8FF3D" />
          </linearGradient>
        </defs>
        <path className="ghost" d="M40 420 C 220 420, 260 120, 420 160 S 640 360, 760 80" />
        <path className="ghost" d="M40 460 C 260 460, 300 220, 460 240 S 660 300, 760 160" />
        <path
          className="trail"
          pathLength={1}
          d="M40 380 C 200 380, 240 90, 400 120 S 620 330, 760 60"
        />
        <rect className="k" x="31" y="371" width="18" height="18" rx="3" transform="rotate(45 40 380)" />
        <rect className="k" x="391" y="111" width="18" height="18" rx="3" transform="rotate(45 400 120)" />
        <rect className="k k-lime" x="749" y="49" width="22" height="22" rx="3" transform="rotate(45 760 60)" />
      </svg>

      <div className="wrap">
        <h2 className="display" id="final-title" data-reveal>
          Your next creative chapter <span className="grad-text">starts here.</span>
        </h2>
        <p className="lede" data-reveal style={{ ['--d' as string]: '0.08s' }}>
          You don’t have to figure everything out alone. Join a community that encourages you to learn, create,
          connect, and grow.
        </p>
        <a href={COMMUNITY_JOIN_URL} className="btn btn-lime" data-reveal style={{ ['--d' as string]: '0.14s' }}>
          Join Motion Dojo
        </a>
      </div>
    </section>
  );
}
