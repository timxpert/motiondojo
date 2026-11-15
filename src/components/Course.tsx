import React from 'react';
import { COURSE_URL } from '@/config/site';
import { COURSE_PHASES } from '@/data/content';

export function Course() {
  return (
    <section className="section course" id="black-belt" aria-labelledby="course-title">
      <div className="wrap">
        <div className="course-copy">
          <h2 className="h2" id="course-title">
            Black Belt in Motion Design
          </h2>
          <p className="lede">
            Our course for learning motion design on your phone with Alight Motion. Video lessons, assignments, and
            projects you finish before moving on, split into four phases.
          </p>
          <p className="lede">₦40,000, or two payments of ₦20,000.
          </p>
          <a href={COURSE_URL} target="_blank" rel="noopener" className="btn btn-primary">
            See the course
          </a>
        </div>

        <ol className="phases" aria-label="The four learning phases">
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
