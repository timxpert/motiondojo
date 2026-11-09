import React from 'react';
import { NINJAS_DIRECTORY_URL } from '@/config/site';
import { NINJAS } from '@/data/ninjas';

// Only members who approved publication are listed; samples/placeholders never render.
const MEMBERS = NINJAS.filter((n) => !n.isSample).slice(0, 3);

/** Renders nothing until real, approved members exist in data/ninjas.ts. */
export function Spotlight() {
  if (MEMBERS.length === 0) return null;

  return (
    <section className="section section-tight" aria-labelledby="spotlight-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2 h2-sm" id="spotlight-title">
            Recent Keyframe Ninjas
          </h2>
        </div>
        <ul className="ninja-list">
          {MEMBERS.map((n) => (
            <li key={n.slug}>
              <a className="ninja-card" href={NINJAS_DIRECTORY_URL} target="_blank" rel="noopener noreferrer">
                {n.project.poster && <img src={n.project.poster} alt="" loading="lazy" />}
                <h3 className="h3">{n.name}</h3>
                <p>{n.specialty}</p>
                <p>
                  {n.phase}
                  {n.openToWork ? ', open to work' : ''}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
