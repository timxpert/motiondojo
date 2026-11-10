import React from 'react';
import { NINJAS_SHOWCASE_URL } from '@/config/site';
import { NINJAS } from '@/data/content';
import { SmartLink } from './SmartLink';

export function Ninjas() {
  if (NINJAS.length === 0) return null;

  return (
    <section className="section ninjas" id="keyframe-ninjas" aria-labelledby="ninjas-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="ninjas-title">
            Meet the creatives making moves.
          </h2>
          <p className="lede">
            Get to know some of the creatives learning, creating, and growing through Motion Dojo. Students of Black
            Belt in Motion Design are called Keyframe Ninjas.
          </p>
        </div>

        <ul className="ninja-grid">
          {NINJAS.map((n) => (
            <li className="ninja" key={n.name}>
              <div className="ninja-photo">
                <img src={n.photo} alt={n.name} loading="lazy" style={{ objectPosition: n.focus }} />
              </div>
              <h3>{n.name}</h3>
              <span className="ninja-cohort">{n.cohort}</span>
              <p>{n.note}</p>
            </li>
          ))}
        </ul>

        <div className="ninjas-foot">
          <p>Every Keyframe Ninja gets a showcase page with their story, projects and links to share.</p>
          <SmartLink href={NINJAS_SHOWCASE_URL} newTab className="text-link">
            <span>See all Keyframe Ninjas</span>
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
