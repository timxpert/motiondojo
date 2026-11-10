'use client';

import { useEffect } from 'react';

/**
 * One lightweight observer for the whole page:
 * - [data-reveal] elements get `.is-in` when they scroll into view
 * - sections with [data-reveal-section] get `.is-in` too (used to start SVG drawing)
 * - [data-parallax="0.1"] elements drift slightly with scroll (transform only)
 * Nothing runs when the visitor prefers reduced motion.
 */
export function MotionLayer() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-section]');

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));

    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      layers.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax || '0.08');
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (layers.length) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
