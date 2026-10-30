'use client';

import React, { useState } from 'react';
import { Users, Play, ArrowUpRight } from 'lucide-react';
import { NINJAS } from '@/data/ninjas';
import { Ninja } from '@/types';
import { NinjaAvatar } from './NinjaAvatar';
import { NinjaModal } from './NinjaModal';
import { NINJAS_DIRECTORY_URL } from '@/config/site';

export const NinjasSection: React.FC = () => {
  const [selectedNinja, setSelectedNinja] = useState<Ninja | null>(null);

  return (
    <section id="ninjas" className="py-16 sm:py-24 border-b border-[var(--color-border)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Spotlight</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Meet the Keyframe Ninjas
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed">
            Explore real portfolio projects produced by paid students mastering motion design.
          </p>
        </div>

        {/* 3 Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {NINJAS.slice(0, 3).map((ninja) => {
            const isBlackBelt =
              ninja.phase.toLowerCase().includes('black belt') || ninja.status === 'graduate';

            return (
              <article
                key={ninja.slug}
                tabIndex={0}
                role="button"
                aria-label={`View ${ninja.name}'s profile and final project`}
                onClick={() => setSelectedNinja(ninja)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNinja(ninja);
                  }
                }}
                className="group relative flex flex-col justify-between rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg hover:border-[var(--color-link)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer"
              >
                <div>
                  {/* Photo / Avatar Box with Status and Play Overlay */}
                  <div className="relative aspect-[4/3] w-full rounded-card-sm overflow-hidden mb-4 bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                    {ninja.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ninja.photo}
                        alt={ninja.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <NinjaAvatar name={ninja.name} specialty={ninja.specialty} />
                    )}

                    {/* Status & Open to Work Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                          isBlackBelt
                            ? 'bg-[#14102A]/90 text-[#C8FF3D] border border-[#C8FF3D]/30'
                            : 'bg-[var(--color-surface)]/90 text-[var(--color-link)] border border-[var(--color-border)]'
                        }`}
                      >
                        {ninja.phase}
                      </span>

                      {ninja.openToWork && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-500/90 text-white shadow-sm backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Open to work
                        </span>
                      )}
                    </div>

                    {/* Bottom Play Icon Overlay */}
                    <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#14102A]/80 text-[#C8FF3D] backdrop-blur-md flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110">
                      <Play className="w-3.5 h-3.5 fill-[#C8FF3D]" />
                    </div>
                  </div>

                  {/* Name and Cohort */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-heading font-extrabold text-lg text-[var(--color-text)] tracking-tight group-hover:text-[var(--color-link)] transition-colors">
                      {ninja.name}
                    </h3>
                    <span className="text-xs text-[var(--color-muted)] font-medium shrink-0 pt-0.5">
                      {ninja.cohort}
                    </span>
                  </div>

                  {/* Specialty */}
                  <p className="text-xs font-medium text-[var(--color-link)] mb-3 line-clamp-1">
                    {ninja.specialty}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed mb-4">
                    {ninja.bio}
                  </p>
                </div>

                {/* Bottom Project Title and Link Icon */}
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex flex-col max-w-[78%]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-muted)]">
                      Final project
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-text)] truncate">
                      {ninja.project.title}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-link)] transition-colors group-hover:bg-[#C8FF3D] group-hover:text-[#14102A]">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Button below cards */}
        <div className="mt-12 text-center">
          <a
            href={NINJAS_DIRECTORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)] font-heading font-bold text-sm tracking-tight transition-all active:scale-95 shadow-sm"
          >
            <span>View all Keyframe Ninjas</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--color-link)]" />
          </a>
        </div>
      </div>

      {/* Modal Profile Sheet */}
      <NinjaModal ninja={selectedNinja} onClose={() => setSelectedNinja(null)} />
    </section>
  );
};
