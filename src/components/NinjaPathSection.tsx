import React from 'react';
import { Compass, Award } from 'lucide-react';
import { LEARN_MORE_URL } from '@/config/site';

interface Phase {
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PHASES: Phase[] = [
  {
    phase: 'Phase 01',
    title: 'Foundations',
    description: 'Principles, typography, colour and your first animations.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    phase: 'Phase 02',
    title: 'Tools and techniques',
    description: 'Keyframes, the graph editor, effects and camera systems.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2L21.5 11.5C21.8 11.8 21.8 12.2 21.5 12.5L12 22L2.5 12.5C2.2 12.2 2.2 11.8 2.5 11.5L12 2Z" />
      </svg>
    ),
  },
  {
    phase: 'Phase 03',
    title: 'Creative execution',
    description: 'Turn concepts into finished motion graphics, UI animation and product visuals.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5 3C5 2.44772 5.44772 2 6 2H18C18.5523 2 19 2.44772 19 3C19 3.55228 18.5523 4 18 4H17.5V7C17.5 9.07 16.03 10.8 14.05 11.36L12.98 11.66C12.33 11.85 12.33 12.15 12.98 12.34L14.05 12.64C16.03 13.2 17.5 14.93 17.5 17V20H18C18.5523 20 19 20.4477 19 21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21C5 20.4477 5.44772 20 6 20H6.5V17C6.5 14.93 7.97 13.2 9.95 12.64L11.02 12.34C11.67 12.15 11.67 11.85 11.02 11.66L9.95 11.36C7.97 10.8 6.5 9.07 6.5 7V4H6C5.44772 4 5 3.55228 5 3Z" />
      </svg>
    ),
  },
  {
    phase: 'Phase 04',
    title: 'Portfolio and professional growth',
    description: 'Build your portfolio, pricing and personal brand for real clients.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
      </svg>
    ),
  },
];

export const NinjaPathSection: React.FC = () => {
  return (
    <section id="ninja-path" className="py-16 sm:py-24 border-b border-[var(--color-border)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured progression</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            The Ninja Path
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed">
            Every Keyframe Ninja progresses through 4 rigorous phases before earning their Black Belt in
            Motion Design.
          </p>
        </div>

        {/* 4 Phase Cards (No prices, no payment chips) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PHASES.map((p) => (
            <div
              key={p.phase}
              className="relative rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-link)] bg-[var(--color-surface-2)] px-2.5 py-1 rounded-full">
                    {p.phase}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-link)]">
                    {p.icon}
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-xl text-[var(--color-text)] tracking-tight mb-2.5">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Milestone Card */}
        <div className="mt-8 rounded-card-lg border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-2)] to-[var(--color-surface)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-[#14102A] border border-[#C8FF3D]/40 flex items-center justify-center text-[#C8FF3D] shrink-0 shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-link)] mb-1">
                <span>Final milestone</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--color-text)] tracking-tight">
                Black Belt in Motion Design
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 max-w-xl">
                The Certificate of Mastery is earned, not given.
              </p>
            </div>
          </div>

          <a
            href={LEARN_MORE_URL}
            target="_self"
            className="shrink-0 px-6 py-3 rounded-full bg-[#C8FF3D] hover:bg-[#bbf629] text-[#14102A] font-heading font-extrabold text-xs sm:text-sm tracking-tight shadow-sm active:scale-95 transition-all"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};
