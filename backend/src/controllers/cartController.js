const Cart = require("../models/Cart");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user.id,
      product,
      quantity,
    });

    res.status(201).json({
      message: "Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
};