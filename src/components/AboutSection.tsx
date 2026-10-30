import React from 'react';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-[var(--color-border)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-14 lg:p-16 shadow-soft">
          {/* Label */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Motion Dojo</span>
          </div>

          {/* Core Description Text */}
          <p className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text)] tracking-tight leading-snug sm:leading-tight">
            Motion dojo is an exclusive community where smartphone motion designers learn, practice,
            share, and grow together.
          </p>
        </div>
      </div>
    </section>
  );
};
