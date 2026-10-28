import React from 'react';
import { useShop } from '../../context/ShopContext';
import './OrderSuccessModal.css';

export const OrderSuccessModal = () => {
  const { isOrderSuccessOpen, closeOrderSuccess, lastPlacedOrder } = useShop();

  if (!isOrderSuccessOpen || !lastPlacedOrder) return null;

  return (
    <div className="order-success-backdrop" onClick={closeOrderSuccess}>
      <div className="order-success-card p-4 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-bubble mb-3">
          🎉
        </div>

        <span className="success-kicker">ORDER CONFIRMED</span>
        <h2 className="success-title mb-1">YOUR FIT IS ON THE WAY!</h2>
        <p className="text-muted small mb-3">
          Thank you for ordering from Vilen's Clothes. Your order is being packed for express dispatch.
        </p>

        {/* Order Details Card */}
        <div className="order-summary-box p-3 rounded-3 text-start mb-3">
          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
            <span className="text-muted small">Tracking ID:</span>
            <span className="fw-bold font-monospace text-danger">{lastPlacedOrder.trackingNumber || 'VILEN-894102'}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted small">Estimated Delivery:</span>
            <span className="fw-bold text-success">3 - 4 Business Days</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted small">Recipient:</span>
            <span className="fw-bold">{lastPlacedOrder.customer?.name} (+91 {lastPlacedOrder.customer?.mobile})</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted small">Shipping To:</span>
            <span className="small text-end" style={{ maxWidth: '240px' }}>
              {lastPlacedOrder.customer?.address}, {lastPlacedOrder.customer?.city} ({lastPlacedOrder.customer?.pincode})
            </span>
          </div>
          <div className="d-flex justify-content-between pt-2 border-top">
            <span className="fw-bold">Total Amount Paid / Payable:</span>
            <span className="fw-bold text-dark fs-5">₹{lastPlacedOrder.total?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* WhatsApp & Continue Shopping buttons */}
        <div className="d-flex flex-column gap-2">
          <button 
            className="btn btn-success fw-bold py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
            onClick={() => alert('Order confirmation sent to your WhatsApp!')}
          >
            <i className="bi bi-whatsapp"></i> Get Updates on WhatsApp
          </button>
          <button 
            className="btn btn-dark fw-bold py-2 rounded-pill"
            onClick={closeOrderSuccess}
          >
            Continue Shopping More Fits
          </button>
        </div>
      </div>
    </div>
  );
};
