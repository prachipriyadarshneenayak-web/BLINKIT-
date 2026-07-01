import "./ProductSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>

      <div className="skeleton-line short"></div>

      <div className="skeleton-line"></div>

      <div className="skeleton-line small"></div>

      <div className="skeleton-footer">
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;