const User = require("../models/user");
const { generateRandomToken } = require("../utils/randomCodeGenerator");

const createPasswordResetCode = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return { error: "something went wrong" };
  }
  const token = await generateRandomToken();
  if (token) {
    user.resetPasswordToken = token.toString();
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    user.save();
    return token;
  } else {
    console.log("error creating token");
    return { error: "error creating token" };
  }
};

const checkThatPasswordResetTokenIsValid = async (token) => {
  const user = await User.findOne({ resetPasswordToken: token });
  if (user) {
    return user.resetPasswordToken;
  } else {
    return { error: "invalid token" };
  }
};

module.exports = {
  createPasswordResetCode,
  checkThatPasswordResetTokenIsValid,
};
