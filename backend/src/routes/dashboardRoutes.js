const express = require("express");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, admin, getDashboardStats);

module.exports = router;