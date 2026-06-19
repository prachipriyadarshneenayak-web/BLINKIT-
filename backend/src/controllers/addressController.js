const Address = require("../models/Address");

// Add Address
const addAddress = async (req, res) => {
  try {
    const address = await Address.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      message: "Address Added Successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user.id,
    });

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Address Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  deleteAddress,
};