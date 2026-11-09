'use client';

import React, { useEffect, useRef, useState } from 'react';
import { STORIES } from '@/data/stories';
import { Story } from '@/types';
import { getVimeoEmbedUrl } from '@/utils/media';
import { CloseIcon, PlayIcon } from './Icons';

// Roseline's recording is vertical; the others are landscape.
const PORTRAIT_IDS = new Set(['roseline']);

export function Stories() {
  const [active, setActive] = useState<Story | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="section" id="stories" aria-labelledby="stories-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="stories-title">
            Stories from the Keyframe Ninjas
          </h2>
          <p className="lede">
            Hear it from members who joined, worked through the keyframes and earned their Black Belt.
          </p>
        </div>

        <ul className="stories">
          {STORIES.map((story) => (
            <li key={story.id}>
              <button
                type="button"
                className="story"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setActive(story);
                }}
                aria-label={`Play ${story.name}’s story`}
              >
                <span className="story-media">
                  <img src={story.poster} alt="" loading="lazy" />
                  <span className="play">
                    <PlayIcon />
                  </span>
                </span>
                <span className="story-text">
                  <span className="story-name">{story.name}</span>
                  <span className="story-role">{story.role}</span>
                  <span className="story-summary">{story.summary}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <StoryModal
          story={active}
          onClose={() => {
            setActive(null);
            lastTrigger.current?.focus();
          }}
        />
      )}
    </section>
  );
}

function StoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const portrait = PORTRAIT_IDS.has(story.id);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${story.name}’s story`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={portrait ? 'modal-panel portrait' : 'modal-panel'}>
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close video">
          <CloseIcon size={20} />
        </button>
        <div className="modal-video">
          <iframe
            src={getVimeoEmbedUrl(story.videoUrl)}
            title={`${story.name}’s story`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="modal-caption">
          <strong>{story.name}</strong>, {story.role}
        </p>
      </div>
    </div>
  );
}
