import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate(redirect, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__left">
        <div className="auth-page__branding">
          <div className="auth-page__logo">SPH</div>
          <h2>Welcome Back</h2>
          <p>Log in to access your Swahilipot Hub Merchandise account and order history.</p>
        </div>
      </div>

      <div className="auth-page__right">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1>Sign In</h1>
            <p>Enter your credentials to continue</p>
          </div>

          {error && <div className="auth-card__error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-card__form">
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <div className="input-icon-wrap">
                <FiMail className="input-icon" size={16} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="your_username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrap">
                <FiLock className="input-icon" size={16} />
                <input
                  id="password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-end"
                  onClick={() => setShowPwd(!showPwd)}
                  tabIndex={-1}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-card__options">
              <label className="auth-card__remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="auth-card__forgot">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-card__submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-card__switch">
            Don't have an account?{' '}
            <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
