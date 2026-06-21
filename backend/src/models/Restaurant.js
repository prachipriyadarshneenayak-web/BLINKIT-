const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    cuisineType: {
      type: String,
      required: true,
    },

    openingHours: {
      type: String,
    },

    gstNumber: {
      type: String,
    },

    contactNumber: {
      type: String,
    },

    image: {
      type: String,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);