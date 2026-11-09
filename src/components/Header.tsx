'use client';

import React, { useEffect, useState } from 'react';
import { LEARN_MORE_URL } from '@/config/site';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#path', label: 'Ninja Path' },
  { href: '#stories', label: 'Stories' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="header">
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label="Motion Dojo, back to top">
          <img src="/assets/favicon-128.png" alt="" width={34} height={34} />
          Motion Dojo
        </a>

        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <span style={{ width: 18, height: 18 }} />}
          </button>
          <a href={LEARN_MORE_URL} className="btn btn-lime btn-sm">
            Learn more
          </a>
          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={LEARN_MORE_URL} className="btn btn-lime">
            Learn more
          </a>
        </nav>
      )}
    </header>
  );
}
