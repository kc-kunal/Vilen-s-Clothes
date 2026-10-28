import React from 'react';
import { VERIFIED_REVIEWS } from '../../data/products';
import './ReviewsReel.css';

export const ReviewsReel = () => {
  return (
    <section id="reviews-section" className="reviews-section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-kicker">AUTHENTIC STREET FEEDBACK</span>
          <h2 className="reviews-heading">VERIFIED REVIEWS</h2>
          <div className="stars-row mb-1">
            <span className="text-warning fs-5">★★★★★</span>
          </div>
          <p className="text-muted small">
            Over 85,000+ five-star ratings across India. Real fit feedback from real buyers:
          </p>
        </div>

        <div className="row g-3 g-md-4">
          {VERIFIED_REVIEWS.map(rev => (
            <div key={rev.id} className="col-6 col-md-3">
              <div className="review-reel-card">
                <div className="review-img-wrapper">
                  <img src={rev.image} alt={rev.name} loading="lazy" />
                  <div className="review-reel-overlay">
                    <div className="buyer-badge mb-1">
                      <i className="bi bi-patch-check-fill text-primary me-1"></i>
                      <span>{rev.tag}</span>
                    </div>
                    <div className="review-quote-text">
                      {rev.text}
                    </div>
                    <div className="review-meta mt-2 pt-2 border-top border-light-subtle">
                      <div className="fw-bold text-white small">{rev.name} · {rev.city}</div>
                      <div className="text-white-50" style={{ fontSize: '0.65rem' }}>{rev.fit}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
