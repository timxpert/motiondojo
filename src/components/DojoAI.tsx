import React from 'react';
import { DOJO_AI_URL } from '@/config/site';
import { DOJO_AI } from '@/data/content';
import { getVimeoEmbedUrl } from '@/utils/media';

/** What fills the product window: demo video, else first screenshot, else a branded placeholder. */
function Stage() {
  const { demoVideo, screenshots } = DOJO_AI;
  if (demoVideo) {
    if (/vimeo\.com/.test(demoVideo)) {
      return (
        <iframe
          src={getVimeoEmbedUrl(demoVideo, false)}
          title="Dojo’s AI demonstration"
          allow="fullscreen; picture-in-picture"
          loading="lazy"
        />
      );
    }
    return <video src={demoVideo} controls playsInline preload="metadata" aria-label="Dojo’s AI demonstration" />;
  }
  if (screenshots.length > 0) {
    return <img src={screenshots[0].src} alt={screenshots[0].alt} loading="lazy" />;
  }
  return (
    <div className="ai-placeholder">
      <span className="spark-lg" aria-hidden="true" />
      <p>Screenshots and a short demo of Dojo’s AI will appear here.</p>
    </div>
  );
}

export function DojoAI() {
  const { features, screenshots, access } = DOJO_AI;
  const extraShots = DOJO_AI.demoVideo ? screenshots : screenshots.slice(1);

  return (
    <section className="section dark-section ai" id="dojo-ai" aria-labelledby="ai-title">
      <div className="ai-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="ai-head">
          <span className="kicker" data-reveal>
            Dojo’s AI
          </span>
          <h2 className="h2" id="ai-title" data-reveal>
            Meet your <span className="grad-text">creative companion.</span>
          </h2>
          <p className="lede" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            We believe the right tools can make the creative process easier.
          </p>
          <p className="lede" data-reveal style={{ ['--d' as string]: '0.12s' }}>
            That’s why we built Dojo’s AI, an in-house tool designed to support our community and help members work
            smarter.
          </p>
        </div>

        <div className="ai-window" data-reveal>
          <div className="ai-bar" aria-hidden="true">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            Dojo’s AI
          </div>
          <div className="ai-stage">
            <Stage />
          </div>
        </div>

        {extraShots.length > 0 && (
          <div className="ai-shots">
            {extraShots.map((s) => (
              <img key={s.src} src={s.src} alt={s.alt} loading="lazy" />
            ))}
          </div>
        )}

        {features.length > 0 && (
          <ul className="ai-features">
            {features.map((f) => (
              <li key={f.title} data-reveal>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="ai-access" data-reveal>
          {DOJO_AI_URL ? (
            <a href={DOJO_AI_URL} className="btn btn-lime">
              Discover Dojo’s AI
            </a>
          ) : (
            <span className="status">Access opens soon</span>
          )}
          {access && <p>{access}</p>}
        </div>
      </div>
    </section>
  );
}
