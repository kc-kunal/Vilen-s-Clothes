import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import './AuthPage.css';

export const AuthPage = () => {
  const { 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    loginGoogle, 
    sendPasswordReset, 
    currentUser,
    setCurrentView,
    addToast
  } = useShop();

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 3D Mouse Parallax Tilt for desktop
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear messages when mode toggles
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
    setForgotSent(false);
  }, [authMode]);

  // If already logged in, show profile summary or option to go home
  if (currentUser) {
    return (
      <div className="auth-page-container">
        <div className="auth-page-inner text-center py-5">
          <div className="auth-logged-card mx-auto">
            <div className="logged-badge mb-3">⚡ VIP MEMBER ACTIVE</div>
            <h2 className="mb-2">Welcome Back, {currentUser.displayName || 'Vilen Crew'}!</h2>
            <p className="text-muted mb-4">{currentUser.email}</p>
            <div className="d-flex justify-content-center gap-3">
              <button 
                className="btn-auth-primary"
                onClick={() => setCurrentView('home')}
              >
                Continue Shopping Fits ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e) => {
    if (window.innerWidth < 992) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(loginEmail, loginPassword);
      addToast('Welcome back to Vilen\'s Crew! ⚡', 'success');
      setCurrentView('home');
    } catch (err) {
      let msg = err.message || 'Login failed. Please check credentials.';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')) {
        msg = 'Invalid email or password. Please try again.';
      } else if (msg.includes('auth/user-not-found')) {
        msg = 'No account found with this email. Please register below.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPass) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      await register(regName, regEmail, regPassword);
      addToast(`Welcome ${regName}! ₹100 Welcome Credit unlocked! 🎁`, 'success');
      setCurrentView('home');
    } catch (err) {
      let msg = err.message || 'Registration failed.';
      if (msg.includes('auth/email-already-in-use')) {
        msg = 'This email is already registered. Please sign in instead.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginGoogle();
      addToast('Signed in with Google VIP pass! ⚡', 'success');
      setCurrentView('home');
    } catch (err) {
      setErrorMsg(err.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      await sendPasswordReset(forgotEmail);
      setForgotSent(true);
      setSuccessMsg(`Password reset link has been dispatched to ${forgotEmail}.`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Top Breadcrumb Navigation */}
      <div className="container auth-page-nav pt-4 pb-2">
        <button 
          className="btn-back-to-shop d-inline-flex align-items-center gap-2"
          onClick={() => setCurrentView('home')}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to Store</span>
        </button>
      </div>

      <div className="container auth-page-main py-3 py-lg-4">
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* LEFT COLUMN: Streetwear VIP Brand Perks Showcase */}
          <div className="col-12 col-lg-5 auth-brand-col">
            <div className="auth-brand-badge mb-3">
              <span className="badge-pulse"></span>
              <span>VILEN'S CREW // AUTHENTIC ACCESS</span>
            </div>

            <h1 className="auth-hero-title mb-3">
              STEP INTO THE <span>VIP CLUB.</span>
            </h1>

            <p className="auth-hero-lead mb-4">
              Join 1,50,000+ fashion rebels. Get exclusive drop access, member-only pricing, and 3D outfit saves.
            </p>

            {/* Perks Cards */}
            <div className="auth-perks-list mb-4">
              <div className="auth-perk-item">
                <div className="perk-icon-wrap">⚡</div>
                <div className="perk-text">
                  <div className="perk-title">Instant 10% Welcome Bonus</div>
                  <div className="perk-desc">Auto-unlock code VILEN10 on your first fit order.</div>
                </div>
              </div>

              <div className="auth-perk-item">
                <div className="perk-icon-wrap">🚀</div>
                <div className="perk-text">
                  <div className="perk-title">Free Express Priority Delivery</div>
                  <div className="perk-desc">Zero shipping charges across India for all crew members.</div>
                </div>
              </div>

              <div className="auth-perk-item">
                <div className="perk-icon-wrap">👕</div>
                <div className="perk-text">
                  <div className="perk-title">3D Hanger Showroom Customizer</div>
                  <div className="perk-desc">Save custom fit combos & wishlist across all devices.</div>
                </div>
              </div>

              <div className="auth-perk-item">
                <div className="perk-icon-wrap">🛡️</div>
                <div className="perk-text">
                  <div className="perk-title">Hassle-Free 7-Day Doorstep Returns</div>
                  <div className="perk-desc">Easy replacements & dedicated VIP WhatsApp assistance.</div>
                </div>
              </div>
            </div>

            {/* Social Proof Trust Bar */}
            <div className="auth-trust-box p-3 rounded-4">
              <div className="d-flex align-items-center gap-3">
                <div className="trust-avatars d-flex">
                  <span className="avatar-chip">🧢</span>
                  <span className="avatar-chip">👟</span>
                  <span className="avatar-chip">🔥</span>
                </div>
                <div>
                  <div className="trust-score">★ 4.9 / 5.0 Rating</div>
                  <div className="trust-sub">Trusted by verified streetwear creators across India</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Interactive Card (Sign In / Register / Forgot) */}
          <div className="col-12 col-lg-7 auth-form-col">
            <div className="auth-stage-container">
              
              {/* Mode Switcher Tabs */}
              <div className="auth-nav-tabs mb-4">
                <button 
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                  type="button"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                </button>
                <button 
                  className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthMode('register')}
                  type="button"
                >
                  <i className="bi bi-stars me-2"></i>Create Account
                </button>
                {authMode === 'forgot' && (
                  <button className="auth-tab-btn active" type="button">
                    <i className="bi bi-key me-2"></i>Password Reset
                  </button>
                )}
              </div>

              {/* 3D Card Shell */}
              <div 
                className="auth-3d-card-shell"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                }}
              >
                <div className={`auth-3d-flipper ${authMode === 'register' ? 'is-flipped' : ''}`}>
                  
                  {/* =========================================================
                      FRONT FACE: LOGIN & FORGOT PASSWORD
                      ========================================================= */}
                  <div className="auth-card-face auth-card-front">
                    
                    {authMode === 'forgot' ? (
                      /* FORGOT PASSWORD VIEW */
                      <div className="auth-forgot-panel">
                        <div className="auth-card-header mb-3">
                          <div className="brand-hologram-seal">
                            <span className="seal-bolt">🔑</span>
                            <span>ACCESS RESTORATION</span>
                          </div>
                          <h2 className="auth-title">RESET PASSWORD</h2>
                          <p className="auth-subtitle">
                            Enter your registered email and we'll dispatch an official Firebase password reset link.
                          </p>
                        </div>

                        {errorMsg && (
                          <div className="auth-error-banner mb-3">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        {successMsg && (
                          <div className="auth-success-banner mb-3">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <span>{successMsg}</span>
                          </div>
                        )}

                        {!forgotSent ? (
                          <form onSubmit={handleResetSubmit}>
                            <div className="form-floating-custom mb-3">
                              <label>Your Registered Email</label>
                              <div className="input-group-auth">
                                <i className="bi bi-envelope"></i>
                                <input
                                  type="email"
                                  placeholder="kunal@example.com"
                                  value={forgotEmail}
                                  onChange={(e) => setForgotEmail(e.target.value)}
                                  required
                                  autoFocus
                                />
                              </div>
                            </div>

                            <button type="submit" className="btn-auth-primary w-100 mb-3" disabled={loading}>
                              {loading ? (
                                <span><span className="spinner-border spinner-border-sm me-2"></span>Sending Link...</span>
                              ) : (
                                'Dispatch Reset Link ➔'
                              )}
                            </button>

                            <button 
                              type="button" 
                              className="btn-auth-secondary w-100"
                              onClick={() => setAuthMode('login')}
                            >
                              ← Back to Sign In
                            </button>
                          </form>
                        ) : (
                          <div className="text-center py-3">
                            <div className="forgot-success-icon mb-3">✉️</div>
                            <h4 className="fw-bold mb-2">Check Your Inbox</h4>
                            <p className="text-muted small mb-4">
                              We sent reset instructions to <strong>{forgotEmail}</strong>. Follow the link to choose a new password.
                            </p>
                            <button 
                              className="btn-auth-primary w-100"
                              onClick={() => setAuthMode('login')}
                            >
                              Back to Sign In
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* LOGIN VIEW */
                      <div className="auth-login-panel">
                        <div className="auth-card-header mb-3">
                          <div className="brand-hologram-seal">
                            <span className="seal-bolt">⚡</span>
                            <span>OFFICIAL ACCESS PROTOCOL</span>
                          </div>
                          <h2 className="auth-title">SIGN IN TO VILEN'S</h2>
                          <p className="auth-subtitle">
                            Welcome back! Enter credentials to manage orders, wishlist & discounts.
                          </p>
                        </div>

                        {errorMsg && (
                          <div className="auth-error-banner mb-3">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <form onSubmit={handleLoginSubmit} className="auth-form">
                          <div className="form-floating-custom mb-3">
                            <label>Email Address</label>
                            <div className="input-group-auth">
                              <i className="bi bi-envelope"></i>
                              <input
                                type="email"
                                placeholder="kunal@example.com"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                                autoFocus
                              />
                            </div>
                          </div>

                          <div className="form-floating-custom mb-2">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <label className="mb-0">Password</label>
                              <button 
                                type="button" 
                                className="forgot-link-btn"
                                onClick={() => setAuthMode('forgot')}
                              >
                                Forgot password?
                              </button>
                            </div>
                            <div className="input-group-auth">
                              <i className="bi bi-lock"></i>
                              <input
                                type={showLoginPass ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                              />
                              <button 
                                type="button" 
                                className="toggle-pass-btn"
                                onClick={() => setShowLoginPass(!showLoginPass)}
                                title={showLoginPass ? 'Hide password' : 'Show password'}
                              >
                                <i className={`bi ${showLoginPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                              </button>
                            </div>
                          </div>

                          <button type="submit" className="btn-auth-primary w-100 mb-3" disabled={loading}>
                            {loading ? (
                              <span><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</span>
                            ) : (
                              'Enter The Streetwear Club ➔'
                            )}
                          </button>

                          <div className="auth-divider mb-3">
                            <span>OR CONTINUE WITH</span>
                          </div>

                          <button 
                            type="button" 
                            className="btn-google-auth w-100 mb-4"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                          >
                            <svg className="google-icon me-2" viewBox="0 0 24 24" width="18" height="18">
                              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                            </svg>
                            <span>Google Account</span>
                          </button>

                          <div className="auth-flip-footer text-center">
                            <span>Don't have an account yet?</span>{' '}
                            <button 
                              type="button" 
                              className="flip-trigger-btn"
                              onClick={() => setAuthMode('register')}
                            >
                              Join Crew (3D Flip) 🔄
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* =========================================================
                      BACK FACE: REGISTER (FLIPPED 180 DEG)
                      ========================================================= */}
                  <div className="auth-card-face auth-card-back">
                    <div className="auth-card-header mb-3">
                      <div className="brand-hologram-seal">
                        <span className="seal-bolt">⚡</span>
                        <span>VIP PASS // LIFETIME MEMBERSHIP</span>
                      </div>
                      <h2 className="auth-title">CREATE CREW ACCOUNT</h2>
                      <p className="auth-subtitle">
                        Unlock ₹100 Welcome Credit & private drops access.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="auth-error-banner mb-3">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleRegisterSubmit} className="auth-form">
                      <div className="form-floating-custom mb-2">
                        <label>Your Full Name</label>
                        <div className="input-group-auth">
                          <i className="bi bi-person"></i>
                          <input
                            type="text"
                            placeholder="Kunal Choudhary"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-floating-custom mb-2">
                        <label>Email Address</label>
                        <div className="input-group-auth">
                          <i className="bi bi-envelope"></i>
                          <input
                            type="email"
                            placeholder="kunal@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-floating-custom mb-2">
                        <label>Create Password</label>
                        <div className="input-group-auth">
                          <i className="bi bi-lock"></i>
                          <input
                            type={showRegPass ? 'text' : 'password'}
                            placeholder="Min 6 characters"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            required
                          />
                          <button 
                            type="button" 
                            className="toggle-pass-btn"
                            onClick={() => setShowRegPass(!showRegPass)}
                          >
                            <i className={`bi ${showRegPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                          </button>
                        </div>
                      </div>

                      <div className="form-floating-custom mb-3">
                        <label>Confirm Password</label>
                        <div className="input-group-auth">
                          <i className="bi bi-shield-check"></i>
                          <input
                            type={showRegPass ? 'text' : 'password'}
                            placeholder="Re-type password"
                            value={regConfirmPass}
                            onChange={(e) => setRegConfirmPass(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="vip-bonus-banner mb-3">
                        <span className="bonus-pill">🎁 10% OFF AUTO-UNLOCKED</span>
                        <span>Code <strong>VILEN10</strong> will be active on your account!</span>
                      </div>

                      <button type="submit" className="btn-auth-primary w-100 mb-3" disabled={loading}>
                        {loading ? (
                          <span><span className="spinner-border spinner-border-sm me-2"></span>Creating Crew Profile...</span>
                        ) : (
                          'Claim VIP Membership ➔'
                        )}
                      </button>

                      <button 
                        type="button" 
                        className="btn-google-auth w-100 mb-3"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                      >
                        <svg className="google-icon me-2" viewBox="0 0 24 24" width="18" height="18">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        <span>Fast Sign Up with Google</span>
                      </button>

                      <div className="auth-flip-footer text-center">
                        <span>Already have a Crew pass?</span>{' '}
                        <button 
                          type="button" 
                          className="flip-trigger-btn"
                          onClick={() => setAuthMode('login')}
                        >
                          Flip to Sign In 🔄
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
