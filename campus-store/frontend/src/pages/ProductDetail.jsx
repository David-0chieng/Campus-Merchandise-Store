import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft, FiPackage, FiTag } from 'react-icons/fi';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const PLACEHOLDER = 'https://placehold.co/600x700/1a1a2e/c9a84c?text=SPH';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [imgZoom, setImgZoom] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    productService.getOne(id).then(({ data }) => {
      setProduct(data);
      if (data.category) {
        productService.getAll({ category: data.category, page_size: 4 })
          .then(({ data: rel }) => {
            const results = rel.results || rel;
            setRelated(results.filter((p) => p.id !== data.id).slice(0, 4));
          });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <LoadingSpinner text="Loading product..." />;
  if (!product) return (
    <div className="container page-wrapper text-center">
      <h2>Product not found</h2>
      <Link to="/products" className="btn btn-primary" style={{ marginTop: 20 }}>Back to Shop</Link>
    </div>
  );

  const imgSrc = product.image_url || PLACEHOLDER;

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="product-detail__back">
          <FiArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="product-detail__main">
          {/* Image */}
          <div className={`product-detail__gallery ${imgZoom ? 'product-detail__gallery--zoom' : ''}`}>
            <div className="product-detail__img-wrap" onClick={() => setImgZoom(!imgZoom)}>
              <img src={imgSrc} alt={product.name} onError={(e) => { e.target.src = PLACEHOLDER; }} />
              <div className="product-detail__zoom-hint">
                {imgZoom ? 'Click to zoom out' : 'Click to zoom in'}
              </div>
            </div>

            <div className="product-detail__badges">
              {product.is_new_arrival && <span className="badge badge-accent">New Arrival</span>}
              {product.is_featured && <span className="badge badge-dark">Featured</span>}
            </div>
          </div>

          {/* Info */}
          <div className="product-detail__info">
            {product.category_name && (
              <div className="product-detail__category">
                <FiTag size={13} /> {product.category_name}
              </div>
            )}

            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-detail__price">KSh {parseFloat(product.price).toFixed(2)}</p>

            <div className="product-detail__stock-row">
              <FiPackage size={15} />
              <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="product-detail__desc">{product.description}</p>

            <div className="product-detail__actions">
              <QuantitySelector
                quantity={qty}
                maxQty={product.stock}
                onIncrease={() => setQty((q) => Math.min(q + 1, product.stock))}
                onDecrease={() => setQty((q) => Math.max(q - 1, 1))}
              />
              <button
                className={`btn ${added ? 'btn-dark' : 'btn-primary'} product-detail__add-btn`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FiShoppingBag size={17} />
                {product.stock === 0 ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>

            <div className="product-detail__meta">
              <div><span>SKU</span><span>SPH-{String(product.id).padStart(4, '0')}</span></div>
              <div><span>Category</span><span>{product.category_name || '—'}</span></div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="product-detail__related">
            <h2 className="section-title">You Might Also Like</h2>
            <p className="section-subtitle">More from the SPH collection</p>
            <div className="product-detail__related-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
