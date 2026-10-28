import React from 'react';
import { useShop } from '../../context/ShopContext';
import './Footer.css';

export const Footer = () => {
  const { openTrackOrder, setActiveCategory } = useShop();

  const handleNav = (cat, e) => {
    e.preventDefault();
    setActiveCategory(cat);
    const elem = document.getElementById('products-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer text-white">
      {/* Help Bar Banner (Matching Posterized bottom black banner) */}
      <div className="footer-help-bar py-3 text-center border-bottom border-dark-subtle">
        <div className="container">
          <span className="me-2 text-white-50">Need help with an order?</span>
          <button 
            className="btn-help-pill"
            onClick={openTrackOrder}
          >
            Track Order & Support <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 justify-content-between">
          {/* Brand Col */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center mb-2">
              <span className="fs-4 me-1">⚡</span>
              <span className="brand-logo-text">VILEN'S CLOTHES</span>
            </div>
            <p className="footer-tagline text-white-50 small mb-3">
              India's premier high-density 240+ GSM streetwear and curated outfit setup packs. Engineered for the youth who dare to stand apart.
            </p>
            <div className="social-links d-flex gap-2">
              <a href="#" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
              <a href="#" className="social-icon" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="social-icon" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h4 className="footer-heading">SHOP DROPS</h4>
            <ul className="footer-menu list-unstyled mb-0">
              <li><a href="#" onClick={(e) => handleNav('packs', e)}>Outfit Setup Packs</a></li>
              <li><a href="#" onClick={(e) => handleNav('tees', e)}>Oversized Tees</a></li>
              <li><a href="#" onClick={(e) => handleNav('hoodies', e)}>Winter Hoodies</a></li>
              <li><a href="#" onClick={(e) => handleNav('cargos', e)}>Tactical Cargos</a></li>
              <li><a href="#" onClick={(e) => handleNav('combos', e)}>Mix & Match Deals</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="col-6 col-md-3">
            <h4 className="footer-heading">CUSTOMER CARE</h4>
            <ul className="footer-menu list-unstyled mb-0">
              <li><a href="#" onClick={(e) => { e.preventDefault(); openTrackOrder(); }}>Track Live Order</a></li>
              <li><a href="#reviews-section">Verified Reviews</a></li>
              <li><a href="#">Size Guide & Fit Tips</a></li>
              <li><a href="#">7-Day Doorstep Exchange</a></li>
              <li><a href="#">Shipping & COD Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="col-12 col-md-3">
            <h4 className="footer-heading">EXCLUSIVE DROPS</h4>
            <p className="text-white-50 small mb-2">
              Subscribe to unlock private midnight drops & secret VIP codes.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to VIP drops!'); }} className="newsletter-form d-flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="form-control form-control-sm rounded-0 border-0" 
                required 
              />
              <button type="submit" className="btn btn-warning btn-sm rounded-0 fw-bold px-3">
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="footer-bottom-row pt-4 mt-4 border-top border-dark-subtle d-flex flex-wrap justify-content-between align-items-center text-white-50 small">
          <div>
            © 2026 VILEN'S CLOTHES. All rights reserved. Built with React & Firebase.
          </div>
          <div className="d-flex gap-3">
            <span>Refund Policy</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
