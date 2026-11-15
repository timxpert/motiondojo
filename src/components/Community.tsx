import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';

export function Community() {
  return (
    <section className="section" id="community" aria-labelledby="community-title">
      <div className="wrap">
        <div className="community-head">
          <h2 className="h2" id="community-title">
            Post your work where people will see it.
          </h2>
          <div className="side">
            <p className="lede">
              Members share animations as they make them, keep each other practising daily, and celebrate the first
              render and the first paying client alike. Work posted here gets seen, and it can bring in real project enquiries.
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
