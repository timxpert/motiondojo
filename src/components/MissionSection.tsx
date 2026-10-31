import React from 'react';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-6 min-[412px]:px-10 md:px-16 text-center">
        <h2
          className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15] mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
            fontWeight: 600,
          }}
        >
          Our Mission
        </h2>
        <p
          className="text-base sm:text-lg lg:text-[1.125rem] leading-[1.7] text-[var(--color-muted)] font-normal mx-auto"
          style={{ maxWidth: '46ch' }}
        >
          To empower aspiring and emerging smartphone motion designers to develop their creative abilities, master motion design, and build the skills and confidence to create meaningful work and opportunities for themselves
        </p>
      </div>
    </section>
  );
};
