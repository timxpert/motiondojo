import React from 'react';

const PHASES = [
  { title: 'Foundations', body: 'Principles, typography, colour and your first animations.' },
  { title: 'Tools and techniques', body: 'Keyframes, the graph editor, effects and camera systems.' },
  { title: 'Creative execution', body: 'Turn concepts into finished motion graphics, UI animation and product visuals.' },
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
          <p className="lede">Four phases, at your own pace, with the community beside you the whole way.</p>
        </div>

        <ol className="phases">
          {PHASES.map((phase, i) => (
            <li className="phase" key={phase.title}>
              <span className="phase-key" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="h3">
                <span className="sr-only">Phase {i + 1}: </span>
                {phase.title}
              </h3>
              <p>{phase.body}</p>
            </li>
          ))}
          <li className="phase phase-belt">
            <span className="phase-key" aria-hidden="true" />
            <h3 className="h3">Black Belt in Motion Design</h3>
            <p>The Certificate of Mastery is earned, not given.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
