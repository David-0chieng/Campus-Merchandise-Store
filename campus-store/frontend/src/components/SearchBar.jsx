import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ defaultValue = '', onSearch, inline = false }) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className={`search-bar ${inline ? 'search-bar--inline' : ''}`} onSubmit={handleSubmit}>
      <FiSearch size={18} className="search-bar__icon" />
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-primary search-bar__btn">Search</button>
    </form>
  );
};

export default SearchBar;
