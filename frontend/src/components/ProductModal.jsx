import "./ProductModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FaTimes, FaStar, FaTruck } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const image =
    product.image &&
    (product.image.startsWith("http") ||
      product.image.startsWith("https"))
      ? product.image
      : "https://via.placeholder.com/500";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <div className="modal-image">
          <img
            src={image}
            alt={product.name}
          />
        </div>

        <div className="modal-info">

          <span className="modal-category">
            {product.category}
          </span>

          <h2>{product.name}</h2>

          <div className="modal-rating">
            <FaStar />
            4.8
            <span>• 1.2k Reviews</span>
          </div>

         <div className="modal-price">
  ₹{product.price}

  <span>
    ₹{Math.round(product.price * 1.2)}
  </span>
</div>

<div className="save-price">
  <span className="save-tag">
    SAVE ₹{Math.round(product.price * 0.2)}
  </span>

  <span className="save-text">
    You are saving 20% on this product
  </span>
</div>

          <p className="modal-description">
            {product.description}
          </p>

          <div className="delivery-info">

            <FaTruck />

            Delivery in 10 Minutes

          </div>
          <div className="quantity-box">

  <span>Quantity</span>

  <div className="qty-controls">

    <button
      onClick={() =>
        qty > 1 && setQty(qty - 1)
      }
    >
      −
    </button>

    <span>{qty}</span>

    <button
      onClick={() => setQty(qty + 1)}
    >
      +
    </button>

  </div>

</div>

       <button
  className="modal-cart-btn"
  onClick={() => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart(product));
    }
  }}
>
  Add {qty} Item{qty > 1 ? "s" : ""} • ₹
  {qty * product.price}
</button>

        </div>
      </div>
    </div>
  );
};

export default ProductModal;