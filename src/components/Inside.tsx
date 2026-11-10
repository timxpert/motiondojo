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

        <div className="inside-grid">
          <article className="card card-feature">
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
            <h3 className="h3">Learn new skills</h3>
            <p>
              <strong>Black Belt in Motion Design</strong> is our structured motion design programme. It helps you
              build strong foundations, master your tools, execute creative projects, and prepare for professional
              opportunities.
            </p>
            <a href={COURSE_URL} className="text-link">
              <span>Explore the course</span>
            </a>
          </article>

          <article className="card card-dark">
            <div className="card-visual cv-ai" aria-hidden="true">
              <svg viewBox="0 0 200 110" className="ai-curve">
                <path d="M16 92 C 70 92, 80 18, 184 18" />
                <line x1="16" y1="92" x2="62" y2="92" />
                <line x1="184" y1="18" x2="130" y2="18" />
                <circle cx="62" cy="92" r="4" />
                <circle cx="130" cy="18" r="4" />
                <rect x="10" y="86" width="12" height="12" rx="2" transform="rotate(45 16 92)" />
                <rect x="178" y="12" width="12" height="12" rx="2" transform="rotate(45 184 18)" />
              </svg>
            </div>
            <h3 className="h3">Work smarter</h3>
            <p>
              <strong>Dojo’s AI</strong> is our in-house tool, built to support the Motion Dojo community and make the
              creative workflow easier.
            </p>
            <a href={DOJO_AI_URL || '#dojo-ai'} className="text-link">
              <span>Discover Dojo’s AI</span>
            </a>
          </article>

          <article className="card card-tint">
            <div className="card-visual cv-community" aria-hidden="true">
              <img src="/assets/Timxpert.jpg" alt="" loading="lazy" />
              <img src="/assets/Osho Elizabeth Oluwatobiloba.jpg" alt="" loading="lazy" />
              <img src="/assets/Muhammad Fatihi Abdullahi.jpg" alt="" loading="lazy" />
              <img src="/assets/George Junior.jpg" alt="" loading="lazy" />
            </div>
            <h3 className="h3">Grow together</h3>
            <p>
              <strong>The community</strong> is where you
              connect with other motion designers, share your work, exchange ideas, collaborate, and grow
              alongside people who understand your journey.
            </p>
            <a href="#community" className="text-link">
              <span>Explore the community</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
