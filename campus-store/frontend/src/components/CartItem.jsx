import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';
import './CartItem.css';

const PLACEHOLDER = 'https://placehold.co/100x120/1a1a2e/c9a84c?text=SPH';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img
          src={item.image_url || PLACEHOLDER}
          alt={item.name}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>

      <div className="cart-item__details">
        <div className="cart-item__info">
          {item.category_name && (
            <span className="cart-item__category">{item.category_name}</span>
          )}
          <h4 className="cart-item__name">{item.name}</h4>
          <p className="cart-item__price-unit">KSh {parseFloat(item.price).toFixed(2)} each</p>
        </div>

        <div className="cart-item__controls">
          <QuantitySelector
            quantity={item.quantity}
            maxQty={item.stock}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
          />
          <span className="cart-item__subtotal">
            KSh {(parseFloat(item.price) * item.quantity).toFixed(2)}
          </span>
          <button
            className="cart-item__remove"
            onClick={() => removeFromCart(item.id)}
            aria-label="Remove item"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
