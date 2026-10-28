import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/communityData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('split-payment');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section-padding relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="dojo-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <HelpCircle size={13} />
            <span>GOT QUESTIONS?</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            Frequently Asked Questions
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Everything you need to know about the course, payments, and the showcase.
          </p>
        </div>

        {/* Minimalist Accessible Accordion */}
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="dojo-card"
                style={{
                  borderRadius: '1.25rem',
                  border: isOpen
                    ? '1px solid var(--border-medium)'
                    : '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                  style={{
                    width: '100%',
                    padding: '1.5rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: isOpen ? 'var(--color-kinetic-lime)' : 'var(--text-muted)',
                      }}
                    >
                      0{index + 1}
                    </span>
                    <span
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isOpen ? 'var(--text-primary)' : 'var(--text-primary)',
                        lineHeight: 1.35,
                      }}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--color-motion-violet)' : 'var(--pill-bg)',
                      color: isOpen ? '#F7F5FF' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s var(--ease-spring), background-color 0.2s ease',
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Animated Accordion Content */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '0 1.75rem 1.75rem 3.5rem',
                      color: 'var(--text-secondary)',
                      fontSize: '1.02rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
