import React from 'react';
import { LEARN_MORE_URL } from '@/config/site';

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-inner">
        <div className="closing-content">
          <h2 className="display" id="closing-title">
            There’s a place for you in the dojo.
          </h2>
          <p>
            Bring your phone, your curiosity and whatever level you’re at today. We’ll train together from there.
          </p>
          <a href={LEARN_MORE_URL} className="btn btn-lime">
            Learn more
          </a>
        </div>
        <span className="closing-keys" aria-hidden="true" />
      </div>
    </section>
  );
}
