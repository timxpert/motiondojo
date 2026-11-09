import React from 'react';
import { FAQ_ITEMS } from '@/data/faq';
import { LEARN_MORE_URL } from '@/config/site';
import { PlusIcon } from './Icons';

export function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="section-head">
          <h2 className="h2" id="faq-title">
            Questions people ask before joining
          </h2>
          <p className="body">
            Still unsure? The full course page has every detail.{' '}
            <a href={LEARN_MORE_URL} className="text-link">
              Learn more
            </a>
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                {item.question}
                <PlusIcon />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
