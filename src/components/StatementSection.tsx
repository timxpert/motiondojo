import React from 'react';

export const StatementSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left-aligned Text */}
          <div className="lg:col-span-7 text-left">
            <h2
              className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15] mb-6"
              style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
                fontWeight: 600,
              }}
            >
              A skill can change what you do. The right community can change how far you go.
            </h2>

            <p className="text-base sm:text-lg lg:text-[1.125rem] text-[var(--color-muted)] font-normal leading-[1.7] max-w-2xl">
              You deserve a place where your questions matter, your progress is celebrated, your work
              gets better through practice, and the people around you want to see you win.
            </p>
          </div>

          {/* Wide Visual Composition of Large Brand Shapes */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[360px] rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-soft flex items-center justify-center overflow-hidden group">
              {/* Subtle background radial glow */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(109, 50, 232, 0.08) 0%, transparent 70%)',
                }}
              />

              {/* Composition of Brand Shapes */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Central Diamond */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#6D32E8] to-[#A77BFF] text-[#C8FF3D] flex items-center justify-center shadow-lg transform rotate-45 animate-shape-drift">
                  <div className="-rotate-45">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>

                {/* Floating Plus Top Right */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white dark:bg-[#1D1838] border border-[var(--color-border)] text-[#6D32E8] dark:text-[#A77BFF] flex items-center justify-center shadow-sm animate-shape-drift-alt">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>

                {/* Floating Hourglass Bottom Left */}
                <div className="absolute bottom-6 left-6 w-12 h-12 rounded-xl bg-[#C8FF3D] text-[#14102A] flex items-center justify-center shadow-sm animate-shape-drift">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3C5 2.45 5.45 2 6 2H18C18.55 2 19 2.45 19 3C19 3.55 18.55 4 18 4H17.5V7C17.5 9.07 16.03 10.8 14.05 11.36L12.98 11.66C12.33 11.85 12.33 12.15 12.98 12.34L14.05 12.64C16.03 13.2 17.5 14.93 17.5 17V20H18C18.55 20 19 20.45 19 21C19 21.55 18.55 22 18 22H6C5.45 22 5 21.55 5 21C5 20.45 5.45 20 6 20H6.5V17C6.5 14.93 7.97 13.2 9.95 12.64L11.02 12.34C11.67 12.15 11.67 11.85 11.02 11.66L9.95 11.36C7.97 10.8 6.5 9.07 6.5 7V4H6C5.45 4 5 3.55 5 3Z" />
                  </svg>
                </div>

                {/* Floating Circle Bottom Right */}
                <div className="absolute bottom-4 right-8 w-10 h-10 rounded-full bg-white dark:bg-[#1D1838] border border-[#6D32E8]/30 flex items-center justify-center shadow-sm">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#6D32E8]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
