import React from 'react';

export function Intro() {
  return (
    <section className="section" id="intro" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <h2 className="h2" id="intro-title">
          More than a place to learn. A place to grow.
        </h2>
        <div className="intro-copy">
          <p className="lede">
            Motion Dojo is a community for motion designers and creatives who want to learn, improve, connect, and
            build something meaningful.
          </p>
          <p className="lede">
            Whether you’re just starting out or looking to take your skills further, you’ll find an environment that
            encourages you to keep creating and getting better.
          </p>
          <a href="#team" className="btn btn-primary">
            Get to know us
          </a>
        </div>
      </div>
    </section>
  );
}
