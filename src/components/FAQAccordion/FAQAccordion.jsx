import React, { useState } from 'react';
import { FAQS } from '../../data/products';
import './FAQAccordion.css';

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-kicker">GOT QUESTIONS?</span>
          <h2 className="faq-heading">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-muted small">Everything you need to know about our fits, fabric, and delivery.</p>
        </div>

        <div className="faq-list mx-auto" style={{ maxWidth: '780px' }}>
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item mb-2 ${openIndex === idx ? 'open' : ''}`}>
              <button 
                className="faq-question-btn w-100 d-flex justify-content-between align-items-center text-start p-3"
                onClick={() => toggle(idx)}
              >
                <span className="faq-q-text">{faq.q}</span>
                <i className={`bi ${openIndex === idx ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
              </button>
              {openIndex === idx && (
                <div className="faq-answer-box px-3 pb-3">
                  <p className="faq-a-text mb-0">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
