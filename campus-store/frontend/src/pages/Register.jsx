import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '', full_name: '',
    email: '', password: '', confirm_password: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await register(form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      const data = err.response?.data || {};
      if (typeof data === 'object') {
        setErrors(data);
      } else {
        setErrors({ non_field_errors: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (key) => {
    const val = errors[key];
    return val ? (Array.isArray(val) ? val[0] : val) : null;
  };

  return (
    <div className="auth-page">
      <div className="auth-page__left">
        <div className="auth-page__branding">
          <div className="auth-page__logo">SPH</div>
          <h2>Join the Community</h2>
          <p>Create your Swahilipot Hub Merchandise account to start shopping.</p>
        </div>
      </div>

      <div className="auth-page__right">
        <div className="auth-card auth-card--wide">
          <div className="auth-card__header">
            <h1>Create Account</h1>
            <p>Fill in your details to get started</p>
          </div>

          {success && <div className="auth-card__success">{success}</div>}
          {fieldError('non_field_errors') && (
            <div className="auth-card__error">{fieldError('non_field_errors')}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-card__form auth-card__form--grid">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon-wrap">
                <FiUser className="input-icon" size={16} />
                <input name="full_name" type="text" placeholder="John Kamau"
                  value={form.full_name} onChange={handleChange} required />
              </div>
              {fieldError('full_name') && <span className="error-msg">{fieldError('full_name')}</span>}
            </div>

            <div className="form-group">
              <label>Username</label>
              <div className="input-icon-wrap">
                <FiUser className="input-icon" size={16} />
                <input name="username" type="text" placeholder="john_kamau"
                  value={form.username} onChange={handleChange} required autoComplete="username" />
              </div>
              {fieldError('username') && <span className="error-msg">{fieldError('username')}</span>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon-wrap">
                <FiMail className="input-icon" size={16} />
                <input name="email" type="email" placeholder="john@example.com"
                  value={form.email} onChange={handleChange} required autoComplete="email" />
              </div>
              {fieldError('email') && <span className="error-msg">{fieldError('email')}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-icon-wrap">
                <FiLock className="input-icon" size={16} />
                <input name="password" type={showPwd ? 'text' : 'password'} placeholder="Min. 8 characters"
                  value={form.password} onChange={handleChange} required autoComplete="new-password" />
                <button type="button" className="input-icon-end"
                  onClick={() => setShowPwd(!showPwd)} tabIndex={-1}>
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {fieldError('password') && <span className="error-msg">{fieldError('password')}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-icon-wrap">
                <FiLock className="input-icon" size={16} />
                <input name="confirm_password" type={showPwd ? 'text' : 'password'} placeholder="Repeat password"
                  value={form.confirm_password} onChange={handleChange} required autoComplete="new-password" />
              </div>
              {fieldError('confirm_password') && <span className="error-msg">{fieldError('confirm_password')}</span>}
            </div>

            <button type="submit" className="btn btn-primary auth-card__submit auth-card__submit--full"
              disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-card__switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
