'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full pb-10">
      {/* Outer margin 20px (px-5), content centred at max-width of 1200px */}
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Large rounded card: border-radius 28px, background #F4F4F4 (dark #15112A), 40px inner padding */}
        <div
          className="rounded-[28px] bg-[#F4F4F4] dark:bg-[#15112A] border border-[var(--color-border)] p-6 min-[412px]:p-10 text-left"
          style={{ borderRadius: '28px' }}
        >
          {/* 1. Logo: the violet rounded-square mark plus "Motion Dojo" */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] rounded-lg py-1 mb-6"
            aria-label="Motion Dojo Home"
          >
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
            <span className="font-heading text-lg font-semibold tracking-tight text-[var(--color-text)]">
              Motion Dojo
            </span>
          </Link>

          {/* 2. Bold tagline at about 28px: "Train Like A Ninja, Create Like A Master" */}
          <h3
            className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 28px)', fontWeight: 600 }}
          >
            Train Like A Ninja, Create Like A Master
          </h3>

          {/* 3. Label "Follow us" (weight 600), then outline-style social icons in a row: Instagram and YouTube, 28px, 20px apart */}
          <div className="mb-10">
            <span className="block font-semibold text-sm sm:text-base text-[var(--color-text)] mb-3.5">
              Follow us
            </span>
            <div className="flex items-center gap-5">
              {/* Instagram outline icon (28px) */}
              <a
                href="https://www.instagram.com/joinmotiondojo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Motion Dojo on Instagram"
                className="text-[var(--color-text)] hover:text-[#6D32E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D32E8] rounded-md"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube outline icon (28px) */}
              <a
                href="https://www.youtube.com/@joinmotiondojo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Motion Dojo on YouTube"
                className="text-[var(--color-text)] hover:text-[#6D32E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D32E8] rounded-md"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </a>
            </div>
          </div>

          {/* 4. Two columns of plain text links (18px, weight 500, 28px between rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pt-8 border-t border-[var(--color-border)]/60">
            {/* Column 1: Black Belt, Keyframe Ninjas */}
            <div className="flex flex-col gap-7 text-[18px] font-medium text-[var(--color-text)]">
              <a
                href="https://blackbelt.motiondojo.com"
                className="hover:text-[var(--color-link)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
              >
                Black Belt
              </a>
              <a
                href="https://ninjas.motiondojo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-link)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
              >
                Keyframe Ninjas
              </a>
            </div>

            {/* Column 2: About, Stories, FAQ (anchor links) */}
            <div className="flex flex-col gap-7 text-[18px] font-medium text-[var(--color-text)]">
              <a
                href="#about"
                className="hover:text-[var(--color-link)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
              >
                About
              </a>
              <a
                href="#stories"
                className="hover:text-[var(--color-link)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
              >
                Stories
              </a>
              <a
                href="#faq"
                className="hover:text-[var(--color-link)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)]"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Below the card, centred in muted text: "© 2026 Motion Dojo. All rights reserved." */}
        <p className="text-center text-sm text-[var(--color-muted)] mt-8 font-normal">
          © 2026 Motion Dojo. All rights reserved.
        </p>
      </div>

      {/* Fixed scroll-to-top button at the bottom-right: 52px white circle with a soft shadow and an up-chevron, shown only after scrolling 600px */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-[52px] h-[52px] rounded-full bg-white dark:bg-[#1D1838] border border-[var(--color-border)] text-[#14102A] dark:text-[#F4F1FF] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D32E8]"
          style={{
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </footer>
  );
};
