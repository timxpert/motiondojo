import React from 'react';
import { LEARN_MORE_URL } from '@/config/site';

const PHASES = [
  { title: 'Foundations', body: 'Principles, typography, colour and your first animations.' },
  { title: 'Tools and techniques', body: 'Keyframes, the graph editor, effects and camera systems.' },
  {
    title: 'Creative execution',
    body: 'Turn concepts into finished motion graphics, UI animation and product visuals.',
  },
  { title: 'Portfolio and professional growth', body: 'Build your portfolio, pricing and personal brand for real clients.' },
];

export function NinjaPath() {
  return (
    <section className="section path-section" id="path" aria-labelledby="path-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="path-title">
            The Ninja Path
          </h2>
          <p className="lede">
            Every Keyframe Ninja moves through four phases at their own pace, with the community beside them the whole
            way.
          </p>
        </div>

        <ol className="phases">
          {PHASES.map((phase, i) => (
            <li className="phase" key={phase.title}>
              <span className="phase-key" aria-hidden="true">
                <span>{i + 1}</span>
              </span>
              <span className="phase-num">Phase 0{i + 1}</span>
              <h3 className="h3">{phase.title}</h3>
              <p>{phase.body}</p>
            </li>
          ))}
        </ol>

        <div className="belt">
          <div>
            <div className="belt-title">
              <span className="diamond" aria-hidden="true" />
              <h3 className="h3" style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)' }}>
                Black Belt in Motion Design
              </h3>
            </div>
            <p>The Certificate of Mastery is earned, not given.</p>
          </div>
          <a href={LEARN_MORE_URL} className="btn btn-lime">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
