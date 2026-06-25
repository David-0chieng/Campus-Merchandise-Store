import './OrderSummary.css';

const OrderSummary = ({ subtotal, deliveryFee, total, items = [] }) => (
  <div className="order-summary">
    <h3 className="order-summary__title">Order Summary</h3>

    {items.length > 0 && (
      <ul className="order-summary__items">
        {items.map((item) => (
          <li key={item.id} className="order-summary__item">
            <span>{item.name} × {item.quantity}</span>
            <span>KSh {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    )}

    <div className="order-summary__divider" />

    <div className="order-summary__row">
      <span>Subtotal</span>
      <span>KSh {parseFloat(subtotal).toFixed(2)}</span>
    </div>
    <div className="order-summary__row">
      <span>Delivery Fee</span>
      <span>{parseFloat(deliveryFee) > 0 ? `KSh ${parseFloat(deliveryFee).toFixed(2)}` : 'Free'}</span>
    </div>

    <div className="order-summary__divider" />

    <div className="order-summary__row order-summary__row--total">
      <span>Total</span>
      <span>KSh {parseFloat(total).toFixed(2)}</span>
    </div>
  </div>
);

export default OrderSummary;
