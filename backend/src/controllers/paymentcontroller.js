const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(
      options
    );

    res.status(200).json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Razorpay Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    if (expectedSignature !== razorpay_signature) {
      order.paymentStatus = "Failed";

      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    order.isPaid = true;
    order.paidAt = new Date();

    order.paymentMethod = "Razorpay";

    order.paymentStatus = "Paid";

    order.paymentId = razorpay_payment_id;

    order.razorpayOrderId = razorpay_order_id;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};