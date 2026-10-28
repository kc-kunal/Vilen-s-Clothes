import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { trackOrderByQuery } from '../../firebase/orderService';
import './TrackOrderModal.css';

export const TrackOrderModal = () => {
  const { isTrackOrderOpen, closeTrackOrder } = useShop();
  const [query, setQuery] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    const found = trackOrderByQuery(query);
    setOrderResult(found);
    setHasSearched(true);
  };

  return (
    <div className="track-modal-backdrop" onClick={closeTrackOrder}>
      <div className="track-modal-card p-4" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <span className="fs-4 me-2">📦</span>
            <h3 className="track-title mb-0">TRACK YOUR ORDER</h3>
          </div>
          <button className="btn-close" onClick={closeTrackOrder}></button>
        </div>

        <p className="text-muted small mb-3">
          Enter your <strong>Tracking Number</strong> (e.g. VILEN-894102) or <strong>10-digit mobile number</strong> used during checkout.
        </p>

        <form onSubmit={handleSearch} className="d-flex gap-2 mb-4">
          <input 
            type="text" 
            className="form-control"
            placeholder="Enter Order / Tracking ID or Mobile"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="btn btn-dark fw-bold px-4">
            Track
          </button>
        </form>

        {hasSearched && !orderResult && (
          <div className="alert alert-warning small text-center mb-0">
            <i className="bi bi-info-circle-fill me-1"></i>
            No active order found for "{query}". Please check the tracking number or place a new test order!
          </div>
        )}

        {orderResult && (
          <div className="order-result-box p-3 rounded-3 bg-light border">
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
              <div>
                <span className="badge bg-success me-2">{orderResult.status}</span>
                <span className="small text-muted font-monospace">{orderResult.trackingNumber}</span>
              </div>
              <span className="fw-bold small">Total: ₹{orderResult.total}</span>
            </div>

            {/* Interactive Timeline */}
            <div className="track-stepper-box my-3">
              <div className="track-line active"></div>
              <div className="d-flex justify-content-between text-center small position-relative">
                <div>
                  <div className="dot active">✓</div>
                  <span className="fw-bold d-block mt-1">Confirmed</span>
                </div>
                <div>
                  <div className="dot active">⚡</div>
                  <span className="fw-bold d-block mt-1">Dispatched</span>
                </div>
                <div>
                  <div className="dot">🚚</div>
                  <span className="text-muted d-block mt-1">In Transit</span>
                </div>
                <div>
                  <div className="dot">🏠</div>
                  <span className="text-muted d-block mt-1">Delivered</span>
                </div>
              </div>
            </div>

            <div className="small text-muted mt-2">
              <strong>Delivery to:</strong> {orderResult.customer?.name}, {orderResult.customer?.city} ({orderResult.customer?.pincode})
            </div>
          </div>
        )}

        <div className="support-cta-box text-center mt-3 pt-3 border-top small text-muted">
          Need immediate help with your package? Call or WhatsApp our 24/7 concierge at <strong>+91 98765 43210</strong>
        </div>
      </div>
    </div>
  );
};
