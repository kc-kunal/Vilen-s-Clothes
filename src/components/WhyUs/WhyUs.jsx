import React from 'react';
import './WhyUs.css';

export const WhyUs = () => {
  return (
    <section className="why-us-section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-kicker">THE VILEN'S PROMISE</span>
          <h2 className="why-heading">WHY 1,50,000+ CUSTOMERS CHOOSE US</h2>
        </div>

        <div className="row g-3 g-md-4">
          <div className="col-12 col-md-4">
            <div className="why-card p-4 text-center h-100">
              <div className="why-stat-num">240+ GSM</div>
              <h3 className="why-card-title">Heavyweight French Terry</h3>
              <p className="why-card-desc mb-0">
                Custom-knit 100% combed cotton with dense weave that holds structure, never rolls at collar, and gets softer with every wash.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="why-card p-4 text-center h-100">
              <div className="why-stat-num">24-48 HR</div>
              <h3 className="why-card-title">Express Dispatch</h3>
              <p className="why-card-desc mb-0">
                Automated fulfillment centers in Mumbai & Delhi. Orders dispatched within 24h with real-time SMS & WhatsApp tracking updates.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="why-card p-4 text-center h-100">
              <div className="why-stat-num">7-DAY</div>
              <h3 className="why-card-title">Doorstep Size Exchange</h3>
              <p className="why-card-desc mb-0">
                Fit not 100% perfect? We send our delivery partner to pick up and hand over your replacement size directly at your door with zero hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
