import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 backdrop-blur-md shadow-md'
          : 'py-5 bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div className="dojo-container flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 group focus:outline-none"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          {/* Animated Keyframe Diamond Brand Mark */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6D32E8 0%, #A77BFF 60%, #C8FF3D 100%)',
              padding: '2px',
              boxShadow: '0 0 16px rgba(109, 50, 232, 0.4)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="keyframe-diamond"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'var(--color-kinetic-lime)',
                  boxShadow: '0 0 8px rgba(200, 255, 61, 0.7)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="font-display"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--text-primary)',
              }}
            >
              MOTION DOJO
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--color-electric-lavender)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '2px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-kinetic-lime)',
                  boxShadow: '0 0 6px var(--color-kinetic-lime)',
                }}
              />
              Keyframe Ninjas
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          id="desktop-nav"
        >
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: currentPath === '/about' ? 'var(--color-electric-lavender)' : 'var(--text-secondary)',
              transition: 'color 0.2s ease',
              borderBottom: currentPath === '/about' ? '2px solid var(--color-kinetic-lime)' : '2px solid transparent',
              paddingBottom: '2px',
            }}
            className="hover-link"
          >
            About
          </a>
          <a
            href="#ninja-path"
            onClick={(e) => handleLinkClick(e, '#ninja-path')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            className="hover-link"
          >
            The Ninja Path
          </a>
          <a
            href="#keyframe-ninjas"
            onClick={(e) => handleLinkClick(e, '#keyframe-ninjas')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            className="hover-link"
          >
            Keyframe Ninjas
          </a>
          <a
            href="#stories"
            onClick={(e) => handleLinkClick(e, '#stories')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}
            className="hover-link"
          >
            Stories
          </a>
        </nav>

        {/* Action Controls: Theme Switch & Course Portal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Light/Dark Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              transition: 'all 0.25s ease',
            }}
            className="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun size={18} style={{ color: 'var(--color-kinetic-lime)' }} />
            ) : (
              <Moon size={18} style={{ color: 'var(--color-motion-violet)' }} />
            )}
          </button>

          {/* Quick CTA to Black Belt Course Subdomain */}
          <a
            href="https://blackbelt.motiondojo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              backgroundColor: 'var(--pill-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Black Belt Course</span>
            <ArrowUpRight size={14} style={{ color: 'var(--color-kinetic-lime)' }} />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
            }}
            className="md:hidden mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
          className="mobile-drawer"
        >
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: currentPath === '/about' ? 'var(--color-electric-lavender)' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>About Motion Dojo</span>
            <Compass size={18} style={{ color: 'var(--color-electric-lavender)' }} />
          </a>
          <a
            href="#ninja-path"
            onClick={(e) => handleLinkClick(e, '#ninja-path')}
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>The Ninja Path</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-kinetic-lime)' }}>4 Phases</span>
          </a>
          <a
            href="#keyframe-ninjas"
            onClick={(e) => handleLinkClick(e, '#keyframe-ninjas')}
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Keyframe Ninjas</span>
            <Sparkles size={18} style={{ color: 'var(--color-kinetic-lime)' }} />
          </a>
          <a
            href="#stories"
            onClick={(e) => handleLinkClick(e, '#stories')}
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Stories from the Dojo
          </a>

          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <a
              href="https://blackbelt.motiondojo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', textDecoration: 'none', fontSize: '0.88rem' }}
            >
              <span>Visit Black Belt Course</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          #desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        .hover-link:hover {
          color: var(--color-kinetic-lime) !important;
        }
        .theme-toggle-btn:hover {
          border-color: var(--color-electric-lavender);
          transform: rotate(15deg);
        }
      `}</style>
    </header>
  );
};
