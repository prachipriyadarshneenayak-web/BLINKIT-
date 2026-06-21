const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
  uploadProductImage,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getProducts);

router.get("/akshat-test", (req, res) => {
  res.send("AKSHAT ROUTE WORKING");
});

router.get("/upload-test", (req, res) => {
  res.send("Upload Route Working");
});

router.post(
  "/upload",
  protect,
  admin,
  upload.single("image"),
  uploadProductImage
);

router.get("/zzz", (req, res) => {
  res.send("ZZZ");
});

router.get("/:id", getProductById);

// Review Route
router.post("/:id/review", protect, addReview);

// Admin Routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;