import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SphLogo from './SphLogo';
import './Navbar.css';

const NAV_CATEGORIES = [
  { label: 'All Products', to: '/products' },
  { label: 'Apparel', to: '/products?category=apparel' },
  { label: 'Bags', to: '/products?category=bags' },
  { label: 'Accessories', to: '/products?category=accessories' },
  { label: 'Headwear', to: '/products?category=headwear' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close shop dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
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
      {/* Announcement Bar */}
      <div className="navbar__announcement">
        <p>
          <span className="navbar__announcement-dot" />
          Free delivery on orders over KSh 2,000 &nbsp;·&nbsp; Use code{' '}
          <strong>SPH2024</strong> for 10% off your first order
        </p>
      </div>

      {/* Main nav */}
      <nav className="navbar__main container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="SPH Home">
          <SphLogo height={44} dark={true} />
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>

          {/* Shop dropdown */}
          <li className="navbar__dropdown-wrap" ref={shopRef}>
            <button
              className={`navbar__dropdown-trigger ${shopOpen ? 'open' : ''}`}
              onClick={() => setShopOpen(!shopOpen)}
            >
              Shop <ChevronDown size={14} />
            </button>
            {shopOpen && (
              <div className="navbar__dropdown">
                {NAV_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.to}
                    to={cat.to}
                    className="navbar__dropdown-item"
                    onClick={() => setShopOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <NavLink to="/products?is_new_arrival=true" className={({ isActive }) => isActive ? 'active' : ''}>
              New Arrivals
            </NavLink>
          </li>
          <li>
            <NavLink to="/products?is_featured=true" className={({ isActive }) => isActive ? 'active' : ''}>
              Featured
            </NavLink>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Search */}
          <button
            className="navbar__icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Cart */}
          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="navbar__user-menu">
              <Link to="/profile" className="navbar__icon-btn" aria-label="My Profile">
                <User size={19} />
              </Link>
              <button className="navbar__icon-btn" onClick={handleLogout} aria-label="Logout">
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar__login-btn">
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="navbar__icon-btn navbar__menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div className="navbar__search-bar">
          <div className="container">
            <form onSubmit={handleSearch} className="navbar__search-form">
              <Search size={18} className="navbar__search-icon" />
              <input
                type="text"
                placeholder="Search for clothes, bags, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-links">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
            <div className="navbar__mobile-section">
              <span className="navbar__mobile-section-title">Shop</span>
              {NAV_CATEGORIES.map((cat) => (
                <Link key={cat.to} to={cat.to} onClick={() => setMenuOpen(false)}>
                  {cat.label}
                </Link>
              ))}
            </div>
            <NavLink to="/products?is_new_arrival=true" onClick={() => setMenuOpen(false)}>New Arrivals</NavLink>
            <NavLink to="/products?is_featured=true" onClick={() => setMenuOpen(false)}>Featured</NavLink>
            <div className="navbar__mobile-divider" />
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  Cart {cartCount > 0 && <span className="navbar__mobile-badge">{cartCount}</span>}
                </Link>
                <button onClick={handleLogout} className="navbar__mobile-logout">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="navbar__mobile-register">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
