import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './CategoryCard.css';

const ICONS = {
  apparel: '👕',
  headwear: '🧢',
  bags: '🎒',
  drinkware: '☕',
  stationery: '📓',
  accessories: '🏷️',
};

const CategoryCard = ({ category }) => (
  <Link to={`/products?category=${category.slug}`} className="category-card">
    <div className="category-card__icon">{ICONS[category.slug] || '🛍️'}</div>
    <h3 className="category-card__name">{category.name}</h3>
    <span className="category-card__link">Shop Now <FiArrowRight size={14} /></span>
  </Link>
);

export default CategoryCard;
