const Coupon = require("../models/Coupon");

// Create Coupon
const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon Created Successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    res.json(coupons);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Coupon Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Validate Coupon
const validateCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid Coupon",
      });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon Expired",
      });
    }

    if (totalAmount < coupon.minimumAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order ₹${coupon.minimumAmount}`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "Flat") {
      discount = coupon.discountValue;
    } else {
      discount =
        (totalAmount * coupon.discountValue) / 100;
    }

    res.json({
      success: true,
      discount,
      coupon,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  validateCoupon,
  createCoupon,
  getCoupons,
  deleteCoupon,
};