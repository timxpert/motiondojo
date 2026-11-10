import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';
import { GALLERY } from '@/data/content';

export function Community() {
  return (
    <section className="section" id="community" aria-labelledby="community-title">
      <div className="wrap">
        <div className="community-head">
          <h2 className="h2" id="community-title" data-reveal>
            Different creatives. <span className="grad-text">One community.</span>
          </h2>
          <div className="side">
            <p className="lede" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              Great things happen when creatives grow together. Motion Dojo brings people together to share ideas,
              learn from one another, create meaningful work, and celebrate progress.
            </p>
            <a href={COMMUNITY_JOIN_URL} className="btn btn-primary" data-reveal style={{ ['--d' as string]: '0.14s' }}>
              Join the community
            </a>
          </div>
        </div>

        <div className="gallery">
          {GALLERY.map((g, i) => (
            <figure
              className={`tile ${g.shape}`}
              key={g.src}
              data-reveal
              style={{ ['--d' as string]: `${(i % 4) * 0.06}s` }}
            >
              <img src={g.src} alt={g.alt} loading="lazy" style={g.focus ? { objectPosition: g.focus } : undefined} />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
