//validation and autorization middlewares
const User = require("../models/user");

exports.dataFieldLength = (req, res, next) => {
  if (
    req.body.username.trim().length <= 0 &&
    req.body.name.trim().length <= 0 &&
    req.body.phoneNumber.trim().length <= 0 &&
    req.body.email.trim().length <= 0 &&
    req.body.password.trim().length <= 0
  ) {
    return res.json({
      message: `Input fields cannot be empty 
        Ensure you provide all input fields correctly`,
    });
  }
  next();
};

exports.passwordValidity = (req, res, mext) => {
  if (
    req.body.password.trim() !== req.body.confirmPassword.trim() ||
    req.body.password.trim().length <= 7
  ) {
    return res.json({
      message: `Invalid password Password must not be less than 8`,
    });
  }
};
