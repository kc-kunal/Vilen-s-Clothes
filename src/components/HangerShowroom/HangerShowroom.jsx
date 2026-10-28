import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import './HangerShowroom.css';

// 8 Streetwear T-Shirts for the Hanging Rack (Using user-provided side & front PNGs)
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
    colorName: 'Charcoal Mineral Wash',
    filterClass: 'filter-charcoal',
    graphic: 'GRUNGE // VAULT',
    graphicColor: '#e4e4e7'
  },
  {
    id: 'tee-gothic-raw',
    name: 'Gothic Raw Hem Heavyweight Tee',
    price: 699,
    originalPrice: 1299,
    colorName: 'Obsidian Black',
    filterClass: 'filter-obsidian',
    graphic: 'GOTHIC // RAW 280',
    graphicColor: '#ffd600'
  },
  {
    id: 'pack-tokyo-cyber',
    name: 'Cyberpunk Tokyo Boxy Drop Tee',
    price: 749,
    originalPrice: 1449,
    colorName: 'Anthracite Dark',
    filterClass: 'filter-anthracite',
    graphic: 'TOKYO // NIGHTS',
    graphicColor: '#00f5d4'
  },
  {
    id: 'pack-monochrome-minimal',
    name: 'Monochrome Minimal Boxy Tee',
    price: 649,
    originalPrice: 1199,
    colorName: 'Bone Ivory White',
    filterClass: 'filter-bone',
    graphic: 'MINIMAL // 260 GSM',
    graphicColor: '#27272a'
  },
  {
    id: 'pack-shadow-tech',
    name: 'Shadow Tactical Heavyweight Tee',
    price: 799,
    originalPrice: 1499,
    colorName: 'Matte Stealth Black',
    filterClass: 'filter-stealth',
    graphic: 'TACTICAL // SPEC-07',
    graphicColor: '#ff5400'
  },
  {
    id: 'tee-moss-green',
    name: 'Acid Moss Vintage Drop Tee',
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

  // Scroll sway physics (item jo tange honge to scroll pr hilne chahiye)
  const lastScrollY = useRef(0);
  const decayTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Calculate inertia sway angle based on scroll speed (clamp -12deg to +12deg)
      const swayAngle = Math.max(-12, Math.min(12, deltaY * 0.4));
      setScrollSway(swayAngle);

      // Smoothly return to resting position after scroll pauses
      clearTimeout(decayTimeout.current);
      decayTimeout.current = setTimeout(() => {
        setScrollSway(0);
      }, 180);
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
    <section className="hanger-hero-wrapper text-center pt-3 pb-4">
      <div className="container-fluid px-0">
        

        {/* Hero Headline above Hanger */}
        <div className="hero-headline-container mb-3">
          <h1 className="hero-headline mb-0">
            1,50,000+ FITS STYLED.
          </h1>
          <h2 className="hero-subheadline mb-3">
            Yours next.
          </h2>
          <div className="mobile-scroll-hint d-inline-flex d-md-none">
            <i className="bi bi-chevron-left me-1"></i> Swipe rack to explore 8 fits <i className="bi bi-chevron-right ms-1"></i>
          </div>
        </div>

        {/* 3D Clothing Rail Arena */}
        <div className="clothes-rail-stage mb-4">
          <div className="rack-scroll-viewport">
            <div className="rack-assembly-container">
              {/* Solid Metallic Wardrobe Bar (Hooks clamp directly onto this bar with ZERO gap!) */}
              <div className="showroom-rail-bar">
                <div className="rail-tube"></div>
                <div className="rail-bracket bracket-left"></div>
                <div className="rail-bracket bracket-right"></div>
              </div>

              {/* Hanging Clothes Track (Snug rack spacing, collar inside hanger, zero floating gap) */}
              <div className="rail-hangers-track">
                {RACK_ITEMS.map((item, index) => {
                  const isHovered = hoveredIdx === index;
                  
                  // Shift items aside when an item is hovered:
                  // Left items shift left, right items shift right
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
                      onClick={() => handleTeeClick(item)}
                      style={{
                        '--scroll-sway-deg': `${scrollSway}deg`
                      }}
                    >
                      {/* Hanger Hook + Authentic Showroom Price Tag (Directly hooked on the metallic bar!) */}
                      <div className="hanger-top-hook">
                        <svg className="hanger-hook-svg" viewBox="0 0 50 48" fill="none">
                          {/* Chrome hook wrapping cleanly over the bar */}
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
                          {/* Wooden Hanger Shoulders inside collar */}
                          <path 
                            d="M4 46 Q25 35 46 46" 
                            stroke="#18181b" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            fill="none" 
                          />
                        </svg>

                        {/* Small Showroom Price Tag clipped to hanger neck */}
                        <div className="hanger-neck-tag">
                          <span className="tag-currency">₹</span>{item.price}
                        </div>
                      </div>

                      {/* 
                        T-SHIRT DISPLAY:
                        - Collar fits directly under the hanger shoulder (no floating gap)
                        - Snug, realistic boutique spacing between items
                      */}
                      <div className="tshirt-canvas-wrap">
                        {/* Side-view Image (Default) */}
                        <img 
                          src="/tees/tee-side.png" 
                          alt={`${item.name} side`}
                          className={`tee-asset-side ${item.filterClass}`}
                          loading="lazy"
                        />

                        {/* Front-view Image (Smoothly revealed on hover) */}
                        <div className="front-reveal-box">
                          <img 
                            src="/tees/tee-front.png" 
                            alt={`${item.name} front`}
                            className={`tee-asset-front ${item.filterClass}`}
                            loading="lazy"
                          />
                          {/* Minimalist Graphic Print on chest in front view */}
                          <div className="front-chest-graphic">
                            <div className="graphic-brand-title" style={{ color: item.graphicColor }}>
                              {item.graphic}
                            </div>
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

        {/* Action Buttons (Hero Section CTAs) */}
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mb-4">
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
