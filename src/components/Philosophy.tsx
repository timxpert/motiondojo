import React from 'react';

const PRINCIPLES = [
  ['Growth', 'shortcuts'],
  ['Practice', 'passive learning'],
  ['Community', 'isolation'],
  ['Mastery', 'mediocrity'],
];

const LOOP = [
  { step: 'Learn', body: 'Pick up a new skill or idea.' },
  { step: 'Practice', body: 'Apply it in a real project.' },
  { step: 'Review', body: 'Share it and get honest feedback.' },
  { step: 'Progress', body: 'Improve, then start the next round.' },
];

export function Philosophy() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="philosophy-grid">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="kicker" data-reveal>
              Our philosophy
            </span>
            <h2 className="h2" id="about-title" data-reveal>
              Growth is better when we grow <span className="grad-text">together.</span>
            </h2>
            <p className="lede" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              Motion Dojo was built on a simple belief: you get better faster when you’re surrounded by people who
              are working on the same craft. Watching tutorials alone only takes you so far. Real growth comes from
              doing the work, showing it to others, and trying again.
            </p>
          </div>

          <ul className="principles" aria-label="Our principles">
            {PRINCIPLES.map(([win, lose], i) => (
              <li className="principle" key={win} data-reveal style={{ ['--d' as string]: `${i * 0.06}s` }}>
                <span>{win}</span>
                <span className="over">over</span>
                <span className="lesser">{lose}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loop" data-reveal>
          <div className="loop-head">
            <h3 className="h3">How we learn</h3>
            <p>
              Members apply what they learn, receive feedback, improve, and keep developing. Every project is one more
              lap of the same loop.
            </p>
          </div>

          <svg className="loop-curve" viewBox="0 0 1000 56" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="loopGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#6D32E8" />
                <stop offset="1" stopColor="#A77BFF" />
              </linearGradient>
            </defs>
            <path className="back" d="M875 40 C 700 70, 300 70, 125 40" vectorEffect="non-scaling-stroke" />
            <path d="M125 40 C 200 0, 300 0, 375 40 S 550 80, 625 40 S 800 0, 875 40" vectorEffect="non-scaling-stroke" />
          </svg>

          <ol className="loop-steps">
            {LOOP.map((l) => (
              <li className="loop-step" key={l.step}>
                <b>{l.step}</b>
                <p>{l.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
