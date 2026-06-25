import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import AnimatedLoadingSkeleton from '../components/ui/animated-loading-skeleton';
import { productService } from '../services/api';
import './Home.css';

const TRUST_BADGES = [
  { icon: <Truck size={22} />, title: 'Free Delivery', desc: 'On orders over KSh 2,000' },
  { icon: <RotateCcw size={22} />, title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: <ShieldCheck size={22} />, title: 'Secure Payment', desc: 'Your data is protected' },
  { icon: <Headphones size={22} />, title: '24/7 Support', desc: 'Always here to help' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [featRes, newRes, catRes] = await Promise.all([
          productService.getAll({ is_featured: true, page_size: 4 }),
          productService.getAll({ is_new_arrival: true, page_size: 4 }),
          productService.getCategories(),
        ]);
        setFeatured(featRes.data.results || featRes.data);
        setNewArrivals(newRes.data.results || newRes.data);
        setCategories(catRes.data.results || catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="home">
      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Trust badges ── */}
      <section className="trust-bar">
        <div className="container trust-bar__grid">
          {TRUST_BADGES.map((b) => (
            <div key={b.title} className="trust-badge">
              <div className="trust-badge__icon">{b.icon}</div>
              <div>
                <strong>{b.title}</strong>
                <span>{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="home-section container">
        <div className="home-section__header">
          <div>
            <p className="home-section__eyebrow">Browse by type</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link to="/products" className="home-section__view-all">
            All Products <ArrowRight size={15} />
          </Link>
        </div>
        {loading ? (
          <AnimatedLoadingSkeleton />
        ) : (
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* ── Promo Banner ── */}
      <section className="promo-banner">
        <div className="promo-banner__inner container">
          {/* Left text */}
          <div className="promo-banner__text">
            <span className="promo-banner__pill">⏰ Limited Time Offer</span>
            <h2>New Customer Special</h2>
            <p>
              Get <strong>10% off</strong> your first order.{' '}
              Use code <strong className="promo-banner__code">SPH2024</strong> at checkout.
            </p>
            <Link to="/products" className="hero__btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
          {/* Right decorative */}
          <div className="promo-banner__visual">
            <div className="promo-banner__circle promo-banner__circle--1" />
            <div className="promo-banner__circle promo-banner__circle--2" />
            <div className="promo-banner__emoji">🛍️</div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="home-section container">
        <div className="home-section__header">
          <div>
            <p className="home-section__eyebrow">Handpicked for you</p>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/products?is_featured=true" className="home-section__view-all">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        {loading ? (
          <AnimatedLoadingSkeleton />
        ) : (
          <div className="products-grid">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Lifestyle banner ── */}
      <section className="lifestyle-banner">
        <div className="lifestyle-banner__inner container">
          <div className="lifestyle-banner__text">
            <h2>Clock It Every Day</h2>
            <p>
              Style that moves with you. From hoodies to tote bags, every piece in the
              SPH collection is built for real life and real style.
            </p>
            <Link to="/products" className="lifestyle-banner__btn">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="lifestyle-banner__images">
            <div className="lifestyle-banner__img lifestyle-banner__img--1" />
            <div className="lifestyle-banner__img lifestyle-banner__img--2" />
            <div className="lifestyle-banner__img lifestyle-banner__img--3" />
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="home-section container">
        <div className="home-section__header">
          <div>
            <p className="home-section__eyebrow">Just dropped</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <Link to="/products?is_new_arrival=true" className="home-section__view-all">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        {loading ? (
          <AnimatedLoadingSkeleton />
        ) : (
          <div className="products-grid">
            {newArrivals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Newsletter ── */}
      <section className="newsletter-section">
        <div className="container newsletter-section__inner">
          <div className="newsletter-section__text">
            <h2>Stay in the Loop</h2>
            <p>New drops, restocks, and exclusive deals — straight to your inbox.</p>
          </div>
          <form className="newsletter-section__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your.email@example.com" />
            <button type="submit" className="hero__btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Subscribe <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
