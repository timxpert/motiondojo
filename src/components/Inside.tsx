import React from 'react';
import { COMMUNITY_JOIN_URL, COURSE_URL } from '@/config/site';

export function Inside() {
  return (
    <section className="section section-flat" id="resources" aria-labelledby="inside-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="inside-title">
            Two ways in.
          </h2>
          <p className="lede">
            Most people come to Motion Dojo to learn the craft, to find other people doing it, or both.
          </p>
        </div>

        {/* Two offers, set apart by colour rather than pictures */}
        <div className="bento">
          <article className="tile-learn">
            <h3 className="tile-title">Learn the craft</h3>
            <div className="tile-copy">
              <p>
                <strong>Black Belt in Motion Design</strong> takes you from your first keyframe in Alight Motion to a
                portfolio you can show clients, in four phases, at your own pace.
              </p>
              <a href={COURSE_URL} target="_blank" rel="noopener" className="btn btn-lime">
                See the course
              </a>
            </div>
          </article>

          <article className="tile-grow">
            <h3 className="tile-title">Find your people</h3>
            <div className="tile-copy">
              <p>
                <strong>The community</strong> is where members post work in progress, ask for help when something
                won’t move right, and pass on paid referrals and collaborations.
              </p>
              <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noopener" className="btn btn-primary">
                Join the community
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
