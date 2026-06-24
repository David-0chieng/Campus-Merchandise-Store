import { Link } from 'react-router-dom';
import { FiShoppingBag, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const PLACEHOLDER = 'https://placehold.co/400x500/1a1a2e/c9a84c?text=SPH';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.image_url || PLACEHOLDER}
          alt={product.name}
          className="product-card__image"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />

        <div className="product-card__badges">
          {product.is_new_arrival && <span className="badge badge-accent">New</span>}
          {product.is_featured && <span className="badge badge-dark">Featured</span>}
          {product.stock === 0 && <span className="badge" style={{background:'var(--error)',color:'#fff'}}>Sold Out</span>}
        </div>

        <div className="product-card__overlay">
          <Link to={`/products/${product.id}`} className="product-card__overlay-btn">
            <FiEye size={16} /> Quick View
          </Link>
          <button
            className="product-card__overlay-btn product-card__overlay-btn--cart"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <FiShoppingBag size={16} />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="product-card__info">
        {product.category_name && (
          <span className="product-card__category">{product.category_name}</span>
        )}
        <h3 className="product-card__name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-card__footer">
          <span className="product-card__price">GHS {parseFloat(product.price).toFixed(2)}</span>
          <span className="product-card__stock">
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
