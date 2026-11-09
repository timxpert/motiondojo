'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SoundOffIcon, SoundOnIcon } from './Icons';

const POSTER = '/images/hero-video-poster.webp';

export function HeroVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOnly, setPosterOnly] = useState(false);
  const [load, setLoad] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData =
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduced || saveData) {
      setPosterOnly(true);
      return;
    }

    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
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
    if (load) videoRef.current?.play().catch(() => {});
  }, [load]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <section className="reel" aria-label="Motion Dojo reel">
      <div className="reel-frame" ref={frameRef}>
        {posterOnly ? (
          <img src={POSTER} alt="Motion Dojo reel" />
        ) : (
          <>
            <video
              ref={videoRef}
              src={load ? '/videos/hero.mp4' : undefined}
              poster={POSTER}
              muted={muted}
              loop
              playsInline
              preload="none"
              aria-label="Motion Dojo reel"
            />
            <button type="button" className="reel-sound" onClick={toggleSound} aria-pressed={!muted}>
              {muted ? <SoundOffIcon /> : <SoundOnIcon />}
              {muted ? 'Tap for sound' : 'Mute'}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
