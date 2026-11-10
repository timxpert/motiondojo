import React from 'react';
import { COURSE_URL, DOJO_AI_URL } from '@/config/site';
import { COURSE_PHASES } from '@/data/content';

// Members from the community (stills from their video stories), not the team shown above
const FACES = [
  { src: '/images/testimonial-mary.webp', name: 'Mary', focus: '50% 42%' },
  { src: '/images/testimonial-roseline.webp', name: 'Roseline', focus: '50% 36%' },
  { src: '/images/testimonial-fatihi.webp', name: 'Muhammad Fatihi', focus: '50% 42%' },
];

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

        <div className="bento">
          {/* Learn: the course, shown as its four-phase path */}
          <article className="tile-learn">
            <ol className="path" aria-label="The four Black Belt phases">
              {COURSE_PHASES.map((p, i) => (
                <li key={p.title}>
                  <span className="path-key" aria-hidden="true" />
                  <span className="path-label">
                    <span className="sr-only">Phase {i + 1}: </span>
                    {p.title}
                  </span>
                </li>
              ))}
            </ol>
            <div className="tile-copy">
              <h3 className="h3">Learn new skills</h3>
              <p>
                <strong>Black Belt in Motion Design</strong> is our structured motion design programme. It helps you
                build strong foundations, master your tools, execute creative projects, and prepare for professional
                opportunities.
              </p>
              <a href={COURSE_URL} className="tile-link">
                Explore the course
              </a>
            </div>
          </article>

          {/* Work smarter: Dojo's AI, shown as an eased curve with its handles */}
          <article className="tile-ai">
            <svg className="tile-curve" viewBox="0 0 240 120" aria-hidden="true">
              <line className="t-grid" x1="20" x2="220" y1="100" y2="100" />
              <line className="t-grid" x1="20" x2="220" y1="20" y2="20" />
              <path className="t-curve" d="M20 100 C 90 100, 110 20, 220 20" />
              <line className="t-handle" x1="20" y1="100" x2="80" y2="100" />
              <line className="t-handle" x1="220" y1="20" x2="150" y2="20" />
              <circle className="t-dot" cx="80" cy="100" r="4.5" />
              <circle className="t-dot" cx="150" cy="20" r="4.5" />
              <rect className="t-key" x="13" y="93" width="14" height="14" rx="2" transform="rotate(45 20 100)" />
              <rect className="t-key" x="213" y="13" width="14" height="14" rx="2" transform="rotate(45 220 20)" />
            </svg>
            <div className="tile-copy">
              <h3 className="h3">Work smarter</h3>
              <p>
                <strong>Dojo’s AI</strong> is our in-house tool, built to support the Motion Dojo community and make
                the creative workflow easier.
              </p>
              <a href={DOJO_AI_URL || '#dojo-ai'} className="tile-link">
                Discover Dojo’s AI
              </a>
            </div>
          </article>

          {/* Grow together: the community, shown by the people in it */}
          <article className="tile-grow">
            <div className="tile-copy">
              <h3 className="h3">Grow together</h3>
              <p>
                <strong>The community</strong> is where you connect with other motion designers, share your work,
                exchange ideas, collaborate, and grow alongside people who understand your journey.
              </p>
              <a href="#community" className="tile-link">
                Explore the community
              </a>
            </div>
            <ul className="faces" aria-label="Members of the community">
              {FACES.map((f) => (
                <li key={f.name}>
                  <img src={f.src} alt={f.name} loading="lazy" style={{ objectPosition: f.focus }} />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
