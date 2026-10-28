import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { 
    selectedProduct, 
    backToHome, 
    addToCart, 
    openCart, 
    openSizeGuide,
    PRODUCTS 
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="container py-5 text-center">
        <h2>No Product Selected</h2>
        <button className="btn btn-dark mt-3" onClick={backToHome}>Return to Home</button>
      </div>
    );
  }

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
    openCart();
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? '' : name);
  };

  // Recommended products (excluding current)
  const relatedProducts = PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 4);

  return (
    <div className="product-page-wrapper">
      {/* Top Page Navigation Bar */}
      <div className="page-nav-bar py-3 border-bottom bg-white sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <button className="btn-back-home d-flex align-items-center gap-2" onClick={backToHome}>
            <i className="bi bi-arrow-left fs-5"></i>
            <span>Back to All Collections</span>
          </button>
          <div className="breadcrumb-trail text-muted small d-none d-md-block">
            Home / {selectedProduct.category?.toUpperCase() || 'DROPS'} / <strong>{selectedProduct.name}</strong>
          </div>
        </div>
      </div>

      {/* Main Single Product Layout */}
      <div className="container py-4 py-md-5">
        <div className="row g-4 g-lg-5">
          {/* Left Column: Image Gallery & Highlights */}
          <div className="col-lg-7">
            <div className="sticky-lg-top" style={{ top: '90px' }}>
              <div className="main-stage-img-wrap position-relative mb-3">
                <img 
                  src={images[activeImageIndex]} 
                  alt={selectedProduct.name}
                  className="main-stage-img"
                />
                {selectedProduct.badge && (
                  <span className="page-badge-pill">
                    {selectedProduct.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="page-sale-pill">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="thumbs-strip d-flex gap-2 mb-4">
                  {images.map((imgUrl, i) => (
                    <button
                      key={i}
                      className={`thumb-stage-btn ${activeImageIndex === i ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(i)}
                    >
                      <img src={imgUrl} alt={`Angle ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality Guarantee Callouts under image */}
              <div className="fabric-callouts-grid p-3 rounded-3 bg-white border d-flex justify-content-around text-center">
                <div>
                  <i className="bi bi-patch-check-fill text-dark fs-4"></i>
                  <div className="small fw-bold mt-1">240+ GSM Heavy</div>
                  <div className="text-muted" style={{ fontSize: '0.68rem' }}>100% Combed Terry</div>
                </div>
                <div className="border-start ps-3">
                  <i className="bi bi-shield-lock-fill text-dark fs-4"></i>
                  <div className="small fw-bold mt-1">No Bacon Collar</div>
                  <div className="text-muted" style={{ fontSize: '0.68rem' }}>Thick Ribbed Neck</div>
                </div>
                <div className="border-start ps-3">
                  <i className="bi bi-truck text-dark fs-4"></i>
                  <div className="small fw-bold mt-1">24h Dispatch</div>
                  <div className="text-muted" style={{ fontSize: '0.68rem' }}>Express India Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Sizing, CTA */}
          <div className="col-lg-5">
            <div className="product-details-content">
              {/* Category & Tags */}
              <div className="d-flex flex-wrap gap-1 mb-2">
                <span className="kicker-tag text-uppercase">{selectedProduct.category}</span>
                {selectedProduct.tags && selectedProduct.tags.map((t, idx) => (
                  <span key={idx} className="spec-badge-pill">{t}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="product-page-title mb-2">
                {selectedProduct.name}
              </h1>

              {/* Rating */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="text-warning">★★★★★</div>
                <span className="fw-bold">{selectedProduct.rating || 4.9}</span>
                <span className="text-muted small">({selectedProduct.reviewsCount || 1240} verified reviews)</span>
              </div>

              {/* Price Block */}
              <div className="page-price-card p-3 rounded-3 mb-3">
                <div className="d-flex align-items-baseline gap-3 mb-1">
                  <span className="page-current-price">
                    Rs. {selectedProduct.price?.toLocaleString('en-IN')}
                  </span>
                  <span className="page-mrp-price text-decoration-line-through text-muted">
                    Rs. {selectedProduct.originalPrice?.toLocaleString('en-IN')}
                  </span>
                  <span className="badge bg-danger">LIMITED DEAL</span>
                </div>
                <div className="small text-muted mb-2">
                  Inclusive of all taxes. Free express shipping automatically applied.
                </div>
                {selectedProduct.pieceBreakdownText && (
                  <div className="breakdown-highlight-pill small text-success fw-bold">
                    <i className="bi bi-check2-circle me-1"></i>
                    {selectedProduct.pieceBreakdownText}
                  </div>
                )}
              </div>

              {/* Urgency Stock Banner */}
              <div className="stock-urgency-box p-2 px-3 rounded-2 mb-4 d-flex align-items-center">
                <span className="me-2 fs-5">⚡</span>
                <span className="small">
                  Selling fast! Only <strong>{selectedProduct.stockLeft || 7} pieces</strong> remaining in stock.
                </span>
              </div>

              {/* Color Selector */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="mb-3">
                  <label className="fw-bold small mb-2 d-block">
                    Color: <span className="text-muted fw-normal">{selectedColor}</span>
                  </label>
                  <div className="d-flex gap-2">
                    {selectedProduct.colors.map((c, idx) => (
                      <button
                        key={idx}
                        className={`color-picker-dot ${selectedColor === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-bold small mb-0">Select Size (Oversized Boxy Cut):</label>
                  <button className="btn-size-guide-text" onClick={openSizeGuide}>
                    <i className="bi bi-rulers me-1"></i> Size Chart
                  </button>
                </div>
                <div className="size-buttons-group d-flex gap-2">
                  {(selectedProduct.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((sz) => (
                    <button
                      key={sz}
                      className={`size-pick-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Action Cluster */}
              <div className="cta-cluster mb-4">
                <div className="d-flex gap-2 mb-2">
                  <div className="stepper-box d-flex align-items-center">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button 
                    className="btn-add-to-cart-page flex-grow-1"
                    onClick={handleAddToCart}
                  >
                    Add to cart — ₹{(selectedProduct.price * quantity).toLocaleString('en-IN')}
                  </button>
                </div>
                <button 
                  className="btn-buy-now-page w-100"
                  onClick={handleBuyNow}
                >
                  ⚡ Buy Now with 1-Click
                </button>
              </div>

              {/* Interactive Delivery Timeline (Posterized Style) */}
              <div className="delivery-timeline-box p-3 rounded-3 mb-4 bg-white border">
                <div className="d-flex justify-content-between position-relative px-2">
                  <div className="timeline-node text-center">
                    <div className="node-icon active"><i className="bi bi-cart-check"></i></div>
                    <div className="node-title">Order Placed</div>
                    <div className="node-sub">Today</div>
                  </div>
                  <div className="timeline-line"></div>
                  <div className="timeline-node text-center">
                    <div className="node-icon active"><i className="bi bi-lightning-charge"></i></div>
                    <div className="node-title">Dispatch</div>
                    <div className="node-sub">In 24 Hours</div>
                  </div>
                  <div className="timeline-line"></div>
                  <div className="timeline-node text-center">
                    <div className="node-icon"><i className="bi bi-house-door"></i></div>
                    <div className="node-title">Delivered</div>
                    <div className="node-sub">3 - 4 Days</div>
                  </div>
                </div>
              </div>

              {/* What's in the pack */}
              {selectedProduct.inThePack && (
                <div className="pack-list-box p-3 rounded-3 mb-4 bg-white border">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-boxes me-2"></i> What's included in this pack:
                  </h6>
                  <ul className="list-unstyled mb-0">
                    {selectedProduct.inThePack.map((item, idx) => (
                      <li key={idx} className="pack-item-row py-1 border-bottom border-light">
                        <div className="fw-bold small">{item.item}</div>
                        <div className="text-muted" style={{ fontSize: '0.74rem' }}>{item.spec}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Accordions */}
              <div className="page-accordions">
                <div className="accordion-item-custom mb-2">
                  <button 
                    className="accordion-toggle-btn w-100 d-flex justify-content-between p-3"
                    onClick={() => toggleAccordion('desc')}
                  >
                    <span className="fw-bold small">Product Description</span>
                    <i className={`bi ${openAccordion === 'desc' ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="p-3 pt-0 text-muted small">
                      {selectedProduct.description}
                    </div>
                  )}
                </div>

                <div className="accordion-item-custom mb-2">
                  <button 
                    className="accordion-toggle-btn w-100 d-flex justify-content-between p-3"
                    onClick={() => toggleAccordion('fabric')}
                  >
                    <span className="fw-bold small">Fabric & Wash Care Instructions</span>
                    <i className={`bi ${openAccordion === 'fabric' ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  {openAccordion === 'fabric' && (
                    <div className="p-3 pt-0 text-muted small">
                      {selectedProduct.fabricCare || '100% Combed Heavy French Terry Cotton. Machine wash cold with similar colors. Do not iron directly on print. Line dry in shade.'}
                    </div>
                  )}
                </div>

                <div className="accordion-item-custom mb-2">
                  <button 
                    className="accordion-toggle-btn w-100 d-flex justify-content-between p-3"
                    onClick={() => toggleAccordion('exchange')}
                  >
                    <span className="fw-bold small">7-Day Doorstep Size Exchange</span>
                    <i className={`bi ${openAccordion === 'exchange' ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                  {openAccordion === 'exchange' && (
                    <div className="p-3 pt-0 text-muted small">
                      Fit not 100% perfect? We offer a completely free doorstep size exchange within 7 days of delivery. Our courier executive will hand over the replacement size at your door.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Carousel/Grid at Bottom */}
        <div className="related-section mt-5 pt-5 border-top">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="section-kicker">CURATED STREETWEAR</span>
              <h2 className="related-heading text-uppercase mb-0">YOU MAY ALSO LIKE</h2>
            </div>
            <button className="btn btn-sm btn-outline-dark rounded-pill px-3" onClick={backToHome}>
              View All Drops
            </button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 g-md-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="col">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
