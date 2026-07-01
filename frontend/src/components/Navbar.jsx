import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchSuggestions from "./SearchSuggestions";
import "./Navbar.css";

const Navbar = ({
  searchTerm = "",
  setSearchTerm = () => {},
  products = [],
}) => {
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const { wishlistItems } = useSelector(
    (state) => state.wishlist
  );

  const cartCount = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const wishlistCount = wishlistItems.length;

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = products
        .filter((product) =>
          product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .slice(0, 6);

      setSuggestions(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, products]);

  const selectSuggestion = (product) => {
    navigate(`/product/${product._id}`);

    setSearchTerm("");

    setSuggestions([]);
  };

  const handleLinkClick = (path) => (e) => {
    if (window.location.pathname === path) {
      window.location.reload();
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link
          to="/"
          className="logo"
          onClick={handleLinkClick("/")}
        >
          Blinkit 🛒
        </Link>

        <div className="location">
          <div className="location-title">
            Delivery in 10 minutes
          </div>

          <div className="location-address">
            Home • Your Location
          </div>
        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search for groceries, fruits, vegetables..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <SearchSuggestions
            suggestions={suggestions}
            onSelect={selectSuggestion}
          />

        </div>

        <div className="nav-links">

          <Link to="/wishlist" onClick={handleLinkClick("/wishlist")}>
            <button className="login-btn">
              ❤️ Wishlist ({wishlistCount})
            </button>
          </Link>

          {userInfo ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginRight: "12px",
                }}
              >
                <img
                  src={
                    userInfo?.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(userInfo?.name || "User")
                  }
                  alt="Profile"
                  loading="lazy"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <span
                  style={{
                    fontWeight: "700",
                  }}
                >
                  {userInfo.name}
                </span>
              </div>

              <Link to="/my-orders" onClick={handleLinkClick("/my-orders")}>
                <button className="login-btn">
                  📦 Orders
                </button>
              </Link>

              <Link to="/profile" onClick={handleLinkClick("/profile")}>
                <button className="login-btn">
                  👤 Profile
                </button>
              </Link>

              {userInfo.role === "admin" && (
                <Link to="/admin" onClick={handleLinkClick("/admin")}>
                  <button className="login-btn">
                    📊 Dashboard
                  </button>
                </Link>
              )}

              <button
                className="login-btn"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="login-btn">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="login-btn">
                  Register
                </button>
              </Link>
            </>
          )}

          <Link to="/cart" onClick={handleLinkClick("/cart")}>
            <button className="cart-btn">
              🛒 Cart ({cartCount})
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;