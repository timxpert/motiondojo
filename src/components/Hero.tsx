import React from 'react';
import { COMMUNITY_JOIN_URL } from '@/config/site';

/** Graph-editor composition: an ease curve with keyframes, handles and a scrubbing playhead. */
function GraphArt() {
  const frames = [0, 12, 24, 36, 48];
  return (
    <svg className="graph" viewBox="0 0 480 400" role="img" aria-label="An animation curve with keyframes">
      {frames.map((f, i) => {
        const x = 40 + i * 100;
        return (
          <g key={f}>
            <line className="grid-line" x1={x} x2={x} y1="30" y2="350" />
            <text className="axis-label" x={x} y="378" textAnchor="middle">
              {f}f
            </text>
          </g>
        );
      })}
      {[70, 150, 230, 310].map((y) => (
        <line key={y} className="grid-line" x1="40" x2="440" y1={y} y2={y} />
      ))}

      {/* linear "before" curve, for contrast with the eased one */}
      <path className="curve-ghost" d="M40 320 L440 70" />
      <path className="curve" pathLength={1} d="M40 320 C100 320 130 232 180 200 S 250 100 300 95 S 400 70 440 70" />

      {/* bezier handles on the second keyframe */}
      <g className="handle k2">
        <line x1="140" y1="226" x2="220" y2="174" />
      </g>
      <circle className="handle-dot k2" cx="140" cy="226" r="5" />
      <circle className="handle-dot k2" cx="220" cy="174" r="5" />

      <g className="key-g k1"><rect className="key" x="31" y="311" width="18" height="18" rx="3" transform="rotate(45 40 320)" /></g>
      <g className="key-g k2"><rect className="key" x="171" y="191" width="18" height="18" rx="3" transform="rotate(45 180 200)" /></g>
      <g className="key-g k3"><rect className="key" x="291" y="86" width="18" height="18" rx="3" transform="rotate(45 300 95)" /></g>
      <g className="key-g k4"><rect className="key key-lime" x="429" y="59" width="22" height="22" rx="3" transform="rotate(45 440 70)" /></g>

      <g className="playhead-g">
        <line className="playhead" x1="60" x2="60" y1="24" y2="352" />
        <path className="playhead-cap" d="M52 14h16v8l-8 7-8-7z" />
      </g>
    </svg>
  );
}

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
          <GraphArt />
        </div>
      </div>
    </section>
  );
}
