const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// Place Order
router.post("/", protect, placeOrder);

// My Orders
router.get("/myorders", protect, getMyOrders);

// Single Order
router.get("/:id", protect, getOrderById);

// Update Status
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;