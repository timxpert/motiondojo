import React, { useState } from 'react';
import { Play, ExternalLink, Sparkles } from 'lucide-react';
import { STUDENTS_DATA } from '../data/communityData';
import { VideoModal } from './VideoModal';

export const NinjasShowcase: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
    subtitle: string;
  } | null>(null);

  // Spotlight the top 3 featured students as requested by prompt, with easy option to view all 6
  const [showAll, setShowAll] = useState(false);
  const featuredStudents = showAll ? STUDENTS_DATA : STUDENTS_DATA.slice(0, 3);

  return (
    <section
      id="keyframe-ninjas"
      className="section-padding relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="dojo-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          <div>
            <div className="pill-badge" style={{ marginBottom: '1rem' }}>
              <Sparkles size={13} />
              <span>SPOTLIGHT</span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              Meet the Keyframe Ninjas
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                maxWidth: '650px',
                lineHeight: 1.6,
              }}
            >
              Explore real portfolio projects produced by students mastering motion design.
            </p>
          </div>

          {/* External Directory Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            >
              {showAll ? 'Show Top 3' : 'View All 6 Ninjas'}
            </button>

            <a
              href="https://ninjasmotiondojo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
            >
              <span>VIEW ALL KEYFRAME NINJAS</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Editorial Project Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {featuredStudents.map((ninja) => {
            return (
              <div
                key={ninja.id}
                className="dojo-card group"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                  transition: 'all 0.35s var(--ease-spring)',
                }}
              >
                {/* Project Media Preview Container */}
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() =>
                    setSelectedVideo({
                      url: ninja.project.video,
                      title: ninja.project.title,
                      subtitle: `${ninja.name} • ${ninja.specialty}`,
                    })
                  }
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '62%', // Project artwork ratio
                    backgroundColor: 'var(--color-dojo-midnight)',
                  }}
                >
                  <img
                    src={ninja.project.poster}
                    alt={ninja.project.title}
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

                  {/* Gradient Scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(20, 10, 46, 0.2) 0%, rgba(20, 10, 46, 0.75) 100%)',
                    }}
                  />

                  {/* Play Button Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(20, 10, 46, 0.85)',
                      border: '2px solid var(--color-kinetic-lime)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-kinetic-lime)',
                      boxShadow: '0 0 20px rgba(200, 255, 61, 0.35)',
                      transition: 'transform 0.25s var(--ease-spring)',
                    }}
                    className="group-hover:scale-110"
                  >
                    <Play size={22} fill="currentColor" style={{ marginLeft: '3px' }} />
                  </div>

                  {/* Phase & Open to Work Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      display: 'flex',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor:
                          ninja.phase === 'Black Belt'
                            ? 'var(--color-dojo-midnight)'
                            : 'var(--color-motion-violet)',
                        color:
                          ninja.phase === 'Black Belt'
                            ? 'var(--color-kinetic-lime)'
                            : '#F7F5FF',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      {ninja.phase}
                    </span>

                    {ninja.openToWork && (
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(200, 255, 61, 0.2)',
                          color: 'var(--color-kinetic-lime)',
                          border: '1px solid rgba(200, 255, 61, 0.4)',
                        }}
                      >
                        Open to work
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body & Student Details */}
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
                    {/* Student Avatar + Identity */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <img
                        src={ninja.photo}
                        alt={ninja.name}
                        loading="lazy"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid var(--border-medium)',
                        }}
                      />
                      <div>
                        <h4
                          className="font-display"
                          style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            lineHeight: 1.2,
                          }}
                        >
                          {ninja.name}
                        </h4>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: 'var(--color-electric-lavender)',
                            fontWeight: 600,
                          }}
                        >
                          {ninja.specialty} • {ninja.cohort}
                        </span>
                      </div>
                    </div>

                    {/* Capstone Project Title */}
                    <div style={{ marginBottom: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          fontWeight: 700,
                        }}
                      >
                        CAPSTONE PROJECT
                      </span>
                      <h5
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          marginTop: '2px',
                        }}
                      >
                        {ninja.project.title}
                      </h5>
                    </div>

                    {/* Bio / Project Note */}
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {ninja.bio}
                    </p>
                  </div>

                  {/* Bottom Action: Watch Project Video Modal */}
                  <button
                    onClick={() =>
                      setSelectedVideo({
                        url: ninja.project.video,
                        title: ninja.project.title,
                        subtitle: `${ninja.name} • ${ninja.specialty}`,
                      })
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-subtle)',
                      color: 'var(--color-kinetic-lime)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>Watch Capstone Video</span>
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Link */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a
            href="https://ninjasmotiondojo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '0.95rem 2.25rem', fontSize: '0.95rem' }}
          >
            <span>VIEW ALL KEYFRAME NINJAS ON SHOWCASE</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Video Modal Trigger */}
      {selectedVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          subtitle={selectedVideo.subtitle}
        />
      )}
    </section>
  );
};
