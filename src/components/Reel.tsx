'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SoundOff, SoundOn } from './Icons';

const POSTER = '/images/hero-video-poster.webp';

/** Full-width 16:9 video under the hero. Lazy-loads, and shows only the poster for reduced motion or data saver. */
export function Reel() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [still, setStill] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) {
      setStill(true);
      return;
    }
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (load) video.current?.play().catch(() => {});
  }, [load]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <section className="reel" ref={box} aria-label="Motion Dojo reel">
      {still || failed ? (
        <img src={POSTER} alt="Motion Dojo" />
      ) : (
        <>
          <video
            ref={video}
            src={load ? '/videos/hero.mp4' : undefined}
            poster={POSTER}
            muted={muted}
            loop
            playsInline
            preload="none"
            onError={() => setFailed(true)}
            aria-label="Motion Dojo reel"
          />
          <button type="button" className="reel-sound" onClick={toggle} aria-pressed={!muted}>
            {muted ? <SoundOff /> : <SoundOn />}
            {muted ? 'Tap for sound' : 'Mute'}
          </button>
        </>
      )}
    </section>
  );
}
