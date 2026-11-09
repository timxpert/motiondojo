import React from 'react';
import { LEARN_MORE_URL } from '@/config/site';
import { TEAM } from '@/data/team';

const TIMES = ['00:00', '00:01', '00:02', '00:03', '00:04'];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <h1 className="display">You were never meant to figure it all out alone.</h1>

        <p className="lede">
          Motion design is more than learning how to animate. It’s discovering your creative voice, finding people
          who understand your ambition, and building something you can be proud of.
        </p>

        <div className="hero-actions">
          <a href={LEARN_MORE_URL} className="btn btn-lime">
            Learn more
          </a>
          <a href="#ninjas" className="text-link">
            See what members make
          </a>
        </div>

        {/* A motion timeline: the people of the dojo are keyframes, and the last one is the visitor. */}
        <figure className="track" aria-label="The Motion Dojo timeline">
          <div className="track-times" aria-hidden="true">
            {TIMES.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="track-ruler" aria-hidden="true" />

          <ol className="track-keys">
            {TEAM.map((person) => (
              <li className="kf" key={person.name}>
                <div className="kf-shape">
                  <img className="kf-photo" src={person.photo} alt={`${person.name}, ${person.role}`} />
                </div>
                <span className="kf-name">{person.short}</span>
              </li>
            ))}
            <li className="kf kf-you">
              <div className="kf-shape">
                <span className="kf-inner">You</span>
              </div>
              <span className="kf-name">Next keyframe</span>
            </li>
          </ol>

          <span className="playhead" aria-hidden="true" />

          <figcaption className="track-caption">
            {TEAM.map((p) => p.short).slice(0, -1).join(', ')} and {TEAM[TEAM.length - 1].short} are already on the
            timeline. <strong>The next keyframe is yours.</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
