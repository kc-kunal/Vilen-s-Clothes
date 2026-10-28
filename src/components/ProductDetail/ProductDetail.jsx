import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import './ProductDetail.css';

export const ProductDetail = () => {
  const { 
    selectedProduct, 
    closeProductDetail, 
    addToCart, 
    openCart, 
    openSizeGuide 
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors && selectedProduct.colors[0] ? selectedProduct.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('desc');

  const discountPercent = Math.round(
    ((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100
  );

  const images = selectedProduct.images || [selectedProduct.image];

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    closeProductDetail();
    openCart();
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? '' : name);
  };

  return (
    <div className="product-detail-backdrop" onClick={closeProductDetail}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Button */}
        <button className="detail-close-btn" onClick={closeProductDetail} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="container-fluid p-0">
          <div className="row g-0">
            {/* Left Column: Gallery & Thumbnails */}
            <div className="col-lg-7 p-3 p-md-4 gallery-col">
              <div className="main-image-viewport position-relative mb-3">
                <img 
                  src={images[activeImageIndex]} 
                  alt={selectedProduct.name}
                  className="main-detail-img"
                />
                {selectedProduct.badge && (
                  <span className="detail-badge-pill">
                    {selectedProduct.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="detail-sale-pill">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="thumbnails-row d-flex gap-2">
                  {images.map((imgUrl, i) => (
                    <button
                      key={i}
                      className={`thumb-btn ${activeImageIndex === i ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(i)}
                    >
                      <img src={imgUrl} alt={`angle ${i}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Specs & Actions */}
            <div className="col-lg-5 p-3 p-md-4 info-col">
              {/* Breadcrumb */}
              <div className="detail-breadcrumb mb-1">
                HOME / {selectedProduct.category?.toUpperCase() || 'DROPS'} / {selectedProduct.name}
              </div>

              {/* Title */}
              <h1 className="detail-title mb-1">
                {selectedProduct.name}
              </h1>

              {/* Tags */}
              {selectedProduct.tags && (
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {selectedProduct.tags.map((t, idx) => (
                    <span key={idx} className="spec-tag">{t}</span>
                  ))}
                </div>
              )}

              {/* Ratings */}
              <div className="detail-rating-row d-flex align-items-center gap-2 mb-2">
                <div className="stars text-warning">★★★★★</div>
                <span className="rating-score fw-bold">{selectedProduct.rating || 4.9}</span>
                <span className="text-muted small">({selectedProduct.reviewsCount || 1240} verified reviews)</span>
              </div>

              {/* Pricing Box */}
              <div className="detail-price-box p-3 rounded-3 mb-3">
                <div className="d-flex align-items-baseline gap-2 mb-1">
                  <span className="detail-mrp text-decoration-line-through">
                    Rs. {selectedProduct.originalPrice?.toLocaleString('en-IN')}
                  </span>
                  <span className="detail-current-price">
                    Rs. {selectedProduct.price?.toLocaleString('en-IN')}
                  </span>
                  <span className="badge bg-danger">SALE</span>
                </div>
                <div className="taxes-note small text-muted mb-1">
                  Taxes included. <strong>FREE Express Shipping</strong> auto-applied at checkout.
                </div>
                {selectedProduct.pieceBreakdownText && (
                  <div className="breakdown-pill-text text-success fw-bold small">
                    <i className="bi bi-shield-check me-1"></i>
                    {selectedProduct.pieceBreakdownText}
                  </div>
                )}
              </div>

              {/* High Urgency Ticker Banner */}
              <div className="urgency-banner p-2 px-3 rounded-2 mb-3 d-flex align-items-center">
                <span className="pulse-fire me-2">⚡</span>
                <span className="urgency-text">
                  Selling fast! Only <strong>{selectedProduct.stockLeft || 7} sets</strong> left in stock.
                </span>
              </div>

              {/* Color Selector */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="mb-3">
                  <label className="section-label">Color: <strong>{selectedColor}</strong></label>
                  <div className="d-flex gap-2 mt-1">
                    {selectedProduct.colors.map((c, idx) => (
                      <button
                        key={idx}
                        className={`color-swatch-btn ${selectedColor === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="section-label mb-0">Select Size (Oversized Boxy Fit):</label>
                  <button className="btn-size-guide-link" onClick={openSizeGuide}>
                    <i className="bi bi-rulers me-1"></i> Size Guide
                  </button>
                </div>
                <div className="size-selector-grid d-flex gap-2">
                  {(selectedProduct.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((sz) => (
                    <button
                      key={sz}
                      className={`size-choice-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="actions-cluster mb-3">
                <div className="d-flex gap-2 mb-2">
                  <div className="quantity-stepper d-flex align-items-center">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button 
                    className="btn-add-main flex-grow-1"
                    onClick={handleAddToCart}
                  >
                    Add to cart — ₹{(selectedProduct.price * quantity).toLocaleString('en-IN')}
                  </button>
                </div>
                <button 
                  className="btn-buynow-gold w-100"
                  onClick={handleBuyNow}
                >
                  ⚡ Buy Now with 1-Click
                </button>
              </div>

              {/* Interactive Delivery Timeline (Matching Posterized Screenshot 2) */}
              <div className="delivery-timeline-card p-3 rounded-3 mb-3">
                <div className="timeline-track d-flex justify-content-between position-relative">
                  <div className="timeline-step text-center">
                    <div className="step-icon-circle active">
                      <i className="bi bi-box-seam"></i>
                    </div>
                    <span className="step-time">Order Placed</span>
                    <span className="step-desc">Today</span>
                  </div>
                  <div className="timeline-connector"></div>
                  <div className="timeline-step text-center">
                    <div className="step-icon-circle active">
                      <i className="bi bi-truck"></i>
                    </div>
                    <span className="step-time">Dispatch</span>
                    <span className="step-desc">Within 24 Hours</span>
                  </div>
                  <div className="timeline-connector"></div>
                  <div className="timeline-step text-center">
                    <div className="step-icon-circle">
                      <i className="bi bi-house-door"></i>
                    </div>
                    <span className="step-time">Delivered</span>
                    <span className="step-desc">3 - 4 Days</span>
                  </div>
                </div>
                <div className="delivery-free-note text-center mt-2 small text-muted">
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                  Fast express dispatch across all India pin codes
                </div>
              </div>

              {/* What's in the pack list */}
              {selectedProduct.inThePack && selectedProduct.inThePack.length > 0 && (
                <div className="pack-contents-box p-3 rounded-3 mb-3">
                  <h6 className="fw-bold mb-2 font-weight-bold">
                    <i className="bi bi-collection-fill me-2 text-dark"></i>
                    What's in the pack:
                  </h6>
                  <ul className="list-unstyled mb-0">
                    {selectedProduct.inThePack.map((pItem, i) => (
                      <li key={i} className="pack-row py-1 border-bottom border-light">
                        <div className="fw-bold small">{pItem.item}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{pItem.spec}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Collapsible Accordions (Description, Fabric, Exchange) */}
              <div className="detail-accordions">
                {/* Description */}
                <div className="accordion-card mb-2">
                  <button 
                    className="accordion-head-btn d-flex justify-content-between w-100 p-2"
                    onClick={() => toggleAccordion('desc')}
                  >
                    <span className="fw-bold small">Product Description</span>
                    <i className={`bi ${openAccordion === 'desc' ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="accordion-body-text p-2 small text-muted">
                      {selectedProduct.description}
                    </div>
                  )}
                </div>

                {/* Fabric & Care */}
                <div className="accordion-card mb-2">
                  <button 
                    className="accordion-head-btn d-flex justify-content-between w-100 p-2"
                    onClick={() => toggleAccordion('care')}
                  >
                    <span className="fw-bold small">Fabric & Wash Care Instructions</span>
                    <i className={`bi ${openAccordion === 'care' ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  {openAccordion === 'care' && (
                    <div className="accordion-body-text p-2 small text-muted">
                      {selectedProduct.fabricCare || '100% Combed Bio-Washed French Terry Cotton. Machine wash cold with similar dark colors.'}
                    </div>
                  )}
                </div>

                {/* Exchange & Returns */}
                <div className="accordion-card">
                  <button 
                    className="accordion-head-btn d-flex justify-content-between w-100 p-2"
                    onClick={() => toggleAccordion('returns')}
                  >
                    <span className="fw-bold small">7-Day Doorstep Size Exchange</span>
                    <i className={`bi ${openAccordion === 'returns' ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  {openAccordion === 'returns' && (
                    <div className="accordion-body-text p-2 small text-muted">
                      Hassle-free 7-day exchange! If you need a different size, our delivery partner will pick up the current garment and hand over your replacement size directly at your doorstep.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
