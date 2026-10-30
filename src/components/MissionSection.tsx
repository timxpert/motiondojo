import React from 'react';
import { Target } from 'lucide-react';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          {/* Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-bold uppercase tracking-wider mb-4">
            <Target className="w-3.5 h-3.5" />
            <span>Our Mission</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight leading-tight mb-6">
            Growth demands the right environment, knowledge and proximity.
          </h2>

          {/* Text 1 */}
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-4">
            Most people don’t lack ambition. They lack the right room, the right skills and the right
            people around them. We provide curated environments and practical systems that help
            people overcome inertia and drive execution.
          </p>

          {/* Text 2 */}
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            That is why the ecosystem has three parts: a place to learn, a community to belong to, and
            a space to work.
          </p>
        </div>

        {/* Three Parts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Card 1: A place to learn */}
          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col items-center text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-link)] mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--color-text)] tracking-tight">
              A place to learn
            </h3>
          </div>

          {/* Card 2: A community to belong to */}
          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col items-center text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-link)] mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L21.5 11.5C21.8 11.8 21.8 12.2 21.5 12.5L12 22L2.5 12.5C2.2 12.2 2.2 11.8 2.5 11.5L12 2Z" />
              </svg>
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--color-text)] tracking-tight">
              A community to belong to
            </h3>
          </div>

          {/* Card 3: A space to work */}
          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col items-center text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-link)] mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="5" />
              </svg>
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--color-text)] tracking-tight">
              A space to work
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
