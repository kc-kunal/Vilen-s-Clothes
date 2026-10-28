import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart, openProductDetail } = useShop();
  const [selectedSize, setSelectedSize] = useState('L');
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const displayImage = isHovered && product.images && product.images[1]
    ? product.images[1]
    : (product.images ? product.images[0] : product.image);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors ? product.colors[0].name : null, 1);
  };

  return (
    <div 
      className="product-card-wrap h-100"
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-inner">
        {/* Image Container with Badges */}
        <div className="product-img-box position-relative">
          <img 
            src={displayImage} 
            alt={product.name} 
            className="product-img" 
            loading="lazy"
          />

          {/* Badges */}
          <div className="badges-container">
            {product.badge && (
              <span className={`badge-pill ${product.badge === 'BESTSELLER' ? 'bestseller' : 'hot'}`}>
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="badge-pill sale">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Quick Rating Badge */}
          <div className="card-rating-pill">
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{product.rating}</span>
            <span className="review-count">({product.reviewsCount})</span>
          </div>

          {/* Quick Size Selector on Hover */}
          <div className="quick-sizes-bar" onClick={(e) => e.stopPropagation()}>
            <span className="size-label">Size:</span>
            {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((sz) => (
              <button
                key={sz}
                className={`quick-sz-btn ${selectedSize === sz ? 'active' : ''}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Content Box */}
        <div className="product-info-box">
          <h3 className="product-title text-truncate">
            {product.name}
          </h3>

          {product.pieceBreakdownText && (
            <div className="piece-breakdown">
              <i className="bi bi-check-circle-fill me-1"></i>
              {product.pieceBreakdownText}
            </div>
          )}

          {/* Price Row */}
          <div className="price-row d-flex align-items-baseline gap-2 mt-1 mb-2">
            <span className="sale-price">Rs. {product.price.toLocaleString('en-IN')}</span>
            <span className="mrp-price text-decoration-line-through">Rs. {product.originalPrice.toLocaleString('en-IN')}</span>
          </div>

          {/* Posterized style Black Pill CTA */}
          <button 
            className="btn-add-cart-pill w-100"
            onClick={handleQuickAdd}
          >
            <span>Add to cart — ₹{product.price.toLocaleString('en-IN')}</span>
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
