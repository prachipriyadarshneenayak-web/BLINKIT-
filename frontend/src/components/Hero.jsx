import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">
          ⚡ Delivery in 10 Minutes
        </span>

        <h1>
          Fresh Groceries,
          <br />
          Delivered Instantly
        </h1>

        <p>
          Order fresh fruits, vegetables, dairy,
          snacks and daily essentials from Blinkit.
          Fast delivery, great prices and quality
          you can trust.
        </p>

        <div className="hero-buttons">
          <button className="shop-btn">
            🛒 Shop Now
          </button>

          <button className="explore-btn">
            Explore Categories
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            ⚡
            <span>10 Min Delivery</span>
          </div>

          <div className="stat-card">
            🥬
            <span>Fresh Products</span>
          </div>

          <div className="stat-card">
            ⭐
            <span>4.9 Rating</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-card">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
            alt="Fresh Grocery"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;