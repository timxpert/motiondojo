import React from 'react';
import { COURSE_URL, DOJO_AI_URL } from '@/config/site';
import { ArrowRight } from './Icons';

export function Inside() {
  return (
    <section className="section" id="resources" aria-labelledby="inside-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="inside-title" data-reveal>
            Everything you need to keep <span className="grad-text">growing.</span>
          </h2>
          <p className="lede" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            From learning new skills to finding better ways to work, Motion Dojo brings together opportunities, tools,
            and people that help you move forward.
          </p>
        </div>

        <div className="inside-grid">
          <article className="card" data-reveal>
            <div className="card-visual cv-course" aria-hidden="true">
              <div className="mini-track">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="mini-labels">
                <span>Foundations</span>
                <span>Mastery</span>
              </div>
            </div>
            <span className="kicker">Learn new skills</span>
            <h3 className="h3">Black Belt in Motion Design</h3>
            <p>
              Our structured motion design programme helps you build strong foundations, master your tools, execute
              creative projects, and prepare for professional opportunities.
            </p>
            <a href={COURSE_URL} className="text-link">
              <span>Explore the course</span>
              <ArrowRight />
            </a>
          </article>

          <article className="card card-dark" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            <div className="card-visual cv-ai" aria-hidden="true">
              <span className="spark" />
            </div>
            <span className="kicker">Work smarter</span>
            <h3 className="h3">Dojo’s AI</h3>
            <p>
              Meet our in-house tool, built to support the Motion Dojo community and make the creative workflow
              easier.
            </p>
            <a href={DOJO_AI_URL || '#dojo-ai'} className="text-link">
              <span>Discover Dojo’s AI</span>
              <ArrowRight />
            </a>
          </article>

          <article className="card card-tint" data-reveal style={{ ['--d' as string]: '0.16s' }}>
            <div className="card-visual cv-community" aria-hidden="true">
              <img src="/assets/Timxpert.jpg" alt="" loading="lazy" />
              <img src="/assets/Osho Elizabeth Oluwatobiloba.jpg" alt="" loading="lazy" />
              <img src="/assets/Muhammad Fatihi Abdullahi.jpg" alt="" loading="lazy" />
              <img src="/assets/George Junior.jpg" alt="" loading="lazy" />
            </div>
            <span className="kicker">Grow together</span>
            <h3 className="h3">The Community</h3>
            <p>
              Connect with other motion designers, share your work, exchange ideas, collaborate, and grow alongside
              people who understand your journey.
            </p>
            <a href="#community" className="text-link">
              <span>Explore the community</span>
              <ArrowRight />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
