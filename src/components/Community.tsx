import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';

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
            <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noopener" className="btn btn-primary">
              Join the community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
