const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deleteUser,
  makeAdmin,
} = require("../controllers/userController");

// Get All Users
router.get(
  "/",
  protect,
  admin,
  getAllUsers
);

// Delete User
router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);

// Promote User
router.put(
  "/:id/admin",
  protect,
  admin,
  makeAdmin
);

module.exports = router;