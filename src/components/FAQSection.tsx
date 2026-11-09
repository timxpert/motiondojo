'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faq';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 min-[412px]:px-10 md:px-16 text-center">
        {/* Centre-aligned Section Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-link)] text-xs font-semibold uppercase tracking-wider mb-3 mx-auto">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>

          <h2
            className="font-heading font-semibold text-[var(--color-text)] tracking-tight leading-[1.15] text-center"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              fontWeight: 600,
            }}
          >
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed font-normal text-center">
            Everything you need to know about the course, payments, and the showcase.
          </p>
        </div>

        {/* Accordion List: Left-aligned inside a centred 720px column */}
        <div className="max-w-[720px] mx-auto text-left space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-200 shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-[var(--color-text)] tracking-tight pr-2">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--color-link)]' : 'text-[var(--color-muted)]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border)]/60 animate-fade-rise font-normal text-left"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
