import React from 'react';
import { Heart, Zap, Shield, Users } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-dojo-midnight)',
        color: '#F7F5FF',
        position: 'relative',
      }}
    >
      {/* Background Radial Glow & Abstract Converging Vectors */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(109, 50, 232, 0.28) 0%, rgba(167, 123, 255, 0.12) 40%, transparent 75%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      {/* Geometric Keyframe Matrix Vectors */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <circle cx="500" cy="300" r="180" stroke="#A77BFF" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="500" cy="300" r="280" stroke="#6D32E8" strokeWidth="1" />
        <line x1="100" y1="100" x2="900" y2="500" stroke="rgba(200, 255, 61, 0.15)" strokeWidth="1" />
        <line x1="100" y1="500" x2="900" y2="100" stroke="rgba(200, 255, 61, 0.15)" strokeWidth="1" />
      </svg>

      <div className="dojo-container relative" style={{ zIndex: 2 }}>
        {/* Eyebrow */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            className="pill-badge"
            style={{
              backgroundColor: 'rgba(167, 123, 255, 0.15)',
              color: '#C8FF3D',
              borderColor: 'rgba(200, 255, 61, 0.3)',
            }}
          >
            <Heart size={13} fill="#C8FF3D" />
            <span>COMMUNITY PHILOSOPHY</span>
          </div>
        </div>

        {/* Oversized Clash Display Headline */}
        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '3rem',
              color: '#F7F5FF',
            }}
          >
            A skill can change what you do.{' '}
            <span className="text-gradient" style={{ display: 'inline', fontWeight: 800 }}>
              The right community can change how far you go.
            </span>
          </h2>

          {/* Emotional Philosophy Copy */}
          <div
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              padding: '2.5rem 3rem',
              borderRadius: '1.75rem',
              backgroundColor: 'rgba(28, 16, 63, 0.65)',
              border: '1px solid rgba(167, 123, 255, 0.25)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.25rem, 2.3vw, 1.85rem)',
                lineHeight: 1.5,
                color: '#F7F5FF',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              "You deserve a place where your questions matter, your progress is celebrated, your
              work gets better through practice, and the{' '}
              <span
                style={{
                  color: 'var(--color-kinetic-lime)',
                  fontWeight: 700,
                  textShadow: '0 0 20px rgba(200, 255, 61, 0.4)',
                }}
              >
                people around you want to see you win.
              </span>"
            </p>

            {/* Core Values Triad */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(167, 123, 255, 0.2)',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Zap size={20} style={{ color: 'var(--color-kinetic-lime)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F7F5FF' }}>No Lone Wolfing</h4>
                  <p style={{ fontSize: '0.8rem', color: '#C4BAE5', marginTop: '2px' }}>
                    Grow 10x faster with continuous peer reviews.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Shield size={20} style={{ color: 'var(--color-electric-lavender)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F7F5FF' }}>Radical Standards</h4>
                  <p style={{ fontSize: '0.8rem', color: '#C4BAE5', marginTop: '2px' }}>
                    No vanity metrics. Pure animation craft.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Users size={20} style={{ color: 'var(--color-kinetic-lime)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F7F5FF' }}>Lifelong Network</h4>
                  <p style={{ fontSize: '0.8rem', color: '#C4BAE5', marginTop: '2px' }}>
                    Collaborate, refer clients, and rise together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
