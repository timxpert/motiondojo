'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, EyeOff } from 'lucide-react';

export const HeroVideo: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  const [isDataSavingOrReduced, setIsDataSavingOrReduced] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detect reduced motion or data saving mode
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const isSaveData = connection?.saveData === true;

    if (prefersReducedMotion || isSaveData) {
      setIsDataSavingOrReduced(true);
      return;
    }

    // Lazy load video when container enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section className="w-full">
      {/* Full-bleed, edge to edge, 16:9, no rounded corners, no border and no side margin */}
      <div
        ref={containerRef}
        className="w-full aspect-video relative overflow-hidden bg-[#F4F4F4] dark:bg-[#15112A]"
      >
        {isDataSavingOrReduced ? (
          /* Show only poster when reduced motion or data saving is on */
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-poster.webp"
              alt="Motion Dojo Hero Video Poster"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-semibold text-white/90">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Motion saved for preference</span>
            </div>
          </div>
        ) : (
          /* Lazy-loaded looping video */
          <>
            <video
              ref={videoRef}
              src={shouldLoadVideo ? '/videos/hero.mp4' : undefined}
              poster="/images/hero-poster.webp"
              muted={isMuted}
              loop
              autoPlay
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            />

            {/* Tap to Unmute / Mute Control */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Tap to unmute video audio' : 'Mute video audio'}
              className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14102A]/85 hover:bg-[#14102A] text-white backdrop-blur-md border border-white/10 text-xs font-semibold shadow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF3D] cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#C8FF3D]" />
                  <span>Tap to unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C8FF3D]" />
                  <span>Mute</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </section>
  );
};
