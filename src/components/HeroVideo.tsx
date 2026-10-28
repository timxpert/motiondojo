import React, { useState } from 'react';
import { Play, Sparkles, Maximize2 } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const HeroVideo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      style={{
        paddingTop: '1rem',
        paddingBottom: '5rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="dojo-container">
        {/* Cinematic Video Card Frame */}
        <div
          className="group relative cursor-pointer"
          onClick={() => setModalOpen(true)}
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            border: '1px solid var(--border-medium)',
            boxShadow: 'var(--shadow-lg), 0 0 40px rgba(109, 50, 232, 0.2)',
            background: 'var(--color-dojo-midnight)',
            transition: 'transform 0.4s var(--ease-spring), box-shadow 0.4s ease',
          }}
        >
          {/* 16:9 Aspect Ratio Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9
            }}
          >
            {/* Authentic Poster Image */}
            <img
              src="/images/hero-video-poster.webp"
              alt="Motion Dojo Smartphone Motion Showcase"
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.92) contrast(1.05)',
                transition: 'transform 0.7s var(--ease-expo), filter 0.5s ease',
              }}
              onError={(e) => {
                // Fallback if poster webp doesn't load
                (e.target as HTMLImageElement).src = '/images/hero-poster.webp';
              }}
            />

            {/* Gradient Overlay for Cinematic Depth */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(20, 10, 46, 0.3) 0%, rgba(20, 10, 46, 0.2) 40%, rgba(20, 10, 46, 0.85) 100%)',
              }}
            />

            {/* Center Pulsing Play Button */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'var(--gradient-signature)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  boxShadow: '0 0 35px rgba(200, 255, 61, 0.45)',
                  transition: 'transform 0.3s var(--ease-spring)',
                }}
                className="play-btn-circle"
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(20, 10, 46, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play
                    size={32}
                    style={{
                      color: 'var(--color-kinetic-lime)',
                      marginLeft: '4px',
                    }}
                    fill="currentColor"
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(20, 10, 46, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-subtle)',
                  color: '#F7F5FF',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-kinetic-lime)' }} />
                <span>WATCH SHOWCASE REEL</span>
              </div>
            </div>

            {/* Bottom Info Bar in Poster */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                zIndex: 2,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--color-kinetic-lime)',
                    textTransform: 'uppercase',
                  }}
                >
                  CINEMATIC REEL
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                    color: '#F7F5FF',
                    fontWeight: 700,
                    marginTop: '2px',
                  }}
                >
                  Smartphone Motion Design & Student Capstones
                </h3>
              </div>

              <div
                className="hidden sm:flex"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#F7F5FF',
                  fontSize: '0.8rem',
                  opacity: 0.85,
                }}
                id="hero-reel-badge"
              >
                <span>Curated from Black Belt Capstones</span>
                <Maximize2 size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoUrl="https://vimeo.com/1238665663"
        title="Motion Dojo Showcase Reel"
        subtitle="Exploring kinetic title sequences, typography, and smartphone motion workflows."
      />

      <style>{`
        @media (min-width: 640px) {
          #hero-reel-badge {
            display: flex !important;
          }
        }
        .play-btn-circle:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};
