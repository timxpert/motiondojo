'use client';

import React, { useState } from 'react';
import { Quote, Play } from 'lucide-react';
import { STORIES } from '@/data/stories';
import { Story } from '@/types';
import { StoryModal } from './StoryModal';

export const StoriesSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <section id="stories" className="py-16 sm:py-24 border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-bold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Student experiences</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Stories from the Dojo
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed">
            Hear directly from students who joined the course, conquered the keyframes, and graduated to Black Belt.
          </p>
        </div>

        {/* 3 Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STORIES.map((story) => (
            <div
              key={story.id}
              tabIndex={0}
              role="button"
              aria-label={`Open story from ${story.name}`}
              onClick={() => setSelectedStory(story)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedStory(story);
                }
              }}
              className="group rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 flex flex-col justify-between shadow-soft hover:shadow-soft-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
            >
              <div>
                {/* Photo & Tap to watch */}
                <div className="relative aspect-[4/3] w-full rounded-card-sm overflow-hidden bg-black border border-[var(--color-border)] mb-4 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.poster}
                    alt={`Photo of ${story.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

                  {/* Circular Lime Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-[#C8FF3D] hover:bg-[#bbf629] text-[#14102A] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 active:scale-95">
                      <Play className="w-5 h-5 fill-[#14102A] ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-2.5 left-2.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-md">
                    Tap to watch
                  </span>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-heading font-extrabold text-lg text-[var(--color-text)] tracking-tight">
                    {story.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[var(--color-link)] bg-[var(--color-surface-2)] px-2 py-0.5 rounded-full">
                    Graduate
                  </span>
                </div>

                <p className="text-xs text-[var(--color-muted)] font-medium mb-3">
                  {story.role}
                </p>

                <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed italic border-t border-[var(--color-border)] pt-3">
                  &quot;{story.summary}&quot;
                </p>
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
