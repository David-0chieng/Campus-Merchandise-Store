import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './HeroBanner.css';

const HeroBanner = () => (
  <section className="hero">
    <div className="hero__bg">
      <div className="hero__overlay" />
    </div>

    <div className="hero__content container">
      <div className="hero__text fade-in-up">
        <span className="hero__label">New Collection 2024</span>
        <h1 className="hero__title">
          Wear Your<br />
          <span className="hero__title-accent">SPH Pride</span>
        </h1>
        <p className="hero__desc">
          Discover official SPH campus merchandise crafted for students who
          represent their school with style.
        </p>
        <div className="hero__cta">
          <Link to="/products" className="btn btn-primary hero__btn-primary">
            Shop Collection <FiArrowRight />
          </Link>
          <Link to="/products?is_new_arrival=true" className="btn btn-outline-white">
            New Arrivals
          </Link>
        </div>
      </div>

      <div className="hero__stats">
        <div className="hero__stat">
          <strong>10+</strong>
          <span>Products</span>
        </div>
        <div className="hero__stat">
          <strong>6</strong>
          <span>Categories</span>
        </div>
        <div className="hero__stat">
          <strong>100%</strong>
          <span>Official</span>
        </div>
      </div>
    </div>

    <div className="hero__scroll-indicator">
      <span />
    </div>
  </section>
);

export default HeroBanner;
