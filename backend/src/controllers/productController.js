const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");

// Create Product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Products + Search + Filters
const getProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (keyword) {
      filter.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(filter).sort({
      price: 1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Review
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    product.reviews.push({
      user: req.user.id,
      rating,
      comment,
    });

    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    product.averageRating =
      totalRating / product.reviews.length;

    await product.save();

    res.status(200).json({
      message: "Review Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    console.log("UPLOAD ROUTE HIT");
    console.log(req.file.path);

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "blinkit-products",
      }
    );

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.log("CLOUDINARY ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
  uploadProductImage,
};