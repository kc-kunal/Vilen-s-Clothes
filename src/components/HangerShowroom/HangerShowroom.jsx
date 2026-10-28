import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import './HangerShowroom.css';

// 8 Streetwear T-Shirts for the Hanging Rack
const RACK_ITEMS = [
  {
    id: 'tee-acid-mecha',
    name: 'Neo-Tokyo Mecha Graphic Tee',
    price: 749,
    originalPrice: 1399,
    colorName: 'Pitch Black',
    filterClass: 'filter-black',
    graphic: 'NEO-TOKYO // 2099',
    graphicColor: '#ffffff'
  },
  {
    id: 'tee-vintage-speed',
    name: 'Retro GT Racing Boxy Tee',
    price: 799,
    originalPrice: 1499,
    colorName: 'Vintage Off-White',
    filterClass: 'filter-white',
    graphic: 'LE MANS // GT-77',
    graphicColor: '#111111'
  },
  {
    id: 'pack-acid-grunge',
    name: 'Acid-Wash Grunge Mineral Tee',
    price: 699,
    originalPrice: 1299,
    colorName: 'Acid Wash Grey',
    filterClass: 'filter-charcoal',
    graphic: 'OVERDOSE // RAW',
    graphicColor: '#ff5400'
  },
  {
    id: 'tee-tokyo-cyber',
    name: 'Cyber Samurai Oversized Tee',
    price: 749,
    originalPrice: 1399,
    colorName: 'Obsidian Black',
    filterClass: 'filter-obsidian',
    graphic: 'CYBER // SHOGUN',
    graphicColor: '#00f0ff'
  },
  {
    id: 'tee-heavy-mineral',
    name: 'Mineral Stone Heavyweight Tee',
    price: 799,
    originalPrice: 1499,
    colorName: 'Anthracite Dark Grey',
    filterClass: 'filter-anthracite',
    graphic: 'HEAVY // 260GSM',
    graphicColor: '#ffffff'
  },
  {
    id: 'pack-tokyo-night',
    name: 'Minimalist Tokyo Studio Boxy Tee',
    price: 699,
    originalPrice: 1299,
    colorName: 'Bone Chalk White',
    filterClass: 'filter-bone',
    graphic: 'TOKYO // STUDIO',
    graphicColor: '#111111'
  },
  {
    id: 'tee-speed-stealth',
    name: 'Formula Speed Stealth Tee',
    price: 749,
    originalPrice: 1399,
    colorName: 'Stealth Black',
    filterClass: 'filter-stealth',
    graphic: 'PIT LANE // 01',
    graphicColor: '#ffd600'
  },
  {
    id: 'tee-grunge-moss',
    name: 'Acid Moss Heavyweight Boxy Tee',
    price: 749,
    originalPrice: 1399,
    colorName: 'Acid Moss Green',
    filterClass: 'filter-green',
    graphic: 'BIO-WASH // HEAVY',
    graphicColor: '#ffffff'
  }
];

