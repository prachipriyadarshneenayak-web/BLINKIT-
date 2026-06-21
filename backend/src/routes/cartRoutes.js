const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

router.put("/:id", protect, updateCartItem);

router.delete("/:id", protect, removeCartItem);

module.exports = router;