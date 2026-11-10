import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';
import { GALLERY } from '@/data/content';

export function Community() {
  return (
    <section className="section" id="community" aria-labelledby="community-title">
      <div className="wrap">
        <div className="community-head">
          <h2 className="h2" id="community-title">
            Different creatives. One community.
          </h2>
          <div className="side">
            <p className="lede">
              Great things happen when creatives grow together. Motion Dojo brings people together to share ideas,
              learn from one another, create meaningful work, and celebrate progress.
            </p>
            <a href={COMMUNITY_JOIN_URL} className="btn btn-primary">
              Join the community
            </a>
          </div>
        </div>

        <div className="gallery">
          {GALLERY.map((g) => (
            <figure className={`tile ${g.shape}`} key={g.src}>
              <img src={g.src} alt={g.alt} loading="lazy" style={g.focus ? { objectPosition: g.focus } : undefined} />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
