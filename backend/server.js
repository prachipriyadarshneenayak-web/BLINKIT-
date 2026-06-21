require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const restaurantRoutes = require("./src/routes/restaurantRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Blinkit Backend Running 🚀");
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});