import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-price"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
};

export default SkeletonCard;