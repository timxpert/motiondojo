import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Award, Zap, Layers } from 'lucide-react';
import { NINJA_PHASES } from '../data/communityData';

export const NinjaPath: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const activePhase = NINJA_PHASES[activePhaseIndex];

  return (
    <section
      id="ninja-path"
      className="section-padding relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="dojo-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <Award size={13} />
            <span>STRUCTURED PROGRESSION</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
            }}
          >
            The Ninja Path
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Every Keyframe Ninja progresses through 4 rigorous phases before earning their{' '}
            <span style={{ color: 'var(--color-kinetic-lime)', fontWeight: 600 }}>
              Black Belt in Motion Design.
            </span>
          </p>
        </div>

        {/* Phase Navigation Tabs / Progress Rail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {NINJA_PHASES.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={phase.number}
                onClick={() => setActivePhaseIndex(idx)}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '1rem',
                  textAlign: 'left',
                  backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: isSelected
                    ? '2px solid var(--color-kinetic-lime)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-md), 0 0 15px rgba(200, 255, 61, 0.2)' : 'none',
                  transition: 'all 0.25s var(--ease-spring)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="phase-tab-btn"
              >
                {/* Active Indicator Top Line */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'var(--gradient-signature)',
                    }}
                  />
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: isSelected ? 'var(--color-kinetic-lime)' : 'var(--text-muted)',
                      fontFamily: 'monospace',
                    }}
                  >
                    PHASE {phase.number}
                  </span>

                  <div
                    className="keyframe-diamond"
                    style={{
                      backgroundColor: isSelected
                        ? 'var(--color-kinetic-lime)'
                        : 'var(--border-medium)',
                      width: '8px',
                      height: '8px',
                      boxShadow: isSelected ? '0 0 8px var(--color-kinetic-lime)' : 'none',
                    }}
                  />
                </div>

                <h4
                  className="font-display"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {phase.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of the Active Phase */}
        <div
          className="dojo-card"
          style={{
            padding: '3rem',
            borderRadius: '1.75rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left: Phase Description & Focus */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--color-kinetic-lime)',
                  lineHeight: 1,
                }}
              >
                0{activePhaseIndex + 1}
              </span>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-electric-lavender)',
                    fontWeight: 700,
                  }}
                >
                  {activePhase.subtitle}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {activePhase.title}
                </h3>
              </div>
            </div>

            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}
            >
              {activePhase.description}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'var(--pill-bg)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-electric-lavender)',
              }}
            >
              <Zap size={15} style={{ color: 'var(--color-kinetic-lime)' }} />
              <span>{activePhase.tag}</span>
            </div>
          </div>

          {/* Right: Technical Curriculum Highlights */}
          <div
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '2.25rem',
              borderRadius: '1.25rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Layers size={14} style={{ color: 'var(--color-kinetic-lime)' }} />
              <span>KEYFRAME COMPETENCIES</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activePhase.skills.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <CheckCircle2
                    size={17}
                    style={{ color: 'var(--color-kinetic-lime)', flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Milestone Banner: Black Belt in Motion Design */}
        <div
          style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #1C103F 0%, #29175C 60%, #140A2E 100%)',
            border: '1px solid var(--border-accent)',
            padding: '2.5rem 3rem',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Background Glow */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              right: '-5%',
              top: '-20%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(200, 255, 61, 0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(200, 255, 61, 0.15)',
                color: '#C8FF3D',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
              }}
            >
              <Award size={14} />
              <span>FINAL MILESTONE</span>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
                fontWeight: 700,
                color: '#F7F5FF',
                marginBottom: '0.5rem',
              }}
            >
              Black Belt in Motion Design
            </h3>

            <p style={{ fontSize: '1rem', color: '#C4BAE5', lineHeight: 1.6 }}>
              Submit 2 completed capstone projects for mentor grading. Successful ninjas earn the
              verified Black Belt credential and permanent inclusion on the public showcase.
            </p>
          </div>

          {/* CTA: LEARN MORE (Must link to https://blackbelt.motiondojo.com) */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <a
              href="https://blackbelt.motiondojo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{ textDecoration: 'none', padding: '1rem 2.25rem' }}
            >
              <span>LEARN MORE ON COURSE SITE</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
