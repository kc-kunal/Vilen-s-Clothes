import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { saveOrder } from '../../firebase/orderService';
import './CheckoutModal.css';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    clearCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    appliedCoupon,
    setAppliedCoupon,
    openOrderSuccess
  } = useShop();

  const [step, setStep] = useState(1); // 1: Mobile, 2: Address, 3: Payment
  const [mobile, setMobile] = useState('');
  const [notifyConsent, setNotifyConsent] = useState(true);

  // Address
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Rajasthan');
  const [pincode, setPincode] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'cod', 'card'
  const [couponInput, setCouponInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleMobileNext = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStep(2);
  };

  const handleAddressNext = (e) => {
    e.preventDefault();
    if (!name || !address || !city || !pincode) {
      alert('Please fill out all address fields.');
      return;
    }
    setStep(3);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.toUpperCase() === 'VILEN10') {
      setAppliedCoupon('VILEN10');
      alert('Coupon VILEN10 applied successfully! 10% discount added.');
    } else if (couponInput.toUpperCase() === 'VILEN500') {
      setAppliedCoupon('VILEN500');
      alert('Coupon VILEN500 applied! ₹500 off on your order.');
    } else {
      alert('Invalid coupon code. Try VILEN10.');
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const orderData = {
      orderId: 'VILEN-' + Math.floor(100000 + Math.random() * 900000),
      customer: {
        mobile,
        name,
        address,
        city,
        state: stateName,
        pincode
      },
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount,
      coupon: appliedCoupon,
      shipping: 0,
      total: cartTotal,
      paymentMethod
    };

    try {
      const saved = await saveOrder(orderData);
      clearCart();
      closeCheckout();
      openOrderSuccess(saved);
    } catch (err) {
      console.error('Order creation error:', err);
      // Fallback local open
      clearCart();
      closeCheckout();
      openOrderSuccess(orderData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-modal-backdrop" onClick={closeCheckout}>
      <div className="checkout-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Strip matching Screenshot 4 */}
        <div className="checkout-brand-strip d-flex align-items-center justify-content-between px-3 py-2 bg-white border-bottom">
          <div className="d-flex align-items-center">
            <button className="btn-back-link me-3" onClick={closeCheckout}>
              <i className="bi bi-arrow-left fs-5"></i>
            </button>
            <span className="checkout-brand-logo">
              ⚡ VILEN'S CLOTHES
            </span>
          </div>
          <button className="btn-close" onClick={closeCheckout}></button>
        </div>

        {/* Free Shipping Announcement (Screenshot 4) */}
        <div className="checkout-promo-bar text-center py-2 text-white">
          <span>Get Free Express Shipping on all orders 🇮🇳</span>
        </div>

        <div className="checkout-main-content">
          <div className="row g-0">
            {/* Left Steps Form */}
            <div className="col-lg-7 p-3 p-md-4 steps-column">
              {/* Stepper Progress */}
              <div className="checkout-steps-nav d-flex justify-content-between mb-4 pb-2 border-bottom">
                <span className={`step-badge ${step >= 1 ? 'active' : ''}`}>1. Mobile</span>
                <span className={`step-badge ${step >= 2 ? 'active' : ''}`}>2. Address</span>
                <span className={`step-badge ${step >= 3 ? 'active' : ''}`}>3. Payment</span>
              </div>

              {/* STEP 1: MOBILE (Screenshot 4) */}
              {step === 1 && (
                <div className="step-mobile-box">
                  <h3 className="step-heading mb-1">Enter your mobile number to continue.</h3>
                  <p className="text-muted small mb-3">We will send order confirmation & tracking updates here.</p>

                  <form onSubmit={handleMobileNext}>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-white">+91</span>
                      <input 
                        type="tel"
                        className="form-control form-control-lg fs-6"
                        placeholder="10-digit mobile number"
                        value={mobile}
                        maxLength={10}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        required
                        autoFocus
                      />
                      <button type="submit" className="btn btn-dark px-4 fw-bold">
                        Next
                      </button>
                    </div>

                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="notifyCheck"
                        checked={notifyConsent}
                        onChange={(e) => setNotifyConsent(e.target.checked)}
                      />
                      <label className="form-check-label small text-muted" htmlFor="notifyCheck">
                        Notify me on orders, WhatsApp updates & VIP drops
                      </label>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: SHIPPING ADDRESS */}
              {step === 2 && (
                <div className="step-address-box">
                  <h3 className="step-heading mb-1">Where should we deliver your fit?</h3>
                  <p className="text-muted small mb-3">Contact: +91 {mobile} (<a href="#" onClick={() => setStep(1)}>edit</a>)</p>

                  <form onSubmit={handleAddressNext}>
                    <div className="mb-2">
                      <label className="small fw-bold">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Kunal Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label className="small fw-bold">Street Address / House No / Area *</label>
                      <textarea 
                        className="form-control" 
                        rows={2}
                        placeholder="Flat 204, Royal Palms, Link Road"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="small fw-bold">City *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Jaipur / Mumbai"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="small fw-bold">Pincode *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="302020"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(1)}>
                        Back
                      </button>
                      <button type="submit" className="btn btn-dark flex-grow-1 fw-bold">
                        Continue to Payment →
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 3 && (
                <div className="step-payment-box">
                  <h3 className="step-heading mb-1">Select Payment Method</h3>
                  <p className="text-muted small mb-3">All transactions are 100% encrypted and secure.</p>

                  <div className="payment-options-list mb-3">
                    {/* UPI */}
                    <div 
                      className={`payment-choice-card p-3 mb-2 rounded-2 ${paymentMethod === 'upi' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <input type="radio" checked={paymentMethod === 'upi'} readOnly />
                          <span className="fw-bold">UPI / QR Code (Google Pay, PhonePe, Paytm)</span>
                        </div>
                        <span className="badge bg-success">FASTEST</span>
                      </div>
                      {paymentMethod === 'upi' && (
                        <div className="payment-subnote mt-2 small text-muted">
                          ⚡ Instant QR code / UPI payment option will be generated upon confirmation.
                        </div>
                      )}
                    </div>

                    {/* COD */}
                    <div 
                      className={`payment-choice-card p-3 mb-2 rounded-2 ${paymentMethod === 'cod' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                          <span className="fw-bold">Cash on Delivery (COD)</span>
                        </div>
                        <span className="badge bg-dark">DOORSTEP</span>
                      </div>
                      {paymentMethod === 'cod' && (
                        <div className="payment-subnote mt-2 small text-muted">
                          Pay cash or UPI to courier executive upon delivery at your door.
                        </div>
                      )}
                    </div>

                    {/* Cards / NetBanking */}
                    <div 
                      className={`payment-choice-card p-3 rounded-2 ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <input type="radio" checked={paymentMethod === 'card'} readOnly />
                        <span className="fw-bold">Credit / Debit Card & NetBanking</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-dark flex-grow-1 fw-bold py-2"
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Processing Order...</span>
                      ) : (
                        <span>Confirm & Place Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Column (Matching Screenshot 4) */}
            <div className="col-lg-5 p-3 p-md-4 summary-column border-start">
              <div className="summary-title-row d-flex align-items-center mb-3">
                <i className="bi bi-bag-check me-2 fs-5"></i>
                <h4 className="summary-title mb-0">Order Summary | {cart.length} item{cart.length > 1 ? 's' : ''}</h4>
              </div>

              {/* Products list with thumbnails */}
              <div className="summary-items-list mb-3">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="summary-item-row d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-light">
                    <div className="d-flex align-items-center gap-2">
                      <div className="summary-thumb position-relative">
                        <img src={item.image} alt={item.name} />
                        <span className="summary-badge-qty">{item.quantity}</span>
                      </div>
                      <div>
                        <div className="summary-item-name">{item.name}</div>
                        {!item.isAddon && (
                          <div className="summary-item-spec text-muted">{item.size} · {item.color}</div>
                        )}
                      </div>
                    </div>
                    <span className="summary-item-price fw-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="coupon-box d-flex gap-2 mb-3">
                <input 
                  type="text" 
                  className="form-control form-control-sm text-uppercase"
                  placeholder="Discount code (e.g. VILEN10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-dark btn-sm fw-bold px-3">
                  Apply
                </button>
              </form>

              {/* Price Breakdown (Screenshot 4) */}
              <div className="breakdown-rows small">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Subtotal:</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-1 text-success fw-bold">
                    <span>Discount ({appliedCoupon}):</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping Charges:</span>
                  <span className="text-success fw-bold">FREE</span>
                </div>

                <div className="d-flex justify-content-between align-items-baseline pt-2 border-top mt-2">
                  <span className="fw-bold fs-5">Total:</span>
                  <span className="fw-bold fs-5 text-dark">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Trust Badges footer */}
              <div className="summary-trust-footer mt-4 pt-3 border-top text-center text-muted small">
                <div className="d-flex justify-content-center gap-3 mb-1">
                  <span>🔒 256-Bit SSL</span>
                  <span>⚡ 24h Dispatch</span>
                  <span>🔄 7-Day Exchange</span>
                </div>
                <div style={{ fontSize: '0.68rem' }}>Powered by Vilen's Clothes Official Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
