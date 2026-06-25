import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CategoryCard.css';

const CATEGORY_META = {
  apparel: {
    icon: '👕',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=75',
    color: '#1a1a2e',
  },
  headwear: {
    icon: '🧢',
    img: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=300&q=75',
    color: '#2d2d2d',
  },
  bags: {
    icon: '🎒',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=75',
    color: '#3d2b1f',
  },
  drinkware: {
    icon: '☕',
    img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&q=75',
    color: '#1b2b1b',
  },
  stationery: {
    icon: '📓',
    img: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=300&q=75',
    color: '#2b2b1a',
  },
  accessories: {
    icon: '✨',
    img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&q=75',
    color: '#1a1a2e',
  },
};

const CategoryCard = ({ category }) => {
  const meta = CATEGORY_META[category.slug] || {
    icon: '🛍️',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=75',
    color: '#1a1a2e',
  };

  return (
    <Link to={`/products?category=${category.slug}`} className="category-card">
      {/* Background image */}
      <div
        className="category-card__bg"
        style={{ backgroundImage: `url(${meta.img})` }}
      />
      {/* Gradient overlay */}
      <div className="category-card__overlay" style={{ background: `linear-gradient(to top, ${meta.color}ee 30%, ${meta.color}66 100%)` }} />

      {/* Content */}
      <div className="category-card__content">
        <span className="category-card__icon">{meta.icon}</span>
        <div className="category-card__text">
          <h3 className="category-card__name">{category.name}</h3>
          <span className="category-card__cta">
            Shop Now <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
