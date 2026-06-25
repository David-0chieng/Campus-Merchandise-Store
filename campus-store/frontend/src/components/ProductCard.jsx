import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart(product);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  };

  return (
    <div className="product-card">
      {/* Image area */}
      <div className="product-card__image-wrap">
        <img
          src={product.image_url || PLACEHOLDER}
          alt={product.name}
          className="product-card__image"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-card__badges">
          {product.is_new_arrival && (
            <span className="product-card__badge product-card__badge--new">New</span>
          )}
          {product.is_featured && (
            <span className="product-card__badge product-card__badge--featured">⭐ Featured</span>
          )}
          {product.stock === 0 && (
            <span className="product-card__badge product-card__badge--sold">Sold Out</span>
          )}
        </div>

        {/* Wishlist btn */}
        <button
          className={`product-card__wishlist ${wishlisted ? 'product-card__wishlist--active' : ''}`}
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={wishlisted ? '#c9a84c' : 'none'} />
        </button>

        {/* Hover overlay */}
        <div className="product-card__overlay">
          <Link
            to={`/products/${product.id}`}
            className="product-card__overlay-btn"
          >
            <Eye size={15} />
            Quick View
          </Link>
          <button
            className={`product-card__overlay-btn product-card__overlay-btn--cart ${addedFlash ? 'product-card__overlay-btn--flash' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingBag size={15} />
            {addedFlash ? '✓ Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        {product.category_name && (
          <span className="product-card__category">{product.category_name}</span>
        )}
        <h3 className="product-card__name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating row (decorative) */}
        <div className="product-card__rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill={i < 4 ? '#c9a84c' : 'none'} stroke="#c9a84c" strokeWidth={1.5} />
          ))}
          <span>(4.0)</span>
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">
            KSh {parseFloat(product.price).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </span>
          <span className={`product-card__stock ${product.stock === 0 ? 'product-card__stock--out' : product.stock < 5 ? 'product-card__stock--low' : ''}`}>
            {product.stock === 0 ? 'Out of stock' : product.stock < 5 ? `Only ${product.stock} left` : `${product.stock} in stock`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
