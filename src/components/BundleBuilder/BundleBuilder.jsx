import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import './BundleBuilder.css';

const TOPS = [
  { id: 'b-top-1', name: 'Neo-Tokyo Mecha Drop Tee (260 GSM)', price: 749, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80' },
  { id: 'b-top-2', name: 'Retro GT Racing Boxy Tee', price: 799, img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop&q=80' },
  { id: 'b-top-3', name: 'Heavyweight French Terry Boxy Hoodie', price: 1299, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80' }
];

const BOTTOMS = [
  { id: 'b-bot-1', name: 'Tactical 8-Pocket Parachute Cargo - Black', price: 1199, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&auto=format&fit=crop&q=80' },
  { id: 'b-bot-2', name: 'Tailored Wide-Leg Relaxed Trousers', price: 1149, img: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&auto=format&fit=crop&q=80' }
];

const ACCESSORIES = [
  { id: 'b-acc-1', name: '316L Stainless Steel Figaro Chain (60cm)', price: 149, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=80' },
  { id: 'b-acc-2', name: 'Vilen Ribbed Street Cuff Beanie', price: 199, img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&auto=format&fit=crop&q=80' }
];

export const BundleBuilder = () => {
  const { addToCart, openCart } = useShop();

  const [selectedTop, setSelectedTop] = useState(TOPS[0]);
  const [selectedBottom, setSelectedBottom] = useState(BOTTOMS[0]);
  const [selectedAcc, setSelectedAcc] = useState(ACCESSORIES[0]);
  const [selectedSize, setSelectedSize] = useState('L');

  const bundleRawTotal = selectedTop.price + selectedBottom.price + selectedAcc.price;
  const bundleDiscountedPrice = 1699;
  const bundleSavings = bundleRawTotal - bundleDiscountedPrice;

  const handleAddBundle = () => {
    const bundleProduct = {
      id: 'custom-bundle-' + Date.now(),
      name: 'Custom 3-Piece Fit Bundle (' + selectedTop.name.split(' ')[0] + ' + ' + selectedBottom.name.split(' ')[0] + ')',
      subtitle: selectedTop.name + ' + ' + selectedBottom.name + ' + ' + selectedAcc.name,
      price: bundleDiscountedPrice,
      originalPrice: bundleRawTotal,
      images: [selectedTop.img, selectedBottom.img, selectedAcc.img],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Custom Combo', hex: '#111' }]
    };

    addToCart(bundleProduct, selectedSize, 'Custom Combo', 1);
    openCart();
  };

  return (
    <section id="bundle-builder-section" className="bundle-section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <span className="bundle-pill-badge">INTERACTIVE FIT CREATOR</span>
          <h2 className="bundle-main-heading">BUILD YOUR OWN 3-PIECE FIT</h2>
          <p className="bundle-subtext mx-auto text-muted">
            Pick your favorite Top + Bottoms + Street Accent. Bundle together and unlock instant ₹{bundleSavings} savings!
          </p>
        </div>

        <div className="row g-4 align-items-center">
          {/* Left: Customizer Selection Columns */}
          <div className="col-lg-7">
            <div className="customizer-card p-3 p-md-4">
              {/* Step 1: Tops */}
              <div className="step-group mb-4">
                <div className="step-title-row d-flex justify-content-between mb-2">
                  <span className="step-num">STEP 1: SELECT TOP</span>
                  <span className="step-active-val text-dark font-weight-bold">{selectedTop.name}</span>
                </div>
                <div className="row g-2">
                  {TOPS.map(top => (
                    <div key={top.id} className="col-4">
                      <div 
                        className={`picker-tile ${selectedTop.id === top.id ? 'active' : ''}`}
                        onClick={() => setSelectedTop(top)}
                      >
                        <img src={top.img} alt={top.name} />
                        <div className="picker-caption text-truncate">{top.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Bottoms */}
              <div className="step-group mb-4">
                <div className="step-title-row d-flex justify-content-between mb-2">
                  <span className="step-num">STEP 2: SELECT BOTTOMS</span>
                  <span className="step-active-val text-dark font-weight-bold">{selectedBottom.name}</span>
                </div>
                <div className="row g-2">
                  {BOTTOMS.map(bot => (
                    <div key={bot.id} className="col-6">
                      <div 
                        className={`picker-tile ${selectedBottom.id === bot.id ? 'active' : ''}`}
                        onClick={() => setSelectedBottom(bot)}
                      >
                        <img src={bot.img} alt={bot.name} />
                        <div className="picker-caption text-truncate">{bot.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Accessories */}
              <div className="step-group mb-3">
                <div className="step-title-row d-flex justify-content-between mb-2">
                  <span className="step-num">STEP 3: SELECT ACCESSORY</span>
                  <span className="step-active-val text-dark font-weight-bold">{selectedAcc.name}</span>
                </div>
                <div className="row g-2">
                  {ACCESSORIES.map(acc => (
                    <div key={acc.id} className="col-6">
                      <div 
                        className={`picker-tile ${selectedAcc.id === acc.id ? 'active' : ''}`}
                        onClick={() => setSelectedAcc(acc)}
                      >
                        <img src={acc.img} alt={acc.name} />
                        <div className="picker-caption text-truncate">{acc.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selector for Bundle */}
              <div className="bundle-size-row d-flex align-items-center gap-2 pt-2 border-top">
                <span className="size-pick-label">Select Outfit Size:</span>
                {['S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                  <button
                    key={sz}
                    className={`bundle-sz-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Bundle Preview & Instant Checkout Card */}
          <div className="col-lg-5">
            <div className="bundle-summary-card p-4">
              <div className="bundle-badge-banner mb-3">
                <i className="bi bi-stars me-1"></i> COMBO PACK SAVINGS UNLOCKED
              </div>

              {/* 3-Piece Visual Stack */}
              <div className="bundle-visual-grid mb-3">
                <div className="bundle-preview-box">
                  <img src={selectedTop.img} alt="Top" />
                  <span className="layer-tag">Top</span>
                </div>
                <div className="bundle-preview-box">
                  <img src={selectedBottom.img} alt="Bottom" />
                  <span className="layer-tag">Bottom</span>
                </div>
                <div className="bundle-preview-box">
                  <img src={selectedAcc.img} alt="Accessory" />
                  <span className="layer-tag">Accessory</span>
                </div>
              </div>

              <div className="bundle-pricing-box p-3 rounded-3 mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Individual Items Value:</span>
                  <span className="text-decoration-line-through text-muted">₹{bundleRawTotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-success font-weight-bold">Bundle Discount Applied:</span>
                  <span className="text-success font-weight-bold">- ₹{bundleSavings}</span>
                </div>
                <div className="d-flex justify-content-between align-items-baseline pt-2 border-top mt-2">
                  <span className="h6 mb-0 font-weight-bold">Combo Pack Price:</span>
                  <div className="text-end">
                    <span className="bundle-final-price">₹{bundleDiscountedPrice}</span>
                    <div className="badge bg-success ms-1">FREE SHIPPING</div>
                  </div>
                </div>
              </div>

              <button 
                className="btn-add-bundle-pill w-100"
                onClick={handleAddBundle}
              >
                <span>Add Complete Bundle to Cart (₹{bundleDiscountedPrice})</span>
                <i className="bi bi-bag-check-fill ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
