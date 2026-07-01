const express = require("express");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  validateCoupon,
  createCoupon,
  getCoupons,
  deleteCoupon,
} = require("../controllers/couponController");

const router = express.Router();

// User
router.post("/validate", protect, validateCoupon);

// Admin
router.post("/", protect, admin, createCoupon);

router.get("/", protect, admin, getCoupons);

router.delete("/:id", protect, admin, deleteCoupon);

module.exports = router;