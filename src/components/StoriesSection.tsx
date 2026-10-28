import React, { useState } from 'react';
import { Play, Sparkles, Award } from 'lucide-react';
import { TESTIMONIAL_STORIES } from '../data/communityData';
import { VideoModal } from './VideoModal';
import type { TestimonialStory } from '../types';

export const StoriesSection: React.FC = () => {
  const [activeStory, setActiveStory] = useState<TestimonialStory | null>(null);

  return (
    <section
      id="stories"
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
            <span>STUDENT EXPERIENCES</span>
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
            Stories from the Dojo
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
            Hear directly from students who joined the course, conquered the keyframes, and graduated
            to Black Belt.
          </p>
        </div>

        {/* 3-Column Video Card Gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {TESTIMONIAL_STORIES.map((story) => (
            <div
              key={story.id}
              className="dojo-card group cursor-pointer"
              onClick={() => setActiveStory(story)}
              style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s var(--ease-spring)',
              }}
            >
              {/* Video Thumbnail with Authentic Poster */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '65%', // Aspect ratio
                  backgroundColor: 'var(--color-dojo-midnight)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={story.poster}
                  alt={`Student testimonial by ${story.name}`}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s var(--ease-expo)',
                  }}
                  className="group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(20, 10, 46, 0.2) 0%, rgba(20, 10, 46, 0.75) 100%)',
                  }}
                />

                {/* Center Play Button Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--gradient-signature)',
                    padding: '2px',
                    boxShadow: '0 0 25px rgba(200, 255, 61, 0.4)',
                    transition: 'transform 0.3s var(--ease-spring)',
                  }}
                  className="group-hover:scale-110"
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(20, 10, 46, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-kinetic-lime)',
                    }}
                  >
                    <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />
                  </div>
                </div>

                {/* Tap to Watch Indicator Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(20, 10, 46, 0.85)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--color-kinetic-lime)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Sparkles size={12} />
                  <span>TAP TO WATCH</span>
                </div>
              </div>

              {/* Story Content & Summary */}
              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {story.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-electric-lavender)',
                      }}
                    >
                      {story.role}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic',
                      marginBottom: '1.25rem',
                    }}
                  >
                    "{story.summary}"
                  </p>
                </div>

                {/* Interactive Link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-kinetic-lime)',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Play size={13} fill="currentColor" />
                  <span>Play Graduate Interview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeStory && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveStory(null)}
          videoUrl={activeStory.videoUrl}
          title={`${activeStory.name}'s Story`}
          subtitle={activeStory.role}
        />
      )}
    </section>
  );
};
