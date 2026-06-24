import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productService } from '../services/api';
import './Home.css';

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
      <HeroBanner />

      {/* Categories */}
      <section className="home-section container">
        <div className="home-section__header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-banner__content container">
          <div className="promo-banner__text">
            <span className="promo-banner__label">Limited Time</span>
            <h2>New Student Special</h2>
            <p>Get 10% off your first order. Use code <strong>SPH2024</strong> at checkout.</p>
            <Link to="/products" className="btn btn-primary">Shop Now <FiArrowRight /></Link>
          </div>
          <div className="promo-banner__visual">
            <div className="promo-banner__badge">🎓</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section container">
        <div className="home-section__header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked merchandise for SPH students</p>
          </div>
          <Link to="/products?is_featured=true" className="home-section__view-all">
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="products-grid">
            {featured.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* New Arrivals */}
      <section className="home-section home-section--alt">
        <div className="container">
          <div className="home-section__header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh drops from the SPH collection</p>
            </div>
            <Link to="/products?is_new_arrival=true" className="home-section__view-all">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="products-grid">
              {newArrivals.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="home-cta container">
        <div className="home-cta__content">
          <h2>Stay in the Loop</h2>
          <p>Get notified about new products, restocks and exclusive student deals.</p>
          <form className="home-cta__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your.email@sph.edu.gh" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
