import React, { useState } from 'react';
import { BookOpen, Users, Briefcase, Sparkles } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const pillars = [
    {
      id: 'learn',
      title: 'LEARN',
      subtitle: 'Knowledge & Craft',
      description: 'Build knowledge and develop your creative skills through structured frameworks and intentional speed curve control.',
      accent: '#6D32E8',
      icon: BookOpen,
      metric: '01',
      details: 'Master mobile animation principles, Alight Motion depth, and pacing before touching complex projects.',
    },
    {
      id: 'belong',
      title: 'BELONG',
      subtitle: 'Proximity & Culture',
      description: 'Connect with people who share your passion and understand your journey. No more creating in isolation.',
      accent: '#A77BFF',
      icon: Users,
      metric: '02',
      details: 'Daily peer critique, private discord channels, live feedback circles, and lifelong creative camaraderie.',
    },
    {
      id: 'work',
      title: 'WORK',
      subtitle: 'Execution & Capstones',
      description: 'Put your knowledge into practice and create meaningful projects evaluated against agency standards.',
      accent: '#C8FF3D',
      icon: Briefcase,
      metric: '03',
      details: 'Two commercial capstone projects that turn your phone into a high-tier motion portfolio machine.',
    },
  ];

  return (
    <section className="section-padding relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="dojo-container">
        {/* Section Header */}
        <div style={{ maxWidth: '880px', margin: '0 auto 4.5rem', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <Sparkles size={13} />
            <span>OUR MISSION</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '1.75rem',
              color: 'var(--text-primary)',
            }}
          >
            Growth demands the right{' '}
            <span className="text-gradient">environment, knowledge and proximity.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '750px',
              margin: '0 auto',
            }}
          >
            Most people don't lack ambition. They lack the right room, the right skills and the
            right people around them. We provide curated environments and practical systems that
            help people overcome inertia and drive execution.
          </p>

          <p
            style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--color-electric-lavender)',
              marginTop: '1.25rem',
            }}
          >
            That is why the ecosystem has three parts: a place to learn, a community to belong to,
            and a space to work.
          </p>
        </div>

        {/* Visual Composition: 3 Interconnected Kinetic Environments */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2rem',
            position: 'relative',
          }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isHovered = activeStep === index;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActiveStep(index)}
                className="dojo-card group"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '1.5rem',
                  border: isHovered
                    ? `1px solid ${pillar.accent}`
                    : '1px solid var(--border-subtle)',
                  boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  backgroundColor: 'var(--bg-card)',
                  transition: 'all 0.35s var(--ease-spring)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                <div>
                  {/* Top Row: Metric & Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '2rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: pillar.accent,
                        opacity: 0.85,
                        lineHeight: 1,
                      }}
                    >
                      {pillar.metric}
                    </span>

                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pillar.accent,
                        boxShadow: `0 0 20px ${pillar.accent}33`,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {pillar.subtitle}
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.85rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginTop: '4px',
                      }}
                    >
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Core Description */}
                  <p
                    style={{
                      fontSize: '1.02rem',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      marginBottom: '1.75rem',
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Expansion Feature */}
                <div
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem',
                    color: 'var(--color-electric-lavender)',
                    lineHeight: 1.5,
                  }}
                >
                  {pillar.details}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
