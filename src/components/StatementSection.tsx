import React from 'react';

export const StatementSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 border-b border-[var(--color-border)] bg-[var(--color-surface)]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Large Headline */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight leading-[1.12] mb-8">
            A skill can change what you do. The right community can change how far you go.
          </h2>

          {/* Statement Paragraph */}
          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--color-muted)] font-normal leading-relaxed max-w-3xl mx-auto">
            You deserve a place where your questions matter, your progress is celebrated, your work
            gets better through practice, and the people around you want to see you win.
          </p>
        </div>
      </div>
    </section>
  );
};
