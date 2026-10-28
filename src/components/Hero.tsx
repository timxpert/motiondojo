import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Layers, Sliders, ChevronDown } from 'lucide-react';

interface HeroProps {
  onLearnMore: () => void;
  onExplorePath: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLearnMore, onExplorePath }) => {
  const [activeFrame, setActiveFrame] = useState(24);
  const [isPlaying, setIsPlaying] = useState(true);

  // Playhead scrubber simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveFrame((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Background Motion Aura & Radial Glow */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(109, 50, 232, 0.22) 0%, rgba(167, 123, 255, 0.08) 45%, transparent 75%)',
          filter: 'blur(70px)',
          zIndex: 0,
        }}
      />

      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(200, 255, 61, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      {/* SVG Motion Trail / Bezier Trajectory Background Graphic */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.7,
        }}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroGradientPath" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D32E8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A77BFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C8FF3D" stopOpacity="0.85" />
          </linearGradient>
          <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Motion Path */}
        <path
          d="M -100 450 C 300 200, 450 650, 850 350 C 1150 120, 1300 500, 1550 300"
          stroke="url(#heroGradientPath)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          className="animate-trail"
          filter="url(#trailGlow)"
        />

        {/* Secondary Coordinate Grid Guides */}
        <path
          d="M 200 150 L 1240 150 M 200 450 L 1240 450 M 200 750 L 1240 750"
          stroke="rgba(167, 123, 255, 0.06)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <path
          d="M 350 100 L 350 800 M 720 100 L 720 800 M 1090 100 L 1090 800"
          stroke="rgba(167, 123, 255, 0.06)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="dojo-container relative" style={{ zIndex: 2 }}>
        {/* Eyebrow Community Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <div
            className="pill-badge animate-pulse-glow"
            style={{
              padding: '0.45rem 1.1rem',
              gap: '0.6rem',
              backdropFilter: 'blur(8px)',
              cursor: 'default',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                transform: 'rotate(45deg)',
                backgroundColor: 'var(--color-kinetic-lime)',
                display: 'inline-block',
                boxShadow: '0 0 8px var(--color-kinetic-lime)',
              }}
            />
            <span style={{ letterSpacing: '0.12em', fontSize: '0.78rem' }}>
              EXCLUSIVE SMARTPHONE MOTION COMMUNITY
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 5.8vw, 5.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: '1.75rem',
              color: 'var(--text-primary)',
            }}
          >
            You were never meant to{' '}
            <span className="text-gradient" style={{ position: 'relative', display: 'inline' }}>
              figure it all out alone.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '820px',
              margin: '0 auto 2.5rem',
              fontWeight: 400,
            }}
          >
            Motion design is more than learning how to animate. It's discovering your creative voice,
            finding people who understand your ambition, and building something you can be proud of.
          </p>

          {/* Hero CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
            }}
          >
            {/* Primary CTA: Must open /about */}
            <button
              onClick={onLearnMore}
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '0.95rem 2.25rem' }}
            >
              <span>LEARN MORE</span>
              <ArrowRight size={18} />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExplorePath}
              className="btn-secondary"
              style={{ fontSize: '1rem', padding: '0.95rem 2.25rem' }}
            >
              <Sliders size={18} style={{ color: 'var(--color-kinetic-lime)' }} />
              <span>THE NINJA PATH</span>
            </button>
          </div>
        </div>

        {/* Original Motion-Design Interactive Composition: Smartphone Keyframe Timeline */}
        <div
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            borderRadius: '1.25rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            padding: '1.25rem 1.75rem',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-lg)',
          }}
          className="dojo-card"
        >
          {/* Top Interface Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'var(--badge-bg)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  color: 'var(--color-kinetic-lime)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                <Layers size={13} />
                <span>ALIGHT MOTION CANVAS</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>1080 × 1920 • 60 FPS</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: isPlaying ? 'var(--color-kinetic-lime)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <Play size={12} fill={isPlaying ? 'currentColor' : 'none'} />
                <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
              </button>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-electric-lavender)',
                }}
              >
                00:00:{activeFrame.toString().padStart(2, '0')}f
              </span>
            </div>
          </div>

          {/* Interactive Timeline Track */}
          <div style={{ position: 'relative', margin: '1.75rem 0 1.25rem' }}>
            <div className="timeline-track">
              <div
                className="timeline-progress"
                style={{ width: `${(activeFrame / 60) * 100}%` }}
              />
              <div
                className="timeline-scrubber"
                style={{ left: `${(activeFrame / 60) * 100}%` }}
              />
            </div>

            {/* Keyframe Markers Along The Timeline */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.85rem',
                position: 'relative',
              }}
            >
              {[
                { f: 0, label: 'Origin', type: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
                { f: 18, label: 'Anticipation', type: 'ease-in-back' },
                { f: 36, label: 'Velocity Peak', type: 'kinetic-lime' },
                { f: 48, label: 'Overshoot', type: 'spring(1.4)' },
                { f: 60, label: 'Resolution', type: 'Black Belt' },
              ].map((kf, i) => {
                const isPassed = activeFrame >= kf.f;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveFrame(kf.f);
                      setIsPlaying(false);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div
                      className="keyframe-diamond"
                      style={{
                        backgroundColor: isPassed
                          ? 'var(--color-kinetic-lime)'
                          : 'var(--border-medium)',
                        boxShadow: isPassed ? '0 0 10px rgba(200, 255, 61, 0.8)' : 'none',
                        width: '10px',
                        height: '10px',
                        marginBottom: '6px',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: isPassed ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {kf.label}
                    </span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: 'monospace',
                        color: 'var(--color-electric-lavender)',
                        opacity: 0.8,
                      }}
                    >
                      {kf.f}f
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3.5rem',
            opacity: 0.65,
            transition: 'opacity 0.2s ease',
          }}
        >
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            SCROLL TO ENTER THE DOJO
          </span>
          <ChevronDown
            size={18}
            style={{ marginTop: '4px', animation: 'keyframeFloat 2.5s infinite ease-in-out' }}
          />
        </div>
      </div>
    </section>
  );
};
