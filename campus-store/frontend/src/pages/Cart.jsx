import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, clearCart, cartSubtotal, deliveryFee, cartTotal } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <EmptyState
          icon="🛍️"
          title="Your cart is empty"
          message="Looks like you haven't added any SPH merchandise yet."
          actionLabel="Start Shopping"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container cart-page__body">
        <div className="cart-page__items">
          <div className="cart-page__items-header">
            <h3>Your Items</h3>
            <button className="cart-page__clear-btn" onClick={clearCart}>
              <FiTrash2 size={14} /> Clear Cart
            </button>
          </div>

          <div className="cart-page__items-list">
            {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
          </div>

          <Link to="/products" className="cart-page__continue">
            <FiArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        <div className="cart-page__summary">
          <OrderSummary
            subtotal={cartSubtotal}
            deliveryFee={deliveryFee}
            total={cartTotal}
            items={cartItems}
          />

          {user ? (
            <Link to="/checkout" className="btn btn-primary cart-page__checkout-btn">
              Proceed to Checkout
            </Link>
          ) : (
            <div className="cart-page__auth-notice">
              <p>Please log in to place your order</p>
              <Link to="/login?redirect=/checkout" className="btn btn-primary cart-page__checkout-btn">
                Login to Checkout
              </Link>
            </div>
          )}

          <div className="cart-page__security">
            🔒 Secure checkout — Your information is safe with us
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
