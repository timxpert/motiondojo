import React from 'react';
import { TEAM } from '@/data/team';

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-grid">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2 className="h2" id="about-title">
              About Motion Dojo
            </h2>
            <p className="lede">
              Motion Dojo is an exclusive community where smartphone motion designers learn, practice, share, and grow
              together.
            </p>
          </div>

          <p className="mission">
            <span className="mission-label">Our mission</span>
            To empower aspiring and emerging smartphone motion designers to develop their creative abilities, master
            motion design, and build the skills and confidence to create meaningful work and opportunities for
            themselves.
          </p>
        </div>

        <div className="people">
          <div className="people-head">
            <h3 className="h2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}>
              The people who’ll know your name
            </h3>
            <p className="body">
              Timxpert built the school he wished he had when he started. He called it a dojo because you don’t just
              watch here: you train, get corrected and level up, with a team that keeps the room running every day.
            </p>
          </div>

          <ul className="people-grid">
            {TEAM.map((person) => (
              <li className="person" key={person.name}>
                <img src={person.photo} alt={person.name} loading="lazy" />
                <p className="person-name">{person.name}</p>
                <p className="person-role">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
