import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>🛒 GroceryHub</h2>
          <p>
            Fresh groceries delivered to your doorstep
            with speed, quality and affordability.
          </p>
        </div>

        <div className="footer-links">
          <h3>Company</h3>

          <a href="/">About</a>
          <a href="/">Careers</a>
          <a href="/">Contact</a>
          <a href="/">Blog</a>
        </div>

        <div className="footer-links">
          <h3>Support</h3>

          <a href="/">Help Center</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">FAQs</a>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>

          <a href="/">Fruits</a>
          <a href="/">Vegetables</a>
          <a href="/">Snacks</a>
          <a href="/">Beverages</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 GroceryHub | Built with React, Node.js & MongoDB
      </div>
    </footer>
  );
};

export default Footer;