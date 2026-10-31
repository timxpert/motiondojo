import React from 'react';

export const StatementSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 min-[412px]:px-10 md:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15] mb-6"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              fontWeight: 600,
            }}
          >
            A skill can change what you do. The right community can change how far you go.
          </h2>

          <p className="text-base sm:text-lg lg:text-[1.125rem] text-[var(--color-muted)] font-normal leading-[1.7] max-w-2xl mx-auto">
            You deserve a place where your questions matter, your progress is celebrated, your work
            gets better through practice, and the people around you want to see you win.
          </p>
        </div>
      </div>
    </section>
  );
};
