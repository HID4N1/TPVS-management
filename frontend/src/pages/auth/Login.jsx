import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import './login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">

        {/* ── LEFT PANEL ── */}
        <aside className="login-panel login-panel--left">
          <div className="panel-quote-tag">
            <span>TPVS management</span>
            <div className="panel-quote-line" />
          </div>

          <div className="panel-bottom">
            <h2 className="panel-heading">Get Everything You Want</h2>
            <p className="panel-subtext">
              You can get everything you want if you work hard,
              trust the process, and stick to the plan.
            </p>
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="login-panel login-panel--right">
          <div className="brand">
            {/* Cogie logo icon — simple wave SVG matching screenshot */}
            <svg className="brand-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 20 Q8 8 14 14 Q20 20 24 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <path d="M4 23 Q10 13 14 17 Q18 21 24 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
            </svg>
            <span className="brand-name">Gen-sales Morocco</span>
          </div>

          <div className="login-form-wrapper">
            <div className="login-heading-group">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Enter your email and password to access your account</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="login-form"
              noValidate
              aria-label="Formulaire de connexion"
            >
              {/* Error Alert */}
              {error && (
                <div className="error-message" role="alert" aria-live="polite">
                  <span className="error-text">{error}</span>
                </div>
              )}

              {/* Form Fields */}
              <div className="form-fields">
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="form-input"
                      aria-required="true"
                      aria-invalid={error ? "true" : "false"}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="form-input form-input-password"
                      aria-required="true"
                      aria-invalid={error ? "true" : "false"}
                    />
                    <div className="input-action-wrapper">
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remember me + Forgot password row */}
              <div className="form-meta">
                <label className="remember-label">
                  <input type="checkbox" className="remember-checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="forgot-link">Forgot Password</button>
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="login-button"
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <svg className="button-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/>
                        <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                      </svg>
                      <span>Signing in…</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </form>
{/* 
            <p className="signup-prompt">
              Don't have an account? <a href="/register" className="signup-link">Sign Up</a>
            </p> */}
          </div>
        </main>

      </div>

      {/* Powered by footer */}
      <footer className="login-footer">
        <span>Powered by SmartDex</span>
      </footer>

    </div>
      
  );
}
