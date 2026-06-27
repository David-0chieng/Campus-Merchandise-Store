import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';
import './Wishlist.css';

const PLACEHOLDER = 'https://placehold.co/400x480/1a1a2e/c9a84c?text=SPH';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    if (product.stock === 0) { toast.error('Out of stock'); return; }
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleMoveAll = () => {
    const inStock = items.filter((p) => p.stock > 0);
    if (!inStock.length) { toast.error('No in-stock items to move'); return; }
    inStock.forEach((p) => addToCart(p, 1));
    inStock.forEach((p) => removeFromWishlist(p.id));
    toast.success(`${inStock.length} item${inStock.length !== 1 ? 's' : ''} moved to cart!`);
  };

  if (!items.length) return (
    <div className="page-wrapper">
      <EmptyState icon="❤️" title="Your wishlist is empty"
        message="Save products you love and come back to them anytime."
        actionLabel="Explore Products" actionTo="/products" />
    </div>
  );

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <div className="container">
          <h1>My Wishlist</h1>
          <p>{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container wishlist-page__body">
        <div className="wishlist-toolbar">
          <span className="wishlist-toolbar__count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
          <div className="wishlist-toolbar__actions">
            <button className="btn btn-primary wishlist-toolbar__move" onClick={handleMoveAll}>
              <FiShoppingBag size={15} /> Move All to Cart
            </button>
            <button className="wishlist-toolbar__clear" onClick={() => { clearWishlist(); toast('Wishlist cleared', { icon: '🗑️' }); }}>
              <FiTrash2 size={14} /> Clear All
            </button>
          </div>
        </div>

        <div className="wishlist-grid">
          {items.map((product) => (
            <div key={product.id} className="wishlist-card">
              <Link to={`/products/${product.id}`} className="wishlist-card__img-wrap">
                <img
                  src={product.image_url || PLACEHOLDER}
                  alt={product.name}
                  onError={(e) => { e.target.src = PLACEHOLDER; }}
                />
                {product.stock === 0 && <div className="wishlist-card__sold-out">Sold Out</div>}
              </Link>

              <div className="wishlist-card__body">
                {product.category_name && (
                  <span className="wishlist-card__category">{product.category_name}</span>
                )}
                <Link to={`/products/${product.id}`} className="wishlist-card__name">{product.name}</Link>
                <p className="wishlist-card__price">
                  KSh {parseFloat(product.price).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </p>

                <div className="wishlist-card__actions">
                  <button
                    className="btn btn-primary wishlist-card__add"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <FiShoppingBag size={15} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button
                    className="wishlist-card__remove"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
