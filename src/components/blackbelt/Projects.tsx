'use client';

import React, { useCallback, useState } from 'react';
import { PROJECTS } from '@/data/blackbelt';
import { VideoModal } from '../VideoModal';
import { Play } from '../Icons';

/** Sample projects: poster cards that open the Vimeo video. */
export function Projects() {
  const [playing, setPlaying] = useState<(typeof PROJECTS)[number] | null>(null);
  const close = useCallback(() => setPlaying(null), []);

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="projects-title">
            What you will make
          </h2>
          <p className="lede">Projects made in the Dojo with Alight Motion, on a smartphone.</p>
        </div>

        <ul className="projects">
          {PROJECTS.map((p) => (
            <li key={p.title}>
              <button type="button" className="project" onClick={() => setPlaying(p)}>
                <img src={p.poster} alt="" loading="lazy" />
                <span className="project-label">
                  <span className="disc">
                    <Play size={14} />
                  </span>
                  {p.title}
                  <span className="sr-only"> (play video)</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {playing && <VideoModal url={playing.video} title={playing.title} onClose={close} />}
    </section>
  );
}
