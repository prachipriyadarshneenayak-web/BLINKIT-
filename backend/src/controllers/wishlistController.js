const Wishlist = require("../models/Wishlist");

// Add Wishlist

const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.id,
      product,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already In Wishlist",
      });
    }

    const item = await Wishlist.create({
      user: req.user.id,
      product,
    });

    res.status(201).json({
      message: "Added To Wishlist",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Wishlist

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Wishlist

const removeWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Removed From Wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};