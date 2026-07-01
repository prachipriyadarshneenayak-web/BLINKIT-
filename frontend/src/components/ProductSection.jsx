import { useRef } from "react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import EmptyState from "./EmptyState";
import "./ProductSection.css";

const ProductSection = ({
  title,
  products = [],
  loading = false,
}) => {
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <section className="product-section">
      <div className="products-header">
        <div>
          <h2>{title}</h2>
          <p>Fresh picks curated just for you</p>
        </div>

        <div className="header-actions">
          <button
            className="arrow-btn"
            onClick={scrollLeft}
          >
            ←
          </button>

          <button
            className="arrow-btn"
            onClick={scrollRight}
          >
            →
          </button>

          <button className="view-all-btn">
            View All
          </button>
        </div>
      </div>

      {loading ? (
        <div
          className="products-slider"
          ref={sliderRef}
        >
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Products Found"
          description="Try another search or category."
          buttonText="Browse All Products"
          buttonLink="/"
        />
      ) : (
        <div
          className="products-slider"
          ref={sliderRef}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;