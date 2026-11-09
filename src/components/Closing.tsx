import React from 'react';
import { LEARN_MORE_URL } from '@/config/site';

export function Closing() {
  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="wrap">
        <h2 className="display" id="closing-title">
          There’s a place for you in the dojo.
        </h2>
        <p className="lede">Bring your phone and whatever level you’re at today.</p>
        <a href={LEARN_MORE_URL} className="btn btn-lime">
          Learn more
        </a>
      </div>
    </section>
  );
}
