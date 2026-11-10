import React from 'react';
import { COURSE_URL } from '@/config/site';
import { COURSE_PHASES } from '@/data/content';

export function Course() {
  return (
    <section className="section course" id="black-belt" aria-labelledby="course-title">
      <div className="wrap">
        <div className="course-grid">
          <div className="course-copy">
            <h2 className="h2" id="course-title" data-reveal>
              Ready to take your motion design skills further?
            </h2>
            <p className="lede" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              Black Belt in Motion Design is our structured training programme designed to help you build strong
              foundations, master your tools, execute creative projects, and prepare for professional opportunities.
            </p>
            <p className="lede" data-reveal style={{ ['--d' as string]: '0.12s' }}>
              From your first keyframe to building a portfolio, you’ll have a structured path to follow.
            </p>
            <a href={COURSE_URL} className="btn btn-primary" data-reveal style={{ ['--d' as string]: '0.16s' }}>
              Explore the course
            </a>
          </div>

          <div className="course-phone" data-reveal data-parallax="0.05">
            <img src="/images/hero-poster.webp" alt="A Black Belt lesson project open in Alight Motion on a phone" loading="lazy" />
          </div>
        </div>

        <ol className="phases" data-reveal aria-label="The four learning phases">
          {COURSE_PHASES.map((p, i) => (
            <li className="phase" key={p.title}>
              <span className="phase-key" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>
                <span className="sr-only">Phase {i + 1}: </span>
                {p.title}
              </h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
