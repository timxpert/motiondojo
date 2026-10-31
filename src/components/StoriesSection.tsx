'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Quote, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { STORIES } from '@/data/stories';
import { Story } from '@/types';
import { StoryModal } from './StoryModal';

export const StoriesSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
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
    const firstCard = trackRef.current.querySelector('div[role="button"]') as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 320;

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
    <section id="stories" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Row with Left-aligned Copy and Right-aligned Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 text-left">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-semibold uppercase tracking-wider mb-3">
              <Quote className="w-3.5 h-3.5" />
              <span>Student experiences</span>
            </div>

            <h2
              className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15]"
              style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
                fontWeight: 600,
              }}
            >
              Stories from the Dojo
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed font-normal">
              Hear directly from students who joined the course, conquered the keyframes, and graduated to Black Belt.
            </p>
          </div>

          {/* Previous / Next Controls (44px Circles) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCard('prev')}
              disabled={!canScrollLeft}
              aria-label="Previous"
              className={`w-11 h-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer ${
                !canScrollLeft
                  ? 'opacity-35 cursor-not-allowed'
                  : 'hover:bg-[var(--color-surface-2)] hover:border-[var(--color-link)]/40 active:scale-95'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard('next')}
              disabled={!canScrollRight}
              aria-label="Next"
              className={`w-11 h-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer ${
                !canScrollRight
                  ? 'opacity-35 cursor-not-allowed'
                  : 'hover:bg-[var(--color-surface-2)] hover:border-[var(--color-link)]/40 active:scale-95'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={trackRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Student Stories Carousel"
          className="flex overflow-x-auto no-scrollbar snap-x-mandatory gap-5 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
        >
          {STORIES.map((story) => (
            <div
              key={story.id}
              tabIndex={0}
              role="button"
              aria-label={`Play ${story.name}’s story`}
              onClick={() => setSelectedStory(story)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedStory(story);
                }
              }}
              className="w-[min(78vw,300px)] shrink-0 snap-start group relative aspect-[4/5] rounded-card border border-[var(--color-border)] overflow-hidden bg-black shadow-soft hover:shadow-soft-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
            >
              {/* Real Student Photo (4:5) */}
              {/* TODO: Real student photo slot at ${story.poster} */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.poster}
                alt={`Photo of ${story.name}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Tint scrim overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

              {/* Centred White Circular Play Button (Icon only, no text) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white text-[#14102A] flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110 active:scale-95">
                  <Play className="w-5 h-5 fill-[#14102A] ml-0.5" />
                </div>
              </div>

              {/* Bottom Scrim with Student Name Only */}
              <div
                className="absolute inset-x-0 bottom-0 p-5 pt-12 flex items-end"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)',
                }}
              >
                <h3 className="font-heading font-semibold text-lg sm:text-xl text-white tracking-tight">
                  {story.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Sheet */}
      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </section>
  );
};
