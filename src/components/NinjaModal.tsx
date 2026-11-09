'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Share2,
  Check,
  Play,
  Globe,
  Mail,
} from 'lucide-react';
import { Ninja } from '@/types';
import { NinjaAvatar } from './NinjaAvatar';
import { getVimeoEmbedUrl, formatSocialUrl } from '@/utils/media';

interface NinjaModalProps {
  ninja: Ninja | null;
  onClose: () => void;
}

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XTwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const NinjaModal: React.FC<NinjaModalProps> = ({ ninja, onClose }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsPlayingVideo(false);
    setCopied(false);

    if (ninja) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [ninja, onClose]);

  if (!ninja) return null;

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}#ninjas`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const isBlackBelt = ninja.phase.toLowerCase().includes('black belt') || ninja.status === 'graduate';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-[var(--modal-overlay)] backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ninja-modal-name"
      aria-describedby="ninja-modal-bio"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full md:max-w-2xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-t-[28px] md:rounded-card-lg shadow-2xl flex flex-col focus:outline-none animate-fade-rise"
      >
        {/* Mobile Drag Indicator */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-[var(--color-border)]" />
        </div>

        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 px-5 sm:px-7 py-4 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-[var(--color-link)]">
              Ninja profile
            </span>
            {ninja.isSample && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
                Sample profile
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
              aria-label="Share ninja profile link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 opacity-70" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close profile modal"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--color-surface-2)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Ninja Header & Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-card-sm overflow-hidden border border-[var(--color-border)] shrink-0 bg-[var(--color-surface-2)] shadow-sm">
              {ninja.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ninja.photo}
                  alt={ninja.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <NinjaAvatar name={ninja.name} specialty={ninja.specialty} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isBlackBelt
                      ? 'bg-[#14102A] text-[#C8FF3D] border border-[#C8FF3D]/40'
                      : 'bg-[var(--color-surface-2)] text-[var(--color-link)] border border-[var(--color-border)]'
                  }`}
                >
                  {ninja.phase}
                </span>

                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]">
                  {ninja.cohort}
                </span>

                {ninja.openToWork && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open to work
                  </span>
                )}
              </div>

              <h2
                id="ninja-modal-name"
                className="text-2xl sm:text-3xl font-heading font-semibold text-[var(--color-text)] tracking-tight leading-tight"
              >
                {ninja.name}
              </h2>
              <p className="text-sm font-semibold text-[var(--color-link)] mt-0.5">
                {ninja.specialty}
              </p>
            </div>
          </div>

          {/* About the Ninja */}
          <div className="rounded-card-sm border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-5">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--color-muted)] block mb-1.5">
              About the ninja
            </span>
            <p
              id="ninja-modal-bio"
              className="text-sm sm:text-base text-[var(--color-text)] leading-relaxed font-normal"
            >
              {ninja.bio}
            </p>
          </div>

          {/* Final Capstone Project */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--color-link)] block">
                Final capstone project
              </span>
              <h4 className="font-heading font-semibold text-lg text-[var(--color-text)] tracking-tight">
                {ninja.project.title}
              </h4>
            </div>

            <div className="relative aspect-video w-full rounded-card-sm overflow-hidden bg-black border border-[var(--color-border)] shadow-md">
              {isPlayingVideo ? (
                <iframe
                  src={getVimeoEmbedUrl(ninja.project.video, true)}
                  title={ninja.project.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <div
                  onClick={() => setIsPlayingVideo(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsPlayingVideo(true);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Play ${ninja.project.title} video`}
                  className="group relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF3D]"
                >
                  {ninja.project.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ninja.project.poster}
                      alt={ninja.project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#14102A] to-[#2A2447] flex items-center justify-center" />
                  )}

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#C8FF3D] hover:bg-[#bbf629] text-[#14102A] flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110 active:scale-95">
                    <Play className="w-6 h-6 fill-[#14102A] ml-0.5" />
                  </div>

                  <span className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/75 text-white backdrop-blur-md">
                    Tap to play capstone video
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed italic bg-[var(--color-surface-2)] p-3 rounded-card-sm border border-[var(--color-border)]">
              &quot;{ninja.project.note}&quot;
            </p>
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--color-muted)] block mb-2.5">
              Connect with {ninja.name.split(' ')[0]}
            </span>
            <div className="flex flex-wrap gap-2">
              {ninja.links.website && (
                <a
                  href={formatSocialUrl('website', ninja.links.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
              )}
              {ninja.links.email && (
                <a
                  href={formatSocialUrl('email', ninja.links.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              )}
              {ninja.links.instagram && (
                <a
                  href={formatSocialUrl('instagram', ninja.links.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
              )}
              {ninja.links.x && (
                <a
                  href={formatSocialUrl('x', ninja.links.x)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <XTwitterIcon />
                  <span>X (Twitter)</span>
                </a>
              )}
              {ninja.links.linkedin && (
                <a
                  href={formatSocialUrl('linkedin', ninja.links.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
