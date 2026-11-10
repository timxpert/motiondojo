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
            <h2 className="h2" id="about-title">
              Growth is better when we grow together.
            </h2>
            <p className="lede">
              Motion Dojo was built on a simple belief: you get better faster when you’re surrounded by people who
              are working on the same craft. Watching tutorials alone only takes you so far. Real growth comes from
              doing the work, showing it to others, and trying again.
            </p>
          </div>

          <ul className="principles" aria-label="Our principles">
            {PRINCIPLES.map(([win, lose]) => (
              <li className="principle" key={win}>
                <span>{win}</span>
                <span className="over">over</span>
                <span className="lesser">{lose}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loop">
          <div className="loop-head">
            <h3 className="h3">How we learn</h3>
            <p>
              Members apply what they learn, receive feedback, improve, and keep developing. After Progress, the loop
              starts again with the next skill.
            </p>
          </div>

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
