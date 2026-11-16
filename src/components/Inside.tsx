import React from 'react';

/* The three things Motion Dojo is built around, in Motion Dojo's own words. */
const PILLARS = [
  {
    key: 'learn',
    title: 'Learning',
    body: 'Helping members understand motion design, master their tools, and develop strong creative foundations.',
  },
  {
    key: 'community',
    title: 'Community',
    body: 'Connecting like-minded creatives who can learn from, support, challenge, and inspire one another.',
  },
  {
    key: 'grow',
    title: 'Growth',
    body: 'Helping members move beyond tutorials to creating meaningful work, building portfolios, and finding opportunities.',
  },
];

export function Inside() {
  return (
    <section className="section section-flat" id="pillars" aria-labelledby="pillars-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="pillars-title">
            Built around three things.
          </h2>
        </div>

        <ol className="bento pillars">
          {PILLARS.map((p, i) => (
            <li key={p.key} className={`tile-${p.key}`}>
              <span className="pillar-num" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="tile-copy">
                <h3 className="tile-title">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
