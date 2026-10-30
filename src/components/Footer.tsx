import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  LEARN_MORE_URL,
  NINJAS_DIRECTORY_URL,
  INSTAGRAM_URL,
  YOUTUBE_URL,
} from '@/config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="py-14 sm:py-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[var(--color-border)]">
          {/* Logo & Tagline */}
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] rounded-lg py-1"
              aria-label="Motion Dojo Home"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[9px] bg-[#6D32E8] flex items-center justify-center shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#C8FF3D] opacity-0 group-hover:opacity-20 transition-opacity" />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#C8FF3D]"
                  >
                    <path d="M12 3L20 12L12 21L4 12L12 3Z" fill="#C8FF3D" />
                    <path d="M8.5 12H15.5" stroke="#14102A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-[17px] leading-tight tracking-tight text-[var(--color-text)]">
                    Motion Dojo
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-link)] -mt-0.5">
                    Keyframe Ninjas
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm font-semibold tracking-wide text-[var(--color-muted)]">
              Practice. Keyframe. Repeat.
            </p>
          </div>

          {/* Navigation & External Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-semibold text-[var(--color-muted)]">
            <a
              href={LEARN_MORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
            >
              <span>Black Belt</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={NINJAS_DIRECTORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
            >
              <span>Keyframe Ninjas</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
            >
              <span>YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted)] font-medium">
          <p>© 2026 Motion Dojo. All rights reserved.</p>
          <p className="opacity-80">
            Exclusive Community for Smartphone Motion Designers
          </p>
        </div>
      </div>
    </footer>
  );
};
