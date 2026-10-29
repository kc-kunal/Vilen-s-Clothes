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

  // Forgot Password inline state
  const [isForgotView, setIsForgotView] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync isForgotView if authMode changed externally
  useEffect(() => {
    if (authMode === 'forgot') {
      setIsForgotView(true);
    } else {
      setIsForgotView(false);
    }
    setErrorMsg('');
    setSuccessMsg('');
    setForgotSent(false);
  }, [authMode]);

  // If already logged in, show user profile card
  if (currentUser) {
    return (
      <div className="vilen-auth-fullscreen">
        <div className="vilen-top-nav-bar">
          <button 
            className="vilen-back-btn"
            onClick={() => setCurrentView('home')}
          >
            <i className="bi bi-arrow-left"></i>
            <span>Back to Store</span>
          </button>
        </div>

        <div className="vilen-logged-container">
          <div className="vilen-logged-box text-center">
            <div className="logged-crown mb-2">⚡</div>
            <div className="logged-vip-tag mb-3">VIP CREW MEMBER ACTIVE</div>
            <h1 className="logged-user-name mb-2">Welcome Back, {currentUser.displayName || 'Vilen Insider'}!</h1>
            <p className="text-muted mb-4">{currentUser.email}</p>
            
            <div className="logged-perk-pill mb-4">
              <span>🎁 Exclusive <strong>10% Member Discount</strong> active on your account</span>
            </div>

            <button 
              className="vilen-action-pill-btn vilen-pill-primary"
              onClick={() => setCurrentView('home')}
            >
              Continue Shopping Fits ➔
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(loginEmail, loginPassword);
      addToast("Welcome back to Vilen's Crew! ⚡", 'success');
      setCurrentView('home');
    } catch (err) {
      let msg = err.message || 'Login failed. Please check credentials.';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')) {
        msg = 'Invalid email or password. Please try again.';
      } else if (msg.includes('auth/user-not-found')) {
        msg = 'No account found with this email. Please register.';
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

  // Reset password handler
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
      setSuccessMsg(`Password reset instructions sent to ${forgotEmail}.`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  const isRegister = authMode === 'register';

  return (
    <div className="vilen-auth-fullscreen">
      
      {/* Top Floating Back Button */}
      <div className="vilen-top-nav-bar">
        <button 
          className="vilen-back-btn"
          onClick={() => setCurrentView('home')}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to Store</span>
        </button>
      </div>

      {/* Mobile Screen Switcher Pills */}
      <div className="vilen-mobile-tab-bar d-lg-none">
        <button 
          type="button" 
          className={`m-tab-choice ${!isRegister ? 'active' : ''}`}
          onClick={() => {
            setAuthMode('login');
            setIsForgotView(false);
          }}
        >
          Sign In
        </button>
        <button 
          type="button" 
          className={`m-tab-choice ${isRegister ? 'active' : ''}`}
          onClick={() => {
            setAuthMode('register');
            setIsForgotView(false);
          }}
        >
          Create Account
        </button>
      </div>

      {/* FULL-PAGE SLIDING DUAL SPLIT CONTAINER */}
      <div className={`vilen-fullscreen-slider ${isRegister ? 'right-panel-active' : ''}`}>
        
        {/* =========================================================
            FORM 1: SIGN IN FORM (Left 50% by default)
            ========================================================= */}
        <div className="vilen-split-form-panel sign-in-panel">
          <div className="vilen-form-inner-wrapper">
            
            {/* Brand Logo inside form */}
            <div className="vilen-brand-badge mb-3">
              <span className="brand-bolt">⚡</span>
              <span className="brand-title">VILEN'S</span>
              <span className="brand-tag">CLOTHES</span>
            </div>

            {isForgotView ? (
              /* Inline Password Reset View */
              <div className="vilen-forgot-subview w-100">
                <h1 className="vilen-form-head mb-2">Reset Password</h1>
                <p className="vilen-form-sub mb-4">
                  Enter your registered email and we'll dispatch an official reset link.
                </p>

                {errorMsg && (
                  <div className="vilen-alert alert-error mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="vilen-alert alert-success mb-3">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <span>{successMsg}</span>
                  </div>
                )}

                {!forgotSent ? (
                  <form onSubmit={handleResetSubmit} className="w-100">
                    <div className="vilen-pill-input-field mb-3">
                      <i className="bi bi-envelope lead-icon"></i>
                      <input
                        type="email"
                        placeholder="Registered Email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="vilen-action-pill-btn vilen-pill-primary w-100 mb-3"
                      disabled={loading}
                    >
                      {loading ? 'Dispatching...' : 'SEND RESET LINK'}
                    </button>

                    <button 
                      type="button" 
                      className="vilen-link-btn d-block mx-auto"
                      onClick={() => setIsForgotView(false)}
                    >
                      ← Back to Sign In
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-2">
                    <div className="fs-1 mb-2">📬</div>
                    <p className="text-muted small mb-4">
                      Password reset instructions have been dispatched to <strong>{forgotEmail}</strong>.
                    </p>
                    <button 
                      type="button" 
                      className="vilen-action-pill-btn vilen-pill-primary"
                      onClick={() => {
                        setIsForgotView(false);
                        setForgotSent(false);
                      }}
                    >
                      Return to Sign In
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Standard Sign In Form */
              <div className="vilen-signin-subview w-100">
                <h1 className="vilen-form-head mb-3">SIGN IN</h1>

                {/* Circular Social Buttons */}
                <div className="vilen-social-circles mb-3">
                  <button 
                    type="button" 
                    className="vilen-circle-btn btn-google"
                    onClick={handleGoogleSignIn}
                    title="Sign in with Google"
                    disabled={loading}
                  >
                    <i className="bi bi-google"></i>
                  </button>
                  <button 
                    type="button" 
                    className="vilen-circle-btn btn-facebook"
                    onClick={() => addToast('Google & Email VIP login active!', 'info')}
                    title="Facebook login"
                  >
                    <i className="bi bi-facebook"></i>
                  </button>
                  <button 
                    type="button" 
                    className="vilen-circle-btn btn-twitter"
                    onClick={() => addToast('Google & Email VIP login active!', 'info')}
                    title="Twitter / X"
                  >
                    <i className="bi bi-twitter-x"></i>
                  </button>
                </div>

                <div className="vilen-subdivider mb-3">
                  <span>or use your email account:</span>
                </div>

                {errorMsg && (
                  <div className="vilen-alert alert-error mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="w-100">
                  <div className="vilen-pill-input-field mb-3">
                    <i className="bi bi-envelope lead-icon"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="vilen-pill-input-field mb-2">
                    <i className="bi bi-lock lead-icon"></i>
                    <input
                      type={showLoginPass ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="vilen-eye-toggle"
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      title={showLoginPass ? 'Hide password' : 'Show password'}
                    >
                      <i className={`bi ${showLoginPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>

                  <div className="text-center mb-3">
                    <button 
                      type="button" 
                      className="vilen-link-btn"
                      onClick={() => setIsForgotView(true)}
                    >
                      Forget your password?
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    className="vilen-action-pill-btn vilen-pill-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'SIGNING IN...' : 'SIGN IN'}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>

        {/* =========================================================
            FORM 2: SIGN UP / REGISTER FORM (Moves to Right 50%)
            ========================================================= */}
        <div className="vilen-split-form-panel sign-up-panel">
          <div className="vilen-form-inner-wrapper">
            
            <div className="vilen-brand-badge mb-2">
              <span className="brand-bolt">⚡</span>
              <span className="brand-title">VILEN'S</span>
              <span className="brand-tag">CLOTHES</span>
            </div>

            <h1 className="vilen-form-head mb-2">CREATE ACCOUNT</h1>

            {/* Circular Social Buttons */}
            <div className="vilen-social-circles mb-2">
              <button 
                type="button" 
                className="vilen-circle-btn btn-google"
                onClick={handleGoogleSignIn}
                title="Sign up with Google"
                disabled={loading}
              >
                <i className="bi bi-google"></i>
              </button>
              <button 
                type="button" 
                className="vilen-circle-btn btn-facebook"
                onClick={() => addToast('Google & Email VIP login active!', 'info')}
                title="Facebook signup"
              >
                <i className="bi bi-facebook"></i>
              </button>
              <button 
                type="button" 
                className="vilen-circle-btn btn-twitter"
                onClick={() => addToast('Google & Email VIP login active!', 'info')}
                title="Twitter signup"
              >
                <i className="bi bi-twitter-x"></i>
              </button>
            </div>

            <div className="vilen-subdivider mb-2">
              <span>or register with your email:</span>
            </div>

            {errorMsg && (
              <div className="vilen-alert alert-error mb-2">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="w-100">
              <div className="vilen-pill-input-field mb-2">
                <i className="bi bi-person lead-icon"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div className="vilen-pill-input-field mb-2">
                <i className="bi bi-envelope lead-icon"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="vilen-pill-input-field mb-2">
                <i className="bi bi-lock lead-icon"></i>
                <input
                  type={showRegPass ? 'text' : 'password'}
                  placeholder="Password (min 6 chars)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="vilen-eye-toggle"
                  onClick={() => setShowRegPass(!showRegPass)}
                >
                  <i className={`bi ${showRegPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>

              <div className="vilen-pill-input-field mb-2">
                <i className="bi bi-shield-check lead-icon"></i>
                <input
                  type={showRegPass ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={regConfirmPass}
                  onChange={(e) => setRegConfirmPass(e.target.value)}
                  required
                />
              </div>

              <div className="vilen-coupon-badge mb-2">
                <span>🎁 <strong>10% OFF auto-applied</strong> with code <strong>VILEN10</strong></span>
              </div>

              <button 
                type="submit" 
                className="vilen-action-pill-btn vilen-pill-primary w-100"
                disabled={loading}
              >
                {loading ? 'ACTIVATING PASS...' : 'SIGN UP'}
              </button>
            </form>

          </div>
        </div>

        {/* Hidden SVG Definitions for Seamless T-Shirt Masking */}
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            {/* Left-edge T-Shirt Clip (used when overlay is on the right) */}
            <clipPath id="tshirtClipLeft" clipPathUnits="objectBoundingBox">
              <path d="M 0.05,0 C 0.025,0.06 0.015,0.12 0.01,0.18 C 0.0,0.24 0.0,0.28 0.01,0.34 C 0.025,0.40 0.055,0.44 0.05,0.50 C 0.035,0.58 0.02,0.65 0.025,0.72 C 0.035,0.80 0.015,0.88 0.01,0.94 C 0.005,0.97 0.02,0.99 0.05,1.0 L 1.0,1.0 L 1.0,0.0 Z" />
            </clipPath>

            {/* Right-edge T-Shirt Clip (used when overlay is on the left) */}
            <clipPath id="tshirtClipRight" clipPathUnits="objectBoundingBox">
              <path d="M 0.0,0.0 L 0.95,0.0 C 0.975,0.06 0.985,0.12 0.99,0.18 C 1.0,0.24 1.0,0.28 0.99,0.34 C 0.975,0.40 0.945,0.44 0.95,0.50 C 0.965,0.58 0.98,0.65 0.975,0.72 C 0.965,0.80 0.985,0.88 0.99,0.94 C 0.995,0.97 0.98,0.99 0.95,1.0 L 0.0,1.0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* =========================================================
            FULL-HEIGHT SLIDING OVERLAY CONTAINER
            ========================================================= */}
        <div className="vilen-split-overlay-slider">
          
          {/* Animated Tailor Stitching Line (Transparent SVG - NO color seams!) */}
          <div className="vilen-stitch-seam-wrap" aria-hidden="true">
            <svg 
              className="vilen-stitch-svg" 
              viewBox="0 0 60 1000" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M 60,0 C 30,60 18,120 12,180 C 0,240 0,280 12,340 C 30,400 66,440 60,500 C 42,580 24,650 30,720 C 42,800 18,880 12,940 C 6,970 24,990 60,1000" 
                fill="none" 
                stroke="#ff5400" 
                strokeWidth="3.5" 
                className="animated-tshirt-stitch" 
              />
            </svg>
          </div>

          {/* Authentic Streetwear Woven Side-Seam Tag (Always readable, never mirrored!) */}
          <div className="vilen-woven-tag" aria-hidden="true">
            <span className="tag-bolt">⚡</span>
            <span className="tag-txt">VILEN'S // 240 GSM</span>
          </div>

          <div className="vilen-overlay-inner-clip">
            <div className="vilen-split-overlay">
              
              {/* OVERLAY PANEL LEFT (Shows when Registering -> Prompts to Sign In) */}
              <div className="vilen-overlay-screen overlay-screen-left">
                <div className="vilen-brand-badge brand-light mb-3">
                  <span className="brand-bolt">⚡</span>
                  <span className="brand-title">VILEN'S</span>
                  <span className="brand-tag">CLOTHES</span>
                </div>

                <h1 className="vilen-overlay-head mb-2">WELCOME BACK</h1>
                <p className="vilen-overlay-desc mb-4">
                  To keep connected with us please login with your personal info
                </p>

                {/* Animated Streetwear Composition */}
                <div className="vilen-street-art-box mb-4">
                  <div className="art-pulse-glow"></div>
                  <div className="floating-item item-main">👕</div>
                  <div className="floating-item item-kick">👟</div>
                  <div className="floating-item item-bolt">⚡</div>
                  <div className="floating-item item-star">✨</div>
                  <div className="floating-item item-coupon">🏷️ 10% OFF</div>
                </div>

                <button 
                  type="button" 
                  className="vilen-action-pill-btn vilen-pill-ghost"
                  onClick={() => {
                    setAuthMode('login');
                    setIsForgotView(false);
                  }}
                >
                  SIGN IN
                </button>
              </div>

              {/* OVERLAY PANEL RIGHT (Shows when Signing In -> Prompts to Register) */}
              <div className="vilen-overlay-screen overlay-screen-right">
                <div className="vilen-brand-badge brand-light mb-3">
                  <span className="brand-bolt">⚡</span>
                  <span className="brand-title">VILEN'S</span>
                  <span className="brand-tag">CLOTHES</span>
                </div>

                <h1 className="vilen-overlay-head mb-2">HELLO, FRIEND!</h1>
                <p className="vilen-overlay-desc mb-4">
                  Enter your details & start your journey with Vilen's exclusive streetwear drops
                </p>

                {/* Animated Streetwear Composition */}
                <div className="vilen-street-art-box mb-4">
                  <div className="art-pulse-glow orange-glow"></div>
                  <div className="floating-item item-main">🧢</div>
                  <div className="floating-item item-kick">🔥</div>
                  <div className="floating-item item-bolt">🛍️</div>
                  <div className="floating-item item-star">✦</div>
                  <div className="floating-item item-coupon">🎁 ₹100 BONUS</div>
                </div>

                <button 
                  type="button" 
                  className="vilen-action-pill-btn vilen-pill-ghost"
                  onClick={() => {
                    setAuthMode('register');
                    setIsForgotView(false);
                  }}
                >
                  SIGN UP
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
