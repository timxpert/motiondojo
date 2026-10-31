'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Compass, Play } from 'lucide-react';
import { LEARN_MORE_URL } from '@/config/site';

interface Phase {
  phase: string;
  title: string;
  description: string;
  shapeName: string;
  shapeIcon: React.ReactNode;
}

const PHASES: Phase[] = [
  {
    phase: 'Phase 01',
    title: 'Foundations',
    description: 'Principles, typography, colour and your first animations.',
    shapeName: 'plus',
    shapeIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    phase: 'Phase 02',
    title: 'Tools and techniques',
    description: 'Keyframes, the graph editor, effects and camera systems.',
    shapeName: 'diamond',
    shapeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L21.5 11.5C21.8 11.8 21.8 12.2 21.5 12.5L12 22L2.5 12.5C2.2 12.2 2.2 11.8 2.5 11.5L12 2Z" />
      </svg>
    ),
  },
  {
    phase: 'Phase 03',
    title: 'Creative execution',
    description: 'Turn concepts into finished motion graphics, UI animation and product visuals.',
    shapeName: 'hourglass',
    shapeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 3C5 2.45 5.45 2 6 2H18C18.55 2 19 2.45 19 3C19 3.55 18.55 4 18 4H17.5V7C17.5 9.07 16.03 10.8 14.05 11.36L12.98 11.66C12.33 11.85 12.33 12.15 12.98 12.34L14.05 12.64C16.03 13.2 17.5 14.93 17.5 17V20H18C18.55 20 19 20.45 19 21C19 21.55 18.55 22 18 22H6C5.45 22 5 21.55 5 21C5 20.45 5.45 20 6 20H6.5V17C6.5 14.93 7.97 13.2 9.95 12.64L11.02 12.34C11.67 12.15 11.67 11.85 11.02 11.66L9.95 11.36C7.97 10.8 6.5 9.07 6.5 7V4H6C5.45 4 5 3.55 5 3Z" />
      </svg>
    ),
  },
  {
    phase: 'Phase 04',
    title: 'Portfolio and professional growth',
    description: 'Build your portfolio, pricing and personal brand for real clients.',
    shapeName: 'circle',
    shapeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export const NinjaPathSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="ninja-path" ref={sectionRef} className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned Section Header */}
        <div className="text-left max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured progression</span>
          </div>

          <h2
            className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15] mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              fontWeight: 600,
            }}
          >
            The Ninja Path
          </h2>

          <p className="text-base sm:text-lg lg:text-[1.125rem] text-[var(--color-muted)] font-normal leading-[1.7] max-w-2xl">
            Every Keyframe Ninja progresses through 4 rigorous phases before earning their Black Belt in
            Motion Design.
          </p>
        </div>

        {/* Phase Cards Container with Thin Connecting Line */}
        <div className="relative">
          {/* Thin connecting line across cards on desktop that draws as section enters view */}
          <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[2px] bg-[var(--color-border)] z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6D32E8] via-[#A77BFF] to-[#C8FF3D] transition-all duration-1000 ease-out"
              style={{
                width: isVisible ? '100%' : '0%',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PHASES.map((p, idx) => (
              <div
                key={p.phase}
                className="relative rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
              >
                <div>
                  {/* Top Row: Phase Tag & Large Animated Brand Shape */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-link)] bg-[var(--color-surface-2)] px-2.5 py-1 rounded-full">
                      {p.phase}
                    </span>

                    {/* Large Animated Brand Shape */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm transition-transform ${
                        idx % 2 === 0
                          ? 'bg-[#6D32E8] text-[#C8FF3D] animate-shape-drift'
                          : 'bg-[#C8FF3D] text-[#14102A] animate-shape-drift-alt'
                      }`}
                    >
                      {p.shapeIcon}
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-[var(--color-text)] tracking-tight mb-2.5">
                    {p.title}
                  </h3>

                  <p className="text-sm text-[var(--color-muted)] leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Milestone Card with Large Play Triangle */}
        <div className="mt-8 rounded-card-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-soft">
          <div className="flex items-start sm:items-center gap-5 text-left">
            {/* Milestone Large Play Triangle Shape */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D32E8] to-[#14102A] border border-[#C8FF3D]/40 flex items-center justify-center text-[#C8FF3D] shrink-0 shadow-md animate-shape-drift">
              <Play className="w-6 h-6 fill-[#C8FF3D] ml-0.5" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-link)] mb-1">
                <span>Final milestone</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-[var(--color-text)] tracking-tight">
                Black Belt in Motion Design
              </h3>
              <p className="text-sm text-[var(--color-muted)] mt-1 max-w-xl font-normal leading-relaxed">
                The Certificate of Mastery is earned, not given.
              </p>
            </div>
          </div>

          <a
            href={LEARN_MORE_URL}
            target="_self"
            className="w-full sm:w-auto shrink-0 px-7 py-3.5 rounded-full bg-[#C8FF3D] hover:bg-[#bcf728] text-[#14102A] font-semibold text-sm tracking-tight shadow-sm active:scale-95 transition-all text-center"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};
