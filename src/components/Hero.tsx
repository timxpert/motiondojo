import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';
import { GraphEditor } from './GraphEditor';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="display" id="hero-title">
            <span className="line">You were never meant</span>
            <span className="line">to figure it all out alone.</span>
          </h1>

          <p className="lede">
            Motion design is about discovering your creative voice and finding people who understand your ambition.
          </p>

          <div className="btn-pair">
            <a href={COMMUNITY_JOIN_URL} className="btn btn-primary">
              Join the community
            </a>
            <a href="#intro" className="btn btn-lime">
              Learn more
            </a>
          </div>
        </div>

        <div className="hero-art">
          <GraphEditor />
        </div>
      </div>
    </section>
  );
}
