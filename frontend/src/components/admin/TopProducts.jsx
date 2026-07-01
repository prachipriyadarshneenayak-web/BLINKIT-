import "./TopProducts.css";

const TopProducts = ({ products = [] }) => {
  return (
    <div className="top-products-card">

      <div className="top-header">
        <h2>🏆 Best Selling Products</h2>
        <span>This Month</span>
      </div>

      {products.length === 0 ? (

        <div className="empty-products">

          <h3>No Sales Yet</h3>

          <p>
            Products will appear here after
            orders are completed.
          </p>

        </div>

      ) : (

        products.map((product, index) => (

          <div
            className="top-product-row"
            key={index}
          >

            <div className="top-product-left">

              <div className="rank">
                #{index + 1}
              </div>

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/70"
                }
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/70";
                }}
              />

              <div>

                <h4>{product.name}</h4>

                <small>
                  ₹{product.price}
                </small>

              </div>

            </div>

            <div className="sold-box">

              <strong>
                {product.totalSold}
              </strong>

              <small>Sold</small>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default TopProducts;