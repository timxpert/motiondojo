import React from 'react';

const ORBIT = 'M6 50 A44 40 0 1 1 94 50 A44 40 0 1 1 6 50';

const FACES = [
  { src: '/assets/Timxpert.jpg', name: 'Timxpert', x: 14, y: 28 },
  { src: '/assets/Osho Elizabeth Oluwatobiloba.jpg', name: 'Elizabeth', x: 86, y: 28 },
  { src: '/assets/George Junior.jpg', name: 'Junior', x: 84, y: 74 },
  { src: '/assets/Muhammad Fatihi Abdullahi.jpg', name: 'Fatihi', x: 14, y: 72 },
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

        <div className="orbit" aria-hidden="true">
          <svg className="orbit-path" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={ORBIT} vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="orbit-phone">
            <img src="/images/hero-video-poster.webp" alt="" loading="lazy" />
          </div>
          {FACES.map((f) => (
            <div className="orbit-face" key={f.name} style={{ left: `${f.x}%`, top: `${f.y}%` }}>
              <img src={f.src} alt="" loading="lazy" />
              <span>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