export const HangerShowroom = () => {
  const { openProductDetail, PRODUCTS, setActiveCategory } = useShop();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [scrollSway, setScrollSway] = useState(0);

  // Touch & Swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  // Scroll sway physics
  const lastScrollY = useRef(0);
  const decayTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Softened sway angle for smooth feel on mobile & desktop (clamp -8deg to +8deg)
      const swayAngle = Math.max(-8, Math.min(8, deltaY * 0.25));
      setScrollSway(swayAngle);

      clearTimeout(decayTimeout.current);
      decayTimeout.current = setTimeout(() => {
        setScrollSway(0);
      }, 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(decayTimeout.current);
    };
  }, []);

  const handleTeeClick = (item) => {
    const matched = PRODUCTS.find(p => p.id === item.id) || {
      id: item.id,
      name: item.name,
      subtitle: '240+ GSM Combed French Terry Cotton • Oversized Boxy Cut',
      price: item.price,
      originalPrice: item.originalPrice,
      images: ['/tees/tee-front.png'],
      tags: ['240+ GSM', '100% COTTON', 'DROP SHOULDER'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: 'tees',
      description: 'Custom-knit 240+ GSM heavyweight French Terry cotton with dropped shoulders, double bio-washing and thick ribbed collar that never sags.',
      fabricCare: 'Machine wash cold with like dark colors. Flat dry in shade.'
    };
    openProductDetail(matched);
  };

  const handleItemTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleItemTouchMove = (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > 10 || dy > 10) {
      isSwiping.current = true;
    }
  };

  const handleItemInteraction = (item, index) => {
    if (isSwiping.current) {
      return; // Was swiping, don't trigger click
    }
    // If not hovered/active yet, reveal front view on tap!
    if (hoveredIdx !== index) {
      setHoveredIdx(index);
    } else {
      // Second tap navigates to product
      handleTeeClick(item);
    }
  };

  const scrollToProducts = () => {
    setActiveCategory('packs');
    const elem = document.getElementById('products-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBundle = () => {
    const elem = document.getElementById('bundle-builder-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hanger-hero-wrapper text-center pt-2 pt-md-3 pb-3 pb-md-4">
      <div className="container-fluid px-0">
        {/* Hero Headline above Hanger */}
        <div className="hero-headline-container mb-2 mb-md-3">
          <h1 className="hero-headline mb-0">
            1,50,000+ FITS STYLED.
          </h1>
          <h2 className="hero-subheadline mb-2 mb-md-3">
            Yours next.
          </h2>
          <div className="mobile-scroll-hint d-inline-flex d-md-none">
            <i className="bi bi-chevron-left me-1"></i> Swipe rack to view 8 fits <i className="bi bi-chevron-right ms-1"></i>
          </div>
        </div>

        {/* 3D Clothing Rail Arena */}
        <div className="clothes-rail-stage mb-3 mb-md-4">
          <div 
            className="rack-scroll-viewport"
            onTouchStart={handleItemTouchStart}
            onTouchMove={handleItemTouchMove}
          >
            <div className="rack-assembly-container">
              {/* Solid Metallic Wardrobe Bar */}
              <div className="showroom-rail-bar">
                <div className="rail-tube"></div>
                <div className="rail-bracket bracket-left"></div>
                <div className="rail-bracket bracket-right"></div>
              </div>

              {/* Hanging Clothes Track */}
              <div className="rail-hangers-track">
                {RACK_ITEMS.map((item, index) => {
                  const isHovered = hoveredIdx === index;
                  
                  let shiftClass = '';
                  if (hoveredIdx !== null) {
                    if (index < hoveredIdx) {
                      shiftClass = 'shift-left';
                    } else if (index > hoveredIdx) {
                      shiftClass = 'shift-right';
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      className={`rail-hanging-item ${isHovered ? 'active-front' : ''} ${shiftClass}`}
                      onMouseEnter={() => setHoveredIdx(index)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => handleItemInteraction(item, index)}
                      style={{
                        '--scroll-sway-deg': `${scrollSway}deg`
                      }}
                    >
                      {/* Hanger Hook + Authentic Showroom Price Tag */}
                      <div className="hanger-top-hook">
                        <svg className="hanger-hook-svg" viewBox="0 0 50 48" fill="none">
                          <path 
                            d="M25 42 L25 24 C25 14, 18 6, 26 1 C32 -2, 38 1, 36 8 C35 13, 29 15, 25 18" 
                            stroke="#52525b" 
                            strokeWidth="3.4" 
                            strokeLinecap="round" 
                            fill="none" 
                          />
                          <path 
                            d="M25 42 L25 24 C25 14, 18 6, 26 1 C32 -2, 38 1, 36 8 C35 13, 29 15, 25 18" 
                            stroke="#e4e4e7" 
                            strokeWidth="1.2" 
                            strokeLinecap="round" 
                            fill="none" 
                            strokeOpacity="0.8"
                          />
                          <path 
                            d="M4 46 Q25 35 46 46" 
                            stroke="#18181b" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            fill="none" 
                          />
                        </svg>

                        {/* Showroom Price Tag */}
                        <div className="hanger-neck-tag">
                          <span className="tag-currency">₹</span>{item.price}
                        </div>
                      </div>

                      {/* T-Shirt Canvas */}
                      <div className="tshirt-canvas-wrap">
                        {/* Side-view Image */}
                        <img 
                          src="/tees/tee-side.png" 
                          alt={`${item.name} side`}
                          className={`tee-asset-side ${item.filterClass}`}
                          loading="lazy"
                        />

                        {/* Front-view Image */}
                        <div className="front-reveal-box">
                          <img 
                            src="/tees/tee-front.png" 
                            alt={`${item.name} front`}
                            className={`tee-asset-front ${item.filterClass}`}
                            loading="lazy"
                          />
                          <div className="front-chest-graphic">
                            <div className="graphic-brand-title" style={{ color: item.graphicColor }}>
                              {item.graphic}
                            </div>
                          </div>
                          {/* Mobile & Desktop Action Badge */}
                          <div className="front-view-cta">
                            <span>VIEW FIT →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-action-buttons d-flex justify-content-center align-items-center gap-2 gap-md-3 mb-3 mb-md-4 px-3">
          <button 
            className="btn-hero-primary"
            onClick={scrollToProducts}
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

        {/* Trust Badges Bar */}
        <div className="hero-trust-bar py-2 px-3 rounded-3 mx-auto">
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
