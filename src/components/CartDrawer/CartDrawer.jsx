import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import './CartDrawer.css';

export const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    discountAmount,
    amountUntilGift,
    giftProgressPercent,
    hasUnlockedGift,
    CROSS_SELL_ADDONS,
    addCrossSell,
    openCheckout
  } = useShop();

  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    if (!agreeTerms) {
      alert('Please agree to terms and conditions to proceed with checkout.');
      return;
    }
    closeCart();
    openCheckout();
  };

  return (
    <div className="cart-drawer-backdrop" onClick={closeCart}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header (Screenshot 3) */}
        <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
          <h2 className="cart-title mb-0">
            Cart <span className="cart-count-badge">({cart.length})</span>
          </h2>
          <button className="btn-close-cart" onClick={closeCart} aria-label="Close cart">
            <i className="bi bi-x me-1"></i> Close
          </button>
        </div>

        {/* Yellow Urgency Bar (Screenshot 3) */}
        <div className="cart-urgency-banner py-2 px-3 text-center">
          <i className="bi bi-lightning-charge-fill me-1"></i>
          <strong>Order now — dispatched within 24 hours</strong>
        </div>

        {/* Gamified Mystery Gift Unlock Progress (Screenshot 3) */}
        <div className="cart-gamified-bar p-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="perk-label">
              {hasUnlockedGift ? (
                <span className="text-success fw-bold">
                  🎉 Mystery Gift UNLOCKED! (Free Street Beanie / Cap)
                </span>
              ) : (
                <span>
                  Unlock a <strong>Mystery Street Gift 🎁</strong> — just <strong>₹{amountUntilGift}</strong> more
                </span>
              )}
            </span>
          </div>

          <div className="progress progress-milestones position-relative">
            <div 
              className="progress-bar bg-dark" 
              role="progressbar" 
              style={{ width: `${giftProgressPercent}%` }}
              aria-valuenow={giftProgressPercent} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
            {/* Milestones markers */}
            <div className="milestone-marker start">
              <span className="marker-dot"></span>
              <span className="marker-text">Free Shipping</span>
            </div>
            <div className={`milestone-marker end ${hasUnlockedGift ? 'reached' : ''}`}>
              <span className="marker-dot"></span>
              <span className="marker-text">🎁 Free Gift</span>
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-body p-3">
          {cart.length === 0 ? (
            <div className="empty-cart-state text-center py-5">
              <div className="empty-bag-icon mb-3">🛍️</div>
              <h4 className="fw-bold mb-2">Your Bag is Empty</h4>
              <p className="text-muted small mb-3">
                Explore our 240+ GSM heavyweight oversized tees and outfit setup packs!
              </p>
              <button className="btn btn-dark rounded-pill px-4" onClick={closeCart}>
                Start Shopping Drops
              </button>
            </div>
          ) : (
            <div className="cart-products-list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item-row d-flex gap-3 mb-3 pb-3 border-bottom position-relative">
                  <div className="cart-thumb-box">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h4 className="cart-item-title mb-1">{item.name}</h4>
                      <button 
                        className="btn-remove-item"
                        onClick={() => removeFromCart(item.cartItemId)}
                        title="Remove"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>

                    {!item.isAddon && (
                      <div className="cart-item-variants text-muted mb-2">
                        <span>Size: <strong>{item.size}</strong></span>
                        {item.color && item.color !== 'Default' && (
                          <span className="ms-2">· Color: <strong>{item.color}</strong></span>
                        )}
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                      {/* Stepper */}
                      <div className="mini-stepper d-flex align-items-center">
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                      </div>

                      {/* Price */}
                      <div className="cart-item-pricing text-end">
                        <span className="cart-item-price fw-bold">
                          Rs. {(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cross-Sell Section (Screenshot 3 Add-ons) */}
          {cart.length > 0 && (
            <div className="cross-sell-box pt-2 mt-2">
              <h6 className="fw-bold text-uppercase mb-2 cross-sell-heading">
                ⚡ Frequently Added Together
              </h6>
              <div className="cross-sell-list">
                {CROSS_SELL_ADDONS.map((addon) => (
                  <div key={addon.id} className="cross-sell-card d-flex align-items-center gap-2 p-2 mb-2 rounded-2">
                    <img src={addon.image} alt={addon.name} className="cross-thumb" />
                    <div className="flex-grow-1">
                      <div className="cross-title text-truncate">{addon.name}</div>
                      <div className="cross-price-line">
                        <span className="fw-bold">₹{addon.price}</span>
                        <span className="text-decoration-line-through text-muted ms-1" style={{ fontSize: '0.7rem' }}>
                          ₹{addon.originalPrice}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="btn-add-cross"
                      onClick={() => addCrossSell(addon)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Area with Subtotal & CTA */}
        {cart.length > 0 && (
          <div className="cart-footer p-3 border-top bg-white">
            {/* Terms checkbox (Screenshot 3) */}
            <div className="form-check mb-3">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="termsCheck"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="termsCheck">
                I agree to all <strong>Terms and Conditions</strong>.
              </label>
            </div>

            {/* Price Row */}
            <div className="d-flex justify-content-between align-items-baseline mb-1">
              <span className="fw-bold">Subtotal:</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="d-flex justify-content-between align-items-baseline mb-1 text-success small">
                <span>Code VILEN10 (10% OFF):</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-baseline mb-3">
              <span className="fw-bold fs-5">Total:</span>
              <span className="fw-bold fs-5 text-dark">
                Rs. {cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Black Pill Checkout CTA (Screenshot 3) */}
            <button 
              className="btn-checkout-black w-100 mb-2"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>

            {/* Continue Shopping button */}
            <button 
              className="btn-continue-shopping w-100"
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
