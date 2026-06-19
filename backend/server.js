const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/dashboard", dashboardRoutes);

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