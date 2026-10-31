import React from 'react';
import { Target } from 'lucide-react';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Label: Our Mission */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-semibold uppercase tracking-wider mb-6">
          <Target className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>

        {/* Large Statement Text */}
        <p
          className="text-[var(--color-text)] font-medium leading-[1.4] text-left"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 500,
            maxWidth: '32ch',
          }}
        >
          To empower aspiring and emerging smartphone motion designers to develop their creative
          abilities, master motion design, and build the skills and confidence to create meaningful
          work and opportunities for themselves
        </p>
      </div>
    </section>
  );
};
