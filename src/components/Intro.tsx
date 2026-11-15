import React from 'react';

export function Intro() {
  return (
    <section className="section" id="intro" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <h2 className="h2" id="intro-title">
          A dojo is where you train with other people.
        </h2>
        <div className="intro-copy">
          <p className="lede">
            Motion Dojo is a community of motion designers. You post what you’re working on, get honest feedback, and
            see what everyone else is making.
          </p>
          <p className="lede">
            Some members are opening Alight Motion for the first time. Some already take client work. You’ll learn
            from both.
          </p>
          <a href="#team" className="btn btn-primary">
            Get to know us
          </a>
        </div>
      </div>
    </section>
  );
}
