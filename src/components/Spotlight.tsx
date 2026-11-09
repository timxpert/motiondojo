import React from 'react';
import { NINJAS_DIRECTORY_URL } from '@/config/site';
import { NINJAS } from '@/data/ninjas';
import { PlayIcon } from './Icons';

// Only members who approved publication are listed; samples/placeholders never render.
const MEMBERS = NINJAS.filter((n) => !n.isSample).slice(0, 3);

export function Spotlight() {
  return (
    <section className="section" id="ninjas" aria-labelledby="ninjas-title">
      <div className="wrap">
        <div className="spotlight-grid">
          <div className="spotlight-copy">
            <h2 className="h2" id="ninjas-title">
              Your work gets a home
            </h2>
            <p className="lede">
              Every Keyframe Ninja gets a page on the showcase with their story, their final project and their links.
              Share it with clients and friends the way you’d share a portfolio.
            </p>
            <a href={NINJAS_DIRECTORY_URL} className="text-link" target="_blank" rel="noopener noreferrer">
              Meet the Keyframe Ninjas
            </a>
          </div>

          {/* What a member's showcase page looks like */}
          <div className="portfolio" aria-label="Example of a Keyframe Ninja showcase page" role="img">
            <div className="portfolio-bar" aria-hidden="true">
              <span className="portfolio-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="portfolio-url">
                ninjasmotiondojo.vercel.app/<b>your-name</b>
              </span>
            </div>
            <div className="portfolio-body" aria-hidden="true">
              <div className="portfolio-who">
                <span className="portfolio-avatar" />
                <div>
                  <p className="portfolio-name">Your name</p>
                  <p className="portfolio-meta">Smartphone motion designer</p>
                </div>
              </div>
              <div className="pills">
                <span className="pill pill-belt">Black Belt</span>
                <span className="pill pill-open">Open to work</span>
              </div>
              <div className="portfolio-shot">
                <img src="/images/project-kuda.webp" alt="" loading="lazy" />
                <span className="play">
                  <PlayIcon size={18} />
                </span>
              </div>
              <div className="portfolio-cap">
                <strong>Final project</strong>
                <span>Made on a phone in Alight Motion</span>
              </div>
            </div>
          </div>
        </div>

        {MEMBERS.length > 0 && (
          <ul className="ninja-list">
            {MEMBERS.map((n) => (
              <li key={n.slug}>
                <a
                  className="ninja-card"
                  href={`${NINJAS_DIRECTORY_URL}/#ninjas`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {n.project.poster && <img src={n.project.poster} alt="" loading="lazy" />}
                  <div className="pills">
                    <span className={n.status === 'graduate' ? 'pill pill-belt' : 'pill'}>{n.phase}</span>
                    {n.openToWork && <span className="pill pill-open">Open to work</span>}
                  </div>
                  <h3 className="h3">{n.name}</h3>
                  <p>{n.specialty}</p>
                  <p>Final project: {n.project.title}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
