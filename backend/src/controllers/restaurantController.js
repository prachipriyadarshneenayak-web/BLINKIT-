const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      message: "Restaurant Created Successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
};