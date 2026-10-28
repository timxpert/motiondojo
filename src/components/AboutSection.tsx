import React, { useState } from 'react';
import { ArrowRight, Activity, Compass, RefreshCw } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const [selectedCurve, setSelectedCurve] = useState<'punch' | 'snap' | 'drift' | 'linear'>('punch');
  const [replayKey, setReplayKey] = useState(0);

  const curves = {
    punch: {
      name: 'Kinetic Punch',
      bezier: 'cubic-bezier(0.16, 1, 0.3, 1)',
      svgPath: 'M 10 170 C 40 10, 80 10, 270 10',
      description: 'Explosive start with gentle settling. The signature commercial title easing.',
      timing: '1.2s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    snap: {
      name: 'Elastic Snap',
      bezier: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      svgPath: 'M 10 170 C 80 80, 150 -30, 270 10',
      description: 'Playful overshoot that springs past the target before snapping back.',
      timing: '1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    drift: {
      name: 'Cinematic S-Curve',
      bezier: 'cubic-bezier(0.65, 0, 0.35, 1)',
      svgPath: 'M 10 170 C 130 170, 150 10, 270 10',
      description: 'Symmetrical acceleration and deceleration for luxurious camera motion.',
      timing: '1.5s cubic-bezier(0.65, 0, 0.35, 1)',
    },
    linear: {
      name: 'Default Linear',
      bezier: 'linear',
      svgPath: 'M 10 170 L 270 10',
      description: 'Constant mechanical rate. What amateur smartphone animations look like.',
      timing: '1.2s linear',
    },
  };

  const current = curves[selectedCurve];

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div className="dojo-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Large Editorial Statement */}
          <div>
            <div className="pill-badge" style={{ marginBottom: '1.5rem' }}>
              <Compass size={13} />
              <span>THE COMMUNITY</span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 600,
                color: 'var(--color-electric-lavender)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              About Motion Dojo
            </h2>

            <p
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                marginBottom: '2rem',
              }}
            >
              Motion Dojo is an exclusive community where{' '}
              <span className="text-gradient">smartphone motion designers</span> learn, practice,
              share, and grow together.
            </p>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem',
                maxWidth: '520px',
              }}
            >
              Instead of watching endless disconnected tutorials on small screens, Keyframe Ninjas
              train with intentional frameworks, frame-by-frame critique, and peer accountability.
            </p>

            <button
              onClick={onLearnMore}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem' }}
            >
              <span>EXPLORE OUR STORY</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* Right Column: Original Motion-Design Visualizer - The Speed Graph Simulator */}
          <div
            className="dojo-card"
            style={{
              padding: '2rem',
              borderRadius: '1.5rem',
              boxShadow: 'var(--shadow-lg)',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} style={{ color: 'var(--color-kinetic-lime)' }} />
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                  }}
                >
                  SPEED GRAPH LAB
                </span>
              </div>

              <button
                onClick={() => setReplayKey((k) => k + 1)}
                title="Replay animation"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--color-electric-lavender)',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--pill-bg)',
                }}
              >
                <RefreshCw size={12} />
                <span>REPLAY</span>
              </button>
            </div>

            {/* SVG Speed Curve Graph */}
            <div
              style={{
                height: '180px',
                width: '100%',
                position: 'relative',
                backgroundColor: 'rgba(10, 4, 25, 0.4)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 280 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Graph grid lines */}
                <line x1="10" y1="90" x2="270" y2="90" stroke="rgba(167, 123, 255, 0.1)" strokeDasharray="3 3" />
                <line x1="140" y1="10" x2="140" y2="170" stroke="rgba(167, 123, 255, 0.1)" strokeDasharray="3 3" />

                {/* Animated Curve Path */}
                <path
                  d={current.svgPath}
                  stroke="var(--color-kinetic-lime)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    transition: 'd 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Start and End Keyframe Diamonds */}
                <circle cx="10" cy="170" r="5" fill="#6D32E8" />
                <circle cx="270" cy="10" r="5" fill="#C8FF3D" />
              </svg>

              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '12px',
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: 'var(--color-kinetic-lime)',
                }}
              >
                {current.bezier}
              </div>
            </div>

            {/* Interactive Live Element Test Chamber */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '10px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>MOTION RESPONSE</span>
                <span>0% ─── 100%</span>
              </div>

              <div
                style={{
                  position: 'relative',
                  height: '36px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '9999px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  key={`${selectedCurve}-${replayKey}`}
                  className="interactive-moving-keyframe"
                  style={{
                    height: '28px',
                    width: '60px',
                    borderRadius: '9999px',
                    background: 'var(--gradient-signature)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#140A2E',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    boxShadow: '0 0 15px rgba(200, 255, 61, 0.5)',
                    animation: `curveMove ${current.timing} infinite alternate`,
                  }}
                >
                  60 FPS
                </div>
              </div>
            </div>

            {/* Curve Selector Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {(Object.keys(curves) as Array<keyof typeof curves>).map((key) => {
                const isSelected = selectedCurve === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCurve(key);
                      setReplayKey((k) => k + 1);
                    }}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      backgroundColor: isSelected ? 'var(--color-motion-violet)' : 'var(--bg-card)',
                      color: isSelected ? '#F7F5FF' : 'var(--text-secondary)',
                      border: isSelected
                        ? '1px solid var(--color-kinetic-lime)'
                        : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {curves[key].name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes curveMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100% + 140px));
          }
        }
      `}</style>
    </section>
  );
};
