import React from 'react';
import { ArrowRight, Compass, BookOpen, Users, Briefcase, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '5rem' }}>
      {/* Back to Home Button */}
      <div className="dojo-container" style={{ marginBottom: '2rem' }}>
        <button
          onClick={onNavigateHome}
          className="btn-secondary"
          style={{
            padding: '0.55rem 1.25rem',
            fontSize: '0.85rem',
            gap: '6px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero Section of About Page */}
      <section style={{ paddingBottom: '5rem' }}>
        <div className="dojo-container">
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <div className="pill-badge" style={{ marginBottom: '1.5rem' }}>
              <Compass size={14} />
              <span>ABOUT MOTION DOJO</span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '2rem',
                color: 'var(--text-primary)',
              }}
            >
              Find your people.{' '}
              <span className="text-gradient">Develop your craft.</span> Discover what's possible.
            </h1>

            {/* Official Introduction */}
            <p
              style={{
                fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              Motion Dojo is built on the belief that growth becomes more meaningful when you have the
              right environment, the right knowledge, and the right people around you.
            </p>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '820px',
                margin: '0 auto 3rem',
              }}
            >
              We bring smartphone motion designers together to learn, practice, share ideas, and
              become better at their craft.
            </p>
          </div>

          {/* Abstract Motion Illustration Visual Break */}
          <div
            style={{
              maxWidth: '980px',
              margin: '0 auto',
              borderRadius: '1.75rem',
              overflow: 'hidden',
              backgroundColor: 'var(--color-dojo-midnight)',
              border: '1px solid var(--border-medium)',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '42%',
                overflow: 'hidden',
              }}
            >
              {/* Background Poster */}
              <img
                src="/images/hero-poster.webp"
                alt="Motion Dojo Creative Atmosphere"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.5,
                  filter: 'contrast(1.2)',
                }}
              />

              {/* Foreground Visual Overlay with Animated Speed Curve */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at center, rgba(109, 50, 232, 0.45) 0%, rgba(20, 10, 46, 0.9) 80%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    className="keyframe-diamond"
                    style={{ backgroundColor: 'var(--color-kinetic-lime)', width: '12px', height: '12px' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                      fontWeight: 700,
                      color: '#F7F5FF',
                      letterSpacing: '0.04em',
                    }}
                  >
                    THE SMARTPHONE CREATIVE REVOLUTION
                  </span>
                  <div
                    className="keyframe-diamond"
                    style={{ backgroundColor: 'var(--color-kinetic-lime)', width: '12px', height: '12px' }}
                  />
                </div>

                <p
                  style={{
                    color: '#C4BAE5',
                    fontSize: '0.95rem',
                    maxWidth: '580px',
                    lineHeight: 1.6,
                  }}
                >
                  Crafting broadcast-grade motion sequences from the palms of our hands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Philosophy */}
      <section
        style={{
          paddingTop: '5rem',
          paddingBottom: '5rem',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="dojo-container">
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-kinetic-lime)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              GUIDING PRINCIPLES
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '2rem',
              }}
            >
              Our Philosophy
            </h2>

            <div
              className="dojo-card"
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                "We believe that talent grows through practice, that creativity becomes stronger
                through collaboration, and that no creator should have to navigate the entire
                journey alone."
              </p>

              <div
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--color-electric-lavender)',
                }}
              >
                Motion Dojo exists to make room for that growth.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Ecosystem */}
      <section style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="dojo-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-electric-lavender)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              THE THREE DOJO PILLARS
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Our Ecosystem
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {/* Learn */}
            <div
              className="dojo-card"
              style={{
                padding: '2.5rem',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(109, 50, 232, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-motion-violet)',
                    marginBottom: '1.75rem',
                  }}
                >
                  <BookOpen size={26} />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Learn.
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  Build the skills and understanding to bring your ideas to life.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  color: 'var(--color-electric-lavender)',
                  fontWeight: 600,
                }}
              >
                SPEED GRAPHS • RIGGING • EASING
              </div>
            </div>

            {/* Belong */}
            <div
              className="dojo-card"
              style={{
                padding: '2.5rem',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(167, 123, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-electric-lavender)',
                    marginBottom: '1.75rem',
                  }}
                >
                  <Users size={26} />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Belong.
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  Find a community of people who share your passion and understand your ambition.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  color: 'var(--color-electric-lavender)',
                  fontWeight: 600,
                }}
              >
                CRITIQUES • PEER ACCELERATION • NETWORK
              </div>
            </div>

            {/* Work */}
            <div
              className="dojo-card"
              style={{
                padding: '2.5rem',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(200, 255, 61, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-kinetic-lime)',
                    marginBottom: '1.75rem',
                  }}
                >
                  <Briefcase size={26} />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Work.
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                  }}
                >
                  Put your skills into practice, create meaningful projects, and grow through execution.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  color: 'var(--color-kinetic-lime)',
                  fontWeight: 600,
                }}
              >
                CAPSTONE PROJECTS • BLACK BELT EVALUATION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to Action Section */}
      <section
        style={{
          paddingTop: '5rem',
          paddingBottom: '5rem',
          backgroundColor: 'var(--color-dojo-midnight)',
          color: '#F7F5FF',
          borderTop: '1px solid var(--border-medium)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="dojo-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '1.75rem',
                color: '#F7F5FF',
              }}
            >
              Your journey is yours.{' '}
              <span className="text-gradient">You don't have to take it alone.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                lineHeight: 1.7,
                color: '#C4BAE5',
                marginBottom: '3rem',
                maxWidth: '720px',
                margin: '0 auto 3rem',
              }}
            >
              Whether you're beginning your first animation or finding new ways to challenge
              yourself, there is room to learn, create, and grow.
            </p>

            {/* CTA: EXPLORE THE NINJA PATH -> https://blackbelt.motiondojo.com */}
            <div>
              <a
                href="https://blackbelt.motiondojo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                style={{
                  textDecoration: 'none',
                  fontSize: '1.05rem',
                  padding: '1.1rem 2.75rem',
                  boxShadow: '0 0 35px rgba(200, 255, 61, 0.45)',
                }}
              >
                <span>EXPLORE THE NINJA PATH</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
