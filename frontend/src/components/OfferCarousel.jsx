import { useEffect, useState } from "react";
import "./OfferCarousel.css";

const offers = [
  {
    title: "Flat ₹100 OFF",
    subtitle: "On your first order above ₹299",
    image: "/offers/offer1.png",
    color: "#d9fbe4",
  },
  {
    title: "Fresh Fruits Sale",
    subtitle: "Up to 40% OFF on seasonal fruits",
    image: "/offers/offer2.png",
    color: "#fff3d6",
  },
  {
    title: "Free Delivery",
    subtitle: "On orders above ₹199",
    image: "/offers/offer3.png",
    color: "#e8f2ff",
  },
];

const OfferCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="offer-carousel">
      <div
        className="offer-slide"
        style={{ background: offers[current].color }}
      >
        <div className="offer-content">
          <h1>{offers[current].title}</h1>
          <p>{offers[current].subtitle}</p>

          <button>Shop Now →</button>
        </div>

        <img
          src={offers[current].image}
          alt=""
        />
      </div>

      <div className="dots">
        {offers.map((_, index) => (
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

export default OfferCarousel;