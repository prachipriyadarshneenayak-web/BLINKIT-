const express = require("express");
const router = express.Router();

const admin = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

// Place Order
router.post("/", protect, placeOrder);

// My Orders
router.get("/myorders", protect, getMyOrders);

//Admin - Get All Orders

router.get(
  "/all",
  protect,
  admin,
  getAllOrders
);

// Single Order
router.get("/:id", protect, getOrderById);

// Update Status
router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

module.exports = router;