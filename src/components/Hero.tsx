import React from 'react';
import { LEARN_MORE_URL } from '@/config/site';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[var(--color-bg)]">
      {/* Very soft violet radial glow in the top-right corner (about 10% opacity) */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-3xl opacity-100"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(109, 50, 232, 0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        {/* Left-aligned stack */}
        <div className="max-w-3xl">
          {/* H1 strictly Sora 600 on two lines */}
          <h1
            className="font-heading font-semibold text-[var(--color-text)] tracking-[-0.03em] leading-[1.1] mb-6"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 600,
            }}
          >
            <span className="block text-[var(--color-text)]">
              You were never meant to
            </span>
            <span
              className="block pb-2"
              style={{
                background: 'linear-gradient(90deg, #6D32E8 0%, #A77BFF 50%, #C8FF3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#6D32E8',
              }}
            >
              figure it all out alone
            </span>
          </h1>

          {/* Paragraph (exact copy, max-width ~46ch) */}
          <p
            className="text-base sm:text-lg lg:text-[1.125rem] leading-[1.7] text-[var(--color-muted)] font-normal mb-8 sm:mb-10"
            style={{ maxWidth: '46ch' }}
          >
            Motion design is more than learning how to animate. It’s discovering your creative voice,
            finding people who understand your ambition, and building something you can be proud of.
          </p>

          {/* Button: "Learn more", lime with dark text, generous padding, soft glow */}
          <div>
            <a
              href={LEARN_MORE_URL}
              target="_self"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold tracking-tight rounded-full bg-[#C8FF3D] hover:bg-[#bcf728] text-[#14102A] transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF3D] focus-visible:ring-offset-2"
              style={{
                boxShadow: '0 12px 30px rgba(200, 255, 61, 0.35)',
              }}
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
