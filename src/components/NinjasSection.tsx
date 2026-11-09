'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Users, Play } from 'lucide-react';
import { NINJAS } from '@/data/ninjas';
import { Ninja } from '@/types';
import { NinjaAvatar } from './NinjaAvatar';
import { NinjaModal } from './NinjaModal';
import { NINJAS_DIRECTORY_URL } from '@/config/site';

export const NinjasSection: React.FC = () => {
  const [selectedNinja, setSelectedNinja] = useState<Ninja | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollButtons();
    track.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      track.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scrollByCard = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector('article') as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 360;

    trackRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      scrollByCard('next');
    } else if (e.key === 'ArrowLeft') {
      scrollByCard('prev');
    }
  };

  return (
    <section id="ninjas" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 min-[412px]:px-10 md:px-16 text-center">
        {/* Section Heading Row - Centre-aligned */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-semibold uppercase tracking-wider mb-3 mx-auto">
            <Users className="w-3.5 h-3.5" />
            <span>Spotlight</span>
          </div>

          <h2
            className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15] text-center"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              fontWeight: 600,
            }}
          >
            Meet the Keyframe Ninjas
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed font-normal text-center">
            Explore real portfolio projects produced by paid students mastering motion design.
          </p>
        </div>

        {/* Horizontal Carousel Track - Starts at consistent side margin and scrolls off edge */}
        <div
          ref={trackRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Keyframe Ninjas Profiles Carousel"
          className="flex overflow-x-auto no-scrollbar snap-x-mandatory gap-5 pb-6 -mx-6 min-[412px]:-mx-10 md:-mx-16 px-6 min-[412px]:px-10 md:px-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
        >
          {NINJAS.slice(0, 3).map((ninja) => {
            const isBlackBelt =
              ninja.phase.toLowerCase().includes('black belt') || ninja.status === 'graduate';

            return (
              <article
                key={ninja.slug}
                tabIndex={0}
                role="button"
                aria-label={`View ${ninja.name}'s profile and final project`}
                onClick={() => setSelectedNinja(ninja)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNinja(ninja);
                  }
                }}
                className="w-[min(86vw,340px)] shrink-0 snap-start group relative flex flex-col justify-between items-center rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg hover:border-[var(--color-link)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Photo / Avatar Box with Status and Play Overlay */}
                  <div className="relative aspect-[4/3] w-full rounded-card-sm overflow-hidden mb-4 bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                    {ninja.photo ? (
                      /* TODO: Replace placeholder with student's approved real photo */
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ninja.photo}
                        alt={ninja.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <NinjaAvatar name={ninja.name} specialty={ninja.specialty} />
                    )}

                    {/* Status & Open to Work Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                          isBlackBelt
                            ? 'bg-[#14102A]/90 text-[#C8FF3D] border border-[#C8FF3D]/30'
                            : 'bg-[var(--color-surface)]/90 text-[var(--color-link)] border border-[var(--color-border)]'
                        }`}
                      >
                        {ninja.phase}
                      </span>

                      {ninja.openToWork && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-500/90 text-white shadow-sm backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Open to work
                        </span>
                      )}
                    </div>

                    {/* Bottom Play Icon Overlay */}
                    <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#14102A]/80 text-[#C8FF3D] backdrop-blur-md flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110">
                      <Play className="w-3.5 h-3.5 fill-[#C8FF3D]" />
                    </div>
                  </div>

                  {/* Name and Cohort */}
                  <div className="flex flex-col items-center justify-center gap-1 mb-1.5 w-full text-center">
                    <h3 className="font-heading font-semibold text-lg text-[var(--color-text)] tracking-tight group-hover:text-[var(--color-link)] transition-colors">
                      {ninja.name}
                    </h3>
                    <span className="text-xs text-[var(--color-muted)] font-normal">
                      {ninja.cohort}
                    </span>
                  </div>

                  {/* Specialty */}
                  <p className="text-xs font-medium text-[var(--color-link)] mb-2.5 line-clamp-1 text-center">
                    {ninja.specialty}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed mb-4 font-normal text-center">
                    {ninja.bio}
                  </p>
                </div>

                {/* Bottom Project Title (Plain text, no arrow icon) */}
                <div className="pt-3 border-t border-[var(--color-border)] w-full text-center">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-[var(--color-muted)]">
                    Final project
                  </span>
                  <span className="block text-xs font-semibold text-[var(--color-text)] truncate mt-0.5">
                    {ninja.project.title}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Previous / Next Buttons - Centred UNDER the cards */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={() => scrollByCard('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
            style={{
              background: '#F5F5F5',
              border: '1.5px solid rgba(109, 50, 232, 0.15)',
              boxShadow: '0 6px 18px rgba(109, 50, 232, 0.12)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6D32E8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCard('next')}
            disabled={!canScrollRight}
            aria-label="Next"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !canScrollRight ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
            style={{
              background: '#F5F5F5',
              border: '1.5px solid rgba(109, 50, 232, 0.15)',
              boxShadow: '0 6px 18px rgba(109, 50, 232, 0.12)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6D32E8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* View all Keyframe Ninjas Button - Centred BELOW carousel buttons, plain text (no icon) */}
        <div className="mt-6 flex justify-center">
          <a
            href={NINJAS_DIRECTORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] font-semibold text-sm tracking-tight transition-all active:scale-95 shadow-sm"
          >
            View all Keyframe Ninjas
          </a>
        </div>
      </div>

      {/* Profile Modal Sheet */}
      <NinjaModal ninja={selectedNinja} onClose={() => setSelectedNinja(null)} />
    </section>
  );
};
