import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__top">
        <p>🎓 Official SPH Campus Merchandise — Free delivery on orders over GHS 150</p>
      </div>
      <nav className="navbar__main container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">SPH</span>
          <span className="navbar__logo-text">Campus Store</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Shop</NavLink></li>
          <li><NavLink to="/products?category=apparel" onClick={() => setMenuOpen(false)}>Apparel</NavLink></li>
          <li><NavLink to="/products?category=bags" onClick={() => setMenuOpen(false)}>Bags</NavLink></li>
          <li><NavLink to="/products?category=accessories" onClick={() => setMenuOpen(false)}>Accessories</NavLink></li>
        </ul>

        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <FiSearch size={20} />
          </button>

          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
            <FiShoppingBag size={20} />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="navbar__user-menu">
              <Link to="/profile" className="navbar__icon-btn" aria-label="Profile">
                <FiUser size={20} />
              </Link>
              <button className="navbar__icon-btn" onClick={handleLogout} aria-label="Logout">
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary navbar__login-btn">Login</Link>
          )}

          <button className="navbar__icon-btn navbar__menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="navbar__search-bar container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search SPH merchandise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit"><FiSearch size={18} /></button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
