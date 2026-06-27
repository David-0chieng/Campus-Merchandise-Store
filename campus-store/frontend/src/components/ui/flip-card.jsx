import { useState } from 'react';
import { motion } from 'framer-motion';
import './flip-card.css';

const FlipCard = ({
  frontTitle = 'Welcome Back 👋',
  frontDescription = 'Login to continue',
  frontIllustration = null,
  backTitle = 'Login Form',
  backDescription = 'Fill your details',
  backIllustration = null,
  successTitle = 'Login Successful 🎉',
  successDescription = 'You are now logged in!',
  successIllustration = null,
  fields = [
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password' },
  ],
  onLogin,
  loginButtonText = 'Login',
  backButtonText = 'Back',
  successButtonText = 'Continue',
  cardWidth = 320,
  cardHeight = 420,
  showBackInitially = false,
}) => {
  const [flipped, setFlipped] = useState(showBackInitially);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState({});

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = onLogin ? await onLogin(formData) : true;
      if (result !== false) {
        setSuccess(true);
        setFlipped(false);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fc-perspective" style={{ width: cardWidth, height: cardHeight }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* FRONT */}
        <div className="fc-face fc-face--front">
          {!success ? (
            <div className="fc-content fc-content--center">
              {frontIllustration && <div className="fc-illustration">{frontIllustration}</div>}
              <h2 className="fc-title">{frontTitle}</h2>
              {frontDescription && <p className="fc-desc">{frontDescription}</p>}
              <button className="fc-btn fc-btn--primary" onClick={() => setFlipped(true)}>
                {loginButtonText}
              </button>
            </div>
          ) : (
            <div className="fc-content fc-content--center">
              {successIllustration && <div className="fc-illustration">{successIllustration}</div>}
              <h2 className="fc-title">{successTitle}</h2>
              {successDescription && <p className="fc-desc">{successDescription}</p>}
              <button className="fc-btn fc-btn--success">{successButtonText}</button>
            </div>
          )}
        </div>

        {/* BACK */}
        <div className="fc-face fc-face--back">
          <div className="fc-content">
            {backIllustration && <div className="fc-illustration">{backIllustration}</div>}
            <h2 className="fc-title fc-title--dark">{backTitle}</h2>
            {backDescription && <p className="fc-desc fc-desc--dark">{backDescription}</p>}
            {error && <div className="fc-error">{error}</div>}
            <form onSubmit={handleSubmit} className="fc-form">
              {fields.map((field) => (
                <div key={field.name} className="fc-field">
                  <label className="fc-label">{field.label}</label>
                  <div className="fc-input-wrap">
                    <input
                      name={field.name}
                      type={field.type === 'password'
                        ? (showPwd[field.name] ? 'text' : 'password')
                        : (field.type || 'text')}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="fc-input"
                      required
                      autoComplete={field.type === 'password' ? 'current-password' : 'username'}
                    />
                    {field.type === 'password' && (
                      <button type="button" className="fc-toggle-pw"
                        onClick={() => setShowPwd((p) => ({ ...p, [field.name]: !p[field.name] }))}>
                        {showPwd[field.name] ? '🙈' : '👁️'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="submit" className="fc-btn fc-btn--primary" disabled={loading}>
                {loading ? 'Please wait...' : loginButtonText}
              </button>
              <button type="button" className="fc-btn fc-btn--ghost"
                onClick={() => { setFlipped(false); setError(''); }}>
                ← {backButtonText}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const FlipCardField = {};
export default FlipCard;
