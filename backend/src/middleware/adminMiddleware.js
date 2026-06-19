const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Admin Access Only",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = admin;