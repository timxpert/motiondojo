import React from 'react';
import { COURSE_URL, DOJO_AI_URL } from '@/config/site';

export function Inside() {
  return (
    <section className="section section-flat" id="resources" aria-labelledby="inside-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="inside-title">
            Everything you need to keep growing.
          </h2>
          <p className="lede">
            From learning new skills to finding better ways to work, Motion Dojo brings together opportunities, tools,
            and people that help you move forward.
          </p>
        </div>

        {/* Three offers, set apart by colour and size rather than pictures */}
        <div className="bento">
          <article className="tile-learn">
            <h3 className="tile-title">Learn new skills</h3>
            <div className="tile-copy">
              <p>
                <strong>Black Belt in Motion Design</strong> is our structured motion design programme. It helps you
                build strong foundations, master your tools, execute creative projects, and prepare for professional
                opportunities.
              </p>
              <a href={COURSE_URL} target="_blank" rel="noopener" className="btn btn-lime">
                Explore the course
              </a>
            </div>
          </article>

          <article className="tile-ai">
            <h3 className="tile-title">Work smarter</h3>
            <div className="tile-copy">
              <p>
                <strong>Dojo’s AI</strong> is our in-house tool, built to support the Motion Dojo community and make
                the creative workflow easier.
              </p>
              <a href={DOJO_AI_URL || '#dojo-ai'} className="btn btn-light">
                Discover Dojo’s AI
              </a>
            </div>
          </article>

          <article className="tile-grow">
            <h3 className="tile-title">Grow together</h3>
            <div className="tile-copy">
              <p>
                <strong>The community</strong> is where you connect with other motion designers, share your work,
                exchange ideas, collaborate, and grow alongside people who understand your journey.
              </p>
              <a href="#community" className="btn btn-primary">
                Explore the community
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
