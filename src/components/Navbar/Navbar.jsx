import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import './Navbar.css';

export const Navbar = () => {
  const { 
    cartCount, 
    cartTotal, 
    openCart, 
    setActiveCategory, 
    openTrackOrder,
    searchQuery,
    setSearchQuery,
    currentView,
    backToHome,
    currentUser,
    openAuth,
    logout
  } = useShop();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (cat, e) => {
    if (e) e.preventDefault();
    if (currentView !== 'home') {
      backToHome();
    }
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const elem = document.getElementById('products-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToSection = (id, e) => {
    if (e) e.preventDefault();
    if (currentView !== 'home') {
      backToHome();
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light py-2 px-3 px-lg-4">
        <div className="container-fluid px-0">
          {/* Mobile hamburger */}
          <button 
            className="navbar-toggler border-0 shadow-none p-1 me-2" 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-4`}></i>
          </button>

          {/* Brand Logo - Bold high-impact aesthetic */}
          <a className="navbar-brand d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); backToHome(); }}>
            <span className="brand-icon me-1">⚡</span>
            <span className="brand-name">VILEN'S</span>
            <span className="brand-tag">CLOTHES</span>
          </a>

          {/* Desktop Navigation */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show mobile-expanded' : ''}`} id="mainNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => handleNavClick('packs', e)}>
                  Outfit Setup Packs <span className="nav-pill-badge">Hot</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => handleNavClick('tees', e)}>
                  Oversized Tees
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => handleNavClick('hoodies', e)}>
                  Hoodies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => handleNavClick('cargos', e)}>
                  Cargos & Bottoms
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => scrollToSection('bundle-builder-section', e)}>
                  Build Your Fit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); openTrackOrder(); setMobileMenuOpen(false); }}>
                  Track Your Order
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => scrollToSection('reviews-section', e)}>
                  Reviews
                </a>
              </li>
              <li className="nav-item d-lg-none mt-2 pt-2 border-top">
                {currentUser ? (
                  <div className="d-flex justify-content-between align-items-center px-2 py-1">
                    <span className="small fw-bold">⚡ {currentUser.displayName}</span>
                    <button className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-sm btn-dark w-100 rounded-pill py-2" onClick={() => { openAuth('login'); setMobileMenuOpen(false); }}>
                    ⚡ Sign In / Join Crew (3D)
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Right Action Icons */}
          <div className="nav-actions d-flex align-items-center gap-2 gap-sm-3">
            {/* Search Trigger */}
            <div className={`search-wrapper ${isSearchOpen ? 'active' : ''}`}>
              {isSearchOpen ? (
                <div className="search-box-input d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search tees, packs, cargos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button className="btn btn-sm btn-link text-dark p-0 ms-1" onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}>
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              ) : (
                <button 
                  className="action-icon-btn" 
                  onClick={() => setIsSearchOpen(true)}
                  title="Search store"
                >
                  <i className="bi bi-search"></i>
                </button>
              )}
            </div>

            {/* Track Order Quick Button */}
            <button 
              className="action-icon-btn d-none d-sm-inline-flex"
              onClick={openTrackOrder}
              title="Track Order"
            >
              <i className="bi bi-truck"></i>
            </button>

            {/* User Profile / 3D Auth Modal Trigger */}
            {currentUser ? (
              <div className="user-dropdown-wrap position-relative">
                <button 
                  className="user-pill-btn d-flex align-items-center gap-1"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  title="Your Vilen's VIP Profile"
                >
                  <span className="user-vip-dot">⚡</span>
                  <span className="user-name-short text-truncate">
                    {currentUser.displayName ? currentUser.displayName.split(' ')[0] : 'Crew'}
                  </span>
                  <i className="bi bi-chevron-down small" style={{ fontSize: '0.65rem' }}></i>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown-menu shadow-lg p-2 rounded-3">
                    <div className="user-menu-header px-2 py-1 mb-1 border-bottom">
                      <div className="fw-bold small text-truncate">{currentUser.displayName || 'Vilen Crew Member'}</div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>{currentUser.email}</div>
                    </div>
                    <button 
                      className="dropdown-item-custom w-100 text-start py-1 px-2 rounded"
                      onClick={() => { openTrackOrder(); setUserMenuOpen(false); }}
                    >
                      <i className="bi bi-box-seam me-2"></i>My Orders & Tracking
                    </button>
                    <button 
                      className="dropdown-item-custom w-100 text-start py-1 px-2 rounded text-danger"
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="action-icon-btn user-auth-btn"
                onClick={() => openAuth('login')}
                title="Sign in / Join Crew"
              >
                <i className="bi bi-person fs-5"></i>
              </button>
            )}

            {/* Cart Button with Count & Quick Total */}
            <button 
              className="cart-trigger-btn d-flex align-items-center" 
              onClick={openCart}
              aria-label="Shopping Cart"
            >
              <div className="cart-icon-wrapper position-relative">
                <i className="bi bi-bag-fill fs-5"></i>
                {cartCount > 0 && (
                  <span className="cart-badge-count position-absolute top-0 start-100 translate-middle badge rounded-pill">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="cart-total-label d-none d-md-inline ms-2">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
