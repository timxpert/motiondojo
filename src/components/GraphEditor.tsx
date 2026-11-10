'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A small, working graph editor: drag the keyframes (or focus one and use the arrow keys) and the
 * curve updates. A marker rides the curve as the playhead plays, so visitors see the motion they
 * shaped. Plays once on load and again after each edit; never on its own after that.
 */

type Key = { x: number; y: number };

const LEFT = 40;
const RIGHT = 440;
const TOP = 30;
const BOTTOM = 350;
const FRAMES = [0, 12, 24, 36, 48];
const START: Key[] = [
  { x: 40, y: 320 },
  { x: 180, y: 200 },
  { x: 300, y: 95 },
  { x: 440, y: 70 },
];
const MIN_GAP = 40; // keep keyframes at least this far apart in time
const DURATION = 2200;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Slopes for each key: flat at the ends (ease in and out), Catmull-Rom in between. */
function slopes(keys: Key[]) {
  return keys.map((k, i) => {
    if (i === 0 || i === keys.length - 1) return 0;
    const a = keys[i - 1];
    const b = keys[i + 1];
    return (b.y - a.y) / (b.x - a.x);
  });
}

/** Bezier control points per segment. Handles sit at a third of the segment, like an editor's. */
function segments(keys: Key[]) {
  const m = slopes(keys);
  return keys.slice(0, -1).map((p0, i) => {
    const p1 = keys[i + 1];
    const dx = p1.x - p0.x;
    return {
      p0,
      c1: { x: p0.x + dx / 3, y: p0.y + (m[i] * dx) / 3 },
      c2: { x: p1.x - dx / 3, y: p1.y - (m[i + 1] * dx) / 3 },
      p1,
    };
  });
}

function pathFor(keys: Key[]) {
  const segs = segments(keys);
  return (
    `M${keys[0].x} ${keys[0].y}` +
    segs.map((s) => ` C${s.c1.x} ${s.c1.y} ${s.c2.x} ${s.c2.y} ${s.p1.x} ${s.p1.y}`).join('')
  );
}

/** Curve height at a given x. Handles are spaced evenly in x, so x is linear in t within a segment. */
function yAt(keys: Key[], x: number) {
  const segs = segments(keys);
  const s = segs.find((g) => x <= g.p1.x) ?? segs[segs.length - 1];
  const t = clamp((x - s.p0.x) / (s.p1.x - s.p0.x), 0, 1);
  const u = 1 - t;
  return u * u * u * s.p0.y + 3 * u * u * t * s.c1.y + 3 * u * t * t * s.c2.y + t * t * t * s.p1.y;
}

