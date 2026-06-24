import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__top container">
      <div className="footer__brand">
        <div className="footer__logo">
          <span className="footer__logo-icon">SPH</span>
          <span className="footer__logo-text">Campus Store</span>
        </div>
        <p>Your official source for premium SPH branded merchandise. Wear your pride.</p>
        <div className="footer__social">
          <a href="#" aria-label="Instagram"><FiInstagram /></a>
          <a href="#" aria-label="Twitter"><FiTwitter /></a>
          <a href="#" aria-label="Facebook"><FiFacebook /></a>
        </div>
      </div>

      <div className="footer__links-group">
        <h4>Shop</h4>
        <ul>
          <li><Link to="/products">All Products</Link></li>
          <li><Link to="/products?category=apparel">Apparel</Link></li>
          <li><Link to="/products?category=bags">Bags</Link></li>
          <li><Link to="/products?category=drinkware">Drinkware</Link></li>
          <li><Link to="/products?category=accessories">Accessories</Link></li>
        </ul>
      </div>

      <div className="footer__links-group">
        <h4>Account</h4>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/cart">Shopping Cart</Link></li>
        </ul>
      </div>

      <div className="footer__contact">
        <h4>Contact</h4>
        <ul>
          <li><FiMail /><span>store@sph.edu.gh</span></li>
          <li><FiPhone /><span>+233 (0) 302 000 000</span></li>
          <li><FiMapPin /><span>SPH Campus, Accra, Ghana</span></li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom container">
      <p>© {new Date().getFullYear()} SPH Campus Merchandise Store. All rights reserved.</p>
      <div className="footer__bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Returns</a>
      </div>
    </div>
  </footer>
);

export default Footer;
