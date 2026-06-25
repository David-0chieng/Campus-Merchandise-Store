import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import SphLogo from './SphLogo';
import './Footer.css';

// Social icons as inline SVGs since lucide-react v1.x doesn't include brand icons
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Footer = () => (
  <footer className="footer">
    {/* Top section */}
    <div className="footer__top container">
      {/* Brand */}
      <div className="footer__brand">
        <SphLogo height={48} dark={false} className="footer__logo" />
        <p>
          Premium lifestyle merchandise for those who value quality and style.
          Clothes, bags, accessories, and shoes — delivered across Kenya.
        </p>
        <div className="footer__social">
          <a href="#" aria-label="Instagram" className="footer__social-btn">
            <IconInstagram />
          </a>
          <a href="#" aria-label="Twitter / X" className="footer__social-btn">
            <IconTwitter />
          </a>
          <a href="#" aria-label="Facebook" className="footer__social-btn">
            <IconFacebook />
          </a>
        </div>
      </div>

      {/* Shop links */}
      <div className="footer__links-group">
        <h4>Shop</h4>
        <ul>
          <li><Link to="/products">All Products</Link></li>
          <li><Link to="/products?category=apparel">Apparel</Link></li>
          <li><Link to="/products?category=bags">Bags</Link></li>
          <li><Link to="/products?category=accessories">Accessories</Link></li>
          <li><Link to="/products?category=headwear">Headwear</Link></li>
          <li><Link to="/products?is_new_arrival=true">New Arrivals</Link></li>
        </ul>
      </div>

      {/* Account links */}
      <div className="footer__links-group">
        <h4>Account</h4>
        <ul>
          <li><Link to="/login">Sign In</Link></li>
          <li><Link to="/register">Create Account</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/cart">Shopping Cart</Link></li>
        </ul>
      </div>

      {/* Contact + newsletter */}
      <div className="footer__right">
        <div className="footer__contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <Mail size={14} />
              <span>store@swahilipothub.co.ke</span>
            </li>
            <li>
              <Phone size={14} />
              <span>+254 (0) 712 000 000</span>
            </li>
            <li>
              <MapPin size={14} />
              <span>Swahilipot Hub, Mombasa, Kenya</span>
            </li>
          </ul>
        </div>

        <div className="footer__newsletter">
          <h4>Newsletter</h4>
          <p>Get the latest drops and exclusive deals.</p>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your.email@example.com" />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="footer__divider" />

    {/* Bottom bar */}
    <div className="footer__bottom container">
      <p>© {new Date().getFullYear()} Swahilipot Hub. All rights reserved.</p>
      <div className="footer__bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Returns & Refunds</a>
      </div>
    </div>
  </footer>
);

export default Footer;
