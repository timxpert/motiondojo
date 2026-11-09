'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Play } from 'lucide-react';
import { Story } from '@/types';
import { getVimeoEmbedUrl } from '@/utils/media';

interface StoryModalProps {
  story: Story | null;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsPlaying(false);

    if (story) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Focus close button initially for keyboard accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--modal-overlay)] backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      aria-describedby="story-modal-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-[var(--color-bg)] dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-card md:rounded-card-lg shadow-2xl p-5 sm:p-7 relative flex flex-col focus:outline-none animate-fade-rise"
      >
        {/* Header bar with Student Name and Close Button */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
          <div>
            <h3
              id="story-modal-title"
              className="font-heading font-semibold text-xl sm:text-2xl text-[var(--color-text)] tracking-tight"
            >
              {story.name}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] font-medium">
              {story.role}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close story modal"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-surface-2)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Video Box */}
        <div className="relative aspect-video w-full rounded-card-sm overflow-hidden bg-black border border-[var(--color-border)] shadow-md">
          {isPlaying ? (
            <iframe
              src={getVimeoEmbedUrl(story.videoUrl, true)}
              title={`Student story from ${story.name}`}
              allow="autoplay; fullscreen; picture-in-picture"
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <div
              tabIndex={0}
              role="button"
              aria-label={`Play story from ${story.name}`}
              onClick={() => setIsPlaying(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPlaying(true);
                }
              }}
              className="group relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {/* Poster image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.poster}
                alt={`Photo of ${story.name}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              {/* Large white circular play button centred on the poster */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#14102A] flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110 active:scale-95">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#14102A] ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Quote text below video */}
        <p
          id="story-modal-desc"
          className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed italic border-t border-[var(--color-border)] pt-4 mt-4"
        >
          &quot;{story.summary}&quot;
        </p>
      </div>
    </div>
  );
};
