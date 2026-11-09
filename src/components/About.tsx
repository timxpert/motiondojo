import React from 'react';
import { TEAM } from '@/data/team';

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-grid">
          <h2 className="h2" id="about-title">
            About Motion Dojo
          </h2>
          <div className="about-copy">
            <p className="lede">
              Motion Dojo is an exclusive community where smartphone motion designers learn, practice, share, and
              grow together.
            </p>
            <p className="mission">
              Our mission is to empower aspiring and emerging smartphone motion designers to develop their creative
              abilities, master motion design, and build the skills and confidence to create meaningful work and
              opportunities for themselves.
            </p>
          </div>
        </div>

        <div className="people">
          <div className="people-head">
            <h3 className="h2 h2-sm">Who runs the dojo</h3>
            <p className="body">
              Timxpert built the school he wished he had when he started. The team below keeps it running day to day
              and will be the first people you talk to when you join.
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
