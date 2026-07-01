import "./StatsBar.css";

const StatsBar = () => {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        ⚡ <strong>10 Min</strong>
        <span>Delivery</span>
      </div>

      <div className="stat-item">
        🛒 <strong>5000+</strong>
        <span>Products</span>
      </div>

      <div className="stat-item">
        😊 <strong>50K+</strong>
        <span>Happy Customers</span>
      </div>

      <div className="stat-item">
        ⭐ <strong>4.8</strong>
        <span>Average Rating</span>
      </div>
    </div>
  );
};

export default StatsBar;