import React from 'react';
import { ArrowUpRight, Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPath, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dojo-midnight)',
        color: '#F7F5FF',
        borderTop: '1px solid var(--border-medium)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Motion Glow */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '250px',
          background: 'radial-gradient(ellipse at bottom, rgba(109, 50, 232, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="dojo-container relative" style={{ zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'var(--gradient-signature)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#140A2E',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    className="keyframe-diamond"
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'var(--color-kinetic-lime)',
                    }}
                  />
                </div>
              </div>

              <span
                className="font-display"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#F7F5FF',
                }}
              >
                MOTION DOJO
              </span>
            </div>

            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.65,
                color: '#C4BAE5',
                marginBottom: '1.5rem',
              }}
            >
              An exclusive community where smartphone motion designers learn, practice, share, and
              grow together.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: 'var(--color-kinetic-lime)',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} />
              <span>Smartphone Motion Ecosystem</span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-electric-lavender)',
                marginBottom: '1.25rem',
              }}
            >
              COMMUNITY
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, '/about')}
                  style={{ color: '#C4BAE5', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  About Motion Dojo
                </a>
              </li>
              <li>
                <a
                  href="#ninja-path"
                  onClick={(e) => handleLinkClick(e, '#ninja-path')}
                  style={{ color: '#C4BAE5', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  The Ninja Path
                </a>
              </li>
              <li>
                <a
                  href="#keyframe-ninjas"
                  onClick={(e) => handleLinkClick(e, '#keyframe-ninjas')}
                  style={{ color: '#C4BAE5', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Keyframe Ninjas
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  onClick={(e) => handleLinkClick(e, '#stories')}
                  style={{ color: '#C4BAE5', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Student Experiences
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, '#faq')}
                  style={{ color: '#C4BAE5', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Sites Column */}
          <div>
            <h4
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-electric-lavender)',
                marginBottom: '1.25rem',
              }}
            >
              ECOSYSTEM SITES
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li>
                <a
                  href="https://blackbelt.motiondojo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#C4BAE5',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.2s',
                  }}
                  className="footer-link"
                >
                  <span>Black Belt in Motion Design</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--color-kinetic-lime)' }} />
                </a>
              </li>
              <li>
                <a
                  href="https://ninjasmotiondojo.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#C4BAE5',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.2s',
                  }}
                  className="footer-link"
                >
                  <span>View All Keyframe Ninjas</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--color-kinetic-lime)' }} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/joinmotiondojo"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#C4BAE5',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.2s',
                  }}
                  className="footer-link"
                >
                  <span>Instagram @joinmotiondojo</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@joinmotiondojo"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#C4BAE5',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.2s',
                  }}
                  className="footer-link"
                >
                  <span>YouTube @joinmotiondojo</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h4
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-electric-lavender)',
                marginBottom: '1.25rem',
              }}
            >
              NAVIGATION
            </h4>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                padding: '0.75rem 1.4rem',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(167, 123, 255, 0.25)',
                color: '#F7F5FF',
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        {/* Closing Line & Copyright Bar */}
        <div
          style={{
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(167, 123, 255, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Official Closing Line */}
          <div
            className="font-display"
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'var(--color-kinetic-lime)',
            }}
          >
            Learn. Practice. Review. Progress.
          </div>

          {/* Copyright Notice */}
          <div style={{ fontSize: '0.85rem', color: '#8F82BA' }}>
            © {new Date().getFullYear()} Motion Dojo. All rights reserved.
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-kinetic-lime) !important;
        }
      `}</style>
    </footer>
  );
};
