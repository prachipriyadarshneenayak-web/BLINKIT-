const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  addAddress,
  getAddresses,
  deleteAddress,
} = require("../controllers/addressController");

const router = express.Router();

router.post("/", protect, addAddress);

router.get("/", protect, getAddresses);

router.delete("/:id", protect, deleteAddress);

module.exports = router;