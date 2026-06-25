import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import './HeroBanner.css';

const HeroBanner = () => (
  <section className="hero">
    {/* Animated background */}
    <div className="hero__bg">
      <div className="hero__bg-gradient" />
      <div className="hero__bg-grid" />
      {/* Floating orbs — ReactBits inspired */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
    </div>

    <div className="hero__content container">
      <div className="hero__left fade-in-up">

        {/* Pill badge */}
        <div className="hero__badge">
          <Sparkles size={13} />
          <span>New Collection 2024</span>
        </div>

        {/* Headline */}
        <h1 className="hero__title">
          Clock Your
          <br />
          <span className="hero__title-gradient">Best Look</span>
        </h1>

        <p className="hero__desc">
          Premium lifestyle merchandise for those who move with purpose.
          Clothes, bags, accessories and shoes — crafted to turn heads.
        </p>

        {/* CTA row */}
        <div className="hero__cta">
          <Link to="/products" className="hero__btn-primary">
            Shop Collection
            <ArrowRight size={17} />
          </Link>
          <Link to="/products?is_new_arrival=true" className="hero__btn-ghost">
            New Arrivals
          </Link>
        </div>

        {/* Social proof */}
        <div className="hero__social-proof">
          <div className="hero__stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#c9a84c" stroke="#c9a84c" />
            ))}
          </div>
          <span>Trusted by hundreds of customers in Kenya</span>
        </div>
      </div>

      {/* Right — floating product cards */}
      <div className="hero__right">
        <div className="hero__card-stack">
          <div className="hero__card hero__card--back">
            <div className="hero__card-img hero__card-img--2" />
            <div className="hero__card-info">
              <span>SPH Backpack</span>
              <strong>KSh 4,200</strong>
            </div>
          </div>
          <div className="hero__card hero__card--front">
            <div className="hero__card-img hero__card-img--1" />
            <div className="hero__card-tag">🔥 Best Seller</div>
            <div className="hero__card-info">
              <span>SPH Classic Hoodie</span>
              <strong>KSh 3,500</strong>
            </div>
          </div>
        </div>

        {/* Floating stats bubbles */}
        <div className="hero__bubble hero__bubble--top">
          <span className="hero__bubble-num">10+</span>
          <span className="hero__bubble-label">Products</span>
        </div>
        <div className="hero__bubble hero__bubble--bottom">
          <span className="hero__bubble-num">6</span>
          <span className="hero__bubble-label">Categories</span>
        </div>
      </div>
    </div>

    {/* Bottom wave divider */}
    <div className="hero__wave">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="var(--off-white)" />
      </svg>
    </div>
  </section>
);

export default HeroBanner;
