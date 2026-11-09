import React from 'react';

const PROMISES = [
  {
    title: 'Your questions matter',
    body: 'Ask anything, at any stage. Nobody here was born knowing the graph editor, and someone is always around to help you find the answer.',
  },
  {
    title: 'Your progress is celebrated',
    body: 'From your first render to your first big client, you share the milestone and the whole room cheers with you.',
  },
  {
    title: 'Your work gets better through practice',
    body: 'Daily practice, honest feedback and peers who keep raising the bar, so you keep raising yours.',
  },
  {
    title: 'The people around you want to see you win',
    body: 'Members share referrals, collaborate on projects and open doors for each other.',
  },
];

export function Belonging() {
  return (
    <section className="section" aria-labelledby="belonging-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2 statement" id="belonging-title">
            A skill can change what you do. The right community can change how far you go.
          </h2>
          <p className="lede">You deserve a place where:</p>
        </div>

        <ul className="promises">
          {PROMISES.map((p) => (
            <li className="promise" key={p.title}>
              <span className="diamond" aria-hidden="true" />
              <h3 className="h3">{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
