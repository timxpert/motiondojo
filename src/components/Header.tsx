'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { LEARN_MORE_URL } from '@/config/site';

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200 border-b bg-[var(--header-bg)] backdrop-blur-md border-[var(--color-border)]/60">
      <div className="max-w-[1200px] mx-auto px-6 min-[412px]:px-10 md:px-16 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo - Says "Motion Dojo" only (no "Keyframe Ninjas") */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] rounded-lg py-1"
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#about"
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
            >
              About
            </a>
            <a
              href="#ninja-path"
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
            >
              Ninja Path
            </a>
            <a
              href="#ninjas"
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
            >
              Ninjas
            </a>
            <a
              href="#stories"
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
            >
              Stories
            </a>
            <a
              href="#faq"
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
            >
              FAQ
            </a>
          </nav>

          <div className="h-5 w-px bg-[var(--color-border)]" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer"
          >
            {mounted ? (
              isDark ? (
                <Sun className="w-4 h-4 text-[#C8FF3D]" />
              ) : (
                <Moon className="w-4 h-4 opacity-75" />
              )
            ) : (
              <span className="w-4 h-4" />
            )}
          </button>

          {/* Learn More Header Button */}
          <a
            href={LEARN_MORE_URL}
            target="_self"
            className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold tracking-tight rounded-full bg-[#C8FF3D] hover:bg-[#bbf629] text-[#14102A] transition-all shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF3D] focus-visible:ring-offset-2"
          >
            Learn more
          </a>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-all cursor-pointer"
          >
            {mounted ? (
              isDark ? (
                <Sun className="w-4 h-4 text-[#C8FF3D]" />
              ) : (
                <Moon className="w-4 h-4 opacity-75" />
              )
            ) : (
              <span className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/98 backdrop-blur-lg px-5 py-6 space-y-4 animate-fade-rise">
          <nav className="flex flex-col space-y-3 text-base font-semibold">
            <a
              href="#about"
              onClick={closeMobileMenu}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-2 border-b border-[var(--color-border)]/50"
            >
              About
            </a>
            <a
              href="#ninja-path"
              onClick={closeMobileMenu}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-2 border-b border-[var(--color-border)]/50"
            >
              Ninja Path
            </a>
            <a
              href="#ninjas"
              onClick={closeMobileMenu}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-2 border-b border-[var(--color-border)]/50"
            >
              Ninjas
            </a>
            <a
              href="#stories"
              onClick={closeMobileMenu}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-2 border-b border-[var(--color-border)]/50"
            >
              Stories
            </a>
            <a
              href="#faq"
              onClick={closeMobileMenu}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-2 border-b border-[var(--color-border)]/50"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-2">
            <a
              href={LEARN_MORE_URL}
              target="_self"
              onClick={closeMobileMenu}
              className="w-full inline-flex items-center justify-center py-3 text-sm font-semibold tracking-tight rounded-full bg-[#C8FF3D] text-[#14102A] shadow-sm active:scale-98"
            >
              Learn more
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
