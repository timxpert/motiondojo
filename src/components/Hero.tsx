import React from 'react';
import { LEARN_MORE_URL } from '@/config/site';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-[var(--color-text)] tracking-tight max-w-4xl mx-auto leading-[1.08] sm:leading-[1.06] mb-6 sm:mb-8">
          You were never meant to figure it all out alone
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl lg:text-2xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          Motion design is more than learning how to animate. It’s discovering your creative voice,
          finding people who understand your ambition, and building something you can be proud of.
        </p>

        {/* Hero CTA Button */}
        <div className="flex justify-center">
          <a
            href={LEARN_MORE_URL}
            target="_self"
            className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-heading font-extrabold tracking-tight rounded-full bg-[#C8FF3D] hover:bg-[#bbf629] text-[#14102A] transition-all shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF3D] focus-visible:ring-offset-2"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};
