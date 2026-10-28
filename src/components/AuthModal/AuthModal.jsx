import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import './AuthModal.css';

export const AuthModal = () => {
  const { 
    isAuthOpen, 
    closeAuth, 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    loginWithGoogle, 
    sendPasswordReset 
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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 3D Tilt Ref
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Reset errors on mode change
  useEffect(() => {
    setErrorMsg('');
    setForgotSent(false);
  }, [authMode, isAuthOpen]);

  if (!isAuthOpen) return null;

  // 3D Parallax Mouse Tilt Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((centerY - y) / centerY) * 12; // tilt angle
    const rotY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Form Handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      closeAuth();
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPass) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }
    setLoading(true);
    try {
      await register(regName, regEmail, regPassword);
      closeAuth();
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      closeAuth();
    } catch (err) {
      setErrorMsg(err.message || 'Google sign-in was canceled.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!forgotEmail) {
      setErrorMsg('Please enter your email to receive recovery instructions.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordReset(forgotEmail);
      setForgotSent(true);
    } catch (err) {
      setErrorMsg(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  const isFlipped = authMode === 'register';

  return (
    <div className="auth-modal-backdrop" onClick={closeAuth}>
      <div 
        className="auth-modal-perspective-wrap"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating 3D Card Assembly */}
        <div 
          ref={cardRef}
          className={`auth-3d-card ${isFlipped ? 'flipped' : ''}`}
          style={{
            transform: isFlipped 
              ? `rotateY(180deg) rotateX(${tilt.x}deg) rotateZ(${tilt.y * 0.3}deg)`
              : `rotateY(${tilt.y}deg) rotateX(${tilt.x}deg)`
          }}
        >
          {/* Close button */}
          <button className="auth-close-btn" onClick={closeAuth} title="Close Modal">
            <i className="bi bi-x-lg"></i>
          </button>

          {/* =========================================================
              FRONT FACE: LOGIN & FORGOT PASSWORD
              ========================================================= */}
          <div className="auth-card-face auth-card-front">
            {/* Holographic Header Bar */}
            <div className="auth-card-header">
              <div className="brand-hologram-seal">
                <span className="seal-bolt">⚡</span>
                <span>VILEN'S CREW ACCESS</span>
              </div>
              <h2 className="auth-title">
                {authMode === 'forgot' ? 'RESET PASSWORD' : 'SIGN IN TO CREW'}
              </h2>
              <p className="auth-subtitle">
                {authMode === 'forgot' 
                  ? 'Enter your registered email to receive a secure password recovery link.'
                  : 'Access exclusive drops, tracking, and unlock your 10% VIP perks.'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="auth-error-banner">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {authMode === 'forgot' ? (
              forgotSent ? (
                <div className="forgot-success-box text-center py-4">
                  <div className="success-icon mb-3">📬</div>
                  <h4>Recovery Link Dispatched</h4>
                  <p className="small text-muted mb-4">
                    We sent password reset instructions to <strong>{forgotEmail}</strong>. Please check your inbox or spam folder.
                  </p>
                  <button 
                    className="btn-auth-primary w-100"
                    onClick={() => setAuthMode('login')}
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="auth-form">
                  <div className="form-floating-custom mb-3">
                    <label>Work or Personal Email</label>
                    <div className="input-group-auth">
                      <i className="bi bi-envelope"></i>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-auth-primary w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <span><span className="spinner-border spinner-border-sm me-2"></span>Sending link...</span>
                    ) : (
                      'Send Reset Link ➔'
                    )}
                  </button>

                  <div className="text-center">
                    <button 
                      type="button" 
                      className="auth-link-btn"
                      onClick={() => setAuthMode('login')}
                    >
                      ← Back to Login
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* LOGIN VIEW */
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
                    />
                  </div>
                </div>

                <div className="form-floating-custom mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label>Password</label>
                    <button 
                      type="button" 
                      className="auth-link-btn small"
                      onClick={() => setAuthMode('forgot')}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="input-group-auth">
                    <i className="bi bi-lock"></i>
                    <input
                      type={showLoginPass ? 'text' : 'password'}
                      placeholder="••••••••"
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

                {/* Submit button */}
                <button type="submit" className="btn-auth-primary w-100 mb-3" disabled={loading}>
                  {loading ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Authenticating...</span>
                  ) : (
                    'Enter The Streetwear Club ➔'
                  )}
                </button>

                {/* Google Sign In Divider */}
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

                {/* 3D Flip Trigger to Register */}
                <div className="auth-flip-footer text-center">
                  <span>New to Vilen's Clothes?</span>{' '}
                  <button 
                    type="button" 
                    className="flip-trigger-btn"
                    onClick={() => setAuthMode('register')}
                  >
                    Join Crew (3D Flip) 🔄
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* =========================================================
              BACK FACE: REGISTER (FLIPPED 180 DEG)
              ========================================================= */}
          <div className="auth-card-face auth-card-back">
            <div className="auth-card-header">
              <div className="brand-hologram-seal">
                <span className="seal-bolt">⚡</span>
                <span>VIP PASS // FREE MEMBERSHIP</span>
              </div>
              <h2 className="auth-title">CREATE CREW ACCOUNT</h2>
              <p className="auth-subtitle">
                Join 1,50,000+ streetwear enthusiasts. Instant ₹100 Welcome Credit inside!
              </p>
            </div>

            {errorMsg && (
              <div className="auth-error-banner">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-floating-custom mb-2">
                <label>Your Name</label>
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

              {/* VIP Welcome Offer Banner */}
              <div className="vip-bonus-banner mb-3">
                <span className="bonus-pill">🎁 10% OFF AUTO-UNLOCKED</span>
                <span>Code <strong>VILEN10</strong> will be credited to your account!</span>
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
                <span>Already a Member?</span>{' '}
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
  );
};
