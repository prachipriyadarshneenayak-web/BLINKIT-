require("dotenv").config();

const express = require("express");
const cors = require("cors");

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
const userRoutes = require("./src/routes/userRoutes");

const couponRoutes = require("./src/routes/couponRoutes");
const chatbotRoutes = require("./src/routes/chatbotRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
app.use("/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/chatbot", chatbotRoutes);

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

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});