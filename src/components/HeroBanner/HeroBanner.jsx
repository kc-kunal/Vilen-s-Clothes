import React from 'react';
import './HeroBanner.css';

/*
=============================================================================
[USER REQUEST: HERO BANNER CODE COMMENTED OUT]
Original Hero Banner with Mosaic Wall has been commented out below.
It has been replaced by the 3D T-Shirt Hanger Showroom (HangerShowroom.jsx).
=============================================================================

import { useShop } from '../../context/ShopContext';

const MOSAIC_PHOTOS = [
  { img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=350&auto=format&fit=crop&q=80', user: '@rohit.fit' },
  { img: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=350&auto=format&fit=crop&q=80', user: '@aarav.street' },
  { img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=350&auto=format&fit=crop&q=80', user: '@zoya.vibe' },
  { img: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=350&auto=format&fit=crop&q=80', user: '@kabir_d' },
  { img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=350&auto=format&fit=crop&q=80', user: '@neha_raw' },
  { img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=350&auto=format&fit=crop&q=80', user: '@vikram_g' },
  { img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=350&auto=format&fit=crop&q=80', user: '@tanya.c' },
  { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=350&auto=format&fit=crop&q=80', user: '@dev.sharma' }
];

export const HeroBanner = () => {
  const { setActiveCategory } = useShop();

  const scrollToProducts = (category) => {
    setActiveCategory(category);
    const elem = document.getElementById('products-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBundle = () => {
    const elem = document.getElementById('bundle-builder-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section text-center pt-4 pb-4">
      <div className="container">
        <div className="trust-badge-pill mx-auto mb-2">
          <span className="stars">★★★★★</span>
          <span className="trust-text">RATED 4.9/5 BY 85,000+ STREETWEAR ENTHUSIASTS</span>
        </div>

        <h1 className="hero-headline mb-0">
          1,50,000+ FITS STYLED.
        </h1>
        <h2 className="hero-subheadline mb-3">
          Yours next.
        </h2>

        <div className="mosaic-grid-wrapper mb-4">
          <div className="mosaic-scroll">
            {MOSAIC_PHOTOS.map((item, idx) => (
              <div key={idx} className="mosaic-item">
                <img src={item.img} alt="Customer street fit" loading="lazy" />
                <span className="mosaic-user">{item.user}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mb-4">
          <button 
            className="btn-hero-primary"
            onClick={() => scrollToProducts('packs')}
          >
            Shop Best Sellers
          </button>
          <button 
            className="btn-hero-secondary"
            onClick={scrollToBundle}
          >
            Build your fit
          </button>
        </div>

        <div className="hero-trust-bar py-2 px-3 rounded-3 mx-auto d-flex justify-content-around flex-wrap gap-2">
          <div className="trust-item">
            <i className="bi bi-shield-check text-dark me-1"></i>
            <span>240+ GSM Combed French Terry</span>
          </div>
          <div className="trust-item">
            <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
            <span>Dispatched within 24 Hours</span>
          </div>
          <div className="trust-item">
            <i className="bi bi-arrow-repeat text-dark me-1"></i>
            <span>7-Day Easy Doorstep Exchange</span>
          </div>
          <div className="trust-item">
            <i className="bi bi-cash-stack text-success me-1"></i>
            <span>Cash on Delivery Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
*/

// Export fallback empty component to preserve any existing imports cleanly
export const HeroBanner = () => {
  return null;
};
