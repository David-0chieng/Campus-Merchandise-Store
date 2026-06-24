import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => (
  <div className={`spinner-wrap spinner-wrap--${size}`}>
    <div className="spinner" />
    {text && <p className="spinner-text">{text}</p>}
  </div>
);

export default LoadingSpinner;
