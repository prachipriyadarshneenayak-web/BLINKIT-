import "./DealsSection.css";

const deals = [
  {
    title: "Fresh Fruits",
    offer: "30% OFF",
    color: "#FFE8E8",
    emoji: "🍎",
  },
  {
    title: "Dairy Products",
    offer: "Buy 1 Get 1",
    color: "#E8F6FF",
    emoji: "🥛",
  },
  {
    title: "Snacks",
    offer: "Under ₹99",
    color: "#FFF4D9",
    emoji: "🍟",
  },
];

const DealsSection = () => {
  return (
    <section className="deals-section">

      <div className="section-title">
        <h2>🔥 Deals of the Day</h2>
        <p>Limited time offers just for you</p>
      </div>

      <div className="deals-grid">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="deal-card"
            style={{ background: deal.color }}
          >
            <div className="deal-emoji">
              {deal.emoji}
            </div>

            <h3>{deal.offer}</h3>

            <p>{deal.title}</p>

            <button>Shop Now →</button>
          </div>
        ))}
      </div>

    </section>
  );
};

export default DealsSection;