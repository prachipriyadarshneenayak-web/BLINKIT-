import "./SearchSuggestions.css";

const SearchSuggestions = ({
  suggestions,
  onSelect,
}) => {
  if (!suggestions.length) return null;

  return (
    <div className="search-suggestions">
      {suggestions.map((product) => (
        <div
          key={product._id}
          className="suggestion-item"
          onClick={() => onSelect(product)}
        >
          <img
            src={product.image}
            alt={product.name}
          />

          <div>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;