const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();

    const orderData = await Order.find();

    const revenue = orderData.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayOrders = orderData.filter(
      (order) => new Date(order.createdAt) >= today
    );

    const todaySales = todayOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const averageOrder =
      orders > 0
        ? Math.round(revenue / orders)
        : 0;

    const highestOrder =
      orderData.length > 0
        ? Math.max(
            ...orderData.map(
              (order) => order.totalAmount
            )
          )
        : 0;

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const deliveredOrders =
      await Order.countDocuments({
        status: "Delivered",
      });

    const cancelledOrders =
      await Order.countDocuments({
        status: "Cancelled",
      });

      const topProducts = await Order.aggregate([
        {
          $unwind: "$products",
        },
        {
          $group: {
            _id: "$products.product",
            totalSold: {
              $sum: "$products.quantity",
            },
          },
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $project: {
            _id: 0,
            name: "$product.name",
            image: "$product.image",
            totalSold: 1,
          },
        },
      ]);

    res.json({
      products,
      orders,
      users,
      revenue,

      pendingOrders,
      deliveredOrders,
      cancelledOrders,

      topProducts,

      todaySales,
      averageOrder,
      highestOrder,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};