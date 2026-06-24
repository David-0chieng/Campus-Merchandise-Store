import { Link } from 'react-router-dom';
import './EmptyState.css';

const EmptyState = ({ icon = '🛍️', title = 'Nothing here yet', message = '', actionLabel, actionTo }) => (
  <div className="empty-state">
    <div className="empty-state__icon">{icon}</div>
    <h3 className="empty-state__title">{title}</h3>
    {message && <p className="empty-state__message">{message}</p>}
    {actionLabel && actionTo && (
      <Link to={actionTo} className="btn btn-primary">{actionLabel}</Link>
    )}
  </div>
);

export default EmptyState;
