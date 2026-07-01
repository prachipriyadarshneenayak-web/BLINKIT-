const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Make Admin
const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    user.role = "admin";

    await user.save();

    res.status(200).json({
      message: "User Promoted To Admin",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Avatar
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "blinkit-avatars",
      }
    );

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    user.avatar = result.secure_url;

    await user.save();

    res.status(200).json({
      message: "Avatar Updated Successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  makeAdmin,
  updateAvatar,
};