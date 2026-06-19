const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Review Route
router.post("/:id/review", protect, addReview);

// Admin Routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;