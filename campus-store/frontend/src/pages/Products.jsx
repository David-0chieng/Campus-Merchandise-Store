import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import AnimatedLoadingSkeleton from '../components/ui/animated-loading-skeleton';
import EmptyState from '../components/EmptyState';
import { productService } from '../services/api';
import './Products.css';

const SORT_OPTIONS = [
  { value: '-created_at', label: 'Newest First' },
  { value: 'created_at', label: 'Oldest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const ordering = searchParams.get('ordering') || '-created_at';
  const isFeatured = searchParams.get('is_featured') || '';
  const isNewArrival = searchParams.get('is_new_arrival') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ordering, page };
      if (search) params.search = search;
      if (category) params.category = category;
      if (isFeatured) params.is_featured = isFeatured;
      if (isNewArrival) params.is_new_arrival = isNewArrival;

      const { data } = await productService.getAll(params);
      setProducts(data.results || data);
      setTotalCount(data.count || (data.results?.length ?? data.length));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, ordering, isFeatured, isNewArrival, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    productService.getCategories().then(({ data }) =>
      setCategories(data.results || data)
    );
  }, []);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  const clearFilters = () => setSearchParams({});

  const hasFilters = search || category || isFeatured || isNewArrival;

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="products-page__header">
        <div className="container">
          <h1>Swahilipot Hub Merchandise</h1>
          <p>Quality lifestyle products — Clothes, bags, accessories, and shoes</p>
          <SearchBar
            defaultValue={search}
            onSearch={(q) => setParam('search', q)}
            inline
          />
        </div>
      </div>

      <div className="container products-page__body">
        {/* Sidebar Filters */}
        <aside className={`products-filters ${filtersOpen ? 'products-filters--open' : ''}`}>
          <div className="products-filters__header">
            <h3>Filters</h3>
            <button onClick={() => setFiltersOpen(false)} className="products-filters__close">
              <FiX size={18} />
            </button>
          </div>

          <div className="products-filters__section">
            <h4>Category <FiChevronDown size={14} /></h4>
            <ul>
              <li>
                <button
                  className={!category ? 'active' : ''}
                  onClick={() => setParam('category', '')}
                >All</button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={category === cat.slug ? 'active' : ''}
                    onClick={() => setParam('category', cat.slug)}
                  >{cat.name}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="products-filters__section">
            <h4>Availability</h4>
            <ul>
              <li>
                <button
                  className={isFeatured === 'true' ? 'active' : ''}
                  onClick={() => setParam('is_featured', isFeatured === 'true' ? '' : 'true')}
                >Featured</button>
              </li>
              <li>
                <button
                  className={isNewArrival === 'true' ? 'active' : ''}
                  onClick={() => setParam('is_new_arrival', isNewArrival === 'true' ? '' : 'true')}
                >New Arrivals</button>
              </li>
            </ul>
          </div>

          {hasFilters && (
            <button className="btn btn-outline products-filters__clear" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Main Content */}
        <div className="products-main">
          <div className="products-toolbar">
            <button className="btn btn-outline products-toolbar__filter-btn" onClick={() => setFiltersOpen(true)}>
              <FiFilter size={16} /> Filters
            </button>
            <p className="products-toolbar__count">
              {totalCount} product{totalCount !== 1 ? 's' : ''}
              {hasFilters && ' found'}
            </p>
            <select
              className="products-toolbar__sort"
              value={ordering}
              onChange={(e) => setParam('ordering', e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <AnimatedLoadingSkeleton />
          ) : products.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No products found"
              message="Try adjusting your search or filters"
              actionLabel="Clear Filters"
              actionTo="/products"
            />
          ) : (
            <div className="products-grid-main">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter overlay */}
      {filtersOpen && (
        <div className="products-overlay" onClick={() => setFiltersOpen(false)} />
      )}
    </div>
  );
};

export default Products;
