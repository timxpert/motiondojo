import React from 'react';
import { FAQ_ITEMS } from '@/data/faq';
import { PlusIcon } from './Icons';

export function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <h2 className="h2" id="faq-title">
          Questions
        </h2>

        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                {item.question}
                <PlusIcon size={18} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
