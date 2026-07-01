import { useEffect, useState } from "react";
import "./OfferBanner.css";

const banners = [
  {
    tag: "⚡ 10 MIN DELIVERY",
    title: "Flat ₹100 OFF",
    subtitle: "On your first order above ₹299",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900",
  },
  {
    tag: "🥭 SUMMER SALE",
    title: "Fresh Fruits 30% OFF",
    subtitle: "Healthy deals every day",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900",
  },
  {
    tag: "🥛 DAILY ESSENTIALS",
    title: "Buy 1 Get 1 Free",
    subtitle: "Milk, Bread & Dairy Products",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900",
  },
];

const OfferBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  return (
    <section className="offer-banner">

      <div className="offer-left">

        <span className="offer-tag">
          {banner.tag}
        </span>

        <h1>{banner.title}</h1>

        <p>{banner.subtitle}</p>

        <button>Shop Now →</button>

      </div>

      <div className="offer-right">

        <img
          src={banner.image}
          alt="Offer Banner"
        />

      </div>

      <div className="banner-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={
              current === index
                ? "dot active-dot"
                : "dot"
            }
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

    </section>
  );
};

export default OfferBanner;