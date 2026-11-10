import React from 'react';

const TEAM = [
  { src: '/assets/Timxpert.jpg', name: 'Timxpert', role: 'Founder', focus: '50% 20%' },
  { src: '/assets/Muhammad Fatihi Abdullahi.jpg', name: 'Muhammad Fatihi', role: 'Community manager', focus: '50% 30%' },
  { src: '/assets/Osho Elizabeth Oluwatobiloba.jpg', name: 'Elizabeth', role: 'Moderator', focus: '50% 25%' },
  { src: '/assets/George Junior.jpg', name: 'George Junior', role: 'Social media manager', focus: '50% 30%' },
];

export function Intro() {
  return (
    <section className="section" id="intro" aria-labelledby="intro-title">
      <div className="wrap split">
        <div className="intro-copy">
          <h2 className="h2" id="intro-title">
            More than a place to learn. A place to grow.
          </h2>
          <p className="lede">
            Motion Dojo is a community for motion designers and creatives who want to learn, improve, connect, and
            build something meaningful.
          </p>
          <p className="lede">
            Whether you’re just starting out or looking to take your skills further, you’ll find an environment that
            encourages you to keep creating and getting better.
          </p>
          <a href="#about" className="btn btn-primary">
            Get to know us
          </a>
        </div>

        <ul className="team" aria-label="The Motion Dojo team">
          {TEAM.map((t) => (
            <li key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" style={{ objectPosition: t.focus }} />
              <p className="team-name">{t.name}</p>
              <p className="team-role">{t.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
