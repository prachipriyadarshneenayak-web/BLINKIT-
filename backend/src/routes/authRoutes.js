const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  changePassword,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

// Hello Route
router.get("/hello", (req, res) => {
  res.send("Hello");
});

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);

// Get Profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfile
);

module.exports = router;