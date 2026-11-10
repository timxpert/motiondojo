import React from 'react';
import { COURSE_URL, DOJO_AI_URL } from '@/config/site';

export function Inside() {
  return (
    <section className="section" id="resources" aria-labelledby="inside-title">
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

        <ul className="offers">
          <li className="offer">
            <h3 className="h3">Learn new skills</h3>
            <p>
              <strong>Black Belt in Motion Design</strong> is our structured motion design programme. It helps you
              build strong foundations, master your tools, execute creative projects, and prepare for professional
              opportunities.
            </p>
            <a href={COURSE_URL} className="text-link">
              <span>Explore the course</span>
            </a>
          </li>

          <li className="offer">
            <h3 className="h3">Work smarter</h3>
            <p>
              <strong>Dojo’s AI</strong> is our in-house tool, built to support the Motion Dojo community and make the
              creative workflow easier.
            </p>
            <a href={DOJO_AI_URL || '#dojo-ai'} className="text-link">
              <span>Discover Dojo’s AI</span>
            </a>
          </li>

          <li className="offer">
            <h3 className="h3">Grow together</h3>
            <p>
              <strong>The community</strong> is where you connect with other motion designers, share your work,
              exchange ideas, collaborate, and grow alongside people who understand your journey.
            </p>
            <a href="#community" className="text-link">
              <span>Explore the community</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
