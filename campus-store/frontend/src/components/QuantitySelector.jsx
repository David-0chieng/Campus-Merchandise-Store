import { FiMinus, FiPlus } from 'react-icons/fi';
import './QuantitySelector.css';

const QuantitySelector = ({ quantity, maxQty = Infinity, onIncrease, onDecrease }) => (
  <div className="qty-selector">
    <button
      className="qty-selector__btn"
      onClick={onDecrease}
      disabled={quantity <= 1}
      aria-label="Decrease quantity"
    >
      <FiMinus size={14} />
    </button>
    <span className="qty-selector__value">{quantity}</span>
    <button
      className="qty-selector__btn"
      onClick={onIncrease}
      disabled={quantity >= maxQty}
      aria-label="Increase quantity"
    >
      <FiPlus size={14} />
    </button>
  </div>
);

export default QuantitySelector;