export function GraphEditor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [keys, setKeys] = useState<Key[]>(START);
  const [active, setActive] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [head, setHead] = useState(RIGHT); // playhead x
  const frame = useRef(0);
  const reduced = useRef(false);

  const play = useCallback(() => {
    if (reduced.current) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setHead(LEFT + (RIGHT - LEFT) * p);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(play, 400);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(frame.current);
    };
  }, [play]);

  const toSvg = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: pt.x, y: pt.y };
  };

  const move = (i: number, next: Key) => {
    setKeys((prev) => {
      const out = prev.slice();
      const isEnd = i === 0 || i === prev.length - 1;
      const x = isEnd ? prev[i].x : clamp(next.x, prev[i - 1].x + MIN_GAP, prev[i + 1].x - MIN_GAP);
      out[i] = { x, y: clamp(next.y, TOP, BOTTOM) };
      return out;
    });
  };

  const onDown = (i: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    cancelAnimationFrame(frame.current);
    setDragging(i);
    setActive(i);
  };
  const onMove = (i: number) => (e: React.PointerEvent) => {
    if (dragging !== i) return;
    const p = toSvg(e);
    if (p) {
      move(i, p);
      setHead(p.x);
    }
  };
  const onUp = (e: React.PointerEvent) => {
    if (dragging === null) return;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    setDragging(null);
    play();
  };
  const onKey = (i: number) => (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 30 : 10;
    const k = keys[i];
    const d: Record<string, Key> = {
      ArrowUp: { x: k.x, y: k.y - step },
      ArrowDown: { x: k.x, y: k.y + step },
      ArrowLeft: { x: k.x - step, y: k.y },
      ArrowRight: { x: k.x + step, y: k.y },
    };
    if (d[e.key]) {
      e.preventDefault();
      move(i, d[e.key]);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      play();
    }
  };

  const segs = segments(keys);
  const shown = active ?? 1;
  // handles of the selected key: incoming (from the segment before) and outgoing (segment after)
  const handles = [segs[shown - 1]?.c2, segs[shown]?.c1].filter(Boolean) as Key[];
  const markerY = yAt(keys, head);
  const value = (y: number) => Math.round(((BOTTOM - y) / (BOTTOM - TOP)) * 100);

  return (
    <div className="graph-editor">
      <svg
        ref={svgRef}
        className="graph"
        viewBox="0 0 480 382"
        role="group"
        aria-label="Animation curve editor. Drag a keyframe, or focus it and use the arrow keys."
      >
        {FRAMES.map((f, i) => {
          const x = LEFT + i * 100;
          return (
            <g key={f}>
              <line className="grid-line" x1={x} x2={x} y1={TOP} y2={BOTTOM} />
              <text className="axis-label" x={x} y="376" textAnchor="middle">
                {f}f
              </text>
            </g>
          );
        })}
        {[70, 150, 230, 310].map((y) => (
          <line key={y} className="grid-line" x1={LEFT} x2={RIGHT} y1={y} y2={y} />
        ))}

        <path className="curve-ghost" d={`M${keys[0].x} ${keys[0].y} L${keys[3].x} ${keys[3].y}`} />
        <path className="curve" d={pathFor(keys)} />

        {handles.map((h, i) => (
          <g key={i}>
            <line className="handle" x1={keys[shown].x} y1={keys[shown].y} x2={h.x} y2={h.y} />
            <circle className="handle-dot" cx={h.x} cy={h.y} r="5" />
          </g>
        ))}

        <g className="playhead-g" transform={`translate(${head - LEFT} 0)`}>
          <line className="playhead" x1={LEFT} x2={LEFT} y1="22" y2={BOTTOM + 2} />
          <path className="playhead-cap" d={`M${LEFT - 8} 12h16v8l-8 7-8-7z`} />
        </g>
        <circle className="marker" cx={head} cy={markerY} r="7" />

        {keys.map((k, i) => {
          const last = i === keys.length - 1;
          const size = last ? 22 : 18;
          return (
            <g
              key={i}
              className={['key-g', dragging === i ? 'is-dragging' : '', active === i ? 'is-active' : ''].join(' ')}
              role="slider"
              tabIndex={0}
              aria-label={`Keyframe ${i + 1}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value(k.y)}
              aria-valuetext={`value ${value(k.y)}%`}
              onPointerDown={onDown(i)}
              onPointerMove={onMove(i)}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onKeyDown={onKey(i)}
              onFocus={() => setActive(i)}
            >
              <circle className="key-hit" cx={k.x} cy={k.y} r="30" />
              <rect
                className={last ? 'key key-lime' : 'key'}
                x={k.x - size / 2}
                y={k.y - size / 2}
                width={size}
                height={size}
                rx="3"
                transform={`rotate(45 ${k.x} ${k.y})`}
              />
            </g>
          );
        })}
      </svg>

      <div className="graph-bar">
        <span>Drag a keyframe to reshape the motion.</span>
        <button type="button" className="graph-btn" onClick={play}>
          Play
        </button>
        <button
          type="button"
          className="graph-btn"
          onClick={() => {
            setKeys(START);
            setActive(null);
            play();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
