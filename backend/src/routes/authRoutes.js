const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");

const {
  registerUser,
  loginUser,
  changePassword,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
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
router.post(
  "/register",
  registerValidator,
  validate,
  registerUser
);
router.post(
  "/login",
  loginValidator,
  validate,
  loginUser
);

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

// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);

// Reset Password
router.post(
  "/reset-password/:token",
  resetPassword
);

module.exports = router;