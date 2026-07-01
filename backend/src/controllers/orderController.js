const Order = require("../models/Order");
const transporter = require("../config/mail");
const User = require("../models/User");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount,
      address,
    });

    const user = await User.findById(req.user.id);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "🛒 Order Confirmed - Blinkit Clone",

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#0c831f">
            Thank you for your order, ${user.name}! 🎉
          </h2>

          <p>Your order has been placed successfully.</p>

          <table style="border-collapse:collapse;margin-top:20px">
            <tr>
              <td><strong>Order ID</strong></td>
              <td>${order._id}</td>
            </tr>

            <tr>
              <td><strong>Total Amount</strong></td>
              <td>₹${order.totalAmount}</td>
            </tr>

            <tr>
              <td><strong>Status</strong></td>
              <td>${order.status}</td>
            </tr>

            <tr>
              <td><strong>Payment</strong></td>
              <td>${order.isPaid ? "Paid" : "Pending"}</td>
            </tr>
          </table>

          <p style="margin-top:20px">
            Delivery Address:
          </p>

          <p>${order.address}</p>

          <hr>

          <p>
            We will notify you once your order is packed and shipped.
          </p>

          <h3 style="color:#0c831f">
            Blinkit Clone Team 💚
          </h3>
        </div>
      `,
    });

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    ).populate("products.product");

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders (Admin)

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
};