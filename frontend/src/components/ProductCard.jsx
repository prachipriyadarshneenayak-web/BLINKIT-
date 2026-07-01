import { FaHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlistItems } = useSelector(
    (state) => state.wishlist
  );

  const isWishlisted = wishlistItems.some(
    (item) => item._id === product._id
  );

  const addItem = (e) => {
    e.stopPropagation();

    dispatch(addToCart(product));

    toast.success(`${product.name} added to cart`);
  };

  const wishlistHandler = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to Wishlist");
    }
  };

  const imageUrl =
    product.image &&
    (product.image.startsWith("http") ||
      product.image.startsWith("https"))
      ? product.image
      : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div
      className="product-card"
      onClick={() =>
        navigate(`/product/${product._id}`)
      }
    >
      <div
        className="wishlist-btn"
        onClick={wishlistHandler}
      >
        <FaHeart
          color={
            isWishlisted ? "#ef4444" : "#b0b0b0"
          }
        />
      </div>

      <div className="discount-badge">
        15% OFF
      </div>

      <div className="product-image">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      <div className="delivery-badge">
        ⚡ 10 Min
      </div>

      <h3>{product.name}</h3>

      <p className="product-description">
        {product.description}
      </p>

      <div className="rating-stock">
        <span className="rating">
          <FaStar />
          4.8
        </span>

        <span className="stock">
          In Stock
        </span>
      </div>

      <div className="product-footer">
        <div className="price-box">
          <span className="product-price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{Math.round(product.price * 1.2)}
          </span>
        </div>

        <button
          className="add-btn"
          onClick={addItem}
        >
          + ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;