import React from 'react';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text on the Left */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Motion Dojo</span>
            </div>

            <p className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[2.25rem] text-[var(--color-text)] tracking-tight leading-[1.3] max-w-2xl">
              Motion dojo is an exclusive community where smartphone motion designers learn,
              practice, share, and grow together.
            </p>
          </div>

          {/* Large Visual on the Right: Phone-frame image slot with floating brand shapes */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Floating Brand Shape 1: Violet Plus */}
              <div
                className="absolute -top-6 -left-6 z-20 w-12 h-12 rounded-2xl bg-[#6D32E8] text-[#C8FF3D] flex items-center justify-center shadow-lg animate-shape-drift"
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>

              {/* Floating Brand Shape 2: Lime Diamond */}
              <div
                className="absolute -bottom-5 -right-5 z-20 w-11 h-11 rounded-2xl bg-[#C8FF3D] text-[#14102A] flex items-center justify-center shadow-md animate-shape-drift-alt"
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L21.5 11.5C21.8 11.8 21.8 12.2 21.5 12.5L12 22L2.5 12.5C2.2 12.2 2.2 11.8 2.5 11.5L12 2Z" />
                </svg>
              </div>

              {/* Floating Brand Shape 3: Lavender Circle */}
              <div
                className="absolute top-1/2 -right-6 z-20 w-9 h-9 rounded-full bg-[#A77BFF]/25 border border-[#A77BFF]/40 text-[#6D32E8] dark:text-[#A77BFF] flex items-center justify-center backdrop-blur-sm animate-shape-drift"
                aria-hidden="true"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#6D32E8] dark:bg-[#A77BFF]" />
              </div>

              {/* Phone Frame Device Slot */}
              <div className="relative rounded-[36px] p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-soft-lg">
                <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-black border border-[var(--color-border)]/50">
                  {/* TODO: Replace with student smartphone animation loop or approved production motion reel at /images/about-visual.webp */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about-visual.webp"
                    alt="Motion Dojo Smartphone Animation Showcase"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle inner reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
